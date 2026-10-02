import { Sparkles } from "lucide-react";

import { property } from "../../../data/demoData";
import ServiceModalFrame from "./ServiceModalFrame";
import type { TrackerItem } from "./serviceModalConfig";

type RemodellingModalProps = {
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  trackerItems: TrackerItem[];
};

export default function RemodellingModal({
  onClose,
  onSubmit,
  trackerItems,
}: RemodellingModalProps) {
  return (
    <ServiceModalFrame
      theme="remodelling"
      icon={Sparkles}
      title="Interior remodelling"
      tag="Design request"
      description="Request design assistance and interior remodelling with submission and security deposit details."
      details={[
        "Share your design concept, room scope, and desired finish style.",
        "Confirm the required security deposit before work begins.",
        "Track design review and approval updates in one timeline.",
      ]}
      footerMessage="Buyer security deposit is required before interior work begins."
      trackerItems={trackerItems}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <div className="grid grid-cols-2 gap-4 max-[650px]:grid-cols-1">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
            Full name
          </label>
          <input
            name="name"
            defaultValue={property.owner}
            className="rounded-[16px] border border-[#d8ddd6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18231f]"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
            Room scope
          </label>
          <select
            name="requestType"
            defaultValue="Full home remodelling"
            className="rounded-[16px] border border-[#d8ddd6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18231f]"
          >
            <option>Full home remodelling</option>
            <option>Kitchen redesign</option>
            <option>Bedroom interiors</option>
            <option>Living room styling</option>
            <option>Wardrobe & storage</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-[650px]:grid-cols-1">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
            Style preference
          </label>
          <select
            name="timeline"
            defaultValue="Modern minimal"
            className="rounded-[16px] border border-[#d8ddd6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18231f]"
          >
            <option>Modern minimal</option>
            <option>Luxury contemporary</option>
            <option>Warm natural</option>
            <option>Classic premium</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
            Estimated budget
          </label>
          <select
            name="unit"
            defaultValue="₹10L - ₹20L"
            className="rounded-[16px] border border-[#d8ddd6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18231f]"
          >
            <option>₹5L - ₹10L</option>
            <option>₹10L - ₹20L</option>
            <option>₹20L - ₹35L</option>
            <option>₹35L+</option>
          </select>
        </div>
      </div>
    </ServiceModalFrame>
  );
}
