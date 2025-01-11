'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { routes } from '@/constants';
import { getMeAction } from '@/actions';
import { showMessage } from '@/components';
import { ChildrenProps, ICustomer, Roles } from '@/types';

type IUser = ICustomer | null;

interface IProtectedContext extends Partial<ICustomer> {
  setUser: (user: IUser) => void;
  isAdmin: boolean;
  isManager: boolean;
  isUser: boolean;
}

interface IGetMeResponse {
  user?: string;
  success: boolean;
  message?: string;
}

const UserContext = createContext<IProtectedContext>({
  isUser: false,
  isAdmin: false,
  isManager: false,
  setUser: () => {},
});

export const useUserInfo = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }: ChildrenProps) => {
  const router = useRouter();
  const [user, setUser] = useState<IUser>(null);
  const [isLoading, setIsLoading] = useState(true);

  const getUser = async () => {
    try {
      setIsLoading(true);
      const response: IGetMeResponse = await getMeAction();

      if (!response.success && response.message) {
        showMessage.error(response.message);

        return router.push(routes.login);
      }

      if (response && response.user) {
        setUser(JSON.parse(response.user));
      }
    } catch (error) {
      console.error(error);
      router.push(routes.login);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <UserContext.Provider
      value={{
        ...user,
        setUser,
        isUser: user?.role === Roles.USER,
        isAdmin: user?.role === Roles.ADMIN,
        isManager: user?.role === Roles.MANAGER,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
