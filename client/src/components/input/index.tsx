'use client';

import React, { useState, forwardRef } from 'react';

import {
  Eye,
  Info,
  Clip,
  EyeOff,
  Warning,
  Calendar,
  InputClose,
} from '@/assets/icons';

import { getStyles } from './styles';
import { InputProps } from './types';

export const Input = forwardRef<
  HTMLInputElement | HTMLTextAreaElement,
  InputProps
>(
  (
    {
      info,
      label,
      value,
      error,
      cross,
      required,
      disabled,
      onChange,
      isMasked,
      isTextarea,
      type = 'text',
      placeholderItalic,
      ...props
    },
    ref,
  ) => {
    const initialType = type === 'file' ? 'text' : type;
    const [inputType, setInputType] = useState(initialType);

    const styles = getStyles({
      type,
      cross,
      disabled,
      isTextarea,
      error: !!error,
      placeholderItalic,
      value: value as string,
      placeholder: props.placeholder,
      isTypePassword: type === 'password',
      visiblePassword: inputType === 'text',
    });

    const handleFocus = () => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.focus();
      }
    };

    const handleClearInput = (e: React.MouseEvent) => {
      e.preventDefault();
      onChange && onChange('');
    };

    const handlePhoneChange = (inputValue: string) => {
      inputValue = inputValue.replace(/[^\d+]/g, '');

      let formattedValue = '';

      if (inputValue.length > 0) {
        formattedValue += inputValue.substring(0, 3);

        if (inputValue.length > 3) {
          formattedValue += ` (${inputValue.substring(3, 6)})`;

          if (inputValue.length > 6) {
            formattedValue += ` ${inputValue.substring(6, 9)}`;

            if (inputValue.length > 9) {
              formattedValue += `-${inputValue.substring(9, 11)}`;

              if (inputValue.length > 11) {
                formattedValue += `-${inputValue.substring(11, 13)}`;
              }
            }
          }
        }
      }

      onChange && onChange(formattedValue);
    };

    return (
      <div className="relative flex flex-col laptop:flex-row gap-1 laptop:gap-6 items-start w-full">
        <label className="flex flex-col gap-1 w-full">
          <fieldset className={styles.fieldset}>
            <legend className="ml-[10px] px-1 pb-1">
              {required && <span className={styles.star}>*</span>}
              <span className={styles.label}>{label}</span>
            </legend>

            {!isMasked && !isTextarea && type !== 'file' && (
              <input
                value={value}
                type={inputType}
                disabled={disabled}
                className={styles.input}
                ref={ref as React.Ref<HTMLInputElement>}
                onChange={(e) => onChange && onChange(e.target.value)}
                {...props}
              />
            )}

            {type === 'date' && (
              <span className={styles.input}>
                {value ? value : props.placeholder}
              </span>
            )}

            {isMasked && (
              <input
                type="text"
                value={value}
                maxLength={19}
                className={styles.input}
                onChange={(e) => handlePhoneChange(e.target.value)}
                {...props}
              />
            )}

            {isTextarea && (
              <textarea
                rows={5}
                value={value}
                disabled={disabled}
                className={styles.input}
                ref={ref as React.Ref<HTMLTextAreaElement>}
                onChange={(e) => onChange && onChange(e.target.value)}
                {...props}
              />
            )}

            {type === 'file' && (
              <>
                <input
                  type="file"
                  onChange={onChange}
                  accept={props.accept}
                  className={styles.fileType}
                  ref={ref as React.Ref<HTMLInputElement>}
                  {...props}
                />

                <span className={styles.input}>
                  {value ? value : props.placeholder}
                </span>
              </>
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

            {cross && value && (
              <div className={styles.div} onClick={handleClearInput}>
                <InputClose
                  width={24}
                  height={24}
                  className={`${styles.iconEye} ${styles.iconClose}`}
                />
              </div>
            )}

            {type === 'date' && (
              <div className={styles.div}>
                <Calendar
                  width={24}
                  height={24}
                  className={`${styles.iconEye} ${styles.iconClip}`}
                />
              </div>
            )}

            {type === 'file' && (
              <div className={styles.div}>
                {!value && (
                  <Clip
                    width={24}
                    height={24}
                    className={`${styles.iconEye} ${styles.iconClip}`}
                  />
                )}

                {value && (
                  <InputClose
                    width={24}
                    height={24}
                    onClick={handleClearInput}
                    className={`${styles.iconEye} ${styles.iconClose}`}
                  />
                )}
              </div>
            )}
          </fieldset>

          {error && (
            <div className="laptop:absolute laptop:bottom-[-17px] flex gap-1">
              <Warning width={14} height={14} />

              <span className={styles.error}>{error}</span>
            </div>
          )}
        </label>

        {info && (
          <div className="flex items-center text-input-info laptop:mt-3 self-center w-full laptop:h-[50px]">
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
  },
);

Input.displayName = 'Input';
