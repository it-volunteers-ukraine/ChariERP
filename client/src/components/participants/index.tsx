'use client';

import { useRef, useState } from 'react';

import { useOutsideClick } from '@/hooks';

import { IMokUserCountProps } from './mock-user';
import { UserIcon } from './user-icon';
import { DropdownList } from './dropdown';

interface IParticipantsProps {
  users: IMokUserCountProps[];
}

export const Participants = ({ users }: IParticipantsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useOutsideClick(ref, () => setIsDropdownOpen(false));

  return (
    <div className="relative w-[280px] flex gap-3 items-center">
      <div className="flex -space-x-1.5 overflow-hidden">
        {users.slice(0, 5).map((user) => {
          return <UserIcon {...user} key={`userCount-${user.id}`} />;
        })}
      </div>

      <div ref={ref} className="flex gap-2 items-center justify-center text-lightBlue ">
        {users.length > 5 && <span className="text-4xl cursor-default">+</span>}

        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="text-base cursor-pointer">
          {users.length - 5 <= 0 && 'все'}

          {users.length - 5 > 0 && users.length - 5 < 100 && `ще ${users.length - 5}`}

          {users.length - 5 > 99 && 'ще 99 +'}
        </button>

        {isDropdownOpen && <DropdownList users={users} setIsDropdownOpen={() => setIsDropdownOpen(false)} />}
      </div>
    </div>
  );
};
