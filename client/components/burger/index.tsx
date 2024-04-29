'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { routes } from '@/constants';
import { Button, LanguageSwitcher, Navigation } from '@/components';

import { getStyles } from './styles';

export const Burger = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const { burger, nav } = getStyles({ isActive });

  return (
    <>
      <button className={burger} onClick={() => setIsActive(!isActive)}>
        <span className="bar-top"></span>
        <span className="bar-mid"></span>
        <span className="bar-bot"></span>
      </button>

      <nav className={nav}>
        <div className="flex flex-col gap-[45px]">
          <Navigation />

          <div className="flex justify-between gap-[13px_35px] flex-wrap">
            <Button
              text="РЕЄСТРАЦІЯ"
              styleType="secondary"
              onClick={() => router.push(routes.registration)}
            />
            <Button
              text="ВХІД"
              styleType="outline"
              onClick={() => router.push(routes.login)}
              className="min-w-[138px] tablet:min-w-[89px]"
            />
            <LanguageSwitcher className="tablet:ml-auto" />
          </div>
        </div>
      </nav>
    </>
  );
};
