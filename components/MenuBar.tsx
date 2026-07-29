export default function MenuBar() {
  return (
    <header className="absolute inset-x-0 top-0 z-[1000] flex h-8 items-center justify-between border-b border-white/10 bg-slate-950/80 px-3 font-mono text-[10px] text-slate-500 backdrop-blur-xl sm:px-4">
      <span className="truncate">
        <span className="text-slate-300">Pablo Almanza</span>
        <span className="mx-2 text-white/20">/</span>
        Software Engineer
      </span>
      <span className="hidden items-center gap-2 sm:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.7)]" />
        PowerDB · Incoming Frogslayer
      </span>
    </header>
  );
}
