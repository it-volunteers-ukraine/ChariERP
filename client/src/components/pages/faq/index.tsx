'use client';

import React, { useState } from 'react';

import { Tabs } from './components/tabs';
import { GeneralQuestions } from './components/content-pages/general-questions';

export const FaqPage = () => {
  const [active, setActive] = useState(0);

  return (
    <div className="flex w-full flex-col gap-10 p-[56px_0_64px] tablet:p-[56px_32px_64px] desktop:p-[64px_0_86px]">
      <h1 className="m-auto w-fit text-[28px] text-lightBlue">поширені питання</h1>

      <div className="m-auto w-full max-w-[1168px]">
        <Tabs active={active} setActive={setActive} />

        <div className="p-[32px_16px] shadow-faqShadow tablet:rounded-b-[40px] tablet:p-[48px_32px] desktop:p-[64px_72px]">
          {active === 0 && <GeneralQuestions />}
          {active === 1 && <GeneralQuestions />}
          {active === 2 && <GeneralQuestions />}
        </div>
      </div>
    </div>
  );
};
