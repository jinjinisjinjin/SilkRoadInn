(() => {
  const W = 1672;
  const H = 941;
  const MASK_SCALE = 0.25;
  const MASK_W = Math.round(W * MASK_SCALE);
  const MASK_H = Math.round(H * MASK_SCALE);
  const config = window.PLAYER_SCENE;

  if (!config || config.overlays.length !== 9) {
    throw new Error("Player scene requires one base image and nine old-state overlays.");
  }

  const viewport = document.querySelector("#viewport");
  const world = document.querySelector("#world");
  const overlayHost = document.querySelector("#overlays");
  const completion = document.querySelector("#completion");
  const embeddedRepairId = new URLSearchParams(location.search).get("repairId");
  const restored = new Set();
  const pointers = new Map();
  const layers = [];
  let scale = 1;
  let x = 0;
  let y = 0;
  let minScale = 1;
  let gestureMoved = false;
  let pinchStart = null;
  let loadedImages = 0;

  document.title = `${config.title}｜修缮场景`;
  viewport.setAttribute("aria-label", `${config.title}修缮场景`);
  completion.querySelector("span").textContent = config.title;
  completion.querySelector("p").textContent = config.completion;

  function markLoaded() {
    loadedImages += 1;
    if (loadedImages === config.overlays.length + 1) {
      world.classList.add("is-ready");
    }
  }

  const base = document.querySelector("#base");
  base.addEventListener("load", markLoaded, { once: true });
  base.src = config.base;

  config.overlays.forEach((source, index) => {
    const image = new Image();
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d", { willReadFrequently: true });
    canvas.width = MASK_W;
    canvas.height = MASK_H;
    image.className = "old-overlay";
    image.dataset.index = index;
    image.alt = "";
    image.style.zIndex = index + 1;
    image.addEventListener("load", () => {
      try {
        context.clearRect(0, 0, MASK_W, MASK_H);
        context.drawImage(image, 0, 0, MASK_W, MASK_H);
        layers[index].mask = context.getImageData(0, 0, MASK_W, MASK_H).data;
      } catch (error) {
        layers[index].mask = null;
        console.warn("Alpha hit mask unavailable; using configured fallback target.", error);
      }
      markLoaded();
    }, { once: true });
    image.src = source;
    layers.push({
      image,
      mask: null,
      fallback: config.fallbackTargets?.[index] ?? [W / 2, H / 2, 64],
    });
    overlayHost.append(image);
  });

  function clampCamera() {
    const width = W * scale;
    const height = H * scale;
    x = width > innerWidth
      ? Math.min(0, Math.max(innerWidth - width, x))
      : (innerWidth - width) / 2;
    y = height > innerHeight
      ? Math.min(0, Math.max(innerHeight - height, y))
      : (innerHeight - height) / 2;
  }

  function paint() {
    clampCamera();
    world.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${scale})`;
  }

  function initialFrame() {
    minScale = Math.max(innerWidth / W, innerHeight / H);
    scale = minScale * (config.initialZoom ?? 1);
    const focusX = config.focus?.[0] ?? W / 2;
    const focusY = config.focus?.[1] ?? H / 2;
    x = innerWidth / 2 - focusX * scale;
    y = innerHeight / 2 - focusY * scale;
    paint();
  }

  function pointerPair() {
    const values = [...pointers.values()];
    const dx = values[0].x - values[1].x;
    const dy = values[0].y - values[1].y;
    return {
      centerX: (values[0].x + values[1].x) / 2,
      centerY: (values[0].y + values[1].y) / 2,
      distance: Math.hypot(dx, dy),
    };
  }

  function showSpark(localX, localY) {
    const spark = document.createElement("i");
    spark.className = "spark";
    spark.style.left = `${localX}px`;
    spark.style.top = `${localY}px`;
    spark.style.zIndex = 30;
    world.append(spark);
    spark.addEventListener("animationend", () => spark.remove(), { once: true });
  }

  function repair(index, localX, localY) {
    if (restored.has(index)) return;
    restored.add(index);
    layers[index].image.classList.add("is-restored");
    showSpark(localX, localY);
    navigator.vibrate?.(12);
    if (restored.size === layers.length) {
      window.setTimeout(() => {
        completion.classList.remove("is-dismissing");
        completion.hidden = false;
      }, 380);
    }
  }

  function maskHit(layer, localX, localY) {
    if (!layer.mask) {
      const [targetX, targetY, radius] = layer.fallback;
      return Math.hypot(localX - targetX, localY - targetY) <= radius;
    }

    const centerX = Math.round(localX * MASK_SCALE);
    const centerY = Math.round(localY * MASK_SCALE);
    const radius = Math.max(4, Math.round(34 * MASK_SCALE / Math.max(scale, minScale)));
    let bestDistance = Infinity;

    for (let offsetY = -radius; offsetY <= radius; offsetY += 1) {
      const sampleY = centerY + offsetY;
      if (sampleY < 0 || sampleY >= MASK_H) continue;
      for (let offsetX = -radius; offsetX <= radius; offsetX += 1) {
        const distance = Math.hypot(offsetX, offsetY);
        if (distance > radius || distance >= bestDistance) continue;
        const sampleX = centerX + offsetX;
        if (sampleX < 0 || sampleX >= MASK_W) continue;
        const alpha = layer.mask[(sampleY * MASK_W + sampleX) * 4 + 3];
        if (alpha > 20) bestDistance = distance;
      }
    }

    return Number.isFinite(bestDistance);
  }

  function hitTest(clientX, clientY) {
    const localX = (clientX - x) / scale;
    const localY = (clientY - y) / scale;
    if (localX < 0 || localX > W || localY < 0 || localY > H) return;

    for (let index = layers.length - 1; index >= 0; index -= 1) {
      if (!restored.has(index) && maskHit(layers[index], localX, localY)) {
        repair(index, localX, localY);
        return;
      }
    }
  }

  viewport.addEventListener("pointerdown", (event) => {
    if (!completion.hidden) return;
    viewport.setPointerCapture(event.pointerId);
    pointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
      startX: event.clientX,
      startY: event.clientY,
    });
    gestureMoved = false;
    pinchStart = pointers.size === 2 ? pointerPair() : null;
    viewport.classList.add("is-dragging");
  });

  viewport.addEventListener("pointermove", (event) => {
    const current = pointers.get(event.pointerId);
    if (!current) return;
    const dx = event.clientX - current.x;
    const dy = event.clientY - current.y;
    current.x = event.clientX;
    current.y = event.clientY;

    if (Math.hypot(event.clientX - current.startX, event.clientY - current.startY) > 8) {
      gestureMoved = true;
    }

    if (pointers.size === 1) {
      x += dx;
      y += dy;
      paint();
      return;
    }

    if (pointers.size === 2 && pinchStart) {
      const next = pointerPair();
      const localX = (pinchStart.centerX - x) / scale;
      const localY = (pinchStart.centerY - y) / scale;
      scale = Math.min(minScale * 3.4, Math.max(minScale, scale * (next.distance / pinchStart.distance)));
      x = next.centerX - localX * scale;
      y = next.centerY - localY * scale;
      pinchStart = next;
      gestureMoved = true;
      paint();
    }
  });

  function releasePointer(event) {
    const current = pointers.get(event.pointerId);
    const wasSingleTap = current && !gestureMoved && pointers.size === 1;
    pointers.delete(event.pointerId);
    pinchStart = pointers.size === 2 ? pointerPair() : null;
    if (pointers.size === 0) viewport.classList.remove("is-dragging");
    if (wasSingleTap) hitTest(event.clientX, event.clientY);
  }

  viewport.addEventListener("pointerup", releasePointer);
  viewport.addEventListener("pointercancel", releasePointer);

  viewport.addEventListener("wheel", (event) => {
    event.preventDefault();
    const localX = (event.clientX - x) / scale;
    const localY = (event.clientY - y) / scale;
    const factor = Math.exp(-event.deltaY * 0.0012);
    scale = Math.min(minScale * 3.4, Math.max(minScale, scale * factor));
    x = event.clientX - localX * scale;
    y = event.clientY - localY * scale;
    paint();
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
    }, 350);
  });

  window.addEventListener("resize", initialFrame);
  window.addEventListener("keydown", (event) => {
    if (event.key.toLowerCase() !== "r") return;
    restored.clear();
    layers.forEach(({ image }) => image.classList.remove("is-restored"));
    completion.classList.remove("is-dismissing");
    completion.hidden = true;
    initialFrame();
  });

  window.__playerPreviewState = {
    get restoredCount() {
      return restored.size;
    },
    get camera() {
      return { x, y, scale, minScale };
    },
    get masksReady() {
      return layers.every(({ mask }) => Boolean(mask));
    },
  };

  window.__repairPreview = {
    getState: () => ({
      restored: restored.size,
      remaining: layers.length - restored.size,
      completionVisible: !completion.hidden,
      camera: { x, y, scale, minScale },
    }),
    restore: (index) => {
      const layer = layers[index];
      if (layer) repair(index, layer.fallback[0], layer.fallback[1]);
    },
    reset: () => {
      restored.clear();
      layers.forEach(({ image }) => image.classList.remove("is-restored"));
      completion.classList.remove("is-dismissing");
      completion.hidden = true;
      initialFrame();
    },
  };

  initialFrame();
})();
