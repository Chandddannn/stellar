import { useEffect, useState } from "react";
import { ArrowUpRight, Building2, Check, Clock3, X } from "lucide-react";

import type {
  ServiceAdminRequest,
  ServiceRequestStatus,
} from "../../data/serviceAdminDemoData";

const statuses: ServiceRequestStatus[] = [
  "New",
  "In review",
  "Waiting on buyer",
  "Scheduled",
  "Resolved",
];

const assignees = [
  "Unassigned",
  "Facilities desk",
  "Transfer desk",
  "Resident services",
  "Documentation desk",
  "Interior team",
];

type BuilderRequestModalProps = {
  request: ServiceAdminRequest;
  onClose: () => void;
  onSave: (updates: Pick<ServiceAdminRequest, "status" | "assignee" | "adminNote">) => void;
};

export default function BuilderRequestModal({
  request,
  onClose,
  onSave,
}: BuilderRequestModalProps) {
  const [status, setStatus] = useState(request.status);
  const [assignee, setAssignee] = useState(request.assignee);
  const [adminNote, setAdminNote] = useState(request.adminNote);
  const [saved, setSaved] = useState(false);
  const activeStepIndex =
    status === "Resolved"
      ? request.steps.length
      : status === "New"
        ? 0
        : status === "Waiting on buyer"
          ? 2
          : status === "Scheduled"
            ? request.steps.length - 1
            : 1;

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function saveUpdates() {
    onSave({ status, assignee, adminNote });
    setSaved(true);
  }

  return (
    <div
      className="fixed inset-0 z-[130] grid place-items-center bg-[#151714]/65 p-3 backdrop-blur-sm sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-labelledby="builder-request-title"
        aria-modal="true"
        className="flex max-h-[min(780px,calc(100dvh-24px))] w-full max-w-[880px] flex-col overflow-hidden border border-[#d1cec4] bg-paper shadow-[0_28px_90px_rgba(0,0,0,0.3)]"
        role="dialog"
      >
        <header className="flex items-start justify-between gap-4 border-b border-white/15 bg-ink px-5 py-5 text-white sm:px-7 sm:py-6">
          <div className="flex min-w-0 items-start gap-3">
            <span className="grid size-10 shrink-0 place-items-center bg-[#d7ff72] text-ink">
              <Building2 size={18} />
            </span>
            <div className="min-w-0">
              <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-white/50">
                {request.id} · {request.phase} · {request.service}
              </p>
              <h2 id="builder-request-title" className="mt-1 truncate text-xl font-medium tracking-[-0.04em] sm:text-2xl">
                <p className="mt-1 text-[11px] text-muted">{request.building} · {request.tower} · {request.unit.split(" · ")[1]}</p>
              </h2>
              <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.1em] text-white/55">
                {request.id} · {request.service}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close request details"
            className="grid size-9 shrink-0 place-items-center border border-white/20 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <X size={16} />
          </button>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_300px] overflow-y-auto max-[760px]:grid-cols-1">
          <div className="p-5 sm:p-7">
            <div className="flex flex-wrap items-start justify-between gap-4 border-b border-line pb-5">
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">Buyer</p>
                <p className="mt-1 text-base font-medium">{request.buyer}</p>
                <p className="mt-1 text-[11px] text-muted">{request.unit}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">Submitted</p>
                <p className="mt-1 text-[11px]">{request.submitted}</p>
                <p className="mt-2 inline-flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.08em] text-muted">
                  <Clock3 size={12} /> Follow-up: {request.followUp}
                </p>
              </div>
            </div>

            <section className="py-5">
              <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">Request details</p>
              <p className="mt-3 text-[13px] leading-6 text-[#44443e]">{request.details}</p>
            </section>

            <section className="border-t border-line py-5">
              <div className="flex items-end justify-between gap-3">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">Activity workflow</p>
                  <h3 className="mt-1 text-sm font-medium">{request.phase} · {request.service}</h3>
                </div>
                <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-muted">Step {Math.min(activeStepIndex + 1, request.steps.length)} / {request.steps.length}</span>
              </div>

              <ol className="mt-5 space-y-0">
                {request.steps.map((step, index) => {
                  const complete = index < activeStepIndex;
                  const current = index === activeStepIndex && status !== "Resolved";

                  return (
                    <li key={step.title} className="relative grid grid-cols-[26px_minmax(0,1fr)] gap-3 pb-5 last:pb-0">
                      {index < request.steps.length - 1 && <span className={`absolute bottom-0 left-[12px] top-6 w-px ${complete ? "bg-[#6f806b]" : "bg-line"}`} />}
                      <span className={`relative z-10 grid size-[25px] place-items-center border text-[8px] ${complete ? "border-[#536b50] bg-[#536b50] text-white" : current ? "border-ink bg-ink text-[#d7ff72]" : "border-line bg-paper text-muted"}`}>
                        {complete ? <Check size={12} /> : String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0 pt-0.5">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className={`text-[11px] font-medium ${current ? "text-ink" : complete ? "text-[#536258]" : "text-muted"}`}>{step.title}</p>
                          {current && <span className="bg-[#e7efe0] px-1.5 py-0.5 font-mono text-[6px] uppercase tracking-[0.08em] text-[#40543c]">Current</span>}
                          {complete && <span className="font-mono text-[6px] uppercase tracking-[0.08em] text-[#728070]">Complete</span>}
                        </div>
                        <p className="mt-1 text-[9px] leading-4 text-muted">{step.detail}</p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>

            {request.adminNote && (
              <section className="border-t border-line py-5">
                <p className="font-mono text-[8px] uppercase tracking-[0.12em] text-muted">Latest admin note</p>
                <p className="mt-2 text-[11px] leading-5 text-[#55554e]">{request.adminNote}</p>
              </section>
            )}
          </div>

          <aside className="border-l border-line bg-[#f0efe9] p-5 sm:p-6 max-[760px]:border-l-0 max-[760px]:border-t">
            <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-muted">Admin actions</p>
            <div className="mt-5 flex flex-col gap-2">
              <label htmlFor="request-status" className="text-[10px] font-medium">Request status</label>
              <select
                id="request-status"
                value={status}
                onChange={(event) => {
                  setStatus(event.target.value as ServiceRequestStatus);
                  setSaved(false);
                }}
                className="border border-line bg-paper px-3 py-2.5 text-[11px] outline-none focus:border-ink"
              >
                {statuses.map((option) => <option key={option}>{option}</option>)}
              </select>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <label htmlFor="request-assignee" className="text-[10px] font-medium">Assign to</label>
              <select
                id="request-assignee"
                value={assignee}
                onChange={(event) => {
                  setAssignee(event.target.value);
                  setSaved(false);
                }}
                className="border border-line bg-paper px-3 py-2.5 text-[11px] outline-none focus:border-ink"
              >
                {assignees.map((option) => <option key={option}>{option}</option>)}
              </select>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <label htmlFor="admin-note" className="text-[10px] font-medium">Internal update</label>
              <textarea
                id="admin-note"
                rows={4}
                value={adminNote}
                onChange={(event) => {
                  setAdminNote(event.target.value);
                  setSaved(false);
                }}
                placeholder="Add a review note or next action..."
                className="resize-y border border-line bg-paper px-3 py-2.5 text-[11px] leading-5 outline-none placeholder:text-muted focus:border-ink"
              />
            </div>

            <button
              type="button"
              onClick={saveUpdates}
              className="mt-5 flex w-full items-center justify-between bg-ink px-4 py-3 text-left text-[10px] font-medium text-white transition hover:bg-[#34342f]"
            >
              {saved ? "Update saved" : "Save admin update"}
              {saved ? <Check size={14} className="text-[#d7ff72]" /> : <ArrowUpRight size={14} />}
            </button>
            <p className="mt-3 text-[9px] leading-4 text-muted">Demo changes stay in this browser session and are not sent to a backend.</p>
          </aside>
        </div>
      </section>
    </div>
  );
}
