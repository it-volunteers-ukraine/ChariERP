'use client';

import { JoinSection, MainSection, TeamSection } from './components';

export const AboutUsPage = () => {
  return (
    <div className="bg-bgAuthGradient pt-9 tablet:pt-16 desktop:pt-20">
      <MainSection />
      <TeamSection />
      <JoinSection />
    </div>
  );
};
