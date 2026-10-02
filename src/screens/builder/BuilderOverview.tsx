import { useState } from "react";
import {
  ArrowUpRight,
  Building2,
  ChevronRight,
  Layers3,
  Users,
} from "lucide-react";

import {
  builderStats,
  towers,
} from "../../data/demoData";
import BuilderAdminLogin from "../../components/builder/BuilderAdminLogin";
import BuilderServiceTracker from "../../components/builder/BuilderServiceTracker";

const towerPositions = [
  "left-[18%] top-[25%] max-[900px]:left-[3%]",
  "left-[44%] top-[14%] max-[900px]:left-[35%]",
  "right-[15%] top-[30%] max-[900px]:right-0",
] as const;

export default function BuilderOverview() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return <BuilderAdminLogin onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div>

      <section className="grid min-h-[400px] grid-cols-[minmax(0,1fr)_360px] items-end border-b border-line pb-[75px] max-[900px]:grid-cols-1 max-[900px]:gap-10">

        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
            STELLAR ADMIN / SKYLINE CREST
          </div>

          <h1 className="mt-[25px] text-[clamp(64px,8vw,115px)] font-medium leading-[0.83] tracking-[-0.085em]">
            Service desk,
            <br />
            at a glance.
          </h1>
        </div>

        <div>
          <p className="m-0 text-[13px] leading-[1.8] text-muted">
            Review pre- and post-possession activity by building.
            Open a request to inspect each step, assign an owner, and
            record the next action for the support team.
          </p>
        </div>

      </section>

      <section className="py-12">
        <BuilderServiceTracker onLogout={() => setIsAuthenticated(false)} />
      </section>

      <section className="border-b border-line py-[85px]">

        <div className="mb-10 flex items-end justify-between gap-8 max-[900px]:flex-col max-[900px]:items-start max-[900px]:gap-[25px]">
          <div>
            <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
              LIVE SITE
            </span>

            <h2 className="mt-3 text-[38px] font-medium tracking-[-0.05em]">
              Skyline Crest
            </h2>
          </div>

          <div className="flex flex-wrap gap-x-[25px] gap-y-2 font-mono text-[8px] text-muted">
            <span>3 TOWERS</span>
            <span>320 UNITS</span>
            <span>MUMBAI</span>
          </div>
        </div>


        <div className="relative min-h-[620px] overflow-hidden border border-line [background-image:linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px)] [background-size:55px_55px] max-[900px]:min-h-[700px]">

          <div aria-hidden="true" className="absolute left-[-15%] top-[48%] h-[70px] w-[130%] rotate-[-19deg] bg-[#d9d7d0]" />
          <div aria-hidden="true" className="absolute left-[-10%] top-[22%] h-[42px] w-[120%] rotate-[31deg] bg-[#d9d7d0]" />

          {towers.map((tower, index) => (
            <button
              key={tower.id}
              aria-label={`${tower.name}, ${tower.progress}% complete`}
              className={`group absolute z-10 w-[170px] border-0 bg-transparent p-0 text-left transition-transform duration-200 hover:-translate-y-2 max-[900px]:scale-75 ${towerPositions[index]}`}
            >

              <div className="mb-2 flex justify-between font-mono text-[8px] uppercase text-muted">
                <span>{tower.name}</span>
                <ArrowUpRight size={15} />
              </div>

              <div className="grid min-h-[330px] grid-cols-7 gap-[3px] border border-[#8e8c85] bg-white/20 p-2 shadow-[8px_8px_0_rgba(0,0,0,0.06)]">

                {Array.from({
                  length: tower.floors,
                }).map((_, floorIndex) => (
                  <span
                    key={floorIndex}
                    className={`min-h-[7px] ${
                      floorIndex <
                      Math.round(
                        tower.floors *
                          (tower.progress / 100)
                      )
                        ? "bg-[#202020]"
                        : "bg-[#d0cec7]"
                    }`}
                  />
                ))}

              </div>

              <div className="mt-2.5 flex items-end justify-between">

                <strong className="text-[22px] font-medium tracking-[-0.04em]">
                  {tower.progress}%
                </strong>

                <small className="font-mono text-[7px] text-muted">
                  {tower.units} units
                </small>

              </div>

            </button>
          ))}


          <div className="absolute left-1/2 top-1/2 grid size-[150px] -translate-x-1/2 -translate-y-1/2 place-items-center border border-line-dark bg-paper/75">
            <span className="font-mono text-[8px] tracking-[0.12em] text-muted">MAIN PLAZA</span>
          </div>

        </div>

      </section>


      <section className="grid min-h-[280px] grid-cols-[1.2fr_1fr_1fr] max-[900px]:grid-cols-1">

        <div className="relative border-r border-line px-[35px] py-[45px] max-[900px]:border-r-0 max-[900px]:border-b">

          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted">
            PROJECT OVERVIEW
          </span>

          <strong className="mt-[30px] block text-[92px] font-medium leading-[0.8] tracking-[-0.08em]">
            {builderStats.onboardedBuyers}
          </strong>

          <span className="mt-[18px] block text-xs text-muted">
            buyers onboarded
          </span>

          <div className="absolute bottom-[30px] right-[30px]">
            <ArrowUpRight size={17} />
          </div>

        </div>


        <div className="border-r border-line px-[35px] max-[900px]:border-r-0 max-[900px]:border-b">

          <div className="flex min-h-[92px] items-center justify-between border-b border-line">
            <span className="font-mono text-[8px] text-muted">
              TOTAL UNITS
            </span>

            <strong className="text-[28px] font-medium">
              {builderStats.totalUnits}
            </strong>
          </div>

          <div className="flex min-h-[92px] items-center justify-between border-b border-line">
            <span className="font-mono text-[8px] text-muted">
              BOOKED
            </span>

            <strong className="text-[28px] font-medium">
              {builderStats.bookedUnits}
            </strong>
          </div>

          <div className="flex min-h-[92px] items-center justify-between border-b border-line">
            <span className="font-mono text-[8px] text-muted">
              ACTIVE REQUESTS
            </span>

            <strong className="text-[28px] font-medium">
              {builderStats.activeRequests}
            </strong>
          </div>

        </div>


        <div className="pl-[35px] max-[900px]:pl-0">

          <button className="grid min-h-[92px] w-full grid-cols-[25px_1fr_auto] items-center gap-3 border-0 border-b border-line bg-transparent text-left transition-all hover:bg-[#e8e6df] hover:pl-2">
            <Building2 size={19} />

            <span>
              Towers
            </span>

            <ChevronRight size={16} />
          </button>

          <button className="grid min-h-[92px] w-full grid-cols-[25px_1fr_auto] items-center gap-3 border-0 border-b border-line bg-transparent text-left transition-all hover:bg-[#e8e6df] hover:pl-2">
            <Layers3 size={19} />

            <span>
              Units
            </span>

            <ChevronRight size={16} />
          </button>

          <button className="grid min-h-[92px] w-full grid-cols-[25px_1fr_auto] items-center gap-3 border-0 border-b border-line bg-transparent text-left transition-all hover:bg-[#e8e6df] hover:pl-2">
            <Users size={19} />

            <span>
              Buyers
            </span>

            <ChevronRight size={16} />
          </button>

        </div>

      </section>

    </div>
  );
}