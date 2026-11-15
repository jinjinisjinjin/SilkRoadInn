# SilkRoadInn Android prototype

Version 0.1.15 (Android versionCode 16). This project bundles the production web
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
an independently scrolling product area with fully visible purchase buttons.
Version0.1.10 compacts all goods into four columns, reduces sprite and visible
price sizes while retaining44px purchase hit areas. Version0.1.11 refines the
shop currency icon into a small faceted ruby. Version0.1.12 adds staged shop
unlocking/catalogs, low-level foods, local-midnight refresh and energy-based
food prices; legacy access and purchase records are preserved. Version0.1.13
enlarges portrait-board guests, brings reward labels closer and improves
storage-cabinet contrast. Version0.1.14 unifies both top resource-bar ruby
icons with the faceted shop currency icon. Version0.1.15 adds automatic native
backup and recovery of the entire game snapshot, including reward receipts. These are
scoped checks, not full release acceptance.

## Automatic save protection

The WebView primary save remains synchronous. Each snapshot carries a revision
and a CRC32 damage check. Android mirrors committed snapshots, in order, to two
rotating SHA-256 verified files in the application's private `files/save-vault`
directory. A synced temporary file is renamed over the older generation; the
latest committed file is retained if a write fails. This needs no storage
permission and adds no normal-play dialog.

Startup checks the primary and both native generations before loading gameplay.
The first upgrade preserves a valid legacy primary when no native generation
exists. Once protected, an old unversioned file cannot rewind newer receipts.
Subsequent recovery chooses
the newest valid revision, never the largest currency balance. The entire
snapshot is restored together: resource spending, order/repair progress and
claim receipts are not independently merged. A damaged or missing primary is
repaired from a valid native generation. If backup recency cannot be checked, or existing copies are all unreadable,
startup retains them and shows a short save-specific retry message; it does not
replace them with a new game. QA saves have separate keys, and the native reset
method refuses the normal key.

Native writes are asynchronous after the primary commit. Background/page-exit
queues another checkpoint. An abrupt kill before a native write completes may
recover the previous committed generation. These are local backups, not cloud
sync, user-exported backups, or a guarantee of recovery after uninstalling or
clearing all application data. If both destinations fail during play, a brief
`进度暂未保存` toast indicates the real save failure.

Run `npm run test:save` here (JDK21) for production Java file-store checks, and
`npm run validate:save` in the web game for recovery/receipt/bridge tests. Real
Huawei fault-injection cases use a separate application ID and never modify the
formal game's save. Wider device coverage, manual export/import, production
app identity/icons and release signing remain follow-up work. Installing a debug
update requires the same signing key as the previous build.
