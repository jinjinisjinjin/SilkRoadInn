import { readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (path) => JSON.parse(readFileSync(resolve(root, path), "utf8"));
const itemsConfig = readJson("data/items.json");
const ordersConfig = readJson("data/orders.json");
const economy = readJson("data/economy.json");
const generators = readJson("data/generators.json");
const expansionSource = "balancedExpansion";
const foodLines = Object.keys(economy.orderPricing.levelValuesByLine);
const foodItems = itemsConfig.items.filter((item) => foodLines.includes(item.line));
const categoryByLine = new Map(generators.categories.map((entry) => [entry.foodLineId, entry.id]));
const itemById = new Map(foodItems.map((item) => [item.id, item]));
const existingOrders = ordersConfig.orders.filter((order) => order.contentSource !== expansionSource);

const npcRoster = [
  ["npc_caravan_leader", "商队首领"],
  ["npc_sogdian_merchant", "粟特胡商"],
  ["npc_shazhou_guard", "沙州驿卒"],
  ["npc_farmer", "城外农户"],
  ["npc_pilgrim_monk", "求法僧人"],
  ["npc_uighur_herder", "回鹘牧民"],
  ["npc_dunhuang_woman", "敦煌女店客"],
  ["npc_changan_maid", "长安侍女"],
  ["npc_temple_donor", "佛寺女施主"],
  ["npc_silkroad_musician", "胡姬乐伎"],
  ["npc_changan_envoy", "长安使者"],
  ["npc_camel_worker", "驼队脚夫"],
  ["npc_persian_attendant", "波斯艺人随从"],
  ["npc_mystery_merchant", "神秘胡商"],
];
const targets = { quick: 16, regular: 65, goal: 26 };
const bandRules = {
  quick: { min: 3, max: 8, ideal: 6, minLevel: 1, maxLevel: 3 },
  regular: { min: 14, max: 25, ideal: 22, minLevel: 2, maxLevel: 5 },
  goal: { min: 55, max: 100, ideal: 82, minLevel: 4, maxLevel: 8 },
};

const itemValue = (item) => economy.orderPricing.levelValuesByLine[item.line][item.level - 1];
const demandSignature = (demand) => demand
  .map(({ itemId, quantity }) => `${itemId}:${quantity}`)
  .sort()
  .join("|");

function enumerateCandidates(bandId) {
  const rule = bandRules[bandId];
  const eligible = foodItems.filter((item) => item.level >= rule.minLevel && item.level <= rule.maxLevel);
  const candidates = [];
  for (let first = 0; first < eligible.length; first += 1) {
    for (let second = first + 1; second < eligible.length; second += 1) {
      for (let third = second + 1; third < eligible.length; third += 1) {
        for (let count = 1; count <= 3; count += 1) {
          const chosen = [eligible[first], eligible[second], eligible[third]].slice(0, count);
          for (let q1 = 1; q1 <= 3; q1 += 1) {
            for (let q2 = 1; q2 <= (count >= 2 ? 2 : 1); q2 += 1) {
              for (let q3 = 1; q3 <= (count >= 3 ? 2 : 1); q3 += 1) {
                const quantities = [q1, q2, q3].slice(0, count);
                if (quantities.reduce((sum, value) => sum + value, 0) > 4) continue;
                const reward = chosen.reduce(
                  (sum, item, index) => sum + itemValue(item) * quantities[index],
                  0,
                );
                if (reward < rule.min || reward > rule.max) continue;
                const demand = chosen.map((item, index) => ({
                  itemId: item.id,
                  quantity: quantities[index],
                }));
                candidates.push({
                  demand,
                  reward,
                  lines: [...new Set(chosen.map((item) => item.line))],
                  maxLevel: Math.max(...chosen.map((item) => item.level)),
                  signature: demandSignature(demand),
                });
              }
            }
          }
        }
      }
    }
  }
  return [...new Map(candidates.map((candidate) => [candidate.signature, candidate])).values()];
}

function generatorLevelForItemLevel(itemLevel) {
  const mapping = economy.orderPricing.availability.maxDemandLevelByGeneratorLevel;
  return Number(Object.entries(mapping).find(([, maxLevel]) => itemLevel <= maxLevel)?.[0] ?? 6);
}

function dialogueFor(npcName, demand) {
  const parts = demand.map(({ itemId, quantity }) => {
    const item = itemById.get(itemId);
    return `${quantity > 1 ? `${quantity}份` : "一份"}${item.name}`;
  });
  const list = parts.length > 1 ? `${parts.slice(0, -1).join("、")}和${parts.at(-1)}` : parts[0];
  return `${npcName}要${list}，备齐后便可交付。`;
}

const usedSignatures = new Set(existingOrders.map((order) => demandSignature(order.demand)));
const selected = [];
const lineUse = Object.fromEntries(foodLines.map((line) => [line, 0]));
const curatedByBand = {
  quick: [],
  regular: [
    {
      npcId: "npc_sogdian_merchant",
      npcName: "粟特胡商",
      demand: [
        { itemId: "hubing_02_lubing", quantity: 1 },
        { itemId: "hubing_03_humabing", quantity: 2 },
      ],
    },
  ],
  goal: [
    {
      demand: [{ itemId: "hubing_04_youhubing", quantity: 3 }],
    },
  ],
};
for (const candidates of Object.values(curatedByBand)) {
  for (const candidate of candidates) {
    const chosen = candidate.demand.map((demand) => itemById.get(demand.itemId));
    candidate.reward = candidate.demand.reduce(
      (sum, demand, index) => sum + itemValue(chosen[index]) * demand.quantity,
      0,
    );
    candidate.lines = [...new Set(chosen.map((item) => item.line))];
    candidate.maxLevel = Math.max(...chosen.map((item) => item.level));
    candidate.signature = demandSignature(candidate.demand);
  }
}

for (const [bandId, targetCount] of Object.entries(targets)) {
  const rule = bandRules[bandId];
  const pool = enumerateCandidates(bandId).filter((candidate) => !usedSignatures.has(candidate.signature));
  for (let index = 0; index < targetCount; index += 1) {
    pool.sort((left, right) => {
      const leftLoad = left.lines.reduce((sum, line) => sum + lineUse[line], 0) / left.lines.length;
      const rightLoad = right.lines.reduce((sum, line) => sum + lineUse[line], 0) / right.lines.length;
      const leftScore = Math.abs(left.reward - rule.ideal) * 2 + leftLoad - (left.lines.length > 1 ? 2 : 0);
      const rightScore = Math.abs(right.reward - rule.ideal) * 2 + rightLoad - (right.lines.length > 1 ? 2 : 0);
      return leftScore - rightScore || left.signature.localeCompare(right.signature);
    });
    const candidate = curatedByBand[bandId].shift() ?? pool.shift();
    if (!candidate) throw new Error(`Not enough unique ${bandId} order combinations`);
    usedSignatures.add(candidate.signature);
    candidate.lines.forEach((line) => { lineUse[line] += 1; });
    const [rosterNpcId, rosterNpcName] = npcRoster[selected.length % npcRoster.length];
    const npcId = candidate.npcId ?? rosterNpcId;
    const npcName = candidate.npcName ?? rosterNpcName;
    const serial = String(index + 1).padStart(3, "0");
    const orderType = bandId === "quick"
      ? "quick"
      : bandId === "regular" && candidate.lines.length > 1
        ? "mixed"
        : bandId === "regular"
          ? "regular"
          : "rareCaravan";
    selected.push({
      id: `order_exp_${bandId}_${serial}`,
      orderType,
      contentSource: expansionSource,
      npcId,
      npcName,
      demand: candidate.demand,
      reward: {
        coins: candidate.reward,
        codexExp: bandId === "quick" ? 1 : bandId === "regular" ? 3 : 6,
      },
      weight: bandId === "quick" ? 16 : bandId === "regular" ? 12 : 8,
      unlock: "available_when_producible",
      orderTier: bandId,
      requiredGeneratorCategories: candidate.lines.map((line) => categoryByLine.get(line)),
      recommendedGeneratorLevel: generatorLevelForItemLevel(candidate.maxLevel),
      dialogue: dialogueFor(npcName, candidate.demand),
      priceBand: bandId,
    });
  }
}

const allOrders = [...existingOrders, ...selected];
const countsByType = allOrders.reduce((counts, order) => {
  counts[order.orderType] = (counts[order.orderType] ?? 0) + 1;
  return counts;
}, {});
ordersConfig.orders = allOrders;
ordersConfig.contentPlan = {
  ...ordersConfig.contentPlan,
  status: "order_pool_integrated",
  currentOrderCount: allOrders.length,
  targetOrderCount: 172,
  countsByType,
  targetCountsByPriceBand: { quick: 60, regular: 75, goal: 37 },
};

writeFileSync(resolve(root, "data/orders.json"), `${JSON.stringify(ordersConfig, null, 2)}\n`);
console.log(`Wrote ${allOrders.length} orders (${selected.length} generated).`);
