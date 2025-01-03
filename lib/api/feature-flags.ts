import type { FeatureFlags } from '@/lib/types/user'
import { supabase } from '../supabase'

export async function updateFeatureFlags(
  userId: string,
  flags: Partial<FeatureFlags>
) {
  const { data, error } = await supabase
    .from('users')
    .update({
      feature_flags: flags,
      updated_at: new Date().toISOString(),
    })
    .eq('id', userId)
    .select('feature_flags')
    .single()

  if (error) throw error
  return data.feature_flags
}

export async function getFeatureFlags(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('feature_flags')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data.feature_flags as FeatureFlags
}
