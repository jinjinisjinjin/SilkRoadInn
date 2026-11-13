import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createContext, runInContext } from "node:vm";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const read = (name) => JSON.parse(readFileSync(resolve(root, `data/${name}.json`), "utf8"));
const app = readFileSync(resolve(root, "app.js"), "utf8");
const dailyPouchPackId = JSON.parse(app.match(/const DAILY_POUCH_PACK_ID = ("[^"]+");/)?.[1] ?? "null");
if (!dailyPouchPackId) throw new Error("Missing daily pouch pack identifier");
export const configs = {
  targets: read("pacing-targets"), economy: read("economy"),
  progression: read("progression"), generators: read("generators"),
  orders: read("orders"), items: read("items").items, stamina: read("stamina"),
};

function sourceFunction(name) {
  const start = app.indexOf(`function ${name}(`);
  const end = app.indexOf("\n}\n", start);
  if (start < 0 || end < start) throw new Error(`Missing runtime function: ${name}`);
  return app.slice(start, end + 2);
}

function frozenConstant(name) {
  const start = app.indexOf(`const ${name} = Object.freeze(`);
  if (start < 0) throw new Error(`Missing runtime constant: ${name}`);
  const source = app.slice(start, app.indexOf(";", start) + 1);
  return runInContext(`${source}\n${name}`, createContext({ DAILY_POUCH_PACK_ID: dailyPouchPackId }));
}

const pouch = frozenConstant("DAILY_POUCH_REWARD_POOL");
const weekly = frozenConstant("WEEKLY_CHECKIN_REWARDS");
const staminaValues = frozenConstant("BONUS_STAMINA_VALUES");
const recoveryMinutes = Number(app.match(/const STAMINA_RECOVERY_MINUTES = (\d+);/)?.[1]);
if (!Number.isFinite(recoveryMinutes) || recoveryMinutes <= 0) throw new Error("Invalid recovery rule");

export function expectedPouchResource(resource) {
  const total = pouch.reduce((sum, reward) => sum + reward.weight, 0);
  return pouch.reduce((sum, reward) => sum + reward.weight * (reward[resource] ?? 0), 0) / total;
}

// Every visit spends the available balance. The initial full bar is counted
// once; later visits earn only elapsed recovery, subject to the actual cap.
export function naturalStaminaBudget(days, visitsByDay) {
  const cap = configs.stamina.initial.max;
  let balance = configs.stamina.initial.startValue;
  let lastMinute = 0;
  let total = 0;
  for (let day = 0; day < days; day++) {
    const visits = visitsByDay[day % visitsByDay.length];
    for (const hour of visits) {
      const minute = day * 1440 + hour * 60;
      balance = Math.min(cap, balance + Math.floor((minute - lastMinute) / recoveryMinutes));
      total += balance;
      balance = 0;
      lastMinute = minute;
    }
  }
  return total;
}

export function weeklyStaminaBudget(days) {
  let direct = 0;
  let extraPouches = 0;
  for (let day = 0; day < days; day++) {
    for (const reward of weekly[day % weekly.length].items) {
      if (reward.itemId?.startsWith("bonus_stamina_")) {
        direct += staminaValues[Number(reward.itemId.slice(-2))] * reward.quantity;
      }
      if (reward.packId === dailyPouchPackId) extraPouches += reward.quantity;
    }
  }
  return { direct, extraPouches, extraPouchExpectation: extraPouches * expectedPouchResource("stamina") };
}

export function runtimeManualOutput() {
  const context = createContext({
    state: { innLevel: 3, unlockedFoodLevels: { hubing: 3 }, productionMultiplier: 1 },
    PRODUCTION_MULTIPLIERS: [1, 2, 4],
  });
  for (const name of ["normalizeProductionMultiplier", "availableProductionMultipliers",
    "effectiveProductionMultiplier", "productionOutputLevel", "manualGeneratorStaminaCost"]) {
    runInContext(sourceFunction(name), context);
  }
  return [1, 2, 4].map((multiplier) => {
    context.state.productionMultiplier = multiplier;
    return {
      multiplier,
      stamina: context.manualGeneratorStaminaCost({ generator: { staminaCost: configs.generators.economy.staminaCost } }),
      outputLevel: context.productionOutputLevel(),
    };
  });
}

export function buildPacingBudget() {
  const { targets, progression, economy } = configs;
  const days = targets.targetCalendarDays;
  const schedules = {
    twoVisits: [[8, 20]], alternatingTwoThree: [[8, 20], [8, 14, 20]], threeVisits: [[8, 14, 20]],
  };
  const weeklyResources = weeklyStaminaBudget(days);
  const repairRows = targets.chapters.flatMap((chapter) => chapter.repairs.map((target) => {
    const repair = progression.milestones.find((entry) => entry.id === target.repairId);
    if (!repair) throw new Error(`Unknown target repair: ${target.repairId}`);
    return { ...target, chapter: chapter.chapter, name: repair.name,
      currentCoins: repair.repairParts.reduce((sum, part) => sum + part.cost, 0) };
  }));
  const chapters = targets.chapters.map((target) => ({
    chapter: target.chapter,
    targetDays: target.targetDurationDays,
    targetEndDayOffset: target.targetEndDayOffset,
    currentRepairCoins: repairRows.filter((row) => row.chapter === target.chapter).reduce((sum, row) => sum + row.currentCoins, 0),
    orderPackFaceCoins: progression.orderProgressPacks.filter((pack) => pack.chapter === target.chapter).reduce((sum, pack) => sum + pack.coinAmount, 0),
    completionGift: progression.chapterCompletionRewards.find((gift) => gift.chapter === target.chapter)?.giftPack,
  }));
  const totalCoins = repairRows.reduce((sum, row) => sum + row.currentCoins, 0);
  const targetSupply = Object.fromEntries(Object.entries(schedules).map(([name, schedule]) => [name, {
    visitHoursByDay: schedule,
    naturalStamina: naturalStaminaBudget(days, schedule),
    dailyPouchExpectedStamina: days * expectedPouchResource("stamina"),
    weeklyDirectStamina: weeklyResources.direct,
    weeklyExtraPouchExpectedStamina: weeklyResources.extraPouchExpectation,
  }]));
  return {
    classification: "code_budget_not_natural_completion_forecast",
    target: targets,
    measuredCompletionDays: null,
    totalRepairCoins: totalCoins,
    repairRows, chapters, targetSupply,
    acceptedDurationSupply: targets.acceptableCalendarDays.map((count) => ({
      days: count,
      twoVisits: naturalStaminaBudget(count, schedules.twoVisits),
      threeVisits: naturalStaminaBudget(count, schedules.threeVisits),
    })),
    runtimeManualOutput: runtimeManualOutput(),
    foodEnergyAndValue: Object.entries(economy.orderPricing.levelValuesByLine).map(([line, values]) => ({
      line, source: line === "dairy" ? "timed_batch" : "manual_stamina",
      levels: values.map((coins, index) => ({ level: index + 1, baseFoodUnits: 2 ** index, coins, coinsPerBaseUnit: coins / 2 ** index })),
    })),
    excludedFromGuaranteedStamina: [
      "Earned-gem exchanges require a separate gem ledger, not an assumed daily purchase.",
      "Task and chapter completion rewards depend on achieved progress.",
      "Food gifts and dairy are separate supplies; dairy needs batches, time and board space.",
      "stamina.json dailyBonuses are not wired into normal play; debug grants are excluded.",
    ],
    limitations: [
      "All visits and claims are assumed to occur; missed visits and unfinished spending reduce usable supply.",
      "Pouch values are expectations, not guaranteed daily rewards; merge bonuses are not included.",
      "No incomeTargets percentage is used to manufacture unobserved income.",
      "Target dates are design goals and never calendar locks. Full-cycle natural verification remains pending.",
    ],
  };
}

export function readCheckpoint(filename) {
  const value = JSON.parse(readFileSync(filename, "utf8"));
  const entry = value.origins?.flatMap((origin) => origin.localStorage)
    .find((item) => item.name === "silkroad_tavern_proto_v02");
  if (!entry) throw new Error("Expected an isolated Playwright storage checkpoint");
  return JSON.parse(entry.value);
}

export function analyzeCheckpoint(checkpoint, { coinTarget = 1440, trials = 100 } = {}) {
  if (!Number.isSafeInteger(trials) || trials < 1 || trials > 1000) throw new Error("Trials must be 1–1000");
  if (!Number.isFinite(coinTarget) || coinTarget <= 0) throw new Error("Coin target must be positive");
  const { economy, generators, orders, progression, items } = configs;
  let seed = 1;
  const randomMath = Object.create(Math);
  randomMath.random = () => {
    seed = (Math.imul(1664525, seed) + 1013904223) >>> 0;
    return seed / 4294967296;
  };
  const context = createContext({
    state: {}, byId: new Map(), Math: randomMath,
    isBoardCellLocked: () => false, // Checkpoint board contains only occupied playable cells.
    CARAVAN_RENOWN_QA_MODE: false, LV4_MARKET_ORDERS_QA_MODE: false, GENERATOR_ORDER_QA_MODE: false,
    milestoneInnLevel: (milestone) => Number(milestone.innLevel) || 1,
  });
  for (const name of ["generatorItemId", "buildConfiguredGeneratorItems", "migrateLegacyGeneratorId", "isGeneratorPiece",
    "highestOwnedGeneratorLevel", "orderUnlockConditionMet", "orderDemandLinesUnlocked", "orderProgressConditionsMet",
    "dairyIntroductionAllows", "isOrderEligible", "orderItemCoinValue", "calculatedOrderCoinReward", "orderPricingBand",
    "orderMatchesBand", "rollVisibleOrderTarget", "missingVisibleOrderBandId", "nextStoryOrderId", "normalizeOrderArrivalSupport", "observeOrderArrivalOwnership", "createOrderArrivalSupportEvent", "effectiveBoardItemCount", "syncVisibleOrders",
    "getOrder", "currentOrderCoinReward", "recordRecentOrder", "progressedOrderCandidates", "pickOrder"]) runInContext(sourceFunction(name), context);
  context.byId = new Map([...items, ...context.buildConfiguredGeneratorItems(generators)].map((item) => [item.id, item]));
  const originalHighest = context.highestOwnedGeneratorLevel;
  let highestCache = {};
  context.highestOwnedGeneratorLevel = (category) => (highestCache[category] ??= originalHighest(category));
  const reset = () => {
    highestCache = {};
    context.state = { ...structuredClone(checkpoint), generatorConfig: generators, generatorMaterialConfig: {},
      economyConfig: economy, ordersConfig: orders, progressionConfig: progression,
      unlockedCodex: new Set(checkpoint.unlockedCodex), coins: 0 };
  };
  const cost = (order) => {
    let stamina = 0;
    let milkUnits = 0;
    let maxLevel = 0;
    for (const demand of order.demand) {
      const item = context.byId.get(demand.itemId);
      const units = demand.quantity * 2 ** (item.level - 1);
      if (item.line === "dairy") milkUnits += units;
      else stamina += units;
      maxLevel = Math.max(maxLevel, item.level);
    }
    return { stamina, milkUnits, maxLevel, coins: context.currentOrderCoinReward(order) };
  };
  const summarize = (values) => {
    const sorted = [...values].sort((a, b) => a - b);
    return Object.fromEntries([["min", 0], ["p10", .1], ["median", .5], ["p90", .9], ["max", 1]]
      .map(([name, ratio]) => [name, sorted[Math.floor((sorted.length - 1) * ratio)]]));
  };
  const scenarios = [];
  for (const policy of ["resourceEfficiency", "lowStamina", "largeReward"]) {
    const runs = [];
    for (let trial = 1; trial <= trials; trial++) {
      reset(); seed = trial;
      const run = { trial, orders: 0, coins: 0, stamina: 0, milkUnits: 0, highOrders: 0 };
      context.syncVisibleOrders({ allowArrivals: false });
      while (run.coins < coinTarget && run.orders < 5000) {
        const visible = context.state.visibleOrders.map(context.getOrder).filter(Boolean);
        const score = (order) => {
          const value = cost(order);
          if (policy === "largeReward") return -value.coins;
          return (value.stamina + (policy === "resourceEfficiency" ? value.milkUnits : 0)) / value.coins;
        };
        visible.sort((a, b) => score(a) - score(b) || b.reward.coins - a.reward.coins);
        const order = visible[0];
        if (!order) throw new Error(`No eligible orders for trial ${trial}`);
        const value = cost(order);
        run.orders++;
        run.coins += value.coins;
        run.stamina += value.stamina;
        run.milkUnits += value.milkUnits;
        run.highOrders += value.maxLevel >= 5 ? 1 : 0;
        if (!context.state.completedOrderIds.includes(order.id)) context.state.completedOrderIds.push(order.id);
        context.recordRecentOrder(order.id);
        for (const category of generators.categories) {
          if (order.demand.some((demand) => context.byId.get(demand.itemId).line === category.foodLineId)) {
            context.state.generatorLineOrderCounts[category.id] = (context.state.generatorLineOrderCounts[category.id] ?? 0) + 1;
          }
        }
        context.state.completedOrders++;
        context.state.visibleOrders = context.state.visibleOrders.filter((id) => id !== order.id);
        context.syncVisibleOrders();
      }
      if (run.coins < coinTarget) throw new Error("Coin target not reached; refusing to report completion");
      runs.push(run);
    }
    scenarios.push({ policy, trials,
      orders: summarize(runs.map((run) => run.orders)), stamina: summarize(runs.map((run) => run.stamina)),
      milkUnits: summarize(runs.map((run) => run.milkUnits)), highOrders: summarize(runs.map((run) => run.highOrders)), runs });
  }
  return {
    classification: "fixed_checkpoint_resource_sensitivity_not_calendar_forecast", coinTarget,
    unlockedFoodLevels: checkpoint.unlockedFoodLevels, scenarios,
    assumptions: [
      "Fixed owned generators, discovered levels and starting visible guests; no generator upgrade or new discovery.",
      "Zero starting coin and food credit; every delivery is costed from basic food units. The input save is never written.",
      "No reward grants, repair execution, board space or real cooldown simulation. Milk is tracked separately.",
      "Existing main-order injection follows runtime rules; complete mainline timing cannot be derived from this model.",
    ],
  };
}
