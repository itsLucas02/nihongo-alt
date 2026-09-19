import { useEffect, useMemo, useState } from "react";
import { buildLesson, getCategory } from "../data/curriculum";
import { navigate } from "../lib/hash";
import { useProgress } from "../lib/progress";
import { speakJapanese, stopSpeak } from "../lib/speech";
import { sfxComplete, sfxCorrect, sfxWrong } from "../lib/sound";
import { Button, Mascot } from "../components/ui";
import { cn } from "../utils/cn";

export function Quiz({ slug }: { slug: string }) {
  const cat = getCategory(slug);
  const { p, completeLesson } = useProgress();
  const items = useMemo(() => (cat ? buildLesson(slug) : []), [slug, cat]);
  const [i, setI] = useState(0);
  const [hearts, setHearts] = useState(5);
  const [selected, setSelected] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "right" | "wrong">("idle");
  const [missed, setMissed] = useState<string[]>([]);
  const [quit, setQuit] = useState(false);
  const [shake, setShake] = useState(false);
  const [matchSel, setMatchSel] = useState<{ side: "L" | "R"; value: string } | null>(null);
  const [matched, setMatched] = useState<string[]>([]);
  const [leftOrder, setLeftOrder] = useState<string[]>([]);
  const [rightOrder, setRightOrder] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const item = items[i];
  const total = items.length;
  const progress = ((i + (status !== "idle" || (item?.kind === "match" && matched.length === 4) ? 1 : 0)) / Math.max(total, 1)) * 100;

  useEffect(() => {
    if (item?.kind === "choice" && item.speak) speakJapanese(item.speak);
    if (item?.kind === "match") {
      setMatched([]);
      setMatchSel(null);
      setLeftOrder(item.pairs.map((x) => x.left).sort(() => Math.random() - 0.5));
      setRightOrder(item.pairs.map((x) => x.right).sort(() => Math.random() - 0.5));
    }
    setSelected(null);
    setStatus("idle");
    return () => stopSpeak();
  }, [i, item]);

  if (!cat) {
    return (
      <div className="grid min-h-screen place-items-center">
        <Button onClick={() => navigate("/learn")}>Back to learn</Button>
      </div>
    );
  }

  function check() {
    if (!item || item.kind !== "choice" || !selected) return;
    const ok = selected === item.answer;
    setStatus(ok ? "right" : "wrong");
    if (p.sound) (ok ? sfxCorrect : sfxWrong)();
    if (!ok) {
      setHearts((h) => Math.max(0, h - 1));
      setMissed((m) => [...m, item.vocab.id]);
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  }

  function next() {
    if (i >= total - 1) {
      if (p.sound) sfxComplete();
      completeLesson(slug, hearts === 5 && missed.length === 0, missed);
      setDone(true);
      return;
    }
    setI((n) => n + 1);
  }

  function onMatch(side: "L" | "R", value: string) {
    if (matched.includes(value)) return;
    if (!item || item.kind !== "match") return;
    if (!matchSel) {
      setMatchSel({ side, value });
      return;
    }
    if (matchSel.side === side) {
      setMatchSel({ side, value });
      return;
    }
    const pair = item.pairs.find(
      (p) =>
        (p.left === matchSel.value && p.right === value) ||
        (p.right === matchSel.value && p.left === value),
    );
    if (pair) {
      setMatched((m) => [...m, pair.left, pair.right]);
      setMatchSel(null);
      if (p.sound) sfxCorrect();
      speakJapanese(pair.speak || pair.left);
    } else {
      if (p.sound) sfxWrong();
      setHearts((h) => Math.max(0, h - 1));
      setShake(true);
      setTimeout(() => setShake(false), 400);
      setMatchSel(null);
    }
  }

  if (done) {
    return <CompleteOverlay slug={slug} hearts={hearts} missed={missed.length} />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="mx-auto flex w-full max-w-2xl items-center gap-3 px-4 py-4">
        <button
          onClick={() => setQuit(true)}
          className="grid h-10 w-10 place-items-center text-2xl font-black text-hare hover:text-eel"
          aria-label="Close"
        >
          ×
        </button>
        <div className="h-4 flex-1 overflow-hidden rounded-full bg-swan">
          <div className="h-full rounded-full bg-feather transition-all duration-500" style={{ width: `${progress}%` }} />
        </div>
        <div className="flex items-center gap-1 font-black text-cardinal">
          <span>❤</span>
          {hearts}
        </div>
      </div>

      <div className={cn("mx-auto flex w-full max-w-2xl flex-1 flex-col px-4 pb-4", shake && "shake")}>
        {item?.kind === "choice" && (
          <>
            <p className="text-xl font-black text-eel sm:text-2xl">{item.prompt}</p>
            <div className="mt-6 flex items-center gap-4">
              <Mascot pose={status === "wrong" ? "oops" : "think"} className="h-28 w-28 shrink-0 sm:h-36 sm:w-36" />
              <div className="relative flex-1 rounded-2xl border-2 border-swan px-4 py-3">
                <span className="absolute -left-2 top-5 h-4 w-4 rotate-45 border-b-2 border-l-2 border-swan bg-white" />
                {item.showJp ? (
                  <div>
                    <div className="font-jp text-3xl font-black text-eel sm:text-4xl">{item.vocab.jp}</div>
                    <div className="mt-1 text-sm font-bold text-wolf">
                      {item.vocab.hira} · {item.vocab.romaji}
                    </div>
                  </div>
                ) : (
                  <div className="text-xl font-black text-eel">{item.hint || "Listen carefully"}</div>
                )}
                {item.speak && (
                  <button
                    onClick={() => speakJapanese(item.speak!)}
                    className="mt-3 grid h-12 w-12 place-items-center rounded-2xl bg-macaw text-xl text-white shadow-[0_4px_0_0_#1899d6] active:translate-y-[3px] active:shadow-none"
                    aria-label="Play pronunciation"
                  >
                    🔊
                  </button>
                )}
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {item.options.map((opt, idx) => {
                const on = selected === opt.label;
                const reveal = status !== "idle";
                const correct = opt.label === item.answer;
                return (
                  <button
                    key={opt.label + idx}
                    disabled={status !== "idle"}
                    onClick={() => setSelected(opt.label)}
                    className={cn(
                      "rounded-2xl border-2 border-b-4 px-4 py-4 text-left font-extrabold transition",
                      !reveal && on && "border-macaw bg-[#ddf4ff] text-macaw",
                      !reveal && !on && "border-swan bg-white text-eel hover:bg-polar",
                      reveal && correct && "border-feather bg-[#d7ffb8] text-feather-dark",
                      reveal && on && !correct && "border-cardinal bg-[#ffdfe0] text-cardinal",
                      reveal && !on && !correct && "border-swan bg-white text-hare",
                    )}
                  >
                    <span className="mr-2 text-hare">{idx + 1}.</span>
                    <span className={opt.jp ? "font-jp text-lg" : ""}>{opt.label}</span>
                    {opt.jp && <span className="mt-1 block text-xs font-bold text-wolf">{opt.jp}</span>}
                  </button>
                );
              })}
            </div>
          </>
        )}

        {item?.kind === "match" && (
          <>
            <p className="text-xl font-black text-eel sm:text-2xl">Tap the matching pairs</p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="grid gap-3">
                {leftOrder.map((v) => (
                  <MatchChip
                    key={v}
                    label={v}
                    jp
                    done={matched.includes(v)}
                    active={matchSel?.value === v}
                    onClick={() => onMatch("L", v)}
                  />
                ))}
              </div>
              <div className="grid gap-3">
                {rightOrder.map((v) => (
                  <MatchChip
                    key={v}
                    label={v}
                    done={matched.includes(v)}
                    active={matchSel?.value === v}
                    onClick={() => onMatch("R", v)}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div
        className={cn(
          "border-t-2 px-4 py-4",
          status === "right" && "border-[#9de25f] bg-[#d7ffb8]",
          status === "wrong" && "border-[#ff9b9b] bg-[#ffdfe0]",
          status === "idle" && "border-swan bg-white",
        )}
      >
        <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-4">
          {status === "idle" && item?.kind === "choice" && (
            <>
              <Button variant="ghost" onClick={() => { setStatus("wrong"); setHearts((h) => Math.max(0, h - 1)); setMissed((m) => item.kind === "choice" ? [...m, item.vocab.id] : m); }}>
                Skip
              </Button>
              <Button className="min-w-[160px]" disabled={!selected} onClick={check}>
                Check
              </Button>
            </>
          )}
          {status === "idle" && item?.kind === "match" && (
            <Button className="ml-auto min-w-[160px]" disabled={matched.length < (item.pairs.length * 2)} onClick={next}>
              Continue
            </Button>
          )}
          {status === "right" && (
            <>
              <div>
                <p className="text-xl font-black text-feather-dark">いいね！ Nice!</p>
                <p className="text-sm font-bold text-eel">よくできました</p>
              </div>
              <Button className="min-w-[160px]" onClick={next}>
                Continue
              </Button>
            </>
          )}
          {status === "wrong" && item?.kind === "choice" && (
            <>
              <div>
                <p className="text-xl font-black text-cardinal">Correct solution:</p>
                <p className="font-extrabold text-eel">{item.answer}</p>
              </div>
              <Button variant="danger" className="min-w-[160px]" onClick={next}>
                Continue
              </Button>
            </>
          )}
        </div>
      </div>

      {quit && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-center">
            <Mascot pose="oops" className="mx-auto h-32 w-32" />
            <h3 className="text-2xl font-black text-eel">Wait, don't go!</h3>
            <p className="mt-1 font-semibold text-wolf">If you quit now, you'll lose your progress in this lesson.</p>
            <Button className="mt-5 w-full" onClick={() => setQuit(false)}>
              Keep learning
            </Button>
            <Button variant="ghost" className="mt-2 w-full text-cardinal" onClick={() => navigate("/learn")}>
              End session
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function MatchChip({
  label,
  jp,
  done,
  active,
  onClick,
}: {
  label: string;
  jp?: boolean;
  done: boolean;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      disabled={done}
      onClick={onClick}
      className={cn(
        "rounded-2xl border-2 border-b-4 px-3 py-3 font-extrabold",
        jp && "font-jp text-lg",
        done && "border-feather bg-[#d7ffb8] text-feather-dark",
        !done && active && "border-macaw bg-[#ddf4ff] text-macaw",
        !done && !active && "border-swan bg-white text-eel",
      )}
    >
      {label}
    </button>
  );
}

function CompleteOverlay({ slug, hearts, missed }: { slug: string; hearts: number; missed: number }) {
  const cat = getCategory(slug);
  const xp = missed === 0 && hearts === 5 ? 20 : 12;
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center">
      <Mascot pose="celebrate" className="h-56 w-56 bounce-in" />
      <h1 className="mt-2 text-4xl font-black text-feather">Lesson complete!</h1>
      <p className="mt-1 font-jp text-lg font-bold text-wolf">{cat?.jp} · {cat?.name}</p>
      <div className="mt-8 grid w-full max-w-md grid-cols-3 gap-3">
        {[
          { l: "Total XP", v: `+${xp}`, c: "#FFC800" },
          { l: "Hearts", v: `${hearts}/5`, c: "#FF4B4B" },
          { l: "Accuracy", v: missed === 0 ? "100%" : `${Math.round((1 - missed / 10) * 100)}%`, c: "#58CC02" },
        ].map((s) => (
          <div key={s.l} className="rounded-2xl border-2 px-2 py-3" style={{ borderColor: s.c }}>
            <div className="text-[10px] font-extrabold uppercase tracking-wider" style={{ color: s.c }}>
              {s.l}
            </div>
            <div className="text-xl font-black text-eel">{s.v}</div>
          </div>
        ))}
      </div>
      <Button className="mt-8 w-full max-w-md py-3.5" onClick={() => navigate("/learn")}>
        Claim XP
      </Button>
    </div>
  );
}
