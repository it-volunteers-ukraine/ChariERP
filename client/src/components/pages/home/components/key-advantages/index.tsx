import { useTranslations } from 'next-intl';

import { accordionsData } from './mock';
import { Accordion } from './accordion';

export const KeyAdvantages = () => {
  const text = useTranslations('homePage.keyAdvantages');
  const accordions = accordionsData(text);

  return (
    <div className="m-auto flex w-full max-w-[1082px] flex-col gap-12 px-4 tablet:gap-16 tablet:px-8 desktop:gap-[72px]">
      <h1 className="text-center font-scada text-[24px] font-bold uppercase leading-[120%] text-java tablet:text-[32px] laptop:text-[36px] desktop:text-[50px]">
        {text('title')}
      </h1>

      <div className="flex flex-col gap-6 laptop:gap-8">
        {accordions.map((card, index) => (
          <Accordion key={index} title={card.title} description={card.text} />
        ))}
      </div>
    </div>
  );
};
