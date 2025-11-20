'use client';

import { useCallback, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { debounce } from '@/utils';
import { useOutsideClick } from '@/hooks';
import { IUsersNormalizer } from '@/types';
import { Close, Search } from '@/assets/icons';

import { IDropdownListProps } from './types';
import { getDropdownStyles } from './getStyles';

const filteredUsers = (users: IUsersNormalizer[] | undefined, searchTerm: string) => {
  const arrayUsers = users ? users : [];

  return arrayUsers.filter(({ firstName, lastName }) =>
    `${firstName} ${lastName}`.toLowerCase().includes(searchTerm.toLowerCase()),
  );
};

export const DropdownList = ({
  allUsers,
  taskUsers,
  boardUsers,
  renderAllUsers,
  renderTaskUsers,
  renderBoardUsers,
  dropdownClassName,
  setIsDropdownOpen,
}: IDropdownListProps) => {
  const translateBoard = useTranslations('board');
  const translateTask = useTranslations('taskPage');
  const translateSearch = useTranslations('inputs.placeholder');

  const ref = useRef<HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = useState('');

  useOutsideClick(() => {
    if (setIsDropdownOpen) {
      setIsDropdownOpen();
    }
  }, ref);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }),
    [],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  const styles = getDropdownStyles(dropdownClassName);

  return (
    <div ref={ref} className={styles.wrapper}>
      <div className="font-scada flex items-center justify-between p-3 text-lg text-black">
        <p className="font-scada uppercase">
          {taskUsers ? translateTask('performers') : translateBoard('allParticipants')}
        </p>

        <button className="w-6" onClick={setIsDropdownOpen}>
          <Close />
        </button>
      </div>

      <div className="scroll-textarea max-h-[486px] overflow-y-scroll bg-white pt-2 pr-2 pb-px pl-4">
        <label className="text-disabled mb-4 flex gap-2 rounded-sm border p-2">
          <Search className="w-6" />

          <input
            type="text"
            onChange={handleInputChange}
            className="text-comet w-full"
            placeholder={translateSearch('search')}
          />
        </label>

        {filteredUsers(taskUsers, searchTerm).map((user, index) => {
          return renderTaskUsers ? renderTaskUsers(user, index) : undefined;
        })}

        {filteredUsers(boardUsers, searchTerm).map((user, index) => {
          return renderBoardUsers ? renderBoardUsers(user, index) : undefined;
        })}

        {filteredUsers(allUsers, searchTerm).map((user, index) => {
          return renderAllUsers ? renderAllUsers(user, index) : undefined;
        })}
      </div>
    </div>
  );
};
