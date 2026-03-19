// app/spotify/currently-playing/route.ts
export async function GET() {
  const accessToken = process.env.SPOTIFY_ACCESS_TOKEN;

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  if (response.status === 204)
    return new Response(JSON.stringify({ playing: false }));

  const data = await response.json();
  return new Response(JSON.stringify(data), { status: 200 });
}