import { cn } from '@/utils';
import Link from 'next/link';

export interface IMessengers {
  link: string;
  icon?: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

export const Messengers = ({ Icon, link, icon }: IMessengers) => {
  return (
    <Link href={link} className={cn('active:text-b text-white transition-all duration-300 hover:text-dark-blue', icon)}>
      <Icon />
    </Link>
  );
};
