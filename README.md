# Melody

A full-stack Melody clone:

- **mobile/** — React Native (Expo) + TypeScript + NativeWind (Tailwind CSS for RN)
- **backend/** — Node.js + Apollo GraphQL Server + PostgreSQL (Prisma ORM)
- **docker-compose.yml** — Postgres + backend, containerized

Audio comes from the **Spotify Web API** (search + metadata + 30-second `preview_url` clips).
Full-track playback isn't possible without a commercial license from Spotify — this clone plays
the official 30s previews, same as Spotify's own web player does for logged-out users.

---

## 1. Get Spotify API credentials

1. Go to https://developer.spotify.com/dashboard
2. Create an app → copy the **Client ID** and **Client Secret**
3. You do NOT need a redirect URI for this (we use Client Credentials flow for search)

## 2. Backend setup

```bash
cd backend
cp .env.example .env
# edit .env: paste your SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET, set a JWT_SECRET
```

### Run with Docker (recommended)

```bash
docker compose up --build
```

This starts:
- `postgres` on `localhost:5432`
- `backend` (GraphQL API) on `http://localhost:4000/graphql`

First time only, run migrations:
```bash
docker compose exec backend npx prisma migrate deploy
```

### Run locally without Docker

```bash
cd backend
npm install
npx prisma migrate dev --name init
npm run dev
```

## 3. Mobile app setup

```bash
cd mobile
npm install
```

Edit `src/apollo/client.ts` and point `API_URL` at your backend:
- iOS simulator: `http://localhost:4000/graphql`
- Android emulator: `http://10.0.2.2:4000/graphql`
- Physical device: `http://<your-computer-LAN-IP>:4000/graphql`

Start the app:
```bash
npx expo start
```
Scan the QR code with Expo Go (iOS/Android), or press `i` / `a` for a simulator.

## 4. Running in a browser (web)

This app is built with Expo, which supports React Native, iOS, Android, **and web** from the same
codebase via `react-native-web`. No separate app needed.

Test locally first:
```bash
cd mobile
npm install
npx expo start --web
```
This opens it at `http://localhost:8081` (or similar) in your default browser.

## 5. Deploying so other people can open it in their browser

Two things need to go live: the **backend** (needs a public HTTPS URL) and the **web build** of the
mobile app (a static site).

### Deploy the backend

Any Node-friendly host with a Postgres add-on works. Easiest options: **Railway** or **Render**.

Railway (quickest):
1. https://railway.app → New Project → Deploy from GitHub repo (push this folder to a repo first)
2. Add a **PostgreSQL** plugin to the project — Railway sets `DATABASE_URL` automatically
3. Set service root directory to `backend/`
4. Add env vars: `JWT_SECRET`, `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`
5. Set the start command to `npx prisma migrate deploy && npm run build && npm start`
6. Deploy — you'll get a URL like `https://your-app.up.railway.app`

Render is similar (Web Service + a Postgres instance, same env vars, same start command).

### Deploy the web frontend

```bash
cd mobile
# point API_URL at your deployed backend's HTTPS URL first (see below)
npx expo export --platform web
```
This outputs a static site to `mobile/dist/`. Deploy that folder to **Vercel** or **Netlify**:

Vercel:
```bash
npm i -g vercel
cd mobile
vercel --prod dist
```

Netlify: drag-and-drop the `mobile/dist` folder at https://app.netlify.com/drop, or use the Netlify CLI.

You'll get a shareable URL like `https://melody.vercel.app` — that's the link to send people.

### Wire the two together

The frontend and backend are two separate deployments — there's no special "connect Render to
Vercel" integration button, you just tell the frontend build what URL to call, via an environment
variable. This works the exact same way whether you deploy the static site to **Vercel or Netlify** —
neither has special Render integration, and neither needs one.

1. Deploy the backend to Render first, note its URL, e.g. `https://your-app.onrender.com`
2. In your frontend host's dashboard (Vercel: Project Settings → Environment Variables. Netlify:
   Site Settings → Environment Variables), add:
   ```
   EXPO_PUBLIC_API_URL = https://your-app.onrender.com/graphql
   ```
   (`mobile/src/apollo/client.ts` already reads this — Expo auto-inlines any `EXPO_PUBLIC_*` var
   into the build.)
3. Trigger a rebuild/redeploy of the frontend so the env var gets baked in. If deploying manually
   instead of via a connected git repo, set it before building:
   ```bash
   EXPO_PUBLIC_API_URL=https://your-app.onrender.com/graphql npx expo export --platform web
   ```
   then upload `mobile/dist/` as before.
4. Optional: update your Spotify Developer Dashboard app's **Website** field to your frontend URL.

CORS is already open on the backend (`cors()` with no origin restriction), so it'll accept requests
from whichever domain your frontend ends up on — Vercel, Netlify, or anywhere else.



```
spotify-clone/
├── docker-compose.yml
├── backend/
│   ├── prisma/schema.prisma       # User, Playlist, Track, LikedSong models
│   ├── src/
│   │   ├── index.ts               # Apollo Server entrypoint
│   │   ├── context.ts             # Auth context (JWT → user)
│   │   ├── services/spotify.ts    # Spotify Web API client
│   │   ├── utils/auth.ts          # password hashing + JWT helpers
│   │   └── schema/
│   │       ├── typeDefs.ts        # GraphQL schema
│   │       └── resolvers/         # auth, search, playlist, likedSongs
│   └── Dockerfile
└── mobile/
    ├── App.tsx
    ├── tailwind.config.js         # Melody-style dark theme tokens
    └── src/
        ├── apollo/client.ts       # Apollo Client + auth link
        ├── context/               # AuthContext, PlayerContext (expo-av)
        ├── graphql/                # queries & mutations
        ├── navigation/             # stack + bottom tabs
        ├── components/             # MiniPlayer, TrackRow
        └── screens/                # Login, Register, Home, Search, Playlist, LikedSongs, Player
```

## Features implemented

- ✅ Email/password auth (JWT)
- ✅ Search tracks/artists/albums via Spotify Web API
- ✅ Create/view/delete playlists, add/remove tracks
- ✅ Like/unlike songs, "Liked Songs" screen
- ✅ Bottom mini-player + full-screen player with 30s preview playback
- ✅ Melody-style dark UI (bottom tabs, red accent, rounded artwork)

## Next steps you may want

- Add Redis caching for Spotify API responses (rate limits are strict)
- Add refresh tokens / persistent login (currently JWT stored in memory via SecureStore — wire up expo-secure-store)
- Add social features (follow users, share playlists)
- Swap 30s previews for full playback once you have a licensed audio source
