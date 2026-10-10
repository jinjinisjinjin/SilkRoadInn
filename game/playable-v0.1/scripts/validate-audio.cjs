// Regression checks run the actual audio functions with controlled media promises.
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../app.js'), 'utf8');
const constants = source.slice(source.indexOf('const AUDIO_PATH'), source.indexOf('const SPECIAL_AUDIO_BUTTONS'));
const audio = source.slice(source.indexOf('const audioRuntime ='), source.indexOf('async function loadJson'));
let now = 0, nextFrame = 0;
const frames = new Map(), events = new Map(), storage = new Map();
class Media {
  constructor(src) { this.src = src; this.paused = true; this.readyState = 1; this.currentTime = 0; this.volume = 0; this.pending = []; this.listeners = new Map(); this.playCount = 0; }
  load() {}
  pause() { this.paused = true; }
  play() { this.playCount++; this.paused = false; return new Promise((resolve, reject) => this.pending.push({resolve, reject})); }
  addEventListener(name, cb) { this.listeners.set(name, cb); }
  removeEventListener(name) { this.listeners.delete(name); }
  settle() { this.pending.splice(0).forEach(x => x.resolve()); }
}
const document = { hidden: false, querySelector: () => null };
const state = { currentPage: 'board' };
const ctx = vm.createContext({ Audio: Media, HTMLMediaElement: { HAVE_METADATA: 1 },
  document, state, els: {}, performance: {now: () => now},
  requestAnimationFrame: cb => { frames.set(++nextFrame, cb); return nextFrame; },
  cancelAnimationFrame: id => frames.delete(id),
  window: {addEventListener: (name, cb) => events.set(name, cb)},
  localStorage: {getItem: key => storage.get(key) ?? null, setItem: (k,v) => storage.set(k,v), removeItem: k => storage.delete(k)},
  queueMicrotask, console });
vm.runInContext(constants + audio, ctx);
const run = expression => vm.runInContext(expression, ctx);
const flush = async () => { await Promise.resolve(); await Promise.resolve(); };
const finishFade = () => { now += 2000; const callbacks = [...frames.values()]; frames.clear(); callbacks.forEach(cb => cb(now)); };
(async () => {
  run('initAudio()');
  const runtime = run('audioRuntime');
  const {board, inn} = runtime.bgms;
  run('startBgmIfAllowed()'); board.settle(); await flush(); finishFade();
  assert.equal(board.volume, 0.24);
  state.currentPage = 'inn'; run('startBgmIfAllowed(1600)');
  state.currentPage = 'board'; run('startBgmIfAllowed()');
  inn.settle(); await flush();
  assert.equal(runtime.activeBgmKey, 'board'); assert.equal(inn.paused, true);
  state.currentPage = 'inn'; run('startBgmIfAllowed(1600)'); inn.settle(); await flush();
  now += 800; const mid = [...frames.values()]; frames.clear(); mid.forEach(cb => cb(now));
  assert(board.volume > 0 && board.volume < 0.24); assert(inn.volume > 0 && inn.volume < 0.21);
  finishFade(); assert.equal(board.paused, true); assert.equal(inn.volume, 0.21);
  run('playSfx("repairComplete")');
  document.hidden = true; run('handleAudioVisibility()');
  assert([...runtime.pools.values()].flat().every(m => m.paused)); assert.equal(inn.paused, true); assert.equal(frames.size, 0);
  document.hidden = false; run('handleAudioVisibility()'); inn.settle(); await flush(); finishFade();
  assert.equal(inn.paused, false);
  run('toggleBgm()'); assert.equal(inn.paused, true); assert.equal(storage.get('silkroad_tavern_audio_bgm_enabled_v1'), '0');
  run('toggleBgm()'); inn.settle(); await flush(); finishFade();
  // A deferred click must not resurrect after backgrounding and returning.
  const click = runtime.pools.get('click')[0]; click.readyState = 0;
  run('playSfx("click")'); const count = click.playCount;
  document.hidden = true; run('handleAudioVisibility()'); document.hidden = false;
  click.listeners.get('loadedmetadata')?.(); assert.equal(click.playCount, count);
  events.get('silkroad:opening-start')({detail:{startedAt:now,duration:10000,reducedMotion:false}});
  assert(board.paused && inn.paused); runtime.opening.settle(); await flush();
  assert.equal(runtime.opening.paused, false);
  events.get('silkroad:opening-end')(); inn.settle(); await flush(); finishFade();
  assert(runtime.opening.paused); assert.equal(runtime.activeBgmKey, 'inn');
  // Simulate browser autoplay rejection; retry must still be possible.
  inn.pause(); run('startBgmIfAllowed()'); inn.pending.splice(0).forEach(x => x.reject(new Error('NotAllowedError'))); inn.pause(); await flush();
  run('startBgmIfAllowed()'); inn.settle(); await flush(); assert.equal(inn.paused, false);
  const repairBody = source.slice(source.indexOf('async function closeRepairPlayer'), source.indexOf('function showPendingRepairAfterStory'));
  const preview = source.slice(source.indexOf('function previewLongscrollRepairRenewal'), source.indexOf('function renderLongscrollCastQaNav'));
  let cues = 0, effects = 0;
  const milestone = {id:'test-repair',longscrollRegionIds:[]};
  const noop = () => {};
  const repairCtx = vm.createContext({
    openRepairMilestoneId: milestone.id, repairReturnCastMilestoneId:null,
    pendingRepairAfterStoryMilestoneId:null, lastInnFocusKey:null, lastLongscrollCharacterSceneKey:null,
    LONGSCROLL_NOTE_FLOW_QA_MODE:false,
    state:{currentPage:'inn',renovationChoices:{},progressionConfig:{milestones:[milestone]}},
    els:{repairPlayerLayer:{hidden:false},repairPlayerFrame:{src:'test'}},
    setRepairOrientation:async () => {}, render:noop, centerInnSceneOnPosition:noop,
    saveState:noop, setTimeout:noop, initializeLongscrollCastQaScene:noop,
    historicalNoteForRepair:() => null, renderLongscrollCastQaNav:noop,
    playSfx:name => { assert.equal(name,'repairComplete'); cues++; },
    playRepairCompleteEffect:() => { effects++; return 1; }, milestone
  });
  vm.runInContext(repairBody + preview, repairCtx);
  await Promise.all([vm.runInContext('closeRepairPlayer(milestone,{completed:true})',repairCtx),vm.runInContext('closeRepairPlayer(milestone,{completed:true})',repairCtx)]);
  assert.equal(cues,1); assert.equal(effects,1);
  vm.runInContext('previewLongscrollRepairRenewal(1)',repairCtx);
  assert.equal(cues,2); assert.equal(effects,2);
  repairCtx.openRepairMilestoneId=milestone.id;
  await vm.runInContext('closeRepairPlayer(milestone,{completed:false})',repairCtx);
  assert.equal(cues,2);
  console.log('Audio regression passed: scene race, crossfade, switches, persistence, background, delayed SFX, opening, autoplay retry, repair guards.');
})().catch(error => { console.error(error); process.exitCode = 1; });
