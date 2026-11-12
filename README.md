# N1Mandarin
A free teaching and studying resource for English speakers learning Mandarin, designed for the Best Mandarin Class.

From English to Mandarin, one clear step at a time.

Live site: https://chanale-lab.github.io/N1Mandarin.github.io/

## Learning path (home page, `learn.js`)

Mandarin explained from an English speaker's point of view, with tap-to-hear audio on every Chinese example:

- **Word of the day**: a different HSK 1–2 word each day, split into initial, final and tone.
- **01 Sounds English doesn't have**: tones, x/sh, q/ch, j/zh, ü, flat vs curled tongue, aspiration (b/p) and r. Each card has a mouth tip and minimal pairs, and you can switch the speech speed.
- **02 Everyday phrase cards**: English prompt, flip for the Chinese (greetings, classroom, restaurant, shopping, travel, being polite).
- **03 Where the grammar differs**: 13 ✗/✓ cards (time and place before the verb, no 是 with adjectives, no tenses, measure words, question order, 不/没, no plurals, 的 order, answering yes, 有点儿 vs 一点儿, 是……的 emphasis, and 被 passives).
- **04 Common English-speaker mistakes**: word-for-word translations fixed, with notes.
- **05 Quick quiz**: 13 questions with explanations and a score.

Each section links to the worksheets that practise it. Edit the content in `learn.js`.

## Papers

The worksheet library is at `#/papers` (old `#library` links redirect there).

| # | Paper | Level | Skill |
|---|-------|-------|-------|
| 01 | Pinyin & Tones 拼音和声调 | Beginner | Pronunciation |
| 02 | Greetings & Introductions 问候和自我介绍 | HSK 1 | Vocabulary |
| 03 | Numbers, Dates & Time 数字、日期和时间 | HSK 1 | Vocabulary |
| 04 | First Characters 汉字书写 (田字格 grids) | Beginner | Writing |
| 05 | Measure Words 量词 | HSK 2 | Grammar |
| 06 | Reading: My Family 阅读：我的家 | HSK 2 | Reading |
| 07 | Question Words 疑问词 | HSK 1 | Grammar |
| 08 | Food & Drink 吃的和喝的 | HSK 1 | Vocabulary |
| 09 | Reading: My Day 阅读：我的一天 | HSK 1 | Reading |
| 10 | Characters: Nature & People 汉字：自然和人 | HSK 1 | Writing |
| 11 | Comparing with 比 比较句 | HSK 2 | Grammar |
| 12 | Past Actions: 了 and 过 了和过 | HSK 2 | Grammar |
| 13 | Places & Directions 地点和方向 | HSK 2 | Vocabulary |
| 14 | Reading: Weekend Shopping 阅读：周末买东西 | HSK 2 | Reading |
| 15 | Using 的 结构助词“的” | HSK 1 | Grammar |
| 16 | Three Uses of 在 “在”的用法 | HSK 1 | Grammar |
| 17 | Can: 会, 能 or 可以? | HSK 2 | Grammar |
| 18 | HSK 2 Characters 二级汉字 | HSK 2 | Writing |
| 19 | Initials & Finals 声母和韵母 | Beginner | Pronunciation |
| 20 | Tricky Sounds 易混音 | HSK 1 | Pronunciation |
| 21 | The 把 Sentence “把”字句 | HSK 3 | Grammar |
| 22 | Result Complements 结果补语 | HSK 3 | Grammar |
| 23 | Linking Ideas 关联词 | HSK 3 | Grammar |
| 24 | Reading: Being a Guest 阅读：去邻居家做客 | HSK 3 | Reading |
| 25 | Weather & Seasons 天气和季节 | HSK 3 | Vocabulary |
| 26 | HSK 3 Characters 三级汉字 | HSK 3 | Writing |
| 27 | The Passive with 被 “被”字句 | HSK 3 | Grammar |
| 28 | A Bit: 有点儿 vs 一点儿 有点儿和一点儿 | HSK 2 | Grammar |
| 29 | The 是……的 Construction “是……的”句 | HSK 2 | Grammar |

## HSK (3.0) toolkit
Built from the New HSK 3.0 word lists compiled by MandarinBean.com: Level 1 (300 words, `hsk1.js`), Level 2 (200 words, `hsk2.js`) and Level 3 (500 words, `hsk3.js`). Every tool has a level switch for HSK 1, HSK 2, HSK 3 or all three. Generator links use `L=1`, `L=2`, `L=3` or `L=123` (older `L=12` links still work).
- **Word list** (`#/words`): search by characters, pinyin (tone marks optional) or English; filter by word type; hide pinyin/meanings to self-test; listen to each word; mark words as known.
- **Flashcards** (`#/flashcards`): flip cards with audio and keyboard shortcuts, choose the front side, skip known words.
- **Pinyin sounds** (`#/pinyin`, `pinyin.js`): split any pinyin into initial + final + tone (tone marks or numbers), charts of all initials and finals grouped by mouth position with audio, the four tones, and HSK 1–3 example words for every sound. Printable chart.
- **Paper generator** (`#/generate`): build a random printable paper (pinyin, meaning, characters, matching, 田字格 writing) with an answer key. Each paper has a code and shareable link that rebuilds the same paper.

Each paper has **Pinyin** and **Answer key** toggles and a **Print / Save PDF** button that produces a clean A4 sheet.

## Adding a paper
All content lives in `papers.js`. Copy an existing paper object, give it a unique `id`, and use section types `tone`, `match`, `fill`, `translate`, `grid` or `reading`. No build step — plain HTML, CSS and JS.
