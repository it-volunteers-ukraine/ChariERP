'use client';

import { Attachments } from '@/components';
import { ForNGOs, KeyAdvantages, MainTheme, OpportunityChariCircle, RevealOnScroll } from './components';

export const HomePage = () => {
  return (
    <div className="bg-bgAuthGradient">
      <Attachments />

      <MainTheme />

      <div className="m-auto flex max-w-[1920px] flex-col gap-[96px] pb-[96px] tablet:gap-[120px] tablet:pb-[100px] laptop:gap-[150px] laptop:pb-[150px]">
        <RevealOnScroll />

        <OpportunityChariCircle />

        <ForNGOs />

        <KeyAdvantages />
      </div>
    </div>
  );
};
