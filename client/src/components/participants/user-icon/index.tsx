import Image from 'next/image';

import { lettersToColor } from '@/utils';

interface IMokUserIconProps {
  firstName: string;
  lastName: string;
  avatarUrl: string;
}

export const UserIcon = ({ firstName, lastName, avatarUrl }: IMokUserIconProps) => {
  return (
    <div
      className="h-10 w-10 rounded-full ring-2 ring-white overflow-hidden cursor-pointer flex text-[16px] text-white items-center justify-center"
      style={{
        backgroundColor: `${lettersToColor(firstName, lastName)}`,
      }}
    >
      {avatarUrl.length === 0 ? (
        <span>{`${firstName[0]}${lastName[0]}`}</span>
      ) : (
        <Image fill src={avatarUrl} alt="avatarUrl" className="aspect-square object-cover" />
      )}
    </div>
  );
};
