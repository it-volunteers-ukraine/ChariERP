import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useOutsideClick } from '@/hooks';
import { Delete, DotsSettings } from '@/assets/icons';
import { Participants } from '@/components/participants';
import { ToolsDropMenu } from '@/components/tools-drop-menu';
import { IMokUserCountProps } from '@/components/participants/mock-user';

import { IMockCards } from '../mock';

interface ICard {
  id: string;
  title: string;
  data: IMockCards[]; //ICardData
  users: IMokUserCountProps[]; //IUsers
  setData: React.Dispatch<React.SetStateAction<IMockCards[]>>;
}

export const Card = ({ id, title, users, setData, data }: ICard) => {
  const ref = useRef<HTMLDivElement>(null);
  const deleteMessage = useTranslations('button');

  const [isActive, setIsActive] = useState<boolean>(false);

  const handlerClick = () => {
    setIsActive(false);

    return setData(data.filter((idx) => idx.id !== id));
  };

  useOutsideClick(ref, () => setIsActive(false));

  return (
    <div className="relative flex max-w-[222px] flex-col gap-3 overflow-hidden rounded-[8px] border border-arcticSky bg-white px-3 py-4">
      <div className="flex items-start justify-between">
        <p className="line-clamp-2 max-w-[170px] hyphens-auto font-roboto text-[14px] leading-[20px]">{title}</p>

        <button onClick={() => setIsActive(true)}>
          <DotsSettings />
        </button>

        <ToolsDropMenu opened={isActive} duration={1000} onClose={() => setIsActive(false)}>
          <button
            className="flex w-full items-center justify-between gap-x-3 rounded-[8px] p-2 font-roboto text-sm transition duration-300 ease-in-out"
            onClick={handlerClick}
          >
            <p>{deleteMessage('delete')}</p>

            <div className="h-6 w-6 text-comet">
              <Delete />
            </div>
          </button>
        </ToolsDropMenu>
      </div>

      <Participants users={users} small />
    </div>
  );
};
