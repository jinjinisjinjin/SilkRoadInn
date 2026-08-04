const places = [
  {
    id: "gate",
    name: "流沙驿门楼",
    state: "active",
    level: "Lv1",
    x: 45.5,
    y: 50.4,
    cost: 90,
    copy: "旧门楼还能挡风，但门帘破、墙脚松。先把入口修好，远路人一眼知道流沙驿重新开门。",
    repairs: ["扶正门柱", "补墙脚裂缝", "清门前积沙", "换门槛石", "修门轴", "换门帘绳", "擦旧门钉", "补灯钩", "挂夜行小灯"],
    choices: [
      ["赭黄门帘", "风沙里最醒目的暖色。"],
      ["暗金木招牌", "让旧店名重新挂起来。"],
      ["朱砂小灯", "黄昏后给归人留一盏光。"],
    ],
  },
  {
    id: "snack-window",
    name: "胡饼小食窗",
    state: "active",
    level: "Lv1",
    x: 28.6,
    y: 50.1,
    cost: 120,
    copy: "临街小窗适合卖刚出炉的胡饼。修好它，路过的脚夫和商旅不必进门也能买一份热食。",
    repairs: ["修窗格", "擦饼案", "补遮阳布", "垫平窗台", "洗旧托盘", "摆热饼盘", "添取餐木牌", "挂铜铃", "清窗下积沙"],
    choices: [
      ["木格小窗", "适合摆热饼和油纸包。"],
      ["铜铃取餐牌", "轻轻一响就知道有客。"],
      ["饼盘矮柜", "把胡饼摆得更有烟火气。"],
    ],
  },
  {
    id: "hall",
    name: "前厅客座",
    state: "active",
    level: "Lv1",
    x: 36.2,
    y: 39.3,
    cost: 150,
    copy: "前厅还有几张旧案和坐垫，只是灰尘太重。修好后，旅人终于能坐下来喝口水。",
    repairs: ["稳住矮桌", "补坐垫边", "扫石板地", "擦墙上灰", "修墙边灯钩", "补窗边帘", "添水碗架", "摆脚夫行囊架", "铺门边草席"],
    choices: [
      ["榆木小案", "朴素耐用，适合第一批客人。"],
      ["织纹坐垫", "让破旧前厅多一点柔软。"],
      ["旅人长凳", "多人同行也能停脚。"],
    ],
  },
  {
    id: "codex-wall",
    name: "食单壁",
    state: "active",
    level: "Lv1",
    x: 47.8,
    y: 36.5,
    cost: 210,
    copy: "墙上还留着一处空白卷轴位。这里以后会挂起《丝路食单》，记录来往沙州的味道。",
    repairs: ["修卷轴挂杆", "补壁面灰泥", "擦旧壁画纹", "磨平木钉", "摆札记小案", "添食器托架", "补卷轴坠角", "整理食谱匣", "挂防尘薄纱"],
    choices: [
      ["素麻卷轴", "朴素完整，像小店终于可以迎客。"],
      ["忍冬边卷轴", "清丽规整，适合认真经营的女掌柜。"],
      ["暗金轴头食单卷", "把食谱和旅途记忆一起收进墙上。"],
    ],
  },
  {
    id: "kitchen",
    name: "后厨灶房",
    state: "active",
    level: "Lv1",
    x: 61.6,
    y: 39.5,
    cost: 180,
    copy: "灶火还在，但锅台、案板、食材架都需要重新归位。修完这里，后厨才像真正能开张。",
    repairs: ["封灶口裂缝", "磨平案板", "归置锅具", "刷洗陶罐", "挂干草香料", "清粮袋角落", "补柴架", "添炭灰铲", "修锅台边砖"],
    choices: [
      ["稳灶石台", "让炉火和锅具各归其位。"],
      ["香料木架", "给胡商带来的香料留位置。"],
      ["奶食小案", "为乳糜、奶酪和酥油埋伏笔。"],
    ],
  },
  {
    id: "well",
    name: "饮水井",
    state: "active",
    level: "Lv1",
    x: 52.8,
    y: 62.9,
    cost: 260,
    copy: "院心这口井连着客人、后厨和驼队。先把井沿和吊绳修好，流沙驿才有真正的日常。",
    repairs: ["砌稳井沿", "换新井绳", "修吊桶把手", "清井边浮沙", "铺井边石路", "摆饮水木架", "补水桶箍", "挂洗手巾", "添驼队饮水槽"],
    choices: [
      ["新井绳", "打水不再费劲。"],
      ["石井沿", "让院心更稳当。"],
      ["水桶架", "后厨和驼队都用得上。"],
    ],
  },
  {
    id: "watchtower",
    name: "风沙瞭望台",
    state: "locked",
    level: "Lv3",
    x: 7.8,
    y: 9.6,
    copy: "木塔还立在风里，将来可以眺望商队和沙路天气。",
    repairs: ["加固木梯", "补望台栏杆", "换断裂横梁", "清沙石台阶", "挂风向布", "修瞭望棚顶", "添夜间火盆", "安商队号旗"],
    choices: [
      ["风旗高台", "用彩布风旗提示天气和商队方向。"],
      ["火盆瞭望台", "夜里也能看见远路动静。"],
      ["沙路号角架", "商队抵达时有更强的仪式感。"],
    ],
  },
  {
    id: "attic",
    name: "女主阁楼",
    state: "locked",
    level: "Lv2",
    x: 55.5,
    y: 18.4,
    copy: "二层小间能收纳信件、旧物和女主自己的札记。",
    repairs: ["补窗纸", "修小阳台", "整理书箱", "擦旧木地板", "补床边矮柜", "挂旧帘", "摆信件匣", "添小铜镜"],
    choices: [
      ["书信小阁", "偏向札记、信件和主线线索。"],
      ["绣帘暖阁", "偏向女主生活感和柔软情绪。"],
      ["星灯小窗", "偏向夜间独处和远路思念。"],
    ],
  },
  {
    id: "terrace",
    name: "晒台天台",
    state: "locked",
    level: "Lv2",
    x: 57.9,
    y: 7.4,
    copy: "屋顶可晾晒草药、谷物和布料。",
    repairs: ["补晒架", "铺防沙布", "修屋顶排水", "扫瓦缝沙", "绑晾衣绳", "添草药篮", "摆谷物簸箕", "修矮护栏"],
    choices: [
      ["草药晒台", "适合义诊和食疗支线。"],
      ["谷物晒台", "强化面食、磨坊和胡饼生产。"],
      ["织物晒台", "更有生活感，也适合女主日常剧情。"],
    ],
  },
  {
    id: "mural",
    name: "壁画小廊",
    state: "locked",
    level: "Lv2",
    x: 75.8,
    y: 22.8,
    copy: "残墙上的壁画还能修回一部分，适合承接图鉴典藏。",
    repairs: ["清壁面浮土", "搭修补脚架", "补廊柱", "护住旧画边", "填墙面裂缝", "擦忍冬纹线", "铺廊下石板", "挂防尘帘"],
    choices: [
      ["忍冬纹小廊", "突出敦煌植物纹样。"],
      ["飞天残画廊", "保留更强的壁画故事感。"],
      ["食单典藏廊", "把图鉴、食谱和壁画展示结合起来。"],
    ],
  },
  {
    id: "swing",
    name: "月影秋千院",
    state: "locked",
    level: "Lv3",
    x: 60.5,
    y: 54.0,
    copy: "葡萄架下可以补一架旧秋千，留给夜间谈心和角色羁绊。",
    repairs: ["扶葡萄架", "补秋千绳", "换秋千木板", "铺石凳边", "清藤下碎瓦", "添小花盆", "挂月灯", "修矮院墙"],
    choices: [
      ["月影秋千", "偏恋爱感和夜间谈心。"],
      ["葡萄藤茶座", "偏休憩、饮品和日常陪伴。"],
      ["花盆小院", "偏收集布置和柔软生活感。"],
    ],
  },
  {
    id: "camel",
    name: "骆驼棚",
    state: "locked",
    level: "Lv2",
    x: 82.6,
    y: 54.2,
    copy: "修好棚架和食槽后，商队的骆驼能在这里歇脚。",
    repairs: ["补棚顶", "修食槽", "立拴桩", "清草粪角落", "铺干草垫", "摆水桶", "挂驼铃牌", "修棚边木栏"],
    choices: [
      ["暖草驼棚", "让骆驼休息得更安稳。"],
      ["驼铃照料栏", "强化商队与驼铃主题。"],
      ["彩布遮阳棚", "更有丝路商旅色彩。"],
    ],
  },
  {
    id: "fodder",
    name: "草料棚",
    state: "locked",
    level: "Lv2",
    x: 83.0,
    y: 66.8,
    copy: "草料、水桶和栏圈会让驼队补给更可靠。",
    repairs: ["扎草料捆", "修草棚门", "摆水桶", "补木栏", "垫高草垛", "清棚下沙", "挂称量绳", "补防雨草帘"],
    choices: [
      ["干草整棚", "稳定供应驼队草料。"],
      ["清水草料棚", "草料和饮水一起管理。"],
      ["商队补给棚", "强化长线商旅补给感。"],
    ],
  },
  {
    id: "warehouse",
    name: "卸货货栈",
    state: "locked",
    level: "Lv2",
    x: 23.4,
    y: 68.1,
    copy: "货箱和车轮堆在这里，以后可以存放订单材料。",
    repairs: ["补货棚顶", "垫高货箱", "修称量木台", "归拢绳索", "扫卸货坡道", "补货架脚", "盖防沙布", "标出空货位"],
    choices: [
      ["木箱货栈", "适合基础订单材料堆放。"],
      ["丝包货栈", "更有丝路贸易与高阶订单感。"],
      ["香料货栈", "和香料线、胡商剧情衔接。"],
    ],
  },
  {
    id: "market",
    name: "小市集摊位",
    state: "locked",
    level: "Lv2",
    x: 32.4,
    y: 85.2,
    copy: "几张旧摊棚修好后，会有更多边城摊主出现。",
    repairs: ["支摊棚", "补摊布", "摆货篮", "修摊前石路", "清摊后杂物", "挂小灯", "补货架", "摆铜钱盘"],
    choices: [
      ["小吃摊列", "扩展食肆外卖和街边烟火气。"],
      ["手作摊列", "适合织染、陶器、女频收集感。"],
      ["商旅摊列", "偏补给、行囊、远路交易。"],
    ],
  },
  {
    id: "school",
    name: "沙州私塾",
    state: "locked",
    level: "Lv3",
    x: 49.0,
    y: 85.6,
    copy: "低桌和席位可以修成小小私塾，让女主的建设走出食肆。",
    repairs: ["摆低书案", "补席垫", "修遮阳棚", "收书卷木箱", "擦讲席木板", "补笔架", "铺门前石阶", "挂竹简束"],
    choices: [
      ["蒙学书案", "让边城孩子能坐下识字。"],
      ["经卷讲席", "适合僧人、书生和文化支线。"],
      ["女主授课角", "强调女主亲手建设边城。"],
    ],
  },
  {
    id: "clinic",
    name: "义诊草药棚",
    state: "locked",
    level: "Lv3",
    x: 65.0,
    y: 85.0,
    copy: "草药罐、药架和帘棚会承接旅人伤病与食疗支线。",
    repairs: ["挂草药束", "摆药罐", "修诊凳", "补帘棚", "擦药碾", "整理纱布匣", "铺候诊席", "添煎药小炉"],
    choices: [
      ["草药诊棚", "偏草药、食疗和边城义诊。"],
      ["旅人休诊榻", "适合伤病旅人和剧情安顿。"],
      ["煎药小灶", "把饮食与疗愈系统连起来。"],
    ],
  },
  {
    id: "lanterns",
    name: "祈愿灯墙",
    state: "locked",
    level: "Lv3",
    x: 91.4,
    y: 85.1,
    copy: "每盏灯都可以收下一位旅人的愿望。",
    repairs: ["补灯架", "换灯绳", "擦灯盏", "清墙脚沙", "修祈愿木牌", "添灯油罐", "挂防风帘", "补墙角灯龛"],
    choices: [
      ["旅人愿灯", "收纳来往旅人的愿望。"],
      ["家书灯墙", "与书信驿递和远方亲人关联。"],
      ["星夜灯龛", "更偏浪漫氛围和夜间剧情。"],
    ],
  },
];

