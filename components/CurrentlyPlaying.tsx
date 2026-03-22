"use client";
import { useEffect, useState } from "react";
import Equalizer from "./Equalizer";

interface Artist { name: string; }
interface AlbumImage { url: string; }
interface Album { images: AlbumImage[]; }
interface Item { name: string; artists: Artist[]; album: Album; }
interface Song { playing: boolean; item: Item | null; }

export default function CurrentlyPlaying() {
  const [song, setSong] = useState<Song | null>(null);
  const [lastSong, setLastSong] = useState<Item | null>(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const res = await fetch("/spotify/currently-playing");
        const data: Song = await res.json();
        setSong(data);

        // cache last played song
        if (data.item) {
          setLastSong(data.item);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchSong();
    const interval = setInterval(fetchSong, 4000);
    return () => clearInterval(interval);
  }, []);

  const displaySong = song?.item || lastSong;

  if (!displaySong) return <div>No songs have been played yet</div>;

  return (
    <div className="flex flex-col flex-1 h-full justify-between">
      <div className="flex items-center gap-2">
        <img
          src={displaySong.album.images[0].url}
          alt={displaySong.name}
          width={200}
          height={200}
        />
        <div className="font-mono">
          <h3>{song?.playing ? "Now Playing:" : "Last Played:"}</h3>
          <p>{displaySong.name} by {displaySong.artists.map(a => a.name).join(", ")}</p>
        </div>
      </div>
      <Equalizer isPlaying={song.playing} />
    </div>
  );
}