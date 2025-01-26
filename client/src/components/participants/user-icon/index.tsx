import clsx from 'clsx';
import Image from 'next/image';

import { lettersToColor } from '@/utils';

interface IMokUserIconProps {
  props?: boolean;
  lastName: string;
  avatarUrl: string;
  firstName: string;
}

export const UserIcon = ({ firstName, lastName, avatarUrl, props }: IMokUserIconProps) => {
  const color = lettersToColor(firstName, lastName);

  return (
    <div
      className={clsx(
        `flex cursor-pointer items-center justify-center overflow-hidden rounded-full text-white ring-2 ring-white`,
        { 'h-10 w-10 [&>span]:text-[16px]': props === undefined, 'h-6 w-6 [&>span]:text-[12px]': !!props },
      )}
      style={{
        backgroundColor: `${color}`,
      }}
    >
      {avatarUrl?.length === 0 ? (
        <span>{`${firstName?.[0]}${lastName?.[0]}`}</span>
      ) : (
        <Image fill src={avatarUrl} alt="avatarUrl" className="aspect-square object-cover" />
      )}
    </div>
  );
};
