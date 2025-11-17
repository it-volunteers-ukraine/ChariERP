'use client';

import { useState } from 'react';

import { GeneralQuestions, Tabs } from './components';

export const FaqPage = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="tablet:p-[56px_32px_64px] desktop:gap-14 desktop:p-[64px_0_86px] flex w-full flex-col gap-10 p-[56px_0_64px]">
      <h1 className="text-light-blue desktop:text-[32px] m-auto w-fit text-[28px] uppercase">поширені питання</h1>

      <div className="m-auto w-full max-w-[1168px]">
        <Tabs active={active} setActive={setActive} />

        <div className="shadow-faq-shadow tablet:rounded-b-[40px] tablet:p-[48px_32px] desktop:p-[64px_72px] p-[32px_16px]">
          {active === 0 && <GeneralQuestions />}
          {active === 1 && <GeneralQuestions />}
          {active === 2 && <GeneralQuestions />}
        </div>
      </div>
    </div>
  );
};
