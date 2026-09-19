export type Vocab = {
  id: string;
  category: string;
  jp: string;
  hira: string;
  romaji: string;
  en: string;
  emoji: string;
};

export type Category = {
  slug: string;
  name: string;
  jp: string;
  emoji: string;
  color: string;
  dark: string;
  desc: string;
  photo: string;
  difficulty: "Easy" | "Medium";
  unit: number;
};

export const categories: Category[] = [
  {
    slug: "greetings",
    name: "Greetings",
    jp: "あいさつ",
    emoji: "🎌",
    color: "#1CB0F6",
    dark: "#1899D6",
    desc: "Say hello like a local",
    photo:
      "https://images.pexels.com/photos/38150283/pexels-photo-38150283.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    difficulty: "Easy",
    unit: 1,
  },
  {
    slug: "numbers",
    name: "Numbers",
    jp: "すうじ",
    emoji: "🔢",
    color: "#FF9600",
    dark: "#E08600",
    desc: "Count from 1 to 100",
    photo:
      "https://images.pexels.com/photos/30829296/pexels-photo-30829296.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    difficulty: "Easy",
    unit: 1,
  },
  {
    slug: "colors",
    name: "Colors",
    jp: "いろ",
    emoji: "🎨",
    color: "#CE82FF",
    dark: "#A568CC",
    desc: "Paint your world in Japanese",
    photo:
      "https://images.pexels.com/photos/30617273/pexels-photo-30617273.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    difficulty: "Easy",
    unit: 1,
  },
  {
    slug: "food",
    name: "Food",
    jp: "たべもの",
    emoji: "🍣",
    color: "#FF4B4B",
    dark: "#EA2B2B",
    desc: "Order lunch with confidence",
    photo:
      "https://images.pexels.com/photos/13015753/pexels-photo-13015753.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    difficulty: "Medium",
    unit: 2,
  },
  {
    slug: "phrases",
    name: "Daily Phrases",
    jp: "にちじょう",
    emoji: "💬",
    color: "#58CC02",
    dark: "#46A302",
    desc: "Everyday expressions that stick",
    photo:
      "https://images.pexels.com/photos/26633730/pexels-photo-26633730.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    difficulty: "Medium",
    unit: 2,
  },
  {
    slug: "family",
    name: "Family",
    jp: "かぞく",
    emoji: "👨‍👩‍👧‍👦",
    color: "#FF86D0",
    dark: "#E06BB6",
    desc: "Talk about the people you love",
    photo:
      "https://images.pexels.com/photos/13803380/pexels-photo-13803380.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    difficulty: "Easy",
    unit: 2,
  },
  {
    slug: "animals",
    name: "Animals",
    jp: "どうぶつ",
    emoji: "🐕",
    color: "#CE822D",
    dark: "#A86824",
    desc: "From shiba to elephant",
    photo:
      "https://images.pexels.com/photos/16730750/pexels-photo-16730750.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    difficulty: "Easy",
    unit: 3,
  },
  {
    slug: "body",
    name: "Body Parts",
    jp: "からだ",
    emoji: "👤",
    color: "#2B70C9",
    dark: "#2358A0",
    desc: "Head, shoulders, あたま & かた",
    photo:
      "https://images.pexels.com/photos/8937482/pexels-photo-8937482.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    difficulty: "Easy",
    unit: 3,
  },
  {
    slug: "adjectives",
    name: "Adjectives",
    jp: "けいようし",
    emoji: "✨",
    color: "#FFC800",
    dark: "#E5A100",
    desc: "Describe anything around you",
    photo:
      "https://images.pexels.com/photos/15004291/pexels-photo-15004291.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    difficulty: "Medium",
    unit: 3,
  },
  {
    slug: "verbs",
    name: "Verbs",
    jp: "どうし",
    emoji: "🏃",
    color: "#1CB0F6",
    dark: "#1899D6",
    desc: "Action words that move you",
    photo:
      "https://images.pexels.com/photos/31385052/pexels-photo-31385052.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    difficulty: "Medium",
    unit: 3,
  },
];

export const units = [
  { id: 1, title: "Start with the basics", jp: "きそ", color: "#58CC02" },
  { id: 2, title: "Life in Japan", jp: "せいかつ", color: "#1CB0F6" },
  { id: 3, title: "Describe the world", jp: "せかい", color: "#CE82FF" },
];

