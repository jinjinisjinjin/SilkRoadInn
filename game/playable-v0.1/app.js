const DATA_PATH = "./data/";
const SAVE_KEY = "silkroad_tavern_proto_v02";
const NPC_STANDEE_VERSION = "standee-size-02";
const BOARD_COLUMNS = 7;
const BOARD_ROWS = 9;
const BOARD_SIZE = BOARD_COLUMNS * BOARD_ROWS;
const STORAGE_FREE_SLOTS = 10;
const STORAGE_TOTAL_SLOTS = 28;
const ACTIVE_BOARD_COLUMNS = 3;
const ACTIVE_BOARD_ROWS = 3;
const ACTIVE_BOARD_START_COL = 2;
const ACTIVE_BOARD_START_ROW = 3;
const REPAIR_GATE_SEQUENCE = [
  "order_001_guard_lubing",
  "order_002_farmer_dough",
  "order_011_dunhuang_woman_lubing",
  "order_020_guard_lubing_bundle",
  "order_003_sogdian_humabing",
  "order_005_monk_humabing",
  "order_013_temple_donor_humabing",
  "order_014_musician_youhubing",
  "order_004_changan_lubing",
  "order_006_camel_worker_youhubing",
  "order_007_persian_attendant_congchi",
  "order_008_uighur_yangrou",
  "order_009_mystery_suibing",
  "order_010_caravan_gulouzi",
  "order_015_monk_rumi",
  "order_016_uighur_milk",
  "order_017_temple_laojiang",
  "order_018_traveler_lubing_rumi",
  "order_019_sogdian_huma_laojiang",
  "order_demo_board_combo_01",
  "order_demo_board_combo_02",
  "order_demo_board_combo_03",
  "order_021_lanes_continuation",
  "order_022_shed_continuation",
  "order_023_court_continuation",
  "order_024_lantern_continuation",
];
const CHAPTER_NAMES = {
  1: "流沙驿初明",
  2: "西市烟火",
  3: "楼馆通途",
  4: "灯火连城",
};
const BUILD_MODE = new URLSearchParams(location.search).get("mode") === "release" ? "release" : "dev";
const INN_PACKAGE_ASSETS = [
  "./assets/ui/ui_station_tavern.png",
  "./assets/keeper_portrait.png",
  "./assets/npc_standee/npc_dunhuang_woman.png",
  "./assets/npc_standee/npc_farmer.png",
  "./assets/npc_standee/npc_temple_donor.png",
  "./assets/npc_standee/npc_caravan_leader.png",
];
const LONGSCROLL_ROOT = "../../art/longscroll";
const LONGSCROLL_REGION_BOUNDS = {
  1: [405, 487, 317, 269], 2: [488, 327, 300, 207], 3: [738, 339, 320, 230], 4: [298, 274, 258, 232],
  5: [233, 472, 243, 190], 6: [665, 539, 281, 320], 7: [550, 26, 361, 334], 8: [386, 42, 281, 239],
  9: [264, 69, 135, 197], 10: [876, 41, 378, 396], 11: [933, 401, 321, 488], 12: [53, 257, 330, 289],
  13: [21, 7, 239, 304], 14: [0, 0, 1254, 591], 15: [0, 482, 331, 289], 16: [0, 744, 489, 258],
  17: [532, 746, 204, 170], 18: [286, 665, 300, 179], 19: [490, 851, 215, 161], 20: [283, 914, 290, 222],
  21: [7, 982, 353, 272], 22: [197, 1089, 226, 165], 23: [0, 968, 66, 219], 24: [314, 1144, 356, 110],
  25: [504, 943, 529, 311], 26: [710, 743, 544, 351], 27: [1011, 1009, 243, 245],
};
const GIFT_PACKS = {
  gift_milk_room_parts_01: {
    name: "奶房木件包",
    itemId: "gift_pack_starter",
    description: "前期修缮奖励，主要产出奶房食盒材料。",
    rewards: [
      { type: "item", itemId: "boxmat_milk_room_01", quantity: 1 },
      { type: "item", itemId: "boxmat_milk_room_01", quantity: 1 },
      { type: "coins", amount: 12 },
      { type: "item", itemId: "boxmat_milk_room_01", quantity: 1 },
      { type: "item", itemId: "boxmat_milk_room_01", quantity: 1 },
      { type: "item", itemId: "boxmat_milk_room_01", quantity: 1 },
      { type: "coins", amount: 18 },
      { type: "item", itemId: "boxmat_milk_room_01", quantity: 1 },
      { type: "item", itemId: "boxmat_milk_room_01", quantity: 1 },
      { type: "item", itemId: "boxmat_milk_room_01", quantity: 1 },
    ],
  },
  gift_livestock_pen_parts_01: {
    name: "栏圈木桩包",
    itemId: "gift_pack_starter",
    description: "第三次修缮奖励，主要产出乳畜栏材料。",
    rewards: [
      { type: "item", itemId: "boxmat_livestock_pen_01", quantity: 1 },
      { type: "item", itemId: "boxmat_livestock_pen_01", quantity: 1 },
      { type: "coins", amount: 18 },
      { type: "item", itemId: "boxmat_livestock_pen_01", quantity: 1 },
      { type: "item", itemId: "boxmat_livestock_pen_01", quantity: 1 },
      { type: "item", itemId: "boxmat_livestock_pen_01", quantity: 1 },
      { type: "coins", amount: 24 },
      { type: "item", itemId: "boxmat_livestock_pen_01", quantity: 1 },
      { type: "item", itemId: "boxmat_livestock_pen_01", quantity: 1 },
      { type: "item", itemId: "boxmat_livestock_pen_01", quantity: 1 },
    ],
  },
};
const LOCKED_CELL_ITEM_ROWS = [
  ["hubing_05_congchihubing", "dairy_04_ganlao", "boxmat_livestock_pen_01", "hubing_06_yangrouhubing", "dairy_05_suyou", "hubing_07_suibing", "boxmat_livestock_pen_01"],
  ["hubing_04_youhubing", "dairy_03_laojiang", "hubing_05_congchihubing", "boxmat_milk_room_01", "dairy_04_ganlao", "hubing_06_yangrouhubing", "boxmat_livestock_pen_01"],
  ["hubing_02_lubing", "hubing_03_humabing", "boxmat_milk_room_01", "hubing_04_youhubing", "dairy_02_rumi", "hubing_03_humabing", "hubing_04_youhubing"],
  ["hubing_01_dough", "hubing_02_lubing", null, null, null, "hubing_02_lubing", "boxmat_milk_room_01"],
  ["hubing_01_dough", "boxmat_milk_room_01", null, null, null, "hubing_03_humabing", "dairy_01_milk"],
  ["hubing_02_lubing", "hubing_01_dough", null, null, null, "boxmat_milk_room_01", "dairy_02_rumi"],
  ["hubing_02_lubing", "hubing_03_humabing", "boxmat_milk_room_01", "dairy_01_milk", "hubing_03_humabing", "dairy_02_rumi", "hubing_04_youhubing"],
  ["boxmat_milk_room_01", "dairy_02_rumi", "hubing_04_youhubing", "boxmat_livestock_pen_01", "dairy_03_laojiang", "hubing_05_congchihubing", "boxmat_livestock_pen_01"],
  ["hubing_04_youhubing", "dairy_03_laojiang", "boxmat_livestock_pen_01", "hubing_05_congchihubing", "dairy_04_ganlao", "hubing_06_yangrouhubing", "hubing_08_gulouzi"],
];

const LOCKED_CELL_VISUAL_ROWS = [
  ["material_mill_03", "hubing_05_congchihubing", "material_milk_03", "dairy_03_laojiang", "material_meat_03", "meat_03_roupu", "material_spice_03"],
  ["material_fruit_03", "material_milk_01", "dairy_01_milk", "material_meat_01", "meat_02_roumi_xian", "material_spice_01", "spice_01_huma"],
  ["material_fruit_01", "material_mill_01", "hubing_01_dough", "hubing_01_dough", "material_mill_01", "hubing_02_lubing", "material_drink_01"],
  ["fruit_01_putao", "material_mill_01", null, null, null, "material_mill_02", "drink_01_putaozhi"],
  ["material_mill_02", "material_mill_01", null, null, null, "dairy_01_milk", "material_milk_02"],
  ["material_meat_02", "hubing_03_humabing", null, null, null, "material_spice_01", "material_spice_02"],
  ["material_fruit_02", "material_fruit_01", "fruit_01_putao", "drink_01_putaozhi", "spice_01_huma", "material_drink_01", "material_drink_02"],
  ["hubing_04_youhubing", "dairy_03_laojiang", "meat_03_roupu", "spice_03_hujiao_li", "fruit_03_yezao", "drink_03_sanlejiang", "material_drink_03"],
  ["hubing_05_congchihubing", "material_mill_04", "material_milk_04", "material_meat_04", "material_spice_04", "material_fruit_04", "material_drink_04"],
];

const LOCKED_MATERIAL_VISUALS = {
  material_mill_01: ["粗磨石坯", "generator_material_mill_01.png"],
  material_mill_02: ["磨轴石件", "generator_material_mill_02.png"],
  material_mill_03: ["描纹磨盘", "generator_material_mill_03.png"],
  material_mill_04: ["小石磨胚", "generator_material_mill_04.png"],
  material_milk_01: ["乳栏木料", "generator_material_milk_room_01.png"],
  material_milk_02: ["乳桶木箍", "generator_material_milk_room_02.png"],
  material_milk_03: ["乳畜栏件", "generator_material_milk_room_03.png"],
  material_milk_04: ["奶房食盒胚", "generator_material_milk_room_04.png"],
  material_meat_01: ["肉铺木架", "generator_material_meat_01.png"],
  material_meat_02: ["烤架铜件", "generator_material_meat_02.png"],
  material_meat_03: ["肉铺食盒胚", "generator_material_meat_03.png"],
  material_meat_04: ["描金肉铺箱", "generator_material_meat_04.png"],
  material_spice_01: ["香料小囊", "generator_material_spice_01.png"],
  material_spice_02: ["香匙陶罐", "generator_material_spice_02.png"],
  material_spice_03: ["香料架胚", "generator_material_spice_03.png"],
  material_spice_04: ["香料食盒胚", "generator_material_spice_04.png"],
  material_fruit_01: ["果摊竹篾", "generator_material_fruit_01.png"],
  material_fruit_02: ["果篮绳结", "generator_material_fruit_02.png"],
  material_fruit_03: ["果摊食盒胚", "generator_material_fruit_03.png"],
  material_fruit_04: ["果摊描金箱", "generator_material_fruit_04.png"],
  material_drink_01: ["酒厢陶片", "generator_material_drink_01.png"],
  material_drink_02: ["酒架木件", "generator_material_drink_02.png"],
  material_drink_03: ["酒水食盒胚", "generator_material_drink_03.png"],
  material_drink_04: ["酒水描金箱", "generator_material_drink_04.png"],
};

const state = {
  items: [],
  ordersConfig: null,
  codexConfig: null,
  staminaConfig: null,
  progressionConfig: null,
  innConfig: null,
  board: [],
  bag: [],
  giftPacks: [],
  giftBoxStates: {},
  unlockedCells: [],
  visibleOrders: [],
  unlockedCodex: new Set(),
  coins: 40,
  stamina: 18,
  staminaMax: 24,
  recoverMinutes: 6,
  generationCount: 0,
  completedOrders: 0,
  completedOrderIds: [],
  coinsEarned: 0,
  storyFlags: {},
  renovationChoices: {},
  activeRepairId: null,
  repairPromptedFor: [],
  generatorStates: {},
  innLevel: 1,
  ownedFurniture: [],
  placedFurniture: [],
  currentPage: "board",
  tutorialStep: 0,
  selectedIndex: null,
  pulseIndex: null,
  unlockPulseIndex: null,
  currentOrderDetailId: null,
  lastTick: Date.now(),
};

const els = {
  coins: document.querySelector("#coins"),
  stamina: document.querySelector("#stamina"),
  gems: document.querySelector("#gems"),
  codexProgress: document.querySelector("#codexProgress"),
  orders: document.querySelector("#orders"),
  board: document.querySelector("#board"),
  selectedName: document.querySelector("#selectedName"),
  selectedText: document.querySelector("#selectedText"),
  keeperLine: document.querySelector("#keeperLine"),
  generateBtn: document.querySelector("#generateBtn"),
  sellBtn: document.querySelector("#sellBtn"),
  selectedDetailBtn: document.querySelector("#selectedDetailBtn"),
  staminaPlusBtn: document.querySelector("#staminaPlusBtn"),
  gemPlusBtn: document.querySelector("#gemPlusBtn"),
  storageBtn: document.querySelector("#storageBtn"),
  stationHudBtn: document.querySelector("#stationHudBtn"),
  repairSideBtn: document.querySelector("#repairSideBtn"),
  rewardBagBtn: document.querySelector("#rewardBagBtn"),
  bagBtn: document.querySelector("#bagBtn"),
  stationBtn: document.querySelector("#stationBtn"),
  boardReturnBtn: document.querySelector("#boardReturnBtn"),
  boardPage: document.querySelector("#boardPage"),
  innPage: document.querySelector("#innPage"),
  innLevelName: document.querySelector("#innLevelName"),
  innCoins: document.querySelector("#innCoins"),
  innScene: document.querySelector("#innScene"),
  innScoreText: document.querySelector("#innScoreText"),
  innUpgradeText: document.querySelector("#innUpgradeText"),
  innUpgradeBtn: document.querySelector("#innUpgradeBtn"),
  furnitureShop: document.querySelector("#furnitureShop"),
  innStoryLine: document.querySelector("#innStoryLine"),
  resetBtn: document.querySelector("#resetBtn"),
  codexBtn: document.querySelector("#codexBtn"),
  codexModal: document.querySelector("#codexModal"),
  codexList: document.querySelector("#codexList"),
  codexDetailModal: document.querySelector("#codexDetailModal"),
  codexDetailIcon: document.querySelector("#codexDetailIcon"),
  codexDetailName: document.querySelector("#codexDetailName"),
  codexDetailModern: document.querySelector("#codexDetailModern"),
  codexDetailShort: document.querySelector("#codexDetailShort"),
  codexDetailLong: document.querySelector("#codexDetailLong"),
  codexDetailSource: document.querySelector("#codexDetailSource"),
  unlockModal: document.querySelector("#unlockModal"),
  unlockIcon: document.querySelector("#unlockIcon"),
  unlockName: document.querySelector("#unlockName"),
  unlockText: document.querySelector("#unlockText"),
  viewCodexFromUnlock: document.querySelector("#viewCodexFromUnlock"),
  stationModal: document.querySelector("#stationModal"),
  stationSummary: document.querySelector("#stationSummary"),
  stationPreview: document.querySelector("#stationPreview"),
  stationMilestones: document.querySelector("#stationMilestones"),
  stationNextLine: document.querySelector("#stationNextLine"),
  storyList: document.querySelector("#storyList"),
  storyModal: document.querySelector("#storyModal"),
  storyAvatar: document.querySelector("#storyAvatar"),
  storyTitle: document.querySelector("#storyTitle"),
  storySpeaker: document.querySelector("#storySpeaker"),
  storyText: document.querySelector("#storyText"),
  repairModal: document.querySelector("#repairModal"),
  repairTitle: document.querySelector("#repairTitle"),
  repairAvatar: document.querySelector("#repairAvatar"),
  repairStory: document.querySelector("#repairStory"),
  repairRewardLabel: document.querySelector("#repairRewardLabel"),
  repairCost: document.querySelector("#repairCost"),
  repairChoices: document.querySelector("#repairChoices"),
  repairConfirmBtn: document.querySelector("#repairConfirmBtn"),
  repairCoinProgress: document.querySelector("#repairCoinProgress"),
  repairGuideModal: document.querySelector("#repairGuideModal"),
  repairGuideTitle: document.querySelector("#repairGuideTitle"),
  repairGuideAvatar: document.querySelector("#repairGuideAvatar"),
  repairGuideText: document.querySelector("#repairGuideText"),
  repairGuideBtn: document.querySelector("#repairGuideBtn"),
  repairPlayerLayer: document.querySelector("#repairPlayerLayer"),
  repairPlayerFrame: document.querySelector("#repairPlayerFrame"),
  upgradeUnlockModal: document.querySelector("#upgradeUnlockModal"),
  upgradeUnlockTitle: document.querySelector("#upgradeUnlockTitle"),
  upgradeUnlockList: document.querySelector("#upgradeUnlockList"),
  upgradeReturnBtn: document.querySelector("#upgradeReturnBtn"),
  orderDetailModal: document.querySelector("#orderDetailModal"),
  orderDetailAvatar: document.querySelector("#orderDetailAvatar"),
  orderDetailNpc: document.querySelector("#orderDetailNpc"),
  orderDetailDialogue: document.querySelector("#orderDetailDialogue"),
  orderDetailDemandList: document.querySelector("#orderDetailDemandList"),
  orderDetailRecipe: document.querySelector("#orderDetailRecipe"),
  orderDetailCodexBtn: document.querySelector("#orderDetailCodexBtn"),
  orderDetailCompleteBtn: document.querySelector("#orderDetailCompleteBtn"),
  bagModal: document.querySelector("#bagModal"),
  bagList: document.querySelector("#bagList"),
  storageModal: document.querySelector("#storageModal"),
  storageSlotList: document.querySelector("#storageSlotList"),
  pieceDetailModal: document.querySelector("#pieceDetailModal"),
  pieceDetailIcon: document.querySelector("#pieceDetailIcon"),
  pieceDetailName: document.querySelector("#pieceDetailName"),
  pieceDetailMeta: document.querySelector("#pieceDetailMeta"),
  pieceDetailText: document.querySelector("#pieceDetailText"),
  debugStaminaBtn: document.querySelector("#debugStaminaBtn"),
  debugDoughBtn: document.querySelector("#debugDoughBtn"),
  debugRenovationBtn: document.querySelector("#debugRenovationBtn"),
  debugNextRepairBtn: document.querySelector("#debugNextRepairBtn"),
  debugLv1UpgradeBtn: document.querySelector("#debugLv1UpgradeBtn"),
  debugClearBtn: document.querySelector("#debugClearBtn"),
  toast: document.querySelector("#toast"),
  loadingOverlay: document.querySelector("#loadingOverlay"),
  loadingTitle: document.querySelector("#loadingTitle"),
  loadingText: document.querySelector("#loadingText"),
  loadingRetryBtn: document.querySelector("#loadingRetryBtn"),
};

