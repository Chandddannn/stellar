import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface ActionCardProps {
  icon: ReactNode;
  number: string;
  title: string;
  description: string;
  last?: boolean;
  onClick?: () => void;
}

export default function ActionCard({
  icon,
  number,
  title,
  description,
  last = false,
  onClick,
}: ActionCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group min-h-[230px] bg-white p-7 text-left transition-all duration-300 hover:bg-[#18231f] hover:text-white ${
        !last
          ? "border-r border-[#d8ddd6] max-[1000px]:border-r-0 max-[1000px]:border-b max-[600px]:border-b"
          : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#d8ddd6] transition group-hover:border-white/20">
          {icon}
        </div>
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
        />
      </div>
      <div className="mt-12">
        <div className="font-mono text-[7px] uppercase tracking-[0.12em] text-[#78827c] group-hover:text-white/40">
          {number}
        </div>
        <h3 className="mt-2 text-[20px] font-medium tracking-[-0.04em]">
          {title}
        </h3>
        <p className="mt-2 text-[10px] text-[#78827c] group-hover:text-white/45">
          {description}
        </p>
      </div>
    </button>
  );
}