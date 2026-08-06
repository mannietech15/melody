import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation Register($email: String!, $password: String!, $displayName: String!) {
    register(email: $email, password: $password, displayName: $displayName) {
      token
      user {
        id
        email
        displayName
        avatarUrl
      }
    }
  }
`;

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        displayName
        avatarUrl
      }
    }
  }
`;

export const CREATE_PLAYLIST = gql`
  mutation CreatePlaylist($name: String!, $description: String) {
    createPlaylist(name: $name, description: $description) {
      id
      name
      description
      coverUrl
      trackCount
    }
  }
`;

export const DELETE_PLAYLIST = gql`
  mutation DeletePlaylist($id: ID!) {
    deletePlaylist(id: $id)
  }
`;

export const ADD_TRACK_TO_PLAYLIST = gql`
  mutation AddTrackToPlaylist($playlistId: ID!, $trackId: ID!) {
    addTrackToPlaylist(playlistId: $playlistId, trackId: $trackId) {
      id
      trackCount
    }
  }
`;

export const REMOVE_TRACK_FROM_PLAYLIST = gql`
  mutation RemoveTrackFromPlaylist($playlistId: ID!, $trackId: ID!) {
    removeTrackFromPlaylist(playlistId: $playlistId, trackId: $trackId) {
      id
      trackCount
    }
  }
`;

export const LIKE_SONG = gql`
  mutation LikeSong($trackId: ID!) {
    likeSong(trackId: $trackId)
  }
`;

export const UNLIKE_SONG = gql`
  mutation UnlikeSong($trackId: ID!) {
    unlikeSong(trackId: $trackId)
  }
`;
