import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {runInNewContext} from 'node:vm';
const root=resolve(import.meta.dirname,'..');
const source=readFileSync(resolve(root,'app.js'),'utf8');
function load(c,names){for(const name of names){const start=source.search(new RegExp(`(?:async )?function ${name}\\(`));assert.ok(start>=0,name);const end=source.indexOf('\n}',start)+2;runInNewContext(source.slice(start,end),c);}}
const milk={id:'generator_dairy_01',type:'auto_generator',level:1,generatorType:'dairy',generator:{outputCount:6,cooldownSeconds:3600,chargeMax:1}};
const dough={id:'dough',name:'麦面剂',line:'hubing',level:1,mergeTo:'bread'};
const bread={id:'bread',name:'炉饼',line:'hubing',level:2,mergeTo:'sesame'};
let now=1000000,rendered=0,saved=0,merged=0,collected=0;
const c={state:{board:[milk.id,null,null],bag:[],generatorStates:{},selectedIndex:0,unlockedGeneratorCategories:['dairy'],generatorWarehouse:{selectedCategoryId:'dairy',progressByCategory:{dairy:0},storedStatesByCategory:{dairy:[]},readyItems:[]}},byId:new Map([[milk.id,milk],['dough',dough],['bread',bread],['sesame',{id:'sesame',name:'胡麻饼'}],['coin',{id:'coin',type:'bonus_coin'}]]),
 Date:{now:()=>now},performance:{now:()=>now},isGeneratorPiece:item=>item?.type==='auto_generator',
 validGeneratorCategoryIds:()=>['dairy'],generatorItemId:()=>milk.id,generatorWarehouseAcceptedLevel:()=>1,generatorWarehouseOutputLevel:()=>4,generatorWarehouseTarget:()=>8,
 generatorWarehouseUnlocked:()=>true,selectedGeneratorWarehouseCategory:()=> 'dairy',generatorCategoryForItem:()=> 'dairy',
 firstEmptyIndex:()=>c.state.board.indexOf(null),isBoardCellLocked:()=>false,
 playSfx(){},keeper(){},toast(){},render(){rendered++;},renderStorage(){},saveState(){saved++;},clearPulseSoon(){},
 els:{generatorWarehousePanel:{classList:{add(){},remove(){}}}},clearTimeout(){},setTimeout(){return 1;},generatorWarehouseAnimationTimer:null,activeStorageTab:null,
 recordFoodMerge(){merged++;},maybeCreateMergeBubble(){},unlockCodex(){},queueMicrotask(){},
 activeDailyPouchOutputIndices:new Set(),activeDailyPouchStates:new Set(),queueBoardClickSound(){},
 renderBoardSelection(){},lastBonusCoinTapIndex:-1,lastBonusCoinTapAt:0,collectBonusCoin(index){collected++;c.state.board[index]=null;},
 renderOrders(){},renderBoard(){},renderSelected(){},renderGeneratorCountdowns(){},neighborEmptyIndices:()=>[],animateGeneratorOutput(){},
};
load(c,['boardGeneratorStateKey','bagGeneratorStateKey','clearGeneratorState','transferGeneratorState','transferBoardItemState','getGeneratorState','freshWarehouseGeneratorState','deliverGeneratorPieceReward','normalizeWarehouseStoredStates','generatorWarehouseEntry','depositGeneratorAtBoardIndex','withdrawStoredGenerator','mergeCells','handleCellClick','tickGenerators']);
let batch=c.getGeneratorState(milk.id,'board:0');batch.remainingOutputs=0;batch.cooldownEnd=now+3600000;
const deadline=batch.cooldownEnd;
c.depositGeneratorAtBoardIndex(0);assert.equal(c.state.generatorWarehouse.storedStatesByCategory.dairy[0].cooldownEnd,deadline);
now+=41000;c.withdrawStoredGenerator();assert.equal(c.state.generatorStates['board:0'].cooldownEnd,deadline);assert.equal(c.getGeneratorState(milk.id,'board:0').remainingOutputs,0);
c.depositGeneratorAtBoardIndex(0);const roundtrip=JSON.parse(JSON.stringify(c.state.generatorWarehouse));
c.state.generatorWarehouse.storedStatesByCategory=c.normalizeWarehouseStoredStates(roundtrip.storedStatesByCategory,roundtrip.progressByCategory);c.withdrawStoredGenerator();assert.equal(c.state.generatorStates['board:0'].cooldownEnd,deadline,'Reloaded store cannot renew the batch');
c.state.board[1]=milk.id;c.state.board[0]=null;c.transferGeneratorState(milk.id,'board:0','board:1');assert.equal(c.state.generatorStates['board:1'].cooldownEnd,deadline,'Moving keeps cooldown');
rendered=0;c.state.currentPage='inn';for(let i=0;i<5;i++){now+=1000;c.tickGenerators();}assert.equal(rendered,0,'Cooling down must not repaint the inn');
now=deadline+1;assert.equal(c.getGeneratorState(milk.id,'board:1').remainingOutputs,6,'One real completed cooldown restores one batch');
const legacy=c.normalizeWarehouseStoredStates(null,{dairy:1});assert.equal(legacy.dairy[0].remainingOutputs,0);assert.ok(legacy.dairy[0].cooldownEnd>now,'Count-only legacy stores migrate conservatively once');
batch.remainingOutputs=3;
c.state.board=['dough','dough','bread'];c.state.generatorStates={};c.state.tutorialStep=6;c.mergeCells(0,1,'dough');assert.equal(c.state.board.join(','),',bread,bread','Prepared neighboring food must survive exact two-to-one merge');assert.equal(merged,1);
c.state.board=['coin'];c.state.giftBoxStates={};c.state.selectedIndex=null;
await c.handleCellClick(0,null,100);now+=2000;await c.handleCellClick(0,0,200);assert.equal(collected,1,'Queued real events retain their original double-tap interval');
assert.ok(!source.includes('chainMergeAt('));
c.state.board=[milk.id,milk.id,milk.id];c.randomUnlockedEmptyIndex=()=>-1;
c.state.generatorWarehouse={progressByCategory:{dairy:0},readyItems:[]};
assert.equal(c.deliverGeneratorPieceReward('dairy'), 'warehouse');
assert.equal(c.state.generatorWarehouse.storedStatesByCategory.dairy[0].remainingOutputs,6,'New rewards stored on a full board retain their first batch');
for(let i=0;i<7;i++)c.deliverGeneratorPieceReward('dairy');
assert.equal(c.state.generatorWarehouse.progressByCategory.dairy,0);assert.equal(c.state.generatorWarehouse.storedStatesByCategory.dairy.length,0);assert.equal(c.state.generatorWarehouse.readyItems.length,1,'Eight inputs consumed exactly once');
const pulseStart=source.indexOf('function clearPulseSoon('),pulseEnd=source.indexOf('\n}',pulseStart)+2;
assert.ok(!source.slice(pulseStart,pulseEnd).includes('renderBoard('),'Animation cleanup must preserve live input nodes');
console.log('Board recovery: precise merges, input timestamps, no cooldown repaint, stored/moved/reloaded milk instances and legacy migration passed.');

