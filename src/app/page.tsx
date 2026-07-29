'use client'

import { AnimatePresence } from "motion/react";
import { useState } from "react";
import AboutWindow from "../../components/AboutWindow";
import EmailSentWindow from "../../components/EmailSentWindow";
import Experience from "../../components/Experience";
import MenuBar from "../../components/MenuBar";
import MusicWindow from "../../components/MusicWindow";
import ProjectsWindow from "../../components/ProjectsWindow";
import Terminal from "../../components/Terminal";
import type { WindowName } from "../../data/windows";

type AppWindowName = WindowName | "terminal" | "emailSent";

type OpenWindow = {
  id: string;
  name: AppWindowName;
  z: number;
};

const dockItems: { name: AppWindowName; label: string; shortLabel: string }[] = [
  { name: "about", label: "About and contact", shortLabel: "about" },
  { name: "experience", label: "Experience", shortLabel: "work" },
  { name: "projects", label: "Projects", shortLabel: "build" },
  { name: "terminal", label: "Terminal", shortLabel: ">_" },
  { name: "music", label: "Music", shortLabel: "music" },
];

export default function Home() {
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([
    { id: "about", name: "about", z: 1 },
  ]);
  const [topZ, setTopZ] = useState(1);

  const openWindow = (name: string) => {
    const windowName = name as AppWindowName;

    setTopZ((previousZ) => {
      const newZ = previousZ + 1;

      setOpenWindows((previousWindows) => {
        const existing = previousWindows.find((window) => window.name === windowName);

        if (existing) {
          return previousWindows.map((window) =>
            window.id === existing.id ? { ...window, z: newZ } : window,
          );
        }

        return [
          ...previousWindows,
          { id: crypto.randomUUID(), name: windowName, z: newZ },
        ];
      });

      return newZ;
    });
  };

  const closeWindow = (id: string) => {
    setOpenWindows((previousWindows) => previousWindows.filter((window) => window.id !== id));
  };

  const bringToFront = (id: string) => {
    setTopZ((previousZ) => {
      const newZ = previousZ + 1;
      setOpenWindows((windows) =>
        windows.map((window) => (window.id === id ? { ...window, z: newZ } : window)),
      );
      return newZ;
    });
  };

  return (
    <main className="portfolio-desktop relative flex h-dvh items-center justify-center overflow-hidden bg-slate-950 px-3 font-bold text-white sm:px-0">
      <MenuBar />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_28%_28%,rgba(37,99,235,0.17),transparent_30%),radial-gradient(circle_at_72%_68%,rgba(6,182,212,0.10),transparent_32%)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-blue-950/25 to-transparent" />

      {openWindows.length === 0 && (
        <button
          type="button"
          onClick={() => openWindow("about")}
          className="relative z-10 font-mono text-xs text-white/45 transition hover:text-blue-400"
        >
          Pablo Almanza&apos;s terminal portfolio — open about
        </button>
      )}

      <AnimatePresence>
        {openWindows.map((window) => {
          const sharedProps = {
            key: window.id,
            zIndex: window.z,
            bringToFront: () => bringToFront(window.id),
            onClose: () => closeWindow(window.id),
          };

          switch (window.name) {
            case "terminal":
              return <Terminal {...sharedProps} openWindow={openWindow} />;
            case "about":
              return (
                <AboutWindow
                  {...sharedProps}
                  onEmailSent={() => openWindow("emailSent")}
                />
              );
            case "emailSent":
              return <EmailSentWindow {...sharedProps} />;
            case "music":
              return <MusicWindow {...sharedProps} />;
            case "projects":
              return <ProjectsWindow {...sharedProps} />;
            case "experience":
              return <Experience {...sharedProps} />;
            default:
              return null;
          }
        })}
      </AnimatePresence>

      <nav
        aria-label="Portfolio windows"
        className="fixed bottom-3 left-1/2 z-[1000] flex max-w-[calc(100vw-1.5rem)] -translate-x-1/2 items-center gap-1 overflow-x-auto rounded-xl border border-white/10 bg-slate-950/85 p-1.5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:bottom-4"
      >
        {dockItems.map((item) => {
          const isOpen = openWindows.some((window) => window.name === item.name);

          return (
            <button
              key={item.name}
              type="button"
              aria-label={item.label}
              aria-pressed={isOpen}
              onClick={() => openWindow(item.name)}
              className={`relative shrink-0 rounded-lg px-3 py-2 font-mono text-[10px] transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400 sm:px-3.5 ${
                isOpen
                  ? "bg-blue-500/15 text-blue-200"
                  : "text-slate-500 hover:bg-white/[0.06] hover:text-slate-200"
              }`}
            >
              {item.shortLabel}
              {isOpen && (
                <span className="absolute inset-x-3 -bottom-0.5 h-px bg-cyan-400/80" />
              )}
            </button>
          );
        })}
      </nav>
    </main>
  );
}
