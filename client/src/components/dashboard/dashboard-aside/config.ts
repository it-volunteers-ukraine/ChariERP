import React, { SVGProps } from 'react';
import { TranslationValues } from 'next-intl';

import { Roles } from '@/types';
import { routes } from '@/constants';
import { Organizations, Rejected, Settings, Tablet, Users, Calculator } from '@/assets/icons';

interface getLinksProps {
  title: string;
  href: string;
  disabled?: boolean;
  children?: getLinksProps[];
  icon?: React.ComponentType<SVGProps<SVGSVGElement>>;
}

export const getLinksByRole = (
  text: (key: string, params?: TranslationValues) => string,
  role?: Roles,
  children?: getLinksProps[],
): getLinksProps[] => {
  const accountingSystemLinks = [{ title: text('fixedAssets'), href: routes.managerFixedAssets }];

  const commonLinks = [
    { title: text('home'), href: routes.managerHome, icon: Tablet },
    { title: text('myOrganization'), href: routes.managerOrganization, icon: Organizations },
    { title: text('employees'), href: routes.employees, icon: Users },
    {
      title: text('boards'),
      href: routes.managerDashboards,
      icon: Tablet,
      children,
    },
    { title: text('accountingSystem'), href: '#', icon: Calculator, children: accountingSystemLinks },
    { title: text('settings'), href: routes.managerSettings, icon: Settings },
  ];

  const adminLinks = [
    { title: text('requests'), href: routes.requests, icon: Tablet },
    { title: text('declined'), href: routes.declined, icon: Rejected },
    { title: text('organizations'), href: routes.organizations, icon: Organizations },
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
