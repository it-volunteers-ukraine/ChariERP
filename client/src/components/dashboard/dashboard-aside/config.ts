import React, { SVGProps } from 'react';

import { Roles } from '@/types';
import { Organizations, Rejected, Tablet } from '@/assets/icons';

interface getLinksProps {
  text: string;
  href: string;
  disabled?: boolean;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  children?: getLinksProps[];
}

const links = {
  [Roles.ADMIN]: [
    { text: 'Заявки', href: '/admin/requests', icon: Tablet },
    { text: 'Відхилені', href: '/admin/declined', icon: Rejected },
    { text: 'Організації', href: '/admin/organizations', icon: Organizations },
  ],

  [Roles.MANAGER]: [
    { text: 'Головна', href: '/manager/requests', icon: Tablet },
    {
      text: 'Моя організація',
      href: '#',
      icon: Rejected,
      children: [
        { text: 'Організація 1', href: '/manager/organizations-1', icon: Tablet },
        { text: 'Організація 2', href: '/manager/organizations-2', icon: Tablet, disabled: true },
      ],
    },
    {
      text: 'Співробітники',
      href: '/manager/employees',
      icon: Organizations,
    },
    { text: 'Дошка', href: '/manager/dashboard', icon: Tablet },
    { text: 'Налаштування', href: '/manager/settings', icon: Tablet },
  ],
  [Roles.USER]: [{ text: 'Заявки', href: '/user/requests', icon: Tablet }],
};

export const getLinksByRole = (role: Roles | null): getLinksProps[] => {
  if (role) {
    return links[role];
  }

  return [];
};
