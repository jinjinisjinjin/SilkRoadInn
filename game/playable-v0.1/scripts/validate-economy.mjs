import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const root = resolve(scriptDir, "..");

function readJson(relativePath) {
  return JSON.parse(readFileSync(resolve(root, relativePath), "utf8"));
}

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function sameValues(left, right) {
  return JSON.stringify([...left].sort()) === JSON.stringify([...right].sort());
}

const economy = readJson("data/economy.json");
const items = readJson("data/items.json").items;
const generators = readJson("data/generators.json");
const orders = readJson("data/orders.json");
const progression = readJson("data/progression.json");

const itemById = new Map(items.map((item) => [item.id, item]));
const categoryByLine = new Map(
  generators.categories.map((category) => [category.foodLineId, category.id]),
);
const valuesByLine = economy.orderPricing.levelValuesByLine;
const pricingBands = economy.orderPricing.bands;

const incomeTotal = Object.values(economy.incomeTargets)
  .reduce((sum, value) => sum + Number(value), 0);
assert(incomeTotal === 100, `Income targets must total 100, received ${incomeTotal}`);

for (const [line, values] of Object.entries(valuesByLine)) {
  assert(values.length === 8, `${line} must define exactly eight item values`);
  values.forEach((value, index) => {
    assert(Number.isFinite(value) && value > 0, `${line} Lv${index + 1} has an invalid value`);
    if (index > 0) {
      assert(value > values[index - 1], `${line} item values must increase by level`);
    }
  });
}

function itemCoinValue(itemId) {
  const item = itemById.get(itemId);
  assert(item, `Unknown order item: ${itemId}`);
  const values = valuesByLine[item.line];
  assert(values, `Missing economy values for line: ${item.line}`);
  const value = values[item.level - 1];
  assert(Number.isFinite(value), `Missing ${item.line} Lv${item.level} value`);
  return value;
}

function calculatedReward(order) {
  return order.demand.reduce(
    (sum, demand) => sum + itemCoinValue(demand.itemId) * Number(demand.quantity),
    0,
  );
}

function bandForReward(reward) {
  return pricingBands.find((band) => reward >= band.minCoins && reward <= band.maxCoins)
    ?? pricingBands.reduce((closest, band) => {
      const distance = reward < band.minCoins
        ? band.minCoins - reward
        : reward - band.maxCoins;
      return !closest || distance < closest.distance ? { ...band, distance } : closest;
    }, null);
}

for (const order of orders.orders) {
  assert(Array.isArray(order.demand) && order.demand.length > 0, `${order.id} has no demand`);
  order.demand.forEach((demand) => {
    assert(Number.isInteger(demand.quantity) && demand.quantity > 0, `${order.id} has invalid quantity`);
  });

  const expectedReward = calculatedReward(order);
  assert(
    order.reward.coins === expectedReward,
    `${order.id} pays ${order.reward.coins}, expected ${expectedReward}`,
  );
  assert(!("originalCoins" in order.reward), `${order.id} still has originalCoins`);
  assert(!("firstClearBonusCoins" in order.reward), `${order.id} still has a first-clear coin bonus`);
  assert(!("minCompletedOrders" in order), `${order.id} still has an order-count gate`);
  assert(!("minUnlockedGeneratorCategories" in order), `${order.id} still has a chapter-era generator gate`);
  assert(!("requiredCodexIds" in order), `${order.id} still has a codex gate`);

  const expectedCategories = new Set(order.demand.map((demand) => {
    const line = itemById.get(demand.itemId).line;
    const categoryId = categoryByLine.get(line);
    assert(categoryId, `No generator category supplies ${line}`);
    return categoryId;
  }));
  assert(
    sameValues(order.requiredGeneratorCategories ?? [], expectedCategories),
    `${order.id} has generator requirements that do not match its demand`,
  );

  const expectedUnlock = order.generatorMasteryCategory
    ? `generator_mastery_${order.generatorMasteryCategory}`
    : "available_when_producible";
  assert(order.unlock === expectedUnlock, `${order.id} has an unexpected unlock rule`);
  assert(order.priceBand === bandForReward(expectedReward)?.id, `${order.id} has the wrong price band`);
}

for (const milestone of progression.milestones) {
  assert(
    !milestone.conditions?.completedOrderIds,
    `${milestone.id} still requires a specific order`,
  );
  assert(
    !Object.prototype.hasOwnProperty.call(milestone.rewards ?? {}, "coins"),
    `${milestone.id} still refunds repair coins`,
  );
}

const giftCoinTotal = progression.orderProgressPacks
  .reduce((sum, pack) => sum + Number(pack.coinAmount), 0);
const orderRewards = orders.orders.map(calculatedReward).sort((left, right) => left - right);
const countByBand = Object.fromEntries(
  pricingBands.map((band) => [
    band.id,
    orders.orders.filter((order) => order.priceBand === band.id).length,
  ]),
);

console.log(JSON.stringify({
  status: "ok",
  orderCount: orders.orders.length,
  orderReward: {
    min: orderRewards[0],
    median: orderRewards[Math.floor(orderRewards.length / 2)],
    mean: Number(
      (orderRewards.reduce((sum, value) => sum + value, 0) / orderRewards.length).toFixed(2),
    ),
    max: orderRewards.at(-1),
  },
  countByBand,
  repairCount: progression.milestones.length,
  repairCostTotal: progression.milestones
    .reduce((sum, milestone) => sum + Number(milestone.repairCost), 0),
  directRepairCoinRewards: 0,
  orderProgressGiftCoinTotal: giftCoinTotal,
}, null, 2));
