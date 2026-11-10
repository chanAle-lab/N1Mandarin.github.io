# N1Mandarin
A teaching resource designed for the Best Mandarin Class.

Printable Mandarin practice papers with built-in answer keys.

Live site: https://chanale-lab.github.io/N1Mandarin.github.io/

## Papers
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

## HSK (3.0) toolkit
Built from the New HSK 3.0 word lists compiled by MandarinBean.com: Level 1 (300 words, `hsk1.js`), Level 2 (200 words, `hsk2.js`) and Level 3 (500 words, `hsk3.js`). Every tool has a level switch for HSK 1, HSK 2, HSK 3 or all three. Generator links use `L=1`, `L=2`, `L=3` or `L=123` (older `L=12` links still work).
- **Word list** (`#/words`): search by characters, pinyin (tone marks optional) or English; filter by word type; hide pinyin/meanings to self-test; listen to each word; mark words as known.
- **Flashcards** (`#/flashcards`): flip cards with audio and keyboard shortcuts, choose the front side, skip known words.
- **Pinyin sounds** (`#/pinyin`, `pinyin.js`): split any pinyin into initial + final + tone (tone marks or numbers), charts of all initials and finals grouped by mouth position with audio, the four tones, and HSK 1–3 example words for every sound. Printable chart.
- **Paper generator** (`#/generate`): build a random printable paper (pinyin, meaning, characters, matching, 田字格 writing) with an answer key. Each paper has a code and shareable link that rebuilds the same paper.

Each paper has **Pinyin** and **Answer key** toggles and a **Print / Save PDF** button that produces a clean A4 sheet.

## Adding a paper
All content lives in `papers.js`. Copy an existing paper object, give it a unique `id`, and use section types `tone`, `match`, `fill`, `translate`, `grid` or `reading`. No build step — plain HTML, CSS and JS.
