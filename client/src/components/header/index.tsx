'use client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Icon } from '@/assets';
import {
  Logo,
  Burger,
  Button,
  Navigation,
  LanguageSwitcher,
} from '@/components';
import { routes } from '@/constants';

export const Header = () => {
  const router = useRouter();
  const auth = useTranslations('auth-page.links');

  return (
    <header className="fixed w-full top-0 bg-header-gradient py-[19px] desktop:py-[21px]">
      <div className="flex items-center justify-between gap-8 container-chari">
        <Logo />

        <Navigation inHeader className="hidden desktop:flex" />

        <div className="flex items-center gap-8 desktop:gap-3">
          <Button
            isNarrow
            styleType="secondary"
            text={auth('registration')}
            className="hidden desktop:flex"
            onClick={() => router.push(routes.registration)}
          />

          <Button
            isNarrow
            styleType="outline"
            text={auth('login')}
            className="hidden desktop:flex"
            onClick={() => router.push(routes.login)}
          />

          <Icon.Search className="w-[18px] aspect-[1/1] text-white cursor-pointer hover:drop-shadow-sm ml-auto desktop:ml-3 desktop:mr-3" />

          <Burger />

          <LanguageSwitcher isNarrow className="hidden desktop:flex" />
        </div>
      </div>
    </header>
  );
};
