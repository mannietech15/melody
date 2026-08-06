import { GraphQLContext, requireAuth } from "../../context";
import { getTrackById } from "../../services/spotify";
import { upsertTrack } from "./search";

async function ensureTrackCached(ctx: GraphQLContext, trackId: string) {
  const existing = await ctx.prisma.track.findUnique({ where: { id: trackId } });
  if (existing) return existing;
  const fetched = await getTrackById(trackId);
  return upsertTrack(ctx, fetched);
}

export const likedSongsResolvers = {
  Query: {
    likedSongs: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
      const userId = requireAuth(ctx);
      const rows = await ctx.prisma.likedSong.findMany({
        where: { userId },
        include: { track: true },
        orderBy: { likedAt: "desc" },
      });
      return rows.map((r: { track: unknown }) => r.track);
    },
  },

  Mutation: {
    likeSong: async (_: unknown, args: { trackId: string }, ctx: GraphQLContext) => {
      const userId = requireAuth(ctx);
      await ensureTrackCached(ctx, args.trackId);
      await ctx.prisma.likedSong.upsert({
        where: { userId_trackId: { userId, trackId: args.trackId } },
        update: {},
        create: { userId, trackId: args.trackId },
      });
      return true;
    },

    unlikeSong: async (_: unknown, args: { trackId: string }, ctx: GraphQLContext) => {
      const userId = requireAuth(ctx);
      await ctx.prisma.likedSong.deleteMany({ where: { userId, trackId: args.trackId } });
      return true;
    },
  },
};
