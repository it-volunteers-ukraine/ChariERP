'use client';

import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { routes } from '@/constants';
import { useUserInfo } from '@/context';

interface WithAuthOptions {
  allowedRoles: string[];
  fallbackRoute: string;
}

const withAuth = <T extends object>(WrappedComponent: React.ComponentType<T>, options: WithAuthOptions) => {
  const ComponentWithAuth = (props: T) => {
    const router = useRouter();
    const id = Cookies.get('id');
    const { role } = useUserInfo();

    useEffect(() => {
      if (!role && !id) {
        router.push(routes.login);
      }

      if (role && !options.allowedRoles.includes(role)) {
        router.push(options.fallbackRoute);
      }
    }, [role, router, id]);

    if (!role || !options.allowedRoles.includes(role)) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  ComponentWithAuth.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return ComponentWithAuth;
};

export { withAuth };
