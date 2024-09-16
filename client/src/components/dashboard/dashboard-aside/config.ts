import React, { SVGProps } from 'react';
import { TranslationValues } from 'next-intl';

import { Roles } from '@/types';
import { Organizations, Rejected, Tablet } from '@/assets/icons';

interface getLinksProps {
  text: string;
  href: string;
  disabled?: boolean;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  children?: getLinksProps[];
}

export const getLinksByRole = (
  text: (key: string, params?: TranslationValues) => string,
  role?: Roles,
): getLinksProps[] => {
  const links = {
    [Roles.ADMIN]: [
      { text: text('requests'), href: '/admin/requests', icon: Tablet },
      { text: text('declined'), href: '/admin/declined', icon: Rejected },
      { text: text('organizations'), href: '/admin/organizations', icon: Organizations },
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

  if (role) {
    return links[role];
  }

  return [];
};
