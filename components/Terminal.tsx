'use client'
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion"
import welcomeAscii from "../ascii/welcomeAscii";



type TerminalPrompts = {
  openWindow: (name: string) => void;
};

export default function Terminal({openWindow}: TerminalPrompts) {
  const containerRef = useRef<HTMLDivElement>(null);
  const DragControls = useDragControls();

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  type Line = {
    type: "command" | "output";
    text: string;
    dir?: string;
  };

  const [history, setHistory] = useState<Line[]>([]);
  const [currentDir, setCurrentDir] = useState("~");
  {/* Fake file system */}
  const fileSystem = {
    "~": {
      aboutMe: {
        info: "Computer science student at Texas A&M building software, games, and experiments on the internet."
      },
      projects: {},
      music: {}
    }
  };

  {/* Deciding what to do with the input of the user */}
  const runCommand = (cmd: string) => {
    const parts = cmd.split(" ");
    const base = parts[0];
    const arg = parts[1];

    switch (base) {
      case "help":
        setHistory(prev => [
          ...prev,
          { type: "command", text: cmd, dir: currentDir },
          { type: "output", text: "Available commands:" },
          { type: "output", text: "ls, cd <folder>, cat <file>, clear / cls" },
        ]);
        break;

      case "clear":
      case "cls":
        setHistory([]);
        break;

      case "ls":
        const dir =
          currentDir === "~"
            ? fileSystem["~"]
            : fileSystem["~"][currentDir as keyof typeof fileSystem["~"]];

        if (!dir) return;

        setHistory(prev => [
          ...prev,
          { type: "command", text: cmd, dir: currentDir },
          ...Object.keys(dir).map(name => ({
            type: "output" as const,
            text: name
          }))
        ]);

        break;

      case "cd":
        if (!arg) {
          setHistory(prev => [
            ...prev,
            { type: "command", text: cmd, dir: currentDir },
            { type: "output", text: "cd requires a folder name" }
          ]);
          return;
        }

        if (arg === "..") {
          setCurrentDir("~");

          setHistory(prev => [
            ...prev,
            { type: "command", text: cmd, dir: currentDir }
          ]);

          return;
        }

        if (fileSystem["~"][arg as keyof typeof fileSystem["~"]]) {
          setCurrentDir(arg);

          setHistory(prev => [
            ...prev,
            { type: "command", text: cmd, dir: currentDir }
          ]);
        } else {
          setHistory(prev => [
            ...prev,
            { type: "command", text: cmd, dir: currentDir },
            { type: "output", text: `Folder '${arg}' not found` }
          ]);
        }

        break;

      case "cat":
        if (arg === "info" && currentDir == "aboutMe") {
          setHistory(prev => [
            ...prev,
            { type: "command", text: cmd, dir: currentDir },
            { type: "output", text: "Opening aboutMe window..." }
          ]);
          openWindow("about");
          return;
        }

        setHistory(prev => [
          ...prev,
          { type: "command", text: cmd, dir: currentDir },
          { type: "output", text: `File '${arg}' not found` }
        ]);

        break;

      default:
        setHistory(prev => [
          ...prev,
          { type: "command", text: cmd, dir: currentDir },
          { type: "output", text: `Command '${cmd}' not found` }
        ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const cmd = inputRef.current?.innerText.trim() || "";
      if (!cmd) return;

      runCommand(cmd)

      if (inputRef.current) {
        inputRef.current.innerText = "";
      }
    }
  };

  return (
    <AnimatePresence>
      <div ref={containerRef} className="fixed w-screen h-155 z-50 top-8 left-0">
        <motion.div
          drag
          dragControls={DragControls}
          dragListener={false}
          dragMomentum={false}
          dragElastic={0}
          whileDrag={{ scale: 1.05 }}
          dragConstraints={containerRef}
          initial={{ scale: 0.65, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.15, opacity: 0, y: 40 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950 p-1 rounded-lg"
        >
          <div className="bg-gray-950 w-130 h-95 outline-2 outline-gray-500 rounded-sm flex flex-col">

            {/* Top Bar */}
            <div
              onPointerDown={(e) => DragControls.start(e)}
              className="bg-white/10 w-full h-4 relative rounded-t-sm cursor-grab active:cursor-grabbing"
            >
              <div className="absolute left-0 flex">
                <button
                  aria-label="Close window"
                  className="bg-blue-900 w-5 h-2 hover:h-4 transition-all duration-200 cursor-pointer rounded-tl-sm"
                ></button>
                <button className="bg-blue-700 w-5 h-2 hover:h-4 transition-all duration-200"></button>
                <button className="bg-gray-600 w-5 h-2 hover:h-4 transition-all duration-200"></button>
              </div>
              <h1 className="absolute left-1/2 text-xs -translate-x-1/2 text-white/60">
                {'>'} Terminal_
              </h1>
            </div>

            {/* Terminal Body */}
            <div className="flex flex-col flex-1 bg-gray-950 font-mono text-xs p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent scroll-smooth">
              {/* Bott content */}
              <div className="flex flex-col">
                <pre
                    className="whitespace-pre select-none text-white"
                    style={{
                      fontFamily: "Cascadia Code, Consolas, monospace",
                      fontVariantLigatures: "none",
                      fontSize: "11px",
                      lineHeight: "1"
                    }}
                >{welcomeAscii}
                </pre>
                <div className="font-mono text-xs flex flex-col">
                  <div>
                    <span>Type</span><span className="text-blue-700"> help </span><span> for a list of supported commands.</span>
                  </div>
                  <span>--------------------------------------------------------------------</span>
                </div>
              </div>

              {/* Command History */}
              {history.map((line, i) => {
                if (line.type === "command") {
                  return (
                    <div key={i}>
                      <span>pablo</span><span className="text-blue-700">@portfolio</span><span>:{line.dir}$ </span>
                      <span className="text-gray-600">{line.text}</span>
                    </div>
                  );
                }
                return (
                  <div key={i} className="text-cyan-700">
                    {line.text}
                  </div>
                );
              })}

              {/* Current Input */}
              <div className="flex">
                <span>pablo</span><span className="text-blue-700">@portfolio</span><span>:{currentDir}$</span>
                <div
                  ref={inputRef}
                  contentEditable
                  suppressContentEditableWarning
                  onKeyDown={handleKeyDown}
                  className="outline-none flex-1 text-green-300"
                /> 
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}