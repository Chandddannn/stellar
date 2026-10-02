import { ArrowUpRight, Plus } from "lucide-react";

interface PhotoRequestCardProps {
  onClick: () => void;
}

export default function PhotoRequestCard({ onClick }: PhotoRequestCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-[28px] border border-[#d8ddd6] bg-[#d7ff72] p-7 text-left transition hover:-translate-y-1"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#18231f] text-[#d7ff72]">
          <Plus size={18} />
        </div>
        <ArrowUpRight
          size={17}
          className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </div>
      <div className="mt-8">
        <div className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#536049]">
          Need something new?
        </div>
        <h3 className="mt-2 text-2xl font-medium tracking-[-0.05em]">
          Request a fresh photo
        </h3>
      </div>
    </button>
  );
}