const state = {
  selectedId: null,
  repaired: new Set(JSON.parse(localStorage.getItem("inn_map_proto_repaired") || "[]")),
  coins: Number(localStorage.getItem("inn_map_proto_coins") || 620),
  microDone: JSON.parse(localStorage.getItem("inn_map_proto_micro_done") || "{}"),
};

const viewport = document.querySelector("#mapViewport");
const hotspots = document.querySelector("#hotspots");
const sheet = document.querySelector("#placeSheet");
const placeState = document.querySelector("#placeState");
const placeName = document.querySelector("#placeName");
const placeText = document.querySelector("#placeText");
const microRepairs = document.querySelector("#microRepairs");
const detailScene = document.querySelector("#detailScene");
const roomMarkers = document.querySelector("#roomMarkers");
const roomProgressText = document.querySelector("#roomProgressText");
const roomProgressFill = document.querySelector("#roomProgressFill");
const choiceList = document.querySelector("#choiceList");
const repairBtn = document.querySelector("#repairBtn");
const focusCurrentBtn = document.querySelector("#focusCurrentBtn");
const resetBtn = document.querySelector("#resetBtn");
const coinGate = document.querySelector("#coinGate");
const coinTotal = document.querySelector("#coinTotal");
const currentTitle = document.querySelector("#currentTitle");
const coinGateText = document.querySelector("#coinGateText");
const coinGateFill = document.querySelector("#coinGateFill");
const sheetCost = document.querySelector("#sheetCost");
const sheetCostText = document.querySelector("#sheetCostText");
const sheetCostFill = document.querySelector("#sheetCostFill");
const stage = document.querySelector("#mapStage");
let mapDrag = null;
let camera = { x: 0, y: 0 };
const repairSequence = ["gate", "snack-window", "hall", "kitchen", "codex-wall", "well"];
const previewPlaceId = new URLSearchParams(window.location.search).get("preview");
const roomMarkerPositions = [
  [20, 28],
  [48, 24],
  [75, 30],
  [28, 48],
  [61, 45],
  [82, 54],
  [18, 70],
  [48, 72],
  [72, 76],
];
const roomMarkerLayouts = {
  "codex-wall": [
    [50, 16],
    [48, 38],
    [22, 27],
    [36, 19],
    [26, 68],
    [74, 56],
    [59, 52],
    [53, 73],
    [61, 32],
  ],
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function cameraBounds() {
  return {
    minX: Math.min(0, viewport.clientWidth - stage.clientWidth),
    minY: Math.min(0, viewport.clientHeight - stage.clientHeight),
    maxX: 0,
    maxY: 0,
  };
}

function setCamera(x, y, animate = false) {
  const bounds = cameraBounds();
  camera = {
    x: clamp(x, bounds.minX, bounds.maxX),
    y: clamp(y, bounds.minY, bounds.maxY),
  };
  stage.classList.toggle("camera-animating", animate);
  stage.style.transform = `translate3d(${camera.x}px, ${camera.y}px, 0)`;
  if (animate) {
    window.setTimeout(() => stage.classList.remove("camera-animating"), 300);
  }
}

function currentRepairPlace() {
  const previewPlace = places.find((place) => place.id === previewPlaceId);
  if (previewPlace) return previewPlace;
  return places.find((place) => repairSequence.includes(place.id) && !state.repaired.has(place.id)) || null;
}

function coinProgress(place) {
  const cost = place?.cost || 0;
  if (place?.id === previewPlaceId) {
    return { cost, paid: cost, ratio: 100, ready: true };
  }
  const paid = Math.min(state.coins, cost);
  const ratio = cost ? Math.min(100, Math.round((paid / cost) * 100)) : 100;
  return { cost, paid, ratio, ready: cost > 0 && state.coins >= cost };
}

function microSet(placeId) {
  if (!state.microDone[placeId]) state.microDone[placeId] = [];
  return new Set(state.microDone[placeId]);
}

function saveMicroDone(placeId, doneSet) {
  state.microDone[placeId] = [...doneSet];
  localStorage.setItem("inn_map_proto_micro_done", JSON.stringify(state.microDone));
}

function microProgress(place) {
  const done = microSet(place.id);
  const total = place.repairs?.length || 0;
  const count = place.repairs?.filter((repair) => done.has(repair)).length || 0;
  const ratio = total ? Math.round((count / total) * 100) : 100;
  return { done, total, count, ratio, complete: total > 0 && count >= total };
}

function renderCoinGate() {
  coinTotal.textContent = state.coins;
  const current = currentRepairPlace();
  coinGate.classList.remove("ready", "empty");
  currentTitle.textContent = current ? current.name : "Lv1 完成";
  if (!current) {
    coinGateText.textContent = "✓";
    coinGateFill.style.setProperty("--fill", "100%");
    coinGate.classList.add("empty");
    return;
  }
  const progress = coinProgress(current);
  coinGateText.textContent = `${progress.paid}/${progress.cost}`;
  coinGateFill.style.setProperty("--fill", `${progress.ratio}%`);
  coinGate.classList.toggle("ready", progress.ready);
}

function renderHotspots() {
  hotspots.innerHTML = "";
  const current = currentRepairPlace();
  places.forEach((place, index) => {
    const button = document.createElement("button");
    const repaired = state.repaired.has(place.id);
    const isCurrent = current?.id === place.id;
    const isQueued = repairSequence.includes(place.id) && !repaired && !isCurrent;
    button.className = `pin ${repaired ? "done" : isCurrent ? "current active" : isQueued ? "queued" : place.state}`;
    button.style.setProperty("--x", `${place.x}%`);
    button.style.setProperty("--y", `${place.y}%`);
    button.dataset.index = repaired ? "✓" : String(index + 1).padStart(2, "0");
    button.type = "button";
    button.textContent = place.name;
    button.addEventListener("click", (event) => {
      if (viewport.dataset.dragMoved === "true") {
        event.preventDefault();
        return;
      }
      focusPlace(place.id);
    });
    hotspots.append(button);

    if (isCurrent) {
      const progress = coinProgress(place);
      const bubble = document.createElement("button");
      bubble.type = "button";
      bubble.className = `repair-bubble ${progress.ready ? "ready" : ""}`;
      bubble.style.setProperty("--x", `${place.x}%`);
      bubble.style.setProperty("--y", `${place.y}%`);
      bubble.setAttribute("aria-label", progress.ready ? `进入${place.name}修缮` : `${place.name}修缮资源不足`);
      bubble.innerHTML = `<span class="coin-mark"></span><b>${progress.paid}/${progress.cost}</b><i><em style="--fill:${progress.ratio}%"></em></i>`;
      bubble.addEventListener("pointerdown", (event) => {
        event.stopPropagation();
      });
      bubble.addEventListener("click", (event) => {
        event.stopPropagation();
        if (viewport.dataset.dragMoved === "true") {
          event.preventDefault();
          return;
        }
        openCurrentRepair();
      });
      hotspots.append(bubble);
    }
  });
  renderCoinGate();
}

function openCurrentRepair() {
  const current = currentRepairPlace();
  if (!current) return;
  const progress = coinProgress(current);
  if (!progress.ready) {
    focusPlace(current.id);
    return;
  }
  openPlace(current.id);
}

function openPlace(id) {
  const place = places.find((item) => item.id === id);
  if (!place) return;
  state.selectedId = id;
  const repaired = state.repaired.has(id);
  const current = currentRepairPlace();
  const progress = coinProgress(place);
  const isCurrent = current?.id === place.id;
  placeState.textContent = repaired ? "已修缮" : isCurrent ? "当前修缮" : repairSequence.includes(place.id) ? "主线未到" : `${place.level} 解锁`;
  placeName.textContent = place.name;
  placeText.textContent = place.copy;
  sheetCost.hidden = !place.cost;
  if (place.cost) {
    sheetCostText.textContent = `${progress.paid}/${progress.cost}`;
    sheetCostFill.style.setProperty("--fill", `${progress.ratio}%`);
  }
  renderRoomDetail(place, isCurrent);
  const micro = microProgress(place);
  choiceList.innerHTML = "";
  const choiceTitle = document.createElement("div");
  choiceTitle.className = "choice-title";
  choiceTitle.textContent = micro.complete ? "三选一装饰" : "收尾装饰预览";
  choiceList.append(choiceTitle);
  (place.choices || [["待定装饰", "这处地点先露出轮廓，等主线推进后再细化。"]]).forEach(([title, text, image]) => {
    const item = document.createElement("div");
    item.className = `choice ${micro.complete ? "" : "locked"}`;
    item.innerHTML = `
      <div class="choice-art ${image ? "" : "empty"}">
        ${image ? `<img src="${image}" alt="" />` : "<i></i>"}
      </div>
      <div class="choice-copy">
        <b>${title}</b>
        <span>${text}</span>
      </div>
    `;
    choiceList.append(item);
  });
  repairBtn.hidden = !isCurrent || repaired;
  repairBtn.disabled = !progress.ready || !micro.complete;
  if (!sheet.open) sheet.showModal();
}

function renderRoomDetail(place, isCurrent) {
  detailScene.dataset.place = place.id;
  roomMarkers.innerHTML = "";
  microRepairs.innerHTML = "";
  const micro = microProgress(place);
  roomProgressText.textContent = `${micro.count}/${micro.total}`;
  roomProgressFill.style.setProperty("--fill", `${micro.ratio}%`);

  if (!place.repairs?.length) return;

  const title = document.createElement("div");
  title.className = "micro-title";
  title.textContent = isCurrent ? "点位内细修" : "未来点位细修";
  const list = document.createElement("div");
  list.className = "micro-list";

  place.repairs.forEach((repair, index) => {
    const done = micro.done.has(repair);
    const firstPending = micro.count === index;
    const layout = roomMarkerLayouts[place.id] || roomMarkerPositions;
    const position = layout[index % layout.length];
    const marker = document.createElement("button");
    marker.type = "button";
    marker.className = `room-marker ${done ? "done" : firstPending && isCurrent ? "current" : ""}`;
    marker.style.setProperty("--x", `${position[0]}%`);
    marker.style.setProperty("--y", `${position[1]}%`);
    marker.textContent = done ? "✓" : index + 1;
    marker.addEventListener("click", () => toggleMicroRepair(place.id, repair, isCurrent));
    roomMarkers.append(marker);

    const chip = document.createElement("button");
    chip.type = "button";
    chip.className = `micro-chip ${done ? "done" : firstPending && isCurrent ? "current" : ""}`;
    chip.textContent = `${index + 1}. ${repair}`;
    chip.addEventListener("click", () => toggleMicroRepair(place.id, repair, isCurrent));
    list.append(chip);
  });
  microRepairs.append(title, list);
}

function toggleMicroRepair(placeId, repair, canEdit) {
  if (!canEdit) return;
  const done = microSet(placeId);
  if (done.has(repair)) {
    done.delete(repair);
  } else {
    done.add(repair);
  }
  saveMicroDone(placeId, done);
  openPlace(placeId);
}

function repairSelected() {
  if (!state.selectedId) return;
  const place = places.find((item) => item.id === state.selectedId);
  if (!place || currentRepairPlace()?.id !== place.id) return;
  if (state.coins < place.cost) return;
  if (!microProgress(place).complete) return;
  state.coins -= place.cost;
  state.repaired.add(place.id);
  localStorage.setItem("inn_map_proto_coins", String(state.coins));
  localStorage.setItem("inn_map_proto_repaired", JSON.stringify([...state.repaired]));
  renderHotspots();
  const next = currentRepairPlace();
  if (next) {
    window.setTimeout(() => focusPlace(next.id), 120);
  }
}

function focusPlace(id) {
  const place = places.find((item) => item.id === id) || places[0];
  const x = viewport.clientWidth / 2 - (place.x / 100) * stage.clientWidth;
  const y = viewport.clientHeight / 2 - (place.y / 100) * stage.clientHeight;
  setCamera(x, y, true);
}

function bindMapDrag() {
  viewport.addEventListener("pointerdown", (event) => {
    if (event.button !== undefined && event.button !== 0) return;
    if (event.target.closest(".repair-bubble")) return;
    mapDrag = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      cameraX: camera.x,
      cameraY: camera.y,
      moved: false,
    };
    viewport.dataset.dragMoved = "false";
    viewport.classList.add("dragging");
    viewport.setPointerCapture(event.pointerId);
  });

  viewport.addEventListener("pointermove", (event) => {
    if (!mapDrag || event.pointerId !== mapDrag.pointerId) return;
    const dx = event.clientX - mapDrag.startX;
    const dy = event.clientY - mapDrag.startY;
    if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
      mapDrag.moved = true;
      viewport.dataset.dragMoved = "true";
    }
    setCamera(mapDrag.cameraX + dx, mapDrag.cameraY + dy);
  });

  const endDrag = (event) => {
    if (!mapDrag || event.pointerId !== mapDrag.pointerId) return;
    viewport.classList.remove("dragging");
    try {
      viewport.releasePointerCapture(event.pointerId);
    } catch {
      // Pointer capture may already be released if the browser cancels the gesture.
    }
    const moved = mapDrag.moved;
    mapDrag = null;
    if (moved) {
      window.setTimeout(() => {
        viewport.dataset.dragMoved = "false";
      }, 80);
    }
  };

  viewport.addEventListener("pointerup", endDrag);
  viewport.addEventListener("pointercancel", endDrag);
  viewport.addEventListener("lostpointercapture", () => {
    viewport.classList.remove("dragging");
    mapDrag = null;
  });
}

repairBtn.addEventListener("click", (event) => {
  event.preventDefault();
  repairSelected();
  sheet.close();
});

focusCurrentBtn.addEventListener("click", () => {
  const next = currentRepairPlace() || places[0];
  focusPlace(next.id);
});

coinGate.addEventListener("click", openCurrentRepair);

resetBtn.addEventListener("click", () => {
  state.repaired.clear();
  state.coins = 620;
  state.microDone = {};
  localStorage.removeItem("inn_map_proto_repaired");
  localStorage.removeItem("inn_map_proto_micro_done");
  localStorage.setItem("inn_map_proto_coins", String(state.coins));
  renderHotspots();
  focusPlace("gate");
});

window.addEventListener("load", () => {
  renderHotspots();
  bindMapDrag();
  requestAnimationFrame(() => focusPlace(currentRepairPlace()?.id || "gate"));
});

window.addEventListener("resize", () => {
  setCamera(camera.x, camera.y);
});
