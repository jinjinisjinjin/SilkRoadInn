(() => {
  const config = window.SCENE_CONFIG;
  if (!config) throw new Error("Missing SCENE_CONFIG");

  const viewport = document.querySelector("#viewport");
  const world = document.querySelector("#world");
  const base = document.querySelector("#base");
  const overlays = document.querySelector("#overlays");
  const completion = document.querySelector("#completion");
  const embeddedRepairId = new URLSearchParams(location.search).get("repairId");
  const width = config.width;
  const height = config.height;
  const restored = new Set();
  const pointers = new Map();

  let scale = 1;
  let x = 0;
  let y = 0;
  let minScale = 1;
  let lastPinch = null;
  let tapCandidate = null;

  world.style.width = `${width}px`;
  world.style.height = `${height}px`;
  base.src = config.base;

  config.repairs.forEach((repair, index) => {
    const image = document.createElement("img");
    image.className = "old-overlay";
    image.src = repair.file;
    image.dataset.index = String(index);
    image.alt = "";
    image.style.zIndex = String(index + 1);
    overlays.append(image);
  });

  function clampCamera() {
    const scaledWidth = width * scale;
    const scaledHeight = height * scale;
    x = scaledWidth > innerWidth
      ? Math.min(0, Math.max(innerWidth - scaledWidth, x))
      : (innerWidth - scaledWidth) / 2;
    y = scaledHeight > innerHeight
      ? Math.min(0, Math.max(innerHeight - scaledHeight, y))
      : (innerHeight - scaledHeight) / 2;
  }

  function paint() {
    clampCamera();
    world.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
  }

  function initialFrame() {
    minScale = Math.max(innerWidth / width, innerHeight / height);
    scale = minScale * (config.initial.zoom || 1.08);
    x = innerWidth / 2 - config.initial.x * scale;
    y = innerHeight / 2 - config.initial.y * scale;
    paint();
  }

  function pointerPair() {
    const values = [...pointers.values()];
    const dx = values[0].x - values[1].x;
    const dy = values[0].y - values[1].y;
    return {
      centerX: (values[0].x + values[1].x) / 2,
      centerY: (values[0].y + values[1].y) / 2,
      distance: Math.max(1, Math.hypot(dx, dy)),
    };
  }

  function showSpark(point) {
    const spark = document.createElement("i");
    spark.className = "spark";
    spark.style.left = `${point[0]}px`;
    spark.style.top = `${point[1]}px`;
    spark.style.zIndex = "30";
    world.append(spark);
    spark.addEventListener("animationend", () => spark.remove());
  }

  function restore(index, point) {
    if (restored.has(index)) return;
    restored.add(index);
    overlays
      .querySelector(`.old-overlay[data-index="${index}"]`)
      .classList.add("is-restored");
    showSpark(point);

    if (restored.size === config.repairs.length) {
      completion.classList.remove("is-dismissing");
      completion.hidden = false;
    }
  }

  function hitTest(clientX, clientY) {
    const localX = (clientX - x) / scale;
    const localY = (clientY - y) / scale;
    let best = null;

    config.repairs.forEach((repair, index) => {
      if (restored.has(index)) return;
      repair.targets.forEach((target) => {
        const distance = Math.hypot(localX - target[0], localY - target[1]);
        if (distance > target[2]) return;
        const score = distance / target[2];
        if (!best || score < best.score) best = { index, target, score };
      });
    });

    if (best) restore(best.index, best.target);
    return Boolean(best);
  }

  function zoomAt(clientX, clientY, nextScale) {
    const localX = (clientX - x) / scale;
    const localY = (clientY - y) / scale;
    scale = Math.min(minScale * 3.4, Math.max(minScale, nextScale));
    x = clientX - localX * scale;
    y = clientY - localY * scale;
    paint();
  }

  viewport.addEventListener("pointerdown", (event) => {
    viewport.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
      startX: event.clientX,
      startY: event.clientY,
    });
    viewport.classList.add("is-dragging");

    if (pointers.size === 1) {
      tapCandidate = {
        pointerId: event.pointerId,
        x: event.clientX,
        y: event.clientY,
      };
      lastPinch = null;
    } else {
      tapCandidate = null;
      lastPinch = pointers.size === 2 ? pointerPair() : null;
    }
  });

  viewport.addEventListener("pointermove", (event) => {
    const current = pointers.get(event.pointerId);
    if (!current) return;

    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;
    current.x = event.clientX;
    current.y = event.clientY;

    if (
      tapCandidate
      && Math.hypot(
        event.clientX - current.startX,
        event.clientY - current.startY,
      ) > 8
    ) {
      tapCandidate = null;
    }

    if (pointers.size === 1) {
      x += dx;
      y += dy;
      paint();
      return;
    }

    if (pointers.size === 2 && lastPinch) {
      const next = pointerPair();
      const localX = (lastPinch.centerX - x) / scale;
      const localY = (lastPinch.centerY - y) / scale;
      scale = Math.min(
        minScale * 3.4,
        Math.max(minScale, scale * (next.distance / lastPinch.distance)),
      );
      x = next.centerX - localX * scale;
      y = next.centerY - localY * scale;
      lastPinch = next;
      paint();
    }
  });

  function endPointer(event) {
    const isTap = tapCandidate
      && tapCandidate.pointerId === event.pointerId
      && pointers.size === 1;
    if (isTap) hitTest(event.clientX, event.clientY);
    pointers.delete(event.pointerId);
    tapCandidate = null;
    lastPinch = pointers.size === 2 ? pointerPair() : null;
    if (pointers.size === 0) viewport.classList.remove("is-dragging");
  }

  viewport.addEventListener("pointerup", endPointer);
  viewport.addEventListener("pointercancel", endPointer);
  viewport.addEventListener("wheel", (event) => {
    event.preventDefault();
    zoomAt(event.clientX, event.clientY, scale * Math.exp(-event.deltaY * 0.0014));
  }, { passive: false });

  completion.addEventListener("pointerup", (event) => {
    event.stopPropagation();
    completion.classList.add("is-dismissing");
    window.setTimeout(() => {
      completion.hidden = true;
      if (window.parent !== window && embeddedRepairId) {
        window.parent.postMessage(
          { type: "silkroad:repair-complete", repairId: embeddedRepairId },
          window.location.origin,
        );
      }
    }, 340);
  });

  window.addEventListener("resize", initialFrame);
  window.__repairPreview = {
    getState: () => ({
      restored: restored.size,
      remaining: config.repairs.length - restored.size,
      scale,
      x,
      y,
      completionVisible: !completion.hidden,
    }),
    restore: (index) => {
      const repair = config.repairs[index];
      if (repair) restore(index, repair.targets[0]);
    },
    reset: () => {
      restored.clear();
      overlays.querySelectorAll(".old-overlay").forEach((item) => {
        item.classList.remove("is-restored");
      });
      completion.classList.remove("is-dismissing");
      completion.hidden = true;
      initialFrame();
    },
  };

  initialFrame();
})();
