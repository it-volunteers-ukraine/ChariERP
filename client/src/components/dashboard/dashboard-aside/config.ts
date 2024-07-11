import React, { SVGProps } from 'react';

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
    { text: request, href: '/dashboard', icon: Tablet },
    { text: rejected, href: '/dashboard/rejected', icon: Rejected },
    {
      text: organizations,
      icon: Organizations,
      href: '/dashboard/organizations',
    },
  ];
};
