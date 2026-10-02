import { Check } from "lucide-react";

interface JourneyStepData {
  title: string;
  date: string;
  status: string;
}

interface JourneyStepProps {
  item: JourneyStepData;
  index: number;
  isLast: boolean;
}

export default function JourneyStep({
  item,
  index,
  isLast,
}: JourneyStepProps) {
  const current = item.status === "current";
  const complete = item.status === "complete" || item.status === "completed";

  return (
    <div className="relative flex-1 pr-5">
      {!isLast && (
        <div className="absolute left-[18px] right-0 top-[18px] h-px bg-[#d8ddd6]" />
      )}
      <div
        className={`relative z-10 flex h-9 w-9 items-center justify-center rounded-full border ${
          current
            ? "border-[#18231f] bg-[#18231f] text-[#d7ff72]"
            : complete
              ? "border-[#b9c1ba] bg-[#eef1ec] text-[#18231f]"
              : "border-[#d8ddd6] bg-white text-[#78827c]"
        }`}
      >
        {complete ? (
          <Check size={13} />
        ) : (
          <span className="font-mono text-[8px]">
            {String(index + 1).padStart(2, "0")}
          </span>
        )}
      </div>
      <div className="mt-5 max-w-[170px]">
        {current && (
          <span className="rounded-full bg-[#d7ff72] px-2 py-1 font-mono text-[7px] uppercase tracking-[0.1em]">
            Current
          </span>
        )}
        <h3 className="mt-2 text-[15px] font-medium leading-tight">
          {item.title}
        </h3>
        <div className="mt-2 font-mono text-[8px] uppercase text-[#78827c]">
          {item.date}
        </div>
      </div>
    </div>
  );
}
