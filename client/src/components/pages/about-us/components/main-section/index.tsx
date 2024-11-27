import Image from 'next/image';

import { AboutUsMain } from '@/assets/img';
import { Title } from '@/components/title';
import { useTranslations } from 'next-intl';

export const MainSection = () => {
  const text = useTranslations('aboutUsPage');

  return (
    <section className="pb-16 tablet:pb-24 desktop:flex desktop:gap-10 desktop:pb-[132px]">
      <Image
        alt="bg"
        priority={true}
        src={AboutUsMain}
        className="mx-auto mb-8 w-full rounded-2xl object-cover tablet:h-[320px] tablet:w-[490px] tablet:rounded-3xl laptop:h-[326px] laptop:w-[500px] desktop:mb-0 desktop:h-[366px] desktop:w-[562px] desktopXl:h-[360px] desktopXl:w-[552px]"
      />
      <div>
        <Title
          title={text('historyTitle')}
          className="mb-4 text-center font-scada text-[24px] font-bold uppercase leading-7 tablet:text-[32px] tablet:leading-[38px] desktop:text-left desktop:leading-[43px]"
        />
        <p className="text-[16px] leading-[26px] text-blueGreen">{text('history')}</p>
      </div>
    </section>
  );
};
