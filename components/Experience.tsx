'use client'
import { useRef} from "react";
import { motion, useDragControls } from "framer-motion";

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
        animate={{ scale: 1, opacity: 1, y: 30, x:15 }}
        exit={{ scale: 0.15, opacity: 0, y: 40 }}
        className="absolute pointer-events-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950 p-1 rounded-lg w-auto h-97"
      >
        <div className="bg-gray-950 w-130 h-full outline-2 outline-gray-500 rounded-sm flex flex-col"> 

          {/* Top Bar */}
          <div onPointerDown={(e) => {bringToFront(); DragControls.start(e);}} className="bg-white/10 w-full h-4 relative rounded-t-sm cursor-grab active:cursor-grabbing">
              <div className="absolute left-0 flex">
                <button aria-label="Close window" className="bg-blue-900 w-5 h-2 hover:h-4 transition-all duration-200 cursor-pointer rounded-tl-sm" onClick={onClose}/>
                <button className="bg-blue-700 w-5 h-2 hover:h-4 transition-all duration-200"/>
                <button className="bg-gray-600 w-5 h-2 hover:h-4 transition-all duration-200"/>
              </div>
              <h1 className="absolute left-1/2 text-[10px] -translate-x-1/2 text-white/60 h-full flex justify-center items-center"> {'>'} Experience_ </h1>
          </div>

          {/* Content */}
          <div className="flex flex-col flex-1 gap-1 px-2 py-1">
            {/*header*/}
            <div className="text-xs font-mono text-gray-300">
              <span>pablo</span><span className="text-blue-700">@term.portfolio</span><span>:experience/info$ </span>
            </div>
            <div className="flex-1 text-xs font-mono text-white">
              <p>🚧 Work in progress</p>
            </div>
          </div>
        </div>   
      </motion.div>
    </div>
  );
}