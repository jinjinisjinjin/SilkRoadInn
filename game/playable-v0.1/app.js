const DATA_PATH = "./data/";
const QA_MODE = new URLSearchParams(location.search).get("qa");
const GENERATOR_QA_MODE = QA_MODE === "generator-system-v1";
const GENERATOR_MATERIAL_QA_MODE = QA_MODE === "generator-materials-v03";
const ORDER_GIFT_QA_MODE = QA_MODE === "order-gift-generator-v1";
const RUBY_DISPLAY_QA_MODE = QA_MODE === "ruby-display-v1";
const LV4_MARKET_ORDERS_QA_MODE = QA_MODE === "lv4-market-orders-v1";
const GENERATOR_ORDER_QA_MODE = QA_MODE === "generator-order-progression-v1";
const GLOBAL_LOADING_QA_MODE = QA_MODE === "global-loading-v1";
const PROGRESSION_FLOW_QA_MODE = QA_MODE === "progression-flow-v1";
const REPAIR_PROGRESS_QA_MODE = QA_MODE === "repair-progress-v1";
const CHAPTER_STORY_QA_MODE = QA_MODE === "chapter-story-v1";
const STORY_ARCHIVE_QA_MODE = QA_MODE === "story-archive-v1";
const NEW_PLAYER_GUIDE_QA_MODE = QA_MODE === "new-player-guide-v1";
const FOOD_CODEX_PREVIEW = new URLSearchParams(location.search).get("preview") === "food-codex-matrix-v1";
const STORY_ARCHIVE_QA_AUTOPEN = STORY_ARCHIVE_QA_MODE
  && new URLSearchParams(location.search).get("open") === "1";
const GLOBAL_LOADING_QA_HOLD = GLOBAL_LOADING_QA_MODE && new URLSearchParams(location.search).get("hold") === "1";
const ORDER_GIFT_QA_CHAPTER = Math.max(1, Math.min(4, Number(new URLSearchParams(location.search).get("chapter")) || 1));
const REPAIR_PROGRESS_QA_CHAPTER = Math.max(1, Math.min(4, Number(new URLSearchParams(location.search).get("chapter")) || 1));
const REPAIR_PROGRESS_QA_STEP = Math.max(0, Number(new URLSearchParams(location.search).get("step")) || 0);
const REPAIR_PROGRESS_QA_VIEW = new URLSearchParams(location.search).get("view") === "entry" ? "entry" : "completion";
const CHAPTER_STORY_PREVIEW = new URLSearchParams(location.search).get("story");
const CHAPTER_STORY_QA_CHAPTER = Math.max(1, Math.min(4, Number(new URLSearchParams(location.search).get("chapter")) || 1));
const CHAPTER_STORY_QA_SCENE = Math.max(0, Number(new URLSearchParams(location.search).get("scene")) || 0);
const STORY_ARCHIVE_QA_CHAPTER = Math.max(1, Math.min(4, Number(new URLSearchParams(location.search).get("chapter")) || 1));
const STORY_ARCHIVE_QA_SCENE = Math.max(0, Number(new URLSearchParams(location.search).get("scene")) || 0);
const GENERATOR_ORDER_QA_STAGES = Object.freeze(["start", "dairy", "spice", "drink", "fruit", "meat"]);
const GENERATOR_ORDER_QA_STAGE_PARAM = new URLSearchParams(location.search).get("stage");
const GENERATOR_ORDER_QA_STAGE = GENERATOR_ORDER_QA_STAGES.includes(GENERATOR_ORDER_QA_STAGE_PARAM)
  ? GENERATOR_ORDER_QA_STAGE_PARAM
  : "start";
const DAIRY_DROP_DEMO_MODE = GENERATOR_ORDER_QA_MODE
  && GENERATOR_ORDER_QA_STAGE === "dairy"
  && new URLSearchParams(location.search).get("demo") === "milk-drop";
const PROGRESSION_FLOW_QA_STAGES = Object.freeze(["fresh", "20", "60", "120", "190", "260"]);
const PROGRESSION_FLOW_QA_STAGE_PARAM = new URLSearchParams(location.search).get("stage");
const PROGRESSION_FLOW_QA_STAGE = PROGRESSION_FLOW_QA_STAGES.includes(PROGRESSION_FLOW_QA_STAGE_PARAM)
  ? PROGRESSION_FLOW_QA_STAGE_PARAM
  : "fresh";
const PROGRESSION_FLOW_QA_RESET = PROGRESSION_FLOW_QA_MODE
  && new URLSearchParams(location.search).get("reset") === "1";
const REWARD_BAG_DEMO_MODE = PROGRESSION_FLOW_QA_MODE
  && new URLSearchParams(location.search).get("demo") === "reward-bag";
const ISOLATED_QA_MODE = GENERATOR_QA_MODE || GENERATOR_MATERIAL_QA_MODE || ORDER_GIFT_QA_MODE || RUBY_DISPLAY_QA_MODE || LV4_MARKET_ORDERS_QA_MODE || GENERATOR_ORDER_QA_MODE || GLOBAL_LOADING_QA_MODE || PROGRESSION_FLOW_QA_MODE || REPAIR_PROGRESS_QA_MODE || CHAPTER_STORY_QA_MODE || STORY_ARCHIVE_QA_MODE || NEW_PLAYER_GUIDE_QA_MODE;
const SAVE_KEY = NEW_PLAYER_GUIDE_QA_MODE
  ? "silkroad_tavern_proto_v02_qa_new_player_guide_v1"
  : STORY_ARCHIVE_QA_MODE
  ? "silkroad_tavern_proto_v02_qa_story_archive_v1"
  : CHAPTER_STORY_QA_MODE
  ? `silkroad_tavern_proto_v02_qa_chapter_story_v1_ch${CHAPTER_STORY_QA_CHAPTER}`
  : REPAIR_PROGRESS_QA_MODE
  ? "silkroad_tavern_proto_v02_qa_repair_progress_v1"
  : PROGRESSION_FLOW_QA_MODE
    ? `silkroad_tavern_proto_v02_qa_progression_flow_v2_${PROGRESSION_FLOW_QA_STAGE}${REWARD_BAG_DEMO_MODE ? "_reward_bag_v2" : ""}`
    : GENERATOR_QA_MODE
      ? "silkroad_tavern_proto_v02_qa_generator_system_v2"
    : GENERATOR_MATERIAL_QA_MODE
      ? "silkroad_tavern_proto_v02_qa_generator_materials_v03"
    : ORDER_GIFT_QA_MODE
      ? `silkroad_tavern_proto_v02_qa_order_gift_generator_v1_ch${ORDER_GIFT_QA_CHAPTER}`
      : RUBY_DISPLAY_QA_MODE
        ? "silkroad_tavern_proto_v02_qa_ruby_display_v1"
        : LV4_MARKET_ORDERS_QA_MODE
          ? "silkroad_tavern_proto_v02_qa_lv4_market_orders_v1"
          : GENERATOR_ORDER_QA_MODE
            ? `silkroad_tavern_proto_v02_qa_generator_order_progression_v1_${GENERATOR_ORDER_QA_STAGE}`
            : GLOBAL_LOADING_QA_MODE
              ? "silkroad_tavern_proto_v02_qa_global_loading_v1"
              : "silkroad_tavern_proto_v02";
