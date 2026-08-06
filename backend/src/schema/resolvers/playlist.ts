import { GraphQLContext, requireAuth } from "../../context";
import { getTrackById } from "../../services/spotify";
import { upsertTrack } from "./search";

async function ensureTrackCached(ctx: GraphQLContext, trackId: string) {
  const existing = await ctx.prisma.track.findUnique({ where: { id: trackId } });
  if (existing) return existing;
  const fetched = await getTrackById(trackId);
  return upsertTrack(ctx, fetched);
}

export const playlistResolvers = {
  Query: {
    myPlaylists: async (_: unknown, __: unknown, ctx: GraphQLContext) => {
      const userId = requireAuth(ctx);
      return ctx.prisma.playlist.findMany({
        where: { ownerId: userId },
        orderBy: { createdAt: "desc" },
      });
    },

    playlist: async (_: unknown, args: { id: string }, ctx: GraphQLContext) => {
      return ctx.prisma.playlist.findUnique({ where: { id: args.id } });
    },
  },

  Mutation: {
    createPlaylist: async (
      _: unknown,
      args: { name: string; description?: string },
      ctx: GraphQLContext
    ) => {
      const userId = requireAuth(ctx);
      return ctx.prisma.playlist.create({
        data: { name: args.name, description: args.description, ownerId: userId },
      });
    },

    deletePlaylist: async (_: unknown, args: { id: string }, ctx: GraphQLContext) => {
      const userId = requireAuth(ctx);
      const playlist = await ctx.prisma.playlist.findUnique({ where: { id: args.id } });
      if (!playlist || playlist.ownerId !== userId) throw new Error("Not found");
      await ctx.prisma.playlist.delete({ where: { id: args.id } });
      return true;
    },

    addTrackToPlaylist: async (
      _: unknown,
      args: { playlistId: string; trackId: string },
      ctx: GraphQLContext
    ) => {
      const userId = requireAuth(ctx);
      const playlist = await ctx.prisma.playlist.findUnique({ where: { id: args.playlistId } });
      if (!playlist || playlist.ownerId !== userId) throw new Error("Not found");

      await ensureTrackCached(ctx, args.trackId);
      await ctx.prisma.playlistTrack.upsert({
        where: { playlistId_trackId: { playlistId: args.playlistId, trackId: args.trackId } },
        update: {},
        create: { playlistId: args.playlistId, trackId: args.trackId },
      });

      return ctx.prisma.playlist.findUnique({ where: { id: args.playlistId } });
    },

    removeTrackFromPlaylist: async (
      _: unknown,
      args: { playlistId: string; trackId: string },
      ctx: GraphQLContext
    ) => {
      const userId = requireAuth(ctx);
      const playlist = await ctx.prisma.playlist.findUnique({ where: { id: args.playlistId } });
      if (!playlist || playlist.ownerId !== userId) throw new Error("Not found");

      await ctx.prisma.playlistTrack.deleteMany({
        where: { playlistId: args.playlistId, trackId: args.trackId },
      });

      return ctx.prisma.playlist.findUnique({ where: { id: args.playlistId } });
    },
  },

  Playlist: {
    owner: (parent: { ownerId: string }, _: unknown, ctx: GraphQLContext) =>
      ctx.prisma.user.findUnique({ where: { id: parent.ownerId } }),

    tracks: async (parent: { id: string }, _: unknown, ctx: GraphQLContext) => {
      const rows = await ctx.prisma.playlistTrack.findMany({
        where: { playlistId: parent.id },
        include: { track: true },
        orderBy: { addedAt: "asc" },
      });
      return rows.map((r: { track: unknown }) => r.track);
    },

    trackCount: async (parent: { id: string }, _: unknown, ctx: GraphQLContext) =>
      ctx.prisma.playlistTrack.count({ where: { playlistId: parent.id } }),
  },
};
