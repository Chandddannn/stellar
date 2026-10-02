import {
  ArrowUpRight,
  Camera,
  Check,
  CircleDot,
} from "lucide-react";
import { useState } from "react";

import ModalShell from "./ModalShell";
import { MiniStat } from "./ModalPrimitives";

interface PhotoRoom {
  name: string;
  description: string;
  count: number;
  image: string;
}

interface PhotoStage {
  stage: string;
  date: string;
  status: "complete" | "current";
  rooms: PhotoRoom[];
}

interface PhotoGalleryModalProps {
  onClose: () => void;
  photoRequestRoom: string;
  onPhotoRequest: (room: string) => void;
}

const photoStages: PhotoStage[] = [
  {
    stage: "Foundation & Structure",
    date: "12 Jan 2026",
    status: "complete",
    rooms: [
      { name: "Living Room", description: "Structural progress", count: 8, image: "photo-1541888946425-d81bb19240f5" },
      { name: "Master Bedroom", description: "Structural progress", count: 6, image: "photo-1503387762-592deb58ef4e" },
      { name: "Kitchen", description: "Structural progress", count: 5, image: "photo-1504307651254-35680f2a9d2e" },
      { name: "Balcony", description: "Structural progress", count: 4, image: "photo-1511818966892-d7d671e672a2" },
    ],
  },
  {
    stage: "Brickwork & Services",
    date: "18 Mar 2026",
    status: "complete",
    rooms: [
      { name: "Living Room", description: "Brickwork completed", count: 12, image: "photo-1508450859948-4e04fabaa4ea" },
      { name: "Master Bedroom", description: "Electrical conduits", count: 9, image: "photo-1484154218962-a197022b5858" },
      { name: "Kitchen", description: "Plumbing installation", count: 10, image: "photo-1600607687939-ce8a6c25118c" },
      { name: "Bathrooms", description: "Service installation", count: 11, image: "photo-1600566753086-00f18fb6b3ea" },
    ],
  },
  {
    stage: "Finishing",
    date: "08 Aug 2026",
    status: "current",
    rooms: [
      { name: "Living Room", description: "Flooring & ceiling", count: 18, image: "photo-1600210492486-724fe5c67fb0" },
      { name: "Master Bedroom", description: "Paint & wardrobes", count: 14, image: "photo-1600607687920-4e2a09cf159d" },
      { name: "Kitchen", description: "Cabinet installation", count: 16, image: "photo-1600585154340-be6161a56a0c" },
      { name: "Bathrooms", description: "Fixtures & tiles", count: 15, image: "photo-1620626011761-996317b8d101" },
    ],
  },
];

