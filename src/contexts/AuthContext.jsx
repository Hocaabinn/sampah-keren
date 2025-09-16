import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // ⚠️ PROTECTED FUNCTION - DO NOT MODIFY OR ADD ASYNC OPERATIONS
  const handleAuthStateChange = (event, session) => {
    // SYNC OPERATIONS ONLY - NO ASYNC/AWAIT ALLOWED
    if (session?.user) {
      setUser(session?.user)
    } else {
      setUser(null)
    }
    setLoading(false)
  }

  
  useEffect(() => {
    // Get initial session - Use Promise chain
    supabase?.auth?.getSession()?.then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session?.user)
        }
        setLoading(false)
      })

    const { data: { subscription } } = supabase?.auth?.onAuthStateChange(handleAuthStateChange)

    return () => subscription?.unsubscribe()
  }, [])

  // Sign in with email and password
  const signIn = async (email, password) => {
    const { data, error } = await supabase?.auth?.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  // Sign up with email and password
  const signUp = async (email, password, userData = {}) => {
    const { data, error } = await supabase?.auth?.signUp({
      email,
      password,
      options: {
        data: userData,
      },
    });
    return { data, error };
  };

  // Sign out
  const signOut = async () => {
    const { error } = await supabase?.auth?.signOut();
    return { error };
  };

  // Reset password
  const resetPassword = async (email) => {
    const { data, error } = await supabase?.auth?.resetPasswordForEmail(email);
    return { data, error };
  };

  // ✅ NEW: Update user profile/metadata
  const updateProfile = async (userData) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        data: userData
      });
      
      if (!error && data?.user) {
        setUser(data.user); // Update local state with new user data
      }
      
      return { data, error };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  // ✅ NEW: Get current user profile (refresh from server)
  const refreshUserProfile = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (!error && user) {
        setUser(user);
      }
      
      return { data: user, error };
    } catch (err) {
      return { data: null, error: err };
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword,
    updateProfile,      
    refreshUserProfile, 
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}