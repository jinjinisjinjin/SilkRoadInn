# 丝路食肆 (SilkRoadInn) — 项目说明书

> AI 代码助手请先读这个文件。它说明项目结构、当前状态和改造规则。

## 项目简介

《丝路食肆》是一款以唐代丝绸之路驿站为背景的合成经营类 Web 游戏原型。
核心玩法：在棋盘上放置生成器、合成食材、交付 NPC 订单，解锁修缮驿站节点。

## 项目路径

```
/Users/zhuangjin/Documents/Codex/SilkRoadInn/
```

## 目录结构

```
SilkRoadInn/
├── PROJECT_CONTEXT.md          # ← 你正在读的文件
├── game/                       # 正式可运行代码
│   ├── playable-v0.1/          # 棋盘玩法原型（主入口）
│   │   ├── index.html          # 主页面
│   │   ├── app.js              # 核心逻辑
│   │   ├── styles.css          # 样式
│   │   └── data/               # JSON 数据配置
│   └── scroll-v0.1/            # 长卷修缮原型
│       ├── index.html
│       ├── app.js
│       └── styles.css
├── assets/                     # 正式游戏资源（运行时引用）
│   ├── food-icons/             # 按食线分：dairy/drink/fruit/hubing/meat/spice
│   ├── ui/                     # UI 图标与合辑
│   ├── npc/                    # NPC 立绘与立牌
│   ├── generators/             # 生成器图标
│   ├── scenes/                 # 场景底图
│   ├── trays/                  # 托盘素材
│   └── misc/                   # 礼物包、锁定格等
├── art/                        # 美术生产文件（概念稿、内景研发）
│   ├── concepts/               # 视觉探索、Mockup、Logo
│   ├── food-concepts/          # 各食线美术方案、概念图
│   ├── generator-concepts/     # 生成器原材料图标 v0.1-v0.3
│   ├── repair-points/          # 修缮点美术（含分层素材）
│   ├── interiors/              # lv2/lv3/lv4 内景（未修缮+修缮完成）
│   └── order-ui-previews/      # 订单 UI 预览稿
├── design/                     # 设计文档
│   ├── project-control/        # 项目总控、合并计划
│   ├── game-rules/             # 玩法规则（board/scroll/food）
│   ├── visual-spec/            # 视觉规范、UI 规格
│   ├── repair-briefs/          # 修缮点 brief
│   ├── story/                  # 剧本、NPC 台词
│   └── data-spec/              # 数据配置与资产管线
├── tools/                      # 开发工具
│   ├── asset-scripts/          # Python 资产生成脚本
│   ├── preview/                # 本地预览服务
│   └── qa/                     # QA 校验
├── archive/                    # 历史版本
│   ├── old-map-variants/       # 旧大地图变体
│   └── old-outputs/            # 旧输出备份
└── .gitignore
```

## 当前状态

- **主入口**: `game/playable-v0.1/index.html`
- **原型版本**: v0.3（棋盘合成 + NPC 订单 + 驿站修缮 + 节奏门系统）
- **技术栈**: 纯 HTML/CSS/JS，无框架，单文件前端
- **运行方式**: 通过本地 HTTP 服务器打开（不能直接双击 HTML）
- **订单系统**: 26 步 REPAIR_GATE_SEQUENCE 逐单推进，每单交付后开放唯一修缮里程碑
- **已完成修复**: 节奏门系统（P0）、4 个 Lv4 市集续单、硬编码阈值清理

## 给 AI 的规则

1. **只在这个目录内操作**，不要碰 `/Users/zhuangjin/Documents/Codex/2026-07-11/` 下的旧目录。
2. **game/ 是唯一代码区**，所有功能改动只在这里。
3. **assets/ 是运行时资源**，game/ 中的 HTML 引用这里。
4. **art/ 是美术源文件**，不进入运行时，仅供美术生产参考。
5. **design/ 是设计参考**，改动功能前先读对应的规则文档。
6. **不要新增日期目录**，所有新文件放在现有分类下。
7. **worktree 只能由主项目总控创建、登记、合并和移除**。每个 worktree 必须拥有互不重叠的负责范围，不得跨区修改其他工作间负责的代码、数据或正式资产。
8. 新 worktree 必须从主项目已确认的稳定提交创建，并先阅读本文件与 `design/project-control/00_项目总控.md`；旧 `hei*` 目录和各工作间自己的临时输出均不得作为最新标准。

## 项目来源

本项目整理自以下旧目录（下列名称仅作历史来源记录，不再作为开发入口）：

| 旧目录 | 性质 | 处置 |
|--------|------|------|
| `hei` | git 主仓库 main 分支 | 内容并入 SilkRoadInn |
| `hei-inn` | worktree feature/inn-scroll-page | 内容并入，旧 map 变体归档 |
| `hei-board` | worktree feature/board-page | 内容并入，生成器图标归档 |
| `hei-story` | worktree feature/story-writing | 内容并入（剧本等） |
| `hei-inn-lv2/3/4` | 迭代研发目录 | 内景研发图并入 art/interiors |
| `2026-07-29/` | 日期临时目录 | 无关文件删除，修缮完成图并入 |

## 快速启动

```bash
cd game/playable-v0.1
python3 -m http.server 4173
# 打开 http://localhost:4173/
```

或使用项目自带的预览脚本（如果 Node.js 可用）：

```bash
bash tools/preview/start-preview.sh
```
