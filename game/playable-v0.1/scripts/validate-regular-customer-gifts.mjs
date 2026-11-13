import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createContext, runInContext } from 'node:vm';
const root = resolve(import.meta.dirname, '..');
const read = name => JSON.parse(readFileSync(resolve(root, `data/${name}.json`), 'utf8'));
const app = readFileSync(resolve(root, 'app.js'), 'utf8');
const progression = read('progression'), orders = read('orders').orders;
const state = { progressionConfig: progression, ordersConfig: { orders }, generatorMaterialConfig: read('generator-materials'),
  claimedOrderProgressPacks: [], completedOrderIds: [], chapterOrderCounts: {}, visibleOrders: [], renovationChoices: {},
  regularCustomerGifts: { version: 1, assignment: null }, rewardItems: [], giftPacks: [], giftBoxStates: {}, storedGiftBoxStates: {}, board: [],
  coins: 0, coinsEarned: 0, completedOrders: 0, generatorLineOrderCounts: {}, tutorialStep: 3 };
const c = createContext({ state, byId: new Map(read('items').items.map(item => [item.id,item])), GIFT_PACKS: {},
  BONUS_COIN_PREFIX: 'bonus_coin_', BONUS_COIN_VALUES: [0,10,30,80,250],
  owned: new Set(['mill']), highestOwnedGeneratorLevel: id => c.owned.has(id) ? 3 : 0,
  isRepairCompleted: id => Boolean(state.renovationChoices[id]),
  orderDemandLinesUnlocked: order => order?.demand.every(d => c.byId.has(d.itemId)) && !c.blocked.has(order.id),
  blocked: new Set(), calculatedOrderCoinReward: order => order.demand.reduce((n,d) => n + 2 ** c.byId.get(d.itemId).level * d.quantity, 0),
});
function load(name) { const start=app.indexOf(`function ${name}(`); assert.ok(start>=0,name); runInContext(app.slice(start,app.indexOf('\n}',start)+2),c); }
for (const name of ['getOrder','generatorMaterialItemId','buildConfiguredGeneratorMaterialItems','bonusCoinId','coinRewardPieceIds','mappedGiftMaterialId','orderProgressGiftOutputs','grantRewardItem']) load(name);
for (let i=1;i<=4;i++) c.byId.set(c.bonusCoinId(i),{id:c.bonusCoinId(i),type:'bonus_coin'});
c.byId.set('bonus_ruby_01',{id:'bonus_ruby_01',type:'bonus_ruby'});
for (const item of c.buildConfiguredGeneratorMaterialItems(state.generatorMaterialConfig)) c.byId.set(item.id,item);
for (const pack of progression.orderProgressPacks) c.GIFT_PACKS[pack.id]={...pack,orderProgress:true,rewards:[{type:'coins',amount:pack.coinAmount},{type:'rubies',amount:pack.rubyQuantity},{type:'mapped_material',quantity:pack.materialQuantity}]};
runInContext(readFileSync(resolve(root,'regular-customer-gifts.js'),'utf8'),c);
const reset=()=> {Object.assign(state,{claimedOrderProgressPacks:[],completedOrderIds:[],chapterOrderCounts:{},visibleOrders:[],renovationChoices:{},regularCustomerGifts:{version:1,assignment:null},rewardItems:[],giftPacks:[],giftBoxStates:{},storedGiftBoxStates:{},completedOrders:0});c.owned=new Set(['mill']);c.blocked.clear();};
const json=value=>JSON.parse(JSON.stringify(value));
const first=progression.orderProgressPacks[0];
state.visibleOrders=['order_ch1_guide_mill_lubing'];
c.syncRegularCustomerGifts();assert.equal(state.regularCustomerGifts.assignment,null,'No early gift before serving a guest');
state.completedOrderIds=['order_001_guard_lubing'];
c.syncRegularCustomerGifts();assert.equal(state.regularCustomerGifts.assignment.packId,first.id);
const assigned=json(state.regularCustomerGifts);
state.visibleOrders.unshift('order_002_farmer_dough');
for(let i=0;i<20;i++){state.regularCustomerGifts=c.normalizeRegularCustomerGifts(json(state.regularCustomerGifts));c.syncRegularCustomerGifts();}
assert.deepEqual(json(state.regularCustomerGifts),assigned,'Refresh/cheaper arrivals never move a promised gift');
state.renovationChoices=Object.fromEntries(progression.milestones.map(m=>[m.id,'completed']));
c.owned=new Set(['mill','dairy','spice','fruit','drink','meat']);c.syncRegularCustomerGifts();
assert.deepEqual(json(state.regularCustomerGifts),assigned,'Cross-chapter progression retains the promise');
c.blocked.add(assigned.assignment.orderId);c.syncRegularCustomerGifts();assert.equal(state.regularCustomerGifts.assignment,null,'No inaccessible producer demand');
assert.equal(state.claimedOrderProgressPacks.length,0,'Unavailable guest does not discard reward');
c.blocked.clear();c.syncRegularCustomerGifts();assert.equal(state.regularCustomerGifts.assignment.packId,first.id);
// Verify the real delivery function, including demand consumption, reward/receipt
// persistence and a second rapid call for the same disappeared order.
Object.assign(c, { activeStoryChapter:()=>1,currentOrderCoinReward:()=>20,
 countItem:id=>state.board.filter(x=>x===id).length,
 removeItems:(id,n)=>{for(let i=0;i<n;i++)state.board[state.board.indexOf(id)]=null;},
 recordActivity(){},recordGeneratorOrderProgress(){},showCoinBurst(){},recordRecentOrder(){},recordCaravanRenownOrder(){},syncGeneratorProgressRewards(){},keeper(){},syncVisibleOrders(){},syncCaravanRenownOrders(){},render(){},toast(){},maybePromptRepairGuide(){},historicalNoteForOrder:()=>null,
 saveState:()=>{c.saved=json(state);},
 showRegularCustomerGiftReceived:pack=>{assert.ok(c.saved.claimedOrderProgressPacks.includes(pack.id),'Receipt saved before visual feedback');assert.deepEqual(c.saved.rewardItems,json(state.rewardItems),'Contents saved before visual feedback');},
 els:{orderDetailModal:{open:false}} });
