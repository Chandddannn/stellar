import type { FormEvent } from "react";
import { Clock3, Plus, Wrench } from "lucide-react";

import ModalShell from "./ModalShell";
import type { ServiceRequest } from "./types";

interface ServiceRequestsModalProps {
  requests: ServiceRequest[];
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  initialCategory?: string;
}

export default function ServiceRequestsModal({
  requests,
  onClose,
  onSubmit,
  initialCategory = "Maintenance",
}: ServiceRequestsModalProps) {
  return (
    <ModalShell
      eyebrow="Property support"
      title="Service requests"
      onClose={onClose}
      wide
    >
      <div className="grid min-h-0 gap-5 md:grid-cols-[0.75fr_1.25fr]">
        <form
          className="flex flex-col gap-4 rounded-[24px] border border-[#d8ddd6] bg-white p-6 sm:p-8"
          onSubmit={onSubmit}
        >
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#eef1ec] text-[#536049]">
              <Wrench size={18} />
            </div>
            <h3 className="mt-6 text-2xl font-medium tracking-[-0.05em]">
              Create a service request
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-[#78827c]">
              Report an issue or ask the property team for assistance.
            </p>
          </div>

          <label className="grid gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-[#78827c]">
            Request title
            <input
              autoFocus
              className="h-11 rounded-xl border border-[#d8ddd6] bg-white px-3 font-sans text-sm normal-case tracking-normal outline-none focus:border-[#879689]"
              name="title"
              placeholder="e.g. Kitchen tap repair"
              required
            />
          </label>

          <label className="grid gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-[#78827c]">
            Request type
            <select
              defaultValue={initialCategory}
              className="h-11 rounded-xl border border-[#d8ddd6] bg-white px-3 font-sans text-sm normal-case tracking-normal outline-none focus:border-[#879689]"
              name="category"
            >
              <option>Maintenance</option>
              <option>Visit</option>
              <option>Plumbing</option>
              <option>Electrical</option>
              <option>Cleaning</option>
              <option>Site issue</option>
              <option>Other</option>
            </select>
          </label>

          <label className="grid gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-[#78827c]">
            Details
            <textarea
              className="min-h-28 resize-y rounded-xl border border-[#d8ddd6] bg-white p-3 font-sans text-sm normal-case tracking-normal outline-none focus:border-[#879689]"
              name="details"
              placeholder="Add a few details for the property team."
              required
            />
          </label>

          <button
            className="mt-auto inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#18231f] px-5 font-mono text-[8px] uppercase tracking-[0.1em] text-white transition hover:bg-[#34483d]"
            type="submit"
          >
            <Plus size={14} />
            Submit request
          </button>
        </form>

        <div className="rounded-[24px] border border-[#d8ddd6] bg-white p-6 sm:p-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h3 className="text-2xl font-medium tracking-[-0.05em]">
                Request history
              </h3>
              <p className="mt-1 text-xs text-[#78827c]">
                Track everything raised against your property.
              </p>
            </div>
            <span className="rounded-full bg-[#eef1ec] px-3 py-1.5 font-mono text-[7px] uppercase tracking-[0.1em]">
              {requests.length} total
            </span>
          </div>

          <div className="mt-6 divide-y divide-[#d8ddd6] border-t border-[#d8ddd6]">
            {requests.length === 0 ? (
              <div className="py-12 text-center text-sm text-[#78827c]">
                No requests yet.
              </div>
            ) : (
              requests.map((request) => (
                <article className="py-5" key={request.id}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#eef1ec]">
                          <Clock3 size={13} />
                        </div>
                        <h4 className="text-sm font-medium">{request.title}</h4>
                      </div>
                      <p className="mt-2 font-mono text-[8px] uppercase tracking-[0.08em] text-[#78827c]">
                        {request.id} · {request.category} · {request.date}
                      </p>
                    </div>
                    <span className="shrink-0 rounded-full bg-[#e7eee4] px-2.5 py-1 font-mono text-[8px] text-[#536049]">
                      {request.status}
                    </span>
                  </div>
                  {request.details && (
                    <p className="mt-3 pl-10 text-xs leading-relaxed text-[#78827c]">
                      {request.details}
                    </p>
                  )}
                </article>
              ))
            )}
          </div>
        </div>
      </div>
    </ModalShell>
  );
}
