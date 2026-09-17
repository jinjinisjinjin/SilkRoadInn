(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const NEW_PLAYER_GUIDE_QA_MODE = params.get("qa") === "new-player-guide-v1";
  if (params.has("qa") && !NEW_PLAYER_GUIDE_QA_MODE) return;

  const GAME_SAVE_KEY = NEW_PLAYER_GUIDE_QA_MODE
    ? "silkroad_tavern_proto_v02_qa_new_player_guide_v1"
    : "silkroad_tavern_proto_v02";
  const GUIDE_SAVE_KEY = NEW_PLAYER_GUIDE_QA_MODE
    ? "silkroad_new_player_guide_v1_qa"
    : "silkroad_new_player_guide_v1";
  if (NEW_PLAYER_GUIDE_QA_MODE && params.get("reset") === "1") {
    localStorage.removeItem(GAME_SAVE_KEY);
    localStorage.removeItem(GUIDE_SAVE_KEY);
  }
  const TARGET_CLASS = "new-player-guide-target";
  const FIRST_ORDER_ID = "order_001_guard_lubing";
  const FIRST_REPAIR_ID = "tutorial_complete";
  const LOCKED_MERGE_ITEM_ID = "hubing_01_dough";
  const LOCKED_MERGE_ITEM_NAME = "麦面剂";

  let layer;
  let card;
  let copy;
  let pointer;
  let acknowledgeButton;
  let refreshTimer;
  let currentTargets = [];

  function readJson(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || "") || fallback;
    } catch {
      return fallback;
    }
  }

  function gameState() {
    return readJson(GAME_SAVE_KEY, {});
  }

  function guideState() {
    return readJson(GUIDE_SAVE_KEY, {});
  }

  function updateGuideState(patch) {
    localStorage.setItem(GUIDE_SAVE_KEY, JSON.stringify({ ...guideState(), ...patch }));
  }

  function createLayer() {
    const app = document.querySelector("#app");
    if (!app || document.querySelector("#newPlayerGuide")) return;
    layer = document.createElement("aside");
    layer.id = "newPlayerGuide";
    layer.className = "new-player-guide-layer";
    layer.hidden = true;
    layer.setAttribute("aria-live", "polite");
    layer.innerHTML = `
      <section class="new-player-guide-card" aria-label="新手引导">
        <div class="new-player-guide-portrait-frame">
          <img class="new-player-guide-portrait" src="./assets/keeper_story_portrait_v2.png" alt="掌柜" />
        </div>
        <div class="new-player-guide-copy">
          <small>掌柜指引</small>
          <p></p>
          <button class="new-player-guide-ack" type="button" hidden>明白</button>
        </div>
        <button class="new-player-guide-skip" type="button" aria-label="跳过新手引导" title="跳过引导">×</button>
      </section>
      <i class="new-player-guide-pointer" aria-hidden="true"></i>
    `;
    app.append(layer);
    card = layer.querySelector(".new-player-guide-card");
    copy = layer.querySelector(".new-player-guide-copy p");
    pointer = layer.querySelector(".new-player-guide-pointer");
    acknowledgeButton = layer.querySelector(".new-player-guide-ack");

    layer.querySelector(".new-player-guide-skip").addEventListener("click", () => {
      updateGuideState({ dismissed: true });
      hideGuide();
    });
    acknowledgeButton.addEventListener("click", () => {
      updateGuideState({ coreTipSeen: true });
      hideGuide();
    });
  }

  function isVisible(element) {
    if (!element || element.hidden) return false;
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function boardCellFor(itemId, state) {
    const index = Array.isArray(state.board) ? state.board.indexOf(itemId) : -1;
    if (index >= 0) return document.querySelector(`.cell[data-index="${index}"]`);
    if (itemId === "gen_mill_01") return document.querySelector(".cell .item.generator")?.closest(".cell") || null;
    return null;
  }

  function doughCells(state) {
    if (Array.isArray(state.board)) {
      return state.board
        .map((itemId, index) => itemId === "hubing_01_dough" ? document.querySelector(`.cell[data-index="${index}"]`) : null)
        .filter(isVisible);
    }
    return [...document.querySelectorAll('.cell img[alt="麦面剂"]')]
      .map((image) => image.closest(".cell"))
      .filter(isVisible);
  }

  function clearTargets() {
    currentTargets.forEach((target) => target?.classList.remove(TARGET_CLASS));
    currentTargets = [];
  }

  function hideGuide() {
    clearTargets();
    if (!layer) return;
    layer.hidden = true;
    pointer.hidden = true;
    pointer.classList.remove("drag-path", "points-up", "points-right", "points-left");
  }

  function positionPointer(targets, drag) {
    if (!targets.length || !targets.every(isVisible)) {
      pointer.hidden = true;
      return;
    }
    const appRect = document.querySelector("#app").getBoundingClientRect();
    const first = targets[0].getBoundingClientRect();
    const firstCenterX = first.left - appRect.left + first.width / 2;
    const firstCenterY = first.top - appRect.top + first.height / 2;
    const targetOnRight = firstCenterX > appRect.width * 0.58;
    card.style.left = targetOnRight ? "14px" : "auto";
    card.style.right = targetOnRight ? "auto" : "14px";
    pointer.hidden = false;
    pointer.classList.toggle("drag-path", Boolean(drag && targets[1]));
    pointer.classList.remove("points-up", "points-right", "points-left");

    if (drag && targets[1]) {
      const second = targets[1].getBoundingClientRect();
      const secondCenterX = second.left - appRect.left + second.width / 2;
      const secondCenterY = second.top - appRect.top + second.height / 2;
      pointer.style.left = `${firstCenterX - 12}px`;
      pointer.style.top = `${firstCenterY - 12}px`;
      pointer.style.setProperty("--guide-dx", `${secondCenterX - firstCenterX}px`);
      pointer.style.setProperty("--guide-dy", `${secondCenterY - firstCenterY}px`);
      return;
    }

    const nearBottom = first.bottom - appRect.top > appRect.height - 112;
    if (nearBottom) {
      pointer.style.left = `${Math.max(6, first.left - appRect.left - 36)}px`;
      pointer.style.top = `${firstCenterY - 12}px`;
      pointer.style.setProperty("--guide-dx", "0px");
      pointer.style.setProperty("--guide-dy", "0px");
      pointer.classList.add("points-right");
      return;
    }

    const nearLeft = first.left - appRect.left < 72;
    if (nearLeft) {
      pointer.style.left = `${first.right - appRect.left + 12}px`;
      pointer.style.top = `${firstCenterY - 12}px`;
      pointer.style.setProperty("--guide-dx", "0px");
      pointer.style.setProperty("--guide-dy", "0px");
      pointer.classList.add("points-left");
      return;
    }

    const above = first.top - appRect.top - 36;
    const placeBelow = above < 8;
    pointer.style.left = `${Math.max(6, Math.min(appRect.width - 30, firstCenterX - 12))}px`;
    pointer.style.top = `${placeBelow ? first.bottom - appRect.top + 12 : above}px`;
    pointer.style.setProperty("--guide-dx", "0px");
    pointer.style.setProperty("--guide-dy", "0px");
    pointer.classList.toggle("points-up", placeBelow);
  }

  function showGuide({ text, targets = [], drag = false, acknowledge = false }) {
    clearTargets();
    currentTargets = targets.filter(isVisible);
    currentTargets.forEach((target) => target.classList.add(TARGET_CLASS));
    copy.textContent = text;
    acknowledgeButton.hidden = !acknowledge;
    layer.hidden = false;
    requestAnimationFrame(() => positionPointer(currentTargets, drag));
  }

  function blockingDialogOpen() {
    return [...document.querySelectorAll("dialog[open]")].some((dialog) => dialog.open);
  }

  function boardIsFull(state) {
    if (!Array.isArray(state.board)) return false;
    const usableCells = [...document.querySelectorAll("#board .cell:not(.locked)")]
      .filter(isVisible);
    return usableCells.length > 0 && usableCells.every((cell) => {
      const index = Number(cell.dataset.index);
      return Number.isInteger(index) && Boolean(state.board[index]);
    });
  }

  function repairTarget() {
    return document.querySelector(".longscroll-current-region")
      || document.querySelector(".mainline-action.ready");
  }

  function lockedMergeTarget(state, savedGuide) {
    const storedIndex = Number(savedGuide.lockedMergeTargetIndex);
    if (Number.isInteger(storedIndex)) {
      const unlocked = Array.isArray(state.unlockedCells) && state.unlockedCells.includes(storedIndex);
      const storedCell = document.querySelector(`.cell[data-index="${storedIndex}"]`);
      if (unlocked || (storedCell && !storedCell.classList.contains("locked"))) {
        updateGuideState({ lockedMergeSeen: true });
        return null;
      }
      if (storedCell?.classList.contains("locked")) return storedCell;
    }
    const target = [...document.querySelectorAll(".cell.locked")]
      .find((cell) => cell.getAttribute("aria-label") === LOCKED_MERGE_ITEM_NAME);
    if (target) updateGuideState({ lockedMergeTargetIndex: Number(target.dataset.index) });
    return target || null;
  }

  function showLockedMergeGuide(state, savedGuide, page) {
    if (savedGuide.lockedMergeSeen) return false;
    if (page === "inn") {
      showGuide({
        text: "先回后厨，学会用相同食物解开风沙棋格。",
        targets: [document.querySelector("#innKitchenBtn")],
      });
      return true;
    }
    const target = lockedMergeTarget(state, savedGuide);
    if (!target) return false;
    const source = boardCellFor(LOCKED_MERGE_ITEM_ID, state);
    if (!source) {
      showGuide({
        text: "锁格里压着一份麦面。先点小石磨，做一份相同的麦面。",
        targets: [boardCellFor("gen_mill_01", state), target],
      });
      return true;
    }
    showGuide({
      text: "把麦面拖到锁格里的相同麦面上；两份合成时，这格也会一起解开。",
      targets: [source, target],
      drag: true,
    });
    return true;
  }

  function refresh() {
    if (!layer) createLayer();
    if (!layer) return;
    const startup = document.querySelector("#startupLoading");
    const app = document.querySelector("#app");
    const savedGuide = guideState();
    if (savedGuide.dismissed || !app || (startup && !startup.hidden) || blockingDialogOpen()) {
      hideGuide();
      return;
    }

    const state = gameState();
    const tutorialStep = Number.isInteger(state.tutorialStep) ? state.tutorialStep : 0;
    const page = app.dataset.page || "inn";

    if (page === "board" && !savedGuide.boardStorageSeen && boardIsFull(state)) {
      showGuide({
        text: "案板放满了。把暂时不用的棋子拖进左下角柜子，腾出空格后再继续备餐。",
        targets: [document.querySelector("#storageBtn")],
      });
      return;
    }

    if (savedGuide.completed) {
      hideGuide();
      return;
    }

    if (tutorialStep <= 3 && page === "inn") {
      const returnCopy = [
        "点右下角的后厨入口，回案板取第一份麦面。",
        "回到后厨，再备一份麦面并合成炉饼。",
        "炉饼已经做好，回后厨交给周甲。",
        "首单已经完成，回后厨看看刚收录的食物。",
      ];
      showGuide({
        text: returnCopy[tutorialStep],
        targets: [document.querySelector("#innKitchenBtn")],
      });
      return;
    }

    if (tutorialStep === 0 && page === "board") {
      showGuide({
        text: "点案板中央的小石磨，取第一份麦面。",
        targets: [boardCellFor("gen_mill_01", state)],
      });
      return;
    }

    if (tutorialStep === 1 && page === "board") {
      const dough = doughCells(state);
      if (dough.length < 2) {
        showGuide({
          text: "再点一次小石磨，备齐两份麦面。",
          targets: [boardCellFor("gen_mill_01", state)],
        });
      } else {
        showGuide({
          text: "按住一份麦面，拖到另一份上，合成炉饼。",
          targets: dough.slice(0, 2),
          drag: true,
        });
      }
      return;
    }

    if (tutorialStep === 2 && page === "board") {
      const order = [...document.querySelectorAll(".order-card.ready")]
        .find((card) => card.getAttribute("aria-label")?.includes("沙州驿卒"));
      showGuide({
        text: "炉饼做好了。点上方的交付，把热饼递给周甲。",
        targets: [order?.querySelector(".deliver-btn") || order],
      });
      return;
    }

    if (tutorialStep === 3 && page === "board") {
      showGuide({
        text: "新食谱已经记下。点卷轴，看看《丝路食鉴》。",
        targets: [document.querySelector("#boardCodexBtn")],
      });
      return;
    }

    if (tutorialStep < 4) {
      hideGuide();
      return;
    }

    const repairs = state.renovationChoices || {};
    if (repairs[FIRST_REPAIR_ID]) {
      updateGuideState({ completed: true });
      hideGuide();
      return;
    }
    const firstOrderDone = Array.isArray(state.completedOrderIds) && state.completedOrderIds.includes(FIRST_ORDER_ID);
    if (!firstOrderDone) {
      hideGuide();
      return;
    }

    if (showLockedMergeGuide(state, savedGuide, page)) return;

    if (page === "board") {
      showGuide({
        text: "去流沙驿看看前厅；铜钱不够时，继续接单就能攒起来。",
        targets: [document.querySelector("#stationHudBtn") || document.querySelector("#repairSideBtn")],
      });
      return;
    }

    showGuide({
      text: "长卷上的亮处就是下一处修缮点，有铜钱就能逐处修好前厅。",
      targets: [repairTarget()],
    });
  }

  function scheduleRefresh(delay = 40) {
    clearTimeout(refreshTimer);
    refreshTimer = setTimeout(refresh, delay);
  }

  function bindRefreshSignals() {
    const observer = new MutationObserver(() => scheduleRefresh());
    document.addEventListener("click", (event) => {
      if (event.target.closest("#storageBtn") && boardIsFull(gameState())) {
        updateGuideState({ boardStorageSeen: true });
      }
      if (event.target.closest(".longscroll-current-region, .mainline-action.ready") && Number(gameState().tutorialStep || 0) >= 4) {
        updateGuideState({ completed: true });
      }
      scheduleRefresh(100);
    }, true);
    document.querySelectorAll("dialog").forEach((dialog) => {
      dialog.addEventListener("close", () => scheduleRefresh(80));
      observer.observe(dialog, { attributes: true, attributeFilter: ["open"] });
    });
    const app = document.querySelector("#app");
    const board = document.querySelector("#board");
    const orders = document.querySelector("#orders");
    const startup = document.querySelector("#startupLoading");
    if (app) observer.observe(app, { attributes: true, attributeFilter: ["class", "data-page"] });
    if (board) observer.observe(board, { childList: true });
    if (orders) observer.observe(orders, { childList: true });
    if (startup) observer.observe(startup, { attributes: true, attributeFilter: ["hidden", "class", "data-state"] });
    window.addEventListener("resize", () => scheduleRefresh());
  }

  function initialize() {
    createLayer();
    bindRefreshSignals();
    scheduleRefresh(80);
    setTimeout(() => scheduleRefresh(), 1200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize, { once: true });
  } else {
    initialize();
  }
})();
