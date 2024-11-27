'use client';

import { MainSection, TeamSection } from './components';

export const AboutUsPage = () => {
  return (
    <div className="mx-4 mb-16 mt-9 tablet:mx-8 tablet:mb-24 tablet:mt-16 laptop:mx-[133px] desktop:mx-[138px] desktop:mt-20 desktopXl:mx-[240px]">
      <MainSection />
      <TeamSection />
    </div>
  );
};
