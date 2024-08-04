'use client';
import React, { useState, ChangeEvent } from 'react';
import Image from 'next/image';

import { Camera, Close } from '@/assets/icons';

import { DefaultAvatar } from './default-avatar';

interface AvatarUploaderProps {
  withAbb?: boolean;
  lastName?: string;
  firstName?: string;
  initialAvatarUrl?: string;
}

export const AvatarUploader = ({ withAbb, firstName, lastName, initialAvatarUrl }: AvatarUploaderProps) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(initialAvatarUrl ?? null);

  const iconSize = avatarUrl ? 28 : 42;

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarUrl(null);
  };

  return (
    <div className="relative w-[96px] h-[96px] bg-superBlue rounded-full overflow-hidden group/avatar cursor-pointer">
      <div className="relative flex items-center justify-center h-full z-[3]">
        {avatarUrl ? (
          <Image layout="fill" src={avatarUrl} alt="Avatar" className="aspect-square object-cover" />
        ) : (
          <DefaultAvatar withAbb={withAbb} firstName={firstName} lastName={lastName} />
        )}
      </div>

      <div className="absolute inset-0 bg-dark-blue flex flex-col items-center justify-center space-y-2 z-[2] opacity-0 group-hover/avatar:opacity-100 group-hover/avatar:z-[4] transition-opacity duration-100">
        <label className="cursor-pointer">
          <Camera width={iconSize} height={iconSize} />

          <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        </label>

        {avatarUrl && (
          <div onClick={handleRemoveAvatar} className="cursor-pointer">
            <Close width={28} height={28} className="text-white" />
          </div>
        )}
      </div>
    </div>
  );
};
