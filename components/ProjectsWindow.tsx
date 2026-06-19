'use client'
import { useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import { currentTools, projects } from "../data/projects";

interface ProjectsWindowProps {
  onClose: () => void;
  zIndex: number;
  bringToFront: () => void;
}

export default function ProjectsWindow({ onClose, zIndex, bringToFront }: ProjectsWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const DragControls = useDragControls();

  return (
    <div ref={containerRef} style={{ zIndex }} className="fixed inset-0 pointer-events-none">
      <motion.div
        onMouseDown={bringToFront}
        drag
        dragControls={DragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={containerRef}
        initial={{ scale: 0.65, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 45, x: 15 }}
        exit={{ scale: 0.15, opacity: 0, y: 40 }}
        className="absolute pointer-events-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950 p-1 rounded-lg"
      >
        <div className="bg-gray-950 w-130 h-105 outline-2 outline-gray-500 rounded-sm flex flex-col">
          {/* Top Bar */}
          <div onPointerDown={(e) => { bringToFront(); DragControls.start(e); }} className="bg-white/10 w-full h-4 relative rounded-t-sm cursor-grab active:cursor-grabbing">
            <div className="absolute left-0 flex">
              <button aria-label="Close window" className="bg-blue-900 w-5 h-2 hover:h-4 transition-all duration-200 cursor-pointer rounded-tl-sm" onClick={onClose} />
              <button className="bg-blue-700 w-5 h-2 hover:h-4 transition-all duration-200" />
              <button className="bg-gray-600 w-5 h-2 hover:h-4 transition-all duration-200" />
            </div>
            <h1 className="absolute left-1/2 text-[10px] -translate-x-1/2 text-white/60 h-full flex justify-center items-center"> {'>'} Projects_ </h1>
          </div>

          {/* Content */}
          <div className="flex flex-col px-2 py-1 gap-1">
            {/* Header */}
            <div className="text-xs font-mono text-gray-300">
              <span>pablo</span><span className="text-blue-700">@term.portfolio</span><span>:projects/info$ </span>
            </div>

            {/* True window content */}
            <div className="flex flex-col gap-2">
              {/* Projects */}
              <div className="h-full w-full flex flex-col gap-2">
                {projects.map((project) => (
                  <div key={project.title} className="text-[9px] font-mono transition-color duration-150 flex flex-col">
                    <Link href={project.url} target="_blank" className="hover:underline w-fit">
                      <h2 className="text-white">{project.title}</h2>
                    </Link>

                    <div className="flex gap-1 font-thin italic text-white">
                      <ul className="flex gap-1">
                        {project.tech.map((tech) => (
                          <li key={tech.name} className="relative overflow-hidden group/item flex gap-1 px-1 cursor-default">
                            <div className="absolute inset-0 -left-1 -right-1 bg-linear-to-r from-blue-800 to-purple-700 -translate-x-full group-hover/item:translate-x-0 transition-transform duration-300 ease-in-out" />
                            <Link href={tech.url} target="_blank" className="relative z-10 flex gap-1 items-center">
                              <span>{tech.name}</span>
                              <ArrowUpRightIcon size={11} />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-white/50">{project.description}</p>
                  </div>
                ))}
              </div>

              {/* Extra Information */}
              <div className="text-[9px] font-mono flex flex-col gap-1 pt-2">
                <h3 className="">Current Tools</h3>
                <ul className="flex flex-col gap-1 ml-2">
                  {currentTools.map((tool) => (
                    <li key={tool.label}>
                      <span className="text-gray-400">{tool.label}:</span> {tool.value}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
