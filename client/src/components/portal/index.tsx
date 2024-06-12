'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { ChildrenProps } from '@/types';

interface IPortalProps {
  opened: boolean;
}

export const Portal = ({ children, opened }: ChildrenProps<IPortalProps>) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      const div = document.createElement('div');

      document.body.appendChild(div);
      setContainer(div);

      if (opened) {
        document.body.style.overflow = 'hidden';
      }

      return () => {
        document.body.removeChild(div);
        document.body.removeAttribute('style');
      };
    }
  }, [opened]);

  if (!container) return null;

  return createPortal(children, container);
};
