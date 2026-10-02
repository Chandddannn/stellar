import {
  AlertCircle,
  FileText,
  Upload,
} from "lucide-react";

import { property } from "../../../data/demoData";
import ServiceModalFrame from "./ServiceModalFrame";
import type { TrackerItem } from "./serviceModalConfig";

type DocumentationModalProps = {
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  trackerItems: TrackerItem[];
};

export default function DocumentationModal({
  onClose,
  onSubmit,
  trackerItems,
}: DocumentationModalProps) {
  return (
    <ServiceModalFrame
      theme="documentation"
      icon={FileText}
      title="Documentation issue"
      tag="Document support"
      description="Register any documentation concern, missing records, or approval follow-up directly with the support desk."
      details={[
        "Report missing documentation, references, or approval delays.",
        "Upload supporting records for faster review.",
        "Receive status tracking until the issue is resolved.",
      ]}
      footerMessage="Support team will review the uploaded or listed documentation and update the status shortly."
      trackerItems={trackerItems}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      {/* REQUEST DETAILS */}
      <div className="grid grid-cols-2 gap-3 max-[650px]:grid-cols-1">
        {/* NAME */}
        <div className="rounded-[16px] border border-[#d9ded9] bg-[#fafbf9] px-4 py-3">
          <label className="mb-1.5 block font-mono text-[8px] uppercase tracking-[0.12em] text-[#7d8781]">
            Full name
          </label>

          <input
            name="name"
            defaultValue={property.owner}
            className="w-full bg-transparent text-[13px] font-medium text-[#18231f] outline-none placeholder:text-[#9ca49f]"
            placeholder="Enter your name"
          />
        </div>

        {/* CATEGORY */}
        <div className="rounded-[16px] border border-[#d9ded9] bg-[#fafbf9] px-4 py-3">
          <label className="mb-1.5 block font-mono text-[8px] uppercase tracking-[0.12em] text-[#7d8781]">
            Issue category
          </label>

          <select
            name="requestType"
            defaultValue="Missing document"
            className="w-full cursor-pointer bg-transparent text-[13px] font-medium text-[#18231f] outline-none"
          >
            <option>Missing document</option>
            <option>Approval follow-up</option>
            <option>Correction needed</option>
            <option>Incomplete paperwork</option>
          </select>
        </div>
      </div>

      {/* DOCUMENT STATUS */}
      <div className="mt-3 rounded-[16px] border border-[#d9ded9] bg-white p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[#eef2ee]">
              <FileText
                size={13}
                strokeWidth={1.8}
                className="text-[#56645c]"
              />
            </div>

            <div>
              <p className="text-[11px] font-semibold text-[#1b2721]">
                Document concern
              </p>

              <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-[#8a938e]">
                Tell us what needs attention
              </p>
            </div>
          </div>

          <span className="rounded-full bg-[#f1f4f1] px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.08em] text-[#77817b]">
            Required
          </span>
        </div>

        <div className="flex items-start gap-2.5 rounded-[12px] border border-[#e1e5e1] bg-[#fafbfa] px-3 py-2.5">
          <AlertCircle
            size={13}
            strokeWidth={1.7}
            className="mt-0.5 shrink-0 text-[#7d8981]"
          />

          <textarea
            name="details"
            rows={4}
            placeholder="Describe the missing, pending, or incorrect document..."
            className="w-full resize-none bg-transparent text-[12px] leading-5 text-[#17211d] outline-none placeholder:text-[#a2aaa5]"
          />
        </div>
      </div>

      {/* UPLOAD */}
      <label className="mt-3 flex cursor-pointer items-center justify-between gap-3 rounded-[16px] border border-dashed border-[#cfd6d0] bg-[#f8faf8] px-4 py-3 transition hover:border-[#aeb9b1] hover:bg-[#f5f8f5]">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-white shadow-sm">
            <Upload
              size={14}
              strokeWidth={1.7}
              className="text-[#647068]"
            />
          </div>

          <div>
            <p className="text-[11px] font-medium text-[#26332d]">
              Add supporting document
            </p>

            <p className="mt-0.5 font-mono text-[7px] uppercase tracking-[0.1em] text-[#8c9590]">
              PDF, JPG or PNG · Optional
            </p>
          </div>
        </div>

        <span className="rounded-[9px] border border-[#d8ded8] bg-white px-3 py-1.5 font-mono text-[7px] uppercase tracking-[0.1em] text-[#68736c]">
          Upload
        </span>

        <input
          type="file"
          name="attachment"
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
        />
      </label>
    </ServiceModalFrame>
  );
}
