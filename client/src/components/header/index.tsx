'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { routes } from '@/constants';
import { Search } from '@/assets/icons';
import { Logo, Burger, Button, Navigation, ResponseWrapper, LanguageSwitcher } from '@/components';

interface IHeaderProps {
  isLoggedIn?: boolean;
}

export const Header = ({ isLoggedIn }: IHeaderProps) => {
  const router = useRouter();
  const auth = useTranslations('auth-page.links');

  return (
    <header className="top-0 z-[2] w-full bg-header-gradient py-[19px] desktop:py-[21px]">
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
