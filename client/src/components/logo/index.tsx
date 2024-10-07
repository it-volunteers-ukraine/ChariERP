import Link from 'next/link';
import clsx from 'clsx';

import { LogoIcon } from '@/assets/icons';

import { ILogoProps } from './types';

export const Logo = ({ to, onClick, className, logoClass }: ILogoProps) => {
  return (
    <Link
      onClick={onClick}
      href={to ? to : '/'}
      className={clsx('group/logo block h-[20px] w-[66px] text-white desktop:h-[34px] desktop:w-[113px]', {
        [`${className}`]: className,
      })}
    >
      <LogoIcon
        className={clsx(
          'h-[20px] w-[66px] transition-all duration-200 group-hover/logo:drop-shadow-logo desktop:h-[34px] desktop:w-[113px]',
          {
            [`${logoClass}`]: logoClass,
          },
        )}
      />
    </Link>
  );
};
