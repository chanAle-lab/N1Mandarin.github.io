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
  const WORDS = (window.HSK1 || []).map(([n, zh, py, pos, en]) => ({ n, zh, py, pos: pos || "phrase", en, group: groupOf(pos) }));
  const shortEn = (en) => en.split(";")[0].replace(/\s*\(.*?\)\s*/g, " ").trim();

  // Known words: saved where the browser allows it, otherwise kept for this visit
  const known = new Set();
  const store = {
    load() { try { JSON.parse(localStorage.getItem("n1m-known") || "[]").forEach((n) => known.add(n)); } catch (e) {} },
    save() { try { localStorage.setItem("n1m-known", JSON.stringify([...known])); } catch (e) {} }
  };
  store.load();

  /* ---------- Helpers ---------- */
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const zh = (s) => `<span class="zh" lang="zh-Hans">${esc(s)}</span>`;
  const gap = (s) => esc(s).replace(/___/g, '<span class="gap" aria-label="blank"></span>');
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
          <p class="lede">Ready-made worksheets, the full 300-word HSK 1 (3.0) list, flashcards with audio, and a generator that builds a new printable paper in one click. Every paper has an answer key and prints cleanly on A4.</p>
          <div class="hero-ctas"><a class="btn" href="#library">Browse the papers</a><a class="btn ghost" href="#/generate">Generate an HSK 1 paper</a></div>
        </div>
        <div class="hero-grid" aria-hidden="true">
          ${["学", "中", "文"].map((c) => `<span class="tzg big">${c}</span>`).join("")}
        </div>
      </section>
      <section class="toolkit" aria-labelledby="toolkit-h">
        <div class="toolkit-head">
          <h2 id="toolkit-h">HSK 1 toolkit <span class="zh">新HSK一级</span></h2>
          <p>Built from the official 300-word New HSK (3.0) Level 1 list.</p>
        </div>
        <div class="tools">
          <a class="tool" href="#/words"><span class="tool-zh zh">词</span><h3>Word list</h3><p>All 300 words with pinyin, part of speech and meaning. Search, filter, listen, and hide columns to test yourself.</p></a>
          <a class="tool" href="#/flashcards"><span class="tool-zh zh">卡</span><h3>Flashcards</h3><p>Flip through words by topic, hear each one, and sort them into "know it" and "still learning".</p></a>
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
  const ans = (a) => `<span class="answer">${esc(a)}</span>`;
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
      <ol class="items items-fill">${s.items.map((it) => `<li><span class="prompt"><span class="zh" lang="zh-Hans">${gap(it.zh)}</span> <span class="py">${gap(it.py)}</span></span>${ans(it.a)}</li>`).join("")}</ol>`,
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
      (!wl.onlyLearning || !known.has(w.n)) &&
      (!q || w.zh.includes(q) || plain(w.py).replace(/\s/g, "").includes(plain(q).replace(/\s/g, "")) || w.en.toLowerCase().includes(q));
  }

  function wordRows() {
    const list = WORDS.filter(wordMatches);
    if (!list.length) return `<tr><td colspan="6" class="empty">No words match. Try a different search or group.</td></tr>`;
    return list.map((w) => `
      <tr class="${known.has(w.n) ? "is-known" : ""}">
        <td class="num">${w.n}</td>
        <td class="w-zh"><span class="zh" lang="zh-Hans">${esc(w.zh)}</span></td>
        <td class="w-py"><span class="cover">${esc(w.py)}</span></td>
        <td class="w-pos">${esc(w.pos)}</td>
        <td class="w-en"><span class="cover">${esc(w.en)}</span></td>
        <td class="w-act no-print">${speakBtn(w.zh)}<button class="icon-btn know" data-know="${w.n}" aria-pressed="${known.has(w.n)}" title="Mark as known" aria-label="Mark ${esc(w.zh)} as known">✓</button></td>
      </tr>`).join("");
  }

  function renderWords() {
    document.title = "HSK 1 word list — N1Mandarin";
    setActiveNav("words");
    main.innerHTML = `
      <section class="page-head">
        <p class="eyebrow">New HSK 3.0 · Level 1</p>
        <h1>HSK 1 word list <span class="zh">一级词汇</span></h1>
        <p class="lede">All 300 words. Search by characters, pinyin (tone marks optional) or English. Hide the pinyin or meanings to test yourself, then click a covered cell to check it.</p>
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
      <div class="no-print">${chipRow("Type", GROUPS, wl.group, "data-group")}</div>
      <p class="count no-print" data-count></p>
      <div class="table-wrap">
        <table class="words ${wl.hidePy ? "hide-py" : ""} ${wl.hideEn ? "hide-en" : ""}">
          <thead><tr><th class="num">No.</th><th>Word</th><th>Pinyin</th><th class="w-pos">Type</th><th>Meaning</th><th class="no-print"><span class="sr">Actions</span></th></tr></thead>
          <tbody data-wrows>${wordRows()}</tbody>
        </table>
      </div>
      <p class="source">Word list: New HSK Vocabulary Level 1 (HSK 3.0), compiled by MandarinBean.com.</p>`;
    const refresh = () => { main.querySelector("[data-wrows]").innerHTML = wordRows(); wireRows(); updateCount(); };
    const updateCount = () => {
      const shown = WORDS.filter(wordMatches).length;
      main.querySelector("[data-count]").textContent = `Showing ${shown} of ${WORDS.length} words · ${known.size} marked as known`;
    };
    function wireRows() {
      wireSpeak(main.querySelector("[data-wrows]"));
      main.querySelectorAll("[data-know]").forEach((b) => b.addEventListener("click", () => {
        const n = +b.dataset.know;
        known.has(n) ? known.delete(n) : known.add(n); store.save();
        b.setAttribute("aria-pressed", known.has(n)); b.closest("tr").classList.toggle("is-known", known.has(n));
        if (wl.onlyLearning) refresh(); else updateCount();
      }));
      main.querySelectorAll(".cover").forEach((c) => c.addEventListener("click", () => c.classList.toggle("peek")));
    }
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
    let list = WORDS.filter((w) => (fc.group === "All" || w.group === fc.group) && (!fc.skipKnown || !known.has(w.n)));
    if (shuffle) list = shuffleWith(list, Math.random);
    fc.deck = list; fc.i = 0; fc.flipped = false;
  }

  function renderFlashcards() {
    document.title = "HSK 1 flashcards — N1Mandarin";
    setActiveNav("flashcards");
    if (!fc.deck.length) buildDeck(false);
    main.innerHTML = `
      <section class="page-head">
        <p class="eyebrow">New HSK 3.0 · Level 1</p>
        <h1>Flashcards <span class="zh">识字卡</span></h1>
        <p class="lede">Tap the card or press Space to flip. Use the arrow keys to move, K for "know it" and L for "still learning".</p>
      </section>
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
      stage.querySelector("[data-reset-known]").addEventListener("click", () => { known.clear(); store.save(); buildDeck(false); drawCard(); });
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
      <span class="fc-pos">${esc(w.pos)} · No. ${w.n}</span>`;
    const done = fc.deck.filter((x) => known.has(x.n)).length;
    stage.innerHTML = `
      <div class="fc-progress"><span>Card ${fc.i + 1} of ${fc.deck.length}</span><span>${done} known in this set</span></div>
      <div class="fc-bar"><span style="width:${((fc.i + 1) / fc.deck.length) * 100}%"></span></div>
      <button class="fc-card ${fc.flipped ? "flipped" : ""} ${known.has(w.n) ? "is-known" : ""}" data-flip aria-label="Flashcard. Activate to flip.">
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
    isKnown ? known.add(w.n) : known.delete(w.n); store.save();
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
    if (!gen.code) gen.code = 1000 + Math.floor(Math.random() * 9000);
  }
  function genHash() {
    const s = gen.secs.map((k) => ({ py: "p", en: "e", zh: "z", match: "m", grid: "g" }[k])).join("");
    return `#/generate?code=${gen.code}&n=${gen.n}&s=${s}&g=${encodeURIComponent(gen.group)}`;
  }

  function buildGenerated() {
    const rand = rng(gen.code * 7919 + gen.n);
    let pool = WORDS.filter((w) => gen.group === "All" || w.group === gen.group);
    if (gen.learning) pool = pool.filter((w) => !known.has(w.n));
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
      id: "gen" + gen.code, title: "HSK 1 Vocabulary Practice", zh: "一级词汇练习",
      eyebrow: `HSK 1 (3.0) · Paper code ${gen.code}${gen.group !== "All" ? " · " + esc(gen.group) : ""}`,
      sections
    };
  }

  function renderGenerate(qs) {
    document.title = "HSK 1 paper generator — N1Mandarin";
    setActiveNav("generate");
    readGenParams(qs);
    const p = buildGenerated();
    main.innerHTML = `
      <section class="page-head no-print">
        <p class="eyebrow">New HSK 3.0 · Level 1</p>
        <h1>Paper generator <span class="zh">出卷</span></h1>
        <p class="lede">Choose what goes on the paper, then print. The paper code rebuilds exactly the same paper, so you can reprint it or share the link with another teacher.</p>
      </section>
      <form class="gen-panel no-print" data-gen>
        <fieldset><legend>Sections</legend>
          ${Object.entries(SECTION_TYPES).map(([k, v]) => `<label class="check"><input type="checkbox" name="sec" value="${k}" ${gen.secs.includes(k) ? "checked" : ""}/> <span><b>${v.label}</b><small>${v.hint}</small></span></label>`).join("")}
        </fieldset>
        <fieldset><legend>Words</legend>
          <label class="field"><span>Word type</span><select name="group">${GROUPS.map((g) => `<option ${g === gen.group ? "selected" : ""}>${g}</option>`).join("")}</select></label>
          <label class="field"><span>Questions per section</span><input type="number" name="n" min="4" max="20" value="${gen.n}"/></label>
          <label class="check"><input type="checkbox" name="learning" ${gen.learning ? "checked" : ""}/> <span><b>Only words I'm still learning</b><small>${300 - known.size} words not yet marked as known</small></span></label>
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
      <h2>HSK 1 word list and flashcards</h2>
      <p>The <a href="#/words">word list</a> has all 300 New HSK 3.0 Level 1 words. Hide pinyin or meanings to quiz yourself, press the speaker to hear a word, and tick words you know. <a href="#/flashcards">Flashcards</a> use the same "known" ticks, so you can focus on the words you're still learning.</p>
      <h2>Generating papers</h2>
      <p>The <a href="#/generate">generator</a> picks words at random from the HSK 1 list. Every paper has a code: type the same code with the same settings to rebuild the identical paper, or copy the page link to share it.</p>
      <h2>Adding worksheets</h2>
      <p>Worksheet content lives in <code>papers.js</code> and the vocabulary in <code>hsk1.js</code>. Copy an existing paper object, give it a new <code>id</code>, and use the section types <code>tone</code>, <code>match</code>, <code>fill</code>, <code>translate</code>, <code>grid</code> or <code>reading</code>.</p>
      <p><a class="btn" href="#/">Go to the library</a></p>
    </section>`;
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
    else if (path === "#/about") renderAbout();
    else renderLibrary();
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", route);
  route();
})();
