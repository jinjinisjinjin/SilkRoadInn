(function (root) {
  "use strict";

  const BASE_KEY = "silkroad_tavern_proto_v02";
  const META = "_saveVault";
  const MAX_BYTES = 2 * 1024 * 1024;
  const encoder = new TextEncoder();
  const crcTable = Array.from({ length: 256 }, (_, value) => {
    for (let bit = 0; bit < 8; bit++) value = (value >>> 1) ^ (value & 1 ? 0xedb88320 : 0);
    return value >>> 0;
  });

  // Detect accidental damage; this is not an anti-cheat signature.
  function checksum(text) {
    let value = 0xffffffff;
    for (const byte of encoder.encode(text)) value = (value >>> 8) ^ crcTable[(value ^ byte) & 255];
    return ((value ^ 0xffffffff) >>> 0).toString(16).padStart(8, "0");
  }

  function failure(message) {
    const error = new Error(message);
    error.code = "SAVE_UNREADABLE";
    return error;
  }

  function validKey(key) {
    if (!/^silkroad_tavern_proto_v02(?:_[a-zA-Z0-9_-]{1,100})?$/.test(key)) throw failure("Invalid save key");
  }

  function inspect(raw) {
    try {
      if (typeof raw !== "string" || !raw.length || encoder.encode(raw).length > MAX_BYTES) return null;
      const data = JSON.parse(raw);
      if (!data || Array.isArray(data) || typeof data !== "object") return null;
      if (!Array.isArray(data.board) || !data.board.length || data.board.length > 256
        || !data.board.every(item => item === null || typeof item === "string")) return null;
      for (const name of ["coins", "gems", "stamina", "completedOrders", "generationCount"]) {
        if (!Number.isSafeInteger(data[name]) || data[name] < 0) return null;
      }
      for (const name of ["completedOrderIds", "rewardItems", "giftPacks", "bag"]) {
        if (data[name] !== undefined && !Array.isArray(data[name])) return null;
      }
      for (const name of ["renovationChoices", "repairProgress", "storyFlags"]) {
        if (data[name] !== undefined && (!data[name] || Array.isArray(data[name]) || typeof data[name] !== "object")) return null;
      }
      const meta = data[META];
      delete data[META];
      const body = JSON.stringify(data);
      if (meta !== undefined && (meta?.version !== 1 || !Number.isSafeInteger(meta.revision)
        || meta.revision < 1 || meta.checksum !== checksum(`1\n${meta.revision}\n${body}`))) return null;
      return { data, raw, revision: meta?.revision ?? 0 };
    } catch { return null; }
  }

  function createVault({ storage, nativeProvider = () => null, warn = () => {}, onUnavailable = () => {} }) {
    const entries = new Map();
    let native;
    let queue = Promise.resolve(true);
    let lastError = null;
    let lastWarning = null;
    let unavailable = false;
    let latestMirror = 0;

    function report(error) {
      lastError = String(error?.message || error);
      if (lastWarning !== lastError) { warn(lastError); lastWarning = lastError; }
    }

    function publish(key, raw) {
      entries.get(key).raw = raw;
      try { storage.setItem(key, raw); unavailable = false; return true; }
      catch (error) {
        unavailable = true;
        report(error);
        if (!native) throw failure("No writable save destination");
        return false;
      }
    }

    function mirror(key, raw, localWritten = true) {
      const ticket = ++latestMirror;
      if (!native) return;
      // Send every committed snapshot in order; no debounce can discard a reward receipt.
      queue = queue.then(() => native.write({ key, payload: raw }))
        .then(() => {
          if (ticket === latestMirror) { lastError = null; unavailable = false; }
          return true;
        })
        .catch(error => {
          if (ticket === latestMirror) {
            report(error);
            if (!localWritten) { unavailable = true; onUnavailable(); }
          }
          return false;
        });
    }

    function write(key, raw) {
      validKey(key);
      const parsed = inspect(raw);
      if (!parsed) throw failure("Refusing an invalid game snapshot");
      const entry = entries.get(key);
      if (!entry) throw failure("Save vault must be prepared before writing");
      if (entry.revision >= Number.MAX_SAFE_INTEGER) throw failure("Save revision exhausted");
      const revision = ++entry.revision;
      const body = JSON.stringify(parsed.data);
      const serialized = JSON.stringify({ ...parsed.data, [META]: { version: 1, revision, checksum: checksum(`1\n${revision}\n${body}`) } });
      if (encoder.encode(serialized).length > MAX_BYTES) throw failure("Game snapshot exceeds backup limit");
      let localWritten;
      try { localWritten = publish(key, serialized); }
      catch (error) { onUnavailable(); throw error; }
      mirror(key, serialized, localWritten);
      return serialized;
    }

    async function prepare(key, { reset = false } = {}) {
      validKey(key);
      if (entries.has(key)) return entries.get(key).raw;
      native = nativeProvider();
      if (reset) {
        if (key === BASE_KEY) throw failure("The normal save cannot be reset by a test parameter");
        if (native) await native.clear({ key });
        storage.removeItem(key);
      }
      let raw = null;
      let storageError;
      try { raw = storage.getItem(key); } catch (error) { storageError = error; }
      const primary = inspect(raw);
      let result = { snapshots: [], hasFiles: false };
      if (native) {
        try { result = await native.read({ key }); }
        catch (error) {
          report(error);
          throw failure("Native backup could not be checked");
        }
      } else if (storageError) throw failure("Game storage cannot be read");
      let revision = primary?.revision ?? 0;
      const backups = [];
      for (const record of result.snapshots || []) {
        if (Number.isSafeInteger(record.revision) && record.revision > 0) revision = Math.max(revision, record.revision);
        const candidate = inspect(record.payload);
        if (candidate?.revision > 0 && candidate.revision === record.revision) backups.push(candidate);
      }
      backups.sort((a, b) => b.revision - a.revision);
      // First upgrade preserves the legacy primary when no native generation
      // exists. Once protected, an unversioned old copy cannot rewind receipts.
      // Revisions, never currency amounts or device time, determine recency.
      const selected = !primary || backups[0]?.revision > primary.revision ? backups[0] : primary;
      entries.set(key, { raw: null, revision });
      if (!selected) {
        if (storageError || raw !== null || result.hasFiles) {
          entries.delete(key);
          throw failure("Existing save and backups are unreadable; retained without replacement");
        }
        return null;
      }
      if (!selected.revision) write(key, selected.raw);
      else {
        const localWritten = publish(key, selected.raw);
        mirror(key, selected.raw, localWritten);
      }
      await queue;
      return entries.get(key).raw;
    }

    return Object.freeze({
      prepare, write,
      read: key => entries.get(key)?.raw ?? storage.getItem(key),
      flush: () => queue,
      status: () => ({ native: Boolean(native), lastError, unavailable }),
    });
  }

  const api = { createVault, inspect, checksum };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  if (root.document) {
    root.SilkRoadSaveVault = createVault({
      storage: {
        getItem: key => root.localStorage.getItem(key),
        setItem: (key, value) => root.localStorage.setItem(key, value),
        removeItem: key => root.localStorage.removeItem(key),
      },
      nativeProvider() {
        const capacitor = root.Capacitor;
        if (!capacitor?.isNativePlatform?.()) return null;
        if (!capacitor.isPluginAvailable("SaveVault")) throw failure("Native save plugin is missing");
        const injected = capacitor.Plugins?.SaveVault;
        if (injected && ["read", "write", "clear"].every(name => typeof injected[name] === "function")) return injected;
        if (typeof capacitor.registerPlugin === "function") return capacitor.registerPlugin("SaveVault");
        throw failure("Native save bridge is unavailable");
      },
      warn: message => console.warn("Save backup:", message),
      onUnavailable: () => root.dispatchEvent(new CustomEvent("silkroad:save-unavailable")),
    });
  }
})(typeof window === "undefined" ? globalThis : window);
