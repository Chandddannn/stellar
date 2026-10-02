import type { FormEvent, ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

export type TrackerItem = {
  id: string;
  service: string;
  status: string;
  update: string;
};

export const modalThemes = {
  issue: {
    shell: "bg-[#f5f7f3]",
    accent: "#d7ff72",
    badge: "bg-[#d7ff72] text-[#18231f]",
    side: "bg-[#18231f] text-white",
    sideBadge: "text-[#d7ff72]",
    info: "bg-[#eef1ec] text-[#24312d]",
  },
  transfer: {
    shell: "bg-[#eef5f1]",
    accent: "#c9f7db",
    badge: "bg-[#c9f7db] text-[#153128]",
    side: "bg-[#153128] text-white",
    sideBadge: "text-[#c9f7db]",
    info: "bg-[#dff5ea] text-[#16342b]",
  },
  parking: {
    shell: "bg-[#f6f3ee]",
    accent: "#f3d5a5",
    badge: "bg-[#f3d5a5] text-[#2d220e]",
    side: "bg-[#2d220e] text-white",
    sideBadge: "text-[#f3d5a5]",
    info: "bg-[#f9f0e2] text-[#362709]",
  },
  documentation: {
    shell: "bg-[#f4f4f7]",
    accent: "#c5d4ff",
    badge: "bg-[#c5d4ff] text-[#1d254b]",
    side: "bg-[#1d254b] text-white",
    sideBadge: "text-[#c5d4ff]",
    info: "bg-[#edf0ff] text-[#1d254b]",
  },
  remodelling: {
    shell: "bg-[#f7f3f5]",
    accent: "#f5c7d7",
    badge: "bg-[#f5c7d7] text-[#3d1d2b]",
    side: "bg-[#3d1d2b] text-white",
    sideBadge: "text-[#f5c7d7]",
    info: "bg-[#fbeaf1] text-[#3d1d2b]",
  },
  general: {
    shell: "bg-[#f5f7f3]",
    accent: "#d8f0b4",
    badge: "bg-[#d8f0b4] text-[#1d2d15]",
    side: "bg-[#1d2d15] text-white",
    sideBadge: "text-[#d8f0b4]",
    info: "bg-[#edf7dc] text-[#1d2d15]",
  },
} as const;

export type ServiceThemeKey = keyof typeof modalThemes;

export type ServiceModalFrameProps = {
  theme: ServiceThemeKey;
  icon: LucideIcon;
  title: string;
  tag: string;
  description: string;
  details: string[];
  footerMessage: string;
  trackerItems: TrackerItem[];
  onClose: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void | boolean;
  submitLabel?: string;
  children: ReactNode;
};
