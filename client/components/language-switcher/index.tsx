import { useState } from 'react';

import { Icon } from '@/assets';

import { getStyles } from './styles';
import { ActiveLanguage, ILanguageSwitcherProps } from './types';

export const LanguageSwitcher = ({
  isNarrow,
  className,
}: ILanguageSwitcherProps) => {
  const [activeLanguage, setActiveLanguage] = useState<ActiveLanguage>(
    ActiveLanguage.UA,
  );

  const { en, ua, icon, iconWrapper, wrapper, span } = getStyles({
    isNarrow: isNarrow,
    activeLanguage: activeLanguage,
    className,
  });

  const handleClick = () => {
    setActiveLanguage(
      activeLanguage === ActiveLanguage.EN
        ? ActiveLanguage.UA
        : ActiveLanguage.EN,
    );
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
