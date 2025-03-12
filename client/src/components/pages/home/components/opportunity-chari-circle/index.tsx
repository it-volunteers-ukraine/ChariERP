import { useTranslations } from 'next-intl';

import { Title } from './title';
import { ButtonsCircle } from './buttons';

export const OpportunityChariCircle = () => {
  const text = useTranslations('homePage.opportunityChariCircle');

  return (
    <div className="overflow-hidden py-[15px]">
      <Title text={text('title')} className="m-auto block max-w-[202px] pb-12 text-2xl uppercase tablet:hidden" />

      <div className="relative m-auto flex w-fit items-center justify-center">
        <Title
          text={text('title')}
          className="absolute z-20 hidden text-[32px] uppercase leading-[140%] tablet:block tablet:max-w-[202px] laptop:max-w-[225px] laptop:text-4xl laptop:text-[36px]"
        />

        <ButtonsCircle />
      </div>
    </div>
  );
};
