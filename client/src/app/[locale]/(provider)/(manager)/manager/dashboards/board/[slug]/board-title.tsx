'use client';

import { onCopy } from '@/utils';
import { Copy } from '@/assets/icons';

import { useTranslations } from 'next-intl';

interface IBoardTitleProps {
  titleText: string;
}

export const BoardTitle = ({ titleText }: IBoardTitleProps) => {
  const massageCopyTranslations = useTranslations('board');

  return (
    <div className="flex justify-between container-chari gap-5 py-3 desktop:gap-[160px]">
      <h2 className="text-[20px] leading-[24px] tablet:text-[26px] tablet:leading-[30px] font-scada font-bold line-clamp-3 text-lightBlue">
        {titleText}
      </h2>

      <button
        className="cursor-pointer w-32 flex bg-transparent text-lightBlue hover:text-dark-blue  active:text-greenActive disabled:text-disabled transition-all duration-300"
        onClick={(e) => onCopy(e, `${window.location.href}`, massageCopyTranslations('massageCopyTitle'))}
      >
        <Copy />
      </button>
    </div>
  );
};
