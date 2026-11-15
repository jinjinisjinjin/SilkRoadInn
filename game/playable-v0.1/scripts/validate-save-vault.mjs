import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { runInNewContext } from 'node:vm';
import { setTimeout as delay } from 'node:timers/promises';
const source=readFileSync(new URL('../save-vault.js',import.meta.url),'utf8');
const module={exports:{}};runInNewContext(source,{module,TextEncoder,console});
const {createVault,inspect,checksum}=module.exports;
const key='silkroad_tavern_proto_v02';
const fixture={board:['hubing_02_lubing',null,'gen_mill_01'],bag:[null],coins:10,gems:36,stamina:64,completedOrders:24,generationCount:39,completedOrderIds:['order_001_guard_lubing'],rewardItems:[{itemId:'hubing_03_humabing',quantity:2}],giftPacks:[],renovationChoices:{tutorial_complete:'completed'},repairProgress:{tutorial_complete:{completedParts:[0,1,2,3,4,5,6,7,8]}},storyFlags:{opening:true},weeklyCheckinClaimedDays:2,weeklyCheckinRewardReceipts:[{day:2}],activityProgress:{claimed:['orders1','merges1','coins1']},shopPurchasedOfferIds:['food1'],regularCustomerGifts:{claimed:['gift1']},text:'丝路 🐫'};
const raw=JSON.stringify(fixture);
const memory=(initial=null)=>{const values=new Map(initial===null?[]:[[key,initial]]);return {getItem:k=>values.get(k)??null,setItem:(k,v)=>values.set(k,v),removeItem:k=>values.delete(k),values}};
function nativeMock(){const records=new Map();const writes=[];return {records,writes,async read({key}){return {snapshots:records.get(key)||[],hasFiles:records.has(key)}},async write({key,payload}){await delay(1);const data=inspect(payload);assert.ok(data);const existing=records.get(key)||[];if(existing[0]?.revision>data.revision)throw Error('stale');records.set(key,[{payload,revision:data.revision},...existing.filter(x=>x.revision!==data.revision)].slice(0,2));writes.push(data.revision)},async clear({key}){assert.notEqual(key,'silkroad_tavern_proto_v02');records.delete(key)}};}
const restoreData=v=>JSON.parse(JSON.stringify(inspect(v).data));
assert.equal(checksum('123456789'),'cbf43926','CRC matches standard UTF-8 vector');
// First upgrade seeds the exact legacy state, including receipts, not a fresh game.
const disk=memory(raw),native=nativeMock();let vault=createVault({storage:disk,nativeProvider:()=>native});await vault.prepare(key);assert.deepEqual(restoreData(vault.read(key)),fixture);assert.equal(native.writes.length,1);
const first=vault.read(key);
// Spend currency and mark a claim: newer means revision, never the biggest balance.
vault.write(key,JSON.stringify({...fixture,coins:0,stamina:60,weeklyCheckinClaimedDays:3}));await vault.flush();const newer=disk.getItem(key);disk.setItem(key,first);
vault=createVault({storage:disk,nativeProvider:()=>native});await vault.prepare(key);assert.equal(inspect(vault.read(key)).data.coins,0);assert.equal(inspect(vault.read(key)).data.weeklyCheckinClaimedDays,3);
disk.setItem(key,raw);vault=createVault({storage:disk,nativeProvider:()=>native});await vault.prepare(key);assert.equal(inspect(vault.read(key)).data.weeklyCheckinClaimedDays,3,'Unversioned old copy cannot rewind an existing native claim receipt');
for(const damage of [null,'{broken',JSON.stringify({...JSON.parse(newer),gems:999}),JSON.stringify({...JSON.parse(newer),_saveVault:{...JSON.parse(newer)._saveVault,revision:9000}})]){
 if(damage===null)disk.removeItem(key);else disk.setItem(key,damage);
 vault=createVault({storage:disk,nativeProvider:()=>native});await vault.prepare(key);assert.deepEqual(restoreData(vault.read(key)),restoreData(newer));
}
// Native SHA may be intact but a previously buggy producer's payload is invalid.
native.records.set(key,[{revision:10,payload:'{}'},{revision:2,payload:newer}]);disk.setItem(key,'bad');vault=createVault({storage:disk,nativeProvider:()=>native});await vault.prepare(key);assert.deepEqual(restoreData(vault.read(key)),restoreData(newer));vault.write(key,raw);await vault.flush();assert.equal(inspect(vault.read(key)).revision,11);
// Neither corrupt copy may be replaced by defaults during a failed boot.
const broken=memory('bad'),unreadable=nativeMock();unreadable.records.set(key,[{revision:9,payload:'corrupt'}]);await assert.rejects(createVault({storage:broken,nativeProvider:()=>unreadable}).prepare(key),e=>e.code==='SAVE_UNREADABLE');assert.equal(broken.getItem(key),'bad');assert.equal(unreadable.writes.length,0);
await assert.rejects(createVault({storage:memory(),nativeProvider:()=>({read:async()=>{throw Error('io')}})}).prepare(key),e=>e.code==='SAVE_UNREADABLE');
// An I/O failure does not destroy a usable primary; later writes retry in order.
const retryNative=nativeMock();let fails=true;const write=retryNative.write;retryNative.write=async args=>{if(fails)throw Error('io');return write(args)};const retryDisk=memory(raw);vault=createVault({storage:retryDisk,nativeProvider:()=>retryNative});await vault.prepare(key);assert.ok(inspect(retryDisk.getItem(key)));fails=false;for(let n=0;n<20;n++)vault.write(key,JSON.stringify({...fixture,coins:n}));await vault.flush();assert.equal(retryNative.writes.length,20);assert.deepEqual(retryNative.writes,[...retryNative.writes].sort((a,b)=>a-b));assert.equal(inspect(retryNative.records.get(key)[0].payload).data.coins,19);
// A WebView write error can still recover from the independently stored native copy.
const fullDisk=memory();fullDisk.setItem=()=>{throw Error('quota')};vault=createVault({storage:fullDisk,nativeProvider:()=>native});await vault.prepare(key);assert.ok(inspect(vault.read(key)));vault.write(key,raw);await vault.flush();assert.equal(vault.status().lastError,null);
// Native and browser-only new games, malformed keys, and deliberate QA reset.
const browser=memory();vault=createVault({storage:browser});assert.equal(await vault.prepare(key),null);vault.write(key,raw);assert.deepEqual(restoreData(browser.getItem(key)),fixture);assert.throws(()=>vault.write(key,'{}'));await assert.rejects(vault.prepare('../foreign'));
await assert.rejects(createVault({storage:memory(raw),nativeProvider:()=>native}).prepare(key,{reset:true}));
const qa=key+'_qa_test';const qaDisk=memory(newer);qaDisk.setItem(qa,newer);vault=createVault({storage:qaDisk,nativeProvider:()=>native});assert.equal(await vault.prepare(qa,{reset:true}),null);assert.equal(qaDisk.getItem(key),newer);assert.ok(native.records.get(key));
// Same modern state can be reloaded repeatedly without multiplying awards.
const stable=memory(newer),stableNative=nativeMock();for(let i=0;i<4;i++){vault=createVault({storage:stable,nativeProvider:()=>stableNative});await vault.prepare(key);assert.deepEqual(restoreData(vault.read(key)),restoreData(newer));}
console.log('Save vault: migration, damage/missing primary, newer backup, receipt preservation, I/O retry, ordered writes, quota fallback, QA isolation and repeated recovery passed.');
// The plain-script Android shell supplies generated Plugins methods without
// loading the optional Capacitor core JS registration helper.
const injectedNative=nativeMock(),injectedDisk=memory(raw);
const shell={document:{},localStorage:injectedDisk,Capacitor:{isNativePlatform:()=>true,isPluginAvailable:()=>true,Plugins:{SaveVault:injectedNative}},dispatchEvent(){}};
runInNewContext(source,{window:shell,TextEncoder,console});await shell.SilkRoadSaveVault.prepare(key);assert.equal(shell.SilkRoadSaveVault.status().native,true);assert.deepEqual(restoreData(shell.SilkRoadSaveVault.read(key)),fixture);
console.log('Android generated-plugin bridge compatibility passed.');
const noWrite=memory(raw);noWrite.setItem=()=>{throw Error('quota')};let unavailable=0;
const failed=createVault({storage:noWrite,nativeProvider:()=>({read:async()=>({snapshots:[],hasFiles:false}),write:async()=>{throw Error('disk')}}),onUnavailable:()=>unavailable++});await failed.prepare(key);assert.equal(failed.status().unavailable,true);assert.equal(unavailable,1);assert.equal(noWrite.getItem(key),raw);
console.log('Failure of both destinations is visible and preserves the existing primary.');
// A late result for an older queued snapshot cannot change the latest save status.
const overlapDisk=memory(raw),overlapNative=nativeMock();let notices=0;
const overlap=createVault({storage:overlapDisk,nativeProvider:()=>overlapNative,onUnavailable:()=>notices++});await overlap.prepare(key);
const normalSet=overlapDisk.setItem;let rejectLocal=true;overlapDisk.setItem=(...args)=>{if(rejectLocal)throw Error('quota');return normalSet(...args)};
const normalNative=overlapNative.write;let releaseOld,writeNumber=0;overlapNative.write=async args=>{if(++writeNumber===1){await new Promise(resolve=>releaseOld=resolve);throw Error('old io failure')}return normalNative(args)};
overlap.write(key,raw);rejectLocal=false;overlap.write(key,JSON.stringify({...fixture,coins:20}));await delay(0);releaseOld();await overlap.flush();assert.equal(overlap.status().unavailable,false);assert.equal(notices,0,'An old failure cannot warn over a newer saved primary');
rejectLocal=true;writeNumber=0;overlapNative.write=async args=>{if(++writeNumber===1){await new Promise(resolve=>releaseOld=resolve);return normalNative(args)}throw Error('latest io failure')};
overlap.write(key,raw);overlap.write(key,JSON.stringify({...fixture,coins:21}));await delay(0);releaseOld();await overlap.flush();assert.equal(overlap.status().unavailable,true);assert.equal(notices,1,'Latest dual failure remains visible after older success');
console.log('Overlapping save outcomes preserve the status of the latest snapshot.');
const deniedDisk={getItem(){throw Error('read denied')},setItem(){throw Error('write denied')},removeItem(){throw Error('denied')}};
const emptyNative=nativeMock();await assert.rejects(createVault({storage:deniedDisk,nativeProvider:()=>emptyNative}).prepare(key),e=>e.code==='SAVE_UNREADABLE');assert.equal(emptyNative.writes.length,0,'An unreadable primary is not evidence of a new game');
const unknownBackup=memory(raw);await assert.rejects(createVault({storage:unknownBackup,nativeProvider:()=>({read:async()=>{throw Error('cannot determine latest')}})}).prepare(key),e=>e.code==='SAVE_UNREADABLE');assert.equal(unknownBackup.getItem(key),raw,'Unverifiable backup ordering cannot overwrite a legacy save');
console.log('Unreadable storage is distinct from a new game; uncertain backup reads retain all existing data.');
