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
            <div className="flex flex-col bg-gray-400 gap-2">
              {/* Projects */}
              <div className="bg-gray-900 h-full w-full flex flex-col gap-2">

                <div className="text-[9px] font-mono bg-gray-800 flex flex-col">
                  <Link href={"https://tamushpe.org/"} target="_blank" className="hover:underline">
                    <h2 className="text-white">TAMU SHPE Website</h2>
                  </Link>
                  <div className="flex gap-1 font-thin italic text-white">
                    <span>TailwindCSS</span><ArrowUpRightIcon/><span>TypeScript</span><ArrowUpRightIcon/><span>React</span><ArrowUpRightIcon/><span>Next.js</span><ArrowUpRightIcon/>
                  </div>
                  <p className="text-white/50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo consequuntur voluptas magnam quod incidunt dolorum, perferendis ut explicabo omnis corrupti, natus iste ab quidem officiis soluta maiores et earum a?</p>

                </div>

                <div className="text-[9px] font-mono bg-gray-800 flex flex-col">
                  <Link href={"https://tamucolorstack.com/"} target="_blank" className="hover:underline">
                    <h2 className="text-white">ColorStack Website</h2>
                  </Link>
                  <div className="flex gap-1 font-thin italic text-white">
                    <span>TailwindCSS</span><ArrowUpRightIcon/><span>TypeScript</span><ArrowUpRightIcon/><span>React</span><ArrowUpRightIcon/><span>Next.js</span><ArrowUpRightIcon/>
                  </div>
                  <p className="text-white/50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo consequuntur voluptas magnam quod incidunt dolorum, perferendis ut explicabo omnis corrupti, natus iste ab quidem officiis soluta maiores et earum a?</p>

                </div>

                <div className="text-[9px] font-mono bg-gray-800 flex flex-col">

                  <Link href={{/* inset website link after this is done*/}} target="_blank" className="hover:underline">
                    <h2 className="text-white">Personal Website</h2>
                  </Link>
                  <div className="flex gap-1 font-thin italic text-white">
                    <span>TailwindCSS</span><ArrowUpRightIcon/><span>TypeScript</span><ArrowUpRightIcon/><span>React</span><ArrowUpRightIcon/><span>Next.js</span><ArrowUpRightIcon/>
                  </div>
                  <p className="text-white/50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo consequuntur voluptas magnam quod incidunt dolorum, perferendis ut explicabo omnis corrupti, natus iste ab quidem officiis soluta maiores et earum a?</p>

                </div>

                <div className="text-[9px] font-mono bg-gray-800 flex flex-col">

                  <Link href={"https://github.com/PabloAlmanza47/Tree_Chop_Mania"} target="_blank" className="hover:underline">
                    <h2 className="text-white">Tree Chop Mania</h2>
                  </Link>
                  <div className="flex gap-1 font-thin italic text-white">
                    <span>Python</span><ArrowUpRightIcon/><span>Git/GitHub</span><ArrowUpRightIcon/>
                  </div>
                  <p className="text-white/50">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo consequuntur voluptas magnam quod incidunt dolorum, perferendis ut explicabo omnis corrupti, natus iste ab quidem officiis soluta maiores et earum a?</p>

                </div>

              </div>
            
              {/* Extra Information */}
              <div className="bg-gray-900 text-[9px] font-mono flex flex-col gap-2 p-2">
                <h3 className="text-white/70">Current Tools</h3>

                <div className="flex flex-col gap-1">
                  <div className="flex">
                    <span>Terminal:</span>
                    <span>Ghostty</span>
                  </div>

                  <div className="flex">
                    <span>IDE:</span>
                    <span>Neovim</span>
                  </div>

                  <div className="flex">
                    <span>OS:</span>
                    <span>Fedora Linux w/ Hyprland</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}