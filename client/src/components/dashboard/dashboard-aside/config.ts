import React, { SVGProps } from 'react';
import { TranslationValues } from 'next-intl';

import { Roles } from '@/types';
import { routes } from '@/constants';
import { Organizations, Rejected, Settings, Tablet, Users } from '@/assets/icons';

interface getLinksProps {
  text: string;
  href: string;
  disabled?: boolean;
  dashboards?: getLinksProps[];
  icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
}

export const getLinksByRole = (
  text: (key: string, params?: TranslationValues) => string,
  role?: Roles,
  dashboards?: getLinksProps[],
): getLinksProps[] => {
  const commonLinks = [
    { text: text('home'), href: routes.managerHome, icon: Tablet },
    { text: text('myOrganization'), href: routes.managerOrganization, icon: Organizations },
    { text: text('employees'), href: routes.employees, icon: Users },
    {
      text: text('boards'),
      href: routes.managerDashboards,
      icon: Tablet,
      dashboards,
    },
    { text: text('settings'), href: routes.managerSettings, icon: Settings },
  ];

  const adminLinks = [
    { text: text('requests'), href: routes.requests, icon: Tablet },
    { text: text('declined'), href: routes.declined, icon: Rejected },
    { text: text('organizations'), href: routes.organizations, icon: Organizations },
  ];

  const links = {
    [Roles.ADMIN]: adminLinks,
    [Roles.MANAGER]: commonLinks,
    [Roles.USER]: commonLinks,
  };

  if (role) {
    return links[role];
  }

  return [];
};
