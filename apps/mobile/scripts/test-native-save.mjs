import { mkdtempSync,rmSync,existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const directory=mkdtempSync(path.join(tmpdir(),'sri-native-tests-'));
const studio='/Applications/Android Studio.app/Contents/jbr/Contents/Home/bin';
const bin=process.env.JAVA_HOME?path.join(process.env.JAVA_HOME,'bin'):existsSync(studio)?studio:'';
try {
 for(const [name,args] of [['javac',['-encoding','UTF-8','-d',directory,path.join(root,'android/app/src/main/java/com/silkroadinn/game/SaveVaultStore.java'),path.join(root,'scripts/java/SaveVaultStoreTest.java')]],['java',['-ea','-cp',directory,'com.silkroadinn.game.SaveVaultStoreTest']]]){
  const result=spawnSync(bin?path.join(bin,name):name,args,{stdio:'inherit'});
  if(result.error)throw result.error;
  if(result.status!==0)throw Error(name+' failed: '+result.status);
 }
}finally{rmSync(directory,{recursive:true,force:true});}
