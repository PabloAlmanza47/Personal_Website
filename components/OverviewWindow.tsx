'use client'

import {
  ArrowUpRightIcon,
  GithubLogoIcon,
  LinkedinLogoIcon,
  ReadCvLogoIcon,
} from "@phosphor-icons/react";
import WindowFrame from "./WindowFrame";

type OverviewWindowProps = {
  onClose: () => void;
  zIndex: number;
  bringToFront: () => void;
  openWindow: (name: string) => void;
};

const skills = [
  "C# / .NET",
  "Angular",
  "TypeScript",
  "Next.js",
  "PostgreSQL",
  "SQL Server",
];

export default function OverviewWindow({
  onClose,
  zIndex,
  bringToFront,
  openWindow,
}: OverviewWindowProps) {
  return (
    <WindowFrame
      title="Overview"
      zIndex={zIndex}
      bringToFront={bringToFront}
      onClose={onClose}
      sizeClassName="sm:w-[43rem] sm:h-[30rem]"
      initialOffset={{ x: 0, y: 22 }}
    >
      <div className="flex flex-1 min-h-0 flex-col gap-3 overflow-y-auto px-3 py-2 font-mono scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent sm:px-2 sm:py-1">
        <div className="text-xs text-gray-300 shrink-0">
          <span>pablo</span>
          <span className="text-blue-700">@term.portfolio</span>
          <span>:overview/info$ </span>
        </div>

        <section className="space-y-2">
          <div>
            <h2 className="text-lg text-blue-400 sm:text-base">Pablo Almanza</h2>
            <p className="text-[11px] text-white/45 sm:text-[9px]">
              Software Engineer · Texas A&amp;M Computer Science · May 2028
            </p>
          </div>

          <p className="max-w-2xl text-[11px] leading-relaxed text-white/70 sm:text-[10px]">
            I build production software and community-focused platforms across C#, Angular,
            TypeScript, Next.js, and SQL. My work currently spans electrical test-data software,
            full-stack product development, and technical leadership for Texas A&amp;M SHPE.
          </p>
        </section>

        <section className="grid gap-3 border-y border-gray-800 py-3 sm:grid-cols-2 sm:gap-2 sm:py-2">
          <div className="space-y-1">
            <p className="text-[10px] text-green-400">[current]</p>
            <h3 className="text-xs text-white">PowerDB</h3>
            <p className="text-[10px] leading-relaxed text-white/45 sm:text-[9px]">
              Part-Time Software Engineer · May 2026 — Present
            </p>
          </div>

          <div className="space-y-1">
            <p className="text-[10px] text-blue-400">[incoming]</p>
            <h3 className="text-xs text-white">Frogslayer</h3>
            <p className="text-[10px] leading-relaxed text-white/45 sm:text-[9px]">
              Junior Software Developer · Starts August 17, 2026
            </p>
          </div>
        </section>

        <section className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-[10px] text-blue-400">featured_project:</p>
            <button
              type="button"
              onClick={() => openWindow("projects")}
              className="flex items-center gap-1 text-xs text-white hover:underline focus-visible:outline focus-visible:outline-1 focus-visible:outline-blue-400"
            >
              SHPE Connect <ArrowUpRightIcon size={11} />
            </button>
          </div>
          <p className="text-[11px] leading-relaxed text-white/55 sm:text-[10px]">
            A full-stack member-networking platform for the Texas A&amp;M SHPE chapter with
            authentication, role-based access, member profiles, searchable directory tools,
            and officer workflows.
          </p>
        </section>

        <section className="space-y-1">
          <p className="text-[10px] text-white/45">skills:</p>
          <ul className="flex flex-wrap gap-x-2 gap-y-1 text-[10px] italic text-white sm:text-[9px]">
            {skills.map((skill) => (
              <li key={skill} className="relative overflow-hidden px-1 group/item">
                <span className="absolute inset-0 -left-1 -right-1 bg-linear-to-r from-blue-800 to-purple-700 -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300 ease-in-out" />
                <span className="relative z-10">{skill}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-auto flex flex-wrap items-center gap-3 border-t border-gray-800 pt-3 text-[11px] sm:gap-2 sm:pt-2 sm:text-[9px]">
          <button type="button" onClick={() => openWindow("experience")} className="text-blue-400 hover:underline">
            open experience
          </button>
          <button type="button" onClick={() => openWindow("about")} className="text-blue-400 hover:underline">
            open about
          </button>
          <a href="/resume.pdf" target="_blank" rel="noreferrer" className="flex items-center gap-1 text-gray-300 hover:text-blue-400">
            <ReadCvLogoIcon size={14} /> resume
          </a>
          <a href="https://github.com/PabloAlmanza47" target="_blank" rel="noreferrer" aria-label="GitHub profile" className="text-gray-300 hover:text-blue-400">
            <GithubLogoIcon size={14} />
          </a>
          <a href="https://www.linkedin.com/in/pabloalmanza/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile" className="text-gray-300 hover:text-blue-400">
            <LinkedinLogoIcon size={14} />
          </a>
        </div>
      </div>
    </WindowFrame>
  );
}
