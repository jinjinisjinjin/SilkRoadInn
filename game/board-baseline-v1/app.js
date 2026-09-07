const ROWS = 9;
const COLS = 7;

const itemDefs = {
  mill: {
    id: "mill",
    name: "小石磨",
    level: "Lv1",
    kind: "generator",
    icon: "./assets/generator_material_mill_04.png",
    sell: 0,
    next: null,
    detail: "点击后消耗 1 驼铃，在棋盘空位生成 1 个麦面剂。"
  },
  dough: {
    id: "dough",
    name: "麦面剂",
    level: "Lv1",
    kind: "food",
    icon: "./assets/hubing_01.png",
    sell: 1,
    next: "lubing",
    detail: "胡饼线基础食材。两个麦面剂可合成炉饼。"
  },
  lubing: {
    id: "lubing",
    name: "炉饼",
    level: "Lv2",
    kind: "food",
    icon: "./assets/hubing_02.png",
    sell: 3,
    next: "humabing",
    detail: "素烤饼，早期订单常见。两个炉饼可合成胡麻饼。"
  },
  humabing: {
    id: "humabing",
    name: "胡麻饼",
    level: "Lv3",
    kind: "food",
    icon: "./assets/hubing_03.png",
    sell: 8,
    next: "youhubing",
    detail: "撒有胡麻的烤饼。两个胡麻饼可合成油胡饼。"
  },
  youhubing: {
    id: "youhubing",
    name: "油胡饼",
    level: "Lv4",
    kind: "food",
    icon: "./assets/hubing_04.png",
    sell: 18,
    next: null,
    detail: "油润饱腹的高阶胡饼，适合远行食客。"
  },
  milk: {
    id: "milk",
    name: "鲜乳",
    level: "Lv1",
    kind: "food",
    icon: "./assets/dairy_01.png",
    sell: 2,
    next: "rumi",
    detail: "奶制品线基础食材，后续由乳畜栏产出。"
  },
  rumi: {
    id: "rumi",
    name: "乳糜",
    level: "Lv2",
    kind: "food",
    icon: "./assets/dairy_02.png",
    sell: 5,
    next: null,
    detail: "温润乳糜，适合僧侣和旅人订单。"
  },
  meat: {
    id: "meat",
    name: "肉糜馅",
    level: "Lv2",
    kind: "food",
    icon: "./assets/meat_02.png",
    sell: 5,
    next: null,
    detail: "肉食线占位体验食材。"
  },
  spice: {
    id: "spice",
    name: "胡麻",
    level: "Lv1",
    kind: "food",
    icon: "./assets/spice_01.png",
    sell: 4,
    next: null,
    detail: "香料线占位体验食材。"
  },
  fruit: {
    id: "fruit",
    name: "葡萄",
    level: "Lv1",
    kind: "food",
    icon: "./assets/fruit_01.png",
    sell: 4,
    next: null,
    detail: "果品线占位体验食材。"
  },
  drink: {
    id: "drink",
    name: "葡萄汁",
    level: "Lv1",
    kind: "food",
    icon: "./assets/drink_01.png",
    sell: 4,
    next: "drink3",
    detail: "浆饮酒水线占位体验食材。"
  },
  hubing5: {
    id: "hubing5",
    name: "葱齑胡饼",
    level: "Lv5",
    kind: "food",
    icon: "./assets/hubing_lv05_congchihubing.png",
    sell: 36,
    next: null,
    detail: "外圈高阶胡饼目标。"
  },
  dairy3: {
    id: "dairy3",
    name: "酪浆",
    level: "Lv3",
    kind: "food",
    icon: "./assets/dairy_lv03_laojiang.png",
    sell: 10,
    next: null,
    detail: "奶制品线中阶目标。"
  },
  meat3: {
    id: "meat3",
    name: "肉脯",
    level: "Lv3",
    kind: "food",
    icon: "./assets/meat_lv03_roupu.png",
    sell: 12,
    next: null,
    detail: "肉食线中阶目标。"
  },
  spice3: {
    id: "spice3",
    name: "胡椒粒",
    level: "Lv3",
    kind: "food",
    icon: "./assets/spice_lv03_hujiao_li.png",
    sell: 12,
    next: null,
    detail: "香料线中阶目标。"
  },
  fruit3: {
    id: "fruit3",
    name: "椰枣",
    level: "Lv3",
    kind: "food",
    icon: "./assets/fruit_lv03_yezao.png",
    sell: 12,
    next: null,
    detail: "果品线中阶目标。"
  },
  drink3: {
    id: "drink3",
    name: "三勒浆",
    level: "Lv3",
    kind: "food",
    icon: "./assets/drink_lv03_sanlejiang.png",
    sell: 12,
    next: null,
    detail: "浆饮酒水线中阶目标。"
  },
  material_mill_01: {
    id: "material_mill_01",
    name: "粗磨石坯",
    level: "材料1",
    kind: "material",
    icon: "./assets/generator_material_mill_01.png",
    sell: 1,
    next: "material_mill_02",
    detail: "磨坊食盒材料。两个粗磨石坯可合成更完整的磨具部件。"
  },
  material_mill_02: {
    id: "material_mill_02",
    name: "磨轴石件",
    level: "材料2",
    kind: "material",
    icon: "./assets/generator_material_mill_02.png",
    sell: 2,
    next: "material_mill_03",
    detail: "磨坊食盒材料。"
  },
  material_mill_03: {
    id: "material_mill_03",
    name: "描纹磨盘",
    level: "材料3",
    kind: "material",
    icon: "./assets/generator_material_mill_03.png",
    sell: 4,
    next: "material_mill_04",
    detail: "磨坊食盒材料。"
  },
  material_mill_04: {
    id: "material_mill_04",
    name: "小石磨胚",
    level: "材料4",
    kind: "material",
    icon: "./assets/generator_material_mill_04.png",
    sell: 8,
    next: null,
    detail: "磨坊食盒的最终材料图标，视觉上与 Lv1 小石磨衔接。"
  },
  material_milk_01: {
    id: "material_milk_01",
    name: "乳栏木料",
    level: "材料1",
    kind: "material",
    icon: "./assets/generator_material_milk_room_01.png",
    sell: 1,
    next: "material_milk_02",
    detail: "奶房食盒材料。"
  },
  material_milk_02: {
    id: "material_milk_02",
    name: "乳桶木箍",
    level: "材料2",
    kind: "material",
    icon: "./assets/generator_material_milk_room_02.png",
    sell: 2,
    next: "material_milk_03",
    detail: "奶房食盒材料。"
  },
  material_milk_03: {
    id: "material_milk_03",
    name: "乳畜栏件",
    level: "材料3",
    kind: "material",
    icon: "./assets/generator_material_milk_room_03.png",
    sell: 4,
    next: "material_milk_04",
    detail: "奶房食盒材料。"
  },
  material_milk_04: {
    id: "material_milk_04",
    name: "奶房食盒胚",
    level: "材料4",
    kind: "material",
    icon: "./assets/generator_material_milk_room_04.png",
    sell: 8,
    next: null,
    detail: "奶房食盒最终材料。"
  },
  material_meat_01: {
    id: "material_meat_01",
    name: "肉铺木架",
    level: "材料1",
    kind: "material",
    icon: "./assets/generator_material_meat_01.png",
    sell: 1,
    next: "material_meat_02",
    detail: "肉铺食盒材料。"
  },
  material_meat_02: {
    id: "material_meat_02",
    name: "烤架铜件",
    level: "材料2",
    kind: "material",
    icon: "./assets/generator_material_meat_02.png",
    sell: 2,
    next: "material_meat_03",
    detail: "肉铺食盒材料。"
  },
  material_meat_03: {
    id: "material_meat_03",
    name: "肉铺食盒胚",
    level: "材料3",
    kind: "material",
    icon: "./assets/generator_material_meat_03.png",
    sell: 4,
    next: "material_meat_04",
    detail: "肉铺食盒材料。"
  },
  material_meat_04: {
    id: "material_meat_04",
    name: "描金肉铺箱",
    level: "材料4",
    kind: "material",
    icon: "./assets/generator_material_meat_04.png",
    sell: 8,
    next: null,
    detail: "肉铺食盒最终材料。"
  },
  material_spice_01: {
    id: "material_spice_01",
    name: "香料小囊",
    level: "材料1",
    kind: "material",
    icon: "./assets/generator_material_spice_01.png",
    sell: 1,
    next: "material_spice_02",
    detail: "香料架食盒材料。"
  },
  material_spice_02: {
    id: "material_spice_02",
    name: "香匙陶罐",
    level: "材料2",
    kind: "material",
    icon: "./assets/generator_material_spice_02.png",
    sell: 2,
    next: "material_spice_03",
    detail: "香料架食盒材料。"
  },
  material_spice_03: {
    id: "material_spice_03",
    name: "香料架胚",
    level: "材料3",
    kind: "material",
    icon: "./assets/generator_material_spice_03.png",
    sell: 4,
    next: "material_spice_04",
    detail: "香料架食盒材料。"
  },
  material_spice_04: {
    id: "material_spice_04",
    name: "香料食盒胚",
    level: "材料4",
    kind: "material",
    icon: "./assets/generator_material_spice_04.png",
    sell: 8,
    next: null,
    detail: "香料架食盒最终材料。"
  },
  material_fruit_01: {
    id: "material_fruit_01",
    name: "果摊竹篾",
    level: "材料1",
    kind: "material",
    icon: "./assets/generator_material_fruit_01.png",
    sell: 1,
    next: "material_fruit_02",
    detail: "果摊食盒材料。"
  },
  material_fruit_02: {
    id: "material_fruit_02",
    name: "果篮绳结",
    level: "材料2",
    kind: "material",
    icon: "./assets/generator_material_fruit_02.png",
    sell: 2,
    next: "material_fruit_03",
    detail: "果摊食盒材料。"
  },
  material_fruit_03: {
    id: "material_fruit_03",
    name: "果摊食盒胚",
    level: "材料3",
    kind: "material",
    icon: "./assets/generator_material_fruit_03.png",
    sell: 4,
    next: "material_fruit_04",
    detail: "果摊食盒材料。"
  },
  material_fruit_04: {
    id: "material_fruit_04",
    name: "果摊食盒胚",
    level: "材料4",
    kind: "material",
    icon: "./assets/generator_material_fruit_04.png",
    sell: 8,
    next: null,
    detail: "果摊食盒最终材料。"
  },
  material_drink_01: {
    id: "material_drink_01",
    name: "酒厢陶片",
    level: "材料1",
    kind: "material",
    icon: "./assets/generator_material_drink_01.png",
    sell: 1,
    next: "material_drink_02",
    detail: "酒水厢房食盒材料。"
  },
  material_drink_02: {
    id: "material_drink_02",
    name: "酒架木件",
    level: "材料2",
    kind: "material",
    icon: "./assets/generator_material_drink_02.png",
    sell: 2,
    next: "material_drink_03",
    detail: "酒水厢房食盒材料。"
  },
  material_drink_03: {
    id: "material_drink_03",
    name: "酒水食盒胚",
    level: "材料3",
    kind: "material",
    icon: "./assets/generator_material_drink_03.png",
    sell: 4,
    next: "material_drink_04",
    detail: "酒水厢房食盒材料。"
  },
  material_drink_04: {
    id: "material_drink_04",
    name: "酒水食盒胚",
    level: "材料4",
    kind: "material",
    icon: "./assets/generator_material_drink_04.png",
    sell: 8,
    next: null,
    detail: "酒水厢房食盒最终材料。"
  }
};

