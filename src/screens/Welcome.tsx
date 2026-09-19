import { useState } from "react";
import { navigate } from "../lib/hash";
import { useProgress } from "../lib/progress";
import { Button, Mascot } from "../components/ui";

const goals = [
  { n: 10, label: "Casual", sub: "5 min / day" },
  { n: 20, label: "Regular", sub: "10 min / day" },
  { n: 30, label: "Serious", sub: "15 min / day" },
];

export function Welcome() {
  const { p, setP } = useProgress();
  const [step, setStep] = useState(0);
  const [name, setName] = useState(p.name || "");
  const [goal, setGoal] = useState(p.goal || 20);

  function finish() {
    setP((prev) => ({
      ...prev,
      name: name.trim() || "Learner",
      goal,
      onboarded: true,
    }));
    navigate("/learn");
  }

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col px-5 py-8">
        <button onClick={() => navigate("/")} className="self-start text-sm font-extrabold text-wolf">
          ← Back
        </button>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          {step === 0 && (
            <>
              <Mascot pose="wave" className="h-56 w-56" />
              <h1 className="mt-4 text-3xl font-black text-eel">Hi, I'm Niko!</h1>
              <p className="mt-2 max-w-sm font-semibold text-wolf">
                I'll help you learn Japanese — one short lesson at a time. Ready?
              </p>
              <Button className="mt-8 w-full max-w-xs py-3.5" onClick={() => setStep(1)}>
                Let's go
              </Button>
            </>
          )}
          {step === 1 && (
            <>
              <Mascot pose="think" className="h-40 w-40" />
              <h1 className="mt-4 text-3xl font-black text-eel">What should we call you?</h1>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                maxLength={18}
                className="mt-6 w-full max-w-sm rounded-2xl border-2 border-swan px-4 py-3.5 text-center text-lg font-extrabold text-eel outline-none focus:border-feather"
              />
              <Button className="mt-6 w-full max-w-sm py-3.5" onClick={() => setStep(2)} disabled={!name.trim()}>
                Continue
              </Button>
            </>
          )}
          {step === 2 && (
            <>
              <Mascot pose="celebrate" className="h-40 w-40" />
              <h1 className="mt-4 text-3xl font-black text-eel">Daily goal</h1>
              <p className="mt-1 font-semibold text-wolf">You can change this later.</p>
              <div className="mt-6 grid w-full max-w-sm gap-3">
                {goals.map((g) => (
                  <button
                    key={g.n}
                    onClick={() => setGoal(g.n)}
                    className={`flex items-center justify-between rounded-2xl border-2 px-4 py-3 text-left ${
                      goal === g.n ? "border-feather bg-[#d7ffb8]" : "border-swan bg-white"
                    }`}
                  >
                    <span>
                      <span className="block font-black text-eel">{g.label}</span>
                      <span className="text-sm font-bold text-wolf">{g.sub}</span>
                    </span>
                    <span className="font-black text-feather">{g.n} XP</span>
                  </button>
                ))}
              </div>
              <Button className="mt-6 w-full max-w-sm py-3.5" onClick={finish}>
                Start first lesson
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