const byId = new Map();
const codexById = new Map();
let dragging = null;
let toastTimer = null;
let suppressNextCellClick = false;
let suppressNextCellClickTimer = null;
let activeRepairMilestoneId = null;
let activeRepairChoiceId = null;
let pendingUpgradeUnlock = null;
let innPackageLoaded = false;
let innPackagePromise = null;
let innReleaseTimer = null;
let repairPulseTimer = null;
let boardGuideTimer = null;
let lastInnFocusKey = null;
let pendingInnFocusPosition = null;
let repairAnchorRect = null;
let repairModalAnimating = false;

async function loadJson(name) {
  const response = await fetch(`${DATA_PATH}${name}.json`);
  if (!response.ok) throw new Error(`无法加载 ${name}.json`);
  return response.json();
}

async function boot() {
  console.log('🐫 丝路食肆 v0.3-drag 启动中…');
  const [items, orders, codex, stamina, progression, inn] = await Promise.all([
    loadJson("items"),
    loadJson("orders"),
    loadJson("codex"),
    loadJson("stamina"),
    loadJson("progression"),
    loadJson("inn"),
  ]);

  state.items = items.items;
  state.ordersConfig = orders;
  state.codexConfig = codex;
  state.staminaConfig = stamina;
  state.progressionConfig = progression;
  state.innConfig = inn;
  state.items.forEach((item) => byId.set(item.id, item));
  codex.entries.forEach((entry) => codexById.set(entry.id, entry));

  loadState();
  render();
  bindEvents();
  applyBuildMode();
  setInterval(tickStamina, 1000);
}

function defaultState() {
  const board = Array(BOARD_SIZE).fill(null);
  board[starterGeneratorIndex()] = "gen_mill_01";
  return {
    board,
    bag: Array(STORAGE_FREE_SLOTS).fill(null),
    giftPacks: [],
    giftBoxStates: {},
    unlockedCells: [],
    visibleOrders: [REPAIR_GATE_SEQUENCE[0]],
    unlockedCodex: ["codex_hubing_01"],
    coins: 40,
    gems: 36,
    stamina: state.staminaConfig.initial.startValue,
    staminaMax: state.staminaConfig.initial.max,
    recoverMinutes: state.staminaConfig.initial.recoverMinutes,
    generationCount: 0,
    completedOrders: 0,
    completedOrderIds: [],
    coinsEarned: 0,
    storyFlags: {},
    renovationChoices: {},
    activeRepairId: null,
    repairPromptedFor: [],
    generatorStates: {},
    innLevel: 1,
    ownedFurniture: [],
    placedFurniture: Array(6).fill(null),
    currentPage: "board",
    tutorialStep: 0,
    lastTick: Date.now(),
  };
}

function loadState() {
  const saved = localStorage.getItem(SAVE_KEY);
  const data = saved ? JSON.parse(saved) : defaultState();
  const loadedOrderIds = Array.isArray(data.completedOrderIds) ? data.completedOrderIds : [];
  Object.assign(state, {
    board: normalizeBoard(data.board),
    bag: normalizeStorageSlots(data.bag),
    giftPacks: normalizeGiftPacks(data.giftPacks),
    giftBoxStates: normalizeGiftBoxStates(data.giftBoxStates),
    unlockedCells: normalizeUnlockedCells(data.unlockedCells),
    visibleOrders: data.visibleOrders?.length ? data.visibleOrders : defaultState().visibleOrders,
    unlockedCodex: new Set(data.unlockedCodex?.length ? data.unlockedCodex : ["codex_hubing_01"]),
    coins: data.coins ?? 40,
    gems: data.gems ?? 36,
    stamina: data.stamina ?? state.staminaConfig.initial.startValue,
    staminaMax: Math.max(data.staminaMax ?? state.staminaConfig.initial.max, state.staminaConfig.initial.max),
    recoverMinutes: data.recoverMinutes ?? state.staminaConfig.initial.recoverMinutes,
    generationCount: data.generationCount ?? 0,
    completedOrders: data.completedOrders ?? 0,
    completedOrderIds: loadedOrderIds,
    coinsEarned: data.coinsEarned ?? 0,
    storyFlags: data.storyFlags && typeof data.storyFlags === "object" ? data.storyFlags : {},
    renovationChoices: data.renovationChoices && typeof data.renovationChoices === "object" ? data.renovationChoices : {},
    activeRepairId: typeof data.activeRepairId === "string" ? data.activeRepairId : null,
    repairPromptedFor: Array.isArray(data.repairPromptedFor) ? data.repairPromptedFor : [],
    generatorStates: data.generatorStates && typeof data.generatorStates === "object" ? data.generatorStates : {},
    innLevel: data.innLevel ?? 1,
    ownedFurniture: Array.isArray(data.ownedFurniture) ? data.ownedFurniture : [],
    placedFurniture: Array.isArray(data.placedFurniture) ? normalizePlacedFurniture(data.placedFurniture) : Array(6).fill(null),
    currentPage: data.currentPage === "inn" ? "inn" : "board",
    tutorialStep: data.tutorialStep ?? 0,
    lastTick: data.lastTick ?? Date.now(),
  });
  migrateOccupiedLockedCells();
  applyOfflineRecovery();
  ensureStarterGenerator();
  if (state.visibleOrders.length && !state.visibleOrders.some((oid) => !state.completedOrderIds.includes(oid))) {
    const nextGate = REPAIR_GATE_SEQUENCE.find((oid) => !state.completedOrderIds.includes(oid));
    state.visibleOrders = nextGate ? [nextGate] : [];
    // Fill extra slots
    while (state.visibleOrders.length < (state.ordersConfig.maxVisibleOrders ?? 3)) {
      const next = pickOrder();
      if (!next) break;
      state.visibleOrders.push(next.id);
    }
  }
  if (state.currentPage === "inn" && !canEnterRepairPage().ok) {
    state.currentPage = "board";
  }
  if (BUILD_MODE === "dev") {
    syncGateOrder();
  }
}

function saveState() {
  localStorage.setItem(
    SAVE_KEY,
    JSON.stringify({
      board: state.board,
      bag: state.bag,
      giftPacks: state.giftPacks,
      giftBoxStates: state.giftBoxStates,
      unlockedCells: state.unlockedCells,
      visibleOrders: state.visibleOrders,
      unlockedCodex: [...state.unlockedCodex],
      coins: state.coins,
      gems: state.gems,
      stamina: state.stamina,
      staminaMax: state.staminaMax,
      recoverMinutes: state.recoverMinutes,
      generationCount: state.generationCount,
      completedOrders: state.completedOrders,
      completedOrderIds: state.completedOrderIds,
      coinsEarned: state.coinsEarned,
      storyFlags: state.storyFlags,
      renovationChoices: state.renovationChoices,
      activeRepairId: state.activeRepairId,
      repairPromptedFor: state.repairPromptedFor,
      generatorStates: state.generatorStates,
      innLevel: state.innLevel,
      ownedFurniture: state.ownedFurniture,
      placedFurniture: state.placedFurniture,
      currentPage: state.currentPage,
      tutorialStep: state.tutorialStep,
      lastTick: state.lastTick,
    }),
  );
}

function applyOfflineRecovery() {
  if (state.stamina >= state.staminaMax) return;
  const elapsed = Date.now() - state.lastTick;
  const recovered = Math.floor(elapsed / (state.recoverMinutes * 60 * 1000));
  if (recovered > 0) {
    state.stamina = Math.min(state.staminaMax, state.stamina + recovered);
    state.lastTick += recovered * state.recoverMinutes * 60 * 1000;
  }
}

function ensureStarterGenerator() {
  if (state.completedOrders === 0 && state.coinsEarned === 0) {
    state.board = state.board.map((itemId, index) => {
      if (isBoardCellLocked(index)) return null;
      if (["gen_milk_room_01", "gen_milk_room_02", "gen_livestock_pen_01", "gen_livestock_pen_02"].includes(itemId)) return null;
      return itemId;
    });
    if (state.visibleOrders.includes("order_015_monk_rumi") || state.visibleOrders.includes("order_018_traveler_lubing_rumi")) {
      state.visibleOrders = defaultState().visibleOrders;
    }
    state.unlockedCodex.delete("codex_dairy_01");
  }
  const hasMill = state.board.some((itemId) => byId.get(itemId)?.generatorType === "mill");
  if (!hasMill) {
    const index = firstEmptyIndex();
    if (index >= 0) state.board[index] = "gen_mill_01";
  }
}

function tickStamina() {
  tickGenerators();
  if (state.stamina >= state.staminaMax) {
    state.lastTick = Date.now();
    saveState();
    return;
  }
  const now = Date.now();
  if (now - state.lastTick >= state.recoverMinutes * 60 * 1000) {
    state.stamina += 1;
    state.lastTick = now;
    toast("远处又传来驼铃声。");
    render();
    saveState();
  }
}

function bindEvents() {
  preventBrowserSmartZoom();
  els.generateBtn.addEventListener("click", generateItem);
  els.sellBtn.addEventListener("click", sellSelected);
  els.selectedDetailBtn?.addEventListener("click", openSelectedPieceDetail);
  els.staminaPlusBtn?.addEventListener("click", () => toast("驼铃补充入口暂未接入。"));
  els.gemPlusBtn?.addEventListener("click", () => toast("红宝石入口暂未接入。"));
  els.storageBtn?.addEventListener("click", openStorage);
  els.stationHudBtn?.addEventListener("click", handleStationButton);
  els.repairSideBtn?.addEventListener("click", handleStationButton);
  els.rewardBagBtn?.addEventListener("click", openBag);
  els.bagBtn.addEventListener("click", openBag);
  els.stationBtn.addEventListener("click", handleStationButton);
  els.boardReturnBtn.addEventListener("click", () => switchPage("board"));
  els.innUpgradeBtn.addEventListener("click", upgradeInn);
  els.resetBtn.addEventListener("click", resetGame);
  els.debugStaminaBtn.addEventListener("click", debugAddStamina);
  els.debugDoughBtn.addEventListener("click", debugAddDough);
  els.debugRenovationBtn.addEventListener("click", debugUnlockRenovation);
  els.debugNextRepairBtn.addEventListener("click", debugAdvanceRepairGate);
  els.debugLv1UpgradeBtn.addEventListener("click", debugPrepareLv1Upgrade);
  els.debugClearBtn.addEventListener("click", debugClearBoard);
  els.loadingRetryBtn.addEventListener("click", () => switchPage("inn"));
  els.codexBtn.addEventListener("click", openCodex);
  els.orderDetailCodexBtn.addEventListener("click", openCodexFromOrderDetail);
  els.orderDetailCompleteBtn.addEventListener("click", completeOrderFromDetail);
  els.repairConfirmBtn.addEventListener("click", finalizeRepairChoice);
  window.addEventListener("message", handleRepairPlayerMessage);
  els.repairModal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeRepairModalToAnchor();
  });
  els.repairGuideBtn.addEventListener("click", () => els.repairGuideModal.close());
  els.upgradeReturnBtn.addEventListener("click", () => {
    els.upgradeUnlockModal.close();
  });
  els.viewCodexFromUnlock.addEventListener("click", () => {
    els.unlockModal.close();
    openCodex();
  });
  document.querySelectorAll("[data-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (btn.dataset.close === "repairModal") {
        closeRepairModalToAnchor();
        return;
      }
      document.querySelector(`#${btn.dataset.close}`).close();
      if (btn.dataset.close === "storyModal" && pendingUpgradeUnlock) showUpgradeUnlockSummary();
    });
  });
}

function applyBuildMode() {
  document.body.dataset.buildMode = BUILD_MODE;
  if (BUILD_MODE === "release") {
    document.querySelector(".debug-panel")?.remove();
    els.resetBtn?.closest(".modal-actions")?.remove();
  }
}

async function ensureInnPackageLoaded() {
  if (innPackageLoaded) return true;
  if (innPackagePromise) return innPackagePromise;
  showLoadingOverlay("正在展开流沙驿驿院全景", "加载修缮分包资源，请稍候。", false);
  innPackagePromise = preloadAssets(INN_PACKAGE_ASSETS)
    .then(waitForInnPackagePaint)
    .then(() => {
      innPackageLoaded = true;
      hideLoadingOverlay();
      return true;
    })
    .catch(() => {
      showLoadingOverlay("驿院资源加载失败", "网络或本地服务不稳定，点重新加载再试一次。", true);
      toast("驿院资源加载失败，请重试。");
      return false;
    })
    .finally(() => {
      innPackagePromise = null;
    });
  return innPackagePromise;
}

function preloadAssets(urls) {
  return Promise.all(urls.map((url) => preloadImage(url)));
}

function preloadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = resolve;
    image.onerror = reject;
    image.src = url;
  });
}

function waitForInnPackagePaint() {
  return new Promise((resolve) => setTimeout(resolve, 360));
}

function showLoadingOverlay(title, text, canRetry) {
  els.loadingTitle.textContent = title;
  els.loadingText.textContent = text;
  els.loadingRetryBtn.hidden = !canRetry;
  els.loadingOverlay.hidden = false;
  els.loadingOverlay.classList.toggle("failed", canRetry);
}

function hideLoadingOverlay() {
  els.loadingOverlay.hidden = true;
  els.loadingOverlay.classList.remove("failed");
  els.loadingRetryBtn.hidden = true;
}

function scheduleInnPackageRelease() {
  cancelInnPackageRelease();
  innReleaseTimer = setTimeout(() => {
    if (state.currentPage === "inn") return;
    innPackageLoaded = false;
    destroyInnTemporaryNodes();
  }, 30000);
}

function cancelInnPackageRelease() {
  clearTimeout(innReleaseTimer);
  innReleaseTimer = null;
}

function render() {
  renderPage();
  els.coins.textContent = state.coins;
  els.stamina.textContent = state.stamina;
  if (els.gems) els.gems.textContent = state.gems ?? 0;
  if (els.codexProgress) els.codexProgress.textContent = `${state.unlockedCodex.size}/8`;
  els.generateBtn.disabled = !hasEmptyCell();
  renderOrders();
  renderBoard();
  renderSelected();
  renderBagButton();
  renderInnButton();
  if (els.storageModal?.open) renderStorage();
  if (state.currentPage === "inn") {
    renderInnPage();
  } else {
    destroyInnTemporaryNodes();
  }
  renderTutorial();
  if (els.orderDetailModal.open && state.currentOrderDetailId) renderOrderDetail();
}

function renderPage() {
  const isInn = state.currentPage === "inn";
  document.querySelector("#app").dataset.page = state.currentPage;
  els.boardPage.hidden = isInn;
  els.innPage.hidden = !isInn;
  els.boardPage.classList.toggle("active", !isInn);
  els.innPage.classList.toggle("active", isInn);
  els.boardReturnBtn.classList.toggle("active", !isInn);
  els.stationBtn?.classList.toggle("active", isInn);
}

async function switchPage(page) {
  if (page === "inn") {
    const gate = canEnterRepairPage();
    if (!gate.ok) {
      toast(gate.reason);
      keeper(gate.reason);
      return;
    }
    const packageReady = await ensureInnPackageLoaded();
    if (!packageReady) return;
    cancelInnPackageRelease();
    lastInnFocusKey = null;
  } else if (page === "board") {
    clearBoardReturnGuide();
    scheduleInnPackageRelease();
  }
  state.currentPage = page;
  document.querySelector("#app").classList.add("page-transitioning");
  setTimeout(() => document.querySelector("#app").classList.remove("page-transitioning"), 320);
  render();
  saveState();
}

function handleStationButton() {
  const gate = canEnterRepairPage();
  if (!gate.ok) {
    toast(gate.reason);
    keeper(gate.reason);
    return;
  }
  switchPage("inn");
}

function destroyInnTemporaryNodes() {
  els.innScene.innerHTML = "";
  els.furnitureShop.innerHTML = "";
  document.querySelector(".inn-task-list")?.remove();
}

function renderInnPage() {
  const level = currentInnLevel();
  const repairValue = innRepairValue();
  const canUpgrade = canUpgradeInn();
  const nextMilestone = nextRepairMilestone();
  const chapter = activeStoryChapter();
  els.innLevelName.textContent = `Lv${chapter} ${chapterName(chapter)}`;
  els.innCoins.textContent = state.coins;
  els.innScoreText.textContent = "主线修缮";
  els.innUpgradeText.textContent =
    level.level >= 4
      ? "当前原型已到最高驿站等级。"
      : canUpgrade.ok
        ? "条件已满足，可以升级流沙驿。"
        : canUpgrade.reason;
  els.innUpgradeBtn.disabled = level.level >= 4;
  els.innUpgradeBtn.classList.toggle("locked", !canUpgrade.ok);
  els.innUpgradeBtn.textContent = level.level >= 4 ? "已满级" : canUpgrade.ok ? `扩建 ${level.upgradeCost}铜币` : "扩建未达成";
  els.innStoryLine.textContent = nextMilestone
    ? `${nextMilestone.sceneName ?? nextMilestone.name}：${nextMilestone.nextText}`
    : level.story;
  renderInnScene(level, repairValue);
  renderMainlineDock();
}

function renderInnTasks(level) {
  document.querySelector(".inn-task-list")?.remove();
  const taskViews = getInnTaskViews(level);
  const coinOk = state.coins >= level.upgradeCost;
  const repairOk = innRepairValue() >= level.repairTarget;
  const lines = [
    `<span class="${coinOk ? "done" : ""}">铜币 ${Math.min(state.coins, level.upgradeCost)}/${level.upgradeCost}</span>`,
    `<span class="${repairOk ? "done" : ""}">基础修缮 ${Math.min(innRepairValue(), level.repairTarget)}/${level.repairTarget}</span>`,
    ...taskViews.map((task) => `<span class="${task.done ? "done" : ""}">${task.label} ${task.current}/${task.target}</span>`),
  ];
  els.innScoreText.insertAdjacentHTML("afterend", `<div class="inn-task-list">${lines.join("")}</div>`);
}

