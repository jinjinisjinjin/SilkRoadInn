import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';

const source = readFileSync(resolve(import.meta.dirname, '../app.js'), 'utf8');
function load(context, names) {
  for (const name of names) {
    const start = source.search(new RegExp(`(?:async )?function ${name}\\(`));
    assert.ok(start >= 0, name);
    runInNewContext(source.slice(start, source.indexOf('\n}', start) + 2), context);
  }
}

let day = '2026-10-11', entries = 0, ticks = 0, recovered = 0, rendered = 0, saved = 0;
const calendar = {
  calendarEntriesRenderedDay: null,
  currentLocalDayKey: () => day,
  renderDailyPouchButtons() { entries++; }, renderWeeklyCheckinButton() { entries++; },
  renderActivityEntry() { entries++; }, renderCaravanRenownEntry() { entries++; },
  tickGenerators() { ticks++; }, tickBonusBubbles() {}, els: {},
  recoverStaminaAt: () => recovered, renderStaminaCountdown() {}, toast() {},
  render() { rendered++; }, saveState() { saved++; }, Date,
};
load(calendar, ['renderCalendarEntries', 'tickStamina']);
calendar.tickStamina();
assert.equal(entries, 4);
for (let second = 0; second < 30; second++) calendar.tickStamina();
assert.equal(entries, 4, 'Unchanged rewards must not repaint each second');
assert.equal(ticks, 31, 'Real generator cooldowns must continue ticking');
day = '2026-10-12'; calendar.tickStamina(); calendar.tickStamina();
assert.equal(entries, 8, 'Midnight refreshes calendar rewards exactly once');
calendar.renderCalendarEntries();
assert.equal(entries, 12, 'An action can refresh a changed reward immediately');
recovered = 1; calendar.tickStamina();
assert.equal(rendered, 1); assert.equal(saved, 1, 'Recovered energy still persists');

let now = 10000, writes = 0;
const node = () => ({
  style: { setProperty() { writes++; } },
  set hidden(value) { this.hiddenValue = value; writes++; },
  set textContent(value) { this.text = value; writes++; },
});
const clock = { state: { stamina: 99, staminaMax: 100, lastTick: 0 },
  staminaCountdownRenderKey: null, Date: { now: () => now },
  staminaRecoveryIntervalMs: () => 120000,
  els: Object.fromEntries(['boardStaminaRing', 'boardStaminaTimer', 'boardStaminaTimerLabel', 'boardStaminaTimerValue',
    'innStaminaRing', 'innStaminaTimer', 'innStaminaTimerLabel', 'innStaminaTimerValue'].map(key => [key, node()])),
};
load(clock, ['renderStaminaCountdown']);
clock.renderStaminaCountdown(); assert.equal(clock.els.boardStaminaTimerValue.text, '01:50');
const firstWrites = writes; clock.renderStaminaCountdown(); assert.equal(writes, firstWrites);
now += 1000; clock.renderStaminaCountdown(); assert.equal(clock.els.boardStaminaTimerValue.text, '01:49');
clock.state.stamina = 100; clock.renderStaminaCountdown(); assert.equal(clock.els.boardStaminaTimer.hiddenValue, true);
const fullWrites = writes; now += 5000; clock.renderStaminaCountdown(); assert.equal(writes, fullWrites);
clock.state.stamina = 99; clock.state.lastTick = now; clock.renderStaminaCountdown();
assert.equal(clock.els.boardStaminaTimerValue.text, '02:00');

let hitTests = 0, storageTests = 0, taps = 0;
const pointer = {
  dragging: { pointerId: 1, fromIndex: 38, itemId: 'mill', moved: false, prevSelected: null },
  resolveDropIndex() { hitTests++; return null; }, isStorageDropPoint() { storageTests++; return false; },
  cleanupCellPointer() {}, removeDragGhost() {}, els: { storageBtn: { classList: { remove() {} } } },
  handleCellClick(index, previous, timestamp) { taps++; assert.equal(index, 38); assert.equal(timestamp, 123); },
  render() {},
};
load(pointer, ['endCellPointer']);
await pointer.endCellPointer({ pointerId: 1, timeStamp: 123 });
assert.equal(taps, 1); assert.equal(hitTests, 0); assert.equal(storageTests, 0);
pointer.dragging = { pointerId: 1, fromIndex: 38, itemId: 'mill', moved: true, prevSelected: null };
await pointer.endCellPointer({ pointerId: 1, timeStamp: 124 });
assert.equal(hitTests, 1); assert.equal(storageTests, 1, 'Actual drags still resolve their drop target');

let checkedMilestones = 0;
const milestones = [
  { id: 'one', innLevel: 1, conditions: { completedOrderIds: ['first'] } },
  { id: 'two', innLevel: 2, conditions: { completedOrderIds: ['second', 'third'] } },
  { id: 'three', innLevel: 3, conditions: {} },
];
const progression = {
  state: { progressionConfig: { milestones }, renovationChoices: { one: 'completed' }, completedOrderIds: ['second'], innLevel: 2 },
  milestoneInnLevel: milestone => milestone.innLevel,
  getMilestoneChecks() { checkedMilestones++; return [{ done: false, ratio: 0, label: 'pending', nextLabel: 'next' }]; },
  rewardText: () => 'reward',
};
load(progression, ['milestoneView', 'getMilestoneViews', 'nextRepairMilestone', 'nextStoryOrderId']);
assert.equal(progression.nextStoryOrderId(), 'third');
assert.equal(checkedMilestones, 0, 'Finding a story order must not build repair presentation');
assert.equal(progression.nextRepairMilestone().id, 'two');
assert.equal(checkedMilestones, 1, 'Current repair only evaluates its own gates');
assert.equal(progression.getMilestoneViews().length, 3, 'The full repair view remains available');
assert.equal(checkedMilestones, 4);
progression.state.innLevel = 1; assert.equal(progression.nextStoryOrderId(), null);
progression.state.renovationChoices = { one: 'completed', two: 'completed', three: 'completed' };
assert.equal(progression.nextStoryOrderId(), null); assert.equal(progression.nextRepairMilestone(), undefined);
assert.equal(checkedMilestones, 4, 'Completed progression does not calculate unused views');
console.log('Performance behavior: quiet clock, midnight/action refresh, energy persistence, countdown transitions, click/drag routing and current-only progression lookup passed.');
