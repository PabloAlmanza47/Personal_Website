'use client'
import { useState } from 'react';

export default function MusicWindow() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div className="bg-black rounded-lg w-10 h-10 flex justify-center items-center cursor-pointer" onClick={() => setIsOpen(true)}>
          <p className="text-xs font-thin"> {'<'}/{'>'} </p>
      </div>
      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="bg-gray-950 w-96 h-96"> 
            <div className="bg-white/10 w-full h-4 relative">
                <button className="bg-red-500 w-4 h-2 absolute hover:h-4 transition-all duration-200 cursor-pointer" onClick={() => setIsOpen(false)}></button>
                <button className="bg-yellow-500 w-4 h-2 absolute left-4 hover:h-4 transition-all duration-200"></button>
                <button className="bg-green-500 w-4 h-2 absolute left-8 hover:h-4 transition-all duration-200"></button>
                <h1 className="absolute left-1/2 text-xs -translate-x-1/2 text-white/10"> All about me! </h1>
            </div>
          </div>   
        </div> 
      )}
    </>
  );
}