function renderInnScene(level, repairValue) {
  const milestones = getMilestoneViews();
  const next = nextRepairMilestone();
  const completedRegionIds = new Set(
    milestones
      .filter((milestone) => selectedRenovationChoice(milestone))
      .flatMap((milestone) => milestone.longscrollRegionIds),
  );
  const currentRegionIds = next?.longscrollRegionIds ?? [];
  const completedStage = milestones.filter((milestone) => selectedRenovationChoice(milestone)).length;
  const lockedRegionIds = Array.from({ length: 27 }, (_, index) => index + 1).filter(
    (regionId) => !completedRegionIds.has(regionId) && !currentRegionIds.includes(regionId),
  );
  els.innScene.innerHTML = `
    <div class="longscroll-map" aria-label="流沙驿长卷">
      <img class="longscroll-base" src="${LONGSCROLL_ROOT}/base/阶段0_未修缮长卷_1254x1254.png" alt="未修缮的流沙驿" />
      ${completedStage ? `<img class="longscroll-region" src="${LONGSCROLL_ROOT}/states-webp/${String(completedStage).padStart(2, "0")}_done_state_v0.1.webp?v=feather-20260803" alt="" />` : ""}
      ${lockedRegionIds
        .map((regionId) => renderLongscrollMask("longscroll-lock", regionId))
        .join("")}
      ${currentRegionIds
        .map((regionId) => {
          const isRepairAnchor = regionId === currentRegionIds[0];
          const [left, top, width, height] = LONGSCROLL_REGION_BOUNDS[regionId];
          return `${renderLongscrollMask("longscroll-current-glow", regionId)}
            ${isRepairAnchor ? `<button class="longscroll-current-region" type="button" data-current-repair="${next.id}" data-region-id="${regionId}" aria-label="修缮${next.sceneName ?? next.name}" style="left:${left}px;top:${top}px;width:${width}px;height:${height}px"></button>` : ""}`;
        })
        .join("")}
    </div>
  `;
  els.innScene.querySelectorAll("[data-current-repair]").forEach((button) => {
    button.addEventListener("click", () => handleRepairNodeClick(button.dataset.currentRepair, button));
  });
  scheduleCurrentInnFocus(next, currentRegionIds);
}

function renderLongscrollMask(className, regionId) {
  const id = `${className}-${regionId}`;
  const thresholdId = `${id}-threshold`;
  const maskUrl = `${LONGSCROLL_ROOT}/masks-alpha/${String(regionId).padStart(2, "0")}_mask_v0.1.png`;
  return `<svg class="${className}" aria-hidden="true" viewBox="0 0 1254 1254">
    <filter id="${thresholdId}" color-interpolation-filters="sRGB">
      <feComponentTransfer>
        <feFuncR type="discrete" tableValues="0 0 0 0 1" />
        <feFuncG type="discrete" tableValues="0 0 0 0 1" />
        <feFuncB type="discrete" tableValues="0 0 0 0 1" />
      </feComponentTransfer>
    </filter>
    <mask id="${id}" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" mask-type="alpha">
      <image href="${maskUrl}" width="1254" height="1254" preserveAspectRatio="none" filter="url(#${thresholdId})" />
    </mask>
    <rect class="${className}-fill" width="1254" height="1254" mask="url(#${id})" />
  </svg>`;
}

function scheduleCurrentInnFocus(nextMilestone, regionIds) {
  if (state.currentPage !== "inn" || !regionIds?.length) return;
  const focusKey = nextMilestone ? nextMilestone.id : `level-${currentInnLevel().level}-complete`;
  if (lastInnFocusKey === focusKey) return;
  requestAnimationFrame(() => {
    centerInnSceneOnPosition(regionIds);
    lastInnFocusKey = focusKey;
  });
}

function centerInnSceneOnPosition(regionIds) {
  const target = els.innScene.querySelector(`.longscroll-current-region[data-region-id="${regionIds?.[0]}"]`);
  if (!target) return;
  const map = els.innScene.querySelector(".longscroll-map");
  if (!map) return;
  const mapRect = map.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  els.innScene.scrollTo({
    left: Math.max(0, els.innScene.scrollLeft + targetRect.left - mapRect.left + targetRect.width / 2 - els.innScene.clientWidth / 2),
    top: Math.max(0, els.innScene.scrollTop + targetRect.top - mapRect.top + targetRect.height / 2 - els.innScene.clientHeight / 2),
    behavior: "auto",
  });
}

function focusPendingInnPosition() {
  if (!pendingInnFocusPosition || state.currentPage !== "inn") {
    pendingInnFocusPosition = null;
    return;
  }
  const position = pendingInnFocusPosition;
  pendingInnFocusPosition = null;
  lastInnFocusKey = null;
  requestAnimationFrame(() => centerInnSceneOnPosition(position));
}

function renderSceneZones(milestones) {
  const current = nextRepairMilestone();
  return milestones
    .map((milestone) => {
      const picked = Boolean(selectedRenovationChoice(milestone));
      const active = current?.id === milestone.id;
      const tag = picked ? "div" : "button";
      const action = picked
        ? ""
        : active
          ? `data-repair-node="${milestone.id}" aria-label="${milestone.sceneName ?? milestone.name}"`
          : `data-locked-repair="${milestone.id}" aria-label="推进主线解锁${milestone.sceneName ?? milestone.name}"`;
      return `
        <${tag} class="scene-zone zone-${milestone.scenePosition} ${picked ? "done" : active ? "active" : "locked"}" ${action}></${tag}>
      `;
    })
    .join("");
}

function renderSceneDecor(milestones) {
  return milestones
    .map((milestone) => {
      const choice = selectedRenovationChoice(milestone);
      if (!choice) return "";
      return `
        <div class="scene-decor decor-pos-${milestone.scenePosition}">
          <i class="decor-object decor-${choice.id}"></i>
        </div>
      `;
    })
    .join("");
}

function renderSceneHotspots(milestones) {
  const current = nextRepairMilestone();
  return milestones
    .map((milestone) => {
      const choice = selectedRenovationChoice(milestone);
      if (choice) return "";
      const isCurrent = current?.id === milestone.id;
      const ready = isCurrent && milestone.done;
      const affordable = state.activeRepairId === milestone.id || state.coins >= repairCost(milestone);
      if (!isCurrent || !ready || !affordable) return "";
      return `
        <button class="repair-node ready node-${milestone.scenePosition}" data-repair-node="${milestone.id}" aria-label="${milestone.sceneName ?? milestone.name}" title="可修缮"></button>
      `;
    })
    .join("");
}

function handleLockedRepairClick(milestoneId) {
  const milestone = getMilestoneViews().find((entry) => entry.id === milestoneId);
  const label = milestone?.sceneName ?? "该驿院区域";
  const message = `推进主线解锁${label}。`;
  toast(message);
  keeper(message);
}

function renderMainlineDock() {
  const milestones = getMilestoneViews();
  const next = nextRepairMilestone();
  const ready = next && next.done && !selectedRenovationChoice(next) && (state.activeRepairId === next.id || state.coins >= repairCost(next));
  const level = currentInnLevel();
  const completedCount = milestones.filter((milestone) => selectedRenovationChoice(milestone)).length;
  const repairValue = innRepairValue();
  const repairTarget = level.repairTarget;
  const repairPercent = Math.min(100, Math.round((repairValue / repairTarget) * 100));
  els.furnitureShop.innerHTML = `
    <div class="shop-head">
      <strong>主线进度</strong>
      <span>${Object.keys(state.renovationChoices).length}/${milestones.length}</span>
    </div>
    <div class="mainline-current">
      <b>${next ? next.sceneName ?? next.name : "Lv1 修缮完成"}</b>
      <span>${next ? next.nextText : "可以准备进入下一阶段。"}</span>
      ${next && !next.done ? `<small>回后厨完成订单，推进后才会开放这里。</small>` : ""}
    </div>
    <div class="mainline-rail">
      ${milestones
        .map((milestone, index) => {
          const choice = selectedRenovationChoice(milestone);
          const isCurrent = next?.id === milestone.id;
          return `<i class="${choice ? "done" : isCurrent ? "current" : "locked"}" title="${milestone.sceneName ?? milestone.name}">${index + 1}</i>`;
        })
        .join("")}
    </div>
    <div class="mainline-bars">
      <label>
        <span>节点 ${completedCount}/${milestones.length}</span>
        <i><b style="width: ${(completedCount / milestones.length) * 100}%"></b></i>
      </label>
      <label>
        <span>修缮值 ${Math.min(repairValue, repairTarget)}/${repairTarget}</span>
        <i><b style="width: ${repairPercent}%"></b></i>
      </label>
    </div>
    ${
      next
        ? `<button class="mainline-action ${ready ? "ready" : ""}" data-mainline="${next.id}" ${ready ? "" : "disabled"}>${ready ? state.activeRepairId === next.id ? "继续修缮" : "进入修缮" : "等待主线达成"}</button>`
        : `<button class="mainline-action ready" data-upgrade-focus="true">查看扩建条件</button>`
    }
  `;
  els.furnitureShop.querySelectorAll("[data-mainline]").forEach((button) => {
    button.addEventListener("click", () => handleRepairNodeClick(button.dataset.mainline, button));
  });
  els.furnitureShop.querySelectorAll("[data-upgrade-focus]").forEach((button) => {
    button.addEventListener("click", () => {
      const check = canUpgradeInn();
      toast(check.ok ? "扩建条件已满足。" : check.reason);
      keeper(check.ok ? "可以扩建流沙驿了。" : check.reason);
    });
  });
}

function buyFurniture(furnitureId) {
  const item = getFurniture(furnitureId);
  if (!item) return;
  if (state.coins < item.cost) {
    toast("铜钱不足，去后厨完成订单赚取铜币。");
    return;
  }
  state.coins -= item.cost;
  state.ownedFurniture.push(item.id);
  keeper(`买下了「${item.name}」，先收入家具库存。摆到流沙驿里才会增加修缮值。`);
  toast(`入库：${item.name}`);
  render();
  saveState();
}

function placeFurniture(furnitureId) {
  const inventoryIndex = state.ownedFurniture.indexOf(furnitureId);
  const slotIndex = firstEmptyFurnitureSlot();
  const item = getFurniture(furnitureId);
  if (inventoryIndex === -1 || slotIndex === -1 || !item) return;
  state.ownedFurniture.splice(inventoryIndex, 1);
  state.placedFurniture[slotIndex] = furnitureId;
  keeper(`把「${item.name}」摆进了流沙驿。`);
  toast(`已摆放：${item.name}`);
  render();
  saveState();
}

function retrieveFurniture(slotIndex) {
  const furnitureId = state.placedFurniture[slotIndex];
  const item = getFurniture(furnitureId);
  if (!item) return;
  state.placedFurniture[slotIndex] = null;
  state.ownedFurniture.push(furnitureId);
  keeper(`收回了「${item.name}」，对应修缮值也暂时失效。`);
  toast(`已收回：${item.name}`);
  render();
  saveState();
}

function handleRepairNodeClick(milestoneId, anchorElement) {
  const milestone = getMilestoneViews().find((entry) => entry.id === milestoneId);
  const current = nextRepairMilestone();
  if (!milestone) return;
  if (current?.id !== milestone.id) {
    const reason = current ? `当前主线只能先修缮：${current.sceneName ?? current.name}。` : "当前阶段没有新的修缮节点。";
    toast(reason);
    keeper(reason);
    return;
  }
  const choice = selectedRenovationChoice(milestone);
  if (choice) {
    keeper(`这里已经定下「${choice.name}」。${choice.flavor}`);
    toast("这处已经修缮好了。");
    return;
  }
  if (!milestone.done) {
    keeper(milestone.nextText);
    toast(milestone.nextText);
    return;
  }
  setRepairAnchor(anchorElement);
  pulseRepairZone(milestone.scenePosition, () => openRepairModal(milestone.id, anchorElement));
}

function pulseRepairZone(position, afterPulse) {
  const room = els.innScene.querySelector(".inn-room");
  if (!room) {
    afterPulse?.();
    return;
  }
  clearTimeout(repairPulseTimer);
  const pulseClass = `repair-focus-${position}`;
  room.classList.add("repair-focus", pulseClass);
  repairPulseTimer = setTimeout(() => {
    room.classList.remove("repair-focus", pulseClass);
    afterPulse?.();
  }, 260);
}

function openRepairModal(milestoneId, anchorElement) {
  const milestone = getMilestoneViews().find((entry) => entry.id === milestoneId);
  if (!milestone) return;
  setRepairAnchor(anchorElement);
  activeRepairMilestoneId = milestone.id;
  activeRepairChoiceId = "completed";
  els.repairTitle.textContent = milestone.sceneName ?? milestone.name;
  els.repairAvatar.src = storyAvatarSrc(milestone.npcId);
  els.repairAvatar.alt = milestone.speaker ?? "旅人";
  els.repairStory.textContent = milestone.storyText ?? milestone.nextText;
  els.repairRewardLabel.textContent = rewardText(milestone);
  els.repairCost.textContent = repairCost(milestone);
  els.repairChoices.innerHTML = "";
  els.repairChoices.hidden = true;
  updateRepairCostGate(milestone);
  els.repairModal.showModal();
  animateRepairModalIn();
}

