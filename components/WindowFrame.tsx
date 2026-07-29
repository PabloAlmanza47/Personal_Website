'use client'

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion, useDragControls } from "motion/react";

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
  const windowRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 640px)");
    const sync = () => setIsDesktop(query.matches);

    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    windowRef.current?.focus({ preventScroll: true });
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ zIndex }}
      className="fixed inset-0 pointer-events-none p-3 sm:p-4"
    >
      <motion.div
        ref={windowRef}
        role="dialog"
        aria-label={`${title} window`}
        tabIndex={-1}
        onMouseDown={bringToFront}
        drag={isDesktop}
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragElastic={0}
        dragConstraints={containerRef}
        initial={{ scale: 0.92, opacity: 0, y: 24 }}
        animate={{
          scale: 1,
          opacity: 1,
          x: isDesktop ? initialOffset.x ?? 0 : 0,
          y: isDesktop ? initialOffset.y ?? 0 : 0,
        }}
        exit={{ scale: 0.94, opacity: 0, y: 18 }}
        transition={{ type: "spring", stiffness: 420, damping: 34, mass: 0.7 }}
        className={`pointer-events-auto fixed left-3 right-3 top-12 bottom-20 sm:absolute sm:inset-auto sm:top-1/2 sm:left-1/2 sm:right-auto sm:bottom-auto sm:-translate-x-1/2 sm:-translate-y-1/2 rounded-xl bg-slate-950/95 p-1 shadow-2xl shadow-black/50 ring-1 ring-white/10 backdrop-blur-xl outline-none ${className}`}
      >
        <div
          className={`flex h-full w-full flex-col overflow-hidden rounded-lg border border-white/10 bg-slate-950 ${sizeClassName} ${contentClassName}`}
        >
          <div
            onPointerDown={(event) => {
              bringToFront();
              if (isDesktop) dragControls.start(event);
            }}
            className={`relative flex h-8 w-full shrink-0 items-center border-b border-white/10 bg-white/[0.045] px-3 ${isDesktop ? "cursor-grab active:cursor-grabbing" : ""}`}
          >
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label={`Close ${title}`}
                onPointerDown={(event) => event.stopPropagation()}
                onClick={onClose}
                className="h-3 w-3 rounded-full bg-blue-500 transition hover:bg-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-300"
              />
              <span className="h-3 w-3 rounded-full bg-cyan-500/70" />
              <span className="h-3 w-3 rounded-full bg-slate-500/70" />
            </div>

            <h1 className="pointer-events-none absolute left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-wide text-white/50">
              &gt; {title}_
            </h1>
          </div>

          {children}
        </div>
      </motion.div>
    </div>
  );
}
