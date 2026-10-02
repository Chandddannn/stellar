"use client";

import { useEffect, useState } from "react";

import {
  ArrowUpRight,
  CalendarDays,
  Camera,
  FileText,
  Home,
  MessageCircle,
  MapPin,
  Rotate3D,
  Settings,
  Wrench,
} from "lucide-react";

import {
  construction,
  journey,
  property,
  requests,
} from "../../data/demoData";
import ActionCard from "../../components/cards/ActionCard";
import StatusCard from "../../components/cards/StatusCard";
import BuyerNavItem from "../../components/buyer/BuyerNavItem";
import ConstructionMap from "../../components/buyer/ConstructionMap";
import JourneyStep from "../../components/buyer/JourneyStep";
import PhotoRequestCard from "../../components/buyer/PhotoRequestCard";
import PropertyInfoPill from "../../components/buyer/PropertyInfoPill";
import DocumentsModalView from "../../components/modals/DocumentsModal";
import ModificationModalView from "../../components/modals/ModificationModal";
import PhotoGalleryModalView from "../../components/modals/PhotoGalleryModal";
import Property360ModalView from "../../components/modals/Property360Modal";
import ServiceRequestsModalView from "../../components/modals/ServiceRequestsModal";
import SupportChatModal from "../../components/modals/service/SupportChatModal";

type ServiceRequest = (typeof requests)[number] & {
  details?: string;
};

type ModalType =
  | "photos"
  | "360"
  | "modification"
  | "documents"
  | "requests"
  | null;

