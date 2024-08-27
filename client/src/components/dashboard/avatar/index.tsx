'use client';

import Image from 'next/image';

import { AvatarIcon } from '@/assets/icons';
import { useWindowWidth } from '@/hooks';

import { IAvatarProps } from './types';

export const Avatar = ({ img, name }: IAvatarProps) => {
  const { isTablet } = useWindowWidth();

  return (
    <div className="transition-all duration-200 cursor-pointer text-lightBlue hover:drop-shadow-xl tablet:flex tablet:gap-2">
      {img !== null ? (
        <Image src={img} alt={name} className="w-24 h-24 rounded-full" />
      ) : (
        <AvatarIcon width={24} height={24} />
      )}

      {isTablet && <span className="text-14px">{name}</span>}
    </div>
  );
};
