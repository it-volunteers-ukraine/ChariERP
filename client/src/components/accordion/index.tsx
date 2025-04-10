'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';

import { ArrowUp } from '@/assets/icons';

import { Title } from '../title';
import { getStyles } from './styles';
import { IAccordionProps } from './types';

export const Accordion = ({
  title,
  children,
  classNameTitle,
  classNameWrapper,
  initialState = false,
}: IAccordionProps) => {
  const isFirstRender = useRef<boolean>(true);
  const childrenContainer = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState<boolean>(initialState);
  const [maxHeight, setMaxHeight] = useState<string>('unset');

  const toggleAccordion = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const styles = getStyles({ isOpen, classNameTitle, classNameWrapper });

  useEffect(() => {
    let resizeObserver: ResizeObserver | undefined;

    if (childrenContainer.current) {
      setMaxHeight(childrenContainer.current.offsetHeight.toString());

      resizeObserver = new ResizeObserver((entries) => {
        const entry = entries[0];

        setMaxHeight(entry.contentRect.height.toString());
      });

      resizeObserver.observe(childrenContainer.current);
    }

    isFirstRender.current = false;

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [childrenContainer]);

  const accordionHeight = isOpen ? `${maxHeight}px` : '0px';

  if (React.Children.count(children) !== 1) {
    console.error('Children має бути лише один елемент.');
  }

  return (
    <div className={styles.wrapper}>
      <div onClick={toggleAccordion} className="flex w-fit cursor-pointer items-center justify-start">
        <Title className={styles.title} title={title} />

        <div className={styles.arrow}>
          <ArrowUp width={24} height={24} className="text-lightBlue" />
        </div>
      </div>

      <div
        className={styles.children}
        style={{ maxHeight: accordionHeight, transition: isFirstRender.current ? 'none' : `max-height 0.3s ease` }}
      >
        <div ref={childrenContainer}>{children}</div>
      </div>
    </div>
  );
};
