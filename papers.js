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
  },
  {
    id: "question-words",
    no: "07",
    title: "Question Words",
    zh: "疑问词",
    level: "HSK 1",
    skill: "Grammar",
    minutes: 20,
    summary: "Use 什么, 谁, 哪儿, 几, 多少, 怎么 and 吗 to ask and answer everyday questions.",
    sections: [
      {
        type: "match",
        title: "Match the question word",
        instructions: "Write the letter of the correct English meaning next to each question word.",
        items: [
          { zh: "什么", py: "shénme", a: "what" },
          { zh: "谁", py: "shéi", a: "who" },
          { zh: "哪儿", py: "nǎr", a: "where" },
          { zh: "几", py: "jǐ", a: "how many (small numbers)" },
          { zh: "多少", py: "duōshao", a: "how many / how much" },
          { zh: "怎么", py: "zěnme", a: "how" },
          { zh: "什么时候", py: "shénme shíhou", a: "when" },
          { zh: "为什么", py: "wèi shénme", a: "why" }
        ]
      },
      {
        type: "fill",
        title: "Complete the questions",
        instructions: "Fill each gap with a question word from the box. Each word is used once.",
        bank: ["谁", "哪儿", "几", "多少", "什么", "吗"],
        items: [
          { zh: "他是___？他是我的老师。", py: "Tā shì ___? Tā shì wǒ de lǎoshī.", a: "谁" },
          { zh: "你去___？我去学校。", py: "Nǐ qù ___? Wǒ qù xuéxiào.", a: "哪儿" },
          { zh: "你家有___口人？", py: "Nǐ jiā yǒu ___ kǒu rén?", a: "几" },
          { zh: "这个杯子___钱？", py: "Zhège bēizi ___ qián?", a: "多少" },
          { zh: "你想喝___？", py: "Nǐ xiǎng hē ___?", a: "什么" },
          { zh: "你是中国人___？", py: "Nǐ shì Zhōngguó rén ___?", a: "吗" }
        ]
      },
      {
        type: "translate",
        title: "Ask the question",
        instructions: "Write a Chinese question that gets each answer. Keep the question word where the answer goes.",
        items: [
          { q: "我叫王月。", a: "你叫什么名字？" },
          { q: "我在饭店工作。", a: "你在哪儿工作？" },
          { q: "现在三点。", a: "现在几点？" },
          { q: "我坐出租车去。", a: "你怎么去？" },
          { q: "她是我妈妈。", a: "她是谁？" }
        ]
      }
    ]
  },
  {
    id: "food-drink",
    no: "08",
    title: "Food & Drink",
    zh: "吃的和喝的",
    level: "HSK 1",
    skill: "Vocabulary",
    minutes: 20,
    summary: "Food and drink words, ordering in a restaurant with 想 and 要, measure words 杯 and 碗, and translation.",
    sections: [
      {
        type: "match",
        title: "Match the word to its meaning",
        instructions: "Write the letter of the correct English meaning next to each word.",
        items: [
          { zh: "米饭", py: "mǐfàn", a: "cooked rice" },
          { zh: "面条", py: "miàntiáo", a: "noodles" },
          { zh: "水果", py: "shuǐguǒ", a: "fruit" },
          { zh: "苹果", py: "píngguǒ", a: "apple" },
          { zh: "茶", py: "chá", a: "tea" },
          { zh: "牛奶", py: "niúnǎi", a: "milk" },
          { zh: "鸡蛋", py: "jīdàn", a: "egg" },
          { zh: "菜", py: "cài", a: "dish, vegetables" }
        ]
      },
      {
        type: "fill",
        title: "In the restaurant",
        instructions: "Fill each gap with a word from the box. Each word is used once.",
        bank: ["想", "要", "杯", "碗", "好吃", "饭店"],
        items: [
          { zh: "我们去___吃饭吧。", py: "Wǒmen qù ___ chī fàn ba.", a: "饭店" },
          { zh: "你___吃什么？", py: "Nǐ ___ chī shénme?", a: "想" },
          { zh: "我___一碗面条。", py: "Wǒ ___ yì wǎn miàntiáo.", a: "要" },
          { zh: "请给我一___茶。", py: "Qǐng gěi wǒ yì ___ chá.", a: "杯" },
          { zh: "他吃了两___米饭。", py: "Tā chīle liǎng ___ mǐfàn.", a: "碗" },
          { zh: "这个菜很___！", py: "Zhège cài hěn ___!", a: "好吃" }
        ]
      },
      {
        type: "translate",
        title: "Translate into Chinese",
        instructions: "Write your answer in characters.",
        items: [
          { q: "I would like to drink some water.", a: "我想喝水。" },
          { q: "Do you like eating fruit?", a: "你喜欢吃水果吗？" },
          { q: "I don't eat eggs.", a: "我不吃鸡蛋。" },
          { q: "How much is one cup of milk?", a: "一杯牛奶多少钱？" }
        ]
      }
    ]
  },
  {
    id: "reading-day",
    no: "09",
    title: "Reading: My Day",
    zh: "阅读：我的一天",
    level: "HSK 1",
    skill: "Reading",
    minutes: 20,
    summary: "Follow Wang Xiaoyu's school day using times, places and daily actions.",
    sections: [
      {
        type: "reading",
        title: "Read the passage",
        instructions: "Read the text, then answer the questions in Chinese.",
        passage: "我叫王小雨，是中学生。我每天早上七点起床，七点半吃早饭。我坐公共汽车去学校。上午我们有四节课，我最喜欢汉语课。中午我和同学在学校吃饭。下午四点我回家。晚上我看书，也看一会儿电视。我十点睡觉。",
        pinyin: "Wǒ jiào Wáng Xiǎoyǔ, shì zhōngxuéshēng. Wǒ měi tiān zǎoshang qī diǎn qǐchuáng, qī diǎn bàn chī zǎofàn. Wǒ zuò gōnggòng qìchē qù xuéxiào. Shàngwǔ wǒmen yǒu sì jié kè, wǒ zuì xǐhuan Hànyǔ kè. Zhōngwǔ wǒ hé tóngxué zài xuéxiào chī fàn. Xiàwǔ sì diǎn wǒ huí jiā. Wǎnshang wǒ kàn shū, yě kàn yíhuìr diànshì. Wǒ shí diǎn shuìjiào.",
        items: [
          { q: "王小雨几点起床？", a: "她七点起床。" },
          { q: "她怎么去学校？", a: "她坐公共汽车去学校。" },
          { q: "她最喜欢什么课？", a: "她最喜欢汉语课。" },
          { q: "中午她在哪儿吃饭？", a: "她在学校吃饭。" },
          { q: "她几点回家？", a: "她下午四点回家。" },
          { q: "对还是错：王小雨晚上十一点睡觉。", a: "错 — 她十点睡觉。" }
        ]
      },
      {
        type: "translate",
        title: "Your day",
        instructions: "Answer about yourself in a full Chinese sentence.",
        items: [
          { q: "你每天几点起床？", a: "Model: 我每天早上七点起床。" },
          { q: "你怎么去学校 / 工作？", a: "Model: 我坐地铁去学校。" },
          { q: "晚上你做什么？", a: "Model: 晚上我看书。" }
        ]
      }
    ]
  },
  {
    id: "characters-2",
    no: "10",
    title: "Characters: Nature & People",
    zh: "汉字：自然和人",
    level: "HSK 1",
    skill: "Writing",
    minutes: 25,
    summary: "Trace and copy ten more HSK 1 characters, from picture characters like 日 and 山 to 他 and 家.",
    sections: [
      {
        type: "grid",
        title: "Trace, then write",
        instructions: "Trace the grey characters, then write the character on your own in the empty boxes. Watch the stroke order.",
        items: [
          { zh: "日", py: "rì", en: "sun, day", strokes: 4 },
          { zh: "月", py: "yuè", en: "moon, month", strokes: 4 },
          { zh: "山", py: "shān", en: "mountain", strokes: 3 },
          { zh: "水", py: "shuǐ", en: "water", strokes: 4 },
          { zh: "火", py: "huǒ", en: "fire", strokes: 4 },
          { zh: "木", py: "mù", en: "tree, wood", strokes: 4 },
          { zh: "天", py: "tiān", en: "sky, day", strokes: 4 },
          { zh: "生", py: "shēng", en: "to be born, life", strokes: 5 },
          { zh: "他", py: "tā", en: "he, him", strokes: 5 },
          { zh: "家", py: "jiā", en: "home, family", strokes: 10 }
        ]
      },
      {
        type: "translate",
        title: "Build a word",
        instructions: "Write the two-character word using a character from above.",
        items: [
          { q: "today (今 + ?)", a: "今天" },
          { q: "student (学 + ?)", a: "学生" },
          { q: "Japan (? + 本)", a: "日本" },
          { q: "fruit (? + 果)", a: "水果" },
          { q: "train (? + 车)", a: "火车" }
        ]
      }
    ]
  },
  {
    id: "comparisons",
    no: "11",
    title: "Comparing with 比",
    zh: "比较句",
    level: "HSK 2",
    skill: "Grammar",
    minutes: 20,
    summary: "Make comparisons with A 比 B + adjective, add 一点儿 or 多了, and use 没有 for the negative.",
    sections: [
      {
        type: "fill",
        title: "Complete the comparison",
        instructions: "Fill each gap with a word from the box. Each word is used once.",
        bank: ["比", "没有", "一点儿", "多了", "更"],
        items: [
          { zh: "哥哥___我高。", py: "Gēge ___ wǒ gāo.", a: "比" },
          { zh: "今天比昨天冷___。", py: "Jīntiān bǐ zuótiān lěng ___.", a: "一点儿" },
          { zh: "北京比我的城市大___。", py: "Běijīng bǐ wǒ de chéngshì dà ___.", a: "多了" },
          { zh: "我的汉语___他的好。", py: "Wǒ de Hànyǔ ___ tā de hǎo.", a: "没有" },
          { zh: "火车很快，飞机___快。", py: "Huǒchē hěn kuài, fēijī ___ kuài.", a: "更" }
        ]
      },
      {
        type: "translate",
        title: "Find the mistake",
        instructions: "Each sentence has one mistake. Write the correct sentence.",
        items: [
          { q: "我比他很高。", a: "我比他高。 (no 很 in a 比 sentence)" },
          { q: "这本书比那本书不贵。", a: "这本书没有那本书贵。 (use 没有 for the negative)" },
          { q: "他比我大两岁多了。", a: "他比我大两岁。" },
          { q: "我妹妹比我非常漂亮。", a: "我妹妹比我漂亮。" }
        ]
      },
      {
        type: "translate",
        title: "Translate into Chinese",
        instructions: "Use 比 or 没有 in each answer.",
        items: [
          { q: "Coffee is more expensive than tea.", a: "咖啡比茶贵。" },
          { q: "My brother is three years older than me.", a: "我哥哥比我大三岁。" },
          { q: "This room isn't as big as that room.", a: "这个房间没有那个房间大。" },
          { q: "Today is a little warmer than yesterday.", a: "今天比昨天暖和一点儿。" }
        ]
      }
    ]
  },
  {
    id: "le-guo",
    no: "12",
    title: "Past Actions: 了 and 过",
    zh: "了和过",
    level: "HSK 2",
    skill: "Grammar",
    minutes: 20,
    summary: "Use 了 for completed actions, 过 for past experiences, and 没 for the negative of both.",
    sections: [
      {
        type: "fill",
        title: "了 or 过?",
        instructions: "Fill each gap with 了 or 过.",
        bank: ["了", "过"],
        items: [
          { zh: "昨天我买___一件衣服。", py: "Zuótiān wǒ mǎi ___ yí jiàn yīfu.", a: "了" },
          { zh: "你去___中国吗？", py: "Nǐ qù ___ Zhōngguó ma?", a: "过" },
          { zh: "我从来没吃___北京烤鸭。", py: "Wǒ cónglái méi chī ___ Běijīng kǎoyā.", a: "过" },
          { zh: "他已经回家___。", py: "Tā yǐjīng huí jiā ___.", a: "了" },
          { zh: "我看___这个电影，很好看。", py: "Wǒ kàn ___ zhège diànyǐng, hěn hǎokàn.", a: "过" },
          { zh: "今天早上我喝___两杯咖啡。", py: "Jīntiān zǎoshang wǒ hē ___ liǎng bēi kāfēi.", a: "了" }
        ]
      },
      {
        type: "translate",
        title: "Make it negative",
        instructions: "Rewrite each sentence in the negative. Remember: use 没, and drop 了 (but keep 过).",
        items: [
          { q: "我吃了早饭。", a: "我没吃早饭。" },
          { q: "他去过上海。", a: "他没去过上海。" },
          { q: "妈妈买了水果。", a: "妈妈没买水果。" },
          { q: "我学过日语。", a: "我没学过日语。" }
        ]
      },
      {
        type: "translate",
        title: "Translate into Chinese",
        instructions: "Write your answer in characters.",
        items: [
          { q: "Have you ever been to Beijing?", a: "你去过北京吗？" },
          { q: "I bought two books yesterday.", a: "我昨天买了两本书。" },
          { q: "He has never ridden a horse.", a: "他从来没骑过马。" },
          { q: "Did you watch TV last night?", a: "你昨天晚上看电视了吗？" }
        ]
      }
    ]
  },
  {
    id: "directions",
    no: "13",
    title: "Places & Directions",
    zh: "地点和方向",
    level: "HSK 2",
    skill: "Vocabulary",
    minutes: 20,
    summary: "Position words like 左边, 旁边 and 对面, places around town, and asking the way.",
    sections: [
      {
        type: "match",
        title: "Match the position word",
        instructions: "Write the letter of the correct English meaning next to each word.",
        items: [
          { zh: "左边", py: "zuǒbian", a: "left side" },
          { zh: "右边", py: "yòubian", a: "right side" },
          { zh: "前边", py: "qiánbian", a: "in front" },
          { zh: "后边", py: "hòubian", a: "behind" },
          { zh: "旁边", py: "pángbiān", a: "next to" },
          { zh: "对面", py: "duìmiàn", a: "opposite" },
          { zh: "里边", py: "lǐbian", a: "inside" },
          { zh: "中间", py: "zhōngjiān", a: "in the middle" }
        ]
      },
      {
        type: "fill",
        title: "Asking the way",
        instructions: "Fill each gap with a word from the box. Each word is used once.",
        bank: ["怎么", "往", "离", "远", "到", "在"],
        items: [
          { zh: "请问，去火车站___走？", py: "Qǐngwèn, qù huǒchēzhàn ___ zǒu?", a: "怎么" },
          { zh: "一直___前走，然后往左。", py: "Yìzhí ___ qián zǒu, ránhòu wǎng zuǒ.", a: "往" },
          { zh: "火车站___这儿远吗？", py: "Huǒchēzhàn ___ zhèr yuǎn ma?", a: "离" },
          { zh: "不___，走五分钟就到了。", py: "Bù ___, zǒu wǔ fēnzhōng jiù dào le.", a: "远" },
          { zh: "医院___银行旁边。", py: "Yīyuàn ___ yínháng pángbiān.", a: "在" },
          { zh: "坐地铁___机场要一个小时。", py: "Zuò dìtiě ___ jīchǎng yào yí ge xiǎoshí.", a: "到" }
        ]
      },
      {
        type: "translate",
        title: "Where is it?",
        instructions: "Write a Chinese sentence using 在 and a position word.",
        items: [
          { q: "The shop is opposite the school.", a: "商店在学校对面。" },
          { q: "The cat is under the table.", a: "猫在桌子下边。" },
          { q: "My home is next to the park.", a: "我家在公园旁边。" },
          { q: "The bank is on the left of the hospital.", a: "银行在医院左边。" }
        ]
      }
    ]
  },
  {
    id: "reading-shopping",
    no: "14",
    title: "Reading: Weekend Shopping",
    zh: "阅读：周末买东西",
    level: "HSK 2",
    skill: "Reading",
    minutes: 25,
    summary: "A weekend shopping trip with prices, colours and comparisons, plus true/false questions.",
    sections: [
      {
        type: "reading",
        title: "Read the passage",
        instructions: "Read the text, then answer the questions in Chinese.",
        passage: "上个星期六，我和妹妹去商店买衣服。天气很冷，所以我想买一件新的外套。我看了一件红色的和一件黑色的。红色的三百块，黑色的比红色的便宜一百块。妹妹说红色的更漂亮，可是我觉得黑色的也很好看。最后我买了黑色的。妹妹买了一双运动鞋。买完东西，我们去咖啡店喝了咖啡，下午五点才回家。",
        pinyin: "Shàng ge xīngqīliù, wǒ hé mèimei qù shāngdiàn mǎi yīfu. Tiānqì hěn lěng, suǒyǐ wǒ xiǎng mǎi yí jiàn xīn de wàitào. Wǒ kànle yí jiàn hóngsè de hé yí jiàn hēisè de. Hóngsè de sānbǎi kuài, hēisè de bǐ hóngsè de piányi yìbǎi kuài. Mèimei shuō hóngsè de gèng piàoliang, kěshì wǒ juéde hēisè de yě hěn hǎokàn. Zuìhòu wǒ mǎile hēisè de. Mèimei mǎile yì shuāng yùndòngxié. Mǎiwán dōngxi, wǒmen qù kāfēidiàn hēle kāfēi, xiàwǔ wǔ diǎn cái huí jiā.",
        items: [
          { q: "他们什么时候去买东西？", a: "上个星期六。" },
          { q: "为什么“我”想买外套？", a: "因为天气很冷。" },
          { q: "黑色的外套多少钱？", a: "两百块。" },
          { q: "妹妹觉得哪件更漂亮？", a: "她觉得红色的更漂亮。" },
          { q: "妹妹买了什么？", a: "她买了一双运动鞋。" },
          { q: "对还是错：他们中午就回家了。", a: "错 — 他们下午五点才回家。" }
        ]
      },
      {
        type: "translate",
        title: "Answer about yourself",
        instructions: "Answer in a full Chinese sentence.",
        items: [
          { q: "你喜欢什么颜色的衣服？", a: "Model: 我喜欢蓝色的衣服。" },
          { q: "周末你常常去哪儿买东西？", a: "Model: 周末我常常去商店买东西。" },
          { q: "你最近买了什么？多少钱？", a: "Model: 我最近买了一本书，五十块。" }
        ]
      }
    ]
  }
];
