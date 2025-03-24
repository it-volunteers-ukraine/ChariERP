import { cn } from '@/utils';
import React from 'react';

interface ITitle {
  icon?: React.ElementType;
  title?: string;
  className?: string;
}

export const Title = ({ icon: Icon, title = '', className = '' }: ITitle) => {
  return (
    <div className={cn('mb-3 flex items-center gap-2 text-lightBlue', className)}>
      {Icon && <Icon className="h-6 w-6 text-inherit" />}
      <p className="font-scada text-[20px] font-bold uppercase leading-[120%] tracking-normal text-inherit">{title}</p>
    </div>
  );
};
