import { useState, useEffect, createContext, useContext } from 'react';
import { User, Profile } from '../types';
import { getCurrentUser, getCurrentProfile, onAuthStateChange } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  isAdmin: boolean;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  profile: null,
  loading: true,
  isAdmin: false,
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getInitialSession = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        
        if (currentUser) {
          try {
            const userProfile = await getCurrentProfile();
            setProfile(userProfile);
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error getting initial session:', error);
        setLoading(false);
      }
    };

    getInitialSession();

    const { unsubscribe } = onAuthStateChange(
      async (event, session) => {
        const sessionUser = session?.user || null;
        setUser(sessionUser);
        
        if (sessionUser) {
          try {
            const userProfile = await getCurrentProfile();
            setProfile(userProfile);
          } catch (error) {
            console.error('Error fetching profile:', error);
            setProfile(null);
          }
        } else {
          setProfile(null);
        }
        
        setLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  return {
    user,
    profile,
    loading,
    isAdmin: profile?.is_admin || false,
  };
};