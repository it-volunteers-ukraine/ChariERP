'use client';

import { Toast } from '@/components';
import { ChildrenProps } from '@/types';

export const WidthToast = ({ children }: ChildrenProps) => {
  return (
    <>
      {children}
      <Toast limit={5} />
    </>
  );
};
