import React from 'react';

import { ISmallBtn } from './types';
import { getStyles } from './styles';

export const SmallBtn = ({ type, text, onClick, className }: ISmallBtn) => {
  const styles = getStyles(className);

  return (
    <button type="button" onClick={onClick} className={styles.button}>
      {type === 'add' && <span className={styles.plus}>+</span>}
      {type === 'delete' && <span className={styles.plus}>-</span>}

      <span>{text}</span>
    </button>
  );
};
