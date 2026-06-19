'use client'

import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { currentTools, projects } from "../data/projects";
import WindowFrame from "./WindowFrame";

interface ProjectsWindowProps {
  onClose: () => void;
  zIndex: number;
  bringToFront: () => void;
}

export default function ProjectsWindow({ onClose, zIndex, bringToFront }: ProjectsWindowProps) {
  return (
    <WindowFrame title="Projects" zIndex={zIndex} bringToFront={bringToFront} onClose={onClose}>
      <div className="flex flex-col flex-1 min-h-0 px-3 sm:px-2 py-2 sm:py-1 gap-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div className="text-xs font-mono text-gray-300 shrink-0">
          <span>pablo</span><span className="text-blue-700">@term.portfolio</span><span>:projects/info$ </span>
        </div>

        <div className="flex flex-col gap-3 sm:gap-2">
          {projects.map((project) => (
            <article key={project.title} className="text-[11px] sm:text-[9px] font-mono flex flex-col gap-1">
              <Link href={project.url} target="_blank" className="hover:underline w-fit">
                <h2 className="text-white text-sm sm:text-[9px]">{project.title}</h2>
              </Link>

              <ul className="flex flex-wrap gap-1 font-thin italic text-white">
                {project.tech.map((tech) => (
                  <li key={tech.name} className="relative overflow-hidden group/item flex gap-1 px-1 cursor-default">
                    <div className="absolute inset-0 -left-1 -right-1 bg-linear-to-r from-blue-800 to-purple-700 -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300 ease-in-out" />
                    <Link href={tech.url} target="_blank" className="relative z-10 flex gap-1 items-center">
                      <span>{tech.name}</span>
                      <ArrowUpRightIcon size={11} />
                    </Link>
                  </li>
                ))}
              </ul>

              <p className="text-white/50 leading-relaxed">{project.description}</p>
            </article>
          ))}
        </div>

        <div className="text-[11px] sm:text-[9px] font-mono flex flex-col gap-1 pt-2 mt-auto">
          <h3>Current Tools</h3>
          <ul className="flex flex-col gap-1 ml-2">
            {currentTools.map((tool) => (
              <li key={tool.label}>
                <span className="text-gray-400">{tool.label}:</span> {tool.value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </WindowFrame>
  );
}
