import { authResolvers } from "./auth";
import { searchResolvers } from "./search";
import { playlistResolvers } from "./playlist";
import { likedSongsResolvers } from "./likedSongs";

export const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...searchResolvers.Query,
    ...playlistResolvers.Query,
    ...likedSongsResolvers.Query,
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...playlistResolvers.Mutation,
    ...likedSongsResolvers.Mutation,
  },
  Track: {
    ...searchResolvers.Track,
  },
  Playlist: {
    ...playlistResolvers.Playlist,
  },
};
