import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { runInNewContext } from "node:vm";
import { migrateStoryRouteSave, migrationResourceSnapshot } from "./story-route-migration.mjs";

const root = resolve(import.meta.dirname, "..");
const route = JSON.parse(readFileSync(resolve(root, "data/story-route-v0.1.json"), "utf8"));
const progression = JSON.parse(readFileSync(resolve(root, "data/progression.json"), "utf8"));
const inn = JSON.parse(readFileSync(resolve(root, "data/inn.json"), "utf8"));
const orders = JSON.parse(readFileSync(resolve(root, "data/orders.json"), "utf8"));
const migration = JSON.parse(readFileSync(resolve(root, "data/story-route-migration-v0.1.json"), "utf8"));
const expectedOrder = progression.milestones.map((milestone) => milestone.playerPointId);
const expectedLegacyOrder = ["02", "04", "03", "05", "06", "15", "16", "17-18", "07", "08", "09", "10", "12", "13-14", "11", "19", "20", "21-23", "24", "25", "26", "27"];
const expectedChapterCounts = [3, 6, 6, 7];
const expectedLevelCounts = [1, 2, 2, 2, 2, 2, 2, 2, 3, 4];
const nodes = route.chapters.flatMap((chapter) => chapter.nodes);
const errors = [];

const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const progressionByPoint = new Map(progression.milestones.map((milestone) => [milestone.playerPointId, milestone]));
const pointByMilestoneId = new Map(progression.milestones.map((milestone) => [milestone.id, milestone.playerPointId]));
const routePoints = nodes.map((node) => node.pointId);
const orderIds = new Set(orders.orders.map((order) => order.id));
const chapterStorySandbox = { window: {} };
runInNewContext(readFileSync(resolve(root, "chapter-story.js"), "utf8"), chapterStorySandbox);
const storyChapters = chapterStorySandbox.window.SilkRoadChapterStory?.storyChapters ?? [];

if (!same(routePoints, expectedOrder)) errors.push(`Player order mismatch: ${routePoints.join(", ")}`);
if (nodes.length !== 22 || new Set(routePoints).size !== 22) errors.push("Route must contain 22 unique point IDs.");
if (!same(nodes.map((node) => node.ordinal), Array.from({ length: 22 }, (_, index) => index + 1))) errors.push("Route ordinals must be 1 through 22.");
if (route.chapters.length !== 4) errors.push("Route must contain four chapters.");
if (!same(route.chapters.map((chapter) => chapter.nodes.length), expectedChapterCounts)) errors.push("Chapter node counts must be 3/6/6/7.");
if (inn.levels.length !== 10 || !same(inn.levels.map((level) => level.level), Array.from({ length: 10 }, (_, index) => index + 1))) {
  errors.push("Inn progression must contain sequential Lv1-Lv10 definitions.");
}
if (!same(
  Array.from({ length: 10 }, (_, index) => progression.milestones.filter((milestone) => milestone.innLevel === index + 1).length),
  expectedLevelCounts,
)) errors.push("Repair counts by inn level must be 1/2/2/2/2/2/2/2/3/4.");
if (storyChapters.length !== 20 || !same(storyChapters.map((chapter) => chapter.number), Array.from({ length: 20 }, (_, index) => index + 1))) {
  errors.push("Narrative progression must contain sequential Chapters 1-20.");
}
if (!same(storyChapters.map((chapter) => chapter.volume), [1,1,1,1,1,2,2,2,2,2,3,3,3,3,3,4,4,4,4,4])) {
  errors.push("The 20 narrative chapters must be distributed five per volume.");
}
for (const reward of progression.chapterCompletionRewards ?? []) {
  if (!reward.giftPack?.id || reward.stamina || reward.rubies) {
    errors.push(`Chapter ${reward.chapter} must award only its gift box.`);
  }
}

for (const [chapterIndex, chapter] of route.chapters.entries()) {
  for (const node of chapter.nodes) {
  const milestone = progressionByPoint.get(node.pointId);
  if (!milestone) {
    errors.push(`Missing progression milestone for ${node.pointId}.`);
    continue;
  }
  if ((milestone.chapter ?? 1) !== chapterIndex + 1) errors.push(`Chapter mismatch for ${node.pointId}.`);
  if (node.innLevel !== milestone.innLevel) errors.push(`Inn-level mismatch for ${node.pointId}.`);
  if (node.milestoneId !== milestone.id) errors.push(`Milestone ID mismatch for ${node.pointId}.`);
  if (node.playerUrl !== milestone.playerUrl) errors.push(`Player URL mismatch for ${node.pointId}.`);
  if (!same(node.longscrollRegionIds, milestone.longscrollRegionIds)) errors.push(`Longscroll regions mismatch for ${node.pointId}.`);
  const requiredOrders = milestone.conditions?.completedOrderIds ?? [];
  if (!same(node.requires?.orders ?? [], requiredOrders)) errors.push(`Narrative-order gate mismatch for ${node.pointId}.`);
  requiredOrders.forEach((orderId) => {
    if (!orderIds.has(orderId)) errors.push(`Missing narrative order ${orderId} for ${node.pointId}.`);
  });
  if ((node.requires?.completedOrders ?? 0) !== (milestone.conditions?.completedOrders ?? 0)) {
    errors.push(`Completed-order count mismatch for ${node.pointId}.`);
  }
  if (!same(node.requires?.repairs ?? [], (milestone.conditions?.completedRepairs ?? []).map((id) => pointByMilestoneId.get(id)))) {
    errors.push(`Previous-repair requirement mismatch for ${node.pointId}.`);
  }
  if (node.requires?.coins !== milestone.repairCost) errors.push(`Repair cost mismatch for ${node.pointId}.`);
  if (milestone.rewards?.coins) errors.push(`Point ${node.pointId} must not grant extra repair coins.`);
  const relativePlayerPath = node.playerUrl.split("?")[0];
  if (!existsSync(resolve(root, relativePlayerPath))) errors.push(`Missing player page for ${node.pointId}: ${relativePlayerPath}`);
  }
}

