import { forwardRef } from 'react';

import { Calendar } from '@/assets/icons';

import { InputProps } from '../input/types';

import { getStyles } from './style';

export const DateInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  ({ value, onChange, placeholder, placeholderItalic, inputClass }, ref) => {
    const style = getStyles({ placeholder, value: value as string, placeholderItalic, inputClass });

    return (
      <div className={style.wrapper}>
        <input
          type="text"
          value={value}
          className="hidden"
          ref={ref as React.Ref<HTMLInputElement>}
          onChange={(e) => onChange && onChange(e.target.value)}
        />

        <span className={style.text}>{value || placeholder}</span>

        <Calendar width={24} height={24} className={style.icon} />
      </div>
    );
  },
);

DateInput.displayName = 'DateInputWithTitle';
