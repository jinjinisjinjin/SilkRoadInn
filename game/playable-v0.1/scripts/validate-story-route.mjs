import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { migrateStoryRouteSave, migrationResourceSnapshot } from "./story-route-migration.mjs";

const root = resolve(import.meta.dirname, "..");
const route = JSON.parse(readFileSync(resolve(root, "data/story-route-v0.1.json"), "utf8"));
const progression = JSON.parse(readFileSync(resolve(root, "data/progression.json"), "utf8"));
const migration = JSON.parse(readFileSync(resolve(root, "data/story-route-migration-v0.1.json"), "utf8"));
const expectedOrder = ["02", "04", "03", "05", "06", "15", "16", "17-18", "07", "08", "09", "10", "12", "13-14", "11", "19", "20", "21-23", "24", "25", "26", "27"];
const nodes = route.chapters.flatMap((chapter) => chapter.nodes);
const errors = [];

const same = (left, right) => JSON.stringify(left) === JSON.stringify(right);
const progressionByPoint = new Map(progression.milestones.map((milestone) => [milestone.playerPointId, milestone]));
const routePoints = nodes.map((node) => node.pointId);

if (!same(routePoints, expectedOrder)) errors.push(`Player order mismatch: ${routePoints.join(", ")}`);
if (nodes.length !== 22 || new Set(routePoints).size !== 22) errors.push("Route must contain 22 unique point IDs.");
if (!same(nodes.map((node) => node.ordinal), Array.from({ length: 22 }, (_, index) => index + 1))) errors.push("Route ordinals must be 1 through 22.");
if (route.chapters.length !== 4) errors.push("Route must contain four chapters.");

for (const node of nodes) {
  const milestone = progressionByPoint.get(node.pointId);
  if (!milestone) {
    errors.push(`Missing progression milestone for ${node.pointId}.`);
    continue;
  }
  if (node.milestoneId !== milestone.id) errors.push(`Milestone ID mismatch for ${node.pointId}.`);
  if (node.playerUrl !== milestone.playerUrl) errors.push(`Player URL mismatch for ${node.pointId}.`);
  if (!same(node.longscrollRegionIds, milestone.longscrollRegionIds)) errors.push(`Longscroll regions mismatch for ${node.pointId}.`);
  const relativePlayerPath = node.playerUrl.split("?")[0];
  if (!existsSync(resolve(root, relativePlayerPath))) errors.push(`Missing player page for ${node.pointId}: ${relativePlayerPath}`);
}

const menuNode = nodes.find((node) => node.pointId === "11");
const watchtowerNode = nodes.find((node) => node.pointId === "13-14");
if (!menuNode || !watchtowerNode || menuNode.ordinal <= watchtowerNode.ordinal) errors.push("Point 11 must be after point 13-14.");
if (!same(menuNode?.requires?.repairs, ["13-14"]) || menuNode?.requires?.recipes !== 3) errors.push("Point 11 must require 13-14 and three recipes.");
if (!same(migration.authoritativeOrder, expectedOrder)) errors.push("Migration order must match authoritative order.");

const legacyOrder = progression.milestones.map((milestone) => milestone.playerPointId);
if (!same(migration.legacyOrder, legacyOrder)) errors.push("Migration legacy order must match current progression order.");
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
if (migratedMenuPending.storyRoute?.menuOnWallReview?.current?.unlocked) errors.push("Incomplete point 11 save must not be unlocked before 13-14 and three recipes.");

if (errors.length) {
  console.error("Story route validation failed:\n- " + errors.join("\n- "));
  process.exit(1);
}

console.log(`Story route validation passed: ${nodes.length} nodes, ${route.chapters.length} chapters, point 11 at position ${menuNode.ordinal}.`);
console.log("Migration samples passed: point 11 complete -> reviewed; point 11 incomplete -> gated; resources unchanged.");
