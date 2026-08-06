import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useAuth } from "@/context/AuthContext";

export function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert("Missing info", "Enter email and password");
    setSubmitting(true);
    try {
      await login(email.trim(), password);
    } catch (e: any) {
      Alert.alert("Login failed", e.message);
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
        placeholder="••••••••"
        placeholderTextColor="#6a6a6a"
        className="bg-spotify-elevated text-white rounded-md px-4 py-3 mb-6"
      />

      <TouchableOpacity
        onPress={handleLogin}
        disabled={submitting}
        className="bg-spotify-green rounded-full py-3 items-center mb-4"
      >
        <Text className="text-black font-bold text-base">
          {submitting ? "Logging in…" : "Log In"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text className="text-spotify-lightgray text-center">
          Don't have an account? <Text className="text-white font-semibold">Sign up</Text>
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
