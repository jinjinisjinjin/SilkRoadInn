import assert from "node:assert/strict";
import { analyzeCheckpoint, buildPacingBudget, configs, naturalStaminaBudget, runtimeManualOutput } from "./pacing-model.mjs";

const { targets, progression, economy } = configs;
const ids = targets.chapters.flatMap((chapter) => chapter.repairs.map((repair) => repair.repairId));
assert.deepEqual(ids, progression.milestones.map((repair) => repair.id), "Every repair must have exactly one chronological target");
assert.equal(new Set(ids).size, ids.length);
assert.equal(targets.hardCalendarGates, false, "Design dates must not become waiting locks");
assert.equal(economy.repairPacing.targetConfig, "pacing-targets.json");
assert.ok(!("targetCompletedOrdersMin" in economy.repairPacing), "Old order-count proxies must not override the adopted calendar target");
let elapsed = 0;
for (const chapter of targets.chapters) {
  let chapterDays = 0;
  for (const repair of chapter.repairs) {
    assert.ok(repair.targetDurationDays > 0);
    assert.equal(repair.targetStartDayOffset, elapsed);
    assert.equal(progression.milestones.find((entry) => entry.id === repair.repairId).chapter, chapter.chapter);
    elapsed += repair.targetDurationDays;
    chapterDays += repair.targetDurationDays;
    assert.equal(repair.targetEndDayOffset, elapsed);
  }
  assert.equal(chapter.targetDurationDays, chapterDays);
  assert.equal(chapter.targetEndDayOffset, elapsed);
}
assert.equal(elapsed, targets.targetCalendarDays);
assert.ok(targets.acceptableCalendarDays[0] <= elapsed && elapsed <= targets.acceptableCalendarDays[1]);

const cap = configs.stamina.initial.max;
assert.equal(naturalStaminaBudget(1, [[8, 20]]), 2 * cap, "A full bar cannot accumulate twelve hours of recovery");
assert.equal(naturalStaminaBudget(2, [[8, 20]]), 4 * cap, "Initial balance must not be added again each day");
assert.equal(naturalStaminaBudget(2, [[8, 20], [8, 14, 20]]), 5 * cap);
assert.equal(naturalStaminaBudget(1, [[8, 9]]), cap + 30, "Short intervals must not award another full bar");
for (const row of runtimeManualOutput()) {
  assert.equal(row.stamina, configs.generators.economy.staminaCost * 2 ** (row.outputLevel - 1), "Multiplier must conserve basic food energy, not silently cheapen high food");
}
const report = buildPacingBudget();
assert.equal(report.measuredCompletionDays, null, "Target budgets are not measured completion dates");
assert.equal(report.totalRepairCoins, progression.milestones.reduce((sum, repair) => sum + repair.repairCost, 0));
assert.equal(report.targetSupply.alternatingTwoThree.naturalStamina, 7500);
assert.ok(report.excludedFromGuaranteedStamina.some((text) => text.includes("dailyBonuses")));

// Exercise the analysis branch independently of archived player saves. It must
// return all policies, fund the requested target, and never mutate its input.
const checkpoint = {
  innLevel: 1, board: ["gen_mill_01"], bag: [], coins: 73,
  unlockedGeneratorCategories: ["mill"], unlockedFoodLevels: { hubing: 3 },
  unlockedCodex: ["codex_hubing_01", "codex_hubing_02", "codex_hubing_03"],
  completedOrders: 0, completedOrderIds: [], visibleOrders: [],
  generatorLineOrderCounts: { mill: 0 }, renovationChoices: {},
};
const before = structuredClone(checkpoint);
const analysis = analyzeCheckpoint(checkpoint, { coinTarget: 100, trials: 2 });
assert.equal(analysis.classification, "fixed_checkpoint_resource_sensitivity_not_calendar_forecast");
assert.equal(analysis.scenarios.length, 3);
for (const scenario of analysis.scenarios) {
  assert.equal(scenario.runs.length, 2);
  assert.ok(scenario.runs.every((run) => run.coins >= 100 && run.orders > 0 && run.stamina > 0 && run.milkUnits === 0));
}
assert.deepEqual(checkpoint, before, "Analysis must not alter the source save");
assert.deepEqual(analyzeCheckpoint(checkpoint, { coinTarget: 100, trials: 2 }), analysis, "Seeded analysis must be reproducible");
assert.throws(() => analyzeCheckpoint(checkpoint, { trials: 0 }), /Trials/);
assert.throws(() => analyzeCheckpoint(checkpoint, { coinTarget: 0 }), /Coin target/);
console.log("Pacing budget passed: 22 repairs, capped recovery, multiplier energy conservation, explicit forecast limits, and deterministic non-mutating checkpoint analysis.");
