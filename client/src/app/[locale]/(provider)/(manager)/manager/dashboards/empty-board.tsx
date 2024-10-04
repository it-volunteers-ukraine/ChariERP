'use client';

import { useTranslations } from 'use-intl';

import { InfoForBoard } from '@/assets/icons';

export const EmptyBoard = () => {
  const memberText = useTranslations('board');

  return (
    <div className="w-full h-[calc(100dvh-64px)] desktop:h-[calc(100dvh-96px)] pb-16 flex justify-center items-center">
      <div className="max-w-[343px] tablet:max-w-[598px] laptop:max-w-[706px]">
        <div className="text-lightBlue max-w-[140px] mb-8 mx-auto p-[18px]">
          <InfoForBoard />
        </div>

        <h3 className="font-roboto text-2xl leading-7 tablet:text-[32px] tablet:leading-9 laptop:text-[40px] laptop:leading-[47px] text-center text-lynch opacity-50 p-8 select-none">
          {memberText('emptyBoard')}
        </h3>
      </div>
    </div>
  );
};
