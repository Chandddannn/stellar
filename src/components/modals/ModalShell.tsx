import type { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalShellProps {
  eyebrow: string;
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}

export default function ModalShell({
  eyebrow,
  title,
  onClose,
  children,
  wide = false,
}: ModalShellProps) {
  return (
    <div
      className="fixed inset-0 z-[100] grid place-items-center bg-[#101813]/70 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        aria-modal="true"
        aria-labelledby="modal-title"
        className={`flex max-h-[min(900px,calc(100dvh-32px))] w-full flex-col overflow-hidden rounded-[30px] bg-[#f8faf7] text-[#17211d] shadow-[0_30px_100px_rgba(0,0,0,0.3)] ${
          wide ? "max-w-6xl" : "max-w-5xl"
        }`}
        role="dialog"
      >
        <header className="flex shrink-0 items-start justify-between border-b border-[#d8ddd6] px-6 py-5 sm:px-8">
          <div>
            <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#78827c]">
              {eyebrow}
            </div>
            <h2
              id="modal-title"
              className="mt-2 text-2xl font-medium tracking-[-0.04em]"
            >
              {title}
            </h2>
          </div>
          <button
            aria-label={`Close ${title}`}
            className="grid size-9 shrink-0 place-items-center rounded-full border border-[#d8ddd6] transition hover:bg-[#18231f] hover:text-white"
            onClick={onClose}
            type="button"
          >
            <X size={16} />
          </button>
        </header>
        <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-7">
          {children}
        </div>
      </section>
    </div>
  );
}