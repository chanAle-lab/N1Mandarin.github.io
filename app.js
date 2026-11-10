(function () {
  const main = document.getElementById("main");
  const papers = window.PAPERS || [];
  const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const state = { level: "All", skill: "All", q: "", answers: false, pinyin: true };

  /* ---------- HSK 1 data ---------- */
  const GROUPS = ["All", "Nouns", "Verbs", "Adjectives", "Pronouns", "Numbers & measures", "Phrases", "Other"];
  function groupOf(pos) {
    const first = (pos.split(",")[0] || "").replace(/[()]/g, "").trim();
    if (!first) return "Phrases";
    if (first === "noun") return "Nouns";
    if (first === "verb") return "Verbs";
    if (first === "adjective") return "Adjectives";
    if (first === "pronoun") return "Pronouns";
    if (/number|classifier/.test(first)) return "Numbers & measures";
    return "Other";
  }
  const LISTS = { 1: window.HSK1 || [], 2: window.HSK2 || [], 3: window.HSK3 || [] };
  const WORDS = [];
  Object.entries(LISTS).forEach(([lv, list]) => list.forEach(([n, zh, py, pos, en]) =>
    WORDS.push({ id: `${lv}-${n}`, lv: +lv, n, zh, py, pos: pos || "phrase", en, group: groupOf(pos) })));
  // Level picker shared by the word list, flashcards and generator
  const LEVELS = [["1", "HSK 1"], ["2", "HSK 2"], ["3", "HSK 3"], ["all", "HSK 1–3"]];
  // "12" (HSK 1 + 2) is kept so generator links made before HSK 3 was added still rebuild the same paper
  const levelName = (l) => l === "12" ? "HSK 1 + 2" : (LEVELS.find((x) => x[0] === l) || LEVELS[0])[1];
  let level = "1";
  const levelWords = (l = level) => WORDS.filter((w) => l === "all" || (l === "12" ? w.lv <= 2 : String(w.lv) === l));
  const levelRow = (attr) => `<div class="chip-row level-row" role="group" aria-label="HSK level">
      <span class="chip-label">Level</span>
      ${LEVELS.map(([v, label]) => `<button class="chip" ${attr}="${v}" aria-pressed="${level === v}">${label}</button>`).join("")}
    </div>`;
  const shortEn = (en) => en.split(";")[0].replace(/\s*\(.*?\)\s*/g, " ").trim();

  // Known words: saved where the browser allows it, otherwise kept for this visit
  const known = new Set();
  const store = window.N1Store || { load() {}, save() {} }; // storage.js adds saving on the live site
  store.known = known;
  store.load();

  /* ---------- Helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // Latin runs (pinyin, punctuation-free letters) inside Chinese lines use the body font so tone marks sit correctly
  const latin = (html) => html.replace(/(?<![&#A-Za-z\u00C0-\u024F])[A-Za-z\u00C0-\u024F\u0300-\u036F\u01CD-\u01DC'’]+(?:[ .,?!\-/]+[A-Za-z\u00C0-\u024F\u0300-\u036F\u01CD-\u01DC'’]+)*/g, (m) => `<span class="lat">${m}</span>`);
  const zh = (s) => `<span class="zh" lang="zh-Hans">${latin(esc(s))}</span>`;
  const gap = (s) => esc(s).replace(/___/g, '<span class="gap" aria-label="blank"></span>');
  const gapZh = (s) => latin(esc(s)).replace(/___/g, '<span class="gap" aria-label="blank"></span>');
  const hasZh = (s) => /[\u4e00-\u9fff]/.test(s);

  function rng(seed) { // mulberry32
    let a = seed >>> 0;
    return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  }
  function shuffleWith(arr, rand) {
    const out = arr.slice();
    for (let i = out.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [out[i], out[j]] = [out[j], out[i]]; }
    return out;
  }
  function seedOf(str) { let s = 7; for (const ch of str) s = (s * 31 + ch.charCodeAt(0)) >>> 0; return s; }
  const shuffled = (arr, key) => shuffleWith(arr, rng(seedOf(key)));

  const canSpeak = "speechSynthesis" in window;
  function speak(text) {
    if (!canSpeak) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = "zh-CN"; u.rate = 0.8;
    const v = speechSynthesis.getVoices().find((x) => /^zh(-|_)CN/i.test(x.lang)) || speechSynthesis.getVoices().find((x) => /^zh/i.test(x.lang));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  }
  const speakBtn = (w) => canSpeak ? `<button class="icon-btn" data-say="${esc(w)}" aria-label="Play ${esc(w)}" title="Listen">${ICON_SOUND}</button>` : "";
  const ICON_SOUND = `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M18.5 5.5a9 9 0 0 1 0 13"/></svg>`;
  function wireSpeak(root) { root.querySelectorAll("[data-say]").forEach((b) => b.addEventListener("click", (e) => { e.stopPropagation(); speak(b.dataset.say); })); }

  function setActiveNav(key) {
    document.querySelectorAll(".site-header nav a").forEach((a) => a.classList.toggle("active", a.dataset.nav === key));
  }

  function chipRow(label, values, current, attr) {
    return `<div class="chip-row" role="group" aria-label="${label}">
      <span class="chip-label">${label}</span>
      ${values.map((v) => `<button class="chip" ${attr}="${esc(v)}" aria-pressed="${current === v}">${esc(v)}</button>`).join("")}
    </div>`;
  }

  /* ---------- Library ---------- */
  function uniq(key) { return ["All", ...new Set(papers.map((p) => p[key]))]; }

  function filtered() {
    const q = state.q.trim().toLowerCase();
    return papers.filter((p) =>
      (state.level === "All" || p.level === state.level) &&
      (state.skill === "All" || p.skill === state.skill) &&
      (!q || [p.title, p.zh, p.summary, p.skill, p.level].join(" ").toLowerCase().includes(q)));
  }

  function cards() {
    const list = filtered();
    if (!list.length) return `<p class="empty">No papers match those filters. <button class="link" data-reset>Clear filters</button></p>`;
    return list.map((p) => `
      <a class="card" href="#/paper/${p.id}">
        <span class="card-no">${p.no}</span>
        <span class="card-zh">${zh(p.zh)}</span>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.summary)}</p>
        <span class="meta"><span>${esc(p.level)}</span><span>${esc(p.skill)}</span><span>${p.minutes} min</span></span>
      </a>`).join("");
  }

  function renderLibrary() {
    document.title = "N1Mandarin — Printable practice papers";
    setActiveNav("papers");
    main.innerHTML = `
      <section class="hero">
        <div class="hero-text">
          <p class="eyebrow">The Best Mandarin Class · 练习纸</p>
          <h1>Practice papers you can print, mark and reuse.</h1>
          <p class="lede">Ready-made worksheets, the full HSK 1–3 (3.0) word lists, flashcards with audio, and a generator that builds a new printable paper in one click. Every paper has an answer key and prints cleanly on A4.</p>
          <div class="hero-ctas"><a class="btn" href="#library">Browse the papers</a><a class="btn ghost" href="#/generate">Generate an HSK paper</a></div>
        </div>
        <div class="hero-grid" aria-hidden="true">
          ${["学", "中", "文"].map((c) => `<span class="tzg big">${c}</span>`).join("")}
        </div>
      </section>
      <section class="toolkit" aria-labelledby="toolkit-h">
        <div class="toolkit-head">
          <h2 id="toolkit-h">HSK toolkit <span class="zh">新HSK一至三级</span></h2>
          <p>Built from the New HSK (3.0) lists: 300 Level 1, 200 Level 2 and 500 Level 3 words.</p>
        </div>
        <div class="tools">
          <a class="tool" href="#/words"><span class="tool-zh zh">词</span><h3>Word list</h3><p>All 1,000 HSK 1–3 words with pinyin, part of speech and meaning. Search, filter, listen, and hide columns to test yourself.</p></a>
          <a class="tool" href="#/flashcards"><span class="tool-zh zh">卡</span><h3>Flashcards</h3><p>Flip through words by topic, hear each one, and sort them into "know it" and "still learning".</p></a>
          <a class="tool" href="#/pinyin"><span class="tool-zh zh">音</span><h3>Pinyin sounds</h3><p>Split any syllable into initial, final and tone. Hear every sound and find the HSK words that use it.</p></a>
          <a class="tool" href="#/generate"><span class="tool-zh zh">卷</span><h3>Paper generator</h3><p>Pick the sections and word types, and get a fresh printable paper with a matching answer key.</p></a>
        </div>
      </section>
      <section id="library" class="library">
        <div class="library-head">
          <h2>Worksheet library</h2>
          <label class="search"><span class="sr">Search papers</span>
            <input type="search" placeholder="Search papers…" value="${esc(state.q)}" data-search /></label>
        </div>
        ${chipRow("Level", uniq("level"), state.level, 'data-level')}
        ${chipRow("Skill", uniq("skill"), state.skill, 'data-skill')}
        <div class="cards" data-cards>${cards()}</div>
      </section>`;
    main.querySelectorAll("[data-level],[data-skill]").forEach((b) => b.addEventListener("click", () => {
      const key = b.dataset.level !== undefined ? "level" : "skill";
      state[key] = b.dataset[key];
      main.querySelectorAll(`[data-${key}]`).forEach((x) => x.setAttribute("aria-pressed", x === b));
      refreshCards();
    }));
    main.querySelector("[data-search]").addEventListener("input", (e) => { state.q = e.target.value; refreshCards(); });
  }

  function refreshCards() {
    const box = main.querySelector("[data-cards]");
    box.innerHTML = cards();
    const r = box.querySelector("[data-reset]");
    if (r) r.addEventListener("click", () => { state.level = state.skill = "All"; state.q = ""; renderLibrary(); });
  }

  /* ---------- Paper sheet (shared by library papers and generator) ---------- */
  const ans = (a) => `<span class="answer">${latin(esc(a))}</span>`;
  const line = `<span class="write-line"></span>`;
  const promptOf = (it) => `<span class="prompt">${hasZh(it.q) ? zh(it.q) : esc(it.q)}${it.py ? ` <span class="py">${esc(it.py)}</span>` : ""}</span>`;

  const sectionRenderers = {
    tone: (s) => `<ol class="items two-col">${s.items.map((it) => `<li>${promptOf(it)}${line}${ans(it.a)}</li>`).join("")}</ol>`,
    translate: (s) => `<ol class="items">${s.items.map((it) => `<li>${promptOf(it)}${line}${ans(it.a)}</li>`).join("")}</ol>`,
    match: (s, p, i) => {
      const opts = shuffled(s.items.map((it) => it.a), p.id + i);
      return `<div class="match">
        <ol class="items items-match">${s.items.map((it) => `<li><span class="prompt">${zh(it.zh)} <span class="py">${esc(it.py)}</span></span><span class="box-ans"></span>${ans(LETTERS[opts.indexOf(it.a)])}</li>`).join("")}</ol>
        <ul class="options">${opts.map((o, k) => `<li><b>${LETTERS[k]}</b> ${esc(o)}</li>`).join("")}</ul>
      </div>`;
    },
    fill: (s) => `${s.bank ? `<div class="bank" aria-label="Word box">${s.bank.map(zh).join("")}</div>` : ""}
      <ol class="items items-fill">${s.items.map((it) => `<li><span class="prompt"><span class="zh" lang="zh-Hans">${gapZh(it.zh)}</span> <span class="py">${gap(it.py)}</span></span>${ans(it.a)}</li>`).join("")}</ol>`,
    grid: (s) => `<div class="grid-sheet">${s.items.map((it) => `
      <div class="grid-row">
        <div class="grid-info"><span class="zh">${esc(it.zh)}</span><span class="py">${esc(it.py)}</span><span class="en">${esc(it.en)}${it.strokes ? ` · ${it.strokes} strokes` : ""}</span></div>
        <div class="grid-boxes">
          <span class="tzg ink">${esc(it.zh)}</span><span class="tzg trace">${esc(it.zh)}</span><span class="tzg trace">${esc(it.zh)}</span>
          ${'<span class="tzg"></span>'.repeat(5)}
        </div>
      </div>`).join("")}</div>`,
    reading: (s) => `<div class="passage">
        <p class="zh passage-zh" lang="zh-Hans">${esc(s.passage)}</p>
        ${s.pinyin ? `<p class="py passage-py">${esc(s.pinyin)}</p>` : ""}
      </div>
      <ol class="items items-reading">${s.items.map((it) => `<li><span class="prompt">${zh(it.q)}</span>${line}${ans(it.a)}</li>`).join("")}</ol>`
  };

  function sheetHtml(p) {
    return `<article class="sheet ${state.answers ? "show-answers" : ""} ${state.pinyin ? "" : "hide-pinyin"}">
        <header class="sheet-head">
          <div>
            <p class="eyebrow">${p.eyebrow || `Paper ${p.no} · ${esc(p.level)} · ${esc(p.skill)} · ${p.minutes} min`}</p>
            <h1>${esc(p.title)} <span class="zh">${esc(p.zh)}</span></h1>
          </div>
          <dl class="student">
            <div><dt>Name 姓名</dt><dd></dd></div>
            <div><dt>Date 日期</dt><dd></dd></div>
            <div><dt>Score 分数</dt><dd></dd></div>
          </dl>
        </header>
        <p class="answer-banner">Answer key 答案</p>
        ${p.sections.map((s, i) => `
          <section class="part">
            <h2><span class="part-no">${LETTERS[i]}</span>${esc(s.title)}</h2>
            <p class="instr">${esc(s.instructions)}</p>
            ${sectionRenderers[s.type](s, p, i)}
          </section>`).join("")}
      </article>`;
  }

  function toolbarHtml(backHref, backLabel) {
    return `<div class="toolbar no-print">
        <a href="${backHref}" class="back">← ${backLabel}</a>
        <div class="toggles">
          <label class="switch"><input type="checkbox" data-t="pinyin" ${state.pinyin ? "checked" : ""}/> <span>Pinyin</span></label>
          <label class="switch"><input type="checkbox" data-t="answers" ${state.answers ? "checked" : ""}/> <span>Answer key</span></label>
          <button class="btn small" data-print>Print / Save PDF</button>
        </div>
      </div>`;
  }

  function wireSheet() {
    main.querySelectorAll("[data-t]").forEach((c) => c.addEventListener("change", () => {
      state[c.dataset.t] = c.checked;
      const sheet = main.querySelector(".sheet");
      sheet.classList.toggle("show-answers", state.answers);
      sheet.classList.toggle("hide-pinyin", !state.pinyin);
    }));
    main.querySelector("[data-print]").addEventListener("click", () => window.print());
  }

  function renderPaper(id) {
    setActiveNav("papers");
    const p = papers.find((x) => x.id === id);
    if (!p) { main.innerHTML = `<section class="narrow"><h1>Paper not found</h1><p><a href="#/">Back to the library</a></p></section>`; return; }
    document.title = `${p.title} — N1Mandarin`;
    const next = papers[(papers.indexOf(p) + 1) % papers.length];
    main.innerHTML = toolbarHtml("#/", "Library") + sheetHtml(p) +
      `<nav class="next no-print"><a href="#/paper/${next.id}">Next paper: ${esc(next.title)} →</a></nav>`;
    wireSheet();
  }

  /* ---------- Word list ---------- */
  const wl = { q: "", group: "All", hidePy: false, hideEn: false, onlyLearning: false };

  function wordMatches(w) {
    const q = wl.q.trim().toLowerCase();
    const plain = (s) => s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    return (wl.group === "All" || w.group === wl.group) &&
      (!wl.onlyLearning || !known.has(w.id)) &&
      (!q || w.zh.includes(q) || plain(w.py).replace(/\s/g, "").includes(plain(q).replace(/\s/g, "")) || w.en.toLowerCase().includes(q));
  }

  function wordRows() {
    const list = levelWords().filter(wordMatches);
    if (!list.length) return `<tr><td colspan="6" class="empty">No words match. Try a different search or group.</td></tr>`;
    return list.map((w) => `
      <tr class="${known.has(w.id) ? "is-known" : ""}">
        <td class="num">${level === "all" || level === "12" ? `<span class="lv">${w.lv}</span>` : ""}${w.n}</td>
        <td class="w-zh"><span class="zh" lang="zh-Hans">${esc(w.zh)}</span></td>
        <td class="w-py"><span class="cover">${esc(w.py)}</span></td>
        <td class="w-pos">${esc(w.pos)}</td>
        <td class="w-en"><span class="cover">${esc(w.en)}</span></td>
        <td class="w-act no-print">${speakBtn(w.zh)}<button class="icon-btn know" data-know="${w.id}" aria-pressed="${known.has(w.id)}" title="Mark as known" aria-label="Mark ${esc(w.zh)} as known">✓</button></td>
      </tr>`).join("");
  }

  function renderWords() {
    document.title = "HSK word list — N1Mandarin";
    setActiveNav("words");
    main.innerHTML = `
      <section class="page-head">
        <p class="eyebrow">New HSK 3.0 · Levels 1 to 3</p>
        <h1>HSK word list <span class="zh">词汇表</span></h1>
        <p class="lede">All 300 HSK 1, 200 HSK 2 and 500 HSK 3 words. Search by characters, pinyin (tone marks optional) or English. Hide the pinyin or meanings to test yourself, then click a covered cell to check it.</p>
      </section>
      <div class="words-tools no-print">
        <label class="search"><span class="sr">Search words</span><input type="search" placeholder="Search 爱, ai, love…" value="${esc(wl.q)}" data-wsearch /></label>
        <div class="toggles">
          <label class="switch"><input type="checkbox" data-w="hidePy" ${wl.hidePy ? "checked" : ""}/> <span>Hide pinyin</span></label>
          <label class="switch"><input type="checkbox" data-w="hideEn" ${wl.hideEn ? "checked" : ""}/> <span>Hide meaning</span></label>
          <label class="switch"><input type="checkbox" data-w="onlyLearning" ${wl.onlyLearning ? "checked" : ""}/> <span>Still learning only</span></label>
          <button class="btn small" data-print>Print list</button>
        </div>
      </div>
      <div class="no-print">${levelRow("data-wlevel")}${chipRow("Type", GROUPS, wl.group, "data-group")}</div>
      <p class="count no-print" data-count></p>
      <div class="table-wrap">
        <table class="words ${wl.hidePy ? "hide-py" : ""} ${wl.hideEn ? "hide-en" : ""}">
          <thead><tr><th class="num">No.</th><th>Word</th><th>Pinyin</th><th class="w-pos">Type</th><th>Meaning</th><th class="no-print"><span class="sr">Actions</span></th></tr></thead>
          <tbody data-wrows>${wordRows()}</tbody>
        </table>
      </div>
      <p class="source">Word lists: New HSK Vocabulary Levels 1–3 (HSK 3.0), compiled by MandarinBean.com.</p>`;
    const refresh = () => { main.querySelector("[data-wrows]").innerHTML = wordRows(); wireRows(); updateCount(); };
    const updateCount = () => {
      const pool = levelWords();
      const shown = pool.filter(wordMatches).length;
      main.querySelector("[data-count]").textContent = `Showing ${shown} of ${pool.length} ${levelName(level)} words · ${pool.filter((w) => known.has(w.id)).length} marked as known`;
    };
    function wireRows() {
      wireSpeak(main.querySelector("[data-wrows]"));
      main.querySelectorAll("[data-know]").forEach((b) => b.addEventListener("click", () => {
        const n = b.dataset.know;
        known.has(n) ? known.delete(n) : known.add(n); store.save();
        b.setAttribute("aria-pressed", known.has(n)); b.closest("tr").classList.toggle("is-known", known.has(n));
        if (wl.onlyLearning) refresh(); else updateCount();
      }));
      main.querySelectorAll(".cover").forEach((c) => c.addEventListener("click", () => c.classList.toggle("peek")));
    }
    main.querySelectorAll("[data-wlevel]").forEach((b) => b.addEventListener("click", () => {
      level = b.dataset.wlevel; main.querySelectorAll("[data-wlevel]").forEach((x) => x.setAttribute("aria-pressed", x === b)); refresh();
    }));
    main.querySelector("[data-wsearch]").addEventListener("input", (e) => { wl.q = e.target.value; refresh(); });
    main.querySelectorAll("[data-group]").forEach((b) => b.addEventListener("click", () => {
      wl.group = b.dataset.group; main.querySelectorAll("[data-group]").forEach((x) => x.setAttribute("aria-pressed", x === b)); refresh();
    }));
    main.querySelectorAll("[data-w]").forEach((c) => c.addEventListener("change", () => {
      wl[c.dataset.w] = c.checked;
      const t = main.querySelector("table.words");
      t.classList.toggle("hide-py", wl.hidePy); t.classList.toggle("hide-en", wl.hideEn);
      if (c.dataset.w === "onlyLearning") refresh();
    }));
    main.querySelector("[data-print]").addEventListener("click", () => window.print());
    wireRows(); updateCount();
  }

  /* ---------- Flashcards ---------- */
  const fc = { group: "All", deck: [], i: 0, flipped: false, front: "zh", skipKnown: false };

  function buildDeck(shuffle) {
    let list = levelWords().filter((w) => (fc.group === "All" || w.group === fc.group) && (!fc.skipKnown || !known.has(w.id)));
    if (shuffle) list = shuffleWith(list, Math.random);
    fc.deck = list; fc.i = 0; fc.flipped = false;
  }

  function renderFlashcards() {
    document.title = "HSK flashcards — N1Mandarin";
    setActiveNav("flashcards");
    if (!fc.deck.length || fc.level !== level) { fc.level = level; buildDeck(false); }
    main.innerHTML = `
      <section class="page-head">
        <p class="eyebrow">New HSK 3.0 · ${levelName(level)}</p>
        <h1>Flashcards <span class="zh">识字卡</span></h1>
        <p class="lede">Tap the card or press Space to flip. Use the arrow keys to move, K for "know it" and L for "still learning".</p>
      </section>
      ${levelRow("data-flevel")}
      <div class="fc-controls">
        ${chipRow("Type", GROUPS, fc.group, "data-fgroup")}
        <div class="toggles">
          <label class="switch"><span>Front</span>
            <select data-front>
              <option value="zh" ${fc.front === "zh" ? "selected" : ""}>Characters</option>
              <option value="en" ${fc.front === "en" ? "selected" : ""}>English</option>
              <option value="py" ${fc.front === "py" ? "selected" : ""}>Pinyin</option>
            </select></label>
          <label class="switch"><input type="checkbox" data-skip ${fc.skipKnown ? "checked" : ""}/> <span>Skip known words</span></label>
          <button class="btn small ghost" data-shuffle>Shuffle</button>
        </div>
      </div>
      <div class="fc-stage" data-stage></div>`;
    drawCard();
    main.querySelectorAll("[data-flevel]").forEach((b) => b.addEventListener("click", () => { level = b.dataset.flevel; renderFlashcards(); }));
    main.querySelectorAll("[data-fgroup]").forEach((b) => b.addEventListener("click", () => {
      fc.group = b.dataset.fgroup; main.querySelectorAll("[data-fgroup]").forEach((x) => x.setAttribute("aria-pressed", x === b)); buildDeck(false); drawCard();
    }));
    main.querySelector("[data-front]").addEventListener("change", (e) => { fc.front = e.target.value; fc.flipped = false; drawCard(); });
    main.querySelector("[data-skip]").addEventListener("change", (e) => { fc.skipKnown = e.target.checked; buildDeck(false); drawCard(); });
    main.querySelector("[data-shuffle]").addEventListener("click", () => { buildDeck(true); drawCard(); });
  }

  function drawCard() {
    const stage = main.querySelector("[data-stage]");
    if (!stage) return;
    if (!fc.deck.length) {
      stage.innerHTML = `<div class="fc-empty"><p>No cards left in this set. You've marked them all as known.</p><button class="btn small" data-reset-known>Reset known words</button></div>`;
      stage.querySelector("[data-reset-known]").addEventListener("click", () => { levelWords().forEach((x) => known.delete(x.id)); store.save(); buildDeck(false); drawCard(); });
      return;
    }
    const w = fc.deck[fc.i];
    const faces = {
      zh: `<span class="fc-big zh" lang="zh-Hans">${esc(w.zh)}</span>`,
      en: `<span class="fc-en-front">${esc(shortEn(w.en))}</span>`,
      py: `<span class="fc-py-front">${esc(w.py)}</span>`
    };
    const back = `
      <span class="fc-mid zh" lang="zh-Hans">${esc(w.zh)}</span>
      <span class="fc-py">${esc(w.py)}</span>
      <span class="fc-en">${esc(w.en)}</span>
      <span class="fc-pos">${esc(w.pos)} · HSK ${w.lv} No. ${w.n}</span>`;
    const done = fc.deck.filter((x) => known.has(x.id)).length;
    stage.innerHTML = `
      <div class="fc-progress"><span>Card ${fc.i + 1} of ${fc.deck.length}</span><span>${done} known in this set</span></div>
      <div class="fc-bar"><span style="width:${((fc.i + 1) / fc.deck.length) * 100}%"></span></div>
      <button class="fc-card ${fc.flipped ? "flipped" : ""} ${known.has(w.id) ? "is-known" : ""}" data-flip aria-label="Flashcard. Activate to flip.">
        <span class="fc-face fc-front">${faces[fc.front]}<span class="fc-hint">Tap to flip</span></span>
        <span class="fc-face fc-back">${back}</span>
      </button>
      <div class="fc-actions">
        <button class="btn small ghost" data-prev aria-label="Previous card">←</button>
        ${canSpeak ? `<button class="btn small ghost" data-say="${esc(w.zh)}">${ICON_SOUND} Listen</button>` : ""}
        <button class="btn small ghost" data-learning>Still learning</button>
        <button class="btn small" data-know-card>Know it ✓</button>
        <button class="btn small ghost" data-next aria-label="Next card">→</button>
      </div>`;
    stage.querySelector("[data-flip]").addEventListener("click", flip);
    stage.querySelector("[data-prev]").addEventListener("click", () => move(-1));
    stage.querySelector("[data-next]").addEventListener("click", () => move(1));
    stage.querySelector("[data-know-card]").addEventListener("click", () => mark(true));
    stage.querySelector("[data-learning]").addEventListener("click", () => mark(false));
    wireSpeak(stage);
  }
  function flip() { fc.flipped = !fc.flipped; const c = main.querySelector(".fc-card"); if (c) c.classList.toggle("flipped", fc.flipped); }
  function move(d) { if (!fc.deck.length) return; fc.i = (fc.i + d + fc.deck.length) % fc.deck.length; fc.flipped = false; drawCard(); }
  function mark(isKnown) {
    const w = fc.deck[fc.i]; if (!w) return;
    isKnown ? known.add(w.id) : known.delete(w.id); store.save();
    if (isKnown && fc.skipKnown) { fc.deck.splice(fc.i, 1); if (fc.i >= fc.deck.length) fc.i = 0; fc.flipped = false; drawCard(); }
    else move(1);
  }
  document.addEventListener("keydown", (e) => {
    if (!location.hash.startsWith("#/flashcards") || /INPUT|SELECT|TEXTAREA/.test(e.target.tagName)) return;
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
    else if (e.key === "ArrowRight") move(1);
    else if (e.key === "ArrowLeft") move(-1);
    else if (e.key.toLowerCase() === "k") mark(true);
    else if (e.key.toLowerCase() === "l") mark(false);
  });

  /* ---------- Paper generator ---------- */
  const SECTION_TYPES = {
    py: { label: "Write the pinyin", hint: "Character → pinyin with tone marks" },
    en: { label: "Write the meaning", hint: "Character → English" },
    zh: { label: "Write the characters", hint: "English → characters" },
    match: { label: "Match the meanings", hint: "8 words to match with letters" },
    grid: { label: "Character writing grid", hint: "田字格 practice for 6 words" }
  };
  const gen = { code: 0, n: 10, secs: ["py", "en", "zh", "match"], group: "All", learning: false };

  function readGenParams(qs) {
    const p = new URLSearchParams(qs);
    if (p.get("code")) gen.code = parseInt(p.get("code"), 10) || 0;
    if (p.get("n")) gen.n = Math.min(20, Math.max(4, parseInt(p.get("n"), 10) || 10));
    if (p.get("s")) gen.secs = p.get("s").split("").map((c) => ({ p: "py", e: "en", z: "zh", m: "match", g: "grid" }[c])).filter(Boolean);
    if (p.get("g") && GROUPS.includes(p.get("g"))) gen.group = p.get("g");
    if (p.get("L")) { const L = { "1": "1", "2": "2", "3": "3", "12": "12", "123": "all" }[p.get("L")]; if (L) level = L; }
    if (!gen.code) gen.code = 1000 + Math.floor(Math.random() * 9000);
  }
  function genHash() {
    const s = gen.secs.map((k) => ({ py: "p", en: "e", zh: "z", match: "m", grid: "g" }[k])).join("");
    return `#/generate?L=${level === "all" ? "123" : level}&code=${gen.code}&n=${gen.n}&s=${s}&g=${encodeURIComponent(gen.group)}`;
  }

  function buildGenerated() {
    const rand = rng(gen.code * 7919 + gen.n + ({ "1": 0, "2": 101, "12": 202, "3": 303, all: 404 }[level] || 0));
    let pool = levelWords().filter((w) => gen.group === "All" || w.group === gen.group);
    if (gen.learning) pool = pool.filter((w) => !known.has(w.id));
    pool = shuffleWith(pool, rand);
    let k = 0;
    const take = (count, ok = () => true) => {
      const out = [];
      while (out.length < count && k < pool.length) { const w = pool[k++]; if (ok(w)) out.push(w); }
      // If the pool runs out, reuse words rather than leave a section short
      if (out.length < count) shuffleWith(pool, rand).forEach((w) => { if (out.length < count && ok(w) && !out.includes(w)) out.push(w); });
      return out;
    };
    const sections = gen.secs.map((key) => {
      if (key === "py") return { type: "tone", title: "Write the pinyin", instructions: "Write the pinyin for each word, with tone marks.", items: take(gen.n).map((w) => ({ q: w.zh, a: w.py })) };
      if (key === "en") return { type: "translate", title: "What does it mean?", instructions: "Write the English meaning of each word.", items: take(gen.n).map((w) => ({ q: w.zh, py: w.py, a: w.en })) };
      if (key === "zh") return { type: "translate", title: "Write the characters", instructions: "Write each word in Chinese characters. The pinyin is there to help.", items: take(gen.n).map((w) => ({ q: shortEn(w.en), py: w.py, a: w.zh })) };
      if (key === "match") {
        const seen = new Set();
        const ws = take(8, (w) => { const e = shortEn(w.en); if (seen.has(e) || e.length > 28) return false; seen.add(e); return true; });
        return { type: "match", title: "Match the words to their meanings", instructions: "Write the letter of the correct meaning in each box.", items: ws.map((w) => ({ zh: w.zh, py: w.py, a: shortEn(w.en) })) };
      }
      if (key === "grid") return { type: "grid", title: "Practise writing", instructions: "Trace the grey characters, then write the word on your own.", items: take(6, (w) => w.zh.length === 1).map((w) => ({ zh: w.zh, py: w.py, en: shortEn(w.en) })) };
    });
    return {
      id: "gen" + level + gen.code, title: `${levelName(level)} Vocabulary Practice`, zh: { "1": "一级词汇练习", "2": "二级词汇练习", "3": "三级词汇练习", "12": "一、二级词汇练习", all: "一至三级词汇练习" }[level],
      eyebrow: `${levelName(level)} (3.0) · Paper code ${gen.code}${gen.group !== "All" ? " · " + esc(gen.group) : ""}`,
      sections
    };
  }

  function renderGenerate(qs) {
    document.title = "HSK paper generator — N1Mandarin";
    setActiveNav("generate");
    readGenParams(qs);
    const p = buildGenerated();
    main.innerHTML = `
      <section class="page-head no-print">
        <p class="eyebrow">New HSK 3.0 · Levels 1 to 3</p>
        <h1>Paper generator <span class="zh">出卷</span></h1>
        <p class="lede">Choose what goes on the paper, then print. The paper code rebuilds exactly the same paper, so you can reprint it or share the link with another teacher.</p>
      </section>
      <form class="gen-panel no-print" data-gen>
        <fieldset><legend>Sections</legend>
          ${Object.entries(SECTION_TYPES).map(([k, v]) => `<label class="check"><input type="checkbox" name="sec" value="${k}" ${gen.secs.includes(k) ? "checked" : ""}/> <span><b>${v.label}</b><small>${v.hint}</small></span></label>`).join("")}
        </fieldset>
        <fieldset><legend>Words</legend>
          <label class="field"><span>HSK level</span><select name="level">${(level === "12" ? [...LEVELS, ["12", "HSK 1 + 2"]] : LEVELS).map(([v, l]) => `<option value="${v}" ${v === level ? "selected" : ""}>${l}</option>`).join("")}</select></label>
          <label class="field"><span>Word type</span><select name="group">${GROUPS.map((g) => `<option ${g === gen.group ? "selected" : ""}>${g}</option>`).join("")}</select></label>
          <label class="field"><span>Questions per section</span><input type="number" name="n" min="4" max="20" value="${gen.n}"/></label>
          <label class="check"><input type="checkbox" name="learning" ${gen.learning ? "checked" : ""}/> <span><b>Only words I'm still learning</b><small>${levelWords().filter((w) => !known.has(w.id)).length} ${levelName(level)} words not yet marked as known</small></span></label>
        </fieldset>
        <div class="gen-actions">
          <label class="field"><span>Paper code</span><input type="number" name="code" min="1000" max="99999" value="${gen.code}"/></label>
          <button type="button" class="btn ghost" data-new>New paper</button>
        </div>
      </form>
      ${gen.secs.length ? toolbarHtml("#/", "Library") + sheetHtml(p) : `<p class="empty">Choose at least one section to build a paper.</p>`}
      <div class="no-print" style="height:var(--space-20)"></div>`;
    if (gen.secs.length) wireSheet();
    safeReplace(genHash());
    const form = main.querySelector("[data-gen]");
    const apply = () => {
      gen.secs = [...form.querySelectorAll('[name="sec"]:checked')].map((c) => c.value);
      gen.group = form.group.value;
      level = form.level.value;
      gen.n = Math.min(20, Math.max(4, parseInt(form.n.value, 10) || 10));
      gen.code = parseInt(form.code.value, 10) || gen.code;
      gen.learning = form.learning.checked;
      const y = window.scrollY;
      renderGenerate(genHash().split("?")[1]);
      window.scrollTo(0, y);
    };
    form.addEventListener("change", apply);
    main.querySelector("[data-new]").addEventListener("click", () => { form.code.value = 1000 + Math.floor(Math.random() * 9000); apply(); });
  }
  function safeReplace(h) { try { history.replaceState(null, "", h); } catch (e) { /* sandboxed preview */ } }

  /* ---------- About ---------- */
  function renderAbout() {
    document.title = "How to use — N1Mandarin";
    setActiveNav("about");
    main.innerHTML = `<section class="narrow about">
      <h1>How to use N1Mandarin</h1>
      <h2>Worksheets in class</h2>
      <p>Open a paper, switch off <b>Pinyin</b> for stronger students, and choose <b>Print / Save PDF</b>. The site header and buttons are hidden when printing, so you get a clean A4 worksheet with name, date and score boxes.</p>
      <h2>Marking</h2>
      <p>Switch on <b>Answer key</b> and print a second copy for yourself, or show it on the board. Matching letters are fixed, so the student copy and the key always line up.</p>
      <h2>HSK word list and flashcards</h2>
      <p>The <a href="#/words">word list</a> has all 300 New HSK 3.0 Level 1 words, 200 Level 2 words and 500 Level 3 words. Use the Level buttons to switch between HSK 1, HSK 2, HSK 3 or all three. Hide pinyin or meanings to quiz yourself, press the speaker to hear a word, and tick words you know. <a href="#/flashcards">Flashcards</a> use the same "known" ticks, so you can focus on the words you're still learning.</p>
      <h2>Pinyin sounds</h2>
      <p>The <a href="#/pinyin">pinyin page</a> splits any syllable into its initial, final and tone, and explains spelling rules like y/w and the dropped dots on ü. Tap a sound in the charts to hear it and see HSK words that use it, or print the chart for the classroom wall.</p>
      <h2>Generating papers</h2>
      <p>The <a href="#/generate">generator</a> picks words at random from the HSK 1, HSK 2 or HSK 3 list, or all three. Every paper has a code: type the same code with the same settings to rebuild the identical paper, or copy the page link to share it.</p>
      <h2>Adding worksheets</h2>
      <p>Worksheet content lives in <code>papers.js</code> and the vocabulary in <code>hsk1.js</code>, <code>hsk2.js</code> and <code>hsk3.js</code>. Copy an existing paper object, give it a new <code>id</code>, and use the section types <code>tone</code>, <code>match</code>, <code>fill</code>, <code>translate</code>, <code>grid</code> or <code>reading</code>.</p>
      <p><a class="btn" href="#/">Go to the library</a></p>
    </section>`;
  }


  /* ---------- Pinyin sounds ---------- */
  const PY = window.PINYIN;
  WORDS.forEach((w) => { w.syl = PY ? PY.split(w.py).filter((x) => !x.bad) : []; });
  const pyState = { q: "nǐ hǎo", open: {} };
  const TONE_PATHS = { 1: "M4 6 H36", 2: "M4 22 L36 6", 3: "M4 18 Q14 32 22 30 T36 10", 4: "M4 6 L36 32", 5: "" };
  const toneSvg = (n) => `<svg class="contour" viewBox="0 0 40 38" aria-hidden="true"><line x1="2" y1="4" x2="38" y2="4"/><line x1="2" y1="34" x2="38" y2="34"/>${n === 5 ? '<circle cx="20" cy="20" r="4"/>' : `<path d="${TONE_PATHS[n]}"/>`}</svg>`;
  const SOUND_NOTES = {
    y: "y is a spelling letter here: the real final starts with i or ü.",
    w: "w is a spelling letter here: the real final starts with u.",
    "-i": "After zh, ch, sh, r, z, c and s the i is not 'ee': it is a buzzing sound made in the same mouth position.",
    "ü-jqx": "After j, q, x and y, ü is written as u. The sound is still ü.",
    iu: "iu is short for iou: you hear a light o in the middle.",
    ui: "ui is short for uei: you hear a light e in the middle.",
    un: "un is short for uen (after most initials).",
    er: "The final r is erhua: curl the tongue at the end of the syllable."
  };
  function sylNotes(x) {
    const n = [];
    if (x.glide) n.push(SOUND_NOTES[x.glide]);
    if (x.fin === "-i") n.push(SOUND_NOTES["-i"]);
    if (/^[jqxy]$/.test(x.ini || x.glide) && /^ü/.test(x.fin)) n.push(SOUND_NOTES["ü-jqx"]);
    if (x.fin === "iu" || x.fin === "ui" || x.fin === "un") n.push(SOUND_NOTES[x.fin]);
    if (x.er) n.push(SOUND_NOTES.er);
    return n;
  }
  const finLabel = (f) => (f === "-i" ? "-i (buzz)" : f === "io" ? "o" : f);
  function wordsWith(test, max = 10) {
    const list = WORDS.filter((w) => w.syl.some(test));
    // favour short, single-sound words first
    list.sort((a, b) => a.syl.length - b.syl.length || a.lv - b.lv || a.n - b.n);
    return { total: list.length, list: list.slice(0, max) };
  }
  function pyMarked(w, test) {
    return w.syl.map((x) => test(x) ? `<mark>${esc(x.text)}</mark>` : esc(x.text)).join("");
  }
  function wordChips(found, test) {
    if (!found.total) return `<p class="muted">No HSK 1–3 words use this sound.</p>`;
    return `<ul class="py-words">${found.list.map((w) => `<li><button class="py-word" data-say="${esc(w.zh)}" title="Listen"><span class="zh" lang="zh-Hans">${esc(w.zh)}</span><span class="py">${pyMarked(w, test)}</span><span class="en">${esc(shortEn(w.en))}</span><span class="lv-tag">HSK ${w.lv}</span></button></li>`).join("")}</ul>
      ${found.total > found.list.length ? `<p class="muted small">Showing ${found.list.length} of ${found.total} HSK 1–3 words with this sound.</p>` : ""}`;
  }

  function splitHtml(q) {
    const parts = PY.split(q);
    if (!q.trim()) return `<p class="muted">Type some pinyin above.</p>`;
    const flat = q.normalize("NFC").toLowerCase().replace(/[^a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]/g, "");
    const match = WORDS.find((w) => w.py.normalize("NFC").toLowerCase().replace(/[^a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü]/g, "") === flat);
    return `${match ? `<p class="py-match">HSK ${match.lv} word: <button class="py-word inline" data-say="${esc(match.zh)}"><span class="zh" lang="zh-Hans">${esc(match.zh)}</span> <span class="en">${esc(shortEn(match.en))}</span> ${ICON_SOUND}</button></p>` : ""}
      <div class="syl-row">${parts.map((x) => {
        if (x.bad) return `<div class="syl bad"><p class="syl-big">${esc(x.bad)}</p><p class="muted small">Not a Mandarin syllable. Check the spelling.</p></div>`;
        const ini = x.ini || x.glide;
        const same = wordsWith((y) => y.base === x.base && y.tone === x.tone, 4);
        const notes = sylNotes(x);
        return `<div class="syl">
          <p class="syl-big">${esc(x.text)}</p>
          <div class="syl-parts">
            <div class="part-box" data-g="${PY.groupOfInitial(ini)}"><span class="lbl">${x.glide ? "Spelling letter" : "Initial 声母"}</span><b>${ini ? esc(ini) : "—"}</b></div>
            <span class="plus">+</span>
            <div class="part-box fin" data-g="${PY.groupOfFinal(x.fin)}"><span class="lbl">Final 韵母</span><b>${esc(finLabel(x.fin))}${x.er ? " + r" : ""}</b></div>
            <span class="plus">+</span>
            <div class="part-box tone"><span class="lbl">Tone 声调</span><b>${toneSvg(x.tone)} ${x.tone === 5 ? "neutral" : x.tone}</b></div>
          </div>
          ${notes.length ? `<ul class="syl-notes">${notes.map((n) => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}
          ${same.total ? `<div class="syl-words"><span class="lbl">HSK words with ${esc(x.text)}</span>${same.list.map((w) => `<button class="py-word mini" data-say="${esc(w.zh)}"><span class="zh" lang="zh-Hans">${esc(w.zh)}</span> <span class="py">${esc(w.py)}</span></button>`).join("")}</div>` : ""}
        </div>`;
      }).join("")}</div>`;
  }

  function soundTable(kind, groups) {
    return groups.map((g) => `
      <div class="py-group" data-g="${g.key}">
        <div class="py-group-head">
          <h3>${esc(g.name)} <span class="zh">${esc(g.zh)}</span></h3>
          <p>${esc(g.tip)}</p>
        </div>
        <div class="py-tiles">${g.items.map(([sym, ch, py, hint]) => `
          <button class="py-tile" data-kind="${kind}" data-sym="${esc(sym)}" data-group="${g.key}" data-say="${esc(ch)}" aria-label="${esc(sym)}, as in ${esc(ch)} ${esc(py)}">
            <span class="sym">${esc(sym)}</span>
            <span class="ex"><span class="zh" lang="zh-Hans">${esc(ch)}</span> ${esc(py)}</span>
            <span class="hint">${esc(hint)}</span>
          </button>`).join("")}</div>
        <div class="py-detail no-print" data-detail="${kind}-${g.key}" hidden></div>
      </div>`).join("");
  }

  function renderPinyin() {
    document.title = "Pinyin sounds — N1Mandarin";
    setActiveNav("pinyin");
    if (!PY) { main.innerHTML = `<p>Pinyin data failed to load.</p>`; return; }
    main.innerHTML = `
      <section class="page-head">
        <p class="eyebrow">Pronunciation · 拼音</p>
        <h1>Pinyin sounds <span class="zh">声母和韵母</span></h1>
        <p class="lede">Every Mandarin syllable is an initial (the consonant at the start), a final (the vowel part) and a tone. Split any pinyin into its parts, then tap a sound in the charts to hear it and see HSK words that use it.</p>
      </section>
      <section class="py-split no-print" aria-labelledby="split-h">
        <h2 id="split-h" class="py-h2">Split a syllable <span class="zh">拼音拆分</span></h2>
        <label class="search"><span class="sr">Pinyin to split</span><input type="search" data-pyq value="${esc(pyState.q)}" placeholder="Type pinyin, e.g. Zhōngguó or zhong1 guo2" /></label>
        <div class="chip-row"><span class="chip-label">Try</span>${["nǐ hǎo", "Zhōngguó", "xuéxiào", "qù", "péngyou", "zhīdào", "yīfu", "yíhuìr"].map((t) => `<button class="chip" data-try="${esc(t)}">${esc(t)}</button>`).join("")}</div>
        <p class="muted small">Tone marks or tone numbers both work (zhong1 guo2). Type v or u: for ü.</p>
        <div data-split>${splitHtml(pyState.q)}</div>
      </section>
      <section class="py-section" aria-labelledby="tones-h">
        <h2 id="tones-h" class="py-h2">The four tones <span class="zh">四声</span></h2>
        <div class="tone-cards">${PY.TONES.map((t) => `
          <button class="tone-card" data-say="${esc(t.ex[0])}">
            ${toneSvg(t.n)}
            <span class="t-name">${esc(t.name)} <span class="zh">${esc(t.zh)}</span></span>
            <span class="t-ex"><span class="zh" lang="zh-Hans">${esc(t.ex[0])}</span> ${esc(t.ex[1])}</span>
            <span class="hint">${esc(t.contour)} · ${esc(t.ex[2])}</span>
          </button>`).join("")}</div>
      </section>
      <section class="py-section" aria-labelledby="ini-h">
        <div class="py-section-head">
          <h2 id="ini-h" class="py-h2">Initials <span class="zh">声母</span></h2>
          <button class="btn small no-print" data-print>Print chart</button>
        </div>
        <p class="muted">21 initials plus y and w, grouped by where they are made in the mouth. Pairs like b/p, d/t, g/k, j/q, zh/ch and z/c differ only by a puff of air: hold a tissue in front of your mouth and it should move for the second one.</p>
        ${soundTable("ini", PY.INITIAL_GROUPS)}
      </section>
      <section class="py-section" aria-labelledby="fin-h">
        <h2 id="fin-h" class="py-h2">Finals <span class="zh">韵母</span></h2>
        <p class="muted">Finals are grouped by their first vowel. The i-, u- and ü- groups start with a quick glide before the main vowel.</p>
        ${soundTable("fin", PY.FINAL_GROUPS)}
      </section>
      <section class="py-section no-print">
        <h2 class="py-h2">Practise on paper</h2>
        <p class="muted">Print a worksheet: <a href="#/paper/initials-finals">Initials & Finals</a> · <a href="#/paper/tricky-sounds">Tricky Sounds</a> · <a href="#/paper/tones">Pinyin & Tones</a></p>
      </section>`;
    wireSpeak(main);
    const box = main.querySelector("[data-split]");
    const input = main.querySelector("[data-pyq]");
    const update = () => { pyState.q = input.value; box.innerHTML = splitHtml(pyState.q); wireSpeak(box); };
    input.addEventListener("input", update);
    main.querySelectorAll("[data-try]").forEach((b) => b.addEventListener("click", () => { input.value = b.dataset.try; update(); }));
    main.querySelector("[data-print]").addEventListener("click", () => window.print());
    main.querySelectorAll(".py-tile").forEach((b) => b.addEventListener("click", () => {
      const { kind, sym, group } = b.dataset;
      const panel = main.querySelector(`[data-detail="${kind}-${group}"]`);
      const wasOpen = b.getAttribute("aria-pressed") === "true";
      panel.parentElement.querySelectorAll(".py-tile").forEach((x) => x.setAttribute("aria-pressed", "false"));
      if (wasOpen) { panel.hidden = true; return; }
      b.setAttribute("aria-pressed", "true");
      const test = kind === "ini" ? (x) => (x.ini || x.glide) === sym : (x) => x.fin === sym;
      const g = (kind === "ini" ? PY.INITIAL_GROUPS : PY.FINAL_GROUPS).find((x) => x.key === group);
      const item = g.items.find((x) => x[0] === sym);
      panel.innerHTML = `<p class="detail-head"><b>${esc(sym)}</b> — ${esc(item[3])}. Example: <span class="zh" lang="zh-Hans">${esc(item[1])}</span> ${esc(item[2])}</p>${wordChips(wordsWith(test), test)}`;
      panel.hidden = false;
      wireSpeak(panel);
    }));
  }

  /* ---------- Router ---------- */
  function route() {
    const h = location.hash;
    if (h === "#library") {
      if (!document.getElementById("library")) renderLibrary();
      document.getElementById("library").scrollIntoView({ behavior: "smooth" });
      return;
    }
    const [path, qs] = h.split("?");
    const m = path.match(/^#\/paper\/([\w-]+)/);
    if (m) renderPaper(m[1]);
    else if (path === "#/words") renderWords();
    else if (path === "#/flashcards") renderFlashcards();
    else if (path === "#/generate") renderGenerate(qs || "");
    else if (path === "#/pinyin") renderPinyin();
    else if (path === "#/about") renderAbout();
    else renderLibrary();
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  route();
})();
