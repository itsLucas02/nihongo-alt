import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { categories } from "../data/curriculum";
import { setMuted } from "./sound";

const KEY = "nihongo-progress-v1";

export type Progress = {
  name: string;
  xp: number;
  gems: number;
  streak: number;
  lastPlayed: string;
  goal: number;
  crowns: Record<string, number>;
  wrongIds: string[];
  xpToday: number;
  xpDate: string;
  onboarded: boolean;
  sound: boolean;
  league: string;
};

const today = () => new Date().toISOString().slice(0, 10);

function defaultProgress(): Progress {
  return {
    name: "",
    xp: 0,
    gems: 0,
    streak: 0,
    lastPlayed: "",
    goal: 20,
    crowns: Object.fromEntries(categories.map((c) => [c.slug, 0])),
    wrongIds: [],
    xpToday: 0,
    xpDate: today(),
    onboarded: false,
    sound: true,
    league: "Bronze",
  };
}

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return defaultProgress();
    return { ...defaultProgress(), ...JSON.parse(raw) };
  } catch {
    return defaultProgress();
  }
}

function leagueFor(xp: number) {
  if (xp >= 800) return "Ruby";
  if (xp >= 500) return "Sapphire";
  if (xp >= 280) return "Gold";
  if (xp >= 120) return "Silver";
  return "Bronze";
}

type Ctx = {
  p: Progress;
  setP: (fn: (prev: Progress) => Progress) => void;
  addXp: (n: number) => void;
  completeLesson: (slug: string, perfect: boolean, missed: string[]) => void;
  markPlayed: () => void;
};

const ProgressContext = createContext<Ctx | null>(null);

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [p, setState] = useState<Progress>(() =>
    typeof window === "undefined" ? defaultProgress() : load(),
  );

  useEffect(() => {
    const t = today();
    setState((prev) => {
      let next = { ...prev };
      if (next.xpDate !== t) {
        next = { ...next, xpDate: t, xpToday: 0 };
      }
      if (next.lastPlayed) {
        const last = new Date(next.lastPlayed);
        const now = new Date(t);
        const diff = Math.round((+now - +last) / 86400000);
        if (diff > 1) next = { ...next, streak: 0 };
      }
      return next;
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(p));
  }, [p]);

  useEffect(() => {
    setMuted(!p.sound);
  }, [p.sound]);

  const setP = (fn: (prev: Progress) => Progress) => setState(fn);

  const value = useMemo<Ctx>(
    () => ({
      p,
      setP,
      addXp: (n) =>
        setState((prev) => {
          const t = today();
          const xpToday = prev.xpDate === t ? prev.xpToday + n : n;
          const xp = prev.xp + n;
          return {
            ...prev,
            xp,
            xpToday,
            xpDate: t,
            gems: prev.gems + Math.max(1, Math.floor(n / 10)),
            league: leagueFor(xp),
          };
        }),
      completeLesson: (slug, perfect, missed) =>
        setState((prev) => {
          const t = today();
          let streak = prev.streak;
          if (prev.lastPlayed !== t) {
            const last = prev.lastPlayed ? new Date(prev.lastPlayed) : null;
            const diff = last ? Math.round((+new Date(t) - +last) / 86400000) : 1;
            streak = diff === 1 ? prev.streak + 1 : 1;
          }
          const current = prev.crowns[slug] ?? 0;
          const crowns = {
            ...prev.crowns,
            [slug]: Math.min(3, Math.max(current, perfect ? Math.max(2, current + 1) : current + 1 || 1)),
          };
          const xpGain = perfect ? 20 : 12;
          const xp = prev.xp + xpGain;
          return {
            ...prev,
            streak,
            lastPlayed: t,
            crowns,
            xp,
            xpToday: prev.xpDate === t ? prev.xpToday + xpGain : xpGain,
            xpDate: t,
            gems: prev.gems + (perfect ? 15 : 8),
            league: leagueFor(xp),
            wrongIds: Array.from(new Set([...prev.wrongIds, ...missed])).slice(-40),
          };
        }),
      markPlayed: () =>
        setState((prev) => ({ ...prev, lastPlayed: prev.lastPlayed || today() })),
    }),
    [p],
  );

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress");
  return ctx;
}
