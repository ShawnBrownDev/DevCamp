import { getSupabaseClient } from "@/lib/supabase/client";

export async function signUp(email: string, password: string, username: string) {
  const supabase = getSupabaseClient();
  
  if (!supabase) {
    throw new Error("Unable to connect to Supabase");
  }

  // First create the auth user
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username // Store username in user metadata
      }
    }
  });

  if (authError) throw authError;

  if (!authData.user) {
    throw new Error("Failed to create user");
  }

  try {
    // Then create the public profile
    const { error: profileError } = await supabase
      .from('users')
      .insert([
        { 
          id: authData.user.id,
          username,
          updated_at: new Date().toISOString()
        }
      ]);

    if (profileError) throw profileError;
  } catch (error) {
    // If profile creation fails, we should clean up the auth user
    await supabase.auth.signOut();
    throw error;
  }

  return authData;
}