'use client';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { Search } from '@/assets/icons';
import {
  Logo,
  Burger,
  Button,
  Checkbox,
  Navigation,
  LanguageSwitcher,
} from '@/components';
import { routes } from '@/constants';
import { useState } from 'react';

export const Header = () => {
  const router = useRouter();
  const auth = useTranslations('auth-page.links');
  const [checked, setChecked] = useState<boolean>(true);

  return (
    <header className="fixed w-full top-0 bg-header-gradient py-[19px] desktop:py-[21px]">
      <div className="flex items-center justify-between gap-8 container-chari">
        <Logo />

        <Checkbox
          type="checkbox"
          // error={true}
          // disabled={true}
          checked={checked}
          hrefText="Політикою конфіденційності"
          onChange={() => setChecked(!checked)}
          label="Я погоджуюсь на обробку персональних даних згідно з"
        />

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

          <Search className="w-[18px] aspect-[1/1] text-white cursor-pointer hover:drop-shadow-sm ml-auto desktop:ml-3 desktop:mr-3" />

          <Burger />

          <LanguageSwitcher isNarrow className="hidden desktop:flex" />
        </div>
      </div>
    </header>
  );
};
