import React, { useState } from 'react';

import { ArrowUp } from '@/assets/icons';

import { getStyles } from './styles';
import { IAccordionProps } from './typex';

export const Accordion = ({ title, description, disabled }: IAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const styles = getStyles({ isOpen, disabled });

  return (
    <div onClick={() => !disabled && setIsOpen(!isOpen)} className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h1 className={styles.title}>{title}</h1>

        <div className={styles.arrowWrapper}>
          <ArrowUp className={styles.arrow} />
        </div>
      </div>

      <div className={styles.descriptionWrapper}>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};
