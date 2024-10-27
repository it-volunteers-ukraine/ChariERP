'use client';

import {
  useRef,
  Children,
  useState,
  ReactNode,
  useEffect,
  cloneElement,
  ReactElement,
  CSSProperties,
  isValidElement,
} from 'react';

import { useOutsideClick } from '@/hooks';

import { Portal } from '../portal';
import { getStyles } from './style';
import { IEllipsisTextProps } from './types';

export const EllipsisText = ({
  content,
  children,
  className,
  margin = 0,
  delay = 200,
  isShowAlways,
}: IEllipsisTextProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEllipsis, setIsEllipsis] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isEllipsisTooltip, setIsEllipsisTooltip] = useState(false);

  const targetRef = useRef<HTMLElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipWrapperRef = useRef<HTMLDivElement>(null);
  const tooltipTextRef = useRef<HTMLParagraphElement>(null);

  useOutsideClick(tooltipWrapperRef, () => {
    setIsOpen(false);
  });

  const checkTargetEllipsis = () => {
    if (!targetRef.current) return;

    const element = targetRef.current as HTMLElement;

    const offsetHeight = element.offsetHeight || 0;
    const scrollHeight = element.scrollHeight || 0;

    const heightRatio = scrollHeight / offsetHeight;

    setIsEllipsis(element.scrollWidth - 0.1 > element.clientWidth || heightRatio > 1.3);
  };

  const checkTooltipEllipsis = () => {
    if (!tooltipTextRef.current) return;

    const element = tooltipTextRef.current as HTMLElement;

    if (!isEllipsisTooltip) {
      const isOverflow = element.scrollWidth > element.clientWidth - 1;

      setIsEllipsisTooltip(isOverflow);
    }
  };

  const updatePosition = () => {
    if (isOpen && targetRef.current && tooltipWrapperRef.current) {
      const targetRect = targetRef.current.getBoundingClientRect();
      const tooltipWrapperRect = tooltipWrapperRef.current.getBoundingClientRect();

      const style: CSSProperties = {};
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const scrollY = window.scrollY;
      const scrollX = window.scrollX;

      const distanceTop = targetRect.top + scrollY + margin + targetRect.height;
      const distanceBottom = windowHeight - (targetRect.top + scrollY) + margin;

      const distanceLeft = targetRect.left + scrollX + targetRect.width / 2 - tooltipWrapperRect.width / 2;
      const distanceRight = windowWidth - distanceLeft - tooltipWrapperRect.width;

      style.maxWidth = 'calc(100% - 20px)';

      if (distanceLeft < 11 && distanceRight < 50) {
        style.left = '10px';
        style.marginRight = '10px';
      } else if (distanceLeft < 11 || distanceRight < 11) {
        if (distanceLeft < 11) {
          style.left = '10px';
        }

        if (distanceRight < 11) {
          style.right = '10px';
        }
      } else {
        style.left = `${distanceLeft}px`;
      }

      const isBottom = windowHeight - targetRect.top - targetRect.height - margin - tooltipWrapperRect.height > 0;
      const isMoreSpaceTop =
        windowHeight - targetRect.top - targetRect.height - margin - tooltipWrapperRect.height >
        targetRect.top - margin - tooltipWrapperRect.height;

      if (isBottom || isMoreSpaceTop) {
        style.top = `${distanceTop}px`;
      } else {
        style.bottom = `${distanceBottom}px`;
      }

      if (tooltipWrapperRef.current) {
        Object.assign(tooltipWrapperRef.current?.style, {
          ...style,
        });
      }
    }
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, delay);
  };

  const handleMouseEnter = () => {
    checkTargetEllipsis();

    if (!isOpen) {
      setIsOpen(true);
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => {
    if (!isShowAlways) {
      checkTargetEllipsis();
    }
  }, [children]);

  useEffect(() => {
    if (isTouchDevice) {
      window.addEventListener('touchmove', () => setIsOpen(false));
    }

    return () => {
      window.removeEventListener('touchmove', () => setIsOpen(false));
    };
  }, [isOpen, isTouchDevice]);

  useEffect(() => {
    if (isOpen && !isEllipsisTooltip) {
      checkTooltipEllipsis();
    }

    updatePosition();
  }, [isOpen]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }
  }, []);

  const updateChildren = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement, {
        ref: targetRef,
        onMouseEnter: !isTouchDevice ? handleMouseEnter : undefined,
        onMouseLeave: !isTouchDevice ? handleMouseLeave : undefined,
        onClick: isTouchDevice
          ? (e: React.MouseEvent) => {
              e.stopPropagation();
              checkTargetEllipsis();
              setIsOpen(true);
            }
          : undefined,
      });
    }

    return child;
  });

  const updateContent = () => {
    const renderTooltip = (content: ReactNode) => (
      <div
        ref={tooltipWrapperRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={styles.toolTipWrapper}
      >
        {content}
      </div>
    );

    let newContent;

    if (isValidElement(content)) {
      newContent = content;
    } else if (typeof content === 'string') {
      newContent = (
        <p ref={tooltipTextRef} className={styles.toolTipText}>
          {content}
        </p>
      );
    } else {
      newContent = <p></p>;
    }

    return renderTooltip(newContent);
  };

  const styles = getStyles({ isEllipsisTooltip, className });

  return (
    <>
      {updateChildren}
      {!isShowAlways && isEllipsis && <Portal opened={isOpen}>{updateContent()}</Portal>}
      {isShowAlways && <Portal opened={isOpen}>{updateContent()}</Portal>}
    </>
  );
};
