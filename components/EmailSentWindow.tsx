'use client'
import { useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { ShootingStarIcon, SparkleIcon  } from "@phosphor-icons/react";


interface EmailSentWindowProps {
  onClose: () => void;
  zIndex: number;
  bringToFront: () => void;
}

export default function EmailSentWindow({ onClose, zIndex, bringToFront }: EmailSentWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  return (
    <div ref={containerRef} style={{ zIndex }} className="fixed inset-0 pointer-events-none">
      {/* Actual window */}
      <motion.div
        onMouseDown={bringToFront} 
        drag 
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={containerRef} 
        initial={{ scale: 0.65, opacity: 0, y: 40 }} 
        animate={{ scale: 1, opacity: 1, y: 0 }} 
        exit={{ scale: 0.15, opacity: 0, y: 40 }} 
        className="absolute pointer-events-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950 p-1 rounded-lg w-45 h-28"
      >
        <div className="bg-gray-950 outline-2 outline-gray-500 rounded-sm flex flex-col h-full w-full">

          {/* Top Bar */}
          <div onPointerDown={(e) => {bringToFront(); dragControls.start(e);}} className="bg-white/10 w-full h-4 relative rounded-t-sm cursor-grab active:cursor-grabbing">
            <div className="absolute flex">
              <button aria-label="Close window" className="bg-blue-900 w-5 h-2 hover:h-4 transition-all duration-200 cursor-pointer rounded-tl-sm" onClick={onClose}/>
            </div>
            <h3 className="absolute left-1/2 text-[10px] -translate-x-1/2 text-white/60 h-full flex justify-center items-center"> success! </h3>
          </div>

          {/* content */}
          <div className="flex flex-col px-2 py-1 flex-1">
            <div className="w-full h-1/2 text-[10px] flex justify-center items-end text-blue-400">
              <ShootingStarIcon size={30}/>
            </div>
            <p className="w-full h-1/2 text-[10px] flex justify-center items-center text-white/60"> Your message has been sent!</p>

          </div>
        </div>
      </motion.div>
    </div>

  );
}