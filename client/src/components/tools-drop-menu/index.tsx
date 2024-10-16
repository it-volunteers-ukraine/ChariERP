'use client';

import { useRef } from 'react';

import { useMounted, useOutsideClick } from '@/hooks';
import { ChildrenProps } from '@/types';
import clsx from 'clsx';

interface IToolsDropMenuProps {
  opened: boolean;
  className?: string;
  onClose: () => void;
  duration: number;
}

export const ToolsDropMenu = ({ onClose, children, className, opened }: ChildrenProps<IToolsDropMenuProps>) => {
  const ref = useRef<HTMLDivElement | null>(null);

  console.log({ children, opened });

  const { unmounted } = useMounted({ opened, duration: 1000 });

  const cllsx = clsx(
    'border-swissCoffee bg-red-500 absolute right-0 top-0 z-[10] flex w-[200px] flex-col justify-between gap-2 rounded-lg border bg-white px-3 py-2 shadow-boardCard backdrop-blur-lg',
    className,
    {
      'animate-dropDownStart': opened,
      'animate-dropDownDel': !opened,
    },
  );

  useOutsideClick(ref, () => onClose());

  if (!unmounted) return null;

  return (
    <div ref={ref} className={cllsx} style={{ animationDuration: `1000ms` }}>
      {children}
    </div>
  );
};
