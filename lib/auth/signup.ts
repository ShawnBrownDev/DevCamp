import { getSupabaseClient } from "@/lib/supabase/client";
import type { SignupData } from "./types";

export async function signUp({ 
  email, 
  password, 
  username, 
  firstName, 
  lastName 
}: SignupData) {
  const supabase = getSupabaseClient();
  
  if (!supabase) {
    throw new Error("Unable to connect to Supabase");
  }

  // Create auth user with metadata
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { 
        username,
        firstName,
        lastName
      }
    }
  });

  if (authError) throw authError;
  if (!authData.user) throw new Error("Failed to create user");

  return authData;
}