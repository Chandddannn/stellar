import type { ReactNode } from "react";

interface BuyerNavItemProps {
  icon: ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function BuyerNavItem({
  icon,
  label,
  active = false,
  onClick,
}: BuyerNavItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      aria-label={label}
      title={label}
      className={`flex h-11 w-full items-center justify-center overflow-hidden rounded-xl px-3 transition-all duration-300 group-hover:justify-start max-[900px]:w-auto max-[900px]:justify-center ${
        active
          ? "bg-white/10 text-white"
          : "text-white/40 hover:bg-white/10 hover:text-white"
      }`}
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center">
        {icon}
      </span>
      <span className="ml-0 w-0 overflow-hidden whitespace-nowrap text-sm opacity-0 transition-all duration-300 group-hover:ml-3 group-hover:w-auto group-hover:opacity-100 max-[900px]:hidden">
        {label}
      </span>
    </button>
  );
}
