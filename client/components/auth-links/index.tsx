import { routes } from '@/constants';

import { Links } from './links';

const links = [
  { text: 'реєстрація', href: routes.registration },
  { text: 'вхід', href: routes.login },
];

export const AuthLinks = () => {
  return (
    <div className="flex tablet:gap-6">
      {links.map(({ text, href }) => (
        <Links key={text} text={text} href={href} />
      ))}
    </div>
  );
};
