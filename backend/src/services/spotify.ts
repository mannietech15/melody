import fetch from "node-fetch";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;

let cachedToken: { token: string; expiresAt: number } | null = null;

/**
 * Client Credentials flow — good for search/catalog reads.
 * (No user login to Spotify required; this is how we power search
 * without asking the end-user to have their own Spotify account.)
 */
async function getAppToken(): Promise<string> {
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token;
  }

  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(`${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`).toString("base64"),
    },
    body: "grant_type=client_credentials",
  });

  if (!res.ok) {
    throw new Error(`Spotify auth failed: ${res.status} ${await res.text()}`);
  }

  const data = (await res.json()) as { access_token: string; expires_in: number };
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 60) * 1000,
  };
  return cachedToken.token;
}

export interface SpotifyTrackDTO {
  id: string;
  name: string;
  artistName: string;
  albumName: string;
  imageUrl: string | null;
  previewUrl: string | null;
  durationMs: number;
}

function mapTrack(t: any): SpotifyTrackDTO {
  return {
    id: t.id,
    name: t.name,
    artistName: t.artists?.map((a: any) => a.name).join(", ") ?? "Unknown",
    albumName: t.album?.name ?? "",
    imageUrl: t.album?.images?.[0]?.url ?? null,
    previewUrl: t.preview_url ?? null,
    durationMs: t.duration_ms ?? 0,
  };
}

export async function searchTracks(query: string, limit = 20): Promise<SpotifyTrackDTO[]> {
  const token = await getAppToken();
  const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(
    query
  )}&type=track&limit=${limit}`;

  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
  if (!res.ok) {
    throw new Error(`Spotify search failed: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as any;
  return (data.tracks?.items ?? []).map(mapTrack);
}

export async function getTrackById(id: string): Promise<SpotifyTrackDTO> {
  const token = await getAppToken();
  const res = await fetch(`https://api.spotify.com/v1/tracks/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    throw new Error(`Spotify track lookup failed: ${res.status} ${await res.text()}`);
  }
  return mapTrack(await res.json());
}

export async function getFeaturedTracks(limit = 20): Promise<SpotifyTrackDTO[]> {
  // "New Releases" is reliably available on client-credentials tokens,
  // unlike editorial featured-playlist endpoints. Used to power the Home screen.
  const token = await getAppToken();
  const res = await fetch(
    `https://api.spotify.com/v1/browse/new-releases?limit=${limit}`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  if (!res.ok) {
    throw new Error(`Spotify new releases failed: ${res.status} ${await res.text()}`);
  }
  const data = (await res.json()) as any;
  const albums = data.albums?.items ?? [];

  // Pull the first track from each new-release album so Home has playable previews.
  const tracks: SpotifyTrackDTO[] = [];
  for (const album of albums.slice(0, limit)) {
    const t = await getFirstTrackOfAlbum(album.id, token);
    if (t) tracks.push(t);
  }
  return tracks;
}

async function getFirstTrackOfAlbum(albumId: string, token: string): Promise<SpotifyTrackDTO | null> {
  const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}/tracks?limit=1`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) return null;
  const data = (await res.json()) as any;
  const item = data.items?.[0];
  if (!item) return null;
  // Album-tracks endpoint omits album art; fetch the full track for that.
  return getTrackById(item.id).catch(() => null);
}