function setRepairAnchor(anchorElement) {
  if (!anchorElement) return;
  const rect = anchorElement.getBoundingClientRect();
  repairAnchorRect = {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
}

function repairAnchorDelta(inner) {
  const rect = inner.getBoundingClientRect();
  const target = repairAnchorRect ?? {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  };
  return {
    x: target.x - (rect.left + rect.width / 2),
    y: target.y - (rect.top + rect.height / 2),
  };
}

function animateRepairModalIn() {
  const inner = els.repairModal.querySelector(".repair-detail");
  if (!inner || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const delta = repairAnchorDelta(inner);
  inner.animate(
    [
      { opacity: 0, transform: `translate(${delta.x}px, ${delta.y}px) scale(0.16)` },
      { opacity: 1, transform: "translate(0, 0) scale(1)" },
    ],
    { duration: 220, easing: "cubic-bezier(.2,.9,.2,1)", fill: "both" },
  );
}

function closeRepairModalToAnchor(afterClose) {
  if (repairModalAnimating) return;
  if (!els.repairModal.open) {
    afterClose?.();
    return;
  }
  const inner = els.repairModal.querySelector(".repair-detail");
  if (!inner || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    els.repairModal.close();
    afterClose?.();
    return;
  }
  repairModalAnimating = true;
  const delta = repairAnchorDelta(inner);
  const animation = inner.animate(
    [
      { opacity: 1, transform: "translate(0, 0) scale(1)" },
      { opacity: 0, transform: `translate(${delta.x}px, ${delta.y}px) scale(0.16)` },
    ],
    { duration: 180, easing: "cubic-bezier(.7,0,.4,1)", fill: "both" },
  );
  animation.onfinish = () => {
    repairModalAnimating = false;
    inner.style.transform = "";
    inner.style.opacity = "";
    els.repairModal.close();
    afterClose?.();
  };
}

function selectRepairChoice(choiceId) {
  activeRepairChoiceId = choiceId;
  els.repairChoices.querySelectorAll(".repair-choice").forEach((button) => {
    button.classList.toggle("selected", button.dataset.choice === choiceId);
  });
  const milestone = getMilestoneViews().find((entry) => entry.id === activeRepairMilestoneId);
  updateRepairCostGate(milestone);
}

function updateRepairCostGate(milestone) {
  const cost = milestone ? repairCost(milestone) : 0;
  const continuing = milestone && state.activeRepairId === milestone.id;
  const enough = continuing || state.coins >= cost;
  els.repairCoinProgress.textContent = continuing ? "继续修缮" : enough ? "进入修缮" : `还差${Math.max(0, cost - state.coins)}铜钱`;
  els.repairConfirmBtn.disabled = !enough;
  els.repairConfirmBtn.classList.toggle("ready", enough);
  els.repairConfirmBtn.classList.toggle("insufficient", !continuing && state.coins < cost);
  els.repairConfirmBtn.classList.remove("unselected");
  if (!continuing && state.coins < cost) triggerBoardReturnGuide();
  els.repairConfirmBtn.setAttribute(
    "aria-label",
    continuing ? "继续未完成的修缮" : enough ? `消耗${cost}枚铜钱进入修缮` : `铜钱不足，还差${Math.max(0, cost - state.coins)}枚`,
  );
}

function finalizeRepairChoice() {
  if (!activeRepairMilestoneId) return;
  const milestone = getMilestoneViews().find((entry) => entry.id === activeRepairMilestoneId);
  if (!milestone || (state.activeRepairId && state.activeRepairId !== milestone.id)) return;
  if (!milestone.playerUrl) {
    toast("该点位的修缮场景尚未接入。");
    return;
  }
  if (!state.activeRepairId && state.coins < repairCost(milestone)) {
    triggerBoardReturnGuide();
    return;
  }
  if (!state.activeRepairId) {
    state.coins -= repairCost(milestone);
    state.activeRepairId = milestone.id;
    saveState();
  }
  closeRepairModalToAnchor(() => launchRepairPlayer(milestone));
}

function launchRepairPlayer(milestone) {
  if (!milestone.playerUrl || !els.repairPlayerLayer || !els.repairPlayerFrame) {
    toast("该点位的修缮场景尚未接入。");
    return;
  }
  const playerUrl = new URL(milestone.playerUrl, location.href);
  playerUrl.searchParams.set("embedded", "1");
  playerUrl.searchParams.set("repairId", milestone.playerPointId);
  els.repairPlayerFrame.src = playerUrl.href;
  els.repairPlayerLayer.hidden = false;
}

function handleRepairPlayerMessage(event) {
  if (event.origin !== location.origin || event.source !== els.repairPlayerFrame?.contentWindow) return;
  if (event.data?.type !== "silkroad:repair-complete") return;
  const milestone = getMilestoneViews().find((entry) => entry.id === state.activeRepairId);
  if (!milestone || event.data.repairId !== milestone.playerPointId) return;
  completeRepairFromPlayer(milestone.id);
}

function completeRepairFromPlayer(milestoneId) {
  const milestone = getMilestoneViews().find((entry) => entry.id === milestoneId);
  if (!milestone || state.activeRepairId !== milestoneId || state.renovationChoices[milestoneId]) return;
  state.activeRepairId = null;
  state.renovationChoices[milestoneId] = "completed";
  applyRepairRewards(milestone);
  const nextAfterRepair = nextRepairMilestone();
  lastInnFocusKey = nextAfterRepair ? nextAfterRepair.id : `level-${currentInnLevel().level}-complete`;
  pendingInnFocusPosition = nextAfterRepair?.scenePosition ?? null;
  activeRepairMilestoneId = null;
  activeRepairChoiceId = null;
  els.repairPlayerLayer.hidden = true;
  els.repairPlayerFrame.src = "about:blank";
  render();
  centerInnSceneOnPosition(milestone.scenePosition);
  playRepairCompleteEffect(milestone.scenePosition);
  showRepairCompleteCue();
  saveState();
  els.storyAvatar.src = storyAvatarSrc(milestone.npcId);
  els.storyAvatar.alt = milestone.speaker ?? "旅人";
  els.storyTitle.textContent = milestone.sceneName ?? milestone.name;
  els.storySpeaker.textContent = milestone.speaker ?? "流沙驿";
  els.storyText.textContent = milestone.completionText ?? "这一处收拾妥当，流沙驿终于有了让人停脚的地方。";
  els.storyModal.showModal();
}

function upgradeInn() {
  const check = canUpgradeInn();
  if (!check.ok) {
    toast(check.reason);
    return;
  }
  const level = currentInnLevel();
  if (!confirm(`消耗${level.upgradeCost}枚铜钱扩建流沙驿？扩建后将推进驿站等级并解锁新内容。`)) return;
  state.coins -= level.upgradeCost;
  state.innLevel = Math.min(4, state.innLevel + 1);
  applyInnUnlocks();
  pendingUpgradeUnlock = buildUpgradeUnlockSummary(level);
  toast(`流沙驿升至 Lv${state.innLevel}`);
  keeper(level.upgradeStory);
  els.storyTitle.textContent = `流沙驿 Lv${state.innLevel}`;
  els.storySpeaker.textContent = "掌柜";
  els.storyAvatar.src = "./assets/keeper_portrait.png";
  els.storyAvatar.alt = "掌柜";
  els.storyText.textContent = `${level.upgradeStory}${level.unlocks.length ? ` 解锁：${level.unlocks.join("、")}。` : ""}`;
  els.storyModal.showModal();
  render();
  saveState();
}

function applyInnUnlocks() {
  if (state.innLevel >= 2 && !state.board.includes("gen_milk_room_01")) {
    const index = firstEmptyIndex();
    if (index >= 0) state.board[index] = "gen_milk_room_01";
  }
}

function buildUpgradeUnlockSummary(level) {
  return {
    title: `流沙驿升至 Lv${Math.min(4, level.level + 1)}`,
    items: [
      { label: "棋盘扩容", text: "后续版本开放更多案板格子。" },
      { label: "新增生成器", text: level.unlocks.find((item) => item.includes("生成器")) ?? "解锁新的食材生成器。" },
      { label: "新合成线", text: "开放下一阶段食材线预告。" },
      { label: "高阶 NPC", text: level.unlocks.find((item) => item.includes("顾客") || item.includes("订单")) ?? "远路商旅订单逐步出现。" },
    ],
  };
}

function showUpgradeUnlockSummary() {
  if (!pendingUpgradeUnlock) return;
  els.upgradeUnlockTitle.textContent = pendingUpgradeUnlock.title;
  els.upgradeUnlockList.innerHTML = pendingUpgradeUnlock.items
    .map(
      (item, index) => `
        <article>
          <i>${index + 1}</i>
          <div>
            <b>${item.label}</b>
            <span>${item.text}</span>
          </div>
        </article>
      `,
    )
    .join("");
  pendingUpgradeUnlock = null;
  els.upgradeUnlockModal.showModal();
}

function canUpgradeInn() {
  const level = currentInnLevel();
  const requiredMilestones = state.progressionConfig.milestones;
  const missingMilestone = requiredMilestones.find((milestone) => !state.renovationChoices[milestone.id]);
  if (level.level >= 4) return { ok: false, reason: "当前原型已到最高驿站等级。" };
  if (missingMilestone) {
    const view = getMilestoneViews().find((entry) => entry.id === missingMilestone.id);
    return {
      ok: false,
      reason: view?.done ? `还需修缮：${view.sceneName ?? view.name}。` : `主线未完成：${view?.nextText ?? missingMilestone.name}。`,
    };
  }
  if (innRepairValue() < level.repairTarget) return { ok: false, reason: `修缮值不足，还差${level.repairTarget - innRepairValue()}点。` };
  if (state.coins < level.upgradeCost) return { ok: false, reason: `铜钱不足，还需${level.upgradeCost - state.coins}枚。` };
  return { ok: true, reason: "" };
}

function canEnterRepairPage() {
  const current = nextRepairMilestone();
  if (!current) return { ok: true, reason: "Lv1 修缮已完成，可以查看流沙驿。", milestone: null };
  if (!current.done) {
    return {
      ok: false,
      reason: "完成订单积攒铜钱，推进主线即可修缮驿站。",
      milestone: current,
    };
  }
  return { ok: true, reason: "", milestone: current };
}

function getInnTaskViews(level) {
  return (level.tasks ?? []).map((task) => {
    const current = countPlacedFurnitureForTask(task);
    return {
      label: task.label,
      current: Math.min(current, task.count),
      target: task.count,
      done: current >= task.count,
    };
  });
}

function countPlacedFurnitureForTask(task) {
  return state.placedFurniture.filter((id) => {
    const item = getFurniture(id);
    if (!item) return false;
    if (task.furnitureIds?.includes(id)) return true;
    if (task.slots?.includes(item.slot)) return true;
    return false;
  }).length;
}

function innRepairValue() {
  const choiceValue = Object.keys(state.renovationChoices).reduce((sum, milestoneId) => {
    const milestone = state.progressionConfig.milestones.find((entry) => entry.id === milestoneId);
    return sum + (milestone?.repairValue ?? 0);
  }, 0);
  const placedValue = state.placedFurniture.reduce((sum, id) => sum + (getFurniture(id)?.repairValue ?? 0), 0);
  return choiceValue + placedValue;
}

function currentInnLevel() {
  return state.innConfig.levels.find((level) => level.level === state.innLevel) ?? state.innConfig.levels[0];
}

function activeStoryChapter() {
  const next = nextRepairMilestone();
  if (next?.chapter) return next.chapter;
  return getMilestoneViews().reduce((chapter, milestone) => (state.renovationChoices[milestone.id] ? Math.max(chapter, milestone.chapter ?? 1) : chapter), 1);
}

function chapterName(chapter) {
  return CHAPTER_NAMES[chapter] ?? "流沙驿";
}

function getFurniture(id) {
  return state.innConfig.furniture.find((item) => item.id === id);
}

function firstEmptyFurnitureSlot() {
  return state.placedFurniture.findIndex((item) => !item);
}

function normalizePlacedFurniture(value) {
  return Array.from({ length: 6 }, (_, index) => value[index] ?? null);
}

function normalizeBoard(value) {
  if (!Array.isArray(value)) return defaultState().board;
  return Array.from({ length: BOARD_SIZE }, (_, index) => value[index] ?? null);
}

function normalizeGiftPacks(value) {
  if (!Array.isArray(value)) return defaultState().giftPacks;
  return value
    .filter((entry) => GIFT_PACKS[entry?.id] && Number(entry.quantity) > 0)
    .map((entry) => ({ id: entry.id, quantity: Math.floor(Number(entry.quantity)) }));
}

function normalizeGiftBoxStates(value) {
  if (!value || typeof value !== "object") return {};
  return Object.fromEntries(
    Object.entries(value)
      .filter(([, entry]) => GIFT_PACKS[entry?.packId])
      .map(([index, entry]) => [
        index,
        {
          packId: entry.packId,
          nextRewardIndex: Math.max(0, Math.floor(Number(entry.nextRewardIndex) || 0)),
        },
      ]),
  );
}

function normalizeUnlockedCells(value) {
  if (!Array.isArray(value)) return defaultState().unlockedCells;
  return [...new Set(value.map(Number).filter((index) => Number.isInteger(index) && index >= 0 && index < BOARD_SIZE))];
}

function migrateOccupiedLockedCells() {
  const occupiedLockedCells = state.board
    .map((itemId, index) => (itemId && isBoardCellLocked(index) ? index : null))
    .filter((index) => index !== null);
  if (!occupiedLockedCells.length) return;
  state.unlockedCells = [...new Set([...state.unlockedCells, ...occupiedLockedCells])];
}

function boardIndex(row, col) {
  return row * BOARD_COLUMNS + col;
}

function starterGeneratorIndex() {
  return boardIndex(ACTIVE_BOARD_START_ROW + ACTIVE_BOARD_ROWS - 1, ACTIVE_BOARD_START_COL + Math.floor(ACTIVE_BOARD_COLUMNS / 2));
}

function isBoardCellLocked(index) {
  if (isInitialActiveCell(index)) return false;
  return !state.unlockedCells.includes(index);
}

function isInitialActiveCell(index) {
  const row = Math.floor(index / BOARD_COLUMNS);
  const col = index % BOARD_COLUMNS;
  return (
    row >= ACTIVE_BOARD_START_ROW &&
    row < ACTIVE_BOARD_START_ROW + ACTIVE_BOARD_ROWS &&
    col >= ACTIVE_BOARD_START_COL &&
    col < ACTIVE_BOARD_START_COL + ACTIVE_BOARD_COLUMNS
  );
}

function lockedCellItemId(index) {
  if (!isBoardCellLocked(index)) return null;
  const row = Math.floor(index / BOARD_COLUMNS);
  const col = index % BOARD_COLUMNS;
  return LOCKED_CELL_ITEM_ROWS[row]?.[col] ?? "hubing_01_dough";
}

function lockedCellVisual(index) {
  const row = Math.floor(index / BOARD_COLUMNS);
  const col = index % BOARD_COLUMNS;
  const visualId = LOCKED_CELL_VISUAL_ROWS[row]?.[col];
  if (!visualId) return null;
  const material = LOCKED_MATERIAL_VISUALS[visualId];
  if (material) {
    return {
      name: material[0],
      src: `./assets/generator-materials/${material[1]}`,
      kind: "material",
    };
  }
  const item = byId.get(visualId);
  if (!item) return null;
  return { name: item.name, src: itemAssetSrc(item), kind: item.type };
}

function renderOrders() {
  els.orders.innerHTML = "";
  state.visibleOrders.forEach((orderId) => {
    const order = getOrder(orderId);
    if (!order) return;
    const demandStates = order.demand
      .map((demand) => {
        const item = byId.get(demand.itemId);
        if (!item) return null;
        const owned = countItem(demand.itemId);
        const missing = Math.max(0, demand.quantity - owned);
        return { demand, item, owned, missing };
      })
      .filter(Boolean);
    const canComplete = demandStates.length > 0 && demandStates.every((entry) => entry.missing === 0);
    const card = document.createElement("article");
    card.className = `order-card ${canComplete ? "ready" : ""}`;
    card.tabIndex = 0;
    card.setAttribute("role", "button");
    card.setAttribute("aria-label", `${order.npcName}订单详情`);

    const npcImg = document.createElement("img");
    npcImg.className = "npc-avatar";
    npcImg.src = `./assets/npc_standee/${order.npcId}.png?v=${NPC_STANDEE_VERSION}`;
    npcImg.alt = order.npcName;

    const reward = document.createElement("div");
    reward.className = "reward-bubble";
    reward.innerHTML = `<img src="./assets/ui/ui_coin_copper.png" alt="" /><span>${order.reward.coins}</span>`;

    const foods = document.createElement("div");
    foods.className = "need-items";
    demandStates.forEach(({ item, demand }) => {
      for (let i = 0; i < Math.min(demand.quantity, 3); i++) {
        const f = document.createElement("img");
        f.src = itemAssetSrc(item);
        f.alt = item.name;
        foods.append(f);
      }
    });

    const deliver = document.createElement("button");
    deliver.type = "button";
    deliver.className = `deliver-btn ${canComplete ? "ready" : ""}`;
    deliver.textContent = "交付";
    deliver.addEventListener("click", (event) => {
      event.stopPropagation();
      completeOrder(order.id);
    });

    const tray = document.createElement("img");
    tray.className = "tray";
    tray.src = "./assets/order_tray_approved_front.png";
    tray.alt = "";

    card.append(npcImg, reward, foods, tray, deliver);
    card.addEventListener("click", () => openOrderDetail(order.id));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") openOrderDetail(order.id);
    });
    els.orders.append(card);
  });
}

function renderBoard() {
  els.board.innerHTML = "";
  state.board.forEach((itemId, index) => {
    const cell = document.createElement("div");
    const locked = isBoardCellLocked(index);
    cell.className = `cell ${locked ? "locked" : ""} ${state.selectedIndex === index ? "selected" : ""} ${state.pulseIndex === index ? "merge-pop" : ""} ${state.unlockPulseIndex === index ? "unlock-pop" : ""} ${isTutorialBoardFocus(itemId) ? "tutorial-focus" : ""}`;
    cell.dataset.index = index;
    cell.setAttribute("role", "button");
    cell.tabIndex = locked ? -1 : 0;
    if (locked) {
      cell.removeAttribute("aria-disabled");
      const lockedItem = byId.get(lockedCellItemId(index));
      const visual = lockedCellVisual(index);
      cell.setAttribute("aria-label", visual ? visual.name : lockedItem ? lockedItem.name : "待解锁格");
      if (visual) {
        const img = document.createElement("img");
        img.className = `item locked-preview ${visual.kind === "material" ? "locked-material-preview" : ""}`;
        img.alt = visual.name;
        img.src = visual.src;
        cell.append(img);
      }
      const dust = Object.assign(document.createElement("img"), {
        className: "locked-dust",
        src: "./assets/ui/locked.png",
        alt: "",
      });
      cell.append(dust);
    } else if (itemId) {
      const item = byId.get(itemId);
      if (!item) return;
      const img = document.createElement("img");
      img.className = `item ${item.type?.includes("generator") ? "generator" : ""} ${item.type === "gift_box" ? "gift-box" : ""}`;
      img.alt = item.name;
      img.src = itemAssetSrc(item);
      cell.append(img);
      if (item.type?.includes("generator")) {
        const generatorState = getGeneratorState(item.id);
        const badge = document.createElement("span");
        badge.className = "generator-badge";
        if (item.type === "auto_generator") {
          const seconds = Math.max(0, Math.ceil((generatorState.cooldownEnd - Date.now()) / 1000));
          badge.textContent = seconds > 0 ? `${seconds}s` : "自动";
        } else {
          badge.textContent = generatorState.cooldownEnd > Date.now() ? "冷却" : `${generatorState.charges}/${item.generator.chargeMax}`;
        }
        cell.append(badge);
      } else if (item.type === "gift_box") {
        const giftState = state.giftBoxStates[index];
        const pack = giftState ? GIFT_PACKS[giftState.packId] : null;
        const badge = document.createElement("span");
        badge.className = "generator-badge gift-badge";
        badge.textContent = pack ? `${Math.max(0, pack.rewards.length - giftState.nextRewardIndex)}份` : "礼";
        cell.append(badge);
      }
    }
    if (state.unlockPulseIndex === index) {
      cell.append(Object.assign(document.createElement("span"), { className: "unlock-sand-burst" }));
    }
    if (!locked) {
      cell.addEventListener("pointerdown", onCellPointerDown);
      cell.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        handleCellClick(index);
      });
    } else {
      cell.addEventListener("pointerdown", onCellPointerDown);
      cell.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        handleCellClick(index);
      });
    }
    els.board.append(cell);
  });
}

function preventBrowserSmartZoom() {
  let lastTouchEnd = 0;
  document.addEventListener(
    "dblclick",
    (event) => {
      if (event.target.closest(".board")) event.preventDefault();
    },
    { passive: false },
  );
  document.addEventListener(
    "touchend",
    (event) => {
      const now = Date.now();
      if (event.target.closest(".board") && now - lastTouchEnd <= 360) {
        event.preventDefault();
      }
      lastTouchEnd = now;
    },
    { passive: false },
  );
  document.addEventListener(
    "gesturestart",
    (event) => {
      if (event.target.closest(".board")) event.preventDefault();
    },
    { passive: false },
  );
}

function renderSelected() {
  const itemId = isBoardCellLocked(state.selectedIndex) ? null : state.board[state.selectedIndex];
  const selectedPanel = els.sellBtn.closest(".selected");
  if (selectedPanel) selectedPanel.hidden = false;
  selectedPanel?.classList.toggle("empty", !itemId);
  selectedPanel?.classList.remove("no-sell");
  setSellButtonValue(0);
  if (!itemId) {
    els.selectedName.textContent = "轻点棋子查看";
    els.selectedText.textContent = "";
    els.sellBtn.disabled = true;
    return;
  }
  const item = byId.get(itemId);
  if (!item) {
    els.selectedName.textContent = "未知物品";
    els.selectedText.textContent = "这件物品的数据还没配置完整。";
    els.sellBtn.disabled = true;
    return;
  }
  if (item.type === "gift_box") {
    selectedPanel?.classList.add("no-sell");
    const giftState = state.giftBoxStates[state.selectedIndex];
    const pack = giftState ? GIFT_PACKS[giftState.packId] : null;
    els.selectedName.textContent = pack?.name ?? item.name;
    els.selectedText.textContent = pack ? `点击礼盒包，每次掉落1份奖励。还剩${pack.rewards.length - giftState.nextRewardIndex}份。` : item.modernName;
    els.sellBtn.disabled = true;
    return;
  }
  if (item.type?.includes("generator")) {
    selectedPanel?.classList.add("no-sell");
    const generatorState = getGeneratorState(item.id);
    els.selectedName.textContent = item.name;
    els.selectedText.textContent =
      item.type === "manual_generator"
        ? `点击产出食材，消耗${item.generator.staminaCost}点驼铃。充能 ${generatorState.charges}/${item.generator.chargeMax}。`
        : "自动向周边8格投放食材，不消耗驼铃。";
    els.sellBtn.disabled = true;
    return;
  }
  const codex = codexById.get(item.codexId);
  els.selectedName.textContent = item.name;
  els.selectedText.textContent = `Lv${item.level ?? 1} · ${codex?.shortText ?? item.modernName}`;
  setSellButtonValue(item.sellValue ?? 0);
  els.sellBtn.disabled = false;
}

