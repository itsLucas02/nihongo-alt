import { categories } from "../data/curriculum";
import { navigate } from "../lib/hash";
import { useProgress } from "../lib/progress";
import { Button } from "../components/ui";

export function Topics() {
  const { p } = useProgress();
  return (
    <div className="mx-auto max-w-4xl">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-wolf">Solo practice</p>
          <h1 className="text-3xl font-black text-eel">Choose a course</h1>
          <p className="font-semibold text-wolf">10 words each · listening, meaning, and match rounds</p>
        </div>
        <Button variant="secondary" onClick={() => navigate("/learn")}>
          Lesson path
        </Button>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {categories.map((c) => {
          const crowns = p.crowns[c.slug] ?? 0;
          return (
            <button
              key={c.slug}
              onClick={() => navigate(`/lesson/${c.slug}`)}
              className="overflow-hidden rounded-3xl border-2 border-swan bg-white text-left transition hover:-translate-y-0.5"
            >
              <div className="relative h-40">
                <img src={c.photo} alt="" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-black/30" />
                <span
                  className="absolute left-4 top-4 grid h-12 w-12 place-items-center rounded-2xl text-2xl shadow-[0_4px_0_0_rgba(0,0,0,0.2)]"
                  style={{ background: c.color }}
                >
                  {c.emoji}
                </span>
                <span className="absolute bottom-4 right-4 rounded-full bg-white px-3 py-1 text-xs font-extrabold text-eel">
                  {c.difficulty}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-black text-eel">{c.name}</h2>
                  <span className="text-bee-dark">{crowns ? "★".repeat(crowns) : ""}</span>
                </div>
                <p className="font-jp text-sm font-bold text-wolf">{c.jp}</p>
                <p className="mt-1 text-sm font-semibold text-wolf">{c.desc}</p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-swan">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${(crowns / 3) * 100}%`, background: c.color }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
