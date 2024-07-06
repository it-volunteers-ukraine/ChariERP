'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { routes } from '@/constants';
import { redirect } from 'next/navigation';

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
  const [role, setRole] = useState<Roles | null>(null);

  const getRoles = async () => {
    try {
      const { data } = await axios.get('/api/roles');

      setRole(data.role);
    } catch (error) {
      console.log(error);
      redirect(routes.login);
    }
  };

  useEffect(() => {
    if (!role) {
      getRoles();
    }
  }, [role]);

  return <RoleContext.Provider value={{ role, setRole }}>{children}</RoleContext.Provider>;
};
