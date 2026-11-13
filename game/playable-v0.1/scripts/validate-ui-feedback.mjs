import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";

const source = readFileSync(resolve(import.meta.dirname, "../app.js"), "utf8");
function load(context, names) {
  for (const name of names) {
    const start = source.indexOf(`function ${name}(`);
    assert.ok(start >= 0, name);
    runInNewContext(source.slice(start, source.indexOf("\n}", start) + 2), context);
  }
}

const bread = { id: "hubing_02_lubing", name: "炉饼", level: 2 };
const sesame = { id: "hubing_03", name: "胡麻饼", level: 3 };
const entries = [bread, sesame].map(item => ({ id: `codex_${item.id}`, itemId: item.id, name: item.name }));
let dialogs = 0;
const notices = [];
const remembered = new Set();
const element = () => ({ classList: { toggle() {} }, closest: () => element() });
const c = {
  state: { tutorialStep: 1, unlockedCodex: new Set() },
  codexById: new Map(entries.map(entry => [entry.id, entry])),
  byId: new Map([bread, sesame].map(item => [item.id, item])),
  rememberUnlockedFoodItem: id => remembered.add(id),
  itemAssetSrc: item => item.id,
  activeCodexItemId: null,
  toast: text => notices.push(text),
  els: {
    unlockIcon: element(), unlockName: element(), unlockText: element(),
    viewCodexFromUnlock: element(), unlockAcknowledgeBtn: element(),
    unlockModal: { showModal() { dialogs++; } },
  },
};
load(c, ["unlockCodex"]);
c.unlockCodex(entries[0].id);
assert.equal(dialogs, 1, "The first cooking lesson retains its delivery transition");
assert.equal(c.els.viewCodexFromUnlock.hidden, true);
c.state.tutorialStep = 6;
c.unlockCodex(entries[1].id);
assert.equal(dialogs, 1, "Later discoveries must not block the board");
assert.equal(notices.length, 1);
assert.ok(c.state.unlockedCodex.has(entries[1].id), "Nonblocking feedback still records discovery");
assert.ok(remembered.has(sesame.id), "Food progression still learns the discovered food");
assert.equal(c.activeCodexItemId, sesame.id, "The new food remains selected for voluntary reading");
c.unlockCodex(entries[1].id);
assert.equal(notices.length, 1, "Known foods do not repeat discovery feedback");
c.unlockCodex("missing");
assert.equal(dialogs, 1);

let opened = 0;
const warehouse = {
  state: { board: [], selectedIndex: null, generatorWarehouseGuideSeen: false },
  byId: new Map(), activeStorageTab: "normal",
  generatorWarehouseUnlocked: () => true,
  isGeneratorPiece: () => false,
  renderStorage() {},
  els: { storageModal: { open: false, showModal() { this.open = true; opened++; } } },
};
load(warehouse, ["showStorageModal", "openStorage", "setStorageTab"]);
warehouse.openStorage();
assert.equal(opened, 1);
assert.equal(warehouse.activeStorageTab, "normal", "First entry keeps the requested storage tab");
warehouse.setStorageTab("generator");
assert.equal(warehouse.activeStorageTab, "generator", "Generator storage is directly accessible");
warehouse.setStorageTab("normal");
assert.equal(warehouse.activeStorageTab, "normal", "No tutorial overlay blocks tab changes");
console.log("UI feedback: first lesson, nonblocking discoveries, deduplication, food progression, and direct warehouse access passed.");
