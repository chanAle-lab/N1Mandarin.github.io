/* N1Mandarin — pinyin data and syllable splitter.
   Initials (声母) and finals (韵母) are grouped by where they are made in the mouth.
   Each sound has a sample character so the browser voice can say it. */
(function () {
  const INITIAL_GROUPS = [
    { key: "lips", name: "Lips", zh: "唇音", tip: "Made with the lips. b is a soft p (no puff of air); p has a strong puff.",
      items: [["b", "波", "bō", "like the p in spin"], ["p", "坡", "pō", "p with a puff of air"], ["m", "摸", "mō", "as in mum"], ["f", "佛", "fó", "as in fun"]] },
    { key: "tip", name: "Tongue tip", zh: "舌尖中音", tip: "Tongue tip touches the ridge behind the top teeth. d is unaspirated, t has a puff.",
      items: [["d", "得", "dé", "like the t in stop"], ["t", "特", "tè", "t with a puff of air"], ["n", "讷", "nè", "as in no"], ["l", "勒", "lè", "as in love"]] },
    { key: "back", name: "Back of tongue", zh: "舌根音", tip: "Back of the tongue rises to the soft palate. h is rougher than English h, close to the ch in loch.",
      items: [["g", "哥", "gē", "like the k in skin"], ["k", "科", "kē", "k with a puff of air"], ["h", "喝", "hē", "like the ch in loch, but softer"]] },
    { key: "flat-front", name: "Tongue surface", zh: "舌面音", tip: "Tongue tip rests behind the bottom teeth, with a smile. Only ever followed by i or ü.",
      items: [["j", "鸡", "jī", "like the j in jeep, tongue flat"], ["q", "七", "qī", "like the ch in cheap, with a puff"], ["x", "西", "xī", "between s and sh, smiling"]] },
    { key: "curled", name: "Curled tongue", zh: "翘舌音", tip: "Curl the tongue tip back towards the roof of the mouth. zhi, chi, shi and ri end in a buzzing 'r'-like vowel.",
      items: [["zh", "知", "zhī", "like the j in jug, tongue curled"], ["ch", "吃", "chī", "like the ch in church, curled, with a puff"], ["sh", "诗", "shī", "like the sh in shirt, curled"], ["r", "日", "rì", "between the s in measure and r"]] },
    { key: "flat", name: "Flat tongue", zh: "平舌音", tip: "Tongue tip flat behind the top teeth. zi, ci and si end in a buzzing 'z' vowel, not 'ee'.",
      items: [["z", "资", "zī", "like the ds in kids"], ["c", "次", "cì", "like the ts in cats, with a puff"], ["s", "思", "sī", "as in sun"]] },
    { key: "glide", name: "Spelling letters", zh: "y 和 w", tip: "y and w aren't true initials. They replace i, u and ü at the start of a syllable: i → yi, u → wu, ü → yu.",
      items: [["y", "衣", "yī", "as in yes"], ["w", "乌", "wū", "as in wood"]] }
  ];

  const FINAL_GROUPS = [
    { key: "simple", name: "Simple vowels", zh: "单韵母", tip: "Hold one mouth shape for the whole sound. For ü, say 'ee' and round your lips.",
      items: [["a", "啊", "ā", "as in father"], ["o", "喔", "ō", "as in more, lips round"], ["e", "鹅", "é", "like the u in duh, from the throat"], ["i", "衣", "yī", "as in see"], ["u", "乌", "wū", "as in moon"], ["ü", "鱼", "yú", "say 'ee' with rounded lips"], ["er", "二", "èr", "like the ar in American 'are'"]] },
    { key: "compound", name: "Compound vowels", zh: "复韵母", tip: "Glide smoothly from the first vowel to the second.",
      items: [["ai", "爱", "ài", "as in eye"], ["ei", "杯", "bēi", "as in day"], ["ao", "奥", "ào", "as in how"], ["ou", "欧", "ōu", "as in go"]] },
    { key: "nasal", name: "Nasal finals", zh: "鼻韵母", tip: "-n ends with the tongue on the ridge behind the teeth. -ng ends at the back, mouth open (as in sing).",
      items: [["an", "安", "ān", "as in fun, but with an 'a'"], ["en", "恩", "ēn", "like the un in taken"], ["ang", "昂", "áng", "like the ong in song, mouth open"], ["eng", "灯", "dēng", "like the ung in lung"], ["ong", "东", "dōng", "like the oo in book + ng"]] },
    { key: "i", name: "i- finals", zh: "齐齿呼", tip: "Start with a quick 'ee'. Written with y when there is no initial: ia → ya, iou → you.",
      items: [["ia", "呀", "yā", "ya"], ["ie", "耶", "yē", "as in yes"], ["iao", "要", "yào", "as in yowl"], ["iu", "有", "yǒu", "as in yo-yo (iou)"], ["ian", "烟", "yān", "like yen"], ["in", "因", "yīn", "as in in"], ["iang", "羊", "yáng", "ee + ang"], ["ing", "英", "yīng", "as in sing"], ["iong", "用", "yòng", "ee + ong"]] },
    { key: "u", name: "u- finals", zh: "合口呼", tip: "Start with a quick 'oo'. Written with w when there is no initial: ua → wa, uei → wei.",
      items: [["ua", "蛙", "wā", "as in wah"], ["uo", "我", "wǒ", "as in war"], ["uai", "外", "wài", "as in why"], ["ui", "喂", "wèi", "as in way (uei)"], ["uan", "晚", "wǎn", "as in wan"], ["un", "问", "wèn", "like one (uen)"], ["uang", "王", "wáng", "oo + ang"], ["ueng", "翁", "wēng", "oo + eng"]] },
    { key: "u2", name: "ü- finals", zh: "撮口呼", tip: "Start with ü (rounded 'ee'). After j, q, x and y the dots are dropped: ju, que, xuan, yun.",
      items: [["üe", "月", "yuè", "ü + e, as in yuè"], ["üan", "远", "yuǎn", "ü + an"], ["ün", "云", "yún", "ü + n"]] }
  ];

  const TONES = [
    { n: 1, name: "1st tone", zh: "阴平", mark: "ā", contour: "high and level", ex: ["妈", "mā", "mum"] },
    { n: 2, name: "2nd tone", zh: "阳平", mark: "á", contour: "rising, like a question", ex: ["麻", "má", "hemp"] },
    { n: 3, name: "3rd tone", zh: "上声", mark: "ǎ", contour: "low dip, then rise", ex: ["马", "mǎ", "horse"] },
    { n: 4, name: "4th tone", zh: "去声", mark: "à", contour: "sharp fall", ex: ["骂", "mà", "to scold"] },
    { n: 5, name: "Neutral", zh: "轻声", mark: "a", contour: "short and light", ex: ["吗", "ma", "question particle"] }
  ];

  /* Valid syllables: final → initials it can follow ("" = no initial). */
  const ALL = "b p m f d t n l g k h zh ch sh r z c s".split(" ");
  const ok = (s) => s.split(" ");
  const TABLE = {
    a: ["", ...ok("b p m f d t n l g k h zh ch sh z c s")], o: ok(" b p m f"), e: ["", ...ok("m d t n l g k h zh ch sh r z c s")],
    ai: ["", ...ok("b p m d t n l g k h zh ch sh z c s")], ei: ["", ...ok("b p m f d n l g k h sh z")],
    ao: ["", ...ok("b p m d t n l g k h zh ch sh r z c s")], ou: ["", ...ok("p m f d t n l g k h zh ch sh r z c s")],
    an: ["", ...ALL], en: ["", ...ok("b p m f d n g k h zh ch sh r z c s")], ang: ["", ...ALL], eng: ALL,
    ong: ok("d t n l g k h zh ch r z c s"), er: [""],
    i: ok("b p m d t n l j q x y"), "-i": ok("zh ch sh r z c s"),
    ia: ok("d l j q x y"), ie: ok("b p m d t n l j q x y"), iao: ok("b p m d t n l j q x y"), iu: ok("m d n l j q x y"),
    ian: ok("b p m d t n l j q x y"), in: ok("b p m n l j q x y"), iang: ok("n l j q x y"), ing: ok("b p m d t n l j q x y"), iong: ok("j q x y"),
    u: ok("b p m f d t n l g k h zh ch sh r z c s w"), ua: ok("g k h zh ch sh w"), uo: ok("d t n l g k h zh ch sh r z c s w"),
    uai: ok("g k h zh ch sh w"), ui: ok("d t g k h zh ch sh r z c s w"), uan: ok("d t n l g k h zh ch sh r z c s w"),
    un: ok("d t l g k h zh ch sh r z c s w"), uang: ok("g k h zh ch sh w"), ueng: ["w"],
    "ü": ok("n l j q x y"), "üe": ok("n l j q x y"), "üan": ok("j q x y"), "ün": ok("j q x y")
  };
  // How each final is spelled after each initial
  function spell(ini, fin) {
    const jqxy = /^[jqxy]$/.test(ini);
    if (ini === "y") {
      const m = { i: "yi", ia: "ya", ie: "ye", iao: "yao", iu: "you", ian: "yan", in: "yin", iang: "yang", ing: "ying", iong: "yong", "ü": "yu", "üe": "yue", "üan": "yuan", "ün": "yun" };
      return m[fin];
    }
    if (ini === "w") {
      const m = { u: "wu", ua: "wa", uo: "wo", uai: "wai", ui: "wei", uan: "wan", un: "wen", uang: "wang", ueng: "weng" };
      return m[fin];
    }
    if (fin === "-i") return ini + "i";
    let f = fin;
    if (jqxy) f = f.replace("ü", "u");
    return ini + f;
  }
  const SYL = new Map(); // spelling (ü written as v) → { ini, fin }
  Object.entries(TABLE).forEach(([fin, inis]) => inis.forEach((ini) => {
    const s = spell(ini, fin);
    if (s) SYL.set(s.replace(/ü/g, "v"), { ini: ini === "y" || ini === "w" ? "" : ini, glide: ini === "y" || ini === "w" ? ini : "", fin });
  }));
  SYL.set("yo", { ini: "", glide: "y", fin: "io" });
  SYL.set("o", { ini: "", glide: "", fin: "o" });

  const MARKS = { "ā": "a1", "á": "a2", "ǎ": "a3", "à": "a4", "ē": "e1", "é": "e2", "ě": "e3", "è": "e4", "ī": "i1", "í": "i2", "ǐ": "i3", "ì": "i4",
    "ō": "o1", "ó": "o2", "ǒ": "o3", "ò": "o4", "ū": "u1", "ú": "u2", "ǔ": "u3", "ù": "u4", "ǖ": "v1", "ǘ": "v2", "ǚ": "v3", "ǜ": "v4", "ü": "v0" };

  /* Turn "Zhōngguó", "zhong1 guo2" or "ni hao" into syllables. */
  function split(text) {
    const out = [];
    const chunks = String(text).normalize("NFC").toLowerCase().replace(/u:/g, "v").replace(/([1-5])/g, "$1 ").split(/[^a-zāáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜü1-5]+/).filter(Boolean);
    for (const chunk of chunks) {
      // Strip marks but remember which plain letter index carries each tone
      let plain = "", toneAt = [];
      for (const ch of chunk) {
        if (MARKS[ch]) { plain += MARKS[ch][0]; toneAt[plain.length - 1] = +MARKS[ch][1] || 0; }
        else if (/[1-5]/.test(ch)) { toneAt[plain.length - 1] = toneAt[plain.length - 1] || -(+ch); }
        else plain += ch;
      }
      // Longest-first segmentation with backtracking
      // Longest-first segmentation with backtracking; erhua (-r) is only tried if the plain parse fails
      const tryParse = (allowR) => {
        const memo = {};
        const seg = (i) => {
          if (i === plain.length) return [];
          if (i in memo) return memo[i];
          for (let len = Math.min(7, plain.length - i); len > 0; len--) {
            const s = plain.slice(i, i + len);
            const isR = allowR && len > 1 && s.endsWith("r") && SYL.has(s.slice(0, -1));
            if (!SYL.has(s) && !isR) continue;
            let marks = 0; for (let k = i; k < i + len; k++) if (toneAt[k] > 0) marks++;
            if (marks > 1) continue; // one tone mark per syllable
            const rest = seg(i + len);
            if (rest) return (memo[i] = [[i, len, !SYL.has(s)], ...rest]);
          }
          return (memo[i] = null);
        };
        return seg(0);
      };
      const parts = tryParse(false) || tryParse(true);
      if (!parts) { out.push({ bad: chunk }); continue; }
      parts.forEach(([i, len, er]) => {
        let tone = 5;
        for (let k = i; k < i + len; k++) if (toneAt[k] > 0) tone = toneAt[k];
        // tone numbers are written after the syllable
        const num = toneAt[i + len - 1];
        if (num < 0) tone = -num === 5 ? 5 : -num;
        const base = plain.slice(i, i + len - (er ? 1 : 0));
        out.push({ base, tone, er, ...SYL.get(base), text: mark(base, tone) + (er ? "r" : "") });
      });
    }
    return out;
  }

  // Put the tone mark on the right vowel: a/e first, o in "ou", otherwise the last vowel
  const TM = { a: "āáǎà", e: "ēéěè", i: "īíǐì", o: "ōóǒò", u: "ūúǔù", v: "ǖǘǚǜ" };
  function mark(base, tone) {
    const b = base;
    let idx = b.search(/[ae]/);
    if (idx < 0) idx = b.indexOf("ou");
    if (idx < 0) { for (let k = b.length - 1; k >= 0; k--) if ("iouv".includes(b[k])) { idx = k; break; } }
    if (tone < 1 || tone > 4 || idx < 0) return b.replace(/v/g, "ü");
    return (b.slice(0, idx) + TM[b[idx]][tone - 1] + b.slice(idx + 1)).replace(/v/g, "ü");
  }

  function groupOfInitial(ini) { const g = INITIAL_GROUPS.find((g) => g.items.some((x) => x[0] === ini)); return g ? g.key : ""; }
  function groupOfFinal(fin) {
    if (fin === "-i" || fin === "io") return "simple";
    const g = FINAL_GROUPS.find((g) => g.items.some((x) => x[0] === fin)); return g ? g.key : "";
  }

  window.PINYIN = { INITIAL_GROUPS, FINAL_GROUPS, TONES, split, mark, groupOfInitial, groupOfFinal };
})();