const NPC_STANDEE_VERSION = "standee-size-02";
const BOARD_COLUMNS = 7;
const BOARD_ROWS = 9;
const BOARD_SIZE = BOARD_COLUMNS * BOARD_ROWS;
const STORAGE_FREE_SLOTS = 8;
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
const ITEM_ASSET_VERSIONS = Object.freeze({
  material_dairy_01: "dairy-lv1-parts-v1",
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
const GENERATOR_CATEGORY_UNLOCKS = Object.freeze([
  { categoryId: "mill", completedRepairId: null },
  { categoryId: "dairy", completedRepairId: "tutorial_complete" },
  { categoryId: "spice", completedRepairId: "kitchen_repair" },
  { categoryId: "drink", completedRepairId: "codex_first_phase" },
  { categoryId: "fruit", completedRepairId: "lv2_west_market" },
  { categoryId: "meat", completedRepairId: "lv2_south_shop" },
]);
const GENERATOR_ORDER_QA_VISIBLE_BY_STAGE = Object.freeze({
  start: ["order_001_guard_lubing", "order_002_farmer_dough", "order_011_dunhuang_woman_lubing"],
  dairy: ["order_015_monk_rumi", "order_016_uighur_milk", "order_018_traveler_lubing_rumi"],
  spice: ["order_025_spice_huma_pouch", "order_026_spice_ziran_bowl", "order_033_hubing_spice"],
  drink: ["order_027_drink_putaozhi_pair", "order_028_drink_putaojiang", "order_034_dairy_drink"],
  fruit: ["order_029_fruit_putao_pair", "order_035_fruit_drink", "order_038_dairy_fruit"],
  meat: ["order_031_meat_yangrou_pair", "order_036_meat_hubing", "order_040_meat_fruit_drink"],
});
const CHAPTER_NAMES = {
  1: "流沙驿初明",
  2: "西市烟火",
  3: "楼馆通途",
  4: "灯火连城",
};
const CHAPTER_TITLE_LINES = {
  1: ["流沙驿", "初明"],
  2: ["西市", "烟火"],
  3: ["楼馆", "通途"],
  4: ["灯火", "连城"],
};
const BUILD_MODE = new URLSearchParams(location.search).get("mode") === "release" ? "release" : "dev";
const INN_PACKAGE_ASSETS = [
  "./assets/longscroll/base/阶段0_未修缮长卷_1254x1254.png",
  "./assets/ui/ui_station_tavern.png",
  "./assets/keeper_portrait.png",
  "./assets/keeper_story_portrait_v2.png",
  "./assets/npc_standee/npc_dunhuang_woman.png",
  "./assets/npc_standee/npc_farmer.png",
  "./assets/npc_standee/npc_temple_donor.png",
  "./assets/npc_standee/npc_caravan_leader.png",
  "./assets/npc_repair_portrait/npc_dunhuang_woman_v1.png",
  "./assets/npc_repair_portrait/npc_farmer_v1.png",
  "./assets/npc_repair_portrait/npc_temple_donor_v1.png",
  "./assets/npc_repair_portrait/npc_sogdian_merchant_v1.png",
  "./assets/npc_repair_portrait/npc_pilgrim_monk_v1.png",
  "./assets/npc_repair_portrait/npc_uighur_herder_v1.png",
  "./assets/npc_repair_portrait/npc_shazhou_guard_v1.png",
  "./assets/npc_repair_portrait/npc_changan_envoy_v1.png",
  "./assets/npc_repair_portrait/npc_changan_maid_v1.png",
  "./assets/npc_repair_portrait/npc_caravan_leader_v1.png",
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
  "economy",
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
  "./assets/ui/bonus_ruby_lv01.png",
  "./assets/ui/bonus_ruby_lv02.png",
  "./assets/ui/bonus_ruby_lv03.png",
  "./assets/ui/bonus_ruby_lv04.png",
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
    itemId: ORDER_PROGRESS_GIFT_ITEM_ID,
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
    itemId: ORDER_PROGRESS_GIFT_ITEM_ID,
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
  economyConfig: null,
  board: [],
  bag: [],
  rewardItems: [],
  giftPacks: [],
  giftBoxStates: {},
  bubbleStates: {},
  unlockedCells: [],
  visibleOrders: [],
  unlockedCodex: new Set(),
  unlockedFoodLevels: {},
  coins: 40,
  stamina: 18,
  staminaMax: 24,
  recoverMinutes: 6,
  generationCount: 0,
  completedOrders: 0,
  completedOrderIds: [],
  chapterOrderCounts: {},
  generatorLineOrderCounts: {},
  claimedGeneratorProgressRewards: [],
  claimedOrderProgressPacks: [],
  claimedChapterRewards: [],
  coinsEarned: 0,
  storyFlags: {},
  renovationChoices: {},
  activeRepairId: null,
  activeChapterStory: null,
  repairPromptedFor: [],
  generatorStates: {},
  unlockedGeneratorCategories: [],
  pendingGeneratorRewards: [],
  unlockedStorageSlots: STORAGE_FREE_SLOTS,
  staminaPurchaseDay: "",
  staminaPurchasesToday: 0,
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
  rewardBagBadge: document.querySelector("#rewardBagBadge"),
  bagBtn: document.querySelector("#bagBtn"),
  stationBtn: document.querySelector("#stationBtn"),
  boardReturnBtn: document.querySelector("#boardReturnBtn"),
  innKitchenBtn: document.querySelector("#innKitchenBtn"),
  pageDoorTransition: document.querySelector("#pageDoorTransition"),
  storyArchiveBtn: document.querySelector("#storyArchiveBtn"),
  boardPage: document.querySelector("#boardPage"),
  innPage: document.querySelector("#innPage"),
  innLevelName: document.querySelector("#innLevelName"),
  innChapterEyebrow: document.querySelector("#innChapterEyebrow"),
  innChapterProgress: document.querySelector("#innChapterProgress"),
  innCoins: document.querySelector("#innCoins"),
  innStamina: document.querySelector("#innStamina"),
  innGems: document.querySelector("#innGems"),
  innStaminaPlusBtn: document.querySelector("#innStaminaPlusBtn"),
  innGemPlusBtn: document.querySelector("#innGemPlusBtn"),
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
  codexKnownCount: document.querySelector("#codexKnownCount"),
  codexSelected: document.querySelector("#codexSelected"),
  codexSelectedIcon: document.querySelector("#codexSelectedIcon"),
  codexSelectedName: document.querySelector("#codexSelectedName"),
  codexSelectedText: document.querySelector("#codexSelectedText"),
  codexDetailModal: document.querySelector("#codexDetailModal"),
  codexDetailPrev: document.querySelector("#codexDetailPrev"),
  codexDetailNext: document.querySelector("#codexDetailNext"),
  codexDetailIcon: document.querySelector("#codexDetailIcon"),
  codexDetailName: document.querySelector("#codexDetailName"),
  codexDetailModern: document.querySelector("#codexDetailModern"),
  codexDetailShort: document.querySelector("#codexDetailShort"),
  codexDetailNotesTitle: document.querySelector("#codexDetailNotesTitle"),
  codexDetailLong: document.querySelector("#codexDetailLong"),
  codexDetailSourceSection: document.querySelector("#codexDetailSourceSection"),
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
  storyArchiveModal: document.querySelector("#storyArchiveModal"),
  storyArchiveTotal: document.querySelector("#storyArchiveTotal"),
  storyArchiveRecent: document.querySelector("#storyArchiveRecent"),
  storyArchiveRecentPortrait: document.querySelector("#storyArchiveRecentPortrait"),
  storyArchiveRecentTitle: document.querySelector("#storyArchiveRecentTitle"),
  storyArchiveRecentSummary: document.querySelector("#storyArchiveRecentSummary"),
  storyArchiveChapters: document.querySelector("#storyArchiveChapters"),
  storyArchiveChapterEyebrow: document.querySelector("#storyArchiveChapterEyebrow"),
  storyArchiveChapterTitle: document.querySelector("#storyArchiveChapterTitle"),
  storyArchiveChapterCount: document.querySelector("#storyArchiveChapterCount"),
  storyArchiveList: document.querySelector("#storyArchiveList"),
  repairModal: document.querySelector("#repairModal"),
  repairQaNav: document.querySelector("#repairQaNav"),
  repairQaPrev: document.querySelector("#repairQaPrev"),
  repairQaCounter: document.querySelector("#repairQaCounter"),
  repairQaNext: document.querySelector("#repairQaNext"),
  repairTitle: document.querySelector("#repairTitle"),
  repairAvatar: document.querySelector("#repairAvatar"),
  repairSpeaker: document.querySelector("#repairSpeaker"),
  repairStory: document.querySelector("#repairStory"),
  repairChapterTitle: document.querySelector("#repairChapterTitle"),
  repairChapterProgress: document.querySelector("#repairChapterProgress"),
  repairChapterProgressBar: document.querySelector("#repairChapterProgressBar"),
  repairMilestoneStrip: document.querySelector("#repairMilestoneStrip"),
  repairNextLine: document.querySelector("#repairNextLine"),
  repairCompletionSection: document.querySelector(".repair-completion-section"),
  repairCompletionRewards: document.querySelector(".repair-completion-rewards"),
  repairCompletionTitle: document.querySelector("#repairCompletionTitle"),
  repairGiftQuantity: document.querySelector("#repairGiftQuantity"),
  repairStaminaQuantity: document.querySelector("#repairStaminaQuantity"),
  repairRubyIcon: document.querySelector("#repairRubyIcon"),
  repairRubyQuantity: document.querySelector("#repairRubyQuantity"),
  repairEntryMeta: document.querySelector("#repairEntryMeta"),
  repairRewardLabel: document.querySelector("#repairRewardLabel"),
  repairCost: document.querySelector("#repairCost"),
  repairChoices: document.querySelector("#repairChoices"),
  repairConfirmBtn: document.querySelector("#repairConfirmBtn"),
  repairCostIcon: document.querySelector("#repairCostIcon"),
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
  orderFoodModal: document.querySelector("#orderFoodModal"),
  orderFoodTitle: document.querySelector("#orderFoodTitle"),
  orderFoodRoute: document.querySelector("#orderFoodRoute"),
  bagModal: document.querySelector("#bagModal"),
  bagList: document.querySelector("#bagList"),
  storageModal: document.querySelector("#storageModal"),
  storageSlotList: document.querySelector("#storageSlotList"),
  storageInviteBtn: document.querySelector("#storageInviteBtn"),
  storageUnlockBtn: document.querySelector("#storageUnlockBtn"),
  storageUnlockPrice: document.querySelector("#storageUnlockPrice"),
  staminaPurchaseModal: document.querySelector("#staminaPurchaseModal"),
  staminaPurchaseAmount: document.querySelector("#staminaPurchaseAmount"),
  staminaPurchaseCount: document.querySelector("#staminaPurchaseCount"),
  staminaPurchasePrice: document.querySelector("#staminaPurchasePrice"),
  staminaPurchaseRule: document.querySelector("#staminaPurchaseRule"),
  staminaPurchaseConfirm: document.querySelector("#staminaPurchaseConfirm"),
  rubyRechargeModal: document.querySelector("#rubyRechargeModal"),
  rubyRechargeBalance: document.querySelector("#rubyRechargeBalance"),
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
const codexByItemId = new Map();
const foodLineMaxLevels = new Map();
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
let pageSwitchInProgress = false;
let repairPulseTimer = null;
let boardGuideTimer = null;
let lastInnFocusKey = null;
let pendingInnFocusPosition = null;
let repairAnchorRect = null;
let repairModalAnimating = false;
let repairModalMode = "entry";
let bonusBubbleSequence = 0;
let lastBonusCoinTapIndex = -1;
let lastBonusCoinTapAt = 0;
let lastBonusRubyTapIndex = -1;
let lastBonusRubyTapAt = 0;
let activeStoryArchiveChapter = 1;
let storyArchiveCloseTimer = null;
let storyArchivePageSwapTimer = null;
let storyArchivePageDoneTimer = null;
let storyArchivePageTurning = false;
let activeOrderFoodContext = null;
let activeCodexItemId = null;
const activeGeneratorOutputIndices = new Set();

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
        assetVersion: category.assetVersions?.[String(stage)] ?? null,
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
  return config.categories.flatMap((category) =>
    Array.from({ length: levels }, (_, offset) => {
      const level = offset + 1;
      const generatorType = category.generatorType ?? config.generatorType;
      const levelEconomy = config.levelEconomy?.[offset] ?? {};
      const categoryLevelEconomy = category.levelEconomy?.[offset] ?? {};
      const economy = { ...config.economy, ...levelEconomy, ...category.economy, ...categoryLevelEconomy };
      const secondaryOutputWeight = category.secondaryOutputItemId
        ? Math.max(0, Math.min(100, Number(levelEconomy.secondaryOutputWeight) || 0))
        : 0;
      const pool = [{ itemId: category.baseOutputItemId, weight: 100 - secondaryOutputWeight }];
      if (secondaryOutputWeight > 0) {
        pool.push({ itemId: category.secondaryOutputItemId, weight: secondaryOutputWeight });
      }
      return {
        id: generatorItemId(category.id, level),
        type: generatorType,
        generatorType: category.id,
        foodLineId: category.foodLineId,
        masteryOrderId: category.masteryOrderId ?? null,
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
          pool,
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
  state.unlockedGeneratorCategories = state.generatorConfig.categories.map((category) => category.id);
  state.generatorLineOrderCounts = Object.fromEntries(state.generatorConfig.categories.map((category) => [category.id, 48]));
  state.claimedGeneratorProgressRewards = allGeneratorProgressRewardIds();
  state.completedOrderIds = state.generatorConfig.categories.map((category) => category.masteryOrderId);
  state.innLevel = 4;
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
  state.unlockedStorageSlots = STORAGE_FREE_SLOTS;
  state.rewardItems = [];
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
  state.unlockedStorageSlots = STORAGE_FREE_SLOTS;
  state.rewardItems = [];
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
  state.unlockedStorageSlots = STORAGE_FREE_SLOTS;
  state.rewardItems = [];
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

function initializeGeneratorOrderQaScenario() {
  const stageIndex = GENERATOR_ORDER_QA_STAGES.indexOf(GENERATOR_ORDER_QA_STAGE);
  const categories = GENERATOR_CATEGORY_UNLOCKS
    .slice(0, stageIndex + 1)
    .map((entry) => entry.categoryId);
  const completedRepairIds = GENERATOR_CATEGORY_UNLOCKS
    .slice(1, stageIndex + 1)
    .map((entry) => entry.completedRepairId);
  const generatorIndexes = [23, 24, 25, 30, 31, 32];
  const unlockedFoodLines = new Set(
    state.generatorConfig.categories
      .filter((category) => categories.includes(category.id))
      .map((category) => category.foodLineId),
  );

  state.board = Array(BOARD_SIZE).fill(null);
  categories.forEach((categoryId, index) => {
    state.board[generatorIndexes[index]] = generatorItemId(categoryId, 1);
  });
  state.bag = Array(STORAGE_FREE_SLOTS).fill(null);
  state.unlockedStorageSlots = STORAGE_FREE_SLOTS;
  state.rewardItems = [];
  state.giftPacks = [];
  state.pendingGeneratorRewards = [];
  state.unlockedGeneratorCategories = categories;
  state.unlockedCells = Array.from({ length: BOARD_SIZE }, (_, index) => index);
  state.visibleOrders = [...GENERATOR_ORDER_QA_VISIBLE_BY_STAGE[GENERATOR_ORDER_QA_STAGE]];
  state.completedOrders = stageIndex * 3;
  state.completedOrderIds = [];
  state.claimedGeneratorProgressRewards = [];
  state.renovationChoices = Object.fromEntries(completedRepairIds.map((repairId) => [repairId, "completed"]));
  state.unlockedCodex = new Set(
    state.items
      .filter((item) => unlockedFoodLines.has(item.line) && item.level <= 3 && item.codexId)
      .map((item) => item.codexId),
  );
  state.generatorStates = {};
  state.staminaMax = 99;
  state.stamina = 99;
  state.coins = 999;
  state.innLevel = stageIndex >= 4 ? 2 : 1;
  state.currentPage = "board";
  state.selectedIndex = null;
}

const PROGRESSION_FLOW_QA_SPECS = Object.freeze({
  fresh: { completedOrders: 0, repairCount: 0, innLevel: 1, generatorLevel: 1, coins: 40, chapterOrders: 0 },
  20: { completedOrders: 20, repairCount: 2, innLevel: 1, generatorLevel: 2, coins: 220, chapterOrders: 8 },
  60: { completedOrders: 60, repairCount: 6, innLevel: 2, generatorLevel: 3, coins: 300, chapterOrders: 8 },
  120: { completedOrders: 120, repairCount: 13, innLevel: 3, generatorLevel: 4, coins: 600, chapterOrders: 8 },
  190: { completedOrders: 190, repairCount: 20, innLevel: 4, generatorLevel: 5, coins: 1200, chapterOrders: 8 },
  260: { completedOrders: 260, repairCount: 22, innLevel: 4, generatorLevel: 6, coins: 2500, chapterOrders: 12 },
});

function initializeProgressionFlowQaScenario() {
  const spec = PROGRESSION_FLOW_QA_SPECS[PROGRESSION_FLOW_QA_STAGE];
  const isFreshStage = spec.completedOrders === 0;
  const completedMilestones = state.progressionConfig.milestones.slice(0, spec.repairCount);
  const completedRepairIds = new Set(completedMilestones.map((milestone) => milestone.id));
  const unlockedCategories = GENERATOR_CATEGORY_UNLOCKS
    .filter((entry) => !entry.completedRepairId || completedRepairIds.has(entry.completedRepairId))
    .map((entry) => entry.categoryId);
  const maxDemandLevel = Number(
    state.economyConfig.orderPricing.availability.maxDemandLevelByGeneratorLevel[spec.generatorLevel],
  ) || 3;
  const unlockedFoodLines = new Set(
    state.generatorConfig.categories
      .filter((category) => unlockedCategories.includes(category.id))
      .map((category) => category.foodLineId),
  );
  const lineOrderTarget = spec.completedOrders > 0 ? Number(
    state.generatorConfig.duplicateRewardMilestones.find(
      (requirement) => requirement.targetLevel === Math.min(6, spec.generatorLevel + 1),
    )?.lineOrders,
  ) || 0 : 0;
  const masteryComplete = spec.generatorLevel === 6;
  const pairReady = spec.generatorLevel < 6 && !(spec.generatorLevel === 5 && !masteryComplete);

  state.board = Array(BOARD_SIZE).fill(null);
  if (isFreshStage) {
    state.board[starterGeneratorIndex()] = "gen_mill_01";
  } else {
    unlockedCategories.forEach((categoryId, index) => {
      state.board[index * 2] = generatorItemId(categoryId, spec.generatorLevel);
      if (pairReady) {
        state.board[index * 2 + 1] = generatorItemId(categoryId, spec.generatorLevel);
      }
    });
  }
  state.bag = Array(STORAGE_FREE_SLOTS).fill(null);
  state.unlockedStorageSlots = STORAGE_FREE_SLOTS;
  state.rewardItems = [];
  state.giftPacks = [];
  if (REWARD_BAG_DEMO_MODE) {
    state.rewardItems = [
      { itemId: "bonus_coin_01", quantity: 18 },
      { itemId: "bonus_coin_02", quantity: 7 },
      { itemId: "bonus_coin_03", quantity: 3 },
      { itemId: "bonus_coin_04", quantity: 1 },
      { itemId: "bonus_ruby_01", quantity: 4 },
    ];
    state.giftPacks = [
      { id: "gift_order_ch1_4", quantity: 5 },
      { id: "gift_milk_room_parts_01", quantity: 2 },
    ];
  }
  state.giftBoxStates = {};
  state.bubbleStates = {};
  state.unlockedCells = isFreshStage ? [] : Array.from({ length: BOARD_SIZE }, (_, index) => index);
  state.visibleOrders = [];
  state.unlockedCodex = isFreshStage
    ? new Set(["codex_hubing_01"])
    : new Set(
      state.items
        .filter((item) => unlockedFoodLines.has(item.line) && item.level <= maxDemandLevel && item.codexId)
        .map((item) => item.codexId),
    );
  state.coins = spec.coins;
  state.gems = startingGemBalance();
  state.stamina = isFreshStage ? state.staminaConfig.initial.startValue : 99;
  state.staminaMax = isFreshStage ? state.staminaConfig.initial.max : 99;
  state.recoverMinutes = isFreshStage ? state.staminaConfig.initial.recoverMinutes : 5;
  state.generationCount = spec.completedOrders;
  state.completedOrders = spec.completedOrders;
  state.completedOrderIds = spec.generatorLevel === 6
    ? state.generatorConfig.categories
      .filter((category) => unlockedCategories.includes(category.id))
      .map((category) => category.masteryOrderId)
      .filter(Boolean)
    : [];
  const highestClaimedTargetLevel = isFreshStage
    ? 1
    : spec.generatorLevel === 5 && !masteryComplete
      ? 5
      : Math.min(6, spec.generatorLevel + 1);
  state.claimedGeneratorProgressRewards = unlockedCategories.flatMap((categoryId) =>
    state.generatorConfig.duplicateRewardMilestones
      .filter((milestone) => milestone.targetLevel <= highestClaimedTargetLevel)
      .map((milestone) => generatorProgressRewardId(categoryId, milestone.targetLevel)),
  );
  state.chapterOrderCounts = { 1: 0, 2: 0, 3: 0, 4: 0, [spec.innLevel]: spec.chapterOrders };
  state.generatorLineOrderCounts = Object.fromEntries(
    state.generatorConfig.categories.map((category) => [
      category.id,
      unlockedCategories.includes(category.id) ? lineOrderTarget : 0,
    ]),
  );
  state.claimedOrderProgressPacks = state.progressionConfig.orderProgressPacks
    .filter((pack) => pack.chapter < spec.innLevel
      || (pack.chapter === spec.innLevel && pack.threshold < spec.chapterOrders))
    .map((pack) => pack.id);
  state.coinsEarned = Math.max(0, Math.round(spec.completedOrders * 28));
  state.storyFlags = Object.fromEntries(
    completedMilestones.flatMap((milestone) => milestone.rewards?.storyFlags ?? [])
      .map((flag) => [flag, true]),
  );
  state.renovationChoices = Object.fromEntries(
    completedMilestones.map((milestone) => [milestone.id, "completed"]),
  );
  state.activeRepairId = null;
  state.repairPromptedFor = [];
  state.generatorStates = {};
  state.unlockedGeneratorCategories = unlockedCategories;
  state.pendingGeneratorRewards = [];
  state.innLevel = spec.innLevel;
  state.ownedFurniture = [];
  state.placedFurniture = Array(6).fill(null);
  state.currentPage = "board";
  state.tutorialStep = spec.completedOrders ? 5 : 0;
  state.selectedIndex = null;
  state.lastTick = Date.now();
}

function initializeStoryArchiveQaScenario() {
  const story = window.SilkRoadChapterStory;
  if (!story?.chapterSegments) return;
  const flags = {};
  const reachedSegmentIds = [];
  for (let chapter = 1; chapter <= STORY_ARCHIVE_QA_CHAPTER; chapter += 1) {
    const ids = story.chapterSegments[chapter] ?? [];
    const lastIndex = chapter < STORY_ARCHIVE_QA_CHAPTER
      ? ids.length - 1
      : Math.min(ids.length - 1, STORY_ARCHIVE_QA_SCENE);
    ids.slice(0, lastIndex + 1).forEach((segmentId) => {
      flags[chapterStoryFlag(segmentId)] = true;
      reachedSegmentIds.push(segmentId);
    });
  }
  flags.chapter1StoryOpeningSeen = Boolean(flags[chapterStoryFlag("opening")]);
  for (let chapter = 2; chapter <= 4; chapter += 1) {
    flags[`chapter${chapter}StoryOpeningSeen`] = Boolean(flags[chapterStoryFlag(`chapter${chapter}-opening`)]);
  }
  state.storyFlags = flags;
  state.renovationChoices = Object.fromEntries(
    reachedSegmentIds
      .filter((segmentId) => segmentId.startsWith("after:"))
      .map((segmentId) => [segmentId.slice("after:".length), "completed"]),
  );
  state.activeChapterStory = null;
  state.activeRepairId = null;
  state.completedOrders = 1;
  state.innLevel = STORY_ARCHIVE_QA_CHAPTER;
  state.currentPage = "inn";
}

function initializeRepairProgressQaScenario() {
  const chapterMilestones = state.progressionConfig.milestones.filter(
    (milestone) => (milestone.chapter ?? 1) === REPAIR_PROGRESS_QA_CHAPTER,
  );
  const minimumCompleted = REPAIR_PROGRESS_QA_VIEW === "completion" ? 1 : 0;
  const completedInChapter = Math.min(
    chapterMilestones.length,
    Math.max(minimumCompleted, Math.floor(REPAIR_PROGRESS_QA_STEP)),
  );
  const completedIds = new Set(chapterMilestones.slice(0, completedInChapter).map((milestone) => milestone.id));
  state.renovationChoices = Object.fromEntries(
    state.progressionConfig.milestones
      .filter((milestone) => (milestone.chapter ?? 1) < REPAIR_PROGRESS_QA_CHAPTER || completedIds.has(milestone.id))
      .map((milestone) => [milestone.id, "completed"]),
  );
  state.claimedChapterRewards = Array.from(
    { length: Math.max(0, REPAIR_PROGRESS_QA_CHAPTER - 1) },
    (_, index) => index + 1,
  );
  state.activeRepairId = null;
  state.repairPromptedFor = [];
  state.coins = 9999;
  state.innLevel = REPAIR_PROGRESS_QA_CHAPTER;
  state.currentPage = "inn";
}

function openRepairProgressQaScenario() {
  const chapterMilestones = getMilestoneViews().filter(
    (milestone) => milestone.chapter === REPAIR_PROGRESS_QA_CHAPTER,
  );
  if (!chapterMilestones.length) return;
  const completedInChapter = Math.min(
    chapterMilestones.length,
    Object.keys(state.renovationChoices).filter((milestoneId) =>
      chapterMilestones.some((milestone) => milestone.id === milestoneId),
    ).length,
  );
  const focusIndex = REPAIR_PROGRESS_QA_VIEW === "completion"
    ? Math.max(0, completedInChapter - 1)
    : Math.min(completedInChapter, chapterMilestones.length - 1);
  openRepairProgressModal(chapterMilestones[focusIndex], REPAIR_PROGRESS_QA_VIEW);
}

function configureRepairProgressQaState(milestone, mode) {
  const allMilestones = state.progressionConfig.milestones;
  const chapter = milestone.chapter ?? 1;
  const chapterMilestones = allMilestones.filter((entry) => (entry.chapter ?? 1) === chapter);
  const localIndex = chapterMilestones.findIndex((entry) => entry.id === milestone.id);
  const completedCount = mode === "completion" ? localIndex + 1 : localIndex;
  const completedIds = new Set(chapterMilestones.slice(0, Math.max(0, completedCount)).map((entry) => entry.id));

  state.renovationChoices = Object.fromEntries(
    allMilestones
      .filter((entry) => (entry.chapter ?? 1) < chapter || completedIds.has(entry.id))
      .map((entry) => [entry.id, "completed"]),
  );
  state.claimedChapterRewards = Array.from({ length: Math.max(0, chapter - 1) }, (_, index) => index + 1);
  state.activeRepairId = null;
  state.repairPromptedFor = [];
  state.coins = 9999;
  state.innLevel = chapter;
  state.currentPage = "inn";

  const params = new URLSearchParams(location.search);
  params.set("chapter", String(chapter));
  params.set("step", String(Math.max(0, completedCount)));
  params.set("view", mode);
  history.replaceState(null, "", `${location.pathname}?${params.toString()}${location.hash}`);
}

function previewRepairProgressMilestone(milestoneId) {
  if (!REPAIR_PROGRESS_QA_MODE) return;
  const milestone = getMilestoneViews().find((entry) => entry.id === milestoneId);
  if (!milestone) return;
  const mode = repairModalMode === "entry" ? "entry" : "completion";
  configureRepairProgressQaState(milestone, mode);
  render();
  openRepairProgressModal(milestone, mode);
}

function navigateRepairProgressQa(offset) {
  if (!REPAIR_PROGRESS_QA_MODE) return;
  const milestones = getMilestoneViews();
  const currentIndex = milestones.findIndex((entry) => entry.id === activeRepairMilestoneId);
  const nextIndex = Math.max(0, Math.min(milestones.length - 1, currentIndex + offset));
  if (currentIndex < 0 || nextIndex === currentIndex) return;
  previewRepairProgressMilestone(milestones[nextIndex].id);
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
    "正在载入食鉴与旅人订单",
  );
  const [items, orders, codex, stamina, progression, inn, generators, generatorMaterials, economy] = dataResults;

  state.generatorConfig = generators;
  state.generatorMaterialConfig = generatorMaterials;
  state.economyConfig = economy;
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
  const foodLineIds = new Set(generators.categories.map((category) => category.foodLineId));
  state.items.forEach((item) => {
    byId.set(item.id, item);
    if (!item.generatorType && foodLineIds.has(item.line) && Number.isFinite(Number(item.level))) {
      foodLineMaxLevels.set(item.line, Math.max(foodLineMaxLevels.get(item.line) ?? 0, Number(item.level)));
    }
  });
  registerBonusCoinItems();
  registerOrderProgressPacks();
  codex.entries.forEach((entry) => {
    codexById.set(entry.id, entry);
    codexByItemId.set(entry.itemId, entry);
  });

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
  if (state.currentPage === "board") tickGenerators();
  if (REPAIR_PROGRESS_QA_MODE) setTimeout(openRepairProgressQaScenario, 80);
  if (STORY_ARCHIVE_QA_AUTOPEN) {
    setTimeout(() => openStoryArchive(STORY_ARCHIVE_QA_CHAPTER), 80);
  } else if (CHAPTER_STORY_QA_MODE) {
    setTimeout(() => window.SilkRoadChapterStory?.playChapterQa(CHAPTER_STORY_QA_CHAPTER, CHAPTER_STORY_QA_SCENE), 80);
  } else if (CHAPTER_STORY_PREVIEW) {
    setTimeout(() => playChapterStory(CHAPTER_STORY_PREVIEW, null, { force: true }), 80);
  } else if (!ISOLATED_QA_MODE && state.activeChapterStory) {
    setTimeout(resumeActiveChapterStory, 80);
  } else if (!ISOLATED_QA_MODE && !state.storyFlags.chapter1StoryOpeningSeen && state.completedOrders === 0 && Object.keys(state.renovationChoices).length === 0) {
    setTimeout(() => playChapterStory("opening"), 80);
  } else if (!ISOLATED_QA_MODE && pendingChapterOpeningId()) {
    setTimeout(() => playChapterStory(pendingChapterOpeningId()), 80);
  }
  if (FOOD_CODEX_PREVIEW) setTimeout(openCodex, 120);
  setInterval(tickStamina, 1000);
}

function startingCoinBalance() {
  return Math.max(0, Number(state.economyConfig?.currency?.startingBalance) || 40);
}

function startingGemBalance() {
  return Math.max(0, Number(state.economyConfig?.premiumCurrency?.startingBalance) || 0);
}

function storageUnlockPrices() {
  return state.economyConfig?.premiumCurrency?.storage?.unlockPrices ?? [];
}

function nextStorageUnlockPrice() {
  const priceIndex = state.unlockedStorageSlots - STORAGE_FREE_SLOTS;
  const prices = storageUnlockPrices();
  const listedPrice = Number(prices[priceIndex]);
  if (Number.isFinite(listedPrice) && listedPrice > 0) return listedPrice;
  const lastListedPrice = Number(prices.at(-1));
  const increment = Number(
    state.economyConfig?.premiumCurrency?.storage?.priceAfterTable?.incrementPerSlot,
  );
  if (!Number.isFinite(lastListedPrice) || !Number.isFinite(increment) || increment <= 0) return null;
  return lastListedPrice + increment * (priceIndex - prices.length + 1);
}

function staminaPurchaseConfig() {
  return state.economyConfig?.premiumCurrency?.staminaPurchase ?? {};
}

function currentLocalDayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function syncDailyStaminaPurchases() {
  const today = currentLocalDayKey();
  if (state.staminaPurchaseDay === today) return false;
  state.staminaPurchaseDay = today;
  state.staminaPurchasesToday = 0;
  return true;
}

function currentStaminaPurchasePrice() {
  const config = staminaPurchaseConfig();
  const firstPrice = Math.max(1, Number(config.firstPrice) || 10);
  const multiplier = Math.max(1, Number(config.priceMultiplier) || 2);
  return Math.round(firstPrice * (multiplier ** state.staminaPurchasesToday));
}

function normalizeStoryFlags(value) {
  const flags = value && typeof value === "object" ? { ...value } : {};
  Object.entries(flags).forEach(([key, enabled]) => {
    if (!enabled || !key.startsWith("chapter1Story:")) return;
    flags[`chapterStory:${key.slice("chapter1Story:".length)}`] = true;
  });
  if (flags["chapterStory:opening"]) flags.chapter1StoryOpeningSeen = true;
  for (let chapter = 2; chapter <= 4; chapter += 1) {
    if (flags[`chapterStory:chapter${chapter}-opening`]) flags[`chapter${chapter}StoryOpeningSeen`] = true;
  }
  return flags;
}

function normalizeActiveChapterStory(value) {
  if (!value || typeof value !== "object" || typeof value.segmentId !== "string") return null;
  return {
    segmentId: value.segmentId,
    index: Math.max(0, Number.isInteger(value.index) ? value.index : 0),
    rewardVisible: Boolean(value.rewardVisible),
  };
}

function normalizeUnlockedFoodLevels(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value)
      .filter(([line, level]) => foodLineMaxLevels.has(line) && Number.isFinite(Number(level)) && Number(level) > 0)
      .map(([line, level]) => [line, Math.min(maximumFoodLevelForLine(line), Math.max(1, Math.floor(Number(level))))]),
  );
}

function maximumFoodLevelForLine(line) {
  return foodLineMaxLevels.get(line) ?? 0;
}

function rememberUnlockedFoodLevel(line, level) {
  const highestAvailableLevel = maximumFoodLevelForLine(line);
  if (!highestAvailableLevel) return false;
  const nextLevel = Math.min(highestAvailableLevel, Math.max(1, Math.floor(Number(level) || 1)));
  const previousLevel = Number(state.unlockedFoodLevels[line]) || 0;
  if (nextLevel <= previousLevel) return false;
  state.unlockedFoodLevels[line] = nextLevel;
  return true;
}

function rememberUnlockedFoodItem(itemId) {
  const item = byId.get(itemId);
  if (!item || item.generatorType || !foodLineMaxLevels.has(item.line) || !Number.isFinite(Number(item.level))) return false;
  return rememberUnlockedFoodLevel(item.line, item.level);
}

function syncUnlockedFoodLevels({ includeCompletedOrders = false } = {}) {
  let changed = false;
  [...state.board, ...state.bag].forEach((itemId) => {
    if (itemId) changed = rememberUnlockedFoodItem(itemId) || changed;
  });
  state.unlockedCodex.forEach((codexId) => {
    const codex = codexById.get(codexId);
    if (codex?.itemId) changed = rememberUnlockedFoodItem(codex.itemId) || changed;
  });
  if (includeCompletedOrders) {
    state.completedOrderIds.forEach((orderId) => {
      getOrder(orderId)?.demand?.forEach((demand) => {
        changed = rememberUnlockedFoodItem(demand.itemId) || changed;
      });
    });
  }
  const availability = state.economyConfig?.orderPricing?.availability?.maxDemandLevelByGeneratorLevel ?? {};
  state.generatorConfig.categories.forEach((category) => {
    const generatorLevel = highestOwnedGeneratorLevel(category.id);
    const foodLevel = Number(availability[generatorLevel]);
    if (generatorLevel > 0 && Number.isFinite(foodLevel)) {
      changed = rememberUnlockedFoodLevel(category.foodLineId, foodLevel) || changed;
    }
  });
  return changed;
}

function defaultState() {
  const board = Array(BOARD_SIZE).fill(null);
  board[starterGeneratorIndex()] = "gen_mill_01";
  return {
    board,
    bag: Array(STORAGE_FREE_SLOTS).fill(null),
    rewardItems: [],
    giftPacks: [],
    giftBoxStates: {},
    bubbleStates: {},
    unlockedCells: [],
    visibleOrders: [REPAIR_GATE_SEQUENCE[0]],
    unlockedCodex: ["codex_hubing_01"],
    unlockedFoodLevels: { hubing: 1 },
    coins: startingCoinBalance(),
    gems: startingGemBalance(),
    stamina: state.staminaConfig.initial.startValue,
    staminaMax: state.staminaConfig.initial.max,
    recoverMinutes: state.staminaConfig.initial.recoverMinutes,
    generationCount: 0,
    completedOrders: 0,
    completedOrderIds: [],
    chapterOrderCounts: { 1: 0, 2: 0, 3: 0, 4: 0 },
    generatorLineOrderCounts: emptyGeneratorLineOrderCounts(),
    claimedGeneratorProgressRewards: [],
    claimedOrderProgressPacks: [],
    claimedChapterRewards: [],
    coinsEarned: 0,
    storyFlags: {},
    renovationChoices: {},
    activeRepairId: null,
    activeChapterStory: null,
    repairPromptedFor: [],
    generatorStates: {},
    unlockedGeneratorCategories: ["mill"],
    pendingGeneratorRewards: [],
    unlockedStorageSlots: STORAGE_FREE_SLOTS,
    staminaPurchaseDay: currentLocalDayKey(),
    staminaPurchasesToday: 0,
    innLevel: 1,
    ownedFurniture: [],
    placedFurniture: Array(6).fill(null),
    currentPage: "board",
    tutorialStep: 0,
    lastTick: Date.now(),
  };
}

function loadState() {
  if (PROGRESSION_FLOW_QA_RESET) localStorage.removeItem(SAVE_KEY);
  const saved = localStorage.getItem(SAVE_KEY);
  const data = saved ? JSON.parse(saved) : defaultState();
  const persistedCompletedOrderIds = Array.isArray(data.completedOrderIds) ? data.completedOrderIds : [];
  const persistedVisibleOrderIds = Array.isArray(data.visibleOrders) ? data.visibleOrders : [];
  const loadedOrderIds = migrateLegacyOrderIds(persistedCompletedOrderIds);
  const loadedVisibleOrderIds = migrateLegacyOrderIds(persistedVisibleOrderIds);
  const hasLegacyOrderIds = [...persistedCompletedOrderIds, ...persistedVisibleOrderIds]
    .some((orderId) => Boolean(LEGACY_ORDER_ID_MAP[orderId]));
  const hasLegacyStoryFlags = data.storyFlags && typeof data.storyFlags === "object"
    && Object.entries(data.storyFlags).some(([key, enabled]) => enabled && key.startsWith("chapter1Story:"));
  Object.assign(state, {
    board: normalizeBoard(data.board),
    bag: normalizeStorageSlots(data.bag, data.unlockedStorageSlots),
    rewardItems: normalizeRewardItems(data.rewardItems),
    giftPacks: normalizeGiftPacks(data.giftPacks),
    giftBoxStates: normalizeGiftBoxStates(data.giftBoxStates),
    bubbleStates: normalizeBubbleStates(data.bubbleStates),
    unlockedCells: normalizeUnlockedCells(data.unlockedCells),
    visibleOrders: loadedVisibleOrderIds.length ? loadedVisibleOrderIds : defaultState().visibleOrders,
    unlockedCodex: new Set(data.unlockedCodex?.length ? data.unlockedCodex : ["codex_hubing_01"]),
    unlockedFoodLevels: normalizeUnlockedFoodLevels(data.unlockedFoodLevels),
    coins: data.coins ?? startingCoinBalance(),
    gems: data.gems ?? startingGemBalance(),
    stamina: data.stamina ?? state.staminaConfig.initial.startValue,
    staminaMax: Math.max(data.staminaMax ?? state.staminaConfig.initial.max, state.staminaConfig.initial.max),
    recoverMinutes: data.recoverMinutes ?? state.staminaConfig.initial.recoverMinutes,
    generationCount: data.generationCount ?? 0,
    completedOrders: data.completedOrders ?? 0,
    completedOrderIds: loadedOrderIds,
    chapterOrderCounts: normalizeChapterOrderCounts(data.chapterOrderCounts, data.completedOrders, data.innLevel),
    generatorLineOrderCounts: normalizeGeneratorLineOrderCounts(data.generatorLineOrderCounts, loadedOrderIds),
    claimedGeneratorProgressRewards: normalizeClaimedGeneratorProgressRewards(data.claimedGeneratorProgressRewards),
    claimedOrderProgressPacks: normalizeClaimedOrderProgressPacks(data.claimedOrderProgressPacks),
    claimedChapterRewards: Array.isArray(data.claimedChapterRewards)
      ? data.claimedChapterRewards.filter((chapter) => Number.isInteger(chapter) && chapter >= 1 && chapter <= 4)
      : [],
    coinsEarned: data.coinsEarned ?? 0,
    storyFlags: normalizeStoryFlags(data.storyFlags),
    renovationChoices: data.renovationChoices && typeof data.renovationChoices === "object" ? data.renovationChoices : {},
    activeRepairId: typeof data.activeRepairId === "string" ? data.activeRepairId : null,
    activeChapterStory: normalizeActiveChapterStory(data.activeChapterStory),
    repairPromptedFor: Array.isArray(data.repairPromptedFor) ? data.repairPromptedFor : [],
    generatorStates: normalizeGeneratorStates(data.generatorStates),
    unlockedGeneratorCategories: normalizeUnlockedGeneratorCategories(data.unlockedGeneratorCategories, data),
    pendingGeneratorRewards: normalizePendingGeneratorRewards(data.pendingGeneratorRewards),
    unlockedStorageSlots: normalizeUnlockedStorageSlots(data.unlockedStorageSlots, data.bag),
    staminaPurchaseDay: data.staminaPurchaseDay === currentLocalDayKey()
      ? data.staminaPurchaseDay
      : currentLocalDayKey(),
    staminaPurchasesToday: data.staminaPurchaseDay === currentLocalDayKey()
      ? Math.max(0, Math.floor(Number(data.staminaPurchasesToday) || 0))
      : 0,
    innLevel: data.innLevel ?? 1,
    ownedFurniture: Array.isArray(data.ownedFurniture) ? data.ownedFurniture : [],
    placedFurniture: Array.isArray(data.placedFurniture) ? normalizePlacedFurniture(data.placedFurniture) : Array(6).fill(null),
    currentPage: data.currentPage === "inn" ? "inn" : "board",
    tutorialStep: data.tutorialStep ?? 0,
    lastTick: data.lastTick ?? Date.now(),
  });
  if (state.activeChapterStory) {
    const segmentId = state.activeChapterStory.segmentId;
    if (state.storyFlags[`chapterStory:${segmentId}`] || state.storyFlags[`chapter1Story:${segmentId}`]) {
      state.activeChapterStory = null;
    }
  }
  if (GENERATOR_QA_MODE && !saved) initializeGeneratorQaScenario();
  if (GENERATOR_MATERIAL_QA_MODE && !saved) initializeGeneratorMaterialQaScenario();
  if (ORDER_GIFT_QA_MODE && !saved) initializeOrderGiftQaScenario();
  if (RUBY_DISPLAY_QA_MODE) initializeRubyDisplayQaScenario();
  if (LV4_MARKET_ORDERS_QA_MODE) initializeLv4MarketOrdersQaScenario();
  if (GENERATOR_ORDER_QA_MODE && (!saved || DAIRY_DROP_DEMO_MODE)) initializeGeneratorOrderQaScenario();
  if (PROGRESSION_FLOW_QA_MODE && !saved) initializeProgressionFlowQaScenario();
  if (REPAIR_PROGRESS_QA_MODE) initializeRepairProgressQaScenario();
  if (STORY_ARCHIVE_QA_MODE) initializeStoryArchiveQaScenario();
  restoreBonusBubbleItems();
  convertExpiredBubbles(Date.now());
  migrateOccupiedLockedCells();
  applyOfflineRecovery();
  const generatorUnlocksChanged = ensureStarterGenerator();
  const retroactiveGeneratorRewards = ISOLATED_QA_MODE ? [] : syncGeneratorProgressRewards();
  pruneGeneratorStates();
  syncVisibleOrders();
  const foodUnlocksChanged = syncUnlockedFoodLevels({ includeCompletedOrders: true });
  if (hasLegacyOrderIds || hasLegacyStoryFlags || generatorUnlocksChanged || foodUnlocksChanged || retroactiveGeneratorRewards.length || (PROGRESSION_FLOW_QA_MODE && !saved)) saveState();
  if (PROGRESSION_FLOW_QA_RESET) {
    const url = new URL(location.href);
    url.searchParams.delete("reset");
    history.replaceState(null, "", url);
  }
}

function saveState() {
  syncUnlockedFoodLevels();
  localStorage.setItem(
    SAVE_KEY,
    JSON.stringify({
      board: state.board,
      bag: state.bag,
      rewardItems: state.rewardItems,
      giftPacks: state.giftPacks,
      giftBoxStates: state.giftBoxStates,
      bubbleStates: state.bubbleStates,
      unlockedCells: state.unlockedCells,
      visibleOrders: state.visibleOrders,
      unlockedCodex: [...state.unlockedCodex],
      unlockedFoodLevels: state.unlockedFoodLevels,
      coins: state.coins,
      gems: state.gems,
      stamina: state.stamina,
      staminaMax: state.staminaMax,
      recoverMinutes: state.recoverMinutes,
      generationCount: state.generationCount,
      completedOrders: state.completedOrders,
      completedOrderIds: state.completedOrderIds,
      chapterOrderCounts: state.chapterOrderCounts,
      generatorLineOrderCounts: state.generatorLineOrderCounts,
      claimedGeneratorProgressRewards: state.claimedGeneratorProgressRewards,
      claimedOrderProgressPacks: state.claimedOrderProgressPacks,
      claimedChapterRewards: state.claimedChapterRewards,
      coinsEarned: state.coinsEarned,
      storyFlags: state.storyFlags,
      renovationChoices: state.renovationChoices,
      activeRepairId: state.activeRepairId,
      activeChapterStory: state.activeChapterStory,
      repairPromptedFor: state.repairPromptedFor,
      generatorStates: state.generatorStates,
      unlockedGeneratorCategories: state.unlockedGeneratorCategories,
      pendingGeneratorRewards: state.pendingGeneratorRewards,
      unlockedStorageSlots: state.unlockedStorageSlots,
      staminaPurchaseDay: state.staminaPurchaseDay,
      staminaPurchasesToday: state.staminaPurchasesToday,
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

function validGeneratorCategoryIds() {
  return state.generatorConfig.categories.map((category) => category.id);
}

function generatorCategoryForItem(itemId) {
  const item = byId.get(migrateLegacyGeneratorId(itemId));
  return isGeneratorPiece(item) ? item.generatorType : null;
}

function normalizeUnlockedGeneratorCategories(value, savedData = {}) {
  const validIds = new Set(validGeneratorCategoryIds());
  const categories = new Set(["mill"]);
  if (Array.isArray(value)) {
    value.filter((categoryId) => validIds.has(categoryId)).forEach((categoryId) => categories.add(categoryId));
  }
  [...(savedData.board ?? []), ...(savedData.bag ?? []), ...(savedData.pendingGeneratorRewards ?? [])]
    .map(generatorCategoryForItem)
    .filter((categoryId) => validIds.has(categoryId))
    .forEach((categoryId) => categories.add(categoryId));
  return validGeneratorCategoryIds().filter((categoryId) => categories.has(categoryId));
}

function normalizePendingGeneratorRewards(value) {
  if (!Array.isArray(value)) return [];
  return value
    .map(migrateLegacyGeneratorId)
    .filter((itemId) => isGeneratorPiece(byId.get(itemId)));
}

function isRepairCompleted(repairId) {
  return Boolean(repairId && state.renovationChoices[repairId]);
}

function shouldUnlockGeneratorCategory(unlock) {
  return !unlock.completedRepairId || isRepairCompleted(unlock.completedRepairId);
}

function ownsGeneratorCategory(categoryId) {
  return [...state.board, ...state.bag, ...state.pendingGeneratorRewards]
    .some((itemId) => generatorCategoryForItem(itemId) === categoryId);
}

function deliverGeneratorPieceReward(categoryId, level = 1) {
  const itemId = generatorItemId(categoryId, level);
  if (!byId.has(itemId)) return "invalid";
  const boardIndex = randomUnlockedEmptyIndex();
  if (boardIndex >= 0) {
    state.board[boardIndex] = itemId;
    state.pulseIndex = boardIndex;
    clearPulseSoon();
    return "board";
  }
  const bagIndex = firstEmptyBagIndex();
  if (bagIndex >= 0) {
    state.bag[bagIndex] = itemId;
    return "bag";
  }
  state.pendingGeneratorRewards.push(itemId);
  return "pending";
}

function deliverGeneratorReward(categoryId) {
  if (ownsGeneratorCategory(categoryId)) return "owned";
  return deliverGeneratorPieceReward(categoryId, 1);
}

function generatorProgressRewardId(categoryId, targetLevel) {
  return `${categoryId}:lv${targetLevel}`;
}

function allGeneratorProgressRewardIds() {
  return state.generatorConfig.categories.flatMap((category) =>
    state.generatorConfig.duplicateRewardMilestones.map((milestone) =>
      generatorProgressRewardId(category.id, milestone.targetLevel),
    ),
  );
}

function normalizeClaimedGeneratorProgressRewards(value) {
  if (!Array.isArray(value)) return [];
  const validIds = new Set(allGeneratorProgressRewardIds());
  return [...new Set(value.filter((id) => validIds.has(id)))];
}

function syncGeneratorProgressRewards({ announce = false } = {}) {
  const claimed = new Set(state.claimedGeneratorProgressRewards);
  const delivered = [];
  state.generatorConfig.categories.forEach((category) => {
    if (!state.unlockedGeneratorCategories.includes(category.id)) return;
    const lineOrders = state.generatorLineOrderCounts[category.id] ?? 0;
    state.generatorConfig.duplicateRewardMilestones.forEach((milestone) => {
      const rewardId = generatorProgressRewardId(category.id, milestone.targetLevel);
      const masteryComplete = !milestone.requiresMasteryOrder
        || Boolean(category.masteryOrderId && state.completedOrderIds.includes(category.masteryOrderId));
      if (claimed.has(rewardId) || lineOrders < milestone.lineOrders || !masteryComplete) return;
      const rewardLevel = Number(milestone.rewardGeneratorLevel) || Math.max(1, milestone.targetLevel - 1);
      const delivery = deliverGeneratorPieceReward(category.id, rewardLevel);
      if (delivery === "invalid") return;
      claimed.add(rewardId);
      delivered.push({ category, rewardLevel, delivery });
    });
  });
  state.claimedGeneratorProgressRewards = [...claimed];
  if (announce && delivered.length) {
    const names = delivered.map(({ category, rewardLevel }) => `${category.displayName} Lv${rewardLevel}`);
    toast(`同系订单奖励：${names.join("、")}`);
  }
  return delivered;
}

function syncGeneratorCategoryUnlocks({ announce = false } = {}) {
  const unlocked = new Set(state.unlockedGeneratorCategories);
  const newlyUnlocked = [];
  GENERATOR_CATEGORY_UNLOCKS.forEach((entry) => {
    if (!shouldUnlockGeneratorCategory(entry)) return;
    const wasUnlocked = unlocked.has(entry.categoryId);
    if (!wasUnlocked) unlocked.add(entry.categoryId);
    const delivery = deliverGeneratorReward(entry.categoryId);
    if (!wasUnlocked || delivery !== "owned") newlyUnlocked.push({ ...entry, delivery });
  });
  state.unlockedGeneratorCategories = validGeneratorCategoryIds().filter((categoryId) => unlocked.has(categoryId));
  if (announce) {
    newlyUnlocked.forEach(({ categoryId, delivery }) => {
      const category = state.generatorConfig.categories.find((entry) => entry.id === categoryId);
      if (!category) return;
      const suffix = delivery === "board"
        ? "已放入棋盘。"
        : delivery === "bag"
          ? "棋盘已满，已放入柜中暂存。"
          : delivery === "pending"
            ? "棋盘与柜子已满，已加入待领取队列。"
            : "已开放。";
      toast(`${category.displayName}${suffix}`);
    });
  }
  return newlyUnlocked.length > 0;
}

function flushPendingGeneratorRewards() {
  let changed = false;
  while (state.pendingGeneratorRewards.length) {
    const itemId = state.pendingGeneratorRewards[0];
    const boardIndex = firstEmptyIndex();
    if (boardIndex >= 0) {
      state.board[boardIndex] = itemId;
      state.pendingGeneratorRewards.shift();
      changed = true;
      continue;
    }
    const bagIndex = firstEmptyBagIndex();
    if (bagIndex < 0) break;
    state.bag[bagIndex] = itemId;
    state.pendingGeneratorRewards.shift();
    changed = true;
  }
  return changed;
}

function ensureStarterGenerator() {
  if (ISOLATED_QA_MODE) return false;
  let changed = syncGeneratorCategoryUnlocks();
  if (!ownsGeneratorCategory("mill") && state.completedOrders === 0 && state.coinsEarned === 0) {
    deliverGeneratorReward("mill");
    changed = true;
  }
  return flushPendingGeneratorRewards() || changed;
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
  els.staminaPlusBtn?.addEventListener("click", openStaminaPurchase);
  els.gemPlusBtn?.addEventListener("click", openRubyRecharge);
  els.storageBtn?.addEventListener("click", openStorage);
  els.stationHudBtn?.addEventListener("click", handleStationButton);
  els.repairSideBtn?.addEventListener("click", handleStationButton);
  els.rewardBagBtn?.addEventListener("click", openBag);
  els.bagBtn.addEventListener("click", openBag);
  els.stationBtn.addEventListener("click", handleStationButton);
  els.boardReturnBtn.addEventListener("click", () => switchPage("board"));
  els.innKitchenBtn?.addEventListener("click", () => switchPage("board"));
  els.innStaminaPlusBtn?.addEventListener("click", openStaminaPurchase);
  els.innGemPlusBtn?.addEventListener("click", openRubyRecharge);
  els.storageInviteBtn?.addEventListener("click", explainStorageInvite);
  els.storageUnlockBtn?.addEventListener("click", purchaseNextStorageSlot);
  els.staminaPurchaseConfirm?.addEventListener("click", purchaseStamina);
  els.storyArchiveBtn?.addEventListener("click", () => openStoryArchive());
  els.storyArchiveChapters?.addEventListener("click", selectStoryArchiveChapter);
  els.storyArchiveList?.addEventListener("click", selectStoryArchiveSegment);
  els.storyArchiveRecent?.addEventListener("click", selectStoryArchiveSegment);
  els.storyArchiveModal?.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeStoryArchive();
  });
  els.innUpgradeBtn.addEventListener("click", upgradeInn);
  els.resetBtn.addEventListener("click", resetGame);
  els.debugStaminaBtn.addEventListener("click", debugAddStamina);
  els.debugDoughBtn.addEventListener("click", debugAddDough);
  els.debugRenovationBtn.addEventListener("click", debugUnlockRenovation);
  els.debugNextRepairBtn.addEventListener("click", debugAdvanceRepairGate);
  els.debugLv1UpgradeBtn.addEventListener("click", debugPrepareLv1Upgrade);
  els.debugClearBtn.addEventListener("click", debugClearBoard);
  document.querySelectorAll("[data-progression-qa-stage]").forEach((button) => {
    button.addEventListener("click", () => {
      const url = new URL(location.href);
      url.searchParams.set("qa", "progression-flow-v1");
      url.searchParams.set("stage", button.dataset.progressionQaStage);
      url.searchParams.set("reset", "1");
      location.href = url.href;
    });
  });
  els.loadingRetryBtn.addEventListener("click", () => switchPage("inn"));
  els.codexBtn.addEventListener("click", openCodex);
  els.codexSelected?.addEventListener("click", openActiveCodexDetail);
  els.codexDetailPrev?.addEventListener("click", () => navigateCodexDetail(-1));
  els.codexDetailNext?.addEventListener("click", () => navigateCodexDetail(1));
  els.codexDetailModal?.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    navigateCodexDetail(event.key === "ArrowLeft" ? -1 : 1);
  });
  els.orderDetailCodexBtn.addEventListener("click", openCodexFromOrderDetail);
  els.orderDetailCompleteBtn.addEventListener("click", completeOrderFromDetail);
  els.orderFoodModal?.addEventListener("close", () => {
    activeOrderFoodContext = null;
  });
  els.repairConfirmBtn.addEventListener("click", finalizeRepairChoice);
  els.repairQaPrev?.addEventListener("click", () => navigateRepairProgressQa(-1));
  els.repairQaNext?.addEventListener("click", () => navigateRepairProgressQa(1));
  els.repairMilestoneStrip?.addEventListener("click", (event) => {
    if (!REPAIR_PROGRESS_QA_MODE) return;
    const card = event.target.closest("[data-milestone-id]");
    if (card) previewRepairProgressMilestone(card.dataset.milestoneId);
  });
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
      if (btn.dataset.close === "storyArchiveModal") {
        closeStoryArchive();
        return;
      }
      document.querySelector(`#${btn.dataset.close}`).close();
      if (btn.dataset.close === "storyModal" && pendingUpgradeUnlock) showUpgradeUnlockSummary();
    });
  });
}

