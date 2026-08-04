# 自查指令：SilkRoadInn 丝路食肆 拖拽合成 / 解锁落点问题

> 用途：当前 agent 已修到第 10 版（v10），逻辑在 headless Playwright 下全部通过，但**用户在真机（真实浏览器/触屏）上仍反馈"拖拽失败 / 合成后棋子没留在目标锁定格"。** 当前 agent 无法在本地复现真机失败，故移交你排查。**请先把这份指令通读，再动手。**

---

## 0. 环境与服务
- 项目根：`/Users/zhuangjin/Documents/Codex/SilkRoadInn`
- 游戏目录：`game/playable-v0.1/`（纯前端，无构建步骤）
  - `index.html`、`app.js`（经典 `<script>`，全局变量 `state` / `render` / `byId` / `mergeCells` / `unlockLockedCellByMerge` 等，可被 `page.evaluate` 直接读）
  - `styles.css`
- 本地服务器（已起）：`http://localhost:8765/`
  - 若没在跑：在 `game/playable-v0.1/` 下执行 `python3 -m http.server 8765`
  - **版本号机制**：`index.html` 里资源引用带 `?v=merge-fix-v10`，改完 JS/CSS 必须升一版（如 v11）否则用户命中缓存看不到改动。
- 自动化测试用浏览器（本机已装）：
  - `/Users/zhuangjin/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell`
  - 用法：`chromium.launch({ executablePath: '<上面路径>' })`

---

## 1. 期望行为（用户的真实需求，务必对齐）
拖拽格子 A（正在拖动的棋子）到格子 B：
1. **B 是普通激活格**：
   - B 为空 → 移动，A 占据 B，原格清空。
   - B 有**同类**棋子 → **合成**，产物（更高一级）留在 **B**，A 原格清空。（产物 = "新的棋子点位" = B）
2. **B 是锁定格（带遮罩/风沙，需要特定食材才能解开）**：
   - 拖的食材**正好匹配**该格所需 → **B 解锁**，且合成产物留在 **B**（参考「梦幻消除战」类合成消除玩法：盖到被封格子上→格子解开、结果占该格）。
   - 拖的食材不匹配 → 提示该格需要什么（"需要用XX来解开这格"）。
3. **生成器（点石磨）产出**：应从棋盘**左上→右下第一个可放空格依次铺满**。

用户最在意的、反复报错的就是 **第 2 条**：棋子没留在 B、B 没解锁。

---

## 2. 当前代码状态（v10，已修但用户仍报失败）
- `endCellPointer`（app.js 约 1850 行）是拖拽落点主逻辑：
  - 锁定格分支已（v10）重排优先级：**`lockedCellItemId(toIndex) === itemId` 时直接 `unlockLockedCellByMerge`（产物落在 toIndex=B 并解锁）；否则才用 `findAdjacentMergeTarget` 去和邻居合成兜底。**
  - `unlockLockedCellByMerge(fromIndex, toIndex, itemId)`（约 2005 行）：解锁 `toIndex`、把 `item.mergeTo ?? itemId` 放到 `toIndex`、清空 `fromIndex`。逻辑本身正确。
- `mergeCells(fromIndex, toIndex, itemId)`（约 2038 行）：产物放 `toIndex`、清源格——正确。
- `findAdjacentMergeTarget(fromIndex, toIndex, itemId)`（约 1897 行）：容错落点，优先落点(toIndex)旁的同类格，源侧兜底。
- `getCellIndexFromPoint(x, y)`（约 1932 行）：`document.elementFromPoint(x,y)?.closest('.cell')` 反算落点格索引。**这是最大嫌疑点（见第 4 节）。**
- 生成器放置：v9 已改 `firstEmptyIndexFromTop()`（从左上铺满）。

---

## 3. 当前 agent 已做的验证（仅供参考，不能证明真机 OK）
Playwright 真实鼠标拖拽（**注意：当前 agent 测试时把 `setPointerCapture` 桩成了 no-op，后又用真实 capture 重跑，两者都 PASS**）：
- 场景1：B 需"奶房木件"，拖奶房木件、旁有同色 → B 解锁、奶房木件留在 B ✅
- 场景2：B 需"麦面剂"，拖麦面剂 → B 解锁、合成产物"炉饼"留在 B ✅
**结论：逻辑在 headless 下正确；但真机失败无法复现 → 是真机专属问题，请勿被上面 PASS 误导。**

---

## 4. 真机失败的最大嫌疑（请重点排查）
`endCellPointer` 落点判定依赖：
```js
const dropX = dragging.lastX ?? event.clientX;
const dropY = dragging.lastY ?? event.clientY;
const toIndex = getCellIndexFromPoint(dropX, dropY);   // elementFromPoint + closest('.cell')
```
`document.elementFromPoint` + 精确光标坐标在真机上有多种不可靠来源：
- 真机触屏拖拽时 `pointermove` 是否可靠派发 / `lastX/lastY` 是否更新到松手点；
- 任何一层覆盖（drag-ghost 虽有 `pointer-events:none`，但其它浮层/.cell::before 遮罩/弹窗）在真机不同缩放下可能命中错误元素；
- 用户屏幕缩放 / 视口尺寸下棋盘 `getBoundingClientRect` 与格子几何偏移，导致 `elementFromPoint` 命中的 `.cell` 不是视觉上那个；
- 浏览器缓存导致用户实际跑的是旧版。

