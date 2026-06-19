'use client'
import ProjectsWindow from "../../components/ProjectsWindow";
import AboutWindow from "../../components/AboutWindow";
import BlogWindow from "../../components/BlogWindow";
import MenuBar from "../../components/MenuBar";
import MusicWindow from "../../components/MusicWindow";
import Terminal from "../../components/Terminal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion"
import EmailSentWindow from "../../components/EmailSentWindow";
import Experience from "../../components/Experience";

//one of the button on the top of the windows, will make the screen full screen meaning that it will show a true porfolio that has all of the information
//on one page that can be scrolled through

export default function Home() {
  type WindowType = {
    id: string;
    name: string;
    z: number;
  };

  const [openWindows, setOpenWindows] = useState<WindowType[]>([]);

  const [topZ, setTopZ] = useState(1);

  const openWindow = (name: string) => {
    setTopZ(prevZ => {
      const newZ = prevZ + 1;

      setOpenWindows(prev => {
        const existing = prev.find(w => w.name === name);

        if (existing) {
          return prev.map(w =>
            w.id === existing.id ? { ...w, z: newZ } : w
          );
        }

        return [
          ...prev,
          { id: crypto.randomUUID(), name, z: newZ }
        ];
      });

      return newZ;
    });
  };

  const closeWindow = (id: string) => {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  };

  const bringToFront = (id: string) => {
    setTopZ(prev => {
      const newZ = prev + 1;

      setOpenWindows(wins =>
        wins.map(w =>
          w.id === id ? { ...w, z: newZ } : w
        )
      );

      return newZ;
    });
  };

  return (
    <main className="bg-gray-900 font-bold flex justify-center items-center h-dvh overflow-hidden relative px-3 sm:px-0">
      <MenuBar />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.14),transparent_45%)] pointer-events-none" />

      {openWindows.length === 0 && (
        <div className="text-center font-mono text-white/70 max-w-xs sm:max-w-none px-4">
          <p className="text-xs sm:text-sm">Pablo Almanza&apos;s terminal portfolio</p>
          <p className="text-[10px] sm:text-xs text-white/40 mt-1">Tap the dock button to open the terminal.</p>
        </div>
      )}

      <div className="bg-white/10 w-14 h-14 sm:w-12 sm:h-12 absolute bottom-5 sm:bottom-4 p-1 rounded-full hover:sm:w-20 transition-all duration-400 shadow-md shadow-black ease-in-out z-50">
        <button
          aria-label="Open terminal"
          className="bg-black w-full h-full rounded-full outline outline-white text-gray-500 text-center hover:text-white active:scale-95 transition-all duration-200"
          onClick={() => openWindow("terminal")}
        >
          {"</>"}
        </button>
      </div>

      <AnimatePresence>
        {openWindows.map(win => {
          switch (win.name) {
            case "terminal":
              return (
                <Terminal
                  key={win.id}
                  openWindow={openWindow}
                  zIndex={win.z}
                  bringToFront={() => bringToFront(win.id)}
                  onClose={() => closeWindow(win.id)}
                />
              );

            case "about":
              return (
                <AboutWindow
                  key={win.id}
                  zIndex={win.z}
                  bringToFront={() => bringToFront(win.id)}
                  onClose={() => closeWindow(win.id)}
                  onEmailSent={() => openWindow("emailSent")}
                />
              );

            case "emailSent":
              return (
                <EmailSentWindow
                  key={win.id}
                  zIndex={win.z}
                  bringToFront={() => bringToFront(win.id)}
                  onClose={() => closeWindow(win.id)}
                />
              );

            case "music":
              return (
                <MusicWindow
                  key={win.id}
                  zIndex={win.z}
                  bringToFront={() => bringToFront(win.id)}
                  onClose={() => closeWindow(win.id)}
                />
              );

            case "projects":
              return (
                <ProjectsWindow
                  key={win.id}
                  zIndex={win.z}
                  bringToFront={() => bringToFront(win.id)}
                  onClose={() => closeWindow(win.id)}
                />
              );

            case "experience":
              return (
                <Experience
                  key={win.id}
                  zIndex={win.z}
                  bringToFront={() => bringToFront(win.id)}
                  onClose={() => closeWindow(win.id)}
                />
              )

            default:
              return null;
          }
        })}

      </AnimatePresence>
    </main>
  );
}
