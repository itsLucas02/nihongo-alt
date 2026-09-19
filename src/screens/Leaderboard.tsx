import { botNames } from "../data/curriculum";
import { useProgress } from "../lib/progress";
import { Card } from "../components/ui";

function seedPlayers(userName: string, userXp: number) {
  const base = [420, 388, 340, 275, 210, 180, 150, 110, 80, 45];
  const people = botNames.map((name, i) => ({
    name,
    xp: base[i] ?? 40,
    you: false,
  }));
  people.push({ name: userName || "You", xp: userXp, you: true });
  return people.sort((a, b) => b.xp - a.xp).slice(0, 12);
}

const leagues = [
  { name: "Bronze", color: "#CE822D" },
  { name: "Silver", color: "#AFAFAF" },
  { name: "Gold", color: "#FFC800" },
  { name: "Sapphire", color: "#1CB0F6" },
  { name: "Ruby", color: "#FF4B4B" },
];

export function Leaderboard() {
  const { p } = useProgress();
  const rows = seedPlayers(p.name, p.xp);
  const youRank = rows.findIndex((r) => r.you) + 1;
  const top = rows.slice(0, 3);

  return (
    <div className="mx-auto max-w-xl">
      <div className="text-center">
        <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-wolf">Weekly league</p>
        <h1 className="text-3xl font-black text-eel">{p.league} League</h1>
        <div className="mt-4 flex justify-center gap-2">
          {leagues.map((l) => (
            <span
              key={l.name}
              className="h-3 w-8 rounded-full"
              style={{
                background: l.color,
                outline: p.league === l.name ? "3px solid #3c3c3c" : undefined,
                outlineOffset: 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-end justify-center gap-3">
        {[top[1], top[0], top[2]].map((person, idx) => {
          if (!person) return null;
          const place = idx === 1 ? 1 : idx === 0 ? 2 : 3;
          const h = place === 1 ? 140 : place === 2 ? 110 : 90;
          const colors = ["#E5E5E5", "#FFC800", "#CE822D"];
          return (
            <div key={person.name} className="flex w-24 flex-col items-center">
              <div className="mb-2 text-2xl">{place === 1 ? "👑" : place === 2 ? "🥈" : "🥉"}</div>
              <div className="text-sm font-black text-eel">{person.name}</div>
              <div className="text-xs font-bold text-wolf">{person.xp} XP</div>
              <div
                className="mt-2 w-full rounded-t-2xl"
                style={{ height: h, background: colors[place - 1] }}
              />
            </div>
          );
        })}
      </div>

      <Card className="mt-6 divide-y-2 divide-swan overflow-hidden">
        {rows.map((r, i) => (
          <div
            key={r.name + i}
            className={`flex items-center gap-3 px-4 py-3 ${r.you ? "bg-[#d7ffb8]" : ""}`}
          >
            <span className="w-6 text-center font-black text-wolf">{i + 1}</span>
            <span className="grid h-10 w-10 place-items-center rounded-full bg-polar text-lg font-black">
              {r.name.slice(0, 1)}
            </span>
            <span className="flex-1 font-extrabold text-eel">
              {r.name}
              {r.you && <span className="ml-2 text-xs font-black text-feather">YOU</span>}
            </span>
            <span className="font-black text-bee-dark">{r.xp} XP</span>
          </div>
        ))}
      </Card>

      <p className="mt-4 text-center text-sm font-semibold text-wolf">
        You're #{youRank || "—"} this week. Top 5 promote to the next league.
      </p>
    </div>
  );
}
