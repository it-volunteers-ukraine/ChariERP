'use client';

import { JoinSection, MainSection, TeamSection } from './components';

export const AboutUsPage = () => {
  return (
    <div className="bg-bg-auth-gradient tablet:pt-16 desktop:pt-20 pt-9">
      <MainSection />
      <TeamSection />
      <JoinSection />
    </div>
  );
};
