'use client';

import { JSX, useState } from 'react';
import Cookies from 'js-cookie';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';

import { UA, EN } from '@/assets/icons';
import { ActiveLanguage } from '@/types';
import { cookiesLocale } from '@/constants';

import { getStyles } from './styles';
import { ILanguageSwitcherProps } from './types';

export const LanguageSwitcher = ({ isNarrow, className }: ILanguageSwitcherProps): JSX.Element => {
  const local = useLocale();
  const router = useRouter();

  const [activeLanguage, setActiveLanguage] = useState<ActiveLanguage>(local as ActiveLanguage);

  const { en, ua, icon, iconWrapper, wrapper, span } = getStyles({
    isNarrow,
    className,
    activeLanguage,
  });

  const handleClick = () => {
    const newLanguage = activeLanguage === ActiveLanguage.EN ? ActiveLanguage.UA : ActiveLanguage.EN;

    setActiveLanguage(newLanguage);

    Cookies.set(cookiesLocale, newLanguage, { expires: 365 });

    router.refresh();
  };

  return (
    <div onClick={handleClick} className={wrapper}>
      <span className={span}>EN</span>
      <span className={span}>UA</span>

      <div className={iconWrapper}>
        <UA className={`${icon} ${ua}`} />
        <EN className={`${icon} ${en}`} />
      </div>
    </div>
  );
};
