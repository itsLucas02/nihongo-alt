import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "../utils/cn";

type BtnVariant = "primary" | "secondary" | "blue" | "danger" | "ghost" | "white";

const styles: Record<BtnVariant, string> = {
  primary: "bg-feather text-white border-[#46a302] hover:brightness-105",
  secondary: "bg-white text-macaw border-swan hover:bg-polar",
  blue: "bg-macaw text-white border-[#1899d6] hover:brightness-105",
  danger: "bg-cardinal text-white border-[#ea2b2b]",
  ghost: "border-0 border-b-0 bg-transparent text-wolf shadow-none hover:bg-polar active:translate-y-0 active:border-b-0",
  white: "bg-white text-eel border-swan hover:bg-polar",
};

export function Button({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: BtnVariant }) {
  return (
    <button
      className={cn(
        "inline-flex select-none items-center justify-center gap-2 rounded-2xl border-2 border-b-[6px] px-5 py-3 text-[15px] font-extrabold uppercase tracking-wide transition-[transform,filter,background-color] active:translate-y-[4px] active:border-b-2 disabled:pointer-events-none disabled:opacity-45",
        styles[variant],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-feather text-lg font-black text-white shadow-[0_3px_0_0_#46a302]">
        日
      </div>
      {!compact && (
        <div className="leading-tight">
          <div className="text-[17px] font-black tracking-tight text-eel">Nihongo</div>
          <div className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-wolf">
            UHB10802
          </div>
        </div>
      )}
    </div>
  );
}

export function ProgressBar({ value, color = "#58CC02" }: { value: number; color?: string }) {
  return (
    <div className="h-4 w-full overflow-hidden rounded-full bg-swan">
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${Math.min(100, Math.max(0, value))}%`, background: color }}
      />
    </div>
  );
}

export function Mascot({
  pose = "wave",
  className,
}: {
  pose?: "wave" | "celebrate" | "think" | "oops";
  className?: string;
}) {
  const src: Record<string, string> = {
    wave: "/images/mascot-wave.png",
    celebrate: "/images/mascot-celebrate.png",
    think: "/images/mascot-think.png",
    oops: "/images/mascot-oops.png",
  };
  return (
    <img
      src={src[pose]}
      alt="Niko the Shiba, Nihongo mascot"
      className={cn("select-none object-contain", className)}
      draggable={false}
    />
  );
}

export function StatChip({
  icon,
  children,
  color,
}: {
  icon: ReactNode;
  children: ReactNode;
  color: string;
}) {
  return (
    <div className="flex items-center gap-1.5 text-[15px] font-extrabold" style={{ color }}>
      <span className="text-lg">{icon}</span>
      {children}
    </div>
  );
}

export function Card({
  children,
  className,
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      onClick={onClick}
      className={cn(
        "rounded-2xl border-2 border-swan bg-white text-left",
        onClick && "transition hover:bg-polar active:translate-y-[2px]",
        className,
      )}
    >
      {children}
    </Comp>
  );
}
