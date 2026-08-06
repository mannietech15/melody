import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import Slider from "@react-native-community/slider";
import { usePlayer } from "@/context/PlayerContext";
import { useMutation } from "@apollo/client";
import { LIKE_SONG, UNLIKE_SONG } from "@/graphql/mutations";

function formatTime(ms: number) {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}

export function PlayerScreen({ navigation }: any) {
  const {
    currentTrack,
    isPlaying,
    togglePlayPause,
    playNext,
    playPrevious,
    positionMillis,
    durationMillis,
    seekTo,
  } = usePlayer();
  const [likeSong] = useMutation(LIKE_SONG);
  const [unlikeSong] = useMutation(UNLIKE_SONG);

  if (!currentTrack) {
    navigation.goBack();
    return null;
  }

  const toggleLike = () => {
    if (currentTrack.isLiked) unlikeSong({ variables: { trackId: currentTrack.id } });
    else likeSong({ variables: { trackId: currentTrack.id } });
  };

  return (
    <View className="flex-1 bg-spotify-darkgray px-6 pt-16">
      <TouchableOpacity onPress={() => navigation.goBack()} className="mb-6">
        <Text className="text-white text-2xl">⌄</Text>
      </TouchableOpacity>

      <View className="items-center mt-6">
        <Image
          source={{ uri: currentTrack.imageUrl ?? undefined }}
          className="w-80 h-80 rounded-lg bg-spotify-elevated"
        />
      </View>

      <View className="flex-row justify-between items-center mt-10">
        <View className="flex-1 pr-4">
          <Text numberOfLines={1} className="text-white text-2xl font-bold">
            {currentTrack.name}
          </Text>
          <Text numberOfLines={1} className="text-spotify-lightgray text-base mt-1">
            {currentTrack.artistName}
          </Text>
        </View>
        <TouchableOpacity onPress={toggleLike} hitSlop={10}>
          <Text className={currentTrack.isLiked ? "text-spotify-green text-2xl" : "text-spotify-lightgray text-2xl"}>
            {currentTrack.isLiked ? "♥" : "♡"}
          </Text>
        </TouchableOpacity>
      </View>

      <Slider
        style={{ width: "100%", height: 40, marginTop: 20 }}
        minimumValue={0}
        maximumValue={durationMillis || 1}
        value={positionMillis}
        onSlidingComplete={seekTo}
        minimumTrackTintColor="#1DB954"
        maximumTrackTintColor="#404040"
        thumbTintColor="#ffffff"
      />
      <View className="flex-row justify-between -mt-2">
        <Text className="text-spotify-lightgray text-xs">{formatTime(positionMillis)}</Text>
        <Text className="text-spotify-lightgray text-xs">{formatTime(durationMillis)}</Text>
      </View>

      <View className="flex-row justify-center items-center mt-8" style={{ gap: 40 }}>
        <TouchableOpacity onPress={playPrevious}>
          <Text className="text-white text-3xl">⏮</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={togglePlayPause}
          className="w-16 h-16 rounded-full bg-white items-center justify-center"
        >
          <Text className="text-black text-2xl">{isPlaying ? "⏸" : "▶"}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={playNext}>
          <Text className="text-white text-3xl">⏭</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-spotify-lightgray text-xs text-center mt-8">
        Playing a 30-second preview (Spotify API limitation for unlicensed apps)
      </Text>
    </View>
  );
}
