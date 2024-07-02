'use client';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';

import { Links } from './links';
import { getLinks } from './config';

export const AuthLinks = () => {
  const pathname = usePathname();
  const login = useTranslations('auth-page.links');

  const links = getLinks({
    pathname,
    admin: login('admin'),
    login: login('login'),
    registration: login('registration'),
  });

  return (
    <div className="flex tablet:gap-6 mx-4 tablet:mx-0">
      {links.map(({ text, href }) => (
        <Links key={text} text={text} href={href} />
      ))}
    </div>
  );
};