load('completeOrder');
const id=assigned.assignment.orderId, order=c.getOrder(id);
state.board=Array(49).fill('bonus_ruby_01');let offset=0;for(const d of order.demand)for(let i=0;i<d.quantity;i++)state.board[offset++]=d.itemId;
const expected=c.orderProgressGiftOutputs(c.GIFT_PACKS[first.id]);
c.completeOrder(id);
assert.deepEqual(json(state.claimedOrderProgressPacks),[first.id]);assert.equal(state.rewardItems.reduce((n,e)=>n+e.quantity,0),expected.length);
assert.equal(state.coins,20);assert.equal(state.completedOrders,1);assert.equal(state.board.filter(x=>x===null).length,offset,'Only order foods leave a full board');
assert.deepEqual(c.saved.claimedOrderProgressPacks,[first.id]);assert.deepEqual(c.saved.rewardItems,json(state.rewardItems),'Contents and receipt saved together');
const afterDelivery=json(state);c.completeOrder(id);assert.deepEqual(json(state),afterDelivery,'Rapid duplicate delivery cannot pay twice');
assert.equal(c.grantRegularCustomerGift(first.id),false,'A claimed gift never pays again');
// Migration pays only already-earned unclaimed legacy gifts and preserves all
// held variants (bag, board, storage), even when their old receipt is missing.
reset();state.chapterOrderCounts={1:12,2:8};
const packs=progression.orderProgressPacks;
state.claimedOrderProgressPacks=[packs[0].id];state.giftPacks=[{id:packs[1].id,quantity:1}];state.giftBoxStates={4:{packId:packs[2].id}};state.storedGiftBoxStates={2:{packId:packs[3].id}};
c.migrateRegularCustomerGiftRewards();
assert.deepEqual(json(state.claimedOrderProgressPacks),packs.slice(0,5).map(p=>p.id));
assert.equal(state.rewardItems.reduce((n,e)=>n+e.quantity,0),c.orderProgressGiftOutputs(c.GIFT_PACKS[packs[4].id]).length);
const migrated=json(state);c.migrateRegularCustomerGiftRewards();assert.deepEqual(json(state),migrated,'Migration is idempotent');
// All 12 gifts: real occasion/ownership gates and exact original piece budget.
for(const pack of packs){
 reset();assert.equal(c.regularCustomerGiftReady(pack),false);
 if(pack.occasion.afterOrderId)state.completedOrderIds.push(pack.occasion.afterOrderId);
 if(pack.occasion.afterRepairId)state.renovationChoices[pack.occasion.afterRepairId]='completed';
 c.owned.clear();assert.equal(c.regularCustomerGiftReady(pack),false,'Unopened category receives no material');
 c.owned.add(pack.materialCategory);assert.equal(c.regularCustomerGiftReady(pack),true,pack.id);
 assert.equal(c.grantRegularCustomerGift(pack.id),true);
 const pieces=c.orderProgressGiftOutputs(c.GIFT_PACKS[pack.id]);
 const expanded=state.rewardItems.flatMap(e=>Array(e.quantity).fill(e.itemId));
 assert.deepEqual(expanded.sort(),Array.from(pieces).sort());
 assert.equal(c.regularCustomerGiftReady(pack),false);
}
const html=readFileSync(resolve(root,'index.html'),'utf8');
assert.ok(!html.includes('data-open-order-gifts')&&!html.includes('data-activity-mode'));
assert.ok(!app.includes('function claimOrderProgressPack('));
assert.ok(app.includes('regularCustomerGifts: state.regularCustomerGifts'));
console.log('Regular gifts: 12 occasions/budgets, producer gates, returning guests, sticky/reload/cross-chapter assignment, full-board actual delivery, duplicate protection, and all legacy inventory variants passed.');
