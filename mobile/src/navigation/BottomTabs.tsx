import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator, BottomTabBar } from "@react-navigation/bottom-tabs";
import { HomeScreen } from "@/screens/HomeScreen";
import { SearchScreen } from "@/screens/SearchScreen";
import { LibraryScreen } from "@/screens/LibraryScreen";
import { MiniPlayer } from "@/components/MiniPlayer";
import { PlaylistDetailScreen } from "@/screens/PlaylistDetailScreen";
import { LikedSongsScreen } from "@/screens/LikedSongsScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DesktopSidebar } from "@/components/DesktopSidebar";
import { useWindowDimensions } from "react-native";

// Custom tab bar: renders the persistent mini-player directly above the
// standard tab bar, matching Spotify's layout.
function TabBarWithMiniPlayer(props: any) {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  if (isDesktop) {
    return (
      <View style={{ position: "absolute", top: 0, left: 0, bottom: 0, right: 0 }} pointerEvents="box-none">
        <View style={{ position: "absolute", left: 0, top: 0, bottom: 65, width: 256 }}>
          <DesktopSidebar {...props} />
        </View>
        <View style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}>
          <MiniPlayer />
        </View>
      </View>
    );
  }
  return (
    <View>
      <MiniPlayer />
      <BottomTabBar {...props} />
    </View>
  );
}

const Tab = createBottomTabNavigator();
const LibraryStack = createNativeStackNavigator();

function LibraryStackScreen() {
  return (
    <LibraryStack.Navigator screenOptions={{ headerShown: false }}>
      <LibraryStack.Screen name="LibraryHome" component={LibraryScreen} />
      <LibraryStack.Screen name="PlaylistDetail" component={PlaylistDetailScreen} />
      <LibraryStack.Screen name="LikedSongs" component={LikedSongsScreen} />
    </LibraryStack.Navigator>
  );
}

function TabIcon({ symbol, focused }: { symbol: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: 22, color: focused ? "#1DB954" : "#B3B3B3" }}>{symbol}</Text>
  );
}

export function BottomTabs() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 768;

  return (
    <Tab.Navigator
      sceneContainerStyle={isDesktop ? { paddingLeft: 256, paddingBottom: 65 } : {}}
      tabBar={(props) => <TabBarWithMiniPlayer {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000000", borderTopColor: "#282828" },
        tabBarActiveTintColor: "#1DB954",
        tabBarInactiveTintColor: "#B3B3B3",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon symbol="⌂" focused={focused} /> }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon symbol="⌕" focused={focused} /> }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryStackScreen}
        options={{ tabBarIcon: ({ focused }) => <TabIcon symbol="☰" focused={focused} /> }}
      />
    </Tab.Navigator>
  );
}
