function orderGateDescription(order) {
  const foods = order?.demand.map(demand => `${byId.get(demand.itemId)?.name ?? "食品"} ×${demand.quantity}`).join("、") ?? "";
  return `交付「${order?.npcName ?? "旅人"}」：${foods}`;
}

function syncStoryOrderAvailability() {
  const order = getOrder(nextStoryOrderId());
  if (!order || state.visibleOrders.includes(order.id) || !isOrderEligible(order, { ignoreVisible: true, ignoreWeight: true })) return false;
  state.visibleOrders.unshift(order.id);
  // Keep waiting guests when a discovery brings the main quest into view.
  return true;
}

function normalizeWeeklyRewardReceipts(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).filter(([key, receipt]) => /^\d+:[0-6]$/.test(key) && Array.isArray(receipt?.items)).map(([key, receipt]) => [key, {
    label: String(receipt.label ?? "行程礼"), coins: Math.max(0, Math.floor(Number(receipt.coins) || 0)),
    items: receipt.items.filter(entry => byId.has(entry.itemId) || GIFT_PACKS[entry.packId]).map(entry => ({ ...entry, quantity: Math.max(1, Math.floor(Number(entry.quantity) || 1)) })),
  }]));
}

function weeklyRewardForDay(index) {
  const receipt = state.weeklyCheckinRewardReceipts?.[`${state.weeklyCheckinRound}:${index}`];
  if (receipt) return receipt;
  const original = WEEKLY_CHECKIN_REWARDS[index];
  if (index < state.weeklyCheckinClaimedDays) return original;
  let coins = 0;
  const items = original.items.map(entry => {
    const originalItem = byId.get(entry.itemId);
    if (!originalItem || !foodLineMaxLevels.has(originalItem.line)) return { ...entry };
    const food = usefulRewardFood(originalItem.level, originalItem.line);
    if (!food) return { ...entry };
    coins += Math.max(0, orderItemCoinValue(originalItem.id) - orderItemCoinValue(food.id)) * (entry.quantity ?? 1);
    return { itemId: food.id, quantity: entry.quantity ?? 1 };
  });
  const label = items.map(entry => `${byId.get(entry.itemId)?.name ?? GIFT_PACKS[entry.packId]?.name} ×${entry.quantity}`).join("＋") + (coins ? `＋${coins}铜钱` : "");
  return { items, coins, label };
}

function syncMilkIntroductionOrder() {
  if (!ownsGeneratorCategory("dairy")) return false;
  if ((state.generatorLineOrderCounts.dairy ?? 0) >= 4) {
    // Bridge the first milk lessons into regular service while keeping waiting
    // guests. Only the first inn stage needs this supply-aware short order.
    if (state.innLevel !== 2 || state.visibleOrders.some(id => getOrder(id)?.demand.some(entry => byId.get(entry.itemId)?.line === "dairy"))) return false;
    if (!state.board.some(id => byId.get(id)?.line === "dairy" && !byId.get(id)?.type)) return false;
    const cost = order => order.demand.reduce((sum, entry) => sum + entry.quantity * 2 ** (byId.get(entry.itemId).level - 1), 0);
    const candidates = state.ordersConfig.orders.filter(order => order.priceBand === "quick"
      && order.demand.some(entry => byId.get(entry.itemId)?.line === "dairy")
      && order.demand.every(entry => (byId.get(entry.itemId)?.level ?? Infinity) <= 2)
      && isOrderEligible(order));
    candidates.sort((left, right) => cost(left) - cost(right));
    if (!candidates.length) return false;
    state.visibleOrders.unshift(candidates[0].id);
    return true;
  }
  const order = state.ordersConfig.orders.find(order => order.id.startsWith("order_ch1_guide_dairy_") && !state.completedOrderIds.includes(order.id));
  if (!order || state.visibleOrders.includes(order.id) || !isOrderEligible(order, { ignoreVisible: true, ignoreWeight: true })) return false;
  state.visibleOrders.unshift(order.id);
  return true;
}
