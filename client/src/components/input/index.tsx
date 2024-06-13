'use client';

import React, { useState, forwardRef } from 'react';
import PhoneInput from 'react-phone-number-input';

import 'react-phone-number-input/style.css';

import {
  Eye,
  Info,
  Clip,
  Close,
  EyeOff,
  Warning,
  Calendar,
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

    return (
      <div className="flex flex-col laptop:flex-row gap-1 laptop:gap-6 items-start justify-start w-full">
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
              <PhoneInput
                international
                limitMaxLength
                defaultCountry="UA"
                disabled={disabled}
                withCountryCallingCode
                value={value as string}
                className={styles.input}
                onChange={(newValue) =>
                  onChange && onChange(newValue as string)
                }
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
                <Close
                  width={24}
                  height={24}
                  className={`${styles.iconEye}  ${styles.iconClose}`}
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
                  <Close
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
            <div className="flex gap-1">
              <Warning width={14} height={14} />

              <span className={styles.error}>{error}</span>
            </div>
          )}
        </label>

        {info && (
          <div className="flex items-center text-input-info laptop:mt-3 laptop:mb-5 self-center w-full laptop:h-[50px]">
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
