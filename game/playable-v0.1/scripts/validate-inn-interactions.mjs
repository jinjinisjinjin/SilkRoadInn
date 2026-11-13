import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { runInNewContext } from 'node:vm';
const root = resolve(import.meta.dirname, '..');
const source = readFileSync(resolve(root, 'app.js'), 'utf8');
function load(context, names, text = source) {
  for (const name of names) {
    const start = text.search(new RegExp(`(?:async )?function ${name}\\(`));
    assert.ok(start >= 0, name);
    runInNewContext(text.slice(start, text.indexOf('\n}', start) + 2), context);
  }
}

// A passive render must not replace the nodes owning the accepted interaction.
let rebuilt = 0, reset = 0, centered = 0;
const stop = new Error('scene rebuild reached');
const c = {
  activeLongscrollClueCamera: { map: { isConnected: true }, cancelled: false },
  resetLongscrollClueCamera() { reset++; },
  getMilestoneViews() { rebuilt++; throw stop; },
  LONGSCROLL_REGION_BOUNDS: { 1: [0, 0, 20, 20] },
  focusInnSceneOnPoint() { centered++; return true; },
};
load(c, ['renderInnScene', 'centerInnSceneOnPosition']);
for (let i = 0; i < 5; i++) c.renderInnScene();
assert.equal(rebuilt, 0); assert.equal(reset, 0);
assert.equal(c.centerInnSceneOnPosition([1]), false); assert.equal(centered, 0);
c.activeLongscrollClueCamera = null;
assert.throws(() => c.renderInnScene(), error => error === stop);
assert.equal(rebuilt, 1); assert.equal(reset, 1);
assert.equal(c.centerInnSceneOnPosition([1]), true);

// The delayed repair return is an actual race with the real clue transition.
let finish, renders = 0;
const r = {
  openRepairMilestoneId: 'kitchen', repairReturnCastMilestoneId: null,
  pendingRepairAfterStoryMilestoneId: null,
  state: { currentPage: 'inn' }, els: { repairPlayerLayer: {}, repairPlayerFrame: {}, historicalNoteModal: {} },
  setRepairOrientation: async () => {}, render() { renders++; }, centerInnSceneOnPosition() {},
  saveState() {}, playSfx() {}, playRepairCompleteEffect: () => 2200,
  setTimeout(callback) { finish = callback; }, historicalNoteForRepair: () => ({}),
  restoreRepairReturnView() { throw Error('Unexpected return transition'); }, activeLongscrollClueCamera: null,
};
load(r, ['closeRepairPlayer']);
await r.closeRepairPlayer({ id: 'kitchen' }, { completed: true });
r.activeLongscrollClueCamera = {}; finish(); assert.equal(renders, 1);
r.activeLongscrollClueCamera = null; finish(); assert.equal(renders, 2);
r.state.currentPage = 'board'; finish(); assert.equal(r.repairReturnCastMilestoneId, null);

const items = new Map([
  ['dough', { id: 'dough', name: '麦面剂', line: 'hubing', level: 1, mergeTo: 'bread' }],
  ['bread', { id: 'bread', name: '炉饼', line: 'hubing', level: 2 }],
]);
const orders = [{ id: 'meal', demand: [{ itemId: 'bread', quantity: 1 }] }];
const h = {
  state: { visibleOrders: ['meal'], revealedCells: [1], board: ['dough', null] }, byId: items,
  getOrder: id => orders.find(order => order.id === id), nextStoryOrderId: () => null,
  isBoardCellRevealed: index => index === 1, isBoardCellLocked: index => index === 1,
  lockedCellItemId: () => 'dough', countItem: id => h.state.board.filter(value => value === id).length,
};
load(h, ['fullBoardLockedMergeHint']);
assert.equal(h.fullBoardLockedMergeHint().resultName, '炉饼');
orders.push({ id: 'short', demand: [{ itemId: 'dough', quantity: 1 }] });
h.state.visibleOrders.push('short');
assert.equal(h.fullBoardLockedMergeHint(), null, 'Do not consume a portion reserved for a short order');
h.state.visibleOrders = ['meal']; h.state.revealedCells = [];
assert.equal(h.fullBoardLockedMergeHint(), null, 'Covered cells cannot be recommended');

const data = name => JSON.parse(readFileSync(resolve(root, 'data', name + '.json'), 'utf8'));
const actualItems = new Map(data('items').items.map(item => [item.id, item]));
const actualOrders = data('orders').orders;
const milk = {
  state: { innLevel: 2, board: ['dairy_01_milk'], generatorLineOrderCounts: { dairy: 4 }, visibleOrders: ['old_guest'], completedOrderIds: [], ordersConfig: { orders: actualOrders } },
  ownsGeneratorCategory: () => true, byId: actualItems,
  getOrder: id => actualOrders.find(order => order.id === id),
  isOrderEligible: order => !order.oneTime && !milk.state.visibleOrders.includes(order.id),
};
load(milk, ['syncMilkIntroductionOrder'], readFileSync(resolve(root, 'progression-help.js'), 'utf8'));
assert.equal(milk.syncMilkIntroductionOrder(), true);
assert.equal(milk.state.visibleOrders.length, 2); assert.ok(milk.state.visibleOrders.includes('old_guest'));
assert.equal(milk.syncMilkIntroductionOrder(), false, 'One milk guest suffices');
milk.state.visibleOrders = ['old_guest']; milk.state.innLevel = 3;
assert.equal(milk.syncMilkIntroductionOrder(), false, 'No forced milk slot in later chapters');
milk.state.innLevel = 2; milk.state.board = [];
assert.equal(milk.syncMilkIntroductionOrder(), false, 'Do not summon a guest without supply');
console.log('Inn interactions: passive redraw, delayed completion, navigation cancellation, useful locked-food hints and milk-service continuity passed.');
