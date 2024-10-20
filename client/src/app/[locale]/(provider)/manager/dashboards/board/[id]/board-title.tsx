'use client';

import { useTranslations } from 'next-intl';

import { onCopy } from '@/utils';
import { Copy } from '@/assets/icons';

interface IBoardTitleProps {
  titleText: string;
}

export const BoardTitle = ({ titleText }: IBoardTitleProps) => {
  const massageCopyTranslations = useTranslations('board');

  return (
    <div className="container-chari flex justify-between gap-5 py-3 desktop:gap-[160px]">
      <h2 className="line-clamp-3 font-scada text-[20px] font-bold leading-[24px] text-lightBlue tablet:text-[26px] tablet:leading-[30px]">
        {titleText}
      </h2>

      <button
        className="flex min-w-10 cursor-pointer bg-transparent text-lightBlue transition-all duration-300 hover:text-dark-blue active:text-greenActive disabled:text-disabled"
        onClick={(e) => onCopy(e, `${window.location.href}`, massageCopyTranslations('massageCopyTitle'))}
      >
        <Copy />
      </button>
    </div>
  );
};
