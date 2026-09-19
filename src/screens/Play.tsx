import { useEffect, useRef, useState } from "react";
import {
  answerColors,
  roomChannel,
  type MpMsg,
  type MpQuestion,
  type Player,
} from "../lib/multiplayer";
import { navigate } from "../lib/hash";
import { useProgress } from "../lib/progress";
import { Button, Logo, Mascot } from "../components/ui";
import { sfxCorrect, sfxWrong } from "../lib/sound";

type Phase = "join" | "lobby" | "question" | "wait" | "end";

export function Play() {
  const { p, addXp } = useProgress();
  const [pin, setPin] = useState("");
  const [name, setName] = useState(p.name || "");
  const [phase, setPhase] = useState<Phase>("join");
  const [error, setError] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [questions, setQuestions] = useState<MpQuestion[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState<string | null>(null);
  const [scores, setScores] = useState<Player[]>([]);
  const id = useRef("p-" + Math.random().toString(36).slice(2, 8));
  const ch = useRef<BroadcastChannel | null>(null);

  useEffect(() => () => ch.current?.close(), []);

  function join() {
    if (pin.length !== 6 || !name.trim()) return;
    try {
      ch.current?.close();
      const channel = roomChannel(pin);
      ch.current = channel;
      channel.onmessage = (ev: MessageEvent<MpMsg>) => {
        const msg = ev.data;
        if (msg.type === "lobby") {
          setPlayers(msg.players);
          setPhase("lobby");
        }
        if (msg.type === "start") {
          setQuestions(msg.questions);
        }
        if (msg.type === "question") {
          setIndex(msg.index);
          setPicked(null);
          setCorrect(null);
          setPhase("question");
        }
        if (msg.type === "reveal") {
          setCorrect(msg.correct);
          setScores(msg.scores);
          setPhase("wait");
        }
        if (msg.type === "end") {
          setScores(msg.scores);
          setPhase("end");
          const me = msg.scores.find((s) => s.id === id.current);
          if (me && me.score > 0) addXp(Math.min(30, Math.round(me.score / 200)));
        }
        if (msg.type === "kick" && msg.playerId === id.current) {
          setError("You were removed from the room");
          setPhase("join");
        }
      };
      channel.postMessage({ type: "hello", pin } satisfies MpMsg);
      channel.postMessage({
        type: "join",
        player: { id: id.current, name: name.trim(), score: 0 },
      } satisfies MpMsg);
      setPhase("lobby");
    } catch {
      setError("Could not join that PIN");
    }
  }

  function answer(opt: string) {
    if (picked) return;
    setPicked(opt);
    ch.current?.postMessage({
      type: "answer",
      playerId: id.current,
      option: opt,
      at: Date.now(),
    } satisfies MpMsg);
    const q = questions[index];
    if (q && opt === q.answer) sfxCorrect();
    else sfxWrong();
  }

  const q = questions[index];
  const me = scores.find((s) => s.id === id.current);
  const rank = [...scores].sort((a, b) => b.score - a.score).findIndex((s) => s.id === id.current) + 1;

  if (phase === "join") {
    return (
      <div className="min-h-screen bg-white">
        <header className="border-b-2 border-swan">
          <div className="mx-auto flex h-16 max-w-md items-center justify-between px-4">
            <Logo />
            <Button variant="ghost" onClick={() => navigate("/")}>
              Exit
            </Button>
          </div>
        </header>
        <div className="mx-auto max-w-md px-5 py-10 text-center">
          <Mascot pose="wave" className="mx-auto h-36 w-36" />
          <h1 className="text-3xl font-black text-eel">Join a game</h1>
          <p className="font-semibold text-wolf">Enter the 6-digit PIN from the host screen.</p>
          <input
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 6))}
            placeholder="PIN"
            inputMode="numeric"
            className="mt-6 w-full rounded-2xl border-2 border-swan px-4 py-4 text-center text-3xl font-black tracking-[0.35em] outline-none focus:border-macaw"
          />
          <input
            value={name}
            onChange={(e) => setName(e.target.value.slice(0, 16))}
            placeholder="Nickname"
            className="mt-3 w-full rounded-2xl border-2 border-swan px-4 py-3 text-center text-lg font-extrabold outline-none focus:border-macaw"
          />
          {error && <p className="mt-2 font-bold text-cardinal">{error}</p>}
          <Button className="mt-5 w-full py-3.5" disabled={pin.length !== 6 || !name.trim()} onClick={join}>
            Join
          </Button>
          <Button variant="ghost" className="mt-2 w-full" onClick={() => navigate("/host")}>
            I'm hosting instead
          </Button>
        </div>
      </div>
    );
  }

  if (phase === "lobby") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-macaw px-4 text-center text-white">
        <p className="text-sm font-extrabold uppercase tracking-widest text-white/80">You're in!</p>
        <h1 className="mt-2 text-4xl font-black">{name}</h1>
        <p className="mt-4 font-bold">Waiting for host to start…</p>
        <p className="mt-6 text-sm font-bold text-white/80">{players.length || "—"} players in lobby</p>
      </div>
    );
  }

  if (phase === "end") {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
        <Mascot pose="celebrate" className="h-40 w-40" />
        <h1 className="text-4xl font-black text-eel">#{rank || "—"}</h1>
        <p className="font-extrabold text-wolf">{me?.score ?? 0} points</p>
        <Button className="mt-8" onClick={() => navigate("/learn")}>
          Back to learn
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-polar">
      <div className="bg-white px-4 py-3 text-center font-black text-eel">
        {name} · Q{index + 1}
      </div>
      {phase === "question" && q && (
        <div className="grid flex-1 grid-cols-2 gap-3 p-3">
          {q.options.map((opt, i) => (
            <button
              key={opt}
              disabled={!!picked}
              onClick={() => answer(opt)}
              className="rounded-2xl p-4 text-lg font-black text-white disabled:opacity-60"
              style={{ background: answerColors[i].bg }}
            >
              <div className="text-2xl">{answerColors[i].shape}</div>
              {opt}
            </button>
          ))}
        </div>
      )}
      {phase === "wait" && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <p className="text-3xl font-black" style={{ color: picked === correct ? "#58CC02" : "#FF4B4B" }}>
            {picked === correct ? "正解！" : "もう一度"}
          </p>
          <p className="mt-2 font-bold text-wolf">Answer: {correct}</p>
        </div>
      )}
    </div>
  );
}