function setSellButtonValue(value) {
  els.sellBtn.innerHTML = `
    <b>出售</b>
    <span><img src="./assets/ui/ui_coin_copper.png" alt="" />+${value}</span>
  `;
}

function openSelectedPieceDetail() {
  const itemId = isBoardCellLocked(state.selectedIndex) ? null : state.board[state.selectedIndex];
  const item = itemId ? byId.get(itemId) : null;
  if (!item) {
    toast("先选中一枚棋子。");
    return;
  }
  const codex = codexById.get(item.codexId);
  els.pieceDetailIcon.src = itemAssetSrc(item);
  els.pieceDetailIcon.alt = item.name;
  els.pieceDetailName.textContent = item.name;
  els.pieceDetailMeta.textContent = item.type?.includes("generator")
    ? `Lv${item.level ?? 1} · ${item.modernName ?? "生成器"}`
    : `Lv${item.level ?? 1} · 售价 ${item.sellValue ?? 0} 铜币`;
  if (item.type === "manual_generator") {
    const generatorState = getGeneratorState(item.id);
    els.pieceDetailText.textContent = `点击产出食材，消耗${item.generator.staminaCost}点驼铃。当前充能 ${generatorState.charges}/${item.generator.chargeMax}。`;
  } else if (item.type === "auto_generator") {
    els.pieceDetailText.textContent = "自动向周边空格投放食材，不消耗驼铃。";
  } else {
    els.pieceDetailText.textContent = codex?.shortText ?? item.modernName ?? "这枚棋子还没有配置详情。";
  }
  els.pieceDetailModal.showModal();
}

function renderBagButton() {
  const used = state.bag.filter(Boolean).length;
  const giftCount = totalGiftPackCount();
  els.bagBtn.querySelector("span").textContent = giftCount > 0 ? `行囊 礼${giftCount}` : `行囊 ${used}/3`;
}

function renderInnButton() {
  const gate = canEnterRepairPage();
  const next = nextRepairMilestone();
  [els.stationBtn, els.stationHudBtn, els.repairSideBtn].filter(Boolean).forEach((button) => {
    button.classList.toggle("locked", !gate.ok);
    button.classList.toggle("repair-ready", gate.ok && Boolean(next));
  });
  if (els.stationBtn) {
    const span = els.stationBtn.querySelector("span");
    if (span) span.textContent = "流沙驿";
  }
}

function renderTutorial() {
  document.querySelectorAll(".tutorial-action").forEach((element) => element.classList.remove("tutorial-action"));

  if (state.tutorialStep === 0) {
    keeper("先点案板上的小石磨，消耗驼铃收下一份麦面。");
  } else if (state.tutorialStep === 1) {
    keeper("再用小石磨收一份麦面，把两个麦面剂拖到一起，揉成炉饼。");
  } else if (state.tutorialStep === 2) {
    keeper("炉饼做好了，交给沙州驿卒试试。");
  } else if (state.tutorialStep === 3) {
    els.codexBtn.classList.add("tutorial-action");
    keeper("第一张食谱已经记下。点「食单」看看收录。");
  }
}

function isTutorialBoardFocus(itemId) {
  if (state.tutorialStep !== 1) return false;
  return itemId === "hubing_01_dough";
}

function onCellPointerDown(event) {
  const index = Number(event.currentTarget.dataset.index);
  if (isBoardCellLocked(index)) return;

  const prevSelected = state.selectedIndex;
  state.selectedIndex = index;
  const itemId = state.board[index];

  // Empty cell: just select
  if (!itemId) { render(); return; }

  const item = byId.get(itemId);
  if (!item) { render(); return; }

  event.preventDefault();
  dragging = {
    fromIndex: index,
    itemId,
    startX: event.clientX,
    startY: event.clientY,
    lastX: event.clientX,
    lastY: event.clientY,
    moved: false,
    ghost: null,
    prevSelected,
    dragDx: 0,
    dragDy: 0,
  };

  const cell = event.currentTarget;
  // Listen on window so the drag always receives move/up regardless of which
  // element holds pointer capture. We intentionally skip setPointerCapture —
  // on real touch devices capture can distort pointerup coordinates.
  window.addEventListener("pointermove", moveCellPointer);
  window.addEventListener("pointerup", endCellPointer, { once: true });
  window.addEventListener("pointercancel", cancelCellPointer, { once: true });
}

function createDragGhost(item) {
  const ghost = document.createElement("img");
  ghost.className = "drag-ghost";
  ghost.src = itemAssetSrc(item);
  document.body.append(ghost);
  return ghost;
}

function positionDragGhost(x, y) {
  if (!dragging?.ghost) return;
  dragging.ghost.style.left = `${x}px`;
  dragging.ghost.style.top = `${y}px`;
}

function removeDragGhost() {
  if (dragging?.ghost) dragging.ghost.remove();
  if (dragging) dragging.ghost = null;
}

function moveCellPointer(event) {
  if (!dragging) return;
  const dx = event.clientX - dragging.startX;
  const dy = event.clientY - dragging.startY;

  // Track hover position AND drag direction vector.
  // Direction vector is the ultimate fallback when CSS transform makes
  // all absolute coordinates unreliable (scale/translate offsets).
  dragging.hoverIndex = getCellIndexFromPoint(event.clientX, event.clientY);
  dragging.dragDx = dx;
  dragging.dragDy = dy;

  if (!dragging.moved && Math.hypot(dx, dy) < 8) return;

  dragging.moved = true;
  dragging.lastX = event.clientX;
  dragging.lastY = event.clientY;
  // Track which cell the cursor is hovering over during drag — this
  // becomes the drop target when pointerup fires with garbage coords.
  dragging.hoverIndex = getCellIndexFromPoint(event.clientX, event.clientY);
  if (!dragging.ghost) {
    const item = byId.get(dragging.itemId);
    if (item) dragging.ghost = createDragGhost(item);
  }
  positionDragGhost(event.clientX, event.clientY);
  els.storageBtn?.classList.toggle("drop-ready", isStorageDropPoint(event.clientX, event.clientY));
}

function endCellPointer(event) {
  cleanupCellPointer(event.currentTarget, event.pointerId);
  if (!dragging) return;

  const { fromIndex, itemId, moved, prevSelected, hoverIndex, lastX, lastY } = dragging;
  // ── Early log: show moved flag before any branching ──
  try { window.__dbg?.("END-Drag from=" + fromIndex + " item=" + itemId + " moved=" + moved + " prevSel=" + prevSelected + " hover=" + hoverIndex); } catch{}
  // ───────────────────────────────────────────────────

  // ── Drop target resolution (v20: DIRECTION VECTOR IS PRIMARY) ──
  // The board has CSS transform: scale(1.12) translate(-50%,-50%) which
  // makes ALL absolute coordinates systematically offset on real devices.
  // On this user's machine: hover=undefined, clientX exceeds viewport width
  // (Chrome Responsive Mode), coordinate lookup always lands on wrong cell.
  //
  // v20 Strategy:
  //   1) Compute DIRECTION VECTOR — the ONLY reliable signal of intent.
  //   2) Use hover/coords ONLY as secondary reference.
  //   3) If coords say "locked cell" but direction says elsewhere → TRUST DIRECTION.
  //   4) Direction resolution:
  //      - Same-type neighbour → MERGE (primary intent)
  //      - Empty cell → MOVE
  //      - Locked cell → let locked handler decide (may be genuine unlock attempt)
  //      - Different-type occupied → let occupied handler decide
  //      - No clear direction → fall back to coords/hover
  const { dragDx, dragDy } = dragging;
  const dirTarget = getTargetFromDirection(fromIndex, dragDx, dragDy);
  const dirItem = (dirTarget !== null && dirTarget !== fromIndex) ? state.board[dirTarget] : null;

  // Secondary: hover/coords for reference only
  let coordIndex = null;
  if (hoverIndex != null && hoverIndex >= 0) {
    coordIndex = hoverIndex;
  } else {
    const rawX = event.isTrusted ? (event.clientX || lastX) : (lastX ?? event.clientX);
    const rawY = event.isTrusted ? (event.clientY || lastY) : (lastY ?? event.clientY);
    const { x: sx, y: sy } = sanitiseDropCoords(rawX, rawY, lastX, lastY);
    coordIndex = getCellIndexFromPoint(sx, sy);
  }

  // ── Resolve final toIndex: DIRECTION FIRST ──
  let toIndex = null;
  let dropMethod = "none";
  const _dlog = "(" + Math.round(dragDx) + "," + Math.round(dragDy) + ")";

  if (moved && dirTarget !== null && dirTarget !== fromIndex) {
    if (dirItem === itemId) {
      toIndex = dirTarget; dropMethod = "DIR-MERGE";
    } else if (!dirItem && !isBoardCellLocked(dirTarget)) {
      toIndex = dirTarget; dropMethod = "DIR-MOVE";
    } else if (isBoardCellLocked(dirTarget)) {
      toIndex = dirTarget; dropMethod = "DIR-LOCKED";
    } else {
      toIndex = dirTarget; dropMethod = "DIR-OCCUPIED";
    }
  }

  // Fallback: no valid direction target → use coords
  if ((toIndex === null || toIndex === fromIndex) && coordIndex !== null && coordIndex >= 0 && coordIndex !== fromIndex) {
    toIndex = coordIndex;
    dropMethod = (hoverIndex != null && hoverIndex >= 0) ? "hover" : "coords";
  }

  try { window.__dbg?.("DROP-TARGET: dir=" + _dlog + " ⇒ dT=" + (dirTarget?? "?") + "(dI=" + (dirItem?byId.get(dirItem)?.name:"∅") + ") cI=" + (coordIndex?? "?") + " → " + toIndex + " [" + dropMethod + "]"); } catch{}
  // ─────────────────────────────────────────────────────────────────────

  removeDragGhost();
  els.storageBtn?.classList.remove("drop-ready");
  dragging = null;

  // Drag to storage
  if (isStorageDropPoint(event.clientX, event.clientY)) {
    suppressNextCellClickBriefly();
    storeBoardItemToStorage(fromIndex);
    return;
  }

  // No drag movement: click behavior
  if (!moved) {
    handleCellClick(fromIndex, prevSelected);
    return;
  }

  // Drag ended outside board or same cell
  if (toIndex === null || toIndex === fromIndex || toIndex < 0) {
    render();
    return;
  }

  suppressNextCellClickBriefly();

  // ── Anti-disappear safety net: snapshot source before any mutation ──
  const _srcBefore = state.board[fromIndex];
  const _log = (msg) => { try { window.__dbg?.("ACTION: " + msg); } catch{} };
  const _nid = (id) => id ? (byId.get(id)?.name || id) : "(空)";
  // Anti-disappear: if source was cleared but item isn't anywhere on board,
  // AND no successful action (merge/unlock/move) consumed it, restore it.
  // Skip for MERGE/UNLOCK/MOVE paths — those intentionally consume the source.
  const _safetyNet = (fi, ii, log, nid, actionTaken) => {
    if (actionTaken) return;  // merge/unlock/move already handled the item
    if (state.board[fi] === null && !state.board.includes(ii)) {
      log("⚠️ SAFETY-NET: restoring " + nid(ii) + " to [" + fi + "]");
      state.board[fi] = ii;
    }
  };
  _log("target[" + toIndex + "]=" + _nid(state.board[toIndex]) + " moved=" + moved);
  // ────────────────────────────────────────────────────────────────

  // Drag landed on a locked cell. Two intents are possible:
  //  1) The dragged item IS the key this cell needs -> unlock it, and the
  //     resulting piece (its merge product) stays ON THIS cell (B). This is the
  //     primary intent when dropping on a covered/locked tile, matching merge-
  //     style games (e.g. 梦幻消除战): the cover clears and the result occupies
  //     the tile. Always honour this first.
  //  2) The item does not match -> the player likely meant to merge with a
  //     same-type piece sitting next to the drop point (an off-by-a-pixel drop).
  //     Snap the merge to that neighbour instead of popping a "needs X" toast.
  if (isBoardCellLocked(toIndex)) {
    if (lockedCellItemId(toIndex) === itemId) {
      _log("UNLOCK " + toIndex + " (needs " + _nid(itemId) + ") ✓");
      unlockLockedCellByMerge(fromIndex, toIndex, itemId);
      _safetyNet(fromIndex, itemId, _log, _nid, true);
      render();
      saveState();
      maybePromptRepairGuide();
      return;
    }
    const adj = findAdjacentMergeTarget(fromIndex, toIndex, itemId);
    if (adj !== -1) {
      _log("LOCKED→ADJ-MERGE from=" + fromIndex + " → adj=" + adj + " (drop was locked " + toIndex + ")");
      mergeCells(fromIndex, adj, itemId);
      _safetyNet(fromIndex, itemId, _log, _nid, true);
      render();
      saveState();
      maybePromptRepairGuide();
      return;
    }
    _log("LOCKED→TOAST " + toIndex + " (needs " + _nid(lockedCellItemId(toIndex)) + ", have " + _nid(itemId) + ")");
    unlockLockedCellByMerge(fromIndex, toIndex, itemId);
    _safetyNet(fromIndex, itemId, _log, _nid, false);
    render();
    saveState();
    maybePromptRepairGuide();
    return;
  }
  // Drag to empty cell = move
  const targetItemId = state.board[toIndex];
  if (!targetItemId) {
    _log("MOVE " + fromIndex + " → " + toIndex + " (item=" + _nid(itemId) + ")");
    state.board[toIndex] = itemId;
    state.board[fromIndex] = null;
    state.selectedIndex = toIndex;
    keeper("挪一挪案板，路上的吃食就有地方摆了。");
  } else if (targetItemId === itemId) {
    _log("MERGE " + fromIndex + "+" + toIndex + " (" + _nid(itemId) + ")");
    mergeCells(fromIndex, toIndex, itemId);
  } else {
    // Forgiving drop: release landed on a non-matching occupied cell
    // (e.g. the generator between two pieces), but a same-type piece sits
    // in an adjacent cell — snap the merge there so a slightly-off drag still works.
    const adj = findAdjacentMergeTarget(fromIndex, toIndex, itemId);
    if (adj !== -1) {
      _log("OCCUPIED→ADJ-MERGE from=" + fromIndex + " → adj=" + adj + " (drop=" + toIndex + " had " + _nid(targetItemId) + ")");
      mergeCells(fromIndex, adj, itemId);
    } else {
      _log("NO-MERGE from=" + fromIndex + " drop=" + toIndex + " (have " + _nid(itemId) + ", target has " + _nid(targetItemId) + ")");
      toast("这两样食物不能合成。");
    }
  }

  // ── Anti-disappear safety net ────────────────────────────────
  // Only for paths where no valid action consumed the item (e.g. NO-MERGE).
  // MOVE/MERGE/ADJ-MERGE already placed the item somewhere.
  const _noAction = !targetItemId /* empty: MOVE */ || targetItemId === itemId /* same: MERGE */ ||
    (targetItemId !== itemId && findAdjacentMergeTarget(fromIndex, toIndex, itemId) !== -1); /* adj-merge */
  if (!_noAction && state.board[fromIndex] === null && !state.board.includes(itemId)) {
    _log("⚠️ SAFETY-NET: restoring " + _nid(itemId) + " to [" + fromIndex + "] — lost!");
    state.board[fromIndex] = itemId;
  }
  // ─────────────────────────────────────────────────────────────
  render();
  saveState();
  maybePromptRepairGuide();
}

function findAdjacentMergeTarget(fromIndex, toIndex, itemId) {
  // Prefer the cell next to the DROP POINT (toIndex) — that is the piece the
  // player was aiming at. Only fall back to the drag source's neighbours when
  // no same-type piece sits beside the drop point.
  for (const base of [toIndex, fromIndex]) {
    const row = Math.floor(base / BOARD_COLUMNS);
    const col = base % BOARD_COLUMNS;
    for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const nr = row + dr;
      const nc = col + dc;
      if (nr < 0 || nr >= BOARD_ROWS || nc < 0 || nc >= BOARD_COLUMNS) continue;
      const candidate = nr * BOARD_COLUMNS + nc;
      if (candidate !== fromIndex && !isBoardCellLocked(candidate) && state.board[candidate] === itemId) {
        return candidate;
      }
    }
  }
  return -1;
}

function cancelCellPointer(event) {
  cleanupCellPointer(event.currentTarget, event.pointerId);
  removeDragGhost();
  els.storageBtn?.classList.remove("drop-ready");
  dragging = null;
  render();
}

function cleanupCellPointer(cell, pointerId) {
  try { cell.releasePointerCapture?.(pointerId); } catch { /* ignore */ }
  window.removeEventListener("pointermove", moveCellPointer);
  window.removeEventListener("pointerup", endCellPointer);
  window.removeEventListener("pointercancel", cancelCellPointer);
}

/// ── Direction-vector drop target ─────────────────────────────────
/// Determines which neighbour cell the user intended to drop on based
/// on the drag direction vector (dx, dy). This bypasses CSS transform
/// coordinate offset issues entirely — it only uses relative movement.
function getTargetFromDirection(fromIndex, dx, dy) {
  if (!dx && !dy) return null;
  const row = Math.floor(fromIndex / BOARD_COLUMNS);
  const col = fromIndex % BOARD_COLUMNS;

  // Pick the dominant axis of movement
  let targetRow = row, targetCol = col;
  if (Math.abs(dx) > Math.abs(dy)) {
    targetCol = col + (dx > 0 ? 1 : -1);
  } else {
    targetRow = row + (dy > 0 ? 1 : -1);
  }

  // Bounds check
  if (targetRow < 0 || targetRow >= BOARD_ROWS || targetCol < 0 || targetCol >= BOARD_COLUMNS) return null;
  return targetRow * BOARD_COLUMNS + targetCol;
}

