import React from "react";
import { View, Text, FlatList } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { GET_LIKED_SONGS } from "@/graphql/queries";
import { UNLIKE_SONG } from "@/graphql/mutations";
import { TrackRow } from "@/components/TrackRow";
import { usePlayer } from "@/context/PlayerContext";
import { Track } from "@/types";

export function LikedSongsScreen() {
  const { data, loading, refetch } = useQuery(GET_LIKED_SONGS);
  const [unlikeSong] = useMutation(UNLIKE_SONG);
  const { playTrack, currentTrack } = usePlayer();

  const tracks: Track[] = data?.likedSongs ?? [];

  return (
    <View className="flex-1 bg-black pt-14 px-4">
      <Text className="text-white text-2xl font-extrabold mb-1">Liked Songs</Text>
      <Text className="text-spotify-lightgray mb-4">{tracks.length} songs</Text>

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
            onToggleLike={() =>
              unlikeSong({ variables: { trackId: item.id } }).then(() => refetch())
            }
          />
        )}
        ListEmptyComponent={
          <Text className="text-spotify-lightgray text-center mt-10">
            Songs you like will appear here.
          </Text>
        }
      />
    </View>
  );
}
