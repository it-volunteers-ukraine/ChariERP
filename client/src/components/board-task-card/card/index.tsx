import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useOutsideClick } from '@/hooks';
import { Delete, DotSettings } from '@/assets/icons';
import { Participants } from '@/components/participants';
import { IMokUserCountProps } from '@/components/participants/mock-user';

import { getStyle } from '../style';
import { IMockCards } from '../mock';

interface ICard {
  id: string;
  title: string;
  data: IMockCards[];
  users: IMokUserCountProps[];
  setData: React.Dispatch<React.SetStateAction<IMockCards[]>>;
}

export const Card = ({ id, title, users, setData, data }: ICard) => {
  const deleteMessage = useTranslations('button');

  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  const { deleteWindow } = getStyle({ isActive });

  const handlerClick = () => {
    setIsActive(false);

    return setData(data.filter((idx) => idx.id !== id));
  };

  useOutsideClick(ref, () => setIsActive(false));

  return (
    <div className="relative flex max-w-[226px] flex-col gap-3 rounded-[8px] border border-arcticSky bg-white px-3 py-4">
      <div className="flex items-start justify-between">
        <p className="line-clamp-2 max-w-[170px] break-all font-roboto text-[14px] leading-[20px]">{title}</p>

        <button onClick={() => setIsActive(true)}>
          <DotSettings />
        </button>

        <div className={deleteWindow} ref={ref}>
          <p>{deleteMessage('delete')}</p>

          <button className="h-6 w-6" onClick={handlerClick}>
            <Delete />
          </button>
        </div>
      </div>

      <Participants users={users} small />
    </div>
  );
};
