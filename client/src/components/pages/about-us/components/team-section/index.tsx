'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

import { Title } from '@/components/title';

import { Card } from './card';
import teams from './teams.json';

export const TeamSection = () => {
  const text = useTranslations('aboutUsPage');
  const [activeCard, setActiveCard] = useState('');

  return (
    <section className="tablet:pb-24 desktop:pb-[132px] pb-16">
      <Title
        title={text('teamTitle')}
        className="font-scada tablet:text-[32px] tablet:leading-[38px] desktop:leading-[43px] mb-4 text-center text-[24px] leading-7 font-bold uppercase"
      />
      <p className="text-blue-green tablet:max-w-[704px] tablet:px-0 desktop:mb-16 desktop:max-w-[728px] mx-auto mb-12 px-4 text-center text-[16px] leading-[24px] tracking-[0.5px]">
        {text('team')}
      </p>
      <div className="tablet:gap-x-6 tablet:gap-y-10 laptop:gap-9 desktop:w-[1160px] desktop:justify-start desktop:gap-11 desktop:px-0 desktopXl:w-[1440px] desktopXl:gap-10 mx-auto flex flex-wrap justify-between gap-y-4 px-4 min-[375px]:justify-center min-[375px]:gap-4 min-[1921px]:w-full min-[1921px]:justify-center min-[1921px]:px-[240px]">
        {teams.map((teamsMember) => (
          <Card
            activeCard={activeCard}
            teamsMember={teamsMember}
            key={`${teamsMember.id}`}
            setActiveCard={(id) => setActiveCard(id)}
          />
        ))}
      </div>
    </section>
  );
};
