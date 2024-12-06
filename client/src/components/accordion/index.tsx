'use client';
import React, { useState, useRef, useCallback, useEffect } from 'react';

import { ArrowUp } from '@/assets/icons';

import { Title } from '../title';
import { getStyles } from './styles';
import { IAccordionProps } from './types';

export const Accordion = ({
  title,
  children,
  changedLength,
  classNameTitle,
  classNameWrapper,
  classNameChildren,
  initialState = false,
}: IAccordionProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef<boolean>(true);

  const [isOpen, setIsOpen] = useState<boolean>(initialState);
  const [maxHeight, setMaxHeight] = useState<string>(initialState ? 'none' : '0px');

  const toggleAccordion = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = `${contentRef.current.children.length * 130 - 50}px`;

      if (isFirstRender.current && initialState) {
        setMaxHeight(contentHeight);
      } else {
        setMaxHeight(isOpen ? contentHeight : '0px');
      }

      isFirstRender.current = false;
    }
  }, [isOpen, changedLength, initialState, contentRef.current?.children.length]);

  const styles = getStyles({ isOpen, classNameTitle, classNameWrapper, classNameChildren });

  return (
    <div className={styles.wrapper}>
      <div onClick={toggleAccordion} className="flex w-fit cursor-pointer items-center justify-start">
        <Title className={styles.title} title={title} />

        <div className={styles.arrow}>
          <ArrowUp width={24} height={24} className="text-lightBlue" />
        </div>
      </div>

      <div
        ref={contentRef}
        className={styles.children}
        style={{ maxHeight: maxHeight, transition: isFirstRender.current ? 'none' : `max-height 0.3s ease` }}
      >
        {children}
      </div>
    </div>
  );
};
