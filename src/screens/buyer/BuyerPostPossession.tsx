import { useState, type FormEvent } from "react";

import {
  ArrowUpRight,
  BadgeCheck,
  Building2,
  CarFront,
  ClipboardList,
  FileText,
  Home,
  MapPin,
  MessageCircle,
  MessageSquareText,
  Settings,
  Sparkles,
  Wrench,
} from "lucide-react";

import BuyerNavItem from "../../components/buyer/BuyerNavItem";
import PropertyInfoPill from "../../components/buyer/PropertyInfoPill";
import StatusCard from "../../components/cards/StatusCard";
import DocumentationModal from "../../components/modals/service/DocumentationModal";
import GeneralServiceModal from "../../components/modals/service/GeneralServiceModal";
import IssueModal from "../../components/modals/service/IssueModal";
import ParkingModal from "../../components/modals/service/ParkingModal";
import RemodellingModal from "../../components/modals/service/RemodellingModal";
import SupportChatModal from "../../components/modals/service/SupportChatModal";
import TransferModal from "../../components/modals/service/TransferModal";
import { property } from "../../data/demoData";

const serviceTiles = [
  {
    id: "issue",
    icon: MessageSquareText,
    title: "Register issue",
    description:
      "Chat to register your issue and a team member will call you in 5 minutes or connect you to an agent.",
    tag: "Quick support",
    details: [
      "Request a callback from the property support team within 5 minutes.",
      "Speak with an agent if the issue needs live troubleshooting.",
      "Track the issue status from submission to resolution.",
    ],
  },
  {
    id: "transfer",
    icon: Building2,
    title: "Transfer process",
    description:
      "Electricity, property transfer, house tax, and owner document upload support in one step.",
    tag: "Docs & transfer",
    details: [
      "Upload all relevant transfer and owner documents.",
      "Submit electricity, property transfer, and tax-related requests together.",
      "Track document verification and approval updates in one flow.",
    ],
  },
  {
    id: "parking",
    icon: CarFront,
    title: "Car wash & parking",
    description:
      "Submit a request for two-wheeler and four-wheeler parking or car wash services.",
    tag: "Vehicle services",
    details: [
      "Apply for parking slots for two-wheelers or four-wheelers.",
      "Request car wash services for regular cleaning and maintenance.",
      "Submit vehicle details and service timing preferences.",
    ],
  },
  {
    id: "documentation",
    icon: FileText,
    title: "Documentation issue",
    description:
      "Register any documentation concern, missing records, or approval follow-up directly with the support desk.",
    tag: "Document support",
    details: [
      "Report missing documentation, references, or approval delays.",
      "Upload supporting records for faster review.",
      "Receive status tracking until the issue is resolved.",
    ],
  },
  {
    id: "remodelling",
    icon: Sparkles,
    title: "Interior remodelling",
    description:
      "Request design assistance and interior remodelling with submission and security deposit details.",
    tag: "Design request",
    details: [
      "Share your design concept, room scope, and desired finish style.",
      "Confirm the required security deposit before work begins.",
      "Track design review and approval updates in one timeline.",
    ],
  },
  {
    id: "general",
    icon: Wrench,
    title: "General service",
    description:
      "Maintenance, repairs, and ad-hoc service requests for your home after possession.",
    tag: "Home services",
    details: [
      "Submit general maintenance and repair requests.",
      "List scope, urgency, and preferred service time.",
      "Monitor status updates from the support team.",
    ],
  },
];

const transferSteps = [
  "Choose the transfer type and confirm the owner, unit, and project details.",
  "Upload a clear photo or scan of the relevant bill, ID, tax record, or ownership document.",
  "Add notes explaining the request, reference numbers, and any missing or incorrect records.",
  "Provide a reachable phone number, choose phone or WhatsApp, select a contact time, and authorize follow-up.",
  "Submit the request. The support team verifies the details, contacts you if anything else is needed, and updates the tracker until transfer completion.",
];

