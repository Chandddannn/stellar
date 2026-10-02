export default function SiteMark() {
  return (
    <div className="flex items-center gap-[11px]">
      <span className="flex h-[23px] items-end gap-0.5">
        <span className="h-[11px] w-[5px] bg-ink" />
        <span className="h-[17px] w-[5px] bg-ink" />
        <span className="h-[23px] w-[5px] bg-ink" />
      </span>

      <div>
        <div className="text-xs font-bold tracking-[0.08em]">Stellar OS</div>
        <div className="mt-0.5 font-mono text-[7px] tracking-[0.13em] text-muted">LIFECYCLE PLATFORM</div>
      </div>
    </div>
  );
}