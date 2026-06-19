"use client";

import { useEffect, useState, useRef } from "react";
import Equalizer from "./Equalizer";
import { FastAverageColor } from "fast-average-color";

interface Artist { name: string; }
interface AlbumImage { url: string; }
interface Album { images: AlbumImage[]; }
interface Item { name: string; artists: Artist[]; album: Album; duration_ms?: number; }
interface Song { playing: boolean; item: Item | null; progress_ms?: number; }

export default function CurrentlyPlaying() {
  const [song, setSong] = useState<Song | null>(null);
  const [lastSong, setLastSong] = useState<Item | null>(null);
  const [progress, setProgress] = useState(0);
  const [color, setColor] = useState("rgb(34,197,94)");

  const displaySong = song?.item || lastSong;
  const currentSongId = useRef<string | null>(null);

  useEffect(() => {
    const fac = new FastAverageColor();
    let isMounted = true;

    const fetchSong = async () => {
      try {
        if (document.hidden) return;

        const res = await fetch("/spotify/currently-playing");
        const data: Song = await res.json();

        if (!data.item || !isMounted) return;

        const songId = `${data.item.name}-${data.item.artists.map(a => a.name).join(",")}`;

        if (songId !== currentSongId.current) {
          setProgress(data.progress_ms ?? 0);
          currentSongId.current = songId;
        }

        setSong(data);
        setLastSong(data.item);

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = data.item.album.images[0].url;

        img.onload = async () => {
          if (!isMounted) return;
          try {
            const result = await fac.getColorAsync(img);
            setColor(result.rgb);
          } catch (err) {
            console.error("Color extraction failed", err);
          }
        };
      } catch (err) {
        console.error(err);
      }
    };

    fetchSong();
    const interval = setInterval(fetchSong, 15_000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const tickInterval = 50;
    const incrementMs = 60;

    const interval = setInterval(() => {
      setProgress((prev) => {
        const duration = displaySong?.duration_ms ?? 1;
        if (!song?.playing) return prev;
        return Math.min(prev + incrementMs, duration);
      });
    }, tickInterval);

    return () => clearInterval(interval);
  }, [displaySong, song?.playing]);

  if (!displaySong) {
    return (
      <div className="text-gray-500 text-sm font-mono">
        No songs have been played yet...
      </div>
    );
  }

  const artistNames = displaySong.artists.map(a => a.name).join(", ");
  const duration = displaySong.duration_ms ?? 1;
  const safeProgress = Math.min(progress, duration);
  const percent = (safeProgress / duration) * 100;

  const formatTime = (ms: number) => {
    const min = Math.floor(ms / 60000);
    const sec = Math.floor((ms % 60000) / 1000).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  const shadowStyle = song?.playing ? `0 0 15px ${color}` : "none";
  const barShadow = song?.playing ? `0 0 10px ${color}` : "none";

  return (
    <div
      className="flex flex-col h-full justify-between font-mono text-white transition-all duration-500 rounded-sm p-3 sm:p-0"
      style={{
        color,
        background: `linear-gradient(to bottom, ${color}20, transparent)`,
      }}
    >
      <div className="flex flex-col sm:flex-row gap-3 items-center sm:items-center text-center sm:text-left">
        <img
          src={displaySong.album.images[0].url}
          alt={displaySong.name}
          className="w-32 h-32 sm:w-20 sm:h-20 rounded-md transition-all duration-500 object-cover"
          style={{ boxShadow: shadowStyle }}
        />

        <div className="flex flex-col flex-1 min-w-0 w-full">
          <h3 className="text-xs text-gray-400">
            {song?.playing ? "Now Playing" : "Last Played"}
          </h3>

          <p className="text-base sm:text-sm font-semibold truncate text-white">
            {displaySong.name}
          </p>

          <p className="text-xs text-gray-400 truncate">
            {artistNames}
          </p>

          <div className="flex items-center justify-between mt-3 sm:mt-2 gap-3">
            <div className="drop-shadow-[0_0_6px]" style={{ color }}>
              <Equalizer isPlaying={song?.playing ?? false} />
            </div>

            <span className="text-[10px] text-gray-400 whitespace-nowrap">
              {formatTime(safeProgress)} / {formatTime(duration)}
            </span>
          </div>

          <div className="w-full h-1 bg-gray-700 rounded mt-2 sm:mt-1 overflow-hidden">
            <div
              className="h-full transition-all duration-100 rounded"
              style={{
                width: `${percent}%`,
                backgroundColor: color,
                boxShadow: barShadow,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
