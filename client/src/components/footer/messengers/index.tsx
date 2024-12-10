import Link from 'next/link';

import { cn } from '@/utils';

import { ISocial } from '../types';

export interface IMessengers extends ISocial {
  icon?: string;
}

export const Messengers = ({ Icon, link, icon, name }: IMessengers) => {
  return (
    <Link
      href={name === 'email' ? `mailto:${link}` : link}
      target="_blank"
      className={cn('active:text-b text-white transition-all duration-300 hover:text-dark-blue', icon)}
    >
      <Icon />
    </Link>
  );
};
