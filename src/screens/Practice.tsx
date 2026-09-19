import { useEffect, useMemo, useState } from "react";
import { vocab, byCategory, categories, shuffle } from "../data/curriculum";
import { speakJapanese } from "../lib/speech";
import { useProgress } from "../lib/progress";
import { Button, Card, Mascot } from "../components/ui";
import { navigate } from "../lib/hash";

export function Practice() {
  const { p, addXp } = useProgress();
  const review = useMemo(() => {
    const missed = vocab.filter((v) => p.wrongIds.includes(v.id));
    return missed.length ? missed : shuffle(vocab).slice(0, 12);
  }, [p.wrongIds]);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [mode, setMode] = useState<"cards" | "listen" | "browse">("cards");
  const card = review[i % Math.max(review.length, 1)];
  const listenOptions = useMemo(() => {
    if (!card) return [];
    const others = shuffle(byCategory(card.category).filter((x) => x.id !== card.id)).slice(0, 3);
    return shuffle([card, ...others]);
  }, [card]);

  useEffect(() => {
    if (mode === "listen" && card) speakJapanese(card.jp);
  }, [mode, card]);

  function know() {
    addXp(2);
    setFlipped(false);
    setI((n) => n + 1);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="text-3xl font-black text-eel">Practice</h1>
      <p className="font-semibold text-wolf">Review words until they feel automatic.</p>

      <div className="mt-5 grid grid-cols-3 gap-2">
        {(
          [
            ["cards", "Flashcards"],
            ["listen", "Listening"],
            ["browse", "Word bank"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            onClick={() => setMode(id)}
            className={`rounded-2xl border-2 py-2.5 text-sm font-extrabold ${
              mode === id ? "border-feather bg-[#d7ffb8] text-eel" : "border-swan text-wolf"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {mode === "cards" && card && (
        <div className="mt-8">
          <button
            onClick={() => {
              setFlipped((f) => !f);
              speakJapanese(card.jp);
            }}
            className="w-full rounded-3xl border-2 border-b-4 border-swan bg-white px-6 py-12 text-center"
          >
            <div className="text-5xl">{card.emoji}</div>
            {!flipped ? (
              <>
                <div className="mt-4 font-jp text-4xl font-black text-eel">{card.jp}</div>
                <p className="mt-2 text-sm font-bold text-wolf">Tap to reveal</p>
              </>
            ) : (
              <>
                <div className="mt-4 text-2xl font-black text-eel">{card.en}</div>
                <div className="mt-1 font-jp text-lg font-bold text-wolf">
                  {card.hira} · {card.romaji}
                </div>
              </>
            )}
          </button>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <Button variant="white" onClick={() => { setFlipped(false); setI((n) => n + 1); }}>
              Still learning
            </Button>
            <Button onClick={know}>I know it</Button>
          </div>
        </div>
      )}

      {mode === "listen" && card && (
        <div className="mt-8 rounded-3xl border-2 border-swan p-8 text-center">
          <Mascot pose="think" className="mx-auto h-36 w-36" />
          <button
            onClick={() => speakJapanese(card.jp)}
            className="mx-auto mt-2 grid h-20 w-20 place-items-center rounded-full bg-macaw text-3xl text-white shadow-[0_6px_0_0_#1899d6] active:translate-y-1 active:shadow-none"
          >
            🔊
          </button>
          <p className="mt-4 font-bold text-wolf">What did Niko say?</p>
          <div className="mt-4 grid gap-2">
            {listenOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => {
                  if (opt.id === card.id) addXp(3);
                  setI((n) => n + 1);
                }}
                className="rounded-2xl border-2 border-swan px-4 py-3 font-extrabold text-eel hover:bg-polar"
              >
                {opt.en}
              </button>
            ))}
          </div>
        </div>
      )}

      {mode === "browse" && (
        <div className="mt-6 grid gap-3">
          {categories.map((c) => (
            <Card key={c.slug} className="overflow-hidden">
              <button className="flex w-full items-center gap-3 p-3 text-left" onClick={() => navigate(`/guidebook/${c.unit}?cat=${c.slug}`)}>
                <span className="grid h-12 w-12 place-items-center rounded-xl text-2xl" style={{ background: c.color }}>
                  {c.emoji}
                </span>
                <div className="flex-1">
                  <div className="font-black text-eel">{c.name}</div>
                  <div className="text-xs font-bold text-wolf">{c.jp} · 10 words</div>
                </div>
                <span className="text-hare">→</span>
              </button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
