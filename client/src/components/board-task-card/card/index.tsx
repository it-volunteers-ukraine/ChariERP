import { useRef, useState } from 'react';

import { useOutsideClick } from '@/hooks';
import { Delete, DotSettings } from '@/assets/icons';

import { getStyle } from '../style';
import { IMockCards } from '../mock';
import { useTranslations } from 'next-intl';

interface ICard {
  title: string;
  idCard: number;
  data: IMockCards[];
  setData: React.Dispatch<React.SetStateAction<IMockCards[]>>;
}

export const Card = ({ idCard, title, setData, data }: ICard) => {
  const deleteMessage = useTranslations('button');

  const ref = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useState(false);

  const style = getStyle({ isActive });

  const handlerClick = () => {
    setIsActive(false);

    return setData(data.filter((idx) => idx.id !== idCard));
  };

  useOutsideClick(ref, () => setIsActive(false));

  return (
    <div className="relative flex w-[226px] items-start justify-between gap-1 rounded-[8px] border border-arcticSky bg-white px-3 py-4">
      <p className="line-clamp-2 max-w-[170px] hyphens-auto !text-wrap break-normal font-roboto text-[14px] leading-[20px]">
        {title}
      </p>

      <button onClick={() => setIsActive(true)}>
        <DotSettings />
      </button>

      <div className={style.abs} ref={ref}>
        <p>{deleteMessage('delete')}</p>

        <button className="h-6 w-6" onClick={handlerClick}>
          <Delete />
        </button>
      </div>
    </div>
  );
};
