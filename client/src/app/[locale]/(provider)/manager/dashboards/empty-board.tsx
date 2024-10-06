'use client';

import { useTranslations } from 'use-intl';

import { InfoForBoard } from '@/assets/icons';

export const EmptyBoard = () => {
  const memberText = useTranslations('board');

  return (
    <div className="flex h-[calc(100dvh-64px)] w-full items-center justify-center pb-16 desktop:h-[calc(100dvh-96px)]">
      <div className="max-w-[343px] tablet:max-w-[598px] laptop:max-w-[706px]">
        <div className="mx-auto mb-8 max-w-[140px] p-[18px] text-lightBlue">
          <InfoForBoard />
        </div>

        <h3 className="select-none p-8 text-center font-roboto text-2xl leading-7 text-lynch opacity-50 tablet:text-[32px] tablet:leading-9 laptop:text-[40px] laptop:leading-[47px]">
          {memberText('emptyBoard')}
        </h3>
      </div>
    </div>
  );
};
