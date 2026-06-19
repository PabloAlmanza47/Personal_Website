'use client'

import { ShootingStarIcon } from "@phosphor-icons/react";
import WindowFrame from "./WindowFrame";

interface EmailSentWindowProps {
  onClose: () => void;
  zIndex: number;
  bringToFront: () => void;
}

export default function EmailSentWindow({ onClose, zIndex, bringToFront }: EmailSentWindowProps) {
  return (
    <WindowFrame
      title="success!"
      zIndex={zIndex}
      bringToFront={bringToFront}
      onClose={onClose}
      className="sm:w-48 sm:h-32"
      sizeClassName="sm:w-full sm:h-full"
      initialOffset={{ x: 0, y: 0 }}
    >
      <div className="flex flex-col px-4 py-4 flex-1 items-center justify-center gap-3 text-center">
        <div className="text-blue-400">
          <ShootingStarIcon size={36} />
        </div>
        <p className="text-xs font-mono text-white/60">Your message has been sent!</p>
      </div>
    </WindowFrame>
  );
}
