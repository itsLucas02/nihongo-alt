let voicesReady = false;

function loadVoices() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  const mark = () => {
    voicesReady = true;
  };
  window.speechSynthesis.onvoiceschanged = mark;
  if (window.speechSynthesis.getVoices().length) mark();
}

loadVoices();

export function speakJapanese(text: string, rate = 0.88) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  const ja =
    voices.find((v) => v.lang.startsWith("ja") && /google/i.test(v.name)) ||
    voices.find((v) => v.lang.startsWith("ja"));
  if (ja) u.voice = ja;
  u.lang = "ja-JP";
  u.rate = rate;
  u.pitch = 1.05;
  window.speechSynthesis.speak(u);
}

export function stopSpeak() {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
}

export function canSpeak() {
  return typeof window !== "undefined" && "speechSynthesis" in window && voicesReady;
}
