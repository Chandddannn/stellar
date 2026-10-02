import { useState } from "react";
import { ArrowUpRight, FileCheck2, FileText, Plus } from "lucide-react";

import ModalShell from "./ModalShell";
import { MiniStat } from "./ModalPrimitives";

const documentItems = [
  {
    id: "INV-001",
    title: "Booking Invoice",
    category: "Financial",
    date: "12 Jan 2026",
    status: "Available",
    icon: FileText,
  },
  {
    id: "INV-002",
    title: "Payment Receipt",
    category: "Financial",
    date: "22 Feb 2026",
    status: "Available",
    icon: FileCheck2,
  },
  {
    id: "DOC-001",
    title: "Agreement for Sale",
    category: "Property",
    date: "18 Feb 2026",
    status: "Available",
    icon: FileText,
  },
  {
    id: "DOC-002",
    title: "Property Specifications",
    category: "Property",
    date: "08 Mar 2026",
    status: "Available",
    icon: FileText,
  },
  {
    id: "DOC-003",
    title: "Payment Schedule",
    category: "Financial",
    date: "08 Mar 2026",
    status: "Available",
    icon: FileText,
  },
  {
    id: "DOC-004",
    title: "Possession Documents",
    category: "Handover",
    date: "Pending",
    status: "Coming later",
    icon: FileText,
  },
];

interface DocumentsModalProps {
  onClose: () => void;
}

export default function DocumentsModal({ onClose }: DocumentsModalProps) {
  const [requestedDocument, setRequestedDocument] = useState(false);

  return (
    <ModalShell
      eyebrow="Property records"
      title="Documents & billing"
      onClose={onClose}
      wide
    >
      <div className="grid gap-5 lg:grid-cols-[0.65fr_1.35fr]">
        <div className="rounded-[26px] bg-[#18231f] p-7 text-white">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#d7ff72] text-[#18231f]">
            <FileText size={19} />
          </div>
          <div className="mt-9 font-mono text-[8px] uppercase tracking-[0.15em] text-[#d7ff72]">
            Property vault
          </div>
          <h3 className="mt-3 text-4xl font-medium leading-[0.92] tracking-[-0.07em]">
            All your generated property information.
          </h3>
          <p className="mt-5 text-sm leading-relaxed text-white/50">
            Access invoices, payment records, property documents and other
            information generated during your property journey.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-2">
            <MiniStat value="06" label="Documents" />
            <MiniStat value="03" label="Financial" />
          </div>
        </div>

        <div className="rounded-[26px] border border-[#d8ddd6] bg-white">
          <div className="border-b border-[#d8ddd6] px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Your documents</h3>
                <p className="mt-1 text-xs text-[#78827c]">
                  Generated and shared by your property team.
                </p>
              </div>
              <FileCheck2 size={19} className="text-[#536049]" />
            </div>
          </div>

          <div className="divide-y divide-[#d8ddd6]">
            {documentItems.map((document) => {
              const Icon = document.icon;

              return (
                <div
                  key={document.id}
                  className="flex items-center gap-4 px-5 py-4 transition hover:bg-[#f7f9f6]"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#eef1ec] text-[#536049]">
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium">{document.title}</div>
                    <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.08em] text-[#78827c]">
                      {document.id} · {document.category} · {document.date}
                    </div>
                  </div>
                  {document.status === "Available" ? (
                    <button
                      type="button"
                      className="flex items-center gap-1.5 rounded-full border border-[#d8ddd6] px-3 py-2 font-mono text-[7px] uppercase tracking-[0.08em] transition hover:bg-[#18231f] hover:text-white"
                    >
                      View
                      <ArrowUpRight size={11} />
                    </button>
                  ) : (
                    <span className="rounded-full bg-[#eef1ec] px-3 py-2 font-mono text-[7px] uppercase tracking-[0.08em] text-[#78827c]">
                      Pending
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <div className="border-t border-[#d8ddd6] bg-[#f8faf7] p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="text-sm font-medium">Need another document?</div>
                <div className="mt-1 text-[10px] text-[#78827c]">
                  Request a document from your property team.
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRequestedDocument(true)}
                className="flex items-center justify-center gap-2 rounded-full bg-[#18231f] px-5 py-3 font-mono text-[8px] uppercase tracking-[0.1em] text-white"
              >
                <Plus size={14} />
                Request document
              </button>
            </div>
          </div>
        </div>
      </div>

      {requestedDocument && (
        <div className="mt-5 flex items-center justify-between rounded-2xl border border-[#cde76c] bg-[#f2f9dd] p-4">
          <div>
            <div className="font-mono text-[7px] uppercase tracking-[0.12em] text-[#536049]">
              Request created
            </div>
            <div className="mt-1 text-sm font-medium">
              Tell your property team which document you need.
            </div>
          </div>
          <button
            type="button"
            onClick={() => setRequestedDocument(false)}
            className="rounded-full bg-[#18231f] px-4 py-2 font-mono text-[7px] uppercase tracking-[0.1em] text-white"
          >
            Continue
          </button>
        </div>
      )}
    </ModalShell>
  );
}
