'use client';

import { useRef, useState } from 'react';

import { useOutsideClick } from '@/hooks';
import { Delete, Dots, Download } from '@/assets/icons';

import { getStyles } from './styles';

export const DotsWrapper = ({ download, removeFile }: { download: () => void; removeFile: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const ref = useRef<HTMLDivElement>(null);
  const styles = getStyles(isOpen);

  const downloadFile = () => {
    download();
    setIsOpen(false);
  };

  const deleteFile = () => {
    removeFile();
    setIsOpen(false);
  };

  useOutsideClick(() => setIsOpen(false), ref);

  return (
    <>
      <div onClick={() => setIsOpen(!isOpen)} className={styles.dotsWrapper}>
        <Dots className={styles.icon} />
      </div>

      <div className={styles.optionsWrapper} ref={ref}>
        <div onClick={downloadFile} className={styles.option}>
          <span className={styles.optionText}>Завантажити</span>

          <Download />
        </div>

        <div onClick={deleteFile} className={styles.option}>
          <span className={styles.optionText}>Видалити</span>

          <Delete className={styles.icon} />
        </div>
      </div>
    </>
  );
};
