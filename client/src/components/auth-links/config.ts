import { routes } from '@/constants';

interface IGetLinksProps {
  admin: string;
  login: string;
  registration: string;
  pathname: string | null;
}

export const getLinks = ({ pathname, admin, registration, login }: IGetLinksProps) => {
  return pathname === routes.admin
    ? [
        { text: '', href: `#` },
        { text: admin, href: routes.admin },
      ]
    : [
        { text: registration, href: routes.registration },
        { text: login, href: routes.login },
      ];
};
