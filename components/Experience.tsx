'use client'

import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { experienceItems, type ExperienceStatus } from "../data/experience";
import WindowFrame from "./WindowFrame";

interface ExperienceProps {
  zIndex: number;
  bringToFront: () => void;
  onClose: () => void;
}

const statusLabel: Record<ExperienceStatus, string> = {
  incoming: "Incoming",
  current: "Current",
  past: "Previous",
};

const statusClassName: Record<ExperienceStatus, string> = {
  incoming: "border-blue-400/20 bg-blue-400/[0.08] text-blue-200",
  current: "border-emerald-400/20 bg-emerald-400/[0.08] text-emerald-200",
  past: "border-white/10 bg-white/[0.04] text-slate-400",
};

export default function Experience({ zIndex, bringToFront, onClose }: ExperienceProps) {
  return (
    <WindowFrame
      title="Experience"
      zIndex={zIndex}
      bringToFront={bringToFront}
      onClose={onClose}
      sizeClassName="sm:w-[46rem] sm:h-[34rem]"
    >
      <div className="flex flex-1 min-h-0 flex-col gap-4 overflow-y-auto px-4 py-5 sm:px-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <header className="space-y-1 border-b border-white/10 pb-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300/70">
            Professional experience &amp; technical leadership
          </p>
          <h2 className="text-xl font-semibold text-white">Building software in production and in community</h2>
        </header>

        <div className="flex flex-col gap-3">
          {experienceItems.map((item) => (
            <article
              key={`${item.company}-${item.role}`}
              className="rounded-xl border border-white/10 bg-white/[0.025] p-4 transition hover:border-blue-400/20 hover:bg-white/[0.04]"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-base font-medium text-white">{item.role}</h3>
                    <span
                      className={`rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider ${statusClassName[item.status]}`}
                    >
                      {statusLabel[item.status]}
                    </span>
                  </div>

                  {item.url ? (
                    <Link
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-flex items-center gap-1 text-sm text-blue-300 transition hover:text-blue-200 hover:underline"
                    >
                      {item.company} <ArrowUpRightIcon size={12} />
                    </Link>
                  ) : (
                    <p className="mt-1 text-sm text-blue-300">{item.company}</p>
                  )}
                </div>

                <div className="font-mono text-[10px] leading-5 text-slate-500 sm:text-right">
                  <p>{item.dates}</p>
                  <p>{item.location}</p>
                </div>
              </div>

              <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-300 sm:text-[13px]">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-cyan-400/80" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <ul className="mt-3 flex flex-wrap gap-1.5" aria-label={`${item.role} technologies`}>
                {item.tech.map((tech) => (
                  <li key={tech.name}>
                    <Link
                      href={tech.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-black/20 px-2 py-1 font-mono text-[9px] text-slate-400 transition hover:border-blue-400/20 hover:text-slate-200"
                    >
                      {tech.name} <ArrowUpRightIcon size={9} />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </WindowFrame>
  );
}
