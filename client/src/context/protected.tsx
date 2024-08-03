'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { routes } from '@/constants';
import { ChildrenProps, Roles } from '@/types';

interface IProtectedContext {
  role: Roles | null;
  setRole: (role: Roles | null) => void;
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
      const { data } = await axios.get('/api/roles');

      setRole(data.role);
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
