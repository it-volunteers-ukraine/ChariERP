import React from 'react';
import Link from 'next/link';

import { Check } from '@/assets/icons';

import { ICheckboxProps } from './types';

import { getStyles } from './styles';

const CheckboxRadio = ({
  name,
  error,
  label,
  itemRef,
  checked,
  onChange,
  disabled,
  hrefText,
  className,
  href = '#',
  classNameText,
  type = 'checkbox',
}: ICheckboxProps) => {
  const styles = getStyles({
    error,
    label,
    checked,
    disabled,
    className,
    classNameText,
  });

  const checkboxClass = type === 'checkbox' ? styles.checkbox : styles.radio;

  return (
    <label className={styles.label}>
      <div className={checkboxClass}>
        <input
          name={name}
          type={type}
          ref={itemRef}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className={styles.input}
        />

        {checked && type === 'checkbox' && <Check className={styles.check} />}

        {checked && type === 'radio' && <div className={styles.radioCheck} />}
      </div>

      {label && (
        <div className={styles.text}>
          {label}

          {hrefText && (
            <Link className={styles.link} href={href}>
              {hrefText}
            </Link>
          )}
        </div>
      )}
    </label>
  );
};

export { CheckboxRadio };
