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
    <div className="absolute left-0 top-0 w-[280px] rounded-lg border bg-arcticSky pb-3 shadow-dashboard">
      <div className="flex items-center justify-between p-3 font-scada text-lg text-black">
        <p className="font-semibold uppercase">{translate('board.allParticipants')}</p>

        <button className="w-6" onClick={setIsDropdownOpen}>
          <Close />
        </button>
      </div>

      <div className="scroll-textarea max-h-[486px] overflow-y-scroll bg-white pb-[1px] pl-4 pr-2 pt-2">
        <label className="mb-4 flex gap-2 rounded border-[1px] p-2">
          <Search className="w-6" />

          <input type="text" className="w-full" placeholder={translate('inputs.placeholder.search')} />
        </label>

        {users.map(({ id, firstName, lastName }) => {
          const fullName = `${firstName} ${lastName}`;

          return (
            <div key={id} className="flex gap-2 border-b-[1px] border-arcticSky p-[6px_8px] hover:bg-superBlue">
              <span className="h-6 w-6 rounded-full bg-skyBlue text-center text-[12px] text-white">
                {`${firstName[0]}${lastName[0]}`}
              </span>

              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-nowrap font-robotoCondensed text-base text-comet">
                {fullName}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
