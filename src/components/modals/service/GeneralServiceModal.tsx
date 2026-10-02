import { Wrench } from "lucide-react";

import ServiceModalFrame from "./ServiceModalFrame";
import type { TrackerItem } from "./serviceModalConfig";

type GeneralServiceModalProps = {
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  trackerItems: TrackerItem[];
};

export default function GeneralServiceModal({
  onClose,
  onSubmit,
  trackerItems,
}: GeneralServiceModalProps) {
  return (
    <ServiceModalFrame
      theme="general"
      icon={Wrench}
      title="General service"
      tag="Home services"
      description="Maintenance, repairs, and ad-hoc service requests for your home after possession."
      details={[
        "Submit general maintenance and repair requests.",
        "List scope, urgency, and preferred service time.",
        "Monitor status updates from the support team.",
      ]}
      footerMessage="Support team will follow up with the requested next step and timeline."
      trackerItems={trackerItems}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <div className="grid grid-cols-2 gap-4 max-[650px]:grid-cols-1">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
            Service type
          </label>
          <select
            name="requestType"
            defaultValue="Maintenance"
            className="rounded-[16px] border border-[#d8ddd6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18231f]"
          >
            <option>Maintenance</option>
            <option>Repair</option>
            <option>Appliance support</option>
            <option>General upkeep</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
            Urgency
          </label>
          <select
            name="timeline"
            defaultValue="Priority"
            className="rounded-[16px] border border-[#d8ddd6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18231f]"
          >
            <option>Priority</option>
            <option>Normal</option>
            <option>Flexible</option>
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
          Service details
        </label>
        <textarea
          name="details"
          rows={5}
          placeholder="Describe the maintenance issue, affected area, and preferred availability..."
          className="rounded-[16px] border border-[#d8ddd6] bg-white px-4 py-3 text-sm text-[#17211d] outline-none transition focus:border-[#18231f]"
        />
      </div>
    </ServiceModalFrame>
  );
}
