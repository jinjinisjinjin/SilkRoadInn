# 《丝路食肆》微信平台研发交接文档

更新时间：2026-09-19  
当前网页原型：`game/playable-v0.1`  
线上试玩：<https://silk-road-inn.vercel.app/>

## 1. 交接结论

当前版本已经适合作为“网页发布候选版”冻结和交接：核心经营、订单、修缮、长卷、章节、食鉴、历史见闻、商店、体力与本地存档均已形成完整闭环，自动校验与生产构建可以稳定通过。

当前版本还不适合直接生成“微信小游戏原生包”。原因不是玩法没有完成，而是平台运行环境不同：现有实现依赖 HTML、CSS、DOM、`dialog`、`iframe`、`Audio`、`fetch` 和 `localStorage`。原生微信小游戏没有完整浏览器 DOM，必须迁移渲染层和平台接口，或先采用普通微信小程序的 `web-view` 容器方案。

建议现在就开始微信端研发，但不要把“打包”理解成把 `dist` 直接压缩上传。正确顺序是：

1. 确定微信承载路线；
2. 抽出平台适配层；
3. 接入微信登录与云存档；
4. 按首包、分包和远程资源重新组织素材；
5. 在微信开发者工具与真机上完成性能验收；
6. 最后生成体验版与审核包。

## 2. 两条可选路线

| 路线 | 现有代码复用 | 上线速度 | 游戏广告与小游戏生态 | 主要代价 |
|---|---:|---:|---:|---|
| 普通微信小程序 + `web-view` 加载现有 H5 | 高 | 快 | 受小程序与 H5 能力边界限制 | 需要配置业务域名、登录桥接、网络与审核方案；核心体验仍依赖在线网页 |
| 原生微信小游戏（建议使用成熟 2D 引擎或 Canvas 架构） | 数据与规则可复用，界面层复用低 | 慢 | 更适合游戏分发、激励广告、性能优化 | 需要重做 DOM/CSS 界面、音频、弹窗、修缮场景与页面路由 |

如果第一目标是尽快验证用户、留存和内容接受度，先做小程序 `web-view` 容器更稳。如果第一目标是小游戏广告变现、买量和长期运营，应直接做原生小游戏迁移，避免先做一套壳后再重做。

这两条路线都可以使用微信登录。开发者必须先确认项目最终类目和变现方式，再确定承载方案。

## 3. 当前版本已通过的验收

生产检查命令：

```bash
cd game/playable-v0.1
npm ci
npm run check
```

`npm run check` 当前依次执行：历史内容校验、主线与迁移校验、经济配置校验、生产构建。

本轮结果：

- 22/22 个修缮点均有历史见闻与有效来源字段；另有 1 条旅人订单见闻；
- 22 个修缮点、10 个驿站等级、4 卷、20 个叙事章节结构一致；
- 172 个订单通过经济配置校验；
- 生产构建共 653 个文件；
- 294 张 PNG/JPG/JPEG 会在构建时转为 WebP，268 张已有 WebP 会再次压缩；
- 当前 `dist` 为约 32.6 MiB（34,157,337 bytes）；
- 手机视口 390 × 844 下已检查新档、中期、终局、每日小铺、体力宝袋、长卷第 1/22 场景与修缮场景；未发现游戏资源 404 或脚本报错；
- 新浏览器首次进入约请求 172 个资源、传输约 5.93 MiB；后续访问会受浏览器缓存影响；
- 完整进度存档约 5 KB，云存档体积压力很小。

浏览器中偶发的音频 `ERR_ABORTED` 来自页面跳转时中断尚未完成的音频 Range 请求，不是资源缺失。单独打开修缮子页时请求 `/favicon.ico` 可能返回 404，不影响游戏运行。

## 4. 打包前仍需完成的事项

### P0：平台路线与渲染迁移

如果选择原生微信小游戏，下列浏览器能力需要替换：

| 当前实现 | 微信端替代方向 |
|---|---|
| DOM + CSS + `<dialog>` | 引擎 UI、Canvas/WebGL 或小游戏适配后的界面系统 |
| `iframe` + `postMessage` 修缮子场景 | 游戏内场景路由 + 事件总线 |
| `new Audio()` | `wx.createInnerAudioContext()` 或引擎音频模块 |
| `localStorage` | `wx.setStorage` / `wx.getStorage` + 云存档服务 |
| `fetch()` 读取 JSON | 打包数据模块、`wx.request()` 或资源管理器 |
| `location.search` QA 参数 | 开发配置、调试菜单或构建环境变量 |
| 页面可见性事件 | `wx.onShow` / `wx.onHide` |