const otherInfo = [
  "Buyer security deposit payable before interior work begins",
  "Call-back assistance available for urgent documentation issues",
  "Parking and vehicle services can be requested for both two-wheelers and four-wheelers",
  "Support team will review documents and share the next action within 5 minutes",
];

type TrackerItem = {
  id: string;
  service: string;
  status: string;
  update: string;
};

export default function BuyerPostPossession() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<
    (typeof serviceTiles)[number] | null
  >(null);

  const [trackingItems, setTrackingItems] = useState<TrackerItem[]>([
    {
      id: "REQ-4012",
      service: "Register issue",
      status: "In review",
      update: "Support team has been assigned and will call you shortly.",
    },
    {
      id: "REQ-4011",
      service: "Interior remodelling",
      status: "Submitted",
      update: "Design brief received and deposit details are being checked.",
    },
    {
      id: "REQ-4009",
      service: "Car wash & parking",
      status: "Scheduled",
      update: "Vehicle request confirmed for the preferred schedule.",
    },
  ]);

  function handleServiceSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!selectedService) return;

    const formData = new FormData(event.currentTarget);
    const requestType = String(formData.get("requestType") ?? "General request");
    const timeline = String(formData.get("timeline") ?? "Flexible");
    const details = String(formData.get("details") ?? "").trim();
    const ownerName = String(formData.get("name") ?? property.owner).trim();
    const unit = String(formData.get("unit") ?? property.unit).trim();
    const project = String(formData.get("project") ?? property.project).trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const followUpMethod = String(formData.get("followUpMethod") ?? "").trim();
    const attachments = formData
      .getAll("attachment")
      .filter((attachment): attachment is File => attachment instanceof File && Boolean(attachment.name))
      .map((attachment) => attachment.name);
    const followUpDetails =
      selectedService.id === "transfer" && phone
        ? `Follow-up: ${followUpMethod} at ${phone} (${timeline})`
        : timeline;

    const trackerItem: TrackerItem = {
      id: `REQ-${String(Date.now()).slice(-5)}`,
      service: selectedService.title,
      status: "Submitted",
      update: [
        requestType,
        followUpDetails,
        ownerName,
        unit,
        ...(selectedService.id === "transfer" ? [project] : []),
        ...(attachments.length > 0 ? [`Files: ${attachments.join(", ")}`] : []),
        ...(details ? [details] : []),
      ].join(" • "),
    };

    setTrackingItems((previous) => [trackerItem, ...previous]);
    event.currentTarget.reset();
  }

  const visibleTracker = selectedService
    ? trackingItems.filter((item) => item.service === selectedService.title)
    : [];

  function renderServiceModal() {
    if (!selectedService) return null;

    const sharedProps = {
      onClose: () => setSelectedService(null),
      onSubmit: handleServiceSubmit,
      trackerItems: visibleTracker,
    };

    switch (selectedService.id) {
      case "issue":
        return <IssueModal {...sharedProps} />;
      case "transfer":
        return <TransferModal {...sharedProps} />;
      case "parking":
        return <ParkingModal {...sharedProps} />;
      case "documentation":
        return <DocumentationModal {...sharedProps} />;
      case "remodelling":
        return <RemodellingModal {...sharedProps} />;
      case "general":
        return <GeneralServiceModal {...sharedProps} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen bg-[#eef1ec] text-[#17211d]">
      <aside className="fixed left-5 top-1/2 z-50 -translate-y-1/2 max-[900px]:bottom-4 max-[900px]:left-1/2 max-[900px]:top-auto max-[900px]:w-[calc(100%-32px)] max-[900px]:-translate-x-1/2 max-[900px]:translate-y-0">
        <div className="group flex w-[68px] flex-col items-center rounded-[24px] border border-white/70 bg-[#18231f]/95 py-3 shadow-[0_20px_60px_rgba(17,28,23,0.22)] backdrop-blur-xl transition-all duration-300 hover:w-48 max-[900px]:w-full max-[900px]:flex-row max-[900px]:justify-between max-[900px]:px-3">
          <div className="mb-5 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#d7ff72] text-[#18231f] max-[900px]:mb-0">
            <Home size={18} />
          </div>

          <nav className="flex w-full flex-col gap-2 max-[900px]:flex-row">
            <BuyerNavItem
              icon={<Home size={17} />}
              label="Overview"
              active
              onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
            />
            <BuyerNavItem
              icon={<ClipboardList size={17} />}
              label="Requests"
              onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
            />
            <BuyerNavItem
              icon={<FileText size={17} />}
              label="Docs"
              onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
            />
            <BuyerNavItem
              icon={<Wrench size={17} />}
              label="Support"
              onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
            />
          </nav>

          <div className="my-4 h-px w-8 bg-white/10 max-[900px]:hidden" />

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white/50 transition hover:bg-white/10 hover:text-white"
          >
            <Settings size={17} />
          </button>
        </div>
      </aside>

      <main className="ml-[92px] pr-6 max-[900px]:ml-0 max-[900px]:px-4 max-[900px]:pb-24">
        <section className="relative overflow-hidden rounded-[30px] bg-[#18231f] text-white shadow-[0_25px_80px_rgba(22,35,29,0.18)]">
          <div className="pointer-events-none absolute -right-32 -top-32 h-[420px] w-[420px] rounded-full bg-[#d7ff72]/10 blur-3xl" />

          <div className="relative grid min-h-[510px] grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] max-[1050px]:grid-cols-1">
            <div className="flex min-w-0 flex-col justify-between p-9 lg:p-12">
              <div>
                <p className="mb-5 text-sm font-medium text-[#d7ff72]">
                  Hello, {property.owner.split(" ")[0]}
                </p>

                <div className="flex items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-white/45">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#d7ff72]" />
                  Your home
                </div>

                <h1 className="mt-6 max-w-[500px] text-[clamp(48px,6vw,82px)] font-medium leading-[0.86] tracking-[-0.075em]">
                  Home support,
                  <br />
                  <span className="text-white/80">made simple.</span>
                </h1>

                <div className="mt-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.12em] text-white/50">
                  <span>{property.project}</span>
                  <span className="h-px w-5 bg-white/20" />
                  <span>{property.unit}</span>
                </div>
              </div>

              <div className="mt-12">
                <div className="flex items-center gap-2 text-white/50">
                  <MapPin size={13} />
                  <span className="font-mono text-[8px] uppercase tracking-[0.12em]">
                    {property.location}
                  </span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  <PropertyInfoPill text={property.type} />
                  <PropertyInfoPill text={property.area} />
                  <PropertyInfoPill text={`Tower ${property.tower}`} />
                </div>
              </div>
            </div>

            <div className="flex items-end justify-center p-9 lg:p-12">
              <div className="w-full max-w-[560px] rounded-[28px] border border-white/10 bg-white/[0.03] p-7 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/45">
                      Home status
                    </div>
                    <div className="mt-3 text-[clamp(28px,3vw,44px)] font-medium tracking-[-0.06em] text-[#d7ff72]">
                      ACTIVE
                    </div>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#d7ff72]/30 bg-[#d7ff72]/10 text-[#d7ff72]">
                    <BadgeCheck size={18} />
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[20px] border border-white/10 bg-[#f4f5ef]/5 p-4">
                    <div className="font-mono text-[7px] uppercase tracking-[0.12em] text-white/45">
                      Call-back
                    </div>
                    <div className="mt-3 text-xl font-medium tracking-[-0.05em] text-white">
                      5 mins
                    </div>
                  </div>

                  <div className="rounded-[20px] border border-white/10 bg-[#f4f5ef]/5 p-4">
                    <div className="font-mono text-[7px] uppercase tracking-[0.12em] text-white/45">
                      Agent desk
                    </div>
                    <div className="mt-3 text-xl font-medium tracking-[-0.05em] text-white">
                      Live support
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-4 grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[550px]:grid-cols-1">
          <StatusCard label="Home status" value="Active" detail="All support flows open" accent />
          <StatusCard label="Transfer" value="Electricity" detail="Docs upload" />
          <StatusCard label="Parking" value="2 & 4 wheel" detail="Wash + slots" />
          <StatusCard label="Deposit" value="Security" detail="For remodelling" />
        </section>

        <section className="mt-4 rounded-[30px] border border-[#d8ddd6] bg-white p-7 lg:p-10">
          <div className="flex items-end justify-between gap-6 max-[700px]:flex-col max-[700px]:items-start">
            <div>
              <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#78827c]">
                Support desk
              </div>
              <h2 className="mt-3 text-[clamp(42px,5vw,68px)] font-medium leading-[0.88] tracking-[-0.075em]">
                What do you need?
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setIsChatOpen(true)}
              className="flex items-center gap-2 rounded-full border border-[#d8ddd6] px-4 py-2.5 font-mono text-[8px] uppercase tracking-[0.1em] transition hover:bg-[#18231f] hover:text-white"
            >
              Chat with agent
              <ArrowUpRight size={13} />
            </button>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-0 max-[900px]:grid-cols-1">
            {serviceTiles.map((service) => {
              const { icon: Icon, title, description, tag } = service;

              return (
                <button
                  key={title}
                  type="button"
                  onClick={() => setSelectedService(service)}
                  className="group grid min-h-[200px] grid-cols-[auto_1fr_auto] items-start gap-[18px] border border-r-0 border-[#d8ddd6] bg-transparent p-7 text-left transition-colors hover:bg-[#18231f] hover:text-white last:border-r max-[900px]:border-r max-[900px]:border-b-0"
                >
                  <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl border border-current/10 bg-[#eef1ec] text-[#18231f] group-hover:bg-[#d7ff72] group-hover:text-[#18231f]">
                    <Icon size={18} />
                  </div>

                  <span className="flex flex-col gap-2">
                    <strong className="text-sm font-medium">{title}</strong>
                    <small className="text-[11px] leading-5 text-[#78827c] group-hover:text-[#dfe5df]">
                      {description}
                    </small>
                    <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-[#78827c] group-hover:text-[#d7ff72]">
                      {tag}
                    </span>
                  </span>

                  <ArrowUpRight size={17} />
                </button>
              );
            })}
          </div>
        </section>

        <section className="mt-4 grid grid-cols-[1.1fr_0.9fr] gap-4 max-[900px]:grid-cols-1">
          <div className="rounded-[30px] border border-[#d8ddd6] bg-white p-7 lg:p-10">
            <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#78827c]">
              Transfer process
            </div>
            <h3 className="mt-3 text-[clamp(30px,4vw,52px)] font-medium leading-[0.9] tracking-[-0.06em]">
              From transfer details to final confirmation
            </h3>

            <div className="mt-7 space-y-4">
              {transferSteps.map((step, index) => (
                <div key={step} className="flex items-start gap-4 rounded-[16px] border border-[#d8ddd6] bg-[#f6f7f4] p-4">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#d7ff72] font-mono text-[8px] font-medium text-[#18231f]">
                    {index + 1}
                  </div>
                  <span className="text-[12px] leading-5 text-[#24312d]">{step}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#e3e7e1] pt-5">
              <p className="max-w-[360px] text-[10px] leading-5 text-[#78827c]">
                Have the owner details and supporting documents ready before you begin.
              </p>
              <button
                type="button"
                onClick={() => setSelectedService(serviceTiles[1])}
                className="inline-flex items-center gap-2 rounded-[12px] bg-[#18231f] px-4 py-3 text-[10px] font-medium text-white transition hover:bg-[#293a32] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#18231f]"
              >
                Request a transfer
                <ArrowUpRight size={14} />
              </button>
            </div>
          </div>

          <div className="rounded-[30px] border border-[#d8ddd6] bg-[#18231f] p-7 text-white lg:p-10">
            <div className="flex items-center justify-between gap-3">
              <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#d7ff72]">
                Interior request
              </div>
              <span className="rounded-full border border-white/15 px-2.5 py-1 font-mono text-[7px] uppercase tracking-[0.1em] text-white/55">
                4 stages
              </span>
            </div>
            <h3 className="mt-3 text-[clamp(30px,4vw,46px)] font-medium leading-[0.92] tracking-[-0.06em]">
              Design to build.
            </h3>
            <p className="mt-3 max-w-[360px] text-[11px] leading-5 text-white/55">
              A clear path from your first brief to an approved, scheduled project.
            </p>

            <ol className="mt-6 space-y-4">
              {[
                ["01", "Share your brief", "Choose rooms, style, and budget."],
                ["02", "Design consultation", "The team reviews your scope and follows up."],
                ["03", "Approve the proposal", "Confirm the final design, quote, and schedule."],
                ["04", "Deposit and work start", "Buyer pays the security deposit before work begins."],
              ].map(([number, title, description], index) => (
                <li key={number} className="flex items-start gap-3">
                  <span className={`grid size-7 shrink-0 place-items-center rounded-full font-mono text-[8px] ${index === 0 ? "bg-[#d7ff72] text-[#18231f]" : "border border-white/15 text-white/55"}`}>
                    {number}
                  </span>
                  <div className="min-w-0 flex-1 border-b border-white/10 pb-3">
                    <div className="text-[11px] font-medium text-white">{title}</div>
                    <p className="mt-1 text-[9px] leading-4 text-white/55">{description}</p>
                  </div>
                </li>
              ))}
            </ol>

            <button
              type="button"
              onClick={() => setSelectedService(serviceTiles[4])}
              className="mt-5 inline-flex w-full items-center justify-between rounded-[12px] bg-[#d7ff72] px-4 py-3 text-[10px] font-semibold text-[#18231f] transition hover:bg-[#e2ff9c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d7ff72]"
            >
              Start remodelling request
              <ArrowUpRight size={15} />
            </button>
          </div>
        </section>

        <section className="mt-4 rounded-[30px] border border-[#d8ddd6] bg-white p-7 lg:p-10">
          <div className="flex items-end justify-between gap-6 max-[700px]:flex-col max-[700px]:items-start">
            <div>
              <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#78827c]">
                Remodelling request
              </div>
              <h2 className="mt-3 text-[clamp(34px,4vw,58px)] font-medium leading-[0.9] tracking-[-0.06em]">
                Submit your interior request
              </h2>
            </div>
          </div>

          <form className="mt-8 grid grid-cols-2 gap-5 max-[900px]:grid-cols-1">
            <div className="flex flex-col gap-2">
              <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
                Full name
              </label>
              <input
                type="text"
                defaultValue={property.owner}
                className="rounded-[16px] border border-[#d8ddd6] bg-[#f8f9f7] px-4 py-3 text-sm outline-none transition focus:border-[#18231f]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
                Unit / flat
              </label>
              <input
                type="text"
                defaultValue={property.unit}
                className="rounded-[16px] border border-[#d8ddd6] bg-[#f8f9f7] px-4 py-3 text-sm outline-none transition focus:border-[#18231f]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
                Project
              </label>
              <input
                type="text"
                defaultValue={property.project}
                className="rounded-[16px] border border-[#d8ddd6] bg-[#f8f9f7] px-4 py-3 text-sm outline-none transition focus:border-[#18231f]"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
                Request type
              </label>
              <select className="rounded-[16px] border border-[#d8ddd6] bg-[#f8f9f7] px-4 py-3 text-sm text-[#17211d] outline-none transition focus:border-[#18231f]">
                <option>Full home remodelling</option>
                <option>Kitchen redesign</option>
                <option>Bedroom interiors</option>
                <option>Living room styling</option>
                <option>Modular wardrobe</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
                Preferred timeline
              </label>
              <select className="rounded-[16px] border border-[#d8ddd6] bg-[#f8f9f7] px-4 py-3 text-sm text-[#17211d] outline-none transition focus:border-[#18231f]">
                <option>Within 2 weeks</option>
                <option>Within 1 month</option>
                <option>Within 2 months</option>
                <option>Flexible</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
                Budget range
              </label>
              <select className="rounded-[16px] border border-[#d8ddd6] bg-[#f8f9f7] px-4 py-3 text-sm text-[#17211d] outline-none transition focus:border-[#18231f]">
                <option>₹5L - ₹10L</option>
                <option>₹10L - ₹20L</option>
                <option>₹20L - ₹35L</option>
                <option>₹35L+</option>
              </select>
            </div>

            <div className="col-span-2 flex flex-col gap-2 max-[900px]:col-span-1">
              <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
                Design brief
              </label>
              <textarea
                rows={5}
                placeholder="Describe the rooms, styling preference, finishes, and expected scope..."
                className="rounded-[16px] border border-[#d8ddd6] bg-[#f8f9f7] px-4 py-3 text-sm text-[#17211d] outline-none transition focus:border-[#18231f]"
              />
            </div>

            <div className="col-span-2 flex flex-col gap-2 max-[900px]:col-span-1">
              <label className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#78827c]">
                Security deposit
              </label>
              <div className="rounded-[16px] border border-[#d8ddd6] bg-[#f8f9f7] px-4 py-3 text-sm text-[#17211d]">
                Buyer is required to pay the applicable security deposit before work begins.
              </div>
            </div>

            <div className="col-span-2 flex items-center justify-between gap-4 rounded-[20px] border border-[#d8ddd6] bg-[#f5f7f3] p-4 max-[900px]:col-span-1">
              <div>
                <div className="font-mono text-[7px] uppercase tracking-[0.12em] text-[#78827c]">
                  Submit status
                </div>
                <div className="mt-2 text-sm text-[#17211d]">Request will be reviewed by the support team.</div>
              </div>
              <button
                type="submit"
                className="rounded-full bg-[#18231f] px-5 py-3 font-mono text-[8px] uppercase tracking-[0.12em] text-white transition hover:bg-[#24312d]"
              >
                Submit request
              </button>
            </div>
          </form>
        </section>

        <section className="mt-4 mb-8 rounded-[30px] border border-[#d8ddd6] bg-white p-7 lg:p-10">
          <div className="flex items-end justify-between gap-6 max-[700px]:flex-col max-[700px]:items-start">
            <div>
              <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#78827c]">
                Other info
              </div>
              <h2 className="mt-3 text-[clamp(34px,4vw,58px)] font-medium leading-[0.9] tracking-[-0.06em]">
                Helpful details for owners
              </h2>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 max-[900px]:grid-cols-1">
            {otherInfo.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-[20px] border border-[#d8ddd6] bg-[#f6f7f4] p-4 text-sm leading-6 text-[#24312d]">
                <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#d7ff72] text-[10px] font-bold text-[#18231f]">
                  ✓
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {renderServiceModal()}
      {!isChatOpen && (
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          aria-label="Open support chat"
          title="Chat with support"
          className="fixed bottom-6 right-6 z-[80] grid size-14 place-items-center rounded-full bg-[#d7ff72] text-[#18231f] shadow-[0_12px_35px_rgba(24,35,31,0.28)] transition hover:-translate-y-1 hover:bg-[#c9f45f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#18231f] max-[900px]:bottom-24 max-[900px]:right-5"
        >
          <MessageCircle size={22} strokeWidth={2} />
        </button>
      )}
      {isChatOpen && <SupportChatModal onClose={() => setIsChatOpen(false)} />}
    </div>
  );
}