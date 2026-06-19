'use client';
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user] = useState<any>(null);
  
  return (
    <AuthContext.Provider value={{ user, signIn: () => {}, signOut: () => {}, getToken: () => '' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
