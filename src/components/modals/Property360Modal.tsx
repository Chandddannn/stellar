import { Rotate3D } from "lucide-react";

import ModalShell from "./ModalShell";

interface Property360ModalProps {
  onClose: () => void;
}

export default function Property360Modal({ onClose }: Property360ModalProps) {
  return (
    <ModalShell
      eyebrow="Interactive property"
      title="360° property view"
      onClose={onClose}
    >
      <div className="relative min-h-[520px] overflow-hidden rounded-[26px] bg-[#18231f]">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(#d7ff72 1px, transparent 1px), linear-gradient(90deg,#d7ff72 1px,transparent 1px)",
            backgroundSize: "55px 55px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(215,255,114,0.18),transparent_45%)]" />
        <div className="relative flex min-h-[520px] flex-col items-center justify-center px-6 text-center text-white">
          <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#d7ff72]/30 bg-white/5 backdrop-blur-xl">
            <Rotate3D size={34} className="text-[#d7ff72]" />
          </div>
          <div className="mt-8 font-mono text-[8px] uppercase tracking-[0.16em] text-[#d7ff72]">
            Interactive walkthrough
          </div>
          <h3 className="mt-3 text-4xl font-medium tracking-[-0.06em]">
            Explore your apartment
          </h3>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
            Your property team can publish a 360° walkthrough for the latest
            construction stage, allowing you to explore rooms remotely.
          </p>
          <button
            type="button"
            className="mt-8 flex items-center gap-2 rounded-full bg-[#d7ff72] px-6 py-3 font-mono text-[8px] uppercase tracking-[0.1em] text-[#18231f]"
          >
            <Rotate3D size={14} />
            Launch 360° experience
          </button>
        </div>
      </div>
    </ModalShell>
  );
}
