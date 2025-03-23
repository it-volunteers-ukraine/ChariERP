'use client';

import { Fragment, useEffect, useRef, useState } from 'react';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';

import { clearUserCookies, cn } from '@/utils';
import { Exit, JamMenu } from '@/assets/icons';
import { routes, boardState } from '@/constants';
import { useBoards, useUserInfo } from '@/context';
import { LanguageSwitcher, Logo } from '@/components';
import { useOutsideClick, useWindowWidth } from '@/hooks';
import { useMoveBoards } from '@/components/pages/dashboards/api';

import { NavItem } from './item';
import { getStyles } from './styles';
import { getBoolean } from './helper';
import { getLinksByRole } from './config';

const duration = 500;

export const DashboardAside = () => {
  const ref = useRef(null);
  const refChildrenLink = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const path = usePathname();
  const { role, _id, isManager } = useUserInfo();
  const { isDesktop } = useWindowWidth();
  const linkText = useTranslations('sidebar');

  const boardsState = getBoolean(Cookies.get(boardState));

  const [isOpenSidebar, setIsOpenSidebar] = useState(false);
  const [isOpenChildrenLinks, setIsOpenChildrenLinks] = useState(boardsState);
  const [heightChildren, setHeightChildren] = useState(() => (isOpenChildrenLinks ? 'none' : '0px'));
  const [opacityChildren, setOpacityChildren] = useState(() => (isOpenChildrenLinks ? '1' : '0'));

  const id = _id ? String(_id) : undefined;

  const { response, setBoards } = useBoards(id, path);
  const { onMoveDragEndSmall } = useMoveBoards(id);

  const boards =
    response.map((item) => ({
      title: `#${item.order} ${item.title}`,
      href: `${routes.managerDashboard}/${item._id}`,
    })) || [];

  useOutsideClick(() => {
    if (!isDesktop) setIsOpenSidebar(false);
  }, ref);

  const links = getLinksByRole(linkText, role, boards);

  const styles = getStyles(isOpenSidebar);

  const onExit = () => {
    clearUserCookies();
    router.push(routes.home);
  };

  const onAccordion = () => {
    setIsOpenChildrenLinks((prev) => {
      const newState = !prev;

      if (newState) {
        Cookies.set(boardState, 'true', { expires: 365 });
      } else {
        Cookies.set(boardState, 'false', { expires: 365 });
      }

      return newState;
    });
  };

  useEffect(() => {
    const element = refChildrenLink.current;

    if (element && response) {
      const currentHeight = isOpenChildrenLinks ? `${element.scrollHeight}px` : '0px';
      const currentOpacity = isOpenChildrenLinks ? '1' : '0';

      if (currentHeight !== heightChildren) {
        setHeightChildren(currentHeight);
      }

      if (currentOpacity !== opacityChildren) {
        setOpacityChildren(currentOpacity);
      }
    }
  }, [isOpenChildrenLinks, heightChildren, refChildrenLink.current, response]);

  return (
    <aside className={styles.aside} ref={ref}>
      <div>
        <div className="flex h-[64px] w-full items-center border-b border-b-white pl-[16px] tablet:pl-[32px] desktop:h-[96px]">
          <Logo />
        </div>

        <nav className="flex flex-col gap-3 p-[16px] pb-0 tablet:px-[32px] desktop:px-[36px] desktop:pt-[42px]">
          {links.map(({ title, href, icon, disabled, children }, idx) => {
            return (
              <Fragment key={`${href}_${idx}`}>
                <NavItem
                  Icon={icon}
                  href={href}
                  title={title}
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
                    <DragDropContext
                      onDragEnd={(result) => onMoveDragEndSmall({ result, boards: response, setBoards })}
                    >
                      <Droppable droppableId="droppable-aside" type="Aside">
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.droppableProps}>
                            {children.map(({ title, href, icon, disabled }, index) => (
                              <Draggable
                                index={index}
                                draggableId={href}
                                isDragDisabled={!isManager}
                                key={`${href}_${index}_${idx}`}
                              >
                                {(providerItem, snapshot) => (
                                  <div
                                    ref={providerItem.innerRef}
                                    {...providerItem.draggableProps}
                                    {...providerItem.dragHandleProps}
                                    className={cn(
                                      snapshot.isDragging && 'rounded-[5px] bg-lightBlue shadow-cardShadow',
                                    )}
                                  >
                                    <NavItem
                                      isChildren
                                      href={href}
                                      Icon={icon}
                                      title={title.toUpperCase()}
                                      disabled={disabled}
                                      key={`${href}_${index}_${idx}`}
                                      onCloseSideBar={() => setIsOpenSidebar(false)}
                                    />
                                  </div>
                                )}
                              </Draggable>
                            ))}
                            <div>{provided.placeholder}</div>
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>
                  </div>
                )}
              </Fragment>
            );
          })}
        </nav>
      </div>

      <div className="flex h-[88px] w-full items-center justify-between border-t border-t-white px-4 laptop:hidden laptop:px-8">
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
