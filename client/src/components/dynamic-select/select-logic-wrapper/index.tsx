'use client';

import React, { useRef } from 'react';

import { useMounted, useOutsideClick } from '@/hooks';

import { selectStyles } from './style';
import { ISelectLogicWrapperProps } from './types';

export const SelectLogicWrapper = ({
  isOpen,
  options,
  selected,
  onChange,
  setIsOpen,
  renderOption,
  renderSelected,
  classNameWrapper,
  classNameDropList,
}: ISelectLogicWrapperProps) => {
  const listRef = useRef<HTMLDivElement | null>(null);
  const selectedRef = useRef<HTMLDivElement | null>(null);

  useOutsideClick(() => {
    setIsOpen(false);
  }, [selectedRef, listRef]);

  const { unmounted } = useMounted({ opened: isOpen, duration: 200 });

  const style = selectStyles({ classNameDropList, classNameWrapper, isOpen });

  return (
    <div className={style.wrapper}>
      <div ref={selectedRef} onClick={() => setIsOpen(!isOpen)}>
        {renderSelected(selected)}
      </div>

      {unmounted && (
        <div className={style.dropList} ref={listRef}>
          {options.map((option, idx) => (
            <li key={idx} className="list-none" onClick={() => onChange(option)}>
              {renderOption(option)}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};
