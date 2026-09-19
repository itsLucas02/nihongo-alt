import { useEffect, useRef, useState } from "react";
import { categories, botNames, shuffle } from "../data/curriculum";
import {
  answerColors,
  makeDeck,
  randomPin,
  roomChannel,
  type MpMsg,
  type MpQuestion,
  type Player,
} from "../lib/multiplayer";
import { speakJapanese } from "../lib/speech";
import { sfxComplete, sfxCorrect, sfxTick } from "../lib/sound";
import { navigate } from "../lib/hash";
import { Button, Logo, Mascot } from "../components/ui";

type Phase = "setup" | "lobby" | "question" | "reveal" | "podium";

export function Host() {
  const [phase, setPhase] = useState<Phase>("setup");
  const [pin, setPin] = useState(randomPin);
  const [topic, setTopic] = useState("greetings");
  const [count, setCount] = useState(5);
  const [seconds, setSeconds] = useState(15);
  const [players, setPlayers] = useState<Player[]>([]);
  const [questions, setQuestions] = useState<MpQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [left, setLeft] = useState(15);
  const [picked, setPicked] = useState<Record<string, string>>({});
  const ch = useRef<BroadcastChannel | null>(null);
  const playersRef = useRef<Player[]>([]);
  playersRef.current = players;

  function broadcast(msg: MpMsg) {
    ch.current?.postMessage(msg);
  }

  useEffect(() => {
    return () => ch.current?.close();
  }, []);

  function openRoom() {
    ch.current?.close();
    const channel = roomChannel(pin);
    ch.current = channel;
    channel.onmessage = (ev: MessageEvent<MpMsg>) => {
      const msg = ev.data;
      if (msg.type === "hello") {
        broadcast({ type: "lobby", players: playersRef.current, pin, topic });
      }
      if (msg.type === "join") {
        setPlayers((prev) => {
          if (prev.some((p) => p.id === msg.player.id || p.name === msg.player.name)) return prev;
          const next = [...prev, { ...msg.player, score: 0 }];
          broadcast({ type: "lobby", players: next, pin, topic });
          return next;
        });
      }
      if (msg.type === "answer") {
        setPicked((prev) => ({ ...prev, [msg.playerId]: msg.option }));
      }
    };
    setPhase("lobby");
    localStorage.setItem("nihongo-host-pin", pin);
  }

  function addBots() {
    const extra = shuffle(botNames)
      .slice(0, 4)
      .map((name) => ({ id: "bot-" + name, name, score: 0, bot: true }));
    setPlayers((prev) => {
      const next = [...prev, ...extra.filter((b) => !prev.some((p) => p.name === b.name))];
      broadcast({ type: "lobby", players: next, pin, topic });
      return next;
    });
  }

  function start() {
    const deck = makeDeck(topic, count);
    setQuestions(deck);
    setIndex(0);
    setPicked({});
    broadcast({ type: "start", questions: deck, seconds });
    goQuestion(0, deck);
  }

  function goQuestion(i: number, deck: MpQuestion[]) {
    setIndex(i);
    setPhase("question");
    setPicked({});
    setLeft(seconds);
    const endsAt = Date.now() + seconds * 1000;
    broadcast({ type: "question", index: i, endsAt });
    speakJapanese(deck[i].jp);
  }

  useEffect(() => {
    if (phase !== "question") return;
    if (left <= 0) {
      reveal();
      return;
    }
    const t = setTimeout(() => {
      if (left <= 4) sfxTick();
      setLeft((n) => n - 1);
    }, 1000);
    return () => clearTimeout(t);
  }, [phase, left]);

  function reveal() {
    const q = questions[index];
    if (!q) return;
    setPlayers((prev) => {
      const next = prev.map((p) => {
        let add = 0;
        if (p.bot) {
          add = Math.random() > 0.35 ? Math.floor(400 + Math.random() * 600) : 0;
        } else if (picked[p.id] === q.answer) {
          add = 600 + left * 40;
        }
        return { ...p, score: p.score + add };
      });
      broadcast({ type: "reveal", correct: q.answer, scores: next });
      sfxCorrect();
      setTimeout(() => {
        /* keep */
      }, 0);
      return next;
    });
    setPhase("reveal");
  }

  function nextQ() {
    if (index >= questions.length - 1) {
      setPhase("podium");
      setPlayers((prev) => {
        broadcast({ type: "end", scores: prev });
        sfxComplete();
        return prev;
      });
      return;
    }
    goQuestion(index + 1, questions);
  }

  const q = questions[index];
  const ranked = [...players].sort((a, b) => b.score - a.score);

  if (phase === "setup") {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b-2 border-swan">
          <div className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
            <Logo />
            <Button variant="ghost" onClick={() => navigate("/")}>
              Exit
            </Button>
          </div>
        </header>
        <div className="mx-auto max-w-lg px-4 py-10">
          <h1 className="text-3xl font-black text-eel">Host a classroom game</h1>
          <p className="font-semibold text-wolf">Students join with a PIN on their phones.</p>
          <label className="mt-6 block text-xs font-extrabold uppercase tracking-widest text-wolf">Topic</label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="mt-1 w-full rounded-2xl border-2 border-swan px-4 py-3 font-extrabold outline-none"
          >
            <option value="all">All topics</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.emoji} {c.name}
              </option>
            ))}
          </select>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Field label="Questions" value={count} set={setCount} opts={[5, 8, 10]} />
            <Field label="Seconds" value={seconds} set={setSeconds} opts={[10, 15, 20, 30]} />
          </div>
          <label className="mt-4 block text-xs font-extrabold uppercase tracking-widest text-wolf">PIN</label>
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
            className="mt-1 w-full rounded-2xl border-2 border-swan px-4 py-3 text-center text-3xl font-black tracking-[0.3em] outline-none"
          />
          <Button className="mt-6 w-full py-3.5" onClick={openRoom} disabled={pin.length !== 6}>
            Open lobby
          </Button>
        </div>
      </div>
    );
  }

  if (phase === "lobby") {
    return (
      <div className="min-h-screen bg-[#1CB0F6] text-white">
        <div className="mx-auto max-w-4xl px-4 py-10 text-center">
          <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-white/80">Join at this site · Enter PIN</p>
          <div className="mt-3 text-6xl font-black tracking-[0.2em]">{pin}</div>
          <p className="mt-6 text-lg font-bold">Players ({players.length})</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {players.length === 0 && <p className="text-white/80">Waiting for players…</p>}
            {players.map((p) => (
              <span key={p.id} className="rounded-full bg-white/15 px-4 py-2 font-extrabold">
                {p.name}
                {p.bot ? " 🤖" : ""}
              </span>
            ))}
          </div>
          <div className="mt-10 flex justify-center gap-3">
            <Button variant="white" onClick={addBots}>
              Add bots
            </Button>
            <Button onClick={start} disabled={players.length === 0}>
              Start game
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (phase === "podium") {
    const [a, b, c] = ranked;
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
        <Mascot pose="celebrate" className="h-40 w-40" />
        <h1 className="text-4xl font-black text-eel">Podium</h1>
        <div className="mt-8 flex items-end gap-4">
          {[
            { p: b, h: 120, color: "#E5E5E5", n: 2 },
            { p: a, h: 160, color: "#FFC800", n: 1 },
            { p: c, h: 96, color: "#CE822D", n: 3 },
          ].map((x) => (
            <div key={x.n} className="w-28">
              <div className="font-black text-eel">{x.p?.name ?? "—"}</div>
              <div className="text-sm font-bold text-wolf">{x.p?.score ?? 0}</div>
              <div className="mt-2 rounded-t-2xl" style={{ height: x.h, background: x.color }} />
            </div>
          ))}
        </div>
        <Button className="mt-10" onClick={() => navigate("/learn")}>
          Back to learn
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="flex items-center justify-between border-b-2 border-swan px-5 py-3">
        <span className="font-black text-eel">
          {index + 1} / {questions.length}
        </span>
        <span className="grid h-12 w-12 place-items-center rounded-full bg-fox text-xl font-black text-white">
          {left}
        </span>
        <span className="font-black text-wolf">{players.length} playing</span>
      </div>
      {q && (
        <div className="mx-auto flex w-full max-w-4xl flex-1 flex-col px-4 py-8">
          <p className="text-center text-sm font-extrabold uppercase tracking-widest text-wolf">What does this mean?</p>
          <div className="mt-3 text-center font-jp text-5xl font-black text-eel">{q.jp}</div>
          <div className="text-center font-bold text-wolf">
            {q.hira} · {q.romaji}
          </div>
          <button className="mx-auto mt-3 text-2xl" onClick={() => speakJapanese(q.jp)}>
            🔊
          </button>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">
            {q.options.map((opt, i) => {
              const show = phase === "reveal";
              const ok = opt === q.answer;
              return (
                <div
                  key={opt}
                  className="flex items-center gap-3 rounded-2xl px-4 py-5 font-extrabold text-white"
                  style={{
                    background: show ? (ok ? "#58CC02" : "#FF4B4B") : answerColors[i].bg,
                    opacity: show && !ok ? 0.45 : 1,
                  }}
                >
                  <span className="text-2xl">{answerColors[i].shape}</span>
                  {opt}
                </div>
              );
            })}
          </div>
          {phase === "reveal" && (
            <div className="mt-8">
              <div className="mb-4 font-black text-eel">Leaderboard</div>
              {ranked.slice(0, 5).map((p, i) => (
                <div key={p.id} className="flex justify-between py-1 font-extrabold">
                  <span>
                    {i + 1}. {p.name}
                  </span>
                  <span>{p.score}</span>
                </div>
              ))}
              <Button className="mt-6 w-full" onClick={nextQ}>
                {index >= questions.length - 1 ? "Show podium" : "Next"}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function Field({
  label,
  value,
  set,
  opts,
}: {
  label: string;
  value: number;
  set: (n: number) => void;
  opts: number[];
}) {
  return (
    <div>
      <p className="text-xs font-extrabold uppercase tracking-widest text-wolf">{label}</p>
      <div className="mt-1 flex gap-1">
        {opts.map((n) => (
          <button
            key={n}
            onClick={() => set(n)}
            className={`flex-1 rounded-xl border-2 py-2 text-sm font-black ${
              value === n ? "border-feather bg-[#d7ffb8]" : "border-swan"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}
