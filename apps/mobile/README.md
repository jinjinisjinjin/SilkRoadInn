# SilkRoadInn Android prototype

Version 0.1.9 (Android versionCode 10). This project bundles the production web
game for offline play using Capacitor 8.6.2. It uses the same rules and artwork
as `game/playable-v0.1`.

## Build

Requirements: Node.js 22 or newer, JDK 21, Android SDK 36 and its build tools.
The Gradle wrapper is included. On macOS, the build helper can locate Android
Studio's bundled JDK and the SDK under `~/Library/Android/sdk`. Other setups
should provide `JAVA_HOME` and `ANDROID_HOME`.

From the repository root:

```sh
cd game/playable-v0.1
npm ci
npm run check
cd ../../apps/mobile
npm ci
npm run build:android
```

The debug APK is written to `android/app/build/outputs/apk/debug/app-debug.apk`.
Use `npm run open:android` to open this project in Android Studio. The offline
build command, `npm run build:android:offline`, requires dependencies already
cached on the development machine.

Run `npm run sync:android` after web changes to rebuild and copy the bundled
web assets. Assets, dependencies, build output, machine-specific SDK paths and
signing keys are excluded from version control. No development server is
required to run an installed build.

## Prototype status

The Huawei Android 10 baseline covered a short generation/merge/order loop,
background/resume, restart, offline launch and update preservation. The 0.1.4 follow-up covered material visibility, buried-item layout and a
normal resource opening loop. Version 0.1.5 adds the dense six-column reward
bag; responsive, long-list placement, full-board safety and phone update/save
checks passed. Version 0.1.6 synchronizes the exact reward-bag item total
with its open inventory, including growing and shrinking stacks. Version 0.1.7
replaces the daily check-in decoration with the approved wooden shelves and
a movable base for today's reward; all reward data remains dynamic. Version
0.1.8 replaces that extra base with a static warm halo while retaining the
shared wooden shelves and all reward rules. Version0.1.9 implements the
approved merchant-paper shop: fixed header, three-column dynamic catalog and
an independently scrolling product area with fully visible purchase buttons. These are
scoped checks, not full release acceptance.

Progress currently uses WebView local storage. Native durable backups, save
migration/import, wider device coverage, production app identity/icons and
release signing are follow-up work. Keep backups before uninstalling or
clearing application data. Installing a debug update requires the same signing
key as the previous build.
