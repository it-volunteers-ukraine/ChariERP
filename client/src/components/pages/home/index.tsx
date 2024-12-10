'use client';

import { ForNGOs, KeyAdvantages, MainTheme, OpportunityChariCircle, RevealOnScroll } from './components';

export const HomePage = () => {
  return (
    <>
      <MainTheme />

      <div className="m-auto mb-[96px] flex max-w-[1920px] flex-col gap-[96px] tablet:mb-[100px] tablet:gap-[120px] laptop:mb-[150px] laptop:gap-[150px]">
        <RevealOnScroll />

        <OpportunityChariCircle />

        <ForNGOs />

        <KeyAdvantages />
      </div>
    </>
  );
};
