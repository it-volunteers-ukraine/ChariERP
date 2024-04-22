'use client';
import { useRef, useState } from 'react';

import { Icon } from '@/assets';

import { getStyles } from './styles';
import { InputProps } from './types';

export const Input = ({
  info,
  label,
  error,
  disabled,
  onChange,
  type = 'text',
  placeholderItalic,
  ...props
}: InputProps) => {
  const [inputType, setInputType] = useState(type);
  const ref = useRef<HTMLInputElement>(null);

  const styles = getStyles({
    disabled,
    error: !!error,
    placeholderItalic,
    isTypePassword: type === 'password',
    visiblePassword: inputType === 'text',
  });

  const handleFocus = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return (
    <div className="flex flex-col laptop:flex-row gap-1 laptop:gap-6 items-center w-full">
      <div className="flex flex-col gap-1 w-full">
        <fieldset className={styles.fieldset}>
          <legend className="ml-[10px] px-1 pb-1">
            <span className={styles.star}>*</span>
            <span className={styles.label}>{label}</span>
          </legend>

          <input
            ref={ref}
            type={inputType}
            disabled={disabled}
            className={styles.input}
            onChange={(e) => onChange && onChange(e.target.value)}
            {...props}
          />

          {type === 'password' && (
            <div className={styles.div} onClick={handleFocus}>
              {inputType === 'password' ? (
                <Icon.EyeOff
                  width={24}
                  height={24}
                  className={styles.iconEye}
                  onClick={() => setInputType('text')}
                />
              ) : (
                <Icon.Eye
                  width={24}
                  height={24}
                  className={styles.iconEye}
                  onClick={() => setInputType('password')}
                />
              )}
            </div>
          )}
        </fieldset>

        {error && (
          <div className="flex gap-1">
            <Icon.Warning width={14} height={14} />

            <span className={styles.error}>{error}</span>
          </div>
        )}
      </div>

      {info && (
        <div className="flex text-input-info laptop:mt-3 self-center w-full">
          <Icon.Info
            width={24}
            height={24}
            className="hidden tablet:flex self-center text-input-info mr-3 shrink-0"
          />
          <span className={styles.infoSpan}>{info}</span>
        </div>
      )}
    </div>
  );
};
