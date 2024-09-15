'use client';

import { withAuth } from '@/hoc';
import { routes } from '@/constants';
import { ChildrenProps, Roles } from '@/types';

function Layout({ children }: ChildrenProps) {
  return <>{children}</>;
}
//TODO: Change fallback route
export default withAuth(Layout, { allowedRoles: [Roles.ADMIN], fallbackRoute: routes.managerOrganization });
