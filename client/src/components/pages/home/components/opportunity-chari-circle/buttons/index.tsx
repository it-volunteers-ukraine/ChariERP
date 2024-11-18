import React from 'react';
import { useTranslations } from 'next-intl';

import { buttonsData } from '../mock';

export const ButtonsCircle = () => {
  const text = useTranslations('homePage.opportunityChariCircle');
  const buttons = buttonsData(text);
  const iconWidth = 'w-[106px] tablet:w-[184px] laptop:w-[208px] desktop:w-[258px]';

  return (
    <div className="relative box-border h-[330px] w-[330px] rotate-[-90deg] tablet:h-[698px] tablet:w-[698px] tablet:animate-spinner laptop:h-[771px] laptop:w-[771px] desktop:h-[991px] desktop:w-[991px]">
      {buttons.map((card, index) => {
        const radius = 37;
        const angle = index * 2 * Math.PI * (1 / buttons.length);

        const x = Math.floor(radius * Math.cos(angle) + 50);
        const y = Math.floor(radius * Math.sin(angle) + 50);

        return (
          <div
            key={index}
            style={{
              top: `${y}%`,
              left: `${x}%`,
            }}
            className={`${iconWidth} absolute flex h-fit translate-x-[-50%] translate-y-[-50%] rotate-[90deg] flex-col items-center justify-center gap-2 tablet:animate-notRotate`}
          >
            <card.icon className={iconWidth} />

            <div className="text-center font-scada text-xs font-bold leading-[140%] text-black tablet:text-base desktop:text-2xl">
              {card.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};
