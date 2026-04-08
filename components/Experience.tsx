'use client'
import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";

type ExperienceProps = {
  zIndex: number;
  bringToFront: () => void;
  onClose: () => void;
};

export default function Experience({ zIndex, bringToFront, onClose }: ExperienceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  const [showSideWindow, setShowSideWindow] = useState(false);

  // 🔥 Shift + F toggle
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.shiftKey && e.key.toLowerCase() === "f") {
        setShowSideWindow(prev => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ zIndex }}
      className="fixed inset-0 pointer-events-none"
    >
      <motion.div
        onMouseDown={(e) => {
          e.stopPropagation();
          bringToFront();
        }}
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={containerRef}
        initial={{ scale: 0.65, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.15, opacity: 0, y: 40 }}
        className="absolute pointer-events-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-auto h-97 flex flex-row gap-1"
      >
        {/* 🔥 EXPANDING CONTAINER (like About window) */}
        <motion.div
          className="flex flex-row gap-1 z-20"
          initial={false}
          animate={{
            width: showSideWindow ? 528 + 300 + 8 : 528
          }}
          transition={{
            type: "tween",
            duration: 0.25,
            ease: [0.22, 1, 0.36, 1]
          }}
        >

          {/* 🧱 MAIN WINDOW */}
          <div className="bg-gray-950 h-full w-132 p-1 rounded-lg shrink-0">
            <div className="bg-gray-950 w-full h-full outline-2 outline-gray-500 rounded-sm flex flex-col">

              {/* Top Bar */}
              <div
                onPointerDown={(e) => {
                  bringToFront();
                  dragControls.start(e);
                }}
                className="bg-white/10 w-full h-4 relative rounded-t-sm cursor-grab active:cursor-grabbing"
              >
                <div className="absolute left-0 flex">
                  <button
                    aria-label="Close window"
                    className="bg-blue-900 w-5 h-2 hover:h-4 transition-all duration-200 cursor-pointer rounded-tl-sm"
                    onClick={onClose}
                  />
                  <button className="bg-blue-700 w-5 h-2 hover:h-4 transition-all duration-200" />
                  <button className="bg-gray-600 w-5 h-2 hover:h-4 transition-all duration-200" />
                </div>

                <h1 className="text-[10px] text-white/60 ml-1 h-full flex justify-center items-center">
                  {'>'} Experience_
                </h1>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-4 text-white font-mono text-xs flex flex-col gap-2">
                <p>🚧 Work in progress</p>
              </div>
            </div>
          </div>

          {/* 📂 SIDE PANEL */}
          <AnimatePresence>
            {showSideWindow && (
              <motion.div
                initial={{ x: -300, opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -320, opacity: 1 }}
                transition={{
                  type: "tween",
                  duration: 0.25,
                  ease: [0.22, 1, 0.36, 1]
                }}
                className="bg-gray-950 p-1 rounded-lg -z-10"
              >
                <div className="bg-gray-950 w-72 h-full outline-2 outline-gray-500 rounded-sm flex flex-col">

                  {/* Top Bar */}
                  <div
                    onPointerDown={(e) => { bringToFront(); dragControls.start(e); }}
                    className="bg-white/10 w-full h-4 relative rounded-t-sm cursor-grab active:cursor-grabbing flex justify-between"
                  >
                    <h2 className="text-[10px] text-white/60 ml-1 h-full flex justify-center items-center">
                      {'>'} contact_
                    </h2>
                    <button
                      aria-label="Close window"
                      className="bg-blue-900 w-5 h-2 hover:h-4 transition-all duration-200 cursor-pointer rounded-tr-sm"
                      onClick={() => setShowSideWindow(false)}
                    />
                  </div>

                  {/* Side Content */}
                  <div className="p-2 text-xs font-mono text-white flex flex-col gap-2">
                    <p>🚧 Work in progress</p>
                  </div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      </motion.div>
    </div>
  );
}