function getCellIndexFromPoint(x, y) {
  // Robust: iterate every .cell's real rendering rect and pick the one
  // that contains (or is closest to) the point.  No CSS Grid math, no gap
  // padding assumptions — works at any zoom / device-pixel-ratio / layout.
  const cells = els.board.querySelectorAll(".cell");
  let best = -1, bestDist = Infinity;
  for (let i = 0; i < cells.length; i++) {
    const r = cells[i].getBoundingClientRect();
    if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom)
      return Number(cells[i].dataset.index);   // exact hit
    // closest-center fallback (for points in gaps / off by a pixel)
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const d = (x - cx) * (x - cx) + (y - cy) * (y - cy);
    if (d < bestDist) { bestDist = d; best = Number(cells[i].dataset.index); }
  }
  return best;  // may be -1 if board has no cells at all
}

/// ── Coordinate sanitiser ────────────────────────────────────────
/// Detects out-of-viewport / garbage coordinates (e.g. Chrome
/// Responsive Design Mode reporting window coords instead of iframe
/// coords) and falls back to the last known good position from the
/// drag trail.  Also logs the board rect & viewport for debugging.
function sanitiseDropCoords(rawX, rawY, fallbackX, fallbackY) {
  const vw = window.innerWidth || 0;
  const vh = window.innerHeight || 0;
  const ok = (rawX >= -10 && rawX <= vw + 10 && rawY >= -10 && rawY <= vh + 10);
  if (!ok && fallbackX != null) {
    try { window.__dbg?.("COORD-SANITISE: (" + Math.round(rawX) + "," + Math.round(rawY) + ") → fallback (" + Math.round(fallbackX) + "," + Math.round(fallbackY) + ")  vw=" + vw + "×" + vh); } catch{}
    return { x: fallbackX, y: fallbackY };
  }
  return { x: rawX, y: rawY };
}

function handleCellClick(index, prevSelected = state.selectedIndex) {
  try { window.__dbg?.("CLICK idx=" + index + " prevSel=" + prevSelected + " board[" + index + "]=" + (state.board[index] ? (byId.get(state.board[index])?.name || state.board[index]) : "(空)")); } catch{}
  // Click on locked cell: try to unlock with selected piece
  if (isBoardCellLocked(index)) {
    if (prevSelected !== null && !isBoardCellLocked(prevSelected)) {
      const selectedItemId = state.board[prevSelected];
      unlockLockedCellByMerge(prevSelected, index, selectedItemId);
      render();
      saveState();
      maybePromptRepairGuide();
      return;
    }
    const lockedItem = byId.get(lockedCellItemId(index));
    toast(lockedItem ? `拿一份${lockedItem.name}来合成，就能解开这格。` : "推进合成后解锁这里。");
    return;
  }

  const itemId = state.board[index];
  const item = itemId ? byId.get(itemId) : null;

  // Generator click
  if (item?.type === "manual_generator") {
    activateManualGenerator(index);
    return;
  }
  if (item?.type === "gift_box") {
    openGiftBoxOnBoard(index);
    return;
  }

  // Deselect (tapped the already-selected cell)
  if (prevSelected === index) {
    state.selectedIndex = null;
    render();
    return;
  }

  // Try merge with selected
  if (prevSelected !== null && !isBoardCellLocked(prevSelected)) {
    const selectedItemId = state.board[prevSelected];
    if (itemId && selectedItemId === itemId) {
      mergeCells(prevSelected, index, selectedItemId);
      render();
      saveState();
      maybePromptRepairGuide();
      return;
    }
    // Try move to empty
    if (!itemId) {
      state.board[index] = selectedItemId;
      state.board[prevSelected] = null;
      state.selectedIndex = index;
      render();
      saveState();
      return;
    }
  }

  // Select
  state.selectedIndex = index;
  render();
}

