import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import { Close } from '@/assets/icons';

import { getStyles } from './styles';
import { IModalProps } from './types';

export const Modal = ({ children, onClose }: IModalProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRoot = document.getElementById('modal-root')!;

  const styles = getStyles({
    isModalOpen,
  });

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => {
      onClose();
    }, 300);
  }, [onClose]);

  useEffect(() => {
    setIsModalOpen(true);

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleModalClose();
      }
    };

    const trapFocus = (event: KeyboardEvent) => {
      const focusableElements = modalRoot.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
      ) as NodeListOf<HTMLElement>;

      if (focusableElements.length === 0) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.key === 'Tab') {
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

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keydown', trapFocus);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keydown', trapFocus);
      document.body.style.overflow = '';
    };
  }, [handleModalClose, modalRoot]);

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    if (event.target === event.currentTarget) {
      handleModalClose();
    }
  };

  return createPortal(
    <div id="overlay" onClick={handleOverlayClick} className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.button} onClick={handleModalClose}>
          <Close width={24} height={24} />
        </button>
        {children}
      </div>
    </div>,
    modalRoot,
  );
};
