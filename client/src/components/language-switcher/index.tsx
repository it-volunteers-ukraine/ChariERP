'use client';
import { useState } from 'react';
import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

import { Icon } from '@/assets';

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
    if (activeLanguage === ActiveLanguage.EN) {
      setActiveLanguage(ActiveLanguage.UA);
      const path = pathname.replace(local, ActiveLanguage.UA);

      router.replace(path);
    }

    if (activeLanguage === ActiveLanguage.UA) {
      setActiveLanguage(ActiveLanguage.EN);
      const path = pathname.replace(local, ActiveLanguage.EN);

      router.replace(path);
    }
  };

  return (
    <div onClick={handleClick} className={wrapper}>
      <span className={span}>EN</span>
      <span className={span}>UA</span>

      <div className={iconWrapper}>
        <Icon.UA className={`${icon} ${ua}`} />
        <Icon.EN className={`${icon} ${en}`} />
      </div>
    </div>
  );
};
