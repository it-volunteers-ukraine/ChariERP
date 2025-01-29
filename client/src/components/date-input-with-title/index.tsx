import { forwardRef } from 'react';

import { Calendar } from '@/assets/icons';

import { InputProps } from '../input/types';

export const DateInputWithTitle = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ value, onChange, placeholder }, ref) => {
    return (
      <div className="flex cursor-pointer border p-2 peer-focus:[&>svg]:text-input-focus">
        <input
          type="text"
          value={value}
          className="hidden"
          ref={ref as React.Ref<HTMLInputElement>}
          onChange={(e) => onChange && onChange(e.target.value)}
        />

        <span className="peer w-full items-center bg-transparent px-[14px] pl-0 caret-input-focus placeholder:text-input-info">
          {value || placeholder}
        </span>

        <Calendar
          width={24}
          height={24}
          className="absolute right-3 mb-3 text-input-text transition-all duration-300 group-hover/item:text-green"
        />
      </div>
    );
  },
);

DateInputWithTitle.displayName = 'DateInputWithTitle';
