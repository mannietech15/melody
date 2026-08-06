import gql from "graphql-tag";

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    displayName: String!
    avatarUrl: String
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  type Track {
    id: ID!
    name: String!
    artistName: String!
    albumName: String!
    imageUrl: String
    previewUrl: String
    durationMs: Int!
    isLiked: Boolean!
  }

  type Playlist {
    id: ID!
    name: String!
    description: String
    coverUrl: String
    owner: User!
    tracks: [Track!]!
    trackCount: Int!
  }

  type Query {
    me: User
    search(query: String!): [Track!]!
    featured: [Track!]!
    myPlaylists: [Playlist!]!
    playlist(id: ID!): Playlist
    likedSongs: [Track!]!
  }

  type Mutation {
    register(email: String!, password: String!, displayName: String!): AuthPayload!
    login(email: String!, password: String!): AuthPayload!

    createPlaylist(name: String!, description: String): Playlist!
    deletePlaylist(id: ID!): Boolean!
    addTrackToPlaylist(playlistId: ID!, trackId: ID!): Playlist!
    removeTrackFromPlaylist(playlistId: ID!, trackId: ID!): Playlist!

    likeSong(trackId: ID!): Boolean!
    unlikeSong(trackId: ID!): Boolean!
  }
`;
