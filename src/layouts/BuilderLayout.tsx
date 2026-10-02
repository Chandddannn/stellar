import type { ReactNode } from "react";
import type { DemoMode } from "../components/DemoSwitcher";
import TopBar from "../components/TopBar";

interface BuilderLayoutProps {
  children: ReactNode;
  mode: DemoMode;
  onModeChange: (mode: DemoMode) => void;
}

export default function BuilderLayout({
  children,
  mode,
  onModeChange,
}: BuilderLayoutProps) {
  return (
    <div className="min-h-screen">
      <TopBar
        mode={mode}
        onModeChange={onModeChange}
        eyebrow="STELLAR Admin / Service operations"
      />

      <main className="mx-auto max-w-[1480px] px-12 pb-[120px] pt-[90px] max-[900px]:px-5 max-[900px]:pb-20 max-[900px]:pt-[60px]">
        {children}
      </main>
    </div>
  );
}