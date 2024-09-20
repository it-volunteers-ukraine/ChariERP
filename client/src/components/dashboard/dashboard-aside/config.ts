import React, { SVGProps } from 'react';
import { TranslationValues } from 'next-intl';

import { Roles } from '@/types';
import { Organizations, Rejected, Settings, Tablet, Users } from '@/assets/icons';
import { routes } from '@/constants';

interface getLinksProps {
  text: string;
  href: string;
  disabled?: boolean;
  children?: getLinksProps[];
  icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
}

export const getLinksByRole = (
  text: (key: string, params?: TranslationValues) => string,
  role?: Roles,
): getLinksProps[] => {
  const links = {
    [Roles.ADMIN]: [
      { text: text('requests'), href: routes.requests, icon: Tablet },
      { text: text('declined'), href: routes.declined, icon: Rejected },
      { text: text('organizations'), href: routes.organizations, icon: Organizations },
    ],
    [Roles.MANAGER]: [
      { text: text('home'), href: routes.managerHome, icon: Tablet },
      {
        text: text('myOrganization'),
        href: routes.managerOrganization,
        icon: Organizations,
      },
      {
        text: text('employees'),
        href: routes.employees,
        icon: Users,
      },
      {
        text: text('boards'),
        href: routes.managerDashboards,
        icon: Tablet,
        children: [
          {
            text: '#1 якщо я писака і пишу багато, як би багато я не писав, навіть якщо вона буде аж прям така довга, то користувач все одно зможе її скопіювати',
            href: `${routes.managerDashboard}/${encodeURIComponent('#1 якщо я писака і пишу багато, як би багато я не писав, навіть якщо вона буде аж прям така довга, то користувач все одно зможе її скопіювати')}`,
          },
          { text: '#2 Дошка', href: `${routes.managerDashboard}/${encodeURIComponent('#2 Дошка')}` },
          { text: '#3 Дошка', href: `${routes.managerDashboard}/${encodeURIComponent('#3 Дошка')}` },
          { text: '#4 Дошка', href: `${routes.managerDashboard}/${encodeURIComponent('#4 Дошка')}` },
          { text: '#5 Дошка', href: `${routes.managerDashboard}/${encodeURIComponent('#5 Дошка')}`, disabled: true },
        ],
      },
      { text: text('settings'), href: routes.managerSettings, icon: Settings },
    ],
    [Roles.USER]: [{ text: 'Заявки', href: '#', icon: Tablet }],
  };

  if (role) {
    return links[role];
  }

  return [];
};
