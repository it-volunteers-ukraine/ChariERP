'use client';

import { useContext, createContext, useState } from 'react';

import { ChildrenProps } from '@/types';
import { LoaderPage } from '@/components';

interface ILoaderAdminContext {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}
const LoaderAdminContext = createContext<ILoaderAdminContext>({
  isLoading: false,
  setIsLoading: () => {},
});

export const useLoaderAdminPage = () => {
  return useContext(LoaderAdminContext);
};

export const LoaderAdminProvider = ({ children }: ChildrenProps) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <LoaderAdminContext.Provider value={{ isLoading, setIsLoading }}>
      <LoaderPage>{children}</LoaderPage>
    </LoaderAdminContext.Provider>
  );
};
