import { useEffect, useRef, useState, type FormEvent } from "react";
import { Headset, RotateCcw, Send, Sparkles, X } from "lucide-react";

import { construction, property } from "../../../data/demoData";

type ChatMessage = {
  id: number;
  sender: "assistant" | "buyer";
  text: string;
};

const postPossessionSuggestions = [
  "Register a home issue",
  "Transfer documents",
  "Parking or car wash",
  "Interior remodelling",
];

const prePossessionSuggestions = [
  "Construction progress",
  "Request site photos",
  "Book a site visit",
  "Handover timeline",
];

function getWelcomeMessage(context: "pre-possession" | "post-possession"): ChatMessage {
  return {
    id: 1,
    sender: "assistant",
    text: context === "pre-possession"
      ? "Hi! I’m your STELLAR construction assistant. Ask me about build progress, site visits, photos, documents, or handover."
      : "Hi! I’m the STELLAR home support assistant. What can I help you with today?",
  };
}

function getDemoReply(message: string, context: "pre-possession" | "post-possession") {
  const normalizedMessage = message.toLowerCase();

  if (context === "pre-possession") {
    if (/progress|construction|build|phase|status/.test(normalizedMessage)) {
      return `Construction is ${construction.progress}% complete and currently in ${construction.phase}. The next milestone is ${construction.nextPhase}.`;
    }
    if (/photo|picture|image/.test(normalizedMessage)) {
      return "Open Site Photos to browse updates by room and construction stage. You can also request a fresh photo directly from the gallery.";
    }
    if (/visit|tour|site/.test(normalizedMessage)) {
      return "You can request a site visit from My requests. Choose Visit and share a preferred date so the property team can coordinate access.";
    }
    if (/handover|possession|timeline|date|when/.test(normalizedMessage)) {
      return `The current estimated possession window for your home is ${property.possession}. The timeline will be updated as the final inspection approaches.`;
    }
    if (/document|agreement|invoice|paperwork/.test(normalizedMessage)) {
      return "Open Documents in your property controls to review available agreements, invoices, and property records.";
    }
    if (/modification|change|custom|upgrade/.test(normalizedMessage)) {
      return "Open Modification in your property controls to share a change request. The team will confirm feasibility and timing.";
    }
    return "I can help with construction progress, site photos, site visits, documents, modifications, and your handover timeline. What would you like to check?";
  }

  if (/issue|repair|leak|electric|plumb|maintenance|broken/.test(normalizedMessage)) {
    return "I can help start a home issue request. Tell me what happened and which room or area is affected. For urgent concerns, choose Register issue on the support desk to request a callback.";
  }

  if (/transfer|document|tax|electricity|paperwork/.test(normalizedMessage)) {
    return "For property, electricity, or house-tax transfers, open Transfer process and select the document type. The support team can then review your notes and documents.";
  }

  if (/parking|car|wash|vehicle/.test(normalizedMessage)) {
    return "Parking and car-wash requests are available for two-wheelers and four-wheelers. Open Car wash & parking to share your vehicle details and preferred service time.";
  }

  if (/remodel|design|deposit|interior/.test(normalizedMessage)) {
    return "For interior design or remodelling, submit your room scope, style, and budget in Interior remodelling. The applicable security deposit is payable before work begins.";
  }

  if (/agent|person|callback|call/.test(normalizedMessage)) {
    return "A support team member can call you within 5 minutes for an issue request. Choose Register issue on the support desk to submit your callback preference.";
  }

  return "Thanks for sharing that. I can guide you with home issues, transfers and documents, parking and car wash, or interior remodelling. Which service do you need?";
}

