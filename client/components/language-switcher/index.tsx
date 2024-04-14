import { useState } from 'react';

import { Icon } from '@/assets';

import { getStyles } from './styles';
import { ILanguageSwitcherProps } from './types';

export const LanguageSwitcher = ({
  isNarrow,
  className,
}: ILanguageSwitcherProps) => {
  const [activeLanguage, setActiveLanguage] = useState<'en' | 'ua'>('en');

  const { en, ua, icon, iconWrapper, wrapper, span } = getStyles({
    isNarrow: isNarrow,
    activeLanguage: activeLanguage,
    className,
  });

  const handleClick = () => {
    setActiveLanguage(activeLanguage === 'en' ? 'ua' : 'en');
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
