'use client';

import { ChangeEvent } from 'react';
import Image from 'next/image';

import { Camera, Close, Info, Warning } from '@/assets/icons';

import { getStyles } from './styles';
import { DefaultAvatar } from './default-avatar';

interface AvatarUploaderProps {
  name: string;
  error?: string;
  lastName?: string;
  isSubmit?: boolean;
  firstName?: string;
  className?: string;
  avatarUrl?: string | null;
  removeAvatar?: () => void;
  info?: string | React.ReactNode;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const AvatarUploader = ({
  name,
  info,
  error,
  onChange,
  lastName,
  firstName,
  avatarUrl,
  className,
  removeAvatar,
}: AvatarUploaderProps) => {
  const iconSize = avatarUrl ? 28 : 42;
  const isFullName = firstName && lastName ? true : false;
  const styles = getStyles({ info, className, isFullName, avatarUrl });

  return (
    <div className={styles.wrapper}>
      <div className={styles.circle}>
        <div className="relative z-[3] flex h-full items-center justify-center">
          {avatarUrl ? (
            <Image layout="fill" src={avatarUrl} alt="Avatar" className="aspect-square object-cover" />
          ) : (
            <DefaultAvatar firstName={firstName} lastName={lastName} />
          )}
        </div>

        <div className="absolute inset-0 z-[2] flex flex-col items-center justify-center space-y-2 bg-dark-blue opacity-0 transition-opacity duration-100 group-hover/avatar:z-[4] group-hover/avatar:opacity-100">
          <label className={styles.cameraWrapper}>
            <Camera width={iconSize} height={iconSize} />

            <input name={name} type="file" onChange={onChange} className="hidden" />
          </label>

          {avatarUrl && (
            <div onClick={removeAvatar} className="cursor-pointer">
              <Close width={28} height={28} className="text-white" />
            </div>
          )}
        </div>
      </div>

      <div className={`flex flex-col items-start ${!error && 'justify-center'}`}>
        {error && (
          <div className="flex gap-3">
            <Warning width={24} height={24} />

            <span className="text-[14px] text-input-error">{error}</span>
          </div>
        )}

        {info && (
          <div className="flex items-start gap-3 text-input-info tablet:items-center">
            <Info width={24} height={24} className="min-w-[24px]" />

            {typeof info === 'string' ? <span className="text-[14px] text-input-info">{info}</span> : <div>{info}</div>}
          </div>
        )}
      </div>
    </div>
  );
};
