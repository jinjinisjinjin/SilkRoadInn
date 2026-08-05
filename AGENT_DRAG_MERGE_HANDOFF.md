# AGENT_HANDOFF.md — 拖拽合成 bug 交接文档

> **状态：未解决。** 经 v18→v19→v19b→v20 共 4 轮修复，真机测试每次均失败。
> 当前版本：v20（`?v=merge-fix-v20`）
> 最后更新：2026-08-05 12:27（用户截图确认仍失败）

---

## 一、用户的核心诉求（必须满足）

1. **合成产物落在目标格 B**：从格 A 拖同类物品到格 B（也有同类），合成后的新物品必须在 B 格，不是 A 格。参照"梦幻消除战"玩法。
2. **锁定格（风沙遮罩）拖入正确物品后解锁**：锁定格有"密钥物品"要求，拖入正确密钥 → 该格解锁 + 合成产物留在该格。
3. **生成器弹出的食材从左上到右下依次铺满**：石磨生成器弹出麦面剂时，应放到棋盘最靠左上的空格，而非就近贴同类。

---

## 二、已确认的 Bug 现象（用户真机截图证据）

### Bug 1：合成不触发 / 变成移动

**用户操作**：从格 23（炉饼）拖向格 24（也是炉饼，相邻）
**期望**：两块炉饼合成为更高级食物，产物留在格 24
**实际行为（v20 截图 12:24:53）**：
```
DRAG from=23 item=hubing_02_lubing drop=(765,336) => toIndex=19 locked=true
DROP-TARGET: dir=(+191,-71) ⇒ dT=24(dI=true) cI=19 → 24 [DIR-MERGE]  ← 方向选对了！
ACTION: target[24]=(炉饼) moved=true
OUTCOME: MOVE from=23 → to=24 (item=炉饼)   ← 但结果是 MOVE 不是 MERGE！！
```
**关键矛盾**：方向向量正确找到了 DIR-MERGE 目标（格 24，同类炉饼），但最终执行的是 MOVE 而非 MERGE。说明问题不只是落点判定——**合并执行路径本身有 bug**。

### Bug 2：锁定格不解锁

**用户操作**：拖物品到带风沙遮罩的锁定格
**期望**：如果物品是密钥 → 解锁该格；如果不是 → 提示需要什么
**实际行为（v20 截图 12:24:47）**：
```
DRAG from=38 item=gen_mill_01 moved=false prevSel=23 hover=undefined
CLICK idx=38 prevSel=23 board[38]=石磨(已锁)
OUTCOME: LOCKED→ADJ-MERGE from=38 → adj=23 (locked=17)
OUTCOME: MOVE from=38 → to=23 (item=石磨) near=[24]=(炉饼),25:(空),17:(空),31:(空)
```
走了 `LOCKED→ADJ-MERGE` 路径但结果却是 MOVE（把石磨生成器移走了），没有解锁任何格子。

### Bug 3：落点坐标系统性偏移（根因）

**环境特征**：
- CSS `.board { transform: translate(-50%,-50%) scale(1.12); }` 导致所有绝对坐标偏移
- 用户使用 Chrome 响应式模式（Cmd+Shift+M），视口 868×933，但 clientX 报告值超界（如 1033、1384）
- `hoverIndex` 始终为 `undefined`（pointermove 的 hover 追踪失效）
- **结果**：无论用哪种坐标方案（elementFromPoint / getBoundingClientRect / 矩形遍历），落点永远算到错误的格——通常是某个锁定格（17 或 19）

**历史尝试及失败原因**：

| 版本 | 方案 | 失败原因 |
|------|------|----------|
| v18 | 方向向量作为 DROP-FALLBACK 兜底 | DROP-FIX 在落点阶段就把锁定格重定向走了，跳过解锁逻辑 |
| v19 | 删除 DROP-FIX，保留锁定格落点 | 坐标偏移导致落点恒为锁定格 → LOCKED→TOAST 死循环 |
| v19b | LOCKED→TOAST 路径加方向救援 | hover=undefined、方向救援没被触发 |
| v20 | 方向向量提升为主要方法 | 方向选对了目标(DIR-MERGE)，但合并/解锁执行路径仍有 bug |

---

## 三、项目技术信息

### 文件位置
- 游戏根目录：`/Users/zhuangjin/Documents/Codex/SilkRoadInn/game/playable-v0.1/`
- 主文件：`app.js`（所有游戏逻辑）、`styles.css`、`index.html`
- 本地服务器：`python -m http.server 8765`（根目录即 game/playable-v0.1/）
- 访问地址：`http://localhost:8765/?v=merge-fix-v20`

### 棋盘参数
- `BOARD_COLUMNS = 7`, `BOARD_ROWS = 9`（共 63 格）
- 激活区：row 3-5, col 2-4（即格 23-39）
- 石磨生成器 `gen_mill_01` 在格 38
- 物品 ID：`hubing_01_dough` = 麦面剂，`hubing_02_lubing` = 炉饼

### 关键函数（行号基于当前 v20 app.js）

