'use client'
import CurrentlyPlaying from "../../components/CurrentlyPlaying";
import ProjectsWindow from "../../components/ProjectsWindow";
import AboutWindow from "../../components/AboutWindow";
import BlogWindow from "../../components/BlogWindow";
import MenuBar from "../../components/MenuBar";
import MusicWindow from "../../components/MusicWindow";
import Terminal from "../../components/Terminal";
import { useState } from "react";
import {AnimatePresence} from "framer-motion"

export default function Home() {
  type WindowType = {
    id: string;
    name: string;
    z: number;
  };

  const [openWindows, setOpenWindows] = useState<WindowType[]>([
    { id: crypto.randomUUID(), name: "terminal", z: 1 }
  ]);

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
    <main className="bg-[#113532] font-bold flex justify-center items-center h-screen relative">
      <MenuBar/>
      <div className="bg-white/10 w-12 h-12 absolute bottom-4 p-1 rounded-full hover:w-20 transition-all duration-400 shadow-md shadow-black ease-in-out">
        <button className="bg-black w-full h-full rounded-full outline outline-white text-gray-500 text-center hover:text-white transition-all duration-200" onClick={() => openWindow("terminal")}>{"</>"} </button>    
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

            default:
              return null;
          }
        })}
      </AnimatePresence>
    </main>
  );
}
