'use client';
import { Fragment, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useRole } from '@/context';
import { Exit, JamMenu } from '@/assets/icons';
import { LanguageSwitcher, Logo } from '@/components';
import { useOutsideClick, useWindowWidth } from '@/hooks';

import { NavItem } from './item';
import { getStyles } from './styles';
import { getLinksByRole } from './config';

export const DashboardAside = () => {
  const ref = useRef(null);
  const { role } = useRole();
  const router = useRouter();
  const { isTablet } = useWindowWidth();
  const { isDesktop } = useWindowWidth();
  const linkText = useTranslations('sidebar');

  const [isOpen, setIsOpen] = useState(false);

  useOutsideClick(ref, () => {
    if (!isDesktop) setIsOpen(false);
  });

  const links = getLinksByRole(role, (key, params) => linkText(key, params));

  const styles = getStyles(isOpen);

  const onExit = () => {
    Cookies.remove('id');
    router.push('/');
  };

  return (
    <aside className={styles.aside} ref={ref}>
      <div>
        <div className="flex items-center w-full h-[64px] desktop:h-[96px] border-b border-b-white pl-[16px] tablet:pl-[32px]">
          <Logo />
        </div>

        <nav className="p-[16px] pb-0 tablet:px-[32px] desktop:px-[36px] desktop:pt-[42px] flex flex-col">
          {links.map(({ text, href, icon, disabled, children }, i) => {
            return (
              <Fragment key={`${href}_${i}`}>
                <NavItem
                  href={children ? '#' : href}
                  text={text}
                  Icon={icon}
                  disabled={disabled}
                  onCloseSideBar={() => setIsOpen(!isOpen)}
                />

                {children &&
                  children.map(({ text, href, icon, disabled }) => (
                    <NavItem
                      key={href}
                      href={href}
                      text={text}
                      Icon={icon}
                      disabled={disabled}
                      onCloseSideBar={() => setIsOpen(!isOpen)}
                    />
                  ))}
              </Fragment>
            );
          })}
        </nav>
      </div>
      {!isTablet && (
        <div className="flex items-center justify-between w-full h-[88px] border-t border-t-white pl-4 pr-4 tablet:px-[32px]">
          <LanguageSwitcher className="flex" />
          <button
            className="flex gap-3 items-center text-base text-white transition-all duration-300 cursor-pointer hover:scale-110 hover:drop-shadow-md"
            onClick={onExit}
          >
            {linkText('exit')}
            <Exit className="w-10 h-10" />
          </button>
        </div>
      )}

      <button className={styles.button} onClick={() => setIsOpen(!isOpen)}>
        <JamMenu className={styles.icon} />
      </button>
    </aside>
  );
};
