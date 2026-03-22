// app/spotify/currently-playing/route.ts
import { NextResponse } from "next/server";

let cachedLastSong: any = null;  // remembers the last fetched track
let lastFetchTime = 0;

async function getAccessToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          process.env.SPOTIFY_CLIENT_ID +
            ":" +
            process.env.SPOTIFY_CLIENT_SECRET
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  return res.json();
}

export async function GET() {
  const now = Date.now();

  try {
    const tokenData = await getAccessToken();
    const accessToken = tokenData.access_token;
    if (!accessToken)
      return NextResponse.json({ playing: false, item: cachedLastSong });

    // Avoid calling Spotify too frequently
    if (now - lastFetchTime < 5000 && cachedLastSong)
      return NextResponse.json(cachedLastSong);

    lastFetchTime = now;

    // 1️⃣ Try currently playing
    const currentRes = await fetch(
      "https://api.spotify.com/v1/me/player/currently-playing",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (currentRes.status === 200) {
      const currentData = await currentRes.json();
      if (currentData?.item) {
        const songData = {
          playing: currentData.is_playing,
          item: currentData.item,
          progress_ms: currentData.progress_ms ?? 0,
        };
        cachedLastSong = songData.item; // cache last song
        return NextResponse.json(songData);
      }
    }

    // 2️⃣ Fallback to recently played (if no current song)
    const recentRes = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (recentRes.ok) {
      const recentData = await recentRes.json();
      if (recentData?.items?.length > 0) {
        const lastTrack = recentData.items[0].track;
        cachedLastSong = lastTrack; // update cache
        return NextResponse.json({ playing: false, item: lastTrack, progress_ms: 0 });
      }
    }

    // 3️⃣ If nothing, return cached last song if exists
    if (cachedLastSong) {
      return NextResponse.json({ playing: false, item: cachedLastSong, progress_ms: 0 });
    }

    return NextResponse.json({ playing: false, item: null, progress_ms: 0 });

  } catch (err) {
    console.error("SPOTIFY ROUTE ERROR:", err);
    // fallback to cached last song
    return NextResponse.json({ playing: false, item: cachedLastSong, progress_ms: 0 });
  }
}