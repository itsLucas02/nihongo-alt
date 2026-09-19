import { byCategory, categories, shuffle, type Vocab } from "../data/curriculum";

export type MpQuestion = {
  id: string;
  jp: string;
  hira: string;
  romaji: string;
  en: string;
  emoji: string;
  options: string[];
  answer: string;
};

export type Player = { id: string; name: string; score: number; bot?: boolean };

export type MpMsg =
  | { type: "hello"; pin: string }
  | { type: "join"; player: Player }
  | { type: "lobby"; players: Player[]; pin: string; topic: string }
  | { type: "start"; questions: MpQuestion[]; seconds: number }
  | { type: "question"; index: number; endsAt: number }
  | { type: "answer"; playerId: string; option: string; at: number }
  | { type: "reveal"; correct: string; scores: Player[] }
  | { type: "end"; scores: Player[] }
  | { type: "kick"; playerId: string };

export function roomChannel(pin: string) {
  return new BroadcastChannel(`nihongo-mp-${pin}`);
}

export function makeDeck(topic: string, count: number): MpQuestion[] {
  const pool =
    topic === "all"
      ? shuffle(categories.flatMap((c) => byCategory(c.slug)))
      : shuffle(byCategory(topic));
  return pool.slice(0, count).map((v) => toQ(v, pool));
}

function toQ(v: Vocab, pool: Vocab[]): MpQuestion {
  const others = shuffle(pool.filter((x) => x.id !== v.id)).slice(0, 3);
  const options = shuffle([v.en, ...others.map((o) => o.en)]);
  return {
    id: v.id,
    jp: v.jp,
    hira: v.hira,
    romaji: v.romaji,
    en: v.en,
    emoji: v.emoji,
    options,
    answer: v.en,
  };
}

export function randomPin() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

export const answerColors = [
  { bg: "#1CB0F6", dark: "#1899D6", shape: "◆" },
  { bg: "#FF9600", dark: "#E08600", shape: "●" },
  { bg: "#58CC02", dark: "#46A302", shape: "▲" },
  { bg: "#FF4B4B", dark: "#EA2B2B", shape: "■" },
];
