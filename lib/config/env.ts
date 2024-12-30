export const env = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
} as const;

export function validateEnv() {
  if (!env.supabase.url) {
    console.error('Supabase URL not found. Please connect your Supabase project.');
    return false;
  }
  if (!env.supabase.anonKey) {
    console.error('Supabase Anon Key not found. Please connect your Supabase project.');
    return false;
  }
  return true;
}