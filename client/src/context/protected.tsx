'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { routes } from '@/constants';
import { getRoleAction } from '@/actions';
import { showMessage } from '@/components';
import { ChildrenProps, Roles } from '@/types';

interface IProtectedContext {
  role: Roles | null;
  setRole: (role: Roles | null) => void;
}

interface IRoleResponse {
  role?: Roles;
  success: boolean;
  message?: string;
}

const RoleContext = createContext<IProtectedContext>({
  role: null,
  setRole: () => {},
});

export const useRole = () => {
  return useContext(RoleContext);
};

export const RoleProvider = ({ children }: ChildrenProps) => {
  const router = useRouter();
  const [role, setRole] = useState<Roles | null>(null);

  const getRoles = useCallback(async () => {
    try {
      const response: IRoleResponse = await getRoleAction();

      if (!response.success && response && response.message) {
        showMessage.error(response.message);

        return router.push(routes.login);
      }

      if (response.role) {
        setRole(response.role);
      }
    } catch (error) {
      router.push(routes.login);
    }
  }, [router]);

  useEffect(() => {
    if (!role) {
      getRoles();
    }
  }, [role, getRoles]);

  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
};
