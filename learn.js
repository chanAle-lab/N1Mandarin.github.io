/* Learning path content for English speakers learning Mandarin.
   Every Chinese example is spoken by the browser's zh-CN voice when tapped. */
window.LEARN = {
  /* 01 Sounds English doesn't have */
  sounds: [
    {
      sym: "Tones", zh: "声调",
      title: "The same syllable, different words",
      tip: "In English, pitch shows feeling (a question goes up). In Mandarin, pitch is part of the word: change the tone and you change the meaning. Exaggerate the tones at first and say each word on its own.",
      pairs: [["买", "mǎi", "to buy"], ["卖", "mài", "to sell"], ["汤", "tāng", "soup"], ["糖", "táng", "sugar"], ["问", "wèn", "to ask"], ["吻", "wěn", "to kiss"], ["睡觉", "shuìjiào", "to sleep"], ["水饺", "shuǐjiǎo", "dumplings"]]
    },
    {
      sym: "x vs sh", zh: "x / sh",
      title: "x is not 'sh'",
      tip: "For x, smile and press the tip of your tongue behind your lower teeth, then say 'see' and 'she' together. For sh, curl the tongue tip up and back. x is always followed by an i or ü sound.",
      pairs: [["西", "xī", "west"], ["诗", "shī", "poem"], ["小", "xiǎo", "small"], ["少", "shǎo", "few"], ["先", "xiān", "first"], ["山", "shān", "mountain"]]
    },
    {
      sym: "q vs ch", zh: "q / ch",
      title: "q is not 'k' or 'kw'",
      tip: "q sounds like 'ch' in 'cheese', with a strong puff of air and the tongue tip down behind the lower teeth. Pinyin ch has the tongue curled back. Never read q as the English 'qu' in 'queen'.",
      pairs: [["七", "qī", "seven"], ["吃", "chī", "to eat"], ["去", "qù", "to go"], ["处", "chù", "place"], ["桥", "qiáo", "bridge"], ["潮", "cháo", "damp"]]
    },
    {
      sym: "j vs zh", zh: "j / zh",
      title: "j is soft, zh is curled",
      tip: "j is like the 'j' in 'jeep' with the tongue flat and the tip down. zh is like the 'j' in 'judge' said with the tongue curled back. Neither has a puff of air.",
      pairs: [["鸡", "jī", "chicken"], ["知", "zhī", "to know"], ["见", "jiàn", "to see"], ["站", "zhàn", "to stand; station"], ["九", "jiǔ", "nine"], ["周", "zhōu", "week"]]
    },
    {
      sym: "ü", zh: "ü",
      title: "Say 'ee' with rounded lips",
      tip: "English has no ü. Say 'ee' and hold your tongue still, then round your lips as if to whistle. If your tongue moves back, it turns into 'oo' and a different word.",
      pairs: [["女", "nǚ", "female"], ["努", "nǔ", "to strive"], ["绿", "lǜ", "green"], ["路", "lù", "road"], ["雨", "yǔ", "rain"], ["五", "wǔ", "five"]]
    },
    {
      sym: "s vs sh", zh: "z c s / zh ch sh",
      title: "Flat tongue or curled tongue",
      tip: "z, c and s keep the tongue flat behind the top teeth. zh, ch and sh curl the tongue tip up towards the roof of the mouth. The two sets are different words, so 四 (four) and 十 (ten) are easy to mix up.",
      pairs: [["四", "sì", "four"], ["是", "shì", "to be"], ["早", "zǎo", "early"], ["找", "zhǎo", "to look for"], ["粗", "cū", "thick"], ["出", "chū", "to go out"]]
    },
    {
      sym: "b vs p", zh: "b / p · d / t · g / k",
      title: "It's about air, not voice",
      tip: "English b and p differ by voice. In Mandarin, b, d and g have no puff of air and p, t and k have a strong one. Hold a tissue in front of your mouth: it should only move for p, t and k.",
      pairs: [["爸", "bà", "dad"], ["怕", "pà", "to fear"], ["肚", "dù", "belly"], ["兔", "tù", "rabbit"], ["姑", "gū", "aunt"], ["哭", "kū", "to cry"]]
    },
    {
      sym: "r", zh: "r",
      title: "Mandarin r is not English r",
      tip: "Curl the tongue back as for sh, then add voice so it buzzes, a little like the 's' in 'pleasure'. Don't round your lips. Keep r and l apart: they make different words.",
      pairs: [["热", "rè", "hot"], ["乐", "lè", "happy"], ["日", "rì", "day; sun"], ["力", "lì", "strength"], ["让", "ràng", "to let"], ["浪", "làng", "wave"]]
    }
  ],

  /* 02 Phrase cards: [English, Chinese, pinyin, note] */
  phrases: {
    "Greetings": [
      ["Hello", "你好！", "Nǐ hǎo!", ""],
      ["How have you been lately?", "最近怎么样？", "Zuìjìn zěnmeyàng?", "Friends use this more than 你好吗."],
      ["Long time no see!", "好久不见！", "Hǎojiǔ bú jiàn!", ""],
      ["Nice to meet you.", "很高兴认识你。", "Hěn gāoxìng rènshi nǐ.", ""],
      ["What's your name?", "你叫什么名字？", "Nǐ jiào shénme míngzi?", ""],
      ["See you tomorrow!", "明天见！", "Míngtiān jiàn!", "The time comes first: 明天 + 见."]
    ],
    "Classroom": [
      ["I don't understand.", "我不懂。", "Wǒ bù dǒng.", ""],
      ["Please say that again.", "请再说一遍。", "Qǐng zài shuō yí biàn.", ""],
      ["Please speak a bit more slowly.", "请说慢一点儿。", "Qǐng shuō màn yìdiǎnr.", ""],
      ["How do you say this in Chinese?", "这个用中文怎么说？", "Zhège yòng Zhōngwén zěnme shuō?", ""],
      ["How do you read this character?", "这个字怎么读？", "Zhège zì zěnme dú?", ""],
      ["I have a question.", "我有一个问题。", "Wǒ yǒu yí ge wèntí.", ""]
    ],
    "Restaurant": [
      ["The menu, please.", "请给我菜单。", "Qǐng gěi wǒ càidān.", ""],
      ["I'd like a cup of tea.", "我要一杯茶。", "Wǒ yào yì bēi chá.", "Just say 我要: no need for 'can I have'."],
      ["Not spicy, please.", "不要辣的。", "Bú yào là de.", ""],
      ["I don't eat meat.", "我不吃肉。", "Wǒ bù chī ròu.", ""],
      ["This is delicious!", "太好吃了！", "Tài hǎochī le!", ""],
      ["The bill, please.", "买单！", "Mǎidān!", "Said to the waiter. 结账 jiézhàng also works."]
    ],
    "Shopping": [
      ["How much is this?", "这个多少钱？", "Zhège duōshao qián?", ""],
      ["That's too expensive!", "太贵了！", "Tài guì le!", ""],
      ["Can you make it a bit cheaper?", "便宜一点儿吧。", "Piányi yìdiǎnr ba.", ""],
      ["I'm just looking.", "我看看。", "Wǒ kànkan.", ""],
      ["I'll take this one.", "我要这个。", "Wǒ yào zhège.", ""],
      ["Can I pay by card?", "可以刷卡吗？", "Kěyǐ shuā kǎ ma?", ""]
    ],
    "Travel": [
      ["Where's the subway station?", "地铁站在哪儿？", "Dìtiě zhàn zài nǎr?", ""],
      ["How do I get to the airport?", "去机场怎么走？", "Qù jīchǎng zěnme zǒu?", ""],
      ["Where's the toilet?", "洗手间在哪儿？", "Xǐshǒujiān zài nǎr?", ""],
      ["Is it far?", "远吗？", "Yuǎn ma?", ""],
      ["Please take me here.", "请到这个地方。", "Qǐng dào zhège dìfang.", "Show the taxi driver the address."],
      ["One ticket to Beijing.", "一张去北京的票。", "Yì zhāng qù Běijīng de piào.", ""]
    ],
    "Being polite": [
      ["Thank you. / You're welcome.", "谢谢。不客气。", "Xièxie. Bú kèqi.", ""],
      ["Excuse me / Sorry (small things)", "不好意思。", "Bù hǎoyìsi.", "Softer than 对不起, which is for real apologies."],
      ["It doesn't matter.", "没关系。", "Méi guānxi.", ""],
      ["Sorry to trouble you.", "麻烦你了。", "Máfan nǐ le.", ""],
      ["Thanks for all your hard work.", "辛苦了！", "Xīnkǔ le!", ""],
      ["Please, after you.", "您先请。", "Nín xiān qǐng.", ""]
    ]
  },

  /* 03 Where the grammar differs */
  grammar: [
    { title: "Time words come before the verb", zh: "时间在前",
      en: "In English, 'tomorrow' and 'yesterday' usually go at the end. In Mandarin they go before the verb, either after the subject or at the very start.",
      wrong: "我去北京明天。", right: "我明天去北京。", gloss: "I tomorrow go Beijing → I'm going to Beijing tomorrow." },
    { title: "The place comes before the verb", zh: "在 + 地方 + 动词",
      en: "'I work in a bank' becomes 'I at bank work'. The 在 phrase goes before the action.",
      wrong: "我工作在银行。", right: "我在银行工作。", gloss: "I at bank work → I work in a bank." },
    { title: "No 是 with adjectives", zh: "形容词不用是",
      en: "English needs 'am / is / are' before an adjective. Mandarin doesn't: use 很 as a link. In a plain sentence, 很 doesn't really mean 'very'.",
      wrong: "我是忙。", right: "我很忙。", gloss: "I (very) busy → I'm busy." },
    { title: "Verbs never change", zh: "动词没有时态",
      en: "There is no went, goes or going. Time words show when. 了 marks a finished action, not 'the past', so habits don't take it.",
      wrong: "我每天喝了咖啡。", right: "我每天喝咖啡。", gloss: "I every day drink coffee → I drink coffee every day." },
    { title: "Numbers need a measure word", zh: "量词",
      en: "You can't put a number straight in front of a noun. Use a measure word: 个 is the general one, 本 for books, 杯 for cups, 张 for flat things.",
      wrong: "三书", right: "三本书", gloss: "three (volume) book → three books." },
    { title: "Questions keep statement order", zh: "疑问句语序不变",
      en: "Don't move the question word to the front. Put it where the answer would go. For yes/no questions, add 吗 at the end and change nothing else.",
      wrong: "哪儿你去？", right: "你去哪儿？", gloss: "You go where? → Where are you going?" },
    { title: "Two words for 'not'", zh: "不 / 没",
      en: "不 is for now, the future, habits and wishes. 没 is for things that didn't happen, and it is the only way to say 'not have' (没有).",
      wrong: "我昨天不去。", right: "我昨天没去。", gloss: "I yesterday not go → I didn't go yesterday." },
    { title: "No plural -s", zh: "名词没有复数",
      en: "Nouns don't change. 们 is only for people, and it is never used with a number.",
      wrong: "三个学生们", right: "三个学生", gloss: "three (person) student → three students." },
    { title: "The describing part goes first", zh: "的 + 名词",
      en: "English says 'the capital of China' or 'the book I bought'. Mandarin always puts the description before the noun and joins them with 的.",
      wrong: "首都的中国", right: "中国的首都", gloss: "China's capital → the capital of China." },
    { title: "Say yes by repeating the verb", zh: "用动词回答",
      en: "There isn't one word for 'yes'. Answer with the verb from the question, or 不 + the verb for 'no'. 是 only means 'yes' when the question uses 是.",
      wrong: "你去吗？ — 是。", right: "你去吗？ — 去。/ 不去。", gloss: "Are you going? Going. / Not going." },
    { title: "A bit too much vs a bit more: 有点儿 / 一点儿", zh: "有点儿 vs 一点儿",
      en: "有点儿 goes BEFORE adjectives and expresses mild dissatisfaction ('a bit too cold/expensive'). 一点儿 goes AFTER adjectives ('a bit more/cheaper') or verbs ('a little water').",
      wrong: "这件衣服一点儿贵，请便宜有点儿。", right: "这件衣服有点儿贵，请便宜一点儿。", gloss: "This coat is a bit too expensive, please make it a bit cheaper." },
    { title: "Emphasize when, where or how: 是……的", zh: "是……的 句型",
      en: "When an action has already happened, use 是……的 to focus on the time, place, manner or person. Never use 了 inside this pattern.",
      wrong: "我是昨天来了中国的。", right: "我是昨天来中国的。", gloss: "I came to China yesterday (focusing on 'yesterday')." },
    { title: "The passive voice: 被", zh: "“被”字句",
      en: "Put the receiver of the action first, followed by 被 and the doer. It usually describes an unfortunate or unexpected outcome.",
      wrong: "我的自行车偷了。", right: "我的自行车被偷了。", gloss: "My bicycle was stolen (not 'my bicycle stole')." }
  ],

  /* 04 Common English-speaker mistakes */
  mistakes: [
    ["我是饿。", "我饿了。", "Hungry is an adjective, so no 是. 了 shows that it's a new situation: I've become hungry."],
    ["我有二十岁。", "我二十岁。", "Don't use 有 (like French and Spanish) or 是. Just say the age."],
    ["我是英国。", "我是英国人。", "英国 is the country. Add 人 for nationality: 英国人, 美国人, 中国人."],
    ["我叫是 Tom。", "我叫 Tom。", "叫 already means 'am called'. Don't add 是."],
    ["二个人", "两个人", "Before a measure word, 2 is 两, not 二: 两个, 两本, 两杯."],
    ["我可以有一杯咖啡吗？", "我要一杯咖啡。", "'Can I have…' doesn't translate. Ordering with 我要 or 请给我 is normal and polite."],
    ["我是满。", "我吃饱了。", "'I'm full' after a meal is 吃饱了: eaten until full."],
    ["有一个好时间！", "玩得开心！", "'Have a good time' doesn't work word for word. Wish someone fun with 玩得开心."],
    ["我看你明天。", "明天见！", "'See you tomorrow' is 明天见. 看 means 'watch' or 'look at'."],
    ["他是很高。", "他很高。", "Again, no 是 before an adjective. 很 does the linking."],
    ["我很喜欢中国菜很多。", "我非常喜欢中国菜。", "Don't add 很多 at the end for 'a lot'. Make the adverb in front stronger: 非常 or 特别."],
    ["我去了北京去年。", "我去年去了北京。", "The time word moves to the front, before the verb."],
    ["这件衣服一点儿贵。", "这件衣服有点儿贵。", "Before an adjective, use 有点儿 to mean 'a bit too...'. 一点儿 goes after the adjective."],
    ["我是坐高铁来了北京的。", "我是坐高铁来北京的。", "Don't put 了 inside the 是……的 emphasis pattern."],
    ["蛋糕被我不小心吃。", "蛋糕被我不小心吃了。", "In a 被 sentence, the verb must have an aspect marker (like 了) or a result complement."]
  ],

  /* 05 Quick quiz: [question, options, correct index, explanation] */
  quiz: [
    ["How do you say 'I'm very busy'?", ["我是很忙。", "我很忙。", "我忙是。"], 1, "Adjectives don't take 是. 很 links the subject and the adjective."],
    ["How do you say 'I'm going to Beijing tomorrow'?", ["我去北京明天。", "明天我北京去。", "我明天去北京。"], 2, "Time comes before the verb, and the place comes after 去."],
    ["How do you say 'three books'?", ["三书", "三个书", "三本书"], 2, "A number needs a measure word. Books use 本."],
    ["How do you say 'I didn't go yesterday'?", ["我昨天不去。", "我昨天没去。", "我没去昨天。"], 1, "Use 没 for something that didn't happen, and put the time word before the verb."],
    ["How do you say 'Where are you going?'", ["哪儿你去？", "你去哪儿？", "你去哪儿吗？"], 1, "The question word stays where the answer would go. Don't add 吗 when you already have a question word."],
    ["How do you say 'two people'?", ["二个人", "两个人", "两人们"], 1, "Use 两 before a measure word. Don't use 们 with a number."],
    ["How do you say 'I'm 25'?", ["我有二十五岁。", "我二十五岁。", "我二十五年。"], 1, "Just say the age with 岁. No 有 and no 是."],
    ["How do you say 'I work in a bank'?", ["我在银行工作。", "我工作在银行。", "我银行工作。"], 0, "The 在 + place phrase goes before the verb."],
    ["Which syllable means 'to buy'?", ["mǎi", "mài", "māi"], 0, "买 mǎi (3rd tone) is 'to buy'. 卖 mài (4th tone) is 'to sell'."],
    ["你喜欢喝茶吗？ How do you answer 'Yes'?", ["是。", "喜欢。", "有。"], 1, "Answer with the verb from the question: 喜欢 for yes, 不喜欢 for no."],
    ["How do you say 'This pair of shoes is a bit small'?", ["这双鞋一点儿小。", "这双鞋有点儿小。", "这双鞋有小一点儿。"], 1, "Use 有点儿 before an adjective to show a slight complaint or excess."],
    ["How do you say 'I came to Beijing by train'?", ["我是坐火车来北京的。", "我是坐火车来了北京的。", "我坐火车是来北京的。"], 0, "Use 是……的 to emphasize past details like transport. Do not include 了 inside."],
    ["How do you say 'My wallet was stolen'?", ["我的钱包偷了。", "我的钱包被偷了。", "我的钱包把偷了。"], 1, "Use 被 for passive voice when something unexpected or unfortunate happens to the subject."]
  ]
};
