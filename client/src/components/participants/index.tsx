'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'use-intl';

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
  const ref = useRef<HTMLDivElement>(null);
  const translate = useTranslations('globalPronouns');

  const maxUser = 5;
  const usersLength = users.length - maxUser;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const styles = getStyles(small);

  useOutsideClick(ref, () => setIsDropdownOpen(false));

  return (
    <div className={styles.participantsBox}>
      <div className={styles.iconBox}>
        {users.slice(0, maxUser).map((user) => (
          <UserIcon {...user} props={small} key={`userCount-${user.id}`} />
        ))}
      </div>

      <div ref={ref} className={styles.counter}>
        {users.length > maxUser && <span className={styles.plus}>+</span>}

        <button onClick={() => (!small ? setIsDropdownOpen(!isDropdownOpen) : undefined)} className={styles.button}>
          {usersLength > 0 && usersLength < 100 && `${translate('more')} ${usersLength}`}
          {usersLength > 99 && `${translate('more')} 99 +`}
        </button>

        {isDropdownOpen && <DropdownList users={users} setIsDropdownOpen={() => setIsDropdownOpen(false)} />}
      </div>
    </div>
  );
};
