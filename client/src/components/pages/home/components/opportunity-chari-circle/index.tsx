import { useTranslations } from 'next-intl';

import { Title } from './title';
import { ButtonsCircle } from './buttons';

export const OpportunityChariCircle = () => {
  const text = useTranslations('homePage.opportunityChariCircle');

  return (
    <div className="overflow-hidden py-[15px]">
      <Title text={text('title')} className="m-auto block max-w-[202px] pb-12 text-2xl tablet:hidden" />

      <div className="relative m-auto flex w-fit items-center justify-center">
        <Title
          text={text('title')}
          className="absolute z-20 hidden text-[36px] tablet:block tablet:max-w-[202px] tablet:text-[32px] laptop:text-4xl desktop:text-[50px]"
        />

        <ButtonsCircle />
      </div>
    </div>
  );
};