function isStorageDropPoint(x, y) {
  if (!els.storageBtn) return false;
  const rect = els.storageBtn.getBoundingClientRect();
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

function unlockLockedCellByMerge(fromIndex, toIndex, itemId) {
  const lockedItemId = lockedCellItemId(toIndex);
  const item = byId.get(itemId);
  const lockedItem = byId.get(lockedItemId);
  if (!lockedItemId || lockedItemId !== itemId) {
    toast(lockedItem ? `需要用${lockedItem.name}来解开这格。` : "这格还被风沙遮住。");
    return;
  }
  state.unlockedCells = [...new Set([...state.unlockedCells, toIndex])];
  state.board[fromIndex] = null;
  const outputId = item?.mergeTo ?? itemId;
  state.board[toIndex] = outputId;
  state.selectedIndex = toIndex;
  state.pulseIndex = toIndex;
  state.unlockPulseIndex = toIndex;
  const output = byId.get(outputId);
  keeper(`风沙散开，解开了一格：${output?.name ?? lockedItem.name}。`);
  toast(`解锁格子：${output?.name ?? lockedItem.name}`);
  if (navigator.vibrate) navigator.vibrate(16);
  if (item?.boxMaterial) tryBuildGeneratorFromMaterials(itemId);
  if (item?.mergeTo) unlockCodex(byId.get(item.mergeTo)?.codexId);
  clearPulseSoon();
}

function suppressNextCellClickBriefly() {
  suppressNextCellClick = true;
  clearTimeout(suppressNextCellClickTimer);
  suppressNextCellClickTimer = setTimeout(() => {
    suppressNextCellClick = false;
    suppressNextCellClickTimer = null;
  }, 280);
}

function mergeCells(fromIndex, toIndex, itemId) {
  const item = byId.get(itemId);
  if (!item.mergeTo) {
    toast("已经是这条食谱的最高级了。");
    return;
  }
  state.board[fromIndex] = null;
  state.board[toIndex] = item.mergeTo;
  state.selectedIndex = toIndex;
  state.pulseIndex = toIndex;
  const next = byId.get(item.mergeTo);
  keeper(`做成了${next.name}。`);
  toast(`合成：${next.name}`);
  chainMergeAt(toIndex);
  clearPulseSoon();
  if (state.tutorialStep <= 1 && next.id === "hubing_02_lubing") {
    state.tutorialStep = 2;
  }
  unlockCodex(byId.get(state.board[toIndex])?.codexId);
}

function chainMergeAt(index) {
  let currentId = state.board[index];
  let current = byId.get(currentId);
  while (current?.mergeTo) {
    const neighbor = sameNeighborIndex(index, currentId);
    if (neighbor === -1) break;
    state.board[neighbor] = null;
    state.board[index] = current.mergeTo;
    currentId = state.board[index];
    current = byId.get(currentId);
    state.pulseIndex = index;
    unlockCodex(current.codexId);
  }
}

function sameNeighborIndex(index, itemId) {
  const row = Math.floor(index / BOARD_COLUMNS);
  const col = index % BOARD_COLUMNS;
  for (const [dr, dc] of [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]) {
    const nr = row + dr;
    const nc = col + dc;
    if (nr < 0 || nr >= BOARD_ROWS || nc < 0 || nc >= BOARD_COLUMNS) continue;
    const candidate = nr * BOARD_COLUMNS + nc;
    if (state.board[candidate] === itemId) return candidate;
  }
  return -1;
}

function activateManualGenerator(index) {
  const itemId = state.board[index];
  const item = byId.get(itemId);
  if (!item || item.type !== "manual_generator") return;
  const generatorState = getGeneratorState(item.id);
  const now = Date.now();
  if (!hasEmptyCell()) {
    toast("案板已满，暂时放不下新食材。");
    return;
  }
  if (generatorState.cooldownEnd > now) {
    const seconds = Math.ceil((generatorState.cooldownEnd - now) / 1000);
    toast(`${item.name}还在歇火，约${seconds}秒后可用。`);
    return;
  }
  if (state.stamina < item.generator.staminaCost) {
    toast("驼铃不足，手动生成器无法产出。");
    return;
  }

  state.stamina -= item.generator.staminaCost;
  generatorState.charges -= 1;
  if (generatorState.charges <= 0) {
    generatorState.charges = 0;
    generatorState.cooldownEnd = now + item.generator.cooldownSeconds * 1000;
  }

  const outputs = Math.min(item.generator.outputCount, emptyCellCount());
  for (let i = 0; i < outputs; i += 1) {
    const newItemId = pickFromWeightedPool(item.generator.pool);
    const outIndex = firstEmptyIndexFromTop();
    if (outIndex === -1) break;
    state.board[outIndex] = newItemId;
    state.pulseIndex = outIndex;
  }
  state.generationCount += 1;
  state.selectedIndex = index;
  if (state.tutorialStep === 0) state.tutorialStep = 1;
  keeper(`${item.name}备好了一份路上能用的食材。`);
  clearPulseSoon();
  render();
  saveState();
}

function getGeneratorState(itemId) {
  const item = byId.get(itemId);
  if (!state.generatorStates[itemId]) {
    state.generatorStates[itemId] = {
      charges: item?.generator?.chargeMax ?? 0,
      cooldownEnd: 0,
    };
  }
  const generatorState = state.generatorStates[itemId];
  if (item?.type === "manual_generator" && generatorState.cooldownEnd > 0 && generatorState.cooldownEnd <= Date.now()) {
    generatorState.charges = item.generator.chargeMax;
    generatorState.cooldownEnd = 0;
  }
  return generatorState;
}

function tickGenerators() {
  let changed = false;
  Object.keys(state.generatorStates).forEach((itemId) => {
    const before = state.generatorStates[itemId].cooldownEnd;
    getGeneratorState(itemId);
    if (before && !state.generatorStates[itemId].cooldownEnd) changed = true;
  });
  state.board.forEach((itemId, index) => {
    const item = byId.get(itemId);
    if (item?.type !== "auto_generator") return;
    const generatorState = getGeneratorState(item.id);
    const now = Date.now();
    if (!generatorState.cooldownEnd) {
      generatorState.cooldownEnd = now + item.generator.cooldownSeconds * 1000;
      changed = true;
      return;
    }
    if (generatorState.cooldownEnd > now) return;
    const targets = neighborEmptyIndices(index);
    if (!targets.length) return;
    const outputs = Math.min(item.generator.outputCount, targets.length);
    for (let i = 0; i < outputs; i += 1) {
      const target = targets.splice(Math.floor(Math.random() * targets.length), 1)[0];
      state.board[target] = pickFromWeightedPool(item.generator.pool);
      state.pulseIndex = target;
    }
    generatorState.cooldownEnd = now + item.generator.cooldownSeconds * 1000;
    changed = true;
  });
  if (changed) render();
}

function pickFromWeightedPool(pool) {
  const total = pool.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = Math.random() * total;
  for (const entry of pool) {
    roll -= entry.weight;
    if (roll <= 0) return entry.itemId;
  }
  return pool[0].itemId;
}

function neighborEmptyIndices(index) {
  const row = Math.floor(index / BOARD_COLUMNS);
  const col = index % BOARD_COLUMNS;
  const targets = [];
  for (let dr = -1; dr <= 1; dr += 1) {
    for (let dc = -1; dc <= 1; dc += 1) {
      if (dr === 0 && dc === 0) continue;
      const nr = row + dr;
      const nc = col + dc;
      if (nr < 0 || nr >= BOARD_ROWS || nc < 0 || nc >= BOARD_COLUMNS) continue;
      const target = nr * BOARD_COLUMNS + nc;
      if (isBoardCellLocked(target)) continue;
      if (!state.board[target]) targets.push(target);
    }
  }
  return targets;
}

function unlockCodex(codexId) {
  if (!codexId || state.unlockedCodex.has(codexId)) return;
  state.unlockedCodex.add(codexId);
  const entry = codexById.get(codexId);
  const item = byId.get(entry.itemId);
  els.unlockIcon.src = itemAssetSrc(item);
  els.unlockName.textContent = entry.name;
  els.unlockText.textContent = entry.shortText;
  els.unlockModal.showModal();
}

function generateItem() {
  const index = firstEmptyIndex();
  if (index === -1) {
    toast("案板已满，先合成、出售或收进行囊吧。");
    return;
  }
  if (state.board.some((itemId) => byId.get(itemId)?.generatorType === "mill")) {
    toast("案板上已有磨坊，直接点击磨坊产出食材。");
    return;
  }
  state.board[index] = "gen_mill_01";
  state.selectedIndex = index;
  state.pulseIndex = index;
  clearPulseSoon();
  keeper("补回了一座小石磨。点击它才会消耗驼铃产出食材。");
  render();
  saveState();
}

function pickGeneratedItem() {
  let table = state.staminaConfig.generationTables[0];
  if (state.completedOrders >= 8) table = state.staminaConfig.generationTables[3];
  else if (state.unlockedCodex.has("codex_hubing_04")) table = state.staminaConfig.generationTables[2];
  else if (state.unlockedCodex.has("codex_hubing_03")) table = state.staminaConfig.generationTables[1];
  else if (state.generationCount < 10) table = state.staminaConfig.generationTables[0];

  const total = table.items.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * total;
  for (const item of table.items) {
    roll -= item.weight;
    if (roll <= 0) return item.itemId;
  }
  return table.items[0].itemId;
}

function completeOrder(orderId) {
  const order = getOrder(orderId);
  if (!order) return;
  for (const demand of order.demand) {
    if (countItem(demand.itemId) < demand.quantity) return;
  }
  for (const demand of order.demand) {
    removeItems(demand.itemId, demand.quantity);
  }
  state.coins += order.reward.coins;
  state.coinsEarned += order.reward.coins;
  state.completedOrders += 1;
  showCoinBurst(order.reward.coins);
  if (!state.completedOrderIds.includes(order.id)) {
    state.completedOrderIds.push(order.id);
  }
  if (state.tutorialStep === 2 && order.id === "order_001_guard_lubing") {
    state.tutorialStep = 3;
  }
  keeper(order.dialogue);
  syncGateOrder();
  replaceOrder(orderId);
  if (state.currentOrderDetailId === orderId && els.orderDetailModal.open) {
    els.orderDetailModal.close();
    state.currentOrderDetailId = null;
  }
  render();
  saveState();
}

function openOrderDetail(orderId) {
  state.currentOrderDetailId = orderId;
  renderOrderDetail();
  els.orderDetailModal.showModal();
}

function renderOrderDetail() {
  const order = getOrder(state.currentOrderDetailId);
  if (!order) return;
  const demandStates = order.demand
    .map((demand) => {
      const item = byId.get(demand.itemId);
      if (!item) return null;
      const owned = countItem(demand.itemId);
      const missing = Math.max(0, demand.quantity - owned);
      return { demand, item, owned, missing };
    })
    .filter(Boolean);
  const canComplete = demandStates.length > 0 && demandStates.every((entry) => entry.missing === 0);
  const missingTotal = demandStates.reduce((sum, entry) => sum + entry.missing, 0);
  const firstItem = demandStates[0]?.item;
  const codexUnlocked = Boolean(firstItem?.codexId && state.unlockedCodex.has(firstItem.codexId));

  els.orderDetailAvatar.src = `./assets/npc/${order.npcId}.png`;
  els.orderDetailAvatar.alt = order.npcName;
  els.orderDetailNpc.textContent = order.npcName;
  els.orderDetailDialogue.textContent = order.dialogue;
  els.orderDetailDemandList.innerHTML = demandStates
    .map(
      ({ demand, item, owned, missing }) => `
        <div class="order-detail-demand-item ${missing === 0 ? "ready" : ""}">
          <img src="${itemAssetSrc(item)}" alt="${item.name}" />
          <div>
            <strong>${item.name}</strong>
            <span>${lineLabel(item.line)} Lv${item.level} · ${item.modernName}</span>
            <p>${missing === 0 ? `已拥有 ${owned}/${demand.quantity}` : `已拥有 ${owned}/${demand.quantity}，还差 ${missing} 个`}</p>
          </div>
        </div>
      `
    )
    .join("");
  els.orderDetailRecipe.textContent = demandStates.map(({ item }) => recipeHint(item)).join("；");
  els.orderDetailCompleteBtn.disabled = !canComplete;
  els.orderDetailCompleteBtn.textContent = canComplete ? `交付得${order.reward.coins}铜币` : `还差${missingTotal}`;
  els.orderDetailCodexBtn.disabled = !codexUnlocked;
  els.orderDetailCodexBtn.textContent = codexUnlocked ? "查看食单" : "食单未解锁";
}

function openCodexFromOrderDetail() {
  const order = getOrder(state.currentOrderDetailId);
  if (!order) return;
  const item = byId.get(order.demand[0].itemId);
  if (!item?.codexId) return;
  if (!state.unlockedCodex.has(item.codexId)) return;
  els.orderDetailModal.close();
  openCodexDetail(item.codexId);
}

function completeOrderFromDetail() {
  if (!state.currentOrderDetailId) return;
  completeOrder(state.currentOrderDetailId);
}

function maybePromptRepairGuide() {
  if (state.currentPage !== "board") return;
  const gate = canEnterRepairPage();
  const milestone = gate.milestone;
  if (!gate.ok || !milestone) return;
  if (state.repairPromptedFor.includes(milestone.id)) return;
  state.repairPromptedFor.push(milestone.id);
  saveState();
  els.repairGuideTitle.textContent = milestone.sceneName ?? milestone.name;
  els.repairGuideAvatar.src = storyAvatarSrc(milestone.npcId);
  els.repairGuideAvatar.alt = milestone.speaker ?? "旅人";
  els.repairGuideText.textContent = "积攒足够铜钱后，点底部「流沙驿」进入修缮长卷。";
  els.repairGuideModal.showModal();
}

function recipeHint(item) {
  if (!item.mergeFrom) {
    if (item.line === "dairy") return "点击奶房食盒消耗驼铃，有机会收下鲜乳。";
    if (item.line === "hubing") return "点击小石磨消耗驼铃，有机会收下麦面剂。";
    return "点击对应食盒消耗驼铃，有机会收下基础食材。";
  }
  const previous = byId.get(item.mergeFrom);
  if (!previous) return "继续合成同源食物即可获得。";
  return `${previous.name} + ${previous.name} 合成 ${item.name}。`;
}

function lineLabel(line) {
  if (line === "hubing") return "胡饼线";
  if (line === "dairy") return "奶食线";
  if (line === "meat") return "肉食线";
  if (line === "spice") return "香料线";
  if (line === "fruit") return "果品线";
  if (line === "drink") return "浆饮线";
  return "食物线";
}

function replaceOrder(orderId) {
  const index = state.visibleOrders.indexOf(orderId);
  if (index < 0) return;
  // Don't replace the gate order
  const currentGate = REPAIR_GATE_SEQUENCE.find((oid) => !state.completedOrderIds.includes(oid));
  if (orderId === currentGate) { syncGateOrder(); return; }
  // Replace non-gate order with new one from pool
  const next = pickOrder();
  if (next) state.visibleOrders[index] = next.id;
}

function syncGateOrder() {
  const nextOrderId = REPAIR_GATE_SEQUENCE.find((orderId) => !state.completedOrderIds.includes(orderId));
  if (!nextOrderId) { state.visibleOrders = []; return; }
  // Ensure gate order is always first visible
  if (!state.visibleOrders.includes(nextOrderId)) {
    state.visibleOrders = [nextOrderId, ...state.visibleOrders.filter(id => id !== nextOrderId)];
  }
  // Fill remaining slots from pool (keep max 3)
  while (state.visibleOrders.length < (state.ordersConfig.maxVisibleOrders ?? 3)) {
    const next = pickOrder();
    if (!next) break;
    state.visibleOrders.push(next.id);
  }
}

function syncDemoOrder() {
  syncGateOrder();
}

function getOrder(orderId) {
  return state.ordersConfig.orders.find((entry) => entry.id === orderId);
}

function pickOrder() {
  const pool = state.ordersConfig.orders.filter((order) => {
    if (state.visibleOrders.includes(order.id)) return false;
    if (order.weight <= 0) return false;
    if (order.unlock.startsWith("codex_") && !state.unlockedCodex.has(order.unlock)) return false;
    if (order.unlock === "completed_orders_8" && state.completedOrders < 8) return false;
    return true;
  });
  const fallback = state.ordersConfig.orders.filter((order) => order.weight > 0 && !state.visibleOrders.includes(order.id));
  const candidates = pool.length ? pool : fallback;
  const total = candidates.reduce((sum, order) => sum + order.weight, 0);
  let roll = Math.random() * total;
  for (const order of candidates) {
    roll -= order.weight;
    if (roll <= 0) return order;
  }
  return candidates[0];
}

function applyMilestones() {
}


function openStation() {
  renderStation();
  els.stationModal.showModal();
}

function renderStation() {
  const milestones = getMilestoneViews();
  const doneCount = milestones.filter((milestone) => milestone.done).length;
  const repairCount = Object.keys(state.renovationChoices).length;
  const chapter = activeStoryChapter();
  els.stationSummary.textContent = `Lv${chapter} ${chapterName(chapter)}：已推进 ${doneCount}/${milestones.length} 个修缮节点，已修好 ${repairCount} 处。`;
  renderStationPreview(milestones);
  renderStories();
  els.stationMilestones.innerHTML = "";

  milestones.forEach((milestone) => {
    const card = document.createElement("article");
    card.className = `station-card ${milestone.done ? "done" : ""}`;
    card.innerHTML = `
      <div class="station-card-head">
        <strong>${milestone.name}</strong>
        <span>${milestone.done ? "已完成" : "修缮中"}</span>
      </div>
      <div class="station-progress"><i style="width: ${milestone.percent}%"></i></div>
      <p>${milestone.requirementText}</p>
      <small>${milestone.rewardText}</small>
    `;
    els.stationMilestones.append(card);
  });

  const next = milestones.find((milestone) => !milestone.done);
  els.stationNextLine.textContent = next ? `下一步：${next.nextText}` : "四卷主线已完成，流沙驿与街巷已亮成灯火。";
}

function renderStationPreview(milestones) {
  const previewSlots = [
    { id: "tutorial_complete", label: "门面", empty: "待定门面" },
    { id: "kitchen_repair", label: "后厨", empty: "待修后厨" },
    { id: "codex_first_phase", label: "食单", empty: "待布食单" },
  ];
  els.stationPreview.innerHTML = `
    <div class="station-scene">
      <div class="scene-sky"></div>
      <div class="scene-house">
        <div class="scene-roof"></div>
        <div class="scene-door"></div>
      </div>
      <div class="scene-ground"></div>
      <div class="decor-row">
        ${previewSlots
          .map((slot) => {
            const repaired = Boolean(state.renovationChoices[slot.id]);
            return `
              <div class="decor-slot ${repaired ? "picked" : "empty"}">
                <i class="decor-object decor-${repaired ? "completed" : "empty"}"></i>
                <b>${slot.label}</b>
                <span>${repaired ? "已修好" : slot.empty}</span>
              </div>
            `;
          })
          .join("")}
      </div>
    </div>
  `;
}

function renderStories() {
  const stories = getStoryViews();
  const unlocked = stories.filter((story) => story.unlocked);
  els.storyList.innerHTML = `
    <div class="story-list-head">
      <strong>流沙驿札记</strong>
      <span>${unlocked.length}/${stories.length}</span>
    </div>
  `;
  stories.forEach((story) => {
    const card = document.createElement("button");
    card.className = `story-card ${story.unlocked ? "" : "locked"}`;
    card.disabled = !story.unlocked;
    card.innerHTML = `
      <img src="${storyAvatarSrc(story.npcId)}" alt="" />
      <div>
        <b>${story.unlocked ? story.title : "尚未发生"}</b>
        <span>${story.unlocked ? `${story.speaker} · ${story.text}` : story.lockText}</span>
      </div>
    `;
    if (story.unlocked) {
      card.addEventListener("click", () => openStory(story.id));
    }
    els.storyList.append(card);
  });
}

function getStoryViews() {
  return (state.progressionConfig.stories ?? []).map((story) => {
    const unlocked = isConditionMet(story.unlock);
    return {
      ...story,
      unlocked,
      lockText: storyLockText(story.unlock),
    };
  });
}

function storyLockText(conditions) {
  if (conditions.always) return "已解锁";
  const checks = getMilestoneChecks(conditions);
  return checks.find((check) => !check.done)?.nextLabel ?? "继续经营流沙驿";
}

function openStory(storyId) {
  const story = getStoryViews().find((entry) => entry.id === storyId);
  if (!story?.unlocked) return;
  els.storyAvatar.src = storyAvatarSrc(story.npcId);
  els.storyAvatar.alt = story.speaker;
  els.storyTitle.textContent = story.title;
  els.storySpeaker.textContent = story.speaker;
  els.storyText.textContent = story.text;
  els.storyModal.showModal();
}

function storyAvatarSrc(npcId) {
  if (npcId === "keeper_portrait") return "./assets/keeper_portrait.png";
  return `./assets/npc/${npcId}.png`;
}

function chooseRenovation(milestoneId, choiceId) {
  const milestone = getMilestoneViews().find((entry) => entry.id === milestoneId);
  const choice = milestone?.renovationChoices?.find((entry) => entry.id === choiceId);
  if (!milestone || !choice || state.renovationChoices[milestoneId]) return;
  if (!milestone.done) {
    toast(milestone.nextText);
    return;
  }
  if (state.coins < repairCost(milestone)) {
    triggerBoardReturnGuide();
    return;
  }
  state.coins -= repairCost(milestone);
  state.renovationChoices[milestoneId] = choiceId;
  applyRepairRewards(milestone);
  const nextAfterRepair = nextRepairMilestone();
  lastInnFocusKey = nextAfterRepair ? nextAfterRepair.id : `level-${currentInnLevel().level}-complete`;
  pendingInnFocusPosition = nextAfterRepair?.scenePosition ?? null;
  if (els.repairModal.open) closeRepairModalToAnchor();
  activeRepairMilestoneId = null;
  activeRepairChoiceId = null;
  render();
  centerInnSceneOnPosition(milestone.scenePosition);
  playRepairCompleteEffect(milestone.scenePosition);
  showRepairCompleteCue();
  saveState();
}

function playRepairCompleteEffect(position) {
  const room = els.innScene.querySelector(".inn-room");
  if (!room) return;
  const effectClass = `repair-complete-${position}`;
  room.classList.add("repair-complete", effectClass);
  const burst = document.createElement("div");
  burst.className = `repair-burst burst-${position}`;
  burst.innerHTML = `
    <i class="repair-coin c1"></i>
    <i class="repair-coin c2"></i>
    <i class="repair-coin c3"></i>
    <b class="repair-spark s1"></b>
    <b class="repair-spark s2"></b>
    <b class="repair-spark s3"></b>
    <b class="repair-spark s4"></b>
  `;
  room.append(burst);
  if (navigator.vibrate) navigator.vibrate(18);
  setTimeout(() => room.classList.remove("repair-complete", effectClass), 1500);
  setTimeout(() => burst.remove(), 1800);
}

function showRepairCompleteCue() {
  triggerBoardReturnGuide();
}

function triggerBoardReturnGuide() {
  clearBoardReturnGuide();
  els.boardReturnBtn.classList.add("guide-return");
  boardGuideTimer = setTimeout(clearBoardReturnGuide, 5200);
}

function clearBoardReturnGuide() {
  clearTimeout(boardGuideTimer);
  boardGuideTimer = null;
  els.boardReturnBtn.classList.remove("guide-return");
}

function getMilestoneViews() {
  return state.progressionConfig.milestones.map((milestone) => {
    const checks = getMilestoneChecks(milestone.conditions);
    const done = checks.every((check) => check.done);
    const percent = Math.round((checks.reduce((sum, check) => sum + check.ratio, 0) / checks.length) * 100);
    return {
      id: milestone.id,
      chapter: milestone.chapter ?? 1,
      name: milestone.name,
      done,
      percent,
      requirementText: checks.map((check) => check.label).join(" · "),
      nextText: checks.find((check) => !check.done)?.nextLabel ?? rewardText(milestone),
      rewardText: rewardText(milestone),
      sceneName: milestone.sceneName,
      scenePosition: milestone.scenePosition,
      speaker: milestone.speaker,
      npcId: milestone.npcId,
      conditions: milestone.conditions,
      repairCost: milestone.repairCost,
      storyText: milestone.storyText,
      repairValue: milestone.repairValue,
      playerUrl: milestone.playerUrl,
      playerPointId: milestone.playerPointId,
      longscrollRegionIds: milestone.longscrollRegionIds ?? [],
      completionText: milestone.completionText,
      rewards: milestone.rewards,
    };
  });
}

function nextRepairMilestone() {
  return getMilestoneViews().find((milestone) => !state.renovationChoices[milestone.id]);
}

function selectedRenovationChoice(milestone) {
  const choiceId = state.renovationChoices[milestone.id];
  if (!choiceId) return null;
  return {
    id: "completed",
    name: "已修缮",
    repairValue: milestone.repairValue ?? 0,
    flavor: "",
  };
}

function repairCost(milestone) {
  return milestone.repairCost ?? 0;
}

function isConditionMet(conditions) {
  return getMilestoneChecks(conditions).every((check) => check.done);
}

function getMilestoneChecks(conditions) {
  const checks = [];
  if (conditions.completedOrders) {
    checks.push(progressCheck("完成订单", state.completedOrders, conditions.completedOrders));
  }
  if (conditions.coinsEarned) {
    checks.push(progressCheck("累计获得铜币", state.coinsEarned, conditions.coinsEarned));
  }
  if (conditions.codexUnlocked) {
    checks.push(progressCheck("解锁食单", state.unlockedCodex.size, conditions.codexUnlocked));
  }
  if (conditions.completedOrderIds) {
    conditions.completedOrderIds.forEach((orderId) => {
      const order = state.ordersConfig.orders.find((entry) => entry.id === orderId);
      const label = order ? `完成「${order.npcName}」压轴订单` : `完成订单 ${orderId}`;
      checks.push({
        done: state.completedOrderIds.includes(orderId),
        ratio: state.completedOrderIds.includes(orderId) ? 1 : 0,
        label: state.completedOrderIds.includes(orderId) ? `${label} 1/1` : `${label} 0/1`,
        nextLabel: `交付「${order?.npcName ?? orderId}」压轴订单`,
      });
    });
  }
  if (conditions.completedRepairs) {
    conditions.completedRepairs.forEach((milestoneId) => {
      const milestone = state.progressionConfig.milestones.find((entry) => entry.id === milestoneId);
      const name = milestone?.sceneName ?? milestone?.name ?? milestoneId;
      const done = Boolean(state.renovationChoices[milestoneId]);
      checks.push({
        done,
        ratio: done ? 1 : 0,
        label: `${done ? "完成" : "待完成"}「${name}」修缮`,
        nextLabel: `先完成「${name}」修缮`,
      });
    });
  }
  return checks.length ? checks : [{ done: true, ratio: 1, label: "无额外条件" }];
}

function progressCheck(name, current, target) {
  const value = Math.min(current, target);
  return {
    done: current >= target,
    ratio: target > 0 ? value / target : 1,
    label: `${name} ${value}/${target}`,
    nextLabel: nextStepText(name, current, target),
  };
}

function nextStepText(name, current, target) {
  const left = Math.max(0, target - current);
  if (left === 0) return `${name}已达成`;
  if (name === "完成订单") return `再完成${left}单订单`;
  if (name === "累计获得铜币") return `再赚${left}枚铜币`;
  if (name === "解锁食单") return `再解锁${left}页食单`;
  return `${name}还差${left}`;
}

function rewardText(milestone) {
  const rewards = milestone.rewards ?? {};
  const labels = [];
  if (rewards.coins) labels.push(`获得${rewards.coins}枚铜钱`);
  if (rewards.unlockOrderRefresh) labels.push("开放订单刷新");
  if (rewards.boardColumns && rewards.boardRows) labels.push(`案板 ${rewards.boardColumns}x${rewards.boardRows}`);
  if (rewards.staminaMax) labels.push(`驼铃上限 ${rewards.staminaMax}`);
  if (rewards.staminaRecoverMinutes) labels.push(`${rewards.staminaRecoverMinutes}分钟恢复1点`);
  if (rewards.unlockOrders?.length) labels.push("开放稀有订单");
  if (rewards.giftPacks?.length) labels.push(rewards.giftPacks.map((entry) => GIFT_PACKS[entry.id]?.name ?? "礼盒包").join("、"));
  if (rewards.showLv2Preview) labels.push("显示Lv2预告");
  return labels.length ? `奖励：${labels.join("，")}` : "奖励：剧情推进";
}

function applyRepairRewards(milestone) {
  const rewards = milestone.rewards ?? {};
  if (rewards.coins) {
    state.coins += rewards.coins;
    state.coinsEarned += rewards.coins;
    showCoinBurst(rewards.coins);
  }
  if (rewards.staminaMax) state.staminaMax = Math.max(state.staminaMax, rewards.staminaMax);
  if (rewards.staminaRecoverMinutes) state.recoverMinutes = rewards.staminaRecoverMinutes;
  if (rewards.unlockOrders?.length) {
    rewards.unlockOrders.forEach((orderId) => {
      if (!state.visibleOrders.includes(orderId)) state.visibleOrders.push(orderId);
    });
  }
  if (rewards.storyFlags?.length) {
    rewards.storyFlags.forEach((flag) => {
      state.storyFlags[flag] = true;
    });
  }
  if (rewards.giftPacks?.length) {
    rewards.giftPacks.forEach((entry) => grantGiftPack(entry.id, entry.quantity ?? 1));
  }
}

function grantGiftPack(packId, quantity = 1) {
  const pack = GIFT_PACKS[packId];
  if (!pack || quantity <= 0) return;
  const existing = state.giftPacks.find((entry) => entry.id === packId);
  if (existing) {
    existing.quantity += quantity;
  } else {
    state.giftPacks.push({ id: packId, quantity });
  }
  toast(`${pack.name}已收入行囊。`);
}

function sellSelected() {
  const index = state.selectedIndex;
  const itemId = state.board[index];
  if (!itemId) return;
  const item = byId.get(itemId);
  if (item.highValueConfirm && !confirm(`${item.name}很珍贵，确定出售吗？`)) return;
  state.board[index] = null;
  state.coins += item.sellValue;
  keeper(`收起了${item.name}，换得${item.sellValue}枚铜币。`);
  render();
  saveState();
}

function openBag() {
  renderBag();
  els.bagModal.showModal();
}

function openStorage() {
  renderStorage();
  els.storageModal.showModal();
}

function renderStorage() {
  if (!els.storageSlotList) return;
  els.storageSlotList.innerHTML = "";
  for (let index = 0; index < STORAGE_TOTAL_SLOTS; index += 1) {
    const itemId = index < STORAGE_FREE_SLOTS ? (state.bag[index] ?? null) : null;
    const item = itemId ? byId.get(itemId) : null;
    const slot = document.createElement("article");
    slot.className = `storage-slot ${index >= STORAGE_FREE_SLOTS ? "locked" : item ? "filled" : "empty"}`;
    if (index >= STORAGE_FREE_SLOTS) {
      slot.innerHTML = `<span class="storage-lock">锁</span>`;
    } else if (item) {
      slot.innerHTML = `<img src="${itemAssetSrc(item)}" alt="${item.name}" />`;
    } else {
      slot.innerHTML = `<span class="storage-empty-mark"></span>`;
    }
    els.storageSlotList.append(slot);
  }
}

function renderBag() {
  els.bagList.innerHTML = "";
  renderGiftPackInventory();
  state.bag.forEach((itemId, index) => {
    const slot = document.createElement("article");
    slot.className = `bag-slot ${itemId ? "" : "empty"}`;
    if (itemId) {
      const item = byId.get(itemId);
      slot.innerHTML = `
        <img src="${itemAssetSrc(item)}" alt="${item.name}" />
        <div>
          <strong>${item.name}</strong>
          <span>${item.modernName}</span>
        </div>
        <button>取出</button>
      `;
      slot.querySelector("button").addEventListener("click", () => retrieveFromBag(index));
    } else {
      slot.innerHTML = `
        <div class="empty-mark">空</div>
        <div>
          <strong>空位</strong>
          <span>选中食物后，可收进行囊。</span>
        </div>
      `;
    }
    els.bagList.append(slot);
  });

  const store = document.createElement("button");
  store.className = "primary bag-store";
  store.textContent = "收起选中食物";
  const selectedItem = byId.get(state.board[state.selectedIndex]);
  store.disabled = !state.board[state.selectedIndex] || selectedItem?.type === "gift_box" || firstEmptyBagIndex() === -1;
  store.addEventListener("click", storeSelectedToBag);
  els.bagList.append(store);
}

function renderGiftPackInventory() {
  state.giftPacks.forEach((entry) => {
    const pack = GIFT_PACKS[entry.id];
    if (!pack || entry.quantity <= 0) return;
    const item = byId.get(pack.itemId);
    if (!item) return;
    const slot = document.createElement("article");
    slot.className = "bag-slot gift-pack-slot";
    slot.innerHTML = `
      <img src="${itemAssetSrc(item)}" alt="${pack.name}" />
      <div>
        <strong>${pack.name} ×${entry.quantity}</strong>
        <span>${pack.description}</span>
      </div>
      <button>放入棋盘</button>
    `;
    slot.querySelector("button").addEventListener("click", () => placeGiftPackOnBoard(entry.id));
    els.bagList.append(slot);
  });
}

function storeSelectedToBag() {
  storeBoardItemToStorage(state.selectedIndex);
}

function storeBoardItemToStorage(boardIndex) {
  const itemId = state.board[boardIndex];
  const bagIndex = firstEmptyBagIndex();
  if (!itemId) {
    toast("先选中一件食物。");
    return;
  }
  if (byId.get(itemId)?.type === "gift_box") {
    toast("礼盒包要直接点击打开，不能收进普通行囊格。");
    return;
  }
  if (bagIndex === -1) {
    toast("柜中暂存已满。");
    return;
  }
  state.bag[bagIndex] = itemId;
  state.board[boardIndex] = null;
  state.selectedIndex = null;
  const item = byId.get(itemId);
  keeper(`${item.name}已收进柜中暂存。`);
  render();
  renderBag();
  if (els.storageModal?.open) renderStorage();
  saveState();
}

function retrieveFromBag(index) {
  const itemId = state.bag[index];
  if (!itemId) return;
  const boardIndex = firstEmptyIndex();
  if (boardIndex === -1) {
    toast("案板已满，暂时取不出来。");
    return;
  }
  state.board[boardIndex] = itemId;
  state.bag[index] = null;
  state.selectedIndex = boardIndex;
  const item = byId.get(itemId);
  keeper(`${item.name}已放回案板。`);
  render();
  renderBag();
  saveState();
}

function placeGiftPackOnBoard(packId) {
  const pack = GIFT_PACKS[packId];
  const giftEntry = state.giftPacks.find((entry) => entry.id === packId);
  if (!pack || !giftEntry || giftEntry.quantity <= 0) return;
  const boardIndex = firstEmptyIndexFromTop();
  if (boardIndex === -1) {
    toast("案板已满，礼盒包暂时放不下。");
    return;
  }
  giftEntry.quantity -= 1;
  state.giftPacks = state.giftPacks.filter((entry) => entry.quantity > 0);
  state.board[boardIndex] = pack.itemId;
  state.giftBoxStates[boardIndex] = { packId, nextRewardIndex: 0 };
  state.selectedIndex = boardIndex;
  state.pulseIndex = boardIndex;
  keeper(`${pack.name}已落到案板上。点击礼盒包，每次取一份奖励。`);
  clearPulseSoon();
  render();
  renderBag();
  saveState();
}

function openGiftBoxOnBoard(index) {
  const giftState = state.giftBoxStates[index];
  const pack = giftState ? GIFT_PACKS[giftState.packId] : null;
  if (!pack) {
    toast("这个礼盒包数据还没配置。");
    return;
  }
  const reward = pack.rewards[giftState.nextRewardIndex];
  if (!reward) {
    clearGiftBox(index);
    render();
    saveState();
    return;
  }
  if (reward.type === "item") {
    if (emptyCellCount() <= 0) {
      toast("案板已满，先腾出空位再开礼盒包。");
      return;
    }
    const placed = placeRewardItem(reward.itemId, reward.quantity ?? 1);
    if (!placed) return;
    const item = byId.get(reward.itemId);
    keeper(`${pack.name}取出：${item?.name ?? "奖励"}。`);
    tryBuildGeneratorFromMaterials(reward.itemId);
  } else if (reward.type === "coins") {
    state.coins += reward.amount;
    showCoinBurst(reward.amount);
    keeper(`${pack.name}取出${reward.amount}枚铜钱。`);
  }
  giftState.nextRewardIndex += 1;
  if (giftState.nextRewardIndex >= pack.rewards.length) {
    clearGiftBox(index);
    toast(`${pack.name}取完了。`);
  } else {
    state.selectedIndex = index;
    state.pulseIndex = index;
    toast(`还剩${pack.rewards.length - giftState.nextRewardIndex}份奖励。`);
  }
  clearPulseSoon();
  render();
  saveState();
}

function placeRewardItem(itemId, quantity) {
  for (let i = 0; i < quantity; i += 1) {
    const index = firstEmptyIndexFromTop();
    if (index === -1) return false;
    state.board[index] = itemId;
    state.pulseIndex = index;
  }
  return true;
}

function tryBuildGeneratorFromMaterials(materialId) {
  const material = byId.get(materialId);
  const recipe = material?.boxMaterial;
  if (!recipe) return;
  const required = recipe.required ?? 8;
  while (countItem(materialId) >= required) {
    const materialIndices = [];
    for (let i = 0; i < state.board.length && materialIndices.length < required; i += 1) {
      if (state.board[i] === materialId) materialIndices.push(i);
    }
    materialIndices.forEach((index) => {
      state.board[index] = null;
    });
    const outputIndex = materialIndices[0] ?? firstEmptyIndexFromTop();
    state.board[outputIndex] = recipe.targetGeneratorId;
    state.selectedIndex = outputIndex;
    state.pulseIndex = outputIndex;
    const generator = byId.get(recipe.targetGeneratorId);
    keeper(`8份${material.name}合成了${generator?.name ?? "新食盒"}。`);
    toast(`解锁生成器：${generator?.name ?? "新食盒"}`);
  }
}

function clearGiftBox(index) {
  state.board[index] = null;
  delete state.giftBoxStates[index];
  if (state.selectedIndex === index) state.selectedIndex = null;
}

function openCodex() {
  if (state.tutorialStep === 3) {
    state.tutorialStep = 4;
    saveState();
  }
  els.codexList.innerHTML = "";
  state.codexConfig.entries.forEach((entry) => {
    const item = byId.get(entry.itemId);
    const unlocked = state.unlockedCodex.has(entry.id);
    const card = document.createElement("article");
    card.className = `codex-card ${unlocked ? "" : "locked"}`;
    if (unlocked) {
      card.tabIndex = 0;
      card.setAttribute("role", "button");
      card.addEventListener("click", () => openCodexDetail(entry.id));
      card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") openCodexDetail(entry.id);
      });
    }
    card.innerHTML = `
      <img src="${itemAssetSrc(item)}" alt="${entry.name}" />
      <div>
        <h3>${unlocked ? entry.name : "未解锁"}</h3>
        <p>${unlocked ? entry.shortText : "继续合成，补全这页食单。"}</p>
      </div>
    `;
    els.codexList.append(card);
  });
  els.codexModal.showModal();
}