const orderTemplates = [
  {
    npc: "./assets/npc_guard.png",
    reward: 16,
    need: ["lubing"]
  },
  {
    npc: "./assets/npc_sogdian.png",
    reward: 28,
    need: ["humabing", "milk", "fruit"]
  },
  {
    npc: "./assets/npc_woman.png",
    reward: 42,
    need: ["meat", "spice"]
  },
  {
    npc: "./assets/npc_envoy.png",
    reward: 32,
    need: ["youhubing"]
  }
];

const state = {
  coins: 38,
  energy: 99,
  gems: 6,
  selectedIndex: null,
  board: Array.from({ length: ROWS * COLS }, () => null),
  locks: Array.from({ length: ROWS * COLS }, () => null),
  storage: ["dough", "lubing", null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null],
  orders: structuredClone(orderTemplates)
};

const dragState = {
  active: false,
  startIndex: null,
  pointerId: null,
  startX: 0,
  startY: 0,
  moved: false,
  ghost: null
};

const unlockTargets = {
  // Near the 3x3 playable center: early goals that can be reached in the first few merges.
  15: "material_mill_01",
  16: "dough",
  17: "dough",
  18: "material_mill_01",
  19: "lubing",
  22: "material_mill_01",
  23: "lubing",
  24: "lubing",
  25: "humabing",
  26: "material_mill_02",
  29: "material_mill_01",
  33: "milk",
  36: "humabing",
  37: "material_mill_02",
  38: "material_milk_01",
  39: "rumi",
  40: "material_spice_01",
  43: "material_fruit_01",
  44: "fruit",
  45: "drink",
  46: "spice",
  47: "material_drink_01",

  // Middle ring: branch-line foods and generator materials.
  8: "material_milk_01",
  9: "milk",
  10: "material_meat_01",
  11: "meat",
  12: "material_spice_01",
  13: "spice",
  14: "material_fruit_01",
  20: "material_drink_01",
  21: "fruit",
  27: "drink",
  28: "material_mill_02",
  34: "material_milk_02",
  35: "material_meat_02",
  41: "material_spice_02",
  42: "material_fruit_02",
  48: "material_drink_02",
  49: "youhubing",
  50: "dairy3",
  51: "meat3",
  52: "spice3",
  53: "fruit3",
  54: "drink3",

  // Far edge and corners: later visual targets, visibly rarer and higher-level.
  0: "material_mill_03",
  1: "hubing5",
  2: "material_milk_03",
  3: "dairy3",
  4: "material_meat_03",
  5: "meat3",
  6: "material_spice_03",
  7: "material_fruit_03",
  55: "material_drink_03",
  56: "hubing5",
  57: "material_mill_04",
  58: "material_milk_04",
  59: "material_meat_04",
  60: "material_spice_04",
  61: "material_fruit_04",
  62: "material_drink_04"
};

