// Historical context is deliberately separate from the fictional inn narrative.
// Each note states what the sources support, what the game reconstructs, and what it invents.
window.SilkRoadHistoricalNotes = Object.freeze([
  Object.freeze({
    id: "well",
    kind: "驿站札记",
    title: "一口水，留住一段路",
    teaser: "干旱路线上，供水关系到聚落与旅人能否停驻。",
    chapter: 2,
    repairId: "lv2_well",
    markerLabel: "井台札记",
    evidence: "长安—天山走廊沿线的城镇、商站和农田依赖水利。遗存显示，不同地方有坎儿井、深井或渠道，并不是一套通用的取水办法。",
    reconstruction: "游戏用“修好井台，旅人得以停脚”来表现供水的重要性；这参考了沿线多处水利遗存，不是对沙州某一口井的考古复原。",
    fiction: "流沙驿的井台、周甲带邻里修井的经过，以及井台的具体样貌，都是游戏虚构。",
    sources: [
      { label: "UNESCO 世界遗产中心｜长安—天山廊道路网", url: "https://whc.unesco.org/en/list/1442" },
    ],
  }),
  Object.freeze({
    id: "cargo",
    kind: "驿站札记",
    title: "货物不必一队走到底",
    teaser: "商路上的货物可能在不同商人之间接续流转。",
    chapter: 4,
    repairId: "lv4_south_shed",
    markerLabel: "货棚札记",
    evidence: "长安—天山走廊是由商贸聚落、驿馆、道路与关隘连成的网络。联合国教科文组织指出，远距离货物很可能经过一连串不同商人之手。",
    reconstruction: "游戏把货棚设计成整理货物、等待转手的地方，是对沿线交易节点作用的参考复原；具体货签和周转流程没有据此得到证实。",
    fiction: "康十一的一车杂货、流沙驿南棚和这里发生的交易，均为游戏虚构。",
    sources: [
      { label: "UNESCO 世界遗产中心｜长安—天山廊道路网", url: "https://whc.unesco.org/en/list/1442" },
    ],
  }),
  Object.freeze({
    id: "sogdian",
    kind: "路上见闻",
    title: "一位胡商，许多段商路",
    teaser: "丝路是路网；商人带去的，也不只是货物。",
    chapter: 1,
    orderId: "order_003_sogdian_humabing",
    evidence: "粟特商人在陆上丝路贸易与文化交流中活跃。丝路并非一条笔直的路，远途货物也可能由不同商人接续运送。",
    reconstruction: "游戏借一张胡麻饼的订单，让玩家遇见路上的商人。这是叙事组合，不能据此推断粟特商人的普遍饮食或固定行程。",
    fiction: "这位“粟特胡商”、他的订单、撒马尔罕炉火的回忆和与流沙驿的交情，都是游戏虚构。",
    sources: [
      { label: "UNESCO｜陆上丝路商人的角色", url: "https://en.unesco.org/silkroad/content/did-you-know-evolving-role-merchants-along-land-routes-silk-roads" },
      { label: "UNESCO 世界遗产中心｜长安—天山廊道路网", url: "https://whc.unesco.org/en/list/1442" },
    ],
  }),
]);
