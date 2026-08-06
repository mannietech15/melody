import React from "react";
import "./tailwind.css";
import { StatusBar } from "expo-status-bar";
import { ApolloProvider } from "@apollo/client";
import { apolloClient } from "@/apollo/client";
import { AuthProvider } from "@/context/AuthContext";
import { PlayerProvider } from "@/context/PlayerContext";
import { RootNavigator } from "@/navigation/RootNavigator";

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <PlayerProvider>
          <StatusBar style="light" />
          <RootNavigator />
        </PlayerProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
