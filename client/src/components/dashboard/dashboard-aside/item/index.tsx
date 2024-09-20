import { MouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { ArrowUp } from '@/assets/icons';

import { getStyles } from './styles';
import { INavItemProps } from './types';

export const NavItem = ({
  Icon,
  text,
  href,
  isOpen,
  disabled,
  isParent,
  setIsOpen,
  isChildren,
  onCloseSideBar,
}: INavItemProps) => {
  const path = usePathname();

  const isActive = path.includes(href);

  const { wrapper, icon, span, svg } = getStyles({
    isOpen,
    isActive,
    disabled,
    isChildren,
  });

  const onRotateArrow = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsOpen && setIsOpen();
  };

  const onClose = () => {
    setTimeout(() => {
      onCloseSideBar();
    }, 400);
  };

  return (
    <Link href={disabled ? '#' : href} className={wrapper} onClick={onClose}>
      {Icon && <Icon width={24} height={24} className={icon} />}

      <span className={span}>{text}</span>

      {isParent && (
        <div className={svg} onClick={(e) => onRotateArrow(e)}>
          <ArrowUp className={icon} width={24} height={24} />
        </div>
      )}
    </Link>
  );
};
