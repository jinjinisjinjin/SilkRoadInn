import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const economy = readJson("data/economy.json");
const items = readJson("data/items.json").items;
const orders = readJson("data/orders.json").orders;
const progression = readJson("data/progression.json");
const inn = readJson("data/inn.json");
const itemById = new Map(items.map((item) => [item.id, item]));

const repairCost = progression.milestones.reduce((sum, milestone) => sum + milestone.repairCost, 0);
const upgradeCost = inn.levels.reduce((sum, level) => sum + level.upgradeCost, 0);
const furnitureCost = inn.furniture.reduce((sum, item) => sum + item.cost, 0);
const totalSpend = repairCost + upgradeCost + furnitureCost;
const giftCoins = progression.orderProgressPacks.reduce((sum, pack) => sum + pack.coinAmount, 0);
const startingCoins = economy.currency.startingBalance;

function maxItemLevelAt(completedOrders) {
  if (completedOrders < 20) return 3;
  if (completedOrders < 50) return 4;
  if (completedOrders < 90) return 5;
  if (completedOrders < 130) return 6;
  if (completedOrders < 170) return 7;
  return 8;
}

function eligibleOrders(completedOrders, band) {
  const maxLevel = maxItemLevelAt(completedOrders);
  return orders.filter((order) => order.priceBand === band && order.demand.every(
    (demand) => (itemById.get(demand.itemId)?.level ?? 99) <= maxLevel,
  ));
}

const profiles = [
  { name: "休闲", count: 230, cycle: ["quick", "quick", "regular", "regular", "goal"] },
  { name: "均衡", count: 200, cycle: ["quick", "regular", "goal"] },
  { name: "目标导向", count: 180, cycle: ["regular", "goal", "goal"] },
];

function simulate(profile, stopAtCoverage = false) {
  let orderCoins = 0;
  const bandCounts = { quick: 0, regular: 0, goal: 0 };
  const orderTarget = totalSpend * (economy.incomeTargets.ordersPercent / 100);
  const maxOrders = stopAtCoverage ? 600 : profile.count;
  let completedOrders = 0;
  for (let index = 0; index < maxOrders; index += 1) {
    const desiredBand = profile.cycle[index % profile.cycle.length];
    let candidates = eligibleOrders(index, desiredBand);
    let servedBand = desiredBand;
    if (!candidates.length) {
      servedBand = "quick";
      candidates = eligibleOrders(index, servedBand);
    }
    const order = candidates[(index * 17 + bandCounts[servedBand] * 7) % candidates.length];
    orderCoins += order.reward.coins;
    bandCounts[servedBand] += 1;
    completedOrders += 1;
    if (stopAtCoverage && orderCoins >= orderTarget) break;
  }
  const projectedAllSources = Math.round(orderCoins / (economy.incomeTargets.ordersPercent / 100));
  return {
    profile: profile.name,
    completedOrders,
    bandCounts,
    orderCoins,
    averageOrderCoins: Number((orderCoins / completedOrders).toFixed(1)),
    conservativeCoins: startingCoins + orderCoins + giftCoins,
    projectedAllSources,
    progressionCoveragePercent: Math.round((projectedAllSources / totalSpend) * 100),
  };
}

console.log(JSON.stringify({
  costs: { repairCost, upgradeCost, furnitureCost, totalSpend },
  fixedSupport: { startingCoins, giftCoins },
  scenarios: profiles.map((profile) => simulate(profile)),
  estimatedOrdersToFundAll: profiles.map((profile) => simulate(profile, true)),
}, null, 2));
