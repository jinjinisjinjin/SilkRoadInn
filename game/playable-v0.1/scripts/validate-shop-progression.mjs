import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {runInNewContext} from 'node:vm';
const source=readFileSync(new URL('../app.js',import.meta.url),'utf8');
const lines=['hubing','dairy','fruit','drink','meat','spice'];
const items=lines.flatMap(line=>Array.from({length:7},(_,i)=>({id:`${line}_${i+2}`,line,level:i+2})));
const state={shopUnlocked:false,completedOrders:0,repairProgress:{},renovationChoices:{},unlockedGeneratorCategories:['hubing'],known:3,shopFoodItemIds:null,shopPurchasedOfferIds:[]};
state.generatorConfig={categories:lines.map(line=>({id:line,foodLineId:line}))};
const c={state,Date,Math,Set,Number,DAILY_SHOP_QA_MODE:false,STORY_ARCHIVE_QA_MODE:false,DAILY_SHOP_QA_EMPTY:false,FIRST_TUTORIAL_REPAIR_ID:'first',byId:new Map(items.map(x=>[x.id,x])),highestOwnedGeneratorLevel:id=>state.unlockedGeneratorCategories.includes(id)?1:0,orderDemandLinesUnlocked:o=>o.demand.every(d=>{const x=c.byId.get(d.itemId);return state.unlockedGeneratorCategories.includes(x.line)&&x.level<=state.known;})};
runInNewContext(source.match(/const SHOP_FOOD_PRICES = .*;/)[0],c);
for(const name of ['currentLocalDayKey','currentDailyShopCycle','nextDailyShopRefreshAt','isDailyShopUnlocked','dailyShopFoodLimit','shopFoodCandidates','normalizeShopCycle','syncDailyShopCycle']){
 const start=source.indexOf(`function ${name}(`);assert.ok(start>=0);runInNewContext(source.slice(start,source.indexOf('\n}',start)+2),c);
}
const prices=runInNewContext('SHOP_FOOD_PRICES',c);
const energy=JSON.parse(readFileSync(new URL('../data/economy.json',import.meta.url),'utf8')).premiumCurrency.staminaPurchase;
for(let lv=2;lv<=8;lv++)assert.equal(prices[lv],Math.max(1,Math.ceil(2**(lv-1)*energy.firstPrice/energy.staminaAmount*1.5)));
state.completedOrders=3;assert.equal(c.isDailyShopUnlocked(),false);
state.repairProgress.first={completedParts:[0]};assert.equal(c.isDailyShopUnlocked(),true);
state.completedOrders=2;assert.equal(c.isDailyShopUnlocked(),false);
state.shopUnlocked=true;assert.equal(c.isDailyShopUnlocked(),true);state.shopUnlocked=false;
const today=new Date(2026,10,15,10).getTime();
for(const [count,expected] of [[1,1],[2,3],[3,5],[5,7],[6,7]]){
 state.unlockedGeneratorCategories=lines.slice(0,count);state.shopFoodItemIds=null;state.shopPurchaseCycle=c.currentDailyShopCycle(today);
 c.syncDailyShopCycle(today);assert.equal(state.shopFoodItemIds.length,expected);
 assert.ok(state.shopFoodItemIds.every(id=>c.byId.get(id).level<=3));
 const ids=JSON.stringify(state.shopFoodItemIds);c.syncDailyShopCycle(today);assert.equal(JSON.stringify(state.shopFoodItemIds),ids,'no reroll on reopen');
}
state.unlockedGeneratorCategories=['hubing'];state.shopFoodItemIds=['hubing_2','hubing_3','hubing_4'];state.shopPurchasedOfferIds=['food:hubing_2','stamina'];
const receipt=JSON.stringify(state.shopPurchasedOfferIds);c.syncDailyShopCycle(today);assert.equal(state.shopFoodItemIds.length,3,'preserve legacy stock');
state.unlockedGeneratorCategories.push('dairy');c.syncDailyShopCycle(today);assert.equal(state.shopFoodItemIds[0],'hubing_2');assert.ok(state.shopFoodItemIds.some(id=>id.startsWith('dairy')));assert.equal(JSON.stringify(state.shopPurchasedOfferIds),receipt,'new line must not reset purchases');
const added=JSON.stringify(state.shopFoodItemIds);c.syncDailyShopCycle(today);assert.equal(JSON.stringify(state.shopFoodItemIds),added);
assert.equal(c.normalizeShopCycle(31158,today),c.currentDailyShopCycle(today),'16-hour migration retains current receipts');
assert.equal(c.normalizeShopCycle('2026-11-14',today),'2026-11-14');
const beforeMidnight=new Date(2026,10,15,23,59,59).getTime();const midnight=new Date(2026,10,16,0).getTime();
assert.equal(c.nextDailyShopRefreshAt(beforeMidnight),midnight);
state.shopPurchaseCycle=c.currentDailyShopCycle(beforeMidnight);c.syncDailyShopCycle(beforeMidnight);assert.equal(JSON.stringify(state.shopPurchasedOfferIds),receipt);
c.syncDailyShopCycle(midnight);assert.equal(state.shopPurchasedOfferIds.length,0);assert.equal(state.shopPurchaseCycle,'2026-11-16');
const resetIds=JSON.stringify(state.shopFoodItemIds);c.syncDailyShopCycle(midnight);assert.equal(JSON.stringify(state.shopFoodItemIds),resetIds,'reset once only');
console.log('Shop progression: unlock gates,2-8 pricing,4/6/8/10 stages, eligible goods, stable catalog, append-only category support, legacy cycle migration and local-midnight reset passed.');
