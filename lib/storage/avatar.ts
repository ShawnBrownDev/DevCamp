import type { SupabaseClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const AVATAR_BUCKET = 'avatars';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export async function uploadAvatar(
  file: File, 
  userId: string,
  supabase: SupabaseClient<Database>
) {
  // Validate file size
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('File size must be less than 5MB');
  }

  // Validate file type
  if (!ALLOWED_TYPES.includes(file.type)) {
    throw new Error('Invalid file type. Please upload a JPG, PNG, GIF, or WebP image.');
  }

  try {
    // Generate a unique filename
    const timestamp = Date.now();
    const fileExt = file.name.split('.').pop()?.toLowerCase();
    const filePath = `${userId}/${timestamp}.${fileExt}`;

    // Upload the file
    const { data, error: uploadError } = await supabase.storage
      .from(AVATAR_BUCKET)
      .upload(filePath, file, {
        upsert: true,
        contentType: file.type,
      });

    if (uploadError) throw uploadError;

    // Get the public URL
    const { data: { publicUrl } } = supabase.storage
      .from(AVATAR_BUCKET)
      .getPublicUrl(filePath);

    // Delete old avatar if it exists
    const { data: userData } = await supabase
      .from('users')
      .select('avatar_url')
      .eq('id', userId)
      .single();

    if (userData?.avatar_url) {
      const oldPath = userData.avatar_url.split('/').pop();
      if (oldPath) {
        await supabase.storage
          .from(AVATAR_BUCKET)
          .remove([`${userId}/${oldPath}`]);
      }
    }

    // Update user profile with new avatar URL
    const { error: updateError } = await supabase
      .from('users')
      .update({ 
        avatar_url: publicUrl,
        updated_at: new Date().toISOString()
      })
      .eq('id', userId);

    if (updateError) throw updateError;

    return publicUrl;
  } catch (error: any) {
    console.error('Avatar upload error:', error);
    throw new Error(error.message || 'Failed to upload avatar');
  }
}