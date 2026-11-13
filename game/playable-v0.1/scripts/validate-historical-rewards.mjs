import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";

const root = resolve(import.meta.dirname, "..");
const source = readFileSync(resolve(root, "app.js"), "utf8");
const byId = new Map(JSON.parse(readFileSync(resolve(root, "data/items.json"), "utf8")).items
  .map((item) => [item.id, item]));
const note = { id: "reward-test", answerIndex: 2 };
const clone = (value) => JSON.parse(JSON.stringify(value));
const functions = [
  "normalizeHistoricalNoteRewards", "weightedHistoricalReward", "createHistoricalNoteReward",
  "revealHistoricalNoteRewardBag", "grantRewardItem",
  "bonusCoinId", "registerBonusCoinItems",
].map((name) => {
  const start = source.indexOf(`\nfunction ${name}(`);
  assert.notEqual(start, -1, `Missing production function ${name}`);
  const end = source.indexOf("\n}", start) + 2;
  return source.slice(start + 1, end);
}).join("\n");

function fixture() {
  const state = { historicalNoteRewards: {}, rewardItems: [] };
  const saves = [];
  const context = {
    state, byId, HISTORICAL_NOTES: [note], HISTORICAL_REWARD_SCHEMA_VERSION: 2,
    SPLITTER_TOOL_ITEM_ID: "tool_splitter_scissors", UPGRADE_TOOL_ITEM_ID: "tool_baiwei_jinjian",
    BONUS_RUBY_PREFIX: "bonus_ruby_",
    historicalRewardFoodId: () => "hubing_03_humabing",
    Math: Object.assign(Object.create(Math), { random: () => 0 }),
    historicalRewardAnimationRun: 1,
    setTimeout() {}, renderBagButton() {},
    saveState: () => saves.push(clone(state)),
  };
  const coinConstants = ["BONUS_COIN_PREFIX", "BONUS_COIN_MAX_LEVEL", "BONUS_COIN_VALUES"]
    .map((name) => source.match(new RegExp(`const ${name} = [^;]+;`))[0]).join("\n");
  runInNewContext(coinConstants + "\n" + functions, context);
  context.registerBonusCoinItems();
  return { context, state, saves };
}

let cases = 0;
for (const thirdItem of [false, true]) {
  for (const [splitter, upgrade] of [[false, false], [true, false], [false, true], [true, true]]) {
    const { context: c } = fixture();
    c.Math.random = () => thirdItem ? 0 : 0.99;
    const original = clone(c.createHistoricalNoteReward(note, note.answerIndex, splitter, upgrade));
    assert.equal(original.bags[1].length, 2 + Number(thirdItem) + Number(splitter) + Number(upgrade));
    for (const opened of [[], [0], [0, 1]]) {
      const { context: recovery, state, saves } = fixture();
      const expected = {};
      original.itemIds.forEach((id) => { expected[id] = (expected[id] ?? 0) + 1; });
      const claimed = opened.length === 2;
      const stored = { ...clone(original), openedBagIndexes: opened, claimed };
      if (claimed) state.rewardItems = Object.entries(expected).map(([itemId, quantity]) => ({ itemId, quantity }));
      for (let load = 0; load < 3; load += 1) {
        state.historicalNoteRewards = recovery.normalizeHistoricalNoteRewards({ [note.id]: clone(stored) });
        assert.deepEqual(clone(state.historicalNoteRewards[note.id]), stored, "Reload must preserve every generated reward, quantity and claim state");
      }
      const bagNode = { classList: { add() {} } };
      recovery.revealHistoricalNoteRewardBag(note, 1, bagNode, 0);
      assert.equal(saves.length, 0, "A stale animation cannot grant or save rewards");
      for (let bag = 0; bag < original.bags.length; bag += 1) {
        recovery.revealHistoricalNoteRewardBag(note, bag, bagNode, 1);
        recovery.revealHistoricalNoteRewardBag(note, bag, bagNode, 1);
        const checkpoint = clone(state);
        state.historicalNoteRewards = recovery.normalizeHistoricalNoteRewards(checkpoint.historicalNoteRewards);
        if (bag === 0 && !claimed) assert.equal(state.rewardItems.length, 0, "Partial opening does not grant before the final bag");
      }
      assert.equal(state.historicalNoteRewards[note.id].claimed, true);
      assert.deepEqual(Object.fromEntries(state.rewardItems.map(({ itemId, quantity }) => [itemId, quantity])), expected,
        "Interrupted or repeated opening must grant all foods and tools exactly once");
      const final = clone(state);
      state.historicalNoteRewards = recovery.normalizeHistoricalNoteRewards(final.historicalNoteRewards);
      recovery.revealHistoricalNoteRewardBag(note, 1, bagNode, 1);
      assert.deepEqual(clone(state), final, "Reopening a claimed reward cannot duplicate it");
      for (const save of saves) {
        assert.equal(save.historicalNoteRewards[note.id].claimed, save.rewardItems.length > 0,
          "Receipt and inventory must be saved together");
      }
      cases += 1;
    }
  }
}

const { context: c } = fixture();
const longReward = clone(c.createHistoricalNoteReward(note, 2, true, true));
const legacy = c.normalizeHistoricalNoteRewards({ [note.id]: { itemIds: longReward.itemIds, claimed: true } })[note.id];
assert.deepEqual(clone(legacy.itemIds), longReward.itemIds, "Legacy flat receipts must retain all rewards too");
assert.equal(legacy.claimed, true, "Legacy claimed receipts stay claimed");
const incorrect = clone(c.createHistoricalNoteReward(note, 0, true, true));
assert.equal(incorrect.bags.length, 1);
assert.ok(incorrect.itemIds.every((id) => !id.startsWith("tool_")), "Incorrect answers keep the existing consolation reward");
assert.deepEqual(clone(c.normalizeHistoricalNoteRewards({ [note.id]: incorrect })[note.id]), incorrect);
const filtered = c.normalizeHistoricalNoteRewards({
  unknown: longReward,
  [note.id]: { ...longReward, bags: longReward.bags.map((bag) => [...bag, null, 42, {}]), openedBagIndexes: [0, 0, 9, -1] },
});
assert.equal(filtered.unknown, undefined);
assert.deepEqual(clone(filtered[note.id].itemIds), longReward.itemIds, "Filtering malformed entries must not truncate valid ones");
assert.deepEqual(clone(filtered[note.id].openedBagIndexes), [0]);
console.log(`Historical rewards passed: ${cases} generated reward/reload/claim scenarios, 2-5 items per bag, both tools, legacy receipts, duplicate and stale callbacks.`);