function openCodexDetail(codexId) {
  const entry = codexById.get(codexId);
  if (!entry || !state.unlockedCodex.has(codexId)) return;
  const item = byId.get(entry.itemId);
  els.codexDetailIcon.src = itemAssetSrc(item);
  els.codexDetailIcon.alt = entry.name;
  els.codexDetailName.textContent = entry.name;
  els.codexDetailModern.textContent = entry.modernName;
  els.codexDetailShort.textContent = entry.shortText;
  els.codexDetailLong.textContent = entry.longText;
  els.codexDetailSource.textContent = `可信度 ${entry.confidence}：${entry.sourceNote}`;
  els.codexDetailModal.showModal();
}

function resetGame() {
  if (!confirm("确定重置原型进度吗？")) return;
  localStorage.removeItem(SAVE_KEY);
  location.reload();
}

function debugAddStamina() {
  state.stamina = Math.min(state.staminaMax, state.stamina + 8);
  keeper("调试：驼铃补足了一些。");
  render();
  saveState();
}

function debugAddDough() {
  const index = firstEmptyIndex();
  if (index === -1) {
    toast("案板已满。");
    return;
  }
  state.board[index] = "hubing_01_dough";
  state.selectedIndex = index;
  state.pulseIndex = index;
  clearPulseSoon();
  keeper("调试：放入了一份麦面剂。");
  render();
  saveState();
}

function debugUnlockRenovation() {
  state.completedOrders = Math.max(state.completedOrders, 3);
  state.tutorialStep = Math.max(state.tutorialStep, 4);
  state.coins = Math.max(state.coins, 260);
  state.repairPromptedFor = [...new Set([...state.repairPromptedFor, "tutorial_complete"])];
  keeper("调试：已进入修缮预览，可点击当前高亮节点。");
  if (els.bagModal.open) els.bagModal.close();
  saveState();
  switchPage("inn");
}

function debugAdvanceRepairGate() {
  const next = nextRepairMilestone();
  if (!next) {
    toast("Lv1 修缮节点已全部完成。");
    switchPage("inn");
    return;
  }
  satisfyMilestoneConditions(next);
  state.coins = Math.max(state.coins, repairCost(next));
  state.repairPromptedFor = [...new Set([...state.repairPromptedFor, next.id])];
  keeper(`调试：已满足「${next.sceneName ?? next.name}」的主线条件。`);
  toast(`可修缮：${next.sceneName ?? next.name}`);
  if (els.bagModal.open) els.bagModal.close();
  saveState();
  switchPage("inn");
}

function debugPrepareLv1Upgrade() {
  state.progressionConfig.milestones.forEach((milestone) => {
    satisfyMilestoneConditions(milestone);
    if (!state.renovationChoices[milestone.id]) {
      state.renovationChoices[milestone.id] = "completed";
    }
  });
  const level = currentInnLevel();
  state.coins = Math.max(state.coins, level.upgradeCost);
  state.repairPromptedFor = [...new Set([...state.repairPromptedFor, ...state.progressionConfig.milestones.map((milestone) => milestone.id)])];
  keeper("调试：Lv1 修缮已完成，可验收扩建按钮。");
  toast("Lv1 已准备扩建。");
  if (els.bagModal.open) els.bagModal.close();
  saveState();
  switchPage("inn");
}

function satisfyMilestoneConditions(milestone) {
  const conditions = milestone.conditions ?? {};
  if (conditions.completedOrders) state.completedOrders = Math.max(state.completedOrders, conditions.completedOrders);
  if (conditions.coinsEarned) state.coinsEarned = Math.max(state.coinsEarned, conditions.coinsEarned);
  if (conditions.codexUnlocked) unlockCodexCount(conditions.codexUnlocked);
  if (conditions.completedOrderIds?.length) {
    state.completedOrderIds = [...new Set([...state.completedOrderIds, ...conditions.completedOrderIds])];
  }
  if (conditions.completedRepairs?.length) {
    conditions.completedRepairs.forEach((milestoneId) => {
      state.renovationChoices[milestoneId] = "completed";
    });
  }
  state.tutorialStep = Math.max(state.tutorialStep, 4);
}

function unlockCodexCount(count) {
  state.codexConfig.entries.slice(0, count).forEach((entry) => state.unlockedCodex.add(entry.id));
}

function debugClearBoard() {
  if (!confirm("确定清空案板吗？行囊不会清空。")) return;
  state.board = Array(BOARD_SIZE).fill(null);
  state.selectedIndex = null;
  state.pulseIndex = null;
  keeper("案板清出来了，可以重新试一轮。");
  render();
  saveState();
}

function countItem(itemId) {
  return state.board.filter((entry) => entry === itemId).length;
}

function removeItems(itemId, quantity) {
  for (let i = 0; i < state.board.length && quantity > 0; i += 1) {
    if (state.board[i] === itemId) {
      state.board[i] = null;
      quantity -= 1;
    }
  }
}

function hasEmptyCell() {
  return state.board.some((item, index) => !item && !isBoardCellLocked(index));
}

function emptyCellCount() {
  return state.board.filter((item, index) => !item && !isBoardCellLocked(index)).length;
}

function firstEmptyIndex() {
  for (let row = BOARD_ROWS - 1; row >= 0; row -= 1) {
    for (let col = 0; col < BOARD_COLUMNS; col += 1) {
      const index = row * BOARD_COLUMNS + col;
      if (isBoardCellLocked(index)) continue;
      if (!state.board[index]) return index;
    }
  }
  return -1;
}

// Prefer an empty cell adjacent to an existing same-type item, so duplicates
// end up next to each other and are trivial to drag-merge (instead of being
// separated by a generator/obstacle in between).
function findMergeFriendlyIndex(itemId) {
  if (itemId) {
    const adjacent = [];
    for (let index = 0; index < state.board.length; index += 1) {
      if (state.board[index] !== itemId) continue;
      const row = Math.floor(index / BOARD_COLUMNS);
      const col = index % BOARD_COLUMNS;
      for (const [dr, dc] of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
        const nr = row + dr;
        const nc = col + dc;
        if (nr < 0 || nr >= BOARD_ROWS || nc < 0 || nc >= BOARD_COLUMNS) continue;
        const candidate = nr * BOARD_COLUMNS + nc;
        if (!isBoardCellLocked(candidate) && !state.board[candidate]) adjacent.push(candidate);
      }
    }
    if (adjacent.length) return adjacent[0];
  }
  return firstEmptyIndex();
}

function firstEmptyIndexFromTop() {
  for (let row = 0; row < BOARD_ROWS; row += 1) {
    for (let col = 0; col < BOARD_COLUMNS; col += 1) {
      const index = row * BOARD_COLUMNS + col;
      if (isBoardCellLocked(index)) continue;
      if (!state.board[index]) return index;
    }
  }
  return -1;
}

function firstEmptyBagIndex() {
  return state.bag.findIndex((item) => !item);
}

function normalizeStorageSlots(value) {
  const slots = Array(STORAGE_FREE_SLOTS).fill(null);
  if (Array.isArray(value)) {
    value.slice(0, STORAGE_FREE_SLOTS).forEach((item, index) => {
      slots[index] = item ?? null;
    });
  }
  return slots;
}

function totalGiftPackCount() {
  return state.giftPacks.reduce((sum, entry) => sum + entry.quantity, 0);
}

function clearPulseSoon() {
  setTimeout(() => {
    state.pulseIndex = null;
    state.unlockPulseIndex = null;
    renderBoard();
  }, 760);
}

function itemAssetSrc(item) {
  if (item.iconKey?.startsWith("ui_")) return `./assets/ui/${item.iconKey}.png`;
  return `./assets/${item.iconKey}.png`;
}

function keeper(line) {
  els.keeperLine.textContent = line;
}

function toast(message) {
  els.toast.textContent = message;
  els.toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    els.toast.hidden = true;
  }, 1800);
}

function showCoinBurst(amount) {
  const burst = document.createElement("div");
  burst.className = "coin-burst";
  burst.innerHTML = `<img src="./assets/ui/ui_coin_copper.png" alt="" />+${amount}`;
  document.querySelector("#app").append(burst);
  setTimeout(() => burst.remove(), 900);
}

boot().catch((error) => {
  console.error(error);
  document.querySelector("#board").innerHTML = `
    <div class="boot-error">
      <strong>数据没有加载到</strong>
      <span>请确认本地服务从可玩原型目录启动。</span>
    </div>
  `;
  toast("原型加载失败，请检查本地服务。");
});

/* ===== 临时调试面板（诊断真机拖拽失败用，定位后删除） ===== */
(function installDebugHud() {
  const hud = document.createElement("div");
  hud.id = "debug-hud";
  hud.style.cssText = "position:fixed;left:6px;right:6px;bottom:6px;z-index:9999;background:rgba(0,0,0,.82);color:#9fe;font:11px/1.45 monospace;padding:6px 8px;border-radius:8px;max-height:38vh;overflow:auto;pointer-events:none;white-space:pre-wrap;";
  document.body.appendChild(hud);
  window.__dbg = function (msg) {
    const t = new Date().toLocaleTimeString();
    hud.textContent = (hud.textContent + "\n[" + t + "] " + msg).split("\n").slice(-16).join("\n");
  };
  window.addEventListener("error", (e) => window.__dbg("ERROR: " + (e.message || e.error) + " @" + (e.lineno || "")));
  window.addEventListener("unhandledrejection", (e) => window.__dbg("PROMISE: " + ((e.reason && e.reason.message) || e.reason)));
  window.addEventListener("pointerup", (e) => {
    if (!dragging) return;
    const from = dragging.fromIndex;
    const item = dragging.itemId;
    const to = getCellIndexFromPoint(e.clientX, e.clientY);
    window.__lastDrag = { from, item, to, locked: isBoardCellLocked(to) };
    window.__dbg("DRAG from=" + from + " item=" + item + " drop=(" + Math.round(e.clientX) + "," + Math.round(e.clientY) + ") => toIndex=" + to + " locked=" + isBoardCellLocked(to));
  }, true);
  // 用 setTimeout(0) 延后读取结果，确保 endCellPointer 已修改棋盘后再对比
  window.addEventListener("pointerup", () => {
    const d = window.__lastDrag;
    if (!d) return;
    window.__lastDrag = null;
    setTimeout(() => {
      const aFrom = state.board[d.from];
      const aTo = state.board[d.to];
      const name = (id) => id ? (byId.get(id)?.name || id) : "(空)";
      // Also show neighbours of source for context
      const nearby = [];
      for (const n of [d.from-1, d.from+1, d.from-BOARD_COLUMNS, d.from+BOARD_COLUMNS]) {
        if (n >= 0 && n < state.board.length) nearby.push(n + ":" + name(state.board[n]));
      }
      window.__dbg("OUTCOME from[" + d.from + "]=" + name(aFrom) + "  to[" + d.to + "]=" + name(aTo) + (d.locked ? "  (锁定格)" : "") + "  near=[" + nearby.join(",") + "]");
    }, 0);
  });
})();
