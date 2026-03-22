// app/spotify/currently-playing/route.ts
import { NextResponse } from "next/server";

// cache last played track in memory
let lastPlayed: any = null;

async function getAccessToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " +
        Buffer.from(
          `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
        ).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error("Failed to get access token: " + text);
  }

  return res.json();
}

export async function GET() {
  try {
    const tokenData = await getAccessToken();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error("No access token returned from Spotify");
    }

    // check currently playing
    const currentRes = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    if (currentRes.status === 200) {
      const currentData = await currentRes.json();
      if (currentData?.item) {
        lastPlayed = currentData.item; // update cache
        return NextResponse.json({
          playing: true,
          item: currentData.item,
          progress_ms: currentData.progress_ms ?? 0,
        });
      }
    }

    // if currently-playing empty, return cached last played
    if (lastPlayed) {
      return NextResponse.json({
        playing: false,
        item: lastPlayed,
        progress_ms: lastPlayed.progress_ms ?? 0,
      });
    }

    // only fetch recently-played once if nothing cached
    const recentRes = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    if (!recentRes.ok) {
      const text = await recentRes.text();
      console.log("RECENTLY PLAYED ERROR:", text);
      return NextResponse.json({ playing: false, item: null });
    }

    const recentData = await recentRes.json();
    if (recentData?.items?.length > 0) {
      lastPlayed = recentData.items[0].track;
      return NextResponse.json({ playing: false, item: lastPlayed });
    }

    return NextResponse.json({ playing: false, item: null });

  } catch (err) {
    console.error("Spotify route error:", err);
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}