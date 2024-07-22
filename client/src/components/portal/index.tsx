'use client';
import { createPortal } from 'react-dom';

import { ChildrenProps } from '@/types';

interface IPortalProps {
  opened: boolean;
}

export const Portal = ({ children, opened }: ChildrenProps<IPortalProps>) => {
  if (!opened) return null;

  return createPortal(children, document.body);
};
