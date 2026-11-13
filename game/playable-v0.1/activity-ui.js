/* The activity UI uses the same state and reward bag as the main loop. */
let activitySelectedDay = 1;

function activityProgress() {
  if (!state.activityProgress) state.activityProgress = SilkRoadActivity.normalize(null, currentLocalDayKey());
  else Object.assign(state.activityProgress, SilkRoadActivity.normalize(state.activityProgress, currentLocalDayKey()));
  return state.activityProgress;
}

function recordActivity(metric, quantity = 1) {
  const progress = activityProgress();
  if (Object.hasOwn(progress.counters, metric)) progress.counters[metric] += Math.max(0, Math.floor(Number(quantity) || 0));
}

function recordFoodMerge(source, output) {
  if (!state.generatorConfig.categories.some(category => category.foodLineId === source?.line)) return;
  recordActivity("merges");
  if (output?.level >= 4) recordActivity("made4");
}

function activityMetrics() {
  return { ...activityProgress().counters, orders: state.completedOrders, coins: state.coinsEarned,
    discoveries: Object.values(state.unlockedFoodLevels).reduce((sum, level) => sum + Number(level || 0), 0) };
}

function usefulRewardFood(level = 2, preferredLine = null) {
  const categories = state.generatorConfig.categories.filter(category => state.unlockedGeneratorCategories.includes(category.id) && highestOwnedGeneratorLevel(category.id) > 0);
  const demandLines = state.visibleOrders.flatMap(id => getOrder(id)?.demand ?? []).filter(demand => countItem(demand.itemId) < demand.quantity).map(demand => byId.get(demand.itemId)?.line);
  const category = categories.find(category => category.foodLineId === preferredLine)
    ?? categories.find(category => demandLines.includes(category.foodLineId)) ?? categories[0];
  if (!category) return null;
  const maxByGenerator = state.economyConfig.orderPricing.availability.maxDemandLevelByGeneratorLevel;
  const ceiling = Number(maxByGenerator[highestOwnedGeneratorLevel(category.id)]) || 1;
  const allowed = Math.max(1, Math.min(level, ceiling, Math.max(2, unlockedFoodLevel(category.foodLineId))));
  return foodItemsForLine(category.foodLineId).find(item => Number(item.level) === allowed);
}

function activityRewardItems(reward) {
  if (reward.itemId) return [{ itemId: reward.itemId, quantity: reward.quantity ?? 1 }];
  const food = usefulRewardFood(reward.level ?? 2);
  if (reward.kind === "food") return food ? [{ itemId: food.id, quantity: reward.quantity ?? 1 }] : [];
  const category = state.generatorConfig.categories.find(category => category.foodLineId === food?.line);
  const itemId = `material_${category?.id ?? "mill"}_01`;
  return byId.has(itemId) ? [{ itemId, quantity: reward.quantity ?? 1 }] : [];
}

function activityRewardLabel(reward) {
  return activityRewardItems(reward).map(entry => `${byId.get(entry.itemId)?.name ?? "奖励"} ×${entry.quantity}`).join("、");
}

function activityRewardMarkup(reward) {
  return activityRewardItems(reward).map(entry => {
    const item = byId.get(entry.itemId);
    return `<span class="activity-reward ${item.type === "generator_material" ? "activity-material-reward" : ""}" title="${item.name}" aria-label="${item.name} ×${entry.quantity}"><img src="${itemAssetSrc(item)}" alt="" /><b>×${entry.quantity}</b></span>`;
  }).join("");
}

function claimActivityTask(id) {
  const progress = activityProgress();
  const day = SilkRoadActivity.daysFor(progress).findIndex(day => day.tasks.some(task => task.id === id));
  const task = SilkRoadActivity.daysFor(progress)[day]?.tasks.find(task => task.id === id);
  if (!task || !SilkRoadActivity.claimable(task, day + 1, progress, activityMetrics())) return;
  const rewards = activityRewardItems(task.reward);
  if (!rewards.length) return;
  // Receipt and reward are committed in one synchronous save, before animation.
  progress.claimed.push(id);
  rewards.forEach(entry => grantRewardItem(entry.itemId, entry.quantity));
  saveState();
  render();
  toast("任务奖励已收入行囊。");
}

function claimActivityStage(id) {
  const progress = activityProgress();
  const stage = SilkRoadActivity.stages.find(stage => stage.id === id);
  if (!stage || progress.claimedStages.includes(id) || SilkRoadActivity.coreClaims(progress) < stage.target) return;
  const rewards = activityRewardItems(stage.reward);
  if (!rewards.length) return;
  progress.claimedStages.push(id);
  rewards.forEach(entry => grantRewardItem(entry.itemId, entry.quantity));
  saveState();
  render();
  toast("阶段礼已收入行囊。");
}