// A revealed far corner must remain solvable after all dairy parts were merged.
// The locked item is authored separately from the saved board: old saves need
// no inventory rewrite, and already-open cells must retain their existing item.
{
  const data = name => JSON.parse(readFileSync(resolve(root, `data/${name}.json`), 'utf8'));
  const items = data('items').items;
  let foodMerges = 0;
  const ctx = {
    BOARD_COLUMNS: 7, BOARD_ROWS: 9, BOARD_SIZE: 63,
    ACTIVE_BOARD_START_ROW: 3, ACTIVE_BOARD_START_COL: 2,
    ACTIVE_BOARD_ROWS: 3, ACTIVE_BOARD_COLUMNS: 3,
    BOARD_REVEAL_SCHEMA_VERSION: 1,
    state: { board: Array(63).fill(null), unlockedCells: [], revealedCells: [], tutorialStep: 6,
      generatorConfig: data('generators'), generatorMaterialConfig: data('generator-materials') },
    byId: new Map(items.map(item => [item.id, item])),
    generatorItemId: (category, level) => `gen_${category}_${String(level).padStart(2, '0')}`,
    clearGeneratorState() {}, recordFoodMerge() { foodMerges++; },
    playSfx() {}, maybeCreateMergeBubble() {}, keeper() {}, toast() {},
    navigator: {}, clearPulseSoon() {}, unlockCodex() {},
  };
  const start = source.indexOf('const LOCKED_CELL_ITEM_ROWS =');
  runInNewContext(source.slice(start, source.indexOf('\n];', start) + 3), ctx);
  load(ctx, ['boardIndex', 'isInitialActiveCell', 'isBoardCellLocked', 'isBoardCellRevealed',
    'lockedCellItemId', 'migrateLegacyGeneratorId', 'orthogonalNeighborIndices',
    'revealLockedNeighbors', 'boardGeneratorStateKey', 'unlockLockedCellByMerge',
    'initialRevealedCells', 'normalizeRevealedCells', 'buildConfiguredGeneratorItems',
    'generatorMaterialItemId', 'buildConfiguredGeneratorMaterialItems']);
  for (const item of ctx.buildConfiguredGeneratorMaterialItems(ctx.state.generatorMaterialConfig)) {
    ctx.byId.set(item.id, item);
  }
  const buried = Array.from({length: 63}, (_, index) => ctx.lockedCellItemId(index))
    .map((id, index) => ({index, item: id && ctx.byId.get(id)}))
    .filter(({index}) => !ctx.isInitialActiveCell(index));
  assert.equal(buried.length, 54);
  for (const {index, item} of buried) {
    assert.ok(item?.mergeTo, `Buried cell ${index} must contain a valid mergeable item`);
  }
  assert.equal(ctx.lockedCellItemId(29), 'hubing_01_dough', 'Keep the first guided merge available');
  function reachableFoods(lines) {
    const opened = new Set(Array.from({length: 63}, (_, i) => i).filter(ctx.isInitialActiveCell));
    const frontier = new Set(ctx.initialRevealedCells());
    let advanced;
    do {
      advanced = false;
      for (const index of [...frontier]) {
        const item = ctx.byId.get(ctx.lockedCellItemId(index));
        if (!lines.has(item?.line)) continue;
        frontier.delete(index);
        opened.add(index);
        for (const next of ctx.orthogonalNeighborIndices(index)) if (!opened.has(next)) frontier.add(next);
        advanced = true;
      }
    } while (advanced);
    return {opened, frontier};
  }
  const early = reachableFoods(new Set(['hubing']));
  assert.ok(early.opened.size >= 20, 'Opening orders need room before the dairy unlock');
  assert.ok([...early.frontier].some(i => ctx.byId.get(ctx.lockedCellItemId(i))?.line === 'dairy'),
    'The opening route should preview the next food line');
  const allFoods = reachableFoods(new Set(['hubing', 'dairy', 'fruit', 'spice', 'meat', 'drink']));
  for (const {index, item} of buried.filter(({item}) => !item?.generatorMaterialCategory)) {
    assert.ok(allFoods.opened.has(index), `Food cell ${index} must not be trapped behind finite materials`);
  }
  console.log(`Buried layout: 54 valid mergeable cells; ${early.opened.size} mill-reachable spaces; food routes remain independent of finite materials.`);
  const target = ctx.lockedCellItemId(62), food = ctx.byId.get(target);
  assert.equal(food?.line, 'dairy');
  assert.ok(food && !food.generatorMaterialCategory && !food.boxMaterial,
    'The far corner cannot require finite generator parts');
  assert.ok(food.mergeTo, 'Unlocking still performs an ordinary two-to-one merge');
  for (const gen of ctx.buildConfiguredGeneratorItems(ctx.state.generatorConfig).filter(x => x.generatorType === 'dairy')) {
    assert.ok(gen.generator.pool.some(output => {
      if (output.weight <= 0) return false;
      let item = ctx.byId.get(output.itemId);
      while (item && item.level <= food.level) {
        if (item.id === target) return true;
        item = ctx.byId.get(item.mergeTo);
      }
      return false;
    }), `Dairy Lv${gen.level} must still produce a chain reaching the required food`);
  }
  const opening = Array.from(ctx.initialRevealedCells());
  assert.deepEqual(opening, [17, 29, 33, 45]);
  ctx.state.revealedCells = opening;
  ctx.state.board[61] = target;
  assert.equal(ctx.unlockLockedCellByMerge(61, 62, target), false, 'Cannot skip unrevealed cells');
  assert.equal(ctx.state.board[61], target);
  ctx.state.unlockedCells = Array.from({length: 62}, (_, i) => i);
  ctx.state.revealedCells = [62];
  ctx.state.board[0] = 'dairy_01_milk';
  assert.equal(ctx.unlockLockedCellByMerge(0, 62, 'dairy_01_milk'), false, 'Wrong level cannot unlock');
  const before = [...ctx.state.board];
  assert.equal(ctx.unlockLockedCellByMerge(61, 62, target), true);
  assert.equal(ctx.state.board[61], null);
  assert.equal(ctx.state.board[62], food.mergeTo);
  assert.deepEqual(ctx.state.board.slice(0,61), before.slice(0,61), 'Other inventory is untouched');
  assert.equal(foodMerges, 1);
  assert.equal(ctx.lockedCellItemId(62), null, 'An already-open cell keeps its actual saved contents');
  ctx.state = JSON.parse(JSON.stringify(ctx.state));
  ctx.state.revealedCells = ctx.normalizeRevealedCells(ctx.state.revealedCells, ctx.state.unlockedCells, 1);
  assert.equal(ctx.isBoardCellLocked(62), false);
  assert.equal(ctx.state.board[62], food.mergeTo);
  assert.equal(ctx.state.revealedCells.length, 0);
  assert.equal(ctx.unlockLockedCellByMerge(0, 62, target), false, 'Cannot claim the locked merge twice');
  console.log('Far-corner recovery: all dairy levels can make its food; hidden/wrong-item guards, exact consumption and old/open-save compatibility passed.');
}
