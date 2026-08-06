import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Modal, TextInput, Alert } from "react-native";
import { useQuery, useMutation } from "@apollo/client";
import { GET_MY_PLAYLISTS } from "@/graphql/queries";
import { CREATE_PLAYLIST } from "@/graphql/mutations";
import { useAuth } from "@/context/AuthContext";

export function LibraryScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const { data, loading, refetch } = useQuery(GET_MY_PLAYLISTS);
  const [createPlaylist] = useMutation(CREATE_PLAYLIST);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState("");

  const handleCreate = async () => {
    if (!newName.trim()) return;
    try {
      await createPlaylist({ variables: { name: newName.trim() } });
      setNewName("");
      setModalVisible(false);
      refetch();
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  const playlists = data?.myPlaylists ?? [];

  return (
    <View className="flex-1 bg-black pt-14 px-4">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-white text-2xl font-extrabold">Your Library</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Text className="text-spotify-green text-3xl leading-none">+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate("LikedSongs")}
        className="flex-row items-center bg-spotify-elevated rounded-md p-3 mb-3"
      >
        <View className="w-12 h-12 rounded bg-spotify-green items-center justify-center">
          <Text className="text-black text-xl">♥</Text>
        </View>
        <Text className="text-white font-semibold ml-3">Liked Songs</Text>
      </TouchableOpacity>

      <FlatList
        data={playlists}
        keyExtractor={(item) => item.id}
        refreshing={loading}
        onRefresh={refetch}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("PlaylistDetail", { id: item.id })}
            className="flex-row items-center py-3"
          >
            <View className="w-12 h-12 rounded bg-spotify-elevated items-center justify-center">
              <Text className="text-spotify-lightgray text-lg">♫</Text>
            </View>
            <View className="ml-3">
              <Text className="text-white font-semibold">{item.name}</Text>
              <Text className="text-spotify-lightgray text-sm">{item.trackCount} songs</Text>
            </View>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          !loading ? (
            <Text className="text-spotify-lightgray text-center mt-10">
              No playlists yet. Tap + to create one.
            </Text>
          ) : null
        }
      />

      <TouchableOpacity onPress={logout} className="py-4 items-center">
        <Text className="text-spotify-lightgray">
          Log out{user ? ` (${user.email})` : ""}
        </Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="flex-1 justify-end bg-black/60">
          <View className="bg-spotify-elevated rounded-t-2xl p-6">
            <Text className="text-white text-lg font-bold mb-4">New Playlist</Text>
            <TextInput
              value={newName}
              onChangeText={setNewName}
              placeholder="Playlist name"
              placeholderTextColor="#6a6a6a"
              className="bg-spotify-card text-white rounded-md px-4 py-3 mb-4"
              autoFocus
            />
            <TouchableOpacity
              onPress={handleCreate}
              className="bg-spotify-green rounded-full py-3 items-center mb-2"
            >
              <Text className="text-black font-bold">Create</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)} className="items-center py-2">
              <Text className="text-spotify-lightgray">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
