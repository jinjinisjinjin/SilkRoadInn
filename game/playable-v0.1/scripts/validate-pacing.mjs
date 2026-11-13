import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {createContext,runInContext} from 'node:vm';
const root=resolve(import.meta.dirname,'..');
const read=name=>JSON.parse(readFileSync(resolve(root,'data/'+name+'.json'),'utf8'));
const app=readFileSync(resolve(root,'app.js'),'utf8');
const orders=read('orders').orders, progression=read('progression'), items=new Map(read('items').items.map(i=>[i.id,i]));
const state={completedOrderIds:[],generatorLineOrderCounts:{dairy:0},visibleOrders:[]};
const c=createContext({state,Number,calculatedOrderCoinReward:o=>o.reward.coins});
for(const name of ['currentOrderCoinReward','dairyIntroductionAllows']){
 const start=app.indexOf('function '+name+'('),end=app.indexOf('\n}',start)+2;runInContext(app.slice(start,end),c);
}
for(const id of ['order_008_uighur_yangrou','order_009_mystery_suibing','order_010_caravan_gulouzi']){
 const o=orders.find(o=>o.id===id);assert.equal(c.currentOrderCoinReward(o),o.reward.coins+o.reward.firstClearBonusCoins);
 state.completedOrderIds.push(id);assert.equal(c.currentOrderCoinReward(o),o.reward.coins,'Reload/second clear cannot repeat a bonus');
}
const guides=orders.filter(o=>o.id.startsWith('order_ch1_guide_dairy_'));
assert.equal(guides.length,4);assert.equal(guides.reduce((sum,o)=>sum+o.demand.reduce((s,d)=>s+d.quantity*2**(items.get(d.itemId).level-1),0),0),6,'Four milk lessons fit the first six-output batch');
for(const o of guides)assert.equal(c.dairyIntroductionAllows(o),true);
const regular=orders.find(o=>o.requiredGeneratorCategories?.includes('dairy')&&!o.id.startsWith('order_ch1_guide_dairy_'));
assert.equal(c.dairyIntroductionAllows(regular),false);
state.visibleOrders=[regular.id];assert.equal(c.dairyIntroductionAllows(regular),true,'Existing waiting guest must remain');
state.visibleOrders=[];state.generatorLineOrderCounts.dairy=4;assert.equal(c.dairyIntroductionAllows(regular),true);
assert.deepEqual(progression.milestones.slice(0,3).map(m=>m.repairCost),[480,810,1080]);
assert.equal(progression.milestones[0].rewards.giftPacks[0].id,'gift_dairy_opening_01');
assert.equal(progression.milestones[1].rewards.giftPacks,undefined,'Second repair must not duplicate first milk room');
runInContext(readFileSync(resolve(root,'seven-day-activity.js'),'utf8'),c);
const merges=c.SilkRoadActivity.days.flatMap(d=>d.tasks).filter(t=>t.metric==='merges').map(t=>t.target);
assert.deepEqual([...merges],[6,16,30,80,120]);
assert.ok(120<7*(100/4-1),'Final raw merge goal fits under one 100-energy ×4 session per day (not a simulated completion claim)');
const help=readFileSync(resolve(root,'progression-help.js'),'utf8');
const start=help.indexOf('function syncMilkIntroductionOrder('),end=help.indexOf('\n}',start)+2;
Object.assign(c,{ownsGeneratorCategory:()=>true,isOrderEligible:()=>true});state.ordersConfig={orders};state.generatorLineOrderCounts.dairy=0;state.visibleOrders=['existing_guest'];state.completedOrderIds=[];
runInContext(help.slice(start,end),c);assert.equal(c.syncMilkIntroductionOrder(),true);assert.equal(state.visibleOrders[0],guides[0].id);assert.ok(state.visibleOrders.includes('existing_guest'));assert.equal(c.syncMilkIntroductionOrder(),false);
state.completedOrderIds.push(guides[0].id);c.syncMilkIntroductionOrder();assert.equal(state.visibleOrders[0],guides[1].id,'Next lesson appears without discarding waiting orders');
console.log('Pacing: real part totals, first milk supply, four lessons/six milk, existing guest preservation, one-time main bonuses and activity effort envelope passed.');
