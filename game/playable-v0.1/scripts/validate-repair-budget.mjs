import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {createContext,runInContext} from 'node:vm';
const root=resolve(import.meta.dirname,'..');
const progression=JSON.parse(readFileSync(resolve(root,'data/progression.json')));
const route=JSON.parse(readFileSync(resolve(root,'data/story-route-v0.1.json')));
const source=readFileSync(resolve(root,'app.js'),'utf8');
const c=createContext({state:{progressionConfig:progression},REPAIR_PART_COUNT:9,REPAIR_PART_COST_STEPS:[0,10,20,30,40,50,60,70,80],els:{},saveState(){},finalizeRepairMilestoneState(m){c.state.renovationChoices[m.id]='completed';}});
for(const name of ['repairPartCosts','repairCost','normalizeRepairPartIndex','normalizeRepairCompletedParts','firstIncompleteRepairPart','normalizeRepairProgress','ensureRepairProgress','commitRepairPart']){
 const start=source.indexOf(`function ${name}(`),end=source.indexOf('\n}\n',start);assert.ok(start>=0&&end>start);runInContext(source.slice(start,end+2),c);
}
const plain=x=>JSON.parse(JSON.stringify(x));
for(const m of progression.milestones){
 const costs=m.repairParts.map(p=>p.cost);
 assert.deepEqual(plain(c.repairPartCosts(m)),costs,`${m.id}: runtime must use configured costs without silently falling back`);
 assert.equal(c.repairCost(m),m.repairCost);
 const node=route.chapters.flatMap(ch=>ch.nodes).find(n=>n.milestoneId===m.id);
 assert.equal(node.requires.coins,m.repairCost,`${m.id}: story budget mismatch`);
 assert.ok(costs.every((v,i)=>Number.isSafeInteger(v)&&v>=10&&v%10===0&&(!i||v>=costs[i-1])));
 c.state={progressionConfig:progression,coins:0,renovationChoices:{},repairProgress:{[m.id]:{completedParts:[0,1,2,3,4],prepaidRemaining:37}}};
 const old=plain(c.state.repairProgress);
 c.state.repairProgress=c.normalizeRepairProgress(old,{activeRepairId:m.id,renovationChoices:{},migrateLegacyPrepayment:false});
 assert.deepEqual(plain(c.state.repairProgress[m.id].completedParts),[0,1,2,3,4]);
 assert.equal(c.state.repairProgress[m.id].prepaidRemaining,37,'Stored copper credit must not scale with new prices');
 assert.equal(c.commitRepairPart(m,2).charged,0,'Completed parts must never be charged again');
 assert.equal(c.commitRepairPart(m,6).ok,false,'Cannot skip a part');
 const due=costs[5]-37;c.state.coins=due-1;
 const before=plain(c.state);const failed=c.commitRepairPart(m,5);
 assert.equal(failed.ok,false);assert.equal(failed.charged,0);assert.deepEqual(plain(c.state),before);
 c.state.coins=due;const paid=c.commitRepairPart(m,5);
 assert.equal(paid.charged,due);assert.equal(c.state.coins,0);assert.equal(c.state.repairProgress[m.id].prepaidRemaining,0);
 assert.equal(c.commitRepairPart(m,5).charged,0,'Repeated payment is idempotent');
 c.state.repairProgress=c.normalizeRepairProgress(plain(c.state.repairProgress),{activeRepairId:m.id,renovationChoices:{},migrateLegacyPrepayment:false});
 assert.deepEqual(plain(c.state.repairProgress[m.id].completedParts),[0,1,2,3,4,5],'Reload keeps paid parts');
 // The legacy format prepaid the whole repair. Preserve its existing migration contract.
 const legacy=c.normalizeRepairProgress({}, {activeRepairId:m.id,renovationChoices:{},migrateLegacyPrepayment:true});
 assert.equal(legacy[m.id].prepaidRemaining,m.repairCost);
 const done=c.normalizeRepairProgress(old,{activeRepairId:null,renovationChoices:{[m.id]:'completed'},migrateLegacyPrepayment:false});
 assert.equal(done[m.id].completedParts.length,9);assert.equal(done[m.id].prepaidRemaining,0);
}
// Regression: calibrated late-game prices exceed the old 300-coin cap.
const expensive={...progression.milestones.at(-1),repairParts:Array.from({length:9},(_,i)=>({cost:350+i*10}))};
assert.deepEqual(plain(c.repairPartCosts(expensive)),expensive.repairParts.map(p=>p.cost));
assert.deepEqual(progression.milestones.slice(0,3).map(m=>m.repairCost),[480,810,1080]);
console.log('Repair budget passed: all 22 runtime/route budgets, prices above 300, saved paid parts, exact remaining credit, insufficient funds, ordered payment, retry and reload.');

// Revalidate changed configuration on return; long-lived browser cache must not keep old prices.
const requests=[];c.DATA_PATH='data/';c.fetch=async(url,options)=>{requests.push({url,options});return {ok:true,json:async()=>({fresh:true})};};
const loadStart=source.indexOf('async function loadJson('),loadEnd=source.indexOf('\n}\n',loadStart);
runInContext(source.slice(loadStart,loadEnd+2),c);
for(const name of ['progression','orders','economy','story-route-v0.1']){assert.deepEqual(plain(await c.loadJson(name)),{fresh:true});assert.equal(requests.at(-1).options.cache,'no-cache');}
await c.loadJson('stamina');assert.equal(requests.at(-1).options.cache,'no-store');
console.log('Configuration refresh passed: conditional revalidation for game budgets and uncached stamina.');
