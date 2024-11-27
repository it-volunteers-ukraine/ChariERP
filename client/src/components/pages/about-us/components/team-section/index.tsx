import { Title } from '@/components/title';
import { useTranslations } from 'next-intl';
import { Card } from './card';

export const TeamSection = () => {
  const text = useTranslations('aboutUsPage');

  return (
    <section className="pb-16 tablet:pb-24 desktop:pb-[132px]">
      <div>
        <Title
          title={text('teamTitle')}
          className="mb-4 text-center font-scada text-[24px] font-bold uppercase leading-7 tablet:text-[32px] tablet:leading-[38px] desktop:leading-[43px]"
        />
        <p className="mb-12 text-center text-[16px] leading-[24px] tracking-[0.5px] text-blueGreen desktop:mb-16">
          {text('team')}
        </p>
        <div>
          <Card />
        </div>
      </div>
    </section>
  );
};
