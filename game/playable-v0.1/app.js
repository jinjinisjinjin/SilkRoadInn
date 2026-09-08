const DATA_PATH = "./data/";
const QA_MODE = new URLSearchParams(location.search).get("qa");
const GENERATOR_QA_MODE = QA_MODE === "generator-system-v1";
const GENERATOR_MATERIAL_QA_MODE = QA_MODE === "generator-materials-v03";
const ORDER_GIFT_QA_MODE = QA_MODE === "order-gift-generator-v1";
const RUBY_DISPLAY_QA_MODE = QA_MODE === "ruby-display-v1";
const LV4_MARKET_ORDERS_QA_MODE = QA_MODE === "lv4-market-orders-v1";
const GLOBAL_LOADING_QA_MODE = QA_MODE === "global-loading-v1";
const GLOBAL_LOADING_QA_HOLD = GLOBAL_LOADING_QA_MODE && new URLSearchParams(location.search).get("hold") === "1";
const ORDER_GIFT_QA_CHAPTER = Math.max(1, Math.min(4, Number(new URLSearchParams(location.search).get("chapter")) || 1));
const ISOLATED_QA_MODE = GENERATOR_QA_MODE || GENERATOR_MATERIAL_QA_MODE || ORDER_GIFT_QA_MODE || RUBY_DISPLAY_QA_MODE || LV4_MARKET_ORDERS_QA_MODE || GLOBAL_LOADING_QA_MODE;
const SAVE_KEY = GENERATOR_QA_MODE
  ? "silkroad_tavern_proto_v02_qa_generator_system_v1"
  : GENERATOR_MATERIAL_QA_MODE
    ? "silkroad_tavern_proto_v02_qa_generator_materials_v03"
    : ORDER_GIFT_QA_MODE
      ? `silkroad_tavern_proto_v02_qa_order_gift_generator_v1_ch${ORDER_GIFT_QA_CHAPTER}`
      : RUBY_DISPLAY_QA_MODE
        ? "silkroad_tavern_proto_v02_qa_ruby_display_v1"
        : LV4_MARKET_ORDERS_QA_MODE
          ? "silkroad_tavern_proto_v02_qa_lv4_market_orders_v1"
          : GLOBAL_LOADING_QA_MODE
            ? "silkroad_tavern_proto_v02_qa_global_loading_v1"
            : "silkroad_tavern_proto_v02";
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
const BONUS_BUBBLE_MIN_LEVEL = 4;
const BONUS_BUBBLE_CHANCE = 0.2;
const BONUS_BUBBLE_DURATION_MS = 40000;
const BONUS_BUBBLE_PREFIX = "bonus_bubble_";
const BONUS_COIN_PREFIX = "bonus_coin_";
const BONUS_COIN_MAX_LEVEL = 4;
const BONUS_COIN_VALUES = Object.freeze([0, 1, 3, 8, 25]);
const BONUS_RUBY_PREFIX = "bonus_ruby_";
const BONUS_RUBY_MAX_LEVEL = 4;
const BONUS_RUBY_VALUES = Object.freeze([0, 1, 3, 8, 25]);
const BONUS_RUBY_SCALE_PERCENT = Object.freeze([0, 50, 70, 70, 70]);
const ORDER_PROGRESS_GIFT_ITEM_ID = "gift_pack_order_progress";
const SELL_CHAIN_LEVELS = Object.freeze({
  food: 8,
  generator: 6,
  generatorMaterial: 4,
});
const GENERATOR_MATERIAL_SCALE_PERCENT = Object.freeze({
  material_mill_01: 229,
  material_mill_02: 221,
  material_mill_03: 212,
  material_dairy_01: 224,
  material_dairy_02: 206,
  material_dairy_03: 216,
  material_meat_01: 246,
  material_meat_02: 225,
  material_meat_03: 220,
  material_spice_01: 267,
  material_spice_02: 290,
  material_spice_03: 203,
  material_fruit_01: 219,
  material_fruit_02: 213,
  material_fruit_03: 245,
  material_drink_01: 276,
  material_drink_02: 228,
  material_drink_03: 193,
});
const LV4_MARKET_ORDER_IDS = Object.freeze([
  "order_lv4_south_shed_stocking",
  "order_lv4_central_market_feast",
  "order_lv4_south_street_trade",
]);
const LEGACY_ORDER_ID_MAP = Object.freeze({
  order_demo_board_combo_01: LV4_MARKET_ORDER_IDS[0],
  order_demo_board_combo_02: LV4_MARKET_ORDER_IDS[1],
  order_demo_board_combo_03: LV4_MARKET_ORDER_IDS[2],
});
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
  ...LV4_MARKET_ORDER_IDS,
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
  "./assets/longscroll/base/阶段0_未修缮长卷_1254x1254.png",
  "./assets/ui/ui_station_tavern.png",
  "./assets/keeper_portrait.png",
  "./assets/npc_standee/npc_dunhuang_woman.png",
  "./assets/npc_standee/npc_farmer.png",
  "./assets/npc_standee/npc_temple_donor.png",
  "./assets/npc_standee/npc_caravan_leader.png",
];
const STARTUP_DATA_NAMES = Object.freeze([
  "items",
  "orders",
  "codex",
  "stamina",
  "progression",
  "inn",
  "generators",
  "generator-materials",
]);
const STARTUP_REQUIRED_ASSETS = Object.freeze([...new Set([
  "./assets/ui/loading_poster_character_v1.webp",
  ...INN_PACKAGE_ASSETS,
  "./assets/kitchen-bg.png",
  "./assets/order_tray_approved_front.png",
  "./assets/ui/ui_coin_copper.png",
  "./assets/ui/ui_camel_bell_stamina.png",
  "./assets/ui/ui_bag_inventory.png",
  "./assets/ui/ui_kitchen_entry.png",
  "./assets/ui/order_gift_coffer_v1.png",
])]);
const LONGSCROLL_ROOT = "./assets/longscroll";
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
  ["hubing_08_gulouzi", "meat_06_suzhi_yanglei", "fruit_05_guopu_pan", "dairy_04_ganlao", "spice_04_jiaochi_jiang", "drink_05_mijiang", "fruit_06_mijian_guo"],
  ["boxmat_milk_room_01", "hubing_04_youhubing", "dairy_03_laojiang", "meat_04_jiaochi_yangrou", "spice_03_hujiao_li", "fruit_04_wuhuaguo", "boxmat_livestock_pen_01"],
  ["meat_02_roumi_xian", "hubing_02_lubing", "hubing_01_dough", "boxmat_milk_room_01", "dairy_01_milk", "dairy_02_rumi", "spice_02_ziran_mo"],
  ["fruit_03_yezao", "fruit_01_putao", null, null, null, "hubing_02_lubing", "drink_04_shiliujiang"],
  ["hubing_04_youhubing", "boxmat_livestock_pen_01", null, null, null, "dairy_02_rumi", "drink_03_sanlejiang"],
  ["meat_03_roupu", "drink_01_putaozhi", null, null, null, "meat_02_roumi_xian", "dairy_04_ganlao"],
  ["spice_04_jiaochi_jiang", "spice_02_ziran_mo", "fruit_02_gan_putao", "hubing_03_humabing", "dairy_03_laojiang", "drink_02_putaojiang", "hubing_03_humabing"],
  ["boxmat_milk_room_01", "fruit_02_gan_putao", "hubing_03_humabing", "meat_04_jiaochi_yangrou", "dairy_03_laojiang", "drink_02_putaojiang", "boxmat_livestock_pen_01"],
  ["spice_06_hexiang_jiangzhan", "meat_05_yangrou_geng", "gen_dairy_02", "dairy_05_suyou", "hubing_05_congchihubing", "hubing_04_youhubing", "dairy_07_tihusu"],
];

