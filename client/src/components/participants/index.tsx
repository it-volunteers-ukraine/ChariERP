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
    <div className="relative flex w-[280px] items-center gap-3">
      <div className="flex -space-x-1.5 overflow-hidden">
        {users.slice(0, 5).map((user) => {
          return <UserIcon {...user} key={`userCount-${user.id}`} />;
        })}
      </div>

      <div ref={ref} className="flex items-center justify-center gap-2 text-lightBlue">
        {users.length > 5 && <span className="cursor-default text-4xl">+</span>}

        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="cursor-pointer text-base">
          {users.length - 5 <= 0 && 'все'}

          {users.length - 5 > 0 && users.length - 5 < 100 && `ще ${users.length - 5}`}

          {users.length - 5 > 99 && 'ще 99 +'}
        </button>

        {isDropdownOpen && <DropdownList users={users} setIsDropdownOpen={() => setIsDropdownOpen(false)} />}
      </div>
    </div>
  );
};
