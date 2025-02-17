'use client';

import { useState } from 'react';
import { useTranslations } from 'use-intl';

import { IUsersNormalizer } from '@/types';

import { UserIcon } from '../user-icon';
import { DropdownItem, DropdownList } from '../dropdown';

import { getStyles } from './style';

interface IParticipantsProps {
  width?: number;
  isTask?: boolean;
  users: IUsersNormalizer[];
  dropdownClassName?: string;
}

const maxVisibleUserInSelect = 5;

export const Participants = ({ users, width, isTask, dropdownClassName }: IParticipantsProps) => {
  const translate = useTranslations('globalPronouns');

  const usersLength = users.length - maxVisibleUserInSelect;

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const styles = getStyles(isTask);

  return (
    <div className={styles.participantsBox}>
      <div className={styles.iconBox}>
        {users.slice(0, maxVisibleUserInSelect).map((user) => (
          <UserIcon
            width={width}
            lastName={user.lastName}
            firstName={user.firstName}
            avatarUrl={user.avatarUrl}
            key={`userCount-${user.id}`}
          />
        ))}
      </div>

      <div className={styles.counter}>
        {users.length > maxVisibleUserInSelect && <span className={styles.plus}>+</span>}

        <button
          className={styles.button}
          onClick={() => (!isTask && setIsDropdownOpen ? setIsDropdownOpen(!isDropdownOpen) : undefined)}
        >
          {usersLength > 0 && usersLength < 100 && `${translate('more')} ${usersLength}`}
          {usersLength > 99 && `${translate('more')} 99 +`}
        </button>

        {isDropdownOpen && (
          <DropdownList
            boardUsers={users}
            dropdownClassName={dropdownClassName}
            setIsDropdownOpen={() => setIsDropdownOpen(false)}
            renderBoardUsers={(user) => (
              <DropdownItem
                lastName={user.lastName}
                firstName={user.firstName}
                avatarUrl={user.avatarUrl}
                key={`common-dropdown-${user.id}`}
              />
            )}
          />
        )}
      </div>
    </div>
  );
};
