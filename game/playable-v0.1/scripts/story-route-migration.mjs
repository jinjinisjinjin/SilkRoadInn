const clone = (value) => JSON.parse(JSON.stringify(value));

const asArray = (value) => (Array.isArray(value) ? value : []);

const getRecipeCount = (save) => {
  if (typeof save.recipes === "number") return save.recipes;
  if (Array.isArray(save.recipes)) return save.recipes.length;
  if (save.recipes && typeof save.recipes === "object") return Object.keys(save.recipes).length;
  return 0;
};

const hasCompletedPoint = (completedMilestoneIds, completedPointIds, node) =>
  completedMilestoneIds.has(node.milestoneId) || completedPointIds.has(node.pointId);

const requirementStatus = (save, completedMilestoneIds, completedPointIds, node) => {
  const repairs = asArray(node.requires?.repairs);
  const missingRepairs = repairs.filter((pointId) => !completedPointIds.has(pointId));
  const completedOrders = new Set(asArray(save.completedOrderIds));
  const orders = asArray(node.requires?.orders);
  const missingOrders = orders.filter((orderId) => !completedOrders.has(orderId));
  const recipesRequired = node.requires?.recipes ?? 0;
  const recipesReady = getRecipeCount(save) >= recipesRequired;

  return {
    ok: missingRepairs.length === 0 && missingOrders.length === 0 && recipesReady,
    missingRepairs,
    missingOrders,
    recipesRequired,
    recipesReady,
    alreadyComplete: hasCompletedPoint(completedMilestoneIds, completedPointIds, node)
  };
};

export function migrateStoryRouteSave(oldSave, route, migrationPlan) {
  const migrated = clone(oldSave ?? {});
  const nodes = route.chapters.flatMap((chapter) => chapter.nodes);
  const nodeByMilestone = new Map(nodes.map((node) => [node.milestoneId, node]));
  const completedMilestoneIds = new Set(asArray(migrated.completedRepairs));
  const completedPointIds = new Set(asArray(migrated.repairs));

  for (const milestoneId of completedMilestoneIds) {
    const node = nodeByMilestone.get(milestoneId);
    if (node) completedPointIds.add(node.pointId);
  }

  const completedRoutePointIds = nodes
    .filter((node) => hasCompletedPoint(completedMilestoneIds, completedPointIds, node))
    .map((node) => node.pointId);

  const currentNode =
    nodes.find((node) => !hasCompletedPoint(completedMilestoneIds, completedPointIds, node)) ??
    nodes[nodes.length - 1];
  const currentChapter =
    route.chapters.find((chapter) => chapter.nodes.some((node) => node.pointId === currentNode.pointId)) ??
    route.chapters[0];

  const menuNode = nodes.find((node) => node.pointId === migrationPlan.specialCase.pointId);
  const menuComplete = menuNode ? hasCompletedPoint(completedMilestoneIds, completedPointIds, menuNode) : false;
  const menuRequirements = menuNode
    ? requirementStatus(migrated, completedMilestoneIds, completedPointIds, menuNode)
    : { ok: false, missingRepairs: [], recipesRequired: 0, recipesReady: false };

  migrated.storyRoute = {
    id: route.id,
    schemaVersion: route.schemaVersion,
    migrationVersion: migrationPlan.schemaVersion,
    chapterId: currentChapter.id,
    currentPointId: currentNode.pointId,
    completedRoutePointIds,
    menuOnWall: menuComplete ? "reviewed" : "gated",
    menuOnWallReview: menuComplete
      ? { menuOnWall: "reviewed" }
      : {
          lockedUntil: {
            repairs: asArray(menuNode?.requires?.repairs),
            orders: asArray(menuNode?.requires?.orders),
            recipes: menuNode?.requires?.recipes ?? 0
          },
          current: {
            missingRepairs: menuRequirements.missingRepairs,
            missingOrders: menuRequirements.missingOrders,
            recipesReady: menuRequirements.recipesReady,
            unlocked: menuRequirements.ok
          }
        }
  };

  return migrated;
}

export function migrationResourceSnapshot(save) {
  return {
    repairs: clone(save?.repairs ?? null),
    completedRepairs: clone(save?.completedRepairs ?? null),
    coins: clone(save?.coins ?? null),
    orders: clone(save?.orders ?? null),
    completedOrderIds: clone(save?.completedOrderIds ?? null),
    completedOrders: clone(save?.completedOrders ?? null),
    recipes: clone(save?.recipes ?? null),
    rewards: clone(save?.rewards ?? null),
    coinsEarned: clone(save?.coinsEarned ?? null),
    giftPacks: clone(save?.giftPacks ?? null)
  };
}
