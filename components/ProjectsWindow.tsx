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
      sizeClassName="sm:w-[48rem] sm:h-[35rem]"
    >
      <div className="flex flex-1 min-h-0 flex-col gap-4 overflow-y-auto px-4 py-5 sm:px-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <header className="space-y-1 border-b border-white/10 pb-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300/70">
            Selected work
          </p>
          <h2 className="text-xl font-semibold text-white">Products, platforms, and experiments</h2>
        </header>

        <div className="grid gap-3 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className={`flex flex-col rounded-xl border p-4 transition ${
                project.featured
                  ? "border-blue-400/25 bg-gradient-to-br from-blue-500/[0.12] via-slate-950 to-cyan-500/[0.06] sm:col-span-2"
                  : "border-white/10 bg-white/[0.025] hover:border-blue-400/20 hover:bg-white/[0.04]"
              }`}
            >
              <div className={project.featured ? "sm:grid sm:grid-cols-[1.3fr_1fr] sm:gap-6" : ""}>
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-blue-300/80">
                    {project.eyebrow}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-white">{project.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-300 sm:text-[13px]">
                    {project.description}
                  </p>
                </div>

                <ul className={`${project.featured ? "mt-4 sm:mt-0" : "mt-3"} space-y-2 text-xs leading-5 text-slate-400`}>
                  {project.highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <span className="mt-[0.55rem] h-1 w-1 shrink-0 rounded-full bg-cyan-400/80" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 flex flex-wrap gap-1.5" aria-label={`${project.title} technologies`}>
                {project.tech.map((tech) => (
                  <Link
                    key={tech.name}
                    href={tech.url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-md border border-white/10 bg-black/20 px-2 py-1 font-mono text-[9px] text-slate-400 transition hover:border-blue-400/20 hover:text-slate-200"
                  >
                    {tech.name}
                  </Link>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-md border border-blue-400/20 bg-blue-400/[0.08] px-2.5 py-1.5 font-mono text-[10px] text-blue-200 transition hover:bg-blue-400/[0.16]"
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
