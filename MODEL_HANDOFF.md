# 《丝路食肆》下一模型交接文档

> 更新时间：2026-09-11（Asia/Shanghai）  
> 本文件绝对路径：`/Users/zhuangjin/Documents/Codex/SilkRoadInn/MODEL_HANDOFF.md`  
> 项目唯一有效根目录：`/Users/zhuangjin/Documents/Codex/SilkRoadInn`

## 1. 接手后的第一步

先在项目根目录执行：

```bash
cd /Users/zhuangjin/Documents/Codex/SilkRoadInn
git status --short
git branch --show-current
git worktree list
```

当前应处于 `main`。开始前先看 `git status --short`，不要用 `reset`、`checkout`、`clean` 或旧文件覆盖用户可能刚做的新改动。

阅读顺序：

1. 本文件 `MODEL_HANDOFF.md`：最新工作区状态与接手边界。
2. `PROJECT_CONTEXT.md`：项目结构和长期规则。
3. `design/project-control/00_项目总控.md`：总控口径。
4. 与当前任务直接相关的 `design/game-rules/` 文档。

根目录的 `AGENT_HANDOFF.md`、`AGENT_FIX_BRIEF.md`、`AGENT_DRAG_MERGE_HANDOFF.md` 是早期专项排障记录，里面的版本号、端口、提交号和“尚未接线”描述已经过时。除非用户要求追查对应历史问题，否则不要把它们当作当前任务清单。

## 2. 项目与 Git 状态

| 项目 | 当前值 |
|---|---|
| 游戏类型 | 唐代丝绸之路题材的合成经营 Web 游戏原型 |
| 技术栈 | 纯 HTML、CSS、JavaScript 和 JSON，无框架、无构建步骤 |
| 当前分支 | `main` |
| 当前稳定基线 | `main` 最新提交；接手时用 `git log -1 --oneline` 确认 |
| 远程 | `https://github.com/jinjinisjinjin/SilkRoadInn.git` |
| 长期工作区 | 只保留 `/Users/zhuangjin/Documents/Codex/SilkRoadInn` |
| 正式入口 | `game/playable-v0.1/index.html` |

交接完成时 `main` 应与 `origin/main` 一致。若接手时看到新的脏文件，以当时 `git status --short` 为准，先判断它们是否是用户的新工作。

工作区规则：

- 不再创建日期目录。
- 不使用旧 `hei*`、旧日期目录或 `archive/` 作为最新代码来源。
- 临时 worktree 只在明确需要并行开发时存在，完成后立即合并并清理。
- 最终长期只保留一个 `SilkRoadInn`。

## 3. 可运行代码和文件位置

所有路径都相对于项目根；表中同时给出绝对位置，避免改错目录。

| 用途 | 相对路径 | 绝对路径 |
|---|---|---|
| 正式页面 | `game/playable-v0.1/index.html` | `/Users/zhuangjin/Documents/Codex/SilkRoadInn/game/playable-v0.1/index.html` |
| 核心玩法 | `game/playable-v0.1/app.js` | `/Users/zhuangjin/Documents/Codex/SilkRoadInn/game/playable-v0.1/app.js` |
| 主样式 | `game/playable-v0.1/styles.css` | `/Users/zhuangjin/Documents/Codex/SilkRoadInn/game/playable-v0.1/styles.css` |
| 长卷页样式 | `game/playable-v0.1/inn-map-ui.css` | `/Users/zhuangjin/Documents/Codex/SilkRoadInn/game/playable-v0.1/inn-map-ui.css` |
| 剧情回顾样式 | `game/playable-v0.1/story-archive.css` | `/Users/zhuangjin/Documents/Codex/SilkRoadInn/game/playable-v0.1/story-archive.css` |
| 章节剧情 | `game/playable-v0.1/chapter-story.js` | `/Users/zhuangjin/Documents/Codex/SilkRoadInn/game/playable-v0.1/chapter-story.js` |
| 新手引导 | `game/playable-v0.1/new-player-guide.js` | `/Users/zhuangjin/Documents/Codex/SilkRoadInn/game/playable-v0.1/new-player-guide.js` |
| 正式数据 | `game/playable-v0.1/data/` | `/Users/zhuangjin/Documents/Codex/SilkRoadInn/game/playable-v0.1/data` |
| 运行时图片和音频 | `game/playable-v0.1/assets/` | `/Users/zhuangjin/Documents/Codex/SilkRoadInn/game/playable-v0.1/assets` |
| 22 个修缮场景 | `game/playable-v0.1/repair-scenes/` | `/Users/zhuangjin/Documents/Codex/SilkRoadInn/game/playable-v0.1/repair-scenes` |
| 早期棋盘基线 | `game/board-baseline-v1/` | `/Users/zhuangjin/Documents/Codex/SilkRoadInn/game/board-baseline-v1` |
| 设计规则 | `design/` | `/Users/zhuangjin/Documents/Codex/SilkRoadInn/design` |
| 大体积设计预览 | `design/previews/` | `/Users/zhuangjin/Documents/Codex/SilkRoadInn/design/previews` |
| 美术源文件 | `art/` | `/Users/zhuangjin/Documents/Codex/SilkRoadInn/art` |
| 本地验收输出 | `output/` | `/Users/zhuangjin/Documents/Codex/SilkRoadInn/output` |

