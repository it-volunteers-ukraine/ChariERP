'use client';
import { useTranslations } from 'next-intl';

import { Locale } from '@/types';
import { routes } from '@/constants';

import { Links } from './links';

export const AuthLinks = ({ locale }: { locale: Locale }) => {
  const login = useTranslations('auth-page.links');

  const links = [
    { text: login('registration'), href: routes.registration },
    { text: login('login'), href: routes.login },
  ];

  return (
    <div className="flex tablet:gap-6 mx-4 tablet:mx-0">
      {links.map(({ text, href }) => (
        <Links key={text} text={text} href={href} locale={locale} />
      ))}
    </div>
  );
};
