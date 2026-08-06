import { GraphQLContext } from "../../context";
import { searchTracks, getFeaturedTracks, SpotifyTrackDTO } from "../../services/spotify";

// Cache Spotify tracks locally so playlists/likes can reference a stable Track row.
export async function upsertTrack(ctx: GraphQLContext, t: SpotifyTrackDTO) {
  return ctx.prisma.track.upsert({
    where: { id: t.id },
    update: {
      name: t.name,
      artistName: t.artistName,
      albumName: t.albumName,
      imageUrl: t.imageUrl,
      previewUrl: t.previewUrl,
      durationMs: t.durationMs,
    },
    create: {
      id: t.id,
      name: t.name,
      artistName: t.artistName,
      albumName: t.albumName,
      imageUrl: t.imageUrl,
      previewUrl: t.previewUrl,
      durationMs: t.durationMs,
    },
  });
}

export const searchResolvers = {
  Query: {
    search: async (_: unknown, args: { query: string }, ctx: GraphQLContext) => {
      if (!args.query.trim()) return [];
      const results = await searchTracks(args.query);
      // Cache in background-ish (awaited here for simplicity/consistency)
      await Promise.all(results.map((t) => upsertTrack(ctx, t)));
      return results;
    },

    featured: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
      const results = await getFeaturedTracks();
      await Promise.all(results.map((t) => upsertTrack(ctx, t)));
      return results;
    },
  },

  Track: {
    isLiked: async (parent: { id: string }, _: unknown, ctx: GraphQLContext) => {
      if (!ctx.userId) return false;
      const like = await ctx.prisma.likedSong.findUnique({
        where: { userId_trackId: { userId: ctx.userId, trackId: parent.id } },
      });
      return !!like;
    },
  },
};
