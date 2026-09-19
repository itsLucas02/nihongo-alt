import { byCategory, categories, units, getCategory } from "../data/curriculum";
import { speakJapanese } from "../lib/speech";
import { navigate } from "../lib/hash";
import { Button, Card } from "../components/ui";

export function Guidebook({ unitId, catSlug }: { unitId?: string; catSlug?: string }) {
  const unit = units.find((u) => String(u.id) === unitId);
  const focus = catSlug ? getCategory(catSlug) : null;
  const list = focus ? [focus] : categories.filter((c) => !unit || c.unit === unit.id);

  return (
    <div className="mx-auto max-w-2xl pb-8">
      <button onClick={() => navigate("/learn")} className="text-sm font-extrabold text-wolf">
        ← Back
      </button>
      <h1 className="mt-3 text-3xl font-black text-eel">{focus ? focus.name : unit?.title || "Guidebook"}</h1>
      <p className="font-semibold text-wolf">Tap any word to hear it.</p>

      <div className="mt-6 grid gap-8">
        {list.map((c) => (
          <section key={c.slug}>
            <div className="mb-3 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl text-xl" style={{ background: c.color }}>
                {c.emoji}
              </span>
              <div>
                <h2 className="font-black text-eel">{c.name}</h2>
                <p className="font-jp text-xs font-bold text-wolf">{c.jp}</p>
              </div>
              <Button className="ml-auto py-2 text-xs" onClick={() => navigate(`/lesson/${c.slug}`)}>
                Practice
              </Button>
            </div>
            <div className="grid gap-2">
              {byCategory(c.slug).map((v) => (
                <Card key={v.id}>
                  <button
                    className="flex w-full items-center gap-3 px-4 py-3 text-left"
                    onClick={() => speakJapanese(v.jp)}
                  >
                    <span className="text-2xl">{v.emoji}</span>
                    <div className="flex-1">
                      <div className="font-jp text-lg font-black text-eel">{v.jp}</div>
                      <div className="text-xs font-bold text-wolf">
                        {v.hira} · {v.romaji}
                      </div>
                    </div>
                    <div className="text-right text-sm font-extrabold text-eel">{v.en}</div>
                    <span className="text-macaw">🔊</span>
                  </button>
                </Card>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
