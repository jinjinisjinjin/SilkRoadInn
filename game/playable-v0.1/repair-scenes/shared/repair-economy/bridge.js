(() => {
  "use strict";

  const MESSAGE = Object.freeze({
    READY: "silkroad:repair-ready",
    INIT: "silkroad:repair-init",
    REQUEST: "silkroad:repair-part-request",
    RESULT: "silkroad:repair-part-result",
    APPLIED: "silkroad:repair-part-applied",
    EXIT: "silkroad:repair-exit",
    SOUND: "silkroad:button-sound",
  });
  const COIN_ICON = "../../assets/ui/ui_coin_copper.png";
  const REPAIR_PART_COST_WEIGHTS = Object.freeze([71, 79, 89, 101, 109, 121, 131, 139, 160]);
  const REPAIR_REVEAL_HOLD_MS = 1800;
  const ENTRY_OVERVIEW_HOLD_MS = 700;
  const ZONE_CAMERA_MOVE_MS = 620;
  const LOCAL_CAMERA_MOVE_MS = 380;
  const COMPLETION_OVERVIEW_MOVE_MS = 820;
  const REPAIR_SCENE_CAST = Object.freeze({
    // Each x/y is a floor contact point; widths follow the scene's perspective and furniture scale.
    "02": [
      { actor: "keeper", x: 650, y: 805, width: 157 },
      { actor: "npc_dunhuang_woman", x: 880, y: 805, width: 184, flip: true },
    ],
    "03": [
      { actor: "keeper", x: 930, y: 845, width: 153 },
      { actor: "npc_sogdian_merchant", x: 1080, y: 820, width: 237, flip: true },
    ],
    "04": [
      { actor: "keeper", x: 665, y: 838, width: 157 },
      { actor: "npc_farmer", x: 900, y: 852, width: 179, flip: true },
    ],
    "05": [
      { actor: "keeper", x: 810, y: 820, width: 156 },
      { actor: "npc_sogdian_merchant", x: 1040, y: 820, width: 243, flip: true },
    ],
    "06": [
      { actor: "keeper", x: 605, y: 848, width: 151, mobileX: 755 },
      { actor: "npc_dunhuang_woman", x: 790, y: 848, width: 177, flip: true, mobileX: 940 },
    ],
    "07": [
      { actor: "keeper", x: 660, y: 980, width: 145 },
      { actor: "npc_pilgrim_monk", x: 840, y: 995, width: 224, flip: true },
    ],
    "08": [
      { actor: "keeper", x: 585, y: 925, width: 188, mobileX: 630 },
      { actor: "npc_pilgrim_monk", x: 790, y: 925, width: 294, flip: true, mobileX: 835 },
    ],
    "09": [
      { actor: "keeper", x: 650, y: 970, width: 186 },
      { actor: "npc_changan_envoy", x: 840, y: 975, width: 287, flip: true },
    ],
    "10": [
      { actor: "keeper", x: 650, y: 880, width: 141 },
      { actor: "npc_changan_maid", x: 850, y: 970, width: 240, flip: true },
    ],
    "11": [
      { actor: "keeper", x: 637, y: 873, width: 158 },
      { actor: "npc_temple_donor", x: 889, y: 879, width: 208, flip: true },
    ],
    "12": [
      { actor: "keeper", x: 575, y: 916, width: 145 },
      { actor: "npc_temple_donor", x: 785, y: 916, width: 192, flip: true },
    ],
    "13-14": [
      { actor: "keeper", x: 525, y: 1000, width: 145, mobileX: 575 },
      { actor: "npc_temple_donor", x: 740, y: 1000, width: 193, flip: true, mobileX: 790 },
    ],
    "15": [
      { actor: "keeper", x: 700, y: 810, width: 156 },
      { actor: "npc_pilgrim_monk", x: 900, y: 815, width: 244, flip: true },
    ],
    "16": [
      { actor: "keeper", x: 745, y: 815, width: 154 },
      { actor: "npc_uighur_herder", x: 930, y: 820, width: 240, flip: true },
    ],
    "17-18": [
      { actor: "keeper", x: 800, y: 690, width: 139 },
      { actor: "npc_shazhou_guard", x: 1010, y: 690, width: 219, flip: true },
    ],
    "19": [
      { actor: "keeper", x: 700, y: 835, width: 156 },
      { actor: "npc_caravan_leader", x: 945, y: 845, width: 250, flip: true },
    ],
    "20": [
      { actor: "keeper", x: 720, y: 875, width: 154 },
      { actor: "npc_caravan_leader", x: 930, y: 875, width: 248, flip: true },
    ],
    "21-23": [
      { actor: "keeper", x: 660, y: 827, width: 155, mobileX: 175 },
      { actor: "npc_sogdian_merchant", x: 880, y: 827, width: 241, flip: true, mobileX: 385 },
    ],
    "24": [
      { actor: "keeper", x: 705, y: 810, width: 153, mobileX: 555 },
      { actor: "npc_dunhuang_woman", x: 910, y: 810, width: 179, flip: true, mobileX: 760 },
    ],
    "25": [
      { actor: "keeper", x: 710, y: 805, width: 156 },
      { actor: "npc_caravan_leader", x: 900, y: 815, width: 250, flip: true },
    ],
    "26": [
      { actor: "keeper", x: 585, y: 815, width: 154 },
      { actor: "npc_changan_maid", x: 785, y: 815, width: 245, flip: true },
    ],
    "27": [
      { actor: "keeper", x: 1080, y: 815, width: 155 },
      { actor: "npc_caravan_leader", x: 1300, y: 815, width: 249, flip: true },
    ],
  });

  function mountRepairSceneCast(world, repairId) {
    const actors = REPAIR_SCENE_CAST[repairId];
    if (!actors) return;
    const layer = document.createElement("div");
    layer.className = "repair-scene-cast";
    layer.setAttribute("aria-hidden", "true");
    actors.forEach(({ actor, x, y, width, flip, mobileX }) => {
      const figure = document.createElement("figure");
      figure.className = `repair-scene-figure${flip ? " is-flipped" : ""}`;
      figure.style.setProperty("--cast-x", `${x}px`);
      if (mobileX !== undefined) figure.style.setProperty("--cast-mobile-x", `${mobileX}px`);
      figure.style.setProperty("--cast-y", `${y}px`);
      figure.style.setProperty("--cast-width", `${width}px`);
      const image = document.createElement("img");
      image.src = `../../assets/npc_standee/${actor === "keeper" ? "keeper.png" : `${actor}_full_v1.png`}`;
      image.alt = "";
      image.draggable = false;
      figure.append(image);
      layer.append(figure);
    });
    world.append(layer);
  }

  function integer(value, fallback = 0) {
    if (value === null || value === undefined || value === "") return fallback;
    const parsed = Number(value);
    return Number.isFinite(parsed) ? Math.max(0, Math.round(parsed)) : fallback;
  }

  function distributeCost(total, count) {
    if (!count) return [];
    const parsedTotal = Number(total);
    const safeTotal = total === null || total === undefined || total === "" || !Number.isFinite(parsedTotal)
      ? 1200
      : Math.max(0, Math.floor(parsedTotal));
    if (count === REPAIR_PART_COST_WEIGHTS.length) {
      const weightTotal = REPAIR_PART_COST_WEIGHTS.reduce((sum, weight) => sum + weight, 0);
      const costs = REPAIR_PART_COST_WEIGHTS.map((weight) => Math.floor((safeTotal * weight) / weightTotal));
      costs[costs.length - 1] += safeTotal - costs.reduce((sum, cost) => sum + cost, 0);
      return costs;
    }
    const baseCost = Math.floor(safeTotal / count);
    const remainder = safeTotal % count;
    return Array.from({ length: count }, (_, index) => baseCost + (index < remainder ? 1 : 0));
  }

  function parseNumberList(value) {
    if (!value) return [];
    return value
      .split(",")
      .map((entry) => Number(entry.trim()))
      .filter(Number.isFinite)
      .map((entry) => Math.max(0, Math.round(entry)));
  }

  function partIndex(value) {
    const parsed = Number(value);
    return Number.isInteger(parsed) ? parsed : -1;
  }

  function postToParent(payload) {
    if (window.parent === window) return false;
    window.parent.postMessage(payload, window.location.origin);
    return true;
  }

  function createHud() {
    const hud = document.createElement("div");
    hud.className = "repair-economy-hud";
    hud.innerHTML = `
      <button class="repair-economy-back" type="button" aria-label="返回流沙驿">
        <span aria-hidden="true">‹</span><b>返回</b>
      </button>
      <div class="repair-return-guide" role="status" aria-live="polite" hidden>
        铜钱不足。点左上角「返回」，回后厨完成订单，赚取下一件修缮所需的铜钱。
      </div>
    `;
    const feedback = document.createElement("div");
    feedback.className = "repair-economy-feedback";
    feedback.setAttribute("role", "status");
    feedback.setAttribute("aria-live", "polite");
    feedback.hidden = true;
    document.body.append(hud, feedback);
    return {
      hud,
      back: hud.querySelector(".repair-economy-back"),
      returnGuide: hud.querySelector(".repair-return-guide"),
      feedback,
    };
  }

  function normalizeParts(parts, partCount) {
    return Array.from({ length: partCount }, (_, index) => {
      const source = parts[index] ?? {};
      const target = source.targets?.[0] ?? source.target ?? [0, 0, 90];
      return {
        x: integer(target[0]),
        y: integer(target[1]),
        radius: Math.max(50, integer(target[2], 90)),
      };
    });
  }

  function clamp(value, minimum, maximum) {
    return Math.min(maximum, Math.max(minimum, value));
  }

  function createMarker(part, displayPoint, index) {
    const marker = document.createElement("div");
    const auraSize = Math.min(250, Math.max(110, part.radius * 1.35));
    marker.className = "repair-part-marker is-awaiting";
    marker.dataset.partIndex = String(index);
    marker.style.left = `${displayPoint.x}px`;
    marker.style.top = `${displayPoint.y}px`;
    marker.style.setProperty("--repair-aura-size", `${auraSize}px`);
    marker.innerHTML = `
      <span class="repair-part-aura" aria-hidden="true"></span>
      <button class="repair-part-price" type="button" aria-label="修缮第${index + 1}处">
        <span class="repair-part-price-line">
          <img src="${COIN_ICON}" alt="" /><b data-repair-current>—</b>
          <span class="repair-part-price-divider" aria-hidden="true">/</span><b data-repair-cost>—</b>
        </span>
      </button>
    `;
    return marker;
  }

  function register(options) {
    const params = new URLSearchParams(location.search);
    const pathRepairId = location.pathname.split("/").filter(Boolean).at(-2);
    const repairId = String(options.repairId || params.get("repairId") || pathRepairId || "");
    const world = options.world;
    const partCount = integer(options.partCount ?? options.parts?.length);
    if (!repairId || !world || !partCount || typeof options.apply !== "function") {
      throw new Error("Repair economy bridge requires repairId, world, parts, and apply().");
    }

    const embedded = window.parent !== window;
    const parts = normalizeParts(options.parts ?? [], partCount);
    const computedWorld = getComputedStyle(world);
    const worldWidth = Math.max(110, integer(options.width, world.offsetWidth || parseFloat(computedWorld.width) || 0));
    const worldHeight = Math.max(60, integer(options.height, world.offsetHeight || parseFloat(computedWorld.height) || 0));
    const markerPoints = parts.map((part) => ({
      x: clamp(part.x, 55, worldWidth - 55),
      y: clamp(part.y, 30, worldHeight - 30),
    }));
    const queryCosts = parseNumberList(params.get("partCosts"));
    let costs = queryCosts.length === partCount
      ? queryCosts
      : distributeCost(params.get("repairCost"), partCount);
    let walletCoins = integer(params.get("walletCoins"), integer(params.get("coins"), embedded ? 0 : 9990));
    let prepaidRemaining = integer(params.get("prepaidRemaining"));
    let initialized = !embedded;
    let feedbackTimer = null;
    const applied = new Set();
    const pending = new Set();
    const ui = createHud();
    const markerHost = document.createElement("div");
    world.removeAttribute("aria-hidden");
    mountRepairSceneCast(world, repairId);
    markerHost.className = typeof options.overview === "function"
      ? "repair-part-marker-layer is-repair-overview"
      : "repair-part-marker-layer";
    markerHost.setAttribute("aria-label", "待修缮部位");
    world.append(markerHost);
    const markers = parts.map((part, index) => {
      const marker = createMarker(part, markerPoints[index], index);
      markerHost.append(marker);
      return marker;
    });
    let markerLayoutFrame = 0;
    let activeFocusFrame = 0;
    let focusTransitionTimer = 0;
    let entryOverviewTimer = 0;
    let revealHoldTimer = 0;
    let returnGuideTimer = 0;
    let revealHeld = false;
    let entryOverviewPending = typeof options.overview === "function";
    let lastFocusedIndex = -1;
    let lastFocusedZone = -1;
    let hydrating = false;

    function zoneForPart(index) {
      const ratio = parts[index]?.x / worldWidth;
      if (!Number.isFinite(ratio)) return 1;
      if (ratio < 0.34) return 0;
      if (ratio > 0.66) return 2;
      return 1;
    }

    function prefersReducedMotion() {
      return matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    function startCameraTransition(kind, duration) {
      clearFocusTransition();
      if (prefersReducedMotion()) return;
      world.classList.add("is-repair-camera-focusing", `is-repair-camera-${kind}`);
      focusTransitionTimer = window.setTimeout(clearFocusTransition, duration);
    }

    function updateMarkerLayout() {
      markerLayoutFrame = 0;
      const worldRect = world.getBoundingClientRect();
      const scaleX = worldRect.width / worldWidth;
      const scaleY = worldRect.height / worldHeight;
      if (!(scaleX > 0) || !(scaleY > 0)) return;
      const castRects = [...world.querySelectorAll(".repair-scene-figure > img")]
        .map((image) => image.getBoundingClientRect());
      markers.forEach((marker, index) => {
        const price = marker.querySelector(".repair-part-price");
        if (!price || marker.hidden) return;
        const counterScale = Math.min(3, Math.max(0.5, 54 / (Math.max(1, price.offsetHeight) * scaleY)));
        const halfWidth = (Math.max(1, price.offsetWidth) * scaleX * counterScale) / 2 + 12;
        const halfHeight = (Math.max(1, price.offsetHeight) * scaleY * counterScale) / 2 + 14;
        const screenX = worldRect.left + markerPoints[index].x * scaleX;
        const screenY = worldRect.top + markerPoints[index].y * scaleY;
        const nearHorizontalEdge = screenX >= -halfWidth && screenX <= innerWidth + halfWidth;
        const nearVerticalEdge = screenY >= -halfHeight && screenY <= innerHeight + halfHeight;
        let priceX = nearHorizontalEdge ? clamp(screenX, halfWidth, innerWidth - halfWidth) : screenX;
        let priceY = nearVerticalEdge ? clamp(screenY, halfHeight, innerHeight - halfHeight) : screenY;
        if (nearHorizontalEdge && nearVerticalEdge) {
          const minX = halfWidth + 10;
          const maxX = Math.max(minX, innerWidth - halfWidth - 10);
          const minY = Math.max(halfHeight + 10, Math.min(125, innerHeight * 0.12));
          const maxY = Math.max(minY, Math.min(innerHeight - halfHeight - 18, innerHeight * 0.78));
          const xStops = [screenX, innerWidth * 0.28, innerWidth * 0.5, innerWidth * 0.72];
          const yStops = [screenY, maxY, innerHeight * 0.58, innerHeight * 0.42, minY];
          castRects.forEach((rect) => {
            xStops.push(rect.left - halfWidth - 20, rect.right + halfWidth + 20);
            yStops.push(rect.top - halfHeight - 24, rect.bottom + halfHeight + 24);
          });
          let bestScore = Infinity;
          for (const xStop of xStops) {
            for (const yStop of yStops) {
              const x = clamp(xStop, minX, maxX);
              const y = clamp(yStop, minY, maxY);
              const left = x - halfWidth;
              const right = x + halfWidth;
              const top = y - halfHeight;
              const bottom = y + halfHeight;
              const overlap = castRects.reduce((area, rect) => {
                const width = Math.max(0, Math.min(right, rect.right + 10) - Math.max(left, rect.left - 10));
                const height = Math.max(0, Math.min(bottom, rect.bottom + 12) - Math.max(top, rect.top - 12));
                return area + width * height;
              }, 0);
              const labelArea = Math.max(1, halfWidth * halfHeight * 4);
              const score = Math.hypot(x - screenX, y - screenY)
                + (overlap / labelArea) * 6000
                + Math.max(0, y - innerHeight * 0.7) * 0.4;
              if (score < bestScore) {
                bestScore = score;
                priceX = x;
                priceY = y;
              }
            }
          }
        }
        const shiftX = (priceX - screenX) / scaleX;
        const shiftY = (priceY - screenY) / scaleY;
        price.style.setProperty("--repair-price-shift-x", `${shiftX}px`);
        price.style.setProperty("--repair-price-shift-y", `${shiftY}px`);
        price.style.setProperty("--repair-price-scale", String(counterScale));
      });
    }

    function scheduleMarkerLayout() {
      if (markerLayoutFrame) return;
      markerLayoutFrame = requestAnimationFrame(updateMarkerLayout);
    }

    function showRepairRenewal(index) {
      markerHost.querySelectorAll(".repair-part-renewal").forEach((effect) => effect.remove());
      const part = parts[index];
      const point = markerPoints[index];
      if (!part || !point) return;
      const effect = document.createElement("span");
      effect.className = "repair-part-renewal";
      effect.setAttribute("aria-hidden", "true");
      effect.style.left = `${point.x}px`;
      effect.style.top = `${point.y}px`;
      effect.style.setProperty("--repair-renewal-size", `${clamp(part.radius * 1.8, 150, 300)}px`);
      markerHost.append(effect);
      effect.addEventListener("animationend", () => effect.remove(), { once: true });
      window.setTimeout(() => effect.remove(), REPAIR_REVEAL_HOLD_MS + 240);
    }

    function holdOnRepairedPart(index) {
      clearTimeout(revealHoldTimer);
      revealHeld = true;
      clearFocusTransition();
      markers.forEach((marker) => { marker.hidden = true; });
      showRepairRenewal(index);
      scheduleMarkerLayout();
      revealHoldTimer = window.setTimeout(() => {
        revealHoldTimer = 0;
        revealHeld = false;
        if (nextIncompleteIndex() < 0 && typeof options.overview === "function") {
          markerHost.classList.add("is-repair-overview");
          startCameraTransition("overview", COMPLETION_OVERVIEW_MOVE_MS);
          options.overview({ kind: "completion" });
          scheduleMarkerLayout();
          return;
        }
        renderAll();
      }, REPAIR_REVEAL_HOLD_MS);
    }

    function clearFocusTransition() {
      clearTimeout(focusTransitionTimer);
      focusTransitionTimer = 0;
      world.classList.remove(
        "is-repair-camera-focusing",
        "is-repair-camera-local",
        "is-repair-camera-zone",
        "is-repair-camera-overview",
      );
      scheduleMarkerLayout();
    }

    function settleActiveFocus(activeIndex) {
      focusTransitionTimer = 0;
      world.classList.remove(
        "is-repair-camera-focusing",
        "is-repair-camera-local",
        "is-repair-camera-zone",
        "is-repair-camera-overview",
      );
      if (activeIndex === nextIncompleteIndex()) {
        const markerRect = markers[activeIndex]?.getBoundingClientRect();
        const centerX = markerRect ? (markerRect.left + markerRect.right) / 2 : innerWidth / 2;
        const centerY = markerRect ? (markerRect.top + markerRect.bottom) / 2 : innerHeight / 2;
        if (centerX < innerWidth * 0.25 || centerX > innerWidth * 0.75
          || centerY < innerHeight * 0.18 || centerY > innerHeight * 0.82) {
          options.focus(
            activeIndex,
            { x: parts[activeIndex].x, y: parts[activeIndex].y },
            { restoring: true },
          );
        }
      }
      scheduleMarkerLayout();
    }

    function focusActivePart(activeIndex, { restoring = false, entry = false, revealMarker = true } = {}) {
      const nextZone = zoneForPart(activeIndex);
      const crossedZone = entry || (lastFocusedZone >= 0 && nextZone !== lastFocusedZone);
      const transitionKind = crossedZone ? "zone" : "local";
      const transitionDuration = crossedZone ? ZONE_CAMERA_MOVE_MS : LOCAL_CAMERA_MOVE_MS;
      lastFocusedIndex = activeIndex;
      lastFocusedZone = nextZone;
      if (revealMarker) markerHost.classList.remove("is-repair-overview");
      startCameraTransition(transitionKind, transitionDuration);
      options.focus(
        activeIndex,
        { x: parts[activeIndex].x, y: parts[activeIndex].y },
        { restoring, entry, zone: nextZone, crossedZone },
      );
      scheduleMarkerLayout();
      return transitionDuration;
    }

    function beginEntryOverview(activeIndex) {
      entryOverviewPending = false;
      markerHost.classList.add("is-repair-overview");
      clearFocusTransition();
      options.overview({ kind: "entry" });
      scheduleMarkerLayout();
      entryOverviewTimer = window.setTimeout(() => {
        entryOverviewTimer = 0;
        if (activeIndex !== nextIncompleteIndex()) return;
        const transitionDuration = focusActivePart(activeIndex, {
          restoring: true,
          entry: true,
          revealMarker: false,
        });
        entryOverviewTimer = window.setTimeout(() => {
          entryOverviewTimer = 0;
          markerHost.classList.remove("is-repair-overview");
          settleActiveFocus(activeIndex);
        }, prefersReducedMotion() ? 0 : transitionDuration);
      }, prefersReducedMotion() ? 0 : ENTRY_OVERVIEW_HOLD_MS);
    }

    function scheduleActiveFocus(activeIndex, { restoring = false } = {}) {
      if (!initialized || hydrating || activeIndex < 0 || activeIndex === lastFocusedIndex) return;
      if (typeof options.focus !== "function") {
        lastFocusedIndex = activeIndex;
        return;
      }
      cancelAnimationFrame(activeFocusFrame);
      activeFocusFrame = requestAnimationFrame(() => {
        activeFocusFrame = 0;
        if (hydrating || activeIndex !== nextIncompleteIndex() || activeIndex === lastFocusedIndex) return;
        if (entryOverviewPending && typeof options.overview === "function") {
          beginEntryOverview(activeIndex);
          return;
        }
        const transitionDuration = focusActivePart(activeIndex, { restoring });
        clearTimeout(focusTransitionTimer);
        focusTransitionTimer = window.setTimeout(
          () => settleActiveFocus(activeIndex),
          prefersReducedMotion() ? 0 : transitionDuration,
        );
      });
    }

    const cameraObserver = new MutationObserver(scheduleMarkerLayout);
    cameraObserver.observe(world, { attributes: true, attributeFilter: ["style", "class"] });
    window.addEventListener("resize", () => {
      scheduleMarkerLayout();
      if (!initialized || hydrating || revealHeld) return;
      lastFocusedIndex = -1;
      requestAnimationFrame(() => renderAll({ focusRestoring: true }));
    });
    (world.parentElement || document).addEventListener("pointerdown", clearFocusTransition, { capture: true });

    function showFeedback(message, kind = "") {
      clearTimeout(feedbackTimer);
      ui.feedback.textContent = message;
      ui.feedback.dataset.kind = kind;
      ui.feedback.hidden = false;
      ui.feedback.classList.remove("is-leaving");
      feedbackTimer = window.setTimeout(() => {
        ui.feedback.classList.add("is-leaving");
        window.setTimeout(() => {
          ui.feedback.hidden = true;
          ui.feedback.classList.remove("is-leaving");
        }, 180);
      }, 1500);
    }

    function availableCoins() {
      return walletCoins + prepaidRemaining;
    }

    function hideFirstReturnGuide() {
      clearTimeout(returnGuideTimer);
      returnGuideTimer = 0;
      ui.returnGuide.hidden = true;
      ui.back.classList.remove("is-guide-target");
    }

    function showFirstReturnGuide() {
      returnGuideTimer = 0;
      const nextIndex = nextIncompleteIndex();
      const nextCost = costs[nextIndex] ?? 0;
      if (repairId !== "02" || applied.size !== 1 || nextIndex !== 1 || availableCoins() >= nextCost) return;
      ui.returnGuide.hidden = false;
      ui.back.classList.add("is-guide-target");
    }

    function receiveBalances(data) {
      const hasWallet = Number.isFinite(Number(data.walletCoins));
      const hasPrepaid = Number.isFinite(Number(data.prepaidRemaining));
      const hasCombined = Number.isFinite(Number(data.coins));
      if (hasWallet) walletCoins = integer(data.walletCoins);
      if (hasPrepaid) prepaidRemaining = integer(data.prepaidRemaining);
      if (hasCombined && hasWallet && !hasPrepaid) {
        prepaidRemaining = Math.max(0, integer(data.coins) - walletCoins);
      } else if (hasCombined && !hasWallet && !hasPrepaid) {
        walletCoins = integer(data.coins);
        prepaidRemaining = 0;
      }
    }

    function nextIncompleteIndex() {
      return parts.findIndex((_, index) => !applied.has(index));
    }

    function fitPriceLine(price) {
      const line = price.querySelector(".repair-part-price-line");
      const items = [...line.children];
      const gap = Number.parseFloat(getComputedStyle(line).columnGap) || 0;
      const contentWidth = () => items.reduce((width, item) => width + item.offsetWidth, 0)
        + gap * (items.length - 1);
      let scale = 1;
      price.style.setProperty("--repair-price-font-scale", String(scale));
      while (contentWidth() > line.clientWidth - 1 && scale > 0.68) {
        scale = Math.max(0.68, Math.round((scale - 0.04) * 100) / 100);
        price.style.setProperty("--repair-price-font-scale", String(scale));
      }
    }

    function renderMarker(index, activeIndex = nextIncompleteIndex()) {
      const marker = markers[index];
      if (!marker) return;
      const cost = costs[index] ?? 0;
      const isCurrent = index === activeIndex && !applied.has(index);
      const isShort = initialized && availableCoins() < cost;
      marker.hidden = !isCurrent;
      marker.classList.toggle("is-awaiting", !initialized);
      marker.classList.toggle("is-pending", pending.has(index));
      marker.classList.toggle("is-short", isShort);
      const price = marker.querySelector(".repair-part-price");
      price.querySelector("[data-repair-current]").textContent = initialized ? String(availableCoins()) : "—";
      price.querySelector("[data-repair-cost]").textContent = initialized ? String(cost) : "—";
      fitPriceLine(price);
      price.setAttribute(
        "aria-label",
        initialized
          ? `修缮第${index + 1}处，现有${availableCoins()}枚铜币，本次需要${cost}枚${isShort ? "，铜币不足" : ""}`
          : `第${index + 1}处修缮价格读取中`,
      );
    }

    function renderAll({ focusRestoring = false } = {}) {
      ui.hud.classList.toggle("is-awaiting", !initialized);
      if (revealHeld) {
        markers.forEach((marker) => { marker.hidden = true; });
        scheduleMarkerLayout();
        return;
      }
      const activeIndex = nextIncompleteIndex();
      markers.forEach((_, index) => renderMarker(index, activeIndex));
      scheduleMarkerLayout();
      scheduleActiveFocus(activeIndex, { restoring: focusRestoring });
    }

    function applyPart(index, point, restoring = false, holdForReveal = false) {
      if (applied.has(index) || index < 0 || index >= partCount) return false;
      const fallback = parts[index];
      const repairPoint = point ?? { x: fallback.x, y: fallback.y };
      const completesScene = !restoring && applied.size + 1 >= partCount;
      const accepted = options.apply(index, repairPoint, {
        restoring,
        revealDelayMs: restoring
          ? 0
          : REPAIR_REVEAL_HOLD_MS + (completesScene ? COMPLETION_OVERVIEW_MOVE_MS : 0),
      });
      if (accepted === false) return false;
      applied.add(index);
      pending.delete(index);
      if (holdForReveal && !restoring) holdOnRepairedPart(index);
      else renderAll({ focusRestoring: restoring });
      return true;
    }

    function request(index, point) {
      if (applied.has(index) || pending.has(index) || index < 0 || index >= partCount) return false;
      if (index !== nextIncompleteIndex()) return false;
      if (!initialized) {
        showFeedback("正在核对铜币，请稍候");
        sendReady();
        return false;
      }
      const cost = costs[index] ?? 0;
      if (availableCoins() < cost) {
        showFeedback(`铜币不足，还差${cost - availableCoins()}枚`, "short");
        markerPulse(index, "is-denied");
        return false;
      }
      pending.add(index);
      renderMarker(index);
      const payload = { type: MESSAGE.REQUEST, repairId, partIndex: index };
      if (embedded) {
        postToParent(payload);
      } else {
        window.setTimeout(() => {
          const prepaidUsed = Math.min(prepaidRemaining, cost);
          const charged = cost - prepaidUsed;
          receiveResult({
            ...payload,
            type: MESSAGE.RESULT,
            ok: true,
            coins: availableCoins() - cost,
            walletCoins: walletCoins - charged,
            prepaidRemaining: prepaidRemaining - prepaidUsed,
            cost,
          });
        }, 180);
      }
      return true;
    }

    function markerPulse(index, className) {
      const marker = markers[index];
      if (!marker) return;
      marker.classList.remove(className);
      void marker.offsetWidth;
      marker.classList.add(className);
      window.setTimeout(() => marker.classList.remove(className), 440);
    }

    function receiveInit(data) {
      if (String(data.repairId || "") !== repairId) return;
      if (Array.isArray(data.partCosts) && data.partCosts.length === partCount) {
        costs = data.partCosts.map((cost) => integer(cost));
      } else if (Number.isFinite(Number(data.totalCost))) {
        costs = distributeCost(data.totalCost, partCount);
      }
      receiveBalances(data);
      initialized = true;
      const completedParts = Array.isArray(data.completedParts) ? data.completedParts : [];
      hydrating = true;
      try {
        completedParts
          .map(partIndex)
          .filter((index) => index >= 0 && index < partCount)
          .forEach((index) => applyPart(index, null, true));
      } finally {
        hydrating = false;
      }
      renderAll({ focusRestoring: true });
    }

    function receiveResult(data) {
      if (String(data.repairId || "") !== repairId) return;
      const index = partIndex(data.partIndex);
      if (index < 0 || index >= partCount) return;
      pending.delete(index);
      receiveBalances(data);
      if (!data.ok) {
        renderAll();
        showFeedback(
          data.reason || `铜币不足，还差${Math.max(0, (costs[index] ?? 0) - availableCoins())}枚`,
          "short",
        );
        markerPulse(index, "is-denied");
        return;
      }
      const point = { x: parts[index].x, y: parts[index].y };
      if (applyPart(index, point, false, true)) {
        markerPulse(index, "is-approved");
        postToParent({
          type: MESSAGE.APPLIED,
          repairId,
          partIndex: index,
          coins: availableCoins(),
          walletCoins,
          prepaidRemaining,
          cost: integer(data.cost, costs[index] ?? 0),
        });
        if (repairId === "02" && index === 0) {
          clearTimeout(returnGuideTimer);
          returnGuideTimer = window.setTimeout(showFirstReturnGuide, REPAIR_REVEAL_HOLD_MS + 120);
        }
      }
    }

    function sendReady() {
      postToParent({ type: MESSAGE.READY, repairId, partCount });
    }

    function handleMessage(event) {
      if (event.origin !== window.location.origin || event.source !== window.parent) return;
      if (event.data?.type === MESSAGE.INIT) receiveInit(event.data);
      if (event.data?.type === MESSAGE.RESULT) receiveResult(event.data);
    }

    markers.forEach((marker, index) => {
      const price = marker.querySelector(".repair-part-price");
      price.addEventListener("pointerdown", (event) => event.stopPropagation());
      price.addEventListener("pointerup", (event) => event.stopPropagation());
      price.addEventListener("click", (event) => {
        event.stopPropagation();
        request(index, { x: parts[index].x, y: parts[index].y });
      });
    });
    ui.back.addEventListener("click", () => {
      hideFirstReturnGuide();
      if (!postToParent({ type: MESSAGE.EXIT, repairId })) history.back();
    });
    document.addEventListener("click", (event) => {
      const button = event.target instanceof Element ? event.target.closest("button") : null;
      if (!button || button.disabled) return;
      postToParent({ type: MESSAGE.SOUND, repairId });
    });
    window.addEventListener("message", handleMessage);
    renderAll({ focusRestoring: true });
    if (embedded) {
      sendReady();
      window.setTimeout(() => { if (!initialized) sendReady(); }, 180);
      window.setTimeout(() => { if (!initialized) sendReady(); }, 720);
    }

    return Object.freeze({
      request,
      receiveInit,
      receiveResult,
      restore(index) {
        return applyPart(index, null, true);
      },
      reset() {
        hideFirstReturnGuide();
        clearTimeout(entryOverviewTimer);
        entryOverviewTimer = 0;
        clearTimeout(revealHoldTimer);
        revealHoldTimer = 0;
        revealHeld = false;
        markerHost.querySelectorAll(".repair-part-renewal").forEach((effect) => effect.remove());
        pending.clear();
        applied.clear();
        lastFocusedIndex = -1;
        lastFocusedZone = -1;
        entryOverviewPending = typeof options.overview === "function";
        markerHost.classList.remove("is-repair-overview");
        renderAll();
      },
      getState() {
        return {
          repairId,
          coins: availableCoins(),
          walletCoins,
          prepaidRemaining,
          costs: [...costs],
          applied: [...applied].sort((a, b) => a - b),
          pending: [...pending],
          initialized,
        };
      },
    });
  }

  window.SilkRoadRepairEconomy = Object.freeze({ register, MESSAGE });
})();