不要在现有 HTML 上零散模拟全部 DOM。当前界面结构较深，长期维护成本会很高。原生小游戏路线应保留数据表、规则与状态机，重新实现显示层。

### P0：资源拆分

现有压缩已经有效，但压缩不能替代拆包。当前 `dist` 仍有约 32.6 MiB，且含 560 张 WebP。微信端应以开发者工具当期限制为准，设计目标可先按“主包不超过 4 MiB、首次联网资源不超过 3 MiB”执行。

建议目录：

```text
wechat-core/
  启动、登录、棋盘基础 UI、第一段教学、基础食材
wechat-subpackages/chapter-01/
wechat-subpackages/chapter-02/
wechat-subpackages/chapter-03/
wechat-subpackages/chapter-04/
remote/repair-scenes/
remote/longscroll/
remote/codex/
remote/portraits/
remote/audio/
```

现有发布目录中可确认约 3.45 MiB 为内容完全相同的重复文件，其中长卷 15–22 状态图占大头。微信资产清单应通过 ID 到实际 URL 的映射复用同一文件，不能继续按不同文件名重复打包。

首包只应包含：启动页、登录壳、棋盘最小闭环、基础数据、第一段教学需要的图与音效。22 个修缮场景、长卷高清状态、人物立绘、食鉴大图、历史见闻和后续章节全部延迟加载。

### P0：登录与云存档

微信登录不是纯前端功能，需要开发者服务器：

1. 客户端调用 `wx.login()` 获取一次性 `code`；
2. 客户端把 `code` 交给业务后端；
3. 后端调用微信 `code2Session`，取得用户身份；
4. 后端生成本项目自己的登录令牌；
5. 客户端以后只携带项目令牌访问存档接口。

`AppSecret` 和 `session_key` 不能写进客户端，也不能下发给游戏。

建议登录体验：首次进入先静默登录；网络失败时允许游客本地试玩；登录恢复后再绑定并同步。不要强迫用户在加载页手动点击头像授权后才能进入核心玩法。

### P0：存档接口改造

正式存档键目前是：

```text
silkroad_tavern_proto_v02
```

所有带 `_qa_` 的键都是测试存档，不得上传云端。

当前 `saveState()` 会把完整状态同步写入 `localStorage`。迁移时保留“本地立即保存”，再异步排队上传云端，避免网络波动卡住合成、订单或修缮操作。

建议云存档信封：

```json
{
  "schemaVersion": 1,
  "revision": 18,
  "updatedAt": "server timestamp",
  "clientVersion": "0.3.0",
  "payload": {}
}
```

建议最小接口：

```text
POST /auth/wechat              code 换项目登录态
GET  /game-save               读取当前用户云存档
PUT  /game-save               带 baseRevision 更新存档
POST /game-save/resolve       明确解决本地/云端冲突（可选）
```

冲突规则：服务端按 `revision` 做乐观锁；冲突时保留服务器版与本地候选版，不能静默覆盖。用户首次换设备时优先恢复云端；离线期间产生的新进度在重连后提交合并请求。

### P0：商业化数据可信度

当前网页原型把铜钱、红宝石、驼铃、每日宝袋、周签到、商店刷新和时间恢复都保存在客户端，适合试玩，不适合直接承接真实付费或广告奖励。

如果接入支付、激励广告或排行榜，下列数据至少需要服务端校验：

- 红宝石余额与付费订单；
- 激励广告发奖次数；
- 每日宝袋、周签到与商店周期；
- 服务器时间与离线体力恢复；
- 跨设备存档 revision；
- 关键奖励领取的幂等 ID，防止重复领取。

铜钱与普通合成棋盘可以先保留客户端计算，服务端保存快照；一旦涉及付费资源兑换，再逐步提升为服务端权威。

## 5. 建议的平台适配接口

不要让微信 API 散落在玩法文件中。建议先建立统一接口，网页和微信分别实现：

