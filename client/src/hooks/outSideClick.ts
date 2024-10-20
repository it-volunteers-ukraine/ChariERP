'use client';

import { RefObject, useEffect } from 'react';

const useOutsideClick = <T extends HTMLElement = HTMLDivElement>(ref: RefObject<T>, callback: () => void) => {
  const handleClick = (e: MouseEvent) => {
    if (ref && ref.current && !ref.current.contains(e.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });
};

export { useOutsideClick };