function initBoard() {
  const usable = new Set();
  for (let r = 3; r <= 5; r += 1) {
    for (let c = 2; c <= 4; c += 1) usable.add(r * COLS + c);
  }

  for (let i = 0; i < ROWS * COLS; i += 1) {
    if (!usable.has(i)) state.locks[i] = unlockTargets[i] || "dough";
  }

  state.board[3 * COLS + 2] = { type: "dough" };
  state.board[3 * COLS + 3] = { type: "dough" };
  state.board[3 * COLS + 4] = { type: "material_mill_01" };
  state.board[4 * COLS + 2] = { type: "material_mill_01" };
  state.board[4 * COLS + 3] = { type: "mill" };
}

function render() {
  renderResources();
  renderOrders();
  renderBoard();
  renderPieceInfo();
}

function renderResources() {
  document.getElementById("coins").textContent = state.coins;
  document.getElementById("energy").textContent = state.energy;
  document.getElementById("gems").textContent = state.gems;
}

function renderOrders() {
  const wrap = document.getElementById("orders");
  wrap.innerHTML = "";

  state.orders.forEach((order, index) => {
    const card = document.createElement("article");
    card.className = "order-card";

    const npc = document.createElement("img");
    npc.className = "npc";
    npc.src = order.npc;
    npc.alt = "";

    const reward = document.createElement("div");
    reward.className = "reward-bubble";
    reward.innerHTML = `<img src="./assets/coin.png" alt=""> <span>${order.reward}</span>`;

    const tray = document.createElement("img");
    tray.className = "tray";
    tray.src = "./assets/order_tray_approved_front.png";
    tray.alt = "";

    const needs = document.createElement("div");
    needs.className = "need-items";
    order.need.forEach(type => {
      const img = document.createElement("img");
      img.src = itemDefs[type].icon;
      img.alt = itemDefs[type].name;
      needs.appendChild(img);
    });

    const deliver = document.createElement("button");
    deliver.type = "button";
    deliver.className = `deliver-btn${canDeliver(order) ? " ready" : ""}`;
    deliver.textContent = "交付";
    deliver.addEventListener("click", () => deliverOrder(index));

    card.append(npc, reward, tray, needs, deliver);
    wrap.appendChild(card);
  });
}

