const config = {
  width: 1586,
  height: 992,
  focus: [780, 350],
  base: "base.webp",
  overlayRoot: ".",
  repairs: [
    { file: "overlay-01.webp", targets: [[760, 220, 240], [1320, 250, 150]] },
    { file: "overlay-02.webp", targets: [[760, 850, 250], [1260, 760, 170]] },
    { file: "overlay-03.webp", targets: [[70, 470, 110], [1510, 470, 110], [760, 55, 190]] },
    { file: "overlay-04.webp", targets: [[530, 455, 110], [980, 450, 110], [1290, 560, 100]] },
    { file: "overlay-05.webp", targets: [[780, 555, 145]] },
    { file: "overlay-06.webp", targets: [[230, 565, 145], [1190, 350, 150]] },
    { file: "overlay-07.webp", targets: [[760, 700, 180], [760, 880, 170]] },
    { file: "overlay-08.webp", targets: [[240, 175, 135]] },
    { file: "overlay-09.webp", targets: [[135, 330, 90], [1450, 330, 90]] },
  ],
};

const viewport = document.querySelector("#viewport");
const world = document.querySelector("#world");
const overlays = document.querySelector("#overlays");
const completion = document.querySelector("#completion");
const embeddedRepairId = new URLSearchParams(location.search).get("repairId") || "02";
const restored = new Set();
const pointers = new Map();
let scale = 1;
let x = 0;
let y = 0;
let gestureMoved = false;
let lastPinch = null;

world.style.setProperty("--world-width", `${config.width}px`);
world.style.setProperty("--world-height", `${config.height}px`);
document.querySelector("#base").src = config.base;

config.repairs.forEach((repair, index) => {
  const image = document.createElement("img");
  image.className = "old-overlay";
  image.src = `${config.overlayRoot}/${repair.file}`;
  image.dataset.index = index;
  image.alt = "";
  image.style.zIndex = index + 1;
  overlays.append(image);
});

function minimumScale() {
  return Math.max(innerWidth / config.width, innerHeight / config.height);
}

function clampCamera() {
  const width = config.width * scale;
  const height = config.height * scale;
  x = width > innerWidth ? Math.min(0, Math.max(innerWidth - width, x)) : (innerWidth - width) / 2;
  y = height > innerHeight ? Math.min(0, Math.max(innerHeight - height, y)) : (innerHeight - height) / 2;
}

function paint() {
  clampCamera();
  world.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
}

function initialFrame() {
  scale = minimumScale() * 1.08;
  x = innerWidth / 2 - config.focus[0] * scale;
  y = innerHeight / 2 - config.focus[1] * scale;
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

function restore(index, localPoint) {
  if (restored.has(index)) return;
  restored.add(index);
  document.querySelector(`.old-overlay[data-index="${index}"]`).classList.add("is-restored");

  const spark = document.createElement("i");
  spark.className = "spark";
  spark.style.left = `${localPoint[0]}px`;
  spark.style.top = `${localPoint[1]}px`;
  spark.style.zIndex = 30;
  world.append(spark);
  spark.addEventListener("animationend", () => spark.remove());

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
    repair.targets.forEach(([targetX, targetY, radius]) => {
      const score = Math.hypot(localX - targetX, localY - targetY) / radius;
      if (score <= 1 && (!best || score < best.score)) {
        best = { index, score, point: [localX, localY] };
      }
    });
  });

  if (best) restore(best.index, best.point);
}

viewport.addEventListener("pointerdown", (event) => {
  viewport.setPointerCapture(event.pointerId);
  pointers.set(event.pointerId, {
    x: event.clientX,
    y: event.clientY,
    startX: event.clientX,
    startY: event.clientY,
  });
  if (pointers.size === 1) gestureMoved = false;
  if (pointers.size === 2) {
    gestureMoved = true;
    lastPinch = pointerPair();
  }
  viewport.classList.add("is-dragging");
});

viewport.addEventListener("pointermove", (event) => {
  const current = pointers.get(event.pointerId);
  if (!current) return;
  const dx = event.clientX - current.x;
  const dy = event.clientY - current.y;
  current.x = event.clientX;
  current.y = event.clientY;

  if (Math.hypot(event.clientX - current.startX, event.clientY - current.startY) > 7) {
    gestureMoved = true;
  }

  if (pointers.size === 1) {
    x += dx;
    y += dy;
    paint();
  } else if (pointers.size === 2) {
    const next = pointerPair();
    const localX = (lastPinch.centerX - x) / scale;
    const localY = (lastPinch.centerY - y) / scale;
    scale = Math.min(minimumScale() * 3.2, Math.max(minimumScale(), scale * (next.distance / lastPinch.distance)));
    x = next.centerX - localX * scale;
    y = next.centerY - localY * scale;
    lastPinch = next;
    gestureMoved = true;
    paint();
  }
});

viewport.addEventListener("pointerup", (event) => {
  if (pointers.size === 1 && !gestureMoved) hitTest(event.clientX, event.clientY);
  pointers.delete(event.pointerId);
  lastPinch = pointers.size === 2 ? pointerPair() : null;
  if (pointers.size === 0) viewport.classList.remove("is-dragging");
});

viewport.addEventListener("pointercancel", (event) => {
  pointers.delete(event.pointerId);
  if (pointers.size === 0) viewport.classList.remove("is-dragging");
});

viewport.addEventListener("wheel", (event) => {
  event.preventDefault();
  const localX = (event.clientX - x) / scale;
  const localY = (event.clientY - y) / scale;
  const nextScale = scale * Math.exp(-event.deltaY * 0.001);
  scale = Math.min(minimumScale() * 3.2, Math.max(minimumScale(), nextScale));
  x = event.clientX - localX * scale;
  y = event.clientY - localY * scale;
  paint();
}, { passive: false });

completion.addEventListener("pointerdown", (event) => event.stopPropagation());
completion.addEventListener("pointerup", (event) => {
  event.stopPropagation();
  completion.classList.add("is-dismissing");
  window.setTimeout(() => {
    completion.hidden = true;
    if (window.parent !== window) {
      window.parent.postMessage({ type: "silkroad:repair-complete", repairId: embeddedRepairId }, window.location.origin);
    }
  }, 320);
});

window.addEventListener("resize", initialFrame);

initialFrame();
