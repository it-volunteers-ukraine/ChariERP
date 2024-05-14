import Image from 'next/image';

import { AvatarIcon } from '@/assets/icons';

import { IAvatarProps } from './types';

export const Avatar = ({ img, name }: IAvatarProps) => {
  return (
    <div className="flex gap-2 transition-all duration-200 cursor-pointer text-lightBlue hover:drop-shadow-xl">
      {img !== null ? (
        <Image src={img} alt={name} className="w-24 h-24 rounded-full" />
      ) : (
        <AvatarIcon width={24} height={24} />
      )}

      <span className="text-14px">{name}</span>
    </div>
  );
};
