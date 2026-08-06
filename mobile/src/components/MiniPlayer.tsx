import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { usePlayer } from "@/context/PlayerContext";

export function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlayPause, positionMillis, durationMillis } = usePlayer();
  const navigation = useNavigation<any>();

  if (!currentTrack) return null;

  const progress = durationMillis > 0 ? positionMillis / durationMillis : 0;

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => navigation.navigate("Player")}
      className="bg-spotify-elevated border-t border-black"
    >
      <View className="h-0.5 bg-spotify-card w-full">
        <View className="h-0.5 bg-spotify-green" style={{ width: `${progress * 100}%` }} />
      </View>
      <View className="flex-row items-center px-3 py-2">
        <Image
          source={{ uri: currentTrack.imageUrl ?? undefined }}
          className="w-10 h-10 rounded bg-spotify-card"
        />
        <View className="flex-1 ml-3">
          <Text numberOfLines={1} className="text-spotify-white text-sm font-semibold">
            {currentTrack.name}
          </Text>
          <Text numberOfLines={1} className="text-spotify-lightgray text-xs">
            {currentTrack.artistName}
          </Text>
        </View>
        <TouchableOpacity onPress={togglePlayPause} hitSlop={10} className="px-3">
          <Text className="text-spotify-white text-2xl">{isPlaying ? "⏸" : "▶"}</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}
