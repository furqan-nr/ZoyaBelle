import { useState, useEffect } from 'react';
import { User } from '../types';
import { authAPI } from '../lib/api';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await authAPI.getProfile();
        setUser(profile);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  return {
    user,
    loading,
    isAdmin: user?.is_admin || false,
  };
};