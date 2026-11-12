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
  },
  {
    id: "de",
    no: "15",
    title: "Using 的",
    zh: "结构助词“的”",
    level: "HSK 1",
    skill: "Grammar",
    minutes: 20,
    summary: "Show possession and describe things with 的, and learn when it can be left out (我妈妈, 我家).",
    sections: [
      {
        type: "fill",
        title: "的 or nothing?",
        instructions: "Write 的 in the gap, or ✗ if it is normally left out. 的 is often dropped with close family and 家.",
        bank: ["的", "✗"],
        items: [
          { zh: "这是我___书。", py: "Zhè shì wǒ ___ shū.", a: "的" },
          { zh: "我___妈妈是医生。", py: "Wǒ ___ māma shì yīshēng.", a: "✗ (的 is possible but usually dropped)" },
          { zh: "老师___电脑很新。", py: "Lǎoshī ___ diànnǎo hěn xīn.", a: "的" },
          { zh: "我___家在北京。", py: "Wǒ ___ jiā zài Běijīng.", a: "✗ (我家)" },
          { zh: "这是谁___杯子？", py: "Zhè shì shéi ___ bēizi?", a: "的" },
          { zh: "我有一个很好___朋友。", py: "Wǒ yǒu yí ge hěn hǎo ___ péngyou.", a: "的 (很 + adjective needs 的)" },
          { zh: "他是中国___老师。", py: "Tā shì Zhōngguó ___ lǎoshī.", a: "✗ (中国老师 = Chinese teacher)" }
        ]
      },
      {
        type: "translate",
        title: "Put the words in order",
        instructions: "Write a correct sentence using all the words.",
        items: [
          { q: "的 / 这 / 我 / 是 / 手机", a: "这是我的手机。" },
          { q: "衣服 / 漂亮 / 你 / 的 / 很", a: "你的衣服很漂亮。" },
          { q: "是 / 那 / 的 / 本 / 书 / 老师", a: "那本书是老师的。" },
          { q: "好吃 / 很 / 菜 / 的 / 这是", a: "这是很好吃的菜。" }
        ]
      },
      {
        type: "translate",
        title: "Translate into Chinese",
        instructions: "Write your answer in characters.",
        items: [
          { q: "my teacher's book", a: "我老师的书" },
          { q: "This is mine.", a: "这是我的。" },
          { q: "a very big room", a: "很大的房间" },
          { q: "Whose phone is this?", a: "这是谁的手机？" },
          { q: "the person who is reading", a: "看书的人" }
        ]
      }
    ]
  },
  {
    id: "zai",
    no: "16",
    title: "Three Uses of 在",
    zh: "“在”的用法",
    level: "HSK 1",
    skill: "Grammar",
    minutes: 20,
    summary: "在 as 'to be at', 在 + place before the verb, and 在 / 正在 for actions in progress.",
    sections: [
      {
        type: "translate",
        title: "What is 在 doing?",
        instructions: "Write A (to be at a place), B (place before the verb) or C (action in progress).",
        items: [
          { q: "我在家。", a: "A" },
          { q: "我在家看书。", a: "B" },
          { q: "他在看书。", a: "C" },
          { q: "妈妈正在做饭。", a: "C" },
          { q: "学校在医院旁边。", a: "A" },
          { q: "我们在饭店吃饭。", a: "B" }
        ]
      },
      {
        type: "translate",
        title: "Fix the word order",
        instructions: "In Chinese the place comes before the verb. Rewrite each sentence correctly.",
        items: [
          { q: "我吃饭在饭店。", a: "我在饭店吃饭。" },
          { q: "他工作在北京。", a: "他在北京工作。" },
          { q: "她看电视在。", a: "她在看电视。" },
          { q: "我们学习汉语在学校。", a: "我们在学校学习汉语。" }
        ]
      },
      {
        type: "translate",
        title: "Translate into Chinese",
        instructions: "Use 在 in each answer.",
        items: [
          { q: "I am studying Chinese (right now).", a: "我在学汉语。 / 我正在学汉语。" },
          { q: "Where do you work?", a: "你在哪儿工作？" },
          { q: "My phone is on the table.", a: "我的手机在桌子上。" },
          { q: "Dad isn't at home.", a: "爸爸不在家。" },
          { q: "What are you doing?", a: "你在做什么？" }
        ]
      }
    ]
  },
  {
    id: "hui-neng-keyi",
    no: "17",
    title: "Can: 会, 能 or 可以?",
    zh: "会、能、可以",
    level: "HSK 2",
    skill: "Grammar",
    minutes: 25,
    summary: "会 for learned skills and likelihood, 能 for ability in the moment, 可以 for permission.",
    sections: [
      {
        type: "match",
        title: "Match the use",
        instructions: "Write the letter of the best explanation next to each sentence.",
        items: [
          { zh: "我会游泳。", py: "Wǒ huì yóuyǒng.", a: "a skill I have learned (会)" },
          { zh: "明天会下雨。", py: "Míngtiān huì xià yǔ.", a: "something likely to happen (会)" },
          { zh: "我今天不能来。", py: "Wǒ jīntiān bù néng lái.", a: "not possible because of circumstances (能)" },
          { zh: "这儿可以坐吗？", py: "Zhèr kěyǐ zuò ma?", a: "asking permission (可以)" },
          { zh: "他一次能喝三杯咖啡。", py: "Tā yí cì néng hē sān bēi kāfēi.", a: "how much someone is able to do (能)" }
        ]
      },
      {
        type: "fill",
        title: "Choose the word",
        instructions: "Fill each gap with 会, 能 or 可以. Words can be used more than once.",
        bank: ["会", "能", "可以"],
        items: [
          { zh: "我___说一点儿汉语。", py: "Wǒ ___ shuō yìdiǎnr Hànyǔ.", a: "会" },
          { zh: "我妹妹三岁，还不___写字。", py: "Wǒ mèimei sān suì, hái bú ___ xiě zì.", a: "会" },
          { zh: "老师，我___进来吗？", py: "Lǎoshī, wǒ ___ jìnlai ma?", a: "可以 (能 is also heard)" },
          { zh: "我今天很忙，不___去看电影。", py: "Wǒ jīntiān hěn máng, bù ___ qù kàn diànyǐng.", a: "能" },
          { zh: "你看，天阴了，下午___下雨。", py: "Nǐ kàn, tiān yīn le, xiàwǔ ___ xià yǔ.", a: "会" },
          { zh: "你___帮我一下吗？", py: "Nǐ ___ bāng wǒ yíxià ma?", a: "能 / 可以" },
          { zh: "他喝酒了，不___开车。", py: "Tā hē jiǔ le, bù ___ kāichē.", a: "能" }
        ]
      },
      {
        type: "translate",
        title: "Translate into Chinese",
        instructions: "Choose 会, 能 or 可以 carefully.",
        items: [
          { q: "I can drive (I learned how).", a: "我会开车。" },
          { q: "May I use your phone?", a: "我可以用你的手机吗？" },
          { q: "Will it rain tomorrow?", a: "明天会下雨吗？" },
          { q: "I'm ill, so I can't go to school today.", a: "我病了，今天不能去学校。" }
        ]
      }
    ]
  },
  {
    id: "characters-hsk2",
    no: "18",
    title: "HSK 2 Characters",
    zh: "二级汉字",
    level: "HSK 2",
    skill: "Writing",
    minutes: 25,
    summary: "Trace and copy ten HSK 2 characters, from directions like 左 and 右 to 远, 近 and 快.",
    sections: [
      {
        type: "grid",
        title: "Trace, then write",
        instructions: "Trace the grey characters, then write the character on your own in the empty boxes. Watch the stroke order.",
        items: [
          { zh: "左", py: "zuǒ", en: "left", strokes: 5 },
          { zh: "右", py: "yòu", en: "right", strokes: 5 },
          { zh: "门", py: "mén", en: "door", strokes: 3 },
          { zh: "飞", py: "fēi", en: "to fly", strokes: 3 },
          { zh: "比", py: "bǐ", en: "than, to compare", strokes: 4 },
          { zh: "长", py: "cháng", en: "long", strokes: 4 },
          { zh: "走", py: "zǒu", en: "to walk", strokes: 7 },
          { zh: "远", py: "yuǎn", en: "far", strokes: 7 },
          { zh: "近", py: "jìn", en: "near", strokes: 7 },
          { zh: "快", py: "kuài", en: "fast", strokes: 7 }
        ]
      },
      {
        type: "translate",
        title: "Opposites",
        instructions: "Write the character with the opposite meaning.",
        items: [
          { q: "左 left ↔ ?", a: "右" },
          { q: "远 far ↔ ?", a: "近" },
          { q: "快 fast ↔ ?", a: "慢" },
          { q: "长 long ↔ ?", a: "短" }
        ]
      },
      {
        type: "translate",
        title: "Build a word",
        instructions: "Write the two-character word using a character from above.",
        items: [
          { q: "aeroplane (? + 机)", a: "飞机" },
          { q: "on the left (? + 边)", a: "左边" },
          { q: "doorway (? + 口)", a: "门口" },
          { q: "recently (最 + ?)", a: "最近" }
        ]
      }
    ]
  },
  {
    id: "initials-finals",
    no: "19",
    title: "Initials & Finals",
    zh: "声母和韵母",
    level: "Beginner",
    skill: "Pronunciation",
    minutes: 20,
    summary: "Split syllables into initial + final + tone, hear the difference a puff of air makes, and build syllables back up.",
    sections: [
      {
        type: "tone",
        title: "Split the syllable",
        instructions: "Write the initial, the final and the tone number. Example: hǎo → h + ao, 3.",
        items: [
          { q: "bā 八", a: "b + a, 1" },
          { q: "mén 门", a: "m + en, 2" },
          { q: "gěi 给", a: "g + ei, 3" },
          { q: "tīng 听", a: "t + ing, 1" },
          { q: "jiā 家", a: "j + ia, 1" },
          { q: "qù 去", a: "q + ü, 4 (written u after q)" },
          { q: "xué 学", a: "x + üe, 2 (written ue after x)" },
          { q: "zhōng 中", a: "zh + ong, 1" },
          { q: "shuō 说", a: "sh + uo, 1" },
          { q: "chī 吃", a: "ch + -i (buzz), 1" },
          { q: "duì 对", a: "d + ui (uei), 4" },
          { q: "yǒu 有", a: "no initial: iou (y is a spelling letter), 3" }
        ]
      },
      {
        type: "fill",
        title: "Puff of air?",
        instructions: "Each pair sounds alike, but the second letter has a puff of air. Write the missing initial.",
        bank: ["b", "p", "d", "t", "g", "k", "j", "q", "zh", "ch", "z", "c"],
        items: [
          { zh: "爸 ___à", py: "dad — b or p?", a: "b" },
          { zh: "跑 ___ǎo", py: "to run — b or p?", a: "p" },
          { zh: "大 ___à", py: "big — d or t?", a: "d" },
          { zh: "他 ___ā", py: "he — d or t?", a: "t" },
          { zh: "哥 ___ē", py: "older brother — g or k?", a: "g" },
          { zh: "看 ___àn", py: "to look — g or k?", a: "k" },
          { zh: "家 ___iā", py: "home — j or q?", a: "j" },
          { zh: "去 ___ù", py: "to go — j or q?", a: "q" },
          { zh: "中 ___ōng", py: "middle — zh or ch?", a: "zh" },
          { zh: "茶 ___á", py: "tea — zh or ch?", a: "ch" },
          { zh: "在 ___ài", py: "at — z or c?", a: "z" },
          { zh: "菜 ___ài", py: "dish — z or c?", a: "c" }
        ]
      },
      {
        type: "tone",
        title: "Build the syllable",
        instructions: "Join the parts and write the syllable with its tone mark. Watch the spelling rules.",
        items: [
          { q: "sh + i, 4", a: "shì" },
          { q: "l + ü, 4", a: "lǜ (ü keeps its dots after l and n)" },
          { q: "j + ü, 3", a: "jǔ (dots dropped after j)" },
          { q: "(none) + i, 1", a: "yī" },
          { q: "(none) + u, 3", a: "wǔ" },
          { q: "(none) + uo, 3", a: "wǒ" },
          { q: "(none) + ü + e, 4", a: "yuè" },
          { q: "h + uei, 4", a: "huì (uei → ui)" }
        ]
      }
    ]
  },
  {
    id: "tricky-sounds",
    no: "20",
    title: "Tricky Sounds",
    zh: "易混音",
    level: "HSK 1",
    skill: "Pronunciation",
    minutes: 20,
    summary: "Curled vs flat tongue (zh/z, ch/c, sh/s), -n vs -ng, and j q x vs zh ch sh, all with HSK 1 words.",
    sections: [
      {
        type: "fill",
        title: "Curled or flat tongue?",
        instructions: "Write the missing initial. zh, ch, sh curl the tongue back; z, c, s keep it flat behind the teeth.",
        bank: ["zh", "z", "ch", "c", "sh", "s"],
        items: [
          { zh: "知道 ___īdào", py: "to know", a: "zh" },
          { zh: "写字 xiě ___ì", py: "to write characters", a: "z" },
          { zh: "吃饭 ___īfàn", py: "to eat a meal", a: "ch" },
          { zh: "菜 ___ài", py: "dish", a: "c" },
          { zh: "是 ___ì", py: "to be", a: "sh" },
          { zh: "四 ___ì", py: "four", a: "s" },
          { zh: "十 ___í", py: "ten", a: "sh" },
          { zh: "坐 ___uò", py: "to sit", a: "z" }
        ]
      },
      {
        type: "fill",
        title: "-n or -ng?",
        instructions: "Write n or ng. For -ng, the back of the tongue closes and the mouth stays open, as in 'sing'.",
        bank: ["n", "ng"],
        items: [
          { zh: "看 kà___", py: "to look", a: "n" },
          { zh: "忙 má___", py: "busy", a: "ng" },
          { zh: "很 hě___", py: "very", a: "n" },
          { zh: "冷 lě___", py: "cold", a: "ng" },
          { zh: "今天 jī___tiān", py: "today", a: "n" },
          { zh: "北京 Běijī___", py: "Beijing", a: "ng" },
          { zh: "饭 fà___", py: "meal", a: "n" },
          { zh: "房间 fá___jiān", py: "room", a: "ng" }
        ]
      },
      {
        type: "tone",
        title: "Which spelling is right?",
        instructions: "Circle or write the correct pinyin. Remember: j, q and x are only followed by i or ü.",
        items: [
          { q: "学 xué or shué?", a: "xué" },
          { q: "说 xuō or shuō?", a: "shuō" },
          { q: "去 qù or chù?", a: "qù" },
          { q: "吃 qī or chī?", a: "chī" },
          { q: "家 jiā or zhiā?", a: "jiā" },
          { q: "中 jōng or zhōng?", a: "zhōng" },
          { q: "女 nǚ or lǚ?", a: "nǚ" },
          { q: "绿 nǜ or lǜ?", a: "lǜ" }
        ]
      }
    ]
  },
  {
    id: "ba",
    no: "21",
    title: "The 把 Sentence",
    zh: "“把”字句",
    level: "HSK 3",
    skill: "Grammar",
    minutes: 25,
    summary: "Move the object before the verb with 把 to say what you did to something, and avoid the four common 把 mistakes.",
    sections: [
      {
        type: "translate",
        title: "Rewrite with 把",
        instructions: "Pattern: subject + 把 + object + verb + something else (了, a result or a place).",
        items: [
          { q: "我喝了那杯咖啡。", a: "我把那杯咖啡喝了。" },
          { q: "我做完了作业。", a: "我把作业做完了。" },
          { q: "妈妈洗干净了衣服。", a: "妈妈把衣服洗干净了。" },
          { q: "你关一下门。", a: "你把门关一下。" },
          { q: "他放了书在桌子上。 (correct it with 把)", a: "他把书放在桌子上了。" }
        ]
      },
      {
        type: "translate",
        title: "Find the mistake",
        instructions: "Each sentence has one mistake. Write the correct sentence.",
        items: [
          { q: "我把书看。", a: "我把书看完了。 (the verb needs something after it)" },
          { q: "他把一本书放在桌子上。", a: "他把那本书放在桌子上。 (the object must be specific)" },
          { q: "我把作业没做完。", a: "我没把作业做完。 (没 / 不 go before 把)" },
          { q: "我把这个问题懂了。", a: "我懂了这个问题。 (懂 can't be used with 把)" }
        ]
      },
      {
        type: "translate",
        title: "Translate into Chinese",
        instructions: "Use 把 in each answer.",
        items: [
          { q: "Please put the bag on the chair.", a: "请把包放在椅子上。" },
          { q: "I lost my passport.", a: "我把护照丢了。" },
          { q: "Have you finished your homework?", a: "你把作业做完了吗？" },
          { q: "Take the umbrella with you.", a: "把伞带上。" }
        ]
      }
    ]
  },
  {
    id: "result-complements",
    no: "22",
    title: "Result Complements",
    zh: "结果补语",
    level: "HSK 3",
    skill: "Grammar",
    minutes: 20,
    summary: "Add 完, 好, 到, 懂, 见, 错, 干净 and 清楚 after a verb to show the result, and make them negative with 没.",
    sections: [
      {
        type: "fill",
        title: "Add the result",
        instructions: "Fill each gap with a word from the box. Each word is used once.",
        bank: ["完", "好", "到", "懂", "见", "错", "干净", "清楚"],
        items: [
          { zh: "我已经吃___饭了。", py: "Wǒ yǐjīng chī ___ fàn le.", a: "完" },
          { zh: "老师说的话你听___了吗？", py: "Lǎoshī shuō de huà nǐ tīng ___ le ma?", a: "懂" },
          { zh: "我找___我的手机了。", py: "Wǒ zhǎo ___ wǒ de shǒujī le.", a: "到" },
          { zh: "对不起，我写___了一个字。", py: "Duìbuqǐ, wǒ xiě ___ le yí ge zì.", a: "错" },
          { zh: "你看___我的猫了吗？", py: "Nǐ kàn ___ wǒ de māo le ma?", a: "见" },
          { zh: "他把房间打扫___了。", py: "Tā bǎ fángjiān dǎsǎo ___ le.", a: "干净" },
          { zh: "你能说___一点儿吗？", py: "Nǐ néng shuō ___ yìdiǎnr ma?", a: "清楚" },
          { zh: "饭做___了，快来吃吧！", py: "Fàn zuò ___ le, kuài lái chī ba!", a: "好" }
        ]
      },
      {
        type: "translate",
        title: "Make it negative",
        instructions: "Use 没 before the verb and drop 了.",
        items: [
          { q: "我看完了这本书。", a: "我没看完这本书。" },
          { q: "他听懂了。", a: "他没听懂。" },
          { q: "我买到了票。", a: "我没买到票。" },
          { q: "她洗干净了碗。", a: "她没洗干净碗。 / 她没把碗洗干净。" }
        ]
      },
      {
        type: "translate",
        title: "Translate into Chinese",
        instructions: "Use a result complement in each answer.",
        items: [
          { q: "I didn't hear clearly.", a: "我没听清楚。" },
          { q: "Have you finished writing?", a: "你写完了吗？" },
          { q: "I bought the wrong ticket.", a: "我买错票了。" },
          { q: "Did you understand?", a: "你听懂了吗？ / 你看懂了吗？" }
        ]
      }
    ]
  },
  {
    id: "connectors",
    no: "23",
    title: "Linking Ideas",
    zh: "关联词",
    level: "HSK 3",
    skill: "Grammar",
    minutes: 25,
    summary: "Join sentences with 虽然…但是, 因为…所以, 如果…就 and 一边…一边, and choose between 还是 and 或者.",
    sections: [
      {
        type: "fill",
        title: "Choose the linking words",
        instructions: "Fill the gaps with words from the box. Some sentences need two words.",
        bank: ["虽然", "但是", "因为", "所以", "如果", "就", "一边", "还是", "或者"],
        items: [
          { zh: "___天气不好，___我们还是去了公园。", py: "___ tiānqì bù hǎo, ___ wǒmen háishi qùle gōngyuán.", a: "虽然 … 但是" },
          { zh: "___他感冒了，___今天没来上课。", py: "___ tā gǎnmào le, ___ jīntiān méi lái shàngkè.", a: "因为 … 所以" },
          { zh: "___明天下雨，我们___不去公园了。", py: "___ míngtiān xià yǔ, wǒmen ___ bú qù gōngyuán le.", a: "如果 … 就" },
          { zh: "他喜欢___吃饭___看电视。", py: "Tā xǐhuan ___ chī fàn ___ kàn diànshì.", a: "一边 … 一边" },
          { zh: "你想喝茶___咖啡？", py: "Nǐ xiǎng hē chá ___ kāfēi?", a: "还是 (in questions)" },
          { zh: "周末我去看电影___去图书馆。", py: "Zhōumò wǒ qù kàn diànyǐng ___ qù túshūguǎn.", a: "或者 (in statements)" }
        ]
      },
      {
        type: "translate",
        title: "Join the sentences",
        instructions: "Join each pair into one sentence using the words in brackets.",
        items: [
          { q: "我很累。我想早点儿睡觉。(因为…所以)", a: "因为我很累，所以我想早点儿睡觉。" },
          { q: "你有时间。我们一起去吃饭。(如果…就)", a: "如果你有时间，我们就一起去吃饭。" },
          { q: "她听音乐。她做作业。(一边…一边)", a: "她一边听音乐，一边做作业。" },
          { q: "中文很难。我很喜欢学。(虽然…但是)", a: "虽然中文很难，但是我很喜欢学。" }
        ]
      }
    ]
  },
  {
    id: "reading-guest",
    no: "24",
    title: "Reading: Being a Guest",
    zh: "阅读：去邻居家做客",
    level: "HSK 3",
    skill: "Reading",
    minutes: 25,
    summary: "A visit to the neighbours' home for dinner, with comprehension and true/false questions.",
    sections: [
      {
        type: "reading",
        title: "Read the passage",
        instructions: "Read the text, then answer the questions in Chinese.",
        passage: "上个周末，我的邻居王阿姨请我去她家做客。我买了一些水果送给她。王阿姨很热情，做了很多菜，她的菜又好吃又健康。吃饭的时候，她的爱人李叔叔给我讲了很多中国的文化和节日。我以前不太了解中国的节日，现在知道了很多。吃完饭，我想帮他们洗碗，可是王阿姨说：“你是客人，不用洗。”我们一直聊天，晚上九点我才回家。我打算下个月请他们来我家吃饭。",
        pinyin: "Shàng ge zhōumò, wǒ de línjū Wáng āyí qǐng wǒ qù tā jiā zuòkè. Wǒ mǎile yìxiē shuǐguǒ sòng gěi tā. Wáng āyí hěn rèqíng, zuòle hěn duō cài, tā de cài yòu hǎochī yòu jiànkāng. Chī fàn de shíhou, tā de àiren Lǐ shūshu gěi wǒ jiǎngle hěn duō Zhōngguó de wénhuà hé jiérì. Wǒ yǐqián bú tài liǎojiě Zhōngguó de jiérì, xiànzài zhīdaole hěn duō. Chīwán fàn, wǒ xiǎng bāng tāmen xǐ wǎn, kěshì Wáng āyí shuō: “Nǐ shì kèrén, búyòng xǐ.” Wǒmen yìzhí liáotiān, wǎnshang jiǔ diǎn wǒ cái huí jiā. Wǒ dǎsuàn xià ge yuè qǐng tāmen lái wǒ jiā chī fàn.",
        items: [
          { q: "谁请“我”去做客？", a: "邻居王阿姨。" },
          { q: "“我”送给王阿姨什么？", a: "一些水果。" },
          { q: "王阿姨的菜怎么样？", a: "又好吃又健康。" },
          { q: "李叔叔给“我”讲了什么？", a: "中国的文化和节日。" },
          { q: "王阿姨为什么不让“我”洗碗？", a: "因为“我”是客人。" },
          { q: "对还是错：“我”晚上八点就回家了。", a: "错 — 九点才回家。" },
          { q: "“我”下个月打算做什么？", a: "请他们来家里吃饭。" }
        ]
      }
    ]
  },
  {
    id: "weather-seasons",
    no: "25",
    title: "Weather & Seasons",
    zh: "天气和季节",
    level: "HSK 3",
    skill: "Vocabulary",
    minutes: 20,
    summary: "The four seasons, weather words like 晴, 阴 and 凉快, and talking about the weather with 会 and 但是.",
    sections: [
      {
        type: "match",
        title: "Match the word to its meaning",
        instructions: "Write the letter of the correct English meaning next to each word.",
        items: [
          { zh: "春天", py: "chūntiān", a: "spring" },
          { zh: "夏天", py: "xiàtiān", a: "summer" },
          { zh: "秋天", py: "qiūtiān", a: "autumn" },
          { zh: "冬天", py: "dōngtiān", a: "winter" },
          { zh: "季节", py: "jìjié", a: "season" },
          { zh: "凉快", py: "liángkuai", a: "pleasantly cool" },
          { zh: "晴", py: "qíng", a: "sunny, clear" },
          { zh: "伞", py: "sǎn", a: "umbrella" }
        ]
      },
      {
        type: "fill",
        title: "Talk about the weather",
        instructions: "Fill the gaps with words from the box. One sentence needs two words.",
        bank: ["季节", "冷", "热", "凉快", "伞", "晴", "下雨"],
        items: [
          { zh: "一年有四个___。", py: "Yì nián yǒu sì ge ___.", a: "季节" },
          { zh: "北京的冬天很___。", py: "Běijīng de dōngtiān hěn ___.", a: "冷" },
          { zh: "夏天太___了，我不想出去。", py: "Xiàtiān tài ___ le, wǒ bù xiǎng chūqu.", a: "热" },
          { zh: "秋天不冷也不热，很___。", py: "Qiūtiān bù lěng yě bú rè, hěn ___.", a: "凉快" },
          { zh: "外边在___，别忘了带___。", py: "Wàibian zài ___, bié wàngle dài ___.", a: "下雨 … 伞" },
          { zh: "明天是___天，我们去公园吧。", py: "Míngtiān shì ___ tiān, wǒmen qù gōngyuán ba.", a: "晴" }
        ]
      },
      {
        type: "translate",
        title: "Translate into Chinese",
        instructions: "Write your answer in characters.",
        items: [
          { q: "Which season do you like best?", a: "你最喜欢哪个季节？" },
          { q: "It's sunny today, but it will rain tomorrow.", a: "今天是晴天，但是明天会下雨。" },
          { q: "In summer I often go swimming.", a: "夏天我常常去游泳。" },
          { q: "What's the weather like in your city in winter?", a: "你们城市的冬天天气怎么样？" }
        ]
      }
    ]
  },
  {
    id: "characters-hsk3",
    no: "26",
    title: "HSK 3 Characters",
    zh: "三级汉字",
    level: "HSK 3",
    skill: "Writing",
    minutes: 25,
    summary: "Trace and copy ten HSK 3 characters: the four directions 东南西北 and nature words like 风, 河, 海 and 树.",
    sections: [
      {
        type: "grid",
        title: "Trace, then write",
        instructions: "Trace the grey characters, then write the character on your own in the empty boxes. Watch the stroke order.",
        items: [
          { zh: "东", py: "dōng", en: "east", strokes: 5 },
          { zh: "南", py: "nán", en: "south", strokes: 9 },
          { zh: "西", py: "xī", en: "west", strokes: 6 },
          { zh: "北", py: "běi", en: "north", strokes: 5 },
          { zh: "风", py: "fēng", en: "wind", strokes: 4 },
          { zh: "冰", py: "bīng", en: "ice", strokes: 6 },
          { zh: "河", py: "hé", en: "river", strokes: 8 },
          { zh: "海", py: "hǎi", en: "sea", strokes: 10 },
          { zh: "树", py: "shù", en: "tree", strokes: 9 },
          { zh: "草", py: "cǎo", en: "grass", strokes: 9 }
        ]
      },
      {
        type: "translate",
        title: "Spot the radical",
        instructions: "Which characters above have the water radical 氵? Which one has the grass radical 艹?",
        items: [
          { q: "water 氵", a: "河, 海 (冰 has 冫, the ice radical)" },
          { q: "grass 艹", a: "草 (and 茶, 菜 from earlier papers)" }
        ]
      },
      {
        type: "translate",
        title: "Build a word",
        instructions: "Write the two-character word using a character from above.",
        items: [
          { q: "thing (? + 西)", a: "东西" },
          { q: "the south (? + 方)", a: "南方" },
          { q: "ice water (? + 水)", a: "冰水" },
          { q: "Beijing (? + 京)", a: "北京" }
        ]
      }
    ]
  },
  {
    id: "bei",
    no: "27",
    title: "The Passive with 被",
    zh: "“被”字句",
    level: "HSK 3",
    skill: "Grammar",
    minutes: 25,
    summary: "Form passive sentences with 被, express unexpected or unfortunate outcomes, and switch between active, 把 and 被 structures.",
    sections: [
      {
        type: "fill",
        title: "Fill the gap: 被, 没, or 让/叫",
        instructions: "Pattern: Receiver + 被 (+ Doer) + Verb + other element. Fill each blank with the right word from the box.",
        bank: ["被", "没", "叫", "让"],
        items: [
          { zh: "我的手机___小偷偷走了。", py: "Wǒ de shǒujī ___ xiǎotōu tōu zǒu le.", a: "被" },
          { zh: "桌子上的蛋糕___弟弟吃了。", py: "Zhuōzi shang de dàngāo ___ dìdi chī le.", a: "被" },
          { zh: "那张电影票___被他拿走，还在我这儿。", py: "Nà zhāng diànyǐng piào ___ bèi tā ná zǒu, hái zài wǒ zhèr.", a: "没" },
          { zh: "自行车被大雨淋___了。", py: "Zìxíngchē bèi dàyǔ lín ___ le.", a: "湿" },
          { zh: "我的杯子不知被谁弄___了。", py: "Wǒ de bēizi bù zhī bèi shéi nòng ___ le.", a: "坏" }
        ]
      },
      {
        type: "translate",
        title: "Rewrite into a 被 sentence",
        instructions: "Turn the active or 把 sentence into a passive sentence with 被.",
        items: [
          { q: "小偷偷走了他的钱包。", a: "他的钱包被小偷偷走了。" },
          { q: "大雨淋湿了我们的衣服。", a: "我们的衣服被大雨淋湿了。" },
          { q: "猫吃了桌子上的鱼。", a: "桌子上的鱼被猫吃了。" },
          { q: "我把那杯牛奶喝光了。", a: "那杯牛奶被我喝光了。" },
          { q: "他没打破那个花瓶。", a: "那个花瓶没被他打破。 (没 goes before 被)" }
        ]
      },
      {
        type: "translate",
        title: "Spot the mistake",
        instructions: "Each sentence has one common mistake. Write the corrected sentence.",
        items: [
          { q: "我的自行车被偷。", a: "我的自行车被偷了。 (the verb needs an ending like 了 or a complement)" },
          { q: "衣服被我没弄脏。", a: "衣服没被我弄脏。 (negation 没 must go before 被)" },
          { q: "蛋糕被吃了我。", a: "蛋糕被我吃了。 (pattern: 被 + doer + verb, not verb + doer)" },
          { q: "今天早上我被他听见了这首歌。", a: "这首歌被他听见了。 (verbs of perception like 听见 / 看见 take the object as subject)" }
        ]
      },
      {
        type: "translate",
        title: "Translate into Chinese",
        instructions: "Use a 被 sentence for each translation.",
        items: [
          { q: "My keys were taken away by someone.", a: "我的钥匙被别人拿走了。" },
          { q: "The apple was eaten by the dog.", a: "苹果被狗吃了。" },
          { q: "His glasses were broken by his younger brother.", a: "他的眼镜被弟弟弄坏了 / 打破了。" },
          { q: "The luggage wasn't lost by the airline.", a: "行李没被弄丢。" }
        ]
      }
    ]
  },
  {
    id: "youdianr-yidianr",
    no: "28",
    title: "A Bit: 有点儿 vs 一点儿",
    zh: "有点儿和一点儿",
    level: "HSK 2",
    skill: "Grammar",
    minutes: 20,
    summary: "Master one of Mandarin's most common traps: 有点儿 goes before adjectives (usually showing complaint), while 一点儿 goes after verbs or adjectives.",
    sections: [
      {
        type: "fill",
        title: "Choose 有点儿 or 一点儿",
        instructions: "Fill in each gap with 有点儿 (before negative adjective) or 一点儿 (after verb or adjective).",
        bank: ["有点儿", "一点儿"],
        items: [
          { zh: "今天外边___冷，多穿件衣服吧。", py: "Jīntiān wàibian ___ lěng, duō chuān jiàn yīfu ba.", a: "有点儿" },
          { zh: "请你说慢___，我听不懂。", py: "Qǐng nǐ shuō màn ___, wǒ tīng bù dǒng.", a: "一点儿" },
          { zh: "这件毛衣___贵，有没有便宜___的？", py: "Zhè jiàn máoyī ___ guì, yǒu méiyǒu piányi ___ de?", a: "有点儿 … 一点儿" },
          { zh: "我嗓子疼，想喝___热水。", py: "Wǒ sǎngzi téng, xiǎng hē ___ rèshuǐ.", a: "一点儿" },
          { zh: "我今天___累，晚上不想去看电影了。", py: "Wǒ jīntiān ___ lèi, wǎnshang bù xiǎng qù kàn diànyǐng le.", a: "有点儿" },
          { zh: "快___，我们快要迟到了！", py: "Kuài ___, wǒmen kuàiyào chídào le!", a: "一点儿" }
        ]
      },
      {
        type: "match",
        title: "Match the phrase to the English meaning",
        instructions: "Notice where 有点儿 or 一点儿 sits in each sentence.",
        items: [
          { zh: "这双鞋有点儿大。", py: "Zhè shuāng xié yǒudiǎnr dà.", a: "These shoes are slightly too big (displeased)." },
          { zh: "有没有大一点儿的？", py: "Yǒu méiyǒu dà yìdiǎnr de?", a: "Do you have ones that are slightly bigger?" },
          { zh: "我想买一点儿水果。", py: "Wǒ xiǎng mǎi yìdiǎnr shuǐguǒ.", a: "I'd like to buy a little fruit." },
          { zh: "他今天有点儿不舒服。", py: "Tā jīntiān yǒudiǎnr bù shūfu.", a: "He feels a bit unwell today." },
          { zh: "请声音大一点儿。", py: "Qǐng shēngyīn dà yìdiǎnr.", a: "Please be a little bit louder." },
          { zh: "这道题有点儿难。", py: "Zhè dào tí yǒudiǎnr nán.", a: "This question is a bit difficult." }
        ]
      },
      {
        type: "translate",
        title: "Fix the mistake",
        instructions: "Correct the misplaced 有点儿 or 一点儿 in each sentence.",
        items: [
          { q: "我今天一点儿累。 (I'm a bit tired today)", a: "我今天有点儿累。 (有点儿 goes before adjectives)" },
          { q: "请说一点儿慢。 (Please speak a bit slower)", a: "请说慢一点儿。 (一点儿 goes after the adjective to mean 'a bit more')" },
          { q: "这个菜好吃有点儿。 (This dish is a bit delicious)", a: "这个菜很好吃。 (有点儿 is usually for negative feelings, not compliments!)" },
          { q: "我要买有点儿面包。 (I want to buy a little bread)", a: "我要买一点儿面包。 (verb + 一点儿 + noun)" }
        ]
      },
      {
        type: "translate",
        title: "Translate into Chinese",
        instructions: "Use either 有点儿 or 一点儿 correctly.",
        items: [
          { q: "It's a little bit cold today.", a: "今天有点儿冷。" },
          { q: "Could you walk a bit faster?", a: "请你走快一点儿。" },
          { q: "I'd like to have a little coffee.", a: "我想喝一点儿咖啡。" },
          { q: "This computer is a bit expensive.", a: "这台电脑有点儿贵。" }
        ]
      }
    ]
  },
  {
    id: "shi-de",
    no: "29",
    title: "The 是……的 Construction",
    zh: "“是……的”句",
    level: "HSK 2",
    skill: "Grammar",
    minutes: 20,
    summary: "When an action has already occurred, use 是……的 to zoom in on the time, place, manner, or person. Never mix it with 了!",
    sections: [
      {
        type: "match",
        title: "What is being emphasized?",
        instructions: "Match each sentence with the element it emphasizes.",
        items: [
          { zh: "我是昨天到北京的。", py: "Wǒ shì zuótiān dào Běijīng de.", a: "Time (when)" },
          { zh: "我们是在大学认识的。", py: "Wǒmen shì zài dàxué rènshi de.", a: "Place (where)" },
          { zh: "他是坐高铁来的。", py: "Tā shì zuò gāotiě lái de.", a: "Manner / Transport (how)" },
          { zh: "这本字典是他买的。", py: "Zhè běn zìdiǎn shì tā mǎi de.", a: "Person / Agent (who)" },
          { zh: "我是跟朋友一起来的。", py: "Wǒ shì gēn péngyou yìqǐ lái de.", a: "Company (with whom)" },
          { zh: "他不是一个人去的。", py: "Tā bú shì yí ge rén qù de.", a: "Negative emphasis (not alone)" }
        ]
      },
      {
        type: "translate",
        title: "Rewrite with 是……的",
        instructions: "Rewrite each sentence using 是……的 to emphasize the underlined detail in brackets.",
        items: [
          { q: "他去年九月来中国。 (emphasize: 去年九月)", a: "他是去年九月来中国的。" },
          { q: "我在网上买了这个包。 (emphasize: 在网上)", a: "这个包我是在网上买的。 / 我是在网上买这个包的。" },
          { q: "他们坐飞机去上海。 (emphasize: 坐飞机)", a: "他们是坐飞机去上海的。" },
          { q: "谁写的这个汉字？ (emphasize: 谁)", a: "这个汉字是谁写的？" }
        ]
      },
      {
        type: "translate",
        title: "Find the mistake",
        instructions: "Find and fix the error in each 是……的 sentence.",
        items: [
          { q: "我是昨天来了学校的。", a: "我是昨天来学校的。 (never put 了 inside 是……的)" },
          { q: "你什么时候是来的？", a: "你是什么时候来的？ (是 must go right in front of the emphasized phrase)" },
          { q: "他不是坐火车来。", a: "他不是坐火车来的。 (don't forget 的 at the end)" },
          { q: "我明天是去看电影的。", a: "我明天去看电影。 (是……的 is for past completed actions, not tomorrow)" }
        ]
      },
      {
        type: "translate",
        title: "Translate into Chinese",
        instructions: "Use the 是……的 structure for each translation.",
        items: [
          { q: "I came to London in 2020.", a: "我是2020年来伦敦的。" },
          { q: "Where did you buy this coat?", a: "你这件大衣是在哪儿买的？" },
          { q: "How did you get here? — I came by bike.", a: "你是在怎么来的？ — 我是骑自行车来的。" },
          { q: "This cake was made by my mom.", a: "这个蛋糕是我妈妈做的。" }
        ]
      }
    ]
  }
];
