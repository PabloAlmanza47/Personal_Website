'use client'

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import useSound from "use-sound";
import welcomeAscii from "../ascii/welcomeAscii";
import { openableWindowNames } from "../data/windows";
import FuzzyFinder from "./FuzzyFinder";
import WindowFrame from "./WindowFrame";

type TerminalProps = {
  openWindow: (name: string) => void;
  onClose: () => void;
  zIndex: number;
  bringToFront: () => void;
};

type FileNode = {
  type: "file";
  content: string[];
};

type FolderNode = {
  type: "folder";
  children: Record<string, FileNode | FolderNode>;
};

type HistoryLine = {
  type: "command" | "output";
  text: string;
  dir?: string;
};

const fileSystem: FolderNode = {
  type: "folder",
  children: {
    information: {
      type: "folder",
      children: {
        about: {
          type: "file",
          content: [
            "Name: Pablo Almanza",
            "Role: Software Engineer",
            "School: Texas A&M University",
            "Graduation: May 2028",
          ],
        },
        experience: {
          type: "file",
          content: [
            "PowerDB — Part-Time Software Engineer",
            "Frogslayer — Incoming Junior Software Developer",
            "Texas A&M SHPE — Website Development Lead",
          ],
        },
        projects: {
          type: "file",
          content: [
            "SHPE Connect",
            "Texas A&M SHPE Website",
            "Terminal Portfolio",
            "Tree Chop Mania",
          ],
        },
      },
    },
    skills: {
      type: "file",
      content: [
        "C# / .NET",
        "Angular / TypeScript",
        "React / Next.js",
        "PostgreSQL / SQL Server",
      ],
    },
  },
};

