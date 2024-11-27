'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { routes } from '@/constants';
import { Search } from '@/assets/icons';
import { isValidObjectId } from '@/middleware';
import { Logo, Burger, Button, Navigation, ResponseWrapper, LanguageSwitcher } from '@/components';

export const Header = () => {
  const router = useRouter();
  const auth = useTranslations('auth-page.links');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const id = Cookies.get('id') || '';

    setIsLoggedIn(isValidObjectId(id));
  }, []);

  return (
    <header className="top-0 z-[2] w-full bg-header-gradient py-[8px] desktop:py-[10px]">
      <div className="container-chari flex items-center justify-between gap-8">
        <Logo />

        <ResponseWrapper endpoint="isDesktop">
          <Navigation inHeader className="hidden desktop:flex" />
        </ResponseWrapper>

        <div className="flex items-center gap-8 desktop:gap-3">
          <ResponseWrapper endpoint="isDesktop">
            {!isLoggedIn && (
              <Button
                isNarrow
                styleType="secondary"
                text={auth('registration')}
                className="hidden desktop:flex"
                onClick={() => router.push(routes.registration)}
              />
            )}

            <Button
              isNarrow
              styleType="outline"
              text={auth('login')}
              className="hidden desktop:flex desktopXl:flex"
              onClick={() => router.push(routes.login)}
            />
          </ResponseWrapper>

          <Search className="ml-auto aspect-[1/1] w-[18px] cursor-pointer text-white hover:drop-shadow-sm desktop:ml-3 desktop:mr-3" />

          <ResponseWrapper endpoint="isNotDesktop">
            <Burger isLoggedIn={isLoggedIn} />
          </ResponseWrapper>

          <LanguageSwitcher isNarrow className="hidden desktop:flex" />
        </div>
      </div>
    </header>
  );
};
