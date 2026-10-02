import { MessageSquareText } from "lucide-react";

import { property } from "../../../data/demoData";
import ServiceModalFrame from "./ServiceModalFrame";
import type { TrackerItem } from "./serviceModalConfig";

type IssueModalProps = {
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  trackerItems: TrackerItem[];
};

export default function IssueModal({
  onClose,
  onSubmit,
  trackerItems,
}: IssueModalProps) {
  return (
    <ServiceModalFrame
      theme="issue"
      icon={MessageSquareText}
      title="Register issue"
      tag="Quick support"
      description="Chat to register your issue and a team member will call you in 5 minutes or connect you to an agent."
      details={[
        "Request a callback from the property support team within 5 minutes.",
        "Speak with an agent if the issue needs live troubleshooting.",
        "Track the issue status from submission to resolution.",
      ]}
      footerMessage="Support team will follow up with the requested next step and timeline."
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
            Issue type
          </label>
          <select
            name="requestType"
            defaultValue="Electrical issue"
            className="rounded-[16px] border border-[#d8ddd6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18231f]"
          >
            <option>Electrical issue</option>
            <option>Plumbing issue</option>
            <option>Carpentry issue</option>
            <option>Safety concern</option>
            <option>General complaint</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 max-[650px]:grid-cols-1">
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
            Callback preference
          </label>
          <select
            name="timeline"
            defaultValue="Within 5 minutes"
            className="rounded-[16px] border border-[#d8ddd6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18231f]"
          >
            <option>Within 5 minutes</option>
            <option>Within 15 minutes</option>
            <option>After 1 hour</option>
            <option>Chat with agent</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
            Unit / flat
          </label>
          <input
            name="unit"
            defaultValue={property.unit}
            className="rounded-[16px] border border-[#d8ddd6] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#18231f]"
          />
        </div>
      </div>
    </ServiceModalFrame>
  );
}
