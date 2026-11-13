/* Contextual gifts reuse the old pack IDs and receipts, so saved rewards keep
 * their value. Only the occasion and delivery change; order costs do not. */
function normalizeRegularCustomerGifts(value) {
  const assignment = value?.assignment;
  const valid = assignment && getOrder(assignment.orderId)
    && state.progressionConfig.orderProgressPacks.some(pack => pack.id === assignment.packId);
  return { version: 1, assignment: valid ? { packId: assignment.packId, orderId: assignment.orderId } : null };
}

function regularCustomerGiftForOrder(orderId) {
  const assignment = state.regularCustomerGifts?.assignment;
  if (assignment?.orderId !== orderId || state.claimedOrderProgressPacks.includes(assignment.packId)) return null;
  return state.progressionConfig.orderProgressPacks.find(pack => pack.id === assignment.packId) ?? null;
}

function regularCustomerGiftReady(pack) {
  const occasion = pack.occasion;
  if (!occasion || state.claimedOrderProgressPacks.includes(pack.id)) return false;
  if (occasion.afterOrderId && !state.completedOrderIds.includes(occasion.afterOrderId)) return false;
  if (occasion.afterRepairId && !isRepairCompleted(occasion.afterRepairId)) return false;
  // Materials must be useful now, rather than occupying the board before a
  // player has even opened the corresponding producer.
  return highestOwnedGeneratorLevel(pack.materialCategory) > 0;
}

function syncRegularCustomerGifts() {
  state.regularCustomerGifts ??= normalizeRegularCustomerGifts(null);
  const current = state.regularCustomerGifts.assignment;
  if (current && regularCustomerGiftForOrder(current.orderId)
    && state.visibleOrders.includes(current.orderId)
    && orderDemandLinesUnlocked(getOrder(current.orderId))) return false;
  state.regularCustomerGifts.assignment = null;
  const pack = state.progressionConfig.orderProgressPacks.find(regularCustomerGiftReady);
  if (!pack) return current !== null;
  const servedGuests = new Set(state.completedOrderIds.map(id => getOrder(id)?.npcId).filter(Boolean));
  const candidates = state.visibleOrders.map(getOrder).filter(order => order
    && servedGuests.has(order.npcId) && orderDemandLinesUnlocked(order));
  if (candidates.length) {
    // One promise at a time. Unfinished gifts survive chapter changes; no
    // refresh, new chapter, or temporarily unavailable guest discards a gift.
    const preferred = order => order.demand.some(demand => byId.get(demand.itemId)?.line === pack.occasion.preferredFoodLine);
    const order = [...candidates].sort((a, b) => Number(preferred(b)) - Number(preferred(a))
      || calculatedOrderCoinReward(a) - calculatedOrderCoinReward(b))[0];
    state.regularCustomerGifts.assignment = { packId: pack.id, orderId: order.id };
  }
  return JSON.stringify(current) !== JSON.stringify(state.regularCustomerGifts.assignment);
}

function grantRegularCustomerGift(packId) {
  if (state.claimedOrderProgressPacks.includes(packId)) return false;
  const pack = GIFT_PACKS[packId];
  if (!pack?.orderProgress) return false;
  const outputs = orderProgressGiftOutputs(pack);
  if (!outputs.length || outputs.some(id => !byId.has(id))) return false;
  // Keep the actual mergeable pieces, including denomination/merge bonuses.
  // The unbounded reward bag also works when every board/storage cell is full.
  outputs.forEach(id => grantRewardItem(id));
  state.claimedOrderProgressPacks.push(packId);
  if (state.regularCustomerGifts.assignment?.packId === packId) state.regularCustomerGifts.assignment = null;
  return true;
}

function migrateRegularCustomerGiftRewards() {
  // A previously claimed pack can still be unopened/on the board. Preserve it
  // as-is; never pay its contents a second time, even with an old partial save.
  const heldIds = new Set([
    ...state.giftPacks.filter(pack => pack.quantity > 0).map(pack => pack.id),
    ...Object.values(state.giftBoxStates).map(box => box.packId),
    ...Object.values(state.storedGiftBoxStates).map(box => box.packId),
  ]);
  for (const pack of state.progressionConfig.orderProgressPacks) {
    if (state.claimedOrderProgressPacks.includes(pack.id)) continue;
    if (heldIds.has(pack.id)) state.claimedOrderProgressPacks.push(pack.id);
    else if ((state.chapterOrderCounts[pack.chapter] ?? 0) >= pack.threshold) grantRegularCustomerGift(pack.id);
  }
}

function regularCustomerGiftLabel(pack) {
  const material = byId.get(mappedGiftMaterialId(GIFT_PACKS[pack.id]));
  return `熟客回礼：铜币棋子面值${pack.coinAmount}、红宝石棋子${pack.rubyQuantity ?? 1}枚、${material?.name ?? "材料"}×${pack.materialQuantity ?? 1}`;
}

function regularCustomerGiftContents(pack) {
  const material = byId.get(mappedGiftMaterialId(GIFT_PACKS[pack.id]));
  const ruby = byId.get("bonus_ruby_01");
  return `<div class="customer-gift-stage" aria-hidden="true">
    <h2 class="customer-gift-title">熟客回礼</h2>
    <img class="customer-gift-coffer" src="./assets/ui/order_gift_coffer_v1.png" alt="" />
    <div class="customer-gift-rewards">
      <span><img src="./assets/ui/ui_coin_copper.png" alt="" /><b>${pack.coinAmount}</b></span>
      <span><img src="${itemAssetSrc(ruby)}" alt="" /><b>${pack.rubyQuantity ?? 1}</b></span>
      <span class="customer-gift-material"><img src="${itemAssetSrc(material)}" alt="" /><b>×${pack.materialQuantity ?? 1}</b></span>
    </div>
  </div>`;
}

function openRegularCustomerGiftPreview(orderId) {
  const pack = regularCustomerGiftForOrder(orderId);
  if (!pack) return;
  const modal = document.querySelector("#customerGiftModal");
  modal.setAttribute("aria-label", regularCustomerGiftLabel(pack));
  modal.querySelector(".customer-gift-content").innerHTML = regularCustomerGiftContents(pack);
  modal.showModal();
}

let regularCustomerGiftFeedbackTimer;
function showRegularCustomerGiftReceived(pack) {
  const feedback = document.querySelector("#customerGiftReceived");
  clearTimeout(regularCustomerGiftFeedbackTimer);
  feedback.innerHTML = regularCustomerGiftContents(pack);
  feedback.setAttribute("aria-label", `${regularCustomerGiftLabel(pack)}，已收入行囊`);
  // Rewards and the receipt have already been saved. This presentation never
  // owns focus, intercepts input, or asks the player to claim the gift again.
  feedback.hidden = false;
  feedback.getAnimations().forEach(animation => { animation.currentTime = 0; });
  regularCustomerGiftFeedbackTimer = setTimeout(() => {
    feedback.hidden = true;
    feedback.innerHTML = "";
  }, 1250);
}
