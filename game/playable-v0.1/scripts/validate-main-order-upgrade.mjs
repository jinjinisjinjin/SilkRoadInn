import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createContext, runInContext } from 'node:vm';
const root = resolve(import.meta.dirname, '..');
const read = name => JSON.parse(readFileSync(resolve(root, `data/${name}.json`), 'utf8'));
const app = readFileSync(resolve(root, 'app.js'), 'utf8');
const generators = read('generators'), progression = read('progression');
const math = Object.create(Math); math.random = () => .5;
const c = createContext({ Math: math, byId: new Map(), state: {
  generatorConfig: generators, generatorMaterialConfig: {}, economyConfig: read('economy'),
  progressionConfig: progression, ordersConfig: read('orders'),
  board: ['gen_mill_05'], bag: [], innLevel: 6,
  unlockedGeneratorCategories: ['mill'], unlockedFoodLevels: { hubing: 7 },
  unlockedCodex: new Set(), generatorLineOrderCounts: { mill: 80 },
  completedOrderIds: progression.milestones.slice(0, 9).flatMap(m => m.conditions.completedOrderIds ?? []),
  renovationChoices: Object.fromEntries(progression.milestones.slice(0, 9).map(m => [m.id, 'completed'])),
  visibleOrders: [],
}, milestoneInnLevel: m => m.innLevel });
for (const name of ['generatorItemId', 'buildConfiguredGeneratorItems', 'migrateLegacyGeneratorId', 'isGeneratorPiece',
  'highestOwnedGeneratorLevel', 'orderUnlockConditionMet', 'orderDemandLinesUnlocked', 'orderProgressConditionsMet',
  'dairyIntroductionAllows', 'isOrderEligible', 'orderItemCoinValue', 'calculatedOrderCoinReward',
  'orderPricingBand', 'orderMatchesBand', 'getOrder', 'nextStoryOrderId', 'progressedOrderCandidates', 'pickOrder']) {
  const start = app.indexOf(`function ${name}(`), end = app.indexOf('\n}\n', start);
  assert.ok(start >= 0 && end > start, name); runInContext(app.slice(start, end + 2), c);
}
c.byId = new Map([...read('items').items, ...c.buildConfiguredGeneratorItems(generators)].map(item => [item.id, item]));
const main = c.getOrder('order_010_caravan_gulouzi'), mastery = c.getOrder('order_mastery_mill');
assert.equal(c.nextStoryOrderId(), main.id);
assert.equal(c.orderDemandLinesUnlocked(main), false, 'Lv8 requires the missing Lv6 generator');
assert.equal(c.isOrderEligible(mastery), true, 'Lv5 mill with 80 line orders can serve mastery');
assert.equal(c.pickOrder('goal')?.id, mastery.id, 'Reserved Lv8 main order must allow the mastery order needed to upgrade its generator');

// Keep the existing single-high-order limit; a waiting high guest must not
// cause another high random order to be added alongside it.
c.state.visibleOrders = ['order_009_mystery_suibing'];
assert.ok(c.pickOrder('goal').demand.every(x => c.byId.get(x.itemId).level < 5));
c.state.visibleOrders = [];
c.state.board = ['gen_mill_06']; c.state.unlockedFoodLevels.hubing = 8;
assert.equal(c.orderDemandLinesUnlocked(main), true);
assert.notEqual(c.pickOrder('goal')?.id, mastery.id, 'Once the generator can make the main item, do not treat mastery as its prerequisite');
c.state.board = ['gen_mill_05']; c.state.unlockedFoodLevels.hubing = 7;
c.state.completedOrderIds.push(mastery.id);
assert.equal(c.isOrderEligible(mastery), false, 'The one-time mastery order cannot repeat');
console.log('Main-order upgrade: prerequisite mastery can appear, existing high-order limit remains, reachable main retains priority, mastery cannot repeat.');
