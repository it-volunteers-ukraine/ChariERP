import { useCallback, useState } from 'react';
import { useTranslations } from 'next-intl';

import { IUsersNormalizer } from '@/types';
import { debounce } from '@/utils';
import { Close, Search } from '@/assets/icons';

interface IDropdownListProps {
  users: IUsersNormalizer[];
  setIsDropdownOpen: () => void;
}

export const DropdownList = ({ users, setIsDropdownOpen }: IDropdownListProps) => {
  const translateBoard = useTranslations('board');
  const translateSearch = useTranslations('inputs.placeholder');

  const [searchTerm, setSearchTerm] = useState('');

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }),
    [],
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  return (
    <div className="absolute left-0 top-0 z-50 w-[280px] rounded-lg border bg-arcticSky pb-3 shadow-dashboard">
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

        {users
          .filter(({ firstName, lastName }) =>
            `${firstName} ${lastName}`.toLowerCase().includes(searchTerm.toLowerCase()),
          )
          .map(({ id, firstName, lastName }) => {
            return (
              <div key={id} className="flex gap-x-2 border-b-[1px] border-arcticSky p-[6px_8px] hover:bg-superBlue">
                <div className="h-6 w-6 rounded-full bg-skyBlue text-center text-[12px] text-white">
                  {`${firstName[0]}${lastName[0]}`}
                </div>

                <p className="line-clamp-1 max-w-[200px] break-all font-robotoCondensed text-base text-comet">
                  {`${firstName} ${lastName}`}
                </p>
              </div>
            );
          })}
      </div>
    </div>
  );
};