function openActivity() {
  const progress = activityProgress();
  const metrics = activityMetrics();
  const readyDay = SilkRoadActivity.daysFor(progress).findIndex((day, index) => day.tasks.some(task => SilkRoadActivity.claimable(task, index + 1, progress, metrics)));
  activitySelectedDay = readyDay >= 0 ? readyDay + 1 : progress.unlockedDay;
  renderActivity();
  saveState();
  const modal = document.querySelector("#activityModal");
  if (!modal.open) modal.showModal();
}

function handleActivityClick(event) {
  const target = event.target.closest("button");
  if (!target || target.disabled) return;
  if (target.dataset.activityDay) { activitySelectedDay = Number(target.dataset.activityDay); renderActivity(); }
  if (target.dataset.activityTask) claimActivityTask(target.dataset.activityTask);
  if (target.dataset.activityStage) claimActivityStage(target.dataset.activityStage);
}

function renderActivityEntry() {
  const progress = activityProgress();
  const metrics = activityMetrics();
  const ready = SilkRoadActivity.daysFor(progress).some((day, index) => day.tasks.some(task => SilkRoadActivity.claimable(task, index + 1, progress, metrics)))
    || SilkRoadActivity.stages.some(stage => !progress.claimedStages.includes(stage.id) && SilkRoadActivity.coreClaims(progress) >= stage.target);
  els.sevenDayActivityBtn?.classList.toggle("has-reward", ready);
  els.sevenDayActivityBtn?.setAttribute("aria-label", ready ? "打开七日任务，有奖励可领取" : "打开七日任务");

}

function renderActivity() {
  const content = document.querySelector("#activityContent");
  if (!content) return;
  const progress = activityProgress();
  const metrics = activityMetrics();
  const coreCount = SilkRoadActivity.coreClaims(progress);
  const labels = { orders: "完成订单", merges: "合成食物", coins: "赚取铜钱", gems: "使用红宝石", discoveries: "发现新菜", orders3: "交付 Lv3+ 食物订单", orders4: "交付 Lv4+ 食物订单", made4: "合成 Lv4+ 食物" };
  content.innerHTML = `<nav class="activity-days" aria-label="选择任务日期">${SilkRoadActivity.daysFor(progress).map((day, index) => {
    const ready = day.tasks.some(task => SilkRoadActivity.claimable(task, index + 1, progress, metrics));
    const locked = index + 1 > progress.unlockedDay;
    return `<button data-activity-day="${index + 1}" aria-label="第${index + 1}日${locked ? "，未开放" : ready ? "，有奖励可领取" : ""}" aria-pressed="${index + 1 === activitySelectedDay}" class="${ready ? "has-reward" : ""} ${locked ? "is-locked" : ""}">${index + 1}</button>`;
  }).join("")}</nav>
  ${activitySelectedDay > progress.unlockedDay ? `<p class="activity-day-note">第${activitySelectedDay}日开放</p>` : ""}
  <div class="activity-tasks">${SilkRoadActivity.daysFor(progress)[activitySelectedDay - 1].tasks.map(task => {
    const claimed = progress.claimed.includes(task.id);
    const ready = SilkRoadActivity.claimable(task, activitySelectedDay, progress, metrics);
    const current = Math.min(task.target, metrics[task.metric] ?? 0);
    const status = claimed ? "已领取" : ready ? "领取" : activitySelectedDay > progress.unlockedDay ? "未开放" : "进行中";
    return `<article class="activity-task">${activityRewardMarkup(task.reward)}<div><strong>${labels[task.metric] ?? task.label}</strong>${task.optional ? '<small title="不计入旅途奖励进度">额外奖励</small>' : ""}<progress max="${task.target}" value="${current}" aria-label="${task.label}"></progress><span>${current} / ${task.target}</span></div><button data-activity-task="${task.id}" aria-label="${status}：${task.label}；${activityRewardLabel(task.reward)}" ${ready ? "" : "disabled"} class="${ready ? "is-ready" : ""}">${claimed ? "✓" : ready ? "领取" : "—"}</button></article>`;
  }).join("")}</div>
  <div class="activity-stage-heading"><strong>旅途奖励</strong><span>${coreCount} / 22</span></div>
  <progress class="activity-core-progress" max="22" value="${coreCount}" aria-label="已领取日常任务"></progress>
  <div class="activity-stages">${SilkRoadActivity.stages.map(stage => {
    const claimed = progress.claimedStages.includes(stage.id);
    const ready = !claimed && coreCount >= stage.target;
    return `<button data-activity-stage="${stage.id}" ${ready ? "" : "disabled"} class="${ready ? "is-ready" : ""}" aria-label="${claimed ? "已领取" : ready ? "领取" : "未达成"}${stage.target}项阶段礼：${activityRewardLabel(stage.reward)}">${activityRewardMarkup(stage.reward)}<b>${claimed ? "✓" : ready ? "领取" : `${stage.target}项`}</b></button>`;
  }).join("")}</div>`;
}
