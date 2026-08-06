import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

// EDIT THIS to point at your backend:
// - iOS simulator:      http://localhost:4000/graphql
// - Android emulator:   http://10.0.2.2:4000/graphql
// - Physical device:    http://<your-computer-LAN-IP>:4000/graphql
// - Deployed web build: set via EXPO_PUBLIC_API_URL env var (see below), falls back to localhost.
//
// Expo automatically inlines any env var prefixed with EXPO_PUBLIC_ into the build at build time.
// Set EXPO_PUBLIC_API_URL in your hosting provider's dashboard (Vercel/Netlify project settings ->
// Environment Variables) to your Render backend's URL, e.g. https://your-app.onrender.com/graphql
export const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:4000/graphql";

export const AUTH_TOKEN_KEY = "spotify_clone_auth_token";

const httpLink = createHttpLink({ uri: API_URL });

const authLink = setContext(async (_, { headers }) => {
  const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
