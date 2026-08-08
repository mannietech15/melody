import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthService, { type User } from '../services/AuthService';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  logout: async () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(AuthService.getCurrentUser());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initial load
    setUser(AuthService.getCurrentUser());
    setLoading(false);

    // Subscribe to auth changes
    const unsubscribe = AuthService.subscribe((newUser) => {
      setUser(newUser);
    });

    return () => unsubscribe();
  }, []);

  const logout = async () => {
    await AuthService.logout();
  };

  return (
    <AuthContext.Provider value={{ user, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
