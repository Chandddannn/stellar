import { ArrowUpRight, Building2, Check, Home, KeyRound } from "lucide-react";

export type DemoMode =
  | "buyer-pre"
  | "buyer-post"
  | "builder";

interface DemoSwitcherProps {
  mode: DemoMode;
  onChange: (mode: DemoMode) => void;
  className?: string;
}

const modes = [
  {
    id: "buyer-pre" as DemoMode,
    label: "Buyer",
    sub: "Pre-Possession",
    icon: Home,
  },
  {
    id: "buyer-post" as DemoMode,
    label: "Buyer",
    sub: "Post-Possession",
    icon: KeyRound,
  },
  {
    id: "builder" as DemoMode,
    label: "Builder",
    sub: "Operations",
    icon: Building2,
  },
];

export default function DemoSwitcher({
  mode,
  onChange,
}: DemoSwitcherProps) {
  return (
    <div role="group" aria-label="Choose demo view" className="grid gap-1.5">
      {modes.map((item) => {
        const Icon = item.icon;
        const active = mode === item.id;

        return (
          <button
            key={item.id}
            type="button"
            aria-pressed={active}
            className={`group flex w-full items-center gap-3 border px-3.5 py-3 text-left transition-colors focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-ink ${active ? "border-ink bg-ink text-white" : "border-transparent bg-white hover:border-line hover:bg-[#f1f0eb]"}`}
            onClick={() => onChange(item.id)}
          >
            <span className={`grid size-9 shrink-0 place-items-center ${active ? "bg-[#d7ff72] text-ink" : "bg-[#efeee8] text-ink group-hover:bg-white"}`}>
              <Icon size={16} strokeWidth={1.6} />
            </span>
            <span className="min-w-0 flex-1">
              <strong className="block text-[11px] font-semibold">{item.label}</strong>
              <small className={`mt-1 block font-mono text-[7px] uppercase tracking-[0.1em] ${active ? "text-white/55" : "text-muted"}`}>{item.sub}</small>
            </span>
            {active ? <Check size={15} className="shrink-0 text-[#d7ff72]" /> : <ArrowUpRight size={14} className="shrink-0 text-muted opacity-0 transition-opacity group-hover:opacity-100" />}
          </button>
        );
      })}
    </div>
  );
}