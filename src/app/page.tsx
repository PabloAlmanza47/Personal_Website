'use client'
import CurrentlyPlaying from "../../components/CurrentlyPlaying";
import ProjectsWindow from "../../components/ProjectsWindow";
import AboutWindow from "../../components/AboutWindow";
import BlogWindow from "../../components/BlogWindow";
import MenuBar from "../../components/MenuBar";
import MusicWindow from "../../components/MusicWindow";
import Terminal from "../../components/Terminal";
import { useState } from "react";

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
      <CurrentlyPlaying />
        {openWindows.map(win => {
          switch (win.name) {
            case "terminal":
              return (
                <Terminal
                  key={win.id}
                  openWindow={openWindow}
                  zIndex={win.z}
                  bringToFront={() => bringToFront(win.id)}
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

            default:
              return null;
          }
        })}

        {/* <ProjectsWindow /> */}
    </main>
  );
}
