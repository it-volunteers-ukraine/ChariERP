'use client';

import Image from 'next/image';

import { useWindowWidth } from '@/hooks';
import { AvatarIcon } from '@/assets/icons';

import { IAvatarProps } from './types';

export const Avatar = ({ img, name }: IAvatarProps) => {
  const { isTablet } = useWindowWidth();

  return (
    <div className="cursor-pointer text-lightBlue transition-all duration-200 hover:drop-shadow-xl tablet:flex tablet:gap-2">
      {img !== null ? (
        <Image src={img} alt={name} className="h-24 w-24 rounded-full" />
      ) : (
        <AvatarIcon width={24} height={24} />
      )}

      {isTablet && <span className="text-14px">{name}</span>}
    </div>
  );
};
