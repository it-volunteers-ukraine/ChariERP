'use client';

import {
  Children,
  cloneElement,
  CSSProperties,
  isValidElement,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react';

import { useOutsideClick } from '@/hooks';

import { IEllipsisTextProps } from './types';
import { getStyles } from './style';

export const EllipsisText = ({
  children,
  isMultiline,
  widthToolTip,
  marginTooltip = 4,
  classNameWrapper = null,
  classNameTooltipText = null,
  classNameTooltipWrapper = null,
}: IEllipsisTextProps) => {
  const [text, setText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [targetWidth, setTargetWidth] = useState(230);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isEllipsisTarget, setIsEllipsisTarget] = useState(false);
  const [isEllipsisTooltip, setIsEllipsisTooltip] = useState(false);

  const targetRef = useRef<HTMLElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const tooltipWrapperRef = useRef<HTMLDivElement>(null);

  useOutsideClick(tooltipRef, () => {
    setIsOpen(false);
  });

  useEffect(() => {
    const checkTouchDevice = () => {
      setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    };

    if (typeof window !== 'undefined') {
      checkTouchDevice();
    }
  }, []);

  const checkTargetEllipsis = () => {
    if (!targetRef.current) return;

    const element = targetRef.current as HTMLElement;

    setText(element.textContent || '');
    setTargetWidth(element.clientWidth);

    const isOverflow = isMultiline
      ? element.scrollHeight > element.clientHeight + 1
      : element.scrollWidth > element.clientWidth;

    setIsEllipsisTarget(isOverflow);
  };

  const checkTooltipEllipsis = () => {
    if (!tooltipRef.current) return;

    const element = tooltipRef.current as HTMLElement;

    if (!isEllipsisTooltip) {
      const isOverflow = element.scrollWidth > element.clientWidth;

      setIsEllipsisTooltip(isOverflow);
    }
  };

  const calculateTooltipSpacing = (
    rectTarget: DOMRect,
    windowWidth: number,
    windowHeight: number,
    rectWrapperToolTip: DOMRect,
  ) => {
    const spaceBelowTooltip = windowHeight - rectWrapperToolTip.bottom - 20;
    let spaceToLeftEdge = 0;
    let spaceToRightEdge = 0;

    if (widthToolTip) {
      if (widthToolTip < targetWidth) {
        spaceToLeftEdge = rectTarget.left + (targetWidth - widthToolTip) / 2 - 20;
        spaceToRightEdge = windowWidth - rectTarget.right + (targetWidth - widthToolTip) / 2 - 20;
      } else {
        spaceToLeftEdge = rectTarget.left + targetWidth / 2 - widthToolTip / 2 - 20;
        spaceToRightEdge = windowWidth - rectTarget.right + targetWidth / 2 - widthToolTip / 2 - 20;
      }
    } else {
      spaceToLeftEdge = rectTarget.left - 10;
      spaceToRightEdge = windowWidth - rectTarget.right - 20;
    }

    return { spaceBelowTooltip, spaceToRightEdge, spaceToLeftEdge };
  };

  const updateTooltipPosition = () => {
    if (isOpen && targetRef.current && tooltipRef.current && tooltipWrapperRef.current) {
      const rectTarget = targetRef.current.getBoundingClientRect();
      const rectTooltip = tooltipRef.current.getBoundingClientRect();
      const rectWrapperToolTip = tooltipWrapperRef.current.getBoundingClientRect();

      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      const style: CSSProperties = {};

      const { spaceBelowTooltip, spaceToRightEdge, spaceToLeftEdge } = calculateTooltipSpacing(
        rectTarget,
        windowWidth,
        windowHeight,
        rectWrapperToolTip,
      );

      style.left = '50%';
      style.transform = 'translateX(-50%)';
      style.height = `${rectTarget.height + marginTooltip + rectTooltip.height}px`;

      if (widthToolTip) {
        if (widthToolTip < targetWidth) {
          style.alignItems = 'center';
          style.width = `${targetWidth}px`;
        }
      }

      if (spaceToRightEdge < 0) {
        if ('left' in style) {
          delete style.left;
        }

        style.right = '0px';
        style.alignItems = 'start';
        style.transform = 'translateX(0)';

        if (widthToolTip) {
          if (widthToolTip > targetWidth) {
            const distanceToTarget = (windowWidth - rectTarget.right - 20) * -1;

            if (distanceToTarget < 0) {
              style.right = `${distanceToTarget + 5}px`;
            } else {
              style.right = '0px';
              style.width = `${widthToolTip + 5 + distanceToTarget}px`;
            }
          } else {
            if ((targetWidth - widthToolTip) / 2 + spaceToRightEdge < 0) {
              style.width = `${targetWidth + 5 + ((targetWidth - widthToolTip) / 2 + spaceToRightEdge) * -1}px`;
            } else {
              style.alignItems = 'end';
              tooltipRef.current.style.marginRight = `${spaceToRightEdge * -1 + targetWidth / 2 - 45}px`;
            }
          }
        } else {
          style.width = `${targetWidth + 5 + spaceToRightEdge * -1}px`;
        }
      } else {
        if (spaceToLeftEdge < 0) {
          style.left = '0px';
          style.alignItems = 'end';
          style.transform = 'translateX(0)';

          if (widthToolTip) {
            if (widthToolTip > targetWidth) {
              const distanceToTarget = (rectTarget.left - 10) * -1;

              if (distanceToTarget < 0) {
                style.left = `${distanceToTarget}px`;
              } else {
                style.left = '0px';
                style.width = `${widthToolTip + distanceToTarget}px`;
              }
            } else {
              if ((targetWidth - widthToolTip) / 2 + spaceToLeftEdge < 0) {
                style.width = `${targetWidth - 10 + ((targetWidth - widthToolTip) / 2 + spaceToLeftEdge) * -1}px`;
              } else {
                style.alignItems = 'start';
                tooltipRef.current.style.marginLeft = `${spaceToLeftEdge * -1 + targetWidth / 2 - 60}px`;
              }
            }
          } else {
            style.width = `${targetWidth + spaceToLeftEdge * -1}px`;
          }
        }
      }

      if (spaceBelowTooltip < 0) {
        style.bottom = '0px';
        style.flexDirection = 'column';
      } else {
        style.top = '0px';
        style.flexDirection = 'column-reverse';
      }

      if (tooltipWrapperRef.current) {
        Object.assign(tooltipWrapperRef.current?.style, {
          ...style,
        });
      }
    }
  };

  useEffect(() => {
    checkTargetEllipsis();
  }, [children]);

  useEffect(() => {
    if (isOpen) {
      checkTooltipEllipsis();
    }
    updateTooltipPosition();
  }, [isOpen]);

  const styles = getStyles({
    isEllipsisTooltip,
    classNameTooltipText,
    classNameTooltipWrapper,
  });

  const childrenUpdate = Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child as ReactElement, {
        ref: targetRef,
        onMouseEnter: !isTouchDevice
          ? () => {
              if (!isOpen) {
                setIsOpen(true);
              }
            }
          : undefined,

        onClick: isTouchDevice
          ? (e: React.MouseEvent) => {
              e.stopPropagation();
              setIsOpen(true);
            }
          : undefined,
      });
    }

    return child;
  });

  return (
    <div className={classNameWrapper ? `${classNameWrapper} relative` : 'relative'}>
      {childrenUpdate}

      {isOpen && isEllipsisTarget && (
        <div
          onMouseLeave={!isTouchDevice ? () => setIsOpen(false) : undefined}
          ref={tooltipWrapperRef}
          style={{ position: 'absolute', width: widthToolTip ? widthToolTip : targetWidth }}
          className="z-10 flex"
        >
          <div
            ref={tooltipRef}
            className={styles.toolTipWrapper}
            style={{
              maxWidth: widthToolTip ? widthToolTip : targetWidth,
            }}
          >
            <p className={styles.toolTipText}>{text}</p>
          </div>
        </div>
      )}
    </div>
  );
};
