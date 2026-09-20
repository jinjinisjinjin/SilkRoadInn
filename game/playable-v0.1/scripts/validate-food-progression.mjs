import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { createContext, runInContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");
const source = readFileSync(resolve(root, "app.js"), "utf8");
const data = (name) => JSON.parse(readFileSync(resolve(root, `data/${name}.json`), "utf8"));
const progression = data("progression");
const generators = data("generators");
const orders = data("orders");
const items = data("items").items;
const byId = new Map(items.map((item) => [item.id, item]));
const state = {
  progressionConfig: progression, generatorConfig: generators, ordersConfig: orders,
  economyConfig: data("economy"), unlockedFoodLevels: {}, unlockedCodex: new Set(),
  board: [], bag: [], completedOrderIds: [], unlockedGeneratorCategories: ["mill"],
  renovationChoices: {}, giftPacks: [], giftBoxStates: {}, innLevel: 1,
  productionMultiplier: 4, visibleOrders: [],
};
let owned = new Map([["mill", 1]]);
const sandbox = createContext({
  state, byId, ORDER_PROGRESS_GIFT_ITEM_ID: "gift", PRODUCTION_MULTIPLIERS: [1, 2, 4],
  REPAIR_PART_COUNT: 9, REPAIR_PART_COST_STEPS: [0, 10, 20, 30, 40, 50, 60, 70, 80],
  highestOwnedGeneratorLevel: (id) => owned.get(id) ?? 0,
  ownsGeneratorCategory: (id) => owned.has(id),
  isRepairCompleted: (id) => Boolean(state.renovationChoices[id]),
  isBoardCellLocked: (index) => index === 0,
  foodLineMaxLevels: new Map(generators.categories.map((category) => [category.foodLineId, 8])),
  codexById: new Map(), toast: () => {},
  getOrder: (id) => orders.orders.find((order) => order.id === id),
});
function loadFunction(name) {
  const start = source.indexOf(`function ${name}(`);
  assert.ok(start >= 0, `Missing function ${name}`);
  const end = source.indexOf("\n}", start) + 2;
  runInContext(source.slice(start, end), sandbox);
}
for (const name of ["normalizeProductionMultiplier", "availableProductionMultipliers", "effectiveProductionMultiplier",
  "productionOutputLevel", "manualGeneratorStaminaCost", "maximumFoodLevelForLine", "rememberUnlockedFoodLevel",
  "rememberUnlockedFoodItem", "syncUnlockedFoodLevels", "orderDemandLinesUnlocked", "grantGiftPack",
  "backfillGeneratorProgressionGifts", "repairPartCosts", "pickOrder"]) loadFunction(name);
for (const [start, end] of [["const GIFT_PACKS =", "const LOCKED_CELL_ITEM_ROWS"],
  ["const GENERATOR_CATEGORY_UNLOCKS =", "const GENERATOR_ORDER_QA_VISIBLE_BY_STAGE"]]) {
  runInContext(source.slice(source.indexOf(start), source.indexOf(end)), sandbox);
}
const packs = runInContext("GIFT_PACKS", sandbox);
const unlocks = runInContext("GENERATOR_CATEGORY_UNLOCKS", sandbox);

// A fresh player cannot skip the first merge by selecting a saved ×4 value.
assert.equal(sandbox.effectiveProductionMultiplier(), 1);
state.unlockedFoodLevels.hubing = 2;
assert.equal(sandbox.effectiveProductionMultiplier(), 2);
state.innLevel = 3;
assert.equal(sandbox.effectiveProductionMultiplier(), 4);
assert.equal(sandbox.productionOutputLevel(), 3);
assert.equal(sandbox.manualGeneratorStaminaCost({ generator: { staminaCost: 1 } }), 4);

// A high generator level and locked board previews must not count as discovered food.
owned.set("mill", 6);
state.board = ["hubing_08_gulouzi", "hubing_02_lubing"];
state.unlockedFoodLevels = {};
sandbox.syncUnlockedFoodLevels();
assert.equal(state.unlockedFoodLevels.hubing, 2);
const demand = { demand: [{ itemId: "hubing_03_humabing", quantity: 1 }] };
assert.equal(sandbox.orderDemandLinesUnlocked(demand), false);
sandbox.rememberUnlockedFoodItem("hubing_03_humabing");
assert.equal(sandbox.orderDemandLinesUnlocked(demand), true);
owned.delete("mill");
assert.equal(sandbox.orderDemandLinesUnlocked(demand), false);

// Walk all repair gates: a required dish must never depend on a later line unlock.
const openLines = new Set(["mill"]);
const supplied = new Map();
for (const milestone of progression.milestones) {
  for (const orderId of milestone.conditions?.completedOrderIds ?? []) {
    const order = orders.orders.find((entry) => entry.id === orderId);
    for (const categoryId of order.requiredGeneratorCategories ?? []) {
      assert.ok(openLines.has(categoryId), `${milestone.id} requires unopened ${categoryId}`);
    }
    for (const demand of order.demand) {
      const category = generators.categories.find((entry) => entry.foodLineId === byId.get(demand.itemId)?.line);
      assert.ok(openLines.has(category.id), `${milestone.id} needs unopened ${category.id}`);
    }
  }
  for (const reward of milestone.rewards?.giftPacks ?? []) {
    const pack = packs[reward.id];
    assert.ok(pack, `Unknown gift ${reward.id}`);
    if (pack.progressionCategory) supplied.set(pack.progressionCategory,
      (supplied.get(pack.progressionCategory) ?? 0) + pack.rewards.reduce((sum, item) => sum + item.quantity, 0));
  }
  for (const entry of unlocks.filter((entry) => entry.completedRepairId === milestone.id)) {
    openLines.add(entry.categoryId);
    assert.equal(supplied.get(entry.categoryId), entry.categoryId === "dairy" ? 1 : 8);
    assert.equal(milestone.innLevel, { dairy: 2, spice: 3, fruit: 4, drink: 5, meat: 6 }[entry.categoryId]);
  }
}
assert.equal(progression.milestones.reduce((sum, milestone) =>
  sum + sandbox.repairPartCosts(milestone).reduce((total, cost) => total + cost, 0), 0), 39600);
const firstRepair = progression.milestones.find((milestone) => milestone.id === "tutorial_complete");
assert.deepEqual(sandbox.repairPartCosts(firstRepair), [10, 120, 130, 140, 150, 160, 170, 180, 200]);
assert.equal(orders.orders.find((order) => order.id === "order_001_guard_lubing")?.reward?.coins, 10);

// Half-open legacy packs retain the same output positions and total rewards.
for (const [id, coins] of [["gift_milk_room_parts_01", 30], ["gift_livestock_pen_parts_01", 42]]) {
  assert.equal(packs[id].rewards.length, 10);
  assert.equal(packs[id].rewards.filter((entry) => entry.type === "item").length, 8);
  assert.equal(packs[id].rewards.reduce((sum, entry) => sum + (entry.amount ?? 0), 0), coins);
  assert.equal(packs[id].rewards[2].type, "coins");
  assert.equal(packs[id].rewards[6].type, "coins");
}
state.renovationChoices = Object.fromEntries(progression.milestones.map((entry) => [entry.id, "completed"]));
owned = new Map([["dairy", 1]]);
sandbox.backfillGeneratorProgressionGifts();
assert.equal(state.giftPacks.length, 8);
sandbox.backfillGeneratorProgressionGifts();
assert.ok(state.giftPacks.every((entry) => entry.quantity === 1), "Must not duplicate pending gifts");
state.giftPacks = [];
state.giftBoxStates = { 1: { packId: "gift_spice_parts_a_01", nextRewardIndex: 2 } };
sandbox.backfillGeneratorProgressionGifts();
assert.equal(state.giftPacks.length, 7, "Half-open gift must not be granted again");

// With one difficult order waiting, random replacements must remain easy to finish.
const hard = orders.orders.find((order) => order.demand.some((d) => byId.get(d.itemId)?.level >= 5));
state.visibleOrders = [hard.id];
sandbox.isOrderEligible = () => true;
sandbox.orderMatchesBand = () => true;
for (let index = 0; index < 100; index++) {
  const next = sandbox.pickOrder();
  assert.ok(next.demand.every((d) => byId.get(d.itemId)?.level < 5));
}
console.log("Food progression passed: all 22 repair gates, six lines, deterministic gifts, legacy gifts, discovery gates, multipliers, difficult-order limit and 39,600 repair cost.");
