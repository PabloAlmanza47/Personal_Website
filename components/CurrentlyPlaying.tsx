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
  const [color, setColor] = useState("rgb(34,197,94)"); // default green

  const displaySong = song?.item || lastSong;
  const currentSongId = useRef<string | null>(null);

  // fetch song data every 4 seconds
  useEffect(() => {
    const fac = new FastAverageColor();

    const fetchSong = async () => {
      try {
        const res = await fetch("/spotify/currently-playing");
        const data: Song = await res.json();
        if (!data.item) return;

        const songId = `${data.item.name}-${data.item.artists.map(a => a.name).join(",")}`;

        // reset progress if song changed
        if (songId !== currentSongId.current) {
          setProgress(data.progress_ms ?? 0);
          currentSongId.current = songId;
        }

        setSong(data);
        setLastSong(data.item);

        // extract album color
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = data.item.album.images[0].url;
        img.onload = async () => {
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
    const interval = setInterval(fetchSong, 4000);
    return () => clearInterval(interval);
  }, []);

  // smooth progress increment independent of fetch
  useEffect(() => {
    const tickInterval = 50; // ms
    const incrementMs = 60;   // how fast it counts up

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

  // Only show box shadow if song is playing
  const shadowStyle = song?.playing
    ? `0 0 15px ${color}`
    : "none";

  const barShadow = song?.playing
    ? `0 0 10px ${color}`
    : "none";

  return (
    <div
      className="flex flex-col flex-1 h-full justify-between font-mono text-white transition-all duration-500"
      style={{
        color,
        background: `linear-gradient(to bottom, ${color}20, transparent)`,
      }}
    >
      <div className="flex gap-3 items-center">
        {/* Album Art */}
        <img
          src={displaySong.album.images[0].url}
          alt={displaySong.name}
          className="w-20 h-20 rounded-md transition-all duration-500"
          style={{ boxShadow: shadowStyle }}
        />

        {/* Song Info */}
        <div className="flex flex-col flex-1">
          <h3 className="text-xs text-gray-400">
            {song?.playing ? "Now Playing" : "Last Played"}
          </h3>

          <p className="text-sm font-semibold truncate text-white">
            {displaySong.name}
          </p>

          <p className="text-xs text-gray-400 truncate">
            {artistNames}
          </p>

          {/* Equalizer + Time */}
          <div className="flex items-center justify-between mt-2">
            <div className="drop-shadow-[0_0_6px]" style={{ color }}>
              <Equalizer isPlaying={song?.playing ?? false} />
            </div>

            <span className="text-[10px] text-gray-400">
              {formatTime(safeProgress)} / {formatTime(duration)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full h-1 bg-gray-700 rounded mt-1 overflow-hidden">
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