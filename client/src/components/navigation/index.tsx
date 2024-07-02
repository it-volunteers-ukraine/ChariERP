import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { routes } from '@/constants';

import { getStyles } from './styles';
import { INavigationProps } from './types';

export const Navigation = ({ inHeader, className, onBurgerClose }: INavigationProps) => {
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
          <Link href={href} className={link} onClick={onBurgerClose}>
            {text}
          </Link>
        </li>
      ))}
    </ul>
  );
};
