'use client';

import React, { useState, forwardRef, MouseEvent } from 'react';
import { useTranslations } from 'next-intl';
import { PatternFormat } from 'react-number-format';

import { onCopy } from '@/utils/helpers';
import { Eye, Info, Clip, Copy, EyeOff, Search, Warning, Calendar, InputClose } from '@/assets/icons';

import { getStyles } from './styles';
import { InputProps } from './types';

import './styles.css';

export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (
    {
      info,
      label,
      value,
      error,
      cross,
      isCopy,
      required,
      disabled,
      onChange,
      onSearch,
      isMasked,
      isTextarea,
      borderClass,
      wrapperClass,
      textAreaClass,
      type = 'text',
      placeholderItalic,
      ...props
    },
    ref,
  ) => {
    const initialType = type === 'file' ? 'text' : type;
    const [inputType, setInputType] = useState(initialType);

    const messagesCopy = useTranslations('copy');

    const styles = getStyles({
      type,
      cross,
      disabled,
      isTextarea,
      borderClass,
      wrapperClass,
      textAreaClass,
      label: !!label,
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

      onChange?.('');
    };

    return (
      <div className={styles.wrapper}>
        <label className="flex w-full flex-col gap-1">
          <fieldset className={styles.fieldset}>
            {type !== 'search' && label && (
              <legend className="ml-[10px] px-1 pb-1">
                {required && <span className={styles.star}>*</span>}
                <span className={styles.label}>{label}</span>
              </legend>
            )}

            {type === 'search' && <Search className={styles.search} onClick={() => onSearch && onSearch(value)} />}

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

            {type === 'date' && <span className={styles.input}>{value || props.placeholder}</span>}

            {isMasked && (
              <PatternFormat
                mask="_"
                disabled={disabled}
                autoComplete="none"
                allowEmptyFormatting
                className={styles.input}
                format="+38(0##)###-##-##"
                placeholder={props.placeholder}
                value={(value as string) || ''}
                onChange={(e) => onChange && onChange(e.target.value)}
                defaultValue={Array.isArray(value) && value.length > 0 ? value[0] : undefined}
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
                  {...props}
                  type="file"
                  disabled={disabled}
                  className={styles.fileType}
                  ref={ref as React.Ref<HTMLInputElement>}
                  onChange={(e) => onChange && onChange(e)}
                />

                <span className={styles.input}>{value || props.placeholder}</span>
              </>
            )}

            {type === 'password' && (
              <div className={styles.div} onClick={handleFocus}>
                {inputType === 'password' ? (
                  <EyeOff width={24} height={24} className={styles.iconEye} onClick={() => setInputType('text')} />
                ) : (
                  <Eye width={24} height={24} className={styles.iconEye} onClick={() => setInputType('password')} />
                )}
              </div>
            )}

            {cross && value && (
              <div className={styles.div} onClick={handleClearInput}>
                <InputClose width={24} height={24} className={`${styles.iconEye} ${styles.iconClose}`} />
              </div>
            )}

            {isCopy && (
              <div
                className={styles.iconCopyDiv}
                onClick={(e: MouseEvent<HTMLDivElement>) => {
                  if (value) {
                    onCopy<MouseEvent<HTMLDivElement>>(e, value as string | number, messagesCopy('messages'));
                  }
                }}
              >
                <Copy width={24} height={24} className={`${styles.iconEye} ${styles.iconCopy}`} />
              </div>
            )}

            {type === 'date' && !disabled && (
              <div className={styles.div}>
                <Calendar width={24} height={24} className={`${styles.iconEye} ${styles.iconClip}`} />
              </div>
            )}

            {type === 'file' && (
              <div className={styles.div}>
                {!value && <Clip width={24} height={24} className={`${styles.iconEye} ${styles.iconClip}`} />}

                {value && !disabled && (
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
            <div className="flex gap-1">
              <Warning width={14} height={14} />

              <span className={styles.error}>{error}</span>
            </div>
          )}
        </label>
        {info && (
          <div className="text-input-info relative top-1 flex w-full items-center">
            <Info width={24} height={24} className="text-input-info tablet:flex mr-3 shrink-0 self-center" />

            <span className={styles.infoSpan}>{info}</span>
          </div>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
