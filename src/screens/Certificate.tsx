import { useProgress } from "../lib/progress";
import { navigate } from "../lib/hash";
import { Button, Logo } from "../components/ui";

export function Certificate() {
  const { p } = useProgress();
  const name = p.name || "Learner";
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const done = Object.values(p.crowns).filter((n) => n > 0).length;

  function printCert() {
    window.print();
  }

  return (
    <div className="min-h-screen bg-polar px-4 py-8">
      <div className="mx-auto max-w-3xl">
        <button onClick={() => navigate("/profile")} className="mb-4 text-sm font-extrabold text-wolf print:hidden">
          ← Back
        </button>

        <div id="certificate" className="rounded-3xl border-4 border-feather bg-white p-8 shadow-sm sm:p-12">
          <div className="flex items-center justify-between">
            <Logo />
            <p className="font-jp text-sm font-bold text-wolf">一期一会</p>
          </div>
          <p className="mt-8 text-center text-xs font-extrabold uppercase tracking-[0.25em] text-feather">
            Certificate of completion
          </p>
          <h1 className="mt-2 text-center font-jp text-3xl font-black text-eel sm:text-4xl">修了証書</h1>
          <p className="mt-8 text-center font-semibold text-wolf">This is to certify that</p>
          <p className="mt-2 text-center text-4xl font-black text-eel">{name}</p>
          <p className="mx-auto mt-5 max-w-lg text-center font-semibold leading-relaxed text-wolf">
            has completed {done} of 10 modules in <span className="font-black text-eel">Nihongo</span> for
            UHB10802 Japanese Communication 1 at Universiti Tun Hussein Onn Malaysia.
          </p>
          <div className="mt-10 grid grid-cols-2 gap-6 text-center">
            <div>
              <div className="font-jp text-lg font-black text-eel">日本語教育</div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-wolf">Course</div>
            </div>
            <div>
              <div className="text-lg font-black text-eel">{date}</div>
              <div className="text-xs font-extrabold uppercase tracking-widest text-wolf">Date</div>
            </div>
          </div>
          <div className="mt-10 flex items-center justify-between">
            <div className="grid h-16 w-16 place-items-center rounded-full bg-cardinal font-jp text-xs font-black text-white">
              判
            </div>
            <p className="text-sm font-bold text-wolf">Niko · Nihongo Education</p>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3 print:hidden">
          <Button onClick={printCert}>Print / Save PDF</Button>
          <Button variant="white" onClick={() => navigate("/learn")}>
            Keep learning
          </Button>
        </div>
      </div>
    </div>
  );
}
