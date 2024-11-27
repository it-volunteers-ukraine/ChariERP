import Link from 'next/link';
import clsx from 'clsx';

import { LogoIcon } from '@/assets/icons';

import { ILogoProps } from './types';

export const Logo = ({ to, onClick, className, logoClass }: ILogoProps) => {
  return (
    <Link
      onClick={onClick}
      href={to ? to : '/'}
      className={clsx('group/logo block h-[44px] max-w-[140px] text-white desktop:h-[44px] desktop:max-w-[140px]', {
        [`${className}`]: className,
      })}
    >
      <LogoIcon
        className={clsx(
          'h-[44px] max-w-[140px] transition-all duration-200 group-hover/logo:drop-shadow-logo desktop:h-[44px] desktop:max-w-[140px]',
          {
            [`${logoClass}`]: logoClass,
          },
        )}
      />
    </Link>
  );
};
