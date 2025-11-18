'use client';

import React, { useState, useRef, useEffect } from 'react';
import logger from '@/utils/logger/logger';

import { IAccordionProps } from './types';
import { getStyles } from './styles';

export const Accordion = ({ children, classNameTitle, classNameWrapper, isOpen = false }: IAccordionProps) => {
  const isFirstRender = useRef<boolean>(true);
  const childrenContainer = useRef<HTMLDivElement>(null);

  const [maxHeight, setMaxHeight] = useState<string>('unset');

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

  const styles = getStyles({ isOpen, classNameTitle, classNameWrapper });

  if (React.Children.count(children) !== 1) {
    logger.error('Children має бути лише один елемент.');
  }

  return (
    <div className={styles.wrapper}>
      <div
        className={styles.children}
        style={{
          maxHeight: accordionHeight,
          overflow: isOpen ? 'visible' : 'hidden',
          transition: isFirstRender.current ? 'none' : `max-height 0.3s ease `,
        }}
      >
        <div ref={childrenContainer}>{children}</div>
      </div>
    </div>
  );
};
