interface StatusCardProps {
  label: string;
  value: string | number;
  detail: string;
  accent?: boolean;
}

export default function StatusCard({
  label,
  value,
  detail,
  accent = false,
}: StatusCardProps) {
  return (
    <div
      className={`rounded-[22px] border p-5 ${
        accent
          ? "border-[#cde76c] bg-[#d7ff72]"
          : "border-[#d8ddd6] bg-white"
      }`}
    >
      <div
        className={`font-mono text-[8px] uppercase tracking-[0.13em] ${
          accent ? "text-[#536049]" : "text-[#78827c]"
        }`}
      >
        {label}
      </div>
      <div className="mt-4 truncate text-[22px] font-medium tracking-[-0.04em]">
        {value}
      </div>
      <div
        className={`mt-1 font-mono text-[7px] uppercase tracking-[0.1em] ${
          accent ? "text-[#536049]" : "text-[#78827c]"
        }`}
      >
        {detail}
      </div>
    </div>
  );
}