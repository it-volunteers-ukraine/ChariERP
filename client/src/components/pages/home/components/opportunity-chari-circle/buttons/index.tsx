import React from 'react';
import { useTranslations } from 'next-intl';

import { buttonsData } from '../mock';

export const ButtonsCircle = () => {
  const text = useTranslations('homePage.opportunityChariCircle');
  const buttons = buttonsData(text);
  const iconWidth = 'w-[106px] tablet:w-[184px]';

  return (
    <div className="tablet:h-[698px] tablet:w-[698px] tablet:animate-spinner relative box-border h-[330px] w-[330px] -rotate-90">
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
            className={`${iconWidth} tablet:animate-not-rotate absolute flex h-fit translate-x-[-50%] translate-y-[-50%] rotate-90 flex-col items-center justify-center gap-2`}
          >
            <card.icon className={iconWidth} />

            <div className="font-scada tablet:text-base text-center text-xs leading-[140%] font-bold text-black">
              {card.text}
            </div>
          </div>
        );
      })}
    </div>
  );
};
