'use client';
import { useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import { UA, EN } from '@/assets/icons';

import { getStyles } from './styles';
import { ActiveLanguage, ILanguageSwitcherProps } from './types';

export const LanguageSwitcher = ({
  isNarrow,
  className,
}: ILanguageSwitcherProps): JSX.Element => {
  const local = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const [activeLanguage, setActiveLanguage] = useState<ActiveLanguage>(
    local as ActiveLanguage,
  );

  const { en, ua, icon, iconWrapper, wrapper, span } = getStyles({
    isNarrow: isNarrow,
    activeLanguage: activeLanguage,
    className,
  });

  const handleClick = () => {
    const newLanguage =
      activeLanguage === ActiveLanguage.EN
        ? ActiveLanguage.UA
        : ActiveLanguage.EN;

    setActiveLanguage(newLanguage);

    const path = pathname.replace(local, newLanguage);

    router.replace(path);
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
