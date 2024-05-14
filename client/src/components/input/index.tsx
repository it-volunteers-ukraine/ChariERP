'use client';
import { useRef, useState } from 'react';
import InputMask from 'react-input-mask';

import { EyeOff, Eye, Warning, Info } from '@/assets/icons';

import { getStyles } from './styles';
import { InputProps } from './types';

export const Input = ({
  info,
  label,
  value,
  error,
  disabled,
  onChange,
  type = 'text',
  cross = false,
  isMasked = false,
  placeholderItalic,
  ...props
}: InputProps) => {
  const [inputType, setInputType] = useState(type);
  const ref = useRef<HTMLInputElement>(null);

  const styles = getStyles({
    cross,
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

  const handleClearInput = () => {
    if (ref.current) {
      ref.current.value = '';
      if (onChange) {
        onChange('');
      }
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

          {!isMasked ? (
            <input
              ref={ref}
              value={value}
              type={inputType}
              disabled={disabled}
              className={styles.input}
              onChange={(e) => onChange && onChange(e.target.value)}
              {...props}
            />
          ) : (
            <InputMask
              maskChar="_"
              disabled={disabled}
              mask="+38(099)999-99-99"
              className={styles.input}
              onChange={(e) => onChange && onChange(e.target.value)}
              {...props}
            />
          )}

          {type === 'password' && (
            <div className={styles.div} onClick={handleFocus}>
              {inputType === 'password' ? (
                <EyeOff
                  width={24}
                  height={24}
                  className={styles.iconEye}
                  onClick={() => setInputType('text')}
                />
              ) : (
                <Eye
                  width={24}
                  height={24}
                  className={styles.iconEye}
                  onClick={() => setInputType('password')}
                />
              )}
            </div>
          )}

          {cross && value !== '' && (
            <div className={styles.div} onClick={handleClearInput}>
              <Icon.Cross width={24} height={24} className={styles.iconEye} />
            </div>
          )}
        </fieldset>

        {error && (
          <div className="flex gap-1">
            <Warning width={14} height={14} />

            <span className={styles.error}>{error}</span>
          </div>
        )}
      </div>

      {info && (
        <div className="flex text-input-info laptop:mt-3 self-center w-full">
          <Info
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