const menuNode = nodes.find((node) => node.pointId === "11");
if (!menuNode || menuNode.ordinal !== 3) errors.push("Point 11 must be the third repair node in Chapter 1.");
if (!same(menuNode?.requires?.repairs, ["04"]) || !same(menuNode?.requires?.orders, ["order_005_monk_humabing"])) {
  errors.push("Point 11 must follow point 04 and the monk's胡麻饼 order.");
}
if (nodes[0]?.requires?.completedOrders !== 1) errors.push("The first repair must wait until one order is delivered.");
if (nodes.slice(1).some((node) => node.requires?.completedOrders)) {
  errors.push("Later repairs must not require an order count.");
}
if (!same(migration.authoritativeOrder, expectedOrder)) errors.push("Migration order must match authoritative order.");

if (!same(migration.legacyOrder, expectedLegacyOrder)) errors.push("Migration legacy order must match the interim route order.");
if (!same([...new Set(migration.legacyOrder)].sort(), [...new Set(expectedOrder)].sort())) errors.push("Legacy and authoritative orders must contain the same 22 points.");

const legacySaveWithMenuDone = {
  completedRepairs: ["tutorial_complete", "kitchen_repair", "codex_first_phase"],
  repairs: ["02", "04", "11"],
  coins: 431,
  orders: { active: ["order_005_monk_humabing"] },
  completedOrderIds: ["order_001_guard_lubing", "order_011_dunhuang_woman_lubing", "order_005_monk_humabing"],
  recipes: ["lubing", "humabing"],
  rewards: { claimed: ["gift_livestock_pen_parts_01"] },
  coinsEarned: 711,
  giftPacks: { gift_livestock_pen_parts_01: { quantity: 1 } }
};

const legacySaveWithoutMenuDone = {
  completedRepairs: ["tutorial_complete", "kitchen_repair"],
  repairs: ["02", "04"],
  coins: 287,
  orders: { active: ["order_005_monk_humabing"], completedCount: 3 },
  completedOrderIds: ["order_001_guard_lubing", "order_011_dunhuang_woman_lubing"],
  recipes: ["lubing"],
  rewards: { claimed: [] },
  coinsEarned: 384,
  giftPacks: {}
};

const migratedMenuDone = migrateStoryRouteSave(legacySaveWithMenuDone, route, migration);
const migratedMenuPending = migrateStoryRouteSave(legacySaveWithoutMenuDone, route, migration);

if (!same(migrationResourceSnapshot(migratedMenuDone), migrationResourceSnapshot(legacySaveWithMenuDone))) {
  errors.push("Migration must not change repair/resource fields when point 11 is complete.");
}
if (!same(migrationResourceSnapshot(migratedMenuPending), migrationResourceSnapshot(legacySaveWithoutMenuDone))) {
  errors.push("Migration must not change repair/resource fields when point 11 is incomplete.");
}
if (migratedMenuDone.storyRoute?.menuOnWall !== "reviewed") errors.push("Completed point 11 save must mark menuOnWall as reviewed.");
if (!migratedMenuDone.storyRoute?.completedRoutePointIds?.includes("11")) errors.push("Completed point 11 save must retain route completion.");
if (migratedMenuPending.storyRoute?.menuOnWall !== "gated") errors.push("Incomplete point 11 save must keep menuOnWall gated.");
if (migratedMenuPending.storyRoute?.completedRoutePointIds?.includes("11")) errors.push("Incomplete point 11 save must not complete or unlock point 11 early.");
if (migratedMenuPending.storyRoute?.menuOnWallReview?.current?.unlocked) errors.push("Incomplete point 11 must remain gated until the monk's胡麻饼 order is complete.");

if (errors.length) {
  console.error("Story route validation failed:\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log(`Story route validation passed: ${nodes.length} repair nodes, 10 inn levels, 4 volumes, 20 narrative chapters.`);
console.log("Migration samples passed: canonical volume counts 3/6/6/7; point 11 order gate preserved; resources unchanged.");