function renderBoard() {
  const board = document.getElementById("board");
  board.innerHTML = "";

  for (let i = 0; i < ROWS * COLS; i += 1) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = String(i);
    cell.role = "button";
    cell.tabIndex = 0;
    cell.setAttribute("aria-label", state.board[i] ? itemDefs[state.board[i].type].name : "棋盘格");
    if (state.selectedIndex === i) cell.classList.add("selected");
    if (state.locks[i]) {
      cell.classList.add("locked");
      cell.appendChild(pieceImage(state.locks[i], "lock-target"));
      const web = document.createElement("img");
      web.className = "lock-web";
      web.src = "./assets/locked.png";
      web.alt = "";
      cell.appendChild(web);
    }

    if (state.board[i]) {
      const type = state.board[i].type;
      cell.appendChild(pieceImage(type, itemDefs[type].kind === "generator" ? "generator" : ""));
    }

    cell.addEventListener("pointerdown", event => beginCellPointer(event, i));
    cell.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleCell(i);
      }
    });
    board.appendChild(cell);
  }
}

function pieceImage(type, extraClass = "") {
  const img = document.createElement("img");
  img.className = `piece piece-${type} ${extraClass}`.trim();
  img.src = itemDefs[type].icon;
  img.alt = itemDefs[type].name;
  img.draggable = false;
  return img;
}