**强烈建议的稳健修复（不依赖 DOM 命中测试）：用几何反算替代 `elementFromPoint`。**
```js
function getCellIndexFromPoint(x, y) {
  const board = els.board;                       // 棋盘容器 DOM
  const rect = board.getBoundingClientRect();
  if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) return null;
  const cs = getComputedStyle(board);
  const padL = parseFloat(cs.paddingLeft) || 0, padT = parseFloat(cs.paddingTop) || 0;
  const gap = parseFloat(cs.gap) || 0;
  const innerW = rect.width - padL - (parseFloat(cs.paddingRight)||0);
  const innerH = rect.height - padT - (parseFloat(cs.paddingBottom)||0);
  const cellW = (innerW - gap * (BOARD_COLUMNS - 1)) / BOARD_COLUMNS;
  const cellH = (innerH - gap * (BOARD_ROWS - 1)) / BOARD_ROWS;
  let col = Math.floor((x - rect.left - padL + gap/2) / (cellW + gap));
  let row = Math.floor((y - rect.top - padT + gap/2) / (cellH + gap));
  col = Math.max(0, Math.min(BOARD_COLUMNS - 1, col));
  row = Math.max(0, Math.min(BOARD_ROWS - 1, row));
  const idx = row * BOARD_COLUMNS + col;
  return isInitialActiveCell(idx) || !isBoardCellLocked(idx) ? idx : idx; // 仍返回该格索引（锁定判定交给上层）
}
```
（注意：几何反算可能因为 padding/gap/border 取值与 CSS 不完全一致而偏差 1 格，需按真实 CSS 校准 `els.board` 的选择器与各项数值；目标是"坐标落在哪个格子的矩形里就返哪个索引"，彻底摆脱 `elementFromPoint`。）

**次要排查点：**
- 落点坐标兜底：除 `lastX/lastY` 外，也把 `event.clientX/Y`（pointerup 真实坐标）纳入，取最近一次有效的光标坐标，避免某些触屏 `pointerup` 前没有精确 move 导致坐标 stale。
- 真机 `pointermove` 是否触发：若拖拽中 `moved` 始终为 false（<8px 阈值或 move 不派发），会误走 `handleCellClick`（点按路径）。确认真机点按合成（handleCellClick ~1939，锁定格分支）也工作。
- `setPointerCapture`：当前 `onCellPointerDown` 对 cell 调 `setPointerCapture`，监听挂在 `window`。真机若捕获导致事件路由异常，可尝试移除 `setPointerCapture` 仅靠 window 监听（当前已靠 window 监听，捕获其实非必需）。

---

## 5. 给接手 agent 的检查清单
1. **先真机复现**：用真实浏览器（最好也用真机触屏）打开 `http://localhost:8765/`，**强制刷新(Cmd+Shift+R)**，打开 Console，做一个"拖 A→锁定格 B"的拖拽，记录：
   - 是否解锁 B？
   - 棋子最终落在哪个格？（应是 B）
   - Console 有无报错？
2. 若复现失败，**优先把 `getCellIndexFromPoint` 换成几何反算**（第 4 节），升版本号 v11，再真机验证。
3. 不要回退 v10 的锁定格优先级逻辑（匹配即解锁占 B），那是用户明确要的行为。
4. 修完后在真机 + headless 都验证：普通合成、拖到锁定格解锁、生成器铺满、点按合成，四种路径。
5. 把结论（根因 + 改动）回写 `/Users/zhuangjin/Documents/Codex/SilkRoadInn/.workbuddy/memory/2026-08-04.md`。

---

## 6. 关键文件/函数速查
| 文件 | 位置 | 内容 |
|---|---|---|
| app.js | ~1850 | `endCellPointer` 拖拽落点主逻辑 |
| app.js | ~1897 | `findAdjacentMergeTarget` 容错落点 |
| app.js | ~1932 | `getCellIndexFromPoint` ← 最大嫌疑 |
| app.js | ~1939 | `handleCellClick` 点按路径（含锁定格解锁） |
| app.js | ~2005 | `unlockLockedCellByMerge` 解锁 + 占 B |
| app.js | ~2038 | `mergeCells` 合成，产物放 toIndex |
| app.js | ~2089 | `activateManualGenerator` 生成器放置 |
| styles.css | ~654 | `.drag-ghost` `pointer-events:none`（已确认） |
| index.html | head/body | `?v=merge-fix-v10` 版本号 |
