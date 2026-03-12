'use client'
import { useState } from "react";


export default function AboutWindow() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className="bg-black rounded-lg w-10 h-10 flex justify-center items-center cursor-pointer" onClick={() => setIsOpen(true)}>
          <p className="text-xs font-thin"> {'</>'} </p>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-gray-950 p-1 rounded-lg">
            <div className="bg-gray-950 w-96 h-96 outline-2 outline-gray-500 rounded-sm"> 
              <div className="bg-white/10 w-full h-4 relative rounded-t-sm">
                  <div className="absolute left-0 flex">
                    <button className="bg-blue-900 w-5 h-2 hover:h-4 transition-all duration-200 cursor-pointer rounded-tl-sm" onClick={() => setIsOpen(false)}></button>
                    <button className="bg-blue-700 w-5 h-2 hover:h-4 transition-all duration-200"></button>
                    <button className="bg-gray-600 w-5 h-2 hover:h-4 transition-all duration-200"></button>
                  </div>
                  <h1 className="absolute left-1/2 text-xs -translate-x-1/2 text-white/10"> All about me! </h1>
              </div>
            </div>   
          </div>
        </div> 
      )}
    </>
  );
}