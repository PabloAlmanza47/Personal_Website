'use client'
import { useRef} from "react";
import { motion, useDragControls } from "framer-motion";
import Link from "next/link";
import { ArrowUpRightIcon } from "@phosphor-icons/react";


interface ExperienceProps {
  zIndex: number;
  bringToFront: () => void;
  onClose: () => void;
};

export default function Experience({ zIndex, bringToFront, onClose }: ExperienceProps) {
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
        animate={{ scale: 1, opacity: 1, y: 45, x:15 }} 
        exit={{ scale: 0.15, opacity: 0, y: 40 }} 
        className="absolute pointer-events-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950 p-1 rounded-lg"
      >
        <div className="bg-gray-950 w-130 h-105 outline-2 outline-gray-500 rounded-sm flex flex-col">

          {/* Top Bar */}KO
          <div onPointerDown={(e) => {bringToFront(); DragControls.start(e);}} className="bg-white/10 w-full h-4 relative rounded-t-sm cursor-grab active:cursor-grabbing">
            <div className="absolute left-0 flex">
              <button aria-label="Close window" className="bg-blue-900 w-5 h-2 hover:h-4 transition-all duration-200 cursor-pointer rounded-tl-sm" onClick={onClose}/>
              <button className="bg-blue-700 w-5 h-2 hover:h-4 transition-all duration-200" />
              <button className="bg-gray-600 w-5 h-2 hover:h-4 transition-all duration-200" />
            </div>
            <h1 className="absolute left-1/2 text-[10px] -translate-x-1/2 text-white/60 h-full flex justify-center items-center"> {'>'} Experience_ </h1>
          </div>

          {/* Content */}
          <div className="flex flex-col px-2 py-1 gap-1">
            {/* Header */}
            <div className="text-xs font-mono text-gray-300">
              <span>pablo</span><span className="text-blue-700">@term.portfolio</span><span>:experience/info$ </span>
            </div>

            {/* True window content */}
            <div className="flex flex-col gap-2">
              {/* Projects */}
              <div className="h-full w-full flex flex-col gap-2">

                <div className="text-[9px] font-mono transition-color duration-150 flex flex-col">
                  <Link href={"https://tamushpe.org/"} target="_blank" className="hover:underline w-fit">
                    <h2 className="text-white"> Engineering Summer Bridge Program </h2>
                  </Link>
                  <div className="flex gap-1 font-thin italic text-white">

                    <ul className="flex gap-1">
                      {[
                        { name: "Python", url: "https://www.python.org" },
                        { name: "Git/GitHub", url: "https://www.github.com" },
                        { name: "Numpy", url: "https://numpy.org" }
                      ].map((tech) => (
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
                  <p className="text-white/50">
                    Executed a rigorous 160-hour immersive mentorship program, accelerating the academic transition of 4 incoming
                    engineering students into a high-intensity university environment.
                  </p>

                </div>

                <div className="text-[9px] font-mono transition-color duration-150 flex flex-col">
                  <Link href={"https://tamucolorstack.com/"} target="_blank" className="hover:underline w-fit">
                    <h2 className="text-white"> Engineering Peer Teacher </h2>
                  </Link>
                  <div className="flex gap-1 font-thin italic text-white">

                    <ul className="flex gap-1">
                      {[
                        { name: "Python", url: "https://www.python.org" },
                        { name: "Matplotlib", url: "https://matplotlib.org" },
                        { name: "Numpy", url: "https://numpy.org" }
                      ].map((tech) => (
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
                  <p className="text-white/50">
                  Serve as an academic mentor for 60+ students per week in Engineering Lab 1 Computation, bridging the gap between 
                  instructors and students to support learning in Python programming and computational thinking.
                  </p>

                </div>

                <div className="text-[9px] font-mono transition-color duration-150 flex flex-col">

                  <Link href={"https://pablosweb.netlify.app/"} target="_blank" className="hover:underline w-fit">
                    <h2 className="text-white"> Society of Hispanic Professional Engineers </h2>
                  </Link>
                  <div className="flex gap-1 font-thin italic text-white">

                    <ul className="flex gap-1">
                      {[
                        { name: "TypeScript", url: "https://www.typescriptlang.org" },
                        { name: "React", url: "https://react.dev" },
                        { name: "Next.js", url: "https://nextjs.org" }
                      ].map((tech) => (
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
                  <p className="text-white/50">
                    Architected and maintained a central web platform serving 500+ active members, implementing UI/UX optimizations that
                    increased site accessibility and boosted user engagement by 90%.
                  </p>

                </div>

              
              </div>
                      
              
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}