function applyBuildMode() {
  document.body.dataset.buildMode = BUILD_MODE;
  if (PROGRESSION_FLOW_QA_MODE) {
    const activeStageButton = document.querySelector(
      `[data-progression-qa-stage="${PROGRESSION_FLOW_QA_STAGE}"]`,
    );
    activeStageButton?.classList.add("active");
    activeStageButton?.setAttribute("aria-current", "true");
  }
  if (BUILD_MODE === "release") {
    document.querySelector("#debugModal")?.remove();
  } else if (new URLSearchParams(location.search).get("debug") === "1") {
    document.querySelector("#debugModal")?.showModal();
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
  if (flushPendingGeneratorRewards()) saveState();
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
  renderStoryArchiveEntry();
  if (els.storageModal?.open) renderStorage();
  if (els.staminaPurchaseModal?.open) renderStaminaPurchase();
  if (state.currentPage === "inn") {
    renderInnPage();
  } else {
    destroyInnTemporaryNodes();
  }
  renderTutorial();
  if (els.orderDetailModal.open && state.currentOrderDetailId) renderOrderDetail();
  if (els.orderFoodModal?.open && activeOrderFoodContext) renderOrderFoodDetail();
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
  if (pageSwitchInProgress) return;
  pageSwitchInProgress = true;
  try {
    if (page === "inn") {
      const packageReady = await ensureInnPackageLoaded();
      if (!packageReady) return;
      cancelInnPackageRelease();
      lastInnFocusKey = null;
    } else if (page === "board") {
      clearBoardReturnGuide();
      scheduleInnPackageRelease();
    }
    await playPageDoorTransition(() => {
      state.currentPage = page;
      render();
      if (page === "board") tickGenerators();
      saveState();
    });
  } finally {
    pageSwitchInProgress = false;
  }
}

async function playPageDoorTransition(swapPage) {
  const transition = els.pageDoorTransition;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (!transition || reducedMotion) {
    swapPage();
    return;
  }
  transition.hidden = false;
  transition.dataset.phase = "closing";
  await startupDelay(360);
  swapPage();
  transition.dataset.phase = "opening";
  await startupDelay(440);
  transition.hidden = true;
  delete transition.dataset.phase;
}

function handleStationButton() {
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
  const chapterMilestones = getMilestoneViews().filter((milestone) => (milestone.chapter ?? 1) === chapter);
  const completedChapterMilestones = chapterMilestones.filter((milestone) => selectedRenovationChoice(milestone)).length;
  const chineseNumbers = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"];
  els.innChapterEyebrow.textContent = `第${chineseNumbers[chapter] ?? chapter}章`;
  const chapterTitleLines = CHAPTER_TITLE_LINES[chapter] ?? [chapterName(chapter)];
  els.innLevelName.replaceChildren(
    ...chapterTitleLines.map((line) => Object.assign(document.createElement("span"), { textContent: line })),
  );
  els.innChapterProgress.textContent = `${chineseNumbers[completedChapterMilestones] ?? completedChapterMilestones}之${chineseNumbers[chapterMilestones.length] ?? chapterMilestones.length}`;
  els.innCoins.textContent = state.coins;
  els.innStamina.textContent = state.stamina;
  els.innGems.textContent = state.gems ?? 0;
  els.innScoreText.textContent = "主线修缮";
  els.innUpgradeText.textContent =
    level.level >= 4
      ? "当前原型已到最高驿站等级。"
      : canUpgrade.ok
        ? "条件已满足，可以升级流沙驿。"
        : canUpgrade.reason;
  els.innUpgradeBtn.disabled = level.level >= 4;
  els.innUpgradeBtn.classList.toggle("locked", !canUpgrade.ok);
  els.innUpgradeBtn.hidden = level.level >= 4 || !canUpgrade.ok;
  els.innUpgradeBtn.textContent = "扩建";
  els.innUpgradeBtn.title = canUpgrade.ok ? `扩建流沙驿，消耗${level.upgradeCost}铜币` : canUpgrade.reason;
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
  openRepairProgressModal(milestone, "entry");
}

function openRepairProgressModal(milestone, mode = "entry") {
  if (!milestone) return;
  repairModalMode = mode;
  activeRepairMilestoneId = milestone.id;
  activeRepairChoiceId = "completed";
  const chapter = milestone.chapter ?? 1;
  const chapterMilestones = getMilestoneViews().filter((entry) => entry.chapter === chapter);
  const completedCount = chapterMilestones.filter((entry) => state.renovationChoices[entry.id]).length;
  const nextInChapter = chapterMilestones.find((entry) => !state.renovationChoices[entry.id]);
  const chapterComplete = completedCount === chapterMilestones.length;
  const focusMilestone = mode === "completion" ? nextInChapter ?? milestone : milestone;
  const chapterReward = chapterCompletionReward(chapter);

  els.repairTitle.textContent = milestone.sceneName ?? milestone.name;
  els.repairAvatar.src = repairAvatarSrc(milestone.npcId);
  els.repairAvatar.alt = milestone.speaker ?? "旅人";
  els.repairAvatar.dataset.npcId = milestone.npcId ?? "";
  els.repairSpeaker.textContent = milestone.speaker ?? "流沙驿";
  els.repairStory.textContent = mode === "completion"
    ? milestone.completionText ?? "这一处已经修缮妥当。"
    : milestone.storyText ?? milestone.nextText;
  els.repairChapterTitle.textContent = `Lv${chapter} · ${chapterName(chapter)}`;
  els.repairChapterProgress.textContent = `${completedCount}/${chapterMilestones.length}`;
  els.repairChapterProgressBar.style.width = `${chapterMilestones.length ? (completedCount / chapterMilestones.length) * 100 : 0}%`;
  els.repairMilestoneStrip.innerHTML = chapterMilestones.map((entry) => {
    const completed = Boolean(state.renovationChoices[entry.id]);
    const current = !completed && nextInChapter?.id === entry.id;
    const status = completed ? "done" : current ? "current" : "locked";
    const statusLabel = completed ? "已完成" : current ? "进行中" : "未解锁";
    return `
      <article class="repair-milestone-card ${status}" data-milestone-id="${entry.id}" ${current ? 'aria-current="step"' : ""}>
        <div class="repair-milestone-image">
          <img src="${repairMilestoneThumbnail(entry)}" alt="" loading="lazy" />
          <i aria-hidden="true"></i>
        </div>
        <strong>${entry.sceneName ?? entry.name}</strong>
        <span>${statusLabel}</span>
      </article>
    `;
  }).join("");
  const followingMilestone = nextRepairMilestone();
  els.repairNextLine.textContent = mode === "entry"
    ? `当前：修缮${milestone.sceneName ?? milestone.name}`
    : nextInChapter
      ? `下一处：修缮${nextInChapter.sceneName ?? nextInChapter.name}`
      : followingMilestone
        ? `下一章：${chapterName(followingMilestone.chapter)}`
        : "四卷修缮已经全部完成";
  els.repairCompletionTitle.textContent = `Lv${chapter} 通关奖励`;
  renderRepairCompletionRewards(chapterReward);
  const rubyLevel = Math.max(1, Math.min(4, chapterReward?.rubyIconLevel ?? chapter));
  els.repairRubyIcon.src = `./assets/ui/bonus_ruby_lv${String(rubyLevel).padStart(2, "0")}.png`;
  els.repairModal.classList.toggle("chapter-complete", chapterComplete);
  els.repairRewardLabel.textContent = rewardText(milestone);
  els.repairCost.textContent = repairCost(milestone);
  els.repairChoices.innerHTML = "";
  els.repairChoices.hidden = true;
  els.repairEntryMeta.hidden = mode === "completion";
  els.repairCostIcon.hidden = mode === "completion";
  els.repairConfirmBtn.classList.toggle("progress-continue", mode === "completion");
  const qaPosition = renderRepairQaNavigation(milestone);
  if (REPAIR_PROGRESS_QA_MODE) {
    els.repairCostIcon.hidden = true;
    els.repairConfirmBtn.classList.add("progress-continue");
    els.repairCoinProgress.textContent = qaPosition.hasNext ? "查看下一处" : "已经看完全部";
    els.repairConfirmBtn.disabled = !qaPosition.hasNext;
    els.repairConfirmBtn.classList.toggle("ready", qaPosition.hasNext);
    els.repairConfirmBtn.classList.toggle("insufficient", !qaPosition.hasNext);
    els.repairConfirmBtn.classList.remove("unselected");
    els.repairConfirmBtn.setAttribute("aria-label", qaPosition.hasNext ? "查看下一处修缮效果" : "已经看完全部修缮效果");
  } else if (mode === "completion") {
    els.repairCoinProgress.textContent = followingMilestone ? "继续修缮" : "返回流沙驿";
    els.repairConfirmBtn.disabled = false;
    els.repairConfirmBtn.classList.add("ready");
    els.repairConfirmBtn.classList.remove("insufficient", "unselected");
    els.repairConfirmBtn.setAttribute("aria-label", followingMilestone ? "返回长卷查看下一处修缮" : "返回流沙驿");
  } else {
    updateRepairCostGate(milestone);
  }
  if (!els.repairModal.open) {
    els.repairModal.showModal();
    animateRepairModalIn();
  }
  requestAnimationFrame(() => centerRepairMilestoneCard(focusMilestone.id));
}

function repairMilestoneThumbnail(milestone) {
  return milestone.playerPointId
    ? `./repair-scenes/${milestone.playerPointId}/base.webp`
    : "./assets/ui/ui_station_tavern.png";
}

function centerRepairMilestoneCard(milestoneId) {
  const strip = els.repairMilestoneStrip;
  const card = strip?.querySelector(`[data-milestone-id="${milestoneId}"]`);
  if (!strip || !card) return;
  strip.scrollLeft = Math.max(0, card.offsetLeft - (strip.clientWidth - card.clientWidth) / 2);
}

function chapterCompletionReward(chapter) {
  return (state.progressionConfig?.chapterCompletionRewards ?? []).find((entry) => entry.chapter === chapter) ?? null;
}

function renderRepairCompletionRewards(chapterReward) {
  const rewards = [
    [els.repairGiftQuantity, chapterReward?.giftPack?.id ? 1 : 0],
    [els.repairStaminaQuantity, chapterReward?.stamina],
    [els.repairRubyQuantity, chapterReward?.rubies],
  ];
  let visibleCount = 0;

  rewards.forEach(([quantityElement, value]) => {
    const quantity = Math.max(0, Math.floor(Number(value) || 0));
    const rewardElement = quantityElement.closest(".repair-completion-reward");
    quantityElement.textContent = quantity > 0 ? `×${quantity}` : "";
    rewardElement.hidden = quantity === 0;
    if (quantity > 0) visibleCount += 1;
  });

  els.repairCompletionRewards.dataset.visibleCount = String(visibleCount);
  els.repairCompletionSection.hidden = visibleCount === 0;
}

function renderRepairQaNavigation(milestone) {
  const milestones = getMilestoneViews();
  const index = milestones.findIndex((entry) => entry.id === milestone.id);
  const total = milestones.length;
  const enabled = REPAIR_PROGRESS_QA_MODE && index >= 0;
  els.repairQaNav.hidden = !enabled;
  els.repairModal.classList.toggle("qa-preview", enabled);
  if (!enabled) return { hasPrevious: false, hasNext: false };
  els.repairQaCounter.textContent = `${index + 1} / ${total}`;
  els.repairQaPrev.disabled = index === 0;
  els.repairQaNext.disabled = index === total - 1;
  return { hasPrevious: index > 0, hasNext: index < total - 1 };
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

function continueAfterRepairProgress() {
  const next = nextRepairMilestone();
  activeRepairMilestoneId = null;
  activeRepairChoiceId = null;
  closeRepairModalToAnchor(() => {
    repairModalMode = "entry";
    if (!next) return;
    pendingInnFocusPosition = next.scenePosition;
    centerInnSceneOnPosition(next.scenePosition);
  });
}

function finalizeRepairChoice() {
  if (REPAIR_PROGRESS_QA_MODE) {
    navigateRepairProgressQa(1);
    return;
  }
  if (repairModalMode === "completion") {
    continueAfterRepairProgress();
    return;
  }
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
  closeRepairModalToAnchor(() => {
    playChapterStory(`before:${milestone.id}`, () => launchRepairPlayer(milestone));
  });
}

function chapterStoryFlag(segmentId) {
  return `chapterStory:${segmentId}`;
}

function chapterStorySeen(segmentId) {
  return Boolean(state.storyFlags[chapterStoryFlag(segmentId)] || state.storyFlags[`chapter1Story:${segmentId}`]);
}

function markChapterOpeningSeen(segmentId) {
  if (segmentId === "opening") {
    state.storyFlags.chapter1StoryOpeningSeen = true;
    return;
  }
  const match = segmentId.match(/^chapter([2-4])-opening$/);
  if (match) state.storyFlags[`chapter${match[1]}StoryOpeningSeen`] = true;
}

function playChapterStory(segmentId, onComplete, options = {}) {
  const player = window.SilkRoadChapterStory;
  const force = Boolean(options.force);
  const resume = Boolean(options.resume);
  const flag = chapterStoryFlag(segmentId);
  if (!player?.segments?.[segmentId] || (!force && !resume && chapterStorySeen(segmentId))) {
    onComplete?.();
    return false;
  }
  const checkpoint = resume && state.activeChapterStory?.segmentId === segmentId
    ? state.activeChapterStory
    : { segmentId, index: 0, rewardVisible: false };
  if (!force) {
    state.activeChapterStory = checkpoint;
    saveState();
  }
  return player.play(segmentId, {
    startIndex: checkpoint.index,
    startAtReward: checkpoint.rewardVisible,
    onProgress: force
      ? null
      : (nextCheckpoint) => {
          state.activeChapterStory = nextCheckpoint;
          saveState();
        },
    onComplete: () => {
      if (!force) {
        state.activeChapterStory = null;
        state.storyFlags[flag] = true;
        markChapterOpeningSeen(segmentId);
        saveState();
        renderStoryArchiveEntry();
      }
      onComplete?.();
    },
  });
}

function pendingChapterOpeningId() {
  const chapter = Number(state.innLevel);
  if (chapter < 2 || chapter > 4 || state.storyFlags[`chapter${chapter}StoryOpeningSeen`]) return null;
  const chapterMilestones = (state.progressionConfig?.milestones ?? []).filter((milestone) => milestone.chapter === chapter);
  if (!chapterMilestones.length || chapterMilestones.some((milestone) => state.renovationChoices[milestone.id])) return null;
  return `chapter${chapter}-opening`;
}

function chapterStoryContinuation(segmentId) {
  const [phase, milestoneId] = segmentId.split(":");
  if (phase === "before" && milestoneId) {
    return () => {
      const milestone = getMilestoneViews().find((entry) => entry.id === milestoneId);
      if (milestone && state.activeRepairId === milestoneId) launchRepairPlayer(milestone);
    };
  }
  if (phase === "after" && milestoneId) {
    return () => {
      const milestone = getMilestoneViews().find((entry) => entry.id === milestoneId);
      if (milestone) openRepairProgressModal(milestone, "completion");
    };
  }
  const openingMatch = segmentId.match(/^chapter([2-4])-opening$/);
  if (!openingMatch) return null;
  return () => {
    const previousLevel = state.innConfig?.levels?.find((entry) => entry.level === Number(openingMatch[1]) - 1);
    if (!previousLevel) return;
    pendingUpgradeUnlock = buildUpgradeUnlockSummary(previousLevel);
    showUpgradeUnlockSummary();
  };
}

function resumeActiveChapterStory() {
  const segmentId = state.activeChapterStory?.segmentId;
  if (!segmentId) return false;
  return playChapterStory(segmentId, chapterStoryContinuation(segmentId), { resume: true });
}

function orderedChapterStoryIds() {
  const chapters = window.SilkRoadChapterStory?.chapterSegments;
  if (!chapters) return [];
  return [1, 2, 3, 4].flatMap((chapter) => chapters[chapter] ?? []);
}

function storySegmentReached(segmentId) {
  if (chapterStorySeen(segmentId)) return true;
  if (segmentId === "opening") {
    return Boolean(
      state.storyFlags.chapter1StoryOpeningSeen
      || state.completedOrders > 0
      || Object.keys(state.renovationChoices).length > 0
      || state.innLevel > 1
    );
  }
  const openingMatch = segmentId.match(/^chapter([2-4])-opening$/);
  if (openingMatch) {
    const chapter = Number(openingMatch[1]);
    return Boolean(state.storyFlags[`chapter${chapter}StoryOpeningSeen`] || state.innLevel >= chapter);
  }
  const repairMatch = segmentId.match(/^(?:before|after):(.+)$/);
  return Boolean(repairMatch && state.renovationChoices[repairMatch[1]]);
}

function unlockedChapterStoryIds() {
  const orderedIds = orderedChapterStoryIds();
  let lastReachedIndex = -1;
  orderedIds.forEach((segmentId, index) => {
    if (storySegmentReached(segmentId)) lastReachedIndex = index;
  });
  return new Set(orderedIds.slice(0, lastReachedIndex + 1));
}

function storyArchiveChapterIds(chapter) {
  return window.SilkRoadChapterStory?.chapterSegments?.[chapter] ?? [];
}

function storyArchiveMoments(chapter) {
  return window.SilkRoadChapterStory?.archiveMoments?.[chapter] ?? [];
}

function storyArchiveMomentIsUnlocked(moment, unlockedIds = unlockedChapterStoryIds()) {
  return moment.segmentIds.every((segmentId) => unlockedIds.has(segmentId));
}

function unlockedStoryArchiveMoments(unlockedIds = unlockedChapterStoryIds()) {
  return [1, 2, 3, 4].flatMap((chapter) =>
    storyArchiveMoments(chapter).filter((moment) => storyArchiveMomentIsUnlocked(moment, unlockedIds)),
  );
}

function storyArchiveChapterIsUnlocked(chapter, unlockedIds = unlockedChapterStoryIds()) {
  return storyArchiveMoments(chapter).some((moment) => storyArchiveMomentIsUnlocked(moment, unlockedIds));
}

function storyArchiveChapterForSegment(segmentId) {
  return [1, 2, 3, 4].find((chapter) => storyArchiveChapterIds(chapter).includes(segmentId)) ?? 1;
}

function storyArchiveChapterForMoment(momentId) {
  return [1, 2, 3, 4].find((chapter) =>
    storyArchiveMoments(chapter).some((moment) => moment.id === momentId),
  ) ?? 1;
}

function renderStoryArchiveEntry() {
  if (!els.storyArchiveBtn) return;
  const count = unlockedStoryArchiveMoments().length;
  els.storyArchiveBtn.disabled = count === 0;
  els.storyArchiveBtn.setAttribute("aria-label", count ? "回顾已解锁剧情" : "剧情尚未解锁");
  els.storyArchiveBtn.title = count ? "剧情回顾" : "剧情尚未解锁";
}

function latestUnlockedStorySegmentId(unlockedIds) {
  const orderedIds = orderedChapterStoryIds();
  for (let index = orderedIds.length - 1; index >= 0; index -= 1) {
    if (unlockedIds.has(orderedIds[index])) return orderedIds[index];
  }
  return null;
}

function renderStoryArchiveRecent(unlockedIds) {
  const player = window.SilkRoadChapterStory;
  const segmentId = latestUnlockedStorySegmentId(unlockedIds);
  const segment = segmentId ? player?.segments?.[segmentId] : null;
  const lastStep = segment?.steps?.[segment.steps.length - 1];
  if (!segmentId || !segment || !lastStep || !els.storyArchiveRecent) return;
  const completedMoments = unlockedStoryArchiveMoments(unlockedIds);
  const latestMoment = completedMoments[completedMoments.length - 1];
  const momentEndsHere = latestMoment?.segmentIds[latestMoment.segmentIds.length - 1] === segmentId;
  delete els.storyArchiveRecent.dataset.storyMomentId;
  delete els.storyArchiveRecent.dataset.storySegmentId;
  if (momentEndsHere) els.storyArchiveRecent.dataset.storyMomentId = latestMoment.id;
  else els.storyArchiveRecent.dataset.storySegmentId = segmentId;
  els.storyArchiveRecent.setAttribute("aria-label", `重温最近剧情：${momentEndsHere ? latestMoment.title : segment.title}`);
  els.storyArchiveRecentPortrait.src = lastStep[2];
  els.storyArchiveRecentPortrait.alt = "";
  els.storyArchiveRecentTitle.textContent = momentEndsHere ? latestMoment.title : segment.title;
  els.storyArchiveRecentSummary.textContent = momentEndsHere ? latestMoment.summary : lastStep[4];
}

function openStoryArchive(requestedChapter = null) {
  if (!els.storyArchiveModal || !window.SilkRoadChapterStory) return;
  const unlockedIds = unlockedChapterStoryIds();
  const unlockedChapters = [1, 2, 3, 4].filter((chapter) => storyArchiveChapterIsUnlocked(chapter, unlockedIds));
  if (!unlockedChapters.length) {
    toast("第一段故事发生后，才会记入驿事。");
    return;
  }
  const normalizedRequest = Number(requestedChapter);
  activeStoryArchiveChapter = unlockedChapters.includes(normalizedRequest)
    ? normalizedRequest
    : unlockedChapters[unlockedChapters.length - 1];
  renderStoryArchive(unlockedIds);
  if (!els.storyArchiveModal.open) {
    resetStoryArchivePageTurn();
    clearTimeout(storyArchiveCloseTimer);
    els.storyArchiveModal.classList.remove("is-closing");
    els.storyArchiveModal.classList.add("is-opening");
    els.storyArchiveModal.showModal();
    setTimeout(() => els.storyArchiveModal.classList.remove("is-opening"), 620);
  }
}

function closeStoryArchive(onClosed = null) {
  if (!els.storyArchiveModal?.open) {
    onClosed?.();
    return;
  }
  resetStoryArchivePageTurn();
  clearTimeout(storyArchiveCloseTimer);
  els.storyArchiveModal.classList.remove("is-opening");
  els.storyArchiveModal.classList.add("is-closing");
  storyArchiveCloseTimer = setTimeout(() => {
    els.storyArchiveModal.close();
    els.storyArchiveModal.classList.remove("is-closing");
    storyArchiveCloseTimer = null;
    onClosed?.();
  }, 360);
}

function resetStoryArchivePageTurn() {
  clearTimeout(storyArchivePageSwapTimer);
  clearTimeout(storyArchivePageDoneTimer);
  storyArchivePageSwapTimer = null;
  storyArchivePageDoneTimer = null;
  storyArchivePageTurning = false;
  const sheet = els.storyArchiveModal?.querySelector(".story-archive-sheet");
  sheet?.classList.remove(
    "is-page-turn-forward",
    "is-page-turn-backward",
    "is-page-content-out",
    "is-page-content-in",
  );
  els.storyArchiveChapters?.removeAttribute("aria-busy");
}

function renderStoryArchive(unlockedIds = unlockedChapterStoryIds()) {
  const player = window.SilkRoadChapterStory;
  if (!player || !els.storyArchiveChapters || !els.storyArchiveList) return;
  const unlockedMoments = unlockedStoryArchiveMoments(unlockedIds);
  els.storyArchiveTotal.textContent = `${unlockedMoments.length} 则可回顾`;
  renderStoryArchiveRecent(unlockedIds);
  els.storyArchiveChapters.replaceChildren();
  [1, 2, 3, 4].forEach((chapter) => {
    const unlocked = storyArchiveChapterIsUnlocked(chapter, unlockedIds);
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.storyArchiveChapter = String(chapter);
    button.disabled = !unlocked;
    button.setAttribute("aria-selected", String(chapter === activeStoryArchiveChapter));
    button.setAttribute("aria-label", unlocked ? `查看第${chapter}章剧情` : `第${chapter}章尚未解锁`);
    button.textContent = `第${chapter}章`;
    els.storyArchiveChapters.append(button);
  });

  const chapterMoments = storyArchiveMoments(activeStoryArchiveChapter);
  const availableMoments = chapterMoments.filter((moment) => storyArchiveMomentIsUnlocked(moment, unlockedIds));
  els.storyArchiveChapterEyebrow.textContent = `第${activeStoryArchiveChapter}章`;
  els.storyArchiveChapterTitle.textContent = chapterName(activeStoryArchiveChapter);
  els.storyArchiveChapterCount.textContent = `已记 ${availableMoments.length} 则`;
  els.storyArchiveList.replaceChildren();

  availableMoments.forEach((archiveMoment, momentIndex) => {
    const segment = player.segments[archiveMoment.segmentIds[0]];
    const firstStep = segment?.steps?.[0];
    if (!segment || !firstStep) return;
    const card = document.createElement("button");
    card.type = "button";
    card.className = "story-archive-card";
    card.dataset.storyMomentId = archiveMoment.id;
    card.setAttribute("aria-label", `回顾${archiveMoment.title}，共${archiveMoment.segmentIds.length}段剧情`);

    const portrait = document.createElement("img");
    portrait.src = firstStep[2];
    portrait.alt = "";
    const copy = document.createElement("span");
    const moment = document.createElement("small");
    const title = document.createElement("strong");
    const excerpt = document.createElement("em");
    const arrow = document.createElement("i");
    moment.textContent = `第${momentIndex + 1}则`;
    title.textContent = archiveMoment.title;
    excerpt.textContent = archiveMoment.summary;
    arrow.textContent = "›";
    arrow.setAttribute("aria-hidden", "true");
    copy.append(moment, title, excerpt);
    card.append(portrait, copy, arrow);
    els.storyArchiveList.append(card);
  });

  if (availableMoments.length < chapterMoments.length) {
    const next = document.createElement("div");
    next.className = "story-archive-next";
    next.textContent = "新的纪事将在旅途中写下";
    els.storyArchiveList.append(next);
  }
  els.storyArchiveList.scrollTop = 0;
}

function selectStoryArchiveChapter(event) {
  const button = event.target.closest("button[data-story-archive-chapter]");
  if (!button || button.disabled || storyArchivePageTurning) return;
  const chapter = Number(button.dataset.storyArchiveChapter);
  if (!storyArchiveChapterIsUnlocked(chapter)) return;
  if (chapter === activeStoryArchiveChapter) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    activeStoryArchiveChapter = chapter;
    renderStoryArchive();
    return;
  }

  const sheet = els.storyArchiveModal?.querySelector(".story-archive-sheet");
  if (!sheet) {
    activeStoryArchiveChapter = chapter;
    renderStoryArchive();
    return;
  }

  const turnClass = chapter > activeStoryArchiveChapter
    ? "is-page-turn-forward"
    : "is-page-turn-backward";
  const unlockedIds = unlockedChapterStoryIds();
  storyArchivePageTurning = true;
  els.storyArchiveChapters.setAttribute("aria-busy", "true");
  sheet.classList.add(turnClass, "is-page-content-out");

  storyArchivePageSwapTimer = setTimeout(() => {
    activeStoryArchiveChapter = chapter;
    renderStoryArchive(unlockedIds);
    els.storyArchiveChapters.setAttribute("aria-busy", "true");
    sheet.classList.remove("is-page-content-out");
    sheet.classList.add("is-page-content-in");
    storyArchivePageSwapTimer = null;
  }, 340);

  storyArchivePageDoneTimer = setTimeout(() => {
    resetStoryArchivePageTurn();
  }, 720);
}

function selectStoryArchiveSegment(event) {
  const card = event.target.closest("button[data-story-segment-id], button[data-story-moment-id]");
  if (!card) return;
  if (card.dataset.storyMomentId) replayChapterStoryMoment(card.dataset.storyMomentId);
  else replayChapterStory(card.dataset.storySegmentId);
}

function replayChapterStory(segmentId) {
  const player = window.SilkRoadChapterStory;
  if (!player?.segments?.[segmentId] || !unlockedChapterStoryIds().has(segmentId)) return;
  const returnChapter = storyArchiveChapterForSegment(segmentId);
  const startReplay = () => {
    player.play(segmentId, {
      review: true,
      onComplete: () => openStoryArchive(returnChapter),
    });
  };
  if (els.storyArchiveModal.open) closeStoryArchive(startReplay);
  else startReplay();
}

function replayChapterStoryMoment(momentId) {
  const player = window.SilkRoadChapterStory;
  const returnChapter = storyArchiveChapterForMoment(momentId);
  const archiveMoment = storyArchiveMoments(returnChapter).find((moment) => moment.id === momentId);
  const unlockedIds = unlockedChapterStoryIds();
  if (!archiveMoment || !storyArchiveMomentIsUnlocked(archiveMoment, unlockedIds)) return;

  let segmentIndex = 0;
  const playNextSegment = () => {
    const segmentId = archiveMoment.segmentIds[segmentIndex];
    player.play(segmentId, {
      review: true,
      onComplete: (result) => {
        if (result?.completed && segmentIndex < archiveMoment.segmentIds.length - 1) {
          segmentIndex += 1;
          playNextSegment();
          return;
        }
        openStoryArchive(returnChapter);
      },
    });
  };
  if (els.storyArchiveModal.open) closeStoryArchive(playNextSegment);
  else playNextSegment();
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
  syncGeneratorCategoryUnlocks({ announce: true });
  if (isChapterRepairComplete(milestone.chapter)) applyChapterCompletionReward(milestone.chapter);
  syncVisibleOrders();
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
  const completedMilestone = getMilestoneViews().find((entry) => entry.id === milestoneId);
  setTimeout(() => {
    playChapterStory(`after:${milestoneId}`, () => openRepairProgressModal(completedMilestone, "completion"));
  }, 280);
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
  syncVisibleOrders();
  pendingUpgradeUnlock = buildUpgradeUnlockSummary(level);
  toast(`流沙驿升至 Lv${state.innLevel}`);
  keeper(level.upgradeStory);
  els.storyTitle.textContent = `流沙驿 Lv${state.innLevel}`;
  els.storySpeaker.textContent = "掌柜";
  els.storyAvatar.src = "./assets/keeper_portrait.png";
  els.storyAvatar.alt = "掌柜";
  els.storyText.textContent = `${level.upgradeStory}${level.unlocks.length ? ` 解锁：${level.unlocks.join("、")}。` : ""}`;
  render();
  saveState();
  const chapterOpeningId = `chapter${state.innLevel}-opening`;
  if (window.SilkRoadChapterStory?.segments?.[chapterOpeningId]) {
    playChapterStory(chapterOpeningId, showUpgradeUnlockSummary);
    return;
  }
  els.storyModal.showModal();
}

function applyInnUnlocks() {
  syncGeneratorCategoryUnlocks();
}

function buildUpgradeUnlockSummary(level) {
  const targetLevel = Math.min(4, level.level + 1);
  const summaries = {
    2: [
      { label: "已有产线", text: "磨坊、乳畜栏、香料架与酒水厢房继续并存。" },
      { label: "前段解锁", text: "完成“西市开张”后加入果摊生成器。" },
      { label: "后段解锁", text: "完成“南铺开张”后加入肉铺生成器。" },
      { label: "订单扩充", text: "顾客会逐步提出跨品类混合订单。" },
    ],
    3: [
      { label: "六类产线", text: "六种生成器全部保留，可持续并行出货。" },
      { label: "混合订单", text: "胡饼、奶食、饮品与其他品类会组合出现。" },
      { label: "楼馆修缮", text: "开放楼馆、双院、庭园与望楼六处修缮。" },
      { label: "远路来客", text: "商队、使团与求法旅人订单逐步增加。" },
    ],
    4: [
      { label: "全部产线", text: "六种生成器继续并存，不回收已有品类。" },
      { label: "高阶订单", text: "三品类组合订单成为终章主要挑战。" },
      { label: "街区修缮", text: "开放货棚、长街、巷路、东院与灯市七处修缮。" },
      { label: "终章商队", text: "康十一商队进驻，推进灯火连城主线。" },
    ],
  };
  return {
    title: `流沙驿升至 Lv${targetLevel}`,
    items: summaries[targetLevel] ?? [],
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
  if (STORY_ARCHIVE_QA_MODE) return STORY_ARCHIVE_QA_CHAPTER;
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
      .map(([key, entry]) => {
        const normalized = {
          itemId: migrateLegacyGeneratorId(entry.itemId),
          charges: Math.max(0, Number(entry.charges) || 0),
          cooldownEnd: Math.max(0, Number(entry.cooldownEnd) || 0),
        };
        if (Number.isFinite(Number(entry.remainingOutputs))) {
          normalized.remainingOutputs = Math.max(0, Math.floor(Number(entry.remainingOutputs)));
        }
        return [key, normalized];
      }),
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
      name: "丝路礼匣",
      modernName: "长卷与订单进度获得的奖励礼匣",
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
  const chapterRewards = state.progressionConfig?.chapterCompletionRewards ?? [];
  chapterRewards.forEach((entry) => {
    const gift = entry.giftPack;
    if (!gift?.id) return;
    GIFT_PACKS[gift.id] = {
      id: gift.id,
      name: gift.name,
      itemId: ORDER_PROGRESS_GIFT_ITEM_ID,
      description: gift.description,
      chapter: entry.chapter,
      materialCategory: gift.materialCategory,
      chapterCompletion: true,
      rewards: [
        { type: "coins", amount: gift.coinAmount },
        { type: "stamina", amount: gift.staminaAmount },
        { type: "mapped_material", quantity: gift.materialQuantity ?? 1 },
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

function emptyGeneratorLineOrderCounts() {
  return Object.fromEntries(state.generatorConfig.categories.map((category) => [category.id, 0]));
}

function generatorCategoriesForOrder(order) {
  const demandLines = new Set((order?.demand ?? []).map((demand) => byId.get(demand.itemId)?.line).filter(Boolean));
  return state.generatorConfig.categories
    .filter((category) => demandLines.has(category.foodLineId))
    .map((category) => category.id);
}

function normalizeGeneratorLineOrderCounts(value, completedOrderIds = []) {
  const result = emptyGeneratorLineOrderCounts();
  if (value && typeof value === "object") {
    Object.keys(result).forEach((categoryId) => {
      result[categoryId] = Math.max(0, Math.floor(Number(value[categoryId]) || 0));
    });
    return result;
  }
  completedOrderIds.forEach((orderId) => {
    generatorCategoriesForOrder(getOrder(orderId)).forEach((categoryId) => {
      result[categoryId] += 1;
    });
  });
  return result;
}

function recordGeneratorOrderProgress(order) {
  generatorCategoriesForOrder(order).forEach((categoryId) => {
    state.generatorLineOrderCounts[categoryId] = (state.generatorLineOrderCounts[categoryId] ?? 0) + 1;
  });
}
function normalizeClaimedOrderProgressPacks(value) {
  if (!Array.isArray(value)) return [];
  const validIds = new Set((state.progressionConfig?.orderProgressPacks ?? []).map((entry) => entry.id));
  return [...new Set(value.filter((id) => validIds.has(id)))];
}

function normalizeRewardItems(value) {
  if (!Array.isArray(value)) return [];
  const quantities = new Map();
  value.forEach((entry) => {
    const itemId = migrateLegacyGeneratorId(entry?.itemId);
    const item = byId.get(itemId);
    const quantity = Math.floor(Number(entry?.quantity));
    if (!item || item.type === "gift_box" || item.type === "bonus_bubble" || quantity <= 0) return;
    quantities.set(itemId, (quantities.get(itemId) ?? 0) + quantity);
  });
  return [...quantities].map(([itemId, quantity]) => ({ itemId, quantity }));
}

function normalizeGiftPacks(value) {
  if (!Array.isArray(value)) return [];
  const quantities = new Map();
  value.forEach((entry) => {
    const quantity = Math.floor(Number(entry?.quantity));
    if (!GIFT_PACKS[entry?.id] || quantity <= 0) return;
    quantities.set(entry.id, (quantities.get(entry.id) ?? 0) + quantity);
  });
  return [...quantities].map(([id, quantity]) => ({ id, quantity }));
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
  return { id: item.id, name: item.name, src: itemAssetSrc(item), kind: item.type };
}

function canCompleteOrder(order) {
  return Boolean(order?.demand?.length)
    && order.demand.every((demand) => countItem(demand.itemId) >= demand.quantity);
}

function renderOrders() {
  els.orders.innerHTML = "";
  const orderedOrderIds = state.visibleOrders
    .map((orderId, index) => ({ orderId, index, ready: canCompleteOrder(getOrder(orderId)) }))
    .sort((left, right) => Number(right.ready) - Number(left.ready) || left.index - right.index)
    .map((entry) => entry.orderId);
  orderedOrderIds.forEach((orderId) => {
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
    const canComplete = canCompleteOrder(order);
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
      const trigger = document.createElement("button");
      trigger.type = "button";
      trigger.className = "order-food-trigger";
      trigger.setAttribute("aria-label", `查看${item.name}合成路线，需要${demand.quantity}份`);
      trigger.title = `${item.name} · 查看合成路线`;
      const f = document.createElement("img");
      f.src = itemAssetSrc(item);
      f.alt = item.name;
      trigger.append(f);
      if (demand.quantity > 1) {
        const needed = document.createElement("span");
        needed.className = "order-food-needed";
        needed.textContent = `×${demand.quantity}`;
        needed.setAttribute("aria-hidden", "true");
        trigger.append(needed);
      }
      trigger.addEventListener("click", (event) => {
        event.stopPropagation();
        openOrderFoodDetail(order.id, item.id);
      });
      trigger.addEventListener("keydown", (event) => event.stopPropagation());
      foods.append(trigger);
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
      if (event.target !== card || (event.key !== "Enter" && event.key !== " ")) return;
      event.preventDefault();
      openOrderDetail(order.id);
    });
    els.orders.append(card);
  });
}

function readyOrderBoardHighlightIndices() {
  const requiredByItem = new Map();
  state.visibleOrders.forEach((orderId) => {
    const order = getOrder(orderId);
    if (!order?.demand?.length) return;
    if (!canCompleteOrder(order)) return;
    order.demand.forEach((demand) => {
      const quantity = Math.max(0, Math.floor(Number(demand.quantity) || 0));
      requiredByItem.set(demand.itemId, Math.max(requiredByItem.get(demand.itemId) ?? 0, quantity));
    });
  });

  const remainingByItem = new Map(requiredByItem);
  const highlighted = new Set();
  state.board.forEach((itemId, index) => {
    const remaining = remainingByItem.get(itemId) ?? 0;
    if (remaining <= 0) return;
    highlighted.add(index);
    remainingByItem.set(itemId, remaining - 1);
  });
  return highlighted;
}

function renderBoard() {
  els.board.innerHTML = "";
  const readyOrderHighlights = readyOrderBoardHighlightIndices();
  state.board.forEach((itemId, index) => {
    const cell = document.createElement("div");
    const locked = isBoardCellLocked(index);
    cell.className = `cell ${locked ? "locked" : ""} ${readyOrderHighlights.has(index) ? "order-ready-item" : ""} ${state.selectedIndex === index ? "selected" : ""} ${state.pulseIndex === index ? "merge-pop" : ""} ${state.unlockPulseIndex === index ? "unlock-pop" : ""} ${activeGeneratorOutputIndices.has(index) ? "receiving-item" : ""} ${isTutorialBoardFocus(itemId) ? "tutorial-focus" : ""}`;
    cell.dataset.index = index;
    cell.setAttribute("role", "button");
    cell.tabIndex = locked ? -1 : 0;
    if (locked) {
      cell.removeAttribute("aria-disabled");
      const lockedItem = byId.get(lockedCellItemId(index));
      const visual = lockedCellVisual(index);
      cell.setAttribute("aria-label", visual ? visual.name : lockedItem ? lockedItem.name : "待解锁格");
      if (visual) {
        const isGeneratorMaterial = visual.kind === "generator_material";
        const img = document.createElement("img");
        img.className = `item locked-preview ${isGeneratorMaterial ? "generator-material locked-material-preview" : ""}`;
        img.alt = visual.name;
        img.src = visual.src;
        if (isGeneratorMaterial) {
          const scale = GENERATOR_MATERIAL_SCALE_PERCENT[visual.id] ?? 220;
          img.style.setProperty("--generator-material-scale", `${scale}%`);
        }
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
        const seconds = Math.max(0, Math.ceil((generatorState.cooldownEnd - Date.now()) / 1000));
        if (seconds > 0) {
          badge.classList.add("cooldown-clock");
          if (item.type === "auto_generator") badge.classList.add("automatic");
          badge.setAttribute("aria-label", `${formatGeneratorCountdown(seconds)}后完成备料`);
          badge.title = `${formatGeneratorCountdown(seconds)}后完成备料`;
          badge.append(Object.assign(document.createElement("span"), { className: "generator-clock-face" }));
        } else if (item.type === "manual_generator") {
          badge.textContent = `${generatorState.charges}/${item.generator.chargeMax}`;
        } else if (generatorState.remainingOutputs > 0) {
          badge.textContent = `${generatorState.remainingOutputs}`;
          badge.setAttribute("aria-label", `本轮还可投放${generatorState.remainingOutputs}份`);
          badge.title = `本轮还可投放${generatorState.remainingOutputs}份`;
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
      ? pack.orderProgress || pack.chapterCompletion
        ? `点击一次打开，${giftRewardOutputCount(pack)}份奖励会随机落入空格。`
        : `点击礼盒包，每次掉落1份奖励。还剩${pack.rewards.length - giftState.nextRewardIndex}份。`
      : item.modernName;
    els.sellBtn.disabled = true;
    return;
  }
  if (isGeneratorPiece(item)) {
    const generatorState = getGeneratorState(item.id, boardGeneratorStateKey(state.selectedIndex));
    const cooldownSeconds = Math.max(0, Math.ceil((generatorState.cooldownEnd - Date.now()) / 1000));
    const batchSize = item.generator.outputCount;
    const productionStatus = item.type === "manual_generator"
      ? cooldownSeconds > 0
        ? "休息中，还剩" + formatGeneratorCountdown(cooldownSeconds)
        : "充能 " + generatorState.charges + "/" + item.generator.chargeMax
      : cooldownSeconds > 0
        ? formatGeneratorCountdown(cooldownSeconds) + `后备好${batchSize}份奶食`
        : neighborEmptyIndices(state.selectedIndex).length > 0
          ? `本轮剩余${generatorState.remainingOutputs}/${batchSize}份，奶食即将投放`
          : `本轮剩余${generatorState.remainingOutputs}/${batchSize}份，周边无空格`;
    els.selectedName.textContent = /Lv\d+$/.test(item.name) ? item.name : item.name + " · Lv" + (item.level ?? 1);
    els.selectedText.textContent = productionStatus + " · " + generatorUpgradeSummary(item);
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
  const cleanup = state.economyConfig?.boardCleanup ?? {};
  if (isGeneratorPiece(item) && cleanup.protectGenerators) {
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
  const values = isGeneratorPiece(item)
    ? cleanup.generatorSellValuesByQuarter
    : isGeneratorMaterialPiece(item)
      ? cleanup.generatorMaterialSellValuesByQuarter
      : cleanup.foodSellValuesByQuarter;
  const value = Math.max(0, Math.min(3, Number(values?.[quarter - 1]) || 0));
  return {
    mode: value === 0 ? "delete" : "sell",
    value,
    requiresConfirm: maxLevel === SELL_CHAIN_LEVELS.food
      && level >= (Number(cleanup.protectHighLevelFoodFromLevel) || 5),
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
    const productionText = cooldownSeconds > 0
      ? "正在休息，" + formatGeneratorCountdown(cooldownSeconds) + "后恢复" + item.generator.chargeMax + "次充能。"
      : "点击产出食材，消耗" + item.generator.staminaCost + "点驼铃。当前充能 " + generatorState.charges + "/" + item.generator.chargeMax + "。";
    els.pieceDetailText.textContent = productionText + generatorUpgradeDetail(item);
  } else if (item.type === "auto_generator") {
    const generatorState = getGeneratorState(item.id, boardGeneratorStateKey(state.selectedIndex));
    const cooldownSeconds = Math.max(0, Math.ceil((generatorState.cooldownEnd - Date.now()) / 1000));
    const batchSize = item.generator.outputCount;
    const secondaryOutput = item.generator.pool.find((entry) => entry.itemId !== item.generator.pool[0]?.itemId);
    const outputChanceText = secondaryOutput
      ? `每份有${secondaryOutput.weight}%概率直接产出${byId.get(secondaryOutput.itemId)?.name ?? "较高级奶食"}。`
      : "每份都会产出鲜乳。";
    const productionText = cooldownSeconds > 0
      ? `奶房正在备料，${formatGeneratorCountdown(cooldownSeconds)}后恢复${batchSize}份库存。`
      : neighborEmptyIndices(state.selectedIndex).length > 0
        ? `本轮还剩${generatorState.remainingOutputs}/${batchSize}份，将自动投放到周边空格。`
        : `本轮还剩${generatorState.remainingOutputs}/${batchSize}份；周围没有空格，腾出后会继续投放。`;
    els.pieceDetailText.textContent = productionText + outputChanceText + generatorUpgradeDetail(item);
  } else {
    els.pieceDetailText.textContent = codex?.shortText ?? item.modernName ?? "这枚棋子还没有配置详情。";
  }
  els.pieceDetailModal.showModal();
}

function renderBagButton() {
  const rewardCount = totalRewardBagCount();
  const tabLabel = els.bagBtn?.querySelector("span");
  if (tabLabel) tabLabel.textContent = rewardCount > 0 ? `行囊 ${rewardCount}` : "行囊";
  if (els.rewardBagBtn) {
    els.rewardBagBtn.classList.toggle("has-rewards", rewardCount > 0);
    els.rewardBagBtn.setAttribute("aria-label", rewardCount > 0 ? `打开奖励行囊，共${rewardCount}件` : "打开奖励行囊");
  }
  if (els.rewardBagBadge) {
    els.rewardBagBadge.hidden = rewardCount === 0;
    els.rewardBagBadge.textContent = rewardCount > 99 ? "99+" : String(rewardCount);
  }
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
    keeper("第一张食谱已经记下。点「食鉴」看看收录。");
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

function generatorUpgradeStatus(item) {
  if (!isGeneratorPiece(item) || !item.mergeTo) {
    return { ok: false, maxLevel: Boolean(isGeneratorPiece(item)), targetLevel: item?.level ?? 1 };
  }
  const targetLevel = (Number(item.level) || 1) + 1;
  const requirement = state.generatorConfig.duplicateRewardMilestones?.find((entry) => entry.targetLevel === targetLevel) ?? {};
  const category = state.generatorConfig.categories.find((entry) => entry.id === item.generatorType);
  const lineOrders = state.generatorLineOrderCounts[item.generatorType] ?? 0;
  const requiredLineOrders = Math.max(0, Number(requirement.lineOrders) || 0);
  const masteryComplete = !requirement.requiresMasteryOrder
    || Boolean(item.masteryOrderId && state.completedOrderIds.includes(item.masteryOrderId));
  const rewardId = generatorProgressRewardId(item.generatorType, targetLevel);
  return {
    ok: true,
    maxLevel: false,
    targetLevel,
    lineOrders,
    requiredLineOrders,
    rewardLevel: Number(requirement.rewardGeneratorLevel) || Math.max(1, targetLevel - 1),
    rewardClaimed: state.claimedGeneratorProgressRewards.includes(rewardId),
    masteryComplete,
    requiresMasteryOrder: Boolean(requirement.requiresMasteryOrder),
    categoryName: category?.displayName ?? "该生产线",
  };
}

function generatorUpgradeSummary(item) {
  const status = generatorUpgradeStatus(item);
  if (status.maxLevel) return "已达最高等级";
  const sameLevelCount = state.board.filter((itemId) => itemId === item.id).length;
  if (sameLevelCount >= 2) return `可合成Lv${status.targetLevel} · 同级2/2`;
  if (status.rewardClaimed) return `升Lv${status.targetLevel} · 案板同级${sameLevelCount}/2`;
  const progress = `同系订单${Math.min(status.lineOrders, status.requiredLineOrders)}/${status.requiredLineOrders}`;
  if (status.requiresMasteryOrder && !status.masteryComplete) return `升Lv${status.targetLevel} · ${progress} · 大师订单`;
  return `升Lv${status.targetLevel} · ${progress}`;
}

function generatorUpgradeDetail(item) {
  const status = generatorUpgradeStatus(item);
  if (status.maxLevel) return "已经达到Lv6最高等级。";
  const sameLevelCount = state.board.filter((itemId) => itemId === item.id).length;
  const mergeRule = `两个同类Lv${item.level}生成器可直接合成Lv${status.targetLevel}，不受驿站等级限制。`;
  if (sameLevelCount >= 2) return `${mergeRule}当前案板已凑齐，拖到同级生成器上即可升级。`;
  if (status.rewardClaimed) return `${mergeRule}对应进度奖励已经领取，当前案板同级${sameLevelCount}/2。`;
  const condition = status.requiresMasteryOrder
    ? `同系订单达到${status.requiredLineOrders}单并完成大师订单`
    : `同系订单达到${status.requiredLineOrders}单`;
  return `${mergeRule}${condition}后，会发放一枚${status.categoryName} Lv${status.rewardLevel}。`;
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
    render();
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
  const generatedOutputs = [];
  for (let i = 0; i < outputs; i += 1) {
    const newItemId = pickFromWeightedPool(item.generator.pool);
    const outIndex = randomUnlockedEmptyIndex();
    if (outIndex === -1) break;
    state.board[outIndex] = newItemId;
    activeGeneratorOutputIndices.add(outIndex);
    generatedOutputs.push({ targetIndex: outIndex, itemId: newItemId });
    state.pulseIndex = outIndex;
  }
  state.generationCount += 1;
  state.selectedIndex = index;
  if (state.tutorialStep === 0) state.tutorialStep = 1;
  keeper(`${item.name}备好了一份路上能用的食材。`);
  clearPulseSoon();
  render();
  generatedOutputs.forEach(({ targetIndex, itemId: outputItemId }) => {
    animateGeneratorOutput(index, targetIndex, outputItemId);
  });
  saveState();
}

function animateGeneratorOutput(sourceIndex, targetIndex, itemId) {
  const revealOutput = () => {
    activeGeneratorOutputIndices.delete(targetIndex);
    const currentCell = els.board.querySelector(`.cell[data-index="${targetIndex}"]`);
    currentCell?.classList.remove("receiving-item");
    currentCell?.classList.add("generator-land");
    setTimeout(() => currentCell?.classList.remove("generator-land"), 460);
  };
  const sourceCell = els.board.querySelector(`.cell[data-index="${sourceIndex}"]`);
  const targetCell = els.board.querySelector(`.cell[data-index="${targetIndex}"]`);
  const sourceItem = sourceCell?.querySelector(".item.generator");
  const outputItem = targetCell?.querySelector(".item");
  if (!sourceItem || !targetCell || !outputItem || matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealOutput();
    return;
  }

  sourceItem.classList.remove("generator-producing");
  void sourceItem.offsetWidth;
  sourceItem.classList.add("generator-producing");
  const sourceRect = sourceItem.getBoundingClientRect();
  const targetRect = targetCell.getBoundingClientRect();
  const startX = sourceRect.left + sourceRect.width / 2;
  const startY = sourceRect.top + sourceRect.height / 2;
  const endX = targetRect.left + targetRect.width / 2;
  const endY = targetRect.top + targetRect.height / 2;
  const dx = endX - startX;
  const dy = endY - startY;
  const flight = document.createElement("img");
  flight.className = "generator-output-flight";
  flight.src = itemAssetSrc(byId.get(itemId));
  flight.alt = "";
  flight.style.left = `${startX}px`;
  flight.style.top = `${startY}px`;
  flight.style.width = `${targetRect.width * 0.9}px`;
  flight.style.height = `${targetRect.height * 0.9}px`;
  document.body.append(flight);

  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    flight.remove();
    sourceItem.classList.remove("generator-producing");
    revealOutput();
  };
  const animation = flight.animate(
    [
      { opacity: 0.15, transform: "translate(-50%, -50%) scale(0.38)" },
      { opacity: 1, offset: 0.22, transform: `translate(${dx * 0.16}px, ${dy * 0.16 - 13}px) translate(-50%, -50%) scale(0.68)` },
      { opacity: 1, offset: 0.68, transform: `translate(${dx * 0.7}px, ${dy * 0.7 - 18}px) translate(-50%, -50%) scale(0.92)` },
      { opacity: 1, transform: `translate(${dx}px, ${dy}px) translate(-50%, -50%) scale(1)` },
    ],
    { duration: 520, easing: "cubic-bezier(.22,.74,.2,1)", fill: "forwards" },
  );
  animation.addEventListener("finish", finish, { once: true });
  animation.addEventListener("cancel", finish, { once: true });
}

function getGeneratorState(itemId, stateKey) {
  const item = byId.get(itemId);
  if (!state.generatorStates[stateKey] || state.generatorStates[stateKey].itemId !== itemId) {
    state.generatorStates[stateKey] = {
      itemId,
      charges: item?.generator?.chargeMax ?? 0,
      remainingOutputs: item?.type === "auto_generator" ? item.generator.outputCount : 0,
      cooldownEnd: 0,
    };
  }
  const generatorState = state.generatorStates[stateKey];
  generatorState.charges = Math.min(item?.generator?.chargeMax ?? 0, Math.max(0, Number(generatorState.charges) || 0));
  if (item?.type === "manual_generator" && generatorState.cooldownEnd > 0 && generatorState.cooldownEnd <= Date.now()) {
    generatorState.charges = item.generator.chargeMax;
    generatorState.cooldownEnd = 0;
  }
  if (item?.type === "auto_generator") {
    const batchSize = Math.max(0, Math.floor(Number(item.generator.outputCount) || 0));
    if (!Number.isFinite(Number(generatorState.remainingOutputs))) {
      generatorState.remainingOutputs = generatorState.cooldownEnd > Date.now() ? 0 : batchSize;
    } else {
      generatorState.remainingOutputs = Math.min(batchSize, Math.max(0, Math.floor(Number(generatorState.remainingOutputs))));
    }
    if (generatorState.cooldownEnd > 0 && generatorState.cooldownEnd <= Date.now()) {
      generatorState.remainingOutputs = batchSize;
      generatorState.cooldownEnd = 0;
    }
  }
  return generatorState;
}

function formatGeneratorCountdown(totalSeconds) {
  const seconds = Math.max(0, Math.ceil(totalSeconds));
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;
  if (hours > 0) return `${hours}小时${minutes > 0 ? `${minutes}分钟` : ""}`;
  if (minutes > 0) return `${minutes}分钟${remainder > 0 ? `${remainder}秒` : ""}`;
  return `${remainder}秒`;
}

function tickGenerators() {
  let changed = false;
  let shouldSave = false;
  const generatedOutputs = [];
  Object.keys(state.generatorStates).forEach((stateKey) => {
    const entry = state.generatorStates[stateKey];
    const before = entry.cooldownEnd;
    getGeneratorState(entry.itemId, stateKey);
    if (before > Date.now() || (before && !state.generatorStates[stateKey].cooldownEnd)) changed = true;
    if (before && !state.generatorStates[stateKey].cooldownEnd) shouldSave = true;
  });
  state.board.forEach((itemId, index) => {
    const item = byId.get(itemId);
    if (item?.type !== "auto_generator") return;
    const generatorState = getGeneratorState(item.id, boardGeneratorStateKey(index));
    const now = Date.now();
    if (generatorState.cooldownEnd && generatorState.cooldownEnd > now) return;
    if (generatorState.remainingOutputs <= 0) {
      generatorState.cooldownEnd = now + item.generator.cooldownSeconds * 1000;
      changed = true;
      shouldSave = true;
      return;
    }
    const targets = neighborEmptyIndices(index);
    if (!targets.length) return;
    const outputs = Math.min(generatorState.remainingOutputs, targets.length);
    for (let i = 0; i < outputs; i += 1) {
      const target = targets.splice(Math.floor(Math.random() * targets.length), 1)[0];
      const outputItemId = pickFromWeightedPool(item.generator.pool);
      state.board[target] = outputItemId;
      activeGeneratorOutputIndices.add(target);
      generatedOutputs.push({ sourceIndex: index, targetIndex: target, itemId: outputItemId });
      state.pulseIndex = target;
    }
    generatorState.remainingOutputs -= outputs;
    if (generatorState.remainingOutputs <= 0) {
      generatorState.remainingOutputs = 0;
      generatorState.cooldownEnd = now + item.generator.cooldownSeconds * 1000;
    }
    changed = true;
    shouldSave = true;
  });
  if (changed) {
    render();
    generatedOutputs.forEach(({ sourceIndex, targetIndex, itemId }) => {
      animateGeneratorOutput(sourceIndex, targetIndex, itemId);
    });
  }
  if (shouldSave) saveState();
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
  const entry = codexById.get(codexId);
  if (!entry) return;
  const item = byId.get(entry.itemId);
  if (!item) return;
  state.unlockedCodex.add(codexId);
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
  recordGeneratorOrderProgress(order);
  showCoinBurst(coinReward);
  if (firstClear) {
    state.completedOrderIds.push(order.id);
  }
  syncGeneratorProgressRewards({ announce: true });
  if (state.tutorialStep === 2 && order.id === "order_001_guard_lubing") {
    state.tutorialStep = 3;
  }
  keeper(order.dialogue);
  state.visibleOrders = state.visibleOrders.filter((visibleOrderId) => visibleOrderId !== orderId);
  syncVisibleOrders();
  if (state.currentOrderDetailId === orderId && els.orderDetailModal.open) {
    els.orderDetailModal.close();
    state.currentOrderDetailId = null;
  }
  render();
  saveState();
}

function effectiveBoardItemCount(itemId) {
  return state.board.reduce(
    (total, boardItemId, index) => total + (boardItemId === itemId && !isBoardCellLocked(index) ? 1 : 0),
    0,
  );
}

function foodItemsForLine(line) {
  return state.items
    .filter((item) => item.line === line && !item.generatorType && Number.isFinite(Number(item.level)))
    .sort((left, right) => Number(left.level) - Number(right.level));
}

function highestUnlockedFoodLevel(item, lineItems) {
  const targetLevel = Math.max(1, Number(item?.level) || 1);
  const highestLineLevel = lineItems.reduce(
    (highest, lineItem) => Math.max(highest, Number(lineItem.level) || 1),
    targetLevel,
  );
  const category = state.generatorConfig.categories.find((entry) => entry.foodLineId === item?.line);
  const generatorLevel = category ? highestOwnedGeneratorLevel(category.id) : 0;
  const availability = state.economyConfig?.orderPricing?.availability?.maxDemandLevelByGeneratorLevel ?? {};
  const progressionLevel = Number(availability[generatorLevel]) || targetLevel;
  const historicalLevel = Number(state.unlockedFoodLevels[item?.line]) || 0;
  const currentlyOwnedLevel = [...state.board, ...state.bag]
    .map((itemId) => byId.get(itemId))
    .filter((ownedItem) => ownedItem?.line === item?.line && !ownedItem.generatorType)
    .reduce((highest, ownedItem) => Math.max(highest, Number(ownedItem.level) || 1), targetLevel);
  return Math.min(highestLineLevel, Math.max(targetLevel, progressionLevel, historicalLevel, currentlyOwnedLevel));
}

function openOrderFoodDetail(orderId, itemId) {
  const order = getOrder(orderId);
  const item = byId.get(itemId);
  const demand = order?.demand?.find((entry) => entry.itemId === itemId);
  if (!order || !item || !demand) return;
  activeOrderFoodContext = {
    itemId,
  };
  renderOrderFoodDetail();
  els.orderFoodModal.showModal();
}

function renderOrderFoodDetail() {
  if (!activeOrderFoodContext) return;
  const { itemId } = activeOrderFoodContext;
  const item = byId.get(itemId);
  if (!item) return;
  const lineItems = foodItemsForLine(item.line);
  const highestUnlockedLevel = highestUnlockedFoodLevel(item, lineItems);
  els.orderFoodTitle.textContent = item.name;
  els.orderFoodRoute.setAttribute("role", "list");
  els.orderFoodRoute.setAttribute("aria-label", `${lineLabel(item.line)}合成路线`);
  els.orderFoodRoute.replaceChildren();

  lineItems.forEach((lineItem) => {
    const isUnlocked = Number(lineItem.level) <= highestUnlockedLevel;
    const owned = isUnlocked ? effectiveBoardItemCount(lineItem.id) : 0;
    const isTarget = lineItem.id === item.id;
    const routeItem = document.createElement("div");
    routeItem.className = `order-food-route-item ${owned > 0 ? "has-stock" : ""} ${isTarget ? "is-target" : ""} ${isUnlocked ? "" : "is-locked"}`;
    routeItem.setAttribute("role", "listitem");
    routeItem.setAttribute("aria-label", isUnlocked
      ? `${lineItem.name}，棋盘可用${owned}${isTarget ? "，食客所需" : ""}`
      : "未解锁的后续食物");
    if (isTarget) routeItem.setAttribute("aria-current", "true");

    const art = document.createElement("div");
    art.className = "order-food-art";
    if (!isUnlocked) {
      const lid = document.createElement("img");
      lid.className = "order-food-box-lid";
      lid.src = "./assets/ui/ui_food_box_lid_locked_v2.png";
      lid.alt = "";
      art.append(lid);
      routeItem.append(art);
      els.orderFoodRoute.append(routeItem);
      return;
    }

    const image = document.createElement("img");
    image.src = itemAssetSrc(lineItem);
    image.alt = "";
    art.append(image);
    if (owned > 0) {
      const count = document.createElement("span");
      count.className = "order-food-count";
      count.textContent = String(owned);
      count.setAttribute("aria-hidden", "true");
      art.append(count);
    }

    const name = document.createElement("strong");
    name.textContent = lineItem.name;
    routeItem.append(art, name);
    els.orderFoodRoute.append(routeItem);
  });
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
  const codexUnlocked = isFoodItemUnlocked(firstItem);

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
  els.orderDetailCodexBtn.textContent = codexUnlocked ? "查看食鉴" : "食鉴未收录";
}

function openCodexFromOrderDetail() {
  const order = getOrder(state.currentOrderDetailId);
  if (!order) return;
  const item = byId.get(order.demand[0].itemId);
  if (!isFoodItemUnlocked(item)) return;
  els.orderDetailModal.close();
  openCodex(item.id);
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
  if (state.activeRepairId !== milestone.id && state.coins < repairCost(milestone)) return;
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

function orderUnlockConditionMet(unlock) {
  if (!unlock || unlock === "tutorial_start" || unlock === "available_when_producible") return true;
  if (/^(after_order_|completed_orders_|codex_)/.test(unlock)) return true;
  const masteryMatch = unlock.match(/^generator_mastery_(.+)$/);
  if (masteryMatch) {
    const categoryId = masteryMatch[1];
    const requirement = state.generatorConfig.duplicateRewardMilestones?.find((entry) => entry.requiresMasteryOrder);
    return state.unlockedGeneratorCategories.includes(categoryId)
      && (state.generatorLineOrderCounts[categoryId] ?? 0) >= (Number(requirement?.lineOrders) || 48);
  }
  if (unlock.startsWith("generator_")) return state.unlockedGeneratorCategories.includes(unlock.slice("generator_".length));
  if (unlock === "final_lv1_order") {
    return state.innLevel >= 2 && state.unlockedCodex.has("codex_hubing_08");
  }
  return false;
}

function highestOwnedGeneratorLevel(categoryId) {
  return [...state.board, ...state.bag, ...state.pendingGeneratorRewards]
    .map((itemId) => byId.get(migrateLegacyGeneratorId(itemId)))
    .filter((item) => isGeneratorPiece(item) && item.generatorType === categoryId)
    .reduce((highest, item) => Math.max(highest, Number(item.level) || 1), 0);
}

function orderDemandLinesUnlocked(order) {
  const availability = state.economyConfig?.orderPricing?.availability ?? {};
  const maxDemandByGeneratorLevel = availability.maxDemandLevelByGeneratorLevel ?? {};
  return order.demand.every((demand) => {
    const item = byId.get(demand.itemId);
    const category = state.generatorConfig.categories.find((entry) => entry.foodLineId === item?.line);
    if (!item || !category || !state.unlockedGeneratorCategories.includes(category.id)) return false;
    const generatorLevel = highestOwnedGeneratorLevel(category.id);
    if (availability.requireOwnedGeneratorLine && generatorLevel < 1) return false;
    const maxDemandLevel = Number(maxDemandByGeneratorLevel[generatorLevel]) || 8;
    return (Number(item.level) || 1) <= maxDemandLevel;
  });
}

function orderProgressConditionsMet(order) {
  if (!orderUnlockConditionMet(order.unlock)) return false;
  if (Array.isArray(order.requiredGeneratorCategories)
    && !order.requiredGeneratorCategories.every((categoryId) => state.unlockedGeneratorCategories.includes(categoryId))) {
    return false;
  }
  return true;
}

function isOrderEligible(order, {
  ignoreVisible = false,
  ignoreWeight = false,
} = {}) {
  if (!order) return false;
  if (order.oneTime && state.completedOrderIds.includes(order.id)) return false;
  if (!ignoreVisible && state.visibleOrders.includes(order.id)) return false;
  if (!ignoreWeight && order.weight <= 0) return false;
  return orderDemandLinesUnlocked(order) && orderProgressConditionsMet(order);
}

function orderItemCoinValue(itemId) {
  const item = byId.get(itemId);
  const values = state.economyConfig?.orderPricing?.levelValuesByLine?.[item?.line];
  const level = Number(item?.level) || 0;
  return Array.isArray(values) && level > 0 ? Math.max(0, Number(values[level - 1]) || 0) : 0;
}

function calculatedOrderCoinReward(order) {
  return (order?.demand ?? []).reduce(
    (sum, demand) => sum + orderItemCoinValue(demand.itemId) * Math.max(0, Number(demand.quantity) || 0),
    0,
  );
}

function orderPricingBand(order) {
  const reward = calculatedOrderCoinReward(order);
  const bands = state.economyConfig?.orderPricing?.bands ?? [];
  return bands.find((band) => reward >= band.minCoins && reward <= band.maxCoins)
    ?? bands.reduce((closest, band) => {
      const distance = reward < band.minCoins ? band.minCoins - reward : reward - band.maxCoins;
      return !closest || distance < closest.distance ? { ...band, distance } : closest;
    }, null);
}

function orderMatchesBand(order, bandId) {
  return !bandId || orderPricingBand(order)?.id === bandId;
}

function rollVisibleOrderTarget() {
  const policy = state.ordersConfig.arrivalPolicy ?? {};
  const minimum = Math.max(1, Math.floor(Number(policy.minVisibleOrders) || 2));
  const maximum = Math.max(minimum, Math.floor(Number(state.ordersConfig.maxVisibleOrders) || 7));
  const weightedCounts = Object.entries(policy.visibleCountWeights ?? {})
    .map(([count, weight]) => ({
      count: Math.floor(Number(count)),
      weight: Math.max(0, Number(weight) || 0),
    }))
    .filter((entry) => entry.count >= minimum && entry.count <= maximum && entry.weight > 0);
  if (!weightedCounts.length) {
    const typical = Math.floor(Number(policy.typicalVisibleOrders) || 4);
    return Math.min(maximum, Math.max(minimum, typical));
  }
  const totalWeight = weightedCounts.reduce((sum, entry) => sum + entry.weight, 0);
  let roll = Math.random() * totalWeight;
  for (const entry of weightedCounts) {
    roll -= entry.weight;
    if (roll <= 0) return entry.count;
  }
  return weightedCounts[weightedCounts.length - 1].count;
}

function missingVisibleOrderBandId(bands) {
  return bands.find((band) => !state.visibleOrders.some((orderId) => (
    orderPricingBand(getOrder(orderId))?.id === band.id
  )))?.id ?? null;
}

function syncVisibleOrders() {
  if (LV4_MARKET_ORDERS_QA_MODE) {
    state.visibleOrders = LV4_MARKET_ORDER_IDS.filter((orderId) => !state.completedOrderIds.includes(orderId));
    return;
  }
  if (GENERATOR_ORDER_QA_MODE) {
    state.visibleOrders = GENERATOR_ORDER_QA_VISIBLE_BY_STAGE[GENERATOR_ORDER_QA_STAGE]
      .filter((orderId) => isOrderEligible(getOrder(orderId), {
        ignoreVisible: true,
        ignoreWeight: true,
      }));
    return;
  }
  const maxVisible = Math.max(2, Math.floor(Number(state.ordersConfig.maxVisibleOrders) || 7));
  const targetVisible = Math.min(maxVisible, rollVisibleOrderTarget());
  const bands = state.economyConfig?.orderPricing?.bands ?? [];
  const preserveWaitingGuests = state.ordersConfig.arrivalPolicy?.preserveWaitingGuests !== false;
  const previous = preserveWaitingGuests ? [...state.visibleOrders] : [];
  state.visibleOrders = [];
  for (const orderId of previous) {
    if (state.visibleOrders.length >= maxVisible) break;
    const existing = getOrder(orderId);
    if (existing
      && !state.visibleOrders.includes(existing.id)
      && isOrderEligible(existing, { ignoreVisible: true })) {
      state.visibleOrders.push(existing.id);
    }
  }
  while (state.visibleOrders.length < targetVisible) {
    const bandId = missingVisibleOrderBandId(bands);
    const next = pickOrder(bandId) ?? pickOrder();
    if (!next) break;
    state.visibleOrders.push(next.id);
  }
}

function syncDemoOrder() {
  syncVisibleOrders();
}

function getOrder(orderId) {
  return state.ordersConfig.orders.find((entry) => entry.id === orderId);
}

function currentOrderCoinReward(order) {
  return calculatedOrderCoinReward(order);
}

function pickOrder(bandId = null) {
  const allCandidates = state.ordersConfig.orders.filter((order) => isOrderEligible(order));
  const bandCandidates = allCandidates.filter((order) => orderMatchesBand(order, bandId));
  const candidates = bandCandidates.length ? bandCandidates : bandId ? [] : allCandidates;
  if (!candidates.length) return null;
  const band = (state.economyConfig?.orderPricing?.bands ?? []).find((entry) => entry.id === bandId);
  const unservedMastery = candidates.filter(
    (order) => order.generatorMasteryCategory && !state.completedOrderIds.includes(order.id),
  );
  const unservedGuides = candidates.filter(
    (order) => order.orderTier === "guide" && !state.completedOrderIds.includes(order.id),
  );
  const preferred = candidates.filter((order) => band?.preferredOrderTypes?.includes(order.orderType));
  let weightedCandidates = bandId === "goal" && unservedMastery.length
    ? unservedMastery
    : bandId === "quick" && unservedGuides.length
      ? unservedGuides
      : preferred.length
        ? preferred
        : candidates;
  const visibleNpcIds = new Set(
    state.visibleOrders.map((orderId) => getOrder(orderId)?.npcId).filter(Boolean),
  );
  const freshNpcCandidates = weightedCandidates.filter((order) => !visibleNpcIds.has(order.npcId));
  if (freshNpcCandidates.length) weightedCandidates = freshNpcCandidates;

  const visibleDemandLines = new Set(
    state.visibleOrders.flatMap((orderId) => (
      getOrder(orderId)?.demand.map((demand) => byId.get(demand.itemId)?.line).filter(Boolean) ?? []
    )),
  );
  const freshLineCandidates = weightedCandidates.filter((order) => order.demand.some(
    (demand) => !visibleDemandLines.has(byId.get(demand.itemId)?.line),
  ));
  if (freshLineCandidates.length) weightedCandidates = freshLineCandidates;
  const total = weightedCandidates.reduce((sum, order) => sum + order.weight, 0);
  let roll = Math.random() * total;
  for (const order of weightedCandidates) {
    roll -= order.weight;
    if (roll <= 0) return order;
  }
  return weightedCandidates[0];
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

function repairAvatarSrc(npcId) {
  if (!npcId || npcId === "keeper_portrait") return "./assets/keeper_portrait.png";
  return `./assets/npc_repair_portrait/${npcId}_v1.png`;
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
  syncVisibleOrders();
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
    checks.push(progressCheck("解锁食鉴", state.unlockedCodex.size, conditions.codexUnlocked));
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
  if (name === "解锁食鉴") return `再收录${left}道食物`;
  return `${name}还差${left}`;
}

function rewardText(milestone) {
  const rewards = milestone.rewards ?? {};
  const labels = [];
  if (rewards.coins) labels.push(`价值${rewards.coins}铜币的铜币棋子收入行囊`);
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
    grantCoinRewardToBag(rewards.coins);
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

function isChapterRepairComplete(chapter) {
  const milestones = state.progressionConfig.milestones.filter(
    (milestone) => (milestone.chapter ?? 1) === chapter,
  );
  return milestones.length > 0 && milestones.every((milestone) => state.renovationChoices[milestone.id]);
}

function applyChapterCompletionReward(chapter) {
  const reward = chapterCompletionReward(chapter);
  if (!reward || state.claimedChapterRewards.includes(chapter)) return;
  state.claimedChapterRewards.push(chapter);
  state.stamina += Number(reward.stamina) || 0;
  state.gems += Number(reward.rubies) || 0;
  if (reward.giftPack?.id) grantGiftPack(reward.giftPack.id, 1);
}

function grantGiftPack(packId, quantity = 1) {
  const pack = GIFT_PACKS[packId];
  const amount = Math.floor(Number(quantity));
  if (!pack || amount <= 0) return;
  const existing = state.giftPacks.find((entry) => entry.id === packId);
  if (existing) {
    existing.quantity += amount;
  } else {
    state.giftPacks.push({ id: packId, quantity: amount });
  }
  toast(`${pack.name}已收入行囊。`);
}

function grantRewardItem(itemId, quantity = 1) {
  const item = byId.get(itemId);
  const amount = Math.floor(Number(quantity));
  if (!item || item.type === "gift_box" || item.type === "bonus_bubble" || amount <= 0) return false;
  const existing = state.rewardItems.find((entry) => entry.itemId === itemId);
  if (existing) {
    existing.quantity += amount;
  } else {
    state.rewardItems.push({ itemId, quantity: amount });
  }
  return true;
}

function grantCoinRewardToBag(amount) {
  const coinItems = coinRewardPieceIds(amount);
  coinItems.forEach((itemId) => grantRewardItem(itemId));
  if (coinItems.length) toast(`铜币棋子 ×${coinItems.length} 已收入行囊。`);
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

function openRubyRecharge() {
  if (els.rubyRechargeBalance) els.rubyRechargeBalance.textContent = state.gems ?? 0;
  els.rubyRechargeModal?.showModal();
}

function explainStorageInvite() {
  const requiredNewPlayers = Number(
    state.economyConfig?.premiumCurrency?.storage?.inviteUnlock?.requiredNewPlayers,
  ) || 5;
  toast(`每邀请${requiredNewPlayers}位新掌柜，可免费开启1个仓位。`);
}

function openStaminaPurchase() {
  if (syncDailyStaminaPurchases()) saveState();
  renderStaminaPurchase();
  els.staminaPurchaseModal?.showModal();
}

function renderStaminaPurchase() {
  if (!els.staminaPurchaseModal) return;
  const amount = Math.max(1, Number(staminaPurchaseConfig().staminaAmount) || 100);
  const price = currentStaminaPurchasePrice();
  if (els.staminaPurchaseAmount) els.staminaPurchaseAmount.textContent = amount;
  if (els.staminaPurchaseCount) els.staminaPurchaseCount.textContent = `今日第${state.staminaPurchasesToday + 1}次兑换`;
  if (els.staminaPurchasePrice) els.staminaPurchasePrice.textContent = price;
  if (els.staminaPurchaseRule) {
    const multiplier = Math.max(1, Number(staminaPurchaseConfig().priceMultiplier) || 2);
    const nextPrice = Math.round(price * multiplier);
    els.staminaPurchaseRule.textContent = `本次${price}颗，下一次${nextPrice}颗；每日重置`;
  }
  els.staminaPurchaseConfirm?.setAttribute("aria-label", `花费${price}颗红宝石购买${amount}点驼铃`);
}

function purchaseStamina() {
  syncDailyStaminaPurchases();
  const amount = Math.max(1, Number(staminaPurchaseConfig().staminaAmount) || 100);
  const price = currentStaminaPurchasePrice();
  if (state.gems < price) {
    toast(`红宝石不足，还差${price - state.gems}颗。`);
    renderStaminaPurchase();
    return;
  }
  state.gems -= price;
  state.stamina += amount;
  state.staminaPurchasesToday += 1;
  keeper(`用${price}颗红宝石换得${amount}点驼铃。`);
  toast(`驼铃 +${amount}`);
  render();
  saveState();
}

function purchaseNextStorageSlot() {
  const price = nextStorageUnlockPrice();
  if (!price) {
    toast("后续仓位价格还未配置。");
    return;
  }
  if (state.gems < price) {
    toast(`红宝石不足，还差${price - state.gems}颗。`);
    return;
  }
  state.gems -= price;
  state.unlockedStorageSlots += 1;
  while (state.bag.length < state.unlockedStorageSlots) state.bag.push(null);
  keeper(`柜中第${state.unlockedStorageSlots}格已经开启。`);
  toast(`仓位 +1 · 红宝石 -${price}`);
  render();
  saveState();
}

function renderStorage() {
  if (!els.storageSlotList) return;
  els.storageSlotList.innerHTML = "";
  const nextPrice = nextStorageUnlockPrice();
  if (els.storageUnlockBtn && els.storageUnlockPrice) {
    els.storageUnlockBtn.disabled = !nextPrice;
    els.storageUnlockPrice.textContent = nextPrice ?? "—";
    els.storageUnlockBtn.setAttribute(
      "aria-label",
      nextPrice ? `花费${nextPrice}颗红宝石开启一个柜中仓位` : "仓位价格还未配置",
    );
  }
  const visibleSlotCount = state.unlockedStorageSlots + 1;
  for (let index = 0; index < visibleSlotCount; index += 1) {
    const isUnlocked = index < state.unlockedStorageSlots;
    const isNextUnlock = index === state.unlockedStorageSlots;
    const itemId = isUnlocked ? (state.bag[index] ?? null) : null;
    const item = itemId ? byId.get(itemId) : null;
    const slot = document.createElement(item || isNextUnlock ? "button" : "article");
    slot.className = `storage-slot ${!isUnlocked ? "locked" : item ? "filled" : "empty"}${isNextUnlock ? " unlockable" : ""}`;
    if (!isUnlocked && isNextUnlock) {
      slot.type = "button";
      slot.setAttribute("aria-label", `开启第${index + 1}个柜中仓位`);
      slot.innerHTML = `<span class="storage-add" aria-hidden="true">+</span>`;
      slot.addEventListener("click", purchaseNextStorageSlot);
    } else if (!isUnlocked) {
      slot.innerHTML = `<span class="storage-lock">锁</span>`;
    } else if (item) {
      slot.type = "button";
      slot.setAttribute("aria-label", `将${item.name}放回棋盘`);
      slot.title = `放回棋盘：${item.name}`;
      slot.innerHTML = `<img src="${itemAssetSrc(item)}" alt="${item.name}" />`;
      slot.addEventListener("click", () => retrieveFromStorage(index));
    } else {
      slot.innerHTML = `<span class="storage-empty-mark"></span>`;
    }
    els.storageSlotList.append(slot);
  }
}

function renderBag() {
  if (!els.bagList) return;
  els.bagList.innerHTML = "";
  const rewardEntries = state.rewardItems
    .map((entry) => ({ entry, item: byId.get(entry.itemId) }))
    .filter(({ entry, item }) => item && entry.quantity > 0);
  const giftEntries = state.giftPacks
    .map((entry) => ({ entry, pack: GIFT_PACKS[entry.id] }))
    .filter(({ entry, pack }) => pack && entry.quantity > 0);
  if (!rewardEntries.length && !giftEntries.length) {
    return;
  }

  const grid = document.createElement("div");
  grid.className = "bag-grid";

  rewardEntries.forEach(({ entry, item }) => {
    const slot = document.createElement("button");
    slot.type = "button";
    slot.className = `bag-slot reward-item-slot ${item.type === "bonus_coin" ? "coin-reward-slot" : ""} ${item.type === "bonus_ruby" ? "ruby-reward-slot" : ""} ${isGeneratorPiece(item) ? "generator-piece" : ""} ${item.type === "generator_material" ? "generator-material-piece" : ""}`;
    slot.setAttribute("aria-label", `将1个${item.name}随机投放到棋盘，行囊内共${entry.quantity}个`);
    slot.title = `随机投放：${item.name}`;
    slot.innerHTML = `
      <span class="bag-stack-count">×${entry.quantity}</span>
      <img src="${itemAssetSrc(item)}" alt="${item.name}" />
    `;
    slot.addEventListener("click", () => placeRewardItemFromBag(entry.itemId));
    grid.append(slot);
  });

  giftEntries.forEach(({ entry, pack }) => {
    const item = byId.get(pack.itemId);
    if (!item) return;
    const slot = document.createElement("button");
    slot.type = "button";
    slot.className = "bag-slot gift-pack-slot";
    slot.setAttribute("aria-label", `将1个${pack.name}随机投放到棋盘，行囊内共${entry.quantity}个`);
    slot.title = `随机投放：${pack.name}`;
    slot.innerHTML = `
      <span class="bag-stack-count">×${entry.quantity}</span>
      <img src="${itemAssetSrc(item)}" alt="${pack.name}" />
    `;
    slot.addEventListener("click", () => placeGiftPackOnBoard(entry.id));
    grid.append(slot);
  });
  els.bagList.append(grid);
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

function retrieveFromStorage(index) {
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

function placeRewardItemFromBag(itemId) {
  const rewardEntry = state.rewardItems.find((entry) => entry.itemId === itemId);
  const item = byId.get(itemId);
  if (!rewardEntry || rewardEntry.quantity <= 0 || !item) return;
  const boardIndex = randomUnlockedEmptyIndex();
  if (boardIndex === -1) {
    toast("案板已满，这份奖励仍留在行囊中。");
    return;
  }
  rewardEntry.quantity -= 1;
  state.rewardItems = state.rewardItems.filter((entry) => entry.quantity > 0);
  state.board[boardIndex] = itemId;
  state.selectedIndex = boardIndex;
  state.pulseIndex = boardIndex;
  keeper(`${item.name}已从行囊随机落到案板上。`);
  if (item.type === "generator_material") tryBuildGeneratorFromMaterials(itemId);
  clearPulseSoon();
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
  const opensAtOnce = pack.orderProgress || pack.chapterCompletion;
  keeper(`${pack.name}已随机落到案板上。${opensAtOnce ? "点击一次即可打开。" : "点击礼盒包，每次取一份奖励。"}`);
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
    if (reward.type === "stamina") return sum;
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
    if (reward.type === "stamina") return;
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

function applyInstantGiftResources(pack) {
  const staminaAmount = pack.rewards.reduce(
    (sum, reward) => sum + (reward.type === "stamina" ? Number(reward.amount) || 0 : 0),
    0,
  );
  if (staminaAmount > 0) state.stamina += staminaAmount;
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
  applyInstantGiftResources(pack);
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
  if (pack.orderProgress || pack.chapterCompletion) {
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

const CODEX_LINE_NAMES = Object.freeze({
  hubing: "胡饼",
  dairy: "乳食",
  meat: "肉食",
  spice: "香料",
  fruit: "果品",
  drink: "浆饮",
});

function codexLineName(line) {
  return CODEX_LINE_NAMES[line] ?? "食物";
}

function codexFoodLines() {
  const seen = new Set();
  return state.generatorConfig.categories.flatMap((category) => {
    const line = category.foodLineId;
    if (!line || seen.has(line)) return [];
    seen.add(line);
    const items = foodItemsForLine(line);
    return items.length ? [{ line, name: codexLineName(line), items }] : [];
  });
}

function unlockedFoodLevel(line) {
  return Math.min(maximumFoodLevelForLine(line), Math.max(0, Number(state.unlockedFoodLevels[line]) || 0));
}

function isFoodItemUnlocked(item) {
  return Boolean(
    item
      && !item.generatorType
      && foodLineMaxLevels.has(item.line)
      && Number(item.level) <= unlockedFoodLevel(item.line),
  );
}

function defaultCodexItem(lines) {
  const current = byId.get(activeCodexItemId);
  if (isFoodItemUnlocked(current)) return current;
  return lines.reduce((best, line) => {
    const highestKnown = [...line.items]
      .reverse()
      .find((item) => Number(item.level) <= unlockedFoodLevel(line.line));
    if (!highestKnown) return best;
    return !best || Number(highestKnown.level) > Number(best.level) ? highestKnown : best;
  }, null);
}

function codexKnownFoodCount(lines) {
  return lines.reduce(
    (total, line) => total + line.items.filter((item) => Number(item.level) <= unlockedFoodLevel(line.line)).length,
    0,
  );
}

function renderCodexSelected(item) {
  els.codexSelected.hidden = !item;
  if (!item) return;
  const entry = codexByItemId.get(item.id);
  els.codexSelectedIcon.src = itemAssetSrc(item);
  els.codexSelectedIcon.alt = "";
  els.codexSelectedName.textContent = `${item.name} · ${Number(item.level)}阶`;
  els.codexSelectedText.textContent = entry?.shortText ?? item.modernName ?? recipeHint(item);
  els.codexSelected.setAttribute("aria-label", `${item.name}，第${Number(item.level)}阶，打开札记`);
}

function renderCodex() {
  const lines = codexFoodLines();
  const selected = defaultCodexItem(lines);
  activeCodexItemId = selected?.id ?? null;
  els.codexKnownCount.textContent = String(codexKnownFoodCount(lines));
  renderCodexSelected(selected);
  els.codexList.replaceChildren();

  lines.forEach((line) => {
    const knownLevel = unlockedFoodLevel(line.line);
    const row = document.createElement("div");
    row.className = `codex-matrix-row ${knownLevel ? "" : "is-locked-line"}`;
    row.setAttribute("role", "row");

    const label = document.createElement("span");
    label.className = "codex-matrix-label";
    label.textContent = line.name;
    label.setAttribute("role", "rowheader");
    row.append(label);

    line.items.forEach((item) => {
      const unlocked = Number(item.level) <= knownLevel;
      const cell = document.createElement("button");
      cell.type = "button";
      cell.className = `codex-matrix-cell ${unlocked ? "is-unlocked" : "is-locked"}`;
      cell.setAttribute("role", "gridcell");
      cell.setAttribute("aria-label", unlocked
        ? `${item.name}，第${Number(item.level)}阶`
        : `${line.name}，第${Number(item.level)}阶，尚未识得`);
      cell.setAttribute("aria-pressed", String(unlocked && item.id === activeCodexItemId));
      cell.disabled = !unlocked;

      const image = document.createElement("img");
      image.src = unlocked ? itemAssetSrc(item) : "./assets/ui/ui_food_box_lid_locked_v2.png";
      image.alt = "";
      cell.append(image);
      if (unlocked) cell.addEventListener("click", () => selectCodexItem(item.id));
      row.append(cell);
    });
    els.codexList.append(row);
  });
}

function selectCodexItem(itemId) {
  const item = byId.get(itemId);
  if (!isFoodItemUnlocked(item)) return;
  activeCodexItemId = item.id;
  renderCodex();
}

function openCodex(preselectedItemId) {
  if (state.tutorialStep === 3) {
    state.tutorialStep = 4;
    saveState();
  }
  if (typeof preselectedItemId === "string" && isFoodItemUnlocked(byId.get(preselectedItemId))) {
    activeCodexItemId = preselectedItemId;
  }
  renderCodex();
  if (!els.codexModal.open) els.codexModal.showModal();
}

function openActiveCodexDetail() {
  if (activeCodexItemId) openCodexItemDetail(activeCodexItemId);
}

function unlockedCodexItems() {
  return codexFoodLines().flatMap((line) =>
    line.items.filter((item) => isFoodItemUnlocked(item)),
  );
}

function updateCodexDetailNavigation(item) {
  const items = unlockedCodexItems();
  const currentIndex = items.findIndex((candidate) => candidate.id === item.id);
  const canNavigate = currentIndex >= 0 && items.length > 1;
  els.codexDetailPrev.disabled = !canNavigate;
  els.codexDetailNext.disabled = !canNavigate;
  if (!canNavigate) return;
  const previous = items[(currentIndex - 1 + items.length) % items.length];
  const next = items[(currentIndex + 1) % items.length];
  els.codexDetailPrev.setAttribute("aria-label", `上一道：${previous.name}`);
  els.codexDetailNext.setAttribute("aria-label", `下一道：${next.name}`);
}

function navigateCodexDetail(offset) {
  const items = unlockedCodexItems();
  if (items.length < 2) return;
  const currentIndex = items.findIndex((item) => item.id === activeCodexItemId);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const nextItem = items[(safeIndex + offset + items.length) % items.length];
  activeCodexItemId = nextItem.id;
  renderCodex();
  openCodexItemDetail(nextItem.id);
}

function openCodexItemDetail(itemId) {
  const item = byId.get(itemId);
  if (!isFoodItemUnlocked(item)) return;
  activeCodexItemId = item.id;
  const entry = codexByItemId.get(item.id);
  els.codexDetailIcon.src = itemAssetSrc(item);
  els.codexDetailIcon.alt = item.name;
  els.codexDetailName.textContent = item.name;
  els.codexDetailModern.textContent = `${codexLineName(item.line)} · ${Number(item.level)}阶${item.modernName ? ` · ${item.modernName}` : ""}`;
  els.codexDetailShort.textContent = entry?.shortText ?? `${item.modernName ?? item.name}，已收入《丝路食鉴》。`;
  els.codexDetailNotesTitle.textContent = entry ? "食鉴札记" : "合成记";
  els.codexDetailLong.textContent = entry?.longText ?? recipeHint(item);
  const sourceNote = entry?.sourceNote?.trim();
  els.codexDetailSourceSection.hidden = !sourceNote;
  els.codexDetailSource.textContent = sourceNote ?? "";
  updateCodexDetailNavigation(item);
  if (!els.codexDetailModal.open) els.codexDetailModal.showModal();
}

function openCodexDetail(codexId) {
  const entry = codexById.get(codexId);
  if (!entry) return;
  openCodexItemDetail(entry.itemId);
}

function resetGame() {
  if (!confirm("确定重置原型进度吗？")) return;
  localStorage.removeItem(SAVE_KEY);
  localStorage.removeItem("silkroad_new_player_guide_v1");
  localStorage.removeItem("silkroad_new_player_guide_v1_qa");
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
  for (let index = 0; index < state.unlockedStorageSlots; index += 1) {
    if (!state.bag[index]) return index;
  }
  return -1;
}

function normalizeStorageSlots(value, unlockedValue) {
  const requestedUnlocked = Number.isInteger(Number(unlockedValue))
    ? Math.max(STORAGE_FREE_SLOTS, Number(unlockedValue))
    : STORAGE_FREE_SLOTS;
  const slotCount = Math.max(STORAGE_FREE_SLOTS, requestedUnlocked, Array.isArray(value) ? value.length : 0);
  const slots = Array(slotCount).fill(null);
  if (Array.isArray(value)) {
    value.forEach((item, index) => {
      slots[index] = migrateLegacyGeneratorId(item ?? null);
    });
  }
  return slots;
}

function normalizeUnlockedStorageSlots(value, savedBag) {
  const configured = Number(value);
  const highestOccupiedIndex = Array.isArray(savedBag)
    ? savedBag.reduce(
      (highest, item, index) => item ? index : highest,
      -1,
    )
    : -1;
  const minimumToPreserveItems = highestOccupiedIndex + 1;
  const requested = Number.isInteger(configured) ? configured : STORAGE_FREE_SLOTS;
  return Math.max(STORAGE_FREE_SLOTS, requested, minimumToPreserveItems);
}

function totalGiftPackCount() {
  return state.giftPacks.reduce((sum, entry) => sum + entry.quantity, 0);
}

function totalRewardBagCount() {
  const itemCount = state.rewardItems.reduce((sum, entry) => sum + entry.quantity, 0);
  return itemCount + totalGiftPackCount();
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
  const assetVersion = item.assetVersion ?? ITEM_ASSET_VERSIONS[item.id];
  const version = assetVersion ? `?v=${encodeURIComponent(assetVersion)}` : "";
  if (item.iconKey?.startsWith("ui_")) return `./assets/ui/${item.iconKey}.png${version}`;
  return `./assets/${item.iconKey}.png${version}`;
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
