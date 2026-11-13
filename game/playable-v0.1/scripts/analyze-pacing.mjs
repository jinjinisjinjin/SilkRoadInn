import { resolve } from "node:path";
import { buildPacingBudget, readCheckpoint, analyzeCheckpoint } from "./pacing-model.mjs";

const options = {};
for (const argument of process.argv.slice(2)) {
  const match = argument.match(/^--(save|coins|trials)=(.+)$/);
  if (!match) throw new Error(`Unknown argument: ${argument}`);
  options[match[1]] = match[2];
}
if (!options.save && (options.coins !== undefined || options.trials !== undefined)) {
  throw new Error("--coins and --trials require --save; no checkpoint analysis was requested");
}
const result = buildPacingBudget();
if (options.save) result.checkpointAnalysis = analyzeCheckpoint(readCheckpoint(resolve(options.save)), {
  coinTarget: options.coins === undefined ? 1440 : Number(options.coins),
  trials: options.trials === undefined ? 100 : Number(options.trials),
});
console.log(JSON.stringify(result, null, 2));