`game/playable-v0.1/assets/` 才是当前页面直接引用的运行时资源。根目录 `assets/` 和 `art/` 主要是母版、整理稿和美术生产资料，不能只把新图片放在那里而不接入运行目录。

`game/board-baseline-v1/` 是已被 Git 跟踪的早期棋盘基线，体量约 13M，只作历史对照，不是当前入口。`design/previews/` 体量很大，约 1.8G，已被 `.gitignore` 排除；`output/` 是本地验收截图和临时输出，也不作为源代码提交。

## 4. 正确启动方式

当前 4173 端口的服务目录已经确认是正式游戏目录。若服务仍在运行，可直接打开页面；否则使用：

```bash
cd /Users/zhuangjin/Documents/Codex/SilkRoadInn/game/playable-v0.1
python3 -m http.server 4173
```

正式试玩：

```text
http://localhost:4173/?mode=release
```

不要直接双击 `index.html`，JSON 请求会受 `file://` 限制。

暂时不要依赖 `tools/preview/start-preview.sh`。它仍指向旧的 `outputs/丝路食肆_可玩原型_v0.1`，与当前正式入口不一致。

## 5. 当前核心玩法口径

### 棋盘、订单和生成器

- 棋盘为 7 列 × 9 行，共 63 格。
- 正式订单池为 172 张。
- 同时到访 2–7 位客人，通常约 4 位；能立即交付的订单排在前面。
- 未交付订单一直保留，直到玩家做出餐食并交付；没有自动刷新、免费刷新或铜币刷新。
- 相同需求数量大于 1 时，要在托盘上分开放置相同食物，不能显示 `×2`。
- 六类食物线均有 6 级生成器；订单只要求已拥有产线且当前等级可达的食物。
- 奶房只向自身周围八格投放。空格不足时保存剩余库存；玩家腾格或移动奶房后继续投放。
- 奶房 Lv1–Lv6 每轮库存为 `6 / 10 / 14 / 18 / 22 / 26`，Lv2–Lv6 直接掉落乳糜概率为 `8% / 14% / 20% / 26% / 32%`。

### 铜币、体力和宝袋

- 铜币奖励棋子只有 Lv1–Lv4，价值为 `1 / 3 / 8 / 25`。
- 四级均可双击收入铜币；同级两两合成，Lv4 为最高级。
- 体力棋子只有 Lv1–Lv4，数值为 `2 / 8 / 30 / 100`。
- 体力造型依次为一枚驼铃、两枚驼铃、单峰驼、成熟双峰驼；四级均可双击收取。
- 每日宝袋采用随机奖励池。点击落到棋盘的宝袋后，铜币和体力棋子逐个吐出；棋盘满时暂停，腾格后再次点击继续，已抽定奖励随存档保存。

### 仓位和红宝石

- 柜中初始免费 8 格，后续可以逐格无限扩容。
- 红宝石开格价格由 `data/economy.json` 管理，当前依次为 `5 / 6 / 7 / 8 / 10 / 12 / 15 / 18 / 22 / 26 / 30 / 35 / 40 / 45 / 50 / 60 / 70 / 80 / 90 / 100`，表后每格再加 10。
- 界面按钮文字为“邀请新用户”；产品规则是每成功邀请 1 位新用户免费开启 1 格。
- 点击驼铃旁的加号，用红宝石购买 100 体力；当日第一次 10 红宝石，第二次 20，之后按 2 倍递增，按本地自然日重置。

### 食鉴、剧情和升级

- 棋盘左侧快捷入口顺序为：流沙驿、食鉴、行囊。
- 长卷左下同时有食鉴和剧情回顾入口。
- 食鉴使用新图标 `game/playable-v0.1/assets/ui/ui_food_codex_book_v1.png`，青绿食谱册配热食碗纹样。
- 剧情回顾使用原卷轴图标 `game/playable-v0.1/assets/ui/ui_codex_scroll.png`。
- 食鉴入口是正式静态 DOM，不再由新手引导动态创建；不要恢复 `newPlayerCodexBtn`。
- 驿站升级不显示解锁弹窗。升级后播放约 2.8 秒暖金光效，只显示“流沙驿升至 LvX”；不要恢复“焕然一新”文字。
- 四章、22 个修缮节点、章节剧情和剧情回顾已经接通；尚未写入任何纪事时，入口仍可打开，并显示明确的空状态。

## 6. 最近已提交成果

`dce68d7` 已包含以下改动：

