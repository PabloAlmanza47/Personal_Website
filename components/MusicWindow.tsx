'use client'
import { useRef } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import CurrentlyPlaying from "./CurrentlyPlaying";

interface MusicWindowProps {
  onClose: () => void;
  zIndex: number;
  bringToFront: () => void;
}

export default function MusicWindow({ onClose, zIndex, bringToFront }: MusicWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  return (
    <AnimatePresence>
      {/* Container (does NOT block clicks) */}
      <div
        ref={containerRef}
        style={{ zIndex }}
        className="fixed inset-0 pointer-events-none"
      >
        {/* Actual window */}
        <motion.div
          onMouseDown={bringToFront} 
          drag 
          dragControls={dragControls}
          dragListener={false}
          dragMomentum={false}
          dragElastic={0}
          whileDrag={{scale: 1.05}}
          dragConstraints={containerRef} 
          initial={{ scale: 0.65, opacity: 0, y: 40 }} 
          animate={{ scale: 1, opacity: 1, y: 0 }} 
          exit={{ scale: 0.15, opacity: 0, y: 40 }} 
          className="absolute pointer-events-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950 p-1 rounded-lg"
        >
          <div className="bg-gray-950 w-130 h-95 outline-2 outline-gray-500 rounded-sm flex flex-col">

            {/* Top Bar */}
            <div onPointerDown={(e) => {bringToFront(); dragControls.start(e);}} className="bg-white/10 w-full h-4 relative rounded-t-sm cursor-grab active:cursor-grabbing">
              <div className="absolute left-0 flex">
                <button aria-label="Close window" className="bg-blue-900 w-5 h-2 hover:h-4 transition-all duration-200 cursor-pointer rounded-tl-sm" onClick={onClose}/>
                <button className="bg-blue-700 w-5 h-2 hover:h-4 transition-all duration-200" />
                <button className="bg-gray-600 w-5 h-2 hover:h-4 transition-all duration-200" />
              </div>
              <h1 className="absolute left-1/2 text-xs -translate-x-1/2 text-white/60"> {'>'} Music_ </h1>
            </div>

            {/* Content */}
            <div className="flex flex-col px-2 py-1">
              {/*header*/}
              <div className="text-xs font-mono text-gray-300">
                <span>pablo</span><span className="text-blue-700">@portfolio</span><span>:music/info$ </span>
              </div>
              <div className="">
                <CurrentlyPlaying />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}