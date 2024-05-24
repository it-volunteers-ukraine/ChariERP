import React from 'react';
import Link from 'next/link';

// import { Check } from '@/assets/icons';
import { Check } from './icon';
import { ICheckboxProps } from './types';

import { getStyles } from './styles';

const Checkbox = ({
  error,
  label,
  width,
  checked,
  onChange,
  disabled,
  hrefText,
  href = '#',
  type = 'checkbox',
}: ICheckboxProps) => {
  const styles = getStyles({
    error,
    width,
    label,
    checked,
    disabled,
    onChange,
  });

  return (
    <label onChange={onChange} className={styles.label}>
      <div className={type === 'checkbox' ? styles.checkbox : styles.radio}>
        <input
          type={type}
          checked={checked}
          disabled={disabled}
          className={styles.input}
        />

        {checked && type === 'checkbox' && <Check disabled={disabled} />}
        {checked && type === 'radio' && (
          <div className={styles.radioChecked}></div>
        )}
      </div>

      {label && (
        <div className={styles.text} style={styles.textStyle}>
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

export { Checkbox };
