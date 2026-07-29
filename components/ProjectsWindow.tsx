'use client'

import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { projects } from "../data/projects";
import WindowFrame from "./WindowFrame";

interface ProjectsWindowProps {
  onClose: () => void;
  zIndex: number;
  bringToFront: () => void;
}

export default function ProjectsWindow({ onClose, zIndex, bringToFront }: ProjectsWindowProps) {
  return (
    <WindowFrame
      title="Projects"
      zIndex={zIndex}
      bringToFront={bringToFront}
      onClose={onClose}
      sizeClassName="sm:w-[44rem] sm:h-[32rem]"
    >
      <div className="flex flex-col flex-1 min-h-0 px-3 sm:px-2 py-2 sm:py-1 gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div className="text-xs font-mono text-gray-300 shrink-0">
          <span>pablo</span>
          <span className="text-blue-700">@term.portfolio</span>
          <span>:projects/info$ </span>
        </div>

        <div className="flex flex-col gap-4 sm:gap-3">
          {projects.map((project) => (
            <article key={project.title} className="text-[11px] sm:text-[10px] font-mono flex flex-col gap-1">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-white text-sm sm:text-xs">{project.title}</h2>
                {project.featured && <span className="text-blue-400">[featured]</span>}
                <span className="text-white/35">{project.eyebrow}</span>
              </div>

              <ul className="flex flex-wrap gap-1 font-thin italic text-white">
                {project.tech.map((tech) => (
                  <li key={tech.name} className="relative overflow-hidden group/item flex gap-1 px-1 cursor-default">
                    <span className="absolute inset-0 -left-1 -right-1 bg-linear-to-r from-blue-800 to-purple-700 -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300 ease-in-out" />
                    <Link href={tech.url} target="_blank" rel="noreferrer" className="relative z-10 flex gap-1 items-center">
                      <span>{tech.name}</span>
                      <ArrowUpRightIcon size={11} />
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="text-white/50 leading-relaxed">{project.description}</p>

              <ul className="flex flex-col gap-1 text-white/40 leading-relaxed">
                {project.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-2">
                    <span className="text-blue-500">-</span>
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-3 pt-1">
                {project.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-blue-400 hover:underline"
                  >
                    {link.label} <ArrowUpRightIcon size={11} />
                  </Link>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </WindowFrame>
  );
}
