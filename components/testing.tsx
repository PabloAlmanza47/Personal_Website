
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react";

export default function Testing() {

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.shiftKey && e.key === "F") {
          setIsVisible(prev => !prev); // toggles on each Shift+F press
        }
      };

      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown); // cleanup
    }, []);



  return (
    <div className="bg-black w-60 h-40 overflow-hidden relative">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{y: -60 }}
            animate={{y: 0 }}
            exit={{y: -60 }}
            transition={{ type: "tween", duration: 0.2,  ease: "easeInOut" }}
            contentEditable
            suppressContentEditableWarning
            className="m-1 p-4 bg-gray-950 border border-blue-300 rounded-sm w-auto"
          >
            👋 You pressed Shift + F!
          </motion.div>
        )}
      </AnimatePresence>
      <p className="absolute bottom-0 text-[9px] w-full text-center text-gray-500/50 font-mono"> press Shift + f to use fuzzy finder</p>
      {/* Put the fuzzy finder next to the terminal so that when someone does Shift + f it will come out the same way the email window comes out */}
    </div>
    
  );
}