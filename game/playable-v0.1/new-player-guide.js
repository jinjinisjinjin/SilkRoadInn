(function () {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const NEW_PLAYER_GUIDE_QA_MODE = params.get("qa") === "new-player-guide-v1";
  const FULL_GAME_TRIAL_MODE = params.get("trial") === "full-game-v1";
  if (params.has("qa") && !NEW_PLAYER_GUIDE_QA_MODE) return;

  const GAME_SAVE_KEY = NEW_PLAYER_GUIDE_QA_MODE
    ? "silkroad_tavern_proto_v02_qa_new_player_guide_v1"
    : FULL_GAME_TRIAL_MODE
      ? "silkroad_tavern_proto_v02_trial_full_game_v1"
      : "silkroad_tavern_proto_v02";
  const GUIDE_SAVE_KEY = NEW_PLAYER_GUIDE_QA_MODE
    ? "silkroad_new_player_guide_v1_qa"
    : FULL_GAME_TRIAL_MODE
      ? "silkroad_new_player_guide_v1_trial_full_game_v1"
      : "silkroad_new_player_guide_v1";
  if ((NEW_PLAYER_GUIDE_QA_MODE || FULL_GAME_TRIAL_MODE) && params.get("reset") === "1") {
    localStorage.removeItem(GAME_SAVE_KEY);
    localStorage.removeItem(GUIDE_SAVE_KEY);
  }
  const TARGET_CLASS = "new-player-guide-target";
  const FIRST_ORDER_ID = "order_001_guard_lubing";
  const FIRST_REPAIR_ID = "tutorial_complete";
  const LOCKED_MERGE_ITEM_NAME = "麦面剂";
  const LOCKED_MERGE_TARGET_INDEX = 16;

  let layer;
  let card;
  let copy;
  let pointer;
  let acknowledgeButton;
  let refreshTimer;
  let currentTargets = [];
  let storageLessonActive = false;
  let storageDragging = false;
  let storageContext = null;
  let storageSourceIndex = null;
  let storageSuccessUntil = 0;
  let dragFood;

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

  function retireCoreGuide(patch) {
    updateGuideState(patch);
    window.dispatchEvent(new CustomEvent("silkroad:new-player-guide-retired", { detail: patch }));
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
          <button class="new-player-guide-ack" type="button" hidden>继续接单</button>
        </div>
        <button class="new-player-guide-skip" type="button" aria-label="跳过新手引导" title="跳过引导">×</button>
      </section>
      <i class="new-player-guide-pointer" aria-hidden="true"><img class="new-player-guide-drag-food" alt="" hidden /></i>
    `;
    app.append(layer);
    card = layer.querySelector(".new-player-guide-card");
    copy = layer.querySelector(".new-player-guide-copy p");
    pointer = layer.querySelector(".new-player-guide-pointer");
    dragFood = layer.querySelector(".new-player-guide-drag-food");
    acknowledgeButton = layer.querySelector(".new-player-guide-ack");

    layer.querySelector(".new-player-guide-skip").addEventListener("click", () => {
      if (storageLessonActive || storageSuccessUntil) {
        storageLessonActive = false;
        storageSuccessUntil = 0;
        updateGuideState({ boardStorageSeen: true });
      } else {
        retireCoreGuide({ dismissed: true });
      }
      hideGuide();
    });
    acknowledgeButton.addEventListener("click", () => {
      retireCoreGuide({ completed: true });
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
    dragFood.hidden = true;
    layer.classList.remove("storage-lesson", "storage-success");
    pointer.classList.remove("drag-path", "points-up", "points-right", "points-left");
  }

  function positionPointer(targets, drag) {
    if (!targets.length || !targets.every(isVisible)) {
      pointer.hidden = true;
      return;
    }
    if (layer.classList.contains("storage-lesson")) {
      positionStorageLesson(targets, drag);
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
      // Both tap and drag cues use the same fingertip anchor at target center.
      const pointerLeft = firstCenterX - 12;
      const pointerTop = firstCenterY - 4;
      const fingertipX = pointerLeft + 12;
      const fingertipY = pointerTop + 4;
      pointer.style.left = `${pointerLeft}px`;
      pointer.style.top = `${pointerTop}px`;
      pointer.style.setProperty("--guide-dx", `${secondCenterX - fingertipX}px`);
      pointer.style.setProperty("--guide-dy", `${secondCenterY - fingertipY}px`);
      return;
    }

    pointer.style.left = `${Math.max(0, Math.min(appRect.width - 40, firstCenterX - 12))}px`;
    pointer.style.top = `${Math.max(0, Math.min(appRect.height - 46, firstCenterY - 4))}px`;
    pointer.style.setProperty("--guide-dx", "0px");
    pointer.style.setProperty("--guide-dy", "0px");
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

  function storageTutorialSource() {
    const indices = storageContext?.recommended ?? [];
    if (!indices.includes(storageSourceIndex)) storageSourceIndex = indices[0] ?? null;
    return storageSourceIndex === null ? null
      : document.querySelector(`.cell[data-index="${storageSourceIndex}"]`);
  }

  function positionStorageLesson(targets, drag) {
    pointer.classList.toggle("drag-path", Boolean(drag && targets.length === 2));
    pointer.classList.remove("points-up", "points-right", "points-left");
    const appRect = document.querySelector("#app").getBoundingClientRect();
    const boardRect = document.querySelector("#board").getBoundingClientRect();
    // A short strip above the board leaves every cell and the cabinet reachable.
    card.style.left = "8px";
    card.style.right = "8px";
    card.style.top = `${Math.max(6, boardRect.top - appRect.top - card.offsetHeight - 8)}px`;
    card.style.bottom = "auto";
    pointer.hidden = storageDragging || !drag || targets.length !== 2;
    if (pointer.hidden) return;
    const source = targets[0].getBoundingClientRect();
    const destination = targets[1].getBoundingClientRect();
    const x = source.left - appRect.left + source.width / 2;
    const y = source.top - appRect.top + source.height / 2;
    pointer.style.left = `${x}px`;
    pointer.style.top = `${y}px`;
    pointer.style.setProperty("--guide-dx", `${destination.left + destination.width / 2 - appRect.left - x}px`);
    pointer.style.setProperty("--guide-dy", `${destination.top + destination.height / 2 - appRect.top - y}px`);
    pointer.style.setProperty("--guide-food-size", `${source.width * 0.8}px`);
  }

  function showStorageLesson({ success = false } = {}) {
    const source = success ? null : storageTutorialSource();
    const storage = document.querySelector("#storageBtn");
    layer.classList.add("storage-lesson");
    layer.classList.toggle("storage-success", success);
    layer.querySelector(".new-player-guide-skip").setAttribute("aria-label", "关闭收纳提示");
    const text = success
      ? "已收好，需要时点柜子取回。"
      : storageDragging ? "拖到左下角柜子，松手收好。"
        : source ? "案板放满了。把这枚食材拖进柜子，腾出一个空位。"
          : "案板放满了。选一枚你想暂存的食材，拖进左下角柜子。";
    showGuide({ text, targets: storageDragging || success || !source ? [storage] : [source, storage],
      drag: Boolean(source && !storageDragging && !success) });
    if (source) {
      const src = source.querySelector("img")?.src;
      if (src && dragFood.src !== src) dragFood.src = src;
    }
    dragFood.hidden = !source || storageDragging || success;
  }

  function repairTarget() {
    return document.querySelector(".longscroll-current-region")
      || document.querySelector(".mainline-action.ready");
  }

  function lockedMergeTarget(state, savedGuide) {
    const target = document.querySelector(`.cell[data-index="${LOCKED_MERGE_TARGET_INDEX}"]`);
    const unlocked = Array.isArray(state.unlockedCells)
      && state.unlockedCells.includes(LOCKED_MERGE_TARGET_INDEX);
    if (unlocked || (target && !target.classList.contains("locked"))) {
      updateGuideState({ lockedMergeSeen: true, lockedMergeTargetIndex: LOCKED_MERGE_TARGET_INDEX });
      return null;
    }
    if (target?.classList.contains("locked")
      && target.getAttribute("aria-label") === LOCKED_MERGE_ITEM_NAME) {
      updateGuideState({ lockedMergeTargetIndex: LOCKED_MERGE_TARGET_INDEX });
      return target;
    }
    return null;
  }

  function refresh() {
    if (!layer) createLayer();
    if (!layer) return;
    const startup = document.querySelector("#startupLoading");
    const app = document.querySelector("#app");
    const savedGuide = guideState();
    const repairPlayer = document.querySelector("#repairPlayerLayer");
    if (!app || (startup && !startup.hidden) || blockingDialogOpen() || (repairPlayer && !repairPlayer.hidden)) {
      hideGuide();
      return;
    }

    const state = gameState();
    const tutorialStep = Number.isInteger(state.tutorialStep) ? state.tutorialStep : 0;
    const page = app.dataset.page || "inn";
    if (page === "board" && storageSuccessUntil > Date.now()) {
      showStorageLesson({ success: true });
      return;
    }
    if (storageLessonActive) {
      window.dispatchEvent(new Event("silkroad:storage-guide-request"));
      if (page !== "board" || !boardIsFull(state) || !storageContext?.canStore) {
        storageLessonActive = false;
        storageDragging = false;
        hideGuide();
        return;
      }
      showStorageLesson();
      return;
    }
    hideGuide();
    card.style.top = "";
    card.style.bottom = "";
    layer.querySelector(".new-player-guide-skip").setAttribute("aria-label", "跳过新手引导");
    // Contextual storage help must never rewind the player's core onboarding.
    if (savedGuide.dismissed || savedGuide.coreHintsRetired) return;

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
        text: "先点案板中央的小石磨，生成一份麦面剂。",
        targets: [boardCellFor("gen_mill_01", state)],
      });
      return;
    }

    if (tutorialStep === 1 && page === "board") {
      const dough = doughCells(state);
      const lockedTarget = lockedMergeTarget(state, savedGuide);
      if (!dough.length) {
        showGuide({
          text: "再点一次小石磨，生成一份麦面剂。",
          targets: [boardCellFor("gen_mill_01", state)],
        });
      } else if (lockedTarget) {
        showGuide({
          text: "麦面剂做好了。把它拖到左边锁格里的相同食物上，解开棋格并合成炉饼。",
          targets: [dough[0], lockedTarget],
          drag: true,
        });
      } else if (dough.length >= 2) {
        showGuide({ text: "把两份麦面剂拖到一起，合成炉饼。", targets: [dough[0], dough[1]], drag: true });
      } else {
        showGuide({ text: "再点小石磨，备一份麦面剂来合成炉饼。", targets: [boardCellFor("gen_mill_01", state)] });
      }
      return;
    }

    if (tutorialStep === 2 && page === "board") {
      const order = [...document.querySelectorAll(".order-card.ready")]
        .find((card) => card.getAttribute("aria-label")?.includes("沙州驿卒"));
      showGuide({
        text: "炉饼做好了。点上方的交付，把热饼递给沙州驿卒周甲。",
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

    if (tutorialStep === 4) {
      if (page === "inn") {
        showGuide({
          text: "回到后厨，再打开《丝路食鉴》看看食物详情。",
          targets: [document.querySelector("#innKitchenBtn")],
        });
        return;
      }
      showGuide({
        text: "再打开《丝路食鉴》，点一下已点亮的小图查看详情。",
        targets: [document.querySelector("#boardCodexBtn")],
      });
      return;
    }

    if (tutorialStep < 5) {
      hideGuide();
      return;
    }

    const repairs = state.renovationChoices || {};
    if (repairs[FIRST_REPAIR_ID]) {
      if (page === "inn") {
        showGuide({
          text: "前厅已经修好了。点右下角返回后厨，继续接待新的客人。",
          targets: [document.querySelector("#innKitchenBtn")],
        });
        return;
      }
      const nextOrder = document.querySelector("#orders .order-card");
      showGuide({
        text: "新的订单已经来了。继续制作客人需要的食物，赚铜钱修缮下一处。",
        targets: [nextOrder || document.querySelector("#orders")],
        acknowledge: true,
      });
      return;
    }
    const firstRepairParts = Array.isArray(state.repairProgress?.[FIRST_REPAIR_ID]?.completedParts)
      ? state.repairProgress[FIRST_REPAIR_ID].completedParts
      : [];
    if (firstRepairParts.length > 0) {
      if (page === "inn") {
        showGuide({
          text: "第一件已经修好了。点右下角返回后厨，继续接单攒下一件的铜钱。",
          targets: [document.querySelector("#innKitchenBtn")],
        });
        return;
      }
      const nextOrder = document.querySelector("#orders .order-card");
      showGuide({
        text: "已经完成一次赚钱与修缮。继续制作新订单需要的食物，逐件修好前厅。",
        targets: [nextOrder || document.querySelector("#orders")],
        acknowledge: true,
      });
      return;
    }
    const firstOrderDone = Array.isArray(state.completedOrderIds) && state.completedOrderIds.includes(FIRST_ORDER_ID);
    if (!firstOrderDone) {
      hideGuide();
      return;
    }

    if (page === "board") {
      showGuide({
        text: "首单赚到的 10 枚铜钱，正好能修好第一件。点右下角回流沙驿。",
        targets: [document.querySelector("#stationHudBtn") || document.querySelector("#repairSideBtn")],
      });
      return;
    }

    showGuide({
      text: "第一件所需的铜钱已经备齐。点长卷上的亮处，先听听门前客人的话，再开始修缮。",
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
      scheduleRefresh(100);
    }, true);
    window.addEventListener("silkroad:storage-guide-context", (event) => {
      storageContext = event.detail;
    });
    window.addEventListener("silkroad:board-full-attempt", (event) => {
      if (guideState().boardStorageSeen) return;
      storageContext = event.detail;
      if (!storageContext?.canStore || !storageContext.storable.length) return;
      event.preventDefault();
      storageLessonActive = true;
      storageDragging = false;
      storageSourceIndex = null;
      updateGuideState({ coreHintsRetired: true });
      scheduleRefresh(0);
    });
    window.addEventListener("silkroad:board-item-press", (event) => {
      if (!storageLessonActive || event.detail.locked
        || !storageContext?.storable.includes(event.detail.index)) return;
      storageDragging = true;
      // Stop the demo immediately, before the real drag ghost is created.
      if (pointer) pointer.hidden = true;
      refresh();
    });
    window.addEventListener("silkroad:board-item-release", () => {
      storageDragging = false;
      scheduleRefresh(100);
    });
    window.addEventListener("silkroad:storage-deposit", () => {
      const wasActive = storageLessonActive;
      storageLessonActive = false;
      storageDragging = false;
      updateGuideState({ boardStorageSeen: true });
      if (wasActive) {
        storageSuccessUntil = Date.now() + 2400;
        setTimeout(() => { storageSuccessUntil = 0; scheduleRefresh(0); }, 2450);
      }
      scheduleRefresh(0);
    });
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
