'use client';
import { useTranslations } from 'next-intl';

import { routes } from '@/constants';

import { Links } from './links';

export const AuthLinks = () => {
  const login = useTranslations('auth-page.links');

  const links = [
    { text: login('registration'), href: routes.registration },
    { text: login('login'), href: routes.login },
  ];

  return (
    <div className="flex tablet:gap-6 mx-4 tablet:mx-0">
      {links.map(({ text, href }) => (
        <Links key={text} text={text} href={href} />
      ))}
    </div>
  );
};