export const vocab: Vocab[] = [
  { id: "g1", category: "greetings", jp: "こんにちは", hira: "こんにちは", romaji: "Konnichiwa", en: "Hello / Good afternoon", emoji: "👋" },
  { id: "g2", category: "greetings", jp: "おはようございます", hira: "おはようございます", romaji: "Ohayou gozaimasu", en: "Good morning (polite)", emoji: "🌅" },
  { id: "g3", category: "greetings", jp: "さようなら", hira: "さようなら", romaji: "Sayounara", en: "Goodbye", emoji: "👋" },
  { id: "g4", category: "greetings", jp: "こんばんは", hira: "こんばんは", romaji: "Konbanwa", en: "Good evening", emoji: "🌙" },
  { id: "g5", category: "greetings", jp: "おやすみなさい", hira: "おやすみなさい", romaji: "Oyasuminasai", en: "Good night", emoji: "😴" },
  { id: "g6", category: "greetings", jp: "はじめまして", hira: "はじめまして", romaji: "Hajimemashite", en: "Nice to meet you", emoji: "🤝" },
  { id: "g7", category: "greetings", jp: "よろしくおねがいします", hira: "よろしくおねがいします", romaji: "Yoroshiku onegaishimasu", en: "Please treat me well", emoji: "🙇" },
  { id: "g8", category: "greetings", jp: "また明日", hira: "またあした", romaji: "Mata ashita", en: "See you tomorrow", emoji: "📅" },
  { id: "g9", category: "greetings", jp: "おげんきですか", hira: "おげんきですか", romaji: "Ogenki desu ka", en: "How are you?", emoji: "💬" },
  { id: "g10", category: "greetings", jp: "いってきます", hira: "いってきます", romaji: "Ittekimasu", en: "I'm leaving (I'll be back)", emoji: "🚪" },

  { id: "n1", category: "numbers", jp: "一", hira: "いち", romaji: "Ichi", en: "One (1)", emoji: "1️⃣" },
  { id: "n2", category: "numbers", jp: "二", hira: "に", romaji: "Ni", en: "Two (2)", emoji: "2️⃣" },
  { id: "n3", category: "numbers", jp: "三", hira: "さん", romaji: "San", en: "Three (3)", emoji: "3️⃣" },
  { id: "n4", category: "numbers", jp: "四", hira: "よん", romaji: "Yon", en: "Four (4)", emoji: "4️⃣" },
  { id: "n5", category: "numbers", jp: "五", hira: "ご", romaji: "Go", en: "Five (5)", emoji: "5️⃣" },
  { id: "n6", category: "numbers", jp: "十", hira: "じゅう", romaji: "Juu", en: "Ten (10)", emoji: "🔟" },
  { id: "n7", category: "numbers", jp: "二十", hira: "にじゅう", romaji: "Nijuu", en: "Twenty (20)", emoji: "2️⃣" },
  { id: "n8", category: "numbers", jp: "五十", hira: "ごじゅう", romaji: "Gojuu", en: "Fifty (50)", emoji: "5️⃣" },
  { id: "n9", category: "numbers", jp: "七十", hira: "ななじゅう", romaji: "Nanajuu", en: "Seventy (70)", emoji: "7️⃣" },
  { id: "n10", category: "numbers", jp: "百", hira: "ひゃく", romaji: "Hyaku", en: "One hundred (100)", emoji: "💯" },

  { id: "c1", category: "colors", jp: "赤", hira: "あか", romaji: "Aka", en: "Red", emoji: "🔴" },
  { id: "c2", category: "colors", jp: "青", hira: "あお", romaji: "Ao", en: "Blue", emoji: "🔵" },
  { id: "c3", category: "colors", jp: "黄色", hira: "きいろ", romaji: "Kiiro", en: "Yellow", emoji: "🟡" },
  { id: "c4", category: "colors", jp: "緑", hira: "みどり", romaji: "Midori", en: "Green", emoji: "🟢" },
  { id: "c5", category: "colors", jp: "白", hira: "しろ", romaji: "Shiro", en: "White", emoji: "⚪" },
  { id: "c6", category: "colors", jp: "黒", hira: "くろ", romaji: "Kuro", en: "Black", emoji: "⚫" },
  { id: "c7", category: "colors", jp: "ピンク", hira: "ぴんく", romaji: "Pinku", en: "Pink", emoji: "🩷" },
  { id: "c8", category: "colors", jp: "オレンジ", hira: "おれんじ", romaji: "Orenji", en: "Orange", emoji: "🟠" },
  { id: "c9", category: "colors", jp: "紫", hira: "むらさき", romaji: "Murasaki", en: "Purple", emoji: "🟣" },
  { id: "c10", category: "colors", jp: "茶色", hira: "ちゃいろ", romaji: "Chairo", en: "Brown", emoji: "🟤" },

  { id: "f1", category: "food", jp: "ご飯", hira: "ごはん", romaji: "Gohan", en: "Rice / meal", emoji: "🍚" },
  { id: "f2", category: "food", jp: "寿司", hira: "すし", romaji: "Sushi", en: "Sushi", emoji: "🍣" },
  { id: "f3", category: "food", jp: "りんご", hira: "りんご", romaji: "Ringo", en: "Apple", emoji: "🍎" },
  { id: "f4", category: "food", jp: "ラーメン", hira: "らーめん", romaji: "Raamen", en: "Ramen noodles", emoji: "🍜" },
  { id: "f5", category: "food", jp: "水", hira: "みず", romaji: "Mizu", en: "Water", emoji: "💧" },
  { id: "f6", category: "food", jp: "お茶", hira: "おちゃ", romaji: "Ocha", en: "Green tea", emoji: "🍵" },
  { id: "f7", category: "food", jp: "パン", hira: "ぱん", romaji: "Pan", en: "Bread", emoji: "🍞" },
  { id: "f8", category: "food", jp: "肉", hira: "にく", romaji: "Niku", en: "Meat", emoji: "🥩" },
  { id: "f9", category: "food", jp: "卵", hira: "たまご", romaji: "Tamago", en: "Egg", emoji: "🥚" },
  { id: "f10", category: "food", jp: "魚", hira: "さかな", romaji: "Sakana", en: "Fish", emoji: "🐟" },

  { id: "p1", category: "phrases", jp: "ありがとう", hira: "ありがとう", romaji: "Arigatou", en: "Thank you", emoji: "🙏" },
  { id: "p2", category: "phrases", jp: "すみません", hira: "すみません", romaji: "Sumimasen", en: "Excuse me / Sorry", emoji: "🙇" },
  { id: "p3", category: "phrases", jp: "お願いします", hira: "おねがいします", romaji: "Onegaishimasu", en: "Please", emoji: "🙏" },
  { id: "p4", category: "phrases", jp: "いただきます", hira: "いただきます", romaji: "Itadakimasu", en: "Let's eat (before a meal)", emoji: "🍽️" },
  { id: "p5", category: "phrases", jp: "ごちそうさま", hira: "ごちそうさま", romaji: "Gochisousama", en: "Thanks for the meal", emoji: "😋" },
  { id: "p6", category: "phrases", jp: "どういたしまして", hira: "どういたしまして", romaji: "Douitashimashite", en: "You're welcome", emoji: "😊" },
  { id: "p7", category: "phrases", jp: "ごめんなさい", hira: "ごめんなさい", romaji: "Gomennasai", en: "I'm sorry", emoji: "😔" },
  { id: "p8", category: "phrases", jp: "はい", hira: "はい", romaji: "Hai", en: "Yes", emoji: "👍" },
  { id: "p9", category: "phrases", jp: "いいえ", hira: "いいえ", romaji: "Iie", en: "No", emoji: "👎" },
  { id: "p10", category: "phrases", jp: "大丈夫", hira: "だいじょうぶ", romaji: "Daijoubu", en: "I'm okay / It's alright", emoji: "💪" },

  { id: "fa1", category: "family", jp: "家族", hira: "かぞく", romaji: "Kazoku", en: "Family", emoji: "👨‍👩‍👧‍👦" },
  { id: "fa2", category: "family", jp: "母", hira: "はは", romaji: "Haha", en: "Mother", emoji: "👩" },
  { id: "fa3", category: "family", jp: "父", hira: "ちち", romaji: "Chichi", en: "Father", emoji: "👨" },
  { id: "fa4", category: "family", jp: "友達", hira: "ともだち", romaji: "Tomodachi", en: "Friend", emoji: "🤝" },
  { id: "fa5", category: "family", jp: "兄", hira: "あに", romaji: "Ani", en: "Older brother", emoji: "👦" },
  { id: "fa6", category: "family", jp: "姉", hira: "あね", romaji: "Ane", en: "Older sister", emoji: "👧" },
  { id: "fa7", category: "family", jp: "弟", hira: "おとうと", romaji: "Otouto", en: "Younger brother", emoji: "🧒" },
  { id: "fa8", category: "family", jp: "妹", hira: "いもうと", romaji: "Imouto", en: "Younger sister", emoji: "👶" },
  { id: "fa9", category: "family", jp: "祖母", hira: "そぼ", romaji: "Sobo", en: "Grandmother", emoji: "👵" },
  { id: "fa10", category: "family", jp: "祖父", hira: "そふ", romaji: "Sofu", en: "Grandfather", emoji: "👴" },

  { id: "a1", category: "animals", jp: "犬", hira: "いぬ", romaji: "Inu", en: "Dog", emoji: "🐕" },
  { id: "a2", category: "animals", jp: "猫", hira: "ねこ", romaji: "Neko", en: "Cat", emoji: "🐱" },
  { id: "a3", category: "animals", jp: "鳥", hira: "とり", romaji: "Tori", en: "Bird", emoji: "🐦" },
  { id: "a4", category: "animals", jp: "魚", hira: "さかな", romaji: "Sakana", en: "Fish", emoji: "🐠" },
  { id: "a5", category: "animals", jp: "うさぎ", hira: "うさぎ", romaji: "Usagi", en: "Rabbit", emoji: "🐰" },
  { id: "a6", category: "animals", jp: "馬", hira: "うま", romaji: "Uma", en: "Horse", emoji: "🐴" },
  { id: "a7", category: "animals", jp: "熊", hira: "くま", romaji: "Kuma", en: "Bear", emoji: "🐻" },
  { id: "a8", category: "animals", jp: "猿", hira: "さる", romaji: "Saru", en: "Monkey", emoji: "🐵" },
  { id: "a9", category: "animals", jp: "豚", hira: "ぶた", romaji: "Buta", en: "Pig", emoji: "🐷" },
  { id: "a10", category: "animals", jp: "象", hira: "ぞう", romaji: "Zou", en: "Elephant", emoji: "🐘" },

  { id: "b1", category: "body", jp: "頭", hira: "あたま", romaji: "Atama", en: "Head", emoji: "🧠" },
  { id: "b2", category: "body", jp: "目", hira: "め", romaji: "Me", en: "Eye", emoji: "👁️" },
  { id: "b3", category: "body", jp: "耳", hira: "みみ", romaji: "Mimi", en: "Ear", emoji: "👂" },
  { id: "b4", category: "body", jp: "手", hira: "て", romaji: "Te", en: "Hand", emoji: "✋" },
  { id: "b5", category: "body", jp: "鼻", hira: "はな", romaji: "Hana", en: "Nose", emoji: "👃" },
  { id: "b6", category: "body", jp: "口", hira: "くち", romaji: "Kuchi", en: "Mouth", emoji: "👄" },
  { id: "b7", category: "body", jp: "足", hira: "あし", romaji: "Ashi", en: "Foot / leg", emoji: "🦶" },
  { id: "b8", category: "body", jp: "肩", hira: "かた", romaji: "Kata", en: "Shoulder", emoji: "💪" },
  { id: "b9", category: "body", jp: "指", hira: "ゆび", romaji: "Yubi", en: "Finger", emoji: "☝️" },
  { id: "b10", category: "body", jp: "顔", hira: "かお", romaji: "Kao", en: "Face", emoji: "😊" },

  { id: "ad1", category: "adjectives", jp: "大きい", hira: "おおきい", romaji: "Ookii", en: "Big", emoji: "🐘" },
  { id: "ad2", category: "adjectives", jp: "小さい", hira: "ちいさい", romaji: "Chiisai", en: "Small", emoji: "🐭" },
  { id: "ad3", category: "adjectives", jp: "おいしい", hira: "おいしい", romaji: "Oishii", en: "Delicious", emoji: "😋" },
  { id: "ad4", category: "adjectives", jp: "かわいい", hira: "かわいい", romaji: "Kawaii", en: "Cute", emoji: "🥰" },
  { id: "ad5", category: "adjectives", jp: "楽しい", hira: "たのしい", romaji: "Tanoshii", en: "Fun", emoji: "🎉" },
  { id: "ad6", category: "adjectives", jp: "暑い", hira: "あつい", romaji: "Atsui", en: "Hot (weather)", emoji: "☀️" },
  { id: "ad7", category: "adjectives", jp: "寒い", hira: "さむい", romaji: "Samui", en: "Cold", emoji: "❄️" },
  { id: "ad8", category: "adjectives", jp: "高い", hira: "たかい", romaji: "Takai", en: "Expensive / tall", emoji: "💰" },
  { id: "ad9", category: "adjectives", jp: "安い", hira: "やすい", romaji: "Yasui", en: "Cheap", emoji: "🏷️" },
  { id: "ad10", category: "adjectives", jp: "難しい", hira: "むずかしい", romaji: "Muzukashii", en: "Difficult", emoji: "🧩" },

  { id: "v1", category: "verbs", jp: "食べる", hira: "たべる", romaji: "Taberu", en: "To eat", emoji: "🍽️" },
  { id: "v2", category: "verbs", jp: "飲む", hira: "のむ", romaji: "Nomu", en: "To drink", emoji: "🥤" },
  { id: "v3", category: "verbs", jp: "見る", hira: "みる", romaji: "Miru", en: "To see / watch", emoji: "👀" },
  { id: "v4", category: "verbs", jp: "行く", hira: "いく", romaji: "Iku", en: "To go", emoji: "🚶" },
  { id: "v5", category: "verbs", jp: "来る", hira: "くる", romaji: "Kuru", en: "To come", emoji: "🏃" },
  { id: "v6", category: "verbs", jp: "話す", hira: "はなす", romaji: "Hanasu", en: "To speak", emoji: "🗣️" },
  { id: "v7", category: "verbs", jp: "聞く", hira: "きく", romaji: "Kiku", en: "To listen / ask", emoji: "👂" },
  { id: "v8", category: "verbs", jp: "読む", hira: "よむ", romaji: "Yomu", en: "To read", emoji: "📖" },
  { id: "v9", category: "verbs", jp: "書く", hira: "かく", romaji: "Kaku", en: "To write", emoji: "✍️" },
  { id: "v10", category: "verbs", jp: "寝る", hira: "ねる", romaji: "Neru", en: "To sleep", emoji: "😴" },
];

