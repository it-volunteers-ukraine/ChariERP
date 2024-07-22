'use client';
import { useEffect, useRef } from 'react';

import { useMounted } from '@/hooks';
import { Close } from '@/assets/icons';
import { ChildrenProps } from '@/types';

import { Portal } from '../portal';
import { getStyles } from './styles';

interface IOverlayProps {
  opened: boolean;
  duration?: number;
  onClose: () => void;
}

export const Overlay = ({ opened, onClose, children, duration = 300 }: ChildrenProps<IOverlayProps>) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { unmounted } = useMounted({ opened, duration });

  const styles = getStyles(opened);

  const handleKeyPressOnClose = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClose();
    }
  };

  useEffect(() => {
    if (modalRef.current) {
      modalRef.current.focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      function focusElement(compareElement: HTMLElement, focusElement: HTMLElement) {
        if (document.activeElement === compareElement) {
          event.preventDefault();
          focusElement.focus();
        }
      }

      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
          'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
        );

        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        event.shiftKey ? focusElement(firstElement, lastElement) : focusElement(lastElement, firstElement);
      }
    };

    if (opened) {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [opened, onClose, modalRef, unmounted]);

  if (!unmounted) return null;

  return (
    <Portal opened={unmounted}>
      <div className="absolute inset-0 py-10 flex justify-center items-center w-screen h-screen z-10">
        <div onClick={onClose} className={styles.overlay} style={{ animationDuration: `${duration}ms` }} />
        <div ref={modalRef} className={styles.modal} style={{ animationDuration: `${duration - 20}ms` }} tabIndex={0}>
          <Close
            width={24}
            height={24}
            tabIndex={0}
            role="button"
            onClick={onClose}
            className={styles.svg}
            onKeyPress={handleKeyPressOnClose}
          />
          {children}
        </div>
      </div>
    </Portal>
  );
};
