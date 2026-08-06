import React, { useState, useEffect, useCallback } from "react";
import { View, Text, TextInput, FlatList, ActivityIndicator } from "react-native";
import { useLazyQuery, useMutation } from "@apollo/client";
import { SEARCH_TRACKS } from "@/graphql/queries";
import { LIKE_SONG, UNLIKE_SONG } from "@/graphql/mutations";
import { TrackRow } from "@/components/TrackRow";
import { usePlayer } from "@/context/PlayerContext";
import { Track } from "@/types";

export function SearchScreen() {
  const [query, setQuery] = useState("");
  const [search, { data, loading }] = useLazyQuery(SEARCH_TRACKS);
  const [likeSong] = useMutation(LIKE_SONG);
  const [unlikeSong] = useMutation(UNLIKE_SONG);
  const { playTrack, currentTrack } = usePlayer();

  // Debounce search-as-you-type
  useEffect(() => {
    if (!query.trim()) return;
    const timeout = setTimeout(() => {
      search({ variables: { query: query.trim() } });
    }, 400);
    return () => clearTimeout(timeout);
  }, [query, search]);

  const toggleLike = useCallback(
    (track: Track) => {
      if (track.isLiked) unlikeSong({ variables: { trackId: track.id } });
      else likeSong({ variables: { trackId: track.id } });
    },
    [likeSong, unlikeSong]
  );

  const tracks: Track[] = data?.search ?? [];

  return (
    <View className="flex-1 bg-black pt-14 px-4">
      <Text className="text-white text-2xl font-extrabold mb-4">Search</Text>
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Artists, songs, or albums"
        placeholderTextColor="#6a6a6a"
        className="bg-spotify-elevated text-white rounded-md px-4 py-3 mb-2"
      />

      {loading && <ActivityIndicator color="#1DB954" style={{ marginTop: 16 }} />}

      <FlatList
        data={tracks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TrackRow
            track={item}
            isActive={currentTrack?.id === item.id}
            onPress={() => playTrack(item, tracks)}
            onToggleLike={() => toggleLike(item)}
          />
        )}
        ListEmptyComponent={
          !loading && query.trim() ? (
            <Text className="text-spotify-lightgray text-center mt-10">No results found.</Text>
          ) : null
        }
      />
    </View>
  );
}
