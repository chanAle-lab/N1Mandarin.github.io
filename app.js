(function () {
  const main = document.getElementById("main");
  const papers = window.PAPERS || [];
  const state = { level: "All", skill: "All", q: "", answers: false, pinyin: true };
  const LETTERS = "ABCDEFGHIJKLMNOP";

  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const zh = (s) => `<span class="zh" lang="zh-Hans">${esc(s)}</span>`;
  const gap = (s) => esc(s).replace(/___/g, '<span class="gap" aria-label="blank"></span>');

  // Deterministic shuffle so a printed paper always matches its answer key
  function shuffled(arr, seed) {
    const out = arr.slice();
    let s = 0;
    for (const ch of seed) s = (s * 31 + ch.charCodeAt(0)) >>> 0;
    for (let i = out.length - 1; i > 0; i--) {
      s = (s * 1103515245 + 12345) >>> 0;
      const j = s % (i + 1);
      [out[i], out[j]] = [out[j], out[i]];
    }
    return out;
  }

  /* ---------- Library ---------- */
  function uniq(key) { return ["All", ...new Set(papers.map((p) => p[key]))]; }

  function chips(key, label) {
    return `<div class="chip-row" role="group" aria-label="${label}">
      <span class="chip-label">${label}</span>
      ${uniq(key).map((v) => `<button class="chip" data-key="${key}" data-val="${esc(v)}" aria-pressed="${state[key] === v}">${esc(v)}</button>`).join("")}
    </div>`;
  }

  function filtered() {
    const q = state.q.trim().toLowerCase();
    return papers.filter((p) =>
      (state.level === "All" || p.level === state.level) &&
      (state.skill === "All" || p.skill === state.skill) &&
      (!q || [p.title, p.zh, p.summary, p.skill, p.level].join(" ").toLowerCase().includes(q))
    );
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
    main.innerHTML = `
      <section class="hero">
        <div class="hero-text">
          <p class="eyebrow">The Best Mandarin Class · 练习纸</p>
          <h1>Practice papers you can print, mark and reuse.</h1>
          <p class="lede">Six ready-made worksheets covering tones, greetings, numbers, character writing, measure words and reading. Each one has a built-in answer key and prints cleanly on A4.</p>
          <a class="btn" href="#library">Browse the papers</a>
        </div>
        <div class="hero-grid" aria-hidden="true">
          ${["学", "中", "文"].map((c) => `<span class="tzg big">${c}</span>`).join("")}
        </div>
      </section>
      <section id="library" class="library">
        <div class="library-head">
          <h2>Library</h2>
          <label class="search"><span class="sr">Search papers</span>
            <input type="search" placeholder="Search papers…" value="${esc(state.q)}" data-search /></label>
        </div>
        ${chips("level", "Level")}
        ${chips("skill", "Skill")}
        <div class="cards" data-cards>${cards()}</div>
      </section>`;
    main.querySelectorAll(".chip").forEach((b) => b.addEventListener("click", () => {
      state[b.dataset.key] = b.dataset.val;
      main.querySelectorAll(`.chip[data-key="${b.dataset.key}"]`).forEach((x) => x.setAttribute("aria-pressed", x === b));
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

  /* ---------- Paper sections ---------- */
  const ans = (a) => `<span class="answer">${esc(a)}</span>`;
  const line = `<span class="write-line"></span>`;

  const sectionRenderers = {
    tone: (s) => `<ol class="items two-col">${s.items.map((it) => `<li><span class="prompt mono">${esc(it.q)}</span>${line}${ans(it.a)}</li>`).join("")}</ol>`,

    translate: (s) => `<ol class="items">${s.items.map((it) => `<li><span class="prompt">${/[\u4e00-\u9fff]/.test(it.q) ? zh(it.q) : esc(it.q)}</span>${line}${ans(it.a)}</li>`).join("")}</ol>`,

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
        <div class="grid-info"><span class="zh">${esc(it.zh)}</span><span class="py">${esc(it.py)}</span><span class="en">${esc(it.en)} · ${it.strokes} strokes</span></div>
        <div class="grid-boxes">
          <span class="tzg ink">${esc(it.zh)}</span>
          <span class="tzg trace">${esc(it.zh)}</span>
          <span class="tzg trace">${esc(it.zh)}</span>
          ${'<span class="tzg"></span>'.repeat(5)}
        </div>
      </div>`).join("")}</div>`,

    reading: (s) => `<div class="passage">
        <p class="zh passage-zh" lang="zh-Hans">${esc(s.passage)}</p>
        ${s.pinyin ? `<p class="py passage-py">${esc(s.pinyin)}</p>` : ""}
      </div>
      <ol class="items items-reading">${s.items.map((it) => `<li><span class="prompt">${zh(it.q)}</span>${line}${ans(it.a)}</li>`).join("")}</ol>`
  };

  function renderPaper(id) {
    const p = papers.find((x) => x.id === id);
    if (!p) { main.innerHTML = `<section class="narrow"><h1>Paper not found</h1><p><a href="#/">Back to the library</a></p></section>`; return; }
    document.title = `${p.title} — N1Mandarin`;
    const idx = papers.indexOf(p);
    const next = papers[(idx + 1) % papers.length];
    main.innerHTML = `
      <div class="toolbar no-print">
        <a href="#/" class="back">← Library</a>
        <div class="toggles">
          <label class="switch"><input type="checkbox" data-t="pinyin" ${state.pinyin ? "checked" : ""}/> <span>Pinyin</span></label>
          <label class="switch"><input type="checkbox" data-t="answers" ${state.answers ? "checked" : ""}/> <span>Answer key</span></label>
          <button class="btn small" data-print>Print / Save PDF</button>
        </div>
      </div>
      <article class="sheet ${state.answers ? "show-answers" : ""} ${state.pinyin ? "" : "hide-pinyin"}">
        <header class="sheet-head">
          <div>
            <p class="eyebrow">Paper ${p.no} · ${esc(p.level)} · ${esc(p.skill)} · ${p.minutes} min</p>
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
      </article>
      <nav class="next no-print"><a href="#/paper/${next.id}">Next paper: ${esc(next.title)} →</a></nav>`;
    main.querySelectorAll("[data-t]").forEach((c) => c.addEventListener("change", () => {
      state[c.dataset.t] = c.checked;
      const sheet = main.querySelector(".sheet");
      sheet.classList.toggle("show-answers", state.answers);
      sheet.classList.toggle("hide-pinyin", !state.pinyin);
    }));
    main.querySelector("[data-print]").addEventListener("click", () => window.print());
  }

  function renderAbout() {
    document.title = "How to use — N1Mandarin";
    main.innerHTML = `<section class="narrow about">
      <h1>How to use these papers</h1>
      <h2>In class</h2>
      <p>Open a paper, switch off <b>Pinyin</b> for stronger students, and choose <b>Print / Save PDF</b>. The site header, toolbar and buttons are hidden when printing, so you get a clean A4 worksheet with a name, date and score box.</p>
      <h2>Marking</h2>
      <p>Switch on <b>Answer key</b> and print a second copy for yourself, or show it on the board after students finish. Matching letters are fixed, so the student sheet and the key always line up.</p>
      <h2>Self-study</h2>
      <p>Write answers on paper, then toggle the answer key on screen to check your work.</p>
      <h2>Adding new papers</h2>
      <p>All content lives in <code>papers.js</code>. Copy an existing paper object, give it a new <code>id</code>, and use one of the section types: <code>tone</code>, <code>match</code>, <code>fill</code>, <code>translate</code>, <code>grid</code> or <code>reading</code>.</p>
      <p><a class="btn" href="#/">Go to the library</a></p>
    </section>`;
  }

  function route() {
    const h = location.hash;
    if (h === "#library") { // in-page anchor
      if (!document.getElementById("library")) renderLibrary();
      document.getElementById("library").scrollIntoView({ behavior: "smooth" });
      return;
    }
    const m = h.match(/^#\/paper\/([\w-]+)/);
    if (m) renderPaper(m[1]);
    else if (h === "#/about") renderAbout();
    else renderLibrary();
    window.scrollTo(0, 0);
  }

  window.addEventListener("hashchange", route);
  route();
})();
