import { useState } from 'react';
import clsx from 'clsx';

import { Icon } from '@/assets';

import { getStyles } from './styles';
import { ILanguageSwitcherProps } from './types';

export const LanguageSwitcher = ({ isNarrow }: ILanguageSwitcherProps) => {
  const [activeLanguage, setActiveLanguage] = useState<'en' | 'ua'>('en');

  const { en, ua, icon, iconWrapper, wrapper } = getStyles({
    isNarrow: isNarrow,
    activeLanguage: activeLanguage,
  });

  const handleClick = () => {
    setActiveLanguage(activeLanguage === 'en' ? 'ua' : 'en');
  };
  return (
    <div onClick={handleClick} className={wrapper}>
      <span className="select-none">EN</span>
      <span className="select-none">UA</span>
      <div className={iconWrapper}>
        <Icon.UA className={`${icon} ${ua}`} />
        <Icon.EN className={`${icon} ${en}`} />
      </div>
    </div>
  );
};