```js
export const platform = {
  auth: {
    login: async () => ({ userId, token }),
    logout: async () => {},
  },
  save: {
    load: async () => ({ revision, payload }),
    writeLocal: (payload) => {},
    queueCloud: (payload) => {},
    flush: async () => {},
  },
  storage: {
    get: async (key) => null,
    set: async (key, value) => {},
  },
  audio: {
    playBgm: () => {},
    playSfx: () => {},
    pauseAll: () => {},
  },
  assets: {
    resolve: (assetId) => "",
    preloadGroup: async (groupId) => {},
  },
  lifecycle: {
    onShow: (handler) => {},
    onHide: (handler) => {},
  },
};
```

玩法代码只调用这些接口。这样网页试玩、微信小程序壳和原生小游戏可以共用同一套规则与数据。

## 6. 当前存档主要字段

开发者迁移时必须完整保留以下类别：

- 棋盘与仓库：`board`、`bag`、`unlockedCells`、`unlockedStorageSlots`；
- 奖励容器：`rewardItems`、`giftPacks`、`giftBoxStates`、`storedGiftBoxStates`、`bubbleStates`；
- 资源：`coins`、`gems`、`stamina`、`staminaMax`、`lastTick`；
- 订单：`visibleOrders`、`completedOrders`、`completedOrderIds`、`chapterOrderCounts`；
- 生成器：`generatorStates`、`unlockedGeneratorCategories`、`generatorLineOrderCounts`、`generatorWarehouse`；
- 叙事：`storyFlags`、`activeChapterStory`、`tutorialStep`；
- 修缮：`renovationChoices`、`repairProgress`、`activeRepairId`、`repairPromptedFor`；
- 人文内容：`unlockedCodex`、`unlockedFoodLevels`、`answeredHistoricalNoteIds`、`historicalNoteRewards`；
- 日常系统：`dailyPouchClaimDay`、`weeklyCheckinClaimedDays`、`weeklyCheckinLastClaimDay`、`shopPurchaseCycle`、`shopPurchasedOfferIds`；
- 兼容版本：`repairProtocolVersion`、`coinEconomyVersion`、`openingStaminaVersion`、`openingCopperVersion`、`innLevelSchemaVersion`。

现有 `loadState()` 已包含多轮旧档迁移。微信版不要只复制默认存档字段而丢掉这些迁移规则。

## 7. 微信开发者交付清单

开发者应提供以下可验收成果：

1. 技术路线说明：`web-view` 小程序或原生小游戏，说明选择理由；
2. 可在微信开发者工具打开的工程；
3. 登录时序图和后端接口文档；
4. 本地存档、云存档、离线恢复、换设备恢复演示；
5. 资源清单与主包/分包/CDN 归属表；
6. 微信真机资源加载、内存、首屏时间报告；
7. iOS、Android 至少各一台真机完成新档到首次修缮的录像；
8. 体验版二维码；
9. 已知问题清单和回滚方案。

## 8. 验收用例

- 新用户首次进入：静默登录失败也能开始游客档；
- 游客转登录：本地进度不会丢失；
- 同一账号换设备：能恢复云端进度；
- 两台设备同时推进：出现 revision 冲突时不会互相覆盖；
- 网络中断：合成、订单和修缮仍可本地保存；
- 网络恢复：存档队列能自动补传；
- 登录态过期：自动刷新或重新登录，不清空本地档；
- 微信切后台再回来：体力恢复与音频状态正确；
- 章节资源下载失败：显示重试，不扣除铜钱或奖励；
- 修缮中途退出：已支付部位与完成部位能恢复；
- 广告回调重复：奖励只发一次；
- 服务器时间与本机时间不一致：每日奖励和体力按服务器规则处理；
- 低存储空间或缓存被清理：资源可重新下载，云存档不受影响。

## 9. 本次预打包已完成的改动

- 增加统一命令 `npm run check`；
- 将经济校验与当前叙事订单门槛对齐；
- 生产构建新增 JPG/JPEG 转 WebP；
- 统一长卷终章资源 URL，避免同一张图因查询参数不同被重复下载；
- 完成移动端多阶段、商店、体力、长卷和修缮场景的发布构建冒烟检查。

## 10. 当前建议

现在可以冻结一个网页发布候选版并交给微信开发者；暂时不要提交微信审核包。微信开发者应先交付“平台壳 + 登录 + 云存档 + 第一章资源拆分”的最小版本。该版本通过真机验收后，再迁入其余三章与全部高清内容。
