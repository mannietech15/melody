import { gql } from "@apollo/client";

export const TRACK_FIELDS = gql`
  fragment TrackFields on Track {
    id
    name
    artistName
    albumName
    imageUrl
    previewUrl
    durationMs
    isLiked
  }
`;

export const GET_ME = gql`
  query GetMe {
    me {
      id
      email
      displayName
      avatarUrl
    }
  }
`;

export const SEARCH_TRACKS = gql`
  ${TRACK_FIELDS}
  query SearchTracks($query: String!) {
    search(query: $query) {
      ...TrackFields
    }
  }
`;

export const GET_FEATURED = gql`
  ${TRACK_FIELDS}
  query GetFeatured {
    featured {
      ...TrackFields
    }
  }
`;

export const GET_MY_PLAYLISTS = gql`
  query GetMyPlaylists {
    myPlaylists {
      id
      name
      description
      coverUrl
      trackCount
    }
  }
`;

export const GET_PLAYLIST = gql`
  ${TRACK_FIELDS}
  query GetPlaylist($id: ID!) {
    playlist(id: $id) {
      id
      name
      description
      coverUrl
      trackCount
      owner {
        id
        displayName
      }
      tracks {
        ...TrackFields
      }
    }
  }
`;

export const GET_LIKED_SONGS = gql`
  ${TRACK_FIELDS}
  query GetLikedSongs {
    likedSongs {
      ...TrackFields
    }
  }
`;
