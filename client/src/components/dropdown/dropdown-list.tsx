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
      <div className="flex items-center justify-between p-3 font-scada text-lg text-black">
        <p className="font-scada uppercase">{translateBoard('allParticipants')}</p>

        <button className="w-6" onClick={setIsDropdownOpen}>
          <Close />
        </button>
      </div>

      <div className="scroll-textarea max-h-[486px] overflow-y-scroll bg-white pb-[1px] pl-4 pr-2 pt-2">
        <label className="mb-4 flex gap-2 rounded border-[1px] p-2 text-disabled">
          <Search className="w-6" />

          <input
            type="text"
            onChange={handleInputChange}
            className="w-full text-comet"
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
