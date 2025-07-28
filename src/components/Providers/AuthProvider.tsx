import React from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

// No context needed, just render children
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return <>{children}</>;
};