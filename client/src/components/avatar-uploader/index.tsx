'use client';
import { Avatar, Camera, Close } from '@/assets/icons';
import React, { useState, ChangeEvent } from 'react';

interface AvatarUploaderProps {
  initialAvatarUrl?: string;
}

export const AvatarUploader = ({ initialAvatarUrl }: AvatarUploaderProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialAvatarUrl ?? null);
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
        setIsHovered(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl(null);
  };

  return (
    <div
      className="relative w-[96px] h-[96px] bg-superBlue rounded-full overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {avatarUrl ? (
        <img src={avatarUrl} alt="Avatar" className="h-full w-full object-cover" />
      ) : (
        <div className="flex items-center justify-center h-full">
          <Avatar />
        </div>
      )}
      {isHovered && (
        <div className="absolute inset-0 bg-dark-blue flex flex-col items-center justify-center space-y-2">
          <label className="cursor-pointer">
            <Camera width={avatarUrl ? 28 : 42} height={avatarUrl ? 28 : 42} />

            <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
          </label>

          {avatarUrl && (
            <div onClick={handleRemoveAvatar} className="cursor-pointer">
              <Close width={28} height={28} className="text-white" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};
