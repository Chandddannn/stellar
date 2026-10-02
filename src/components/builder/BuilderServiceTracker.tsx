import { useState } from "react";
import { ArrowUpRight, LogOut, Search, SlidersHorizontal } from "lucide-react";

import BuilderRequestModal from "../modals/BuilderRequestModal";
import {
  serviceAdminDemoRequests,
  type ServiceActivityPhase,
  type ServiceAdminRequest,
  type ServiceRequestStatus,
} from "../../data/serviceAdminDemoData";

const serviceOptions = [
  "All services",
  "Construction photos",
  "Site visit",
  "Modification request",
  "Documents",
  "Property 360",
  "Register issue",
  "Transfer process",
  "Car wash & parking",
  "Documentation issue",
  "Interior remodelling",
  "General service",
];

const statusOptions = [
  "All statuses",
  "New",
  "In review",
  "Waiting on buyer",
  "Scheduled",
  "Resolved",
] as const;

const buildingOptions = [
  "Skyline Crest · All towers",
  "Skyline Crest · Tower A",
  "Skyline Crest · Tower B",
  "Skyline Crest · Tower C",
];

const phases: ServiceActivityPhase[] = ["Pre-possession", "Post-possession"];

type StatusFilter = (typeof statusOptions)[number];
type BuilderServiceTrackerProps = { onLogout: () => void };

const statusStyles: Record<ServiceRequestStatus, string> = {
  New: "bg-[#e7efe0] text-[#40543c]",
  "In review": "bg-[#e8e9e3] text-[#53564c]",
  "Waiting on buyer": "bg-[#f4e9d7] text-[#775c33]",
  Scheduled: "bg-[#e1ebed] text-[#3f5c62]",
  Resolved: "bg-[#e4e8e2] text-[#5c695c]",
};

const priorityStyles = {
  Urgent: "text-[#a24635]",
  High: "text-[#9a6a30]",
  Normal: "text-[#6e776f]",
} as const;

