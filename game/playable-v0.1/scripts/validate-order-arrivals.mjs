import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createContext, runInContext } from 'node:vm';

const root = resolve(import.meta.dirname, '..');
const source = readFileSync(resolve(root, 'app.js'), 'utf8');
const read = name => JSON.parse(readFileSync(resolve(root, `data/${name}.json`), 'utf8'));
const orders = read('orders'), generators = read('generators'), progression = read('progression');
let randomCalls = 0;
const math = Object.create(Math);
math.random = () => { randomCalls++; return .99; };
const c = createContext({ Math: math, byId: new Map(), isBoardCellLocked: () => false,
  CARAVAN_RENOWN_QA_MODE: false, LV4_MARKET_ORDERS_QA_MODE: false, GENERATOR_ORDER_QA_MODE: false,
  milestoneInnLevel: milestone => Number(milestone.innLevel) || 1,
  state: { ordersConfig: orders, economyConfig: read('economy'), generatorConfig: generators,
    progressionConfig: progression, generatorMaterialConfig: {}, board: ['gen_mill_05', 'gen_dairy_05', 'gen_spice_01'],
    bag: [], innLevel: 4, unlockedGeneratorCategories: ['mill', 'dairy', 'spice'],
    unlockedFoodLevels: { hubing: 5, dairy: 3, spice: 2 },
    completedOrders: 169, completedOrderIds: [], visibleOrders: [], recentOrderIds: [],
    unlockedCodex: new Set(), generatorLineOrderCounts: { mill: 100, dairy: 30, spice: 2 },
    renovationChoices: Object.fromEntries(progression.milestones.slice(0, 5).map(m => [m.id, 'completed'])),
  },
});
for (const name of ['generatorItemId', 'buildConfiguredGeneratorItems', 'migrateLegacyGeneratorId', 'isGeneratorPiece',
  'highestOwnedGeneratorLevel', 'orderUnlockConditionMet', 'orderDemandLinesUnlocked', 'orderProgressConditionsMet',
  'dairyIntroductionAllows', 'isOrderEligible', 'orderItemCoinValue', 'calculatedOrderCoinReward', 'orderPricingBand',
  'orderMatchesBand', 'rollVisibleOrderTarget', 'missingVisibleOrderBandId', 'nextStoryOrderId', 'normalizeOrderArrivalSupport', 'observeOrderArrivalOwnership', 'createOrderArrivalSupportEvent', 'effectiveBoardItemCount', 'syncVisibleOrders',
  'getOrder', 'progressedOrderCandidates', 'pickOrder']) {
  const start = source.indexOf(`function ${name}(`), end = source.indexOf('\n}\n', start);
  assert.ok(start >= 0 && end > start, name);
  runInContext(source.slice(start, end + 2), c);
}
c.byId = new Map([...read('items').items, ...c.buildConfiguredGeneratorItems(generators)].map(i => [i.id, i]));
const ids = () => Array.from(c.state.visibleOrders);
const waiting = ['order_exp_goal_001', 'order_007_persian_attendant_congchi',
  'order_exp_quick_007', 'order_019_sogdian_huma_laojiang'];
c.state.completedOrderIds = progression.milestones.slice(0, 6).flatMap(m => m.conditions.completedOrderIds ?? []);
c.state.visibleOrders = [...waiting];
for (const id of waiting) assert.equal(c.isOrderEligible(c.getOrder(id), { ignoreVisible: true, preserveExisting: true }), true, id);

// Reloading a sparse, valid queue must neither draw an arrival nor consume RNG.
for (let i = 0; i < 20; i++) c.syncVisibleOrders({ allowArrivals: false });
assert.deepEqual(ids(), waiting, 'Repeated load must retain the saved waiting queue exactly');
assert.equal(randomCalls, 0, 'Restoring a valid queue must not reroll arrivals');
c.state.ordersConfig = { ...orders, arrivalPolicy: { ...orders.arrivalPolicy, preserveWaitingGuests: false } };
c.syncVisibleOrders({ allowArrivals: false });
assert.deepEqual(ids(), waiting, 'Load restores saved guests even if gameplay replacement policy differs');
c.state.ordersConfig = orders;

