'use client';

import { useState } from 'react';
import Image from 'next/image';

import { Overlay } from '../overlay';

interface IModalImg {
  url: string;
  alt?: string;
  children: React.ReactNode;
}

export const ModalImg = ({ url, alt, children }: IModalImg) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsOpen(true);
  };

  const handleClose = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation();
    }
    setIsOpen(false);
  };

  return (
    <div onClick={handleOpen} className="cursor-pointer">
      {children}
      <Overlay isImg opened={isOpen} onClose={handleClose}>
        <Image
          fill
          src={url}
          alt={alt || 'photo'}
          onClick={handleClose}
          className="cursor-pointer rounded-lg border-none object-contain"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
        />
      </Overlay>
    </div>
  );
};