function renderPieceInfo() {
  const title = document.getElementById("pieceTitle");
  const meta = document.getElementById("pieceMeta");
  const sell = document.getElementById("sellBtn");

  if (state.selectedIndex === null || !state.board[state.selectedIndex]) {
    title.textContent = "未选中";
    meta.textContent = "点击棋盘中的食材或食盒";
    sell.textContent = "出售";
    sell.classList.add("disabled");
    return;
  }

  const item = itemDefs[state.board[state.selectedIndex].type];
  title.textContent = item.name;
  meta.textContent = `${item.level} · ${item.detail}`;
  sell.textContent = item.sell > 0 ? `出售 +${item.sell}` : "不可售";
  sell.classList.toggle("disabled", item.sell <= 0);
}

function handleCell(index) {
  if (state.locks[index]) {
    unlockTargetCell(index);
    return;
  }

  const current = state.board[index];
  if (!current) {
    state.selectedIndex = null;
    render();
    return;
  }

  if (current.type === "mill" && state.selectedIndex === null) {
    generateFromMill();
    return;
  }

  if (state.selectedIndex === null) {
    state.selectedIndex = index;
    render();
    return;
  }

  if (state.selectedIndex === index) {
    state.selectedIndex = null;
    render();
    return;
  }

  const selected = state.board[state.selectedIndex];
  if (selected && selected.type === current.type && itemDefs[current.type].next) {
    const next = itemDefs[current.type].next;
    state.board[index] = { type: next };
    state.board[state.selectedIndex] = null;
    state.selectedIndex = null;
    render();
    showToast("合成成功");
    return;
  }

  state.selectedIndex = index;
  render();
}

function beginCellPointer(event, index) {
  event.preventDefault();
  dragState.active = true;
  dragState.startIndex = index;
  dragState.pointerId = event.pointerId;
  dragState.startX = event.clientX;
  dragState.startY = event.clientY;
  dragState.moved = false;
  removeDragGhost();

  const cell = event.currentTarget;
  cell.setPointerCapture?.(event.pointerId);
  cell.addEventListener("pointermove", moveCellPointer);
  cell.addEventListener("pointerup", endCellPointer, { once: true });
  cell.addEventListener("pointercancel", cancelCellPointer, { once: true });
}

function moveCellPointer(event) {
  if (!dragState.active || dragState.pointerId !== event.pointerId) return;
  const dx = event.clientX - dragState.startX;
  const dy = event.clientY - dragState.startY;
  const distance = Math.hypot(dx, dy);
  const source = state.board[dragState.startIndex];

  if (!source || state.locks[dragState.startIndex]) return;
  if (!dragState.moved && distance < 8) return;

  event.preventDefault();
  dragState.moved = true;
  if (!dragState.ghost) dragState.ghost = createDragGhost(source.type);
  positionDragGhost(event.clientX, event.clientY);
  updateStorageDropHint(event.clientX, event.clientY);
}

function endCellPointer(event) {
  const startIndex = dragState.startIndex;
  const moved = dragState.moved;
  const targetIndex = getCellIndexFromPoint(event.clientX, event.clientY);
  cleanupCellPointer(event.currentTarget, event.pointerId);

  if (!moved) {
    handleCell(startIndex);
    resetDragState();
    return;
  }

  if (isStorageDropPoint(event.clientX, event.clientY)) {
    storePiece(startIndex);
    resetDragState();
    return;
  }

  dropPiece(startIndex, targetIndex);
  resetDragState();
}

function cancelCellPointer(event) {
  cleanupCellPointer(event.currentTarget, event.pointerId);
  resetDragState();
}

