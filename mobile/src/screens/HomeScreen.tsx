import React from "react";
import { View, Text, ScrollView, RefreshControl } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_FEATURED } from "@/graphql/queries";
import { TrackRow } from "@/components/TrackRow";
import { usePlayer } from "@/context/PlayerContext";
import { useAuth } from "@/context/AuthContext";
import { Track } from "@/types";

export function HomeScreen() {
  const { user } = useAuth();
  const { data, loading, refetch } = useQuery(GET_FEATURED);
  const { playTrack, currentTrack } = usePlayer();

  const tracks: Track[] = data?.featured ?? [];

  const greeting = () => {
    const h = new Date().getHours();
    if (h < 12) return "Good morning";
    if (h < 18) return "Good afternoon";
    return "Good evening";
  };

  return (
    <View className="flex-1 bg-black">
      <ScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => refetch()} tintColor="#fff" />}
      >
        <View className="px-4 pt-14 pb-2">
          <Text className="text-white text-2xl font-extrabold">
            {greeting()}{user ? `, ${user.displayName}` : ""}
          </Text>
        </View>

        <View className="px-4 pt-4 pb-2">
          <Text className="text-white text-xl font-bold mb-2">New Releases</Text>
        </View>

        {tracks.map((t) => (
          <TrackRow
            key={t.id}
            track={t}
            isActive={currentTrack?.id === t.id}
            onPress={() => playTrack(t, tracks)}
          />
        ))}

        {!loading && tracks.length === 0 && (
          <Text className="text-spotify-lightgray text-center mt-10">
            No featured tracks right now.
          </Text>
        )}

        <View className="h-8" />
      </ScrollView>
    </View>
  );
}
