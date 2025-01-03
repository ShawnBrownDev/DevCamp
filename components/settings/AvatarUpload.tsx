"use client";

import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { uploadAvatar } from "@/lib/storage/avatar";
import { useAuthProvider } from '@/lib/auth'
import { supabase } from '@/lib/supabase'


interface AvatarUploadProps {
  currentAvatarUrl?: string | null;
  onUploadSuccess: (url: string) => void;
}

export function AvatarUpload({ currentAvatarUrl, onUploadSuccess }: AvatarUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { user } = useAuthProvider()

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    try {
      setIsUploading(true);
      setError(null);
      const url = await uploadAvatar(file, user.id, supabase);
      onUploadSuccess(url);
    } catch (err: any) {
      setError(err.message || 'Failed to upload avatar');
    } finally {
      setIsUploading(false);
      // Clear the input to allow uploading the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const initials = user?.user_metadata?.firstName?.[0] || user?.email?.[0]?.toUpperCase() || '?';

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="relative">
        <Avatar className="h-24 w-24">
          <AvatarImage src={currentAvatarUrl || undefined} alt="Profile" />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-0 right-0 rounded-full"
          onClick={() => fileInputRef.current?.click()}
          disabled={isUploading}
        >
          <Camera className="h-4 w-4" />
        </Button>
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        className="hidden"
        onChange={handleFileSelect}
        disabled={isUploading}
      />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <p className="text-sm text-muted-foreground">
        {isUploading ? 'Uploading...' : 'Click the camera icon to upload a new profile picture'}
      </p>
    </div>
  );
}