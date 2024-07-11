'use client';
import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Logo } from '@/components';
import { Prev } from '@/assets/icons';
import { useOutsideClick, useWindowWidth } from '@/hooks';

import { NavItem } from './item';
import { getLinks } from './config';
import { getStyles } from './styles';

export const DashboardAside = () => {
  const ref = useRef(null);
  const { isDesktop } = useWindowWidth();
  const linkText = useTranslations('auth-page.links');

  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick(ref, () => {
    if (!isDesktop) setIsOpen(false);
  });

  const links = getLinks({
    request: linkText('requests'),
    rejected: linkText('rejected'),
    organizations: linkText('organizations'),
  });

  const styles = getStyles(isOpen);

  return (
    <aside className={styles.aside} ref={ref}>
      <div className="flex items-center w-full h-24 border-b border-b-white pl-[40px]">
        <Logo logoClass="!w-[124px] h-[34px]" />
      </div>

      <nav className="p-[44px_36px] flex flex-col">
        {links.map(({ text, href, icon, disabled }) => (
          <NavItem
            key={href}
            href={href}
            text={text}
            Icon={icon}
            disabled={disabled}
          />
        ))}
      </nav>

      <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        <Prev className={styles.icon} />
      </button>
    </aside>
  );
};
