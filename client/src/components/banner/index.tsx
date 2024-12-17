'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Image, { StaticImageData } from 'next/image';

import { BannerHero } from '@/assets/img';
import { Button } from '../button';
import { routes } from '@/constants';

interface IBanner {
  img?: StaticImageData;
  title?: string;
}

export const Banner = ({ img = BannerHero, title }: IBanner) => {
  const router = useRouter();

  const auth = useTranslations('auth-page.links');
  const content = useTranslations('servicePage.banner');

  return (
    <section className="mb-12 bg-bgBanner p-[32px_4px_48px_16px] tablet:p-[40px_20px_48px_32px] desktop:p-[40px_126px_48px_138px] desktopXl:p-[40px_81px_48px_157px]">
      <div className="container flex flex-col gap-10 tablet:flex-row tablet:gap-6 laptop:items-center laptop:gap-[14px] desktop:mx-auto desktop:max-w-[1164px] desktopXl:max-w-[1670px] desktopXl:gap-[154px]">
        <div className="order-1 w-full max-w-[343px] rounded-[40px] tablet:order-2 tablet:max-w-[340px] laptop:max-w-[450px] desktop:max-w-[486px] desktopXl:max-w-[774px]">
          <Image alt="Image" src={img} priority={true} />
        </div>

        <div className="order-2 flex w-full flex-col items-center gap-8 tablet:order-1 tablet:max-w-[340px] laptop:max-w-[464px] desktop:max-w-[664px] desktopXl:max-w-[740px]">
          <h2 className="text-center font-scada text-2xl/7 font-bold uppercase text-white tablet:text-[32px]/[38px] laptop:text-4xl/[44px] desktop:px-5 desktop:text-[40px]/[48px] desktopXl:text-5xl/[58px]">
            {title ? title : content('title')}
          </h2>

          <div className="flex w-full max-w-[308px] justify-between overflow-hidden object-contain">
            <Button
              styleType="icon-primary"
              text={auth('registration')}
              className="!h-11 w-[122px] px-2 uppercase"
              onClick={() => router.push(routes.registration)}
            />

            <Button
              styleType="icon-secondary"
              text={auth('login')}
              className="!h-11 w-[122px] px-2 uppercase text-dark-blue"
              onClick={() => router.push(routes.login)}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
