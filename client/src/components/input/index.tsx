'use client';
import { useRef, useState } from 'react';
import InputMask from 'react-input-mask';

import { EyeOff, Eye, Warning, Info, Cross, Clip, Close } from '@/assets/icons';

import { getStyles } from './styles';
import { InputProps } from './types';

export const Input = ({
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
}: InputProps) => {
  const initialType = type === 'file' ? 'text' : type;
  const [inputType, setInputType] = useState(initialType);

  const ref = useRef<HTMLInputElement & HTMLTextAreaElement>(null);

  const styles = getStyles({
    type,
    cross,
    disabled,
    isTextarea,
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

  const handleClearInput = (e: React.MouseEvent) => {
    e.preventDefault();

    if (ref.current) {
      ref.current.value = '';
      if (onChange) {
        onChange('');
      }
    }
  };

  return (
    <div className="flex flex-col laptop:flex-row gap-1 laptop:gap-6 items-center w-full">
      <label className="flex flex-col gap-1 w-full">
        <fieldset className={styles.fieldset}>
          <legend className="ml-[10px] px-1 pb-1">
            {required && <span className={styles.star}>*</span>}
            <span className={styles.label}>{label}</span>
          </legend>

          {!isMasked && !isTextarea && type !== 'file' && (
            <input
              ref={ref}
              value={value}
              type={inputType}
              disabled={disabled}
              className={styles.input}
              onChange={(e) => onChange && onChange(e.target.value)}
              {...props}
            />
          )}

          {isMasked && (
            <InputMask
              maskChar="_"
              disabled={disabled}
              mask="+38(099)999-99-99"
              className={styles.input}
              onChange={(e) => onChange && onChange(e.target.value)}
              {...props}
            />
          )}

          {isTextarea && (
            <textarea
              rows={5}
              ref={ref}
              value={value}
              disabled={disabled}
              className={styles.input}
              onChange={(e) => onChange && onChange(e.target.value)}
              {...props}
            />
          )}

          {type === 'file' && (
            <>
              <input
                type="file"
                ref={ref}
                name={props.name}
                accept={props.accept}
                className={styles.fileType}
                onChange={onChange}
              />

              <span className={styles.input}>{value}</span>
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

          {cross && value !== '' && (
            <div className={styles.div} onClick={handleClearInput}>
              <Cross width={24} height={24} className={styles.iconEye} />
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
