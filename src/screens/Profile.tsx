import { categories } from "../data/curriculum";
import { navigate } from "../lib/hash";
import { useProgress } from "../lib/progress";
import { Button, Card, Mascot } from "../components/ui";

const achievements: { id: string; name: string; desc: string; test: (c: number, s: number, xp: number) => boolean }[] = [
  { id: "first", name: "First step", desc: "Complete a lesson", test: (c) => c >= 1 },
  { id: "three", name: "On a roll", desc: "Finish 3 modules", test: (c) => c >= 3 },
  { id: "all", name: "Nihongo ace", desc: "Complete all 10 modules", test: (c) => c >= 10 },
  { id: "streak3", name: "Warm streak", desc: "3-day streak", test: (_c, s) => s >= 3 },
  { id: "xp100", name: "Century", desc: "Earn 100 XP", test: (_c, _s, xp) => xp >= 100 },
];

export function Profile() {
  const { p, setP } = useProgress();
  const done = Object.values(p.crowns).filter((n) => n > 0).length;
  const allDone = done >= 10;

  return (
    <div className="mx-auto max-w-xl">
      <div className="flex items-center gap-4">
        <Mascot pose="wave" className="h-28 w-28" />
        <div>
          <h1 className="text-3xl font-black text-eel">{p.name || "Learner"}</h1>
          <p className="font-bold text-wolf">
            {p.league} League · {done}/10 modules
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          ["🔥", p.streak, "Streak"],
          ["⚡", p.xp, "Total XP"],
          ["💎", p.gems, "Gems"],
        ].map(([e, n, l]) => (
          <Card key={String(l)} className="p-4 text-center">
            <div className="text-2xl">{e}</div>
            <div className="text-2xl font-black text-eel">{n}</div>
            <div className="text-[11px] font-extrabold uppercase tracking-wider text-wolf">{l}</div>
          </Card>
        ))}
      </div>

      <h2 className="mt-8 text-xl font-black text-eel">Achievements</h2>
      <div className="mt-3 grid gap-2">
        {achievements.map((a) => {
          const on = a.test(done, p.streak, p.xp);
          return (
            <Card key={a.id} className={`flex items-center gap-3 p-3 ${on ? "" : "opacity-50"}`}>
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-bee text-xl">
                {on ? "🏅" : "🔒"}
              </span>
              <div>
                <div className="font-black text-eel">{a.name}</div>
                <div className="text-sm font-semibold text-wolf">{a.desc}</div>
              </div>
            </Card>
          );
        })}
      </div>

      <h2 className="mt-8 text-xl font-black text-eel">Modules</h2>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {categories.map((c) => (
          <Card key={c.slug} className="flex items-center gap-2 p-3">
            <span className="text-xl">{c.emoji}</span>
            <div className="min-w-0">
              <div className="truncate text-sm font-black text-eel">{c.name}</div>
              <div className="text-xs font-bold text-bee-dark">
                {"★".repeat(p.crowns[c.slug] || 0) || "—"}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid gap-3">
        <Button disabled={!allDone && done < 1} onClick={() => navigate("/certificate")}>
          {allDone ? "Download certificate" : "Preview certificate"}
        </Button>
        <Button
          variant="white"
          onClick={() =>
            setP((prev) => ({ ...prev, sound: !prev.sound }))
          }
        >
          Sound: {p.sound ? "On" : "Off"}
        </Button>
        <Button
          variant="ghost"
          className="text-cardinal"
          onClick={() => {
            if (confirm("Reset all progress?")) {
              localStorage.removeItem("nihongo-progress-v1");
              window.location.hash = "/";
              window.location.reload();
            }
          }}
        >
          Reset progress
        </Button>
      </div>
    </div>
  );
}