1. 删除订单自动/免费刷新配置和“开放订单刷新”里程碑承诺，正式规则改为未完成订单持续等待、交付后补位。
2. 仓位邀请条件从 5 人改为 1 人，按钮文案改为“邀请新用户”。
3. 为“孜然末”和“葡萄浆”补充食鉴出处说明。
4. 铜币奖励棋子规则与运行时统一为 Lv1–Lv4、`1 / 3 / 8 / 25`。
5. 删除升级解锁弹窗，改为不阻塞操作的升级暖光动画；页面不再显示“焕然一新”。
6. 把食鉴入口迁入正式 DOM，棋盘和长卷页都可直接打开食鉴，新手引导改为指向正式入口。
7. 新增并接入食鉴图标 `ui_food_codex_book_v1.png`；原 `ui_codex_scroll.png` 改给剧情回顾使用。
8. 规则文档和经济校验脚本已同步更新。

后续提交又整理了交接口径：`PROJECT_CONTEXT.md` 和本文件统一了运行时资产目录、预览启动方式、目录树和仓库清理说明，并为尚无内容的剧情回顾补充了可进入的空状态。接手时仍要重新用 `git status --short` 获取真实清单，以它为准。

## 7. 明确尚未接入的能力

以下项目需要真实平台或支付能力，目前保留产品占位，不要伪造“已经接通”：

- 邀请新用户：尚无平台邀请、用户归因和成功人数回传。当前点击按钮只解释规则。
- 红宝石充值：商城入口和占位界面存在，但未接支付、商品、订单校验或到账机制。

此外，铜币规则文档里的单次 30 分钟气泡上限 8 个、每日气泡上限 24 个仍是待实现项；主线高奖励与重复订单奖励完全分离也仍列为待接线项。开始做这些内容前先向用户确认优先级。

明确不要做：

- 不要重新加入订单刷新。
- 不要恢复升级解锁弹窗。
- 不要把“升级后解锁了什么”做成长文字说明。
- 不要把食鉴入口重新放回隐藏 tabbar 或只在新手引导里生成。

## 8. 仓库清理状态

- `.gitignore` 已排除本地预览、截图、备份和大体积输出：`design/previews/`、`output/`、`/output/playwright/*.png`、根目录 3 张指定验收 PNG、`*.bak` 等；没有使用会吞掉未来正式素材的 `/*.png` 宽泛规则。
- 旧版中曾被 Git 跟踪的 `game/playable-v0.1/styles.css.bak`、`output/playwright/` 下 6 张截图、根目录 3 张验收 PNG 已从 Git 索引移除；本地文件可继续留作参考，但之后不再作为源码提交。
- `.git` 原先约 2.1G、3000 多个松散对象且 `packs: 0`；2026-09-11 已运行 `git gc`，当前约 145M、`packs: 1`。这是本地仓库维护，不改变游戏内容。

## 9. 常用验收入口

| 用途 | URL |
|---|---|
| 正式试玩 | `http://localhost:4173/?mode=release` |
| 升级光效 Lv2 | `http://localhost:4173/?qa=upgrade-reveal-v1&level=2` |
| 升级光效 Lv3/Lv4 | 将上面 `level` 改为 `3` 或 `4` |
| 体力棋子与宝袋 | `http://localhost:4173/?qa=stamina-pouch-v1&reset=1` |
| 满盘暂停续接 | `http://localhost:4173/?qa=stamina-pouch-v1&full=1` |
| 成长阶段 | `http://localhost:4173/?qa=progression-flow-v1&stage=60&reset=1` |
| 新手引导 | `http://localhost:4173/?qa=new-player-guide-v1` |
| 食鉴矩阵 | `http://localhost:4173/?preview=food-codex-matrix-v1` |
| 剧情回顾 | `http://localhost:4173/?qa=story-archive-v1&open=1&chapter=2` |

QA 路由使用隔离存档，不应覆盖正式试玩存档。正式验收除功能外，还要查看 390×844 和 320×568 两种手机尺寸，并检查浏览器控制台。

## 10. 提交前检查

```bash
cd /Users/zhuangjin/Documents/Codex/SilkRoadInn
node --check game/playable-v0.1/app.js
node --check game/playable-v0.1/new-player-guide.js
node game/playable-v0.1/scripts/validate-economy.mjs
node game/playable-v0.1/scripts/validate-story-route.mjs
node -e "for (const f of ['game/playable-v0.1/data/codex.json','game/playable-v0.1/data/economy.json','game/playable-v0.1/data/orders.json','game/playable-v0.1/data/progression.json']) JSON.parse(require('fs').readFileSync(f)); console.log('JSON OK')"
git diff --check
```

最近一次结果：语法、经济配置、22 节点剧情路由、JSON 解析和 diff 格式均通过；正式页与升级 QA 页控制台均为 0 error、0 warning。食鉴和剧情入口在棋盘/长卷页均已实际点击验证。

## 11. 与用户协作时要保持的习惯

- 用户要求的是可直接看的效果时，改完必须打开本地页面实测；不能只看代码后宣称完成。
- UI 文案尽量短，棋盘和行囊不堆说明文字。
- 保持敦煌暖沙、青绿、赭红、鎏金的现有手绘风格。
- 新图片必须放进运行时资产目录并实际接线，不能只留在临时输出目录。
- 功能完成后先汇报测试结果；只有用户明确要求“提交”或“提交并推送”时才执行对应 Git 操作。
- 不要创建新的日期文件夹；不要让临时 worktree 长期存在。
