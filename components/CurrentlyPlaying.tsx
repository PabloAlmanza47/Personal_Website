"use client";
import { useEffect, useState } from "react";

export default function CurrentlyPlaying() {
  const [song, setSong] = useState<any>(null);

  useEffect(() => {
    const fetchSong = async () => {
      const res = await fetch("/spotify/currently-playing");
      const data = await res.json();
      setSong(data);
    };
    fetchSong();
  }, []);

  if (!song) return <div>Loading...</div>;

  return (
    <div>
      <h3>Now Playing:</h3>
      <p>
        {song.item?.name} by{" "}
        {song.item?.artists.map((a: any) => a.name).join(", ")}
      </p>
    </div>
  );
}