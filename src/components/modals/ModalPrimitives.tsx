interface MiniStatProps {
  value: string;
  label: string;
}

export function MiniStat({ value, label }: MiniStatProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-4">
      <div className="text-2xl font-medium tracking-[-0.05em]">{value}</div>
      <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.1em] text-white/40">
        {label}
      </div>
    </div>
  );
}

interface InfoRowProps {
  number: string;
  text: string;
}

export function InfoRow({ number, text }: InfoRowProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/10 font-mono text-[7px] text-[#d7ff72]">
        {number}
      </div>
      <span className="text-xs text-white/55">{text}</span>
    </div>
  );
}