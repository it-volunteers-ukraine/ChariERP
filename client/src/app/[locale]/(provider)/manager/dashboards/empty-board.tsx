'use client';

import { useTranslations } from 'use-intl';

import { InfoForBoard } from '@/assets/icons';

export const EmptyBoard = () => {
  const memberText = useTranslations('board');

  return (
    <div className="desktop:h-[calc(100dvh-96px)] flex h-[calc(100dvh-64px)] w-full items-center justify-center pb-16">
      <div className="tablet:max-w-[598px] laptop:max-w-[706px] max-w-[343px]">
        <div className="text-light-blue mx-auto mb-8 max-w-[140px] p-[18px]">
          <InfoForBoard />
        </div>

        <h3 className="font-roboto text-lynch tablet:text-[32px] tablet:leading-9 laptop:text-[40px] laptop:leading-[47px] p-8 text-center text-2xl leading-7 opacity-50 select-none">
          {memberText('emptyBoard')}
        </h3>
      </div>
    </div>
  );
};
