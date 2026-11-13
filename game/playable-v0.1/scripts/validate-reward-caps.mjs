import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {runInNewContext} from 'node:vm';
const root=resolve(import.meta.dirname,'..');
const data=name=>JSON.parse(readFileSync(resolve(root,`data/${name}.json`),'utf8'));
const app=readFileSync(resolve(root,'app.js'),'utf8');
const items=data('items').items, byId=new Map(items.map(item=>[item.id,item]));
const generators=data('generators'),economy=data('economy');
let level=1;
const state={generatorConfig:generators,economyConfig:economy,unlockedGeneratorCategories:['mill'],unlockedFoodLevels:{hubing:8},visibleOrders:[],weeklyCheckinRound:1,weeklyCheckinClaimedDays:0,weeklyCheckinRewardReceipts:{}};
const c={state,byId,highestOwnedGeneratorLevel:()=>level,foodItemsForLine:line=>items.filter(item=>item.line===line).sort((a,b)=>a.level-b.level),unlockedFoodLevel:line=>state.unlockedFoodLevels[line]??0,getOrder:()=>null,countItem:()=>0,
 foodLineMaxLevels:new Map(generators.categories.map(cat=>[cat.foodLineId,8])),GIFT_PACKS:{},DAILY_POUCH_PACK_ID:'daily',CARAVAN_RENOWN_REWARD_MIN:4,CARAVAN_RENOWN_REWARD_MAX:9,CARAVAN_RENOWN_MAX_DEMAND_PROGRESS:.5};
runInNewContext(readFileSync(resolve(root,'activity-ui.js'),'utf8'),c);
runInNewContext(readFileSync(resolve(root,'progression-help.js'),'utf8'),c);
runInNewContext(app.slice(app.indexOf('const WEEKLY_CHECKIN_REWARDS ='),app.indexOf('const DAILY_POUCH_REWARD_POOL =')).replace('const WEEKLY_CHECKIN_REWARDS','var WEEKLY_CHECKIN_REWARDS'),c);
function load(name){const start=app.indexOf(`function ${name}(`);assert.ok(start>=0,name);runInNewContext(app.slice(start,app.indexOf('\n}',start)+2),c);}
for(const name of ['orderItemCoinValue','historicalRewardFoodId','randomIntegerInclusive','shuffleCaravanRenownRewards','caravanRenownUnlockedFoodLines','caravanRenownRewardLevelCeiling','caravanRenownRewardDemandCandidates','caravanRenownDemandSelectionCount','caravanRenownRewardPlan','allocateCaravanRenownRewardCounts','buildCaravanRenownPlanItems','buildCaravanRenownRewardItems'])load(name);
for(level=1;level<=6;level++)for(const category of generators.categories){
 state.unlockedGeneratorCategories=[category.id];state.unlockedFoodLevels={[category.foodLineId]:8};
 for(let requested=1;requested<=8;requested++){
  const item=c.usefulRewardFood(requested);
  assert.equal(item.line,category.foodLineId);assert.ok(item.level<=economy.orderPricing.availability.maxDemandLevelByGeneratorLevel[level]);assert.ok(item.level<=requested);
  assert.equal(byId.get(c.historicalRewardFoodId(requested)).line,category.foodLineId);
 }
}
level=1;state.unlockedGeneratorCategories=['mill'];state.unlockedFoodLevels={hubing:3};
for(const day of [1,4]){
 const reward=c.weeklyRewardForDay(day);assert.ok(reward.items.every(entry=>byId.get(entry.itemId).level<=3));
 const actual=reward.items.reduce((sum,e)=>sum+c.orderItemCoinValue(e.itemId)*e.quantity,0)+reward.coins;
 const expected=c.WEEKLY_CHECKIN_REWARDS[day].items.reduce((sum,e)=>sum+c.orderItemCoinValue(e.itemId)*e.quantity,0);
 assert.equal(actual,expected,'Food cap preserves coin budget');
 state.weeklyCheckinRewardReceipts[`1:${day}`]=reward;level=6;assert.equal(c.weeklyRewardForDay(day),reward,'Receipts retain original reward');level=1;
}
const tiny={id:'tiny',demand:[{itemId:'hubing_01_dough',quantity:1}]};c.getOrder=id=>id==='tiny'?tiny:null;
for(const visible of [[],['tiny']]){state.visibleOrders=visible;for(let i=0;i<100;i++){
 const reward=c.buildCaravanRenownRewardItems();const value=reward.reduce((sum,id)=>sum+2**(byId.get(id).level-1),0);
 assert.ok(value>=8&&value<=16,`Renown base value ${value}`);assert.ok(reward.length<=9);assert.ok(reward.every(id=>byId.get(id).line==='hubing'&&byId.get(id).level<=3));
}}
console.log('Rewards: six lines × six generator levels, weekly value/receipts, and renown 8–16 base-unit floor passed.');
