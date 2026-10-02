import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check, ClipboardList, Clock3, FilePlus2, X } from "lucide-react";
import { modalThemes, type ServiceModalFrameProps } from "./serviceModalConfig";

export default function ServiceModalFrame({
  theme,
  icon: Icon,
  title,
  tag,
  description,
  details,
  footerMessage,
  trackerItems,
  onClose,
  onSubmit,
  submitLabel = "Submit request",
  children,
}: ServiceModalFrameProps) {
  const themeStyles = modalThemes[theme];
  const [activeView, setActiveView] = useState<"request" | "activity">("request");
  const [justSubmitted, setJustSubmitted] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const completed = onSubmit(event);
    if (completed === false) return;

    setJustSubmitted(true);
    setActiveView("activity");
  }

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-[#101813]/70 p-3 backdrop-blur-md sm:p-6"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        aria-modal="true"
        aria-labelledby="service-modal-title"
        className="flex max-h-[min(850px,calc(100dvh-24px))] w-full max-w-[1080px] flex-col overflow-hidden rounded-[26px] border border-white/70 bg-[#f6f8f4] text-[#17211d] shadow-[0_32px_100px_rgba(10,18,14,0.38)] sm:max-h-[min(850px,calc(100dvh-48px))] sm:rounded-[30px]"
        role="dialog"
      >
        <header className="relative shrink-0 overflow-hidden bg-[#18231f] px-5 py-5 text-white sm:px-8 sm:py-7">
          <div className="absolute inset-y-0 right-0 w-1/3 opacity-30" style={{ background: `linear-gradient(115deg, transparent, ${themeStyles.accent})` }} />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-[16px] text-[#18231f] shadow-inner" style={{ backgroundColor: themeStyles.accent }}>
                <Icon size={21} strokeWidth={1.8} />
              </div>
              <div className="min-w-0">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/55">
                    {tag}
                  </span>
                  <span className="h-px w-5 bg-white/25" />
                  <span className="flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.1em] text-white/55">
                    <span className="size-1.5 rounded-full" style={{ backgroundColor: themeStyles.accent }} />
                    Support desk
                  </span>
                </div>
                <h2 id="service-modal-title" className="text-[clamp(25px,4vw,38px)] font-medium leading-tight tracking-[-0.04em]">
                  {title}
                </h2>
                <p className="mt-1 max-w-[580px] text-[12px] leading-5 text-white/65">
                  {description}
                </p>
              </div>
            </div>
          <button
            type="button"
            onClick={onClose}
            className="grid size-10 shrink-0 place-items-center rounded-full border border-white/15 bg-white/5 text-white/75 transition hover:border-white/30 hover:bg-white/15 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            aria-label={`Close ${title}`}
          >
            <X size={17} />
          </button>
          </div>
        </header>

        <nav aria-label="Request views" className="flex shrink-0 gap-1 border-b border-[#e0e5df] bg-white px-5 sm:px-8">
          <button
            type="button"
            aria-pressed={activeView === "request"}
            onClick={() => setActiveView("request")}
            className={`relative flex items-center gap-2 px-3 py-4 text-[11px] font-medium transition sm:px-4 ${activeView === "request" ? "text-[#17211d]" : "text-[#7c8780] hover:text-[#17211d]"}`}
          >
            <FilePlus2 size={14} />
            New request
            {activeView === "request" && <span className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-[#18231f] sm:inset-x-4" />}
          </button>
          <button
            type="button"
            aria-pressed={activeView === "activity"}
            onClick={() => setActiveView("activity")}
            className={`relative flex items-center gap-2 px-3 py-4 text-[11px] font-medium transition sm:px-4 ${activeView === "activity" ? "text-[#17211d]" : "text-[#7c8780] hover:text-[#17211d]"}`}
          >
            <ClipboardList size={14} />
            Request activity
            <span className="grid min-w-5 place-items-center rounded-full bg-[#edf1eb] px-1.5 py-0.5 font-mono text-[8px] text-[#5c685f]">
              {trackerItems.length}
            </span>
            {activeView === "activity" && <span className="absolute inset-x-3 bottom-0 h-[2px] rounded-full bg-[#18231f] sm:inset-x-4" />}
          </button>
        </nav>

        <div className="min-h-0 flex-1 overflow-y-auto">
          {activeView === "request" ? (
            <div className="grid min-h-full grid-cols-[minmax(0,1fr)_290px] max-[850px]:grid-cols-1">
              <form onSubmit={handleSubmit} className="p-5 sm:p-8">
                {justSubmitted && (
                  <div role="status" className="mb-5 flex items-center gap-3 rounded-[16px] border border-[#cdddc8] bg-[#edf5e9] px-4 py-3 text-[11px] text-[#304533]">
                    <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#d7ff72] text-[#18231f]"><Check size={14} /></span>
                    Request received. Your latest update is in Request activity.
                  </div>
                )}
                <div className="mb-5 flex items-end justify-between gap-3">
                  <div>
                    <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#87918a]">Request details</p>
                    <h3 className="mt-1 text-lg font-medium tracking-[-0.03em]">Tell us what you need</h3>
                  </div>
                  <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#98a19b]">* Required</span>
                </div>
                <div className="space-y-4 [&_input]:transition-colors [&_input]:focus-visible:outline-none [&_input]:focus-visible:ring-2 [&_input]:focus-visible:ring-[#18231f]/15 [&_select]:transition-colors [&_select]:focus-visible:outline-none [&_select]:focus-visible:ring-2 [&_select]:focus-visible:ring-[#18231f]/15 [&_textarea]:transition-colors [&_textarea]:focus-visible:outline-none [&_textarea]:focus-visible:ring-2 [&_textarea]:focus-visible:ring-[#18231f]/15">
                  {children}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[#e5e9e3] pt-5">
                  <p className="max-w-[310px] text-[10px] leading-4 text-[#7d8880]">
                    {footerMessage}
                  </p>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-[12px] bg-[#18231f] px-5 py-3 text-[10px] font-medium text-white shadow-[0_5px_14px_rgba(24,35,31,0.16)] transition hover:bg-[#293a32] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18231f]"
                  >
                    {submitLabel}
                    <ArrowRight size={14} />
                  </button>
                </div>
              </form>

              <aside className="border-l border-[#e0e5df] bg-[#eef2ed] p-5 sm:p-6 max-[850px]:border-l-0 max-[850px]:border-t">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-[#78847b]">At a glance</p>
                  <span className="rounded-full bg-white px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.08em] text-[#758078]">Service guide</span>
                </div>
                <div className="mt-5 rounded-[18px] border border-white/80 bg-white p-4">
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-[12px] text-[#18231f]" style={{ backgroundColor: themeStyles.accent }}>
                      <Clock3 size={16} />
                    </span>
                    <div>
                      <p className="text-[11px] font-semibold">Next step</p>
                      <p className="mt-0.5 text-[9px] text-[#828d85]">Support team review</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <p className="font-mono text-[8px] uppercase tracking-[0.13em] text-[#78847b]">How we’ll help</p>
                  <ul className="mt-4 space-y-4">
                    {details.map((item, index) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="grid size-6 shrink-0 place-items-center rounded-full border border-[#d8dfd7] bg-white font-mono text-[8px] text-[#68746c]">0{index + 1}</span>
                        <span className="pt-0.5 text-[10px] leading-4 text-[#536057]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveView("activity")}
                  className="mt-6 inline-flex items-center gap-2 text-[10px] font-medium text-[#344139] transition hover:text-black"
                >
                  View request activity <ArrowRight size={13} />
                </button>
              </aside>
            </div>
          ) : (
            <section className="mx-auto w-full max-w-[760px] p-5 sm:p-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#87918a]">Your service timeline</p>
                  <h3 className="mt-1 text-xl font-medium tracking-[-0.04em]">Request activity</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveView("request")}
                  className="inline-flex items-center gap-2 rounded-[11px] px-3 py-2 text-[10px] font-medium text-[#536057] transition hover:bg-white hover:text-[#17211d]"
                >
                  <FilePlus2 size={13} /> New request
                </button>
              </div>

              {trackerItems.length > 0 ? (
                <ol className="mt-7 space-y-3">
                  {trackerItems.map((item, index) => (
                    <li key={item.id} className="relative grid grid-cols-[28px_minmax(0,1fr)] gap-3">
                      {index < trackerItems.length - 1 && <span className="absolute bottom-[-14px] left-[13px] top-7 w-px bg-[#dce2dc]" />}
                      <span className="relative z-10 grid size-7 place-items-center rounded-full border border-[#dbe2d9] bg-white text-[#536258]" style={index === 0 ? { backgroundColor: themeStyles.accent, borderColor: themeStyles.accent } : undefined}>
                        {index === 0 ? <Check size={13} /> : <span className="size-1.5 rounded-full bg-current" />}
                      </span>
                      <article className="rounded-[17px] border border-[#e1e6df] bg-white p-4 shadow-[0_4px_14px_rgba(30,43,34,0.03)]">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#78847b]">{item.id}</span>
                            <span className="size-1 rounded-full bg-[#bec7bf]" />
                            <span className="text-[10px] font-medium text-[#435047]">{item.service}</span>
                          </div>
                          <span className="rounded-full px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.08em] text-[#334135]" style={{ backgroundColor: themeStyles.accent }}>
                            {item.status}
                          </span>
                        </div>
                        <p className="mt-3 text-[11px] leading-5 text-[#647068]">{item.update}</p>
                        <p className="mt-3 border-t border-[#edf0ec] pt-3 font-mono text-[7px] uppercase tracking-[0.09em] text-[#929b94]">
                          {index === 0 ? "Latest update" : "Request history"}
                        </p>
                      </article>
                    </li>
                  ))}
                </ol>
              ) : (
                <div className="mt-7 rounded-[20px] border border-dashed border-[#cfd8cf] bg-white/70 px-6 py-10 text-center">
                  <span className="mx-auto grid size-11 place-items-center rounded-[15px] text-[#18231f]" style={{ backgroundColor: themeStyles.accent }}><ClipboardList size={19} /></span>
                  <p className="mt-4 text-sm font-medium">Nothing submitted yet</p>
                  <p className="mx-auto mt-1 max-w-[290px] text-[11px] leading-5 text-[#7d8880]">Your requests and support updates will appear here once you submit a request.</p>
                  <button type="button" onClick={() => setActiveView("request")} className="mt-5 inline-flex items-center gap-2 rounded-[11px] bg-[#18231f] px-4 py-2.5 text-[10px] font-medium text-white transition hover:bg-[#293a32]">
                    Start a request <ArrowRight size={13} />
                  </button>
                </div>
              )}
            </section>
          )}
        </div>

      </div>
    </div>
  );
}