const state = {
  items: [],
  ordersConfig: null,
  codexConfig: null,
  staminaConfig: null,
  progressionConfig: null,
  innConfig: null,
  generatorConfig: null,
  generatorMaterialConfig: null,
  board: [],
  bag: [],
  giftPacks: [],
  giftBoxStates: {},
  bubbleStates: {},
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
  chapterOrderCounts: {},
  claimedOrderProgressPacks: [],
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
  bubblePulseIndex: null,
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
  innKitchenBtn: document.querySelector("#innKitchenBtn"),
  boardPage: document.querySelector("#boardPage"),
  innPage: document.querySelector("#innPage"),
  innLevelName: document.querySelector("#innLevelName"),
  innCoins: document.querySelector("#innCoins"),
  innScene: document.querySelector("#innScene"),
  innScoreText: document.querySelector("#innScoreText"),
  innUpgradeText: document.querySelector("#innUpgradeText"),
  innUpgradeBtn: document.querySelector("#innUpgradeBtn"),
  furnitureShop: document.querySelector("#furnitureShop"),
  orderGiftProgress: document.querySelector("#orderGiftProgress"),
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
  startupLoading: document.querySelector("#startupLoading"),
  startupLoadingStatus: document.querySelector("#startupLoadingStatus"),
  startupLoadingPercent: document.querySelector("#startupLoadingPercent"),
  startupLoadingTrack: document.querySelector("#startupLoadingTrack"),
  startupLoadingFill: document.querySelector("#startupLoadingFill"),
  startupLoadingRetry: document.querySelector("#startupLoadingRetry"),
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
let bonusBubbleSequence = 0;
let lastBonusCoinTapIndex = -1;
let lastBonusCoinTapAt = 0;
let lastBonusRubyTapIndex = -1;
let lastBonusRubyTapAt = 0;

async function loadJson(name) {
  const response = await fetch(`${DATA_PATH}${name}.json`);
  if (!response.ok) throw new Error(`无法加载 ${name}.json`);
  return response.json();
}

function generatorItemId(categoryId, level) {
  return `gen_${categoryId}_${String(level).padStart(2, "0")}`;
}

function generatorMaterialItemId(categoryId, stage) {
  return `material_${categoryId}_${String(stage).padStart(2, "0")}`;
}

function buildConfiguredGeneratorMaterialItems(config) {
  const stages = Number(config.stagesPerCategory) || 3;
  return config.categories.flatMap((category) =>
    Array.from({ length: stages }, (_, offset) => {
      const stage = offset + 1;
      const nextId = stage < stages
        ? generatorMaterialItemId(category.id, stage + 1)
        : category.targetGeneratorId;
      return {
        id: generatorMaterialItemId(category.id, stage),
        type: config.materialType,
        generatorMaterialCategory: category.id,
        foodLineId: category.foodLineId,
        level: stage,
        name: `${category.displayName}·${["初阶", "进阶", "成型"][offset]}`,
        modernName: stage < stages
          ? "两个同阶材料可合成下一阶材料"
          : "两个同阶材料可合成一级生成器",
        line: `generator_material_${category.id}`,
        iconKey: `${config.assetRoot}/generator_material_${category.assetCategory}_${String(stage).padStart(2, "0")}`,
        source: "generator_material_chain_v03",
        mergeFrom: stage > 1 ? generatorMaterialItemId(category.id, stage - 1) : null,
        mergeTo: nextId,
        codexId: null,
        highValueConfirm: false,
      };
    }),
  );
}

function buildConfiguredGeneratorItems(config) {
  const levels = Number(config.levelsPerCategory) || 6;
  const economy = config.economy;
  return config.categories.flatMap((category) =>
    Array.from({ length: levels }, (_, offset) => {
      const level = offset + 1;
      return {
        id: generatorItemId(category.id, level),
        type: config.generatorType,
        generatorType: category.id,
        foodLineId: category.foodLineId,
        level,
        name: category.levelNames?.[offset] ?? `${category.displayName} Lv${level}`,
        modernName: category.modernName,
        line: "generator",
        iconKey: `${config.assetRoot}/${category.id}/generator_${category.id}_${String(level).padStart(2, "0")}`,
        source: "generator_system_v1",
        mergeFrom: level > 1 ? generatorItemId(category.id, level - 1) : null,
        mergeTo: level < levels ? generatorItemId(category.id, level + 1) : null,
        codexId: null,
        highValueConfirm: true,
        generator: {
          staminaCost: economy.staminaCost,
          chargeMax: economy.chargeMax,
          cooldownSeconds: economy.cooldownSeconds,
          outputCount: economy.outputCount,
          pool: [{ itemId: category.baseOutputItemId, weight: 100 }],
        },
      };
    }),
  );
}

function migrateLegacyGeneratorId(itemId) {
  return state.generatorMaterialConfig?.legacyIdMap?.[itemId]
    ?? state.generatorConfig?.legacyIdMap?.[itemId]
    ?? itemId;
}

function migrateLegacyOrderIds(orderIds) {
  if (!Array.isArray(orderIds)) return [];
  return [...new Set(orderIds
    .filter((orderId) => typeof orderId === "string")
    .map((orderId) => LEGACY_ORDER_ID_MAP[orderId] ?? orderId))];
}

function initializeGeneratorQaScenario() {
  const generatorIds = state.generatorConfig.categories.flatMap((category) =>
    Array.from({ length: state.generatorConfig.levelsPerCategory }, (_, offset) =>
      generatorItemId(category.id, offset + 1),
    ),
  );
  state.board = Array(BOARD_SIZE).fill(null);
  generatorIds.forEach((itemId, index) => {
    state.board[index] = itemId;
  });
  state.board[42] = "gen_mill_01";
  state.board[43] = "gen_mill_01";
  state.board[49] = "gen_mill_06";
  state.board[50] = "gen_mill_06";
  state.unlockedCells = Array.from({ length: BOARD_SIZE }, (_, index) => index);
  state.generatorStates = {};
  state.staminaMax = 99;
  state.stamina = 99;
  state.selectedIndex = null;
}

function initializeGeneratorMaterialQaScenario() {
  state.board = Array(BOARD_SIZE).fill(null);
  state.generatorMaterialConfig.categories.forEach((category, categoryIndex) => {
    const column = categoryIndex < 3 ? 0 : 4;
    const rowOffset = categoryIndex % 3;
    for (let stage = 1; stage <= state.generatorMaterialConfig.stagesPerCategory; stage += 1) {
      const row = (stage - 1) * 3 + rowOffset;
      const itemId = generatorMaterialItemId(category.id, stage);
      state.board[boardIndex(row, column)] = itemId;
      state.board[boardIndex(row, column + 1)] = itemId;
    }
  });
  state.unlockedCells = Array.from({ length: BOARD_SIZE }, (_, index) => index);
  state.generatorStates = {};
  state.staminaMax = 99;
  state.stamina = 99;
  state.selectedIndex = null;
}

function initializeOrderGiftQaScenario() {
  state.board = Array(BOARD_SIZE).fill(null);
  state.bag = Array(STORAGE_FREE_SLOTS).fill(null);
  state.giftPacks = [];
  state.giftBoxStates = {};
  state.bubbleStates = {};
  state.unlockedCells = Array.from({ length: BOARD_SIZE }, (_, index) => index);
  state.chapterOrderCounts = { 1: 0, 2: 0, 3: 0, 4: 0, [ORDER_GIFT_QA_CHAPTER]: 12 };
  state.claimedOrderProgressPacks = [];
  state.generatorStates = {};
  state.staminaMax = 99;
  state.stamina = 99;
  state.currentPage = "inn";
  state.selectedIndex = null;
}

function initializeRubyDisplayQaScenario() {
  state.board = Array(BOARD_SIZE).fill(null);
  ["bonus_ruby_01", "bonus_ruby_02", "bonus_ruby_03", "bonus_ruby_04"].forEach((itemId, index) => {
    state.board[index] = itemId;
  });
  state.board[starterGeneratorIndex()] = "gen_mill_01";
  state.bag = Array(STORAGE_FREE_SLOTS).fill(null);
  state.giftPacks = [];
  state.giftBoxStates = {};
  state.bubbleStates = {};
  state.unlockedCells = Array.from({ length: BOARD_SIZE }, (_, index) => index);
  state.generatorStates = {};
  state.staminaMax = 99;
  state.stamina = 99;
  state.currentPage = "board";
  state.selectedIndex = null;
}

function initializeLv4MarketOrdersQaScenario() {
  state.board = Array(BOARD_SIZE).fill(null);
  const targetItems = [
    ["hubing_04_youhubing", 2],
    ["hubing_05_congchihubing", 1],
    ["dairy_03_laojiang", 1],
    ["dairy_04_ganlao", 2],
    ["drink_03_sanlejiang", 1],
    ["drink_04_shiliujiang", 2],
  ];
  let boardCursor = 0;
  targetItems.forEach(([itemId, quantity]) => {
    for (let count = 0; count < quantity; count += 1) {
      state.board[boardCursor] = itemId;
      boardCursor += 1;
    }
  });
  const firstMarketOrderIndex = REPAIR_GATE_SEQUENCE.indexOf(LV4_MARKET_ORDER_IDS[0]);
  const firstMarketMilestoneIndex = state.progressionConfig.milestones.findIndex((milestone) => milestone.id === "lv4_south_shed");
  state.bag = Array(STORAGE_FREE_SLOTS).fill(null);
  state.giftPacks = [];
  state.giftBoxStates = {};
  state.bubbleStates = {};
  state.unlockedCells = Array.from({ length: BOARD_SIZE }, (_, index) => index);
  state.visibleOrders = [...LV4_MARKET_ORDER_IDS];
  state.completedOrderIds = REPAIR_GATE_SEQUENCE.slice(0, firstMarketOrderIndex);
  state.completedOrders = state.completedOrderIds.length;
  state.chapterOrderCounts = { 1: 0, 2: 0, 3: 0, 4: 0 };
  state.claimedOrderProgressPacks = [];
  state.renovationChoices = Object.fromEntries(
    state.progressionConfig.milestones.slice(0, firstMarketMilestoneIndex).map((milestone) => [milestone.id, "completed"]),
  );
  state.activeRepairId = null;
  state.repairPromptedFor = [];
  state.generatorStates = {};
  state.coins = 1000;
  state.staminaMax = 99;
  state.stamina = 99;
  state.innLevel = 4;
  state.currentPage = "board";
  state.selectedIndex = null;
}

let startupProgressValue = 0;

function updateStartupLoading(percent, status) {
  if (!els.startupLoading) return;
  const value = Math.max(startupProgressValue, Math.min(100, Math.round(percent)));
  startupProgressValue = value;
  els.startupLoading.style.setProperty("--startup-progress", `${value}%`);
  els.startupLoadingPercent.textContent = `${value}%`;
  els.startupLoadingStatus.textContent = status;
  els.startupLoadingTrack.setAttribute("aria-valuenow", String(value));
}

async function loadStartupGroup(tasks, startPercent, endPercent, status) {
  if (!tasks.length) {
    updateStartupLoading(endPercent, status);
    return [];
  }
  let completed = 0;
  updateStartupLoading(startPercent, status);
  return Promise.all(tasks.map((task) => Promise.resolve()
    .then(task)
    .then((value) => {
      completed += 1;
      updateStartupLoading(startPercent + ((endPercent - startPercent) * completed) / tasks.length, status);
      return value;
    })));
}

function currentInnStartupAssets() {
  const milestones = getMilestoneViews();
  const completedStage = milestones.filter((milestone) => selectedRenovationChoice(milestone)).length;
  const next = nextRepairMilestone();
  const assets = [];
  if (completedStage) {
    assets.push(`${LONGSCROLL_ROOT}/states-webp/${String(completedStage).padStart(2, "0")}_done_state_v0.1.webp?v=feather-20260803`);
  }
  (next?.longscrollRegionIds ?? []).forEach((regionId) => {
    assets.push(`${LONGSCROLL_ROOT}/masks-alpha/${String(regionId).padStart(2, "0")}_mask_v0.1.png`);
  });
  state.visibleOrders.forEach((orderId) => {
    const order = getOrder(orderId);
    if (order?.npcId) assets.push(`./assets/npc_standee/${order.npcId}.png?v=${NPC_STANDEE_VERSION}`);
  });
  return [...new Set(assets)];
}

function waitForStartupPaint() {
  return new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
}

function startupDelay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function finishStartupLoading() {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const detailDelay = reducedMotion ? 16 : 110;
  const posterDelay = reducedMotion ? 16 : 220;
  const fadeDelay = reducedMotion ? 16 : 680;
  updateStartupLoading(100, "驿站已备妥");
  await startupDelay(detailDelay);
  els.startupLoading.classList.add("details-leaving");
  await startupDelay(posterDelay);
  const app = document.querySelector("#app");
  app.inert = false;
  app.removeAttribute("inert");
  app.setAttribute("aria-hidden", "false");
  app.classList.add("startup-revealing");
  app.classList.remove("startup-pending");
  els.startupLoading.classList.add("is-leaving");
  await startupDelay(fadeDelay);
  els.startupLoading.hidden = true;
}

function showStartupFailure(error) {
  console.error(error);
  els.startupLoading.dataset.state = "error";
  els.startupLoading.classList.remove("details-leaving", "is-leaving");
  els.startupLoadingStatus.textContent = "加载失败，请检查网络后重试";
  els.startupLoadingRetry.hidden = false;
  els.startupLoadingRetry.onclick = () => location.reload();
}

async function boot() {
  console.log('🐫 丝路食肆 v0.3-drag 启动中…');
  if (GLOBAL_LOADING_QA_HOLD) {
    updateStartupLoading(56, "正在展开流沙驿长卷");
    return;
  }

  const dataResults = await loadStartupGroup(
    STARTUP_DATA_NAMES.map((name) => () => loadJson(name)),
    4,
    60,
    "正在载入食单与旅人订单",
  );
  const [items, orders, codex, stamina, progression, inn, generators, generatorMaterials] = dataResults;

  state.generatorConfig = generators;
  state.generatorMaterialConfig = generatorMaterials;
  const configuredGenerators = buildConfiguredGeneratorItems(generators);
  const configuredGeneratorMaterials = buildConfiguredGeneratorMaterialItems(generatorMaterials);
  const configuredGeneratorIds = new Set(configuredGenerators.map((item) => item.id));
  const configuredGeneratorMaterialIds = new Set(configuredGeneratorMaterials.map((item) => item.id));
  state.items = [
    ...items.items.filter((item) => !configuredGeneratorIds.has(item.id) && !configuredGeneratorMaterialIds.has(item.id)),
    ...configuredGenerators,
    ...configuredGeneratorMaterials,
  ];
  state.ordersConfig = orders;
  state.codexConfig = codex;
  state.staminaConfig = stamina;
  state.progressionConfig = progression;
  state.innConfig = inn;
  state.items.forEach((item) => byId.set(item.id, item));
  registerBonusCoinItems();
  registerOrderProgressPacks();
  codex.entries.forEach((entry) => codexById.set(entry.id, entry));

  loadState();
  if (!ISOLATED_QA_MODE || GLOBAL_LOADING_QA_MODE) state.currentPage = "inn";
  const startupAssets = [...new Set([...STARTUP_REQUIRED_ASSETS, ...currentInnStartupAssets()])];
  await loadStartupGroup(
    startupAssets.map((url) => () => preloadImage(url)),
    60,
    96,
    "正在展开流沙驿长卷",
  );
  innPackageLoaded = true;
  updateStartupLoading(98, "正在点亮驿站灯火");
  render();
  bindEvents();
  applyBuildMode();
  await waitForStartupPaint();
  await finishStartupLoading();
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
    bubbleStates: {},
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
    chapterOrderCounts: { 1: 0, 2: 0, 3: 0, 4: 0 },
    claimedOrderProgressPacks: [],
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
  const persistedCompletedOrderIds = Array.isArray(data.completedOrderIds) ? data.completedOrderIds : [];
  const persistedVisibleOrderIds = Array.isArray(data.visibleOrders) ? data.visibleOrders : [];
  const loadedOrderIds = migrateLegacyOrderIds(persistedCompletedOrderIds);
  const loadedVisibleOrderIds = migrateLegacyOrderIds(persistedVisibleOrderIds);
  const hasLegacyOrderIds = [...persistedCompletedOrderIds, ...persistedVisibleOrderIds]
    .some((orderId) => Boolean(LEGACY_ORDER_ID_MAP[orderId]));
  Object.assign(state, {
    board: normalizeBoard(data.board),
    bag: normalizeStorageSlots(data.bag),
    giftPacks: normalizeGiftPacks(data.giftPacks),
    giftBoxStates: normalizeGiftBoxStates(data.giftBoxStates),
    bubbleStates: normalizeBubbleStates(data.bubbleStates),
    unlockedCells: normalizeUnlockedCells(data.unlockedCells),
    visibleOrders: loadedVisibleOrderIds.length ? loadedVisibleOrderIds : defaultState().visibleOrders,
    unlockedCodex: new Set(data.unlockedCodex?.length ? data.unlockedCodex : ["codex_hubing_01"]),
    coins: data.coins ?? 40,
    gems: data.gems ?? 36,
    stamina: data.stamina ?? state.staminaConfig.initial.startValue,
    staminaMax: Math.max(data.staminaMax ?? state.staminaConfig.initial.max, state.staminaConfig.initial.max),
    recoverMinutes: data.recoverMinutes ?? state.staminaConfig.initial.recoverMinutes,
    generationCount: data.generationCount ?? 0,
    completedOrders: data.completedOrders ?? 0,
    completedOrderIds: loadedOrderIds,
    chapterOrderCounts: normalizeChapterOrderCounts(data.chapterOrderCounts, data.completedOrders, data.innLevel),
    claimedOrderProgressPacks: normalizeClaimedOrderProgressPacks(data.claimedOrderProgressPacks),
    coinsEarned: data.coinsEarned ?? 0,
    storyFlags: data.storyFlags && typeof data.storyFlags === "object" ? data.storyFlags : {},
    renovationChoices: data.renovationChoices && typeof data.renovationChoices === "object" ? data.renovationChoices : {},
    activeRepairId: typeof data.activeRepairId === "string" ? data.activeRepairId : null,
    repairPromptedFor: Array.isArray(data.repairPromptedFor) ? data.repairPromptedFor : [],
    generatorStates: normalizeGeneratorStates(data.generatorStates),
    innLevel: data.innLevel ?? 1,
    ownedFurniture: Array.isArray(data.ownedFurniture) ? data.ownedFurniture : [],
    placedFurniture: Array.isArray(data.placedFurniture) ? normalizePlacedFurniture(data.placedFurniture) : Array(6).fill(null),
    currentPage: data.currentPage === "inn" ? "inn" : "board",
    tutorialStep: data.tutorialStep ?? 0,
    lastTick: data.lastTick ?? Date.now(),
  });
  if (GENERATOR_QA_MODE && !saved) initializeGeneratorQaScenario();
  if (GENERATOR_MATERIAL_QA_MODE && !saved) initializeGeneratorMaterialQaScenario();
  if (ORDER_GIFT_QA_MODE && !saved) initializeOrderGiftQaScenario();
  if (RUBY_DISPLAY_QA_MODE) initializeRubyDisplayQaScenario();
  if (LV4_MARKET_ORDERS_QA_MODE) initializeLv4MarketOrdersQaScenario();
  restoreBonusBubbleItems();
  convertExpiredBubbles(Date.now());
  migrateOccupiedLockedCells();
  applyOfflineRecovery();
  ensureStarterGenerator();
  pruneGeneratorStates();
  syncGateOrder();
  if (hasLegacyOrderIds) saveState();
}

function saveState() {
  localStorage.setItem(
    SAVE_KEY,
    JSON.stringify({
      board: state.board,
      bag: state.bag,
      giftPacks: state.giftPacks,
      giftBoxStates: state.giftBoxStates,
      bubbleStates: state.bubbleStates,
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
      chapterOrderCounts: state.chapterOrderCounts,
      claimedOrderProgressPacks: state.claimedOrderProgressPacks,
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
  if (ISOLATED_QA_MODE) return;
  if (state.completedOrders === 0 && state.coinsEarned === 0) {
    state.board = state.board.map((itemId, index) => {
      if (isBoardCellLocked(index)) return null;
      if (["gen_dairy_01", "gen_dairy_02", "gen_milk_room_01", "gen_milk_room_02", "gen_livestock_pen_01", "gen_livestock_pen_02"].includes(itemId)) return null;
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
  tickBonusBubbles();
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
  els.innKitchenBtn?.addEventListener("click", () => switchPage("board"));
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
  switchPage("inn");
}

function destroyInnTemporaryNodes() {
  els.innScene.innerHTML = "";
  els.furnitureShop.innerHTML = "";
  if (els.orderGiftProgress) els.orderGiftProgress.innerHTML = "";
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
  renderVisibleOrderGiftProgress();
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
  els.innScene.innerHTML = `
    <div class="longscroll-map" aria-label="流沙驿长卷">
      <img class="longscroll-base" src="${LONGSCROLL_ROOT}/base/阶段0_未修缮长卷_1254x1254.png" alt="未修缮的流沙驿" />
      ${completedStage ? `<img class="longscroll-region" src="${LONGSCROLL_ROOT}/states-webp/${String(completedStage).padStart(2, "0")}_done_state_v0.1.webp?v=feather-20260803" alt="" />` : ""}
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
    ${renderOrderProgressGiftRail()}
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
  els.furnitureShop.querySelectorAll("[data-order-progress-pack]").forEach((button) => {
    button.addEventListener("click", () => claimOrderProgressPack(button.dataset.orderProgressPack));
  });
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

function renderVisibleOrderGiftProgress() {
  if (!els.orderGiftProgress) return;
  els.orderGiftProgress.innerHTML = renderOrderProgressGiftRail();
  els.orderGiftProgress.querySelectorAll("[data-order-progress-pack]").forEach((button) => {
    button.addEventListener("click", () => claimOrderProgressPack(button.dataset.orderProgressPack));
  });
}

function renderOrderProgressGiftRail() {
  const chapter = activeStoryChapter();
  const count = state.chapterOrderCounts[chapter] ?? 0;
  const entries = (state.progressionConfig?.orderProgressPacks ?? []).filter((entry) => entry.chapter === chapter);
  if (!entries.length) return "";
  return `
    <section class="order-progress-gifts" aria-label="本章订单礼盒">
      <div class="order-progress-copy"><b>${chapterName(chapter)}</b><span>本章 ${count} 单</span></div>
      <div class="order-progress-pack-list">
        ${entries.map((entry) => {
          const claimed = state.claimedOrderProgressPacks.includes(entry.id);
          const ready = count >= entry.threshold && !claimed;
          return `<button class="order-progress-pack ${claimed ? "claimed" : ready ? "ready" : "locked"}" data-order-progress-pack="${entry.id}" ${claimed || !ready ? "disabled" : ""} aria-label="${entry.name}">
            <img src="./assets/ui/order_gift_coffer_v1.png" alt="" />
            <span>${claimed ? "已领" : `${entry.threshold}单`}</span>
          </button>`;
        }).join("")}
      </div>
    </section>
  `;
}

function claimOrderProgressPack(packId) {
  const entry = (state.progressionConfig?.orderProgressPacks ?? []).find((item) => item.id === packId);
  if (!entry || state.claimedOrderProgressPacks.includes(packId)) return;
  const count = state.chapterOrderCounts[entry.chapter] ?? 0;
  if (count < entry.threshold) {
    toast(`本章再完成${entry.threshold - count}单即可领取。`);
    return;
  }
  state.claimedOrderProgressPacks.push(packId);
  grantGiftPack(packId, 1);
  keeper(`${entry.name}已送进行囊，回棋盘后可以把它放到空格里。`);
  render();
  saveState();
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
  syncGateOrder();
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
  syncGateOrder();
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
  if (state.innLevel >= 2 && !state.board.includes("gen_dairy_01")) {
    const index = firstEmptyIndex();
    if (index >= 0) state.board[index] = "gen_dairy_01";
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
  if (level.level >= 4) return { ok: false, reason: "当前原型已到最高驿站等级。" };
  const requiredMilestones = state.progressionConfig.milestones.filter(
    (milestone) => (milestone.chapter ?? 1) <= level.level,
  );
  const missingMilestone = requiredMilestones.find((milestone) => !state.renovationChoices[milestone.id]);
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
  if (ORDER_GIFT_QA_MODE) return ORDER_GIFT_QA_CHAPTER;
  if (LV4_MARKET_ORDERS_QA_MODE) return 4;
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
  return Array.from({ length: BOARD_SIZE }, (_, index) => {
    const itemId = value[index] ?? null;
    if (typeof itemId === "string" && itemId.startsWith(BONUS_COIN_PREFIX)) {
      const level = Number(itemId.slice(BONUS_COIN_PREFIX.length));
      if (level > BONUS_COIN_MAX_LEVEL) return bonusCoinId(BONUS_COIN_MAX_LEVEL);
    }
    if (typeof itemId === "string" && itemId.startsWith(BONUS_RUBY_PREFIX)) {
      const level = Number(itemId.slice(BONUS_RUBY_PREFIX.length));
      if (level > BONUS_RUBY_MAX_LEVEL) return BONUS_RUBY_PREFIX + String(BONUS_RUBY_MAX_LEVEL).padStart(2, "0");
    }
    return migrateLegacyGeneratorId(itemId);
  });
}

function normalizeGeneratorStates(value) {
  if (!value || typeof value !== "object") return {};
  return Object.fromEntries(
    Object.entries(value)
      .filter(([key, entry]) => /^(board|bag):\d+$/.test(key) && entry && typeof entry.itemId === "string")
      .map(([key, entry]) => [key, {
        itemId: migrateLegacyGeneratorId(entry.itemId),
        charges: Math.max(0, Number(entry.charges) || 0),
        cooldownEnd: Math.max(0, Number(entry.cooldownEnd) || 0),
      }]),
  );
}

function boardGeneratorStateKey(index) {
  return `board:${index}`;
}

function bagGeneratorStateKey(index) {
  return `bag:${index}`;
}

function transferGeneratorState(itemId, fromKey, toKey) {
  delete state.generatorStates[toKey];
  const item = byId.get(itemId);
  const existing = state.generatorStates[fromKey];
  if (isGeneratorPiece(item) && existing?.itemId === itemId) {
    state.generatorStates[toKey] = existing;
  }
  delete state.generatorStates[fromKey];
}

function clearGeneratorState(stateKey) {
  delete state.generatorStates[stateKey];
}

function pruneGeneratorStates() {
  Object.keys(state.generatorStates).forEach((key) => {
    const [location, rawIndex] = key.split(":");
    const index = Number(rawIndex);
    const itemId = location === "board" ? state.board[index] : location === "bag" ? state.bag[index] : null;
    if (!isGeneratorPiece(byId.get(itemId)) || state.generatorStates[key]?.itemId !== itemId) {
      delete state.generatorStates[key];
    }
  });
}

function bonusCoinId(level) {
  return BONUS_COIN_PREFIX + String(level).padStart(2, "0");
}

function registerBonusCoinItems() {
  for (let level = 1; level <= BONUS_COIN_MAX_LEVEL; level += 1) {
    const coinValue = BONUS_COIN_VALUES[level];
    byId.set(bonusCoinId(level), {
      id: bonusCoinId(level),
      type: "bonus_coin",
      level,
      coinValue,
      name: "铜币 Lv" + level,
      modernName: level === BONUS_COIN_MAX_LEVEL
        ? `双击收入${coinValue}枚铜币`
        : `与同级铜币合成，或双击收入${coinValue}枚铜币`,
      iconKey: `ui/bonus_coin_lv${String(level).padStart(2, "0")}`,
      source: "bonus_bubble",
      mergeFrom: level > 1 ? bonusCoinId(level - 1) : null,
      mergeTo: level < BONUS_COIN_MAX_LEVEL ? bonusCoinId(level + 1) : null,
      sellValue: 0,
      highValueConfirm: false,
    });
  }
}

function registerOrderProgressPacks() {
  const starterGift = byId.get("gift_pack_starter");
  if (starterGift) {
    byId.set(ORDER_PROGRESS_GIFT_ITEM_ID, {
      ...starterGift,
      id: ORDER_PROGRESS_GIFT_ITEM_ID,
      name: "订单进度礼匣",
      modernName: "完成章节订单后获得的奖励礼匣",
      iconKey: "ui/order_gift_coffer_v1",
      source: "order_progress_gift",
    });
  }
  const entries = state.progressionConfig?.orderProgressPacks ?? [];
  entries.forEach((entry) => {
    GIFT_PACKS[entry.id] = {
      id: entry.id,
      name: entry.name,
      itemId: ORDER_PROGRESS_GIFT_ITEM_ID,
      description: entry.description,
      chapter: entry.chapter,
      threshold: entry.threshold,
      materialCategory: entry.materialCategory,
      orderProgress: true,
      rewards: [
        { type: "coins", amount: entry.coinAmount },
        { type: "rubies", amount: entry.rubyQuantity ?? 1 },
        { type: "mapped_material", quantity: entry.materialQuantity ?? 1 },
      ],
    };
  });
}

function normalizeBubbleStates(value) {
  if (!value || typeof value !== "object") return {};
  return Object.fromEntries(
    Object.entries(value)
      .map(([bubbleId, entry]) => [bubbleId, {
        ...entry,
        itemId: migrateLegacyGeneratorId(entry?.itemId),
      }])
      .filter(([bubbleId, entry]) => {
        const expiresAt = Number(entry?.expiresAt);
        return (
          bubbleId.startsWith(BONUS_BUBBLE_PREFIX)
          && typeof entry?.itemId === "string"
          && byId.has(entry.itemId)
          && Number.isFinite(expiresAt)
        );
      })
      .map(([bubbleId, entry]) => [bubbleId, { itemId: entry.itemId, expiresAt: Number(entry.expiresAt) }]),
  );
}

function registerBonusBubbleItem(bubbleId, bubbleState) {
  const contained = byId.get(bubbleState.itemId);
  if (!contained) return false;
  byId.set(bubbleId, {
    id: bubbleId,
    type: "bonus_bubble",
    level: contained.level ?? 1,
    name: contained.name + "气泡",
    modernName: "倒计时结束后变为一级铜币",
    iconKey: contained.iconKey,
    bubbleItemId: contained.id,
    mergeTo: null,
    sellValue: 0,
  });
  return true;
}

function restoreBonusBubbleItems() {
  const activeIds = new Set();
  state.board.forEach((itemId, index) => {
    if (typeof itemId !== "string" || !itemId.startsWith(BONUS_BUBBLE_PREFIX)) return;
    const bubbleState = state.bubbleStates[itemId];
    if (!bubbleState || !registerBonusBubbleItem(itemId, bubbleState)) {
      state.board[index] = null;
      return;
    }
    activeIds.add(itemId);
  });
  Object.keys(state.bubbleStates).forEach((bubbleId) => {
    if (activeIds.has(bubbleId)) return;
    delete state.bubbleStates[bubbleId];
    byId.delete(bubbleId);
  });
}

function isBubbleEligibleMerge(sourceItem, outputItem) {
  if (!sourceItem || !outputItem || (sourceItem.level ?? 0) < BONUS_BUBBLE_MIN_LEVEL) return false;
  if (["bonus_bubble", "bonus_coin", "bonus_ruby", "gift_box", "box_material", "generator_material"].includes(sourceItem.type)) return false;
  return Boolean(sourceItem.line) || sourceItem.type?.includes("generator");
}

function nearestBubbleSpawnIndex(originIndex) {
  const originRow = Math.floor(originIndex / BOARD_COLUMNS);
  const originCol = originIndex % BOARD_COLUMNS;
  const candidates = state.board
    .map((itemId, index) => {
      if (itemId || isBoardCellLocked(index)) return null;
      const row = Math.floor(index / BOARD_COLUMNS);
      const col = index % BOARD_COLUMNS;
      return { index, distance: Math.abs(row - originRow) + Math.abs(col - originCol) };
    })
    .filter(Boolean)
    .sort((a, b) => a.distance - b.distance || a.index - b.index);
  if (!candidates.length) return -1;
  const nearest = candidates.filter((entry) => entry.distance === candidates[0].distance);
  return nearest[Math.floor(Math.random() * nearest.length)].index;
}

function maybeCreateMergeBubble(sourceItem, outputItemId, originIndex) {
  const outputItem = byId.get(outputItemId);
  if (!isBubbleEligibleMerge(sourceItem, outputItem) || Math.random() >= BONUS_BUBBLE_CHANCE) return -1;
  const spawnIndex = nearestBubbleSpawnIndex(originIndex);
  if (spawnIndex === -1) return -1;
  let bubbleId;
  do {
    bonusBubbleSequence += 1;
    bubbleId = BONUS_BUBBLE_PREFIX + Date.now().toString(36) + "_" + bonusBubbleSequence;
  } while (state.bubbleStates[bubbleId]);
  state.bubbleStates[bubbleId] = {
    itemId: outputItemId,
    expiresAt: Date.now() + BONUS_BUBBLE_DURATION_MS,
  };
  registerBonusBubbleItem(bubbleId, state.bubbleStates[bubbleId]);
  state.board[spawnIndex] = bubbleId;
  state.selectedIndex = spawnIndex;
  state.bubblePulseIndex = spawnIndex;
  toast("意外获得" + outputItem.name + "气泡，40秒后变为铜币。");
  return spawnIndex;
}

function convertExpiredBubbles(now) {
  let changed = false;
  Object.entries(state.bubbleStates).forEach(([bubbleId, bubbleState]) => {
    if (bubbleState.expiresAt > now) return;
    const boardIndex = state.board.indexOf(bubbleId);
    if (boardIndex >= 0) {
      state.board[boardIndex] = bonusCoinId(1);
      state.pulseIndex = boardIndex;
    }
    delete state.bubbleStates[bubbleId];
    byId.delete(bubbleId);
    changed = true;
  });
  return changed;
}

function tickBonusBubbles() {
  const now = Date.now();
  if (convertExpiredBubbles(now)) {
    keeper("气泡轻轻散开，留下了一枚可以继续合成的铜币。");
    render();
    saveState();
    return;
  }
  updateSelectedBubbleCountdown(now);
}

function updateSelectedBubbleCountdown(now) {
  const itemId = state.board[state.selectedIndex];
  const item = byId.get(itemId);
  const bubbleState = item?.type === "bonus_bubble" ? state.bubbleStates[itemId] : null;
  if (!bubbleState) return;
  const seconds = Math.max(0, Math.ceil((bubbleState.expiresAt - now) / 1000));
  els.selectedText.textContent = `${seconds}秒后变为一级铜币`;
  if (els.pieceDetailModal?.open) {
    els.pieceDetailText.textContent = `气泡中的棋子暂时不能使用，${seconds}秒后会变成一级铜币。`;
  }
}

function normalizeChapterOrderCounts(value, completedOrders = 0, innLevel = 1) {
  const result = { 1: 0, 2: 0, 3: 0, 4: 0 };
  if (value && typeof value === "object") {
    Object.keys(result).forEach((chapter) => {
      result[chapter] = Math.max(0, Math.floor(Number(value[chapter]) || 0));
    });
    return result;
  }
  const chapter = Math.max(1, Math.min(4, Math.floor(Number(innLevel) || 1)));
  result[chapter] = Math.max(0, Math.floor(Number(completedOrders) || 0));
  return result;
}

function normalizeClaimedOrderProgressPacks(value) {
  if (!Array.isArray(value)) return [];
  const validIds = new Set((state.progressionConfig?.orderProgressPacks ?? []).map((entry) => entry.id));
  return [...new Set(value.filter((id) => validIds.has(id)))];
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
  const itemId = LOCKED_CELL_ITEM_ROWS[row]?.[col] ?? "hubing_01_dough";
  return migrateLegacyGeneratorId(itemId);
}

function lockedCellVisual(index) {
  const item = byId.get(lockedCellItemId(index));
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
    reward.innerHTML = `<img src="./assets/ui/ui_coin_copper.png" alt="" /><span>${currentOrderCoinReward(order)}</span>`;

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
      if (!renderBonusBoardItem(cell, item, itemId, index)) {
      const img = document.createElement("img");
      img.className = `item ${isGeneratorPiece(item) ? "generator" : ""} ${item.type === "gift_box" ? "gift-box" : ""} ${item.type === "generator_material" ? "generator-material" : ""} ${item.id === ORDER_PROGRESS_GIFT_ITEM_ID ? "order-progress-gift" : ""}`;
      img.alt = item.name;
      img.src = itemAssetSrc(item);
      if (item.type === "generator_material") {
        const scale = GENERATOR_MATERIAL_SCALE_PERCENT[item.id] ?? 220;
        img.style.setProperty("--generator-material-scale", `${scale}%`);
      }
      cell.append(img);
      if (isGeneratorPiece(item)) {
        const generatorState = getGeneratorState(item.id, boardGeneratorStateKey(index));
        const badge = document.createElement("span");
        badge.className = "generator-badge";
        if (item.type === "auto_generator") {
          const seconds = Math.max(0, Math.ceil((generatorState.cooldownEnd - Date.now()) / 1000));
          badge.textContent = seconds > 0 ? `${seconds}s` : "自动";
        } else {
          const seconds = Math.max(0, Math.ceil((generatorState.cooldownEnd - Date.now()) / 1000));
          badge.textContent = seconds > 0 ? `${seconds}s` : `${generatorState.charges}/${item.generator.chargeMax}`;
        }
        cell.append(badge);
      } else if (item.type === "gift_box") {
        const giftState = state.giftBoxStates[index];
        const pack = giftState ? GIFT_PACKS[giftState.packId] : null;
        if (pack?.orderProgress) {
          cell.classList.add("order-progress-gift-cell");
        } else {
          const badge = document.createElement("span");
          badge.className = "generator-badge gift-badge";
          badge.textContent = pack ? `${Math.max(0, pack.rewards.length - giftState.nextRewardIndex)}份` : "礼";
          cell.append(badge);
        }
      }
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

function renderBonusBoardItem(cell, item, itemId, index) {
  if (item.type === "bonus_bubble") {
    const bubbleState = state.bubbleStates[itemId];
    const contained = byId.get(item.bubbleItemId);
    if (!bubbleState || !contained) return false;
    cell.classList.add("bubble-cell");
    if (state.bubblePulseIndex === index) cell.classList.add("bubble-born");
    const bubble = document.createElement("div");
    bubble.className = "bonus-bubble";
    bubble.dataset.bubbleId = itemId;
    const content = document.createElement("img");
    content.className = "bubble-content";
    content.src = itemAssetSrc(contained);
    content.alt = contained.name;
    bubble.append(content);
    cell.append(bubble);
    const seconds = Math.max(0, Math.ceil((bubbleState.expiresAt - Date.now()) / 1000));
    cell.setAttribute("aria-label", `${contained.name}气泡，剩余${seconds}秒`);
    return true;
  }
  if (item.type === "bonus_coin") {
    cell.classList.add("bonus-coin-cell");
    if (item.level === BONUS_COIN_MAX_LEVEL) cell.classList.add("collect-ready");
    const coin = document.createElement("div");
    coin.className = "bonus-coin bonus-coin-level-" + item.level;
    const icon = document.createElement("img");
    icon.src = itemAssetSrc(item);
    icon.alt = "";
    coin.append(icon);
    cell.append(coin);
    const mergeHint = item.level < BONUS_COIN_MAX_LEVEL ? "，可与同级合成" : "";
    cell.setAttribute("aria-label", `${item.name}${mergeHint}，双击收取${item.coinValue}枚铜币`);
    return true;
  }
  if (item.type === "bonus_ruby") {
    cell.classList.add("bonus-ruby-cell");
    if (item.level === BONUS_RUBY_MAX_LEVEL) cell.classList.add("collect-ready");
    const ruby = document.createElement("div");
    ruby.className = "bonus-ruby bonus-ruby-level-" + item.level;
    ruby.style.setProperty("--bonus-ruby-scale", `${BONUS_RUBY_SCALE_PERCENT[item.level] ?? 70}%`);
    const icon = document.createElement("img");
    icon.src = itemAssetSrc(item);
    icon.alt = "";
    ruby.append(icon);
    cell.append(ruby);
    const mergeHint = item.level < BONUS_RUBY_MAX_LEVEL ? "，可与同级合成" : "";
    cell.setAttribute("aria-label", `${item.name}${mergeHint}，双击收取${item.rubyValue}颗红宝石`);
    return true;
  }
  return false;
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
  setSellButtonAction({ mode: "unavailable", value: 0 });
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
  if (item.type === "bonus_bubble") {
    const bubbleState = state.bubbleStates[itemId];
    const contained = byId.get(item.bubbleItemId);
    const seconds = bubbleState ? Math.max(0, Math.ceil((bubbleState.expiresAt - Date.now()) / 1000)) : 0;
    selectedPanel?.classList.add("no-sell");
    els.selectedName.textContent = contained ? contained.name + "气泡" : "合成气泡";
    els.selectedText.textContent = seconds + "秒后变为一级铜币";
    els.sellBtn.disabled = true;
    return;
  }
  if (item.type === "bonus_coin") {
    selectedPanel?.classList.add("no-sell");
    els.selectedName.textContent = item.name;
    els.selectedText.textContent = item.level === BONUS_COIN_MAX_LEVEL
      ? `双击收入${item.coinValue}枚铜币`
      : `两枚同级铜币可以合成下一等级；双击收入${item.coinValue}枚`;
    els.sellBtn.disabled = true;
    return;
  }
  if (item.type === "bonus_ruby") {
    selectedPanel?.classList.add("no-sell");
    els.selectedName.textContent = item.name;
    els.selectedText.textContent = item.level === BONUS_RUBY_MAX_LEVEL
      ? `双击收入${item.rubyValue}颗红宝石`
      : `两颗同级红宝石可以合成下一等级；双击收入${item.rubyValue}颗`;
    els.sellBtn.disabled = true;
    return;
  }
  if (item.type === "gift_box") {
    selectedPanel?.classList.add("no-sell");
    const giftState = state.giftBoxStates[state.selectedIndex];
    const pack = giftState ? GIFT_PACKS[giftState.packId] : null;
    els.selectedName.textContent = pack?.name ?? item.name;
    els.selectedText.textContent = pack
      ? pack.orderProgress
        ? `点击一次打开，${giftRewardOutputCount(pack)}份奖励会随机落入空格。`
        : `点击礼盒包，每次掉落1份奖励。还剩${pack.rewards.length - giftState.nextRewardIndex}份。`
      : item.modernName;
    els.sellBtn.disabled = true;
    return;
  }
  if (isGeneratorPiece(item)) {
    const generatorState = getGeneratorState(item.id, boardGeneratorStateKey(state.selectedIndex));
    const cooldownSeconds = Math.max(0, Math.ceil((generatorState.cooldownEnd - Date.now()) / 1000));
    els.selectedName.textContent = item.name;
    els.selectedText.textContent =
      item.type === "manual_generator"
        ? cooldownSeconds > 0
          ? `正在休息，${cooldownSeconds}秒后恢复${item.generator.chargeMax}次充能。`
          : `点击产出食材，消耗${item.generator.staminaCost}点驼铃。剩余${generatorState.charges}/${item.generator.chargeMax}次。`
        : "自动向周边8格投放食材，不消耗驼铃。";
    setSellButtonAction(getPieceRemovalAction(item));
    return;
  }
  const codex = codexById.get(item.codexId);
  els.selectedName.textContent = item.name;
  els.selectedText.textContent = `Lv${item.level ?? 1} · ${codex?.shortText ?? item.modernName}`;
  setSellButtonAction(getPieceRemovalAction(item));
}

function isGeneratorPiece(item) {
  return ["manual_generator", "auto_generator"].includes(item?.type);
}

function isGeneratorMaterialPiece(item) {
  return item?.type === "box_material"
    || item?.type === "generator_material"
    || item?.line?.startsWith("box_material")
    || item?.line?.startsWith("generator_material");
}

function getPieceRemovalAction(item) {
  if (!item || ["bonus_bubble", "bonus_coin", "bonus_ruby", "gift_box"].includes(item.type)) {
    return { mode: "unavailable", value: 0, requiresConfirm: false };
  }
  if (item.type === "generator_material") {
    return { mode: "unavailable", value: 0, requiresConfirm: false };
  }
  const maxLevel = isGeneratorPiece(item)
    ? SELL_CHAIN_LEVELS.generator
    : isGeneratorMaterialPiece(item)
      ? SELL_CHAIN_LEVELS.generatorMaterial
      : SELL_CHAIN_LEVELS.food;
  const level = Math.max(1, Math.min(maxLevel, Number(item.level) || 1));
  const quarter = Math.min(4, Math.ceil((level * 4) / maxLevel));
  const fallbackValue = Math.max(0, quarter - 1);
  const configuredValue = Number(item.sellValue);
  const value = Number.isFinite(configuredValue)
    ? Math.max(0, Math.min(3, configuredValue))
    : fallbackValue;
  return {
    mode: value === 0 ? "delete" : "sell",
    value,
    requiresConfirm: isGeneratorPiece(item) || (maxLevel === SELL_CHAIN_LEVELS.food && level >= 5),
  };
}

function setSellButtonAction(action) {
  const { mode, value = 0 } = action;
  els.sellBtn.classList.remove("delete", "sell", "unavailable");
  els.sellBtn.classList.add(mode);
  els.sellBtn.dataset.action = mode;
  els.sellBtn.disabled = mode === "unavailable";
  if (mode === "delete") {
    els.sellBtn.setAttribute("aria-label", "删除选中的棋子");
    els.sellBtn.innerHTML = `
      <span class="selected-action-trash" aria-hidden="true"></span>
      <b>删除</b>
    `;
    return;
  }
  if (mode === "sell") {
    els.sellBtn.setAttribute("aria-label", `出售选中的棋子，获得${value}枚铜币`);
    els.sellBtn.innerHTML = `
      <span class="selected-action-value"><img src="./assets/ui/ui_coin_copper.png" alt="" /><strong>+${value}</strong></span>
      <b>出售</b>
    `;
    return;
  }
  els.sellBtn.setAttribute("aria-label", "当前棋子不可处理");
  els.sellBtn.innerHTML = `<span class="selected-action-placeholder" aria-hidden="true"></span>`;
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
  if (item.type === "bonus_bubble") {
    const bubbleState = state.bubbleStates[itemId];
    const seconds = bubbleState ? Math.max(0, Math.ceil((bubbleState.expiresAt - Date.now()) / 1000)) : 0;
    els.pieceDetailMeta.textContent = "限时合成奖励";
    els.pieceDetailText.textContent = "气泡中的棋子暂时不能使用，" + seconds + "秒后会变成一级铜币。";
    els.pieceDetailModal.showModal();
    return;
  }
  if (item.type === "bonus_coin") {
    els.pieceDetailMeta.textContent = `铜币 Lv${item.level} · 可收入${item.coinValue}枚`;
    els.pieceDetailText.textContent = item.level === BONUS_COIN_MAX_LEVEL
      ? "已达最高等级，双击即可收入铜币。"
      : "与另一枚同级铜币合成可以升级，也可直接双击收入。";
    els.pieceDetailModal.showModal();
    return;
  }
  if (item.type === "bonus_ruby") {
    els.pieceDetailMeta.textContent = `红宝石 Lv${item.level} · 可收入${item.rubyValue}颗`;
    els.pieceDetailText.textContent = item.level === BONUS_RUBY_MAX_LEVEL
      ? "已达最高等级，双击即可收入红宝石。"
      : "与另一颗同级红宝石合成可以升级，也可直接双击收入。";
    els.pieceDetailModal.showModal();
    return;
  }
  const removalAction = getPieceRemovalAction(item);
  els.pieceDetailMeta.textContent = isGeneratorPiece(item)
    ? `Lv${item.level ?? 1} · ${item.modernName ?? "生成器"}`
    : `Lv${item.level ?? 1} · ${removalAction.mode === "delete" ? "删除不返还铜币" : `出售可得 ${removalAction.value} 铜币`}`;
  if (item.type === "manual_generator") {
    const generatorState = getGeneratorState(item.id, boardGeneratorStateKey(state.selectedIndex));
    const cooldownSeconds = Math.max(0, Math.ceil((generatorState.cooldownEnd - Date.now()) / 1000));
    els.pieceDetailText.textContent = cooldownSeconds > 0
      ? `正在休息，${cooldownSeconds}秒后恢复${item.generator.chargeMax}次充能。`
      : `点击产出食材，消耗${item.generator.staminaCost}点驼铃。当前充能 ${generatorState.charges}/${item.generator.chargeMax}。`;
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
    button.classList.remove("locked");
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
  const prevSelected = state.selectedIndex;
  const itemId = state.board[index];
  const item = itemId ? byId.get(itemId) : null;
  const cell = event.currentTarget;

  if (item?.type === "bonus_bubble") {
    event.preventDefault();
    handleCellClick(index, prevSelected);
    return;
  }

  const rect = cell.getBoundingClientRect();
  const pointerId = event.pointerId;

  event.preventDefault();
  dragging = {
    fromIndex: index,
    itemId,
    startX: event.clientX,
    startY: event.clientY,
    moved: false,
    ghost: null,
    prevSelected,
    pointerId,
    sourceCell: cell,
    sourceCenterX: rect.left + rect.width / 2,
    sourceCenterY: rect.top + rect.height / 2,
    hoverIndex: null,
  };

  window.addEventListener("pointermove", moveCellPointer);
  window.addEventListener("pointerup", endCellPointer, { once: true });
  window.addEventListener("pointercancel", cancelCellPointer, { once: true });

  // Touch pointers may be captured implicitly by the pressed cell.
  queueMicrotask(() => {
    if (!dragging || dragging.pointerId !== pointerId) return;
    try {
      if (cell.hasPointerCapture?.(pointerId)) cell.releasePointerCapture(pointerId);
    } catch { /* ignore */ }
  });
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
  if (!dragging || dragging.pointerId !== event.pointerId) return;
  const dx = event.clientX - dragging.startX;
  const dy = event.clientY - dragging.startY;
  const sourceItemId = state.board[dragging.fromIndex];
  const hoveredIndex = getCellIndexFromEventTarget(event);

  if (hoveredIndex !== null && hoveredIndex !== dragging.fromIndex) {
    dragging.hoverIndex = hoveredIndex;
  }

  if (!sourceItemId || isBoardCellLocked(dragging.fromIndex)) return;
  if (!dragging.moved && Math.hypot(dx, dy) < 8) return;

  event.preventDefault();
  dragging.moved = true;
  if (!dragging.ghost) {
    const item = byId.get(sourceItemId);
    if (item) dragging.ghost = createDragGhost(item);
  }
  positionDragGhost(event.clientX, event.clientY);
  els.storageBtn?.classList.toggle("drop-ready", isStorageDropPoint(event.clientX, event.clientY));
}

function endCellPointer(event) {
  if (!dragging || dragging.pointerId !== event.pointerId) return;

  const { fromIndex, itemId, moved, prevSelected } = dragging;
  const toIndex = resolveDropIndex(event, dragging);
  const droppedOnStorage = isStorageDropPoint(event.clientX, event.clientY);

  cleanupCellPointer(event.currentTarget, event.pointerId);
  removeDragGhost();
  els.storageBtn?.classList.remove("drop-ready");
  dragging = null;

  if (!moved) {
    handleCellClick(fromIndex, prevSelected);
    return;
  }

  if (droppedOnStorage) {
    suppressNextCellClickBriefly();
    storeBoardItemToStorage(fromIndex);
    return;
  }

  if (toIndex === null || toIndex === fromIndex || state.board[fromIndex] !== itemId) {
    render();
    return;
  }

  suppressNextCellClickBriefly();

  if (isBoardCellLocked(toIndex)) {
    unlockLockedCellByMerge(fromIndex, toIndex, itemId);
    render();
    saveState();
    maybePromptRepairGuide();
    return;
  }

  const targetItemId = state.board[toIndex];
  if (!targetItemId) {
    state.board[toIndex] = itemId;
    state.board[fromIndex] = null;
    transferGeneratorState(itemId, boardGeneratorStateKey(fromIndex), boardGeneratorStateKey(toIndex));
    state.selectedIndex = toIndex;
    keeper("挪一挪案板，路上的吃食就有地方摆了。");
  } else if (targetItemId === itemId) {
    mergeCells(fromIndex, toIndex, itemId);
  } else {
    toast("这两样食物不能合成。");
  }

  render();
  saveState();
  maybePromptRepairGuide();
}

function cancelCellPointer(event) {
  if (!dragging || dragging.pointerId !== event.pointerId) return;
  cleanupCellPointer(event.currentTarget, event.pointerId);
  removeDragGhost();
  els.storageBtn?.classList.remove("drop-ready");
  dragging = null;
  render();
}

function cleanupCellPointer(_cell, pointerId) {
  const sourceCell = dragging?.sourceCell;
  try {
    if (sourceCell?.hasPointerCapture?.(pointerId)) sourceCell.releasePointerCapture(pointerId);
  } catch { /* ignore */ }
  window.removeEventListener("pointermove", moveCellPointer);
  window.removeEventListener("pointerup", endCellPointer);
  window.removeEventListener("pointercancel", cancelCellPointer);
}

function getCellIndexFromEventTarget(event) {
  const target = event.target instanceof Element ? event.target.closest(".cell") : null;
  if (!target || !els.board.contains(target)) return null;
  const index = Number(target.dataset.index);
  return Number.isFinite(index) ? index : null;
}

function getRelativeDropIndex(dragState, x, y) {
  const projectedX = dragState.sourceCenterX + (x - dragState.startX);
  const projectedY = dragState.sourceCenterY + (y - dragState.startY);
  return getCellIndexFromPoint(projectedX, projectedY);
}

function resolveDropIndex(event, dragState) {
  const relativeIndex = getRelativeDropIndex(dragState, event.clientX, event.clientY);
  const relativeIsMergeTarget = relativeIndex !== null
    && relativeIndex !== dragState.fromIndex
    && !isBoardCellLocked(relativeIndex)
    && state.board[relativeIndex] === dragState.itemId;
  const eventIndex = getCellIndexFromEventTarget(event);
  if (eventIndex !== null && eventIndex !== dragState.fromIndex) {
    if (isBoardCellLocked(eventIndex) && relativeIsMergeTarget) return relativeIndex;
    return eventIndex;
  }

  if (dragState.hoverIndex !== null && dragState.hoverIndex !== dragState.fromIndex) {
    if (isBoardCellLocked(dragState.hoverIndex) && relativeIsMergeTarget) return relativeIndex;
    return dragState.hoverIndex;
  }

  if (relativeIndex !== null && relativeIndex !== dragState.fromIndex) return relativeIndex;

  return getCellIndexFromPoint(event.clientX, event.clientY);
}

function getCellIndexFromPoint(x, y) {
  const cells = els.board.querySelectorAll(".cell");
  for (const cell of cells) {
    const rect = cell.getBoundingClientRect();
    if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
      return Number(cell.dataset.index);
    }
  }
  return null;
}

function handleCellClick(index, prevSelected = state.selectedIndex) {
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

  if (item?.type === "bonus_bubble") {
    const bubbleState = state.bubbleStates[itemId];
    const contained = byId.get(item.bubbleItemId);
    const seconds = bubbleState ? Math.max(0, Math.ceil((bubbleState.expiresAt - Date.now()) / 1000)) : 0;
    state.selectedIndex = index;
    render();
    toast((contained?.name ?? "这枚棋子") + "还在气泡中，" + seconds + "秒后变为铜币。");
    return;
  }

  if (item?.type === "bonus_coin") {
    const now = Date.now();
    if (lastBonusCoinTapIndex === index && now - lastBonusCoinTapAt <= 450) {
      lastBonusCoinTapIndex = -1;
      lastBonusCoinTapAt = 0;
      collectBonusCoin(index);
      return;
    }
    lastBonusCoinTapIndex = index;
    lastBonusCoinTapAt = now;
  }

  if (item?.type === "bonus_ruby") {
    const now = Date.now();
    if (lastBonusRubyTapIndex === index && now - lastBonusRubyTapAt <= 450) {
      lastBonusRubyTapIndex = -1;
      lastBonusRubyTapAt = 0;
      collectBonusRuby(index);
      return;
    }
    lastBonusRubyTapIndex = index;
    lastBonusRubyTapAt = now;
  }

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
      transferGeneratorState(selectedItemId, boardGeneratorStateKey(prevSelected), boardGeneratorStateKey(index));
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

function collectBonusCoin(index) {
  const item = byId.get(state.board[index]);
  if (item?.type !== "bonus_coin") return;
  const amount = item.coinValue ?? BONUS_COIN_VALUES[item.level] ?? 0;
  state.board[index] = null;
  state.selectedIndex = null;
  state.coins += amount;
  state.coinsEarned += amount;
  keeper(`${item.name}已收入钱囊，顶部铜币增加${amount}枚。`);
  toast(`收取${item.name} +${amount}`);
  showCoinBurst(amount);
  render();
  saveState();
  maybePromptRepairGuide();
}

function collectBonusRuby(index) {
  const item = byId.get(state.board[index]);
  if (item?.type !== "bonus_ruby") return;
  const amount = item.rubyValue ?? BONUS_RUBY_VALUES[item.level] ?? 0;
  state.board[index] = null;
  state.selectedIndex = null;
  state.gems += amount;
  keeper(`${item.name}已收入宝石囊，顶部红宝石增加${amount}颗。`);
  toast(`收取${item.name} +${amount}`);
  render();
  saveState();
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
  clearGeneratorState(boardGeneratorStateKey(fromIndex));
  clearGeneratorState(boardGeneratorStateKey(toIndex));
  state.board[fromIndex] = null;
  const outputId = item?.mergeTo ?? itemId;
  state.board[toIndex] = outputId;
  state.selectedIndex = toIndex;
  maybeCreateMergeBubble(item, outputId, toIndex);
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
  clearGeneratorState(boardGeneratorStateKey(fromIndex));
  clearGeneratorState(boardGeneratorStateKey(toIndex));
  state.board[fromIndex] = null;
  state.board[toIndex] = item.mergeTo;
  state.selectedIndex = toIndex;
  maybeCreateMergeBubble(item, item.mergeTo, toIndex);
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
    const sourceItem = current;
    const outputItemId = current.mergeTo;
    clearGeneratorState(boardGeneratorStateKey(neighbor));
    clearGeneratorState(boardGeneratorStateKey(index));
    state.board[neighbor] = null;
    state.board[index] = outputItemId;
    maybeCreateMergeBubble(sourceItem, outputItemId, index);
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
  const generatorState = getGeneratorState(item.id, boardGeneratorStateKey(index));
  const now = Date.now();
  state.selectedIndex = index;
  if (generatorState.cooldownEnd > now) {
    const seconds = Math.ceil((generatorState.cooldownEnd - now) / 1000);
    render();
    toast(`${item.name}正在休息，${seconds}秒后恢复全部充能。`);
    return;
  }
  if (!hasEmptyCell()) {
    render();
    toast("案板已满，暂时放不下新食材。");
    return;
  }
  if (state.stamina < item.generator.staminaCost) {
    render();
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
    const outIndex = randomUnlockedEmptyIndex();
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

function getGeneratorState(itemId, stateKey) {
  const item = byId.get(itemId);
  if (!state.generatorStates[stateKey] || state.generatorStates[stateKey].itemId !== itemId) {
    state.generatorStates[stateKey] = {
      itemId,
      charges: item?.generator?.chargeMax ?? 0,
      cooldownEnd: 0,
    };
  }
  const generatorState = state.generatorStates[stateKey];
  generatorState.charges = Math.min(item?.generator?.chargeMax ?? 0, Math.max(0, Number(generatorState.charges) || 0));
  if (item?.type === "manual_generator" && generatorState.cooldownEnd > 0 && generatorState.cooldownEnd <= Date.now()) {
    generatorState.charges = item.generator.chargeMax;
    generatorState.cooldownEnd = 0;
  }
  return generatorState;
}

function tickGenerators() {
  let changed = false;
  Object.keys(state.generatorStates).forEach((stateKey) => {
    const entry = state.generatorStates[stateKey];
    const before = entry.cooldownEnd;
    getGeneratorState(entry.itemId, stateKey);
    if (before > Date.now() || (before && !state.generatorStates[stateKey].cooldownEnd)) changed = true;
  });
  state.board.forEach((itemId, index) => {
    const item = byId.get(itemId);
    if (item?.type !== "auto_generator") return;
    const generatorState = getGeneratorState(item.id, boardGeneratorStateKey(index));
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
  const chapter = activeStoryChapter();
  const firstClear = !state.completedOrderIds.includes(order.id);
  const coinReward = currentOrderCoinReward(order);
  for (const demand of order.demand) {
    removeItems(demand.itemId, demand.quantity);
  }
  state.coins += coinReward;
  state.coinsEarned += coinReward;
  state.completedOrders += 1;
  state.chapterOrderCounts[chapter] = (state.chapterOrderCounts[chapter] ?? 0) + 1;
  showCoinBurst(coinReward);
  if (firstClear) {
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
  els.orderDetailCompleteBtn.textContent = canComplete ? `交付得${currentOrderCoinReward(order)}铜币` : `还差${missingTotal}`;
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
  const currentGate = nextRepairGateOrderId();
  if (orderId === currentGate) {
    syncGateOrder();
    return;
  }
  const next = pickOrder();
  if (next) state.visibleOrders[index] = next.id;
}

function nextRepairGateOrderId() {
  const milestone = nextRepairMilestone();
  if (!milestone || (milestone.chapter ?? 1) > state.innLevel) return null;
  const targetOrderIds = milestone.conditions?.completedOrderIds ?? [];
  const targetIndices = targetOrderIds
    .map((orderId) => REPAIR_GATE_SEQUENCE.indexOf(orderId))
    .filter((index) => index >= 0);
  if (!targetIndices.length) {
    return targetOrderIds.find((orderId) => !state.completedOrderIds.includes(orderId)) ?? null;
  }
  const targetIndex = Math.max(...targetIndices);
  const milestoneIndex = state.progressionConfig.milestones.findIndex((entry) => entry.id === milestone.id);
  const previousMilestone = state.progressionConfig.milestones
    .slice(0, milestoneIndex)
    .reverse()
    .find((entry) => state.renovationChoices[entry.id]);
  const previousTargetIndex = previousMilestone
    ? Math.max(
      -1,
      ...(previousMilestone.conditions?.completedOrderIds ?? [])
        .map((orderId) => REPAIR_GATE_SEQUENCE.indexOf(orderId))
        .filter((index) => index >= 0),
    )
    : -1;
  return REPAIR_GATE_SEQUENCE.slice(previousTargetIndex + 1, targetIndex + 1).find(
    (orderId) => !state.completedOrderIds.includes(orderId),
  ) ?? null;
}

function syncGateOrder() {
  if (LV4_MARKET_ORDERS_QA_MODE) {
    state.visibleOrders = LV4_MARKET_ORDER_IDS.filter((orderId) => !state.completedOrderIds.includes(orderId));
    return;
  }
  const nextOrderId = nextRepairGateOrderId();
  const maxVisible = state.ordersConfig.maxVisibleOrders ?? 3;
  const sideOrders = state.visibleOrders.filter(
    (orderId, index, orders) => (
      (!REPAIR_GATE_SEQUENCE.includes(orderId) || state.completedOrderIds.includes(orderId))
      && orders.indexOf(orderId) === index
      && getOrder(orderId)
    ),
  );
  state.visibleOrders = nextOrderId ? [nextOrderId, ...sideOrders] : sideOrders;
  state.visibleOrders = state.visibleOrders.slice(0, maxVisible);
  while (state.visibleOrders.length < maxVisible) {
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

function currentOrderCoinReward(order) {
  if (!order) return 0;
  const firstClearBonus = state.completedOrderIds.includes(order.id) ? 0 : (order.reward.firstClearBonusCoins ?? 0);
  return order.reward.coins + firstClearBonus;
}

function pickOrder() {
  const pool = state.ordersConfig.orders.filter((order) => {
    if (state.visibleOrders.includes(order.id)) return false;
    if (REPAIR_GATE_SEQUENCE.includes(order.id) && !state.completedOrderIds.includes(order.id)) return false;
    if (order.weight <= 0) return false;
    if (order.unlock.startsWith("codex_") && !state.unlockedCodex.has(order.unlock)) return false;
    if (order.unlock === "completed_orders_8" && state.completedOrders < 8) return false;
    return true;
  });
  const fallback = state.ordersConfig.orders.filter(
    (order) => (
      order.weight > 0
      && (!REPAIR_GATE_SEQUENCE.includes(order.id) || state.completedOrderIds.includes(order.id))
      && !state.visibleOrders.includes(order.id)
    ),
  );
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
  syncGateOrder();
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
  const action = getPieceRemovalAction(item);
  if (action.mode === "unavailable") {
    toast("这枚棋子不能删除或出售。");
    return;
  }
  const actionName = action.mode === "delete" ? "删除" : "出售";
  if (action.requiresConfirm && !confirm(`${item.name}很珍贵，确定${actionName}吗？`)) return;
  clearGeneratorState(boardGeneratorStateKey(index));
  state.board[index] = null;
  state.selectedIndex = null;
  if (action.mode === "sell") {
    state.coins += action.value;
    state.coinsEarned += action.value;
    keeper(`收起了${item.name}，换得${action.value}枚铜币。`);
    toast(`出售${item.name} +${action.value}`);
    showCoinBurst(action.value);
  } else {
    keeper(`清理了${item.name}，腾出一格案板。`);
    toast(`已删除${item.name}`);
  }
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
  const cannotStore = ["gift_box", "bonus_bubble", "bonus_coin", "bonus_ruby"].includes(selectedItem?.type);
  store.disabled = !state.board[state.selectedIndex] || cannotStore || firstEmptyBagIndex() === -1;
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
  const boardItem = byId.get(itemId);
  if (["bonus_bubble", "bonus_coin", "bonus_ruby"].includes(boardItem?.type)) {
    toast("气泡、铜币和红宝石需要留在棋盘上继续合成。");
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
  transferGeneratorState(itemId, boardGeneratorStateKey(boardIndex), bagGeneratorStateKey(bagIndex));
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
  transferGeneratorState(itemId, bagGeneratorStateKey(index), boardGeneratorStateKey(boardIndex));
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
  const boardIndex = randomUnlockedEmptyIndex();
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
  keeper(`${pack.name}已随机落到案板上。${pack.orderProgress ? "点击一次即可打开。" : "点击礼盒包，每次取一份奖励。"}`);
  clearPulseSoon();
  render();
  renderBag();
  saveState();
}

function coinRewardPieceIds(amount) {
  const result = [];
  let remaining = Math.max(0, Math.floor(Number(amount) || 0));
  for (const level of [3, 2, 1]) {
    const value = BONUS_COIN_VALUES[level];
    while (remaining >= value) {
      result.push(bonusCoinId(level));
      remaining -= value;
    }
  }
  return result;
}

function giftRewardOutputCount(pack) {
  return pack.rewards.reduce((sum, reward) => {
    if (reward.type === "coins") return sum + coinRewardPieceIds(reward.amount).length;
    if (reward.type === "rubies") return sum + (reward.amount ?? 1);
    return sum + (reward.quantity ?? 1);
  }, 0);
}

function mappedGiftMaterialId(pack) {
  const progressionPack = (state.progressionConfig?.orderProgressPacks ?? []).find((entry) => entry.id === pack?.id);
  const categoryId = pack?.materialCategory ?? progressionPack?.materialCategory;
  const category = state.generatorMaterialConfig.categories.find((entry) => entry.id === categoryId);
  return category ? generatorMaterialItemId(category.id, 1) : null;
}

function orderProgressGiftOutputs(pack) {
  const outputs = [];
  pack.rewards.forEach((reward) => {
    if (reward.type === "coins") {
      outputs.push(...coinRewardPieceIds(reward.amount));
      return;
    }
    if (reward.type === "rubies") {
      for (let i = 0; i < (reward.amount ?? 1); i += 1) outputs.push("bonus_ruby_01");
      return;
    }
    if (reward.type === "mapped_material") {
      const materialId = mappedGiftMaterialId(pack);
      if (!materialId) return;
      for (let i = 0; i < (reward.quantity ?? 1); i += 1) outputs.push(materialId);
      return;
    }
    if (reward.type === "item") {
      for (let i = 0; i < (reward.quantity ?? 1); i += 1) outputs.push(reward.itemId);
    }
  });
  return outputs;
}

function shuffle(values) {
  const result = [...values];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function openOrderProgressGiftBox(index, pack) {
  const outputs = orderProgressGiftOutputs(pack);
  const available = state.board
    .map((itemId, cellIndex) => (cellIndex === index || (!itemId && !isBoardCellLocked(cellIndex)) ? cellIndex : null))
    .filter((cellIndex) => cellIndex !== null);
  if (outputs.length > available.length) {
    toast(`案板空位不足，还需腾出${outputs.length - available.length}格。`);
    keeper("礼盒仍留在原位，奖励没有丢失。先清理案板再打开。");
    return;
  }
  clearGiftBox(index);
  const targetIndices = shuffle(available).slice(0, outputs.length);
  const materialIds = new Set();
  outputs.forEach((itemId, outputIndex) => {
    state.board[targetIndices[outputIndex]] = itemId;
    if (byId.get(itemId)?.boxMaterial) materialIds.add(itemId);
  });
  state.selectedIndex = targetIndices[0] ?? null;
  state.pulseIndex = targetIndices[0] ?? null;
  materialIds.forEach((materialId) => tryBuildGeneratorFromMaterials(materialId));
  keeper(`${pack.name}已打开，${outputs.length}份奖励随机落入案板。`);
  toast("礼包奖励已散落到空格中。");
  clearPulseSoon();
  render();
  saveState();
}

function openGiftBoxOnBoard(index) {
  const giftState = state.giftBoxStates[index];
  const pack = giftState ? GIFT_PACKS[giftState.packId] : null;
  if (!pack) {
    toast("这个礼盒包数据还没配置。");
    return;
  }
  if (pack.orderProgress) {
    openOrderProgressGiftBox(index, pack);
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
      clearGeneratorState(boardGeneratorStateKey(index));
      state.board[index] = null;
    });
    const outputIndex = materialIndices[0] ?? firstEmptyIndexFromTop();
    clearGeneratorState(boardGeneratorStateKey(outputIndex));
    const targetGeneratorId = migrateLegacyGeneratorId(recipe.targetGeneratorId);
    state.board[outputIndex] = targetGeneratorId;
    state.selectedIndex = outputIndex;
    state.pulseIndex = outputIndex;
    const generator = byId.get(targetGeneratorId);
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
  Object.keys(state.bubbleStates).forEach((bubbleId) => byId.delete(bubbleId));
  state.board = Array(BOARD_SIZE).fill(null);
  state.bubbleStates = {};
  state.selectedIndex = null;
  state.pulseIndex = null;
  state.bubblePulseIndex = null;
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

function randomUnlockedEmptyIndex() {
  const candidates = state.board
    .map((itemId, index) => (!itemId && !isBoardCellLocked(index) ? index : null))
    .filter((index) => index !== null);
  if (!candidates.length) return -1;
  return candidates[Math.floor(Math.random() * candidates.length)];
}

function firstEmptyBagIndex() {
  return state.bag.findIndex((item) => !item);
}

function normalizeStorageSlots(value) {
  const slots = Array(STORAGE_FREE_SLOTS).fill(null);
  if (Array.isArray(value)) {
    value.slice(0, STORAGE_FREE_SLOTS).forEach((item, index) => {
      slots[index] = migrateLegacyGeneratorId(item ?? null);
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
    state.bubblePulseIndex = null;
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

boot().catch(showStartupFailure);
