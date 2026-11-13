import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");
const source = readFileSync(resolve(root, "app.js"), "utf8");
const progression = JSON.parse(readFileSync(resolve(root, "data/progression.json"), "utf8"));
const notesContext = { window: {} };
runInNewContext(readFileSync(resolve(root, "historical-notes.js"), "utf8"), notesContext);
const notes = notesContext.window.SilkRoadHistoricalNotes;
const closingIds = ["codex_first_phase", "lv2_well", "lv3_watchtower", "lv4_lantern_city"];

// Run the production recovery functions against saved-state fixtures. No copied
// implementation: changes to app.js are what these assertions exercise.
const functions = [
  "isRepairCompleted", "chapterStoryFlag", "chapterStorySeen",
  "historicalNoteForRepair", "historicalNoteAnswered", "isChapterClosingRepair",
  "repairFollowupPhase", "normalizePendingRepairFollowupIds", "pendingRepairFollowup",
  "clearRepairFollowup", "resumePendingRepairFollowup",
  "saveState", "commitRepairPart", "finalizeRepairMilestoneState", "restoreRepairReturnView",
];
const production = functions.map((name) => {
  const start = source.indexOf(`\nfunction ${name}(`);
  assert.notEqual(start, -1, `Missing production function ${name}`);
  const next = source.slice(start + 1).search(/\n(?:async )?function /);
  assert.notEqual(next, -1);
  return source.slice(start + 1, start + 1 + next);
}).join("\n");

function fixture(id) {
  const end = progression.milestones.findIndex((entry) => entry.id === id);
  const calls = [];
  const state = {
    progressionConfig: progression,
    renovationChoices: Object.fromEntries(progression.milestones.slice(0, end + 1).map((entry) => [entry.id, "completed"])),
    answeredHistoricalNoteIds: [], historicalNoteRewards: {}, storyFlags: {},
    pendingRepairFollowupIds: [], activeChapterStory: null, currentPage: "inn",
    coins: 345, gems: 26, giftPacks: [{ id: "earned", quantity: 1 }],
    unlockedCodex: new Set(), repairProgress: {},
  };
  const context = {
    state, HISTORICAL_NOTES: notes, FINAL_REPAIR_MILESTONE_ID: closingIds.at(-1),
    historicalNoteTransitioning: false, openRepairMilestoneId: null,
    repairReturnCastMilestoneId: null, document: { querySelector: () => null },
    render() {}, centerInnSceneOnPosition() {}, finishRepairAfterStory() {},
    openHistoricalNote: (noteId) => calls.push({ type: "note", noteId }),
    playChapterStory: (segmentId, complete, options) => calls.push({ type: "story", segmentId, options }),
    showInnFinale: () => calls.push({ type: "finale" }),
    SAVE_KEY: "test-save", REPAIR_PART_COUNT: 9,
    REPAIR_PROTOCOL_VERSION: 1, COIN_ECONOMY_VERSION: 1,
    OPENING_STAMINA_VERSION: 1, OPENING_COPPER_VERSION: 1,
    BOARD_REVEAL_SCHEMA_VERSION: 1, FOOD_DISCOVERY_SCHEMA_VERSION: 1, INN_LEVEL_SCHEMA_VERSION: 1,
    syncUnlockedFoodLevels() {}, els: { coins: {} },
    localStorage: { setItem: (key, value) => calls.push({ type: "save", key, value: JSON.parse(value) }) },
    repairPartCosts: () => Array(9).fill(100),
    ensureRepairProgress: (milestone) => state.repairProgress[milestone.id],
    firstIncompleteRepairPart: (parts) => Array.from({ length: 9 }, (_, i) => i).find((i) => !parts.includes(i)) ?? null,
    applyRepairRewards: () => calls.push({ type: "repair-reward" }),
    isChapterRepairComplete: () => true,
    applyChapterCompletionReward: () => calls.push({ type: "chapter-reward" }),
    syncGeneratorCategoryUnlocks() {}, syncVisibleOrders() {}, advanceInnLevelsIfReady() {},
    nextRepairMilestone: () => null,
    longscrollCharacterMilestone: () => null, LONGSCROLL_LOCATION_CAST: {},
    pendingChapterOpeningId: () => null, pendingInnUpgradeRevealLevel: null,
    requestAnimationFrame() {}, setTimeout: (callback) => calls.push({ type: "timer", callback }),
    maybePromptRepairGuide() {}, showPendingInnUpgradeReveal() {},
  };
  runInNewContext(production, context);
  return { context, state, calls, note: notes.find((entry) => entry.repairId === id) };
}