export default function SupportChatModal({
  onClose,
  context = "post-possession",
}: {
  onClose: () => void;
  context?: "pre-possession" | "post-possession";
}) {
  const welcomeMessage = getWelcomeMessage(context);
  const suggestions = context === "pre-possession" ? prePossessionSuggestions : postPossessionSuggestions;
  const [messages, setMessages] = useState<ChatMessage[]>(() => [welcomeMessage]);
  const [draft, setDraft] = useState("");
  const conversationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const conversation = conversationRef.current;
    if (conversation) conversation.scrollTop = conversation.scrollHeight;
  }, [messages]);

  function sendMessage(message: string) {
    const text = message.trim();
    if (!text) return;

    setMessages((previous) => [
      ...previous,
      { id: Date.now(), sender: "buyer", text },
      { id: Date.now() + 1, sender: "assistant", text: getDemoReply(text, context) },
    ]);
    setDraft("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(draft);
  }

  function resetConversation() {
    setMessages([getWelcomeMessage(context)]);
    setDraft("");
  }

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-end bg-[#101a17]/25 p-4 backdrop-blur-[2px] max-[550px]:items-end max-[550px]:p-0">
      <section
        aria-label="STELLAR support chat"
        aria-modal="true"
        className="flex h-[min(680px,calc(100dvh-32px))] w-full max-w-[410px] flex-col overflow-hidden rounded-[24px] border border-[#d8ddd6] bg-[#f8faf7] text-[#17211d] shadow-[0_24px_80px_rgba(16,26,23,0.26)] max-[550px]:h-[min(720px,calc(100dvh-16px))] max-[550px]:max-w-none max-[550px]:rounded-b-none"
        role="dialog"
      >
        <header className="relative flex shrink-0 items-center justify-between overflow-hidden bg-[#18231f] px-5 py-4 text-white">
          <div className="pointer-events-none absolute -right-12 -top-16 size-44 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-4 -top-8 size-28 rounded-full border border-white/10" />
          <div className="flex items-center gap-3">
            <div className="relative grid size-11 place-items-center rounded-[15px] bg-[#d7ff72] text-[#18231f] shadow-[0_6px_20px_rgba(215,255,114,0.18)]">
              <Headset size={18} />
              <span className="absolute -bottom-1 -right-1 size-3 rounded-full border-2 border-[#18231f] bg-[#8fe0a1]" />
            </div>
            <div>
              <h2 className="text-[13px] font-semibold tracking-[-0.01em]">
                {context === "pre-possession" ? "Construction assistant" : "STELLAR support"}
              </h2>
              <p className="mt-1 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.12em] text-white/60">
                <span className="size-1.5 rounded-full bg-[#8fe0a1]" />
                Assistant online
              </p>
            </div>
          </div>
          <div className="relative flex items-center gap-1">
            {messages.length > 1 && (
              <button
                type="button"
                onClick={resetConversation}
                aria-label="Start a new conversation"
                title="Start a new conversation"
                className="grid size-9 place-items-center rounded-full text-white/60 transition hover:bg-white/10 hover:text-white"
              >
                <RotateCcw size={15} />
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close support chat"
              className="grid size-9 place-items-center rounded-full text-white/70 transition hover:bg-white/10 hover:text-white"
            >
              <X size={17} />
            </button>
          </div>
        </header>

        <div className="flex items-center justify-between gap-3 border-b border-[#e1e5e0] bg-white px-5 py-3">
          <div className="min-w-0">
            <p className="truncate text-[10px] font-semibold text-[#2f3b33]">{property.project}</p>
            <p className="mt-1 font-mono text-[7px] uppercase tracking-[0.1em] text-[#808a83]">
              Home {property.unit}
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-full border border-[#e3e9e1] bg-[#f6f8f4] px-2.5 py-1.5">
            <Sparkles size={11} className="text-[#60714d]" />
            <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-[#536258]">
              Demo mode
            </span>
          </div>
        </div>

        <div
          ref={conversationRef}
          aria-live="polite"
          className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[radial-gradient(ellipse_at_top,#e9eee7_0%,#f3f5f1_48%)] px-4 py-5"
        >
          <p className="mx-auto w-fit rounded-full border border-[#e1e6df] bg-white/75 px-3 py-1 font-mono text-[7px] uppercase tracking-[0.12em] text-[#909a93]">
            Today · Support conversation
          </p>
          {messages.map((message) => (
            <div key={message.id} className={`flex items-end gap-2 ${message.sender === "buyer" ? "justify-end" : "justify-start"}`}>
              {message.sender === "assistant" && (
                <span className="grid size-7 shrink-0 place-items-center rounded-[10px] bg-[#18231f] text-[#d7ff72]">
                  <Headset size={13} />
                </span>
              )}
              <div className={`max-w-[82%] ${message.sender === "buyer" ? "text-right" : "text-left"}`}>
                <p className="mb-1 px-1 font-mono text-[7px] uppercase tracking-[0.08em] text-[#909a93]">
                  {message.sender === "buyer" ? "You" : "STELLAR assistant"}
                </p>
                <p
                  className={`whitespace-pre-wrap rounded-[17px] px-4 py-3 text-left text-[12px] leading-5 shadow-[0_3px_12px_rgba(30,43,34,0.04)] ${
                    message.sender === "buyer"
                      ? "rounded-br-[5px] bg-[#18231f] text-white"
                      : "rounded-bl-[5px] border border-[#e1e5e0] bg-white text-[#344139]"
                  }`}
                >
                  {message.text}
                </p>
              </div>
            </div>
          ))}

          {messages.length === 1 && (
            <div className="space-y-2 pt-1">
              <p className="font-mono text-[7px] uppercase tracking-[0.1em] text-[#8a948d]">
                Quick start
              </p>
              <div className="grid grid-cols-2 gap-2">
                {suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => sendMessage(suggestion)}
                    className="group flex min-h-12 items-center justify-between gap-2 rounded-[13px] border border-[#dce3db] bg-white px-3 py-2 text-left text-[9px] font-medium leading-4 text-[#46544a] shadow-[0_3px_12px_rgba(30,43,34,0.03)] transition hover:-translate-y-0.5 hover:border-[#aeb9ae] hover:bg-[#18231f] hover:text-white"
                  >
                    {suggestion}
                    <span className="text-[#9ca79d] transition group-hover:text-[#d7ff72]">↗</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="shrink-0 border-t border-[#e1e5e0] bg-white p-4">
          <div className="flex items-end gap-2 rounded-[16px] border border-[#d8ddd6] bg-[#f8faf7] p-2 pl-4 transition focus-within:border-[#9ba89c] focus-within:shadow-[0_0_0_3px_rgba(24,35,31,0.05)]">
            <label className="sr-only" htmlFor="support-chat-message">
              Message support
            </label>
            <textarea
              id="support-chat-message"
              rows={1}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage(draft);
                }
              }}
              placeholder="Write a message..."
              className="max-h-24 min-h-9 flex-1 resize-none self-center bg-transparent py-2 text-[12px] text-[#17211d] outline-none placeholder:text-[#929b95]"
            />
            <button
              type="submit"
              disabled={!draft.trim()}
              aria-label="Send message"
              className="grid size-9 shrink-0 place-items-center rounded-[12px] bg-[#18231f] text-[#d7ff72] transition hover:-translate-y-0.5 hover:bg-[#293a32] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Send size={15} />
            </button>
          </div>
          <p className="mt-2 text-center font-mono text-[7px] uppercase tracking-[0.08em] text-[#939c96]">
            Sample responses · not connected to live support
          </p>
        </form>
      </section>
    </div>
  );
}
