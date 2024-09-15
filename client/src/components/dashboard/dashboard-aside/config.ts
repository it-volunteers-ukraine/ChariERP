import React, { SVGProps } from 'react';
import { TranslationValues } from 'next-intl';

import { Roles } from '@/types';
import { Organizations, Rejected, Tablet, Users } from '@/assets/icons';

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
      { text: 'Головна', href: '#', icon: Tablet },
      {
        text: 'Моя організація',
        href: '/manager/organization',
        icon: Organizations,
      },
      {
        text: 'Співробітники',
        href: '/manager/employees',
        icon: Users,
      },
      {
        text: 'Дошка',
        href: '#',
        icon: Tablet,
        children: [
          { text: 'Організація 1', href: '#', icon: Tablet },
          { text: 'Організація 2', href: '#', icon: Tablet, disabled: true },
        ],
      },
      { text: 'Налаштування', href: '#', icon: Tablet },
    ],
    [Roles.USER]: [{ text: 'Заявки', href: '#', icon: Tablet }],
  };

  if (role) {
    return links[role];
  }

  return [];
};
