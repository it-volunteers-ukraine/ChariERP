import Link from 'next/link';

import { Icon } from '@/assets';

import { ILogoProps } from './types';

export const Logo = ({ to, onClick }: ILogoProps) => {
  return (
    <Link
      onClick={onClick}
      href={to ? to : ''}
      className="group/logo block w-[68px] h-[23px] text-white"
    >
      <Icon.Logo className="transition-all duration-200 group-hover/logo:drop-shadow-logo w-[68px] h-[23px]" />
    </Link>
  );
};