function cleanupCellPointer(cell, pointerId) {
  cell.releasePointerCapture?.(pointerId);
  cell.removeEventListener("pointermove", moveCellPointer);
}

function resetDragState() {
  dragState.active = false;
  dragState.startIndex = null;
  dragState.pointerId = null;
  dragState.moved = false;
  updateStorageDropHint(null, null);
  removeDragGhost();
}

function createDragGhost(type) {
  const ghost = pieceImage(type);
  ghost.classList.add("drag-ghost");
  document.body.appendChild(ghost);
  return ghost;
}

function positionDragGhost(x, y) {
  if (!dragState.ghost) return;
  dragState.ghost.style.left = `${x}px`;
  dragState.ghost.style.top = `${y}px`;
}

function removeDragGhost() {
  if (dragState.ghost) dragState.ghost.remove();
  dragState.ghost = null;
}

function isStorageDropPoint(x, y) {
  if (x === null || y === null) return false;
  const entry = document.getElementById("storageEntry");
  if (!entry) return false;
  const rect = entry.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function updateStorageDropHint(x, y) {
  const entry = document.getElementById("storageEntry");
  if (!entry) return;
  entry.classList.toggle("drop-ready", isStorageDropPoint(x, y));
}

function firstFreeStorageSlot() {
  for (let i = 0; i < 10; i += 1) {
    if (!state.storage[i]) return i;
  }
  return -1;
}

function storePiece(index) {
  const source = state.board[index];
  if (!source || state.locks[index]) {
    render();
    return;
  }

  const slot = firstFreeStorageSlot();
  if (slot === -1) {
    state.selectedIndex = index;
    render();
    showToast("柜中已满");
    return;
  }

  state.storage[slot] = source.type;
  state.board[index] = null;
  state.selectedIndex = null;
  render();
  showToast("已暂存");
}

function getCellIndexFromPoint(x, y) {
  const cells = document.querySelectorAll(".cell");
  for (const cell of cells) {
    const rect = cell.getBoundingClientRect();
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      return Number(cell.dataset.index);
    }
  }
  return null;
}

function dropPiece(fromIndex, toIndex) {
  const source = state.board[fromIndex];
  if (!source || toIndex === null || Number.isNaN(toIndex)) {
    render();
    return;
  }

  if (fromIndex === toIndex) {
    state.selectedIndex = fromIndex;
    render();
    return;
  }

  if (state.locks[toIndex]) {
    state.selectedIndex = fromIndex;
    unlockTargetCell(toIndex);
    return;
  }

  const target = state.board[toIndex];
  if (!target) {
    state.board[toIndex] = source;
    state.board[fromIndex] = null;
    state.selectedIndex = toIndex;
    render();
    return;
  }

  if (source.type === target.type && itemDefs[source.type].next) {
    state.board[toIndex] = { type: itemDefs[source.type].next };
    state.board[fromIndex] = null;
    state.selectedIndex = null;
    render();
    showToast("合成成功");
    return;
  }

  state.selectedIndex = fromIndex;
  render();
  showToast("只能合成相同棋子");
}

function generateFromMill() {
  if (state.energy <= 0) {
    showToast("驼铃不足");
    return;
  }

  const slot = firstEmptyOpenCell();
  if (slot === -1) {
    showToast("棋盘已满");
    return;
  }

  state.energy -= 1;
  state.board[slot] = { type: "dough" };
  render();
}

function firstEmptyOpenCell() {
  for (let i = 0; i < state.board.length; i += 1) {
    if (!state.board[i] && !state.locks[i]) return i;
  }
  return -1;
}

function unlockTargetCell(index) {
  const target = state.locks[index];
  const selected = state.selectedIndex === null ? null : state.board[state.selectedIndex];
  if (!selected) {
    showToast("先点一个相同食物，再点锁定格");
    return;
  }
  if (selected.type !== target) {
    showToast(`这里需要 ${itemDefs[target].name}`);
    return;
  }

  const next = itemDefs[target].next;
  state.locks[index] = null;
  state.board[index] = { type: next || target };
  state.board[state.selectedIndex] = null;
  state.selectedIndex = null;
  render();
  setTimeout(() => {
    const cells = document.querySelectorAll(".cell");
    if (cells[index]) cells[index].classList.add("unlocking");
  }, 0);
  showToast(next ? "合成成功，沙尘散开" : "沙尘散开，格子解锁");
}

