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
    <div className="mx-4 flex tablet:mx-0 tablet:gap-6">
      {links.map(({ text, href }) => (
        <Links key={text} text={text} href={href} />
      ))}
    </div>
  );
};
