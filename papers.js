/* N1Mandarin — paper library data.
   Section types: tone, match, fill, translate, grid, reading
   Add a new paper by appending an object to PAPERS. */
window.PAPERS = [
  {
    id: "tones",
    no: "01",
    title: "Pinyin & Tones",
    zh: "拼音和声调",
    level: "Beginner",
    skill: "Pronunciation",
    minutes: 15,
    summary: "Turn tone numbers into tone marks, then apply the 你好, 不 and 一 sandhi rules.",
    sections: [
      {
        type: "tone",
        title: "Add the tone marks",
        instructions: "Rewrite each word in pinyin with the correct tone marks.",
        items: [
          { q: "ma1", a: "mā" },
          { q: "ma3", a: "mǎ" },
          { q: "lao3 shi1", a: "lǎoshī" },
          { q: "xie4 xie", a: "xièxie" },
          { q: "zai4 jian4", a: "zàijiàn" },
          { q: "peng2 you", a: "péngyou" },
          { q: "Zhong1 guo2", a: "Zhōngguó" },
          { q: "Ying1 guo2", a: "Yīngguó" }
        ]
      },
      {
        type: "tone",
        title: "Tone changes (sandhi)",
        instructions: "Write how each phrase is actually pronounced in speech.",
        items: [
          { q: "你好 nǐ + hǎo", a: "ní hǎo (3rd + 3rd → 2nd + 3rd)" },
          { q: "很好 hěn + hǎo", a: "hén hǎo" },
          { q: "不是 bù + shì", a: "bú shì (不 before 4th → 2nd)" },
          { q: "不好 bù + hǎo", a: "bù hǎo (no change)" },
          { q: "一个 yī + gè", a: "yí gè (一 before 4th → 2nd)" },
          { q: "一天 yī + tiān", a: "yì tiān (一 before 1st/2nd/3rd → 4th)" }
        ]
      }
    ]
  },
  {
    id: "greetings",
    no: "02",
    title: "Greetings & Introductions",
    zh: "问候和自我介绍",
    level: "HSK 1",
    skill: "Vocabulary",
    minutes: 20,
    summary: "Match everyday phrases, complete short dialogues and translate a self-introduction.",
    sections: [
      {
        type: "match",
        title: "Match the phrase to its meaning",
        instructions: "Write the letter of the correct English meaning next to each phrase.",
        items: [
          { zh: "你好", py: "nǐ hǎo", a: "Hello" },
          { zh: "谢谢", py: "xièxie", a: "Thank you" },
          { zh: "不客气", py: "bú kèqi", a: "You're welcome" },
          { zh: "对不起", py: "duìbuqǐ", a: "Sorry" },
          { zh: "没关系", py: "méi guānxi", a: "It doesn't matter" },
          { zh: "再见", py: "zàijiàn", a: "Goodbye" },
          { zh: "早上好", py: "zǎoshang hǎo", a: "Good morning" },
          { zh: "认识你很高兴", py: "rènshi nǐ hěn gāoxìng", a: "Nice to meet you" }
        ]
      },
      {
        type: "fill",
        title: "Complete the sentences",
        instructions: "Fill each gap with one word from the box.",
        bank: ["叫", "是", "国", "不", "也"],
        items: [
          { zh: "你___什么名字？", py: "Nǐ ___ shénme míngzi?", a: "叫" },
          { zh: "我___英国人。", py: "Wǒ ___ Yīngguó rén.", a: "是" },
          { zh: "你是哪___人？", py: "Nǐ shì nǎ ___ rén?", a: "国" },
          { zh: "我___是老师，我是学生。", py: "Wǒ ___ shì lǎoshī, wǒ shì xuésheng.", a: "不" },
          { zh: "我是学生，他___是学生。", py: "Wǒ shì xuésheng, tā ___ shì xuésheng.", a: "也" }
        ]
      },
      {
        type: "translate",
        title: "Translate into Chinese",
        instructions: "Write your answer in characters. Add pinyin if you are not sure of a character.",
        items: [
          { q: "What is your name?", a: "你叫什么名字？" },
          { q: "My name is Wang Fang.", a: "我叫王芳。" },
          { q: "I am British.", a: "我是英国人。" },
          { q: "Nice to meet you.", a: "认识你很高兴。" }
        ]
      }
    ]
  },
  {
    id: "numbers",
    no: "03",
    title: "Numbers, Dates & Time",
    zh: "数字、日期和时间",
    level: "HSK 1",
    skill: "Vocabulary",
    minutes: 20,
    summary: "Write numbers in characters, read dates and tell the time with 点, 半 and 刻.",
    sections: [
      {
        type: "translate",
        title: "Write the numbers in characters",
        instructions: "Example: 12 → 十二",
        items: [
          { q: "15", a: "十五" },
          { q: "28", a: "二十八" },
          { q: "99", a: "九十九" },
          { q: "100", a: "一百" },
          { q: "the year 2026", a: "二零二六年" }
        ]
      },
      {
        type: "translate",
        title: "Dates",
        instructions: "Write each date in Chinese. Order: month → day → weekday.",
        items: [
          { q: "Tuesday 10 November", a: "十一月十号，星期二" },
          { q: "Sunday 1 March", a: "三月一号，星期天" },
          { q: "Friday 25 December", a: "十二月二十五号，星期五" }
        ]
      },
      {
        type: "translate",
        title: "What time is it?",
        instructions: "Write the time in Chinese characters.",
        items: [
          { q: "3:00", a: "三点" },
          { q: "3:30", a: "三点半" },
          { q: "8:15", a: "八点一刻 / 八点十五分" },
          { q: "2:00", a: "两点 (not 二点)" },
          { q: "11:45", a: "十一点三刻 / 十一点四十五分" }
        ]
      }
    ]
  },
  {
    id: "characters",
    no: "04",
    title: "First Characters",
    zh: "汉字书写",
    level: "Beginner",
    skill: "Writing",
    minutes: 25,
    summary: "Trace and copy ten core characters in 田字格 grids, with stroke counts and meanings.",
    sections: [
      {
        type: "grid",
        title: "Trace, then write",
        instructions: "Trace the grey characters, then write the character on your own in the empty boxes. Watch the stroke order.",
        items: [
          { zh: "人", py: "rén", en: "person", strokes: 2 },
          { zh: "口", py: "kǒu", en: "mouth", strokes: 3 },
          { zh: "大", py: "dà", en: "big", strokes: 3 },
          { zh: "小", py: "xiǎo", en: "small", strokes: 3 },
          { zh: "中", py: "zhōng", en: "middle", strokes: 4 },
          { zh: "好", py: "hǎo", en: "good", strokes: 6 },
          { zh: "你", py: "nǐ", en: "you", strokes: 7 },
          { zh: "我", py: "wǒ", en: "I, me", strokes: 7 },
          { zh: "学", py: "xué", en: "to study", strokes: 8 },
          { zh: "国", py: "guó", en: "country", strokes: 8 }
        ]
      }
    ]
  },
  {
    id: "measure-words",
    no: "05",
    title: "Measure Words",
    zh: "量词",
    level: "HSK 2",
    skill: "Grammar",
    minutes: 15,
    summary: "Choose the right measure word for people, books, animals, cups, paper, vehicles and clothes.",
    sections: [
      {
        type: "fill",
        title: "Choose the measure word",
        instructions: "Fill each gap with a measure word from the box. Each word is used once.",
        bank: ["个", "本", "只", "杯", "张", "辆", "件", "条"],
        items: [
          { zh: "一___人", py: "yí ___ rén — one person", a: "个" },
          { zh: "两___书", py: "liǎng ___ shū — two books", a: "本" },
          { zh: "三___猫", py: "sān ___ māo — three cats", a: "只" },
          { zh: "一___水", py: "yì ___ shuǐ — a glass of water", a: "杯" },
          { zh: "四___纸", py: "sì ___ zhǐ — four sheets of paper", a: "张" },
          { zh: "一___车", py: "yí ___ chē — one car", a: "辆" },
          { zh: "五___衣服", py: "wǔ ___ yīfu — five items of clothing", a: "件" },
          { zh: "一___鱼", py: "yì ___ yú — one fish", a: "条" }
        ]
      },
      {
        type: "translate",
        title: "两 or 二?",
        instructions: "Correct the phrase if it is wrong. Write ✓ if it is already correct.",
        items: [
          { q: "二个人", a: "两个人" },
          { q: "十二本书", a: "✓" },
          { q: "二杯茶", a: "两杯茶" },
          { q: "第二课", a: "✓" }
        ]
      }
    ]
  },
  {
    id: "reading-family",
    no: "06",
    title: "Reading: My Family",
    zh: "阅读：我的家",
    level: "HSK 2",
    skill: "Reading",
    minutes: 20,
    summary: "A short passage about Li Ming's family, with comprehension and true/false questions.",
    sections: [
      {
        type: "reading",
        title: "Read the passage",
        instructions: "Read the text, then answer the questions in Chinese.",
        passage: "我叫李明，今年二十岁，是大学生。我家有四口人：爸爸、妈妈、姐姐和我。我爸爸是医生，妈妈是老师。我姐姐在北京工作。我喜欢喝茶，也喜欢打篮球。周末我常常和朋友去公园。",
        pinyin: "Wǒ jiào Lǐ Míng, jīnnián èrshí suì, shì dàxuéshēng. Wǒ jiā yǒu sì kǒu rén: bàba, māma, jiějie hé wǒ. Wǒ bàba shì yīshēng, māma shì lǎoshī. Wǒ jiějie zài Běijīng gōngzuò. Wǒ xǐhuan hē chá, yě xǐhuan dǎ lánqiú. Zhōumò wǒ chángcháng hé péngyou qù gōngyuán.",
        items: [
          { q: "李明今年多大？", a: "他今年二十岁。" },
          { q: "他家有几口人？", a: "他家有四口人。" },
          { q: "他妈妈做什么工作？", a: "她是老师。" },
          { q: "他姐姐在哪儿工作？", a: "她在北京工作。" },
          { q: "周末他常常做什么？", a: "他常常和朋友去公园。" },
          { q: "对还是错：李明喜欢喝咖啡。", a: "错 — 他喜欢喝茶。" }
        ]
      }
    ]
  }
];
