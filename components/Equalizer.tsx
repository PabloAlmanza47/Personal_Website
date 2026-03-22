"use client";

export default function Equalizer({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="flex items-end gap-0.5 h-6">
      <span className={`bar ${isPlaying ? "animate-bar1" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar2" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar3" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar2" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar2" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar1" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar2" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar3" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar2" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar2" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar1" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar2" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar3" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar2" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar2" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar1" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar2" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar3" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar2" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar3" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar1" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar2" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar1" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar3" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar2" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar1" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar2" : ""}`} />
      <span className={`bar ${isPlaying ? "animate-bar3" : ""}`} />
    </div>
  );
}