export default function BuilderServiceTracker({ onLogout }: BuilderServiceTrackerProps) {
  const [requests, setRequests] = useState(serviceAdminDemoRequests);
  const [phase, setPhase] = useState<ServiceActivityPhase>("Pre-possession");
  const [buildingFilter, setBuildingFilter] = useState(buildingOptions[0]);
  const [serviceFilter, setServiceFilter] = useState("All services");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("All statuses");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);

  const matchesBuilding = (request: ServiceAdminRequest) =>
    buildingFilter.endsWith("All towers") ||
    `${request.building} · ${request.tower}` === buildingFilter;

  const phaseRequests = requests.filter(
    (request) => request.phase === phase && matchesBuilding(request),
  );
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredRequests = phaseRequests.filter((request) => {
    const matchesService = serviceFilter === "All services" || request.service === serviceFilter;
    const matchesStatus = statusFilter === "All statuses" || request.status === statusFilter;
    const matchesQuery =
      !normalizedSearch ||
      [request.id, request.subject, request.service, request.buyer, request.unit]
        .some((value) => value.toLowerCase().includes(normalizedSearch));
    return matchesService && matchesStatus && matchesQuery;
  });

  const selectedRequest = requests.find((request) => request.id === selectedRequestId) ?? null;
  const metrics = [
    { label: "Active queue", value: phaseRequests.filter((request) => request.status !== "Resolved").length, detail: "Needs attention" },
    { label: "Urgent", value: phaseRequests.filter((request) => request.priority === "Urgent").length, detail: "Priority requests" },
    { label: "Waiting on buyer", value: phaseRequests.filter((request) => request.status === "Waiting on buyer").length, detail: "Follow-up needed" },
    { label: "Resolved", value: phaseRequests.filter((request) => request.status === "Resolved").length, detail: "Completed requests" },
  ];

  function clearFilters() {
    setServiceFilter("All services");
    setStatusFilter("All statuses");
    setSearchTerm("");
  }

  return (
    <>
      <section className="border-y border-line bg-paper">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-line px-6 py-6 sm:px-8">
          <div>
            <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted">STELLAR ADMIN / SERVICE DESK</p>
            <h2 className="mt-2 text-[clamp(26px,4vw,40px)] font-medium leading-none tracking-[-0.06em]">Building activity</h2>
            <p className="mt-2 max-w-[560px] text-[11px] leading-5 text-muted">
              Review buyer activity by possession phase, open each workflow, and record admin follow-up.
            </p>
          </div>
          <div className="flex items-end gap-3">
            <label className="flex flex-col gap-1">
              <span className="font-mono text-[7px] uppercase tracking-[0.1em] text-muted">Building / tower</span>
              <select
                value={buildingFilter}
                onChange={(event) => setBuildingFilter(event.target.value)}
                className="h-9 min-w-[190px] border border-line bg-paper px-3 text-[9px] outline-none focus:border-ink"
              >
                {buildingOptions.map((building) => <option key={building}>{building}</option>)}
              </select>
            </label>
            <button
              type="button"
              onClick={onLogout}
              className="grid size-9 place-items-center border border-line text-muted transition hover:bg-ink hover:text-white"
              aria-label="Sign out of STELLAR Admin"
              title="Sign out"
            >
              <LogOut size={14} />
            </button>
          </div>
        </header>

        <div className="flex items-center justify-between gap-4 border-b border-line px-4 sm:px-6">
          <div className="flex gap-1" role="tablist" aria-label="Possession activity phase">
            {phases.map((phaseOption) => {
              const count = requests.filter(
                (request) => request.phase === phaseOption && matchesBuilding(request),
              ).length;
              const active = phase === phaseOption;
              return (
                <button
                  key={phaseOption}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setPhase(phaseOption);
                    setServiceFilter("All services");
                    setStatusFilter("All statuses");
                  }}
                  className={`relative flex items-center gap-2 px-3 py-4 text-[10px] transition sm:px-4 ${active ? "font-semibold text-ink" : "text-muted hover:text-ink"}`}
                >
                  {phaseOption}
                  <span className="font-mono text-[7px]">{count.toString().padStart(2, "0")}</span>
                  {active && <span className="absolute inset-x-3 bottom-0 h-[2px] bg-ink sm:inset-x-4" />}
                </button>
              );
            })}
          </div>
          <span className="hidden font-mono text-[7px] uppercase tracking-[0.1em] text-muted sm:block">
            {phase} · Skyline Crest
          </span>
        </div>

        <div className="grid grid-cols-4 divide-x divide-line border-b border-line max-[650px]:grid-cols-2 max-[650px]:divide-x-0 max-[650px]:divide-y">
          {metrics.map((metric) => (
            <div key={metric.label} className="px-5 py-4 sm:px-7">
              <p className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted">{metric.label}</p>
              <div className="mt-2 flex items-end justify-between gap-2">
                <strong className="text-[28px] font-medium leading-none tracking-[-0.06em]">{metric.value.toString().padStart(2, "0")}</strong>
                <span className="text-right text-[8px] text-muted">{metric.detail}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-2.5 border-b border-line p-4 sm:px-6">
          <label className="relative min-w-[220px] flex-1">
            <span className="sr-only">Search requests</span>
            <Search size={14} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search request, buyer, unit..."
              className="h-10 w-full border border-line bg-transparent pl-9 pr-3 text-[10px] outline-none transition focus:border-ink"
            />
          </label>
          <label className="relative">
            <span className="sr-only">Filter by service</span>
            <SlidersHorizontal size={12} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <select
              value={serviceFilter}
              onChange={(event) => setServiceFilter(event.target.value)}
              className="h-10 min-w-[175px] appearance-none border border-line bg-paper pl-8 pr-8 text-[10px] outline-none focus:border-ink"
            >
              {serviceOptions.map((service) => <option key={service}>{service}</option>)}
            </select>
          </label>
          <label>
            <span className="sr-only">Filter by status</span>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value as StatusFilter)}
              className="h-10 min-w-[140px] border border-line bg-paper px-3 text-[10px] outline-none focus:border-ink"
            >
              {statusOptions.map((status) => <option key={status}>{status}</option>)}
            </select>
          </label>
        </div>

        <div role="table" aria-label={`${phase} service request queue`}>
          <div role="row" className="grid grid-cols-[minmax(0,1.5fr)_minmax(120px,1fr)_minmax(115px,.8fr)_minmax(125px,.9fr)_70px_140px] gap-3 border-b border-line px-6 py-3 font-mono text-[7px] uppercase tracking-[0.1em] text-muted max-[950px]:grid-cols-[minmax(0,1.5fr)_minmax(125px,1fr)_minmax(120px,.9fr)_140px] max-[950px]:px-4 max-[950px]:[&>*:nth-child(3)]:hidden max-[950px]:[&>*:nth-child(4)]:hidden max-[950px]:[&>*:nth-child(5)]:hidden max-[650px]:grid-cols-[minmax(0,1fr)_130px] max-[650px]:[&>*:nth-child(2)]:hidden">
            <span role="columnheader">Activity / service</span>
            <span role="columnheader">Buyer / unit</span>
            <span role="columnheader">Submitted</span>
            <span role="columnheader">Assigned to</span>
            <span role="columnheader">Priority</span>
            <span role="columnheader">Status</span>
          </div>

          {filteredRequests.length > 0 ? filteredRequests.map((request) => (
            <button
              key={request.id}
              type="button"
              role="row"
              onClick={() => setSelectedRequestId(request.id)}
              aria-label={`Open ${request.id}: ${request.subject}`}
              className="grid w-full grid-cols-[minmax(0,1.5fr)_minmax(120px,1fr)_minmax(115px,.8fr)_minmax(125px,.9fr)_70px_140px] items-center gap-3 border-b border-line bg-transparent px-6 py-4 text-left transition-colors hover:bg-[#efeee8] focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-inset focus-visible:outline-ink max-[950px]:grid-cols-[minmax(0,1.5fr)_minmax(125px,1fr)_minmax(120px,.9fr)_140px] max-[950px]:px-4 max-[650px]:grid-cols-[minmax(0,1fr)_130px]"
            >
              <span role="cell" className="min-w-0">
                <strong className="block truncate text-[11px] font-medium">{request.subject}</strong>
                <span className="mt-1 block truncate font-mono text-[7px] uppercase tracking-[0.08em] text-muted">{request.id} · {request.service}</span>
              </span>
              <span role="cell" className="min-w-0 max-[650px]:hidden">
                <span className="block truncate text-[10px]">{request.buyer}</span>
                <span className="mt-1 block truncate text-[8px] text-muted">{request.building} · {request.tower} · {request.unit.split(" · ")[1]}</span>
              </span>
              <span role="cell" className="text-[9px] text-muted max-[950px]:hidden">{request.submitted}</span>
              <span role="cell" className="truncate text-[9px] text-muted max-[950px]:hidden">{request.assignee}</span>
              <span role="cell" className={`font-mono text-[8px] uppercase ${priorityStyles[request.priority]} max-[950px]:hidden`}>{request.priority}</span>
              <span role="cell" className="flex items-center justify-between gap-2">
                <span className={`inline-flex max-w-full items-center truncate px-2 py-1 font-mono text-[7px] uppercase tracking-[0.04em] ${statusStyles[request.status]}`}>
                  {request.status}
                </span>
                <ArrowUpRight size={13} className="shrink-0 text-muted" />
              </span>
            </button>
          )) : (
            <div className="px-6 py-14 text-center">
              <p className="text-sm font-medium">No activity matches these filters.</p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-3 font-mono text-[8px] uppercase tracking-[0.1em] text-muted underline underline-offset-4 hover:text-ink"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>

        <footer className="border-t border-line px-6 py-3 font-mono text-[7px] uppercase tracking-[0.1em] text-muted sm:px-8">
          Demo records · Select an activity to view its steps and update it
        </footer>
      </section>

      {selectedRequest && (
        <BuilderRequestModal
          request={selectedRequest}
          onClose={() => setSelectedRequestId(null)}
          onSave={(updates) => setRequests((previous) => previous.map((request) =>
            request.id === selectedRequest.id ? { ...request, ...updates } : request,
          ))}
        />
      )}
    </>
  );
}
