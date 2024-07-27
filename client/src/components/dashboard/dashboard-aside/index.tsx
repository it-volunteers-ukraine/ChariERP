'use client';
import { Fragment, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { Logo } from '@/components';
import { useRole } from '@/context';
import { Prev } from '@/assets/icons';
import { useOutsideClick, useWindowWidth } from '@/hooks';

import { NavItem } from './item';
import { getStyles } from './styles';
import { getLinksByRole } from './config';

export const DashboardAside = () => {
  const ref = useRef(null);
  const { role } = useRole();
  const { isDesktop } = useWindowWidth();
  const linkText = useTranslations('sidebar');

  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick(ref, () => {
    if (!isDesktop) setIsOpen(false);
  });

  const links = getLinksByRole(role, (key, params) => linkText(key, params));

  const styles = getStyles(isOpen);

  return (
    <aside className={styles.aside} ref={ref}>
      <div className="flex items-center w-full h-24 border-b border-b-white pl-[40px]">
        <Logo logoClass="!w-[124px] h-[34px]" />
      </div>

      <nav className="p-[44px_36px] flex flex-col">
        {links.map(({ text, href, icon, disabled, children }, i) => {
          return (
            <Fragment key={`${href}_${i}`}>
              <NavItem href={children ? '#' : href} text={text} Icon={icon} disabled={disabled} />

              {children &&
                children.map(({ text, href, icon, disabled }) => (
                  <NavItem key={href} href={href} text={text} Icon={icon} disabled={disabled} />
                ))}
            </Fragment>
          );
        })}
      </nav>

      <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        <Prev className={styles.icon} />
      </button>
    </aside>
  );
};
