import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Track } from "@/types";

interface Props {
  track: Track;
  isActive: boolean;
  onPress: () => void;
}

export function TrackCard({ track, isActive, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      className={`bg-spotify-card rounded-md p-4 w-44 mb-4 mr-4 hover:bg-spotify-elevated ${
        isActive ? "bg-spotify-elevated" : ""
      }`}
    >
      <Image
        source={{ uri: track.imageUrl ?? undefined }}
        className="w-full aspect-square rounded-md mb-4 bg-black"
      />
      <Text numberOfLines={1} className={`text-base font-bold mb-1 ${isActive ? "text-spotify-green" : "text-white"}`}>
        {track.name}
      </Text>
      <Text numberOfLines={2} className="text-spotify-lightgray text-sm">
        {track.artistName}
      </Text>
    </TouchableOpacity>
  );
}
