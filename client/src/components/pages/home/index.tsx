'use client';

import { ForNGOs, KeyAdvantages, MainTheme, OpportunityChariCircle, RevealOnScroll } from './components';

export const HomePage = () => {
  return (
    <>
      <MainTheme />

      <div className="m-auto mb-[96px] flex max-w-[1920px] flex-col gap-[96px] overflow-hidden tablet:mb-[100px] tablet:gap-[120px] laptop:mb-[168px] laptop:gap-[168px] desktop:mb-[216px] desktop:gap-[216px] desktopXl:mb-[288px] desktopXl:gap-[288px]">
        <RevealOnScroll />

        <OpportunityChariCircle />

        <ForNGOs />

        <KeyAdvantages />
      </div>
    </>
  );
};
