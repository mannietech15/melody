import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useAuth } from "@/context/AuthContext";

export function RegisterScreen({ navigation }: any) {
  const { register } = useAuth();
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleRegister = async () => {
    if (!displayName || !email || !password) {
      return Alert.alert("Missing info", "Fill in all fields");
    }
    setSubmitting(true);
    try {
      await register(email.trim(), password, displayName.trim());
    } catch (e: any) {
      Alert.alert("Registration failed", e.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      className="flex-1 bg-black justify-center px-6"
    >
      <Text className="text-spotify-green text-4xl font-extrabold text-center mb-10">
        spotify.
      </Text>

      <Text className="text-spotify-lightgray text-xs mb-1 ml-1">NAME</Text>
      <TextInput
        value={displayName}
        onChangeText={setDisplayName}
        placeholder="Your name"
        placeholderTextColor="#6a6a6a"
        className="bg-spotify-elevated text-white rounded-md px-4 py-3 mb-4"
      />

      <Text className="text-spotify-lightgray text-xs mb-1 ml-1">EMAIL</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        placeholder="you@example.com"
        placeholderTextColor="#6a6a6a"
        className="bg-spotify-elevated text-white rounded-md px-4 py-3 mb-4"
      />

      <Text className="text-spotify-lightgray text-xs mb-1 ml-1">PASSWORD</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholder="At least 6 characters"
        placeholderTextColor="#6a6a6a"
        className="bg-spotify-elevated text-white rounded-md px-4 py-3 mb-6"
      />

      <TouchableOpacity
        onPress={handleRegister}
        disabled={submitting}
        className="bg-spotify-green rounded-full py-3 items-center mb-4"
      >
        <Text className="text-black font-bold text-base">
          {submitting ? "Creating account…" : "Sign Up"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text className="text-spotify-lightgray text-center">
          Already have an account? <Text className="text-white font-semibold">Log in</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
