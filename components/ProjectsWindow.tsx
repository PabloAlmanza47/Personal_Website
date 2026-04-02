'use client'
import { useRef } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react";

interface MusicWindowProps {
  onClose: () => void;
  zIndex: number;
  bringToFront: () => void;
}

export default function ProjectsWindow({ onClose, zIndex, bringToFront }: MusicWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  return (
    <div ref={containerRef} style={{ zIndex }} className="fixed inset-0 pointer-events-none">
      <motion.div
        onMouseDown={bringToFront} 
        drag 
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={containerRef} 
        initial={{ scale: 0.65, opacity: 0, y: 40 }} 
        animate={{ scale: 1, opacity: 1, y: 30, x:15 }} 
        exit={{ scale: 0.15, opacity: 0, y: 40 }} 
        className="absolute pointer-events-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950 p-1 rounded-lg"
      >
        <div className="bg-gray-950 w-130 h-105 outline-2 outline-gray-500 rounded-sm flex flex-col">

          {/* Top Bar */}
          <div onPointerDown={(e) => {bringToFront(); dragControls.start(e);}} className="bg-white/10 w-full h-4 relative rounded-t-sm cursor-grab active:cursor-grabbing">
            <div className="absolute left-0 flex">
              <button aria-label="Close window" className="bg-blue-900 w-5 h-2 hover:h-4 transition-all duration-200 cursor-pointer rounded-tl-sm" onClick={onClose}/>
              <button className="bg-blue-700 w-5 h-2 hover:h-4 transition-all duration-200" />
              <button className="bg-gray-600 w-5 h-2 hover:h-4 transition-all duration-200" />
            </div>
            <h1 className="absolute left-1/2 text-xs -translate-x-1/2 text-white/60"> {'>'} Projects_ </h1>
          </div>

          {/* Content */}
          <div className="flex flex-col px-2 py-1 gap-1">
            {/* Header */}
            <div className="text-xs font-mono text-gray-300">
              <span>pablo</span>
              <span className="text-blue-700">@term.portfolio</span>
              <span>:projects/info$ </span>
            </div>

            {/* True window content */}
            <div className="flex flex-col gap-2">
              {/* Projects */}
              <div className="h-full w-full flex flex-col gap-2">

                <div className="text-[9px] font-mono hover:bg-gray-800 transition-color duration-150 flex flex-col">
                  <Link href={"https://tamushpe.org/"} target="_blank" className="hover:underline">
                    <h2 className="text-white">TAMU SHPE Website</h2>
                  </Link>
                  <div className="flex gap-1 font-thin italic text-white">
                    <span>TailwindCSS</span><ArrowUpRightIcon size={11}/><span>TypeScript</span><ArrowUpRightIcon size={11}/><span>React</span><ArrowUpRightIcon size={11}/><span>Next.js</span><ArrowUpRightIcon size={11}/>
                  </div>
                  <p className="text-white/50">
                    Developed and deployed a responsive website for a 200+ member engineering organization. 
                    Built reusable components using React and TypeScript, improving maintainability and page performance.
                  </p>

                </div>

                <div className="text-[9px] font-mono hover:bg-gray-800 transition-color duration-150 flex flex-col">
                  <Link href={"https://tamucolorstack.com/"} target="_blank" className="hover:underline">
                    <h2 className="text-white">ColorStack Website</h2>
                  </Link>
                  <div className="flex gap-1 font-thin italic text-white">
                    <span>TailwindCSS</span><ArrowUpRightIcon size={11}/><span>TypeScript</span><ArrowUpRightIcon size={11}/><span>React</span><ArrowUpRightIcon size={11}/><span>Next.js</span><ArrowUpRightIcon size={11}/>
                  </div>
                  <p className="text-white/50">
                    Contributed to the development of a modern organization website, focusing on clean UI and responsive design. 
                    Collaborated with a team using Git and GitHub to ship production-ready features.
                  </p>

                </div>

                <div className="text-[9px] font-mono hover:bg-gray-800 transition-color duration-150 flex flex-col">

                  <Link href={{/* inset website link after this is done*/}} target="_blank" className="hover:underline">
                    <h2 className="text-white">Personal Website</h2>
                  </Link>
                  <div className="flex gap-1 font-thin italic text-white">
                    <span>TailwindCSS</span><ArrowUpRightIcon size={11}/><span>TypeScript</span><ArrowUpRightIcon size={11}/><span>React</span><ArrowUpRightIcon size={11}/><span>Next.js</span><ArrowUpRightIcon size={11}/>
                  </div>
                  <p className="text-white/50">
                    Designed and built a terminal-inspired portfolio using Next.js and Framer Motion. 
                    Implemented draggable window components and dynamic UI interactions to create a unique user experience.
                  </p>

                </div>

                <div className="text-[9px] font-mono hover:bg-gray-800 transition-color duration-150 flex flex-col">

                  <Link href={"https://github.com/PabloAlmanza47/Tree_Chop_Mania"} target="_blank" className="hover:underline">
                    <h2 className="text-white">Tree Chop Mania</h2>
                  </Link>
                  <div className="flex gap-1 font-thin italic text-white">
                    <span>Python</span><ArrowUpRightIcon size={11}/><span>Git/GitHub</span><ArrowUpRightIcon size={11}/>
                  </div>
                  <p className="text-white/50">
                    Built a simple game using Python, implementing core game logic and user interaction. 
                    Practiced problem-solving and control flow while managing game state and input handling.
                  </p>

                </div>

              </div>
            
              {/* Extra Information */}
              <div className="text-[9px] font-mono flex flex-col gap-1 pt-2">
                <h3>Current Tools</h3>
                <ul>
                  <li>Terminal: Ghostty</li>
                  <li>IDE: Neovim</li>
                  <li>OS: Fedora Linux w/ Hyprland</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}