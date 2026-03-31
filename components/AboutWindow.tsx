'use client'
import { useRef, useState } from "react";
import { motion, useDragControls, AnimatePresence } from "framer-motion";
import pabloAscii from "../ascii/pabloAscii";
import pabloName from "../ascii/pabloName";
import { ReadCvLogoIcon, GithubLogoIcon, EnvelopeSimpleIcon, InstagramLogoIcon, LinkedinLogoIcon} from "@phosphor-icons/react";

interface AboutWindowProps {
  onClose: () => void;
  zIndex: number;
  bringToFront: () => void;
}

export default function AboutWindow({ onClose, zIndex, bringToFront }: AboutWindowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();
  const [showEmailWindow, setShowEmailWindow] = useState(false);

  return (
    <div ref={containerRef} style={{ zIndex }} className="fixed inset-0 pointer-events-none">
      <AnimatePresence>
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
          className="absolute pointer-events-auto top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-215 h-97 flex flex-row gap-1"
        >
          {/* Main window */}
          <div className="bg-gray-950 h-full w-132 p-1 rounded-lg">
            <div className="bg-gray-950 w-full h-full outline-2 outline-gray-500 rounded-sm flex flex-col">
              {/* Top Bar */}
              <div
                onPointerDown={(e) => { bringToFront(); dragControls.start(e); }}
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
                <h1 className="absolute left-1/2 text-xs -translate-x-1/2 text-white/60">
                  {'>'} All about me!_
                </h1>
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 px-2 py-1 gap-1">
                <div className="text-xs font-mono text-gray-300">
                  <span>pablo</span>
                  <span className="text-blue-700">@portfolio</span>
                  <span>:aboutMe/info$ </span>
                </div>

                <div className="flex flex-row flex-1 gap-2 overflow-hidden">
                  {/* ASCII */}
                  <pre
                    className="whitespace-pre select-none text-white"
                    style={{
                      fontFamily: "Cascadia Code, Consolas, monospace",
                      fontVariantLigatures: "none",
                      fontSize: "11px",
                      lineHeight: "1"
                    }}
                  >
                    {pabloAscii}
                  </pre>

                  <div className="flex flex-col gap-2">
                    {/* Name */}
                    <pre
                      className="whitespace-pre select-none text-blue-400"
                      style={{
                        fontFamily: "Cascadia Code, Consolas, monospace",
                        fontVariantLigatures: "none",
                        fontSize: "11px",
                        lineHeight: "1"
                      }}
                    >
                      {pabloName}
                    </pre>

                    {/* Info */}
                    <div className="font-mono text-[9px] space-y-2.5">
                      <p>
                        is a computer science student and builder on the internet,
                        creating software, games, and experiments while documenting
                        the process of learning and building in public.
                      </p>
                      <p>
                        Born in Houston and raised in Dallas, he currently studies
                        Computer Science at Texas A&M University. His work ranges
                        from modern web development and systems programming to small
                        interactive games and creative side projects.
                      </p>
                      <p>
                        Pablo is also passionate about indie music, teaching
                        programming, and breaking down complex technical ideas so
                        others can learn how to build their own tools and projects.
                      </p>
                    </div>

                    {/* Icons */}
                    <div className="flex flex-row h-full items-center justify-center gap-1">
                      {[
                        {
                          icon: <EnvelopeSimpleIcon size={20} />,
                          action: () => setShowEmailWindow(true),
                          label: "Email"
                        },
                        {
                          icon: <LinkedinLogoIcon size={20} />,
                          action: () => window.open("https://www.linkedin.com/in/pabloalmanza/", "_blank"),
                          label: "LinkedIn"
                        },
                        {
                          icon: <InstagramLogoIcon size={20} />,
                          action: () => window.open("https://instagram.com/YOUR_HANDLE", "_blank"),
                          label: "Instagram"
                        },
                        {
                          icon: <ReadCvLogoIcon size={20} />,
                          action: () => window.open("/resume.pdf", "_blank"),
                          label: "Resume"
                        },
                        {
                          icon: <GithubLogoIcon size={20} />,
                          action: () => window.open("https://github.com/PabloAlmanza47", "_blank"),
                          label: "GitHub"
                        }
                      ].map((item, i) => (
                        <motion.div
                          key={i}
                          title={item.label}
                          onClick={item.action}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="text-gray-300 hover:text-blue-400 cursor-pointer transition duration-200"
                        >
                          {item.icon}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Email Window */}
          <AnimatePresence>
            {showEmailWindow && (
              <motion.div
                initial={{ x: -40, opacity: 1 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -40, opacity: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="bg-gray-950 p-1 rounded-lg"
              >
                <div className="bg-gray-950 w-80 h-full outline-2 outline-gray-500 rounded-sm flex flex-col">

                  {/* Top Bar */}
                  <div
                    onPointerDown={(e) => { bringToFront(); dragControls.start(e); }}
                    className="bg-white/10 w-full h-4 relative rounded-t-sm cursor-grab active:cursor-grabbing flex justify-between"
                  >
                    <span className="text-[10px] text-white/60 ml-1">
                      {'>'} mail<span className="animate-pulse">_</span>
                    </span>
                    <button
                      aria-label="Close window"
                      className="bg-blue-900 w-5 h-2 hover:h-4 transition-all duration-200 cursor-pointer rounded-tr-sm"
                      onClick={onClose}
                    />
                  </div>

                  {/* Content */}
                  <div className="p-2 font-mono text-xs flex flex-col gap-2 flex-1">
                    <input
                      className="bg-black border border-gray-700 px-1 py-0.5"
                      placeholder="to:"
                    />
                    <input
                      className="bg-black border border-gray-700 px-1 py-0.5"
                      placeholder="subject:"
                    />
                    <textarea
                      className="bg-black border border-gray-700 px-1 py-0.5 flex-1 resize-none"
                      placeholder="message..."
                    />
                    <button
                      className="bg-blue-600 hover:bg-blue-500 px-2 py-1"
                      onClick={() => window.location.href = "mailto:pabloalmanza3247@example.com"}
                    >
                      send
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}