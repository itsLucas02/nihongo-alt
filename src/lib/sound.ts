let ctx: AudioContext | null = null;
let muted = false;

function ac() {
  if (typeof window === "undefined") return null;
  if (!ctx) ctx = new AudioContext();
  return ctx;
}

export function setMuted(v: boolean) {
  muted = v;
}

function tone(
  freq: number,
  start: number,
  dur: number,
  type: OscillatorType = "sine",
  gain = 0.07,
) {
  const c = ac();
  if (!c || muted) return;
  const o = c.createOscillator();
  const g = c.createGain();
  o.type = type;
  o.frequency.value = freq;
  g.gain.setValueAtTime(gain, c.currentTime + start);
  g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + start + dur);
  o.connect(g);
  g.connect(c.destination);
  o.start(c.currentTime + start);
  o.stop(c.currentTime + start + dur + 0.02);
}

export function sfxCorrect() {
  tone(523.25, 0, 0.12, "triangle", 0.06);
  tone(659.25, 0.08, 0.14, "triangle", 0.07);
  tone(783.99, 0.16, 0.22, "triangle", 0.08);
}

export function sfxWrong() {
  tone(196, 0, 0.18, "square", 0.04);
  tone(164, 0.1, 0.22, "square", 0.04);
}

export function sfxClick() {
  tone(640, 0, 0.05, "sine", 0.03);
}

export function sfxComplete() {
  [523, 659, 784, 1046].forEach((f, i) => tone(f, i * 0.09, 0.28, "triangle", 0.07));
}

export function sfxTick() {
  tone(880, 0, 0.04, "square", 0.02);
}