function canDeliver(order) {
  const counts = {};
  state.board.forEach(cell => {
    if (!cell) return;
    counts[cell.type] = (counts[cell.type] || 0) + 1;
  });

  return order.need.every(type => {
    counts[type] = counts[type] || 0;
    if (counts[type] <= 0) return false;
    counts[type] -= 1;
    return true;
  });
}

function deliverOrder(index) {
  const order = state.orders[index];
  if (!canDeliver(order)) {
    showToast("食物还没备齐");
    return;
  }

  order.need.forEach(type => {
    const boardIndex = state.board.findIndex(cell => cell && cell.type === type);
    if (boardIndex >= 0) state.board[boardIndex] = null;
  });

  state.coins += order.reward;
  const next = orderTemplates[(index + Math.floor(Math.random() * orderTemplates.length) + 1) % orderTemplates.length];
  state.orders[index] = {
    npc: next.npc,
    reward: next.reward + Math.floor(Math.random() * 12),
    need: [...next.need]
  };
  state.selectedIndex = null;
  render();
  showToast("订单完成");
}

function openStorage() {
  const modal = document.getElementById("storageModal");
  if (modal.classList.contains("show")) return;
  const grid = document.getElementById("cabinetGrid");
  grid.innerHTML = "";
  for (let i = 0; i < state.storage.length; i += 1) {
    const sample = state.storage[i];
    const slot = document.createElement("div");
    slot.className = "storage-slot" + (i > 9 ? " lock" : "") + (sample ? " filled" : "");
    if (sample && itemDefs[sample]) {
      const img = document.createElement("img");
      img.src = itemDefs[sample].icon;
      img.alt = itemDefs[sample].name;
      slot.appendChild(img);
    } else if (i > 9) {
      const lock = document.createElement("span");
      lock.className = "storage-lock";
      lock.textContent = "锁";
      slot.appendChild(lock);
    }
    grid.appendChild(slot);
  }
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function openDetail() {
  const name = document.getElementById("detailName");
  const copy = document.getElementById("detailCopy");

  if (state.selectedIndex === null || !state.board[state.selectedIndex]) {
    name.textContent = "棋子详情";
    copy.textContent = "点击棋盘中的食材或生成器后，这里会显示它的等级、出售价格和用途。";
  } else {
    const item = itemDefs[state.board[state.selectedIndex].type];
    name.textContent = item.name;
    copy.textContent = `${item.level}。${item.detail}`;
  }

  document.getElementById("detailModal").classList.add("show");
  document.getElementById("detailModal").setAttribute("aria-hidden", "false");
}

function closeModal(id) {
  const modal = document.getElementById(id);
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

let toastTimer = null;
function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 1300);
}

const storageEntry = document.getElementById("storageEntry");
storageEntry.addEventListener("click", openStorage);
storageEntry.addEventListener("pointerup", event => {
  event.preventDefault();
  openStorage();
});
document.getElementById("closeStorage").addEventListener("click", () => closeModal("storageModal"));
document.getElementById("storageModal").addEventListener("click", event => {
  if (event.target.id === "storageModal") closeModal("storageModal");
});

document.getElementById("pieceInfo").addEventListener("click", event => {
  if (event.target.id === "sellBtn") return;
  openDetail();
});
document.getElementById("closeDetail").addEventListener("click", () => closeModal("detailModal"));
document.getElementById("detailModal").addEventListener("click", event => {
  if (event.target.id === "detailModal") closeModal("detailModal");
});

document.getElementById("sellBtn").addEventListener("click", event => {
  event.stopPropagation();
  if (state.selectedIndex === null || !state.board[state.selectedIndex]) return;
  const item = itemDefs[state.board[state.selectedIndex].type];
  if (item.sell <= 0) {
    showToast("这个不能出售");
    return;
  }
  state.coins += item.sell;
  state.board[state.selectedIndex] = null;
  state.selectedIndex = null;
  render();
  showToast("已出售");
});

document.getElementById("repairEntry").addEventListener("click", () => showToast("修缮入口：正式接入时切到流沙驿"));
document.getElementById("bagEntry").addEventListener("click", () => showToast("行囊：礼盒包入口占位"));
document.getElementById("innEntry").addEventListener("click", () => showToast("流沙驿入口占位"));

initBoard();
render();
