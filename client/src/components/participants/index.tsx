'use client';

import { useRef, useState } from 'react';

import { useOutsideClick } from '@/hooks';

import { UserIcon } from './user-icon';
import { DropdownList } from './dropdown';
import { IMokUserCountProps } from './mock-user';

import { getStyles } from './style';

interface IParticipantsProps {
  small?: boolean;
  users: IMokUserCountProps[];
}

export const Participants = ({ users, small }: IParticipantsProps) => {
  const usersLength = users.length - 5;

  const ref = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const { participantsBox, iconBox, counter, plus, button } = getStyles(small);

  useOutsideClick(ref, () => setIsDropdownOpen(false));

  return (
    <div className={participantsBox}>
      <div className={iconBox}>
        {users.slice(0, 5).map((user) => (
          <UserIcon {...user} props={small} key={`userCount-${user.id}`} />
        ))}
      </div>

      <div ref={ref} className={counter}>
        {users.length > 5 && <span className={plus}>+</span>}

        <button onClick={() => (!small ? setIsDropdownOpen(!isDropdownOpen) : undefined)} className={button}>
          {usersLength > 0 && usersLength < 100 && `ще ${usersLength}`}
          {usersLength > 99 && 'ще 99 +'}
        </button>

        {isDropdownOpen && <DropdownList users={users} setIsDropdownOpen={() => setIsDropdownOpen(false)} />}
      </div>
    </div>
  );
};
