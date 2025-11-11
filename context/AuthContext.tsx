import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase'; // Your supabase client
import { Session } from '@supabase/supabase-js';

// Define the shape of your profile
// (Make sure this matches your 'profiles' table)
type Profile = {
  username: string | null;
  full_name: string | null;
  avatar_url: string | null;
};

type AuthContextType = {
  session: Session | null;
  profile: Profile | null;
  loading: boolean;
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    // 1. Get the initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      // If there's a session, fetch the profile
      if (session) {
        fetchProfile(session);
      } else {
        setLoading(false);
      }
    });

    // 2. Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        // If the user logs in, fetch their profile
        // If they log out, session is null, so clear the profile
        if (session) {
          fetchProfile(session);
        } else {
          setProfile(null);
          setLoading(false);
        }
      }
    );

    // Cleanup listener
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  // The function that does the "profile check"
  const fetchProfile = async (session: Session) => {
    try {
      setLoading(true);
      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, full_name, avatar_url`)
        .eq('id', session.user.id)
        .single(); // Get just one row

      if (error && status !== 406) {
        throw error;
      }
      
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.warn('Error fetching profile:', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const value = {
    session,
    profile,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Create a custom hook to use the context easily
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};