import { Organizations, Rejected, Tablet } from '@/assets/icons';

interface ILinksProps {
  request: string;
  rejected: string;
  organizations: string;
}
export const getLinks = ({ request, rejected, organizations }: ILinksProps) => {
  return [
    { text: request, href: '/dashboard', icon: Tablet },
    { text: rejected, href: '/dashboard/rejected', icon: Rejected },
    {
      disabled: true,
      text: organizations,
      icon: Organizations,
      href: '/dashboard/organizations',
    },
  ];
};
