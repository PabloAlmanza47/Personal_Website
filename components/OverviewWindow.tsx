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
      sizeClassName="sm:w-[46rem] sm:h-[32rem]"
      initialOffset={{ x: 0, y: 22 }}
    >
      <div className="flex flex-1 min-h-0 flex-col overflow-y-auto px-4 py-5 sm:px-6 sm:py-6 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
        <div className="flex flex-col gap-6">
          <header className="space-y-3">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-cyan-300/80">
              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/5 px-3 py-1">
                Software Engineer
              </span>
              <span className="text-white/35">Texas A&amp;M Computer Science · May 2028</span>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Pablo Almanza
              </h1>
              <p className="max-w-2xl text-sm leading-6 text-slate-300 sm:text-[15px]">
                I build production software and community-focused platforms across C#, Angular,
                TypeScript, Next.js, and SQL. My work currently spans electrical test-data software,
                full-stack product development, and technical leadership for Texas A&amp;M SHPE.
              </p>
            </div>
          </header>

          <section className="grid gap-3 sm:grid-cols-2">
            <article className="rounded-xl border border-emerald-400/15 bg-emerald-400/[0.04] p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-emerald-300/80">
                Current
              </p>
              <h2 className="mt-2 text-base font-medium text-white">PowerDB</h2>
              <p className="mt-1 text-xs text-slate-400">Part-Time Software Engineer · May 2026 — Present</p>
            </article>

            <article className="rounded-xl border border-blue-400/15 bg-blue-400/[0.04] p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-blue-300/80">
                Up next
              </p>
              <h2 className="mt-2 text-base font-medium text-white">Frogslayer</h2>
              <p className="mt-1 text-xs text-slate-400">Incoming Junior Software Developer · Starts Aug 17</p>
            </article>
          </section>

          <section className="rounded-xl border border-blue-400/20 bg-gradient-to-br from-blue-500/[0.10] via-slate-950 to-cyan-500/[0.06] p-4 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-xl">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-blue-300">
                  Featured project
                </p>
                <h2 className="mt-2 text-xl font-semibold text-white">SHPE Connect</h2>
                <p className="mt-2 text-sm leading-6 text-slate-300">
                  A full-stack member-networking platform built for the Texas A&amp;M SHPE chapter,
                  with authentication, role-based access, member profiles, a searchable directory,
                  and officer workflows.
                </p>
              </div>
              <button
                type="button"
                onClick={() => openWindow("projects")}
                className="inline-flex shrink-0 items-center gap-1 rounded-md border border-blue-400/25 bg-blue-400/10 px-3 py-2 font-mono text-xs text-blue-200 transition hover:bg-blue-400/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
              >
                View projects <ArrowUpRightIcon size={14} />
              </button>
            </div>
          </section>

          <section className="flex flex-wrap gap-2" aria-label="Primary skills">
            {skills.map((skill) => (
              <span
                key={skill}
                className="rounded-md border border-white/10 bg-white/[0.035] px-2.5 py-1 font-mono text-[10px] text-slate-300"
              >
                {skill}
              </span>
            ))}
          </section>

          <footer className="flex flex-wrap items-center gap-2 border-t border-white/10 pt-4">
            <button
              type="button"
              onClick={() => openWindow("experience")}
              className="rounded-md bg-blue-600 px-3 py-2 font-mono text-xs text-white transition hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              Experience
            </button>
            <button
              type="button"
              onClick={() => openWindow("about")}
              className="rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs text-slate-200 transition hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              About &amp; contact
            </button>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 rounded-md border border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-xs text-slate-200 transition hover:bg-white/[0.08] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              <ReadCvLogoIcon size={15} /> Resume
            </a>
            <a
              href="https://github.com/PabloAlmanza47"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub profile"
              className="rounded-md border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              <GithubLogoIcon size={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/pabloalmanza/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn profile"
              className="rounded-md border border-white/10 bg-white/[0.04] p-2 text-slate-300 transition hover:bg-white/[0.08] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
            >
              <LinkedinLogoIcon size={16} />
            </a>
          </footer>
        </div>
      </div>
    </WindowFrame>
  );
}
