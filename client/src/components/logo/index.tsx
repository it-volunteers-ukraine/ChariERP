import Link from 'next/link';
import clsx from 'clsx';

import { LogoIcon } from '@/assets/icons';

import { ILogoProps } from './types';

export const Logo = ({ to, onClick, className, logoClass }: ILogoProps) => {
  return (
    <Link
      onClick={onClick}
      href={to ? to : '/'}
      className={clsx('group/logo block w-[66px] h-[20px] desktop:w-[113px] desktop:h-[34px] text-white', {
        [`${className}`]: className,
      })}
    >
      <LogoIcon
        className={clsx(
          'transition-all duration-200 group-hover/logo:drop-shadow-logo w-[66px] h-[20px] desktop:w-[113px] desktop:h-[34px]',
          {
            [`${logoClass}`]: logoClass,
          },
        )}
      />
    </Link>
  );
};
