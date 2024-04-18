import { useRef, useState } from 'react';

import { Icon } from '@/assets';

import { getStyles } from './styles';
import { InputProps } from './types';

export const Input = ({
  name,
  info,
  label,
  error,
  disabled,
  type = 'text',
  placeholderItalic,
  ...props
}: InputProps) => {
  const [visiblePassword, setVisiblePassword] = useState(type);
  const ref = useRef<HTMLInputElement>(null);

  const styles = getStyles({
    disabled,
    error: !!error,
    placeholderItalic,
    isTypePassword: type === 'password',
    visiblePassword: visiblePassword === 'text',
  });

  const handleFocus = () => {
    if (ref.current) {
      ref.current.focus();
    }
  };

  return (
    <div className="flex flex-col gap-1 w-full">
      <div className="flex flex-col gap-1 w-full">
        <fieldset className={styles.fieldset}>
          <legend className="ml-[10px] px-1 pb-1">
            <span className={styles.star}>*</span>
            <span className={styles.label}>{label}</span>
          </legend>

          <input
            ref={ref}
            name={name}
            disabled={disabled}
            type={visiblePassword}
            className={styles.input}
            {...props}
          />

          {type === 'password' && (
            <div className={styles.div} onClick={handleFocus}>
              {visiblePassword === 'password' ? (
                <Icon.EyeOff
                  width={24}
                  height={24}
                  className={styles.iconEye}
                  onClick={() => setVisiblePassword('text')}
                />
              ) : (
                <Icon.Eye
                  width={24}
                  height={24}
                  className={styles.iconEye}
                  onClick={() => setVisiblePassword('password')}
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
        <div className="flex text-input-info">
          <Icon.Info
            width={14}
            height={14}
            className="self-center text-input-info mr-1"
          />

          {info}
        </div>
      )}
    </div>
  );
};
