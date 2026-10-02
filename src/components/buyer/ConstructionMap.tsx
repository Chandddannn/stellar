import { MapPin } from "lucide-react";

interface ConstructionMapProps {
  progress: number;
  phase: string;
  possession: string;
}

export default function ConstructionMap({
  progress,
  phase,
  possession,
}: ConstructionMapProps) {
  return (
    <div className="relative min-h-[510px] overflow-hidden border-l border-white/10 max-[1050px]:border-l-0 max-[1050px]:border-t">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg,#ffffff 1px,transparent 1px)",
          backgroundSize: "42px 42px",
        }}
      />
      <div className="absolute inset-[12%] [transform:perspective(900px)_rotateX(57deg)_rotateZ(-18deg)]">
        <div className="grid h-full grid-cols-8 gap-2">
          {Array.from({ length: 64 }, (_, index) => {
            const complete = index < Math.round((progress / 100) * 64);

            return (
              <div
                key={index}
                className={`rounded-[3px] border ${
                  complete
                    ? "border-[#d7ff72]/40 bg-[#d7ff72]/25"
                    : "border-white/10 bg-white/[0.025]"
                }`}
              />
            );
          })}
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative flex h-[190px] w-[190px] items-center justify-center rounded-full border border-white/10 bg-[#18231f]/60 backdrop-blur-xl">
          <div
            className="absolute inset-2 rounded-full"
            style={{
              background: `conic-gradient(#d7ff72 ${progress}%, rgba(255,255,255,0.08) ${progress}% 100%)`,
              mask: "radial-gradient(circle, transparent 67%, black 68%)",
              WebkitMask: "radial-gradient(circle, transparent 67%, black 68%)",
            }}
          />
          <div className="text-center">
            <div className="text-[55px] font-medium leading-none tracking-[-0.08em]">
              {progress}%
            </div>
            <div className="mt-2 font-mono text-[8px] uppercase tracking-[0.14em] text-white/40">
              construction
            </div>
          </div>
        </div>
      </div>

      <div className="absolute left-7 top-7 rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-xl">
        <div className="font-mono text-[7px] uppercase tracking-[0.15em] text-white/40">
          Current phase
        </div>
        <div className="mt-1.5 text-sm font-medium">{phase}</div>
      </div>

      <div className="absolute bottom-7 right-7 rounded-2xl bg-[#d7ff72] px-5 py-4 text-[#18231f]">
        <div className="font-mono text-[7px] uppercase tracking-[0.14em] opacity-60">
          Estimated possession
        </div>
        <div className="mt-1 text-lg font-semibold">{possession}</div>
      </div>

      <span className="sr-only">
        <MapPin aria-hidden="true" /> Construction progress map
      </span>
    </div>
  );
}