for (const id of closingIds) {
  const { context: c, state: s, calls } = fixture(id);
  delete s.renovationChoices[id];
  s.repairProgress[id] = { completedParts: [0, 1, 2, 3, 4, 5, 6, 7], prepaidRemaining: 0 };
  const milestone = progression.milestones.find((entry) => entry.id === id);
  assert.equal(c.commitRepairPart(milestone, 8).charged, 100);
  assert.equal(c.commitRepairPart(milestone, 8).charged, 0, "A retried final payment cannot charge twice");
  const saved = calls.find((call) => call.type === "save").value;
  assert.equal(saved.coins, 245);
  assert.deepEqual(saved.pendingRepairFollowupIds, [id], "Final payment persists its followup in the same save");
  assert.equal(saved.repairProgress[id].completedParts.length, 9);
  assert.equal(calls.filter((call) => call.type === "repair-reward").length, 1);
  assert.equal(calls.filter((call) => call.type === "chapter-reward").length, 1);
}

for (const id of closingIds) {
  const { context: c, state: s, calls, note } = fixture(id);
  const resources = JSON.stringify([s.coins, s.gems, s.giftPacks]);
  s.pendingRepairFollowupIds = c.normalizePendingRepairFollowupIds(undefined);
  assert.equal(s.pendingRepairFollowupIds.join(), id, `${id}: legacy unread note recovered`);
  assert.equal(c.pendingRepairFollowup().phase, "note");
  assert.equal(c.resumePendingRepairFollowup(), true);
  assert.equal(calls.at(-1).noteId, note.id);
  s.answeredHistoricalNoteIds.push(note.id);
  assert.equal(c.pendingRepairFollowup().phase, "story", "An old answered note without a receipt cannot block or regenerate rewards");
  s.historicalNoteRewards[note.id] = { claimed: false };
  assert.equal(c.pendingRepairFollowup().phase, "note", "Unfinished reward must resume before the story");
  s.historicalNoteRewards[note.id].claimed = true;
  s.activeChapterStory = { segmentId: `after:${id}`, index: 2, rewardVisible: false };
  c.resumePendingRepairFollowup();
  assert.equal(calls.at(-1).segmentId, `after:${id}`);
  assert.equal(calls.at(-1).options.resume, true, "Resume the existing dialogue checkpoint");
  s.storyFlags[`chapterStory:after:${id}`] = true;
  if (id === closingIds.at(-1)) {
    assert.equal(c.pendingRepairFollowup().phase, "finale");
    c.resumePendingRepairFollowup();
    assert.equal(calls.at(-1).type, "finale");
    s.storyFlags.innFinaleLetterSeen = true;
  }
  assert.equal(c.pendingRepairFollowup(), null);
  assert.equal(c.normalizePendingRepairFollowupIds(undefined).length, 0, "Finished legacy saves must stay finished");
  assert.equal(c.normalizePendingRepairFollowupIds([id, id, "invalid"]).length, 0);
  assert.equal(JSON.stringify([s.coins, s.gems, s.giftPacks]), resources, "Recovery cannot charge or regrant rewards");
}

const { context: c, state: s, calls } = fixture(closingIds.at(-1));
s.pendingRepairFollowupIds = c.normalizePendingRepairFollowupIds([closingIds[0], closingIds[0], closingIds[3], "invalid", "tutorial_complete"]);
assert.equal(s.pendingRepairFollowupIds.join(), `${closingIds[0]},${closingIds[3]}`, "Queue is ordered, valid and deduplicated");
c.clearRepairFollowup(closingIds[0]);
assert.equal(c.pendingRepairFollowup().milestone.id, closingIds[3], "Finishing one closure retains later work");
c.restoreRepairReturnView(progression.milestones.find((entry) => entry.id === closingIds[0]));
const continueQueue = calls.find((call) => call.type === "timer");
assert.ok(continueQueue, "After a closing, schedule the remaining saved followup");
continueQueue.callback();
assert.equal(calls.at(-1).type, "note");
calls.length = 0;
c.document.querySelector = () => ({});
assert.equal(c.resumePendingRepairFollowup(), true);
assert.equal(calls.length, 0, "Recovery cannot replace an open dialog");
s.currentPage = "board";
assert.equal(c.resumePendingRepairFollowup(), false);
assert.equal(fixture("lv2_front_feast").context.normalizePendingRepairFollowupIds(undefined).length, 0, "Do not replay earlier closings in legacy saves that moved on");
console.log("Story recovery passed: four chapter closures, atomic final payments, legacy saves, pending rewards, dialogue resume, finale, idempotency and dialog guards.");
