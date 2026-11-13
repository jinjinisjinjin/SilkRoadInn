/* Cumulative, persistent activity rules shared by the game and validation. */
(function (global) {
  const task = (id, metric, target, label, reward, optional = false) => ({ id, metric, target, label, reward, optional });
  const food = { kind: "food", level: 2, quantity: 1 };
  const material = { kind: "material", quantity: 2 };
  const coin = (level, quantity = 1) => ({ itemId: `bonus_coin_0${level}`, quantity });
  const ruby = (level, quantity = 1) => ({ itemId: `bonus_ruby_0${level}`, quantity });
  const days = [
    { title: "初到驿门", tasks: [task("orders1", "orders", 8, "累计完成 8 份订单", food), task("merges1", "merges", 6, "累计合成食材 6 次", material), task("coins1", "coins", 100, "累计赚取 100 铜钱", coin(1)), task("gems1", "gems", 10, "累计使用 10 红宝石", ruby(1), true)] },
    { title: "乳香入盏", tasks: [task("orders2", "orders", 16, "累计完成 16 份订单", food), task("gems2", "gems", 20, "累计使用 20 红宝石", material, true), task("merges2", "merges", 16, "累计合成食材 16 次", coin(1, 2)), task("codex2", "discoveries", 3, "发现 3 种食品", ruby(1))] },
    { title: "炉火渐旺", tasks: [task("orders3", "orders", 24, "累计完成 24 份订单", food), task("merges3", "merges", 30, "累计合成食材 30 次", material), task("coins3", "coins", 400, "累计赚取 400 铜钱", coin(2)), task("high3", "orders3", 6, "交付 6 份含 Lv3 以上食品的订单", ruby(1, 2))] },
    { title: "绿洲来果", tasks: [task("orders4", "orders", 32, "累计完成 32 份订单", food), task("gems4", "gems", 30, "累计使用 30 红宝石", material, true), task("made4", "made4", 4, "合成出 4 份 Lv4 以上食品", { itemId: "tool_splitter_scissors", quantity: 1 }), task("coins4", "coins", 700, "累计赚取 700 铜钱", coin(2))] },
    { title: "酒浆满案", tasks: [task("orders5", "orders", 40, "累计完成 40 份订单", food), task("gems5", "gems", 40, "累计使用 40 红宝石", material, true), task("codex5", "discoveries", 6, "发现 6 种食品", ruby(2)), task("high5", "orders3", 16, "交付 16 份含 Lv3 以上食品的订单", coin(2, 2))] },
    { title: "商旅成行", tasks: [task("orders6", "orders", 48, "累计完成 48 份订单", { ...food, level: 3 }), task("gems6", "gems", 50, "累计使用 50 红宝石", material, true), task("merges6", "merges", 80, "累计合成食材 80 次", ruby(2)), task("coins6", "coins", 1200, "累计赚取 1200 铜钱", coin(3))] },
    { title: "七日成宴", tasks: [task("orders7", "orders", 56, "累计完成 56 份订单", { ...food, level: 4 }), task("high7", "orders4", 12, "交付 12 份含 Lv4 以上食品的订单", { itemId: "tool_baiwei_jinjian", quantity: 1 }), task("merges7", "merges", 120, "累计合成食材 120 次", ruby(2, 2)), task("gems7", "gems", 60, "累计使用 60 红宝石", { ...material, quantity: 4 }, true)] },
  ];
  // Existing activities keep their original goals, including unclaimed rewards.
  // New activities use a cumulative week-long curve; neither version expires.
  const revisedTargets = {
    orders2: 25, merges2: 30, codex2: 5,
    orders3: 55, merges3: 90, coins3: 1800, high3: 20,
    orders4: 90, made4: 30, coins4: 3500,
    orders5: 125, codex5: 14, high5: 65,
    orders6: 160, merges6: 240, coins6: 7000,
    orders7: 190, high7: 65, merges7: 400,
  };
  const revisedDays = days.map(day => ({ ...day, tasks: day.tasks.map(task => {
    const target = revisedTargets[task.id] ?? task.target;
    // Replace the goal number only: the Lv3 / Lv4 requirement stays unchanged.
    return { ...task, target, label: task.label.replace(String(task.target), String(target)) };
  }) }));
  const daysFor = progress => progress?.rulesVersion === 2 ? revisedDays : days;
  const stages = [
    { id: "stage4", target: 4, reward: coin(2) },
    { id: "stage10", target: 10, reward: { itemId: "bonus_stamina_02", quantity: 1 } },
    { id: "stage16", target: 16, reward: { itemId: "tool_splitter_scissors", quantity: 1 } },
    { id: "stage22", target: 22, reward: { itemId: "tool_baiwei_jinjian", quantity: 1 } },
  ];
  const integer = value => Math.max(0, Math.floor(Number(value) || 0));
  const ordinal = day => {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(day ?? "")) return null;
    const value = Date.parse(`${day}T00:00:00Z`);
    return Number.isFinite(value) ? Math.floor(value / 86400000) : null;
  };
  function normalize(saved, today) {
    const tasks = new Set(days.flatMap(day => day.tasks.map(task => task.id)));
    const stageIds = new Set(stages.map(stage => stage.id));
    const startDay = ordinal(saved?.startDay) === null ? today : saved.startDay;
    const elapsed = Math.max(1, (ordinal(today) - ordinal(startDay)) + 1);
    return { rulesVersion: saved == null || saved.rulesVersion === 2 ? 2 : 1,
      startDay, unlockedDay: Math.min(7, Math.max(1, elapsed, integer(saved?.unlockedDay))),
      claimed: [...new Set(Array.isArray(saved?.claimed) ? saved.claimed : [])].filter(id => tasks.has(id)),
      claimedStages: [...new Set(Array.isArray(saved?.claimedStages) ? saved.claimedStages : [])].filter(id => stageIds.has(id)),
      counters: Object.fromEntries(["merges", "made4", "orders3", "orders4", "gems"].map(key => [key, integer(saved?.counters?.[key])])) };
  }
  function claimable(task, day, progress, metrics) {
    return day <= progress.unlockedDay && !progress.claimed.includes(task.id) && integer(metrics[task.metric]) >= task.target;
  }
  function coreClaims(progress) {
    return days.flatMap(day => day.tasks).filter(task => !task.optional && progress.claimed.includes(task.id)).length;
  }
  global.SilkRoadActivity = { days, daysFor, stages, normalize, claimable, coreClaims };
})(typeof window === "undefined" ? globalThis : window);
