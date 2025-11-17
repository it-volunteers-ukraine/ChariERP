'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { routes } from '@/constants';
import { isValidObjectId } from '@/proxy';

import { Logo } from '../logo';
import { config } from './config';
import { Button } from '../button';
import { Navigate } from './navigate';
import { Messengers } from './messengers';

export const Footer = () => {
  const router = useRouter();
  const footer = useTranslations('footer');
  const auth = useTranslations('auth-page.links');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const id = Cookies.get('id') || '';

    setIsLoggedIn(isValidObjectId(id));
  }, []);

  const { social, navigate } = config;

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-board-aside tablet:gap-12 tablet:px-8 tablet:pt-14 laptop:px-9 desktop:gap-10 desktop:px-[136px] desktopXl:px-[92px] flex w-full flex-col gap-14 px-4 py-8">
      <div className="tablet:flex-row tablet:gap-0 flex flex-col justify-between gap-10">
        <div className="flex flex-col gap-6">
          <Logo className="desktop:pl-1" />

          <div className="flex gap-x-2">
            {social.map((item, idx) => (
              <Messengers key={`social_${idx}`} {...item} />
            ))}
          </div>
        </div>

        <div className="laptop:ml-18 tablet:ml-[120px] desktop:ml-auto desktop:flex-row desktop:gap-16 desktopXl:gap-[108px] flex flex-col gap-4 lg:mr-0 lg:flex-row lg:gap-8">
          {navigate.map((item, idx) => (
            <Navigate key={`navigate_${idx}`} {...item} />
          ))}
        </div>

        <div className="tablet:ml-auto tablet:gap-6 laptop:gap-8 desktop:ml-auto desktop:gap-6 desktopXl:gap-8 flex shrink-0 gap-14">
          <Button
            styleType="secondary"
            text={auth('login')}
            className="h-fit px-2 uppercase"
            onClick={() => router.push(routes.login)}
          />

          {!isLoggedIn && (
            <Button
              styleType="secondary"
              text={auth('registration')}
              className="h-fit px-2 uppercase"
              onClick={() => router.push(routes.registration)}
            />
          )}
        </div>
      </div>
      <Link href={routes.privacyPolicy} className="font-montserrat block text-center text-xs text-white">
        © {currentYear} ChariERP, {footer('privacyPolicy')}
      </Link>
    </footer>
  );
};
