'use client'
import ProjectsWindow from "../../components/ProjectsWindow";
import AboutWindow from "../../components/AboutWindow";
import BlogWindow from "../../components/BlogWindow";
import MenuBar from "../../components/MenuBar";
import MusicWindow from "../../components/MusicWindow";
import Terminal from "../../components/Terminal";
import { useState } from "react";

export default function Home() {
  const [windows, setWindows] = useState<string[]>([])
  const openWindow = (name: string) => {
    setWindows(prev => [...prev, name])
  }
  const closeWindow = (name: string) => {
    setWindows(prev => prev.filter(w => w !== name));
  };
  return (
    <main className="bg-[#113532] font-bold flex justify-center items-center h-screen relative">
      <MenuBar/>
      <div className="w-96 h-14 flex flex-row justify-center items-center gap-2 absolute bottom-5"> 
        <Terminal openWindow={openWindow}/>

        {windows.includes("about") && (
          <AboutWindow onClose={() => closeWindow("about")}/>
        )}
      </div>
    </main>
  );
}
