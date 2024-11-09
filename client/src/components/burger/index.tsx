'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { routes } from '@/constants';
import { useOutsideClick } from '@/hooks';
import { Button, LanguageSwitcher, Navigation } from '@/components';

import { getStyles } from './styles';

export const Burger = () => {
  const ref = useRef(null);
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const { burger, nav } = getStyles({ isActive });
  const auth = useTranslations('auth-page.links');

  useOutsideClick(() => setIsActive(false), ref);

  const onHandleClick = async (route: string) => {
    await router.push(route);
    setIsActive(false);
  };

  return (
    <>
      <button className={burger} onClick={() => setIsActive(!isActive)}>
        <span className="bar-top"></span>
        <span className="bar-mid"></span>
        <span className="bar-bot"></span>
      </button>

      <nav className={nav} ref={ref}>
        <div className="flex flex-col gap-[45px]">
          <Navigation onBurgerClose={() => setIsActive(false)} />

          <div className="flex flex-wrap justify-between gap-[13px_35px]">
            <Button
              styleType="secondary"
              className="uppercase"
              text={auth('registration')}
              onClick={() => onHandleClick(routes.registration)}
            />

            <Button
              styleType="outline"
              text={auth('login')}
              onClick={() => onHandleClick(routes.login)}
              className="min-w-[138px] uppercase tablet:min-w-[89px]"
            />
            <LanguageSwitcher className="tablet:ml-auto" />
          </div>
        </div>
      </nav>
    </>
  );
};
