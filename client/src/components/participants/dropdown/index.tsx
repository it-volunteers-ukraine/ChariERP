import { useTranslations } from 'next-intl';

import { Close, Search } from '@/assets/icons';
import { IMokUserCountProps } from '../mock-user';

interface IDropdownListProps {
  users: IMokUserCountProps[];
  setIsDropdownOpen: () => void;
}

export const DropdownList = ({ users, setIsDropdownOpen }: IDropdownListProps) => {
  const translate = useTranslations('');

  return (
    <div className="absolute w-[280px] pb-3 bg-arcticSky top-0 left-0 border rounded-lg shadow-dashboard">
      <div className="text-black font-scada text-lg p-3 flex items-center justify-between">
        <p className="font-semibold uppercase">{translate('board.allParticipants')}</p>

        <button className="w-6" onClick={setIsDropdownOpen}>
          <Close />
        </button>
      </div>

      <div className="bg-white pl-4 pr-2 pt-2 pb-[1px]  max-h-[486px] overflow-y-scroll scroll-textarea">
        <label className="p-2 mb-4 border-[1px] rounded flex gap-2">
          <Search className="w-6" />

          <input type="text" className="w-full" placeholder={translate('inputs.placeholder.search')} />
        </label>

        {users.map(({ id, firstName, lastName }) => {
          const fullName = `${firstName} ${lastName}`;

          return (
            <div key={id} className="p-[6px_8px] flex gap-2 border-b-[1px] border-arcticSky hover:bg-superBlue">
              <span className="w-6 h-6 text-[12px] text-white text-center bg-skyBlue rounded-full">
                {`${firstName[0]}${lastName[0]}`}
              </span>

              <p className="text-base text-comet font-robotoCondensed text-nowrap text-ellipsis whitespace-nowrap overflow-hidden">
                {fullName}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