export default function BuyerPrePossession() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const [currentRequests, setCurrentRequests] =
    useState<ServiceRequest[]>(requests);

  const [photoRequestRoom, setPhotoRequestRoom] = useState("");
  const [requestCategory, setRequestCategory] = useState("Maintenance");

  function openRequests(category = "Maintenance") {
    setRequestCategory(category);
    setActiveModal("requests");
  }

  useEffect(() => {
    if (!activeModal) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveModal(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeModal]);

  function handleRequestSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);

    const title = String(
      formData.get("title") ?? "",
    ).trim();

    const category = String(
      formData.get("category") ?? "Service",
    );

    const details = String(
      formData.get("details") ?? "",
    ).trim();

    if (!title || !details) return;

    setCurrentRequests((previousRequests) => [
      {
        id: `REQ-${String(Date.now()).slice(-4)}`,
        title,
        category,
        status: "Submitted",
        date: new Intl.DateTimeFormat("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }).format(new Date()),
        details,
      },
      ...previousRequests,
    ]);

    form.reset();
    setActiveModal("requests");
  }

  function handlePhotoRequest(room: string) {
    setPhotoRequestRoom(room);
  }

  return (
    <div className="min-h-screen bg-[#eef1ec] text-[#17211d]">
      {/* =========================================================
          FLOATING SIDE NAV
      ========================================================= */}

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
              icon={<Camera size={17} />}
              label="Site Photos"
              onClick={() => setActiveModal("photos")}
            />

             <BuyerNavItem
              icon={<Rotate3D size={17} />}
              label="360°  View"
              onClick={() => setActiveModal("360")}
            />

            <BuyerNavItem
              icon={<CalendarDays size={17} />}
              label="Visits"
              onClick={() => openRequests("Visit")}
            />

            <BuyerNavItem
              icon={<FileText size={17} />}
              label="Documents"
              onClick={() => setActiveModal("documents")}
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

      {/* =========================================================
          MAIN
      ========================================================= */}

      <main className="ml-[92px] pr-6 max-[900px]:ml-0 max-[900px]:px-4 max-[900px]:pb-24">
        {/* =========================================================
            HERO
        ========================================================= */}

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
                  Your property
                </div>

                <h1 className="mt-6 max-w-[430px] text-[clamp(48px,6vw,82px)] font-medium leading-[0.86] tracking-[-0.075em]">
                  {property.project}
                </h1>

                <div className="mt-5 flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.12em] text-white/50">
                  <span>Tower {property.tower}</span>
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

            {/* BIRD'S EYE CONSTRUCTION */}

            <ConstructionMap
              progress={construction.progress}
              phase={construction.phase}
              possession={property.possession}
            />

          </div>

        </section>

        {/* =========================================================
            QUICK STATUS
        ========================================================= */}

        <section className="mt-4 grid grid-cols-4 gap-4 max-[900px]:grid-cols-2 max-[550px]:grid-cols-1">

          <StatusCard
            label="Construction"
            value={`${construction.progress}%`}
            detail="On site"
            accent
          />

          <StatusCard
            label="Current phase"
            value={construction.phase}
            detail={`Updated ${construction.updated}`}
          />

          <StatusCard
            label="Unit"
            value={property.unit}
            detail={`Tower ${property.tower}`}
          />

          <StatusCard
            label="Possession"
            value={property.possession}
            detail="Estimated"
          />

        </section>

        {/* =========================================================
            JOURNEY
        ========================================================= */}

        <section className="mt-4 rounded-[30px] border border-[#d8ddd6] bg-white p-7 lg:p-10">

          <div className="flex items-end justify-between gap-6 max-[700px]:flex-col max-[700px]:items-start">

            <div>

              <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#78827c]">
                Property timeline
              </div>

              <h2 className="mt-3 text-[clamp(42px,5vw,68px)] font-medium leading-[0.88] tracking-[-0.075em]">
                Your journey
              </h2>

            </div>

            <button
              type="button"
              className="flex items-center gap-2 rounded-full border border-[#d8ddd6] px-4 py-2.5 font-mono text-[8px] uppercase tracking-[0.1em] transition hover:bg-[#18231f] hover:text-white"
            >
              Full timeline
              <ArrowUpRight size={13} />
            </button>

          </div>

          <div className="mt-10 overflow-x-auto pb-3">

            <div className="flex min-w-[850px]">

              {journey.map((item, index) => (
                <JourneyStep
                  key={item.title}
                  item={item}
                  index={index}
                  isLast={index === journey.length - 1}
                />
              ))}

            </div>

          </div>

        </section>

        {/* =========================================================
            PROPERTY CONTROL CENTER
        ========================================================= */}

        <section className="mt-4 mb-8">

          <div className="mb-4 flex items-end justify-between">

            <div>

              <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#78827c]">
                Property controls
              </div>

              <h2 className="mt-2 text-3xl font-medium tracking-[-0.05em]">
                Everything about your home
              </h2>

            </div>

            <div className="hidden font-mono text-[8px] uppercase text-[#78827c] sm:block">
              {currentRequests.length} active request
              {currentRequests.length === 1 ? "" : "s"}
            </div>

          </div>

          <div className="grid grid-cols-4 overflow-hidden rounded-[30px] border border-[#d8ddd6] bg-white max-[1000px]:grid-cols-2 max-[600px]:grid-cols-1">

            <ActionCard
              icon={<Camera size={19} />}
              number="01"
              title="Site photos"
              description="Every room. Every construction stage."
              onClick={() => setActiveModal("photos")}
            />

            <ActionCard
              icon={<Rotate3D size={19} />}
              number="02"
              title="360° view"
              description="Explore your property digitally."
              onClick={() => setActiveModal("360")}
            />

            <ActionCard
              icon={<Wrench size={19} />}
              number="03"
              title="Modification"
              description="Request a change or customization."
              onClick={() => setActiveModal("modification")}
            />

            <ActionCard
              icon={<FileText size={19} />}
              number="04"
              title="Documents"
              description="Invoices, papers and property records."
              last
              onClick={() => setActiveModal("documents")}
            />

          </div>

          <div className="mt-4 grid grid-cols-[1.3fr_0.7fr] gap-4 max-[850px]:grid-cols-1">

            <button
              type="button"
              onClick={() => openRequests()}
              className="group flex min-h-[150px] items-center justify-between overflow-hidden rounded-[28px] bg-[#18231f] p-7 text-left text-white transition hover:-translate-y-1"
            >

              <div>

                <div className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#d7ff72]">
                  Support centre
                </div>

                <h3 className="mt-3 text-3xl font-medium tracking-[-0.06em]">
                  My requests
                </h3>

                <p className="mt-2 text-xs text-white/45">
                  Track modifications, service requests and other
                  conversations with your property team.
                </p>

              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10 transition group-hover:bg-[#d7ff72] group-hover:text-[#18231f]">
                <ArrowUpRight size={18} />
              </div>

            </button>

            <PhotoRequestCard
              onClick={() => setActiveModal("photos")}
            />

          </div>

        </section>

      </main>

      {/* =========================================================
          MODALS
      ========================================================= */}

      {activeModal === "photos" && (
        <PhotoGalleryModalView
          onClose={() => {
            setActiveModal(null);
            setPhotoRequestRoom("");
          }}
          photoRequestRoom={photoRequestRoom}
          onPhotoRequest={handlePhotoRequest}
        />
      )}

      {activeModal === "360" && (
        <Property360ModalView
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "modification" && (
        <ModificationModalView
          onClose={() => setActiveModal(null)}
          onSubmit={(request) => {
            setCurrentRequests((previous) => [
              request,
              ...previous,
            ]);

            setActiveModal("requests");
          }}
        />
      )}

      {activeModal === "documents" && (
        <DocumentsModalView
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "requests" && (
        <ServiceRequestsModalView
          requests={currentRequests}
          onClose={() => setActiveModal(null)}
          onSubmit={handleRequestSubmit}
          initialCategory={requestCategory}
        />
      )}

      {!isChatOpen && (
        <button
          type="button"
          onClick={() => setIsChatOpen(true)}
          aria-label="Open construction assistant"
          title="Chat about your construction progress"
          className="fixed bottom-6 right-6 z-[80] grid size-14 place-items-center rounded-full bg-[#d7ff72] text-[#18231f] shadow-[0_12px_35px_rgba(24,35,31,0.28)] transition hover:-translate-y-1 hover:bg-[#c9f45f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#18231f] max-[900px]:bottom-24 max-[900px]:right-5"
        >
          <MessageCircle size={22} strokeWidth={2} />
        </button>
      )}
      {isChatOpen && (
        <SupportChatModal
          context="pre-possession"
          onClose={() => setIsChatOpen(false)}
        />
      )}

    </div>
  );
}




