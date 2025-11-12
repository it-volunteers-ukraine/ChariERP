'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { routes } from '@/constants';
import { Search } from '@/assets/icons';
import { isValidObjectId } from '@/proxy';
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
    <header className="bg-header-gradient desktop:py-[10px] top-0 z-2 w-full py-2">
      <div className="container-chari flex items-center justify-between gap-8">
        <Logo />

        <ResponseWrapper endpoint="isDesktop">
          <Navigation inHeader className="desktop:flex hidden" />
        </ResponseWrapper>

        <div className="desktop:gap-3 flex items-center gap-8">
          <ResponseWrapper endpoint="isDesktop">
            {!isLoggedIn && (
              <Button
                isNarrow
                styleType="secondary"
                text={auth('registration')}
                className="desktop:flex hidden"
                onClick={() => router.push(routes.registration)}
              />
            )}

            <Button
              isNarrow
              styleType="secondary"
              text={auth('login')}
              className="desktop:flex desktopXl:flex hidden"
              onClick={() => router.push(routes.login)}
            />
          </ResponseWrapper>

          <Search className="desktop:ml-3 desktop:mr-3 ml-auto aspect-square w-[18px] cursor-pointer text-white hover:drop-shadow-xs" />

          <ResponseWrapper endpoint="isNotDesktop">
            <Burger isLoggedIn={isLoggedIn} />
          </ResponseWrapper>

          <LanguageSwitcher isNarrow className="desktop:flex hidden" />
        </div>
      </div>
    </header>
  );
};
