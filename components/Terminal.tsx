'use client'
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion"
import welcomeAscii from "../ascii/welcomeAscii";
import useSound from "use-sound";


type TerminalPrompts = {
  openWindow: (name: string) => void;
  onClose: () => void;
  zIndex: number;
  bringToFront: () => void;
};

  type File = {
    type: "file";
    content: string[];
  };

  type Folder = {
    type: "folder";
    children: Record<string, File | Folder>;
  };

  type FileSystem = {
    "~": Folder;
  };

{/* Fake file system */}
const fileSystem: FileSystem = {
  "~": {
    type: "folder",
    children: {
      information: {
        type: "folder",
        children: {
          about: {
            type: "file",
            content: [
              "Name: Pablo Almanza",
              "Role: Web Developer"
            ]
          },
          projects: {
            type: "file",
            content: [
              "• Portfolio OS",
              "• Library System"
            ]
          }
        }
      },
      music: {
        type: "file",
        content: ["Hip-Hop", "R&B"]
      }
    }
  }
};



export default function Terminal({ openWindow, onClose, zIndex, bringToFront }: TerminalPrompts) {
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.5 });
  const containerRef = useRef<HTMLDivElement>(null);
  const DragControls = useDragControls();
  const [currentDir, setCurrentDir] = useState("~");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);

  //command history
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);


  type Line = {
    type: "command" | "output";
    text: string;
    dir?: string;
  };

  const [history, setHistory] = useState<Line[]>([]);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    inputRef.current?.focus();
  }, [history]);

  //History helper
  const addHistory = (cmd: string, outputs: string[] = []) => {
    setHistory(prev => [
      ...prev,
      { type: "command", text: cmd, dir: currentDir },
      ...outputs.map(text => ({ type: "output" as const, text }))
    ]);
  };

  const getCurrentDir = (): Folder => {
  if (currentDir === "~") return fileSystem["~"];

  const root = fileSystem["~"];
  const next = root.children[currentDir];

  if (next && next.type === "folder") {
    return next;
  }

  return root;
};

  {/* Deciding what to do with the input of the user */}
  const runCommand = (cmd: string) => {
    const parts = cmd.split(" ");
    const base = parts[0];
    const arg = parts[1];

    switch (base) {
      case "help":
        addHistory(cmd, [
          "Available commands:",
          "ls, cd <folder>, cat <file>, clear / cls"
        ]);
        break;

      case "clear":
      case "cls":
        setHistory([]);
        break;

      case "ls": {
        const dir = getCurrentDir();

        const output = Object.entries(dir.children).map(([name, item]) =>
          item.type === "folder" ? `${name}/` : name
        );

        addHistory(cmd, output);
        break;
      }

      case "open":
        if (!arg) {
          addHistory(cmd, ["open requires a window name"]);
          break;
        }

        const validWindows = ["about", "projects", "music", "terminal"];

        if (!validWindows.includes(arg)) {
          addHistory(cmd, [`Window '${arg}' not found`]);
          break;
        }

        addHistory(cmd, [`Opening ${arg} window...`]);

        setTimeout(() => {openWindow(arg);}, 500)

        break;

      case "cd": {
        if (!arg) {
          addHistory(cmd, ["cd requires a folder name"]);
          break;
        }

        if (arg === "..") {
          setCurrentDir("~");
          addHistory(cmd);
          break;
        }
        

        const dir = getCurrentDir();
        const next = dir.children[arg];

        if (next && next.type === "folder") {
          setCurrentDir(arg);
          addHistory(cmd);
        } else {
          addHistory(cmd, [`Folder '${arg}' not found`]);
        }

        break;
      }
        

      case "cat": {
        if (!arg) {
          addHistory(cmd, ["cat requires a file name"]);
          break;
        }

        const dir = getCurrentDir();
        const item = dir.children[arg];

        if (!item) {
          addHistory(cmd, [`File '${arg}' not found`]);
          break;
        }

        if (item.type === "file") {
          addHistory(cmd, item.content);
          break;
        }

        addHistory(cmd, [`'${arg}' is a folder`]);
        break;
      }

      default:
        setHistory(prev => [
          ...prev,
          { type: "command", text: cmd, dir: currentDir },
          { type: "output", text: `Command '${cmd}' not found` }
        ]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();

      const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(newIndex);

      if (inputRef.current) {
        inputRef.current.innerText =
          commandHistory[commandHistory.length - 1 - newIndex] || "";
      }
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();

      const newIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(newIndex);

      if (inputRef.current) {
        inputRef.current.innerText =
          newIndex === -1 ? "" : commandHistory[commandHistory.length - 1 - newIndex];
      }
    }

    if (e.key === "Enter") {
      e.preventDefault();

      const cmd = inputRef.current?.innerText.trim() || "";
      if (!cmd.trim()) return;

      runCommand(cmd)

      setCommandHistory(prev => [...prev, cmd]);
      setHistoryIndex(-1);

      if (inputRef.current) {
        inputRef.current.innerText = "";
      }
    }
  };

  return (
    <div ref={containerRef} style={{zIndex}} className="fixed inset-0 pointer-events-none">
      <motion.div
        onMouseDown={(e) => {
          e.stopPropagation();
          bringToFront();
        }}
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
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-950 p-1 rounded-lg pointer-events-auto"
      >
        <div className="bg-gray-950 w-130 h-95 outline-2 outline-gray-500 rounded-sm flex flex-col">

          {/* Top Bar */}
          <div
            onPointerDown={(e) => {
              bringToFront();
              DragControls.start(e)}}
            className="bg-white/10 w-full h-4 relative rounded-t-sm cursor-grab active:cursor-grabbing"
          >
            <div className="absolute left-0 flex">
              <button
                aria-label="Close window"
                className="bg-blue-900 w-5 h-2 hover:h-4 transition-all duration-200 cursor-pointer rounded-tl-sm" onClick={() => {playClick(); onClose();}}></button>
              <button className="bg-blue-700 w-5 h-2 hover:h-4 transition-all duration-200"></button>
              <button className="bg-gray-600 w-5 h-2 hover:h-4 transition-all duration-200"></button>
            </div>
            <h1 className="absolute left-1/2 text-xs -translate-x-1/2 text-white/60">
              {'>'} Terminal_
            </h1>
          </div>

          {/* Terminal Body */}
          <div onClick={() => inputRef.current?.focus()} className="flex flex-col flex-1 bg-gray-950 font-mono text-xs p-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent scroll-smooth">
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
                <span>----------------------------------------------------------------------</span>
              </div>
            </div>

            {/* Command History */}
            {history.map((line, i) => {
              if (line.type === "command") {
                return (
                  <div key={i}>
                    <span>pablo</span><span className="text-blue-700">@term.portfolio</span><span>:{line.dir}$ </span>
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
              <span>pablo</span><span className="text-blue-700">@term.portfolio</span><span>:{currentDir}$</span>
              <div
                ref={inputRef}
                contentEditable
                suppressContentEditableWarning
                onKeyDown={handleKeyDown}
                className="outline-none flex-1 text-green-300"
              /> 
            </div>
            <div ref={bottomRef}></div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}