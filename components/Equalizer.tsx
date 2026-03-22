"use client";

export default function Equalizer({ isPlaying }: { isPlaying: boolean }) {
  const bars = Array.from({ length: 12 }); // 👈 control amount here

  return (
    <div className="flex items-end gap-0.5 h-6">
      {bars.map((_, i) => {
        const animation = ["animate-bar1", "animate-bar2", "animate-bar3"][i % 3];

        return (
          <span
            key={i}
            className={`bar ${isPlaying ? animation : "opacity-40"}`}
          />
        );
      })}
    </div>
  );
}