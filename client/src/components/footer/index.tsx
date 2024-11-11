'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { routes } from '@/constants';

import { Logo } from '../logo';
import { config } from './config';
import { Button } from '../button';
import { Navigate } from './navigate';
import { Messengers } from './messengers';

export const Footer = () => {
  const router = useRouter();
  const footer = useTranslations('footer');
  const auth = useTranslations('auth-page.links');

  const { social, navigate } = config;

  return (
    <footer className="flex w-full flex-col gap-14 bg-boardAside px-4 py-8 tablet:gap-12 tablet:px-8 tablet:pt-14 laptop:px-9 desktop:gap-10 desktop:px-[136px] desktopXl:px-[92px]">
      <div className="flex flex-col justify-between gap-10 tablet:flex-row tablet:gap-0">
        <div className="flex flex-col gap-6">
          <Logo className="desktop:pl-1" />

          <div className="flex gap-x-2">
            {social.map((item, idx) => (
              <Messengers key={`social_${idx}`} {...item} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 tablet:pr-8 laptop:pr-0 lg:mr-0 lg:flex-row lg:gap-8 desktop:flex-row desktop:gap-16 desktopXl:gap-[108px]">
          {navigate.map((item, idx) => (
            <Navigate key={`navigate_${idx}`} {...item} />
          ))}
        </div>

        <div className="flex shrink-0 gap-14 tablet:gap-6 laptop:gap-8 desktop:gap-6 desktopXl:gap-8">
          <Button
            styleType="outline"
            text={auth('login')}
            className="h-fit px-2 uppercase"
            onClick={() => router.push(routes.login)}
          />

          <Button
            styleType="secondary"
            text={auth('registration')}
            className="h-fit px-2 uppercase"
            onClick={() => router.push(routes.registration)}
          />
        </div>
      </div>
      <Link href={routes.privacyPolicy} className="block text-center font-scada text-xs text-white">
        © 2024 ChariERP, {footer('privacyPolicy')}
      </Link>
    </footer>
  );
};
