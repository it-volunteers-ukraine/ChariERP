'use client';

import { useRef } from 'react';

import { ChildrenProps } from '@/types';
import { useMounted, useOutsideClick } from '@/hooks';

import { getStyle } from './style';

interface IToolsDropMenuProps {
  opened: boolean;
  duration?: number;
  className?: string;
  onClose: () => void;
}

export const ToolsDropMenu = ({
  opened,
  onClose,
  children,
  className,
  duration = 300,
}: ChildrenProps<IToolsDropMenuProps>) => {
  const ref = useRef<HTMLDivElement | null>(null);

  const { unmounted } = useMounted({ opened, duration });

  const style = getStyle({ className, opened });

  useOutsideClick(ref, () => onClose());

  if (!unmounted || !children) return null;

  return (
    <div ref={ref} className={style.toolsMenu} style={{ animationDuration: `${duration}ms` }}>
      {children}
    </div>
  );
};
