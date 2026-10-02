interface PropertyInfoPillProps {
  text: string;
}

export default function PropertyInfoPill({ text }: PropertyInfoPillProps) {
  return (
    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-white/55">
      {text}
    </span>
  );
}
