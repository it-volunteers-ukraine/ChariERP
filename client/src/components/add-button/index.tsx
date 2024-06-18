import React from 'react';

import { IAddBtn } from './types';

import { getStyles } from './styles';

export const AddBtn = ({ text, onClick, className }: IAddBtn) => {
  const styles = getStyles(className);

  return (
    <button type="button" onClick={onClick} className={styles.button}>
      <span className={styles.plus}>+</span>
      {text}
    </button>
  );
};