export function byCategory(slug: string) {
  return vocab.filter((v) => v.category === slug);
}

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export type QuizItem =
  | {
      kind: "choice";
      prompt: string;
      hint?: string;
      speak?: string;
      vocab: Vocab;
      options: { label: string; jp?: string }[];
      answer: string;
      showJp?: boolean;
    }
  | {
      kind: "match";
      pairs: { left: string; right: string; speak?: string }[];
    };

export function buildLesson(slug: string): QuizItem[] {
  const items = shuffle(byCategory(slug));
  const pool = byCategory(slug);
  const lesson: QuizItem[] = [];

  items.forEach((v, i) => {
    const others = shuffle(pool.filter((x) => x.id !== v.id)).slice(0, 3);
    if (i % 4 === 0) {
      lesson.push({
        kind: "choice",
        prompt: "What does this mean?",
        speak: v.jp,
        vocab: v,
        showJp: true,
        options: shuffle([v, ...others]).map((x) => ({ label: x.en })),
        answer: v.en,
      });
    } else if (i % 4 === 1) {
      lesson.push({
        kind: "choice",
        prompt: "Select the Japanese for this",
        hint: v.en,
        vocab: v,
        options: shuffle([v, ...others]).map((x) => ({
          label: x.jp,
          jp: x.hira,
        })),
        answer: v.jp,
      });
    } else if (i % 4 === 2) {
      lesson.push({
        kind: "choice",
        prompt: "Tap what you hear",
        speak: v.jp,
        vocab: v,
        options: shuffle([v, ...others]).map((x) => ({ label: x.en })),
        answer: v.en,
      });
    } else {
      lesson.push({
        kind: "choice",
        prompt: "Which reading matches?",
        hint: v.jp,
        vocab: v,
        showJp: true,
        options: shuffle([v, ...others]).map((x) => ({
          label: `${x.hira}  ·  ${x.romaji}`,
        })),
        answer: `${v.hira}  ·  ${v.romaji}`,
      });
    }
  });

  const matchPool = shuffle(pool).slice(0, 4);
  lesson.splice(5, 0, {
    kind: "match",
    pairs: matchPool.map((v) => ({
      left: v.jp,
      right: v.en,
      speak: v.jp,
    })),
  });

  return lesson;
}

export const botNames = [
  "Aisha",
  "Hafiz",
  "Mei Lin",
  "Farah",
  "Kenji",
  "Siti",
  "Daniel",
  "Yuki",
  "Amir",
  "Sakura",
];
