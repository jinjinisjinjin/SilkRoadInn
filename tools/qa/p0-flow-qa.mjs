import playwright from "/Users/zhuangjin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/.pnpm/playwright@1.61.1/node_modules/playwright/index.js";

const { chromium } = playwright;

const url = "http://127.0.0.1:4198/?qa=p0-automated";
const saveKey = "silkroad_tavern_proto_v01";

const browser = await chromium.launch({
  executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const checks = [];

function pass(name, detail = "") {
  checks.push({ name, ok: true, detail });
}

function fail(name, detail = "") {
  checks.push({ name, ok: false, detail });
}

async function state() {
  return page.evaluate((key) => {
    const data = JSON.parse(localStorage.getItem(key) || "{}");
    return {
      data,
      page: document.querySelector("#app")?.dataset.page,
      text: document.body.innerText,
      coins: document.querySelector("#coins")?.innerText,
      stamina: document.querySelector("#stamina")?.innerText,
      keeper: document.querySelector("#keeperText")?.innerText,
      stationClass: document.querySelector("#stationBtn")?.className,
      stationDisabled: document.querySelector("#stationBtn")?.disabled,
      repairOpen: document.querySelector("#repairModal")?.open,
      repairGateDisabled: document.querySelector("#repairConfirmBtn")?.disabled,
      repairGateText: document.querySelector("#repairCoinProgress")?.innerText,
      boardGuide: document.querySelector("#boardReturnBtn")?.className,
      orderStatuses: [...document.querySelectorAll(".order")].map((order) => ({
        label: order.getAttribute("aria-label"),
        text: order.innerText,
        ready: order.classList.contains("ready"),
      })),
    };
  }, saveKey);
}

async function closeOpenDialogs() {
  await page.locator("dialog[open] button").evaluateAll((buttons) => {
    buttons.find((button) => /知道了|×/.test(button.innerText || button.textContent || ""))?.click();
  }).catch(() => {});
  await page.waitForTimeout(150);
}

async function dragCell(fromIndex, toIndex) {
  const from = page.locator(`.cell[data-index="${fromIndex}"]`);
  const to = page.locator(`.cell[data-index="${toIndex}"]`);
  const fromBox = await from.boundingBox();
  const toBox = await to.boundingBox();
  if (!fromBox || !toBox) throw new Error(`missing cell boxes ${fromIndex}->${toIndex}`);
  await page.mouse.move(fromBox.x + fromBox.width / 2, fromBox.y + fromBox.height / 2);
  await page.mouse.down();
  await page.mouse.move(toBox.x + toBox.width / 2, toBox.y + toBox.height / 2, { steps: 8 });
  await page.mouse.up();
  await page.waitForTimeout(250);
}

await page.goto(url, { waitUntil: "domcontentloaded" });
await page.evaluate((key) => localStorage.removeItem(key), saveKey);
await page.reload({ waitUntil: "domcontentloaded" });
await page.waitForTimeout(300);

let s = await state();
if (s.data.coins === 128 && s.data.tutorialStep === 0 && s.data.board?.includes("gen_mill_01")) {
  pass("新档初始状态", `铜币${s.data.coins}，教程${s.data.tutorialStep}`);
} else {
  fail("新档初始状态", JSON.stringify({ coins: s.data.coins, tutorialStep: s.data.tutorialStep, board: s.data.board }));
}

const generatorIndex = s.data.board.findIndex((item) => item === "gen_mill_01");
await page.locator(`.cell[data-index="${generatorIndex}"]`).click();
await page.waitForTimeout(250);
s = await state();
if (s.data.tutorialStep === 1 && s.data.board.filter((item) => item === "hubing_01_dough").length >= 1) {
  pass("首次点击石磨产出麦面", `驼铃${s.data.stamina}/${s.data.staminaMax}`);
} else {
  fail("首次点击石磨产出麦面", JSON.stringify({ tutorialStep: s.data.tutorialStep, board: s.data.board }));
}

await page.locator(`.cell[data-index="${generatorIndex}"]`).click();
await page.waitForTimeout(250);
s = await state();
const doughIndexes = s.data.board.map((item, index) => (item === "hubing_01_dough" ? index : -1)).filter((index) => index >= 0);
if (doughIndexes.length >= 2) {
  pass("第二次点击石磨产出第二份麦面", doughIndexes.join(","));
} else {
  fail("第二次点击石磨产出第二份麦面", JSON.stringify(s.data.board));
}

await dragCell(doughIndexes[0], doughIndexes[1]);
await closeOpenDialogs();
s = await state();
const hasLubing = s.data.board.includes("hubing_02_lubing");
if (hasLubing && s.data.tutorialStep >= 2) {
  pass("拖拽二合一合成炉饼", `教程${s.data.tutorialStep}`);
} else {
  fail("拖拽二合一合成炉饼", JSON.stringify({ tutorialStep: s.data.tutorialStep, board: s.data.board }));
}

const guardOrder = s.orderStatuses.find((order) => order.label?.includes("沙州驿卒"));
if (guardOrder?.ready) {
  pass("沙州驿卒订单可交付", guardOrder.text.replace(/\s+/g, " ").slice(0, 80));
} else {
  fail("沙州驿卒订单可交付", guardOrder?.text ?? "missing");
}

await page.locator(".order.ready button").click();
await page.waitForTimeout(350);
s = await state();
if (s.data.completedOrders >= 1 && s.data.coins > 128 && s.data.tutorialStep >= 3) {
  pass("交付订单获得铜钱并推进教程", `订单${s.data.completedOrders}，铜币${s.data.coins}`);
} else {
  fail("交付订单获得铜钱并推进教程", JSON.stringify({ completedOrders: s.data.completedOrders, coins: s.data.coins, tutorialStep: s.data.tutorialStep }));
}

const stationLockedAfterOne = s.stationClass?.includes("locked");
if (stationLockedAfterOne) {
  pass("仅完成1单时流沙驿仍锁定", s.stationClass);
} else {
  fail("仅完成1单时流沙驿仍锁定", s.stationClass);
}

await page.evaluate((key) => {
  const data = JSON.parse(localStorage.getItem(key));
  data.completedOrders = 3;
  data.coinsEarned = Math.max(data.coinsEarned || 0, 20);
  data.coins = 80;
  data.tutorialStep = Math.max(data.tutorialStep || 0, 4);
  localStorage.setItem(key, JSON.stringify(data));
}, saveKey);
await page.reload({ waitUntil: "domcontentloaded" });
await page.waitForTimeout(300);
s = await state();
if (!s.stationClass?.includes("locked") && s.data.coins < 90) {
  pass("主线达成但铜币不足时可进入流沙驿", `铜币${s.data.coins}，class=${s.stationClass}`);
} else {
  fail("主线达成但铜币不足状态", JSON.stringify({ coins: s.data.coins, stationClass: s.stationClass }));
}

await page.locator("#stationBtn").click();
await page.waitForTimeout(700);
s = await state();
if (s.page === "inn") {
  pass("点击流沙驿Tab进入修缮页", s.text.slice(0, 80).replace(/\s+/g, " "));
} else {
  fail("点击流沙驿Tab进入修缮页", s.page);
}

await page.locator("[data-repair-node]").click();
await page.waitForTimeout(400);
s = await state();
if (s.repairOpen && s.repairGateDisabled && s.repairGateText === "80/90") {
  pass("铜币不足时修缮面板铜币条置灰", s.repairGateText);
} else {
  fail("铜币不足时修缮面板状态", JSON.stringify({ open: s.repairOpen, gateDisabled: s.repairGateDisabled, gateText: s.repairGateText }));
}

await browser.close();

const failed = checks.filter((check) => !check.ok);
console.log(JSON.stringify({ ok: failed.length === 0, checks }, null, 2));
if (failed.length) process.exitCode = 1;
