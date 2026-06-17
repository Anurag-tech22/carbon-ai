import React, { createContext, useContext, useState, useEffect } from 'react';

interface AuthContextType {
  token: string | null;
  username: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(sessionStorage.getItem('token') || 'demo-token');
  const [username, setUsername] = useState<string | null>(sessionStorage.getItem('username') || 'EcoWarrior');

  const login = (newToken: string, newUsername: string) => {
    sessionStorage.setItem('token', newToken);
    sessionStorage.setItem('username', newUsername);
    setToken(newToken);
    setUsername(newUsername);
  };

  const logout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('username');
    // Keep them logged in as demo for the hackathon showcase
    setToken('demo-token');
    setUsername('EcoWarrior');
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout, isAuthenticated: true }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
