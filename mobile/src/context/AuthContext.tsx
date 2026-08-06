import React, { createContext, useContext, useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN, REGISTER } from "@/graphql/mutations";
import { GET_ME } from "@/graphql/queries";
import { AUTH_TOKEN_KEY, apolloClient } from "@/apollo/client";
import { User } from "@/types";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, displayName: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);

  const [loginMutation] = useMutation(LOGIN);
  const [registerMutation] = useMutation(REGISTER);

  const { data, loading: meLoading, refetch } = useQuery(GET_ME, {
    skip: !token,
    fetchPolicy: "network-only",
  });

  useEffect(() => {
    AsyncStorage.getItem(AUTH_TOKEN_KEY).then((stored) => {
      setToken(stored);
      setInitializing(false);
    });
  }, []);

  const persistToken = useCallback(async (newToken: string) => {
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, newToken);
    setToken(newToken);
    await refetch().catch(() => {});
  }, [refetch]);

  const login = useCallback(async (email: string, password: string) => {
    const { data } = await loginMutation({ variables: { email, password } });
    await persistToken(data.login.token);
  }, [loginMutation, persistToken]);

  const register = useCallback(async (email: string, password: string, displayName: string) => {
    const { data } = await registerMutation({ variables: { email, password, displayName } });
    await persistToken(data.register.token);
  }, [registerMutation, persistToken]);

  const logout = useCallback(async () => {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    setToken(null);
    await apolloClient.clearStore();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data?.me ?? null,
        loading: initializing || (!!token && meLoading),
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
