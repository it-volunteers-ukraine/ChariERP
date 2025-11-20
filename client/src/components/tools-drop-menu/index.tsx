'use client';

import { useRef } from 'react';

import { ChildrenProps } from '@/types';
import { useMounted, useOutsideClick } from '@/hooks';

import { getStyle } from './style';
import { IToolsDropMenuProps } from './types';

export const ToolsDropMenu = ({
  opened,
  onClose,
  children,
  className,
  animation,
  duration = 300,
}: ChildrenProps<IToolsDropMenuProps>) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { unmounted } = useMounted({ opened, duration });

  const style = getStyle({ className, opened, animation });

  useOutsideClick(() => onClose(), ref);

  if (!unmounted || !children) {
    return null;
  }

  return (
    <div ref={ref} className={style.toolsMenu} style={{ animationDuration: `${duration}ms` }}>
      {children}
    </div>
  );
};
