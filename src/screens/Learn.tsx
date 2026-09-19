import { categories, units } from "../data/curriculum";
import { navigate } from "../lib/hash";
import { useProgress } from "../lib/progress";
import { Button } from "../components/ui";

const offsets = [0, 70, 110, 70, 0, -70, -110, -70, 0, 70];

export function Learn() {
  const { p } = useProgress();
  const firstLockedIndex = categories.findIndex((_, i) => {
    if (i === 0) return false;
    return (p.crowns[categories[i - 1].slug] ?? 0) < 1;
  });

  return (
    <div className="mx-auto max-w-md overflow-x-hidden pb-8">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-black text-eel">Learn</h1>
        <button
          onClick={() => navigate("/topics")}
          className="text-sm font-extrabold text-macaw"
        >
          Course list →
        </button>
      </div>
      <div className="mb-6 rounded-2xl border-2 border-swan bg-polar px-5 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-widest text-wolf">Today's goal</p>
            <p className="text-xl font-black text-eel">
              {p.xpToday} / {p.goal} XP
            </p>
          </div>
          <div className="h-14 w-14">
            <Ring value={(p.xpToday / p.goal) * 100} />
          </div>
        </div>
        <div className="mt-3 h-3 overflow-hidden rounded-full bg-swan">
          <div
            className="h-full rounded-full bg-feather transition-all"
            style={{ width: `${Math.min(100, (p.xpToday / p.goal) * 100)}%` }}
          />
        </div>
      </div>

      {units.map((u) => {
        const skills = categories.filter((c) => c.unit === u.id);
        return (
          <section key={u.id} className="mb-4">
            <div
              className="mb-8 flex items-center justify-between rounded-2xl px-5 py-4 text-white"
              style={{ background: u.color }}
            >
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] opacity-80">
                  Unit {u.id} · {u.jp}
                </p>
                <h2 className="text-xl font-black">{u.title}</h2>
              </div>
              <button
                onClick={() => navigate(`/guidebook/${u.id}`)}
                className="rounded-xl border-2 border-white/40 px-3 py-1.5 text-xs font-extrabold uppercase tracking-wide"
              >
                Guide
              </button>
            </div>

            <div className="relative mx-auto flex flex-col items-center pb-6">
              <div className="path-line absolute bottom-8 top-4 w-1" />
              {skills.map((c) => {
                const globalIndex = categories.findIndex((x) => x.slug === c.slug);
                const crowns = p.crowns[c.slug] ?? 0;
                const locked = firstLockedIndex !== -1 && globalIndex >= firstLockedIndex;
                const isCurrent = !locked && crowns === 0;
                return (
                  <div
                    key={c.slug}
                    className="relative z-10 mb-10 flex flex-col items-center"
                    style={{ transform: `translateX(${offsets[globalIndex]}px)` }}
                  >
                    <button
                      disabled={locked}
                      onClick={() => navigate(`/lesson/${c.slug}`)}
                      className="relative"
                    >
                      {isCurrent && (
                        <span
                          className="pulse-ring absolute inset-[-10px] rounded-full"
                          style={{ background: c.color, opacity: 0.25 }}
                        />
                      )}
                      <span
                        className="relative grid h-[74px] w-[74px] place-items-center rounded-full border-b-8 text-3xl text-white"
                        style={{
                          background: locked ? "#E5E5E5" : c.color,
                          borderColor: locked ? "#AFAFAF" : c.dark,
                          filter: locked ? "grayscale(1)" : undefined,
                        }}
                      >
                        {locked ? "🔒" : c.emoji}
                      </span>
                      {crowns > 0 && (
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-bee px-2 text-[11px] font-black text-eel shadow-[0_2px_0_0_#E5A100]">
                          {"★".repeat(crowns)}
                        </span>
                      )}
                    </button>
                    {isCurrent && (
                      <div className="mt-4">
                        <Button className="px-6 py-2.5 text-xs" onClick={() => navigate(`/lesson/${c.slug}`)}>
                          Start
                        </Button>
                      </div>
                    )}
                    <p className="mt-3 text-sm font-extrabold text-eel">{c.name}</p>
                    <p className="font-jp text-[11px] font-bold text-wolf">{c.jp}</p>
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}

      <div className="mt-2 flex flex-col items-center">
        <img src="/images/chest.png" alt="Treasure chest" className="h-28 w-28 object-contain" />
        <p className="text-center text-sm font-bold text-wolf">
          Finish every unit to unlock your certificate.
        </p>
      </div>
    </div>
  );
}

function Ring({ value }: { value: number }) {
  const r = 20;
  const c = 2 * Math.PI * r;
  const v = Math.min(100, Math.max(0, value));
  return (
    <svg viewBox="0 0 48 48" className="h-full w-full -rotate-90">
      <circle cx="24" cy="24" r={r} fill="none" stroke="#E5E5E5" strokeWidth="6" />
      <circle
        cx="24"
        cy="24"
        r={r}
        fill="none"
        stroke="#58CC02"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c - (v / 100) * c}
      />
    </svg>
  );
}
