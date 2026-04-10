'use client'
import { useState, useEffect, useRef } from "react";

const files = [
  { name: "about",      window: "about",      path: "/information/about" },
  { name: "projects",   window: "projects",   path: "/information/projects" },
  { name: "experience", window: "experience", path: "/information/experience" },
  { name: "blog",       window: "blog",       path: "/information/blog" },
  { name: "music",      window: "music",      path: "/music" },
  { name: "tetris",     window: "tetris",     path: "/tetris" },
];

function fuzzy(str: string, pattern: string): number[] | null {
  const s = str.toLowerCase(), p = pattern.toLowerCase();
  let si = 0, pi = 0;
  const indices: number[] = [];
  while (si < s.length && pi < p.length) {
    if (s[si] === p[pi]) { indices.push(si); pi++; }
    si++;
  }
  return pi === p.length ? indices : null;
}

function highlight(name: string, indices: number[]) {
  return name.split("").map((c, i) =>
    indices.includes(i)
      ? <span key={i} className="text-blue-700">{c}</span>
      : <span key={i} className="text-gray-500">{c}</span>
  );
}

type Props = {
  openWindow: (name: string) => void;
  onClose: () => void;
};

export default function FuzzyFinder({ openWindow, onClose }: Props) {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const matches = query
    ? files.flatMap(f => { const idx = fuzzy(f.name, query); return idx ? [{ ...f, idx }] : []; })
    : files.map(f => ({ ...f, idx: [] as number[] }));

  useEffect(() => { setFocused(0); }, [query]);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (document.activeElement !== inputRef.current) return;

      if (e.key === "ArrowDown") { e.preventDefault(); setFocused(f => Math.min(f + 1, matches.length - 1)); }
      if (e.key === "ArrowUp")   { e.preventDefault(); setFocused(f => Math.max(f - 1, 0)); }
      if (e.key === "Enter" && matches[focused]) openWindow(matches[focused].window);
      if (e.key === "Escape") { e.preventDefault(); onClose(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [matches, focused, openWindow, onClose]);

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex items-center gap-1 border-b border-gray-800 pb-1">
        <span className="text-blue-700">{">"}</span>
        <input
          ref={inputRef}
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="search..."
          className="bg-transparent outline-none text-green-300 font-mono text-xs w-full placeholder-gray-700 caret-green-300"
        />
      </div>

      <div className="flex flex-col">
        {matches.length === 0
          ? <span className="text-gray-700 text-xs">no results</span>
          : matches.map((file, i) => (
            <div key={file.name} onClick={() => openWindow(file.window)}
              className={`flex items-center gap-2 py-0.5 cursor-pointer ${i === focused ? "bg-white/5" : ""}`}>
              <div className={`w-0 h-0 border-t-4 border-b-4 border-l-[6px]
                border-t-transparent border-b-transparent shrink-0 transition-colors
                ${i === focused ? "border-l-blue-700" : "border-l-transparent"}`} />
              <span className="text-xs font-mono">{highlight(file.name, file.idx)}</span>
              <span className="text-gray-700 text-[10px] ml-auto">{file.path}</span>
            </div>
          ))
        }
      </div>

      <div className="flex gap-3 border-t border-gray-800 pt-1 mt-auto">
        {[["↑↓", "move"], ["↵", "open"], ["esc or shift+f", "close"]].map(([key, label]) => (
          <span key={key} className="text-[10px] text-gray-700">
            <span className="text-gray-500">{key}</span> {label}
          </span>
        ))}
      </div>
    </div>
  );
}