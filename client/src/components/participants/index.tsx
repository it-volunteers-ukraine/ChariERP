'use client';

import { useRef } from 'react';
import { useTranslations } from 'use-intl';

import { useOutsideClick } from '@/hooks';
import { IUsersNormalizer } from '@/types';

import { UserIcon } from './user-icon';
import { DropdownList } from './dropdown';

import { getStyles } from './style';
// import { useAddUser } from '../pages/wrapper-columns/participants-board/api';

interface IParticipantsProps {
  small?: boolean;
  boardId?: string;
  users: IUsersNormalizer[];
  isDropdownOpen?: boolean;
  setIsDropdownOpen?: (bool: boolean) => void;
}

export const Participants = ({ users, small, isDropdownOpen, setIsDropdownOpen, boardId }: IParticipantsProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const translate = useTranslations('globalPronouns');

  // const { addUsers } = useAddUser(boardId);

  const maxUser = 5;
  const usersLength = users.length - maxUser;

  // const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  console.log({ boardId });

  const styles = getStyles(small);

  useOutsideClick(() => {
    if (setIsDropdownOpen) {
      setIsDropdownOpen(false);
    }
  }, ref);

  return (
    <div className={styles.participantsBox}>
      <div className={styles.iconBox}>
        {users.slice(0, maxUser).map((user) => (
          <UserIcon
            props={small}
            lastName={user.lastName}
            avatarUrl={user.avatarUrl}
            firstName={user.firstName}
            key={`userCount-${user.id}`}
          />
        ))}
      </div>

      <div ref={ref} className={styles.counter}>
        {users.length > maxUser && <span className={styles.plus}>+</span>}

        <button
          onClick={() => (!small && setIsDropdownOpen ? setIsDropdownOpen(!isDropdownOpen) : undefined)}
          className={styles.button}
        >
          {usersLength > 0 && usersLength < 100 && `${translate('more')} ${usersLength}`}
          {usersLength > 99 && `${translate('more')} 99 +`}
        </button>

        {isDropdownOpen && (
          <DropdownList users={users} setIsDropdownOpen={() => setIsDropdownOpen && setIsDropdownOpen(false)} />
        )}
      </div>
    </div>
  );
};
