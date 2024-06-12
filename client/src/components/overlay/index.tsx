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

export const Overlay = ({
  opened,
  onClose,
  children,
  duration = 300,
}: ChildrenProps<IOverlayProps>) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const { mounted } = useMounted({ opened, duration });

  const styles = getStyles(opened);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }

      if (event.key === 'Tab' && modalRef.current) {
        const focusableElements =
          modalRef.current.querySelectorAll<HTMLElement>(
            'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])',
          );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    if (opened) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [opened, onClose]);

  const handleKeyPressOnClose = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClose();
    }
  };

  if (!mounted) return null;

  return (
    <Portal opened={opened}>
      <div className="absolute inset-0 py-10 flex justify-center items-center w-screen h-screen z-10">
        <div
          onClick={onClose}
          className={styles.overlay}
          style={{ animationDuration: `${duration}ms` }}
        />
        <div
          ref={modalRef}
          className={styles.modal}
          style={{ animationDuration: `${duration - 20}ms` }}
        >
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
