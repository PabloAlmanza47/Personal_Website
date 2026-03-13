'use client'
import { useState, useRef } from "react";
import {motion, AnimatePresence, DragControls} from "framer-motion"
import pabloAscii from "../ascii/pabloAscii";
import pabloName from "../ascii/pabloName";


export default function AboutWindow() {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)
  return (
    <>
      <div className="bg-black rounded-lg w-10 h-10 flex justify-center items-center cursor-pointer hover:-translate-y-1 hover:scale-110 transition-all duration-200" onClick={() => setIsOpen(true)}>
          <p className="text-xs font-thin"> {'</>'} </p>
      </div>
      <AnimatePresence>
        {isOpen && (
          <div ref={containerRef} className="fixed w-screen h-155 z-50 top-8 left-0">
            <motion.div 
              drag 
              dragMomentum={false}
              dragElastic={0}
              whileDrag={{scale: 1.05}}
              dragConstraints={containerRef} 
              initial={{ scale: 0.65, opacity: 0, y: 40 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.15, opacity: 0, y: 40 }} 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950 p-1 rounded-lg"
            >
              <div className="bg-gray-950 w-130 h-95 outline-2 outline-gray-500 rounded-sm flex flex-col"> 

                {/* Top Bar */}
                <div className="bg-white/10 w-full h-4 relative rounded-t-sm cursor-grab active:cursor-grabbing">
                    <div className="absolute left-0 flex">
                      <button aria-label="Close window" className="bg-blue-900 w-5 h-2 hover:h-4 transition-all duration-200 cursor-pointer rounded-tl-sm" onClick={() => setIsOpen(false)}></button>
                      <button className="bg-blue-700 w-5 h-2 hover:h-4 transition-all duration-200"></button>
                      <button className="bg-gray-600 w-5 h-2 hover:h-4 transition-all duration-200"></button>
                    </div>
                    <h1 className="absolute left-1/2 text-xs -translate-x-1/2 text-white/60"> {'>'} All about me!_ </h1>
                </div>

                {/* Content */}
                <div className="flex flex-col flex-1 px-2 py-1 gap-1">
                  {/*header*/}
                  <p className="text-xs font-mono text-gray-300">{`> ./about_me`}</p>

                  {/* Content inside of window*/}
                  <div className="flex flex-row flex-1 gap-2 overflow-hidden">
                    {/* Photo art */}
                    <pre
                      className="whitespace-pre select-none text-white"
                      style={{
                        fontFamily: "Cascadia Code, Consolas, monospace",
                        fontVariantLigatures: "none",
                        fontSize: "11px",
                        lineHeight: "1"
                      }}
                    >{pabloAscii}</pre>
                    <div className="flex flex-col gap-2"> 
                      {/* Name art */}
                      <pre
                        className="whitespace-pre select-none text-blue-400"
                        style={{
                          fontFamily: "Cascadia Code, Consolas, monospace",
                          fontVariantLigatures: "none",
                          fontSize: "11px",
                          lineHeight: "1"
                        }}
                      >{pabloName}</pre>
                      {/* Info */}
                      <div className="font-mono text-[9px] space-y-2.5">
                        <p>
                          is a computer science student and builder on the internet, creating software, games, and experiments while documenting the process of learning and building in public.
                        </p>
                        <p>
                          Born in Houston and raised in Dallas, he currently studies Computer Science at Texas A&M University. His work ranges from modern web development and systems programming to small interactive games and creative side projects.
                        </p>
                        <p>
                          Pablo is also passionate about indie music, teaching programming, and breaking down complex technical ideas so others can learn how to build their own tools and projects.                      
                        </p>
                      </div>
                      {/* Additional Info */}
                      <div className="font-mono text-[9px]">
                        Test 2
                      </div>

                    </div>
                  </div>
                </div>
              </div>   
            </motion.div>
          </div> 
        )}
      </AnimatePresence>
    </>
  );
}