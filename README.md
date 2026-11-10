# N1Mandarin
A teaching resource designed for the Best Mandarin Class.

Printable Mandarin practice papers with built-in answer keys.

Live site: https://chanale-lab.github.io/N1Mandarin.github.io/ (after Pages is enabled)

## Papers
| # | Paper | Level | Skill |
|---|-------|-------|-------|
| 01 | Pinyin & Tones 拼音和声调 | Beginner | Pronunciation |
| 02 | Greetings & Introductions 问候和自我介绍 | HSK 1 | Vocabulary |
| 03 | Numbers, Dates & Time 数字、日期和时间 | HSK 1 | Vocabulary |
| 04 | First Characters 汉字书写 (田字格 grids) | Beginner | Writing |
| 05 | Measure Words 量词 | HSK 2 | Grammar |
| 06 | Reading: My Family 阅读：我的家 | HSK 2 | Reading |

## HSK (3.0) toolkit
Built from the New HSK 3.0 word lists compiled by MandarinBean.com: Level 1 (300 words, `hsk1.js`) and Level 2 (200 words, `hsk2.js`). Every tool has a level switch for HSK 1, HSK 2 or both.
- **Word list** (`#/words`): search by characters, pinyin (tone marks optional) or English; filter by word type; hide pinyin/meanings to self-test; listen to each word; mark words as known.
- **Flashcards** (`#/flashcards`): flip cards with audio and keyboard shortcuts, choose the front side, skip known words.
- **Paper generator** (`#/generate`): build a random printable paper (pinyin, meaning, characters, matching, 田字格 writing) with an answer key. Each paper has a code and shareable link that rebuilds the same paper.

Each paper has **Pinyin** and **Answer key** toggles and a **Print / Save PDF** button that produces a clean A4 sheet.

## Adding a paper
All content lives in `papers.js`. Copy an existing paper object, give it a unique `id`, and use section types `tone`, `match`, `fill`, `translate`, `grid` or `reading`. No build step — plain HTML, CSS and JS.
