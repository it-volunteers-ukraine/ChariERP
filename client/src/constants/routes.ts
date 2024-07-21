import { SVGProps } from 'react';

import { Roles } from '@/types';
import { Tablet } from '@/assets/icons';

interface LinkProps {
  text: string;
  href?: string;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  disabled?: boolean;
  children?: {
    text: string;
    href: string;
    icon: React.ComponentType<SVGProps<SVGSVGElement>>;
    disabled?: boolean;
  }[];
}

export const routes = {
  faq: '/faq',
  admin: '/admin',
  login: '/sign-in',
  aboutUs: '/about_us',
  contacts: '/contacts',
  requests: '/admin/requests',
  registration: '/sign-up',
  aboutService: '/about_service',
  declined: '/admin/declined',
  organizations: '/admin/organizations',
};

const links = {
  [Roles.ADMIN]: [
    { text: 'admin', href: routes.requests, icon: Tablet },
    { text: 'rejected', href: routes.declined, icon: Tablet },
    { text: 'organizations', href: routes.organizations, icon: Tablet },
  ],
  [Roles.MANAGER]: [
    { text: 'Головна', href: '/manager/home', icon: Tablet },
    { text: 'Моя організація', href: '/manager/organizations', icon: Tablet },
    { text: 'Співробітники', href: '/manager/Employees', icon: Tablet },
    {
      text: 'Дошка',
      icon: Tablet,
      children: [
        {
          text: 'Дошка 1',
          href: '/manager/dashboard1',
          icon: Tablet,
        },
        { text: 'Дошка 2', href: '/manager/dashboard2', icon: Tablet },
        { text: 'Дошка 3', href: '/manager/dashboard3', icon: Tablet },
      ],
    },
    {
      text: 'Налаштування',
      icon: Tablet,
      children: [
        {
          text: 'Налаштування 1',
          href: '/manager/settings1',
          icon: Tablet,
        },
        { text: 'Налаштування 2', href: '/manager/settings2', icon: Tablet, disabled: true },
      ],
    },
  ],
  [Roles.USER]: [{ text: 'Головна', href: '/user/home', icon: Tablet }],
};

export const getLinksByRole = (role: Roles | null): LinkProps[] => {
  if (role) {
    return links[role];
  }

  return [];
};
