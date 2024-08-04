'use client';
import Image from 'next/image';

import { Camera, Close } from '@/assets/icons';

import { DefaultAvatar } from './default-avatar';
import { ChangeEvent } from 'react';

interface AvatarUploaderProps {
  name: string;
  error?: string;
  accept?: string;
  withAbb?: boolean;
  lastName?: string;
  firstName?: string;
  avatarUrl?: string | null;
  removeAvatar?: () => void;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AvatarUploader = ({
  name,
  error,
  accept,
  withAbb,
  onChange,
  lastName,
  firstName,
  avatarUrl,
  removeAvatar,
}: AvatarUploaderProps) => {
  const iconSize = avatarUrl ? 28 : 42;

  return (
    <>
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

            <input name={name} type="file" accept={accept} onChange={onChange} className="hidden" />
          </label>

          {avatarUrl && (
            <div onClick={removeAvatar} className="cursor-pointer">
              <Close width={28} height={28} className="text-white" />
            </div>
          )}
        </div>
      </div>

      <p>{error}</p>
    </>
  );
};
