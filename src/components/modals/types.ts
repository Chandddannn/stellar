import type { requests } from "../../data/demoData";

export type ServiceRequest = (typeof requests)[number] & {
  details?: string;
};