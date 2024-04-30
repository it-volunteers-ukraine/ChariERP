import Link from 'next/link';

import { routes } from '@/constants';

import { getStyles } from './styles';
import { INavigationProps } from './types';
import { useTranslations } from 'next-intl';

export const Navigation = ({ inHeader, className }: INavigationProps) => {
  const { link, ul } = getStyles({ inHeader, className });
  const header = useTranslations('header');

  const links = [
    { text: header('about'), href: routes.aboutUs },
    { text: header('service'), href: routes.aboutService },
    { text: header('faq'), href: routes.faq },
    { text: header('contacts'), href: routes.contacts },
  ];

  return (
    <ul className={ul}>
      {links.map(({ text, href }, idx) => (
        <li key={`navigation-item-${idx}`}>
          <Link href={href} className={link}>
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );
};
