'use client'

import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { experienceItems } from "../data/experience";
import WindowFrame from "./WindowFrame";

interface ExperienceProps {
  zIndex: number;
  bringToFront: () => void;
  onClose: () => void;
}

export default function Experience({ zIndex, bringToFront, onClose }: ExperienceProps) {
  return (
    <WindowFrame
      title="Experience"
      zIndex={zIndex}
      bringToFront={bringToFront}
      onClose={onClose}
      sizeClassName="sm:w-[43rem] sm:h-[31rem]"
    >
      <div className="flex flex-col flex-1 min-h-0 px-3 sm:px-2 py-2 sm:py-1 gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div className="text-xs font-mono text-gray-300 shrink-0">
          <span>pablo</span>
          <span className="text-blue-700">@term.portfolio</span>
          <span>:experience/info$ </span>
        </div>

        <div className="flex flex-col gap-4 sm:gap-3">
          {experienceItems.map((item) => (
            <article key={`${item.company}-${item.role}`} className="text-[11px] sm:text-[10px] font-mono flex flex-col gap-1">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                  {item.url ? (
                    <Link href={item.url} target="_blank" rel="noreferrer" className="hover:underline w-fit">
                      <h2 className="text-white text-sm sm:text-xs">{item.role}</h2>
                    </Link>
                  ) : (
                    <h2 className="text-white text-sm sm:text-xs">{item.role}</h2>
                  )}
                  <span className={item.status === "incoming" ? "text-blue-400" : item.status === "current" ? "text-green-400" : "text-white/35"}>
                    [{item.status}]
                  </span>
                </div>

                <span className="text-white/35 sm:text-right">{item.dates}</span>
              </div>

              <div className="flex flex-wrap items-center gap-x-2 text-white/50">
                <span>{item.company}</span>
                <span>·</span>
                <span>{item.location}</span>
              </div>

              <ul className="flex flex-wrap gap-1 font-thin italic text-white">
                {item.tech.map((tech) => (
                  <li key={tech.name} className="relative overflow-hidden group/item flex gap-1 px-1 cursor-default">
                    <span className="absolute inset-0 -left-1 -right-1 bg-linear-to-r from-blue-800 to-purple-700 -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300 ease-in-out" />
                    <Link href={tech.url} target="_blank" rel="noreferrer" className="relative z-10 flex gap-1 items-center">
                      <span>{tech.name}</span>
                      <ArrowUpRightIcon size={11} />
                    </Link>
                  </li>
                ))}
              </ul>

              <ul className="flex flex-col gap-1 text-white/50 leading-relaxed">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="text-blue-500">-</span>
                    <span>{highlight}</span>
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
