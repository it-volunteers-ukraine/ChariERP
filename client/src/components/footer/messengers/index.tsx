import Link from 'next/link';

import { cn } from '@/utils';

import { ISocial } from '../config';

export interface IMessengers extends ISocial {
  icon?: string;
}

export const Messengers = ({ Icon, link, icon }: IMessengers) => {
  return (
    <Link href={link} className={cn('active:text-b text-white transition-all duration-300 hover:text-dark-blue', icon)}>
      <Icon />
    </Link>
  );
};
