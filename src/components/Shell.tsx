import type { ReactNode } from "react";
import { navigate } from "../lib/hash";
import { useProgress } from "../lib/progress";
import { Logo, StatChip } from "./ui";
import { cn } from "../utils/cn";

const tabs = [
  { id: "learn", label: "Learn", icon: HomeIcon, path: "/learn" },
  { id: "practice", label: "Practice", icon: DumbbellIcon, path: "/practice" },
  { id: "play", label: "Arena", icon: GameIcon, path: "/play" },
  { id: "leagues", label: "Leagues", icon: ShieldIcon, path: "/leaderboard" },
  { id: "profile", label: "Profile", icon: UserIcon, path: "/profile" },
];

export function Shell({
  children,
  active,
}: {
  children: ReactNode;
  active: string;
}) {
  const { p } = useProgress();
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 border-b-2 border-swan bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-[70px] max-w-5xl items-center justify-between px-4">
          <button onClick={() => navigate("/")} className="hidden sm:block">
            <Logo />
          </button>
          <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
            <StatChip icon="🔥" color="#FF9600">
              {p.streak}
            </StatChip>
            <StatChip icon="💎" color="#1CB0F6">
              {p.gems}
            </StatChip>
            <StatChip icon="⚡" color="#FFC800">
              {p.xp}
            </StatChip>
          </div>
        </div>
      </header>

      <main className="mx-auto min-h-[calc(100vh-146px)] max-w-5xl px-4 pb-28 pt-6">
        {children}
      </main>

      <nav className="fixed inset-x-0 bottom-0 z-30 border-t-2 border-swan bg-white">
        <div className="mx-auto grid max-w-5xl grid-cols-5">
          {tabs.map((t) => {
            const on = active === t.id;
            return (
              <button
                key={t.id}
                onClick={() => navigate(t.path)}
                className={cn(
                  "flex flex-col items-center gap-1 py-3 text-[11px] font-extrabold uppercase tracking-wide",
                  on ? "text-feather" : "text-hare hover:text-wolf",
                )}
              >
                <t.icon active={on} />
                {t.label}
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill={active ? "#58CC02" : "none"} stroke={active ? "#58CC02" : "#AFAFAF"} strokeWidth="2.2">
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z" />
    </svg>
  );
}
function DumbbellIcon({ active }: { active: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={active ? "#1CB0F6" : "#AFAFAF"} strokeWidth="2.2" strokeLinecap="round">
      <path d="M6 9v6M18 9v6M4 10v4M20 10v4M6 12h12" />
    </svg>
  );
}
function GameIcon({ active }: { active: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={active ? "#CE82FF" : "#AFAFAF"} strokeWidth="2.2">
      <rect x="3" y="7" width="18" height="11" rx="3" />
      <path d="M8 12h2m-1-1v2M15.5 11.5h.01M17.5 13.5h.01" strokeLinecap="round" />
    </svg>
  );
}
function ShieldIcon({ active }: { active: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill={active ? "#FFC800" : "none"} stroke={active ? "#E5A100" : "#AFAFAF"} strokeWidth="2.2">
      <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6z" />
    </svg>
  );
}
function UserIcon({ active }: { active: boolean }) {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={active ? "#FF4B4B" : "#AFAFAF"} strokeWidth="2.2">
      <circle cx="12" cy="8" r="3.2" />
      <path d="M5 19c1.4-3.2 3.8-5 7-5s5.6 1.8 7 5" />
    </svg>
  );
}
