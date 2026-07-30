(function () {
  "use strict";

  const atlas = window.FEATURE_ATLAS;
  if (!atlas) {
    throw new Error("FEATURE_ATLAS is required before app.js");
  }

  const featureById = new Map(atlas.features.map((feature) => [feature.id, feature]));
  const chapterMeta = {
    intro: { code: "00", name: "ORIENTATION" },
    workflows: { code: "01", name: "WORKFLOWS" },
    capabilities: { code: "02", name: "CAPABILITIES" },
    reference: { code: "03", name: "REFERENCE" },
    explore: { code: "04", name: "PUT IT TO WORK" },
    sources: { code: "05", name: "OFFICIAL SOURCES" }
  };

  const deck = document.querySelector("#deck");
  const featureDialog = document.querySelector("#featureDialog");
  const featureList = document.querySelector("#featureList");
  const featureDetail = document.querySelector("#featureDetail");
  const featureSearch = document.querySelector("#featureSearch");
  const filterTabs = document.querySelector("#filterTabs");
  const toast = document.querySelector("#toast");

  const state = {
    currentSlide: 0,
    filter: "all",
    query: "",
    selectedFeature: atlas.features[0].id,
    hashBeforeDialog: "#cover",
    scrollTicking: false,
    touchStart: null
  };

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function lines(value) {
    return escapeHtml(value).replaceAll("\n", "<br>");
  }

  function getFeature(id) {
    const feature = featureById.get(id);
    if (!feature) throw new Error(`Unknown feature id: ${id}`);
    return feature;
  }

  function categoryLabel(category) {
    return atlas.categories[category];
  }

  function featureTrigger(id, options = {}) {
    const feature = getFeature(id);
    const category = categoryLabel(feature.category);
    const className = options.className ? ` ${options.className}` : "";
    const promise = options.promise
      ? `<span class="feature-trigger__promise">${escapeHtml(feature.thaiPromise)}</span>`
      : "";
    return `
      <button class="feature-trigger${className}" type="button" data-feature-id="${escapeHtml(id)}">
        <span class="feature-trigger__code">${escapeHtml(category.code)}</span>
        <span class="feature-trigger__name">${escapeHtml(feature.name)}</span>
        ${promise}
        <span class="feature-trigger__arrow" aria-hidden="true">↗</span>
      </button>`;
  }

  function sourceRail(featureIds) {
    const ids = [...new Set(featureIds || [])];
    if (!ids.length) {
      return `
        <footer class="slide__sources">
          <span>OFFICIAL OVERVIEW</span>
          <a href="${escapeHtml(atlas.meta.officialOverview)}" target="_blank" rel="noopener noreferrer">learn.chatgpt.com/docs/features ↗</a>
        </footer>`;
    }

    const visible = ids.slice(0, 3).map((id) => {
      const feature = getFeature(id);
      return `<a href="${escapeHtml(feature.officialUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(feature.name)} ↗</a>`;
    }).join("");
    const remainder = ids.length > 3
      ? `<button type="button" data-open-explorer>+${ids.length - 3} official sources</button>`
      : "";

    return `
      <footer class="slide__sources">
        <span>OFFICIAL SOURCE${ids.length > 1 ? "S" : ""}</span>
        <div>${visible}${remainder}</div>
      </footer>`;
  }

  function promptBlock(text) {
    return `
      <div class="prompt-block" data-reveal>
        <span class="prompt-block__label">PROMPT PATTERN</span>
        <p>${escapeHtml(text)}</p>
        <button type="button" data-copy-text="${escapeHtml(text)}">COPY</button>
      </div>`;
  }

  function slideShell(slide, index, body) {
    const chapter = chapterMeta[slide.chapter] || chapterMeta.intro;
    return `
      <section class="slide slide--${escapeHtml(slide.type)} slide--${escapeHtml(slide.chapter)}" id="${escapeHtml(slide.id)}" data-slide-index="${index}" aria-labelledby="${escapeHtml(slide.id)}-title">
        <div class="slide__frame">
          <div class="slide__coordinates" aria-hidden="true">
            <span>${String(index + 1).padStart(2, "0")}</span>
            <span>${escapeHtml(chapter.code)}.${String(index + 1).padStart(2, "0")}</span>
          </div>
          ${body}
          ${sourceRail(slide.featureIds)}
        </div>
      </section>`;
  }

  function heroOrbit() {
    const dots = Array.from({ length: 22 }, (_, index) => {
      const angle = (360 / 22) * index;
      const ring = index % 3;
      return `<i style="--angle:${angle}deg;--ring:${ring}" aria-hidden="true"></i>`;
    }).join("");
    return `
      <figure class="orbit" aria-label="แผนที่ Features 22 หัวข้อ แบ่งเป็น Workflows, Capabilities และ Reference">
        <div class="orbit__ring orbit__ring--outer"></div>
        <div class="orbit__ring orbit__ring--middle"></div>
        <div class="orbit__ring orbit__ring--inner"></div>
        <div class="orbit__nodes">${dots}</div>
        <div class="orbit__core"><span>22</span><small>FEATURES</small></div>
        <figcaption>
          <span>08 WORKFLOWS</span>
          <span>10 CAPABILITIES</span>
          <span>04 REFERENCE</span>
        </figcaption>
      </figure>`;
  }

  function renderCover(slide) {
    return `
      <div class="cover-grid">
        <div class="cover-copy">
          <p class="eyebrow" data-reveal>${escapeHtml(slide.eyebrow)}</p>
          <h1 class="cover-title" id="${escapeHtml(slide.id)}-title" data-reveal>${lines(slide.title)}</h1>
          <p class="cover-lead" data-reveal>${escapeHtml(slide.lead)}</p>
          <div class="cover-actions" data-reveal>
            <button class="action-link action-link--primary" type="button" data-go-slide="1">เริ่มสำรวจ <span aria-hidden="true">↓</span></button>
            <button class="action-link" type="button" data-open-explorer>เปิด Feature Explorer</button>
          </div>
          <div class="cover-proof" data-reveal>
            <span>OFFICIAL OPENAI SOURCES ONLY</span>
            <span>ตรวจสอบล่าสุด ${escapeHtml(atlas.meta.checkedAt)}</span>
            <span class="cover-author">จัดทำโดย <strong>${escapeHtml(slide.author)}</strong></span>
          </div>
        </div>
        <div class="cover-visual" data-reveal>${heroOrbit()}</div>
      </div>`;
  }

  function renderAtlas(slide) {
    const groups = Object.entries(atlas.categories).map(([category, meta]) => {
      const groupFeatures = atlas.features.filter((feature) => feature.category === category);
      return `
        <section class="atlas-column" data-category="${escapeHtml(category)}" data-reveal>
          <header>
            <span class="atlas-column__code">${escapeHtml(meta.code)}</span>
            <div><h3>${escapeHtml(meta.label)}</h3><p>${escapeHtml(meta.thai)}</p></div>
            <strong>${String(groupFeatures.length).padStart(2, "0")}</strong>
          </header>
          <div class="atlas-column__list">${groupFeatures.map((feature) => featureTrigger(feature.id)).join("")}</div>
        </section>`;
    }).join("");
    return `
      <div class="slide-heading slide-heading--wide">
        <p class="eyebrow" data-reveal>${escapeHtml(slide.eyebrow)}</p>
        <h2 id="${escapeHtml(slide.id)}-title" data-reveal>${lines(slide.title)}</h2>
        <p data-reveal>${escapeHtml(slide.lead)}</p>
      </div>
      <div class="atlas-grid">${groups}</div>`;
  }

  function renderRoutes(slide) {
    const routes = slide.routes.map((route, index) => `
      <li data-reveal>
        <span class="route-number">0${index + 1}</span>
        <span class="route-question">${escapeHtml(route.label)}</span>
        <span class="route-arrow" aria-hidden="true">→</span>
        <strong>${escapeHtml(route.answer)}</strong>
        <small>${escapeHtml(route.note)}</small>
      </li>`).join("");
    return `
      <div class="slide-heading">
        <p class="eyebrow" data-reveal>${escapeHtml(slide.eyebrow)}</p>
        <h2 id="${escapeHtml(slide.id)}-title" data-reveal>${lines(slide.title)}</h2>
        <p data-reveal>${escapeHtml(slide.lead)}</p>
      </div>
      <ol class="route-list">${routes}</ol>`;
  }

  function renderFocus(slide) {
    const feature = getFeature(slide.featureIds[0]);
    return `
      <div class="focus-layout">
        <div class="slide-heading">
          <p class="eyebrow" data-reveal>${escapeHtml(slide.eyebrow)}</p>
          <h2 id="${escapeHtml(slide.id)}-title" data-reveal>${lines(slide.title)}</h2>
          <p data-reveal>${escapeHtml(slide.lead)}</p>
          <div class="focus-feature" data-reveal>${featureTrigger(feature.id, { promise: true })}</div>
        </div>
        <div class="focus-system">
          <p class="focus-system__statement" data-reveal>${escapeHtml(slide.statement)}</p>
          <ol>${slide.points.map((point, index) => `<li data-reveal><span>0${index + 1}</span>${escapeHtml(point)}</li>`).join("")}</ol>
          ${promptBlock(feature.prompt)}
        </div>
      </div>`;
  }

  function renderGoal(slide) {
    return `
      <div class="slide-heading slide-heading--wide">
        <p class="eyebrow" data-reveal>${escapeHtml(slide.eyebrow)}</p>
        <h2 id="${escapeHtml(slide.id)}-title" data-reveal>${lines(slide.title)}</h2>
        <p data-reveal>${escapeHtml(slide.lead)}</p>
      </div>
      <div class="goal-formula" data-reveal>
        ${slide.formula.map((item, index) => `<div><span>0${index + 1}</span><strong>${escapeHtml(item)}</strong></div>${index < slide.formula.length - 1 ? '<i aria-hidden="true">+</i>' : ""}`).join("")}
      </div>
      ${promptBlock(slide.example)}
      <div class="slide-feature-link" data-reveal>${featureTrigger("long-running-work")}</div>`;
  }

  function renderVersus(slide) {
    const choices = slide.choices.map((choice, index) => {
      const feature = getFeature(choice.featureId);
      return `
        <div class="versus-choice" data-reveal>
          <span class="versus-choice__index">0${index + 1}</span>
          <p>${escapeHtml(choice.label)}</p>
          <h3>${escapeHtml(feature.name)}</h3>
          <strong>${escapeHtml(choice.value)}</strong>
          <p class="versus-choice__promise">${escapeHtml(feature.thaiPromise)}</p>
          ${featureTrigger(feature.id, { className: "feature-trigger--compact" })}
        </div>`;
    }).join('<div class="versus-mark" aria-hidden="true">/</div>');
    return `
      <div class="slide-heading slide-heading--wide">
        <p class="eyebrow" data-reveal>${escapeHtml(slide.eyebrow)}</p>
        <h2 id="${escapeHtml(slide.id)}-title" data-reveal>${lines(slide.title)}</h2>
        <p data-reveal>${escapeHtml(slide.lead)}</p>
      </div>
      <div class="versus-layout">${choices}</div>`;
  }

  function renderSignals(slide) {
    return `
      <div class="slide-heading slide-heading--wide">
        <p class="eyebrow" data-reveal>${escapeHtml(slide.eyebrow)}</p>
        <h2 id="${escapeHtml(slide.id)}-title" data-reveal>${lines(slide.title)}</h2>
        <p data-reveal>${escapeHtml(slide.lead)}</p>
      </div>
      <div class="signal-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></div>
      <div class="signal-list">
        ${slide.signals.map((signal, index) => {
          const feature = getFeature(signal.featureId);
          return `<button type="button" data-feature-id="${escapeHtml(feature.id)}" data-reveal>
            <span class="signal-list__pulse" style="--delay:${index * 180}ms"></span>
            <span><small>${escapeHtml(signal.code)}</small><strong>${escapeHtml(feature.name)}</strong></span>
            <em>${escapeHtml(signal.state)}</em>
            <b aria-hidden="true">↗</b>
          </button>`;
        }).join("")}
      </div>`;
  }

  function renderChapter(slide) {
    const names = slide.featureIds.map((id) => `<button type="button" data-feature-id="${escapeHtml(id)}">${escapeHtml(getFeature(id).name)}</button>`).join('<span aria-hidden="true">·</span>');
    return `
      <div class="chapter-layout">
        <div class="chapter-number" aria-hidden="true" data-reveal>${escapeHtml(slide.count)}</div>
        <div class="slide-heading">
          <p class="eyebrow" data-reveal>${escapeHtml(slide.eyebrow)}</p>
          <h2 id="${escapeHtml(slide.id)}-title" data-reveal>${lines(slide.title)}</h2>
          <p data-reveal>${escapeHtml(slide.lead)}</p>
        </div>
      </div>
      <div class="chapter-marquee" data-reveal><div>${names}${names}</div></div>`;
  }

  function renderCompare(slide) {
    return `
      <div class="slide-heading slide-heading--wide">
        <p class="eyebrow" data-reveal>${escapeHtml(slide.eyebrow)}</p>
        <h2 id="${escapeHtml(slide.id)}-title" data-reveal>${lines(slide.title)}</h2>
        <p data-reveal>${escapeHtml(slide.lead)}</p>
      </div>
      <div class="compare-rail">
        ${slide.comparisons.map((item, index) => `
          <button type="button" data-feature-id="${escapeHtml(item.featureId)}" data-reveal>
            <span class="compare-rail__number">0${index + 1}</span>
            <span class="compare-rail__cue">${escapeHtml(item.cue)}</span>
            <strong>${escapeHtml(item.headline)}</strong>
            <p>${escapeHtml(item.body)}</p>
            <span class="compare-rail__arrow" aria-hidden="true">↗</span>
          </button>`).join("")}
      </div>`;
  }

  function renderPipeline(slide) {
    return `
      <div class="slide-heading slide-heading--wide">
        <p class="eyebrow" data-reveal>${escapeHtml(slide.eyebrow)}</p>
        <h2 id="${escapeHtml(slide.id)}-title" data-reveal>${lines(slide.title)}</h2>
        <p data-reveal>${escapeHtml(slide.lead)}</p>
      </div>
      <div class="pipeline">
        ${slide.stages.map((stage, index) => `
          <button type="button" data-feature-id="${escapeHtml(stage.featureId)}" data-reveal>
            <span>0${index + 1}</span>
            <small>${escapeHtml(stage.label)}</small>
            <strong>${escapeHtml(getFeature(stage.featureId).name)}</strong>
            <p>${escapeHtml(stage.text)}</p>
          </button>${index < slide.stages.length - 1 ? '<i aria-hidden="true">→</i>' : ""}`).join("")}
      </div>`;
  }

  function renderFinder(slide) {
    const categoryRows = Object.entries(atlas.categories).map(([category, meta]) => {
      const group = atlas.features.filter((feature) => feature.category === category);
      return `
        <div class="finder-row" data-reveal>
          <div class="finder-row__label"><span>${escapeHtml(meta.code)}</span><strong>${escapeHtml(meta.label)}</strong><small>${escapeHtml(meta.thai)}</small></div>
          <div class="finder-row__features">${group.map((feature) => `<button type="button" data-feature-id="${escapeHtml(feature.id)}">${escapeHtml(feature.name)}<span>↗</span></button>`).join("")}</div>
        </div>`;
    }).join("");
    return `
      <div class="slide-heading slide-heading--wide">
        <p class="eyebrow" data-reveal>${escapeHtml(slide.eyebrow)}</p>
        <h2 id="${escapeHtml(slide.id)}-title" data-reveal>${lines(slide.title)}</h2>
        <p data-reveal>${escapeHtml(slide.lead)}</p>
        <button class="action-link action-link--primary" type="button" data-open-explorer data-reveal>ค้น + กรอง + เปิดรายละเอียด</button>
      </div>
      <div class="finder-table">${categoryRows}</div>`;
  }

  function renderJourney(slide) {
    return `
      <div class="slide-heading slide-heading--wide">
        <p class="eyebrow" data-reveal>${escapeHtml(slide.eyebrow)}</p>
        <h2 id="${escapeHtml(slide.id)}-title" data-reveal>${lines(slide.title)}</h2>
        <p data-reveal>${escapeHtml(slide.lead)}</p>
      </div>
      <ol class="journey">
        ${slide.journey.map((step, index) => `
          <li data-reveal>
            <button type="button" data-feature-id="${escapeHtml(step.featureId)}">
              <span>${String(index + 1).padStart(2, "0")}</span>
              <small>${escapeHtml(step.label)}</small>
              <strong>${escapeHtml(getFeature(step.featureId).name)}</strong>
              <p>${escapeHtml(step.text)}</p>
            </button>
          </li>`).join("")}
      </ol>`;
  }

  function renderSources(slide) {
    const groups = Object.entries(atlas.categories).map(([category, meta]) => {
      const groupFeatures = atlas.features.filter((feature) => feature.category === category);
      return `
        <section class="source-group" data-reveal>
          <header><span>${escapeHtml(meta.code)}</span><h3>${escapeHtml(meta.label)}</h3><strong>${groupFeatures.length}</strong></header>
          <ol>${groupFeatures.map((feature) => `<li><a href="${escapeHtml(feature.officialUrl)}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(feature.name)}</span><b aria-hidden="true">↗</b></a></li>`).join("")}</ol>
        </section>`;
    }).join("");
    return `
      <div class="source-intro">
        <div class="slide-heading">
          <p class="eyebrow" data-reveal>${escapeHtml(slide.eyebrow)}</p>
          <h2 id="${escapeHtml(slide.id)}-title" data-reveal>${lines(slide.title)}</h2>
          <p data-reveal>${escapeHtml(slide.lead)}</p>
        </div>
        <div class="source-stamp" data-reveal><span>CHECKED</span><strong>${escapeHtml(atlas.meta.checkedAt)}</strong><a href="${escapeHtml(atlas.meta.officialOverview)}" target="_blank" rel="noopener noreferrer">Features overview ↗</a></div>
      </div>
      <div class="source-directory">${groups}</div>`;
  }

  function renderSlide(slide, index) {
    let body;
    switch (slide.type) {
      case "cover": body = renderCover(slide); break;
      case "atlas": body = renderAtlas(slide); break;
      case "routes": body = renderRoutes(slide); break;
      case "focus": body = renderFocus(slide); break;
      case "goal": body = renderGoal(slide); break;
      case "versus": body = renderVersus(slide); break;
      case "signals": body = renderSignals(slide); break;
      case "chapter": body = renderChapter(slide); break;
      case "compare": body = renderCompare(slide); break;
      case "pipeline": body = renderPipeline(slide); break;
      case "finder": body = renderFinder(slide); break;
      case "journey": body = renderJourney(slide); break;
      case "sources": body = renderSources(slide); break;
      default: throw new Error(`Unknown slide type: ${slide.type}`);
    }
    return slideShell(slide, index, body);
  }

  function renderDeck() {
    deck.innerHTML = atlas.slides.map(renderSlide).join("");
    document.querySelector("#slideTotal").textContent = String(atlas.slides.length).padStart(2, "0");
  }

  function filteredFeatures() {
    const query = state.query.trim().toLocaleLowerCase("th");
    return atlas.features.filter((feature) => {
      if (state.filter !== "all" && feature.category !== state.filter) return false;
      if (!query) return true;
      const haystack = [
        feature.name,
        feature.thaiPromise,
        feature.whenToUse,
        feature.howToStart,
        feature.surfaces.join(" ")
      ].join(" ").toLocaleLowerCase("th");
      return haystack.includes(query);
    });
  }

  function renderFeatureList() {
    const matches = filteredFeatures();
    if (!matches.length) {
      featureList.innerHTML = '<p class="empty-state">ไม่พบ Feature ที่ตรงกัน ลองค้นด้วยชื่อภาษาอังกฤษหรือสิ่งที่ต้องการทำ</p>';
      return;
    }
    featureList.innerHTML = matches.map((feature) => {
      const category = categoryLabel(feature.category);
      const selected = feature.id === state.selectedFeature;
      return `
        <button type="button" data-select-feature="${escapeHtml(feature.id)}" aria-current="${selected ? "true" : "false"}">
          <span>${escapeHtml(category.code)}</span>
          <strong>${escapeHtml(feature.name)}</strong>
          <small>${escapeHtml(category.label)}</small>
          <b aria-hidden="true">→</b>
        </button>`;
    }).join("");
  }

  function detailRow(label, value) {
    return `<div class="detail-row"><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`;
  }

  function renderFeatureDetail(id) {
    const feature = getFeature(id);
    const category = categoryLabel(feature.category);
    state.selectedFeature = id;
    featureDetail.innerHTML = `
      <div class="feature-detail__heading">
        <p class="micro-label">${escapeHtml(category.code)} / ${escapeHtml(category.label)}</p>
        <h3>${escapeHtml(feature.name)}</h3>
        <p>${escapeHtml(feature.thaiPromise)}</p>
      </div>
      <dl class="detail-grid">
        ${detailRow("WHEN TO USE", feature.whenToUse)}
        ${detailRow("HOW TO START", feature.howToStart)}
        ${detailRow("SURFACES", feature.surfaces.join(" · "))}
        ${detailRow("AVAILABILITY", feature.availability)}
        ${detailRow("WATCH OUT", feature.limitations)}
      </dl>
      <div class="detail-prompt">
        <span>TRY THIS PROMPT</span>
        <p>${escapeHtml(feature.prompt)}</p>
        <button type="button" data-copy-text="${escapeHtml(feature.prompt)}">คัดลอก Prompt</button>
      </div>
      <a class="official-link" href="${escapeHtml(feature.officialUrl)}" target="_blank" rel="noopener noreferrer">
        <span>อ่านเอกสารต้นฉบับ</span><strong>learn.chatgpt.com</strong><b aria-hidden="true">↗</b>
      </a>`;
    renderFeatureList();
  }

  function openExplorer(featureId) {
    const requested = featureId && featureById.has(featureId) ? featureId : state.selectedFeature;
    const current = atlas.slides[state.currentSlide];
    state.hashBeforeDialog = `#${current.id}`;
    renderFeatureDetail(requested);
    if (!featureDialog.open) featureDialog.showModal();
    history.replaceState(null, "", `#feature/${requested}`);
    window.setTimeout(() => {
      const selected = featureList.querySelector('[aria-current="true"]');
      if (selected) {
        featureList.scrollTop = Math.max(0, selected.offsetTop - featureList.offsetTop - 8);
      }
      featureSearch.focus();
    }, 0);
  }

  function closeExplorer() {
    if (featureDialog.open) featureDialog.close();
  }

  function restoreSlideHash() {
    if (location.hash.startsWith("#feature/")) {
      history.replaceState(null, "", state.hashBeforeDialog);
    }
  }

  function setCurrentSlide(index, updateHash = true) {
    const clamped = Math.max(0, Math.min(index, atlas.slides.length - 1));
    if (clamped === state.currentSlide && document.querySelector('.slide[aria-current="true"]')) return;
    state.currentSlide = clamped;
    const slide = atlas.slides[clamped];
    const chapter = chapterMeta[slide.chapter] || chapterMeta.intro;

    document.querySelectorAll(".slide").forEach((node, nodeIndex) => {
      if (nodeIndex === clamped) node.setAttribute("aria-current", "true");
      else node.removeAttribute("aria-current");
    });

    document.querySelector("#slideCurrent").textContent = String(clamped + 1).padStart(2, "0");
    document.querySelector("#progressFill").style.width = `${((clamped + 1) / atlas.slides.length) * 100}%`;
    document.querySelector("#chapterCode").textContent = chapter.code;
    document.querySelector("#chapterName").textContent = chapter.name;
    document.querySelector("#prevSlide").disabled = clamped === 0;
    document.querySelector("#nextSlide").disabled = clamped === atlas.slides.length - 1;
    document.title = `${String(clamped + 1).padStart(2, "0")} · ${slide.title.replaceAll("\n", " ")} — Feature Atlas`;
    localStorage.setItem("cfa.slide", String(clamped));

    if (updateHash && !featureDialog.open) {
      history.replaceState(null, "", `#${slide.id}`);
    }
  }

  function goToSlide(index, behavior = "smooth") {
    const clamped = Math.max(0, Math.min(index, atlas.slides.length - 1));
    const target = document.querySelector(`[data-slide-index="${clamped}"]`);
    if (!target) return;
    target.scrollIntoView({ behavior, block: "start" });
    setCurrentSlide(clamped);
  }

  function detectCurrentSlide() {
    state.scrollTicking = false;
    const viewportTarget = window.innerHeight * 0.46;
    let closestIndex = state.currentSlide;
    let closestDistance = Number.POSITIVE_INFINITY;
    document.querySelectorAll(".slide").forEach((slide, index) => {
      const rect = slide.getBoundingClientRect();
      const visibleTop = Math.max(rect.top, 0);
      const visibleBottom = Math.min(rect.bottom, window.innerHeight);
      const center = (visibleTop + visibleBottom) / 2;
      const distance = Math.abs(center - viewportTarget);
      if (distance < closestDistance && rect.bottom > 0 && rect.top < window.innerHeight) {
        closestDistance = distance;
        closestIndex = index;
      }
    });
    setCurrentSlide(closestIndex);
  }

  function requestSlideDetection() {
    if (state.scrollTicking) return;
    state.scrollTicking = true;
    window.requestAnimationFrame(detectCurrentSlide);
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-visible");
    window.clearTimeout(showToast.timer);
    showToast.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 2200);
  }

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        showToast("คัดลอก Prompt แล้ว");
        return;
      } catch (error) {
        console.warn("Clipboard API unavailable, using selection fallback", error);
      }
    }

    const field = document.createElement("textarea");
    field.value = text;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.append(field);
    field.select();
    const copied = document.execCommand("copy");
    field.remove();
    showToast(copied ? "คัดลอก Prompt แล้ว" : "คัดลอกไม่สำเร็จ กรุณาเลือกข้อความด้วยตนเอง");
  }

  function toggleMode() {
    const isReadMode = document.body.dataset.mode === "read";
    document.body.dataset.mode = isReadMode ? "deck" : "read";
    const button = document.querySelector("#modeToggle");
    button.setAttribute("aria-pressed", String(!isReadMode));
    button.querySelector(".utility-button__label").textContent = isReadMode ? "อ่านต่อเนื่อง" : "โหมดสไลด์";
    localStorage.setItem("cfa.mode", document.body.dataset.mode);
    window.requestAnimationFrame(() => goToSlide(state.currentSlide, "auto"));
  }

  function bindEvents() {
    document.querySelector("#prevSlide").addEventListener("click", () => goToSlide(state.currentSlide - 1));
    document.querySelector("#nextSlide").addEventListener("click", () => goToSlide(state.currentSlide + 1));
    document.querySelector("#modeToggle").addEventListener("click", toggleMode);
    document.querySelector("#exploreButton").addEventListener("click", () => openExplorer());
    document.querySelector("#dialogClose").addEventListener("click", closeExplorer);

    deck.addEventListener("click", (event) => {
      const featureButton = event.target.closest("[data-feature-id]");
      const explorerButton = event.target.closest("[data-open-explorer]");
      const slideButton = event.target.closest("[data-go-slide]");
      const copyButton = event.target.closest("[data-copy-text]");
      if (featureButton) openExplorer(featureButton.dataset.featureId);
      else if (explorerButton) openExplorer();
      else if (slideButton) goToSlide(Number(slideButton.dataset.goSlide));
      else if (copyButton) copyText(copyButton.dataset.copyText);
    });

    featureDialog.addEventListener("click", (event) => {
      if (event.target === featureDialog) closeExplorer();
      const selection = event.target.closest("[data-select-feature]");
      const copyButton = event.target.closest("[data-copy-text]");
      if (selection) {
        renderFeatureDetail(selection.dataset.selectFeature);
        history.replaceState(null, "", `#feature/${selection.dataset.selectFeature}`);
        featureDetail.focus({ preventScroll: true });
      } else if (copyButton) {
        copyText(copyButton.dataset.copyText);
      }
    });

    featureDialog.addEventListener("close", restoreSlideHash);
    featureDialog.addEventListener("cancel", (event) => {
      event.preventDefault();
      closeExplorer();
    });

    featureSearch.addEventListener("input", () => {
      state.query = featureSearch.value;
      renderFeatureList();
    });

    filterTabs.addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      state.filter = button.dataset.filter;
      filterTabs.querySelectorAll("button").forEach((node) => node.setAttribute("aria-pressed", String(node === button)));
      renderFeatureList();
    });

    document.addEventListener("keydown", (event) => {
      if (featureDialog.open) return;
      const tag = event.target.tagName;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(tag) || event.target.isContentEditable) return;
      if (["ArrowRight", "ArrowDown", "PageDown"].includes(event.key) || (event.key === " " && !event.shiftKey)) {
        event.preventDefault();
        goToSlide(state.currentSlide + 1);
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key) || (event.key === " " && event.shiftKey)) {
        event.preventDefault();
        goToSlide(state.currentSlide - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goToSlide(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goToSlide(atlas.slides.length - 1);
      }
    });

    deck.addEventListener("scroll", requestSlideDetection, { passive: true });
    window.addEventListener("scroll", requestSlideDetection, { passive: true });
    window.addEventListener("resize", requestSlideDetection, { passive: true });

    deck.addEventListener("touchstart", (event) => {
      const touch = event.changedTouches[0];
      state.touchStart = { x: touch.clientX, y: touch.clientY };
    }, { passive: true });
    deck.addEventListener("touchend", (event) => {
      if (!state.touchStart) return;
      const touch = event.changedTouches[0];
      const deltaX = touch.clientX - state.touchStart.x;
      const deltaY = touch.clientY - state.touchStart.y;
      state.touchStart = null;
      if (Math.abs(deltaX) > 70 && Math.abs(deltaX) > Math.abs(deltaY) * 1.5) {
        goToSlide(state.currentSlide + (deltaX < 0 ? 1 : -1));
      }
    }, { passive: true });
  }

  function initializeMotion() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("is-visible");
      });
    }, { threshold: 0.18 });
    document.querySelectorAll(".slide").forEach((slide) => observer.observe(slide));
  }

  function restoreInitialState() {
    const storedMode = localStorage.getItem("cfa.mode");
    if (storedMode === "read") {
      document.body.dataset.mode = "read";
      const modeButton = document.querySelector("#modeToggle");
      modeButton.setAttribute("aria-pressed", "true");
      modeButton.querySelector(".utility-button__label").textContent = "โหมดสไลด์";
    }

    const hash = decodeURIComponent(location.hash.slice(1));
    if (hash.startsWith("feature/")) {
      const featureId = hash.split("/")[1];
      const storedSlide = Number(localStorage.getItem("cfa.slide"));
      const safeSlide = Number.isInteger(storedSlide) ? storedSlide : 0;
      goToSlide(safeSlide, "auto");
      openExplorer(featureId);
      return;
    }

    const hashIndex = atlas.slides.findIndex((slide) => slide.id === hash);
    const storedSlide = Number(localStorage.getItem("cfa.slide"));
    const initialIndex = hashIndex >= 0
      ? hashIndex
      : Number.isInteger(storedSlide) && storedSlide >= 0 && storedSlide < atlas.slides.length
        ? storedSlide
        : 0;
    goToSlide(initialIndex, "auto");
  }

  renderDeck();
  renderFeatureList();
  renderFeatureDetail(state.selectedFeature);
  bindEvents();
  initializeMotion();
  restoreInitialState();
})();
