'use client'

import { ReactNode, useRef } from "react";
import { motion, useDragControls } from "framer-motion";

type WindowFrameProps = {
  title: string;
  zIndex: number;
  bringToFront: () => void;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  sizeClassName?: string;
  initialOffset?: {
    x?: number;
    y?: number;
  };
};

export default function WindowFrame({
  title,
  zIndex,
  bringToFront,
  onClose,
  children,
  className = "",
  contentClassName = "",
  sizeClassName = "sm:w-130 sm:h-105",
  initialOffset = { x: 15, y: 45 },
}: WindowFrameProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  return (
    <div ref={containerRef} style={{ zIndex }} className="fixed inset-0 pointer-events-none p-3 sm:p-4">
      <motion.div
        onMouseDown={bringToFront}
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={containerRef}
        initial={{ scale: 0.65, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, x: initialOffset.x ?? 0, y: initialOffset.y ?? 0 }}
        exit={{ scale: 0.15, opacity: 0, y: 40 }}
        className={`pointer-events-auto fixed left-3 right-3 top-14 bottom-4 sm:absolute sm:inset-auto sm:top-1/2 sm:left-1/2 sm:right-auto sm:bottom-auto sm:-translate-x-1/2 sm:-translate-y-1/2 bg-gray-950 p-1 rounded-lg ${className}`}
      >
        <div className={`bg-gray-950 w-full h-full ${sizeClassName} outline-2 outline-gray-500 rounded-sm flex flex-col overflow-hidden ${contentClassName}`}>
          <div
            onPointerDown={(e) => {
              bringToFront();
              dragControls.start(e);
            }}
            className="bg-white/10 w-full h-6 sm:h-4 relative rounded-t-sm cursor-grab active:cursor-grabbing shrink-0"
          >
            <div className="absolute left-0 flex h-full items-start">
              <button
                aria-label="Close window"
                className="bg-blue-900 w-7 sm:w-5 h-3 sm:h-2 hover:h-full transition-all duration-200 cursor-pointer rounded-tl-sm"
                onClick={onClose}
              />
              <button className="bg-blue-700 w-7 sm:w-5 h-3 sm:h-2 hover:h-full transition-all duration-200" />
              <button className="bg-gray-600 w-7 sm:w-5 h-3 sm:h-2 hover:h-full transition-all duration-200" />
            </div>
            <h1 className="absolute left-1/2 text-[10px] -translate-x-1/2 text-white/60 h-full flex justify-center items-center">
              {'>'} {title}_
            </h1>
          </div>

          {children}
        </div>
      </motion.div>
    </div>
  );
}
