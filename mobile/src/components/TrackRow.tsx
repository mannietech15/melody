import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Track } from "@/types";

interface Props {
  track: Track;
  onPress: () => void;
  onToggleLike?: () => void;
  onRemove?: () => void;
  isActive?: boolean;
}

export function TrackRow({ track, onPress, onToggleLike, onRemove, isActive }: Props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex-row items-center px-4 py-2"
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: track.imageUrl ?? undefined }}
        className="w-12 h-12 rounded bg-spotify-elevated"
      />
      <View className="flex-1 ml-3">
        <Text
          numberOfLines={1}
          className={`text-base ${isActive ? "text-spotify-green" : "text-spotify-white"}`}
        >
          {track.name}
        </Text>
        <Text numberOfLines={1} className="text-spotify-lightgray text-sm mt-0.5">
          {track.artistName}
        </Text>
      </View>
      {onToggleLike && (
        <TouchableOpacity onPress={onToggleLike} hitSlop={10} className="px-2">
          <Text className={track.isLiked ? "text-spotify-green text-lg" : "text-spotify-lightgray text-lg"}>
            {track.isLiked ? "♥" : "♡"}
          </Text>
        </TouchableOpacity>
      )}
      {onRemove && (
        <TouchableOpacity onPress={onRemove} hitSlop={10} className="px-2">
          <Text className="text-spotify-lightgray text-lg">✕</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}
