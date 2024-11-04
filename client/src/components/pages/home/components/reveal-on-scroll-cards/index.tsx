import React from 'react';

import { scrollItemsData } from './mock';
import { ScrollCard } from './scroll-card';

export const RevealOnScroll = () => {
  return (
    <div className="flex w-full flex-col gap-6 overflow-hidden px-4 tablet:gap-[56px] tablet:px-8 laptop:gap-16 desktop:px-[136px] desktopXl:gap-24 desktopXl:px-[86px]">
      <h1 className="mx-auto text-center font-scada text-[24px] font-bold uppercase leading-[120%] text-dark-blue tablet:text-[32px] laptop:text-[36px] desktop:text-[50px]">
        Наша ERP система спеціально розроблена для потреб громадських організацій
      </h1>

      {scrollItemsData.map((item, index) => (
        <ScrollCard key={item.id} text={item.text} number={item.id} isEven={index % 2 === 1} />
      ))}
    </div>
  );
};
