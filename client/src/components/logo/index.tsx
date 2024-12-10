import Link from 'next/link';

import { cn } from '@/utils';
import { routes } from '@/constants';
import { LogoIcon } from '@/assets/icons';

import { ILogoProps } from './types';

export const Logo = ({ to, onClick, className, logoClass }: ILogoProps) => {
  return (
    <Link
      onClick={onClick}
      href={to ? to : routes.home}
      className={cn(
        'group/logo block h-11 max-w-[140px] text-white desktop:h-11 desktop:max-w-[140px]',
        !!className && className,
      )}
    >
      <LogoIcon
        className={cn(
          'h-11 max-w-[140px] transition-all duration-200 group-hover/logo:drop-shadow-logo desktop:h-11 desktop:max-w-[140px]',
          !!logoClass && logoClass,
        )}
      />
    </Link>
  );
};
