'use client';
import React, { useState } from 'react';

import { ArrowUp } from '@/assets/icons';

import { Title } from '../title';
import { getStyles } from './styles';
import { IAccordionProps } from './types';

export const Accordion = ({
  title,
  children,
  classNameTitle,
  classNameWrapper,
  classNameChildren,
  initialState = false,
}: IAccordionProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(initialState);

  const styles = getStyles({ isOpen, classNameWrapper, classNameChildren });

  return (
    <div className={styles.wrapper}>
      <div onClick={() => setIsOpen(!isOpen)} className="flex items-center justify-start cursor-pointer">
        <Title className={classNameTitle} title={title} />

        <div className={styles.arrow}>
          <ArrowUp />
        </div>
      </div>

      <div className={styles.children}>{children}</div>
    </div>
  );
};
