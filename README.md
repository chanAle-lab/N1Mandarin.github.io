# N1Mandarin
A teaching resource designed for the Best Mandarin Class.

Printable Mandarin practice papers with built-in answer keys.

Live site: https://chanale-lab.github.io/N1Mandarin.github.io-/

## Papers
| # | Paper | Level | Skill |
|---|-------|-------|-------|
| 01 | Pinyin & Tones 拼音和声调 | Beginner | Pronunciation |
| 02 | Greetings & Introductions 问候和自我介绍 | HSK 1 | Vocabulary |
| 03 | Numbers, Dates & Time 数字、日期和时间 | HSK 1 | Vocabulary |
| 04 | First Characters 汉字书写 (田字格 grids) | Beginner | Writing |
| 05 | Measure Words 量词 | HSK 2 | Grammar |
| 06 | Reading: My Family 阅读：我的家 | HSK 2 | Reading |

Each paper has **Pinyin** and **Answer key** toggles and a **Print / Save PDF** button that produces a clean A4 sheet.

## Adding a paper
All content lives in `papers.js`. Copy an existing paper object, give it a unique `id`, and use section types `tone`, `match`, `fill`, `translate`, `grid` or `reading`. No build step — plain HTML, CSS and JS.
