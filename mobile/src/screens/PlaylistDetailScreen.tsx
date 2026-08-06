import React from "react";
import { View, Text, FlatList, TouchableOpacity, Alert } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { GET_PLAYLIST } from "@/graphql/queries";
import { REMOVE_TRACK_FROM_PLAYLIST, DELETE_PLAYLIST } from "@/graphql/mutations";
import { TrackRow } from "@/components/TrackRow";
import { usePlayer } from "@/context/PlayerContext";
import { Track } from "@/types";

export function PlaylistDetailScreen({ route, navigation }: any) {
  const { id } = route.params;
  const { data, loading, refetch } = useQuery(GET_PLAYLIST, { variables: { id } });
  const [removeTrack] = useMutation(REMOVE_TRACK_FROM_PLAYLIST);
  const [deletePlaylist] = useMutation(DELETE_PLAYLIST);
  const { playTrack, currentTrack } = usePlayer();

  const playlist = data?.playlist;
  const tracks: Track[] = playlist?.tracks ?? [];

  const handleDelete = () => {
    Alert.alert("Delete playlist?", playlist?.name, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          await deletePlaylist({ variables: { id } });
          navigation.goBack();
        },
      },
    ]);
  };

  if (loading || !playlist) {
    return <View className="flex-1 bg-black" />;
  }

  return (
    <View className="flex-1 bg-black pt-14 px-4">
      <View className="mb-4">
        <Text className="text-white text-2xl font-extrabold">{playlist.name}</Text>
        {playlist.description ? (
          <Text className="text-spotify-lightgray mt-1">{playlist.description}</Text>
        ) : null}
        <Text className="text-spotify-lightgray text-sm mt-1">
          {playlist.trackCount} songs · {playlist.owner.displayName}
        </Text>
      </View>

      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={refetch}
        renderItem={({ item }) => (
          <TrackRow
            track={item}
            isActive={currentTrack?.id === item.id}
            onPress={() => playTrack(item, tracks)}
            onRemove={() =>
              removeTrack({ variables: { playlistId: id, trackId: item.id } }).then(() => refetch())
            }
          />
        )}
        ListEmptyComponent={
          <Text className="text-spotify-lightgray text-center mt-10">
            No songs yet. Add some from Search.
          </Text>
        }
      />

      <TouchableOpacity onPress={handleDelete} className="py-4 items-center">
        <Text className="text-red-400">Delete Playlist</Text>
      </TouchableOpacity>
    </View>
  );
}
