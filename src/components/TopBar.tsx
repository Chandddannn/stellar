import { useEffect, useRef, useState } from "react";
import { Bell, Menu, X } from "lucide-react";
import DemoSwitcher, { type DemoMode } from "./DemoSwitcher";
import SiteMark from "./SiteMark";

interface TopBarProps {
  eyebrow?: string;
  mode: DemoMode;
  onModeChange: (mode: DemoMode) => void;
}

export default function TopBar({
  eyebrow = "Property lifecycle",
  mode,
  onModeChange,
}: TopBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    function handlePointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setIsMenuOpen(false);
    }

    document.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMenuOpen]);

  function selectMode(nextMode: DemoMode) {
    onModeChange(nextMode);
    setIsMenuOpen(false);
  }

  return (
    <header ref={headerRef} className="sticky top-0 z-[40] border-b border-line bg-paper/95 backdrop-blur-xl">
      <div className="grid h-[76px] grid-cols-[1fr_auto_1fr] items-center px-8 max-[900px]:grid-cols-[1fr_auto] max-[900px]:px-5">
        <SiteMark />

        <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-muted max-[900px]:hidden">
          {eyebrow}
        </div>

        <div className="flex justify-self-end gap-2">
          <button aria-label="Notifications" className="grid size-[34px] place-items-center border border-line bg-transparent transition-colors hover:bg-ink hover:text-white">
            <Bell size={17} strokeWidth={1.5} />
          </button>

          <button
            type="button"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="topbar-menu"
            onClick={() => setIsMenuOpen((open) => !open)}
            className={`grid size-[34px] place-items-center border transition-colors ${isMenuOpen ? "border-ink bg-ink text-white" : "border-line bg-transparent hover:bg-ink hover:text-white"}`}
          >
            {isMenuOpen ? <X size={17} strokeWidth={1.6} /> : <Menu size={18} strokeWidth={1.5} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div
          id="topbar-menu"
          className="absolute right-8 top-[calc(100%+10px)] z-[130] w-[min(360px,calc(100vw-32px))] border border-line bg-paper p-4 shadow-[0_18px_55px_rgba(0,0,0,0.2)] max-[900px]:right-4"
        >
          <div className="mb-3 flex items-end justify-between gap-3 border-b border-line pb-3">
            <div>
              <p className="font-mono text-[7px] uppercase tracking-[0.13em] text-muted">STELLAR workspace</p>
              <h2 className="mt-1 text-sm font-semibold tracking-[-0.02em]">Switch demo view</h2>
            </div>
            <span className="font-mono text-[7px] uppercase tracking-[0.08em] text-muted">Preview</span>
          </div>
          <DemoSwitcher mode={mode} onChange={selectMode} />
        </div>
      )}
    </header>
  );
}