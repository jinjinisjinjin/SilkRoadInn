(async function () {
  const player = window.SilkRoadChapterStory;
  const root = document.querySelector("#storyReviewVolumes");
  if (!player || !root) return;

  const [progression, orders, inn] = await Promise.all([
    fetch("./data/progression.json").then((response) => response.json()),
    fetch("./data/orders.json").then((response) => response.json()),
    fetch("./data/inn.json").then((response) => response.json()),
  ]);
  const milestoneById = new Map(progression.milestones.map((entry) => [entry.id, entry]));
  const orderById = new Map(orders.orders.map((entry) => [entry.id, entry]));
  const volumeNames = new Map([
    [1, "流沙驿初明"],
    [2, "西市烟火"],
    [3, "楼馆通途"],
    [4, "灯火连城"],
  ]);
  const volumeStartLevels = { 1: 1, 2: 3, 3: 6, 4: 9 };
  let activeVolume = "all";

  const escapeHtml = (value = "") => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  function isVolumeFinalMilestone(milestone) {
    const sameVolume = progression.milestones.filter((entry) => entry.chapter === milestone.chapter);
    return sameVolume.at(-1)?.id === milestone.id;
  }

  function qaUrl(volume, segmentId) {
    const scene = player.chapterSegments[volume].indexOf(segmentId);
    return `./?qa=chapter-story-v1&chapter=${volume}&scene=${Math.max(0, scene)}`;
  }

  function triggerFor(segmentId, storyChapter) {
    if (segmentId === "opening") {
      return {
        title: "首次进入游戏自动播放",
        detail: "新存档、尚未完成任何订单或修缮时出现，播完后进入新手主线。",
      };
    }
    const opening = segmentId.match(/^chapter([2-4])-opening$/);
    if (opening) {
      const volume = Number(opening[1]);
      return {
        title: `升至 Lv${volumeStartLevels[volume]} 时开卷`,
        detail: `完成上一卷并扩建后，先播第${volume}卷开场，然后播放升级揭示。`,
      };
    }
    const [phase, milestoneId] = segmentId.split(":");
    const milestone = milestoneById.get(milestoneId);
    if (!milestone) return { title: "剧情回顾节点", detail: "可从剧情回顾重新播放。" };
    const requiredOrders = (milestone.conditions?.completedOrderIds ?? [])
      .map((orderId) => orderById.get(orderId))
      .filter(Boolean);
    const orderLabel = requiredOrders.length
      ? requiredOrders.map((order) => `${order.npcName}·${order.dialogue}`).join("；")
      : "前置主线";
    if (phase === "before") {
      return {
        title: `Lv${milestone.innLevel} · 点击「${milestone.sceneName}」修缮点后`,
        detail: `解锁：${orderLabel}。镜头推近 → 播放本段 → 进入三步修缮。`,
      };
    }
    const volumeEnd = isVolumeFinalMilestone(milestone);
    return {
      title: volumeEnd ? `第${milestone.chapter}卷最后一处修缮完成后` : `「${milestone.sceneName}」修缮后剧情`,
      detail: volumeEnd
        ? "焕新动画 → 史实问答/奖励/解析 → 播放本段 → 卷结算或最终结局。"
        : "本段已写入剧情库；当前正式流程在问答结束后直接进行 NPC 转场，可在剧情回顾或本 QA 页查看此段。",
    };
  }

  function renderLine(step) {
    if (!Array.isArray(step)) {
      return `<article class="story-line narration"><strong>${escapeHtml(step.cue || "旁白")}</strong><p>${escapeHtml(step.text)}</p></article>`;
    }
    const portraitClass = step[2].includes("npc_mystery_merchant") ? "mystery-merchant" : "";
    return `<article class="story-line">
      <img class="${portraitClass}" src="${escapeHtml(step[2])}" alt="" />
      <div><strong>${escapeHtml(step[0])}</strong><em>${escapeHtml(step[1])}</em></div>
      <p>${escapeHtml(step[4])}</p>
    </article>`;
  }

  function renderSegment(segmentId, storyChapter) {
    const segment = player.segments[segmentId];
    const trigger = triggerFor(segmentId, storyChapter);
    return `<section class="segment-block" data-segment-id="${escapeHtml(segmentId)}">
      <header class="segment-head">
        <div class="segment-trigger"><b>${escapeHtml(segment.title)}</b><span>${escapeHtml(trigger.title)}<br>${escapeHtml(trigger.detail)}</span></div>
        <a href="${qaUrl(storyChapter.volume, segmentId)}" target="_blank" rel="noreferrer">查看这一段</a>
      </header>
      <div class="line-list">${segment.steps.map(renderLine).join("")}</div>
    </section>`;
  }

  function renderChapter(chapter) {
    const firstUrl = qaUrl(chapter.volume, chapter.segmentIds[0]);
    const dialogueCount = chapter.segmentIds.reduce((sum, id) => sum + player.segments[id].steps.length, 0);
    return `<article class="chapter-card" data-volume="${chapter.volume}" data-search="${escapeHtml([
      chapter.title,
      chapter.summary,
      ...chapter.segmentIds.flatMap((id) => player.segments[id].steps.map((step) => Array.isArray(step) ? `${step[0]} ${step[1]} ${step[4]}` : `${step.cue} ${step.text}`)),
    ].join(" ").toLowerCase())}">
      <div class="chapter-summary">
        <span class="chapter-number">${String(chapter.number).padStart(2, "0")}</span>
        <div class="chapter-copy"><small>Lv${chapter.level} · 第${chapter.volume}卷 · ${dialogueCount}段</small><h3>${escapeHtml(chapter.title)}</h3><p>${escapeHtml(chapter.summary)}</p></div>
        <a href="${firstUrl}" target="_blank" rel="noreferrer">在游戏中查看</a>
      </div>
      <details class="chapter-dialogue"><summary>查看全部台词与触发逻辑</summary>${chapter.segmentIds.map((id) => renderSegment(id, chapter)).join("")}</details>
    </article>`;
  }

  function render() {
    root.innerHTML = [1, 2, 3, 4].map((volume) => {
      const chapters = player.storyChapters.filter((chapter) => chapter.volume === volume);
      const levelRange = inn.levels.filter((level) => level.volume === volume).map((level) => level.level);
      return `<section class="story-volume" data-volume-section="${volume}">
        <header class="volume-title"><i></i><div><small>Lv${Math.min(...levelRange)}–Lv${Math.max(...levelRange)} · 第${chapters[0].number}–${chapters.at(-1).number}章</small><strong>第${volume}卷·${volumeNames.get(volume)}</strong></div></header>
        <div class="chapter-list">${chapters.map(renderChapter).join("")}</div>
      </section>`;
    }).join("");
    applyFilters();
  }

  function applyFilters() {
    const query = document.querySelector("#storySearch").value.trim().toLowerCase();
    let visible = 0;
    document.querySelectorAll(".chapter-card").forEach((card) => {
      const volumeOk = activeVolume === "all" || card.dataset.volume === activeVolume;
      const searchOk = !query || card.dataset.search.includes(query);
      card.hidden = !(volumeOk && searchOk);
      if (!card.hidden) visible += 1;
    });
    document.querySelectorAll(".story-volume").forEach((section) => {
      section.hidden = !section.querySelector(".chapter-card:not([hidden])");
    });
    root.querySelector(".empty-result")?.remove();
    if (!visible) root.insertAdjacentHTML("beforeend", '<p class="empty-result">没有找到匹配剧情。</p>');
  }

  document.querySelector("#volumeFilters").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-volume]");
    if (!button) return;
    activeVolume = button.dataset.volume;
    document.querySelectorAll("#volumeFilters button").forEach((entry) => entry.classList.toggle("active", entry === button));
    applyFilters();
  });
  document.querySelector("#storySearch").addEventListener("input", applyFilters);
  document.querySelector("#expandAll").addEventListener("click", () => {
    document.querySelectorAll(".chapter-card:not([hidden]) details").forEach((details) => { details.open = true; });
  });
  document.querySelector("#collapseAll").addEventListener("click", () => {
    document.querySelectorAll(".chapter-dialogue").forEach((details) => { details.open = false; });
  });

  render();
})().catch((error) => {
  console.error("Story review failed to load", error);
  const root = document.querySelector("#storyReviewVolumes");
  if (root) root.innerHTML = '<p class="empty-result">剧情总览加载失败，请刷新后重试。</p>';
});
