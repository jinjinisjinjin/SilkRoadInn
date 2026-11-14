import { existsSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const mobileRoot = fileURLToPath(new URL("../", import.meta.url));
const androidRoot = resolve(mobileRoot, "android");
const macJdk = "/Applications/Android Studio.app/Contents/jbr/Contents/Home";
const sdk = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT
  || (process.platform === "darwin" ? resolve(homedir(), "Library/Android/sdk") : "");
if (!sdk || !existsSync(sdk)) {
  throw new Error("Android SDK not found. Set ANDROID_HOME to the installed SDK directory.");
}
if (!existsSync(resolve(androidRoot, "gradlew"))) {
  throw new Error("Android project not found. Run npm exec cap add android first.");
}
const localProperties = resolve(androidRoot, "local.properties");
if (!existsSync(localProperties)) {
  writeFileSync(localProperties, `sdk.dir=${sdk.replaceAll("\\", "\\\\")}\n`);
}
const env = { ...process.env, ANDROID_HOME: sdk };
if (!env.JAVA_HOME && process.platform === "darwin" && existsSync(macJdk)) env.JAVA_HOME = macJdk;
const args = [":app:assembleDebug", "--console=plain", "--no-daemon"];
if (process.argv.includes("--offline")) args.push("--offline");
const result = spawnSync(process.platform === "win32" ? "gradlew.bat" : "./gradlew",
  args, { cwd: androidRoot, env, stdio: "inherit" });
if (result.error) throw result.error;
process.exit(result.status ?? 1);