export default function PhotoGalleryModal({
  onClose,
  photoRequestRoom,
  onPhotoRequest,
}: PhotoGalleryModalProps) {
  const [selectedStageIndex, setSelectedStageIndex] = useState(2);
  const selectedStage = photoStages[selectedStageIndex];

  return (
    <ModalShell
      eyebrow="Construction photography"
      title="Site photo archive"
      onClose={onClose}
      wide
    >
      <div className="space-y-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-xl">
            <p className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#78827c]">
              Progress, room by room
            </p>
            <p className="mt-2 text-sm leading-6 text-[#58645d]">
              Browse site updates from each construction milestone. Choose a room
              to request a fresh photo from the site team.
            </p>
          </div>
          <div className="flex gap-2">
            <MiniStat value={`${photoStages.length}`} label="Stages" />
            <MiniStat value="12" label="Areas" />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3" role="tablist" aria-label="Construction stages">
          {photoStages.map((stage, index) => (
            <button
              key={stage.stage}
              type="button"
              role="tab"
              aria-selected={selectedStageIndex === index}
              onClick={() => setSelectedStageIndex(index)}
              className={`flex min-h-[76px] items-center gap-3 border-b-2 px-3 py-3 text-left transition sm:px-4 ${
                selectedStageIndex === index
                  ? "border-[#536f45] bg-[#edf2e8]"
                  : "border-transparent bg-white hover:bg-[#f1f3ef]"
              }`}
            >
              <span className={`grid size-8 shrink-0 place-items-center rounded-full ${
                stage.status === "current" ? "bg-[#d7ff72] text-[#18231f]" : "bg-[#eef1ec] text-[#536049]"
              }`}>
                {stage.status === "current" ? <CircleDot size={15} /> : <Check size={14} />}
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate text-xs font-medium">{stage.stage}</span>
                <span className="mt-1 block font-mono text-[7px] uppercase tracking-[0.1em] text-[#78827c]">{stage.date}</span>
              </span>
              {stage.status === "current" && <span className="font-mono text-[7px] uppercase text-[#536f45]">Latest</span>}
            </button>
          ))}
        </div>

        <div role="tabpanel" className="grid grid-cols-2 gap-3 md:grid-cols-12">
          {selectedStage.rooms.map((room, index) => (
            <button
              key={room.name}
              type="button"
              onClick={() => onPhotoRequest(room.name)}
              className={`group relative isolate min-h-[180px] overflow-hidden bg-[#26332e] text-left text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#536f45] ${
                index === 0 ? "col-span-2 min-h-[300px] md:col-span-7 md:row-span-2" : "min-h-[180px] md:col-span-5"
              }`}
            >
              <img
                src={`https://images.unsplash.com/${room.image}?auto=format&fit=crop&w=${index === 0 ? 1200 : 800}&q=85`}
                alt={`${room.name} during ${selectedStage.stage.toLowerCase()}`}
                loading="lazy"
                className="absolute inset-0 -z-10 h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
              />
              <span className="absolute inset-0 -z-10 bg-gradient-to-t from-black/75 via-black/10 to-black/5" />
              <span className="absolute left-4 top-4 font-mono text-[8px] uppercase tracking-[0.12em] text-white/80">
                {String(index + 1).padStart(2, "0")} / {String(selectedStage.rooms.length).padStart(2, "0")}
              </span>
              <span className="absolute right-4 top-4 bg-black/35 px-2.5 py-1 font-mono text-[8px] text-white backdrop-blur-sm">
                {room.count} photos
              </span>
              <span className="absolute inset-x-4 bottom-4 flex items-end justify-between gap-2">
                <span>
                  <span className="block text-sm font-medium">{room.name}</span>
                  <span className="mt-1 block text-[10px] text-white/75">{room.description}</span>
                </span>
                <span className="grid size-9 shrink-0 place-items-center border border-white/45 bg-black/15 transition group-hover:border-[#d7ff72] group-hover:bg-[#d7ff72] group-hover:text-[#18231f]">
                  <ArrowUpRight size={16} />
                </span>
              </span>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onPhotoRequest("General site")}
          className="flex w-full items-center justify-between gap-4 border-y border-[#d8ddd6] py-4 text-left transition hover:bg-white"
        >
          <span className="flex items-center gap-3">
            <span className="grid size-9 place-items-center bg-[#d7ff72] text-[#18231f]"><Camera size={16} /></span>
            <span>
              <span className="block text-xs font-medium">Need a more recent update?</span>
              <span className="mt-1 block text-[10px] text-[#78827c]">Request a new photo from the site team</span>
            </span>
          </span>
          <ArrowUpRight size={16} className="shrink-0 text-[#536f45]" />
        </button>
      </div>

      {photoRequestRoom && (
        <div className="mt-5 flex items-center justify-between gap-4 rounded-2xl border border-[#cde76c] bg-[#f2f9dd] p-4">
          <div>
            <div className="font-mono text-[7px] uppercase tracking-[0.12em] text-[#536049]">
              Photo request
            </div>
            <div className="mt-1 text-sm font-medium">
              New photo requested for {photoRequestRoom}
            </div>
          </div>
          <button
            type="button"
            onClick={() => onPhotoRequest("")}
            className="rounded-full bg-[#18231f] px-4 py-2 font-mono text-[7px] uppercase tracking-[0.1em] text-white"
          >
            Request submitted
          </button>
        </div>
      )}
    </ModalShell>
  );
}
