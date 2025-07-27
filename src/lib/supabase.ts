import { authAPI } from './api';

// User interface for authentication
export interface User {
  id: string;
  email: string;
  full_name?: string;
}

export interface Profile {
  id: string;
  full_name?: string;
  email?: string;
  phone?: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
}

// Current user storage
let currentUser: User | null = null;
let currentProfile: Profile | null = null;

// Auth helpers
export const signUp = async (email: string, password: string, fullName: string) => {
  try {
    const response = await authAPI.signUp(email, password, fullName);
    
    // Store token and user
    localStorage.setItem('authToken', response.token);
    currentUser = response.user;
    
    // Notify auth state change
    notifyAuthStateChange('SIGNED_UP', { user: response.user, access_token: response.token });
    
    return { user: response.user, session: { access_token: response.token, user: response.user } };
  } catch (error) {
    console.error('Sign up error:', error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const response = await authAPI.signIn(email, password);
    
    // Store token and user
    localStorage.setItem('authToken', response.token);
    currentUser = response.user;
    
    // Notify auth state change
    notifyAuthStateChange('SIGNED_IN', { user: response.user, access_token: response.token });
    
    return { 
      user: response.user,
      session: { access_token: response.token, user: response.user }
    };
  } catch (error) {
    console.error('Sign in error:', error);
    throw error;
  }
};

export const signOut = async () => {
  localStorage.removeItem('authToken');
  currentUser = null;
  currentProfile = null;
  
  // Notify auth state change
  notifyAuthStateChange('SIGNED_OUT', null);
};

export const getCurrentUser = async (): Promise<User | null> => {
  if (currentUser) return currentUser;

  const token = localStorage.getItem('authToken');
  if (!token) return null;

  try {
    const response = await authAPI.verifyToken();
    if (response.valid) {
      const profile = await authAPI.getProfile();
      currentUser = {
        id: profile.id,
        email: profile.email,
        full_name: profile.full_name
      };
      return currentUser;
    }
  } catch (error) {
    console.error('Get current user error:', error);
    localStorage.removeItem('authToken');
  }

  return null;
};

export const getCurrentProfile = async (): Promise<Profile | null> => {
  const user = await getCurrentUser();
  if (!user) return null;

  if (currentProfile && currentProfile.id === user.id) {
    return currentProfile;
  }

  try {
    const profile = await authAPI.getProfile();
    currentProfile = profile;
    return currentProfile;
  } catch (error) {
    console.error('Get current profile error:', error);
    return null;
  }
};

// Auth state change callback type
type AuthStateChangeCallback = (event: string, session: any) => void;

// Auth state management
const authStateCallbacks: AuthStateChangeCallback[] = [];

export const onAuthStateChange = (callback: AuthStateChangeCallback) => {
  authStateCallbacks.push(callback);
  
  // Return unsubscribe function
  return {
    unsubscribe: () => {
      const index = authStateCallbacks.indexOf(callback);
      if (index > -1) {
        authStateCallbacks.splice(index, 1);
      }
    }
  };
};

// Notify auth state change
const notifyAuthStateChange = (event: string, session: any) => {
  authStateCallbacks.forEach(callback => {
    callback(event, session);
  });
};

// Initialize auth state on page load
const initializeAuth = async () => {
  try {
    const user = await getCurrentUser();
    const session = user ? { access_token: localStorage.getItem('authToken'), user } : null;
    
    notifyAuthStateChange('INITIAL_SESSION', session);
  } catch (error) {
    console.error('Initialize auth error:', error);
  }
};

// Call initialization
if (typeof window !== 'undefined') {
  initializeAuth();
}