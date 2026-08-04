# 丝路食肆 棋盘视觉对齐 — Agent 修复指令

## 目标

将 `game/playable-v0.1` 的棋盘页视觉效果对齐到 Codex 版样板 `formal-board-tray4`。

## 核心问题

**CSS 类名断裂** — JS 渲染用的 class 名和 CSS 里 `#app[data-page="board"]` 高优先级规则的目标类名不一致，导致大量 CSS 规则不生效。

| DOM 元素 | JS 用的 class | `#app` CSS 规则名 | 状态 |
|---|---|---|---|
| 订单卡 | `order-card` | `.order` | ❌ 不匹配 |
| 人物图 | `npc-avatar` | `.order-person` | ❌ 不匹配 |
| 铜币气泡 | `reward-bubble` | `.order-coin` | ❌ 不匹配 |
| 食材区 | `need-items` | `.order-foods` | ❌ 不匹配 |
| 交付按钮 | `deliver-btn` | `.order-deliver` | ❌ 不匹配 |
| 餐盘图 | `tray`（刚加） | `.order-tray` | ❌ 不匹配 |
| 棋盘格 | `cell` | `.cell` | ✅ 匹配 |
| 棋盘 | `board` | `.board` | ✅ 匹配 |
| 底部说明栏 | `board-detail-strip` | `.board-detail-strip` | ✅ 匹配 |
| 底部图标 | `hud-icon-btn` | `.hud-icon-btn` | ✅ 匹配 |

## 文件位置

```
游戏版（目标）:
  /Users/zhuangjin/Documents/Codex/SilkRoadInn/game/playable-v0.1/
  ├── index.html        ← 不改
  ├── app.js            ← 可改（已加 tray，见下）
  ├── styles.css        ← 主要修改目标
  └── styles.css.bak    ← 原始备份（4892行）
  └── data/             ← JSON 数据，不改

Codex 版（参照）:
  /Users/zhuangjin/.codex/visualizations/2026/07/13/019f5b01-2f76-7600-a758-5531529f1a99/formal-board-tray4/
  ├── index.html        ← 参考结构
  ├── styles.css        ← 参考样式（1371行）
  └── app.js            ← 参考逻辑

运行方式：
  cd /Users/zhuangjin/Documents/Codex/SilkRoadInn/game/playable-v0.1
  python3 -m http.server 8765
  # 浏览器打开 http://127.0.0.1:8765/index.html
```

## 已做的改动（慎动）

### styles.css（vs styles.css.bak）
- `.order-card` — 去掉了白底和边框（`background: transparent; border: 0`）
- `.npc-avatar` — 改 absolute 定位 + 104×116px
- `.reward-bubble` — 改 absolute + `top:28px right:0`（Codex 风格）
- `.need-items` — 改 absolute + `bottom:31px`
- `.deliver-btn` — 改 absolute + 48×25px
- `.generator-badge` — 加了 `display:none`
- `.board` gap — 5→4px
- `.board-wrap` — padding 缩小，left/right 收紧

### app.js
- 第 ~1508 行：新增了餐盘 tray 渲染：
  ```js
  const tray = document.createElement("img");
  tray.className = "tray";
  tray.src = "./assets/order_tray_approved_front.png";
  ```
- card.append 顺序：`npcImg, reward, foods, tray, deliver`

## 需要修复的具体问题

### 1. 人物头像
- **当前**: 104×116px, `object-fit: contain`
- **Codex**: 100×112px, `object-fit: contain`
- **用户反馈**：一会儿太大一会儿太小，最终应和 Codex 版视觉效果一致
- 用户说头像出现白底 → 可能是 `.order-card` padding 或 background 没清干净

### 2. 订单卡铜币位置
- **当前**: `top:28 right:0` — 用户说挡住人物了
- **Codex**: `top:28 right:0` — 在人物右上角空白处
- 需要确认实际渲染时铜币是否在人物右侧而非压在脸上

### 3. 餐盘（刚加的 tray 元素）
- tray img 已加入 DOM，但 CSS 里 `.tray` 样式可能不完整
- Codex 版 tray: `position:absolute; left:1; right:1; bottom:3; height:54`
- 需要确认 tray.png 实际在 DOM 中可见

### 4. 交付按钮
- **当前**: absolute, bottom:16, 48×25px
- **用户反馈**："交付件也变得特别大" — 可能是之前的修改回滚了

### 5. 棋盘格子
- **当前**: gap 4px, cell border-radius 6px
- **Codex**: gap 5px, cell border-radius 10px
- **用户反馈**："格子还是偏大" → 可能需要进一步缩小或加 `max-height`

### 6. 底部图标白底
- 基础 `.hud-icon-btn` 已经是 `background: transparent`
- `#app .hud-icon-btn` 只设了 width/height，没设 background
- **用户反馈**：还有白底 → 需要排查是否有其他规则覆盖

### 7. 底部食材说明栏
- `#app .board-detail-strip`: `min-height:58px, font-size:18px`
- **用户反馈**："对食材的说明也做得太大了"
- Codex 版 `.piece-info`: `height:58px`

### 8. 死代码清理
- styles.css 第 2087-2130 行有约 19 行 `#app` 规则，目标类名 `.order-person`/`.order-coin`/`.order-serving`/`.order-tray`/`.order-foods`/`.order-deliver` 在 DOM 中不存在
- 可以删除或改写为匹配实际 class 名

## 推荐方案

**选一条路线，不要混用：**

### 路线 A：修 JS class 名对齐 CSS（改动面大但最干净）
把 app.js 渲染订单卡的所有 class 名改成 CSS 里 `#app` 块期望的名字：
- `order-card` → `order`
- `npc-avatar` → `npc` + `.order-person` 容器
- `reward-bubble` → 保持不变
- `need-items` → 保持不变  
- `deliver-btn` → `deliver-btn` 保持不变
- `tray` → 保持不变
- 然后所有 `#app` 规则自然生效

### 路线 B：修 CSS 规则名对齐 JS（改动面小）
把 styles.css 里 `#app` 块的死代码删除，在 `#app[data-page="board"]` 块里用实际 class 名重写订单卡规则。我已经在中间插入了部分 `#app .order-card` / `#app .npc-avatar` 等规则，但需要补齐。

### 路线 C：全删重写（最快）
删掉 styles.css 第 1886-2250 行所有 `#app[data-page="board"]` 规则，直接用基础选择器（无 `#app` 前缀）定义订单卡样式。不需要高优先级因为订单卡只在棋盘页出现。

## 验证方法

1. `node --check app.js` — 确保 JS 无语法错误
2. 浏览器打开 `http://127.0.0.1:8765/index.html`
3. 同时打开 Codex 版 `http://127.0.0.1:8766/index.html` 对比
4. 无 console 错误
5. 棋盘 63 格（7×9），3 个食客订单卡在顶部
