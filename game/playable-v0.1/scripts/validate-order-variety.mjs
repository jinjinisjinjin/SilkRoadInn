import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {createContext,runInContext} from 'node:vm';
const root=resolve(import.meta.dirname,'..');
const read=name=>JSON.parse(readFileSync(resolve(root,`data/${name}.json`),'utf8'));
const source=readFileSync(resolve(root,'app.js'),'utf8');
const orders=read('orders'),generators=read('generators'),economy=read('economy');
const byId=new Map(read('items').items.map(i=>[i.id,i]));
let roll=0,main=null,levels={mill:6,dairy:6,fruit:6,spice:6,drink:6,meat:6};
const math=Object.create(Math);math.random=()=>roll;
const c=createContext({Math:math,byId,isBoardCellLocked:()=>false,state:{ordersConfig:orders,generatorConfig:generators,economyConfig:economy,
 board:[],bag:[],completedOrders:0,innLevel:2,recentOrderIds:[],visibleOrders:[],completedOrderIds:[]},
 highestOwnedGeneratorLevel:id=>levels[id]??0,nextStoryOrderId:()=>main,
 getOrder:id=>orders.orders.find(o=>o.id===id)});
for(const name of ['normalizeRecentOrderIds','recordRecentOrder','progressedOrderCandidates','pickOrder','normalizeOrderArrivalSupport', 'observeOrderArrivalOwnership', 'createOrderArrivalSupportEvent', 'effectiveBoardItemCount', 'syncVisibleOrders']){
 const start=source.indexOf(`function ${name}(`),end=source.indexOf('\n}\n',start);
 assert.ok(start>=0&&end>start,`Missing ${name}`);runInContext(source.slice(start,end+2),c);
}
const config=orders.generationPolicy.progressedDemand;
assert.equal(config.minInnLevel,3);
assert.ok(config.preferenceChance>0&&config.preferenceChance<1);
assert.ok(config.repeatLookback>=1&&config.repeatLookback<=8);
const food=(id,level)=>({id,demand:[{itemId:read('items').items.find(i=>i.line==='hubing'&&i.level===level).id,quantity:1}]});
const small=food('small',2),medium=food('medium',4),large=food('large',5);
const ids=xs=>xs.map(x=>x.id).join(',');
const pool=[small,medium,large];
assert.equal(c.progressedOrderCandidates(pool),pool,'First volume keeps its original candidate list');
c.state.innLevel=6;c.state.recentOrderIds=['small'];
assert.equal(ids(c.progressedOrderCandidates(pool)),'large','Full mill grows preference to at least 12 food units');
roll=.999;
assert.equal(ids(c.progressedOrderCandidates(pool)),'medium,large','Shorter orders retain a chance; recent recipe still rotates');
c.state.recentOrderIds=[];
assert.equal(ids(c.progressedOrderCandidates(pool)),'small,medium,large');
roll=0;levels={mill:2};
assert.equal(ids(c.progressedOrderCandidates(pool)),'small,medium,large','New generator still supports small introductory demands');
levels={mill:6};
assert.equal(ids(c.progressedOrderCandidates([small])),'small','No eligible replacement must never empty the order pool');
c.state.recentOrderIds=['small'];
assert.equal(ids(c.progressedOrderCandidates([small])),'small','A recent recipe remains usable if it is the only candidate');
main='small';assert.ok(c.progressedOrderCandidates(pool).includes(small),'Main prerequisite cannot be filtered for size or recent history');main=null;
const guide={...small,oneTime:true},mastery={...small,generatorMasteryCategory:'mill'};
assert.ok(c.progressedOrderCandidates([guide,large]).includes(guide));
assert.ok(c.progressedOrderCandidates([mastery,large]).includes(mastery));
assert.equal(ids(c.normalizeRecentOrderIds(null)),'');
const known=orders.orders[0].id;
assert.equal(JSON.stringify(c.normalizeRecentOrderIds([null,123,'invalid',known])),JSON.stringify([known]));
for(let i=0;i<12;i++)c.recordRecentOrder(known);
assert.equal(c.state.recentOrderIds.length,8,'History is bounded');

// Selection must not bypass eligibility or replace already waiting guests.
Object.assign(c,{CARAVAN_RENOWN_QA_MODE:false,LV4_MARKET_ORDERS_QA_MODE:false,GENERATOR_ORDER_QA_MODE:false,
 isOrderEligible:(o,{ignoreVisible=false}={})=>Boolean(o)&&o.id===known&&(ignoreVisible||!c.state.visibleOrders.includes(o.id)),orderMatchesBand:()=>true,
 orderPricingBand:()=>({id:'quick'}),rollVisibleOrderTarget:()=>2,missingVisibleOrderBandId:()=>null});
c.state.visibleOrders=[known];c.state.recentOrderIds=[known];
c.syncVisibleOrders();
assert.equal(c.state.visibleOrders[0],known,'Old waiting order preserved');
assert.ok(c.state.visibleOrders.every(id=>id===known),'No unopened food enters through the fallback');
assert.match(source,/recentOrderIds: normalizeRecentOrderIds\(data\.recentOrderIds\)/,'Old-save migration must load an empty bounded history');
assert.match(source,/recentOrderIds: state\.recentOrderIds/,'History must persist across reload');
console.log('Order variety: first volume, gradual preference, small/new-line access, bounded saved history, safe fallback, waiting guests, eligibility and mastery/main exemptions passed.');
