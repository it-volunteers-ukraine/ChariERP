import { useTranslations } from 'next-intl';

import { Title } from './title';
import { cardsData } from './mock';

export const OpportunityChariCircle = () => {
  const text = useTranslations('homePage.opportunityChariCircle');
  const cards = cardsData(text);
  const iconWidth = 'w-[106px] tablet:w-[184px] laptop:w-[208px] desktop:w-[258px]';

  return (
    <div>
      <Title text={text('title')} className="m-auto block max-w-[202px] pb-[48px] text-[24px] tablet:hidden" />

      <div className="relative m-auto flex w-fit items-center justify-center">
        <Title
          text={text('title')}
          className="absolute z-20 hidden tablet:block tablet:max-w-[202px] tablet:text-[32px] laptop:max-w-[227px] laptop:text-[36px] desktop:max-w-[315px] desktop:text-[50px]"
        />

        <div className="relative box-border h-[330px] w-[330px] rotate-[-90deg] tablet:h-[698px] tablet:w-[698px] tablet:animate-spinner laptop:h-[771px] laptop:w-[771px] desktop:h-[991px] desktop:w-[991px]">
          {cards.map((card, index) => {
            const radius = 37;
            const angle = index * 2 * Math.PI * (1 / cards.length);

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

                <div className="text-center font-scada text-[12px] font-bold leading-[140%] text-black tablet:text-[16px] desktop:text-[24px]">
                  {card.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
