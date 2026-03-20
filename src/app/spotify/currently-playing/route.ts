// app/spotify/currently-playing/route.ts
import { NextResponse } from "next/server";

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
  try {
    const tokenData = await getAccessToken();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return NextResponse.json(
        { error: "Failed to get access token" },
        { status: 500 }
      );
    }

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
        return NextResponse.json({
          playing: true,
          item: currentData.item,
        });
      }
    }

    // 2️⃣ Fallback: last played song
    const recentRes = await fetch(
      "https://api.spotify.com/v1/me/player/recently-played?limit=1",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    // Check if the request succeeded
    if (!recentRes.ok) {
      const errorText = await recentRes.text();
      console.log("RECENTLY PLAYED ERROR:", errorText);
      return NextResponse.json({ playing: false, item: null });
    }

    const recentData = await recentRes.json();

    // Ensure items exist
    if (recentData?.items && recentData.items.length > 0) {
      return NextResponse.json({
        playing: false,
        item: recentData.items[0].track,
      });
    }

    // Nothing available
    return NextResponse.json({ playing: false, item: null });
  } catch (err) {
    return NextResponse.json(
      { error: (err as Error).message },
      { status: 500 }
    );
  }
}