'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { Logo } from '../logo';
import { Button } from '../button';

import { Navigate } from './navigate';
import { Messengers } from './messengers';
import { config } from './config';
import { routes } from '@/constants';
import { useTranslations } from 'next-intl';

export const Footer = () => {
  const router = useRouter();
  const auth = useTranslations('auth-page.links');

  const { social, navigate } = config;

  return (
    <footer className="flex w-full flex-col gap-14 bg-boardAside px-4 py-8 tablet:gap-12 tablet:px-8 tablet:pt-14 laptop:px-9 desktop:gap-10 desktop:px-[136px] desktopXl:px-[92px]">
      <div className="flex flex-col justify-between gap-10 tablet:flex-row tablet:gap-16 desktop:gap-0">
        <div className="flex flex-col gap-6">
          <Logo className="desktop:pl-1" />

          <div className="flex gap-x-2">
            {social.map((item, idx) => (
              <Messengers key={item.id + '_' + idx} {...item} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 tablet:mr-7 lg:mr-10 lg:flex-row lg:gap-8 desktop:mr-0 desktop:flex-row desktop:gap-16 desktopXl:gap-[108px]">
          {navigate.map((item, idx) => (
            <Navigate key={item.id + '_' + idx} {...item} />
          ))}
        </div>

        <div className="flex shrink-0 gap-14 tablet:gap-6 laptop:gap-8 desktop:gap-6 desktopXl:gap-8">
          <Button
            styleType="outline"
            text={auth('login')}
            onClick={() => router.push(routes.login)}
            className="h-fit px-2 uppercase"
          />
          <Button
            styleType="secondary"
            text={auth('registration')}
            onClick={() => router.push(routes.registration)}
            className="h-fit px-2 uppercase"
          />
        </div>
      </div>
      {
        // TODO add a root to the privacy policy line
      }
      <Link href={'#'} className="block text-center font-scada text-xs text-white">
        © 2023 Charli, All Right Reserved
      </Link>
    </footer>
  );
};
