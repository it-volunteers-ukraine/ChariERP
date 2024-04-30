import { routes } from '@/constants';

import { Links } from './links';
import { Locale } from '@/types';

const links = [
  { text: 'реєстрація', href: routes.registration },
  { text: 'вхід', href: routes.login },
];

export const AuthLinks = ({ locale }: { locale: Locale }) => {
  return (
    <div className="flex tablet:gap-6 mx-4 tablet:mx-0">
      {links.map(({ text, href }) => (
        <Links key={text} text={text} href={href} locale={locale} />
      ))}
    </div>
  );
};