// A delivery still opens arrivals and keeps the other waiting guests.
c.state.visibleOrders = waiting.slice(1);
c.syncVisibleOrders();
assert.ok(ids().length > 3, 'A gameplay event still refills');
assert.ok(waiting.slice(1).every(id => ids().includes(id)), 'Undelivered guests stay');
assert.ok(ids().every(id => c.isOrderEligible(c.getOrder(id), { ignoreVisible: true, preserveExisting: true })));
assert.equal(new Set(ids()).size, ids().length, 'No duplicate customers');

// Empty or invalid old saves recover once, then remain stable across reloads.
for (const broken of [[], ['missing-order-id']]) {
  c.state.visibleOrders = broken;
  c.syncVisibleOrders({ allowArrivals: false });
  assert.ok(ids().length > 0, 'Recover a playable queue');
  const repaired = ids(), calls = randomCalls;
  c.syncVisibleOrders({ allowArrivals: false });
  assert.deepEqual(ids(), repaired);
  assert.equal(randomCalls, calls);
}

// Restore may expose a missing, now-reachable main prerequisite, not random guests.
c.state.visibleOrders = waiting.slice(0, 1);
c.state.completedOrderIds = c.state.completedOrderIds.filter(id => id !== 'order_006_camel_worker_youhubing');
const beforeMainCalls = randomCalls;
c.syncVisibleOrders({ allowArrivals: false });
assert.deepEqual(ids(), ['order_006_camel_worker_youhubing', waiting[0]]);
assert.equal(randomCalls, beforeMainCalls);
c.syncVisibleOrders({ allowArrivals: false });
assert.equal(ids().filter(id => id === 'order_006_camel_worker_youhubing').length, 1);

// A newly introduced category remains eligible for the normal post-delivery arrival path.
c.state.completedOrderIds.push('order_006_camel_worker_youhubing');
c.state.visibleOrders = [...waiting];
c.state.ordersConfig = { ...orders, orders: orders.orders.filter(order => waiting.includes(order.id) || order.id === 'order_033_hubing_spice') };
c.syncVisibleOrders();
assert.ok(ids().includes('order_033_hubing_spice'), 'New spice introductory demand can still arrive after gameplay');

