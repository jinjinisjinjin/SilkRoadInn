(() => {
  "use strict";

  const config = window.REPAIR_SCENE_CONFIG;
  if (!config || !Array.isArray(config.repairs) || config.repairs.length === 0) {
    throw new Error("Missing repair scene configuration.");
  }

  const viewport = document.querySelector("#sceneViewport");
  const world = document.querySelector("#sceneWorld");
  const baseImage = document.querySelector("#baseImage");
  const overlayStack = document.querySelector("#overlayStack");
  const completion = document.querySelector("#completion");
  const completionTitle = document.querySelector("#completionTitle");
  const completionLine = document.querySelector("#completionLine");
  const embeddedRepairId = new URLSearchParams(location.search).get("repairId");

  const worldWidth = config.width || 1672;
  const worldHeight = config.height || 941;
  world.style.width = `${worldWidth}px`;
  world.style.height = `${worldHeight}px`;
  baseImage.src = config.base;
  completionTitle.textContent = config.title;
  completionLine.textContent = config.completionLine;
  document.title = `${config.title} · 修缮预览`;
  viewport.setAttribute("aria-label", `${config.title}修缮场景`);

  const overlays = config.repairs.map((repair, index) => {
    const image = document.createElement("img");
    image.className = "old-overlay";
    image.src = `${config.overlayRoot}${repair.file}`;
    image.alt = "";
    image.draggable = false;
    image.style.setProperty("--layer-index", String(index + 1));
    overlayStack.append(image);
    return image;
  });

  const repaired = new Set();
  const pointers = new Map();
  let scale = 1;
  let minScale = 1;
  let x = 0;
  let y = 0;
  let gesture = null;

  function render() {
    world.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  }

  function clampCamera() {
    const viewportWidth = viewport.clientWidth;
    const viewportHeight = viewport.clientHeight;
    const scaledWidth = worldWidth * scale;
    const scaledHeight = worldHeight * scale;

    if (scaledWidth <= viewportWidth) {
      x = (viewportWidth - scaledWidth) / 2;
    } else {
      x = Math.min(0, Math.max(viewportWidth - scaledWidth, x));
    }

    if (scaledHeight <= viewportHeight) {
      y = (viewportHeight - scaledHeight) / 2;
    } else {
      y = Math.min(0, Math.max(viewportHeight - scaledHeight, y));
    }
  }

  function setInitialCamera() {
    const viewportWidth = viewport.clientWidth;
    const viewportHeight = viewport.clientHeight;
    minScale = Math.max(
      viewportWidth / worldWidth,
      viewportHeight / worldHeight,
    );
    scale = Math.min(
      minScale * (config.initialZoom || 1.08),
      minScale * (config.maxZoom || 3.2),
    );
    const focus = config.initialFocus || [worldWidth / 2, worldHeight / 2];
    x = viewportWidth / 2 - focus[0] * scale;
    y = viewportHeight / 2 - focus[1] * scale;
    clampCamera();
    render();
  }

  function screenToWorld(clientX, clientY) {
    const rect = viewport.getBoundingClientRect();
    return {
      x: (clientX - rect.left - x) / scale,
      y: (clientY - rect.top - y) / scale,
    };
  }

  function findRepairAt(point) {
    let best = null;
    config.repairs.forEach((repair, repairIndex) => {
      if (repaired.has(repairIndex)) return;
      repair.targets.forEach((target) => {
        const distance = Math.hypot(point.x - target[0], point.y - target[1]);
        const score = distance / target[2];
        if (score <= 1 && (!best || score < best.score)) {
          best = { repairIndex, score };
        }
      });
    });
    return best ? best.repairIndex : -1;
  }

  function addSpark(point) {
    const spark = document.createElement("span");
    spark.className = "repair-spark";
    spark.style.left = `${point.x}px`;
    spark.style.top = `${point.y}px`;
    world.append(spark);
    window.setTimeout(() => spark.remove(), 650);
  }

  function showCompletion() {
    completion.hidden = false;
    completion.classList.remove("is-dismissed");
    requestAnimationFrame(() => completion.classList.add("is-visible"));
  }

  function restoreRepair(repairIndex, point) {
    if (
      repairIndex < 0 ||
      repairIndex >= overlays.length ||
      repaired.has(repairIndex)
    ) {
      return false;
    }

    repaired.add(repairIndex);
    overlays[repairIndex].classList.add("is-restored");
    const fallback = config.repairs[repairIndex].targets[0];
    addSpark(point || { x: fallback[0], y: fallback[1] });

    if (repaired.size === overlays.length) {
      window.setTimeout(showCompletion, 520);
    }
    return true;
  }

  function reset(resetCamera = true) {
    repaired.clear();
    overlays.forEach((overlay) => overlay.classList.remove("is-restored"));
    completion.classList.remove("is-visible", "is-dismissed");
    completion.hidden = true;
    if (resetCamera) setInitialCamera();
  }

  function startGesture() {
    const active = [...pointers.values()];
    if (active.length === 1) {
      gesture = {
        type: "pan",
        startX: active[0].clientX,
        startY: active[0].clientY,
        cameraX: x,
        cameraY: y,
      };
      return;
    }

    if (active.length >= 2) {
      const [first, second] = active;
      const centerX = (first.clientX + second.clientX) / 2;
      const centerY = (first.clientY + second.clientY) / 2;
      const distance = Math.hypot(
        second.clientX - first.clientX,
        second.clientY - first.clientY,
      );
      const worldPoint = screenToWorld(centerX, centerY);
      gesture = {
        type: "pinch",
        distance,
        scale,
        worldPoint,
      };
      pointers.forEach((pointer) => {
        pointer.moved = true;
      });
    }
  }

  viewport.addEventListener("pointerdown", (event) => {
    if (completion.classList.contains("is-visible")) return;
    viewport.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, {
      clientX: event.clientX,
      clientY: event.clientY,
      downX: event.clientX,
      downY: event.clientY,
      moved: false,
    });
    viewport.classList.add("is-dragging");
    startGesture();
  });

  viewport.addEventListener("pointermove", (event) => {
    const pointer = pointers.get(event.pointerId);
    if (!pointer) return;

    pointer.clientX = event.clientX;
    pointer.clientY = event.clientY;
    if (Math.hypot(event.clientX - pointer.downX, event.clientY - pointer.downY) > 8) {
      pointer.moved = true;
    }

    const active = [...pointers.values()];
    if (active.length === 1 && gesture?.type === "pan") {
      x = gesture.cameraX + active[0].clientX - gesture.startX;
      y = gesture.cameraY + active[0].clientY - gesture.startY;
      clampCamera();
      render();
      return;
    }

    if (active.length >= 2) {
      if (gesture?.type !== "pinch") startGesture();
      const [first, second] = active;
      const centerX = (first.clientX + second.clientX) / 2;
      const centerY = (first.clientY + second.clientY) / 2;
      const distance = Math.hypot(
        second.clientX - first.clientX,
        second.clientY - first.clientY,
      );
      const nextScale = Math.min(
        minScale * (config.maxZoom || 3.2),
        Math.max(minScale, gesture.scale * (distance / gesture.distance)),
      );
      scale = nextScale;
      x = centerX - gesture.worldPoint.x * scale;
      y = centerY - gesture.worldPoint.y * scale;
      clampCamera();
      render();
    }
  });

  function finishPointer(event) {
    const pointer = pointers.get(event.pointerId);
    if (!pointer) return;

    const canTap = pointers.size === 1 && !pointer.moved;
    pointers.delete(event.pointerId);

    if (canTap) {
      const point = screenToWorld(event.clientX, event.clientY);
      const repairIndex = findRepairAt(point);
      restoreRepair(repairIndex, point);
    }

    if (pointers.size === 0) {
      gesture = null;
      viewport.classList.remove("is-dragging");
    } else {
      startGesture();
    }
  }

  viewport.addEventListener("pointerup", finishPointer);
  viewport.addEventListener("pointercancel", finishPointer);

  viewport.addEventListener(
    "wheel",
    (event) => {
      event.preventDefault();
      const point = screenToWorld(event.clientX, event.clientY);
      const nextScale = Math.min(
        minScale * (config.maxZoom || 3.2),
        Math.max(minScale, scale * Math.exp(-event.deltaY * 0.0014)),
      );
      scale = nextScale;
      x = event.clientX - point.x * scale;
      y = event.clientY - point.y * scale;
      clampCamera();
      render();
    },
    { passive: false },
  );

  completion.addEventListener("click", () => {
    completion.classList.add("is-dismissed");
    window.setTimeout(() => {
      completion.hidden = true;
      completion.classList.remove("is-visible");
      if (window.parent !== window && embeddedRepairId) {
        window.parent.postMessage(
          { type: "silkroad:repair-complete", repairId: embeddedRepairId },
          window.location.origin,
        );
      }
    }, 380);
  });

  window.addEventListener("resize", setInitialCamera);
  window.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() === "r") reset(true);
  });

  window.__repairPreview = {
    reset,
    restore(repairIndex) {
      return restoreRepair(repairIndex);
    },
    restoreAll() {
      config.repairs.forEach((_, index) => restoreRepair(index));
    },
    getState() {
      return {
        repaired: [...repaired],
        total: overlays.length,
        completionVisible: completion.classList.contains("is-visible"),
        camera: { x, y, scale, minScale },
      };
    },
  };

  setInitialCamera();
})();
