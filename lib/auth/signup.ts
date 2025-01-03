"use client";

import { supabase } from '../supabase';

interface SignupData {
  email: string;
  password: string;
  username: string;
  firstName: string;
  lastName: string;
}

export async function signUp({
  email,
  password,
  username,
  firstName,
  lastName,
}: SignupData) {
  if (!supabase) {
    throw new Error('Unable to connect to Supabase');
  }

  // First create the auth user with metadata
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username,
        firstName,
        lastName
      },
    }
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error('Failed to create user');

  // Manually create the user record if needed
  try {
    const { error: profileError } = await supabase
      .from('users')
      .insert([{
        id: authData.user.id,
        username,
        email,
        first_name: firstName,
        last_name: lastName,
        role: 'user',
        feature_flags: {
          beta_features: false,
          advanced_chat: false,
          custom_themes: false
        }
      }])
      .single();

    if (profileError && profileError.code !== '23505') { // Ignore unique constraint violations
      throw profileError;
    }
  } catch (err) {
    console.error('Error creating user profile:', err);
    // Continue since auth user is created - profile can be created later
  }

  return authData;
}