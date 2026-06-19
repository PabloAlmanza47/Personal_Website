'use client'

import CurrentlyPlaying from "./CurrentlyPlaying";
import WindowFrame from "./WindowFrame";

interface MusicWindowProps {
  onClose: () => void;
  zIndex: number;
  bringToFront: () => void;
}

export default function MusicWindow({ onClose, zIndex, bringToFront }: MusicWindowProps) {
  return (
    <WindowFrame
      title="Music"
      zIndex={zIndex}
      bringToFront={bringToFront}
      onClose={onClose}
      contentClassName="sm:h-97"
      initialOffset={{ x: 15, y: 30 }}
    >
      <div className="flex flex-col flex-1 min-h-0 gap-2 px-3 sm:px-2 py-2 sm:py-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
        <div className="text-xs font-mono text-gray-300 shrink-0">
          <span>pablo</span><span className="text-blue-700">@term.portfolio</span><span>:music/info$ </span>
        </div>
        <div className="flex-1 min-h-0">
          <CurrentlyPlaying />
        </div>
      </div>
    </WindowFrame>
  );
}
