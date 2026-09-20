const DATA_PATH = "./data/";
const MAX_INN_LEVEL = 10;
const INN_LEVEL_SCHEMA_VERSION = 2;
const FOOD_DISCOVERY_SCHEMA_VERSION = 1;
const STAMINA_RECOVERY_MINUTES = 2;
const PRODUCTION_MULTIPLIERS = Object.freeze([1, 2, 4]);
const FIRST_TUTORIAL_REPAIR_ID = "tutorial_complete";
const AUDIO_PATH = "./assets/audio/";
const AUDIO_MUTED_KEY = "silkroad_tavern_audio_muted_v1";
const AUDIO_BGM_ENABLED_KEY = "silkroad_tavern_audio_bgm_enabled_v1";
const AUDIO_SFX_ENABLED_KEY = "silkroad_tavern_audio_sfx_enabled_v1";
const SFX_VOLUME = 0.72;
const AUDIO_SOURCES = Object.freeze({
  coin: `${AUDIO_PATH}coin-event.m4a`,
  merge: `${AUDIO_PATH}food-merge.m4a`,
  generate: `${AUDIO_PATH}generator-produce.m4a`,
  click: `${AUDIO_PATH}basic-click-v3.m4a`,
  bubble: `${AUDIO_PATH}bubble-pop.m4a`,
  enterShop: `${AUDIO_PATH}enter-shop.m4a`,
  exitShop: `${AUDIO_PATH}exit-shop.m4a`,
  bgm: `${AUDIO_PATH}bgm.m4a`,
  opening: `${AUDIO_PATH}opening-first-fire-v1.m4a`,
});
const AUDIO_VOLUMES = Object.freeze({
  coin: 0.336,
  merge: SFX_VOLUME,
  generate: 0.504,
  click: 0.9,
  bubble: SFX_VOLUME,
  enterShop: SFX_VOLUME,
  exitShop: SFX_VOLUME,
  bgm: 0.24,
  opening: 0.65,
});
const AUDIO_START_OFFSETS = Object.freeze({
  click: 0.3,
  exitShop: 0.3,
});
const SPECIAL_AUDIO_BUTTONS = [
  "#soundToggleBtn",
  "#innSoundToggleBtn",
  "#stationHudBtn",
  "#repairSideBtn",
  "#stationBtn",
  "#boardReturnBtn",
  "#innKitchenBtn",
].join(",");
const QA_MODE = new URLSearchParams(location.search).get("qa");
const FULL_GAME_TRIAL_MODE = new URLSearchParams(location.search).get("trial") === "full-game-v1";
const FULL_GAME_TRIAL_RESET = FULL_GAME_TRIAL_MODE
  && new URLSearchParams(location.search).get("reset") === "1";
const TRIAL_GENERATOR_CATEGORY = new URLSearchParams(location.search).get("grantGenerator");
const WEEKLY_CHECKIN_PREVIEW = new URLSearchParams(location.search).get("preview") === "weekly-checkin-v1";
const DAILY_SHOP_QA_MODE = QA_MODE === "daily-shop-v1";
const DAILY_SHOP_QA_RESET = DAILY_SHOP_QA_MODE
  && new URLSearchParams(location.search).get("reset") === "1";
const DAILY_SHOP_QA_EMPTY = DAILY_SHOP_QA_MODE
  && new URLSearchParams(location.search).get("catalog") === "empty";
const DAILY_SHOP_QA_PROPS = DAILY_SHOP_QA_MODE
  && new URLSearchParams(location.search).get("props") === "1";
const GENERATOR_QA_MODE = QA_MODE === "generator-system-v1";
const GENERATOR_MATERIAL_QA_MODE = QA_MODE === "generator-materials-v03";
const GENERATOR_CHAIN_QA_MODE = QA_MODE === "generator-chain-v1";
const GENERATOR_CHAIN_QA_CATEGORY = new URLSearchParams(location.search).get("category") || "mill";
const GENERATOR_CHAIN_QA_RESET = GENERATOR_CHAIN_QA_MODE
  && new URLSearchParams(location.search).get("reset") === "1";
const ORDER_GIFT_QA_MODE = QA_MODE === "order-gift-generator-v1";
const RUBY_DISPLAY_QA_MODE = QA_MODE === "ruby-display-v1";
const STAMINA_POUCH_QA_MODE = QA_MODE === "stamina-pouch-v1";
const STAMINA_POUCH_QA_FULL = STAMINA_POUCH_QA_MODE
  && new URLSearchParams(location.search).get("full") === "1";
const STAMINA_POUCH_QA_RESET = STAMINA_POUCH_QA_MODE
  && new URLSearchParams(location.search).get("reset") === "1";
const LV4_MARKET_ORDERS_QA_MODE = QA_MODE === "lv4-market-orders-v1";
const GENERATOR_ORDER_QA_MODE = QA_MODE === "generator-order-progression-v1";
const CARAVAN_RENOWN_QA_MODE = QA_MODE === "caravan-renown-v1";
const CARAVAN_RENOWN_QA_RESET = CARAVAN_RENOWN_QA_MODE
  && new URLSearchParams(location.search).get("reset") === "1";
const CARAVAN_RENOWN_QA_STAGE = new URLSearchParams(location.search).get("stage") || "progress";
const CARAVAN_RENOWN_QA_FULL_BOARD = CARAVAN_RENOWN_QA_MODE
  && new URLSearchParams(location.search).get("board") === "full";
const GLOBAL_LOADING_QA_MODE = QA_MODE === "global-loading-v1";
const PROGRESSION_FLOW_QA_MODE = QA_MODE === "progression-flow-v1";
const REPAIR_PROGRESS_QA_MODE = QA_MODE === "repair-progress-v1";
const CHAPTER_STORY_QA_MODE = QA_MODE === "chapter-story-v1";
const STORY_ARCHIVE_QA_MODE = QA_MODE === "story-archive-v1";
const NEW_PLAYER_GUIDE_QA_MODE = QA_MODE === "new-player-guide-v1";
const NEW_PLAYER_GUIDE_QA_STAGE = new URLSearchParams(location.search).get("stage") || "locked-merge";
const NEW_PLAYER_GUIDE_QA_RESET = NEW_PLAYER_GUIDE_QA_MODE
  && new URLSearchParams(location.search).get("reset") === "1";
const UPGRADE_REVEAL_QA_MODE = QA_MODE === "upgrade-reveal-v1";
const LONGSCROLL_CAST_QA_MODE = QA_MODE === "longscroll-cast-v1";
const SCISSORS_TOOL_QA_MODE = QA_MODE === "scissors-tool-v1";
const SCISSORS_TOOL_QA_RESET = SCISSORS_TOOL_QA_MODE
  && new URLSearchParams(location.search).get("reset") === "1";
const UPGRADE_TOOL_QA_MODE = QA_MODE === "upgrade-tool-v1";
const UPGRADE_TOOL_QA_RESET = UPGRADE_TOOL_QA_MODE
  && new URLSearchParams(location.search).get("reset") === "1";
const LONGSCROLL_RENEWAL_QA_MODE = LONGSCROLL_CAST_QA_MODE
  && new URLSearchParams(location.search).get("renewal") === "1";
const LONGSCROLL_NOTE_FLOW_QA_MODE = LONGSCROLL_RENEWAL_QA_MODE
  && new URLSearchParams(location.search).get("noteFlow") === "1";
const LONGSCROLL_FINALE_QA_MODE = LONGSCROLL_CAST_QA_MODE
  && new URLSearchParams(location.search).get("finale") === "1";
const LONGSCROLL_CAST_QA_UNLOCK = LONGSCROLL_CAST_QA_MODE
  && new URLSearchParams(location.search).get("unlock") === "1";
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
const UPGRADE_REVEAL_QA_LEVEL = Math.max(2, Math.min(MAX_INN_LEVEL, Math.trunc(Number(new URLSearchParams(location.search).get("level"))) || 2));
const LONGSCROLL_CAST_QA_SCENE_MAX = 22;
const LONGSCROLL_CAST_QA_SCENE = Math.max(1, Math.min(LONGSCROLL_CAST_QA_SCENE_MAX, Math.trunc(Number(new URLSearchParams(location.search).get("scene"))) || 1));
const GENERATOR_ORDER_QA_STAGES = Object.freeze(["start", "dairy", "spice", "fruit", "drink", "meat"]);
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
const ISOLATED_QA_MODE = DAILY_SHOP_QA_MODE || GENERATOR_QA_MODE || GENERATOR_MATERIAL_QA_MODE || GENERATOR_CHAIN_QA_MODE || ORDER_GIFT_QA_MODE || RUBY_DISPLAY_QA_MODE || STAMINA_POUCH_QA_MODE || LV4_MARKET_ORDERS_QA_MODE || GENERATOR_ORDER_QA_MODE || CARAVAN_RENOWN_QA_MODE || GLOBAL_LOADING_QA_MODE || PROGRESSION_FLOW_QA_MODE || REPAIR_PROGRESS_QA_MODE || CHAPTER_STORY_QA_MODE || STORY_ARCHIVE_QA_MODE || NEW_PLAYER_GUIDE_QA_MODE || UPGRADE_REVEAL_QA_MODE || LONGSCROLL_CAST_QA_MODE || SCISSORS_TOOL_QA_MODE || UPGRADE_TOOL_QA_MODE;
const SAVE_KEY = FULL_GAME_TRIAL_MODE
  ? "silkroad_tavern_proto_v02_trial_full_game_v1"
  : UPGRADE_TOOL_QA_MODE
  ? "silkroad_tavern_proto_v02_qa_upgrade_tool_v1"
  : SCISSORS_TOOL_QA_MODE
  ? "silkroad_tavern_proto_v02_qa_scissors_tool_v1"
  : UPGRADE_REVEAL_QA_MODE
  ? `silkroad_tavern_proto_v02_qa_upgrade_reveal_v1_lv${UPGRADE_REVEAL_QA_LEVEL}`
  : CARAVAN_RENOWN_QA_MODE
  ? "silkroad_tavern_proto_v02_qa_caravan_renown_v1"
  : DAILY_SHOP_QA_MODE
  ? "silkroad_tavern_proto_v02_qa_daily_shop_v1"
  : LONGSCROLL_CAST_QA_MODE
  ? `silkroad_tavern_proto_v02_qa_longscroll_cast_v1_scene${LONGSCROLL_CAST_QA_SCENE}`
  : NEW_PLAYER_GUIDE_QA_MODE
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
    : GENERATOR_CHAIN_QA_MODE
      ? `silkroad_tavern_proto_v02_qa_generator_chain_v1_${GENERATOR_CHAIN_QA_CATEGORY}`
    : ORDER_GIFT_QA_MODE
      ? `silkroad_tavern_proto_v02_qa_order_gift_generator_v1_ch${ORDER_GIFT_QA_CHAPTER}`
      : RUBY_DISPLAY_QA_MODE
        ? "silkroad_tavern_proto_v02_qa_ruby_display_v1"
        : STAMINA_POUCH_QA_MODE
          ? `silkroad_tavern_proto_v02_qa_stamina_pouch_v1${STAMINA_POUCH_QA_FULL ? "_full" : ""}`
        : LV4_MARKET_ORDERS_QA_MODE
          ? "silkroad_tavern_proto_v02_qa_lv4_market_orders_v1"
          : GENERATOR_ORDER_QA_MODE
            ? `silkroad_tavern_proto_v02_qa_generator_order_progression_v1_${GENERATOR_ORDER_QA_STAGE}`
            : GLOBAL_LOADING_QA_MODE
              ? "silkroad_tavern_proto_v02_qa_global_loading_v1"
              : "silkroad_tavern_proto_v02";
const NPC_STANDEE_VERSION = "foreground-cutout-03";
const REPAIR_PROTOCOL_VERSION = 1;
const REPAIR_PART_COUNT = 9;
const REPAIR_PART_COST_STEPS = Object.freeze([0, 10, 20, 30, 40, 50, 60, 70, 80]);
const HISTORICAL_REWARD_SCHEMA_VERSION = 2;
const COIN_ECONOMY_VERSION = 2;
const OPENING_STAMINA_VERSION = 2;
const LEGACY_OPENING_STAMINA = 18;
const OPENING_COPPER_VERSION = 2;
const LEGACY_OPENING_COPPER = Object.freeze([40, 400]);
const COIN_DENOMINATION_MULTIPLIER = 10;
const CARAVAN_RENOWN_SCHEMA_VERSION = 2;
const CARAVAN_RENOWN_TARGET = 10;
const CARAVAN_RENOWN_REWARD_COUNT = 6;
const CARAVAN_RENOWN_UNLOCK_ORDERS = 8;
const CARAVAN_RENOWN_MIN_COINS = 50;
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
const BONUS_COIN_VALUES = Object.freeze([0, 10, 30, 80, 250]);
const BONUS_RUBY_PREFIX = "bonus_ruby_";
const BONUS_RUBY_MAX_LEVEL = 4;
const BONUS_RUBY_VALUES = Object.freeze([0, 1, 3, 8, 25]);
const BONUS_RUBY_SCALE_PERCENT = Object.freeze([0, 50, 70, 70, 70]);
const BONUS_STAMINA_PREFIX = "bonus_stamina_";
const BONUS_STAMINA_MAX_LEVEL = 4;
const BONUS_STAMINA_VALUES = Object.freeze([0, 2, 8, 30, 100]);
const BONUS_STAMINA_ICON_KEYS = Object.freeze([
  "",
  "ui/ui_camel_bell_stamina",
  "ui/ui_camel_bells_stamina_lv02_v1",
  "ui/ui_camel_stamina_lv03_dromedary_v1",
  "ui/ui_camel_stamina_lv04_bactrian_v1",
]);
const ORDER_PROGRESS_GIFT_ITEM_ID = "gift_pack_order_progress";
const DAILY_POUCH_ITEM_ID = "gift_pack_daily_pomegranate";
const DAILY_POUCH_PACK_ID = "gift_daily_pomegranate_01";
const SPLITTER_TOOL_ITEM_ID = "tool_splitter_scissors";
const UPGRADE_TOOL_ITEM_ID = "tool_baiwei_jinjian";
const SHOP_FOOD_PRICES = Object.freeze({ 4: 12, 5: 22, 6: 40, 7: 72, 8: 130 });
const DAILY_SHOP_REFRESH_MS = 16 * 60 * 60 * 1000;
const SHOP_WEALTH_ITEM_ID = "shop_wealth_figurine";
const SHOP_WEALTH_PACK_ID = "shop_wealth_figurine_pack";
const SHOP_SAXAUL_ITEM_ID = "shop_saxaul_tree";
const SHOP_SAXAUL_PACK_ID = "shop_saxaul_tree_pack";
const DAILY_SHOP_OFFERS = Object.freeze([
  { id: "wealth", name: "聚财陶罐", price: 25, packId: SHOP_WEALTH_PACK_ID },
  { id: "stamina", name: "梭梭树", price: 10, packId: SHOP_SAXAUL_PACK_ID },
]);
const WEEKLY_CHECKIN_REWARDS = Object.freeze([
  { label: "双铃同行", items: [{ itemId: "bonus_stamina_02", quantity: 1 }] },
  { label: "四级油胡饼", items: [{ itemId: "hubing_04_youhubing", quantity: 1 }] },
  { label: "两枚铜钱", items: [{ itemId: "bonus_coin_02", quantity: 1 }] },
  { label: "单峰驼", items: [{ itemId: "bonus_stamina_03", quantity: 1 }] },
  { label: "五级葱豉饼", items: [{ itemId: "hubing_05_congchihubing", quantity: 1 }] },
  { label: "二阶红宝石", items: [{ itemId: "bonus_ruby_02", quantity: 1 }] },
  {
    label: "晨礼宝袋＋二阶红宝石",
    items: [{ packId: DAILY_POUCH_PACK_ID, quantity: 1 }, { itemId: "bonus_ruby_02", quantity: 1 }],
  },
]);
const DAILY_POUCH_REWARD_POOL = Object.freeze([
  { id: "traveler", name: "行旅小礼", weight: 45, coins: 80, stamina: 2 },
  { id: "market", name: "市集馈赠", weight: 30, coins: 140, stamina: 8 },
  { id: "caravan", name: "驼队余响", weight: 16, coins: 100, stamina: 30 },
  { id: "harvest", name: "绿洲丰收", weight: 7, coins: 240, stamina: 30 },
  { id: "silkroad", name: "丝路厚礼", weight: 2, coins: 250, stamina: 100 },
]);
const SELL_CHAIN_LEVELS = Object.freeze({
  food: 8,
  generator: 6,
  generatorMaterial: 4,
});
const STORAGE_GUIDE_VERSION = 1;
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
  { categoryId: "dairy", completedRepairId: "kitchen_repair" },
  { categoryId: "spice", completedRepairId: "lv2_west_market" },
  { categoryId: "fruit", completedRepairId: "lv2_north_shop" },
  { categoryId: "drink", completedRepairId: "lv2_well" },
  { categoryId: "meat", completedRepairId: "lv3_north_court" },
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
const VOLUME_START_LEVELS = Object.freeze({ 1: 1, 2: 3, 3: 6, 4: 9 });

function volumeForInnLevel(level) {
  const normalized = Math.max(1, Math.min(MAX_INN_LEVEL, Math.trunc(Number(level)) || 1));
  if (normalized >= 9) return 4;
  if (normalized >= 6) return 3;
  if (normalized >= 3) return 2;
  return 1;
}

function milestoneInnLevel(milestone) {
  return Math.max(1, Math.min(MAX_INN_LEVEL, Math.trunc(Number(milestone?.innLevel)) || VOLUME_START_LEVELS[milestone?.chapter] || 1));
}
const BUILD_MODE = new URLSearchParams(location.search).get("mode") === "release" ? "release" : "dev";
const LONGSCROLL_KEEPER_STANDEE = "./assets/npc_standee/keeper.png";
const LONGSCROLL_FULL_BODY_STANDEES = Object.freeze({
  keeper: LONGSCROLL_KEEPER_STANDEE,
  npc_dunhuang_woman: "./assets/npc_standee/npc_dunhuang_woman_full_v1.png",
  npc_farmer: "./assets/npc_standee/npc_farmer_full_v1.png",
  npc_temple_donor: "./assets/npc_standee/npc_temple_donor_full_v1.png",
  npc_sogdian_merchant: "./assets/npc_standee/npc_sogdian_merchant_full_v1.png",
  npc_pilgrim_monk: "./assets/npc_standee/npc_pilgrim_monk_full_v1.png",
  npc_uighur_herder: "./assets/npc_standee/npc_uighur_herder_full_v1.png",
  npc_shazhou_guard: "./assets/npc_standee/npc_shazhou_guard_full_v1.png",
  npc_changan_envoy: "./assets/npc_standee/npc_changan_envoy_full_v1.png",
  npc_changan_maid: "./assets/npc_standee/npc_changan_maid_full_v1.png",
  npc_caravan_leader: "./assets/npc_standee/npc_caravan_leader_full_v1.png",
});
const INN_PACKAGE_ASSETS = [
  "./assets/longscroll/base/阶段0_未修缮长卷_1254x1254.png",
  "./assets/longscroll/states-webp/22_done_state_v0.1.webp",
  ...Array.from({ length: 27 }, (_, index) => `./assets/longscroll/masks-alpha/${String(index + 1).padStart(2, "0")}_mask_v0.1.png`),
  "./assets/ui/ui_station_tavern.png",
  "./assets/keeper_portrait.png",
  "./assets/keeper_story_portrait_v2.png",
  LONGSCROLL_KEEPER_STANDEE,
  "./assets/npc_standee/npc_dunhuang_woman_full_v1.png",
  "./assets/npc_standee/npc_farmer_full_v1.png",
  "./assets/npc_standee/npc_temple_donor_full_v1.png",
  "./assets/npc_standee/npc_dunhuang_woman.png",
  "./assets/npc_standee/npc_farmer.png",
  "./assets/npc_standee/npc_temple_donor.png",
  "./assets/npc_standee/npc_caravan_leader.png",
  "./assets/npc_standee/npc_sogdian_merchant.png",
  "./assets/npc_standee/npc_pilgrim_monk.png",
  "./assets/npc_standee/npc_uighur_herder.png",
  "./assets/npc_standee/npc_shazhou_guard.png",
  "./assets/npc_standee/npc_changan_envoy.png",
  "./assets/npc_standee/npc_changan_maid.png",
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
  "./assets/ui/loading_poster_character_v2.jpg",
  ...INN_PACKAGE_ASSETS,
  "./assets/kitchen-bg.png",
  "./assets/order_tray_approved_front.png",
  "./assets/ui/ui_coin_copper.png",
  "./assets/ui/ui_camel_bell_stamina.png",
  "./assets/ui/ui_camel_bells_stamina_lv02_v1.png",
  "./assets/ui/ui_camel_stamina_lv03_dromedary_v1.png",
  "./assets/ui/ui_camel_stamina_lv04_bactrian_v1.png",
  "./assets/ui/ui_bag_inventory.png",
  "./assets/ui/ui_daily_pomegranate_pouch_v2.png",
  "./assets/ui/ui_kitchen_entry.png",
  "./assets/items/tools/ui_scissors_splitter_v1.png?v=scissors-splitter-v1",
  "./assets/ui/ui_baiwei_jinjian_v1.png?v=baiwei-jinjian-v1",
  "./assets/ui/order_gift_coffer_v1.png",
  "./assets/ui/bonus_ruby_lv01.png",
  "./assets/ui/bonus_ruby_lv02.png",
  "./assets/ui/bonus_ruby_lv03.png",
  "./assets/ui/bonus_ruby_lv04.png",
])]);
const LONGSCROLL_ROOT = "./assets/longscroll";
const LONGSCROLL_BASE_SOURCE = `${LONGSCROLL_ROOT}/base/阶段0_未修缮长卷_1254x1254.png`;
const LONGSCROLL_REPAIRED_SOURCE = `${LONGSCROLL_ROOT}/states-webp/22_done_state_v0.1.webp`;
const FINAL_REPAIR_MILESTONE_ID = "lv4_lantern_city";
const HISTORICAL_NOTES = window.SilkRoadHistoricalNotes ?? [];
const historicalNotesById = new Map(HISTORICAL_NOTES.map((note) => [note.id, note]));
const HISTORICAL_CLUE_DISPLAY_SCALE = 1.5;
// Each clue is placed by hand on a believable supporting surface in the 1254px scroll.
// x/y describe the object's bottom-center landing point, not the center of a floating UI badge.
const HISTORICAL_CLUE_OBJECTS = Object.freeze({
  first_seat: { label: "驼铃行囊", x: 625, y: 443, width: 22, rotate: -5 },
  dried_cheese: { label: "干酪布包", x: 365, y: 430, width: 18, rotate: 0 },
  library_cave: { label: "旧卷匣", x: 1188, y: 790, width: 17, rotate: -2 },
  marrow_cake: { label: "蜜罐与面勺", x: 862, y: 505, width: 17, rotate: 0 },
  oasis_routes: { label: "绿洲路牌", x: 410, y: 619, width: 18, rotate: -3 },
  day_journey: { label: "日程木牌", x: 823, y: 674, width: 15, rotate: -7 },
  pedlar_figurine: { label: "背货陶俑", x: 120, y: 590, width: 15, rotate: 0 },
  sea_water: { label: "淡水陶罐", x: 310, y: 900, width: 16, rotate: 0 },
  well: { label: "井渠木牌", x: 700, y: 850, width: 16, rotate: 0 },
  sanskrit_sutra: { label: "注音经页", x: 726, y: 240, width: 17, rotate: -6 },
  travelling_monk: { label: "虎尾画卷", x: 510, y: 130, width: 17, rotate: -4 },
  beacon_signals: { label: "烽火信号筹", x: 354, y: 211, width: 15, rotate: -8 },
  guard_shoe: { label: "补丁毛毡鞋", x: 1152, y: 284, width: 15, rotate: -7 },
  clamp_dye: { label: "夹缬木板", x: 278, y: 442, width: 17, rotate: -3 },
  beacon_workers: { label: "烽子值守物", x: 155, y: 234, width: 15, rotate: -5 },
  cargo: { label: "绢匹马价签", x: 615, y: 930, width: 20, rotate: -5 },
  wine_vessels: { label: "角状酒杯", x: 505, y: 1038, width: 15, rotate: -3 },
  gift_list: { label: "象牙礼单", x: 126, y: 1129, width: 17, rotate: -6 },
  imitation_coin: { label: "仿制金币", x: 513, y: 1207, width: 13, rotate: 4 },
  sogdian_vessel: { label: "仿金属陶壶", x: 895, y: 1124, width: 15, rotate: 0 },
  glass_bowl: { label: "绿钵残画", x: 1148, y: 852, width: 17, rotate: -5 },
  lantern_night: { label: "灯下歌筵笺", x: 1226, y: 1063, width: 16.8, rotate: 0 },
});
const longscrollMaskSrc = (regionId) => `${LONGSCROLL_ROOT}/masks-alpha/${String(regionId).padStart(2, "0")}_mask_v0.1.png`;
const LONGSCROLL_REGION_BOUNDS = {
  1: [405, 487, 317, 269], 2: [488, 327, 300, 207], 3: [738, 339, 320, 230], 4: [298, 274, 258, 232],
  5: [233, 472, 243, 190], 6: [665, 539, 281, 320], 7: [550, 26, 361, 334], 8: [386, 42, 281, 239],
  9: [264, 69, 135, 197], 10: [876, 41, 378, 396], 11: [933, 401, 321, 488], 12: [53, 257, 330, 289],
  13: [21, 7, 239, 304], 14: [0, 0, 1254, 591], 15: [0, 482, 331, 289], 16: [0, 744, 489, 258],
  17: [532, 746, 204, 170], 18: [286, 665, 300, 179], 19: [490, 851, 215, 161], 20: [283, 914, 290, 222],
  21: [7, 982, 353, 272], 22: [197, 1089, 226, 165], 23: [0, 968, 66, 219], 24: [314, 1144, 356, 110],
  25: [504, 943, 529, 311], 26: [710, 743, 544, 351], 27: [1011, 1009, 243, 245],
};
const LONGSCROLL_LOCATION_CAST = Object.freeze({
  // 第一章 · 流沙驿初明
  tutorial_complete: {
    regionId: 2,
    keeper: { x: 585, y: 650, width: 35, flip: false, delay: 0 },
    npc: { x: 630, y: 650, width: 40, flip: true, delay: 90 },
  },
  kitchen_repair: {
    regionId: 4,
    keeper: { x: 430, y: 462, width: 34, flip: false, delay: 0 },
    npc: { x: 477, y: 462, width: 38, flip: true, delay: 90 },
  },
  codex_first_phase: {
    regionId: 11,
    keeper: { x: 1018, y: 776, width: 36, flip: false, delay: 0 },
    npc: { x: 1063, y: 775, width: 49, flip: true, delay: 90 },
  },

  // 第二章 · 西市烟火
  lv2_front_feast: {
    regionId: 3,
    keeper: { x: 843, y: 493, width: 35, flip: false, delay: 0 },
    npc: { x: 890, y: 493, width: 54, flip: true, delay: 90 },
  },
  lv2_west_market: {
    regionId: 5,
    keeper: { x: 326, y: 652, width: 34, flip: false, delay: 0 },
    npc: { x: 372, y: 650, width: 52, flip: true, delay: 90 },
  },
  lv2_flower_rack: {
    regionId: 6,
    keeper: { x: 744, y: 790, width: 35, flip: false, delay: 0 },
    npc: { x: 790, y: 790, width: 40, flip: true, delay: 90 },
  },
  lv2_north_shop: {
    regionId: 15,
    keeper: { x: 145, y: 712, width: 34, flip: false, delay: 0 },
    npc: { x: 192, y: 710, width: 52, flip: true, delay: 90 },
  },
  lv2_south_shop: {
    regionId: 16,
    keeper: { x: 207, y: 940, width: 35, flip: false, delay: 0 },
    npc: { x: 254, y: 939, width: 54, flip: true, delay: 90 },
  },
  lv2_well: {
    regionId: 17,
    keeper: { x: 578, y: 890, width: 35, flip: false, delay: 0 },
    npc: { x: 625, y: 890, width: 54, flip: true, delay: 90 },
  },

  // 第三章 · 楼馆通途
  lv3_upper_hall: {
    regionId: 7,
    keeper: { x: 692, y: 475, width: 34, flip: false, delay: 0 },
    npc: { x: 732, y: 475, width: 52, flip: true, delay: 90 },
  },
  lv3_north_court: {
    regionId: 8,
    keeper: { x: 460, y: 273, width: 33, flip: false, delay: 0 },
    npc: { x: 505, y: 272, width: 51, flip: true, delay: 90 },
  },
  lv3_west_gate: {
    regionId: 9,
    keeper: { x: 270, y: 400, width: 33, flip: false, delay: 0 },
    npc: { x: 315, y: 399, width: 51, flip: true, delay: 90 },
  },
  lv3_east_court: {
    regionId: 10,
    keeper: { x: 1040, y: 350, width: 35, flip: false, delay: 0 },
    npc: { x: 1085, y: 349, width: 52, flip: true, delay: 90 },
  },
  lv3_garden: {
    regionId: 12,
    keeper: { x: 170, y: 527, width: 34, flip: false, delay: 0 },
    npc: { x: 215, y: 526, width: 46, flip: true, delay: 90 },
  },
  lv3_watchtower: {
    regionId: 13,
    keeper: { x: 240, y: 250, width: 33, flip: false, delay: 0 },
    npc: { x: 285, y: 249, width: 45, flip: true, delay: 90 },
  },

  // 第四章 · 灯火连城
  lv4_south_shed: {
    regionId: 19,
    keeper: { x: 530, y: 963, width: 35, flip: false, delay: 0 },
    npc: { x: 578, y: 962, width: 57, flip: true, delay: 90 },
  },
  lv4_central_market: {
    regionId: 20,
    keeper: { x: 402, y: 1114, width: 35, flip: false, delay: 0 },
    npc: { x: 450, y: 1113, width: 57, flip: true, delay: 90 },
  },
  lv4_south_street: {
    regionId: 21,
    keeper: { x: 270, y: 1168, width: 35, flip: false, delay: 0 },
    npc: { x: 315, y: 1167, width: 54, flip: true, delay: 90 },
  },
  lv4_lanes: {
    regionId: 24,
    keeper: { x: 465, y: 1108, width: 34, flip: false, delay: 0 },
    npc: { x: 510, y: 1107, width: 39, flip: true, delay: 90 },
  },
  lv4_east_shed: {
    regionId: 25,
    keeper: { x: 745, y: 1180, width: 35, flip: false, delay: 0 },
    npc: { x: 790, y: 1179, width: 57, flip: true, delay: 90 },
  },
  lv4_east_court: {
    regionId: 26,
    keeper: { x: 1040, y: 961, width: 35, flip: false, delay: 0 },
    npc: { x: 1085, y: 960, width: 52, flip: true, delay: 90 },
  },
  lv4_lantern_city: {
    regionId: 27,
    keeper: { x: 1060, y: 1160, width: 35, flip: false, delay: 0 },
    npc: { x: 1105, y: 1159, width: 57, flip: true, delay: 90 },
  },
});
const GIFT_PACKS = {
  gift_milk_room_parts_01: {
    name: "奶房木件包",
    itemId: ORDER_PROGRESS_GIFT_ITEM_ID,
    description: "前期修缮奖励，主要产出奶房食盒材料。",
    rewards: [
      { type: "item", itemId: "material_dairy_01", quantity: 1 },
      { type: "item", itemId: "material_dairy_01", quantity: 1 },
      { type: "coins", amount: 12 },
      { type: "item", itemId: "material_dairy_01", quantity: 1 },
      { type: "item", itemId: "material_dairy_01", quantity: 1 },
      { type: "item", itemId: "material_dairy_01", quantity: 1 },
      { type: "coins", amount: 18 },
      { type: "item", itemId: "material_dairy_01", quantity: 1 },
      { type: "item", itemId: "material_dairy_01", quantity: 1 },
      { type: "item", itemId: "material_dairy_01", quantity: 1 },
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
  gift_dairy_opening_01: {
    progressionCategory: "dairy",
    name: "奶房开张礼匣",
    itemId: ORDER_PROGRESS_GIFT_ITEM_ID,
    description: "完成后厨修缮后获得，内含一座可直接使用的奶房。",
    rewards: [
      { type: "item", itemId: "gen_dairy_01", quantity: 1 },
    ],
  },
  gift_spice_parts_a_01: {
    progressionCategory: "spice",
    name: "香料架木件·上",
    itemId: ORDER_PROGRESS_GIFT_ITEM_ID,
    description: "香料架的第一批木件，与后续木件合成可搭起香料架。",
    rewards: Array.from({ length: 4 }, () => ({ type: "item", itemId: "material_spice_01", quantity: 1 })),
  },
  gift_spice_parts_b_01: {
    progressionCategory: "spice",
    name: "香料架木件·下",
    itemId: ORDER_PROGRESS_GIFT_ITEM_ID,
    description: "香料架的第二批木件，凑齐后可合成一级香料架。",
    rewards: Array.from({ length: 4 }, () => ({ type: "item", itemId: "material_spice_01", quantity: 1 })),
  },
  gift_fruit_parts_a_01: {
    progressionCategory: "fruit",
    name: "果摊木件·上",
    itemId: ORDER_PROGRESS_GIFT_ITEM_ID,
    description: "果摊的第一批木件，与后续木件合成可搭起果摊。",
    rewards: Array.from({ length: 4 }, () => ({ type: "item", itemId: "material_fruit_01", quantity: 1 })),
  },
  gift_fruit_parts_b_01: {
    progressionCategory: "fruit",
    name: "果摊木件·下",
    itemId: ORDER_PROGRESS_GIFT_ITEM_ID,
    description: "果摊的第二批木件，凑齐后可合成一级果摊。",
    rewards: Array.from({ length: 4 }, () => ({ type: "item", itemId: "material_fruit_01", quantity: 1 })),
  },
  gift_drink_parts_a_01: {
    progressionCategory: "drink",
    name: "酒水厢房木件·上",
    itemId: ORDER_PROGRESS_GIFT_ITEM_ID,
    description: "酒水厢房的第一批木件，与后续木件合成可搭起酒水厢房。",
    rewards: Array.from({ length: 4 }, () => ({ type: "item", itemId: "material_drink_01", quantity: 1 })),
  },
  gift_drink_parts_b_01: {
    progressionCategory: "drink",
    name: "酒水厢房木件·下",
    itemId: ORDER_PROGRESS_GIFT_ITEM_ID,
    description: "酒水厢房的第二批木件，凑齐后可合成一级酒水厢房。",
    rewards: Array.from({ length: 4 }, () => ({ type: "item", itemId: "material_drink_01", quantity: 1 })),
  },
  gift_meat_parts_a_01: {
    progressionCategory: "meat",
    name: "肉铺木件·上",
    itemId: ORDER_PROGRESS_GIFT_ITEM_ID,
    description: "肉铺的第一批木件，与后续木件合成可搭起肉铺。",
    rewards: Array.from({ length: 4 }, () => ({ type: "item", itemId: "material_meat_01", quantity: 1 })),
  },
  gift_meat_parts_b_01: {
    progressionCategory: "meat",
    name: "肉铺木件·下",
    itemId: ORDER_PROGRESS_GIFT_ITEM_ID,
    description: "肉铺的第二批木件，凑齐后可合成一级肉铺。",
    rewards: Array.from({ length: 4 }, () => ({ type: "item", itemId: "material_meat_01", quantity: 1 })),
  },
};
const LOCKED_CELL_ITEM_ROWS = [
  ["hubing_08_gulouzi", "meat_06_suzhi_yanglei", "fruit_05_guopu_pan", "dairy_04_ganlao", "spice_04_jiaochi_jiang", "drink_05_mijiang", "fruit_06_mijian_guo"],
  ["material_dairy_01", "hubing_04_youhubing", "dairy_03_laojiang", "meat_04_jiaochi_yangrou", "spice_03_hujiao_li", "fruit_04_wuhuaguo", "boxmat_livestock_pen_01"],
  ["meat_02_roumi_xian", "hubing_02_lubing", "hubing_01_dough", "material_dairy_01", "dairy_01_milk", "dairy_02_rumi", "spice_02_ziran_mo"],
  ["fruit_03_yezao", "fruit_01_putao", null, null, null, "hubing_02_lubing", "drink_04_shiliujiang"],
  ["hubing_04_youhubing", "boxmat_livestock_pen_01", null, null, null, "dairy_02_rumi", "drink_03_sanlejiang"],
  ["meat_03_roupu", "drink_01_putaozhi", null, null, null, "meat_02_roumi_xian", "dairy_04_ganlao"],
  ["spice_04_jiaochi_jiang", "spice_02_ziran_mo", "fruit_02_gan_putao", "hubing_03_humabing", "dairy_03_laojiang", "drink_02_putaojiang", "hubing_03_humabing"],
  ["material_dairy_01", "fruit_02_gan_putao", "hubing_03_humabing", "meat_04_jiaochi_yangrou", "dairy_03_laojiang", "drink_02_putaojiang", "boxmat_livestock_pen_01"],
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
  storedGiftBoxStates: {},
  splitterToolCharges: {},
  bubbleStates: {},
  unlockedCells: [],
  visibleOrders: [],
  unlockedCodex: new Set(),
  unlockedFoodLevels: {},
  coins: 0,
  stamina: 100,
  staminaMax: 100,
  productionMultiplier: 1,
  recoverMinutes: 2,
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
  answeredHistoricalNoteIds: [],
  historicalNoteRewards: {},
  splitterIntroRewardClaimed: false,
  renovationChoices: {},
  repairProgress: {},
  activeRepairId: null,
  activeChapterStory: null,
  repairPromptedFor: [],
  generatorStates: {},
  unlockedGeneratorCategories: [],
  pendingGeneratorRewards: [],
  generatorWarehouse: { selectedCategoryId: "mill", progressByCategory: {}, readyItems: [] },
  storageGuideVersion: 0,
  generatorWarehouseGuideSeen: false,
  unlockedStorageSlots: STORAGE_FREE_SLOTS,
  staminaPurchaseDay: "",
  staminaPurchasesToday: 0,
  dailyPouchClaimDay: "",
  weeklyCheckinClaimedDays: 0,
  weeklyCheckinLastClaimDay: "",
  weeklyCheckinRound: 1,
  caravanRenown: null,
  shopPurchaseCycle: -1,
  shopPurchasedOfferIds: [],
  shopFoodItemIds: null,
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
  boardStaminaRing: document.querySelector("#boardStaminaRing"),
  boardStaminaTimer: document.querySelector(".board-stamina-timer"),
  boardStaminaTimerLabel: document.querySelector("#boardStaminaTimerLabel"),
  boardStaminaTimerValue: document.querySelector("#boardStaminaTimerValue"),
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
  dailyPouchBtn: document.querySelector("#dailyPouchBtn"),
  dailyShopModal: document.querySelector("#dailyShopModal"),
  dailyShopBalance: document.querySelector("#dailyShopBalance"),
  dailyShopRefresh: document.querySelector("#dailyShopRefresh"),
  dailyShopClaimPouch: document.querySelector("#dailyShopClaimPouch"),
  dailyShopOffers: document.querySelector("#dailyShopOffers"),
  soundToggleBtn: document.querySelector("#soundToggleBtn"),
  productionMultiplier: document.querySelector("#productionMultiplier"),
  audioSettingsPanel: document.querySelector("#audioSettingsPanel"),
  bgmToggleBtn: document.querySelector("#bgmToggleBtn"),
  sfxToggleBtn: document.querySelector("#sfxToggleBtn"),
  storageBtn: document.querySelector("#storageBtn"),
  stationHudBtn: document.querySelector("#stationHudBtn"),
  repairSideBtn: document.querySelector("#repairSideBtn"),
  boardCodexBtn: document.querySelector("#boardCodexBtn"),
  rewardBagBtn: document.querySelector("#rewardBagBtn"),
  rewardBagBadge: document.querySelector("#rewardBagBadge"),
  bagBtn: document.querySelector("#bagBtn"),
  stationBtn: document.querySelector("#stationBtn"),
  boardReturnBtn: document.querySelector("#boardReturnBtn"),
  innKitchenBtn: document.querySelector("#innKitchenBtn"),
  innCodexBtn: document.querySelector("#innCodexBtn"),
  pageDoorTransition: document.querySelector("#pageDoorTransition"),
  storyArchiveBtn: document.querySelector("#storyArchiveBtn"),
  boardPage: document.querySelector("#boardPage"),
  innPage: document.querySelector("#innPage"),
  innLevelName: document.querySelector("#innLevelName"),
  innChapterEyebrow: document.querySelector("#innChapterEyebrow"),
  innChapterProgress: document.querySelector("#innChapterProgress"),
  innCoins: document.querySelector("#innCoins"),
  innStamina: document.querySelector("#innStamina"),
  innStaminaRing: document.querySelector("#innStaminaRing"),
  innStaminaTimer: document.querySelector(".inn-stamina-timer"),
  innStaminaTimerLabel: document.querySelector("#innStaminaTimerLabel"),
  innStaminaTimerValue: document.querySelector("#innStaminaTimerValue"),
  innGems: document.querySelector("#innGems"),
  innStaminaPlusBtn: document.querySelector("#innStaminaPlusBtn"),
  innGemPlusBtn: document.querySelector("#innGemPlusBtn"),
  weeklyCheckinBtn: document.querySelector("#weeklyCheckinBtn"),
  weeklyCheckinModal: document.querySelector("#weeklyCheckinModal"),
  weeklyCheckinGrid: document.querySelector("#weeklyCheckinGrid"),
  weeklyCheckinTrail: document.querySelector("#weeklyCheckinTrail"),
  weeklyCheckinProgress: document.querySelector("#weeklyCheckinProgress"),
  weeklyCheckinClaim: document.querySelector("#weeklyCheckinClaim"),
  weeklyCheckinHint: document.querySelector("#weeklyCheckinHint"),
  renownEventBtn: document.querySelector("#renownEventBtn"),
  renownEventBadge: document.querySelector("#renownEventBadge"),
  renownEventModal: document.querySelector("#renownEventModal"),
  renownEventProgress: document.querySelector("#renownEventProgress"),
  renownEventProgressBar: document.querySelector("#renownEventProgressBar"),
  renownRewardPreview: document.querySelector("#renownRewardPreview"),
  renownEventClaim: document.querySelector("#renownEventClaim"),
  innSoundToggleBtn: document.querySelector("#innSoundToggleBtn"),
  innScene: document.querySelector("#innScene"),
  innScoreText: document.querySelector("#innScoreText"),
  innUpgradeText: document.querySelector("#innUpgradeText"),
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
  unlockAcknowledgeBtn: document.querySelector("#unlockAcknowledgeBtn"),
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
  historicalNoteModal: document.querySelector("#historicalNoteModal"),
  historicalNoteSheet: document.querySelector(".historical-note-sheet"),
  historicalNoteKind: document.querySelector("#historicalNoteKind"),
  historicalNoteGlyph: document.querySelector("#historicalNoteGlyph"),
  historicalNoteTitle: document.querySelector("#historicalNoteTitle"),
  historicalNoteLead: document.querySelector("#historicalNoteLead"),
  historicalNoteVisual: document.querySelector("#historicalNoteVisual"),
  historicalNoteImage: document.querySelector("#historicalNoteImage"),
  historicalNoteImageCaption: document.querySelector("#historicalNoteImageCaption"),
  historicalNoteImageCredit: document.querySelector("#historicalNoteImageCredit"),
  historicalNoteImageLicense: document.querySelector("#historicalNoteImageLicense"),
  historicalNoteClueLabel: document.querySelector("#historicalNoteClueLabel"),
  historicalNoteClueTitle: document.querySelector("#historicalNoteClueTitle"),
  historicalNoteEvidence: document.querySelector("#historicalNoteEvidence"),
  historicalNoteQuestion: document.querySelector("#historicalNoteQuestion"),
  historicalNoteChoices: document.querySelector("#historicalNoteChoices"),
  historicalNoteFeedback: document.querySelector("#historicalNoteFeedback"),
  historicalNoteFeedbackLabel: document.querySelector("#historicalNoteFeedbackLabel"),
  historicalNoteFeedbackText: document.querySelector("#historicalNoteFeedbackText"),
  historicalNoteTakeaway: document.querySelector("#historicalNoteTakeaway"),
  historicalNoteReward: document.querySelector("#historicalNoteReward"),
  historicalNoteRewardBags: document.querySelector("#historicalNoteRewardBags"),
  historicalNoteRewardItems: document.querySelector("#historicalNoteRewardItems"),
  historicalNoteSourcesPanel: document.querySelector("#historicalNoteSourcesPanel"),
  historicalNoteSources: document.querySelector("#historicalNoteSources"),
  historicalOrderTeaser: document.querySelector("#historicalOrderTeaser"),
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
  repairChoices: document.querySelector("#repairChoices"),
  repairConfirmBtn: document.querySelector("#repairConfirmBtn"),
  repairCoinProgress: document.querySelector("#repairCoinProgress"),
  repairGuideModal: document.querySelector("#repairGuideModal"),
  innFinale: document.querySelector("#innFinale"),
  innFinaleStage: document.querySelector("#innFinaleStage"),
  innFinaleTitle: document.querySelector("#innFinaleTitle"),
  innFinaleScroll: document.querySelector("#innFinaleScroll"),
  innFinalePanorama: document.querySelector("#innFinalePanorama"),
  innFinaleShowLetter: document.querySelector("#innFinaleShowLetter"),
  innFinaleLetter: document.querySelector("#innFinaleLetter"),
  innFinaleViewPanorama: document.querySelector("#innFinaleViewPanorama"),
  innFinaleContinue: document.querySelector("#innFinaleContinue"),
  repairGuideTitle: document.querySelector("#repairGuideTitle"),
  repairGuideAvatar: document.querySelector("#repairGuideAvatar"),
  repairGuideText: document.querySelector("#repairGuideText"),
  repairGuideBtn: document.querySelector("#repairGuideBtn"),
  repairPlayerLayer: document.querySelector("#repairPlayerLayer"),
  repairPlayerFrame: document.querySelector("#repairPlayerFrame"),
  repairOrientationBtn: document.querySelector("#repairOrientationBtn"),
  innUpgradeReveal: document.querySelector("#innUpgradeReveal"),
  innUpgradeRevealText: document.querySelector("#innUpgradeRevealText"),
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
  confirmModal: document.querySelector("#confirmModal"),
  confirmEyebrow: document.querySelector("#confirmEyebrow"),
  confirmTitle: document.querySelector("#confirmTitle"),
  confirmMessage: document.querySelector("#confirmMessage"),
  confirmUpgradePreview: document.querySelector("#confirmUpgradePreview"),
  confirmUpgradeFromImg: document.querySelector("#confirmUpgradeFromImg"),
  confirmUpgradeFromName: document.querySelector("#confirmUpgradeFromName"),
  confirmUpgradeFromLevel: document.querySelector("#confirmUpgradeFromLevel"),
  confirmUpgradeToImg: document.querySelector("#confirmUpgradeToImg"),
  confirmUpgradeToName: document.querySelector("#confirmUpgradeToName"),
  confirmUpgradeToLevel: document.querySelector("#confirmUpgradeToLevel"),
  confirmClose: document.querySelector("#confirmClose"),
  confirmCancel: document.querySelector("#confirmCancel"),
  confirmAccept: document.querySelector("#confirmAccept"),
  storageModal: document.querySelector("#storageModal"),
  storageSlotList: document.querySelector("#storageSlotList"),
  storageInviteBtn: document.querySelector("#storageInviteBtn"),
  storageUnlockBtn: document.querySelector("#storageUnlockBtn"),
  storageUnlockPrice: document.querySelector("#storageUnlockPrice"),
  storageNormalTab: document.querySelector("#storageNormalTab"),
  storageGeneratorTab: document.querySelector("#storageGeneratorTab"),
  storageNormalPanel: document.querySelector("#storageNormalPanel"),
  storageFooter: document.querySelector("#storageFooter"),
  storageGuide: document.querySelector("#storageGuide"),
  storageGuideTitle: document.querySelector("#storageGuideTitle"),
  storageGuideCopy: document.querySelector("#storageGuideCopy"),
  storageGuideSkip: document.querySelector("#storageGuideSkip"),
  storageGuideNext: document.querySelector("#storageGuideNext"),
  generatorWarehousePanel: document.querySelector("#generatorWarehousePanel"),
  generatorWarehouseCategories: document.querySelector("#generatorWarehouseCategories"),
  generatorWarehouseName: document.querySelector("#generatorWarehouseName"),
  generatorWarehouseCount: document.querySelector("#generatorWarehouseCount"),
  generatorWarehouseProgress: document.querySelector("#generatorWarehouseProgress"),
  generatorWarehouseRecipe: document.querySelector("#generatorWarehouseRecipe"),
  generatorWarehouseHint: document.querySelector("#generatorWarehouseHint"),
  generatorWarehouseWithdraw: document.querySelector("#generatorWarehouseWithdraw"),
  generatorWarehouseStoredIcon: document.querySelector("#generatorWarehouseStoredIcon"),
  generatorWarehouseStoredCount: document.querySelector("#generatorWarehouseStoredCount"),
  generatorWarehouseDeposit: document.querySelector("#generatorWarehouseDeposit"),
  generatorWarehouseDepositIcon: document.querySelector("#generatorWarehouseDepositIcon"),
  generatorWarehouseClaim: document.querySelector("#generatorWarehouseClaim"),
  generatorWarehouseOutputIcon: document.querySelector("#generatorWarehouseOutputIcon"),
  generatorWarehouseOutputCount: document.querySelector("#generatorWarehouseOutputCount"),
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
let splitterPulseIndices = new Set();
let toastTimer = null;
let suppressNextCellClick = false;
let suppressNextCellClickTimer = null;
let activeRepairMilestoneId = null;
let activeRepairChoiceId = null;
let pendingInnUpgradeRevealLevel = null;
let innUpgradeRevealTimer = null;
let innPackageLoaded = false;
let innPackagePromise = null;
let innReleaseTimer = null;
let pageSwitchInProgress = false;
let repairPulseTimer = null;
let boardGuideTimer = null;
let lastInnFocusKey = null;
let innSceneResizeObserver = null;
let innViewportFocusFrame = null;
let lastLongscrollCharacterSceneKey = null;
let pendingInnFocusPosition = null;
let openRepairMilestoneId = null;
let repairReturnCastMilestoneId = null;
let pendingRepairAfterStoryMilestoneId = null;
let activeLongscrollClueCamera = null;
let innFinaleTimers = [];
let innFinaleCloseMilestone = null;
let repairRenewalTimer = null;
let repairAnchorRect = null;
let repairModalAnimating = false;
let repairModalMode = "entry";
let bonusBubbleSequence = 0;
let lastBonusCoinTapIndex = -1;
let lastBonusCoinTapAt = 0;
let lastBonusRubyTapIndex = -1;
let lastBonusRubyTapAt = 0;
let lastBonusStaminaTapIndex = -1;
let lastBonusStaminaTapAt = 0;
let activeStoryArchiveChapter = 1;
let storyArchiveCloseTimer = null;
let storyArchivePageSwapTimer = null;
let storyArchivePageDoneTimer = null;
let activeStorageTab = "normal";
let storageGuideStep = null;
let generatorWarehouseAnimationTimer = null;
let pendingConfirmResolve = null;
let storyArchivePageTurning = false;
let historicalNoteReturnChapter = null;
let historicalNoteTransitioning = false;
let historicalRewardAnimationRun = 0;
let activeOrderFoodContext = null;
let activeCodexItemId = null;
const activeGeneratorOutputIndices = new Set();
const activeDailyPouchStates = new Set();
const activeDailyPouchOutputIndices = new Set();
const audioRuntime = {
  initialized: false,
  bgmEnabled: true,
  sfxEnabled: true,
  bgm: null,
  bgmStarted: false,
  opening: null,
  openingSession: null,
  fadeFrame: null,
  pools: new Map(),
  cursors: new Map(),
  lastSpecificAt: -Infinity,
};

function readAudioEnabledPreference(key) {
  try {
    const saved = localStorage.getItem(key);
    if (saved !== null) return saved !== "0";
    return localStorage.getItem(AUDIO_MUTED_KEY) !== "1";
  } catch {
    return true;
  }
}

function saveAudioPreferences() {
  try {
    localStorage.setItem(AUDIO_BGM_ENABLED_KEY, audioRuntime.bgmEnabled ? "1" : "0");
    localStorage.setItem(AUDIO_SFX_ENABLED_KEY, audioRuntime.sfxEnabled ? "1" : "0");
    localStorage.removeItem(AUDIO_MUTED_KEY);
  } catch { /* local storage may be unavailable in private previews */ }
}

function createGameAudio(src, volume) {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.playsInline = true;
  audio.volume = volume;
  audio.load();
  return audio;
}

function initAudio() {
  if (audioRuntime.initialized) return;
  audioRuntime.initialized = true;
  audioRuntime.bgmEnabled = readAudioEnabledPreference(AUDIO_BGM_ENABLED_KEY);
  audioRuntime.sfxEnabled = readAudioEnabledPreference(AUDIO_SFX_ENABLED_KEY);
  audioRuntime.bgm = createGameAudio(AUDIO_SOURCES.bgm, 0);
  audioRuntime.bgm.loop = true;
  audioRuntime.opening = createGameAudio(AUDIO_SOURCES.opening, AUDIO_VOLUMES.opening);
  audioRuntime.opening.addEventListener("loadedmetadata", () => {
    if (audioRuntime.openingSession) startOpeningAudioIfAllowed();
  });
  window.addEventListener("silkroad:opening-start", (event) => {
    if (audioRuntime.fadeFrame) cancelAnimationFrame(audioRuntime.fadeFrame);
    audioRuntime.fadeFrame = null;
    audioRuntime.bgm.pause();
    audioRuntime.bgm.volume = 0;
    audioRuntime.opening.pause();
    audioRuntime.openingSession = event.detail;
    startOpeningAudioIfAllowed();
  });
  window.addEventListener("silkroad:opening-end", () => {
    if (!audioRuntime.openingSession) return;
    audioRuntime.openingSession = null;
    audioRuntime.opening.pause();
    setOpeningSoundPrompt(false);
    startBgmIfAllowed(1200);
  });
  Object.entries(AUDIO_SOURCES).forEach(([name, src]) => {
    if (name === "bgm" || name === "opening") return;
    const poolSize = name === "click" ? 6 : 2;
    const pool = Array.from({ length: poolSize }, () => createGameAudio(src, AUDIO_VOLUMES[name]));
    audioRuntime.pools.set(name, pool);
    audioRuntime.cursors.set(name, 0);
  });
  renderAudioControls();
}

function playSfx(name, { markSpecific = name !== "click" } = {}) {
  if (!audioRuntime.initialized) initAudio();
  if (!audioRuntime.sfxEnabled || document.hidden) return;
  const pool = audioRuntime.pools.get(name);
  if (!pool?.length) return;
  const cursor = audioRuntime.cursors.get(name) ?? 0;
  const layerCount = name === "click" ? 2 : 1;
  const audios = Array.from({ length: layerCount }, (_, index) => pool[(cursor + index) % pool.length]);
  audioRuntime.cursors.set(name, (cursor + layerCount) % pool.length);
  const startOffset = AUDIO_START_OFFSETS[name] ?? 0;
  audios.forEach((audio) => {
    try {
      audio.pause();
    } catch { /* the audio element may still be initializing */ }
    audio.volume = AUDIO_VOLUMES[name];
    const startPlayback = () => {
      let started = false;
      const playNow = () => {
        if (started) return;
        started = true;
        audio.play().catch(() => {});
      };
      if (startOffset <= 0) {
        try {
          audio.currentTime = 0;
        } catch { /* the browser may still be finalizing the media timeline */ }
        playNow();
        return;
      }
      const handleSeeked = () => playNow();
      audio.addEventListener("seeked", handleSeeked, { once: true });
      try {
        audio.currentTime = startOffset;
        if (!audio.seeking && Math.abs(audio.currentTime - startOffset) < 0.01) {
          audio.removeEventListener("seeked", handleSeeked);
          playNow();
        }
      } catch {
        audio.removeEventListener("seeked", handleSeeked);
        playNow();
      }
    };
    if (startOffset > 0 && audio.readyState < HTMLMediaElement.HAVE_METADATA) {
      audio.addEventListener("loadedmetadata", startPlayback, { once: true });
      audio.load();
    } else {
      startPlayback();
    }
  });
  if (markSpecific) audioRuntime.lastSpecificAt = performance.now();
}

function fadeBgmTo(targetVolume, duration = 520) {
  const bgm = audioRuntime.bgm;
  if (!bgm) return;
  if (audioRuntime.fadeFrame) cancelAnimationFrame(audioRuntime.fadeFrame);
  const startedAt = performance.now();
  const initialVolume = bgm.volume;
  const step = (now) => {
    const progress = Math.max(0, Math.min(1, (now - startedAt) / duration));
    bgm.volume = Math.max(0, Math.min(1, initialVolume + (targetVolume - initialVolume) * progress));
    if (progress < 1) audioRuntime.fadeFrame = requestAnimationFrame(step);
    else audioRuntime.fadeFrame = null;
  };
  audioRuntime.fadeFrame = requestAnimationFrame(step);
}

function setOpeningSoundPrompt(visible) {
  const button = document.querySelector("#chapterOpeningSound");
  if (button) button.hidden = !visible;
}

function startOpeningAudioIfAllowed() {
  const session = audioRuntime.openingSession;
  const audio = audioRuntime.opening;
  if (!session || !audio || !audioRuntime.bgmEnabled || document.hidden || session.reducedMotion) return;
  if (!audio.paused) return;
  const elapsed = (performance.now() - session.startedAt) / 1000;
  if (elapsed >= session.duration / 1000) return;
  // A first visit may require a tap. Join the current frame rather than replaying the wind.
  if (audio.readyState >= HTMLMediaElement.HAVE_METADATA) audio.currentTime = elapsed;
  audio.volume = AUDIO_VOLUMES.opening;
  audio.play().then(() => {
    if (audioRuntime.openingSession !== session) return;
    if (document.hidden || !audioRuntime.bgmEnabled) audio.pause();
    setOpeningSoundPrompt(false);
  }).catch((error) => {
    if (audioRuntime.openingSession === session && audioRuntime.bgmEnabled) {
      setOpeningSoundPrompt(error.name === "NotAllowedError");
    }
  });
}

function startBgmIfAllowed(fadeDuration = 520) {
  if (!audioRuntime.initialized) initAudio();
  if (audioRuntime.openingSession) {
    startOpeningAudioIfAllowed();
    return;
  }
  if (!audioRuntime.bgmEnabled || document.hidden || !audioRuntime.bgm) return;
  if (!audioRuntime.bgm.paused && audioRuntime.bgmStarted) return;
  const playAttempt = audioRuntime.bgm.play();
  if (!playAttempt) return;
  playAttempt
    .then(() => {
      if (audioRuntime.openingSession || !audioRuntime.bgmEnabled || document.hidden) {
        audioRuntime.bgm.pause();
        return;
      }
      audioRuntime.bgmStarted = true;
      fadeBgmTo(AUDIO_VOLUMES.bgm, typeof fadeDuration === "number" ? fadeDuration : 520);
    })
    .catch(() => {});
}

function renderAudioControls() {
  const muted = !audioRuntime.bgmEnabled && !audioRuntime.sfxEnabled;
  const mixed = audioRuntime.bgmEnabled !== audioRuntime.sfxEnabled;
  const panelOpen = Boolean(els.audioSettingsPanel && !els.audioSettingsPanel.hidden);
  [els.soundToggleBtn, els.innSoundToggleBtn].filter(Boolean).forEach((button) => {
    button.classList.toggle("is-muted", muted);
    button.classList.toggle("is-mixed", mixed);
    button.classList.toggle("is-open", panelOpen);
    const label = `声音设置，背景音乐${audioRuntime.bgmEnabled ? "已开启" : "已关闭"}，操作音效${audioRuntime.sfxEnabled ? "已开启" : "已关闭"}`;
    button.setAttribute("aria-label", label);
    button.setAttribute("aria-expanded", String(panelOpen));
    button.title = label;
  });
  [
    [els.bgmToggleBtn, audioRuntime.bgmEnabled],
    [els.sfxToggleBtn, audioRuntime.sfxEnabled],
  ].forEach(([button, enabled]) => {
    if (!button) return;
    button.classList.toggle("is-on", enabled);
    button.setAttribute("aria-pressed", String(enabled));
  });
}

function closeAudioSettings() {
  if (!els.audioSettingsPanel || els.audioSettingsPanel.hidden) return;
  els.audioSettingsPanel.hidden = true;
  renderAudioControls();
}

function toggleAudioSettings() {
  if (!audioRuntime.initialized) initAudio();
  if (!els.audioSettingsPanel) return;
  playSfx("click", { markSpecific: false });
  els.audioSettingsPanel.hidden = !els.audioSettingsPanel.hidden;
  renderAudioControls();
}

function toggleBgm() {
  if (!audioRuntime.initialized) initAudio();
  playSfx("click", { markSpecific: false });
  audioRuntime.bgmEnabled = !audioRuntime.bgmEnabled;
  saveAudioPreferences();
  renderAudioControls();
  if (!audioRuntime.bgmEnabled) {
    if (audioRuntime.fadeFrame) cancelAnimationFrame(audioRuntime.fadeFrame);
    audioRuntime.fadeFrame = null;
    audioRuntime.bgm?.pause();
    audioRuntime.opening?.pause();
    setOpeningSoundPrompt(false);
    if (audioRuntime.bgm) audioRuntime.bgm.volume = 0;
    return;
  }
  startBgmIfAllowed();
}

function toggleSfx() {
  if (!audioRuntime.initialized) initAudio();
  const wasEnabled = audioRuntime.sfxEnabled;
  if (wasEnabled) playSfx("click", { markSpecific: false });
  audioRuntime.sfxEnabled = !audioRuntime.sfxEnabled;
  saveAudioPreferences();
  renderAudioControls();
  if (!audioRuntime.sfxEnabled) {
    audioRuntime.pools.forEach((pool) => pool.forEach((audio) => audio.pause()));
    return;
  }
  if (!wasEnabled) playSfx("click", { markSpecific: false });
}

function handleAudioSettingsPointerDown(event) {
  if (!els.audioSettingsPanel || els.audioSettingsPanel.hidden) return;
  const target = event.target instanceof Element ? event.target : null;
  if (target?.closest("#audioSettingsPanel, .sound-toggle")) return;
  closeAudioSettings();
}

function handleAudioSettingsKeydown(event) {
  if (event.key === "Escape") closeAudioSettings();
}

function handleBasicButtonSound(event) {
  if (audioRuntime.openingSession) return;
  const target = event.target instanceof Element ? event.target.closest("button") : null;
  if (!target || target.disabled || target.dataset.sound === "none") return;
  if (target.matches(SPECIAL_AUDIO_BUTTONS)) return;
  if (performance.now() - audioRuntime.lastSpecificAt < 80) return;
  playSfx("click", { markSpecific: false });
}

function queueBoardClickSound() {
  const previousSpecificAt = audioRuntime.lastSpecificAt;
  queueMicrotask(() => {
    if (audioRuntime.lastSpecificAt !== previousSpecificAt) return;
    playSfx("click", { markSpecific: false });
  });
}

function handleAudioVisibility() {
  if (document.hidden) {
    audioRuntime.bgm?.pause();
    audioRuntime.opening?.pause();
    return;
  }
  if (audioRuntime.openingSession) {
    startOpeningAudioIfAllowed();
    return;
  }
  if (audioRuntime.bgmEnabled && audioRuntime.bgmStarted) startBgmIfAllowed();
}

async function loadJson(name) {
  const response = await fetch(
    `${DATA_PATH}${name}.json`,
    name === "stamina" ? { cache: "no-store" } : undefined,
  );
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
  state.innLevel = MAX_INN_LEVEL;
  state.staminaMax = 99;
  state.stamina = 99;
  state.selectedIndex = null;
}

function grantTrialGeneratorFromUrl() {
  if (!TRIAL_GENERATOR_CATEGORY || ISOLATED_QA_MODE) return false;
  const category = state.generatorConfig.categories.find((entry) => entry.id === TRIAL_GENERATOR_CATEGORY);
  if (!category) return false;
  const targetIndex = state.board.findIndex((itemId, index) => !itemId && !isBoardCellLocked(index));
  if (targetIndex < 0) return false;
  state.board[targetIndex] = generatorItemId(category.id, 1);
  state.currentPage = "board";
  state.selectedIndex = targetIndex;
  const url = new URL(location.href);
  url.searchParams.delete("grantGenerator");
  history.replaceState(null, "", url);
  return true;
}

function initializeChapterStoryQaScenario() {
  // 剧情体验使用独立存档；充足体力与零冷却只服务于验收，不影响正式存档。
  state.staminaMax = 99999;
  state.stamina = 99999;
  state.items.forEach((item) => {
    if (item.generator) item.generator.cooldownSeconds = 0;
  });
  Object.values(state.generatorStates).forEach((generatorState) => {
    generatorState.cooldownEnd = 0;
  });
}

function initializeScissorsToolQaScenario() {
  state.board = Array(BOARD_SIZE).fill(null);
  state.board[boardIndex(4, 2)] = SPLITTER_TOOL_ITEM_ID;
  state.board[boardIndex(4, 4)] = "dairy_03_laojiang";
  state.board[boardIndex(5, 4)] = "hubing_02_lubing";
  state.board[boardIndex(5, 2)] = "dairy_01_milk";
  state.splitterToolCharges = { [boardIndex(4, 2)]: 3 };
  state.unlockedCells = Array.from({ length: BOARD_SIZE }, (_, index) => index);
  state.rewardItems = [{ itemId: SPLITTER_TOOL_ITEM_ID, quantity: 2 }];
  state.giftPacks = [];
  state.giftBoxStates = {};
  state.storedGiftBoxStates = {};
  state.bubbleStates = {};
  state.currentPage = "board";
  state.selectedIndex = null;
}

function initializeUpgradeToolQaScenario() {
  const upgradeableFoodIds = state.items
    .filter(isUpgradeToolTargetItem)
    .sort((left, right) => (Number(left.level) - Number(right.level)) || left.line.localeCompare(right.line))
    .map((item) => item.id);
  const maxFoodIds = state.items
    .filter((item) => foodLineMaxLevels.has(item.line) && Number(item.level) === foodLineMaxLevels.get(item.line))
    .map((item) => item.id);
  state.board = Array.from(
    { length: BOARD_SIZE },
    (_, index) => upgradeableFoodIds[index % upgradeableFoodIds.length] ?? "hubing_02_lubing",
  );
  [6, 20, 48, BOARD_SIZE - 1].forEach((index, maxIndex) => {
    state.board[index] = maxFoodIds[maxIndex % maxFoodIds.length] ?? "hubing_08_gulouzi";
  });
  [0, 34, BOARD_SIZE - 3].forEach((index) => {
    state.board[index] = null;
  });
  state.board[boardIndex(4, 2)] = UPGRADE_TOOL_ITEM_ID;
  state.unlockedCells = Array.from({ length: BOARD_SIZE }, (_, index) => index);
  state.rewardItems = [{ itemId: UPGRADE_TOOL_ITEM_ID, quantity: 1 }];
  state.giftPacks = [];
  state.giftBoxStates = {};
  state.storedGiftBoxStates = {};
  state.bubbleStates = {};
  state.currentPage = "board";
  state.selectedIndex = null;
}

function renderUpgradeToolQaControls() {
  document.querySelector(".upgrade-tool-qa-controls")?.remove();
  if (!UPGRADE_TOOL_QA_MODE) return;
  const controls = document.createElement("aside");
  controls.className = "upgrade-tool-qa-controls";
  controls.setAttribute("aria-label", "百味金笺测试工具");
  controls.innerHTML = `
    <span><strong>百味金笺 · 近满盘</strong><small>拖到任意未满阶食物上</small></span>
    <button type="button">重置测试棋盘</button>
  `;
  controls.querySelector("button").addEventListener("click", () => {
    initializeUpgradeToolQaScenario();
    render();
    saveState();
    toast("测试棋盘已重置");
  });
  document.body.append(controls);
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

function generatorChainQaCategory() {
  return state.generatorMaterialConfig.categories.find((category) => category.id === GENERATOR_CHAIN_QA_CATEGORY)
    ?? state.generatorMaterialConfig.categories[0];
}

function initializeGeneratorChainQaScenario() {
  const category = generatorChainQaCategory();
  state.board = Array(BOARD_SIZE).fill(null);
  // Four separated pairs make each 2→1 material merge visible before Lv1 appears.
  [0, 2, 4, 6].forEach((row) => {
    state.board[boardIndex(row, 2)] = generatorMaterialItemId(category.id, 1);
    state.board[boardIndex(row, 3)] = generatorMaterialItemId(category.id, 1);
  });
  state.unlockedCells = Array.from({ length: BOARD_SIZE }, (_, index) => index);
  state.unlockedGeneratorCategories = [category.id];
  state.bag = Array(STORAGE_FREE_SLOTS).fill(null);
  state.rewardItems = [];
  state.giftPacks = [];
  state.giftBoxStates = {};
  state.bubbleStates = {};
  state.generatorStates = {};
  state.pendingGeneratorRewards = [];
  state.generatorWarehouse = emptyGeneratorWarehouse();
  state.claimedGeneratorProgressRewards = [];
  state.generatorLineOrderCounts = emptyGeneratorLineOrderCounts();
  state.stamina = state.staminaMax;
  state.currentPage = "board";
  state.selectedIndex = null;
}

function renderGeneratorChainQaPanel() {
  if (!GENERATOR_CHAIN_QA_MODE) return;
  let panel = document.querySelector("#generatorChainQaPanel");
  if (!panel) {
    document.body.classList.add("generator-chain-qa");
    const toggle = document.createElement("button");
    toggle.id = "generatorChainQaToggle";
    toggle.type = "button";
    toggle.textContent = "合成路线";
    toggle.addEventListener("click", () => { panel.hidden = !panel.hidden; });
    panel = document.createElement("aside");
    panel.id = "generatorChainQaPanel";
    panel.setAttribute("aria-label", "生成器合成路线试玩工具");
    panel.innerHTML = `
      <header><div><small>独立试玩 · 不影响正式存档</small><strong>生成器合成路线</strong></div><button type="button" class="generator-chain-qa-close" aria-label="收起试玩说明">×</button></header>
      <label>选择生产线 <select class="generator-chain-qa-category"></select></label>
      <p class="generator-chain-qa-rule">8份初阶材料 → 4份进阶材料 → 2份成型材料 → Lv1生成器。之后每两台同类、同等级生成器升一级，最高Lv6。</p>
      <p class="generator-chain-qa-status" aria-live="polite"></p>
      <button type="button" class="generator-chain-qa-copy">清理食材并领取同级副本（测试）</button>
      <div class="generator-chain-qa-actions"><button type="button" class="generator-chain-qa-start">收起说明，开始合成</button><button type="button" class="generator-chain-qa-reset">重置棋盘</button></div>
      <small class="generator-chain-qa-note">奶房生成器合成后会立即向周围投放食物。继续升级时，测试按钮会清理本线食材并补一台同级生成器；正式游戏没有此测试按钮，也不会自动清理食材。</small>`;
    const select = panel.querySelector(".generator-chain-qa-category");
    state.generatorMaterialConfig.categories.forEach((category) => {
      const option = document.createElement("option");
      option.value = category.id;
      option.textContent = category.displayName.replace("材料", "");
      select.append(option);
    });
    select.addEventListener("change", () => {
      location.href = `${location.pathname}?mode=release&qa=generator-chain-v1&category=${encodeURIComponent(select.value)}&reset=1`;
    });
    panel.querySelector(".generator-chain-qa-close").addEventListener("click", () => { panel.hidden = true; });
    panel.querySelector(".generator-chain-qa-start").addEventListener("click", () => { panel.hidden = true; });
    panel.querySelector(".generator-chain-qa-reset").addEventListener("click", () => {
      initializeGeneratorChainQaScenario();
      render();
      saveState();
    });
    panel.querySelector(".generator-chain-qa-copy").addEventListener("click", () => {
      const categoryId = generatorChainQaCategory().id;
      const level = highestOwnedGeneratorLevel(categoryId);
      const itemId = generatorItemId(categoryId, level);
      const category = state.generatorConfig.categories.find((entry) => entry.id === categoryId);
      const outputIds = new Set([category?.baseOutputItemId, category?.secondaryOutputItemId].filter(Boolean));
      state.board.forEach((ownedId, boardIndex) => {
        if (outputIds.has(ownedId)) state.board[boardIndex] = null;
      });
      const index = findMergeFriendlyIndex(itemId);
      if (!level || level >= state.generatorConfig.levelsPerCategory || index < 0) return;
      state.board[index] = itemId;
      state.selectedIndex = state.board.findIndex((ownedId, ownedIndex) => ownedIndex !== index && ownedId === itemId);
      panel.hidden = true;
      toast(`测试副本：${byId.get(itemId)?.name ?? "生成器"}，请与同级合成`);
      render();
      saveState();
    });
    document.body.append(toggle, panel);
  }
  const categoryId = generatorChainQaCategory().id;
  panel.querySelector(".generator-chain-qa-category").value = categoryId;
  const level = highestOwnedGeneratorLevel(categoryId);
  const copyButton = panel.querySelector(".generator-chain-qa-copy");
  copyButton.disabled = !level || level >= state.generatorConfig.levelsPerCategory;
  const status = panel.querySelector(".generator-chain-qa-status");
  if (level >= state.generatorConfig.levelsPerCategory) {
    status.textContent = `已合成 Lv${level}，本线达到最高级。`;
  } else if (level > 0) {
    status.textContent = `当前最高 Lv${level}。领取一台同级副本，合成 Lv${level + 1}。`;
  } else {
    const counts = [1, 2, 3].map((stage) =>
      state.board.filter((itemId) => itemId === generatorMaterialItemId(categoryId, stage)).length);
    status.textContent = `材料现有：初阶 ${counts[0]}、进阶 ${counts[1]}、成型 ${counts[2]}。先把八份材料两两合成。`;
  }
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

function initializeStaminaPouchQaScenario() {
  const pouchIndex = boardIndex(4, 3);
  state.board = Array(BOARD_SIZE).fill(STAMINA_POUCH_QA_FULL ? "hubing_01_dough" : null);
  if (!STAMINA_POUCH_QA_FULL) {
    ["bonus_stamina_01", "bonus_stamina_02", "bonus_stamina_03", "bonus_stamina_04"].forEach((itemId, index) => {
      state.board[index] = itemId;
    });
    state.board[7] = "bonus_stamina_01";
    state.board[8] = "bonus_stamina_01";
  } else {
    state.board[pouchIndex - 1] = null;
  }
  state.board[pouchIndex] = DAILY_POUCH_ITEM_ID;
  state.bag = Array(STORAGE_FREE_SLOTS).fill(null);
  state.unlockedStorageSlots = STORAGE_FREE_SLOTS;
  state.rewardItems = [];
  state.giftPacks = [];
  state.giftBoxStates = {
    [pouchIndex]: STAMINA_POUCH_QA_FULL
      ? {
          packId: DAILY_POUCH_PACK_ID,
          dailyRewardId: "traveler",
          pendingOutputs: [bonusStaminaId(1), bonusCoinId(1)],
          nextRewardIndex: 0,
        }
      : { packId: DAILY_POUCH_PACK_ID, nextRewardIndex: 0 },
  };
  state.bubbleStates = {};
  state.unlockedCells = Array.from({ length: BOARD_SIZE }, (_, index) => index);
  state.generatorStates = {};
  state.staminaMax = 100;
  state.stamina = 0;
  state.currentPage = "board";
  state.selectedIndex = pouchIndex;
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
  state.coins = 10000;
  state.staminaMax = 99;
  state.stamina = 99;
  state.innLevel = 9;
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
  state.generatorWarehouse = emptyGeneratorWarehouse();
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
  state.coins = 9990;
  const qaLevelByStage = [1, 2, 3, 4, 5, 6];
  state.innLevel = qaLevelByStage[stageIndex] ?? 1;
  state.currentPage = "board";
  state.selectedIndex = null;
}

const PROGRESSION_FLOW_QA_SPECS = Object.freeze({
  fresh: { completedOrders: 0, repairCount: 0, innLevel: 1, generatorLevel: 1, coins: 0, chapterOrders: 0 },
  20: { completedOrders: 20, repairCount: 2, innLevel: 2, generatorLevel: 2, coins: 2200, chapterOrders: 8 },
  60: { completedOrders: 60, repairCount: 6, innLevel: 4, generatorLevel: 3, coins: 3000, chapterOrders: 8 },
  120: { completedOrders: 120, repairCount: 13, innLevel: 7, generatorLevel: 4, coins: 6000, chapterOrders: 8 },
  190: { completedOrders: 190, repairCount: 20, innLevel: 10, generatorLevel: 5, coins: 12000, chapterOrders: 8 },
  260: { completedOrders: 260, repairCount: 22, innLevel: 10, generatorLevel: 6, coins: 25000, chapterOrders: 12 },
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
  state.recoverMinutes = STAMINA_RECOVERY_MINUTES;
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
  state.chapterOrderCounts = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    [volumeForInnLevel(spec.innLevel)]: spec.chapterOrders,
  };
  state.generatorLineOrderCounts = Object.fromEntries(
    state.generatorConfig.categories.map((category) => [
      category.id,
      unlockedCategories.includes(category.id) ? lineOrderTarget : 0,
    ]),
  );
  state.claimedOrderProgressPacks = state.progressionConfig.orderProgressPacks
    .filter((pack) => pack.chapter < volumeForInnLevel(spec.innLevel)
      || (pack.chapter === volumeForInnLevel(spec.innLevel) && pack.threshold < spec.chapterOrders))
    .map((pack) => pack.id);
  state.coinsEarned = Math.max(0, Math.round(spec.completedOrders * 280));
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
  state.generatorWarehouse = emptyGeneratorWarehouse();
  state.innLevel = spec.innLevel;
  state.ownedFurniture = [];
  state.placedFurniture = Array(6).fill(null);
  state.currentPage = "board";
  state.tutorialStep = spec.completedOrders ? 5 : 0;
  state.selectedIndex = null;
  state.lastTick = Date.now();
}

function initializeUpgradeRevealQaScenario() {
  const completedMilestones = state.progressionConfig.milestones.filter(
    (milestone) => milestoneInnLevel(milestone) < UPGRADE_REVEAL_QA_LEVEL,
  );
  state.innLevel = UPGRADE_REVEAL_QA_LEVEL;
  state.renovationChoices = Object.fromEntries(
    completedMilestones.map((milestone) => [milestone.id, "completed"]),
  );
  state.activeRepairId = null;
  state.activeChapterStory = null;
  state.currentPage = "inn";
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
  state.completedOrderIds = ["order_003_sogdian_humabing"];
  state.answeredHistoricalNoteIds = [];
  state.historicalNoteRewards = {};
  state.splitterIntroRewardClaimed = false;
  state.shopFoodItemIds = null;
  state.innLevel = VOLUME_START_LEVELS[STORY_ARCHIVE_QA_CHAPTER];
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
  state.coins = 99990;
  state.innLevel = Math.max(...chapterMilestones.map(milestoneInnLevel));
  state.currentPage = "inn";
}

function initializeLongscrollCastQaScenario() {
  initializeLongscrollCastQaScene(LONGSCROLL_CAST_QA_SCENE);
  if (LONGSCROLL_FINALE_QA_MODE) {
    const finalMilestone = state.progressionConfig.milestones.find((entry) => entry.id === FINAL_REPAIR_MILESTONE_ID);
    if (finalMilestone) state.renovationChoices[finalMilestone.id] = "completed";
  }
}

function initializeNewPlayerGuideQaScenario() {
  state.board = Array(BOARD_SIZE).fill(null);
  state.board[starterGeneratorIndex()] = "gen_mill_01";
  if (NEW_PLAYER_GUIDE_QA_STAGE === "board-full") {
    for (let row = ACTIVE_BOARD_START_ROW; row < ACTIVE_BOARD_START_ROW + ACTIVE_BOARD_ROWS; row += 1) {
      for (let col = ACTIVE_BOARD_START_COL; col < ACTIVE_BOARD_START_COL + ACTIVE_BOARD_COLUMNS; col += 1) {
        const index = boardIndex(row, col);
        if (!state.board[index]) state.board[index] = (row + col) % 2 ? "hubing_01_dough" : "hubing_02_lubing";
      }
    }
    state.board[23] = "dairy_06_milao";
    state.completedOrderIds = ["order_001_guard_lubing"];
    state.completedOrders = 3;
    state.tutorialStep = 5;
    state.currentPage = "board";
  } else if (NEW_PLAYER_GUIDE_QA_STAGE === "locked-merge") {
    state.completedOrderIds = [];
    state.completedOrders = 0;
    state.tutorialStep = 0;
    state.currentPage = "board";
  } else {
    state.tutorialStep = 0;
    state.currentPage = "inn";
  }
  state.unlockedCells = [];
  state.selectedIndex = null;
  state.stamina = state.staminaConfig.initial.startValue;
  state.staminaMax = state.staminaConfig.initial.max;
}

function initializeLongscrollCastQaScene(sceneNumber) {
  const milestones = state.progressionConfig.milestones;
  const currentIndex = Math.min(milestones.length - 1, Math.max(0, sceneNumber - 1));
  const currentMilestone = milestones[currentIndex];
  const currentChapter = currentMilestone?.chapter ?? 1;
  const completedMilestones = milestones.slice(0, Math.max(0, currentIndex));
  state.renovationChoices = Object.fromEntries(
    completedMilestones.map((milestone) => [milestone.id, "completed"]),
  );
  state.storyFlags = {};
  for (let chapter = 1; chapter <= currentChapter; chapter += 1) {
    const openingId = chapter === 1 ? "opening" : `chapter${chapter}-opening`;
    state.storyFlags[chapterStoryFlag(openingId)] = true;
    state.storyFlags[`chapter${chapter}StoryOpeningSeen`] = true;
  }
  completedMilestones.forEach((milestone) => {
    state.storyFlags[chapterStoryFlag(`before:${milestone.id}`)] = true;
    state.storyFlags[chapterStoryFlag(`after:${milestone.id}`)] = true;
  });
  state.claimedChapterRewards = Array.from(
    { length: Math.max(0, currentChapter - 1) },
    (_, index) => index + 1,
  );
  state.activeRepairId = null;
  state.repairProgress = {};
  state.activeChapterStory = null;
  state.repairPromptedFor = [];
  state.answeredHistoricalNoteIds = [];
  state.historicalNoteRewards = {};
  state.splitterIntroRewardClaimed = false;
  state.completedOrders = Math.max(999, state.completedOrders);
  state.coins = 99990;
  state.innLevel = milestoneInnLevel(currentMilestone);
  state.currentPage = "inn";
  state.tutorialStep = 5;
}

function previewLongscrollRepairRenewal(sceneNumber) {
  initializeLongscrollCastQaScene(sceneNumber);
  const milestone = state.progressionConfig.milestones[sceneNumber - 1];
  if (!milestone) return;
  state.renovationChoices[milestone.id] = "completed";
  const historicalNote = historicalNoteForRepair(milestone.id);
  if (LONGSCROLL_NOTE_FLOW_QA_MODE && historicalNote) {
    state.answeredHistoricalNoteIds = unlockedHistoricalNotes()
      .map((note) => note.id)
      .filter((noteId) => noteId !== historicalNote.id);
  }
  repairReturnCastMilestoneId = milestone.id;
  lastInnFocusKey = null;
  lastLongscrollCharacterSceneKey = null;
  render();
  renderLongscrollCastQaNav();
  centerInnSceneOnPosition(milestone.longscrollRegionIds);
  playRepairCompleteEffect(milestone);
}

function renderLongscrollCastQaNav() {
  if (!LONGSCROLL_CAST_QA_MODE) return;
  let nav = document.querySelector(".longscroll-cast-qa-nav");
  if (!nav) {
    nav = document.createElement("nav");
    nav.className = "longscroll-cast-qa-nav";
    nav.setAttribute("aria-label", "主线人物场景预览");
    nav.innerHTML = `
      <button type="button" data-cast-step="-1" aria-label="上一个地点">‹</button>
      <small data-cast-label></small>
      <button type="button" data-cast-step="1" aria-label="下一个地点">›</button>`;
    els.innPage.append(nav);
    nav.querySelectorAll("[data-cast-step]").forEach((button) => {
      button.addEventListener("click", () => {
        const activeScene = Math.max(1, Math.min(
          LONGSCROLL_CAST_QA_SCENE_MAX,
          Number(new URLSearchParams(location.search).get("scene")) || 1,
        ));
        const sceneNumber = Math.max(1, Math.min(
          LONGSCROLL_CAST_QA_SCENE_MAX,
          activeScene + Number(button.dataset.castStep),
        ));
        const url = new URL(location.href);
        url.searchParams.set("scene", String(sceneNumber));
        history.replaceState(null, "", url);
        if (LONGSCROLL_RENEWAL_QA_MODE) {
          previewLongscrollRepairRenewal(sceneNumber);
          return;
        }
        initializeLongscrollCastQaScene(sceneNumber);
        lastInnFocusKey = null;
        lastLongscrollCharacterSceneKey = null;
        render();
        renderLongscrollCastQaNav();
        focusLongscrollCastQaScene(sceneNumber);
      });
    });
  }
  const activeScene = Math.max(1, Math.min(
    LONGSCROLL_CAST_QA_SCENE_MAX,
    Number(new URLSearchParams(location.search).get("scene")) || 1,
  ));
  const milestone = state.progressionConfig.milestones[activeScene - 1];
  const label = nav.querySelector("[data-cast-label]");
  if (label) label.textContent = `${activeScene}/${LONGSCROLL_CAST_QA_SCENE_MAX} · ${milestone?.sceneName ?? milestone?.name ?? "主线地点"}`;
  nav.querySelectorAll("[data-cast-step]").forEach((button) => {
    const step = Number(button.dataset.castStep);
    button.disabled = (step < 0 && activeScene === 1)
      || (step > 0 && activeScene === LONGSCROLL_CAST_QA_SCENE_MAX);
  });
}

function focusLongscrollCastQaScene(sceneNumber, { instant = false } = {}) {
  if (!LONGSCROLL_CAST_QA_MODE || state.currentPage !== "inn") return;
  const milestones = getMilestoneViews();
  const sceneIndex = Math.min(milestones.length - 1, Math.max(0, sceneNumber - 1));
  const milestone = milestones[sceneIndex];
  const cast = milestone ? LONGSCROLL_LOCATION_CAST[milestone.id] : null;
  if (!cast) return;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const map = els.innScene.querySelector(".longscroll-map");
    const characters = [...els.innScene.querySelectorAll(".longscroll-character")];
    if (!map || !characters.length) return;
    const mapRect = map.getBoundingClientRect();
    const sceneRect = els.innScene.getBoundingClientRect();
    const bounds = characters.map((character) => character.getBoundingClientRect());
    const focusX = (Math.min(...bounds.map((rect) => rect.left)) + Math.max(...bounds.map((rect) => rect.right))) / 2;
    const focusY = (Math.min(...bounds.map((rect) => rect.top)) + Math.max(...bounds.map((rect) => rect.bottom))) / 2;
    const scaleX = mapRect.width / map.offsetWidth || 1;
    const scaleY = mapRect.height / map.offsetHeight || 1;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    els.innScene.scrollTo({
      left: Math.max(0, els.innScene.scrollLeft + (focusX - (sceneRect.left + sceneRect.width / 2)) / scaleX),
      top: Math.max(0, els.innScene.scrollTop + (focusY - (sceneRect.top + sceneRect.height * 0.48)) / scaleY),
      behavior: instant || reducedMotion ? "auto" : "smooth",
    });
  }));
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
  state.coins = 99990;
  state.innLevel = milestoneInnLevel(milestone);
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
  const completedRegionIds = milestones
    .filter((milestone) => selectedRenovationChoice(milestone))
    .flatMap((milestone) => milestone.longscrollRegionIds);
  const next = nextRepairMilestone();
  const assets = [LONGSCROLL_REPAIRED_SOURCE];
  if (next) {
    [...completedRegionIds, ...next.longscrollRegionIds]
      .forEach((regionId) => assets.push(longscrollMaskSrc(regionId)));
  }
  const locationCast = next ? LONGSCROLL_LOCATION_CAST[next.id] : null;
  if (locationCast) {
    assets.push(LONGSCROLL_KEEPER_STANDEE);
    if (next.npcId) assets.push(longscrollStandeeSrc(next.npcId));
  }
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
    updateStartupLoading(56, "正在进入");
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
  registerBonusStaminaItems();
  registerOrderProgressPacks();
  codex.entries.forEach((entry) => {
    codexById.set(entry.id, entry);
    codexByItemId.set(entry.itemId, entry);
  });

  loadState();
  initAudio();
  if (!ISOLATED_QA_MODE || GLOBAL_LOADING_QA_MODE) state.currentPage = "inn";
  const startupAssets = [...new Set([...STARTUP_REQUIRED_ASSETS, ...currentInnStartupAssets()])];
  await loadStartupGroup(
    startupAssets.map((url) => () => preloadImage(url)),
    60,
    96,
    "正在进入",
  );
  innPackageLoaded = true;
  updateStartupLoading(98, "正在点亮驿站灯火");
  render();
  renderLongscrollCastQaNav();
  bindEvents();
  renderUpgradeToolQaControls();
  applyBuildMode();
  await waitForStartupPaint();
  await finishStartupLoading();
  if (state.currentPage === "board") tickGenerators();
  if (DAILY_SHOP_QA_MODE) setTimeout(openDailyShop, 100);
  if (WEEKLY_CHECKIN_PREVIEW) setTimeout(openWeeklyCheckin, 100);
  if (CARAVAN_RENOWN_QA_MODE) setTimeout(openCaravanRenown, 100);
  if (UPGRADE_REVEAL_QA_MODE) setTimeout(() => playInnUpgradeReveal(UPGRADE_REVEAL_QA_LEVEL), 80);
  if (LONGSCROLL_CAST_QA_UNLOCK) setTimeout(maybePromptRepairGuide, 80);
  if (LONGSCROLL_RENEWAL_QA_MODE) setTimeout(() => previewLongscrollRepairRenewal(LONGSCROLL_CAST_QA_SCENE), 180);
  if (LONGSCROLL_FINALE_QA_MODE) setTimeout(() => showInnFinale({ force: true }), 180);
  if (REPAIR_PROGRESS_QA_MODE) setTimeout(openRepairProgressQaScenario, 80);
  if (WEEKLY_CHECKIN_PREVIEW) {
    // Keep the inn clear while the weekly check-in preview is open.
  } else if (STORY_ARCHIVE_QA_AUTOPEN) {
    setTimeout(() => openStoryArchive(STORY_ARCHIVE_QA_CHAPTER), 80);
  } else if (CHAPTER_STORY_QA_MODE) {
    setTimeout(() => window.SilkRoadChapterStory?.playChapterQa(CHAPTER_STORY_QA_CHAPTER, CHAPTER_STORY_QA_SCENE), 80);
  } else if (CHAPTER_STORY_PREVIEW) {
    setTimeout(() => playChapterStory(CHAPTER_STORY_PREVIEW, null, { force: true }), 80);
  } else if (!ISOLATED_QA_MODE && state.activeChapterStory) {
    setTimeout(resumeActiveChapterStory, 80);
  } else if (!ISOLATED_QA_MODE && !state.storyFlags.chapter1StoryOpeningSeen && state.completedOrders === 0 && Object.keys(state.renovationChoices).length === 0) {
    setTimeout(() => playChapterStory("opening", maybePromptRepairGuide), 80);
  } else if (!ISOLATED_QA_MODE && pendingChapterOpeningId()) {
    setTimeout(() => playChapterStory(pendingChapterOpeningId(), maybePromptRepairGuide), 80);
  } else if (!ISOLATED_QA_MODE && pendingInnUpgradeRevealLevel) {
    setTimeout(showPendingInnUpgradeReveal, 80);
  } else if (!ISOLATED_QA_MODE && shouldShowInnFinale()) {
    setTimeout(showInnFinale, 120);
  } else if (!ISOLATED_QA_MODE) {
    setTimeout(maybePromptRepairGuide, 120);
  }
  if (FOOD_CODEX_PREVIEW) setTimeout(openCodex, 120);
  setInterval(tickStamina, 1000);
}

function startingCoinBalance() {
  const configured = Number(state.economyConfig?.currency?.startingBalance);
  return Number.isFinite(configured) ? Math.max(0, Math.floor(configured)) : 0;
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

function currentDailyShopCycle(now = Date.now()) {
  return Math.floor(now / DAILY_SHOP_REFRESH_MS);
}

function nextDailyShopRefreshAt(now = Date.now()) {
  return (currentDailyShopCycle(now) + 1) * DAILY_SHOP_REFRESH_MS;
}

function syncDailyShopCycle(now = Date.now()) {
  const cycle = currentDailyShopCycle(now);
  let changed = state.shopPurchaseCycle !== cycle;
  if (changed) {
    state.shopPurchaseCycle = cycle;
    state.shopPurchasedOfferIds = [];
    state.shopFoodItemIds = DAILY_SHOP_QA_EMPTY ? [] : null;
  }
  if (!Array.isArray(state.shopFoodItemIds)) {
    const candidates = [...byId.values()].filter((item) =>
      SHOP_FOOD_PRICES[item.level]
      && ["hubing", "dairy", "fruit", "drink", "meat", "spice"].includes(item.line)
      && (DAILY_SHOP_QA_MODE || STORY_ARCHIVE_QA_MODE || orderDemandLinesUnlocked({ demand: [{ itemId: item.id }] })));
    for (let i = candidates.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
    }
    const unlockedLineCount = new Set(candidates.map((item) => item.line)).size;
    const offerLimit = unlockedLineCount <= 1 ? 3 : 6;
    state.shopFoodItemIds = candidates.slice(0, offerLimit).map((item) => item.id);
    changed = true;
  }
  return changed;
}

function dailyShopOffers() {
  return [...DAILY_SHOP_OFFERS, ...(state.shopFoodItemIds ?? []).map((itemId) => {
    const item = byId.get(itemId);
    return { id: `food:${itemId}`, itemId, name: item.name, price: SHOP_FOOD_PRICES[item.level] };
  })];
}

function renderShopFoodShelves() {
  const host = document.querySelector("#dailyShopFoodShelves");
  if (!host) return;
  const ids = state.shopFoodItemIds ?? [];
  const stall = host.closest(".daily-shop-stall");
  const baseOnly = ids.length === 0;
  stall?.classList.toggle("is-base-only", baseOnly);
  stall?.closest(".daily-shop-inner")?.classList.toggle("is-base-only", baseOnly);
  const key = JSON.stringify(ids);
  if (host.dataset.catalog === key) return;
  host.dataset.catalog = key;
  host.replaceChildren();
  ids.forEach((itemId, index) => {
    if (index % 3 === 0) {
      const shelf = document.createElement("div");
      shelf.className = "daily-shop-shelf";
      const title = document.createElement("div");
      title.className = "daily-shop-section-title";
      title.textContent = index === 0 ? "行商好物 · 每16小时换货" : "行商好物";
      shelf.append(title);
      host.append(shelf);
    }
    const item = byId.get(itemId);
    const card = document.createElement("article");
    card.className = "daily-shop-card";
    card.dataset.shopOffer = `food:${itemId}`;
    const name = document.createElement("strong");
    name.textContent = item.name;
    const detail = document.createElement("button");
    detail.type = "button";
    detail.className = "daily-shop-detail";
    detail.dataset.shopDetail = `food:${itemId}`;
    detail.setAttribute("aria-label", `查看${item.name}详情`);
    const img = document.createElement("img");
    img.src = itemAssetSrc(item);
    img.alt = "";
    detail.append(img);
    const level = document.createElement("small");
    level.textContent = `${item.level}级`;
    const stock = document.createElement("small");
    stock.dataset.shopStock = "";
    const buy = document.createElement("button");
    buy.type = "button";
    buy.dataset.shopBuy = "";
    buy.innerHTML = '<i class="ruby-icon" aria-hidden="true"></i><span></span>';
    card.append(name, detail, level, stock, buy);
    host.lastElementChild.append(card);
  });
  host.querySelectorAll(".daily-shop-shelf").forEach((shelf) => {
    shelf.dataset.itemCount = String(shelf.querySelectorAll(".daily-shop-card").length);
  });
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

function normalizeProductionMultiplier(value) {
  const multiplier = Math.floor(Number(value) || 1);
  return PRODUCTION_MULTIPLIERS.includes(multiplier) ? multiplier : 1;
}

function availableProductionMultipliers() {
  const highestDiscoveredLevel = Math.max(0, ...Object.values(state.unlockedFoodLevels)
    .map((level) => Math.max(0, Math.floor(Number(level) || 0))));
  const available = [1];
  if (highestDiscoveredLevel >= 2 || state.innLevel >= 3) available.push(2);
  if (state.innLevel >= 3) available.push(4);
  return available;
}

function effectiveProductionMultiplier() {
  const available = availableProductionMultipliers();
  const selected = normalizeProductionMultiplier(state.productionMultiplier);
  return available.includes(selected) ? selected : available[available.length - 1];
}

function productionOutputLevel(multiplier = effectiveProductionMultiplier()) {
  return multiplier === 4 ? 3 : multiplier;
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
  state.board.forEach((itemId, index) => {
    if (isBoardCellLocked(index)) return;
    if (itemId) changed = rememberUnlockedFoodItem(itemId) || changed;
  });
  state.bag.forEach((itemId) => {
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
  return changed;
}

function repairPartCosts(milestone) {
  const configuredCosts = Array.isArray(milestone?.repairParts)
    ? milestone.repairParts.map((part) => Math.max(0, Math.floor(Number(part?.cost) || 0)))
    : [];
  if (configuredCosts.length === REPAIR_PART_COUNT
    && configuredCosts.every((cost, index) => (
      milestone?.id === "tutorial_complete" && index === 0
        ? cost === 10
        : cost >= 100 && cost <= 300
    ))) {
    return configuredCosts;
  }
  const milestones = state.progressionConfig?.milestones ?? [];
  const milestoneIndex = Math.max(0, milestones.findIndex((entry) => entry.id === milestone?.id));
  const progress = milestones.length > 1 ? milestoneIndex / (milestones.length - 1) : 0;
  const baseCost = 100 + Math.round((progress * 120) / 10) * 10;
  const costs = REPAIR_PART_COST_STEPS.map((step) => Math.min(300, baseCost + step));
  if (milestone?.id === "tutorial_complete") costs[0] = 10;
  return costs;
}

function normalizeRepairPartIndex(value) {
  if (Number.isInteger(value) && value >= 0 && value < REPAIR_PART_COUNT) return value;
  if (typeof value !== "string") return null;
  const match = value.match(/(\d{1,2})$/);
  if (!match) return null;
  const oneBasedIndex = Number(match[1]);
  return oneBasedIndex >= 1 && oneBasedIndex <= REPAIR_PART_COUNT ? oneBasedIndex - 1 : null;
}

function normalizeRepairCompletedParts(value) {
  if (!Array.isArray(value)) return [];
  return [...new Set(value.map(normalizeRepairPartIndex).filter((index) => index !== null))]
    .sort((left, right) => left - right);
}

function firstIncompleteRepairPart(completedParts) {
  const completed = new Set(normalizeRepairCompletedParts(completedParts));
  for (let index = 0; index < REPAIR_PART_COUNT; index += 1) {
    if (!completed.has(index)) return index;
  }
  return null;
}

function normalizeRepairProgress(value, { activeRepairId, renovationChoices, migrateLegacyPrepayment }) {
  const source = value && typeof value === "object" && !Array.isArray(value) ? value : {};
  const normalized = {};
  (state.progressionConfig?.milestones ?? []).forEach((milestone) => {
    const savedProgress = source[milestone.id] && typeof source[milestone.id] === "object"
      ? source[milestone.id]
      : {};
    const completedMilestone = Boolean(renovationChoices[milestone.id]);
    const completedParts = completedMilestone
      ? Array.from({ length: REPAIR_PART_COUNT }, (_, index) => index)
      : normalizeRepairCompletedParts(savedProgress.completedParts ?? savedProgress.completedPartIds);
    const partCosts = repairPartCosts(milestone);
    const remainingCost = partCosts.reduce(
      (sum, cost, index) => sum + (completedParts.includes(index) ? 0 : cost),
      0,
    );
    const migratedPrepayment = migrateLegacyPrepayment && activeRepairId === milestone.id
      ? repairCost(milestone)
      : Number(savedProgress.prepaidRemaining);
    const prepaidRemaining = completedMilestone
      ? 0
      : Math.min(remainingCost, Math.max(0, Math.floor(Number.isFinite(migratedPrepayment) ? migratedPrepayment : 0)));
    if (completedMilestone
      || completedParts.length
      || prepaidRemaining
      || activeRepairId === milestone.id
      || Object.prototype.hasOwnProperty.call(source, milestone.id)) {
      normalized[milestone.id] = {
        pointId: milestone.playerPointId,
        completedParts,
        prepaidRemaining,
      };
    }
  });
  return normalized;
}

function normalizeHistoricalNoteRewards(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  const validNoteIds = new Set(HISTORICAL_NOTES.map((note) => note.id));
  return Object.fromEntries(Object.entries(value)
    .filter(([noteId, reward]) => validNoteIds.has(noteId) && reward && typeof reward === "object")
    .map(([noteId, reward]) => {
      const legacyItemIds = Array.isArray(reward.itemIds)
        ? reward.itemIds.filter((itemId) => typeof itemId === "string")
        : [];
      const bags = Array.isArray(reward.bags)
        ? reward.bags
          .filter(Array.isArray)
          .map((bag) => bag.filter((itemId) => typeof itemId === "string").slice(0, 3))
          .filter((bag) => bag.length > 0)
          .slice(0, 2)
        : (legacyItemIds.length ? [legacyItemIds.slice(0, 3)] : []);
      return [noteId, {
        schemaVersion: HISTORICAL_REWARD_SCHEMA_VERSION,
        bags,
        itemIds: bags.flat(),
        openedBagIndexes: Array.isArray(reward.openedBagIndexes)
          ? [...new Set(reward.openedBagIndexes
            .map((index) => Math.floor(Number(index)))
            .filter((index) => index >= 0 && index < bags.length))]
          : [],
        chosenIndex: Math.max(0, Math.floor(Number(reward.chosenIndex) || 0)),
        correct: Boolean(reward.correct),
        claimed: Boolean(reward.claimed),
      }];
    })
    .filter(([, reward]) => reward.itemIds.length > 0));
}

function createCaravanRenownEvent(round = 1) {
  return {
    schemaVersion: CARAVAN_RENOWN_SCHEMA_VERSION,
    round: Math.max(1, Math.floor(Number(round) || 1)),
    progress: 0,
    target: CARAVAN_RENOWN_TARGET,
    markedOrderIds: [],
    recentFoodLines: [],
    rewardItemIds: [],
    claimed: false,
  };
}

function normalizeCaravanRenown(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const target = CARAVAN_RENOWN_TARGET;
  return {
    schemaVersion: CARAVAN_RENOWN_SCHEMA_VERSION,
    round: Math.max(1, Math.floor(Number(value.round) || 1)),
    progress: Math.max(0, Math.min(target, Math.floor(Number(value.progress) || 0))),
    target,
    markedOrderIds: Array.isArray(value.markedOrderIds)
      ? [...new Set(value.markedOrderIds.filter((orderId) => typeof orderId === "string"))]
      : [],
    recentFoodLines: Array.isArray(value.recentFoodLines)
      ? [...new Set(value.recentFoodLines.filter((line) => foodLineMaxLevels.has(line)))].slice(-6)
      : [],
    rewardItemIds: Array.isArray(value.rewardItemIds)
      ? value.rewardItemIds.filter((itemId) => byId.has(itemId)).slice(0, CARAVAN_RENOWN_REWARD_COUNT)
      : [],
    claimed: Boolean(value.claimed),
  };
}

function caravanRenownUnlocked() {
  return CARAVAN_RENOWN_QA_MODE
    || state.completedOrders >= CARAVAN_RENOWN_UNLOCK_ORDERS
    || state.innLevel >= 2;
}

function caravanRenownIsComplete(event = state.caravanRenown) {
  return Boolean(event) && event.progress >= event.target;
}

function caravanRenownIsActive(event = state.caravanRenown) {
  return caravanRenownUnlocked() && Boolean(event);
}

function syncCaravanRenownState() {
  if (!caravanRenownUnlocked()) return false;
  let changed = false;
  if (!state.caravanRenown) {
    state.caravanRenown = createCaravanRenownEvent();
    changed = true;
  }
  if (state.caravanRenown.claimed) {
    state.caravanRenown = createCaravanRenownEvent(state.caravanRenown.round + 1);
    changed = true;
  }
  if (caravanRenownIsComplete(state.caravanRenown)
    && !state.caravanRenown.claimed
    && state.caravanRenown.rewardItemIds.length < CARAVAN_RENOWN_REWARD_COUNT) {
    state.caravanRenown.rewardItemIds = buildCaravanRenownRewardItems(state.caravanRenown);
    changed = true;
  }
  return changed;
}

function initializeCaravanRenownQaScenario() {
  state.currentPage = "board";
  state.innLevel = 2;
  state.completedOrders = 12;
  state.unlockedFoodLevels = { ...state.unlockedFoodLevels, hubing: 4 };
  ["codex_hubing_02", "codex_hubing_03", "codex_hubing_04"].forEach((id) => state.unlockedCodex.add(id));
  state.visibleOrders = [
    "order_012_changan_maid_lubing",
    "order_exp_goal_001",
    "order_lv4_south_shed_stocking",
    "order_ch1_variant_04_mill_humabing",
  ];
  state.board = Array(BOARD_SIZE).fill(null);
  state.board[starterGeneratorIndex()] = "gen_mill_01";
  const previewFoodIndices = [
    boardIndex(ACTIVE_BOARD_START_ROW, ACTIVE_BOARD_START_COL),
    boardIndex(ACTIVE_BOARD_START_ROW, ACTIVE_BOARD_START_COL + 1),
    boardIndex(ACTIVE_BOARD_START_ROW, ACTIVE_BOARD_START_COL + 2),
    boardIndex(ACTIVE_BOARD_START_ROW + 1, ACTIVE_BOARD_START_COL),
  ];
  ["hubing_02_lubing", "hubing_02_lubing", "hubing_03_humabing", "hubing_04_youhubing"]
    .forEach((itemId, offset) => {
      state.board[previewFoodIndices[offset]] = itemId;
    });
  state.caravanRenown = createCaravanRenownEvent();
  state.caravanRenown.progress = CARAVAN_RENOWN_QA_STAGE === "complete" ? CARAVAN_RENOWN_TARGET : 8;
  state.caravanRenown.recentFoodLines = ["hubing"];
  if (CARAVAN_RENOWN_QA_STAGE === "complete") {
    state.caravanRenown.rewardItemIds = buildCaravanRenownRewardItems(state.caravanRenown);
  }
  if (CARAVAN_RENOWN_QA_FULL_BOARD) {
    state.board = state.board.map((itemId, index) => (
      isInitialActiveCell(index) ? itemId ?? "hubing_01_dough" : itemId
    ));
  }
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
    storedGiftBoxStates: {},
    splitterToolCharges: {},
    bubbleStates: {},
    unlockedCells: [],
    visibleOrders: [REPAIR_GATE_SEQUENCE[0]],
    unlockedCodex: ["codex_hubing_01"],
    unlockedFoodLevels: { hubing: 1 },
    foodDiscoverySchemaVersion: FOOD_DISCOVERY_SCHEMA_VERSION,
    coins: startingCoinBalance(),
    gems: startingGemBalance(),
    stamina: state.staminaConfig.initial.startValue,
    staminaMax: state.staminaConfig.initial.max,
    productionMultiplier: 1,
    recoverMinutes: STAMINA_RECOVERY_MINUTES,
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
    answeredHistoricalNoteIds: [],
    historicalNoteRewards: {},
    splitterIntroRewardClaimed: false,
    renovationChoices: {},
    repairProgress: {},
    activeRepairId: null,
    activeChapterStory: null,
    repairPromptedFor: [],
    generatorStates: {},
    unlockedGeneratorCategories: ["mill"],
    pendingGeneratorRewards: [],
    generatorWarehouse: emptyGeneratorWarehouse(),
    storageGuideVersion: 0,
    generatorWarehouseGuideSeen: false,
    unlockedStorageSlots: STORAGE_FREE_SLOTS,
    staminaPurchaseDay: currentLocalDayKey(),
    staminaPurchasesToday: 0,
    dailyPouchClaimDay: "",
    weeklyCheckinClaimedDays: 0,
    weeklyCheckinLastClaimDay: "",
    weeklyCheckinRound: 1,
    caravanRenown: null,
    shopPurchaseCycle: currentDailyShopCycle(),
    shopPurchasedOfferIds: [],
  shopFoodItemIds: null,
    innLevel: 1,
    innLevelSchemaVersion: INN_LEVEL_SCHEMA_VERSION,
    ownedFurniture: [],
    placedFurniture: Array(6).fill(null),
    currentPage: "board",
    tutorialStep: 0,
    lastTick: Date.now(),
  };
}

function normalizeInnLevel(savedLevel, savedSchemaVersion, renovationChoices = {}) {
  if (Number(savedSchemaVersion) >= INN_LEVEL_SCHEMA_VERSION) {
    return Math.max(1, Math.min(MAX_INN_LEVEL, Math.trunc(Number(savedLevel)) || 1));
  }
  const completed = renovationChoices && typeof renovationChoices === "object" ? renovationChoices : {};
  const hasRepairHistory = Object.values(completed).some(Boolean);
  if (!hasRepairHistory) {
    return ({ 1: 1, 2: 3, 3: 6, 4: 9 })[Math.trunc(Number(savedLevel))] ?? 1;
  }
  let migratedLevel = 1;
  for (let candidate = 1; candidate < MAX_INN_LEVEL; candidate += 1) {
    const required = state.progressionConfig.milestones.filter((milestone) => milestoneInnLevel(milestone) <= candidate);
    if (!required.length || required.some((milestone) => !completed[milestone.id])) break;
    migratedLevel = candidate + 1;
  }
  return migratedLevel;
}

function loadState() {
  if (FULL_GAME_TRIAL_RESET || PROGRESSION_FLOW_QA_RESET || GENERATOR_CHAIN_QA_RESET || DAILY_SHOP_QA_RESET || CARAVAN_RENOWN_QA_RESET || SCISSORS_TOOL_QA_RESET || UPGRADE_TOOL_QA_RESET) {
    localStorage.removeItem(SAVE_KEY);
  }
  const saved = localStorage.getItem(SAVE_KEY);
  const data = saved ? JSON.parse(saved) : defaultState();
  const generatorGiftMigration = Boolean(saved) && !data.generatorGiftProgressionVersion;
  const foodDiscoveryNeedsMigration = Boolean(saved)
    && Number(data.foodDiscoverySchemaVersion || 0) < FOOD_DISCOVERY_SCHEMA_VERSION;
  const legacyStorageHasGenerators = Array.isArray(data.bag)
    && data.bag.some((itemId) => isGeneratorPiece(byId.get(migrateLegacyGeneratorId(itemId))));
  const savedCoinEconomyVersion = Number(data.coinEconomyVersion);
  const openingStaminaNeedsMigration = Boolean(saved)
    && !ISOLATED_QA_MODE
    && Number(data.openingStaminaVersion || 0) < OPENING_STAMINA_VERSION;
  const openingCopperNeedsMigration = Boolean(saved)
    && !ISOLATED_QA_MODE
    && Number(data.openingCopperVersion || 0) < OPENING_COPPER_VERSION
    && Number(data.coinEconomyVersion) === COIN_ECONOMY_VERSION
    && LEGACY_OPENING_COPPER.includes(Number(data.coins))
    && Number(data.coinsEarned || 0) === 0
    && Number(data.completedOrders || 0) === 0
    && !data.dailyPouchClaimDay
    && !(Array.isArray(data.ownedFurniture) && data.ownedFurniture.length)
    && !(Array.isArray(data.placedFurniture) && data.placedFurniture.some(Boolean))
    && Object.keys(data.renovationChoices ?? {}).length === 0;
  const coinEconomyNeedsMigration = Boolean(saved)
    && (!Number.isFinite(savedCoinEconomyVersion)
      || savedCoinEconomyVersion < COIN_ECONOMY_VERSION);
  const coinDenominationScale = coinEconomyNeedsMigration ? COIN_DENOMINATION_MULTIPLIER : 1;
  const normalizeSavedCopper = (value, fallback) => {
    if (value === null || value === undefined || value === "") return fallback;
    const amount = Number(value);
    return Number.isFinite(amount)
      ? Math.max(0, Math.round(amount * coinDenominationScale))
      : fallback;
  };
  const persistedCompletedOrderIds = Array.isArray(data.completedOrderIds) ? data.completedOrderIds : [];
  const persistedVisibleOrderIds = Array.isArray(data.visibleOrders) ? data.visibleOrders : [];
  const loadedOrderIds = migrateLegacyOrderIds(persistedCompletedOrderIds);
  const loadedVisibleOrderIds = migrateLegacyOrderIds(persistedVisibleOrderIds);
  const hasLegacyOrderIds = [...persistedCompletedOrderIds, ...persistedVisibleOrderIds]
    .some((orderId) => Boolean(LEGACY_ORDER_ID_MAP[orderId]));
  const hasLegacyStoryFlags = data.storyFlags && typeof data.storyFlags === "object"
    && Object.entries(data.storyFlags).some(([key, enabled]) => enabled && key.startsWith("chapter1Story:"));
  const loadedRenovationChoices = data.renovationChoices && typeof data.renovationChoices === "object"
    ? data.renovationChoices
    : {};
  const persistedActiveRepairId = typeof data.activeRepairId === "string" ? data.activeRepairId : null;
  const activeRepairMilestone = state.progressionConfig?.milestones?.find(
    (milestone) => milestone.id === persistedActiveRepairId,
  );
  const loadedActiveRepairId = activeRepairMilestone && !loadedRenovationChoices[persistedActiveRepairId]
    ? persistedActiveRepairId
    : null;
  const rawRepairProgress = data.repairProgress && typeof data.repairProgress === "object"
    ? data.repairProgress
    : {};
  const persistedRepairProgress = coinEconomyNeedsMigration
    ? Object.fromEntries(Object.entries(rawRepairProgress).map(([repairId, progress]) => {
      if (!progress || typeof progress !== "object"
        || !Object.prototype.hasOwnProperty.call(progress, "prepaidRemaining")) {
        return [repairId, progress];
      }
      return [repairId, {
        ...progress,
        prepaidRemaining: normalizeSavedCopper(progress.prepaidRemaining, 0),
      }];
    }))
    : rawRepairProgress;
  const migrateLegacyRepairPrepayment = Boolean(
    loadedActiveRepairId
    && data.repairProtocolVersion !== REPAIR_PROTOCOL_VERSION
    && !Object.prototype.hasOwnProperty.call(persistedRepairProgress, loadedActiveRepairId),
  );
  const loadedRepairProgress = normalizeRepairProgress(persistedRepairProgress, {
    activeRepairId: loadedActiveRepairId,
    renovationChoices: loadedRenovationChoices,
    migrateLegacyPrepayment: migrateLegacyRepairPrepayment,
  });
  const repairStateNeedsMigration = data.repairProtocolVersion !== REPAIR_PROTOCOL_VERSION
    || loadedActiveRepairId !== persistedActiveRepairId
    || JSON.stringify(loadedRepairProgress) !== JSON.stringify(persistedRepairProgress);
  const loadedBag = normalizeStorageSlots(data.bag, data.unlockedStorageSlots)
    .map((itemId) => isGeneratorPiece(byId.get(itemId)) ? null : itemId);
  Object.assign(state, {
    board: normalizeBoard(data.board),
    bag: loadedBag,
    rewardItems: normalizeRewardItems(data.rewardItems),
    giftPacks: normalizeGiftPacks(data.giftPacks),
    giftBoxStates: normalizeGiftBoxStates(data.giftBoxStates),
    storedGiftBoxStates: normalizeStoredGiftBoxStates(data.storedGiftBoxStates, loadedBag),
    splitterToolCharges: normalizeSplitterToolCharges(data.splitterToolCharges, data.board),
    bubbleStates: normalizeBubbleStates(data.bubbleStates),
    unlockedCells: normalizeUnlockedCells(data.unlockedCells),
    visibleOrders: loadedVisibleOrderIds.length ? loadedVisibleOrderIds : defaultState().visibleOrders,
    unlockedCodex: new Set(data.unlockedCodex?.length ? data.unlockedCodex : ["codex_hubing_01"]),
    unlockedFoodLevels: foodDiscoveryNeedsMigration ? {} : normalizeUnlockedFoodLevels(data.unlockedFoodLevels),
    foodDiscoverySchemaVersion: FOOD_DISCOVERY_SCHEMA_VERSION,
    coins: openingCopperNeedsMigration
      ? startingCoinBalance()
      : normalizeSavedCopper(data.coins, startingCoinBalance()),
    gems: data.gems ?? startingGemBalance(),
    stamina: openingStaminaNeedsMigration
      ? Math.min(
        Math.max(data.staminaMax ?? state.staminaConfig.initial.max, state.staminaConfig.initial.max),
        Math.max(0, Number(data.stamina ?? LEGACY_OPENING_STAMINA) || 0)
          + Math.max(0, state.staminaConfig.initial.startValue - LEGACY_OPENING_STAMINA),
      )
      : data.stamina ?? state.staminaConfig.initial.startValue,
    staminaMax: Math.max(data.staminaMax ?? state.staminaConfig.initial.max, state.staminaConfig.initial.max),
    productionMultiplier: normalizeProductionMultiplier(data.productionMultiplier),
    recoverMinutes: STAMINA_RECOVERY_MINUTES,
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
    coinsEarned: normalizeSavedCopper(data.coinsEarned, 0),
    storyFlags: normalizeStoryFlags(data.storyFlags),
    answeredHistoricalNoteIds: Array.isArray(data.answeredHistoricalNoteIds) ? data.answeredHistoricalNoteIds : [],
    historicalNoteRewards: normalizeHistoricalNoteRewards(data.historicalNoteRewards),
    splitterIntroRewardClaimed: Boolean(data.splitterIntroRewardClaimed)
      || Object.values(data.historicalNoteRewards ?? {}).some((reward) =>
        (Array.isArray(reward?.itemIds) && reward.itemIds.includes(SPLITTER_TOOL_ITEM_ID))
        || (Array.isArray(reward?.bags) && reward.bags.some((bag) =>
          Array.isArray(bag) && bag.includes(SPLITTER_TOOL_ITEM_ID)))),
    renovationChoices: loadedRenovationChoices,
    repairProgress: loadedRepairProgress,
    activeRepairId: loadedActiveRepairId,
    activeChapterStory: normalizeActiveChapterStory(data.activeChapterStory),
    repairPromptedFor: Array.isArray(data.repairPromptedFor) ? data.repairPromptedFor : [],
    generatorStates: normalizeGeneratorStates(data.generatorStates),
    unlockedGeneratorCategories: normalizeUnlockedGeneratorCategories(data.unlockedGeneratorCategories, data),
    pendingGeneratorRewards: normalizePendingGeneratorRewards(data.pendingGeneratorRewards),
    generatorWarehouse: normalizeGeneratorWarehouse(data.generatorWarehouse, data.bag),
    storageGuideVersion: Math.max(0, Math.floor(Number(data.storageGuideVersion) || 0)),
    generatorWarehouseGuideSeen: data.generatorWarehouseGuideSeen === undefined
      ? Math.max(0, Math.floor(Number(data.storageGuideVersion) || 0)) >= 1
      : Boolean(data.generatorWarehouseGuideSeen),
    unlockedStorageSlots: normalizeUnlockedStorageSlots(data.unlockedStorageSlots, data.bag),
    staminaPurchaseDay: data.staminaPurchaseDay === currentLocalDayKey()
      ? data.staminaPurchaseDay
      : currentLocalDayKey(),
    staminaPurchasesToday: data.staminaPurchaseDay === currentLocalDayKey()
      ? Math.max(0, Math.floor(Number(data.staminaPurchasesToday) || 0))
      : 0,
    dailyPouchClaimDay: typeof data.dailyPouchClaimDay === "string" ? data.dailyPouchClaimDay : "",
    weeklyCheckinClaimedDays: Math.max(0, Math.min(7, Math.floor(Number(data.weeklyCheckinClaimedDays) || 0))),
    weeklyCheckinLastClaimDay: typeof data.weeklyCheckinLastClaimDay === "string" ? data.weeklyCheckinLastClaimDay : "",
    weeklyCheckinRound: Math.max(1, Math.floor(Number(data.weeklyCheckinRound) || 1)),
    caravanRenown: normalizeCaravanRenown(data.caravanRenown),
    shopPurchaseCycle: Number.isInteger(Number(data.shopPurchaseCycle))
      ? Number(data.shopPurchaseCycle)
      : currentDailyShopCycle(),
    shopFoodItemIds: Array.isArray(data.shopFoodItemIds) ? [...new Set(data.shopFoodItemIds)].filter((id) => SHOP_FOOD_PRICES[byId.get(id)?.level] && ["hubing", "dairy", "fruit", "drink", "meat", "spice"].includes(byId.get(id)?.line)).slice(0, 6) : null,
    shopPurchasedOfferIds: Array.isArray(data.shopPurchasedOfferIds)
      ? data.shopPurchasedOfferIds.filter((offerId) => (DAILY_SHOP_OFFERS.some((offer) => offer.id === offerId) || (typeof offerId === "string" && offerId.startsWith("food:"))))
      : [],
    innLevel: normalizeInnLevel(data.innLevel, data.innLevelSchemaVersion, loadedRenovationChoices),
    innLevelSchemaVersion: INN_LEVEL_SCHEMA_VERSION,
    ownedFurniture: Array.isArray(data.ownedFurniture) ? data.ownedFurniture : [],
    placedFurniture: Array.isArray(data.placedFurniture) ? normalizePlacedFurniture(data.placedFurniture) : Array(6).fill(null),
    currentPage: data.currentPage === "inn" ? "inn" : "board",
    tutorialStep: data.tutorialStep ?? 0,
    lastTick: Number.isFinite(Number(data.lastTick)) && Number(data.lastTick) > 0
      ? Math.min(Number(data.lastTick), Date.now())
      : Date.now(),
  });
  if (state.activeChapterStory) {
    const segmentId = state.activeChapterStory.segmentId;
    if (state.storyFlags[`chapterStory:${segmentId}`] || state.storyFlags[`chapter1Story:${segmentId}`]) {
      state.activeChapterStory = null;
    }
  }
  if (GENERATOR_QA_MODE && !saved) initializeGeneratorQaScenario();
  if (GENERATOR_MATERIAL_QA_MODE && !saved) initializeGeneratorMaterialQaScenario();
  if (GENERATOR_CHAIN_QA_MODE && (!saved || GENERATOR_CHAIN_QA_RESET)) initializeGeneratorChainQaScenario();
  if (ORDER_GIFT_QA_MODE && !saved) initializeOrderGiftQaScenario();
  if (RUBY_DISPLAY_QA_MODE) initializeRubyDisplayQaScenario();
  if (STAMINA_POUCH_QA_MODE && (!saved || STAMINA_POUCH_QA_RESET)) initializeStaminaPouchQaScenario();
  if (LV4_MARKET_ORDERS_QA_MODE) initializeLv4MarketOrdersQaScenario();
  if (GENERATOR_ORDER_QA_MODE && (!saved || DAIRY_DROP_DEMO_MODE)) initializeGeneratorOrderQaScenario();
  if (CARAVAN_RENOWN_QA_MODE && (!saved || CARAVAN_RENOWN_QA_RESET)) initializeCaravanRenownQaScenario();
  if (PROGRESSION_FLOW_QA_MODE && !saved) initializeProgressionFlowQaScenario();
  if (UPGRADE_REVEAL_QA_MODE) initializeUpgradeRevealQaScenario();
  if (REPAIR_PROGRESS_QA_MODE) initializeRepairProgressQaScenario();
  if (LONGSCROLL_CAST_QA_MODE) initializeLongscrollCastQaScenario();
  if (SCISSORS_TOOL_QA_MODE && (!saved || SCISSORS_TOOL_QA_RESET)) initializeScissorsToolQaScenario();
  if (UPGRADE_TOOL_QA_MODE) initializeUpgradeToolQaScenario();
  if (NEW_PLAYER_GUIDE_QA_MODE && (!saved || NEW_PLAYER_GUIDE_QA_RESET)) initializeNewPlayerGuideQaScenario();
  if (STORY_ARCHIVE_QA_MODE) initializeStoryArchiveQaScenario();
  if (CHAPTER_STORY_QA_MODE) initializeChapterStoryQaScenario();
  if (FULL_GAME_TRIAL_MODE && (!saved || FULL_GAME_TRIAL_RESET)) {
    state.staminaMax = 99999;
    state.stamina = 99999;
    state.lastTick = Date.now();
  }
  const trialGeneratorGranted = grantTrialGeneratorFromUrl();
  if (DAILY_SHOP_QA_MODE && (!saved || DAILY_SHOP_QA_RESET)) {
    state.currentPage = "board";
    state.gems = 80;
    state.board = Array(BOARD_SIZE).fill(null);
    state.board[starterGeneratorIndex()] = "gen_mill_01";
    state.giftPacks = DAILY_SHOP_QA_PROPS
      ? [
        { id: SHOP_WEALTH_PACK_ID, quantity: 1 },
        { id: SHOP_SAXAUL_PACK_ID, quantity: 1 },
      ]
      : [];
    state.giftBoxStates = {};
    state.storedGiftBoxStates = {};
    if (DAILY_SHOP_QA_PROPS) {
      const boardIndices = state.board
        .map((itemId, index) => (!itemId && !isBoardCellLocked(index) ? index : -1))
        .filter((index) => index >= 0)
        .slice(0, 2);
      const previewPacks = [GIFT_PACKS[SHOP_WEALTH_PACK_ID], GIFT_PACKS[SHOP_SAXAUL_PACK_ID]];
      previewPacks.forEach((pack, previewIndex) => {
        const boardIndex = boardIndices[previewIndex];
        if (boardIndex === undefined || !pack) return;
        state.board[boardIndex] = pack.itemId;
        state.giftBoxStates[boardIndex] = { packId: pack.id, nextRewardIndex: 0 };
      });
      state.bag[0] = SHOP_WEALTH_ITEM_ID;
      state.bag[1] = SHOP_SAXAUL_ITEM_ID;
      state.storedGiftBoxStates = {
        0: { packId: SHOP_WEALTH_PACK_ID, nextRewardIndex: 0 },
        1: { packId: SHOP_SAXAUL_PACK_ID, nextRewardIndex: 0 },
      };
    }
    state.dailyPouchClaimDay = "";
    state.shopPurchaseCycle = currentDailyShopCycle();
    state.shopPurchasedOfferIds = [];
    state.shopFoodItemIds = DAILY_SHOP_QA_EMPTY ? [] : null;
  }
  reconcileGiftBoxStates();
  restoreBonusBubbleItems();
  convertExpiredBubbles(Date.now());
  migrateOccupiedLockedCells();
  const recoveredStamina = applyOfflineRecovery();
  const generatorUnlocksChanged = ensureStarterGenerator();
  const generatorRewardsChanged = !ISOLATED_QA_MODE && syncGeneratorProgressRewards().length > 0;
  pruneGeneratorStates();
  const foodUnlocksChanged = syncUnlockedFoodLevels({ includeCompletedOrders: true });
  const caravanRenownChanged = syncCaravanRenownState();
  if (generatorGiftMigration) backfillGeneratorProgressionGifts();
  syncVisibleOrders();
  const caravanRenownOrdersChanged = syncCaravanRenownOrders();
  const innLevelAdvanced = !ISOLATED_QA_MODE && advanceInnLevelsIfReady({ announce: false });
  if (generatorGiftMigration) saveState();
  if (recoveredStamina || hasLegacyOrderIds || hasLegacyStoryFlags || repairStateNeedsMigration || coinEconomyNeedsMigration || openingStaminaNeedsMigration || openingCopperNeedsMigration || foodDiscoveryNeedsMigration || legacyStorageHasGenerators || generatorUnlocksChanged || generatorRewardsChanged || foodUnlocksChanged || caravanRenownChanged || caravanRenownOrdersChanged || trialGeneratorGranted || innLevelAdvanced || (PROGRESSION_FLOW_QA_MODE && !saved) || (CARAVAN_RENOWN_QA_MODE && !saved)) saveState();
  if (FULL_GAME_TRIAL_RESET || PROGRESSION_FLOW_QA_RESET || GENERATOR_CHAIN_QA_RESET || CARAVAN_RENOWN_QA_RESET || SCISSORS_TOOL_QA_RESET || UPGRADE_TOOL_QA_RESET) {
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
      repairProtocolVersion: REPAIR_PROTOCOL_VERSION,
      coinEconomyVersion: COIN_ECONOMY_VERSION,
      openingStaminaVersion: OPENING_STAMINA_VERSION,
      openingCopperVersion: OPENING_COPPER_VERSION,
      board: state.board,
      bag: state.bag,
      rewardItems: state.rewardItems,
      giftPacks: state.giftPacks,
      giftBoxStates: state.giftBoxStates,
      storedGiftBoxStates: state.storedGiftBoxStates,
      splitterToolCharges: state.splitterToolCharges,
      bubbleStates: state.bubbleStates,
      unlockedCells: state.unlockedCells,
      visibleOrders: state.visibleOrders,
      unlockedCodex: [...state.unlockedCodex],
      unlockedFoodLevels: state.unlockedFoodLevels,
      foodDiscoverySchemaVersion: FOOD_DISCOVERY_SCHEMA_VERSION,
      generatorGiftProgressionVersion: 1,
      coins: state.coins,
      gems: state.gems,
      stamina: state.stamina,
      staminaMax: state.staminaMax,
      productionMultiplier: state.productionMultiplier,
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
      answeredHistoricalNoteIds: state.answeredHistoricalNoteIds,
      historicalNoteRewards: state.historicalNoteRewards,
      splitterIntroRewardClaimed: state.splitterIntroRewardClaimed,
      renovationChoices: state.renovationChoices,
      repairProgress: state.repairProgress,
      activeRepairId: state.activeRepairId,
      activeChapterStory: state.activeChapterStory,
      repairPromptedFor: state.repairPromptedFor,
      generatorStates: state.generatorStates,
      unlockedGeneratorCategories: state.unlockedGeneratorCategories,
      pendingGeneratorRewards: state.pendingGeneratorRewards,
      generatorWarehouse: state.generatorWarehouse,
      storageGuideVersion: state.storageGuideVersion,
      generatorWarehouseGuideSeen: state.generatorWarehouseGuideSeen,
      unlockedStorageSlots: state.unlockedStorageSlots,
      staminaPurchaseDay: state.staminaPurchaseDay,
      staminaPurchasesToday: state.staminaPurchasesToday,
      dailyPouchClaimDay: state.dailyPouchClaimDay,
      weeklyCheckinClaimedDays: state.weeklyCheckinClaimedDays,
      weeklyCheckinLastClaimDay: state.weeklyCheckinLastClaimDay,
      weeklyCheckinRound: state.weeklyCheckinRound,
      caravanRenown: state.caravanRenown,
      shopPurchaseCycle: state.shopPurchaseCycle,
      shopPurchasedOfferIds: state.shopPurchasedOfferIds,
      shopFoodItemIds: state.shopFoodItemIds,
      innLevel: state.innLevel,
      innLevelSchemaVersion: INN_LEVEL_SCHEMA_VERSION,
      ownedFurniture: state.ownedFurniture,
      placedFurniture: state.placedFurniture,
      currentPage: state.currentPage,
      tutorialStep: state.tutorialStep,
      lastTick: state.lastTick,
    }),
  );
}

function applyOfflineRecovery() {
  return recoverStaminaAt(Date.now());
}

function staminaRecoveryIntervalMs() {
  return STAMINA_RECOVERY_MINUTES * 60 * 1000;
}

function recoverStaminaAt(now) {
  if (state.stamina >= state.staminaMax) return 0;
  if (!Number.isFinite(state.lastTick) || state.lastTick > now) {
    state.lastTick = now;
    return 0;
  }
  const recovered = Math.min(
    state.staminaMax - state.stamina,
    Math.floor((now - state.lastTick) / staminaRecoveryIntervalMs()),
  );
  if (recovered <= 0) return 0;
  state.stamina += recovered;
  state.lastTick = state.stamina >= state.staminaMax
    ? now
    : state.lastTick + recovered * staminaRecoveryIntervalMs();
  return recovered;
}

function renderStaminaCountdown() {
  const full = state.stamina >= state.staminaMax;
  const elapsed = Date.now() - state.lastTick;
  const progress = full ? 100 : Math.min(100, Math.max(0,
    elapsed / staminaRecoveryIntervalMs() * 100,
  ));
  const seconds = Math.max(0, Math.ceil(
    (staminaRecoveryIntervalMs() - elapsed) / 1000,
  ));
  const time = full
    ? ""
    : `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  for (const [ring, timer, label, value] of [
    [els.boardStaminaRing, els.boardStaminaTimer, els.boardStaminaTimerLabel, els.boardStaminaTimerValue],
    [els.innStaminaRing, els.innStaminaTimer, els.innStaminaTimerLabel, els.innStaminaTimerValue],
  ]) {
    ring?.style.setProperty("--stamina-progress", `${progress}%`);
    if (timer) timer.hidden = full;
    if (label) label.textContent = full ? "" : "下次 +1";
    if (value) value.textContent = time;
  }
}

function validGeneratorCategoryIds() {
  return state.generatorConfig.categories.map((category) => category.id);
}

function generatorWarehouseConfig() {
  return state.generatorConfig?.warehouse ?? {};
}

function generatorWarehouseTarget(categoryId) {
  const config = generatorWarehouseConfig();
  return Math.max(1, Math.floor(Number(config.targetsByCategory?.[categoryId] ?? config.defaultTarget) || 8));
}

function generatorWarehouseAcceptedLevel() {
  return Math.max(1, Math.floor(Number(generatorWarehouseConfig().acceptedLevel) || 1));
}

function generatorWarehouseOutputLevel() {
  return Math.max(2, Math.floor(Number(generatorWarehouseConfig().defaultOutputLevel) || 4));
}

function emptyGeneratorWarehouse() {
  return {
    selectedCategoryId: validGeneratorCategoryIds()[0] ?? "mill",
    progressByCategory: Object.fromEntries(validGeneratorCategoryIds().map((categoryId) => [categoryId, 0])),
    readyItems: [],
  };
}

function normalizeGeneratorWarehouse(value, legacyBag = []) {
  const validCategories = new Set(validGeneratorCategoryIds());
  const raw = value && typeof value === "object" ? value : {};
  const readyItems = [];
  const progressByCategory = Object.fromEntries(validGeneratorCategoryIds().map((categoryId) => [
    categoryId,
    Math.max(0, Math.floor(Number(raw.progressByCategory?.[categoryId]) || 0)),
  ]));
  const migrateStoredGenerator = (rawItemId) => {
    const itemId = migrateLegacyGeneratorId(rawItemId);
    const item = byId.get(itemId);
    if (!isGeneratorPiece(item) || !validCategories.has(item.generatorType)) return;
    if (Number(item.level) === generatorWarehouseAcceptedLevel()) {
      progressByCategory[item.generatorType] += 1;
      return;
    }
    readyItems.push(itemId);
  };
  if (Array.isArray(raw.readyItems)) raw.readyItems.forEach(migrateStoredGenerator);
  if (Array.isArray(legacyBag)) legacyBag.forEach(migrateStoredGenerator);
  validGeneratorCategoryIds().forEach((categoryId) => {
    const target = generatorWarehouseTarget(categoryId);
    let progress = progressByCategory[categoryId];
    while (progress >= target) {
      readyItems.push(generatorItemId(categoryId, generatorWarehouseOutputLevel()));
      progress -= target;
    }
    progressByCategory[categoryId] = progress;
  });
  return {
    selectedCategoryId: validCategories.has(raw.selectedCategoryId)
      ? raw.selectedCategoryId
      : validGeneratorCategoryIds()[0] ?? "mill",
    progressByCategory,
    readyItems,
  };
}

function generatorWarehouseEntry(categoryId) {
  const warehouse = state.generatorWarehouse ?? (state.generatorWarehouse = emptyGeneratorWarehouse());
  if (!Object.prototype.hasOwnProperty.call(warehouse.progressByCategory, categoryId)) {
    warehouse.progressByCategory[categoryId] = 0;
  }
  return {
    progress: warehouse.progressByCategory[categoryId],
    target: generatorWarehouseTarget(categoryId),
    outputItemId: generatorItemId(categoryId, generatorWarehouseOutputLevel()),
    readyCount: warehouse.readyItems.filter((itemId) => generatorCategoryForItem(itemId) === categoryId).length,
  };
}

function generatorWarehouseHasActivity() {
  return (state.generatorWarehouse?.readyItems?.length ?? 0) > 0
    || Object.values(state.generatorWarehouse?.progressByCategory ?? {})
      .some((progress) => Number(progress) > 0);
}

function generatorWarehouseUnlocked() {
  return generatorWarehouseHasActivity()
    || (Number(state.innLevel) >= 5 && state.unlockedGeneratorCategories.length >= 2);
}

function generatorWarehouseUnlockCopy() {
  if (Number(state.innLevel) < 5) return "流沙驿修缮进度达到 Lv5 后开放";
  return "解锁第二条生产线后开放";
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
  [
    ...(savedData.board ?? []),
    ...(savedData.bag ?? []),
    ...(savedData.pendingGeneratorRewards ?? []),
    ...(savedData.generatorWarehouse?.readyItems ?? []),
  ]
    .map(generatorCategoryForItem)
    .filter((categoryId) => validIds.has(categoryId))
    .forEach((categoryId) => categories.add(categoryId));
  Object.entries(savedData.generatorWarehouse?.progressByCategory ?? {})
    .filter(([categoryId, progress]) => validIds.has(categoryId) && Number(progress) > 0)
    .forEach(([categoryId]) => categories.add(categoryId));
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
  return [
    ...state.board,
    ...state.bag,
    ...(state.pendingGeneratorRewards ?? []),
    ...(state.generatorWarehouse?.readyItems ?? []),
    ...(state.rewardItems ?? []).map((entry) => entry.itemId),
  ]
    .some((itemId) => generatorCategoryForItem(itemId) === categoryId)
    || Number(state.generatorWarehouse?.progressByCategory?.[categoryId]) > 0;
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
  if (Number(level) === generatorWarehouseAcceptedLevel()) {
    const entry = generatorWarehouseEntry(categoryId);
    state.generatorWarehouse.progressByCategory[categoryId] = entry.progress + 1;
    if (state.generatorWarehouse.progressByCategory[categoryId] >= entry.target) {
      state.generatorWarehouse.progressByCategory[categoryId] -= entry.target;
      state.generatorWarehouse.readyItems.push(entry.outputItemId);
    }
  } else {
    state.generatorWarehouse.readyItems.push(itemId);
  }
  return "warehouse";
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
      const itemId = generatorItemId(category.id, rewardLevel);
      if (!grantRewardItem(itemId)) return;
      claimed.add(rewardId);
      delivered.push({ category, rewardLevel });
    });
  });
  state.claimedGeneratorProgressRewards = [...claimed];
  if (announce && delivered.length) {
    const names = delivered.map(({ category, rewardLevel }) => `${category.displayName} Lv${rewardLevel}`);
    toast(`同系订单达标：${names.join("、")}副本已收入行囊`);
  }
  return delivered;
}

function syncGeneratorCategoryUnlocks({ announce = false } = {}) {
  const unlocked = new Set(state.unlockedGeneratorCategories);
  const newlyUnlocked = [];
  GENERATOR_CATEGORY_UNLOCKS.forEach((entry) => {
    if (!shouldUnlockGeneratorCategory(entry)) return;
    const wasUnlocked = unlocked.has(entry.categoryId);
    if (wasUnlocked) return;
    unlocked.add(entry.categoryId);
    newlyUnlocked.push(entry);
  });
  state.unlockedGeneratorCategories = validGeneratorCategoryIds().filter((categoryId) => unlocked.has(categoryId));
  if (announce) {
    newlyUnlocked.forEach(({ categoryId }) => {
      const category = state.generatorConfig.categories.find((entry) => entry.id === categoryId);
      if (!category) return;
      toast(`${category.displayName}生产线已经开放，修缮礼匣已送来对应器具。`);
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
    const item = byId.get(itemId);
    if (!isGeneratorPiece(item)) break;
    if (Number(item.level) === generatorWarehouseAcceptedLevel()) {
      const categoryId = item.generatorType;
      const entry = generatorWarehouseEntry(categoryId);
      state.generatorWarehouse.progressByCategory[categoryId] = entry.progress + 1;
      if (state.generatorWarehouse.progressByCategory[categoryId] >= entry.target) {
        state.generatorWarehouse.progressByCategory[categoryId] -= entry.target;
        state.generatorWarehouse.readyItems.push(entry.outputItemId);
      }
    } else {
      state.generatorWarehouse.readyItems.push(itemId);
    }
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
  return changed;
}

function tickStamina() {
  tickGenerators();
  tickBonusBubbles();
  renderDailyPouchButtons();
  renderWeeklyCheckinButton();
  renderCaravanRenownEntry();
  if (els.dailyShopModal?.open) renderDailyShop();
  const recovered = recoverStaminaAt(Date.now());
  if (recovered > 0) {
    toast("远处又传来驼铃声。");
    render();
    saveState();
  } else {
    renderStaminaCountdown();
  }
}

function bindEvents() {
  window.addEventListener("silkroad:new-player-guide-retired", () => {
    state.tutorialStep = Math.max(Number(state.tutorialStep) || 0, 6);
    keeper("查看新订单需要的食物，继续接待往来的客人。");
    render();
    saveState();
  });
  window.addEventListener("silkroad:storage-guide-request", () => {
    window.dispatchEvent(new CustomEvent("silkroad:storage-guide-context", {
      detail: storageGuideContext(),
    }));
  });
  preventBrowserSmartZoom();
  let lastInnSceneSize = [els.innScene.clientWidth, els.innScene.clientHeight];
  innSceneResizeObserver = new ResizeObserver(() => {
    const nextSize = [els.innScene.clientWidth, els.innScene.clientHeight];
    if (!nextSize[0] || !nextSize[1]) return;
    const changed = Math.abs(nextSize[0] - lastInnSceneSize[0]) > 1
      || Math.abs(nextSize[1] - lastInnSceneSize[1]) > 90;
    lastInnSceneSize = nextSize;
    if (changed) scheduleInnViewportRefocus();
  });
  innSceneResizeObserver.observe(els.innScene);
  els.generateBtn.addEventListener("click", generateItem);
  els.sellBtn.addEventListener("click", sellSelected);
  els.confirmClose?.addEventListener("click", () => settleGameConfirm(false));
  els.confirmCancel?.addEventListener("click", () => settleGameConfirm(false));
  els.confirmAccept?.addEventListener("click", () => settleGameConfirm(true));
  els.confirmModal?.addEventListener("cancel", (event) => {
    event.preventDefault();
    settleGameConfirm(false);
  });
  els.selectedDetailBtn?.addEventListener("click", openSelectedPieceDetail);
  els.staminaPlusBtn?.addEventListener("click", openStaminaPurchase);
  els.gemPlusBtn?.addEventListener("click", openRubyRecharge);
  els.dailyPouchBtn?.addEventListener("click", openDailyShop);
  els.soundToggleBtn?.addEventListener("click", toggleAudioSettings);
  els.productionMultiplier?.addEventListener("click", cycleProductionMultiplier);
  els.bgmToggleBtn?.addEventListener("click", toggleBgm);
  els.sfxToggleBtn?.addEventListener("click", toggleSfx);
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
  els.weeklyCheckinBtn?.addEventListener("click", openWeeklyCheckin);
  els.renownEventBtn?.addEventListener("click", openCaravanRenown);
  els.renownEventClaim?.addEventListener("click", handleCaravanRenownAction);
  els.weeklyCheckinClaim?.addEventListener("click", claimWeeklyCheckin);
  els.weeklyCheckinGrid?.addEventListener("click", (event) => {
    if (event.target.closest(".weekly-checkin-day.current")) claimWeeklyCheckin();
  });
  els.weeklyCheckinGrid?.addEventListener("keydown", (event) => {
    if ((event.key === "Enter" || event.key === " ") && event.target.closest(".weekly-checkin-day.current")) {
      event.preventDefault();
      claimWeeklyCheckin();
    }
  });
  els.dailyShopClaimPouch?.addEventListener("click", claimDailyPouch);
  els.dailyShopOffers?.addEventListener("click", purchaseDailyShopOffer);
  els.dailyShopModal?.addEventListener("close", () => playSfx("exitShop"));
  els.weeklyCheckinModal?.addEventListener("close", () => playSfx("exitShop"));
  els.innSoundToggleBtn?.addEventListener("click", toggleAudioSettings);
  els.storageInviteBtn?.addEventListener("click", explainStorageInvite);
  els.storageUnlockBtn?.addEventListener("click", purchaseNextStorageSlot);
  els.storageNormalTab?.addEventListener("click", () => setStorageTab("normal"));
  els.storageGeneratorTab?.addEventListener("click", () => setStorageTab("generator"));
  els.storageGuideSkip?.addEventListener("click", completeStorageGuide);
  els.storageGuideNext?.addEventListener("click", advanceStorageGuide);
  els.storageModal?.addEventListener("close", () => hideStorageGuide());
  els.generatorWarehouseCategories?.addEventListener("click", selectGeneratorWarehouseCategory);
  els.generatorWarehouseDeposit?.addEventListener("click", depositSelectedGenerator);
  els.generatorWarehouseWithdraw?.addEventListener("click", withdrawStoredGenerator);
  els.generatorWarehouseClaim?.addEventListener("click", claimGeneratorWarehouseOutput);
  els.staminaPurchaseConfirm?.addEventListener("click", purchaseStamina);
  els.storyArchiveBtn?.addEventListener("click", () => openStoryArchive());
  els.storyArchiveChapters?.addEventListener("click", selectStoryArchiveChapter);
  els.storyArchiveList?.addEventListener("click", selectStoryArchiveSegment);
  els.storyArchiveRecent?.addEventListener("click", selectStoryArchiveSegment);
  els.storyArchiveModal?.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeStoryArchive();
  });
  els.historicalNoteModal?.addEventListener("close", () => {
    historicalRewardAnimationRun += 1;
    if (historicalNoteTransitioning) return;
    const note = historicalNotesById.get(els.historicalNoteModal.dataset.noteId);
    const reward = note ? state.historicalNoteRewards?.[note.id] : null;
    if (note?.repairId && reward?.claimed && repairReturnCastMilestoneId === note.repairId) {
      beginHistoricalCastTransitionAfterClose(note);
      return;
    }
    resetLongscrollClueCamera();
    const returnChapter = historicalNoteReturnChapter;
    historicalNoteReturnChapter = null;
    if (returnChapter !== null) openStoryArchive(returnChapter);
    else if (state.currentPage === "inn") {
      render();
    }
  });
  els.innFinaleContinue?.addEventListener("click", closeInnFinale);
  els.innFinaleShowLetter?.addEventListener("click", openInnFinaleLetter);
  els.innFinaleViewPanorama?.addEventListener("click", showInnFinalePanorama);
  window.addEventListener("resize", measureInnFinaleCoverScale);
  els.innFinale?.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeInnFinale();
  });
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
  [els.codexBtn, els.boardCodexBtn, els.innCodexBtn].filter(Boolean).forEach((button) => {
    button.addEventListener("click", openCodex);
  });
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
  els.repairPlayerFrame?.addEventListener("load", handleRepairPlayerLoad);
  els.repairOrientationBtn?.addEventListener("click", toggleRepairOrientation);
  els.repairModal.addEventListener("cancel", (event) => {
    event.preventDefault();
    closeRepairModalToAnchor();
  });
  els.repairGuideBtn.addEventListener("click", () => els.repairGuideModal.close());
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
      if (btn.dataset.close === "storyModal" && pendingInnUpgradeRevealLevel) showPendingInnUpgradeReveal();
    });
  });
  document.addEventListener("pointerdown", startBgmIfAllowed, { passive: true });
  document.addEventListener("pointerdown", handleAudioSettingsPointerDown);
  document.addEventListener("keydown", startBgmIfAllowed);
  document.addEventListener("keydown", handleAudioSettingsKeydown);
  document.addEventListener("click", handleBasicButtonSound);
  document.addEventListener("visibilitychange", handleAudioVisibility);
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
  renderPage();
  els.coins.textContent = state.coins;
  els.stamina.textContent = state.stamina;
  els.innStamina.textContent = state.stamina;
  renderStaminaCountdown();
  if (els.gems) els.gems.textContent = state.gems ?? 0;
  renderDailyPouchButtons();
  renderWeeklyCheckinButton();
  renderProductionMultiplier();
  if (els.codexProgress) els.codexProgress.textContent = `${state.unlockedCodex.size}/8`;
  els.generateBtn.disabled = !hasEmptyCell();
  renderOrders();
  renderBoard();
  renderGeneratorChainQaPanel();
  renderSelected();
  renderBagButton();
  renderInnButton();
  renderStoryArchiveEntry();
  if (els.storageModal?.open) renderStorage();
  if (els.staminaPurchaseModal?.open) renderStaminaPurchase();
  if (els.dailyShopModal?.open) renderDailyShop();
  if (els.weeklyCheckinModal?.open) renderWeeklyCheckin();
  if (els.renownEventModal?.open) renderCaravanRenown();
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
  closeAudioSettings();
  const previousPage = state.currentPage;
  try {
    if (page === "inn") {
      const packageReady = await ensureInnPackageLoaded();
      if (!packageReady) return;
      cancelInnPackageRelease();
      lastInnFocusKey = null;
      lastLongscrollCharacterSceneKey = null;
    } else if (page === "board") {
      clearBoardReturnGuide();
      scheduleInnPackageRelease();
    }
    if (page !== previousPage) playSfx(page === "inn" ? "enterShop" : "exitShop");
    await playPageDoorTransition(() => {
      state.currentPage = page;
      if (page === "inn" && pendingRepairAfterStoryMilestoneId) {
        repairReturnCastMilestoneId = pendingRepairAfterStoryMilestoneId;
        pendingRepairAfterStoryMilestoneId = null;
      }
      render();
      if (page === "board") tickGenerators();
      saveState();
    });
    if (page === "inn") {
      setTimeout(maybePromptRepairGuide, 0);
    }
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
  resetLongscrollClueCamera();
  els.innScene.innerHTML = "";
  els.furnitureShop.innerHTML = "";
  document.querySelector(".inn-task-list")?.remove();
  lastLongscrollCharacterSceneKey = null;
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
  els.innChapterEyebrow.textContent = `第${chineseNumbers[chapter] ?? chapter}卷`;
  const chapterTitleLines = CHAPTER_TITLE_LINES[chapter] ?? [chapterName(chapter)];
  els.innLevelName.replaceChildren(
    ...chapterTitleLines.map((line) => Object.assign(document.createElement("span"), { textContent: line })),
  );
  els.innChapterProgress.replaceChildren(...chapterMilestones.map((_, index) => {
    const diamond = document.createElement("i");
    diamond.classList.toggle("is-complete", index < completedChapterMilestones);
    diamond.setAttribute("aria-hidden", "true");
    return diamond;
  }));
  els.innChapterProgress.classList.toggle("is-dense", chapterMilestones.length > 4);
  els.innChapterProgress.setAttribute(
    "aria-label",
    `本卷已完成${chineseNumbers[completedChapterMilestones] ?? completedChapterMilestones}处，共${chineseNumbers[chapterMilestones.length] ?? chapterMilestones.length}处`,
  );
  els.innCoins.textContent = state.coins;
  els.innStamina.textContent = state.stamina;
  els.innGems.textContent = state.gems ?? 0;
  els.innScoreText.textContent = `流沙驿 Lv${state.innLevel} · 主线修缮`;
  els.innUpgradeText.textContent =
    level.level >= MAX_INN_LEVEL
      ? "流沙驿已经升至最高等级，百味宴正在等候。"
      : canUpgrade.ok
        ? "当前阶段已经完成，下一阶段将自动开启。"
        : canUpgrade.reason;
  const repairGate = canEnterRepairPage();
  els.innStoryLine.textContent = milestoneInnLevel(nextMilestone) > state.innLevel
    ? "正在开启下一阶段修缮。"
    : nextMilestone
      ? `${nextMilestone.sceneName ?? nextMilestone.name}：${repairGate.ok ? nextMilestone.nextText : repairGate.reason}`
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
    ...(level.upgradeCost > 0 ? [`<span class="${coinOk ? "done" : ""}">铜币 ${Math.min(state.coins, level.upgradeCost)}/${level.upgradeCost}</span>`] : []),
    `<span class="${repairOk ? "done" : ""}">基础修缮 ${Math.min(innRepairValue(), level.repairTarget)}/${level.repairTarget}</span>`,
    ...taskViews.map((task) => `<span class="${task.done ? "done" : ""}">${task.label} ${task.current}/${task.target}</span>`),
  ];
  els.innScoreText.insertAdjacentHTML("afterend", `<div class="inn-task-list">${lines.join("")}</div>`);
}

function renderInnScene(level, repairValue) {
  resetLongscrollClueCamera();
  const milestones = getMilestoneViews();
  const next = nextRepairMilestone();
  const availableNext = next && milestoneInnLevel(next) <= state.innLevel ? next : null;
  const showingFreshRepair = Boolean(repairReturnCastMilestoneId);
  const completedRegionIds = new Set(
    milestones
      .filter((milestone) => selectedRenovationChoice(milestone))
      .flatMap((milestone) => milestone.longscrollRegionIds),
  );
  const currentRegionIds = showingFreshRepair ? [] : availableNext?.longscrollRegionIds ?? [];
  const characterMilestone = longscrollCharacterMilestone(availableNext, milestones);
  const characterLayer = renderLongscrollCharacters(characterMilestone);
  const repairHalo = !showingFreshRepair && availableNext ? renderLongscrollRepairHalo(availableNext) : "";
  els.innScene.innerHTML = `
    <div class="longscroll-map ${showingFreshRepair ? "is-repair-returning" : ""}" aria-label="流沙驿长卷">
      <img class="longscroll-base" src="${LONGSCROLL_BASE_SOURCE}" alt="未修缮的流沙驿" />
      ${renderLongscrollRepairedLayer(completedRegionIds, !next)}
      ${characterLayer}
      ${repairHalo}
      ${currentRegionIds
        .map((regionId) => {
          const [left, top, width, height] = LONGSCROLL_REGION_BOUNDS[regionId];
          return `<button class="longscroll-current-region" type="button" tabindex="-1" aria-hidden="true" data-current-repair="${availableNext.id}" data-region-id="${regionId}" style="left:${left}px;top:${top}px;width:${width}px;height:${height}px"></button>`;
        })
        .join("")}
      ${renderLongscrollHistoricalMarkers(milestones)}
    </div>
  `;
  els.innScene.querySelectorAll("[data-current-repair]").forEach((button) => {
    button.addEventListener("click", () => handleRepairNodeClick(button.dataset.currentRepair, button));
  });
  els.innScene.querySelectorAll("[data-historical-note-id]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      openLongscrollClueWithZoom(button);
    });
  });
  const focusMilestone = repairReturnCastMilestoneId || !LONGSCROLL_LOCATION_CAST[availableNext?.id]
    ? characterMilestone
    : availableNext;
  scheduleCurrentInnFocus(focusMilestone, focusMilestone?.longscrollRegionIds ?? currentRegionIds);
}

function renderLongscrollHistoricalMarkers(milestones) {
  if (firstRepairReturnGuidePending()) return "";
  const unlockedNotes = HISTORICAL_NOTES.filter((note) =>
    note.repairId
    && historicalNoteUnlocked(note))
    .sort((left, right) => milestones.findIndex((entry) => entry.id === left.repairId)
      - milestones.findIndex((entry) => entry.id === right.repairId));
  const newestUnread = unlockedNotes.filter((note) => !historicalNoteAnswered(note.id)).at(-1);
  return unlockedNotes
    .map((note) => {
      const milestone = milestones.find((entry) => entry.id === note.repairId);
      const bounds = LONGSCROLL_REGION_BOUNDS[milestone?.longscrollRegionIds?.[0]];
      if (!bounds) return "";
      const [left, top, width, height] = bounds;
      const clueObject = HISTORICAL_CLUE_OBJECTS[note.id];
      const x = clueObject?.x ?? Math.round(left + width * 0.5);
      const y = clueObject?.y ?? Math.round(top + height * 0.62);
      const clueWidth = (clueObject?.width ?? 36) * HISTORICAL_CLUE_DISPLAY_SCALE;
      const clueRotate = clueObject?.rotate ?? 0;
      const isUnread = !historicalNoteAnswered(note.id);
      const isNotice = newestUnread?.id === note.id;
      const objectLabel = clueObject?.label ?? note.markerLabel;
      const stateClass = isUnread ? "is-unread" : "is-answered";
      const captionSideClass = x > 850 ? "is-caption-left" : "is-caption-right";
      return `<button class="longscroll-note-marker ${stateClass} ${isNotice ? "is-notice" : "is-compact"} ${captionSideClass}" type="button" data-historical-note-id="${note.id}" aria-label="${isUnread ? "发现线索，猜一猜：" : "回看见闻："}${note.markerLabel}" style="--note-x:${x}px;--note-y:${y}px;--clue-width:${clueWidth}px;--clue-rotate:${clueRotate}deg">
        <img class="longscroll-clue-object" src="./assets/history/clues/${note.id}.webp" alt="" />
        <span class="longscroll-clue-caption"><strong>${isUnread ? "发现线索" : "见闻已收录"}</strong><small>${objectLabel}${isUnread ? " · 点此猜一猜" : " · 点此回看"}</small></span>
      </button>`;
    })
    .join("");
}

function firstRepairReturnGuidePending() {
  return state.tutorialStep === 5
    && Boolean(state.renovationChoices?.[FIRST_TUTORIAL_REPAIR_ID]);
}

function firstTutorialRepairPartCompleted() {
  return normalizeRepairCompletedParts(
    state.repairProgress?.[FIRST_TUTORIAL_REPAIR_ID]?.completedParts ?? [],
  ).length > 0;
}

function focusInnSceneOnPoint(x, y, { behavior = "smooth", verticalRatio = 0.48 } = {}) {
  const map = els.innScene?.querySelector(".longscroll-map");
  if (!map || !els.innScene) return false;
  const mapRect = map.getBoundingClientRect();
  const sceneRect = els.innScene.getBoundingClientRect();
  const scaleX = mapRect.width / map.offsetWidth || 1;
  const scaleY = mapRect.height / map.offsetHeight || 1;
  const focusX = mapRect.left + x * scaleX;
  const focusY = mapRect.top + y * scaleY;
  els.innScene.scrollTo({
    left: Math.max(0, els.innScene.scrollLeft + (focusX - (sceneRect.left + sceneRect.width / 2)) / scaleX),
    top: Math.max(0, els.innScene.scrollTop + (focusY - (sceneRect.top + sceneRect.height * verticalRatio)) / scaleY),
    behavior,
  });
  return true;
}

function resetLongscrollClueCamera() {
  const activeCamera = activeLongscrollClueCamera;
  if (!activeCamera) return;
  activeCamera.cancelled = true;
  activeCamera.map?.classList.remove("is-clue-camera-active", "is-clue-camera-armed");
  activeCamera.map?.style.removeProperty("--clue-camera-x");
  activeCamera.map?.style.removeProperty("--clue-camera-y");
  activeCamera.scene?.classList.remove("is-clue-camera-moving");
  if (activeCamera.button?.isConnected) {
    activeCamera.button.classList.remove("is-zooming");
    activeCamera.button.disabled = false;
  }
  activeLongscrollClueCamera = null;
}

function waitForLongscrollCameraTransition(map, timeout = 2200) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      map.removeEventListener("transitionend", handleTransitionEnd);
      window.clearTimeout(fallbackTimer);
      resolve();
    };
    const handleTransitionEnd = (event) => {
      if (event.target === map && event.propertyName === "transform") finish();
    };
    const fallbackTimer = window.setTimeout(finish, timeout);
    map.addEventListener("transitionend", handleTransitionEnd);
  });
}

function waitForInnSceneScrollIdle(scene, timeout = 760) {
  return new Promise((resolve) => {
    let settled = false;
    let idleTimer = null;
    const finish = () => {
      if (settled) return;
      settled = true;
      scene.removeEventListener("scroll", handleScroll);
      window.clearTimeout(idleTimer);
      window.clearTimeout(fallbackTimer);
      resolve();
    };
    const handleScroll = () => {
      window.clearTimeout(idleTimer);
      idleTimer = window.setTimeout(finish, 100);
    };
    const fallbackTimer = window.setTimeout(finish, timeout);
    scene.addEventListener("scroll", handleScroll, { passive: true });
    idleTimer = window.setTimeout(finish, 140);
  });
}

async function openLongscrollClueWithZoom(button) {
  const noteId = button?.dataset?.historicalNoteId;
  if (!noteId) return;
  if (activeLongscrollClueCamera || els.historicalNoteModal?.open) return;
  const map = button.closest(".longscroll-map");
  const scene = els.innScene;
  if (!map || !scene) return;
  const x = Number.parseFloat(button.style.getPropertyValue("--note-x"));
  const y = Number.parseFloat(button.style.getPropertyValue("--note-y"));
  const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  if (!Number.isFinite(x) || !Number.isFinite(y)) {
    openHistoricalNote(noteId);
    return;
  }
  if (reduceMotion) {
    focusInnSceneOnPoint(x, y, { behavior: "auto", verticalRatio: 0.5 });
    openHistoricalNote(noteId);
    return;
  }

  const camera = { button, map, scene, cancelled: false };
  activeLongscrollClueCamera = camera;
  map.style.setProperty("--clue-camera-x", `${x}px`);
  map.style.setProperty("--clue-camera-y", `${y}px`);
  map.classList.add("is-clue-camera-armed");
  scene.classList.add("is-clue-camera-moving");
  button.classList.add("is-zooming");
  button.disabled = true;

  const scrollSettled = waitForInnSceneScrollIdle(scene);
  const cameraSettled = waitForLongscrollCameraTransition(map);
  focusInnSceneOnPoint(x, y, { behavior: "smooth", verticalRatio: 0.5 });
  await new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve)));
  if (activeLongscrollClueCamera !== camera || camera.cancelled) return;
  map.classList.add("is-clue-camera-active");
  await Promise.all([scrollSettled, cameraSettled]);
  if (
    activeLongscrollClueCamera !== camera
    || camera.cancelled
    || state.currentPage !== "inn"
    || !map.isConnected
    || !button.isConnected
  ) return;

  scene.classList.remove("is-clue-camera-moving");
  button.classList.remove("is-zooming");
  button.disabled = false;
  openHistoricalNote(noteId);
}

function renderLongscrollRepairedLayer(regionIds, allComplete) {
  if (!regionIds.size) return "";
  if (allComplete) return `<img class="longscroll-region longscroll-region-persistent" src="${LONGSCROLL_REPAIRED_SOURCE}" alt="" />`;
  // Keep one persistent repaired layer and soften the hand-cut masks so restored walls,
  // roofs and ground settle into the old scroll instead of reading as pasted tiles.
  const sortedRegionIds = [...regionIds].sort((left, right) => left - right);
  const maskKey = sortedRegionIds.join("-");
  const maskId = `longscroll-completed-mask-${maskKey}`;
  const featherId = `longscroll-completed-feather-${maskKey}`;
  const masks = sortedRegionIds.map((regionId) =>
    `<image href="${longscrollMaskSrc(regionId)}" x="0" y="0" width="1254" height="1254" preserveAspectRatio="none" />`,
  ).join("");
  return `<svg class="longscroll-region" viewBox="0 0 1254 1254" aria-hidden="true">
    <defs>
      <filter id="${featherId}" x="-3%" y="-3%" width="106%" height="106%" color-interpolation-filters="sRGB">
        <feGaussianBlur stdDeviation="6" />
        <feComponentTransfer><feFuncA type="gamma" amplitude="1.08" exponent="0.92" offset="0" /></feComponentTransfer>
      </filter>
      <mask id="${maskId}" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" mask-type="alpha" x="0" y="0" width="1254" height="1254">
        <g filter="url(#${featherId})">${masks}</g>
      </mask>
    </defs>
    <image href="${LONGSCROLL_REPAIRED_SOURCE}" x="0" y="0" width="1254" height="1254" preserveAspectRatio="none" mask="url(#${maskId})" />
  </svg>`;
}

function renderLongscrollRepairHalo(milestone) {
  const bounds = LONGSCROLL_REGION_BOUNDS[milestone.longscrollRegionIds?.[0]];
  if (!bounds) return "";
  const [left, top, width, height] = bounds;
  const cast = LONGSCROLL_LOCATION_CAST[milestone.id];
  const x = Math.round(cast ? (cast.keeper.x + cast.npc.x) / 2 : left + width / 2);
  const y = Math.round(cast ? Math.max(cast.keeper.y, cast.npc.y) - 50 : top + height * 0.55);
  const haloWidth = Math.round(Math.min(260, Math.max(170, width * 0.66)));
  const haloHeight = Math.round(Math.min(220, Math.max(130, height * 0.7)));
  return `<button class="longscroll-repair-halo" type="button" data-current-repair="${milestone.id}" data-repair-halo="${milestone.id}" aria-label="修缮${milestone.sceneName ?? milestone.name}" style="--halo-x:${x}px;--halo-y:${y}px;--halo-width:${haloWidth}px;--halo-height:${haloHeight}px"></button>`;
}

function longscrollStandeeSrc(npcId) {
  if (LONGSCROLL_FULL_BODY_STANDEES[npcId]) return LONGSCROLL_FULL_BODY_STANDEES[npcId];
  return `./assets/npc_standee/${npcId}.png?v=${NPC_STANDEE_VERSION}`;
}

function renderLongscrollCharacter(actor, role, npcId, entering) {
  const classes = [
    "longscroll-character",
    `longscroll-character-${role}`,
    actor.flip ? "is-flipped" : "",
    entering ? "is-entering" : "",
  ].filter(Boolean).join(" ");
  return `
    <figure class="${classes}" data-npc-id="${npcId}" style="--character-x:${actor.x}px;--character-y:${actor.y}px;--character-width:${actor.width}px;--character-delay:${actor.delay}ms">
      <span class="longscroll-character-body"><img src="${longscrollStandeeSrc(npcId)}" alt="" draggable="false" /></span>
    </figure>`;
}

function longscrollCharacterMilestone(preferred = nextRepairMilestone(), milestones = getMilestoneViews()) {
  const returning = repairReturnCastMilestoneId
    ? milestones.find((milestone) => milestone.id === repairReturnCastMilestoneId)
    : null;
  if (returning && LONGSCROLL_LOCATION_CAST[returning.id]) return returning;
  if (preferred && LONGSCROLL_LOCATION_CAST[preferred.id]) return preferred;
  return [...milestones].reverse().find(
    (milestone) => selectedRenovationChoice(milestone) && LONGSCROLL_LOCATION_CAST[milestone.id],
  ) ?? null;
}

function renderLongscrollCharacters(milestone = longscrollCharacterMilestone()) {
  const cast = milestone ? LONGSCROLL_LOCATION_CAST[milestone.id] : null;
  const npcId = milestone?.npcId;
  if (!cast || !npcId) {
    lastLongscrollCharacterSceneKey = null;
    return '<div class="longscroll-character-layer" aria-hidden="true"></div>';
  }
  const entering = lastLongscrollCharacterSceneKey !== milestone.id;
  lastLongscrollCharacterSceneKey = milestone.id;
  return `<div class="longscroll-character-layer" data-character-scene="${milestone.id}" data-region-id="${cast.regionId}" aria-hidden="true">
    ${renderLongscrollCharacter(cast.keeper, "keeper", "keeper", entering)}
    ${renderLongscrollCharacter(cast.npc, "npc", npcId, entering)}
  </div>`;
}

function refreshLongscrollCharacters() {
  if (state.currentPage !== "inn") return;
  const layer = els.innScene.querySelector(".longscroll-character-layer");
  if (!layer) return;
  const next = nextRepairMilestone();
  const availableNext = next && milestoneInnLevel(next) <= state.innLevel ? next : null;
  layer.outerHTML = renderLongscrollCharacters(longscrollCharacterMilestone(availableNext));
}

function renderLongscrollMask(className, regionId) {
  const id = `${className}-${regionId}`;
  const outlineId = `${id}-outline`;
  const sweepId = `${id}-sweep`;
  const maskUrl = `${LONGSCROLL_ROOT}/masks-alpha/${String(regionId).padStart(2, "0")}_mask_v0.1.png`;
  return `<svg class="${className}" data-region-id="${regionId}" aria-hidden="true" viewBox="0 0 1254 1254">
    <defs>
      <mask id="${id}" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" mask-type="alpha">
        <image href="${maskUrl}" width="1254" height="1254" preserveAspectRatio="none" />
      </mask>
      <filter id="${outlineId}" x="-12" y="-12" width="1278" height="1278" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feMorphology in="SourceAlpha" operator="dilate" radius="2" result="wide" />
        <feComposite in="wide" in2="SourceAlpha" operator="out" result="ring" />
        <feGaussianBlur in="ring" stdDeviation="1.6" result="softRing" />
        <feFlood flood-color="#e1ad55" flood-opacity="0.22" result="glowInk" />
        <feComposite in="glowInk" in2="softRing" operator="in" result="glow" />
        <feFlood flood-color="#efcd86" flood-opacity="0.72" result="lineInk" />
        <feComposite in="lineInk" in2="ring" operator="in" result="line" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="line" />
        </feMerge>
      </filter>
      <linearGradient id="${sweepId}" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fff0b3" stop-opacity="0" />
        <stop offset="0.5" stop-color="#fff0b3" stop-opacity="0.76" />
        <stop offset="1" stop-color="#fff0b3" stop-opacity="0" />
      </linearGradient>
    </defs>
    <g class="longscroll-highlight-outline" filter="url(#${outlineId})">
      <rect width="1254" height="1254" fill="#fff" mask="url(#${id})" />
    </g>
    <g mask="url(#${id})">
      <rect class="longscroll-highlight-sweep" x="-520" y="-220" width="260" height="1694" rx="130" fill="url(#${sweepId})" />
    </g>
  </svg>`;
}

function scheduleCurrentInnFocus(nextMilestone, regionIds) {
  if (state.currentPage !== "inn" || !regionIds?.length) return;
  const focusKey = nextMilestone ? nextMilestone.id : `level-${currentInnLevel().level}-complete`;
  if (lastInnFocusKey === focusKey) return;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (centerInnSceneOnPosition(regionIds)) lastInnFocusKey = focusKey;
  }));
}

function scheduleInnViewportRefocus() {
  if (innViewportFocusFrame !== null) cancelAnimationFrame(innViewportFocusFrame);
  if (activeLongscrollClueCamera) return;
  innViewportFocusFrame = requestAnimationFrame(() => {
    innViewportFocusFrame = null;
    if (state.currentPage !== "inn") return;
    if (LONGSCROLL_CAST_QA_MODE) {
      const sceneNumber = Number(new URLSearchParams(location.search).get("scene")) || 1;
      focusLongscrollCastQaScene(sceneNumber, { instant: true });
      return;
    }
    const milestones = getMilestoneViews();
    const next = nextRepairMilestone();
    const characterMilestone = longscrollCharacterMilestone(next, milestones);
    const focusMilestone = repairReturnCastMilestoneId || !LONGSCROLL_LOCATION_CAST[next?.id]
      ? characterMilestone
      : next;
    if (focusMilestone?.longscrollRegionIds?.length) {
      centerInnSceneOnPosition(focusMilestone.longscrollRegionIds);
    }
  });
}

function centerInnSceneOnPosition(regionIds) {
  const bounds = LONGSCROLL_REGION_BOUNDS[regionIds?.[0]];
  if (!bounds) return false;
  const [left, top, width, height] = bounds;
  return focusInnSceneOnPoint(left + width / 2, top + height / 2, { behavior: "auto", verticalRatio: 0.5 });
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
      if (!isCurrent || !ready) return "";
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
  const awaitingExpansion = Boolean(next && milestoneInnLevel(next) > state.innLevel);
  const repairGate = canEnterRepairPage();
  const ready = next && !awaitingExpansion && next.done && repairGate.ok && !selectedRenovationChoice(next);
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
      <b>${awaitingExpansion ? "下一阶段即将开启" : next ? next.sceneName ?? next.name : "本级修缮完成"}</b>
      <span>${awaitingExpansion ? "完成当前阶段后将自动开放后续修缮。" : next ? repairGate.ok ? next.nextText : repairGate.reason : "可以准备进入下一阶段。"}</span>
      ${next && !next.done && !awaitingExpansion ? `<small>${next.id === "tutorial_complete" ? "先完成一单，再用赚到的铜钱修缮。" : "修完上一处，就能继续修缮这里。"}</small>` : ""}
    </div>
    <div class="mainline-rail">
      ${milestones
        .map((milestone, index) => {
          const choice = selectedRenovationChoice(milestone);
          const isCurrent = !awaitingExpansion && next?.id === milestone.id;
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
      next && !awaitingExpansion
        ? `<button class="mainline-action ${ready ? "ready" : ""}" data-mainline="${next.id}" ${ready ? "" : "disabled"}>${ready ? state.activeRepairId === next.id ? "继续修缮" : "进入修缮" : "等待主线或铜钱"}</button>`
        : `<span class="mainline-action" aria-live="polite">正在开启下一阶段</span>`
    }
  `;
  els.furnitureShop.querySelectorAll("[data-order-progress-pack]").forEach((button) => {
    button.addEventListener("click", () => claimOrderProgressPack(button.dataset.orderProgressPack));
  });
  els.furnitureShop.querySelectorAll("[data-mainline]").forEach((button) => {
    button.addEventListener("click", () => handleRepairNodeClick(button.dataset.mainline, button));
  });
}

function renderOrderProgressGiftRail() {
  const chapter = activeStoryChapter();
  const count = state.chapterOrderCounts[chapter] ?? 0;
  const entries = (state.progressionConfig?.orderProgressPacks ?? []).filter((entry) => entry.chapter === chapter);
  if (!entries.length) return "";
  return `
    <section class="order-progress-gifts" aria-label="本卷订单礼盒">
      <div class="order-progress-copy"><b>${chapterName(chapter)}</b><span>本卷 ${count} 单</span></div>
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
    toast(`本卷再完成${entry.threshold - count}单即可领取。`);
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
  if (!milestone.done && state.activeRepairId !== milestone.id) {
    keeper(milestone.nextText);
    toast(milestone.nextText);
    return;
  }
  setRepairAnchor(anchorElement);
  playLongscrollRepairHaloEntry(milestone, () => beginRepairMilestone(milestone));
}

function beginRepairMilestone(milestone) {
  if (!milestone?.playerUrl) {
    toast("该点位的修缮场景尚未接入。");
    return;
  }
  const gate = canEnterRepairPage();
  if (!gate.ok || gate.milestone?.id !== milestone.id) {
    toast(gate.reason || "请先完成当前主线修缮。");
    return;
  }
  if (state.activeRepairId && state.activeRepairId !== milestone.id) {
    const activeMilestone = getMilestoneViews().find((entry) => entry.id === state.activeRepairId);
    toast(`请先继续修缮：${activeMilestone?.sceneName ?? activeMilestone?.name ?? "当前区域"}。`);
    return;
  }
  const continuingRepair = state.activeRepairId === milestone.id;
  state.activeRepairId = milestone.id;
  ensureRepairProgress(milestone);
  saveState();
  if (continuingRepair) {
    launchRepairPlayer(milestone);
    return;
  }
  playChapterStory(`before:${milestone.id}`, () => launchRepairPlayer(milestone), { force: true });
}

function playLongscrollRepairHaloEntry(milestone, afterAnimation) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const halo = els.innScene.querySelector(`[data-repair-halo="${milestone.id}"]`);
  if (reducedMotion || !halo) {
    afterAnimation?.();
    return;
  }
  if (halo.classList.contains("is-entering-repair")) return;
  clearTimeout(repairPulseTimer);
  halo.classList.add("is-entering-repair");
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    clearTimeout(repairPulseTimer);
    repairPulseTimer = null;
    halo.classList.remove("is-entering-repair");
    afterAnimation?.();
  };
  halo.addEventListener("animationend", finish, { once: true });
  repairPulseTimer = setTimeout(finish, 320);
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
  const innLevel = milestone.innLevel ?? milestoneInnLevel(milestone);
  const levelMilestones = getMilestoneViews().filter((entry) => entry.innLevel === innLevel);
  const completedCount = levelMilestones.filter((entry) => state.renovationChoices[entry.id]).length;
  const nextInLevel = levelMilestones.find((entry) => !state.renovationChoices[entry.id]);
  const chapterComplete = isChapterRepairComplete(chapter);
  const focusMilestone = mode === "completion" ? nextInLevel ?? milestone : milestone;
  const chapterReward = chapterCompletionReward(chapter);

  els.repairTitle.textContent = milestone.sceneName ?? milestone.name;
  els.repairAvatar.src = repairAvatarSrc(milestone.npcId);
  els.repairAvatar.alt = milestone.speaker ?? "旅人";
  els.repairAvatar.dataset.npcId = milestone.npcId ?? "";
  els.repairSpeaker.textContent = milestone.speaker ?? "流沙驿";
  els.repairStory.textContent = mode === "completion"
    ? milestone.completionText ?? "这一处已经修缮妥当。"
    : milestone.storyText ?? milestone.nextText;
  els.repairChapterTitle.textContent = `Lv${innLevel} · 第${chapter}卷 ${chapterName(chapter)}`;
  els.repairChapterProgress.textContent = `${completedCount}/${levelMilestones.length}`;
  els.repairChapterProgressBar.style.width = `${levelMilestones.length ? (completedCount / levelMilestones.length) * 100 : 0}%`;
  els.repairMilestoneStrip.innerHTML = levelMilestones.map((entry) => {
    const completed = Boolean(state.renovationChoices[entry.id]);
    const current = !completed && nextInLevel?.id === entry.id;
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
  els.repairNextLine.textContent = mode === "entry" || mode === "unlock"
    ? `当前：修缮${milestone.sceneName ?? milestone.name}`
    : nextInLevel
      ? `下一处：修缮${nextInLevel.sceneName ?? nextInLevel.name}`
      : followingMilestone
        ? `下一阶段：Lv${milestoneInnLevel(followingMilestone)} · ${chapterName(followingMilestone.chapter)}`
        : "四卷修缮已经全部完成";
  els.repairCompletionTitle.textContent = `第${chapter}卷通关礼盒`;
  renderRepairCompletionRewards(chapterComplete ? chapterReward : null);
  els.repairModal.classList.toggle("chapter-complete", chapterComplete);
  els.repairChoices.innerHTML = "";
  els.repairChoices.hidden = true;
  els.repairConfirmBtn.classList.toggle("progress-continue", mode === "completion" || mode === "unlock");
  const qaPosition = renderRepairQaNavigation(milestone);
  if (REPAIR_PROGRESS_QA_MODE) {
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
  } else if (mode === "unlock") {
    els.repairCoinProgress.textContent = state.currentPage === "board" ? "前往长卷" : "查看修缮点";
    els.repairConfirmBtn.disabled = false;
    els.repairConfirmBtn.classList.add("ready");
    els.repairConfirmBtn.classList.remove("insufficient", "unselected");
    els.repairConfirmBtn.setAttribute("aria-label", `前往长卷查看${milestone.sceneName ?? milestone.name}`);
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
  const continuing = milestone && state.activeRepairId === milestone.id;
  const canEnter = Boolean(milestone);
  els.repairCoinProgress.textContent = continuing ? "继续修缮" : "进入修缮";
  els.repairConfirmBtn.disabled = !canEnter;
  els.repairConfirmBtn.classList.toggle("ready", canEnter);
  els.repairConfirmBtn.classList.remove("insufficient");
  els.repairConfirmBtn.classList.remove("unselected");
  els.repairConfirmBtn.setAttribute(
    "aria-label",
    continuing ? "继续未完成的修缮" : "进入修缮，逐处支付铜钱",
  );
}

function continueAfterRepairProgress() {
  const next = nextRepairMilestone();
  activeRepairMilestoneId = null;
  activeRepairChoiceId = null;
  closeRepairModalToAnchor(() => {
    repairModalMode = "entry";
    if (!next) return;
    pendingInnFocusPosition = next.longscrollRegionIds;
    centerInnSceneOnPosition(next.longscrollRegionIds);
  });
}

function continueAfterRepairUnlock() {
  const milestone = getMilestoneViews().find((entry) => entry.id === activeRepairMilestoneId);
  activeRepairMilestoneId = null;
  activeRepairChoiceId = null;
  closeRepairModalToAnchor(() => {
    repairModalMode = "entry";
    if (!milestone) return;
    pendingInnFocusPosition = milestone.longscrollRegionIds;
    if (state.currentPage === "board") {
      switchPage("inn");
      return;
    }
    lastInnFocusKey = null;
    requestAnimationFrame(() => centerInnSceneOnPosition(milestone.longscrollRegionIds));
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
  if (repairModalMode === "unlock") {
    continueAfterRepairUnlock();
    return;
  }
  if (!activeRepairMilestoneId) return;
  const milestone = getMilestoneViews().find((entry) => entry.id === activeRepairMilestoneId);
  if (!milestone || (state.activeRepairId && state.activeRepairId !== milestone.id)) return;
  if (!milestone.playerUrl) {
    toast("该点位的修缮场景尚未接入。");
    return;
  }
  closeRepairModalToAnchor(() => {
    beginRepairMilestone(milestone);
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
        refreshLongscrollCharacters();
      }
      onComplete?.();
    },
  });
}

function pendingChapterOpeningId() {
  const chapter = volumeForInnLevel(state.innLevel);
  if (chapter < 2 || chapter > 4 || state.storyFlags[`chapter${chapter}StoryOpeningSeen`]) return null;
  if (state.innLevel !== VOLUME_START_LEVELS[chapter]) return null;
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
      if (milestone) finishRepairAfterStory(milestone);
    };
  }
  const openingMatch = segmentId.match(/^chapter([2-4])-opening$/);
  if (!openingMatch) return null;
  return () => {
    pendingInnUpgradeRevealLevel = VOLUME_START_LEVELS[Number(openingMatch[1])];
    showPendingInnUpgradeReveal();
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
    return Boolean(state.storyFlags[`chapter${chapter}StoryOpeningSeen`] || state.innLevel >= VOLUME_START_LEVELS[chapter]);
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

function storyArchiveFootnotes(chapter = null) {
  const notes = window.SilkRoadChapterStory?.archiveFootnotes ?? [];
  return chapter === null ? notes : notes.filter((note) => note.chapter === chapter);
}

function storyArchiveFootnoteUnlocked(note) {
  if (!note?.segmentId) return false;
  if (chapterStorySeen(note.segmentId)) return true;
  return state.activeChapterStory?.segmentId === note.segmentId
    && Number(state.activeChapterStory.index) >= Number(note.stepIndex);
}

function unlockedStoryArchiveFootnotes(chapter = null) {
  return storyArchiveFootnotes(chapter).filter(storyArchiveFootnoteUnlocked);
}

function historicalNoteUnlocked(note) {
  if (!note) return false;
  if (note.repairId) return isRepairCompleted(note.repairId);
  if (note.orderId) return state.completedOrderIds.includes(note.orderId);
  return false;
}

function historicalNoteAnswered(noteId) {
  return state.answeredHistoricalNoteIds.includes(noteId);
}

function unreadHistoricalNotes(chapter = null) {
  return HISTORICAL_NOTES.filter((note) =>
    historicalNoteUnlocked(note)
    && !historicalNoteAnswered(note.id)
    && (chapter === null || note.chapter === chapter));
}

function unlockedHistoricalNotes(chapter = null) {
  const repairOrder = new Map((state.progressionConfig?.milestones ?? []).map((milestone, index) => [milestone.id, index]));
  return HISTORICAL_NOTES.filter((note) => historicalNoteUnlocked(note) && (chapter === null || note.chapter === chapter))
    .sort((left, right) => (left.chapter - right.chapter)
      || ((left.orderId ? -1 : (repairOrder.get(left.repairId) ?? 999))
        - (right.orderId ? -1 : (repairOrder.get(right.repairId) ?? 999))));
}

function historicalNoteArchiveImageSrc(note) {
  if (note?.orderId && note.image?.src) return note.image.src;
  return `./assets/history/clues/${note.id}.webp`;
}

function historicalNoteForOrder(orderId) {
  return HISTORICAL_NOTES.find((note) => note.orderId === orderId) ?? null;
}

function historicalNoteForRepair(repairId) {
  return HISTORICAL_NOTES.find((note) => note.repairId === repairId) ?? null;
}

function weightedHistoricalReward(options) {
  const roll = Math.random() * options.reduce((sum, option) => sum + option.weight, 0);
  let cursor = 0;
  return options.find((option) => {
    cursor += option.weight;
    return roll < cursor;
  })?.value;
}

function historicalRewardFoodId(level) {
  const candidates = state.items.filter((item) =>
    Number(item.level) === level
    && typeof item.line === "string"
    && foodLineMaxLevels.has(item.line)
    && byId.has(item.id));
  return candidates[Math.floor(Math.random() * candidates.length)]?.id ?? "hubing_03_humabing";
}

function createHistoricalNoteReward(note, chosenIndex, grantSplitterIntroReward = false, grantUpgradeToolReward = false) {
  const correct = chosenIndex === note.answerIndex;
  const addOccasionalThirdItem = (items, options, chance = 0.3) => {
    if (Math.random() < chance) items.push(weightedHistoricalReward(options));
    return items;
  };
  const coinOptions = [
    { weight: 75, value: bonusCoinId(1) },
    { weight: 22, value: bonusCoinId(2) },
    { weight: 3, value: bonusCoinId(3) },
  ];
  const foodOptions = [
    { weight: 65, value: historicalRewardFoodId(3) },
    { weight: 18, value: historicalRewardFoodId(4) },
    { weight: 12, value: bonusCoinId(1) },
    { weight: 4, value: `${BONUS_RUBY_PREFIX}01` },
    { weight: 1, value: `${BONUS_RUBY_PREFIX}02` },
  ];
  const consolationOptions = [
    { weight: 68, value: bonusCoinId(1) },
    { weight: 25, value: historicalRewardFoodId(3) },
    { weight: 5, value: bonusCoinId(2) },
    { weight: 2, value: `${BONUS_RUBY_PREFIX}01` },
  ];
  const bags = correct
    ? [
      addOccasionalThirdItem([bonusCoinId(1), weightedHistoricalReward(coinOptions)], coinOptions),
      addOccasionalThirdItem([historicalRewardFoodId(3), weightedHistoricalReward(foodOptions)], foodOptions),
    ]
    : [addOccasionalThirdItem([bonusCoinId(1), weightedHistoricalReward(consolationOptions)], consolationOptions, 0.2)];
  if (correct && grantSplitterIntroReward) {
    bags[1].push(SPLITTER_TOOL_ITEM_ID);
  }
  if (correct && grantUpgradeToolReward) {
    bags[1].push(UPGRADE_TOOL_ITEM_ID);
  }
  const validBags = bags.map((bag) => bag.filter((itemId) => byId.has(itemId)));
  return {
    schemaVersion: HISTORICAL_REWARD_SCHEMA_VERSION,
    bags: validBags,
    itemIds: validBags.flat(),
    openedBagIndexes: [],
    chosenIndex,
    correct,
    claimed: false,
  };
}

function showHistoricalAnswerFeedback(note, chosenIndex) {
  const correct = chosenIndex === note.answerIndex;
  [...els.historicalNoteChoices.children].forEach((button, index) => {
    button.setAttribute("aria-pressed", String(index === chosenIndex));
    button.dataset.result = index === note.answerIndex ? "correct" : (index === chosenIndex ? "reconsider" : "");
    button.disabled = true;
  });
  els.historicalNoteFeedback.dataset.result = correct ? "correct" : "reconsider";
  els.historicalNoteFeedbackLabel.textContent = correct ? "✓ 猜对啦！" : "↺ 谜底揭晓";
  els.historicalNoteFeedbackText.textContent = note.feedback;
  els.historicalNoteTakeaway.textContent = note.takeaway;
  els.historicalNoteFeedback.hidden = false;
  els.historicalNoteSourcesPanel.hidden = false;
  document.getElementById("historicalNoteSourceToggle").setAttribute("aria-expanded", "true");
}

function renderHistoricalNoteReward(note) {
  const reward = state.historicalNoteRewards?.[note.id];
  const animationRun = ++historicalRewardAnimationRun;
  els.historicalNoteReward.hidden = !reward || reward.claimed;
  els.historicalNoteReward.classList.remove("is-completing");
  els.historicalNoteRewardBags.replaceChildren();
  els.historicalNoteRewardItems.replaceChildren();
  if (!reward || reward.claimed) return;

  const unopenedBags = [];
  reward.bags.forEach((bag, bagIndex) => {
    const opened = reward.openedBagIndexes.includes(bagIndex);
    if (!opened) {
      const bagNode = document.createElement("span");
      bagNode.className = "historical-note-falling-bag";
      bagNode.style.setProperty("--bag-index", String(bagIndex));
      bagNode.setAttribute("aria-hidden", "true");
      bagNode.innerHTML = '<img src="./assets/ui/ui_daily_pomegranate_pouch_v2.png" alt="" />';
      els.historicalNoteRewardBags.append(bagNode);
      unopenedBags.push({ bagIndex, bagNode });
    } else {
      appendHistoricalRewardRow(bag, bagIndex, false);
    }
  });
  unopenedBags.forEach(({ bagIndex, bagNode }, sequenceIndex) => {
    setTimeout(() => {
      if (historicalRewardAnimationRun !== animationRun || !bagNode.isConnected) return;
      revealHistoricalNoteRewardBag(note, bagIndex, bagNode, animationRun);
    }, 1120 + sequenceIndex * 620);
  });
}

function appendHistoricalRewardRow(itemIds, bagIndex, animate = true) {
  const row = document.createElement("div");
  row.className = `historical-note-reward-row${animate ? " is-revealing" : ""}`;
  row.style.setProperty("--reward-row", String(bagIndex));
  itemIds.forEach((itemId, itemIndex) => {
    const item = byId.get(itemId);
    if (!item) return;
    const card = document.createElement("span");
    card.className = "historical-note-reward-item";
    card.style.setProperty("--reward-index", String(itemIndex));
    card.setAttribute("role", "img");
    card.setAttribute("aria-label", ["splitter_tool", "upgrade_tool"].includes(item.type)
      ? `${item.name}，稀有道具`
      : `${item.name}，${item.level ?? 1}级`);
    card.innerHTML = `<img src="${itemAssetSrc(item)}" alt="" />`;
    row.append(card);
  });
  els.historicalNoteRewardItems.append(row);
}

function revealHistoricalNoteRewardBag(note, bagIndex, bagNode, animationRun) {
  const reward = state.historicalNoteRewards?.[note.id];
  if (historicalRewardAnimationRun !== animationRun
    || !reward
    || reward.claimed
    || reward.openedBagIndexes.includes(bagIndex)) return;
  reward.openedBagIndexes.push(bagIndex);
  reward.openedBagIndexes.sort((left, right) => left - right);
  bagNode.classList.add("is-opening");
  setTimeout(() => {
    if (historicalRewardAnimationRun !== animationRun) return;
    bagNode.remove();
    appendHistoricalRewardRow(reward.bags[bagIndex], bagIndex);
  }, 360);
  const allOpened = reward.openedBagIndexes.length === reward.bags.length;
  if (!allOpened) {
    saveState();
    return;
  }
  reward.itemIds.forEach((itemId) => grantRewardItem(itemId));
  reward.claimed = true;
  saveState();
  renderBagButton();
  setTimeout(() => {
    if (historicalRewardAnimationRun === animationRun) {
      els.historicalNoteReward.classList.add("is-completing");
    }
  }, 1850);
  setTimeout(() => {
    if (historicalRewardAnimationRun !== animationRun) return;
    els.historicalNoteReward.hidden = true;
    els.historicalNoteReward.classList.remove("is-completing");
  }, 2320);
}

function renderHistoricalNote(note) {
  els.historicalNoteModal.dataset.noteId = note.id;
  els.historicalNoteModal.dataset.chapter = String(note.chapter);
  els.historicalNoteKind.textContent = note.kind;
  els.historicalNoteGlyph.textContent = note.glyph;
  els.historicalNoteTitle.textContent = note.title;
  els.historicalNoteLead.textContent = note.teaser;
  els.historicalNoteVisual.hidden = !note.image;
  if (note.image) {
    els.historicalNoteImage.src = note.image.src;
    els.historicalNoteImage.alt = note.image.alt;
    els.historicalNoteImageCaption.textContent = note.image.caption;
    els.historicalNoteImageCredit.href = note.image.creditUrl;
    els.historicalNoteImageCredit.textContent = note.image.creditLabel;
    els.historicalNoteImageLicense.href = note.image.licenseUrl;
    els.historicalNoteImageLicense.textContent = note.image.licenseLabel;
  } else {
    els.historicalNoteImage.removeAttribute("src");
  }
  els.historicalNoteClueLabel.textContent = note.clueLabel;
  els.historicalNoteClueTitle.textContent = note.clueTitle;
  els.historicalNoteEvidence.textContent = note.evidence;
  els.historicalNoteQuestion.textContent = note.question;
  els.historicalNoteChoices.replaceChildren(...note.choices.map((choice, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "historical-note-choice";
    button.dataset.letter = String.fromCharCode(65 + index);
    button.textContent = choice;
    button.setAttribute("aria-pressed", "false");
    button.addEventListener("click", () => answerHistoricalNote(note, index));
    return button;
  }));
  els.historicalNoteFeedback.hidden = true;
  els.historicalNoteReward.hidden = true;
  els.historicalNoteSourcesPanel.hidden = true;
  const sourceToggle = document.getElementById("historicalNoteSourceToggle");
  sourceToggle.setAttribute("aria-expanded", "false");
  sourceToggle.onclick = () => {
    els.historicalNoteSourcesPanel.hidden = !els.historicalNoteSourcesPanel.hidden;
    sourceToggle.setAttribute("aria-expanded", String(!els.historicalNoteSourcesPanel.hidden));
    if (!els.historicalNoteSourcesPanel.hidden) els.historicalNoteSourcesPanel.scrollIntoView({ block: "nearest" });
  };
  els.historicalNoteSources.replaceChildren(...note.sources.map((source) => {
    const link = document.createElement("a");
    link.href = source.url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = source.label;
    return link;
  }));
  const storedReward = state.historicalNoteRewards?.[note.id];
  if (storedReward) {
    showHistoricalAnswerFeedback(note, storedReward.chosenIndex);
    renderHistoricalNoteReward(note);
  }
  els.historicalNoteSheet.scrollTop = 0;
}

function answerHistoricalNote(note, chosenIndex) {
  if (!els.historicalNoteFeedback.hidden) return;
  showHistoricalAnswerFeedback(note, chosenIndex);
  if (!historicalNoteAnswered(note.id)) {
    const grantSplitterIntroReward = chosenIndex === note.answerIndex && !state.splitterIntroRewardClaimed;
    const grantUpgradeToolReward = chosenIndex === note.answerIndex && Math.random() < 0.04;
    state.answeredHistoricalNoteIds.push(note.id);
    state.historicalNoteRewards[note.id] = createHistoricalNoteReward(
      note,
      chosenIndex,
      grantSplitterIntroReward,
      grantUpgradeToolReward,
    );
    if (grantSplitterIntroReward) state.splitterIntroRewardClaimed = true;
    saveState();
    renderStoryArchiveEntry();
  }
  renderHistoricalNoteReward(note);
  els.historicalNoteFeedback.scrollIntoView({ block: "nearest" });
}

function openHistoricalNote(noteId, { returnToArchive = false } = {}) {
  const note = historicalNotesById.get(noteId);
  if (!note || !historicalNoteUnlocked(note) || !els.historicalNoteModal) return;
  const returnChapter = returnToArchive ? activeStoryArchiveChapter : null;
  const show = () => {
    renderHistoricalNote(note);
    historicalNoteReturnChapter = returnChapter;
    els.historicalNoteModal.showModal();
    requestAnimationFrame(() => {
      if (els.historicalNoteModal.open) els.historicalNoteSheet.scrollTop = 0;
    });
  };
  if (returnToArchive && els.storyArchiveModal?.open) closeStoryArchive(show);
  else show();
}

function waitForHistoricalTransition(duration) {
  return new Promise((resolve) => setTimeout(resolve, duration));
}

function milestoneCenter(milestone) {
  const bounds = LONGSCROLL_REGION_BOUNDS[milestone?.longscrollRegionIds?.[0]];
  if (!bounds) return null;
  const [left, top, width, height] = bounds;
  return { x: left + width / 2, y: top + height / 2 };
}

async function playHistoricalCastTransition(completedMilestone) {
  const next = nextRepairMilestone();
  const availableNext = next && milestoneInnLevel(next) <= state.innLevel ? next : null;
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
  const currentMap = els.innScene?.querySelector(".longscroll-map");
  const currentLayer = currentMap?.querySelector(".longscroll-character-layer");
  const currentCenter = milestoneCenter(completedMilestone);
  const nextCenter = milestoneCenter(availableNext);
  const travelDirection = currentCenter && nextCenter && nextCenter.x < currentCenter.x ? -1 : 1;

  if (!reducedMotion && currentLayer) {
    currentLayer.style.setProperty("--cast-travel-x", `${travelDirection * 44}px`);
    currentLayer.style.setProperty("--cast-travel-x-small", `${travelDirection * 11}px`);
    currentLayer.style.setProperty("--cast-travel-x-medium", `${travelDirection * 21}px`);
    currentLayer.querySelector(".longscroll-character-npc")?.classList.add("is-departing");
    currentLayer.querySelector(".longscroll-character-keeper")?.classList.add("is-setting-out");
    await waitForHistoricalTransition(680);
  }

  repairReturnCastMilestoneId = null;
  pendingInnFocusPosition = null;
  lastInnFocusKey = availableNext?.id ?? completedMilestone.id;
  if (LONGSCROLL_CAST_QA_MODE && availableNext) {
    const nextScene = state.progressionConfig.milestones.findIndex((entry) => entry.id === availableNext.id) + 1;
    const url = new URL(location.href);
    url.searchParams.set("scene", String(nextScene));
    history.replaceState(null, "", url);
  }
  render();
  if (LONGSCROLL_CAST_QA_MODE) renderLongscrollCastQaNav();

  if (!availableNext || !nextCenter || reducedMotion) {
    if (availableNext?.longscrollRegionIds?.length) centerInnSceneOnPosition(availableNext.longscrollRegionIds);
    saveState();
    if (availableNext) setTimeout(maybePromptRepairGuide, 0);
    return;
  }

  const map = els.innScene.querySelector(".longscroll-map");
  const arrivingLayer = map?.querySelector(".longscroll-character-layer");
  map?.classList.add("is-cast-transitioning");
  arrivingLayer?.classList.add("is-awaiting-arrival");
  focusInnSceneOnPoint(nextCenter.x, nextCenter.y, { behavior: "smooth", verticalRatio: 0.5 });
  await waitForHistoricalTransition(1450);
  arrivingLayer?.classList.remove("is-awaiting-arrival");
  arrivingLayer?.classList.add("is-arriving-after-journey");
  await waitForHistoricalTransition(620);
  map?.classList.remove("is-cast-transitioning");
  arrivingLayer?.classList.remove("is-arriving-after-journey");
  saveState();
  setTimeout(maybePromptRepairGuide, 0);
}

async function beginHistoricalCastTransitionAfterClose(note) {
  const completedMilestone = getMilestoneViews().find((entry) => entry.id === note.repairId);
  if (!completedMilestone || repairReturnCastMilestoneId !== note.repairId) return;
  historicalNoteTransitioning = true;
  const map = els.innScene?.querySelector(".longscroll-map");
  map?.classList.add("is-cast-transition-reset");
  resetLongscrollClueCamera();
  historicalNoteReturnChapter = null;
  try {
    await waitForHistoricalTransition(520);
    if (isChapterRepairComplete(completedMilestone.chapter)) {
      repairReturnCastMilestoneId = null;
      playChapterStory(`after:${completedMilestone.id}`, () => {
        if (
          completedMilestone.id === FINAL_REPAIR_MILESTONE_ID
          && shouldShowInnFinale()
          && showInnFinale({ milestone: completedMilestone })
        ) return;
        restoreRepairReturnView(completedMilestone, {
          promptNextRepair: false,
          focusMilestone: completedMilestone,
        });
      });
      return;
    }
    await playHistoricalCastTransition(completedMilestone);
  } finally {
    historicalNoteTransitioning = false;
  }
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
  return storyArchiveMoments(chapter).some((moment) => storyArchiveMomentIsUnlocked(moment, unlockedIds))
    || unlockedStoryArchiveFootnotes(chapter).length > 0
    || unlockedHistoricalNotes(chapter).length > 0;
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
  const footnoteCount = unlockedStoryArchiveFootnotes().length;
  const unreadCount = firstRepairReturnGuidePending() ? 0 : unreadHistoricalNotes().length;
  els.storyArchiveBtn.disabled = false;
  els.storyArchiveBtn.dataset.unreadNotes = String(unreadCount);
  els.storyArchiveBtn.classList.toggle("has-unread-note", unreadCount > 0);
  els.storyArchiveBtn.setAttribute("aria-label", unreadCount
    ? `回顾已解锁剧情，${unreadCount}则新见闻未读`
    : count || footnoteCount ? "回顾已解锁剧情与史实旁注" : "查看剧情回顾，尚未有纪事");
  els.storyArchiveBtn.title = "剧情回顾";
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
  const lastStep = segment?.steps ? [...segment.steps].reverse().find(Array.isArray) : null;
  if (!els.storyArchiveRecent) return;
  if (!segmentId || !segment || !lastStep) {
    els.storyArchiveRecent.hidden = true;
    delete els.storyArchiveRecent.dataset.storyMomentId;
    delete els.storyArchiveRecent.dataset.storySegmentId;
    return;
  }
  els.storyArchiveRecent.hidden = false;
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
  const availableChapters = unlockedChapters.length ? unlockedChapters : [1];
  const normalizedRequest = Number(requestedChapter);
  activeStoryArchiveChapter = availableChapters.includes(normalizedRequest)
    ? normalizedRequest
    : availableChapters[availableChapters.length - 1];
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
  const unlockedFootnotes = unlockedStoryArchiveFootnotes();
  const unlockedNotes = unlockedHistoricalNotes();
  const archiveIsEmpty = unlockedMoments.length === 0 && unlockedFootnotes.length === 0 && unlockedNotes.length === 0;
  els.storyArchiveTotal.textContent = archiveIsEmpty
    ? "尚无纪事"
    : `${unlockedMoments.length} 则剧情 · ${unlockedFootnotes.length + unlockedNotes.length} 则旁注`;
  renderStoryArchiveRecent(unlockedIds);
  els.storyArchiveChapters.replaceChildren();
  [1, 2, 3, 4].forEach((chapter) => {
    const unlocked = storyArchiveChapterIsUnlocked(chapter, unlockedIds) || (archiveIsEmpty && chapter === 1);
    const button = document.createElement("button");
    button.type = "button";
    button.dataset.storyArchiveChapter = String(chapter);
    button.disabled = !unlocked;
    button.setAttribute("aria-selected", String(chapter === activeStoryArchiveChapter));
    button.setAttribute("aria-label", unlocked ? `查看第${chapter}卷剧情` : `第${chapter}卷尚未解锁`);
    button.textContent = `第${chapter}卷`;
    els.storyArchiveChapters.append(button);
  });

  const chapterMoments = storyArchiveMoments(activeStoryArchiveChapter);
  const availableMoments = chapterMoments.filter((moment) => storyArchiveMomentIsUnlocked(moment, unlockedIds));
  const chapterFootnotes = unlockedStoryArchiveFootnotes(activeStoryArchiveChapter);
  const chapterNotes = unlockedHistoricalNotes(activeStoryArchiveChapter);
  els.storyArchiveChapterEyebrow.textContent = `第${activeStoryArchiveChapter}卷`;
  els.storyArchiveChapterTitle.textContent = chapterName(activeStoryArchiveChapter);
  els.storyArchiveChapterCount.textContent = `剧情 ${availableMoments.length} · 旁注 ${chapterFootnotes.length + chapterNotes.length}`;
  els.storyArchiveList.replaceChildren();

  availableMoments.forEach((archiveMoment, momentIndex) => {
    const segment = player.segments[archiveMoment.segmentIds[0]];
    const firstStep = segment?.steps?.find(Array.isArray);
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

  if (!availableMoments.length && !chapterFootnotes.length && !chapterNotes.length) {
    const empty = document.createElement("div");
    empty.className = "story-archive-empty";
    const title = document.createElement("strong");
    const hint = document.createElement("span");
    title.textContent = "尚未有纪事";
    hint.textContent = "完成旅程后将在此记录";
    empty.append(title, hint);
    els.storyArchiveList.append(empty);
  } else if (availableMoments.length < chapterMoments.length) {
    const next = document.createElement("div");
    next.className = "story-archive-next";
    next.textContent = "新的纪事将在旅途中写下";
    els.storyArchiveList.append(next);
  }
  if (chapterFootnotes.length) {
    const heading = document.createElement("h4");
    heading.className = "story-archive-notes-heading";
    heading.textContent = "史实旁注";
    els.storyArchiveList.append(heading);
    chapterFootnotes.forEach((note) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "story-archive-card story-archive-note-card story-archive-footnote-card";
      card.dataset.storyFootnoteKey = note.key;
      card.setAttribute("aria-label", `回看第${note.storyChapterNumber}章旁注：${note.title}`);
      const glyph = document.createElement("span");
      glyph.className = "historical-note-glyph";
      glyph.textContent = note.glyph;
      glyph.setAttribute("aria-hidden", "true");
      const copy = document.createElement("span");
      const kind = document.createElement("small");
      kind.textContent = `第${note.storyChapterNumber}章 · ${note.kind}`;
      const title = document.createElement("strong");
      title.textContent = note.title;
      const teaser = document.createElement("em");
      teaser.textContent = note.text;
      copy.append(kind, title, teaser);
      const arrow = document.createElement("i");
      arrow.textContent = "›";
      arrow.setAttribute("aria-hidden", "true");
      card.append(glyph, copy, arrow);
      els.storyArchiveList.append(card);
    });
  }
  if (chapterNotes.length) {
    const heading = document.createElement("h4");
    heading.className = "story-archive-notes-heading";
    heading.textContent = "驿站见闻";
    els.storyArchiveList.append(heading);
    chapterNotes.forEach((note) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "story-archive-card story-archive-note-card";
      card.dataset.historicalNoteId = note.id;
      const unread = !historicalNoteAnswered(note.id);
      card.classList.toggle("is-unread-note", unread);
      card.setAttribute("aria-label", unread ? `阅读新见闻：${note.title}` : `阅读${note.kind}：${note.title}`);
      const thumbnail = document.createElement("span");
      thumbnail.className = "historical-note-thumbnail";
      thumbnail.setAttribute("aria-hidden", "true");
      const image = document.createElement("img");
      image.src = historicalNoteArchiveImageSrc(note);
      image.alt = "";
      thumbnail.append(image);
      const copy = document.createElement("span");
      const kind = document.createElement("small");
      kind.textContent = note.kind;
      const title = document.createElement("strong");
      title.textContent = note.title;
      const teaser = document.createElement("em");
      teaser.textContent = note.teaser;
      copy.append(kind, title, teaser);
      const arrow = document.createElement("i");
      arrow.textContent = "›";
      arrow.setAttribute("aria-hidden", "true");
      card.append(thumbnail, copy, arrow);
      els.storyArchiveList.append(card);
    });
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
  const card = event.target.closest("button[data-story-segment-id], button[data-story-moment-id], button[data-story-footnote-key], button[data-historical-note-id]");
  if (!card) return;
  if (card.dataset.historicalNoteId) openHistoricalNote(card.dataset.historicalNoteId, { returnToArchive: true });
  else if (card.dataset.storyFootnoteKey) replayChapterStoryFootnote(card.dataset.storyFootnoteKey);
  else if (card.dataset.storyMomentId) replayChapterStoryMoment(card.dataset.storyMomentId);
  else replayChapterStory(card.dataset.storySegmentId);
}

function replayChapterStoryFootnote(footnoteKey) {
  const player = window.SilkRoadChapterStory;
  const note = storyArchiveFootnotes().find((entry) => entry.key === footnoteKey);
  if (!player || !note || !storyArchiveFootnoteUnlocked(note)) return;
  const startReplay = () => {
    player.play(note.segmentId, {
      review: true,
      startIndex: note.stepIndex,
      onComplete: () => openStoryArchive(note.chapter),
    });
  };
  if (els.storyArchiveModal.open) closeStoryArchive(startReplay);
  else startReplay();
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
  state.activeRepairId = milestone.id;
  setRepairOrientation(false, { native: false });
  ensureRepairProgress(milestone);
  openRepairMilestoneId = milestone.id;
  saveState();
  const playerUrl = new URL(milestone.playerUrl, location.href);
  playerUrl.searchParams.set("embedded", "1");
  playerUrl.searchParams.set("repairId", milestone.playerPointId);
  playerUrl.searchParams.set("milestoneId", milestone.id);
  const buildId = new URLSearchParams(location.search).get("build");
  if (buildId) playerUrl.searchParams.set("build", buildId);
  els.repairPlayerFrame.src = playerUrl.href;
  els.repairPlayerLayer.hidden = false;
}

let repairLandscapeMode = false;

function updateRepairOrientationControl() {
  if (!els.repairOrientationBtn) return;
  els.repairOrientationBtn.setAttribute("aria-pressed", String(repairLandscapeMode));
  els.repairOrientationBtn.setAttribute(
    "aria-label",
    repairLandscapeMode ? "返回竖屏修缮" : "推荐横屏修缮",
  );
  const label = els.repairOrientationBtn.querySelector("b");
  if (label) label.textContent = repairLandscapeMode ? "返回竖屏" : "推荐横屏修缮";
}

async function setRepairOrientation(enabled, { native = true } = {}) {
  repairLandscapeMode = Boolean(enabled);
  els.repairPlayerLayer?.classList.toggle("is-landscape", repairLandscapeMode);
  updateRepairOrientationControl();

  if (!native) return;
  if (repairLandscapeMode) {
    try {
      if (!document.fullscreenElement && els.repairPlayerLayer?.requestFullscreen) {
        await els.repairPlayerLayer.requestFullscreen({ navigationUI: "hide" });
      }
      await screen.orientation?.lock?.("landscape");
    } catch {
      // The CSS rotation below is the fallback for browsers that cannot lock orientation.
    }
    return;
  }

  try {
    screen.orientation?.unlock?.();
    if (document.fullscreenElement === els.repairPlayerLayer) await document.exitFullscreen();
  } catch {
    // Portrait restoration is already guaranteed by removing the layout class.
  }
}

function toggleRepairOrientation() {
  setRepairOrientation(!repairLandscapeMode);
}

function ensureRepairProgress(milestone) {
  if (!state.repairProgress || typeof state.repairProgress !== "object") state.repairProgress = {};
  const current = state.repairProgress[milestone.id] && typeof state.repairProgress[milestone.id] === "object"
    ? state.repairProgress[milestone.id]
    : {};
  const completedParts = state.renovationChoices[milestone.id]
    ? Array.from({ length: REPAIR_PART_COUNT }, (_, index) => index)
    : normalizeRepairCompletedParts(current.completedParts ?? current.completedPartIds);
  const partCosts = repairPartCosts(milestone);
  const remainingCost = partCosts.reduce(
    (sum, cost, index) => sum + (completedParts.includes(index) ? 0 : cost),
    0,
  );
  const progress = {
    pointId: milestone.playerPointId,
    completedParts,
    prepaidRemaining: state.renovationChoices[milestone.id]
      ? 0
      : Math.min(remainingCost, Math.max(0, Math.floor(Number(current.prepaidRemaining) || 0))),
  };
  state.repairProgress[milestone.id] = progress;
  return progress;
}

function repairPlayerMilestone(message = {}) {
  const milestoneId = openRepairMilestoneId ?? state.activeRepairId;
  const milestone = getMilestoneViews().find((entry) => entry.id === milestoneId);
  if (!milestone) return null;
  if (message.repairId != null && String(message.repairId) !== String(milestone.playerPointId)) return null;
  return milestone;
}

function repairPlayerTargetOrigin() {
  return location.origin === "null" ? "*" : location.origin;
}

function postRepairPlayerMessage(message) {
  els.repairPlayerFrame?.contentWindow?.postMessage(message, repairPlayerTargetOrigin());
}

function sendRepairPlayerInit(milestone) {
  const progress = ensureRepairProgress(milestone);
  postRepairPlayerMessage({
    type: "silkroad:repair-init",
    protocolVersion: REPAIR_PROTOCOL_VERSION,
    repairId: milestone.playerPointId,
    coins: repairPlayerCoinBalance(progress),
    walletCoins: state.coins,
    partCosts: repairPartCosts(milestone),
    completedParts: [...progress.completedParts],
    nextPartIndex: firstIncompleteRepairPart(progress.completedParts),
    prepaidRemaining: progress.prepaidRemaining,
  });
}

function repairPlayerCoinBalance(progress) {
  return state.coins + Math.max(0, Number(progress?.prepaidRemaining) || 0);
}

function handleRepairPlayerLoad() {
  const milestone = repairPlayerMilestone();
  if (milestone && !els.repairPlayerLayer?.hidden) sendRepairPlayerInit(milestone);
}

function handleRepairPlayerMessage(event) {
  if ((location.origin !== "null" && event.origin !== location.origin)
    || event.source !== els.repairPlayerFrame?.contentWindow
    || !event.data
    || typeof event.data !== "object") return;
  const message = event.data;
  const milestone = repairPlayerMilestone(message);
  if (!milestone) return;

  if (message.type === "silkroad:button-sound") {
    playSfx("click", { markSpecific: false });
    return;
  }

  if (message.type === "silkroad:repair-ready") {
    if (Number(message.partCount) !== REPAIR_PART_COUNT) {
      console.warn(`Repair player ${milestone.playerPointId} reported ${message.partCount} parts; expected ${REPAIR_PART_COUNT}.`);
    }
    sendRepairPlayerInit(milestone);
    return;
  }

  if (message.type === "silkroad:repair-part-request") {
    handleRepairPartRequest(milestone, message);
    return;
  }

  if (message.type === "silkroad:repair-part-applied") {
    const partIndex = Number.isInteger(message.partIndex) ? message.partIndex : null;
    const progress = ensureRepairProgress(milestone);
    if (partIndex === null || !progress.completedParts.includes(partIndex)) {
      sendRepairPlayerInit(milestone);
    }
    return;
  }

  if (message.type === "silkroad:repair-exit") {
    closeRepairPlayer(milestone, { completed: Boolean(state.renovationChoices[milestone.id]) });
    return;
  }

  if (message.type === "silkroad:repair-complete") {
    completeRepairFromPlayer(milestone.id);
  }
}

function handleRepairPartRequest(milestone, message) {
  const partIndex = Number.isInteger(message.partIndex) ? message.partIndex : null;
  const result = commitRepairPart(milestone, partIndex);
  const progress = ensureRepairProgress(milestone);
  postRepairPlayerMessage({
    type: "silkroad:repair-part-result",
    protocolVersion: REPAIR_PROTOCOL_VERSION,
    repairId: milestone.playerPointId,
    partIndex: partIndex ?? message.partIndex,
    ok: result.ok,
    coins: repairPlayerCoinBalance(progress),
    walletCoins: state.coins,
    prepaidRemaining: progress.prepaidRemaining,
    cost: result.partCost,
    charged: result.charged,
    reason: result.reason,
    completedParts: result.completedParts,
    nextPartIndex: firstIncompleteRepairPart(result.completedParts),
    allComplete: result.allComplete,
  });
  if (!result.ok && result.reason) toast(result.reason);
}

function commitRepairPart(milestone, partIndex) {
  const partCosts = repairPartCosts(milestone);
  const progress = ensureRepairProgress(milestone);
  if (!Number.isInteger(partIndex) || partIndex < 0 || partIndex >= partCosts.length) {
    return {
      ok: false,
      partCost: 0,
      charged: 0,
      reason: "未找到这处修缮部位。",
      completedParts: [...progress.completedParts],
      allComplete: false,
    };
  }
  const partCost = partCosts[partIndex];
  if (progress.completedParts.includes(partIndex)) {
    return {
      ok: true,
      partCost,
      charged: 0,
      reason: "",
      completedParts: [...progress.completedParts],
      allComplete: progress.completedParts.length === REPAIR_PART_COUNT,
    };
  }

  const nextPartIndex = firstIncompleteRepairPart(progress.completedParts);
  if (partIndex !== nextPartIndex) {
    return {
      ok: false,
      partCost,
      charged: 0,
      reason: nextPartIndex === null ? "该处修缮已经完成。" : `请先修缮第 ${nextPartIndex + 1} 处。`,
      completedParts: [...progress.completedParts],
      allComplete: nextPartIndex === null,
    };
  }

  const prepaidUsed = Math.min(progress.prepaidRemaining, partCost);
  const charged = partCost - prepaidUsed;
  if (state.coins < charged) {
    return {
      ok: false,
      partCost,
      charged: 0,
      reason: `铜钱不足，还差 ${charged - state.coins} 枚。`,
      completedParts: [...progress.completedParts],
      allComplete: false,
    };
  }

  state.coins -= charged;
  progress.prepaidRemaining -= prepaidUsed;
  progress.completedParts.push(partIndex);
  progress.completedParts.sort((left, right) => left - right);
  const allComplete = progress.completedParts.length === REPAIR_PART_COUNT;
  if (allComplete) finalizeRepairMilestoneState(milestone);
  if (els.coins) els.coins.textContent = state.coins;
  saveState();
  return {
    ok: true,
    partCost,
    charged,
    reason: "",
    completedParts: [...progress.completedParts],
    allComplete,
  };
}

function finalizeRepairMilestoneState(milestone) {
  if (state.renovationChoices[milestone.id]) return false;
  const progress = ensureRepairProgress(milestone);
  progress.completedParts = Array.from({ length: REPAIR_PART_COUNT }, (_, index) => index);
  progress.prepaidRemaining = 0;
  state.activeRepairId = null;
  state.renovationChoices[milestone.id] = "completed";
  applyRepairRewards(milestone);
  syncGeneratorCategoryUnlocks({ announce: true });
  if (isChapterRepairComplete(milestone.chapter)) applyChapterCompletionReward(milestone.chapter);
  syncVisibleOrders();
  advanceInnLevelsIfReady();
  const nextAfterRepair = nextRepairMilestone();
  lastInnFocusKey = null;
  pendingInnFocusPosition = nextAfterRepair?.longscrollRegionIds ?? null;
  activeRepairMilestoneId = null;
  activeRepairChoiceId = null;
  return true;
}

function completeRepairFromPlayer(milestoneId) {
  const milestone = getMilestoneViews().find((entry) => entry.id === milestoneId);
  if (!milestone || openRepairMilestoneId !== milestoneId) return;
  const progress = ensureRepairProgress(milestone);
  if (!state.renovationChoices[milestoneId] && progress.completedParts.length !== REPAIR_PART_COUNT) {
    sendRepairPlayerInit(milestone);
    return;
  }
  if (!state.renovationChoices[milestoneId]) {
    finalizeRepairMilestoneState(milestone);
    saveState();
  }
  closeRepairPlayer(milestone, { completed: true });
}

async function closeRepairPlayer(milestone, { completed = false } = {}) {
  if (completed) {
    repairReturnCastMilestoneId = milestone.id;
    pendingRepairAfterStoryMilestoneId = null;
  }
  openRepairMilestoneId = null;
  await setRepairOrientation(false);
  els.repairPlayerLayer.hidden = true;
  els.repairPlayerFrame.src = "about:blank";
  if (state.currentPage !== "inn") state.currentPage = "inn";
  render();
  centerInnSceneOnPosition(milestone.longscrollRegionIds);
  saveState();
  if (!completed) return;
  const revealHold = playRepairCompleteEffect(milestone);
  setTimeout(() => {
    if (state.currentPage !== "inn") {
      repairReturnCastMilestoneId = null;
      return;
    }
    const historicalNote = historicalNoteForRepair(milestone.id);
    if (historicalNote && repairReturnCastMilestoneId === milestone.id) {
      render();
      centerInnSceneOnPosition(milestone.longscrollRegionIds);
      return;
    }
    restoreRepairReturnView(milestone, { promptNextRepair: false, focusMilestone: milestone });
  }, revealHold);
}

function showPendingRepairAfterStory() {
  if (!pendingRepairAfterStoryMilestoneId || state.currentPage !== "inn") return;
  const milestone = getMilestoneViews().find((entry) => entry.id === pendingRepairAfterStoryMilestoneId);
  pendingRepairAfterStoryMilestoneId = null;
  if (!milestone) return;
  requestAnimationFrame(() => {
    playChapterStory(`after:${milestone.id}`, () => finishRepairAfterStory(milestone));
  });
}

function shouldShowInnFinale() {
  return !state.storyFlags.innFinaleLetterSeen
    && !nextRepairMilestone()
    && chapterStorySeen(`after:${FINAL_REPAIR_MILESTONE_ID}`);
}

function finishRepairAfterStory(milestone) {
  if (milestone.id === FINAL_REPAIR_MILESTONE_ID && shouldShowInnFinale() && showInnFinale({ milestone })) return;
  const historicalNote = historicalNoteForRepair(milestone.id);
  if (historicalNote && !historicalNoteAnswered(historicalNote.id)) {
    restoreRepairReturnView(milestone, { promptNextRepair: false, focusMilestone: milestone });
    return;
  }
  restoreRepairReturnView(milestone);
}

function showInnFinale({ milestone = null, force = false } = {}) {
  if (!els.innFinale || els.innFinale.open || (!force && !shouldShowInnFinale())) return false;
  innFinaleTimers.forEach(clearTimeout);
  innFinaleTimers = [];
  innFinaleCloseMilestone = milestone;
  els.innFinale.classList.remove("is-revealed", "is-full-view", "is-ready", "is-envelope-visible", "is-envelope-open", "is-letter-open");
  els.innFinaleStage.inert = false;
  els.innFinaleLetter.inert = true;
  els.innFinaleShowLetter.disabled = true;
  els.innFinale.showModal();
  measureInnFinaleCoverScale();
  els.innFinaleTitle.focus({ preventScroll: true });
  els.innFinaleScroll.scrollTop = 0;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) {
    els.innFinale.classList.add("is-revealed", "is-full-view", "is-ready");
    els.innFinaleShowLetter.disabled = false;
    innFinaleTimers.push(setTimeout(openInnFinaleLetter, 8000));
    return true;
  }
  innFinaleTimers.push(setTimeout(() => els.innFinale.classList.add("is-revealed"), 300));
  innFinaleTimers.push(setTimeout(() => els.innFinale.classList.add("is-full-view"), 2900));
  innFinaleTimers.push(setTimeout(() => {
    els.innFinale.classList.add("is-ready");
    els.innFinaleShowLetter.disabled = false;
  }, 4100));
  innFinaleTimers.push(setTimeout(openInnFinaleLetter, 11500));
  return true;
}

function measureInnFinaleCoverScale() {
  if (!els.innFinale?.open) return;
  const { width, height } = els.innFinalePanorama.getBoundingClientRect();
  if (width > 0 && height > 0) {
    els.innFinalePanorama.style.setProperty("--finale-cover-scale", String(Math.max(1, height / width)));
  }
}

function openInnFinaleLetter() {
  if (!els.innFinale?.open || !els.innFinale.classList.contains("is-ready") || els.innFinale.classList.contains("is-envelope-visible") || els.innFinale.classList.contains("is-letter-open")) return;
  innFinaleTimers.forEach(clearTimeout);
  innFinaleTimers = [];
  els.innFinaleStage.inert = true;
  els.innFinaleShowLetter.disabled = true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealInnFinaleLetter();
    return;
  }
  els.innFinale.classList.add("is-envelope-visible");
  innFinaleTimers.push(setTimeout(() => els.innFinale.classList.add("is-envelope-open"), 950));
  innFinaleTimers.push(setTimeout(revealInnFinaleLetter, 2850));
}

function revealInnFinaleLetter() {
  if (!els.innFinale?.open || els.innFinale.classList.contains("is-letter-open")) return;
  els.innFinaleLetter.scrollTop = 0;
  els.innFinaleLetter.inert = false;
  els.innFinale.classList.add("is-letter-open");
  els.innFinaleLetter.querySelector("h3")?.focus({ preventScroll: true });
  innFinaleTimers.push(setTimeout(() => els.innFinale.classList.remove("is-envelope-visible", "is-envelope-open"), 1050));
}

function showInnFinalePanorama() {
  if (!els.innFinale?.open) return;
  innFinaleTimers.forEach(clearTimeout);
  innFinaleTimers = [];
  els.innFinaleStage.inert = false;
  els.innFinaleLetter.inert = true;
  els.innFinale.classList.remove("is-envelope-visible", "is-envelope-open", "is-letter-open");
  els.innFinaleShowLetter.disabled = false;
  els.innFinaleTitle.focus({ preventScroll: true });
}

function closeInnFinale() {
  if (!els.innFinale?.open) return;
  innFinaleTimers.forEach(clearTimeout);
  innFinaleTimers = [];
  els.innFinale.close();
  state.storyFlags.innFinaleLetterSeen = true;
  saveState();
  const milestone = innFinaleCloseMilestone;
  innFinaleCloseMilestone = null;
  if (milestone) restoreRepairReturnView(milestone);
}

function restoreRepairReturnView(milestone, { promptNextRepair = true, focusMilestone: preferredFocusMilestone = null } = {}) {
  if (state.currentPage !== "inn") state.currentPage = "inn";
  repairReturnCastMilestoneId = null;
  lastInnFocusKey = null;
  render();
  const next = nextRepairMilestone();
  const characterMilestone = longscrollCharacterMilestone(next);
  const focusMilestone = preferredFocusMilestone
    ?? (LONGSCROLL_LOCATION_CAST[next?.id] ? next : characterMilestone ?? next ?? milestone);
  pendingInnFocusPosition = null;
  requestAnimationFrame(() => requestAnimationFrame(() => {
    if (focusMilestone?.longscrollRegionIds?.length) {
      centerInnSceneOnPosition(focusMilestone.longscrollRegionIds);
      lastInnFocusKey = focusMilestone.id;
    }
  }));
  saveState();
  const chapterOpeningId = pendingChapterOpeningId();
  if (pendingInnUpgradeRevealLevel && chapterOpeningId) {
    setTimeout(() => playChapterStory(chapterOpeningId, showPendingInnUpgradeReveal), 0);
  } else if (pendingInnUpgradeRevealLevel) {
    setTimeout(showPendingInnUpgradeReveal, 0);
  } else if (promptNextRepair) {
    setTimeout(maybePromptRepairGuide, 0);
  }
}

function applyInnUnlocks() {
  syncGeneratorCategoryUnlocks();
}

function showPendingInnUpgradeReveal() {
  if (!pendingInnUpgradeRevealLevel) return;
  const level = pendingInnUpgradeRevealLevel;
  pendingInnUpgradeRevealLevel = null;
  playInnUpgradeReveal(level);
}

function playInnUpgradeReveal(level) {
  if (!els.innUpgradeReveal || !els.innUpgradeRevealText) return;
  const targetLevel = Math.max(2, Math.min(MAX_INN_LEVEL, Math.trunc(Number(level)) || 2));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  clearTimeout(innUpgradeRevealTimer);
  els.innUpgradeRevealText.textContent = `流沙驿升至 Lv${targetLevel}`;
  els.innUpgradeReveal.hidden = false;
  els.innPage.classList.remove("upgrade-reveal-active");
  els.innUpgradeReveal.classList.remove("is-playing");
  void els.innUpgradeReveal.offsetWidth;
  els.innPage.classList.add("upgrade-reveal-active");
  els.innUpgradeReveal.classList.add("is-playing");
  innUpgradeRevealTimer = setTimeout(() => {
    els.innPage.classList.remove("upgrade-reveal-active");
    els.innUpgradeReveal.classList.remove("is-playing");
    els.innUpgradeReveal.hidden = true;
    innUpgradeRevealTimer = null;
    maybePromptRepairGuide();
  }, reducedMotion ? 1200 : 2800);
}

function canUpgradeInn() {
  const level = currentInnLevel();
  if (level.level >= MAX_INN_LEVEL) return { ok: false, reason: "流沙驿已经升至最高等级。" };
  const requiredMilestones = state.progressionConfig.milestones.filter(
    (milestone) => milestoneInnLevel(milestone) <= level.level,
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

function advanceInnLevelsIfReady({ announce = true } = {}) {
  let advanced = false;
  while (state.innLevel < MAX_INN_LEVEL && canUpgradeInn().ok) {
    const level = currentInnLevel();
    state.coins -= level.upgradeCost;
    state.innLevel = Math.min(MAX_INN_LEVEL, state.innLevel + 1);
    applyInnUnlocks();
    syncVisibleOrders();
    advanced = true;
  }
  if (!advanced) return false;
  pendingInnUpgradeRevealLevel = state.innLevel;
  if (announce) toast(`流沙驿焕新至 Lv${state.innLevel}`);
  return true;
}

function canEnterRepairPage() {
  const current = nextRepairMilestone();
  if (!current) return { ok: true, reason: "四卷修缮已全部完成，流沙驿的灯火已连成一片。", milestone: null };
  if (milestoneInnLevel(current) > state.innLevel) {
    return {
      ok: false,
      reason: "当前阶段完成后，将自动开放这处修缮。",
      milestone: current,
    };
  }
  if (!current.done && state.activeRepairId !== current.id) {
    return {
      ok: false,
      reason: current.nextText,
      milestone: current,
    };
  }
  const progress = state.repairProgress?.[current.id];
  const nextPartIndex = firstIncompleteRepairPart(progress?.completedParts ?? []);
  const nextPartCost = nextPartIndex === null ? 0 : repairPartCosts(current)[nextPartIndex];
  const availableCoins = state.coins + Math.max(0, Number(progress?.prepaidRemaining) || 0);
  if (availableCoins < nextPartCost) {
    return {
      ok: false,
      reason: `铜钱不足，还需${nextPartCost - availableCoins}枚才能继续修缮。`,
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
  return volumeForInnLevel(state.innLevel);
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
    if (typeof itemId === "string" && itemId.startsWith(BONUS_STAMINA_PREFIX)) {
      const level = Number(itemId.slice(BONUS_STAMINA_PREFIX.length));
      if (level > BONUS_STAMINA_MAX_LEVEL) return bonusStaminaId(BONUS_STAMINA_MAX_LEVEL);
    }
    return migrateLegacyGeneratorId(itemId);
  });
}

function normalizeSplitterToolCharges(value, boardValue) {
  const board = normalizeBoard(boardValue);
  const saved = value && typeof value === "object" ? value : {};
  const normalized = {};
  board.forEach((itemId, index) => {
    if (itemId !== SPLITTER_TOOL_ITEM_ID) return;
    normalized[index] = Math.max(1, Math.floor(Number(saved[index]) || 1));
  });
  return normalized;
}

function splitterToolChargesAt(index) {
  return Math.max(0, Math.floor(Number(state.splitterToolCharges?.[index]) || 0));
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

function transferBoardItemState(itemId, fromIndex, toIndex) {
  transferGeneratorState(itemId, boardGeneratorStateKey(fromIndex), boardGeneratorStateKey(toIndex));
  const giftState = state.giftBoxStates[fromIndex];
  delete state.giftBoxStates[toIndex];
  if (byId.get(itemId)?.type === "gift_box" && giftState) {
    state.giftBoxStates[toIndex] = giftState;
  }
  delete state.giftBoxStates[fromIndex];
  delete state.splitterToolCharges[toIndex];
  if (itemId === SPLITTER_TOOL_ITEM_ID) {
    state.splitterToolCharges[toIndex] = Math.max(1, splitterToolChargesAt(fromIndex));
  }
  delete state.splitterToolCharges[fromIndex];
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

function bonusStaminaId(level) {
  return BONUS_STAMINA_PREFIX + String(level).padStart(2, "0");
}

function registerBonusStaminaItems() {
  const names = ["", "一声驼铃", "双铃同行", "单峰驼", "成熟双峰驼"];
  for (let level = 1; level <= BONUS_STAMINA_MAX_LEVEL; level += 1) {
    const staminaValue = BONUS_STAMINA_VALUES[level];
    byId.set(bonusStaminaId(level), {
      id: bonusStaminaId(level),
      type: "bonus_stamina",
      level,
      staminaValue,
      name: names[level],
      modernName: level === BONUS_STAMINA_MAX_LEVEL
        ? `双击收获${staminaValue}点体力`
        : `与同级体力棋子合成，或双击收获${staminaValue}点体力`,
      iconKey: BONUS_STAMINA_ICON_KEYS[level],
      source: "daily_reward_pouch",
      mergeFrom: level > 1 ? bonusStaminaId(level - 1) : null,
      mergeTo: level < BONUS_STAMINA_MAX_LEVEL ? bonusStaminaId(level + 1) : null,
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
    byId.set(DAILY_POUCH_ITEM_ID, {
      ...starterGift,
      id: DAILY_POUCH_ITEM_ID,
      name: "西域晨礼宝袋",
      modernName: "每日领取的葡萄石榴纹锦囊",
      iconKey: "ui/ui_daily_pomegranate_pouch_v2",
      source: "daily_reward_pouch",
    });
    byId.set(SHOP_WEALTH_ITEM_ID, {
      ...starterGift,
      id: SHOP_WEALTH_ITEM_ID,
      name: "聚财陶罐",
      modernName: "轻点后逐枚吐出不同等级的铜币棋子",
      iconKey: "ui/shop_wealth_jar_v1",
      source: "daily_shop",
    });
    byId.set(SHOP_SAXAUL_ITEM_ID, {
      ...starterGift,
      id: SHOP_SAXAUL_ITEM_ID,
      name: "梭梭树",
      modernName: "轻点后逐枚掉落不同等级的驼铃棋子",
      iconKey: "ui/shop_saxaul_tree_v1",
      source: "daily_shop",
    });
  }
  GIFT_PACKS[DAILY_POUCH_PACK_ID] = {
    id: DAILY_POUCH_PACK_ID,
    name: "西域晨礼宝袋",
    itemId: DAILY_POUCH_ITEM_ID,
    description: "每日刷新，可开出铜板与驼铃。",
    dailyReward: true,
    rewardPool: DAILY_POUCH_REWARD_POOL,
    rewards: [],
  };
  GIFT_PACKS[SHOP_WEALTH_PACK_ID] = {
    id: SHOP_WEALTH_PACK_ID,
    name: "聚财陶罐",
    itemId: SHOP_WEALTH_ITEM_ID,
    description: "可逐枚吐出6枚不同等级的铜币棋子。",
    shopOffer: true,
    rewards: [1, 1, 2, 1, 2, 3].map((level) => ({
      type: "item",
      itemId: bonusCoinId(level),
      quantity: 1,
    })),
  };
  GIFT_PACKS[SHOP_SAXAUL_PACK_ID] = {
    id: SHOP_SAXAUL_PACK_ID,
    name: "梭梭树",
    itemId: SHOP_SAXAUL_ITEM_ID,
    description: "可逐枚掉落5枚不同等级的驼铃棋子。",
    shopOffer: true,
    rewards: [1, 2, 2, 3, 3].map((level) => ({
      type: "item",
      itemId: bonusStaminaId(level),
      quantity: 1,
    })),
  };
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
  if (["bonus_bubble", "bonus_coin", "bonus_ruby", "bonus_stamina", "gift_box", "box_material", "generator_material"].includes(sourceItem.type)) return false;
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
  const chapter = volumeForInnLevel(innLevel);
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

function normalizeGiftBoxStateEntry(entry) {
  const pack = GIFT_PACKS[entry?.packId];
  if (!pack) return null;
  const normalized = {
    packId: entry.packId,
    nextRewardIndex: Math.max(0, Math.floor(Number(entry.nextRewardIndex) || 0)),
  };
  if (pack.dailyReward && Array.isArray(entry.pendingOutputs)) {
    normalized.pendingOutputs = entry.pendingOutputs
      .slice(0, 32)
      .filter((itemId) => {
        const item = byId.get(itemId);
        return item?.type === "bonus_coin" || item?.type === "bonus_stamina";
      });
    const reward = pack.rewardPool?.find((candidate) => candidate.id === entry.dailyRewardId);
    if (reward) normalized.dailyRewardId = reward.id;
  }
  return normalized;
}

function normalizeGiftBoxStates(value) {
  if (!value || typeof value !== "object") return {};
  return Object.fromEntries(Object.entries(value).flatMap(([index, entry]) => {
    const boardIndex = Number(index);
    const normalized = normalizeGiftBoxStateEntry(entry);
    if (!Number.isInteger(boardIndex) || boardIndex < 0 || boardIndex >= BOARD_SIZE || !normalized) return [];
    return [[index, normalized]];
  }));
}

function normalizeStoredGiftBoxStates(value, bag) {
  if (!value || typeof value !== "object") return {};
  return Object.fromEntries(Object.entries(value).flatMap(([index, entry]) => {
    const bagIndex = Number(index);
    const pack = GIFT_PACKS[entry?.packId];
    const normalized = normalizeGiftBoxStateEntry(entry);
    const isMatchingStoredProp = Number.isInteger(bagIndex)
      && bagIndex >= 0
      && bagIndex < bag.length
      && pack?.shopOffer
      && bag[bagIndex] === pack.itemId;
    return isMatchingStoredProp && normalized ? [[index, normalized]] : [];
  }));
}

function reconcileGiftBoxStates() {
  state.storedGiftBoxStates ??= {};
  const dailyBoardIndices = state.board
    .map((itemId, index) => (itemId === DAILY_POUCH_ITEM_ID ? index : -1))
    .filter((index) => index >= 0);
  const dailyBoardIndexKeys = new Set(dailyBoardIndices.map(String));
  const orphanDailyStates = Object.entries(state.giftBoxStates)
    .filter(([index, entry]) => entry.packId === DAILY_POUCH_PACK_ID && !dailyBoardIndexKeys.has(String(Number(index))));
  dailyBoardIndices.forEach((index) => {
    if (state.giftBoxStates[index]?.packId === DAILY_POUCH_PACK_ID) return;
    const [oldIndex, existing] = orphanDailyStates.shift() ?? [];
    state.giftBoxStates[index] = existing ?? {
      packId: DAILY_POUCH_PACK_ID,
      nextRewardIndex: 0,
    };
    if (oldIndex !== undefined) delete state.giftBoxStates[oldIndex];
  });
  Object.keys(state.giftBoxStates).forEach((index) => {
    const pack = GIFT_PACKS[state.giftBoxStates[index]?.packId];
    if (!pack || state.board[Number(index)] !== pack.itemId) delete state.giftBoxStates[index];
  });
  Object.keys(state.storedGiftBoxStates).forEach((index) => {
    const pack = GIFT_PACKS[state.storedGiftBoxStates[index]?.packId];
    if (!pack?.shopOffer || state.bag[Number(index)] !== pack.itemId) delete state.storedGiftBoxStates[index];
  });
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
    const hasRenownMark = state.caravanRenown?.markedOrderIds?.includes(order.id) === true;
    const card = document.createElement("article");
    card.className = `order-card ${canComplete ? "ready" : ""} ${hasRenownMark ? "renown-order" : ""}`;
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

    const renownMark = document.createElement("span");
    if (hasRenownMark) {
      renownMark.className = "renown-order-mark";
      renownMark.textContent = "荐";
      renownMark.setAttribute("aria-label", "高价值推荐订单");
      renownMark.title = "完成这份高价值订单可获得1枚商旅荐印";
      reward.prepend(renownMark);
    }

    const foods = document.createElement("div");
    foods.className = "need-items";
    const totalFoodCount = demandStates.reduce(
      (sum, { demand }) => sum + Math.max(1, Math.floor(Number(demand.quantity) || 1)),
      0,
    );
    foods.dataset.count = String(totalFoodCount);
    demandStates.forEach(({ item, demand }) => {
      const quantity = Math.max(1, Math.floor(Number(demand.quantity) || 1));
      for (let copyIndex = 0; copyIndex < quantity; copyIndex += 1) {
        const trigger = document.createElement("button");
        trigger.type = "button";
        trigger.className = "order-food-trigger";
        trigger.setAttribute(
          "aria-label",
          quantity > 1
            ? `查看${item.name}合成路线，第${copyIndex + 1}份，共${quantity}份`
            : `查看${item.name}合成路线，需要1份`,
        );
        trigger.title = `${item.name} · 查看合成路线`;
        const f = document.createElement("img");
        f.src = itemAssetSrc(item);
        f.alt = item.name;
        trigger.append(f);
        trigger.addEventListener("click", (event) => {
          event.stopPropagation();
          playSfx("click", { markSpecific: false });
          openOrderFoodDetail(order.id, item.id);
        });
        trigger.addEventListener("keydown", (event) => event.stopPropagation());
        foods.append(trigger);
      }
    });

    const deliver = document.createElement("button");
    deliver.type = "button";
    deliver.className = `deliver-btn ${canComplete ? "ready" : ""}`;
    deliver.textContent = "交付";
    deliver.addEventListener("click", (event) => {
      event.stopPropagation();
      if (!canComplete) {
        playSfx("click", { markSpecific: false });
        const firstMissing = demandStates.find((entry) => entry.missing > 0);
        toast(firstMissing ? `还缺${firstMissing.item.name}${firstMissing.missing}份。` : "餐食还没有备齐。");
        return;
      }
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
    cell.className = `cell ${locked ? "locked" : ""} ${readyOrderHighlights.has(index) ? "order-ready-item" : ""} ${state.selectedIndex === index ? "selected" : ""} ${state.pulseIndex === index ? "merge-pop" : ""} ${splitterPulseIndices.has(index) ? "splitter-result-pop" : ""} ${state.unlockPulseIndex === index ? "unlock-pop" : ""} ${activeGeneratorOutputIndices.has(index) ? "receiving-item" : ""} ${activeDailyPouchOutputIndices.has(index) ? "daily-pouch-receiving" : ""} ${activeDailyPouchStates.has(state.giftBoxStates[index]) ? "daily-pouch-dispensing" : ""} ${isTutorialBoardFocus(itemId) ? "tutorial-focus" : ""}`;
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
      img.className = `item ${isGeneratorPiece(item) ? "generator" : ""} ${item.type === "gift_box" ? "gift-box" : ""} ${item.type === "generator_material" ? "generator-material" : ""} ${item.id === ORDER_PROGRESS_GIFT_ITEM_ID ? "order-progress-gift" : ""} ${item.id === DAILY_POUCH_ITEM_ID ? "daily-pouch-gift" : ""} ${item.id === SHOP_WEALTH_ITEM_ID ? "wealth-jar" : ""}`;
      img.alt = item.name;
      img.src = itemAssetSrc(item);
      if (item.type === "generator_material") {
        const scale = GENERATOR_MATERIAL_SCALE_PERCENT[item.id] ?? 220;
        img.style.setProperty("--generator-material-scale", `${scale}%`);
      }
      cell.append(img);
      if (isGeneratorPiece(item)) {
        cell.classList.add("generator-cell");
        const sparkles = document.createElement("span");
        sparkles.className = "generator-sparkles";
        sparkles.setAttribute("aria-hidden", "true");
        for (let sparkleIndex = 0; sparkleIndex < 6; sparkleIndex += 1) {
          sparkles.append(Object.assign(document.createElement("i"), { className: "generator-sparkle" }));
        }
        cell.append(sparkles);
        const generatorState = getGeneratorState(item.id, boardGeneratorStateKey(index));
        if (item.type === "auto_generator") {
          const badge = document.createElement("span");
          badge.className = "generator-badge";
          const seconds = Math.max(0, Math.ceil((generatorState.cooldownEnd - Date.now()) / 1000));
          if (seconds > 0) {
            badge.classList.add("cooldown-clock");
            badge.classList.add("automatic");
            badge.setAttribute("aria-label", `${formatGeneratorCountdown(seconds)}后完成备料`);
            badge.title = `${formatGeneratorCountdown(seconds)}后完成备料`;
            badge.append(Object.assign(document.createElement("span"), { className: "generator-clock-face" }));
          } else if (generatorState.remainingOutputs > 0) {
            badge.textContent = `${generatorState.remainingOutputs}`;
            badge.setAttribute("aria-label", `本轮还可投放${generatorState.remainingOutputs}份`);
            badge.title = `本轮还可投放${generatorState.remainingOutputs}份`;
          }
          cell.append(badge);
        }
      } else if (item.type === "gift_box") {
        const giftState = state.giftBoxStates[index];
        const pack = giftState ? GIFT_PACKS[giftState.packId] : null;
        if (pack?.dailyReward) {
          cell.classList.add("daily-pouch-cell");
        } else if (pack?.orderProgress) {
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
        if (activeDailyPouchOutputIndices.has(index)) return;
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
  if (item.type === "upgrade_tool") {
    cell.classList.add("upgrade-tool-cell");
    const icon = document.createElement("img");
    icon.className = "upgrade-tool";
    icon.src = itemAssetSrc(item);
    icon.alt = "";
    cell.append(icon);
    cell.setAttribute("aria-label", `${item.name}，极稀有，拖到未满阶食物上升一级`);
    return true;
  }
  if (item.type === "splitter_tool") {
    cell.classList.add("splitter-tool-cell");
    const tool = document.createElement("div");
    tool.className = "splitter-tool";
    const icon = document.createElement("img");
    icon.src = itemAssetSrc(item);
    icon.alt = "";
    tool.append(icon);
    const badge = document.createElement("span");
    badge.className = "splitter-charge-badge";
    badge.textContent = String(splitterToolChargesAt(index));
    tool.append(badge);
    cell.append(tool);
    cell.setAttribute("aria-label", `${item.name}，剩余${splitterToolChargesAt(index)}次，拖到二级或更高食材上拆解`);
    return true;
  }
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
  if (item.type === "bonus_stamina") {
    cell.classList.add("bonus-stamina-cell");
    if (item.level === BONUS_STAMINA_MAX_LEVEL) cell.classList.add("collect-ready");
    const stamina = document.createElement("div");
    stamina.className = "bonus-stamina bonus-stamina-level-" + item.level;
    appendBonusStaminaArt(stamina, item);
    cell.append(stamina);
    const mergeHint = item.level < BONUS_STAMINA_MAX_LEVEL ? "，可与同级合成" : "";
    cell.setAttribute("aria-label", `${item.name}${mergeHint}，双击收获${item.staminaValue}点体力`);
    return true;
  }
  return false;
}

function appendBonusStaminaArt(container, item) {
  const art = document.createElement("img");
  art.className = "bonus-stamina-art";
  art.src = itemAssetSrc(item);
  art.alt = "";
  container.append(art);
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
  if (item.type === "bonus_stamina") {
    selectedPanel?.classList.add("no-sell");
    els.selectedName.textContent = item.name;
    els.selectedText.textContent = item.level === BONUS_STAMINA_MAX_LEVEL
      ? `双击收获${item.staminaValue}点体力`
      : `两枚同级体力棋子可以合成下一等级；双击收获${item.staminaValue}点体力`;
    els.sellBtn.disabled = true;
    return;
  }
  if (item.type === "gift_box") {
    selectedPanel?.classList.add("no-sell");
    const giftState = state.giftBoxStates[state.selectedIndex];
    const pack = giftState ? GIFT_PACKS[giftState.packId] : null;
    els.selectedName.textContent = pack?.name ?? item.name;
    const dailyRemaining = Array.isArray(giftState?.pendingOutputs) ? giftState.pendingOutputs.length : null;
    els.selectedText.textContent = pack
      ? pack.dailyReward
        ? activeDailyPouchStates.has(giftState)
          ? `宝袋正在投放，剩余${dailyRemaining ?? 0}份。`
          : dailyRemaining === null
            ? "点击宝袋，铜币与驼铃会逐个落到棋盘上。"
            : dailyRemaining > 0
              ? `还剩${dailyRemaining}份奖励；腾出空格后再点宝袋继续。`
              : "奖励已经投放完毕，再点一下收起宝袋。"
        : opensGiftPackAtOnce(pack)
        ? `点击一次打开，${giftRewardOutputCount(pack)}份奖励会随机落入空格。`
        : `点击礼盒包，每次掉落1份奖励。还剩${pack.rewards.length - giftState.nextRewardIndex}份。`
      : item.modernName;
    els.sellBtn.disabled = true;
    return;
  }
  if (item.type === "splitter_tool") {
    selectedPanel?.classList.add("no-sell");
    els.selectedName.textContent = item.name;
    els.selectedText.textContent = `剩余${splitterToolChargesAt(state.selectedIndex)}次 · 拖到Lv2或更高食材上，可拆成两个低一级食材`;
    els.sellBtn.disabled = true;
    return;
  }
  if (item.type === "upgrade_tool") {
    selectedPanel?.classList.add("no-sell");
    els.selectedName.textContent = `${item.name} · 极稀有`;
    els.selectedText.textContent = "拖到任意未满阶食物上，使其立即升一阶";
    els.sellBtn.disabled = true;
    return;
  }
  if (isGeneratorPiece(item)) {
    const generatorState = getGeneratorState(item.id, boardGeneratorStateKey(state.selectedIndex));
    const cooldownSeconds = Math.max(0, Math.ceil((generatorState.cooldownEnd - Date.now()) / 1000));
    const batchSize = item.generator.outputCount;
    const productionStatus = item.type === "manual_generator"
      ? "点击生成，消耗驼铃"
      : cooldownSeconds > 0
        ? formatGeneratorCountdown(cooldownSeconds) + `后备好${batchSize}份奶食`
        : neighborEmptyIndices(state.selectedIndex).length > 0
          ? `本轮剩余${generatorState.remainingOutputs}/${batchSize}份，奶食即将投放`
          : `本轮剩余${generatorState.remainingOutputs}/${batchSize}份；腾出奶房相邻格，或移动奶房后继续`;
    els.selectedName.textContent = /Lv\d+$/.test(item.name) ? item.name : item.name + " · Lv" + (item.level ?? 1);
    els.selectedText.textContent = productionStatus;
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
  if (!item || ["bonus_bubble", "bonus_coin", "bonus_ruby", "bonus_stamina", "gift_box", "splitter_tool", "upgrade_tool"].includes(item.type)) {
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
      : cleanup.foodSellValuesByLevel;
  const valueIndex = isGeneratorPiece(item) || isGeneratorMaterialPiece(item) ? quarter - 1 : level - 1;
  const value = Math.max(0, Math.floor(Number(values?.[valueIndex]) || 0));
  return {
    mode: value === 0 ? "delete" : "sell",
    value,
    requiresConfirm: isGeneratorPiece(item)
      || (maxLevel === SELL_CHAIN_LEVELS.food
        && level >= (Number(cleanup.protectHighLevelFoodFromLevel) || 5)),
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
  if (item.type === "bonus_stamina") {
    els.pieceDetailMeta.textContent = `体力棋子 Lv${item.level} · 可收获${item.staminaValue}点体力`;
    els.pieceDetailText.textContent = item.level === BONUS_STAMINA_MAX_LEVEL
      ? "成熟双峰驼已经整装待发，双击即可收获100点体力。"
      : "与另一枚同级体力棋子合成可以升级，也可直接双击收获体力。";
    els.pieceDetailModal.showModal();
    return;
  }
  const removalAction = getPieceRemovalAction(item);
  els.pieceDetailMeta.textContent = isGeneratorPiece(item)
    ? `Lv${item.level ?? 1} · ${item.modernName ?? "生成器"}`
    : `Lv${item.level ?? 1} · ${removalAction.mode === "delete" ? "删除不返还铜币" : `出售可得 ${removalAction.value} 铜币`}`;
  if (item.type === "manual_generator") {
    const outputItem = manualGeneratorOutputItem(item);
    const staminaCost = manualGeneratorStaminaCost(item);
    const productionMultiplier = effectiveProductionMultiplier();
    const productionText = `当前 ×${productionMultiplier} 模式：点击消耗${staminaCost}点驼铃，产出${outputItem?.name ?? "对应等级食品"}。无需等待，可连续使用。`;
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
        : `本轮还剩${generatorState.remainingOutputs}/${batchSize}份；腾出奶房相邻格，或移动奶房后继续投放。`;
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

function hasClaimedDailyPouch() {
  return state.dailyPouchClaimDay === currentLocalDayKey();
}

function renderDailyPouchButtons() {
  const claimed = hasClaimedDailyPouch();
  [els.dailyPouchBtn].filter(Boolean).forEach((button) => {
    button.disabled = false;
    button.classList.toggle("is-ready", !claimed);
    button.classList.toggle("is-claimed", claimed);
    const label = claimed ? "打开驿站小铺，今日宝袋已领取" : "打开驿站小铺，今日宝袋待领取";
    button.setAttribute("aria-label", label);
    button.title = label;
  });
}

function syncWeeklyCheckinRound() {
  if (state.weeklyCheckinClaimedDays < WEEKLY_CHECKIN_REWARDS.length) return false;
  if (state.weeklyCheckinLastClaimDay === currentLocalDayKey()) return false;
  state.weeklyCheckinClaimedDays = 0;
  state.weeklyCheckinLastClaimDay = "";
  state.weeklyCheckinRound += 1;
  return true;
}

function canClaimWeeklyCheckin() {
  return state.weeklyCheckinClaimedDays < WEEKLY_CHECKIN_REWARDS.length
    && state.weeklyCheckinLastClaimDay !== currentLocalDayKey();
}

function renderWeeklyCheckinButton() {
  if (!els.weeklyCheckinBtn) return;
  if (syncWeeklyCheckinRound()) saveState();
  const claimable = canClaimWeeklyCheckin();
  const nextDay = Math.min(state.weeklyCheckinClaimedDays + 1, WEEKLY_CHECKIN_REWARDS.length);
  els.weeklyCheckinBtn.classList.toggle("is-ready", claimable);
  els.weeklyCheckinBtn.classList.toggle("is-claimed", !claimable);
  const label = claimable
    ? `打开七日驿程，第${nextDay}日奖励待领取`
    : `打开七日驿程，今日已前行，本轮${state.weeklyCheckinClaimedDays}/7`;
  els.weeklyCheckinBtn.setAttribute("aria-label", label);
  els.weeklyCheckinBtn.title = label;
}

function weeklyCheckinRewardItem(entry) {
  if (entry.itemId) return byId.get(entry.itemId);
  const pack = entry.packId ? GIFT_PACKS[entry.packId] : null;
  return pack ? byId.get(pack.itemId) : null;
}

function renderWeeklyCheckin() {
  if (!els.weeklyCheckinModal || !els.weeklyCheckinGrid) return;
  if (syncWeeklyCheckinRound()) saveState();
  const claimedDays = state.weeklyCheckinClaimedDays;
  const claimable = canClaimWeeklyCheckin();
  const currentIndex = claimable ? claimedDays : -1;
  els.weeklyCheckinGrid.replaceChildren();

  WEEKLY_CHECKIN_REWARDS.forEach((reward, index) => {
    const day = document.createElement("article");
    day.className = "weekly-checkin-day";
    if (index === 6) day.classList.add("weekly-checkin-day-seven");
    if (index < claimedDays) day.classList.add("claimed");
    else if (index === currentIndex) day.classList.add("current");
    else day.classList.add("future");
    if (index === currentIndex) {
      day.tabIndex = 0;
      day.setAttribute("role", "button");
      day.setAttribute("aria-label", `领取第${index + 1}日奖励：${reward.label}`);
    } else {
      day.setAttribute("aria-label", `第${index + 1}日奖励：${reward.label}`);
    }

    const dayLabel = document.createElement("small");
    dayLabel.textContent = `第${index + 1}日`;
    const icons = document.createElement("div");
    icons.className = "weekly-checkin-reward-icons";
    reward.items.forEach((entry) => {
      const item = weeklyCheckinRewardItem(entry);
      if (!item) return;
      const icon = document.createElement("img");
      icon.src = itemAssetSrc(item);
      icon.alt = "";
      icons.append(icon);
    });
    const label = document.createElement("strong");
    label.textContent = reward.label;
    day.append(dayLabel, icons, label);
    els.weeklyCheckinGrid.append(day);
  });

  if (els.weeklyCheckinTrail) {
    els.weeklyCheckinTrail.replaceChildren();
    WEEKLY_CHECKIN_REWARDS.forEach((_, index) => {
      const marker = document.createElement("i");
      marker.textContent = String(index + 1);
      if (index < claimedDays) marker.className = "done";
      else if (index === currentIndex) marker.className = "current";
      els.weeklyCheckinTrail.append(marker);
    });
  }
  if (els.weeklyCheckinProgress) els.weeklyCheckinProgress.textContent = `${claimedDays}/7`;
  if (els.weeklyCheckinClaim) {
    els.weeklyCheckinClaim.disabled = !claimable;
    els.weeklyCheckinClaim.textContent = claimable
      ? `收下第 ${claimedDays + 1} 日行礼`
      : claimedDays >= 7 ? "本轮驿程已完成" : "今日已经前行";
  }
  if (els.weeklyCheckinHint) {
    els.weeklyCheckinHint.textContent = claimedDays >= 7
      ? "明日开启下一轮七日驿程"
      : "每日可前行一步，错过也不会中断本轮驿程";
  }
}

function openWeeklyCheckin() {
  if (!els.weeklyCheckinModal) return;
  renderWeeklyCheckin();
  if (!els.weeklyCheckinModal.open) {
    playSfx("enterShop");
    els.weeklyCheckinModal.showModal();
  }
}

function claimWeeklyCheckin() {
  if (syncWeeklyCheckinRound()) saveState();
  if (!canClaimWeeklyCheckin()) {
    toast("今日已经走过一程，明日再来吧。");
    return;
  }
  const rewardIndex = state.weeklyCheckinClaimedDays;
  const reward = WEEKLY_CHECKIN_REWARDS[rewardIndex];
  reward.items.forEach((entry) => {
    if (entry.itemId) grantRewardItem(entry.itemId, entry.quantity ?? 1);
    else if (entry.packId) grantGiftPack(entry.packId, entry.quantity ?? 1);
  });
  state.weeklyCheckinClaimedDays += 1;
  state.weeklyCheckinLastClaimDay = currentLocalDayKey();
  playSfx("coin");
  render();
  renderWeeklyCheckin();
  saveState();
  toast(`第${rewardIndex + 1}日行程礼已收入行囊。`);
}

function isCaravanRenownOrderCandidate(order) {
  if (!order || order.oneTime || order.generatorMasteryCategory) return false;
  if (["guide", "repairMain"].includes(order.orderTier)) return false;
  if (order.id === nextStoryOrderId()) return false;
  return calculatedOrderCoinReward(order) >= CARAVAN_RENOWN_MIN_COINS;
}

function syncCaravanRenownOrders() {
  const event = state.caravanRenown;
  if (!caravanRenownIsActive() || !event || event.claimed || caravanRenownIsComplete(event)) {
    if (event?.markedOrderIds?.length) {
      event.markedOrderIds = [];
      return true;
    }
    return false;
  }
  const previous = [...event.markedOrderIds];
  const selected = state.visibleOrders
    .filter((orderId) => isCaravanRenownOrderCandidate(getOrder(orderId)));
  event.markedOrderIds = selected;
  return JSON.stringify(previous) !== JSON.stringify(event.markedOrderIds);
}

function recordCaravanRenownOrder(order) {
  const event = state.caravanRenown;
  if (!caravanRenownIsActive() || !event || event.claimed || !event.markedOrderIds.includes(order.id)) return false;
  event.markedOrderIds = event.markedOrderIds.filter((orderId) => orderId !== order.id);
  event.progress = Math.min(event.target, event.progress + 1);
  const lines = order.demand.map((demand) => byId.get(demand.itemId)?.line).filter(Boolean);
  event.recentFoodLines = [...new Set([...event.recentFoodLines, ...lines])].slice(-6);
  if (caravanRenownIsComplete(event)) {
    event.rewardItemIds = buildCaravanRenownRewardItems(event);
    event.markedOrderIds = [];
    toast("十枚商旅荐印已集齐，商队馈礼到了。");
    setTimeout(openCaravanRenown, 420);
  } else {
    toast(`商旅荐印 +1 · ${event.progress}/${event.target}`);
  }
  return true;
}

function caravanRenownUnlockedFoodLines() {
  const lines = state.generatorConfig.categories
    .filter((category) => state.unlockedGeneratorCategories.includes(category.id))
    .map((category) => category.foodLineId)
    .filter((line) => (Number(state.unlockedFoodLevels[line]) || 0) > 0);
  if (lines.length) return [...new Set(lines)];
  return ["hubing"];
}

function rollCaravanRenownFoodLevel(maxLevel) {
  const roll = Math.random() * 100;
  const desired = roll < 45 ? 2 : roll < 75 ? 3 : roll < 95 ? 4 : 5;
  return Math.max(1, Math.min(Math.floor(Number(maxLevel) || 1), desired));
}

function buildCaravanRenownRewardItems(event = state.caravanRenown) {
  const unlockedLines = caravanRenownUnlockedFoodLines();
  const preferredLines = event.recentFoodLines.filter((line) => unlockedLines.includes(line));
  const result = [];
  for (let index = 0; index < CARAVAN_RENOWN_REWARD_COUNT; index += 1) {
    const usePreferred = preferredLines.length && Math.random() < 0.6;
    const lines = usePreferred ? preferredLines : unlockedLines;
    const line = lines[Math.floor(Math.random() * lines.length)] ?? "hubing";
    const maxDiscovered = Math.max(1, Number(state.unlockedFoodLevels[line]) || 1);
    const level = rollCaravanRenownFoodLevel(maxDiscovered);
    const item = foodItemsForLine(line).find((entry) => Number(entry.level) === level)
      ?? foodItemsForLine(line)[0];
    if (item) result.push(item.id);
  }
  return result;
}

function renderCaravanRenownEntry() {
  if (!els.renownEventBtn) return;
  const cycleChanged = syncCaravanRenownState();
  const ordersChanged = syncCaravanRenownOrders();
  if (cycleChanged || ordersChanged) saveState();
  const event = state.caravanRenown;
  const visible = caravanRenownIsActive();
  els.renownEventBtn.hidden = !visible;
  if (!visible || !event) return;
  const complete = caravanRenownIsComplete(event);
  els.renownEventBtn.classList.toggle("is-complete", complete && !event.claimed);
  els.renownEventBadge.textContent = event.claimed ? "已领" : `${event.progress}/${event.target}`;
  const label = event.claimed
    ? "名扬丝路，商队馈礼已领取"
    : complete
      ? "名扬丝路，商队馈礼待领取"
      : `名扬丝路，已收集${event.progress}/${event.target}枚商旅荐印`;
  els.renownEventBtn.setAttribute("aria-label", label);
  els.renownEventBtn.title = label;
}

function renderCaravanRenown() {
  const event = state.caravanRenown;
  if (!event || !els.renownEventModal) return;
  const complete = caravanRenownIsComplete(event);
  const progressPercent = Math.min(100, Math.round(event.progress / event.target * 100));
  els.renownEventProgress.textContent = `${event.progress}/${event.target}`;
  els.renownEventProgressBar.style.width = `${progressPercent}%`;
  els.renownRewardPreview.replaceChildren();
  const rewardItems = complete ? event.rewardItemIds : [];
  for (let index = 0; index < CARAVAN_RENOWN_REWARD_COUNT; index += 1) {
    const slot = document.createElement("span");
    slot.className = "renown-reward-item";
    const item = byId.get(rewardItems[index]);
    if (item) {
      const image = document.createElement("img");
      image.src = itemAssetSrc(item);
      image.alt = item.name;
      slot.title = item.name;
      slot.append(image);
    } else {
      slot.classList.add("mystery");
      slot.setAttribute("aria-label", "待揭晓食材");
    }
    els.renownRewardPreview.append(slot);
  }
  if (event.claimed) {
    els.renownEventClaim.disabled = true;
    els.renownEventClaim.textContent = "馈礼已领取";
  } else if (complete) {
    els.renownEventClaim.disabled = false;
    els.renownEventClaim.textContent = "收下馈礼";
  } else {
    els.renownEventClaim.disabled = false;
    els.renownEventClaim.textContent = "继续接单";
  }
}

function openCaravanRenown() {
  if (!els.renownEventModal || !caravanRenownIsActive()) return;
  renderCaravanRenown();
  if (!els.renownEventModal.open) {
    playSfx("enterShop");
    els.renownEventModal.showModal();
  }
}

function handleCaravanRenownAction() {
  const event = state.caravanRenown;
  if (!event || event.claimed) return;
  if (!caravanRenownIsComplete(event)) {
    els.renownEventModal.close();
    return;
  }
  let boardCount = 0;
  let bagCount = 0;
  event.rewardItemIds.forEach((itemId) => {
    const boardIndex = randomUnlockedEmptyIndex();
    if (boardIndex >= 0) {
      state.board[boardIndex] = itemId;
      state.pulseIndex = boardIndex;
      boardCount += 1;
    } else if (grantRewardItem(itemId)) {
      bagCount += 1;
    }
  });
  const nextRound = event.round + 1;
  state.caravanRenown = createCaravanRenownEvent(nextRound);
  syncCaravanRenownOrders();
  playSfx("coin");
  keeper(bagCount
    ? `商队送来${boardCount + bagCount}份食材，${bagCount}份已收入奖励行囊。`
    : `商队送来的${boardCount}份食材已经散落到案板上。`);
  if (els.renownEventModal.open) els.renownEventModal.close();
  render();
  saveState();
  clearPulseSoon();
}

function formatDailyShopCountdown(milliseconds) {
  const totalSeconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function renderDailyShop() {
  if (!els.dailyShopModal) return;
  const cycleChanged = syncDailyShopCycle();
  if (cycleChanged) saveState();
  renderShopFoodShelves();
  if (els.dailyShopBalance) els.dailyShopBalance.textContent = state.gems ?? 0;
  if (els.dailyShopRefresh) {
    els.dailyShopRefresh.textContent = formatDailyShopCountdown(nextDailyShopRefreshAt() - Date.now());
  }
  if (els.dailyShopClaimPouch) {
    const claimed = hasClaimedDailyPouch();
    els.dailyShopClaimPouch.disabled = claimed;
    els.dailyShopClaimPouch.textContent = claimed ? "今日已领取" : "免费领取";
    els.dailyShopClaimPouch.classList.toggle("claimed", claimed);
  }
  els.dailyShopOffers?.querySelectorAll("[data-shop-offer]").forEach((card) => {
    const offer = dailyShopOffers().find((entry) => entry.id === card.dataset.shopOffer);
    if (!offer) return;
    const bought = state.shopPurchasedOfferIds.includes(offer.id);
    const buyButton = card.querySelector("[data-shop-buy]");
    card.classList.toggle("sold-out", bought);
    card.classList.toggle("insufficient", !bought && state.gems < offer.price);
    if (buyButton) {
      buyButton.disabled = bought;
      buyButton.setAttribute("aria-label", bought ? `${offer.name}本轮已售罄` : `花费${offer.price}颗红宝石购买${offer.name}`);
      const label = buyButton.querySelector("span");
      if (label) label.textContent = bought ? "已售罄" : String(offer.price);
    }
    const stock = card.querySelector("[data-shop-stock]");
    if (stock) stock.textContent = bought ? "库存 0" : "库存 1";
  });
}

function openDailyShop() {
  if (!els.dailyShopModal) return;
  if (syncDailyShopCycle()) saveState();
  renderDailyShop();
  if (!els.dailyShopModal.open) {
    playSfx("enterShop");
    els.dailyShopModal.showModal();
  }
}

function purchaseDailyShopOffer(event) {
  const detailButton = event.target.closest("[data-shop-detail]");
  if (detailButton) {
    if (detailButton.dataset.shopDetail.startsWith("food:")) {
      const item = byId.get(detailButton.dataset.shopDetail.slice(5));
      if (!item) return;
      els.pieceDetailIcon.src = itemAssetSrc(item);
      els.pieceDetailIcon.alt = item.name;
      els.pieceDetailName.textContent = item.name;
      els.pieceDetailMeta.textContent = `${item.level}级 · ${SHOP_FOOD_PRICES[item.level]}红宝石 · 本轮限购1份`;
      els.pieceDetailText.textContent = "购买后收入奖励行囊，放到棋盘可用于合成或交付订单。";
      els.pieceDetailModal.showModal();
      return;
    }
    const pack = GIFT_PACKS[detailButton.dataset.shopDetail];
    const item = pack && byId.get(pack.itemId);
    if (!item) return;
    els.pieceDetailIcon.src = itemAssetSrc(item);
    els.pieceDetailIcon.alt = item.name;
    els.pieceDetailName.textContent = item.name;
    els.pieceDetailMeta.textContent = "驿站小铺 · 收入奖励行囊";
    els.pieceDetailText.textContent = `${pack.description ?? item.modernName} 放到棋盘后，轻点逐份领取；产出完毕后消失。`;
    els.pieceDetailModal.showModal();
    return;
  }
  const buyButton = event.target.closest("[data-shop-buy]");
  if (!buyButton) return;
  const card = buyButton.closest("[data-shop-offer]");
  if (syncDailyShopCycle()) {
    saveState();
    renderDailyShop();
    toast("货架已补货，请查看本轮商品。");
    return;
  }
  const offer = dailyShopOffers().find((entry) => entry.id === card?.dataset.shopOffer);
  if (!offer) return;
  if (state.shopPurchasedOfferIds.includes(offer.id)) {
    toast(`${offer.name}本轮已经买过了。`);
    return;
  }
  if (state.gems < offer.price) {
    toast(`红宝石不足，还差${offer.price - state.gems}颗。`);
    return;
  }
  state.gems -= offer.price;
  state.shopPurchasedOfferIds.push(offer.id);
  if (offer.itemId) grantRewardItem(offer.itemId, 1);
  else grantGiftPack(offer.packId, 1);
  playSfx("coin");
  render();
  renderDailyShop();
  saveState();
}

function renderProductionMultiplier() {
  if (!els.productionMultiplier) return;
  const available = availableProductionMultipliers();
  const multiplier = effectiveProductionMultiplier();
  state.productionMultiplier = multiplier;
  const currentIndex = available.indexOf(multiplier);
  const nextMultiplier = available[(currentIndex + 1) % available.length];
  const outputLevel = productionOutputLevel(multiplier);
  const outputText = multiplier === 4 ? "合并4份基础产出，获得3级食品" : `产出${outputLevel}级食品`;
  els.productionMultiplier.textContent = `×${multiplier}`;
  els.productionMultiplier.dataset.multiplier = String(multiplier);
  els.productionMultiplier.title = available.length === 1
    ? "合成第一份2级食品后开放×2；流沙驿升至Lv3后开放×4"
    : `当前×${multiplier}：消耗${multiplier}倍驼铃，${outputText}。点击切换到×${nextMultiplier}`;
  els.productionMultiplier.setAttribute("aria-label", available.length === 1
    ? "手动生成器当前为一倍产出；合成第一份二级食品后开放二倍"
    : `手动生成器产出倍率，当前×${multiplier}，点击切换到×${nextMultiplier}`);
}

function cycleProductionMultiplier() {
  const available = availableProductionMultipliers();
  if (available.length === 1) {
    toast("先合成第一份2级食品，即可开放 ×2 产出。");
    keeper("熟悉两两合成后，石磨才能一次备好更高等级的食物。");
    return;
  }
  const currentMultiplier = effectiveProductionMultiplier();
  const currentIndex = available.indexOf(currentMultiplier);
  const multiplier = available[(currentIndex + 1) % available.length];
  state.productionMultiplier = multiplier;
  renderProductionMultiplier();
  renderSelected();
  toast(`产出倍率切换为 ×${multiplier}`);
  keeper(multiplier === 4
    ? "手动生成器将消耗4倍驼铃，把四份基础产出压缩成1份3级食品。"
    : `手动生成器将消耗${multiplier}倍驼铃，直接产出${productionOutputLevel(multiplier)}级食品。`);
  saveState();
}

function claimDailyPouch() {
  if (hasClaimedDailyPouch()) {
    toast("今日宝袋已经领取，明日再来吧。");
    return;
  }
  state.dailyPouchClaimDay = currentLocalDayKey();
  grantGiftPack(DAILY_POUCH_PACK_ID, 1);
  render();
  renderDailyShop();
  saveState();
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
    keeper("先点案板中央的小石磨，生成一份麦面剂。");
  } else if (state.tutorialStep === 1) {
    keeper("麦面剂做好了。把它拖到左边锁格里的相同食物上，解开棋格并合成炉饼。");
  } else if (state.tutorialStep === 2) {
    keeper("炉饼做好了，交给沙州驿卒周甲试试。");
  } else if (state.tutorialStep === 3) {
    els.boardCodexBtn?.classList.add("tutorial-action");
    keeper("第一张食谱已经记下。点「食鉴」看看收录。");
  } else if (state.tutorialStep === 4) {
    els.boardCodexBtn?.classList.add("tutorial-action");
    keeper("再打开《丝路食鉴》，点一下已点亮的小图查看详情。");
  } else if (state.tutorialStep === 5 && state.renovationChoices?.[FIRST_TUTORIAL_REPAIR_ID]) {
    keeper("查看新订单需要的食物，继续接待往来的客人。");
  } else if (state.tutorialStep === 5 && firstTutorialRepairPartCompleted()) {
    keeper("第一件修缮已经完成。回后厨继续接单，攒够下一件所需的铜钱。");
  } else if (state.tutorialStep === 5 && state.completedOrderIds.includes("order_001_guard_lubing")) {
    keeper("首单铜钱已经备齐，回流沙驿修缮前厅客座。");
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

  if (activeDailyPouchOutputIndices.has(index)) {
    event.preventDefault();
    return;
  }

  const giftState = state.giftBoxStates[index];
  if (item?.id === DAILY_POUCH_ITEM_ID && activeDailyPouchStates.has(giftState)) {
    event.preventDefault();
    toast("宝袋正在一份份投放奖励。");
    return;
  }

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

  window.dispatchEvent(new CustomEvent("silkroad:board-item-press", {
    detail: { index, itemId, locked: isBoardCellLocked(index) },
  }));
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

function isSplitterTargetItem(item) {
  return Boolean(
    item
    && item.type !== "splitter_tool"
    && Number(item.level) >= 2
    && typeof item.mergeFrom === "string"
    && foodLineMaxLevels.has(item.line),
  );
}

function splitterAdjacentEmptyIndex(targetIndex) {
  const row = Math.floor(targetIndex / BOARD_COLUMNS);
  const col = targetIndex % BOARD_COLUMNS;
  const candidates = [
    col < BOARD_COLUMNS - 1 ? targetIndex + 1 : -1,
    col > 0 ? targetIndex - 1 : -1,
    row < BOARD_ROWS - 1 ? targetIndex + BOARD_COLUMNS : -1,
    row > 0 ? targetIndex - BOARD_COLUMNS : -1,
  ];
  return candidates.find((index) => index >= 0 && !isBoardCellLocked(index) && !state.board[index]) ?? -1;
}

function clearSplitterDropTargets() {
  els.board.querySelectorAll(".splitter-drop-target, .splitter-drop-ready").forEach((cell) => {
    cell.classList.remove("splitter-drop-target", "splitter-drop-ready");
  });
}

function updateSplitterDropTargets(hoveredIndex = null) {
  clearSplitterDropTargets();
  if (!dragging || byId.get(state.board[dragging.fromIndex])?.type !== "splitter_tool") return;
  state.board.forEach((itemId, index) => {
    if (!isSplitterTargetItem(byId.get(itemId))) return;
    if (splitterAdjacentEmptyIndex(index) < 0) return;
    const cell = els.board.querySelector(`.cell[data-index="${index}"]`);
    cell?.classList.add("splitter-drop-target");
    if (index === hoveredIndex) cell?.classList.add("splitter-drop-ready");
  });
}

function isUpgradeToolTargetItem(item) {
  return Boolean(
    item
    && typeof item.mergeTo === "string"
    && foodLineMaxLevels.has(item.line)
    && byId.has(item.mergeTo),
  );
}

function clearUpgradeDropTargets() {
  els.board.querySelectorAll(".upgrade-drop-target, .upgrade-drop-ready").forEach((cell) => {
    cell.classList.remove("upgrade-drop-target", "upgrade-drop-ready");
  });
}

function updateUpgradeDropTargets(hoveredIndex = null) {
  clearUpgradeDropTargets();
  if (!dragging || byId.get(state.board[dragging.fromIndex])?.type !== "upgrade_tool") return;
  state.board.forEach((itemId, index) => {
    if (!isUpgradeToolTargetItem(byId.get(itemId))) return;
    const cell = els.board.querySelector(`.cell[data-index="${index}"]`);
    cell?.classList.add("upgrade-drop-target");
    if (index === hoveredIndex) cell?.classList.add("upgrade-drop-ready");
  });
}

async function useUpgradeTool(toolIndex, targetIndex) {
  const target = byId.get(state.board[targetIndex]);
  if (!isUpgradeToolTargetItem(target)) {
    toast(target && foodLineMaxLevels.has(target.line)
      ? `${target.name}已经满阶，无法继续升阶。`
      : "百味金笺只能用于未满阶食物。");
    return false;
  }
  const upgraded = byId.get(target.mergeTo);
  if (!upgraded) return false;
  const accepted = await showGameConfirm({
    eyebrow: "使用极稀有道具",
    title: "确认升阶？",
    message: "",
    confirmLabel: "确认升阶",
    tone: "primary",
    upgradePreview: { from: target, to: upgraded },
  });
  if (!accepted || state.board[toolIndex] !== UPGRADE_TOOL_ITEM_ID || state.board[targetIndex] !== target.id) return false;
  state.board[targetIndex] = upgraded.id;
  state.board[toolIndex] = null;
  state.selectedIndex = targetIndex;
  state.pulseIndex = targetIndex;
  playSfx("merge");
  keeper(`${target.name}升为${upgraded.name}，百味金笺已经化入食香。`);
  toast(`升阶成功 · ${upgraded.name}`);
  clearPulseSoon();
  return true;
}

function useSplitterTool(toolIndex, targetIndex) {
  const target = byId.get(state.board[targetIndex]);
  if (!isSplitterTargetItem(target)) {
    toast("拆解剪只能用于Lv2或更高的食材。");
    return false;
  }
  const outputIndex = splitterAdjacentEmptyIndex(targetIndex);
  if (outputIndex < 0) {
    toast("食材旁边需要留出一个空格，才能拆成两份。");
    return false;
  }
  const lowerItem = byId.get(target.mergeFrom);
  if (!lowerItem) return false;
  state.board[targetIndex] = lowerItem.id;
  state.board[outputIndex] = lowerItem.id;
  const remaining = splitterToolChargesAt(toolIndex) - 1;
  if (remaining > 0) {
    state.splitterToolCharges[toolIndex] = remaining;
  } else {
    delete state.splitterToolCharges[toolIndex];
    state.board[toolIndex] = null;
  }
  state.selectedIndex = targetIndex;
  splitterPulseIndices = new Set([targetIndex, outputIndex]);
  playSfx("merge");
  keeper(`${target.name}拆成了两份${lowerItem.name}，拆解剪还剩${Math.max(0, remaining)}次。`);
  toast(`${target.name} → ${lowerItem.name} ×2`);
  setTimeout(() => {
    splitterPulseIndices.clear();
    renderBoard();
  }, 760);
  return true;
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
    if (item) {
      dragging.sourceCell?.classList.add("is-drag-source");
      dragging.ghost = createDragGhost(item);
    }
  }
  positionDragGhost(event.clientX, event.clientY);
  updateSplitterDropTargets(hoveredIndex);
  updateUpgradeDropTargets(hoveredIndex);
  els.storageBtn?.classList.toggle("drop-ready", isStorageDropPoint(event.clientX, event.clientY));
}

async function endCellPointer(event) {
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
    if (["splitter_tool", "upgrade_tool"].includes(byId.get(itemId)?.type)) {
      toast(byId.get(itemId)?.type === "upgrade_tool"
        ? "百味金笺不能用来解锁棋盘格。"
        : "拆解剪不能用来解锁棋盘格。");
      render();
      return;
    }
    unlockLockedCellByMerge(fromIndex, toIndex, itemId);
    render();
    saveState();
    maybePromptRepairGuide();
    return;
  }

  const targetItemId = state.board[toIndex];
  const sourceItem = byId.get(itemId);
  if (sourceItem?.type === "upgrade_tool" && targetItemId) {
    await useUpgradeTool(fromIndex, toIndex);
    render();
    saveState();
    return;
  }
  if (sourceItem?.type === "splitter_tool" && targetItemId) {
    useSplitterTool(fromIndex, toIndex);
    render();
    saveState();
    return;
  }
  if (!targetItemId) {
    state.board[toIndex] = itemId;
    state.board[fromIndex] = null;
    transferBoardItemState(itemId, fromIndex, toIndex);
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
  window.dispatchEvent(new Event("silkroad:board-item-release"));
  const sourceCell = dragging?.sourceCell;
  sourceCell?.classList.remove("is-drag-source");
  clearSplitterDropTargets();
  clearUpgradeDropTargets();
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

async function handleCellClick(index, prevSelected = state.selectedIndex) {
  if (activeDailyPouchOutputIndices.has(index)) return;
  const activeSelectedGiftState = state.giftBoxStates[prevSelected];
  if (prevSelected !== index && activeDailyPouchStates.has(activeSelectedGiftState)) {
    playSfx("click", { markSpecific: false });
    toast("宝袋正在投放，落完这一份再挪动棋盘。");
    return;
  }
  // Click on locked cell: try to unlock with selected piece
  if (isBoardCellLocked(index)) {
    queueBoardClickSound();
    if (prevSelected !== null && !isBoardCellLocked(prevSelected)) {
      const selectedItemId = state.board[prevSelected];
      const selectedItem = byId.get(selectedItemId);
      if (["splitter_tool", "upgrade_tool"].includes(selectedItem?.type)) {
        toast(selectedItem.type === "upgrade_tool"
          ? "百味金笺不能用来解锁棋盘格。"
          : "拆解剪不能用来解锁棋盘格。");
        return;
      }
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
  const previouslySelectedItem = prevSelected !== null ? byId.get(state.board[prevSelected]) : null;

  if (prevSelected !== index && itemId && previouslySelectedItem?.type === "splitter_tool") {
    useSplitterTool(prevSelected, index);
    render();
    saveState();
    return;
  }
  if (prevSelected !== index && itemId && previouslySelectedItem?.type === "upgrade_tool") {
    await useUpgradeTool(prevSelected, index);
    render();
    saveState();
    return;
  }

  // A second tap on the same generator should merge, while a single tap still produces food.
  if (item?.type === "manual_generator") {
    if (prevSelected !== null && prevSelected !== index && !isBoardCellLocked(prevSelected)
      && state.board[prevSelected] === itemId) {
      mergeCells(prevSelected, index, itemId);
      render();
      saveState();
      maybePromptRepairGuide();
      return;
    }
    activateManualGenerator(index);
    return;
  }

  queueBoardClickSound();

  if (item?.type === "bonus_bubble") {
    const bubbleState = state.bubbleStates[itemId];
    const contained = byId.get(item.bubbleItemId);
    const seconds = bubbleState ? Math.max(0, Math.ceil((bubbleState.expiresAt - Date.now()) / 1000)) : 0;
    playSfx("bubble");
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

  if (item?.type === "bonus_stamina") {
    const now = Date.now();
    if (lastBonusStaminaTapIndex === index && now - lastBonusStaminaTapAt <= 450) {
      lastBonusStaminaTapIndex = -1;
      lastBonusStaminaTapAt = 0;
      collectBonusStamina(index);
      return;
    }
    lastBonusStaminaTapIndex = index;
    lastBonusStaminaTapAt = now;
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
      transferBoardItemState(selectedItemId, prevSelected, index);
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
  playSfx("coin");
  keeper(`${item.name}已收入宝石囊，顶部红宝石增加${amount}颗。`);
  toast(`收取${item.name} +${amount}`);
  render();
  saveState();
}

function collectBonusStamina(index) {
  const item = byId.get(state.board[index]);
  if (item?.type !== "bonus_stamina") return;
  const amount = item.staminaValue ?? BONUS_STAMINA_VALUES[item.level] ?? 0;
  state.board[index] = null;
  state.selectedIndex = null;
  state.stamina += amount;
  keeper(`${item.name}已化作行路体力，顶部驼铃增加${amount}点。`);
  toast(`收获${item.name} +${amount}体力`);
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
  return `升Lv${status.targetLevel} · 同级${sameLevelCount}/2`;
}

function generatorUpgradeDetail(item) {
  const status = generatorUpgradeStatus(item);
  if (status.maxLevel) return "已经达到Lv6最高等级。";
  const sameLevelCount = state.board.filter((itemId) => itemId === item.id).length;
  const mergeRule = `两个同类Lv${item.level}生成器可直接合成Lv${status.targetLevel}，不受驿站等级限制。`;
  if (sameLevelCount >= 2) return `${mergeRule}当前案板已凑齐，拖到同级生成器上即可升级。`;
  return `${mergeRule}Lv1生成器可由同系材料逐级合成；同系订单达标后，也可从奖励行囊领取副本。`;
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
  playSfx("merge");
  maybeCreateMergeBubble(item, outputId, toIndex);
  state.pulseIndex = toIndex;
  state.unlockPulseIndex = toIndex;
  const output = byId.get(outputId);
  keeper(`风沙散开，解开了一格：${output?.name ?? lockedItem.name}。`);
  toast(`解锁格子：${output?.name ?? lockedItem.name}`);
  if (navigator.vibrate) navigator.vibrate(16);
  if (item?.boxMaterial) tryBuildGeneratorFromMaterials(itemId);
  if (item?.mergeTo) unlockCodex(byId.get(item.mergeTo)?.codexId);
  if (state.tutorialStep <= 1 && output?.id === "hubing_02_lubing") {
    state.tutorialStep = 2;
  }
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
  playSfx("merge");
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
  if (byId.get(state.board[toIndex])?.type === "auto_generator") {
    queueMicrotask(() => tickGenerators());
  }
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

function manualGeneratorOutputItem(item) {
  const category = state.generatorConfig.categories.find((entry) => entry.id === item?.generatorType);
  if (!category) return byId.get(item?.generator?.pool?.[0]?.itemId);
  const targetLevel = productionOutputLevel();
  return foodItemsForLine(category.foodLineId)
    .find((foodItem) => Number(foodItem.level) === targetLevel)
    ?? byId.get(item?.generator?.pool?.[0]?.itemId);
}

function manualGeneratorStaminaCost(item) {
  return Math.max(0, Number(item?.generator?.staminaCost) || 0)
    * effectiveProductionMultiplier();
}

// Use live item metadata and orders, including matching food inside locked cells.
function storageGuideContext() {
  const demanded = new Set(state.visibleOrders.flatMap((id) => getOrder(id)?.demand ?? [])
    .map((demand) => demand.itemId));
  const storable = [];
  const recommended = [];
  state.board.forEach((itemId, index) => {
    const item = byId.get(itemId);
    if (!item || isBoardCellLocked(index) || isGeneratorPiece(item)
      || activeDailyPouchOutputIndices.has(index)
      || ["bonus_bubble", "bonus_coin", "bonus_ruby", "bonus_stamina"].includes(item.type)) return;
    if (item.type === "gift_box" && !GIFT_PACKS[state.giftBoxStates[index]?.packId]?.shopOffer) return;
    storable.push(index);
    const hasMergePartner = Boolean(item.mergeTo) && state.board.some((otherId, otherIndex) =>
      otherIndex !== index && (isBoardCellLocked(otherIndex) ? lockedCellItemId(otherIndex) : otherId) === itemId);
    if (item.codexId && !item.type && !demanded.has(itemId) && !hasMergePartner) recommended.push(index);
  });
  return { canStore: firstEmptyBagIndex() !== -1, storable, recommended };
}

function activateManualGenerator(index) {
  const itemId = state.board[index];
  const item = byId.get(itemId);
  if (!item || item.type !== "manual_generator") return;
  getGeneratorState(item.id, boardGeneratorStateKey(index));
  state.selectedIndex = index;
  if (!hasEmptyCell()) {
    render();
    const fullBoardMessage = "棋盘已满，先合成食物或拖进柜子腾出空格。";
    const handledByStorageGuide = !window.dispatchEvent(new CustomEvent("silkroad:board-full-attempt", {
      detail: storageGuideContext(),
      cancelable: true,
    }));
    if (!handledByStorageGuide) toast(fullBoardMessage, 2800);
    return;
  }
  const outputItem = manualGeneratorOutputItem(item);
  const staminaCost = manualGeneratorStaminaCost(item);
  if (!outputItem) {
    render();
    toast("这台生成器还没有对应倍率的食品。");
    return;
  }
  if (state.stamina < staminaCost) {
    render();
    toast(`驼铃不足，本次 ×${effectiveProductionMultiplier()} 产出需要${staminaCost}点。`);
    return;
  }

  const staminaWasFull = state.stamina >= state.staminaMax;
  state.stamina -= staminaCost;
  if (staminaWasFull && state.stamina < state.staminaMax) state.lastTick = Date.now();

  const outputs = Math.min(item.generator.outputCount, emptyCellCount());
  const generatedOutputs = [];
  for (let i = 0; i < outputs; i += 1) {
    const newItemId = outputItem.id;
    const outIndex = randomUnlockedEmptyIndex();
    if (outIndex === -1) break;
    state.board[outIndex] = newItemId;
    activeGeneratorOutputIndices.add(outIndex);
    generatedOutputs.push({ targetIndex: outIndex, itemId: newItemId });
    state.pulseIndex = outIndex;
  }
  if (generatedOutputs.length > 0) playSfx("generate");
  state.generationCount += 1;
  state.selectedIndex = index;
  if (state.tutorialStep === 0) state.tutorialStep = 1;
  keeper(`${item.name}消耗${staminaCost}点驼铃，备好了${outputItem.name}。`);
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
  if (item?.type === "manual_generator") {
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
  if (!codexId) return;
  const entry = codexById.get(codexId);
  if (!entry) return;
  const item = byId.get(entry.itemId);
  if (!item) return;
  rememberUnlockedFoodItem(item.id);
  if (state.unlockedCodex.has(codexId)) return;
  state.unlockedCodex.add(codexId);
  activeCodexItemId = item.id;
  const firstRecipeTutorial = state.tutorialStep <= 1 && item.id === "hubing_02_lubing";
  els.unlockIcon.src = itemAssetSrc(item);
  els.unlockName.textContent = entry.name;
  els.unlockText.textContent = entry.shortText;
  els.viewCodexFromUnlock.hidden = firstRecipeTutorial;
  els.unlockAcknowledgeBtn.closest(".modal-actions")?.classList.toggle("single", firstRecipeTutorial);
  els.unlockAcknowledgeBtn.textContent = firstRecipeTutorial ? "去交付" : "知道了";
  els.unlockAcknowledgeBtn.classList.toggle("primary", firstRecipeTutorial);
  els.unlockModal.showModal();
}

function generateItem() {
  toast("新的磨坊需要由同类材料逐级合成。");
  keeper("收集并合成磨坊材料，才能做出新的小石磨。");
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
  recordCaravanRenownOrder(order);
  syncGeneratorProgressRewards({ announce: true });
  if (state.tutorialStep === 2 && order.id === "order_001_guard_lubing") {
    state.tutorialStep = 3;
  }
  keeper(order.dialogue);
  state.visibleOrders = state.visibleOrders.filter((visibleOrderId) => visibleOrderId !== orderId);
  syncVisibleOrders();
  syncCaravanRenownOrders();
  if (state.currentOrderDetailId === orderId && els.orderDetailModal.open) {
    els.orderDetailModal.close();
    state.currentOrderDetailId = null;
  }
  render();
  saveState();
  if (firstClear && historicalNoteForOrder(orderId)) {
    toast("已收录一则路上见闻，可在剧情回顾中阅读。");
  }
  maybePromptRepairGuide();
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
  const historicalNote = historicalNoteForOrder(order.id);
  els.historicalOrderTeaser.hidden = !historicalNote || historicalNoteUnlocked(historicalNote);
  if (historicalNote && !els.historicalOrderTeaser.hidden) {
    els.historicalOrderTeaser.textContent = "首次交付这位旅人的订单后，可在剧情回顾里读一则「路上见闻」。";
  }
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
  // Availability is shown by the highlighted exterior point. Reaching an unlock
  // condition must never open a blocking progress dialog on the player's behalf.
  if (state.currentPage !== "inn") return;
  const gate = canEnterRepairPage();
  const milestone = gate.milestone;
  if (!gate.ok || !milestone) return;
  if (state.activeRepairId === milestone.id || !els.repairPlayerLayer?.hidden) return;
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
  return [...state.board, ...state.bag]
    .map((itemId) => byId.get(migrateLegacyGeneratorId(itemId)))
    .filter((item) => isGeneratorPiece(item) && item.generatorType === categoryId)
    .reduce((highest, item) => Math.max(highest, Number(item.level) || 1), 0);
}

function orderDemandLinesUnlocked(order) {
  const availability = state.economyConfig?.orderPricing?.availability ?? {};
  const maxDemandByGeneratorLevel = availability.maxDemandLevelByGeneratorLevel ?? {};
  const requireDiscoveredDemandItem = state.ordersConfig?.generationPolicy?.unlockSafety?.requireDiscoveredDemandItem === true;
  return order.demand.every((demand) => {
    const item = byId.get(demand.itemId);
    const category = state.generatorConfig.categories.find((entry) => entry.foodLineId === item?.line);
    if (!item || !category || !state.unlockedGeneratorCategories.includes(category.id)) return false;
    const generatorLevel = highestOwnedGeneratorLevel(category.id);
    if (availability.requireOwnedGeneratorLine && generatorLevel < 1) return false;
    const maxDemandLevel = Number(maxDemandByGeneratorLevel[generatorLevel]) || 8;
    const demandLevel = Number(item.level) || 1;
    if (demandLevel > maxDemandLevel) return false;
    if (!requireDiscoveredDemandItem || demandLevel <= 2) return true;
    return (Number(state.unlockedFoodLevels[item.line]) || 0) >= demandLevel;
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

function nextStoryOrderId() {
  const milestone = nextRepairMilestone();
  if (!milestone || milestoneInnLevel(milestone) > state.innLevel) return null;
  return (milestone.conditions?.completedOrderIds ?? []).find(
    (orderId) => !state.completedOrderIds.includes(orderId),
  ) ?? null;
}

function syncVisibleOrders() {
  if (CARAVAN_RENOWN_QA_MODE) {
    const qaOrderIds = [
      "order_012_changan_maid_lubing",
      "order_exp_goal_001",
      "order_lv4_south_shed_stocking",
      "order_ch1_variant_04_mill_humabing",
    ];
    state.visibleOrders = qaOrderIds;
    return;
  }
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
  const storyOrderId = nextStoryOrderId();
  const storyOrder = getOrder(storyOrderId);
  if (storyOrder && !state.visibleOrders.includes(storyOrderId)
    && isOrderEligible(storyOrder, { ignoreVisible: true, ignoreWeight: true })) {
    state.visibleOrders.unshift(storyOrderId);
    if (state.visibleOrders.length > maxVisible) state.visibleOrders.length = maxVisible;
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
  const safety = state.ordersConfig.generationPolicy?.unlockSafety ?? {};
  const highLevel = Number(safety.highItemLevelThreshold) || 5;
  const highLimit = Number(safety.maxSimultaneousOrdersAtOrAboveItemLevel) || 1;
  const isHighOrder = (order) => order?.demand.some((demand) => Number(byId.get(demand.itemId)?.level) >= highLevel);
  const highCount = state.visibleOrders.filter((id) => isHighOrder(getOrder(id))).length;
  const allCandidates = state.ordersConfig.orders.filter((order) => isOrderEligible(order)
    && (highCount < highLimit || !isHighOrder(order)));
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
  els.stationSummary.textContent = `流沙驿 Lv${state.innLevel} · 第${chapter}卷 ${chapterName(chapter)}：已推进 ${doneCount}/${milestones.length} 个修缮节点，已修好 ${repairCount} 处。`;
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
  if (els.repairModal.open) closeRepairModalToAnchor();
  beginRepairMilestone(milestone);
}

function playRepairCompleteEffect(milestone) {
  const map = els.innScene.querySelector(".longscroll-map");
  const bounds = (milestone.longscrollRegionIds ?? [])
    .map((regionId) => LONGSCROLL_REGION_BOUNDS[regionId])
    .filter(Boolean);
  if (!map || !bounds.length) return 280;
  clearTimeout(repairRenewalTimer);
  map.querySelector(".longscroll-renewal-effect")?.remove();

  const left = Math.min(...bounds.map(([x]) => x));
  const top = Math.min(...bounds.map(([, y]) => y));
  const right = Math.max(...bounds.map(([x, , width]) => x + width));
  const bottom = Math.max(...bounds.map(([, y, , height]) => y + height));
  const width = right - left;
  const height = bottom - top;
  const maskImages = milestone.longscrollRegionIds.map((regionId) =>
    `<image href="${longscrollMaskSrc(regionId)}" x="0" y="0" width="1254" height="1254" preserveAspectRatio="none" />`,
  ).join("");
  const svg = (name, contents) => `<svg class="longscroll-renewal-${name}" viewBox="${left} ${top} ${width} ${height}" aria-hidden="true">
    <defs>
      <filter id="longscroll-renewal-${name}-feather" x="-4%" y="-4%" width="108%" height="108%"><feGaussianBlur stdDeviation="6" /></filter>
      <mask id="longscroll-renewal-${name}-mask" maskUnits="userSpaceOnUse" maskContentUnits="userSpaceOnUse" mask-type="alpha" x="${left}" y="${top}" width="${width}" height="${height}"><g filter="url(#longscroll-renewal-${name}-feather)">${maskImages}</g></mask>
    </defs>
    ${contents}
  </svg>`;
  const effect = document.createElement("div");
  effect.className = "longscroll-renewal-effect";
  effect.dataset.renewalSite = milestone.id;
  effect.style.cssText = `left:${left}px;top:${top}px;width:${width}px;height:${height}px`;
  effect.innerHTML = svg("before", `<image href="${LONGSCROLL_BASE_SOURCE}" x="0" y="0" width="1254" height="1254" mask="url(#longscroll-renewal-before-mask)" />`)
    + svg("glow", `<rect x="${left}" y="${top}" width="${width}" height="${height}" fill="#ffe9b1" mask="url(#longscroll-renewal-glow-mask)" />`);
  map.append(effect);
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion) effect.classList.add("is-active");
  else requestAnimationFrame(() => { if (effect.isConnected) effect.classList.add("is-active"); });
  repairRenewalTimer = setTimeout(() => {
    effect.remove();
    repairRenewalTimer = null;
  }, reducedMotion ? 400 : 1600);
  if (navigator.vibrate && !LONGSCROLL_RENEWAL_QA_MODE) navigator.vibrate(18);
  return reducedMotion ? 900 : 2200;
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
      innLevel: milestoneInnLevel(milestone),
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
      repairParts: milestone.repairParts,
      renovationChoices: milestone.renovationChoices,
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
  return repairPartCosts(milestone).reduce((sum, cost) => sum + cost, 0);
}

function isConditionMet(conditions) {
  return getMilestoneChecks(conditions).every((check) => check.done);
}

function getMilestoneChecks(conditions) {
  const checks = [];
  if (conditions.completedOrders) {
    checks.push(progressCheck("完成订单", state.completedOrders, conditions.completedOrders));
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
  if (name === "解锁食鉴") return `再收录${left}道食物`;
  return `${name}还差${left}`;
}

function rewardText(milestone) {
  const rewards = milestone.rewards ?? {};
  const labels = [];
  if (rewards.coins) labels.push(`价值${rewards.coins}铜币的铜币棋子收入行囊`);
  if (rewards.boardColumns && rewards.boardRows) labels.push(`案板 ${rewards.boardColumns}x${rewards.boardRows}`);
  if (rewards.staminaMax) labels.push(`驼铃上限 ${rewards.staminaMax}`);
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

function backfillGeneratorProgressionGifts() {
  // Completed repairs cannot be replayed. Restore their new supply once for old saves.
  for (const milestone of state.progressionConfig.milestones) {
    if (!isRepairCompleted(milestone.id)) continue;
    for (const reward of milestone.rewards?.giftPacks ?? []) {
      const category = GIFT_PACKS[reward.id]?.progressionCategory;
      if (!category || ownsGeneratorCategory(category)) continue;
      const pending = state.giftPacks.some((entry) => entry.id === reward.id)
        || Object.values(state.giftBoxStates).some((entry) => entry.packId === reward.id);
      if (!pending) grantGiftPack(reward.id, reward.quantity ?? 1);
    }
  }
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

async function sellSelected() {
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
  if (action.requiresConfirm) {
    const accepted = await showGameConfirm({
      eyebrow: action.mode === "delete" ? "舍弃棋子" : "出售棋子",
      title: `${actionName}${item.name}？`,
      message: action.mode === "delete"
        ? "删除后无法找回，也不会获得铜钱。"
        : `出售后将获得 ${action.value} 枚铜钱，棋子无法找回。`,
      confirmLabel: `确认${actionName}`,
      tone: "danger",
    });
    if (!accepted) return;
  }
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
  const selectedItem = byId.get(state.board[state.selectedIndex]);
  if (generatorWarehouseUnlocked()
    && isGeneratorPiece(selectedItem)
    && Number(selectedItem.level) === generatorWarehouseAcceptedLevel()) {
    state.generatorWarehouse.selectedCategoryId = selectedItem.generatorType;
    activeStorageTab = "generator";
  }
  renderStorage();
  showStorageModal();
}

function showStorageModal() {
  if (!els.storageModal.open) els.storageModal.showModal();
  requestAnimationFrame(maybeShowStorageGuide);
}

function maybeShowStorageGuide() {
  if (!els.storageModal?.open
    || !els.storageGuide
    || !generatorWarehouseUnlocked()
    || state.generatorWarehouseGuideSeen) return;
  storageGuideStep = "generator";
  els.storageGuide.hidden = false;
  els.storageNormalTab?.parentElement?.classList.add("guide-active");
  renderStorageGuideStep();
}

function renderStorageGuideStep() {
  if (!storageGuideStep || !els.storageGuide) return;
  const isGeneratorStep = storageGuideStep === "generator";
  activeStorageTab = isGeneratorStep ? "generator" : "normal";
  renderStorage();
  els.storageGuide.dataset.step = storageGuideStep;
  els.storageGuideTitle.textContent = isGeneratorStep ? "生成器仓库" : "普通储物";
  els.storageGuideCopy.textContent = isGeneratorStep
    ? "收纳 Lv1 生成器；同类集满 8 枚，会凝成 1 枚 Lv4。"
    : "食材与普通道具收在这里，需要时可以取回棋盘。";
  els.storageGuideNext.textContent = "知道了";
  els.storageGuide.querySelectorAll(".storage-guide-progress i").forEach((dot, index) => {
    dot.classList.toggle("active", index === 0);
  });
  els.storageGuide.querySelector(".storage-guide-progress")?.setAttribute(
    "aria-label",
    "第1步，共1步",
  );
  els.storageNormalTab?.classList.toggle("storage-guide-target", !isGeneratorStep);
  els.storageGeneratorTab?.classList.toggle("storage-guide-target", isGeneratorStep);
}

function advanceStorageGuide() {
  completeStorageGuide();
}

function completeStorageGuide() {
  if (storageGuideStep === "generator") state.generatorWarehouseGuideSeen = true;
  else state.storageGuideVersion = STORAGE_GUIDE_VERSION;
  hideStorageGuide();
  saveState();
}

function hideStorageGuide() {
  storageGuideStep = null;
  if (els.storageGuide) els.storageGuide.hidden = true;
  els.storageNormalTab?.parentElement?.classList.remove("guide-active");
  els.storageNormalTab?.classList.remove("storage-guide-target");
  els.storageGeneratorTab?.classList.remove("storage-guide-target");
}

function setStorageTab(tab) {
  if (tab === "generator" && !generatorWarehouseUnlocked()) {
    toast(generatorWarehouseUnlockCopy());
    return;
  }
  activeStorageTab = tab === "generator" ? "generator" : "normal";
  renderStorage();
  if (activeStorageTab === "generator" && !state.generatorWarehouseGuideSeen) {
    storageGuideStep = "generator";
    els.storageGuide.hidden = false;
    els.storageNormalTab?.parentElement?.classList.add("guide-active");
    renderStorageGuideStep();
  }
}

function selectGeneratorWarehouseCategory(event) {
  const button = event.target instanceof Element
    ? event.target.closest("[data-generator-warehouse-category]")
    : null;
  if (!button || button.disabled) return;
  state.generatorWarehouse.selectedCategoryId = button.dataset.generatorWarehouseCategory;
  renderGeneratorWarehouse();
  saveState();
}

function selectedGeneratorWarehouseCategory() {
  const categories = validGeneratorCategoryIds();
  const selected = state.generatorWarehouse?.selectedCategoryId;
  if (categories.includes(selected)) return selected;
  const fallback = state.unlockedGeneratorCategories.find((categoryId) => categories.includes(categoryId))
    ?? categories[0]
    ?? "mill";
  state.generatorWarehouse.selectedCategoryId = fallback;
  return fallback;
}

function depositGeneratorAtBoardIndex(boardIndex, { openWarehouse = false } = {}) {
  if (!generatorWarehouseUnlocked()) {
    toast(generatorWarehouseUnlockCopy());
    return false;
  }
  const itemId = state.board[boardIndex];
  const item = byId.get(itemId);
  if (!isGeneratorPiece(item)) {
    toast("生成器仓库只收纳生成器棋子。");
    return false;
  }
  if (Number(item.level) !== generatorWarehouseAcceptedLevel()) {
    toast(`生成器仓库目前只接收 Lv${generatorWarehouseAcceptedLevel()} 生成器。`);
    return false;
  }
  const categoryId = item.generatorType;
  const entry = generatorWarehouseEntry(categoryId);
  if (!state.unlockedGeneratorCategories.includes(categoryId)) {
    state.unlockedGeneratorCategories = validGeneratorCategoryIds().filter(
      (candidateId) => candidateId === categoryId || state.unlockedGeneratorCategories.includes(candidateId),
    );
  }
  delete state.generatorStates[boardGeneratorStateKey(boardIndex)];
  state.board[boardIndex] = null;
  state.selectedIndex = null;
  state.generatorWarehouse.selectedCategoryId = categoryId;
  state.generatorWarehouse.progressByCategory[categoryId] = entry.progress + 1;
  let produced = false;
  if (state.generatorWarehouse.progressByCategory[categoryId] >= entry.target) {
    state.generatorWarehouse.progressByCategory[categoryId] -= entry.target;
    state.generatorWarehouse.readyItems.push(entry.outputItemId);
    produced = true;
  }
  activeStorageTab = "generator";
  playSfx("coin");
  keeper(produced
    ? `${item.name}已收入母棋仓库，高阶${byId.get(entry.outputItemId)?.name ?? "生成器"}已经凝成。`
    : `${item.name}已收入母棋仓库，${entry.progress + 1}/${entry.target}。`);
  toast(produced ? "进度已满 · 高阶生成器待领取" : `${item.name}收纳成功`);
  render();
  if (openWarehouse) showStorageModal();
  renderStorage();
  els.generatorWarehousePanel?.classList.add("is-progressing");
  clearTimeout(generatorWarehouseAnimationTimer);
  generatorWarehouseAnimationTimer = setTimeout(() => {
    els.generatorWarehousePanel?.classList.remove("is-progressing");
  }, 720);
  saveState();
  return true;
}

function depositSelectedGenerator() {
  if (state.selectedIndex === null || isBoardCellLocked(state.selectedIndex)) {
    toast("先在棋盘上选中一枚 Lv1 生成器。");
    return;
  }
  depositGeneratorAtBoardIndex(state.selectedIndex);
}

function withdrawStoredGenerator() {
  const categoryId = selectedGeneratorWarehouseCategory();
  const entry = generatorWarehouseEntry(categoryId);
  if (entry.progress <= 0) return;
  const boardIndex = firstEmptyIndex();
  if (boardIndex < 0) {
    toast("棋盘已满，腾出空格后再取回。");
    return;
  }
  const itemId = generatorItemId(categoryId, generatorWarehouseAcceptedLevel());
  state.generatorWarehouse.progressByCategory[categoryId] -= 1;
  state.board[boardIndex] = itemId;
  state.selectedIndex = boardIndex;
  state.pulseIndex = boardIndex;
  clearPulseSoon();
  toast(`${byId.get(itemId)?.name ?? "生成器"}已放回棋盘`);
  render();
  renderStorage();
  saveState();
}

function claimGeneratorWarehouseOutput() {
  const categoryId = selectedGeneratorWarehouseCategory();
  const readyIndex = state.generatorWarehouse.readyItems.findIndex(
    (itemId) => generatorCategoryForItem(itemId) === categoryId,
  );
  if (readyIndex < 0) return;
  const boardIndex = firstEmptyIndex();
  if (boardIndex < 0) {
    toast("棋盘已满，高阶生成器会继续留在领取槽中。");
    return;
  }
  const [itemId] = state.generatorWarehouse.readyItems.splice(readyIndex, 1);
  state.board[boardIndex] = itemId;
  state.selectedIndex = boardIndex;
  state.pulseIndex = boardIndex;
  clearPulseSoon();
  playSfx("coin");
  toast(`领取${byId.get(itemId)?.name ?? "高阶生成器"}`);
  render();
  renderStorage();
  saveState();
}

function openRubyRecharge() {
  if (els.rubyRechargeBalance) els.rubyRechargeBalance.textContent = state.gems ?? 0;
  els.rubyRechargeModal?.showModal();
}

function explainStorageInvite() {
  const requiredNewPlayers = Number(
    state.economyConfig?.premiumCurrency?.storage?.inviteUnlock?.requiredNewPlayers,
  ) || 1;
  toast(`平台邀请功能尚未接入。开放后，每成功邀请${requiredNewPlayers}位新掌柜，可免费开启1个仓位。`);
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
  playSfx("coin");
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
  playSfx("coin");
  keeper(`柜中第${state.unlockedStorageSlots}格已经开启。`);
  toast(`仓位 +1 · 红宝石 -${price}`);
  render();
  saveState();
}

function renderStorage() {
  if (!els.storageSlotList) return;
  const warehouseUnlocked = generatorWarehouseUnlocked();
  if (!warehouseUnlocked && activeStorageTab === "generator") activeStorageTab = "normal";
  const generatorTabActive = activeStorageTab === "generator";
  els.storageGeneratorTab?.classList.toggle("locked", !warehouseUnlocked);
  els.storageGeneratorTab?.setAttribute("aria-disabled", String(!warehouseUnlocked));
  els.storageGeneratorTab?.setAttribute("aria-label", warehouseUnlocked
    ? "生成器仓库"
    : `生成器仓库未解锁：${generatorWarehouseUnlockCopy()}`);
  if (els.storageGeneratorTab) els.storageGeneratorTab.title = warehouseUnlocked
    ? "生成器仓库"
    : generatorWarehouseUnlockCopy();
  els.storageNormalTab?.classList.toggle("active", !generatorTabActive);
  els.storageGeneratorTab?.classList.toggle("active", generatorTabActive);
  if (els.storageNormalPanel) els.storageNormalPanel.hidden = generatorTabActive;
  if (els.generatorWarehousePanel) els.generatorWarehousePanel.hidden = !generatorTabActive;
  if (els.storageFooter) els.storageFooter.hidden = generatorTabActive;
  if (generatorTabActive) renderGeneratorWarehouse();
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

function renderGeneratorWarehouse() {
  if (!els.generatorWarehousePanel || !els.generatorWarehouseCategories) return;
  const categoryId = selectedGeneratorWarehouseCategory();
  const categories = state.generatorConfig.categories;
  els.generatorWarehouseCategories.innerHTML = categories.map((category) => {
    const entry = generatorWarehouseEntry(category.id);
    const unlocked = state.unlockedGeneratorCategories.includes(category.id)
      || ownsGeneratorCategory(category.id);
    const baseItem = byId.get(generatorItemId(category.id, generatorWarehouseAcceptedLevel()));
    return `
      <button class="generator-warehouse-category ${category.id === categoryId ? "active" : ""} ${unlocked ? "" : "locked"}"
        type="button" data-generator-warehouse-category="${category.id}" ${unlocked ? "" : "disabled"}
        aria-label="${unlocked ? `查看${category.displayName}，进度${entry.progress}/${entry.target}` : `${category.displayName}尚未解锁`}">
        <img src="${itemAssetSrc(baseItem)}" alt="" />
        <span>${unlocked ? `${entry.progress}/${entry.target}` : "未解锁"}</span>
      </button>`;
  }).join("");

  const category = categories.find((entry) => entry.id === categoryId) ?? categories[0];
  if (!category) return;
  const entry = generatorWarehouseEntry(category.id);
  const baseItem = byId.get(generatorItemId(category.id, generatorWarehouseAcceptedLevel()));
  const outputItem = byId.get(entry.outputItemId);
  const selectedItem = byId.get(state.board[state.selectedIndex]);
  const canDeposit = isGeneratorPiece(selectedItem)
    && Number(selectedItem.level) === generatorWarehouseAcceptedLevel()
    && selectedItem.generatorType === category.id;
  const unlocked = state.unlockedGeneratorCategories.includes(category.id)
    || ownsGeneratorCategory(category.id);

  els.generatorWarehouseName.textContent = category.displayName;
  els.generatorWarehouseCount.textContent = `${entry.progress} / ${entry.target}`;
  els.generatorWarehouseProgress.style.width = `${Math.min(100, (entry.progress / entry.target) * 100)}%`;
  els.generatorWarehouseRecipe.innerHTML = `
    <figure><img src="${itemAssetSrc(baseItem)}" alt="${baseItem?.name ?? "基础生成器"}" /><figcaption>Lv1 ×${entry.target}</figcaption></figure>
    <i aria-hidden="true">›</i>
    <figure><img src="${itemAssetSrc(outputItem)}" alt="${outputItem?.name ?? "高阶生成器"}" /><figcaption>Lv${generatorWarehouseOutputLevel()} ×1</figcaption></figure>`;
  els.generatorWarehouseHint.textContent = `收纳${entry.target}枚${baseItem?.name ?? "Lv1生成器"}，自动凝成1枚${outputItem?.name ?? "高阶生成器"}；各品类进度互不影响。`;
  els.generatorWarehouseStoredIcon.src = itemAssetSrc(baseItem);
  els.generatorWarehouseStoredIcon.alt = baseItem?.name ?? "基础生成器";
  els.generatorWarehouseStoredCount.textContent = `×${entry.progress}`;
  els.generatorWarehouseWithdraw.disabled = entry.progress <= 0;
  els.generatorWarehouseWithdraw.setAttribute("aria-label", entry.progress > 0
    ? `取回1枚${baseItem?.name ?? "基础生成器"}`
    : "当前没有可取回的基础生成器");
  els.generatorWarehouseDepositIcon.src = itemAssetSrc(baseItem);
  els.generatorWarehouseDepositIcon.alt = baseItem?.name ?? "基础生成器";
  els.generatorWarehouseDeposit.disabled = !unlocked || !canDeposit;
  els.generatorWarehouseDeposit.setAttribute("aria-label", canDeposit
    ? `收纳棋盘上选中的${selectedItem.name}`
    : `先在棋盘选择${baseItem?.name ?? "对应的Lv1生成器"}`);
  els.generatorWarehouseClaim.hidden = entry.readyCount <= 0;
  els.generatorWarehousePanel.classList.toggle("has-output", entry.readyCount > 0);
  if (entry.readyCount > 0) {
    const firstReadyItemId = state.generatorWarehouse.readyItems.find(
      (itemId) => generatorCategoryForItem(itemId) === category.id,
    );
    const firstReadyItem = byId.get(firstReadyItemId);
    els.generatorWarehouseOutputIcon.src = itemAssetSrc(firstReadyItem);
    els.generatorWarehouseOutputIcon.alt = firstReadyItem?.name ?? "高阶生成器";
    els.generatorWarehouseOutputCount.textContent = `×${entry.readyCount}`;
    els.generatorWarehouseClaim.setAttribute("aria-label", `领取${firstReadyItem?.name ?? "高阶生成器"}`);
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
    slot.className = `bag-slot reward-item-slot ${item.type === "bonus_coin" ? "coin-reward-slot" : ""} ${item.type === "bonus_ruby" ? "ruby-reward-slot" : ""} ${item.type === "bonus_stamina" ? "stamina-reward-slot" : ""} ${item.type === "splitter_tool" ? "splitter-tool-slot" : ""} ${item.type === "upgrade_tool" ? "upgrade-tool-slot" : ""} ${isGeneratorPiece(item) ? "generator-piece" : ""} ${item.type === "generator_material" ? "generator-material-piece" : ""}`;
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

  const occupiedSlotCount = rewardEntries.length + giftEntries.length;
  for (let index = occupiedSlotCount; index < 7; index += 1) {
    const slot = document.createElement("span");
    slot.className = "bag-slot bag-slot-empty";
    slot.setAttribute("aria-hidden", "true");
    grid.append(slot);
  }
  els.bagList.append(grid);
}

function refreshRewardBagAfterPlacement() {
  if (totalRewardBagCount() === 0 && els.bagModal?.open) {
    els.bagModal.close();
    return;
  }
  renderBag();
}

function storeBoardItemToStorage(boardIndex) {
  const itemId = state.board[boardIndex];
  if (!itemId) {
    toast("先选中一件食物。");
    return;
  }
  const boardItem = byId.get(itemId);
  const giftState = state.giftBoxStates[boardIndex];
  const giftPack = giftState ? GIFT_PACKS[giftState.packId] : null;
  if (isGeneratorPiece(boardItem)) {
    if (Number(boardItem.level) === generatorWarehouseAcceptedLevel()) {
      depositGeneratorAtBoardIndex(boardIndex, { openWarehouse: true });
    } else {
      activeStorageTab = "generator";
      state.generatorWarehouse.selectedCategoryId = boardItem.generatorType;
      toast(`生成器仓库只收纳 Lv${generatorWarehouseAcceptedLevel()} 生成器；高阶生成器请留在棋盘。`);
      renderStorage();
      showStorageModal();
    }
    return;
  }
  const bagIndex = firstEmptyBagIndex();
  if (["bonus_bubble", "bonus_coin", "bonus_ruby", "bonus_stamina", "splitter_tool", "upgrade_tool"].includes(boardItem?.type)) {
    toast(boardItem?.type === "splitter_tool"
      ? "拆解剪需要留在棋盘上使用。"
      : boardItem?.type === "upgrade_tool"
        ? "百味金笺需要留在棋盘上使用。"
        : "气泡、铜币、红宝石和体力棋子需要留在棋盘上继续合成。");
    return;
  }
  if (boardItem?.type === "gift_box" && !giftPack?.shopOffer) {
    toast("礼盒包要直接点击打开，不能收进普通行囊格。");
    return;
  }
  if (bagIndex === -1) {
    toast("柜中暂存已满。");
    return;
  }
  state.bag[bagIndex] = itemId;
  state.board[boardIndex] = null;
  if (giftPack?.shopOffer && giftState) {
    state.storedGiftBoxStates ??= {};
    state.storedGiftBoxStates[bagIndex] = giftState;
    delete state.giftBoxStates[boardIndex];
  }
  state.selectedIndex = null;
  const item = byId.get(itemId);
  keeper(giftPack?.shopOffer
    ? `${item.name}已收进柜中暂存，剩余产出已保留。`
    : `${item.name}已收进柜中暂存。`);
  render();
  renderBag();
  if (els.storageModal?.open) renderStorage();
  saveState();
  window.dispatchEvent(new CustomEvent("silkroad:storage-deposit", {
    detail: { boardIndex, itemId },
  }));
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
  const storedGiftState = state.storedGiftBoxStates?.[index];
  state.board[boardIndex] = itemId;
  state.bag[index] = null;
  if (storedGiftState) {
    state.giftBoxStates[boardIndex] = storedGiftState;
    delete state.storedGiftBoxStates[index];
  }
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
  if (item.type === "splitter_tool") {
    const existingIndex = state.board.findIndex((boardItemId) => boardItemId === itemId);
    if (existingIndex >= 0) {
      rewardEntry.quantity -= 1;
      state.rewardItems = state.rewardItems.filter((entry) => entry.quantity > 0);
      state.splitterToolCharges[existingIndex] = splitterToolChargesAt(existingIndex)
        + Math.max(1, Math.floor(Number(item.chargesPerCopy) || 1));
      state.selectedIndex = existingIndex;
      state.pulseIndex = existingIndex;
      keeper(`又添了一把拆解剪，现在可以使用${splitterToolChargesAt(existingIndex)}次。`);
      clearPulseSoon();
      render();
      refreshRewardBagAfterPlacement();
      saveState();
      return;
    }
  }
  const boardIndex = randomUnlockedEmptyIndex();
  if (boardIndex === -1) {
    toast("案板已满，这份奖励仍留在行囊中。");
    return;
  }
  rewardEntry.quantity -= 1;
  state.rewardItems = state.rewardItems.filter((entry) => entry.quantity > 0);
  state.board[boardIndex] = itemId;
  if (item.type === "splitter_tool") {
    state.splitterToolCharges[boardIndex] = Math.max(1, Math.floor(Number(item.chargesPerCopy) || 1));
  }
  state.selectedIndex = boardIndex;
  state.pulseIndex = boardIndex;
  keeper(`${item.name}已从行囊随机落到案板上。`);
  if (item.type === "generator_material") tryBuildGeneratorFromMaterials(itemId);
  clearPulseSoon();
  render();
  refreshRewardBagAfterPlacement();
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
  const opensAtOnce = opensGiftPackAtOnce(pack);
  keeper(`${pack.name}已随机落到案板上。${opensAtOnce ? "点击一次即可打开。" : "点击礼盒包，每次取一份奖励。"}`);
  clearPulseSoon();
  render();
  refreshRewardBagAfterPlacement();
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

function dailyCoinRewardPieceIds(amount) {
  const result = [];
  let remaining = Math.max(0, Math.floor(Number(amount) || 0));
  for (const level of [4, 3, 2, 1]) {
    const value = BONUS_COIN_VALUES[level];
    while (remaining >= value) {
      result.push(bonusCoinId(level));
      remaining -= value;
    }
  }
  return result;
}

function staminaRewardPieceIds(amount) {
  const result = [];
  let remaining = Math.max(0, Math.floor(Number(amount) || 0));
  for (const level of [4, 3, 2, 1]) {
    const value = BONUS_STAMINA_VALUES[level];
    while (remaining >= value) {
      result.push(bonusStaminaId(level));
      remaining -= value;
    }
  }
  return result;
}

function dailyPouchRewardOutputs(reward) {
  return shuffle([
    ...dailyCoinRewardPieceIds(reward?.coins),
    ...staminaRewardPieceIds(reward?.stamina),
  ]);
}

function giftRewardOutputCount(pack) {
  return pack.rewards.reduce((sum, reward) => {
    if (reward.type === "coins") return sum + coinRewardPieceIds(reward.amount).length;
    if (reward.type === "rubies") return sum + (reward.amount ?? 1);
    if (reward.type === "stamina") return sum;
    return sum + (reward.quantity ?? 1);
  }, 0);
}

function opensGiftPackAtOnce(pack) {
  return Boolean(pack?.orderProgress || pack?.chapterCompletion || pack?.dailyReward);
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

function rollDailyPouchReward(pack) {
  const pool = pack?.rewardPool?.length ? pack.rewardPool : DAILY_POUCH_REWARD_POOL;
  const totalWeight = pool.reduce((sum, reward) => sum + Math.max(0, Number(reward.weight) || 0), 0);
  let ticket = Math.random() * totalWeight;
  for (const reward of pool) {
    ticket -= Math.max(0, Number(reward.weight) || 0);
    if (ticket <= 0) return reward;
  }
  return pool[pool.length - 1];
}

function dailyPouchRewardById(pack, rewardId) {
  return pack?.rewardPool?.find((reward) => reward.id === rewardId) ?? null;
}

function dailyPouchStateIndex(giftState) {
  const entry = Object.entries(state.giftBoxStates)
    .find(([index, candidate]) => candidate === giftState && state.board[Number(index)] === DAILY_POUCH_ITEM_ID);
  return entry ? Number(entry[0]) : -1;
}

function dailyPouchDelay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

function finishDailyPouchLanding(targetIndex) {
  activeDailyPouchOutputIndices.delete(targetIndex);
  const targetCell = els.board.querySelector(`.cell[data-index="${targetIndex}"]`);
  if (!targetCell) return;
  targetCell.classList.remove("daily-pouch-receiving");
  targetCell.classList.add("daily-pouch-land");
  setTimeout(() => targetCell.classList.remove("daily-pouch-land"), 360);
}

async function animateDailyPouchOutput(sourceIndex, targetIndex, itemId) {
  const source = els.board.querySelector(`.cell[data-index="${sourceIndex}"] .daily-pouch-gift`);
  const target = els.board.querySelector(`.cell[data-index="${targetIndex}"]`);
  const item = byId.get(itemId);
  if (!source || !target || !item || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    finishDailyPouchLanding(targetIndex);
    return;
  }
  const sourceRect = source.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  const fromX = sourceRect.left + sourceRect.width / 2;
  const fromY = sourceRect.top + sourceRect.height / 2;
  const toX = targetRect.left + targetRect.width / 2;
  const toY = targetRect.top + targetRect.height / 2;
  const midX = fromX + (toX - fromX) * 0.54;
  const midY = Math.min(fromY, toY) - Math.min(54, 22 + Math.abs(toX - fromX) * 0.12);
  const isStamina = item.type === "bonus_stamina";
  const flight = document.createElement(isStamina ? "div" : "img");
  try {
    flight.className = `daily-pouch-output-flight ${isStamina ? `stamina-output bonus-stamina-level-${item.level}` : "coin-output"}`;
    if (isStamina) {
      flight.setAttribute("aria-hidden", "true");
      appendBonusStaminaArt(flight, item);
    } else {
      flight.src = itemAssetSrc(item);
      flight.alt = "";
    }
    document.body.append(flight);
    const motion = flight.animate([
      { left: `${fromX}px`, top: `${fromY}px`, opacity: 1, transform: "translate(-50%, -50%) scale(0.48) rotate(-10deg)" },
      { left: `${fromX}px`, top: `${fromY - 12}px`, opacity: 1, transform: "translate(-50%, -50%) scale(1.04) rotate(8deg)", offset: 0.18 },
      { left: `${midX}px`, top: `${midY}px`, opacity: 1, transform: "translate(-50%, -50%) scale(0.98) rotate(176deg)", offset: 0.58 },
      { left: `${toX}px`, top: `${toY - 3}px`, opacity: 1, transform: "translate(-50%, -50%) scale(0.88) rotate(344deg)", offset: 0.9 },
      { left: `${toX}px`, top: `${toY}px`, opacity: 1, transform: "translate(-50%, -50%) scale(0.88) rotate(360deg)" },
    ], {
      duration: 520,
      easing: "cubic-bezier(.2,.72,.28,1)",
      fill: "forwards",
    });
    await motion.finished;
  } catch { /* the landed board item is already safely saved */ } finally {
    finishDailyPouchLanding(targetIndex);
    flight.remove();
  }
}

async function openDailyPouchGiftBox(index, pack) {
  const giftState = state.giftBoxStates[index];
  if (!giftState || giftState.packId !== pack.id) return;
  if (activeDailyPouchStates.has(giftState)) {
    toast("宝袋正在一份份投放奖励。");
    return;
  }
  if (!Array.isArray(giftState.pendingOutputs)) {
    const reward = rollDailyPouchReward(pack);
    giftState.dailyRewardId = reward.id;
    giftState.pendingOutputs = dailyPouchRewardOutputs(reward);
    giftState.nextRewardIndex = 0;
    keeper(`${pack.name}装着${reward.name}，正准备一份份落入棋盘。`);
    saveState();
  }
  if (!giftState.pendingOutputs.length) {
    clearGiftBox(index);
    render();
    saveState();
    return;
  }

  activeDailyPouchStates.add(giftState);
  state.selectedIndex = index;
  render();
  let blockedByBoard = false;
  let pausedByPage = false;
  let emitted = 0;
  try {
    while (giftState.pendingOutputs.length) {
      if (state.currentPage !== "board") {
        pausedByPage = true;
        break;
      }
      const sourceIndex = dailyPouchStateIndex(giftState);
      if (sourceIndex < 0) break;
      const targetIndex = nearestBubbleSpawnIndex(sourceIndex);
      if (targetIndex < 0) {
        blockedByBoard = true;
        break;
      }
      const itemId = giftState.pendingOutputs.shift();
      state.board[targetIndex] = itemId;
      giftState.nextRewardIndex += 1;
      state.selectedIndex = sourceIndex;
      activeDailyPouchOutputIndices.add(targetIndex);
      saveState();
      render();
      await animateDailyPouchOutput(sourceIndex, targetIndex, itemId);
      emitted += 1;
      if (giftState.pendingOutputs.length) await dailyPouchDelay(130);
    }
  } finally {
    activeDailyPouchStates.delete(giftState);
  }

  const currentIndex = dailyPouchStateIndex(giftState);
  if (!giftState.pendingOutputs.length && currentIndex >= 0) {
    const reward = dailyPouchRewardById(pack, giftState.dailyRewardId);
    clearGiftBox(currentIndex);
    keeper(`${pack.name}已经吐完${reward?.name ?? "今日奖励"}，棋子都落进棋盘了。`);
    toast("宝袋奖励已全部落下。");
  } else if (blockedByBoard) {
    keeper(`${pack.name}里还有${giftState.pendingOutputs.length}份奖励，腾出格子后再点它继续。`);
    toast(`棋盘已满，宝袋还留着${giftState.pendingOutputs.length}份奖励。`);
  } else if (pausedByPage && emitted > 0) {
    keeper(`${pack.name}暂停投放，回到棋盘后再点它继续。`);
  }
  render();
  saveState();
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
  if (pack.dailyReward) {
    openDailyPouchGiftBox(index, pack);
    return;
  }
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
  if (opensGiftPackAtOnce(pack)) {
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
  } else {
    state.selectedIndex = index;
    state.pulseIndex = index;
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
  const detailTutorialActive = state.tutorialStep === 4;
  const closeTutorialActive = state.tutorialStep === 5
    && state.completedOrderIds.includes("order_001_guard_lubing")
    && !state.renovationChoices?.[FIRST_TUTORIAL_REPAIR_ID];
  activeCodexItemId = selected?.id ?? null;
  els.codexKnownCount.textContent = String(codexKnownFoodCount(lines));
  renderCodexSelected(selected);
  els.codexList.replaceChildren();
  els.codexModal.dataset.guide = detailTutorialActive
    ? "food-detail"
    : closeTutorialActive ? "close" : "";
  const hint = els.codexModal.querySelector(".codex-index-hint");
  if (hint) hint.textContent = detailTutorialActive
    ? "点一下闪动的小图，直接查看这道食物的详情与札记"
    : closeTutorialActive
      ? "详情已经看过了，点右上角关闭食鉴，去修缮前厅"
      : "点击已点亮的小图，可直接查看食物详情与札记";
  let tutorialTargetAssigned = false;

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
      if (unlocked && detailTutorialActive && !tutorialTargetAssigned) {
        cell.classList.add("tutorial-action");
        tutorialTargetAssigned = true;
      }

      const image = document.createElement("img");
      image.src = unlocked ? itemAssetSrc(item) : "./assets/ui/ui_food_box_lid_locked_v2.png";
      image.alt = "";
      cell.append(image);
      if (unlocked) cell.addEventListener("click", () => selectCodexItem(item.id, { openDetail: true }));
      row.append(cell);
    });
    els.codexList.append(row);
  });
}

function selectCodexItem(itemId, { openDetail = false } = {}) {
  const item = byId.get(itemId);
  if (!isFoodItemUnlocked(item)) return;
  activeCodexItemId = item.id;
  if (state.tutorialStep === 4) {
    state.tutorialStep = 5;
    saveState();
    renderTutorial();
  }
  renderCodex();
  if (openDetail) openCodexItemDetail(item.id);
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

async function resetGame() {
  const accepted = await showGameConfirm({
    eyebrow: "重置存档",
    title: "重新开始原型？",
    message: "当前试玩进度会被清除，并回到新档状态。此操作无法撤销。",
    confirmLabel: "确认重置",
    tone: "danger",
  });
  if (!accepted) return;
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
  state.coins = Math.max(state.coins, 2600);
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
  keeper("调试：Lv1 修缮已完成，可验收自动焕新。");
  toast("Lv1 已准备进入下一阶段。");
  if (els.bagModal.open) els.bagModal.close();
  saveState();
  switchPage("inn");
}

function satisfyMilestoneConditions(milestone) {
  const conditions = milestone.conditions ?? {};
  if (conditions.completedOrders) state.completedOrders = Math.max(state.completedOrders, conditions.completedOrders);
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

async function debugClearBoard() {
  const accepted = await showGameConfirm({
    eyebrow: "调试操作",
    title: "清空整张案板？",
    message: "案板上的棋子会全部移除，奖励行囊不会受到影响。",
    confirmLabel: "确认清空",
    tone: "danger",
  });
  if (!accepted) return;
  Object.keys(state.bubbleStates).forEach((bubbleId) => byId.delete(bubbleId));
  state.board = Array(BOARD_SIZE).fill(null);
  state.giftBoxStates = {};
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

function showGameConfirm({ eyebrow = "请确认", title = "确定继续吗？", message = "", confirmLabel = "确认", tone = "danger", upgradePreview = null } = {}) {
  if (!els.confirmModal) return Promise.resolve(false);
  if (pendingConfirmResolve) settleGameConfirm(false);
  els.confirmEyebrow.textContent = eyebrow;
  els.confirmTitle.textContent = title;
  els.confirmMessage.textContent = message;
  els.confirmMessage.hidden = !message;
  els.confirmUpgradePreview.hidden = !upgradePreview;
  if (upgradePreview) {
    els.confirmUpgradeFromImg.src = itemAssetSrc(upgradePreview.from);
    els.confirmUpgradeFromName.textContent = upgradePreview.from.name;
    els.confirmUpgradeFromLevel.textContent = `${upgradePreview.from.level}阶`;
    els.confirmUpgradeToImg.src = itemAssetSrc(upgradePreview.to);
    els.confirmUpgradeToName.textContent = upgradePreview.to.name;
    els.confirmUpgradeToLevel.textContent = `${upgradePreview.to.level}阶`;
  }
  els.confirmAccept.textContent = confirmLabel;
  els.confirmModal.querySelector(".confirm-detail")?.classList.toggle("primary", tone === "primary");
  return new Promise((resolve) => {
    pendingConfirmResolve = resolve;
    els.confirmModal.showModal();
    requestAnimationFrame(() => els.confirmCancel?.focus());
  });
}

function settleGameConfirm(accepted) {
  const resolve = pendingConfirmResolve;
  pendingConfirmResolve = null;
  if (els.confirmModal?.open) els.confirmModal.close();
  resolve?.(Boolean(accepted));
}

function keeper(line) {
  els.keeperLine.textContent = line;
}

function toast(message, duration = 1800) {
  els.toast.textContent = message;
  els.toast.hidden = false;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    els.toast.hidden = true;
  }, duration);
}

function showCoinBurst(amount) {
  playSfx("coin");
  const burst = document.createElement("div");
  burst.className = "coin-burst";
  burst.innerHTML = `<img src="./assets/ui/ui_coin_copper.png" alt="" />+${amount}`;
  document.querySelector("#app").append(burst);
  setTimeout(() => burst.remove(), 900);
}

boot().catch(showStartupFailure);
