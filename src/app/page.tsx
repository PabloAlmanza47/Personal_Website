'use client'
import ProjectsWindow from "../../components/ProjectsWindow";
import AboutWindow from "../../components/AboutWindow";
import BlogWindow from "../../components/BlogWindow";
import MenuBar from "../../components/MenuBar";
import MusicWindow from "../../components/MusicWindow";
import Terminal from "../../components/Terminal";
import { useState } from "react";

export default function Home() {
  const [openWindows, setOpenWindows] = useState<string[]>(["terminal"]);

  const openWindow = (name: string) => {
    setOpenWindows(prev => {
      if (prev.includes(name)) return prev;
      return [...prev, name];
    });
  };

  const closeWindow = (name: string) => {
    setOpenWindows(prev => prev.filter(w => w !== name));
  };
  return (
    <main className="bg-[#113532] font-bold flex justify-center items-center h-screen relative">
      <MenuBar/>
        {openWindows.map((win, i) => {
          switch (win) {
            case "terminal":
              return <Terminal key={i} openWindow={openWindow} />

            case "about":
              return <AboutWindow key={i} onClose={() => closeWindow("about")}/>

            case "projects":
              return <ProjectsWindow key={i} />

            case "music":
              return <MusicWindow key={i} />

            default:
              return null
          }
        })}

        {/* <ProjectsWindow /> */}
    </main>
  );
}
