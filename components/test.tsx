'use client'
import { useState } from "react";
import {motion, AnimatePresence} from "framer-motion";

export default function Test() {
  const [showEmailWindow, setShowEmailWindow] = useState(false)
  return (
    <motion.div drag dragElastic={0} dragMomentum={false} className="flex flex-row gap-1 h-40 w-61">
      <div className="bg-gray-950 w-40 h-full flex justify-center items-center z-10"> 
        <button className="bg-blue-900 h-10 w-10" onClick={() => setShowEmailWindow(true)}> ON </button>
      </div>

      <AnimatePresence>
        {showEmailWindow && (
            <motion.div 
              initial={{x:-70}} 
              animate={{x:0}} 
              exit={{x:-90}}
              transition={{ delay: 0.08, type: "spring", stiffness: 220, damping: 18 }}
              className="w-20 h-full bg-gray-500 flex items-center justify-center"
            > 
              <button className="bg-blue-900 h-10 w-10" onClick={() => setShowEmailWindow(false)}> OFF </button>
            </motion.div>
        )}
      </AnimatePresence>



    </motion.div>
  );
}