| 函数 | 行号(约) | 功能 |
|------|---------|------|
| `onCellPointerDown` | ~1750 | 拖拽开始，初始化 dragging 对象（含 startX/startY/dragDx/dragDy） |
| `moveCellPointer` | ~1801 | pointermove 处理：追踪 hoverIndex、更新 dragDx/dragDy |
| `endCellPointer` | ~1829 | **核心函数**：落点判定 + 分发到各处理路径 |
| `getCellIndexFromPoint` | ~2071 | 坐标→格索引（getBoundingClientRect 矩形遍历） |
| `getTargetFromDirection` | ~2053 | 方向向量→邻居格（按 dx/dy 主轴选上下左右邻居） |
| `findAdjacentMergeTarget` | ~2014 | 从落点/源格周围找同类可合目标 |
| `mergeCells` | ~2207 | 执行合成：清 A、在 B 放产物（item.mergeTo） |
| `unlockLockedCellByMerge` | ~2167 | 执行解锁：检查密钥匹配→解锁+放产物 |
| `isBoardCellLocked` | — | 判断某格是否锁定 |
| `lockedCellItemId` | — | 返回某格需要的密钥物品 ID |

### endCellPointer 完整流程（v20）

```
1. 取 dragging 状态（fromIndex, itemId, moved, hoverIndex, dragDx, dragDy）
2. 【v20 新】方向向量主逻辑：
   - getTargetFromDirection(fromIndex, dragDx, dragDy) → dirTarget
   - 如果 dirTarget 有同类 → DIR-MERGE
   - 如果 dirTarget 为空且非锁定 → DIR-MOVE
   - 如果 dirTarget 是锁定格 → DIR-LOCKED
   - 否则 → DIR-OCCUPIED
3. 备用：hover/coords 坐标查找
4. 移除拖拽幽灵
5. 检查是否拖到存储区
6. !moved → handleCellClick（点击行为）
7. toIndex 无效 → render() return
8. 【锁定格处理器】isBoardCellLocked(toIndex):
   a. 密钥匹配? → unlockLockedCellByMerge() ← 应该解锁
   b. 周围有同类? → findAdjacentMergeTarget → mergeCells()
   c. 都没有 → toast("需要XX来解开")
9. 【普通格处理器】:
   a. 目标空 → MOVE（A 清空，B 放物品）
   b. 目标同类 → mergeCells() ← 应该合成
   c. 目标不同类 → 尝试 adj-merge 或 NO-MERGE
10. safety net（防物品消失）
11. render() + saveState()
```

### 调试面板
- 页面底部黑条，通过 `window.__dbg(msg)` 写入日志
- 日志包含：DRAG / END-Drag / DROP-TARGET / ACTION / OUTCOME
- 最大显示约 16 行，自动滚动

### 物品数据结构示例
```js
// byId Map 中的物品对象
{
  id: "hubing_01_dough",
  name: "麦面剂",
  mergeTo: "hubing_02_lubing",  // 合成后变成什么（无此属性=不可合成/最高级）
  // ... 其他属性
}
```

---

## 四、已知的关键线索（供接手 agent 参考）

### 线索 1：DIR-MERGE 选对了目标但执行了 MOVE
v20 截图明确显示：
- `DROP-TARGET: ... → 24 [DIR-MERGE]` — 落点判定正确选了格 24（同类炉饼）
- 但 `OUTCOME: MOVE from=23 → to=24` — 最终执行的是 MOVE

**可能原因**（需接手 agent 验证）：
1. `mergeCells()` 内部因 `!item.mergeTo` 提前 return（炉饼的 mergeTo 可能是 undefined？）
2. 代码在 DIR-MERGE 设置 toIndex 后，又经过了某个分支覆盖了结果
3. safety net 或其他后置逻辑意外修改了 board 状态

### 线索 2：LOCKED→ADJ-MERGE 结果是 MOVE
截图显示 `LOCKED→ADJ-MERGE from=38 → adj=23` 但 outcome 是 `MOVE from=38 → to=23`。
from=38 是石磨生成器（gen_mill_01），这不是普通物品——生成器的合并/移动逻辑可能与普通物品不同。

### 线索 3：hoverIndex 始终 undefined
`moveCellPointer` 中 `dragging.hoverIndex = getCellIndexFromPoint(...)` 被调用了，但 `endCellPointer` 读到的 `hoverIndex` 始终 undefined。
可能原因：pointermove 事件没触发、或 dragging 对象在 moveCellPointer 和 endCellPointer 之间被重建/丢失。

### 线索 4：Chrome 响应式模式
用户一直在 Chrome 响应式模式（Cmd+Shift+M）下测试，视口 868×933。
建议：让用户改用普通窗口测试，排除响应式模式的坐标异常。

---

## 五、用户环境

- **OS**: macOS
- **浏览器**: Chrome（使用响应式模式 Cmd+Shift+M，视口 868×933）
- **代理**: Shadowrocket（127.0.0.1:52314），对 github.com 时通时断
- **本地服务器**: `python -m http.server 8765` 在 `game/playable-v0.1/` 目录运行
- **访问方式**: `http://localhost:8765/?v=merge-fix-v20`（需 Cmd+Shift+R 强刷清除缓存）

---

## 六、用户的强烈要求

1. **"改完真测再给我说"** —— 不要只做代码审查或 headless 测试就报完成，必须在真机上验证通过
2. **不要反复说"已经修好了"但实际没修好** —— 用户已因此非常不满
3. **如果方向向量方案本身就走不通，换别的思路** —— 不要在同一条路上反复打补丁
4. **产品改进建议也待研发** —— 资源栏大小、棋格布局、交付按钮位置等 UI 问题

---

## 七、Git 信息

- 仓库：`/Users/zhuangjin/Documents/Codex/SilkRoadInn`
- 远程：`https://github.com/jinjinisjinjin/SilkRoadInn.git`（public）
- 当前 commit：`c6de49c`（初始提交，v20 的改动尚未 commit）
- 鉴权：token 从钥匙串取，git push 用 Basic（非 Bearer）
