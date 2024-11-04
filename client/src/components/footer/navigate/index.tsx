import { useTranslations } from 'next-intl';
import Link from 'next/link';

export interface INavigate {
  id: string;
  link: string;
  title: string;
}

export const Navigate = ({ link, title }: INavigate) => {
  const footer = useTranslations('footer');

  return (
    <Link href={link} className="block py-3">
      <span className="text-nowrap font-scada font-normal uppercase text-white duration-300 ease-in-out hover:text-dark-blue">
        {footer(title)}
      </span>
    </Link>
  );
};
