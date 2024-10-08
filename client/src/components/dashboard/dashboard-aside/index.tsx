'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';

import { useUserInfo } from '@/context';
import { Exit, JamMenu } from '@/assets/icons';
import { LanguageSwitcher, Logo } from '@/components';
import { useOutsideClick, useWindowWidth } from '@/hooks';

import { NavItem } from './item';
import { getStyles } from './styles';
import { getLinksByRole } from './config';

const duration = 500;

export const DashboardAside = () => {
  const ref = useRef(null);
  const refChildrenLink = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const { role } = useUserInfo();
  const { isDesktop } = useWindowWidth();
  const linkText = useTranslations('sidebar');

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isOpenChildrenLinks, setIsOpenChildrenLinks] = useState(true);
  const [heightChildren, setHeightChildren] = useState(() => (isOpenChildrenLinks ? 'none' : '0px'));
  const [opacityChildren, setOpacityChildren] = useState(() => (isOpenChildrenLinks ? '1' : '0'));

  useOutsideClick(ref, () => {
    if (!isDesktop) setIsOpenSidebar(false);
  });

  const links = getLinksByRole((key, params) => linkText(key, params), role);

  const styles = getStyles(isOpenSidebar);

  const onExit = () => {
    Cookies.remove('id');
    router.push('/');
  };

  const onAccordion = () => {
    setIsOpenChildrenLinks(!isOpenChildrenLinks);
  };

  useEffect(() => {
    const element = refChildrenLink.current;

    if (element) {
      const currentHeight = isOpenChildrenLinks ? `${element.scrollHeight}px` : '0px';
      const currentOpacity = isOpenChildrenLinks ? '1' : '0';

      if (currentHeight !== heightChildren) {
        setHeightChildren(currentHeight);
      }

      if (currentOpacity !== opacityChildren) {
        setOpacityChildren(currentOpacity);
      }
    }
  }, [isOpenChildrenLinks, duration, heightChildren, refChildrenLink.current]);

  return (
    <aside className={styles.aside} ref={ref}>
      <div>
        <div className="flex h-[64px] w-full items-center border-b border-b-white pl-[16px] tablet:pl-[32px] desktop:h-[96px]">
          <Logo />
        </div>

        <nav className="flex flex-col gap-3 p-[16px] pb-0 tablet:px-[32px] desktop:px-[36px] desktop:pt-[42px]">
          {links.map(({ text, href, icon, disabled, children }, idx) => {
            return (
              <Fragment key={`${href}_${idx}`}>
                <NavItem
                  text={text}
                  Icon={icon}
                  href={href}
                  disabled={disabled}
                  isParent={!!children}
                  isOpen={children && isOpenChildrenLinks}
                  onCloseSideBar={() => setIsOpenSidebar(false)}
                  setIsOpen={() => (children ? onAccordion() : undefined)}
                />

                {children && (
                  <div
                    ref={refChildrenLink}
                    className={`-my-1 flex flex-col gap-2 overflow-hidden transition-all ease-in-out`}
                    style={{
                      opacity: `${opacityChildren}`,
                      maxHeight: `${heightChildren}`,
                      transition: `max-height ${duration}ms ease, opacity ${duration + 100}ms ease`,
                    }}
                  >
                    {children.map(({ text, href, icon, disabled }, index) => (
                      <NavItem
                        isChildren
                        href={href}
                        text={text}
                        Icon={icon}
                        disabled={disabled}
                        key={`${href}_${index}_${idx}`}
                        onCloseSideBar={() => setIsOpenSidebar(false)}
                      />
                    ))}
                  </div>
                )}
              </Fragment>
            );
          })}
        </nav>
      </div>

      <div className="flex h-[88px] w-full items-center justify-between border-t border-t-white px-4 tablet:hidden tablet:px-8">
        <LanguageSwitcher />
        <button
          onClick={onExit}
          className="flex cursor-pointer items-center gap-3 text-base text-white transition-all duration-300 hover:scale-110 hover:drop-shadow-md"
        >
          {linkText('exit')}
          <Exit className="h-10 w-10" />
        </button>
      </div>

      <button className={styles.button} onClick={() => setIsOpenSidebar(!isOpenSidebar)}>
        <JamMenu className={styles.icon} />
      </button>
    </aside>
  );
};
