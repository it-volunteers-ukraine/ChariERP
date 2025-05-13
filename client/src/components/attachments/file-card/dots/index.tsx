'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useOutsideClick } from '@/hooks';
import { Delete, Dots, Download } from '@/assets/icons';

import { getStyles } from './styles';
import { DotsWrapperProps } from './types';

export const DotsWrapper = ({ removeFile, preview, fileName, disabled }: DotsWrapperProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const text = useTranslations('attachments');

  const ref = useRef<HTMLDivElement>(null);
  const styles = getStyles(isOpen);

  const close = () => {
    setIsOpen(false);
  };

  const deleteFile = () => {
    removeFile();
    setIsOpen(false);
  };

  useOutsideClick(() => setIsOpen(false), ref);

  return (
    <>
      <div
        className={styles.dotsWrapper}
        onClick={() => {
          if (!disabled) {
            setIsOpen(!isOpen);
          }
        }}
      >
        <Dots className={styles.icon} />
      </div>

      <div className={styles.optionsWrapper} ref={ref}>
        <a href={preview} download={fileName} onClick={close} className={styles.option}>
          <span className={styles.optionText}>{text('download')}</span>

          <Download />
        </a>

        <div onClick={deleteFile} className={styles.option}>
          <span className={styles.optionText}>{text('delete')}</span>

          <Delete className={styles.icon} />
        </div>
      </div>
    </>
  );
};
