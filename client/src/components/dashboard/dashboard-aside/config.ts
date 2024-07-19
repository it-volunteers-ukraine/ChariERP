import React, { SVGProps } from 'react';

import { routes } from '@/constants';
import { Organizations, Rejected, Tablet } from '@/assets/icons';

interface IGetLinksProps {
  request: string;
  rejected: string;
  organizations: string;
}

interface LinkProps {
  text: string;
  href: string;
  disabled?: boolean;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
}

export const getLinks = ({ request, rejected, organizations }: IGetLinksProps): LinkProps[] => {
  return [
    { text: request, href: routes.dashboard, icon: Tablet },
    { text: rejected, href: routes.declined, icon: Rejected },
    {
      text: organizations,
      icon: Organizations,
      href: routes.organizations,
    },
  ];
};
