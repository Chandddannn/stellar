import { CarFront } from "lucide-react";

import ServiceModalFrame from "./ServiceModalFrame";
import type { TrackerItem } from "./serviceModalConfig";

type ParkingModalProps = {
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  trackerItems: TrackerItem[];
};

export default function ParkingModal({
  onClose,
  onSubmit,
  trackerItems,
}: ParkingModalProps) {
  return (
    <ServiceModalFrame
      theme="parking"
      icon={CarFront}
      title="Car wash & parking"
      tag="Vehicle services"
      description="Submit a request for two-wheeler and four-wheeler parking or car wash services."
      details={[
        "Apply for parking slots for two-wheelers or four-wheelers.",
        "Request car wash services for regular cleaning and maintenance.",
        "Submit vehicle details and service timing preferences.",
      ]}
      footerMessage="Parking and vehicle services are subject to availability confirmation."
      trackerItems={trackerItems}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <div className="grid grid-cols-2 gap-4 max-[650px]:grid-cols-1">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
            Vehicle type
          </label>
          <select
            name="requestType"
            defaultValue="2 wheeler"
            className="rounded-[16px] border border-[#d8ddd6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18231f]"
          >
            <option>2 wheeler</option>
            <option>4 wheeler</option>
            <option>Both</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
            Vehicle number
          </label>
          <input
            name="unit"
            placeholder="MH 01 AB 1234"
            className="rounded-[16px] border border-[#d8ddd6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18231f]"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-[650px]:grid-cols-1">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
            Service type
          </label>
          <select
            name="timeline"
            defaultValue="Parking slot"
            className="rounded-[16px] border border-[#d8ddd6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18231f]"
          >
            <option>Parking slot</option>
            <option>Car wash</option>
            <option>Both parking & wash</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
            Preferred time
          </label>
          <input
            name="name"
            defaultValue="Weekday morning"
            className="rounded-[16px] border border-[#d8ddd6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18231f]"
          />
        </div>
      </div>
    </ServiceModalFrame>
  );
}
