import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";

function SidebarLink({ icon, label, isActive, onPress }: { icon: string; label: string; isActive: boolean; onPress: () => void }) {
  return (
    <TouchableOpacity onPress={onPress} className="flex-row items-center px-4 py-3">
      <Text className={`text-2xl mr-4 ${isActive ? "text-white" : "text-spotify-lightgray"}`}>
        {icon}
      </Text>
      <Text className={`text-base font-semibold ${isActive ? "text-white" : "text-spotify-lightgray"}`}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function DesktopSidebar({ state, navigation }: any) {
  const currentRouteName = state?.routeNames[state.index] || "Home";

  return (
    <View className="w-64 bg-black border-r border-spotify-elevated flex-col h-full pt-6">
      <Text className="text-white text-3xl font-extrabold px-6 mb-8">spotify.</Text>

      <SidebarLink
        icon="⌂"
        label="Home"
        isActive={currentRouteName === "Home"}
        onPress={() => navigation.navigate("Home")}
      />
      <SidebarLink
        icon="⌕"
        label="Search"
        isActive={currentRouteName === "Search"}
        onPress={() => navigation.navigate("Search")}
      />
      <SidebarLink
        icon="☰"
        label="Your Library"
        isActive={currentRouteName === "Library"}
        onPress={() => navigation.navigate("Library")}
      />

      <View className="flex-1 mt-6 border-t border-spotify-elevated pt-6">
        <ScrollView className="px-6">
          <Text className="text-spotify-lightgray text-xs font-bold mb-4 tracking-widest">PLAYLISTS</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Library", { screen: "LikedSongs" })}>
            <Text className="text-spotify-lightgray text-sm py-2 hover:text-white font-semibold">Liked Songs</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}
