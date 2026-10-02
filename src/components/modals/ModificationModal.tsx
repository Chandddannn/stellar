import type { FormEvent } from "react";
import { Plus, Wrench } from "lucide-react";

import { InfoRow } from "./ModalPrimitives";
import ModalShell from "./ModalShell";
import type { ServiceRequest } from "./types";

interface ModificationModalProps {
  onClose: () => void;
  onSubmit: (request: ServiceRequest) => void;
}

export default function ModificationModal({
  onClose,
  onSubmit,
}: ModificationModalProps) {
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const room = String(formData.get("room") ?? "General");
    const type = String(formData.get("type") ?? "Modification");
    const details = String(formData.get("details") ?? "").trim();

    if (!details) return;

    onSubmit({
      id: `MOD-${String(Date.now()).slice(-4)}`,
      title: `${type} · ${room}`,
      category: "Modification",
      status: "Submitted",
      date: new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }).format(new Date()),
      details,
    });
  }

  return (
    <ModalShell
      eyebrow="Property customization"
      title="Modification request"
      onClose={onClose}
    >
      <div className="grid gap-5 md:grid-cols-[0.7fr_1.3fr]">
        <div className="rounded-[24px] bg-[#18231f] p-7 text-white">
          <Wrench size={23} className="text-[#d7ff72]" />
          <h3 className="mt-8 text-3xl font-medium tracking-[-0.06em]">
            Request a change to your apartment.
          </h3>
          <p className="mt-4 text-sm leading-relaxed text-white/45">
            Submit a modification request and the property team can review
            feasibility, cost and timeline.
          </p>
          <div className="mt-8 space-y-3">
            <InfoRow number="01" text="Choose the room" />
            <InfoRow number="02" text="Describe the change" />
            <InfoRow number="03" text="Team reviews feasibility" />
            <InfoRow number="04" text="Quotation / approval" />
          </div>
        </div>

        <form
          onSubmit={submit}
          className="rounded-[24px] border border-[#d8ddd6] bg-white p-6 sm:p-8"
        >
          <div className="grid gap-4">
            <label className="grid gap-2 font-mono text-[8px] uppercase tracking-[0.1em] text-[#78827c]">
              Room / area
              <select
                name="room"
                className="h-11 rounded-xl border border-[#d8ddd6] bg-white px-3 font-sans text-sm normal-case tracking-normal outline-none focus:border-[#879689]"
              >
                <option>Living Room</option>
                <option>Master Bedroom</option>
                <option>Bedroom 02</option>
                <option>Kitchen</option>
                <option>Bathroom</option>
                <option>Balcony</option>
                <option>Other</option>
              </select>
            </label>

            <label className="grid gap-2 font-mono text-[8px] uppercase tracking-[0.1em] text-[#78827c]">
              Modification type
              <select
                name="type"
                className="h-11 rounded-xl border border-[#d8ddd6] bg-white px-3 font-sans text-sm normal-case tracking-normal outline-none focus:border-[#879689]"
              >
                <option>Electrical change</option>
                <option>Plumbing change</option>
                <option>Flooring change</option>
                <option>Wall / paint change</option>
                <option>Kitchen modification</option>
                <option>Wardrobe modification</option>
                <option>Other customization</option>
              </select>
            </label>

            <label className="grid gap-2 font-mono text-[8px] uppercase tracking-[0.1em] text-[#78827c]">
              What would you like to change?
              <textarea
                name="details"
                required
                className="min-h-[150px] resize-y rounded-xl border border-[#d8ddd6] bg-white p-3 font-sans text-sm normal-case tracking-normal outline-none focus:border-[#879689]"
                placeholder="Describe the modification you would like to request..."
              />
            </label>

            <div className="rounded-xl bg-[#eef1ec] p-4 text-[10px] leading-relaxed text-[#78827c]">
              Modification requests are subject to technical feasibility,
              construction stage and applicable charges.
            </div>

            <button
              type="submit"
              className="mt-2 flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#18231f] px-5 font-mono text-[8px] uppercase tracking-[0.1em] text-white transition hover:bg-[#34483d]"
            >
              <Plus size={14} />
              Submit modification
            </button>
          </div>
        </form>
      </div>
    </ModalShell>
  );
}