// New games get their initial batch; persisted games choose restoration.
assert.match(source, /syncVisibleOrders\(\{ allowArrivals: !saved \}\)/);
assert.match(source, /state\.visibleOrders = state\.visibleOrders\.filter\([\s\S]*?syncVisibleOrders\(\);/);
console.log('Order arrivals: stable reloads, no load RNG, delivery refill, preserved guests, empty/invalid saves, missing main, and new spice category passed.');

// Isolate the support event from random arrivals; retain real food eligibility.
const base = structuredClone(c.state);
base.ordersConfig = orders;
const actualPick = c.pickOrder;
c.rollVisibleOrderTarget = () => 2;
c.pickOrder = () => null;
const restore = () => {
  c.state = structuredClone(base);
  c.state.unlockedCodex = new Set(base.unlockedCodex);
  c.state.board = ['gen_mill_05', 'gen_dairy_05', 'gen_spice_01'];
  c.state.bag = [];
  c.state.visibleOrders = [...waiting];
  c.state.completedOrders = 200;
  c.state.orderArrivalSupport = c.normalizeOrderArrivalSupport(null, 200);
  c.observeOrderArrivalOwnership();
};
const deliver = id => {
  c.state.visibleOrders = c.state.visibleOrders.filter(x => x !== id);
  c.state.completedOrders++;
  c.syncVisibleOrders();
};
restore();
const untouched = JSON.stringify([c.state.board,c.state.coins,c.state.gems,c.state.stamina]);
const initialCalls = randomCalls;
for (let i=0;i<10;i++) c.syncVisibleOrders({allowArrivals:false});
assert.equal(c.state.orderArrivalSupport.shortDrought,0);
assert.equal(randomCalls,initialCalls);
deliver(waiting[2]);
assert.deepEqual(ids(),[waiting[0],waiting[1],waiting[3]],'First delivery alone does not force a refill');
assert.equal(c.state.orderArrivalSupport.shortDrought,1);
// A real serialization/load round trip retains the first missing short target.
c.state.orderArrivalSupport = c.normalizeOrderArrivalSupport(JSON.parse(JSON.stringify(c.state.orderArrivalSupport)),201);
c.syncVisibleOrders({allowArrivals:false});
assert.equal(c.state.orderArrivalSupport.shortDrought,1);
deliver(waiting[3]);
const shortId = ids().find(id=>!waiting.includes(id));
assert.ok(shortId,'Second delivery offers a short target even without a normal arrival slot');
const cost = order => order.demand.reduce((n,d)=>n+d.quantity*2**(c.byId.get(d.itemId).level-1),0);
assert.ok(cost(c.getOrder(shortId))>=2&&cost(c.getOrder(shortId))<=4);
assert.ok(c.getOrder(shortId).demand.every(d=>c.byId.get(d.itemId).line!=='dairy'));
assert.equal(c.state.orderArrivalSupport.lastProtectedOrder,202);
assert.equal(JSON.stringify([c.state.board,c.state.coins,c.state.gems,c.state.stamina]),untouched);
// No further protection until four more delivery events, even if the queue dries up.
for(let count=203;count<=206;count++) {
  c.state.visibleOrders=[waiting[0],waiting[1],waiting[2]];
  deliver(waiting[2]);
  assert.equal(ids().length,count===206?3:2,`Cooldown at delivery ${count}`);
}
assert.equal(c.state.orderArrivalSupport.lastProtectedOrder,206);
const savedGuests=ids(),savedCounter=JSON.stringify(c.state.orderArrivalSupport),savedCalls=randomCalls;
for(let i=0;i<10;i++){c.observeOrderArrivalOwnership();c.syncVisibleOrders({allowArrivals:false});}
assert.deepEqual(ids(),savedGuests);assert.equal(JSON.stringify(c.state.orderArrivalSupport),savedCounter);assert.equal(randomCalls,savedCalls);

// Ready stock and correctly mergeable milk are short targets; higher milk cannot be split.
for(const [stock,expectSupport] of [
  [['hubing_05_youhubing','hubing_05_youhubing','hubing_05_youhubing'],false],
  [[],true],
]) {
  restore();
  // Use the actual long recipe's item ID, independent of naming conventions.
  if(stock.length)for(const d of c.getOrder(waiting[0]).demand)c.state.board.push(...Array(d.quantity).fill(d.itemId));
  c.state.visibleOrders=waiting.slice(0,2);c.state.orderArrivalSupport.shortDrought=1;
  deliver('hypothetical-removed-guest');
  assert.equal(ids().length,expectSupport?3:2,'Ready expensive food suppresses unnecessary short support');
}
const milk = level => [...c.byId.values()].find(i=>i.line==='dairy'&&i.level===level).id;
const milkOrder={id:'milk-check',npcId:'milk-check',weight:1,demand:[{itemId:milk(1),quantity:1},{itemId:milk(2),quantity:1}]};
for(const [stock,expectSupport] of [ [[milk(3)],true], [[milk(1),milk(1)],true], [[milk(1),milk(1),milk(1)],false], [[milk(1),milk(2)],false] ]) {
  restore();c.state.ordersConfig={...orders,orders:[...orders.orders,milkOrder]};
  c.state.board.push(...stock);c.state.visibleOrders=[waiting[0],milkOrder.id];
  // This synthetic recipe has no unlock metadata; assess the event before queue filtering.
  c.state.orderArrivalSupport.shortDrought=1;c.state.completedOrders++;
  const event=c.createOrderArrivalSupportEvent();
  assert.equal(Boolean(event.pick({force:true})),expectSupport,`Exact dairy inventory ${stock}`);
}
restore();c.state.visibleOrders=waiting.slice(0,2);c.state.orderArrivalSupport.shortDrought=1;
for(const d of c.getOrder(waiting[0]).demand)c.state.bag.push(...Array(d.quantity).fill(d.itemId));
c.state.completedOrders++;assert.equal(c.createOrderArrivalSupportEvent().pick({force:true}),null,'Retrievable bag food is usable');
// Locked board food is excluded; unclaimed reward bag is not available inventory.
c.state.rewardBag=[...c.state.bag];c.state.board.push(...c.state.bag);c.state.bag=[];
c.isBoardCellLocked=index=>index>=3;
assert.ok(c.createOrderArrivalSupportEvent().pick({force:true}));c.isBoardCellLocked=()=>false;

// Owned new categories get a <=Lv2 guide within two deliveries, at most one per event.
restore();c.state.board.push('gen_fruit_01');c.state.unlockedGeneratorCategories.push('fruit');
c.state.generatorLineOrderCounts.fruit=0;c.observeOrderArrivalOwnership();
deliver(waiting[2]);assert.ok(!ids().some(id=>c.getOrder(id).guideGeneratorCategory==='fruit'));
c.state.orderArrivalSupport=c.normalizeOrderArrivalSupport(JSON.parse(JSON.stringify(c.state.orderArrivalSupport)),201);
c.syncVisibleOrders({allowArrivals:false});deliver(waiting[3]);
assert.equal(ids().length,3);
const guide=ids().map(c.getOrder).find(o=>o.guideGeneratorCategory==='fruit');assert.ok(guide);
assert.ok(guide.demand.every(d=>c.byId.get(d.itemId).level<=2));
assert.equal(c.state.orderArrivalSupport.acquiredAtOrders.fruit,200);
// A normal arrival slot uses introduction priority immediately, without a forced duplicate.
restore();c.state.board.push('gen_fruit_01');c.state.unlockedGeneratorCategories.push('fruit');
c.state.visibleOrders=[waiting[0]];c.syncVisibleOrders();
assert.equal(ids().length,2);assert.ok(ids().map(c.getOrder).some(o=>o.guideGeneratorCategory==='fruit'));
// No generator, no guide, including a stale acquisition record after generator removal.
restore();c.state.orderArrivalSupport.acquiredAtOrders.fruit=0;c.state.orderArrivalSupport.shortDrought=1;
c.state.completedOrders++;c.syncVisibleOrders();assert.ok(!ids().map(c.getOrder).some(o=>o.guideGeneratorCategory==='fruit'));
// A full legal queue must not be displaced or exceed its capacity.
restore();c.state.visibleOrders=[];
c.state.visibleOrders=orders.orders.filter(o=>c.isOrderEligible(o)).slice(0,7).map(o=>o.id);
const full=ids();assert.equal(full.length,7);c.state.orderArrivalSupport.shortDrought=2;c.state.completedOrders+=2;c.syncVisibleOrders();
assert.deepEqual(ids(),full);
// Legacy or damaged counters migrate at the current order count, not at day zero.
const legacy=c.normalizeOrderArrivalSupport(undefined,250);
assert.equal(legacy.lastCompletedOrders,250);assert.equal(legacy.shortDrought,0);assert.equal(legacy.lastProtectedOrder,null);
const corrupt=c.normalizeOrderArrivalSupport({schemaVersion:1,lastCompletedOrders:999,shortDrought:-1,lastProtectedOrder:'2',acquiredAtOrders:{fruit:999,meat:2,unknown:1}},250);
assert.equal(corrupt.lastCompletedOrders,250);assert.equal(corrupt.shortDrought,0);assert.equal(corrupt.lastProtectedOrder,null);
assert.equal(JSON.stringify(corrupt.acquiredAtOrders),'{"meat":2}');
assert.match(source,/orderArrivalSupport: normalizeOrderArrivalSupport\(data.orderArrivalSupport, data.completedOrders\)/);
assert.match(source,/orderArrivalSupport: state.orderArrivalSupport/);
c.pickOrder=actualPick;
console.log('Bounded support: saved counters, legacy migration, second-delivery fallback, four-delivery cooldown, exact milk levels, usable bag/locked stock, new-category priority, eligibility and full queue passed.');

// A current repair exposes its recipe before discovery, but never before its producer is capable.
restore();
c.state.renovationChoices=Object.fromEntries(progression.milestones.slice(0,3).map(m=>[m.id,'completed']));
c.state.completedOrderIds=progression.milestones.slice(0,3).flatMap(m=>m.conditions.completedOrderIds??[]);
c.state.innLevel=3;c.state.unlockedFoodLevels.hubing=3;
const story=c.getOrder('order_014_musician_youhubing');
assert.equal(c.nextStoryOrderId(),story.id);
assert.equal(c.orderDemandLinesUnlocked(story),true,'Current oil bread recipe is visible before discovery');
assert.equal(c.orderDemandLinesUnlocked({...story,id:'ordinary-oil-bread'}),false,'Ordinary discovery gate remains');
c.state.board=c.state.board.filter(id=>!id.startsWith('gen_mill_'));
assert.equal(c.orderDemandLinesUnlocked(story),false,'No inaccessible producer');
c.state.board.push('gen_mill_01');assert.equal(c.orderDemandLinesUnlocked(story),false,'Producer level remains required');
c.state.board[c.state.board.length-1]='gen_mill_05';
c.state.visibleOrders=[];c.syncVisibleOrders({allowArrivals:false});assert.ok(ids().includes(story.id));

// Every existing guest waits for missing milk: rescue without an extra delivery or refresh farming.
restore();
const milkGuests=orders.orders.filter(order=>c.isOrderEligible(order)&&order.demand.some(d=>c.byId.get(d.itemId).line==='dairy')).slice(0,3).map(o=>o.id);
assert.equal(milkGuests.length,3);
c.state.visibleOrders=milkGuests;c.state.orderArrivalSupport.lastProtectedOrder=c.state.completedOrders;
const rescueCalls=randomCalls;
c.syncVisibleOrders({allowArrivals:false});
const rescued=ids();assert.equal(rescued.length,4);assert.ok(milkGuests.every(id=>rescued.includes(id)));
const rescuedOrder=c.getOrder(rescued.find(id=>!milkGuests.includes(id)));
assert.ok(rescuedOrder.demand.every(d=>c.byId.get(d.itemId).line!=='dairy'));
assert.ok(cost(rescuedOrder)>=2&&cost(rescuedOrder)<=4);
for(let i=0;i<10;i++)c.syncVisibleOrders({allowArrivals:false});
assert.deepEqual(ids(),rescued);assert.equal(randomCalls,rescueCalls,'Reload adds no random guests');
restore();c.state.visibleOrders=milkGuests;
for(const d of c.getOrder(milkGuests[0]).demand) if(c.byId.get(d.itemId).line==='dairy') c.state.bag.push(...Array(d.quantity).fill(d.itemId));
c.syncVisibleOrders({allowArrivals:false});assert.deepEqual(ids(),milkGuests,'Usable warehouse milk suppresses rescue');
// The exceptional all-milk recovery preserves even a full queue. One extra
// manual order is allowed; repeated loads cannot keep growing the queue.
restore();
const fullMilkQueue=orders.orders.filter(order=>c.isOrderEligible(order)
  &&order.demand.some(d=>c.byId.get(d.itemId).line==='dairy')).slice(0,7).map(o=>o.id);
assert.equal(fullMilkQueue.length,7);
c.state.visibleOrders=fullMilkQueue;
c.syncVisibleOrders({allowArrivals:false});
const fullMilkRescued=ids();assert.equal(fullMilkRescued.length,8);
assert.ok(fullMilkQueue.every(id=>fullMilkRescued.includes(id)));
for(let i=0;i<10;i++)c.syncVisibleOrders({allowArrivals:false});
assert.deepEqual(ids(),fullMilkRescued,'Only one exceptional manual slot');
console.log('Integration: current repair discovery exception with producer gates, deterministic milk rescue, preserved guests and no refresh farming passed.');
