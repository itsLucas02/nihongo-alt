import { categories } from "../data/curriculum";
import { navigate } from "../lib/hash";
import { useProgress } from "../lib/progress";
import { Button, Logo, Mascot } from "../components/ui";

export function Landing() {
  const { p } = useProgress();
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-20 border-b-2 border-swan bg-white">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Logo />
          <div className="flex items-center gap-2">
            <Button variant="ghost" className="hidden sm:inline-flex" onClick={() => navigate("/leaderboard")}>
              Scoreboard
            </Button>
            <Button variant="secondary" onClick={() => navigate("/play")}>
              Join game
            </Button>
            <Button onClick={() => navigate(p.onboarded ? "/learn" : "/welcome")}>
              {p.onboarded ? "Continue" : "Get started"}
            </Button>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        <div>
          <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.18em] text-feather">
            UHB10802 · Japanese Communication 1
          </p>
          <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-eel sm:text-6xl">
            Learn Japanese
            <br />
            the fun way.
          </h1>
          <p className="mt-5 max-w-md text-lg font-semibold text-wolf">
            100 curated words, native pronunciation, and a Kahoot-style classroom arena — built like a game, taught like a class.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button className="min-w-[200px] px-8 py-3.5 text-base" onClick={() => navigate(p.onboarded ? "/learn" : "/welcome")}>
              Start learning
            </Button>
            <Button variant="white" className="min-w-[180px] px-8 py-3.5 text-base" onClick={() => navigate("/host")}>
              Host a room
            </Button>
          </div>
          <div className="mt-10 grid max-w-md grid-cols-3 gap-4">
            {[
              ["10", "Modules"],
              ["100", "Words"],
              ["3", "Crowns"],
            ].map(([n, l]) => (
              <div key={l} className="rounded-2xl border-2 border-swan px-3 py-3 text-center">
                <div className="text-2xl font-black text-eel">{n}</div>
                <div className="text-[11px] font-extrabold uppercase tracking-wider text-wolf">{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex justify-center">
          <div className="absolute inset-8 rounded-full bg-[#d7ffb8]" />
          <Mascot pose="wave" className="relative z-10 floaty h-[420px] w-[420px] max-w-full" />
        </div>
      </section>

      <section className="border-y-2 border-swan bg-polar">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-12 sm:grid-cols-3">
          {[
            { t: "Bite-size lessons", d: "Ten focused modules with mixed quizzes — meaning, listening, reading, and match pairs.", e: "🎯" },
            { t: "Speak it out loud", d: "Tap the speaker for native Japanese TTS on every word. Practice until it sticks.", e: "🔊" },
            { t: "Play with the class", d: "Host a PIN room, race the clock, and climb the weekly league. Exhibition-ready.", e: "🎮" },
          ].map((f) => (
            <div key={f.t} className="rounded-2xl border-2 border-swan bg-white p-6">
              <div className="mb-3 text-3xl">{f.e}</div>
              <h3 className="text-lg font-black text-eel">{f.t}</h3>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-wolf">{f.d}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-wolf">Curriculum</p>
            <h2 className="text-3xl font-black text-eel">Pick a topic. Master it.</h2>
          </div>
          <Button variant="secondary" onClick={() => navigate("/learn")}>
            See path
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => navigate(`/lesson/${c.slug}`)}
              className="group overflow-hidden rounded-2xl border-2 border-swan bg-white text-left transition hover:-translate-y-0.5"
            >
              <div className="relative h-28 overflow-hidden">
                <img src={c.photo} alt={c.name} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/25" />
                <span className="absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-xl text-xl" style={{ background: c.color }}>
                  {c.emoji}
                </span>
              </div>
              <div className="p-3">
                <div className="font-black text-eel">{c.name}</div>
                <div className="font-jp text-xs font-bold text-wolf">{c.jp} · 10 words</div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <footer className="border-t-2 border-swan bg-polar">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 sm:flex-row sm:items-center sm:justify-between">
          <Logo />
          <p className="text-sm font-semibold text-wolf">
            UTHM · UHB10802 Japanese Communication 1 · 一期一会
          </p>
        </div>
      </footer>
    </div>
  );
}
