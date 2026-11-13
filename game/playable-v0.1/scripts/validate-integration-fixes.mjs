import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {resolve} from 'node:path';
import {runInNewContext} from 'node:vm';
const root=resolve(import.meta.dirname,'..');
const source=readFileSync(resolve(root,'app.js'),'utf8');
const materials=JSON.parse(readFileSync(resolve(root,'data/generator-materials.json'),'utf8'));
const c={BOARD_COLUMNS:3,BOARD_ROWS:3,BOARD_SIZE:9,byId:new Map([['milk-room',{type:'auto_generator'}]]),state:{board:[],generatorMaterialConfig:materials,generatorConfig:{}},isBoardCellLocked:()=>false};
for(const name of ['neighborEmptyIndices','randomUnlockedEmptyIndex','migrateLegacyGeneratorId']){
 const start=source.indexOf(`function ${name}(`);assert.ok(start>=0,name);runInNewContext(source.slice(start,source.indexOf('\n}',start)+2),c);
}
c.state.board=[null,'x','x','x','x','x','x',null,null];
for(let i=0;i<100;i++)assert.ok([7,8].includes(c.randomUnlockedEmptyIndex('milk-room')),'Do not place the milk room in the isolated corner');
c.state.board=[null,'x','x','x','x','x','x','x','x'];assert.equal(c.randomUnlockedEmptyIndex('milk-room'),0,'A lone empty cell still accepts the reward');
c.state.board.fill('x');assert.equal(c.randomUnlockedEmptyIndex('milk-room'),-1,'Full board leaves reward in its existing bag/warehouse path');
assert.equal(c.migrateLegacyGeneratorId('boxmat_livestock_pen_01'),'material_dairy_01');
assert.equal(c.migrateLegacyGeneratorId('material_dairy_01'),'material_dairy_01','Migration is idempotent');
const legacy=JSON.parse(readFileSync(resolve(root,'data/items.json'),'utf8')).items.find(i=>i.id==='boxmat_livestock_pen_01');
assert.equal(legacy.boxMaterial.required,8,'Eight old pen pieces remain eight modern first-stage pieces');
console.log('Integration: useful milk-room placement, isolated/full-board fallback and compatible old pen material conversion passed.');