export default function Terminal({
  openWindow,
  onClose,
  zIndex,
  bringToFront,
}: TerminalProps) {
  const [playClick] = useSound("/sounds/click.mp3", { volume: 0.5 });
  const inputRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [currentDir, setCurrentDir] = useState("~");
  const [showFuzzyFinder, setShowFuzzyFinder] = useState(false);
  const [history, setHistory] = useState<HistoryLine[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key.toLowerCase() === "f") {
        event.preventDefault();
        setShowFuzzyFinder((visible) => !visible);
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    if (!showFuzzyFinder) inputRef.current?.focus();
  }, [history, showFuzzyFinder]);

  const getCurrentFolder = (): FolderNode => {
    if (currentDir === "~") return fileSystem;
    const node = fileSystem.children[currentDir];
    return node?.type === "folder" ? node : fileSystem;
  };

  const addHistory = (command: string, output: string[] = []) => {
    setHistory((previous) => [
      ...previous,
      { type: "command", text: command, dir: currentDir },
      ...output.map((text) => ({ type: "output" as const, text })),
    ]);
  };

  const runCommand = (command: string) => {
    const [base = "", argument] = command.trim().split(/\s+/);
    const normalizedBase = base.toLowerCase();
    const normalizedArgument = argument?.toLowerCase();

    switch (normalizedBase) {
      case "help":
        addHistory(command, [
          "Available commands:",
          "  open <window>  overview, about, projects, experience, music",
          "  ls / cd / cat  browse the portfolio file system",
          "  whoami         quick profile summary",
          "  resume        open the current resume",
          "  contact       open the contact panel",
          "  clear / cls   clear terminal history",
          "",
          "Tip: press shift+f for fuzzy navigation.",
        ]);
        break;

      case "whoami":
        addHistory(command, [
          "Pablo Almanza",
          "Software engineer and Texas A&M computer science student",
          "Current: PowerDB | Incoming: Frogslayer",
        ]);
        break;

      case "resume":
        addHistory(command, ["Opening resume..."]);
        window.open("/resume.pdf", "_blank", "noopener,noreferrer");
        break;

      case "contact":
        addHistory(command, ["Opening contact window..."]);
        openWindow("about");
        break;

      case "clear":
      case "cls":
        setHistory([]);
        break;

      case "ls": {
        const folder = getCurrentFolder();
        addHistory(
          command,
          Object.entries(folder.children).map(([name, node]) =>
            node.type === "folder" ? `${name}/` : name,
          ),
        );
        break;
      }

      case "open":
        if (!normalizedArgument) {
          addHistory(command, ["open requires a window name"]);
          break;
        }

        if (!openableWindowNames.includes(normalizedArgument as (typeof openableWindowNames)[number])) {
          addHistory(command, [`Window '${normalizedArgument}' not found`]);
          break;
        }

        addHistory(command, [`Opening ${normalizedArgument}...`]);
        openWindow(normalizedArgument);
        break;

      case "cd": {
        if (!normalizedArgument) {
          addHistory(command, ["cd requires a folder name"]);
          break;
        }

        if (normalizedArgument === ".." || normalizedArgument === "~") {
          setCurrentDir("~");
          addHistory(command);
          break;
        }

        const next = getCurrentFolder().children[normalizedArgument];
        if (next?.type === "folder") {
          setCurrentDir(normalizedArgument);
          addHistory(command);
        } else {
          addHistory(command, [`Folder '${normalizedArgument}' not found`]);
        }
        break;
      }

      case "cat": {
        if (!normalizedArgument) {
          addHistory(command, ["cat requires a file name"]);
          break;
        }

        const node = getCurrentFolder().children[normalizedArgument];
        if (!node) {
          addHistory(command, [`File '${normalizedArgument}' not found`]);
        } else if (node.type === "file") {
          addHistory(command, node.content);
        } else {
          addHistory(command, [`'${normalizedArgument}' is a folder`]);
        }
        break;
      }

      default:
        addHistory(command, [`Command '${command}' not found. Type help.`]);
    }
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      const nextIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
      setHistoryIndex(nextIndex);
      if (inputRef.current) {
        inputRef.current.innerText = commandHistory[commandHistory.length - 1 - nextIndex] || "";
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      const nextIndex = Math.max(historyIndex - 1, -1);
      setHistoryIndex(nextIndex);
      if (inputRef.current) {
        inputRef.current.innerText =
          nextIndex === -1 ? "" : commandHistory[commandHistory.length - 1 - nextIndex];
      }
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();
      const command = inputRef.current?.innerText.trim() || "";
      if (!command) return;

      runCommand(command);
      setCommandHistory((previous) => [...previous, command]);
      setHistoryIndex(-1);
      if (inputRef.current) inputRef.current.innerText = "";
    }
  };

  return (
    <WindowFrame
      title="Terminal"
      zIndex={zIndex}
      bringToFront={bringToFront}
      onClose={() => {
        playClick();
        onClose();
      }}
      sizeClassName={showFuzzyFinder ? "sm:w-[56rem] sm:h-[33rem]" : "sm:w-[42rem] sm:h-[31rem]"}
      initialOffset={{ x: -8, y: 8 }}
    >
      <div className={`flex flex-1 min-h-0 flex-col ${showFuzzyFinder ? "sm:grid sm:grid-cols-[1fr_18rem]" : ""}`}>
        <section
          onClick={() => inputRef.current?.focus()}
          className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-slate-950 p-3 font-mono text-xs scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent"
        >
          <pre
            className="hidden select-none whitespace-pre text-slate-200 sm:block"
            style={{
              fontFamily: "Cascadia Code, Consolas, monospace",
              fontVariantLigatures: "none",
              fontSize: "10px",
              lineHeight: "1",
            }}
          >
            {welcomeAscii}
          </pre>

          <div className="mb-3 mt-1 text-[11px] leading-5 text-slate-400">
            <p>
              Type <span className="text-blue-300">help</span> for commands or press{" "}
              <span className="text-blue-300">shift+f</span> to search.
            </p>
            <p className="sm:hidden">Try: open overview, whoami, open projects</p>
            <p className="text-white/15">----------------------------------------------------------------------</p>
          </div>

          {history.map((line, index) =>
            line.type === "command" ? (
              <div key={`${line.text}-${index}`} className="break-words leading-5">
                <span className="text-slate-300">pablo</span>
                <span className="text-blue-400">@portfolio</span>
                <span className="text-slate-400">:{line.dir}$ </span>
                <span className="text-slate-600">{line.text}</span>
              </div>
            ) : (
              <div key={`${line.text}-${index}`} className="break-words leading-5 text-cyan-300/70">
                {line.text || "\u00a0"}
              </div>
            ),
          )}

          <div className="flex min-w-0 leading-5">
            <span className="shrink-0 text-slate-300">pablo</span>
            <span className="shrink-0 text-blue-400">@portfolio</span>
            <span className="shrink-0 text-slate-400">:{currentDir}$</span>
            <div
              ref={inputRef}
              contentEditable
              role="textbox"
              aria-label="Terminal command"
              suppressContentEditableWarning
              onKeyDown={handleInputKeyDown}
              className="min-w-0 flex-1 break-all pl-1 text-emerald-300 outline-none"
            />
          </div>
          <div ref={bottomRef} />
        </section>

        <AnimatePresence>
          {showFuzzyFinder && (
            <motion.aside
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 18 }}
              transition={{ duration: 0.18 }}
              className="border-t border-white/10 bg-black/20 p-3 sm:border-l sm:border-t-0"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-2">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-blue-300">
                  Fuzzy finder
                </p>
                <button
                  type="button"
                  onClick={() => setShowFuzzyFinder(false)}
                  className="font-mono text-[10px] text-slate-500 hover:text-white"
                >
                  close
                </button>
              </div>
              <div className="mt-3 font-mono text-xs text-white">
                <FuzzyFinder
                  openWindow={openWindow}
                  onClose={() => setShowFuzzyFinder(false)}
                />
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </WindowFrame>
  );
}
