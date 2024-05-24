'use client';
import React, { useState } from 'react';
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
  disabled,
  hrefText,
  href = '#',
  type = 'checkbox',
}: ICheckboxProps) => {
  const [check, setCheck] = useState<boolean>(false);
  const styles = getStyles({
    error,
    width,
    label,
    checked: check,
    disabled,
  });

  console.log(checked);

  return (
    <label onChange={() => setCheck(!check)} className={styles.label}>
      <div className={styles.checkbox}>
        <input
          type={type}
          checked={check}
          disabled={disabled}
          className={styles.input}
        />

        {check && <Check disabled={disabled} />}
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
