'use client';

import React, { useRef } from 'react';

import { Loader } from '@/assets/icons';
import { useMounted, useOutsideClick } from '@/hooks';

import { selectStyles } from './styles';
import { ISelectLogicWrapperProps } from './types';

export const SelectLogicWrapper = ({
  isOpen,
  options,
  selected,
  onChange,
  isLoading,
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

  const style = selectStyles({ classNameDropList, classNameWrapper, isOpen, isLoading });

  return (
    <div className={style.wrapper}>
      {isLoading && (
        <div className="flex justify-center">
          <Loader className="w-6" />
        </div>
      )}

      {!isLoading && (
        <div ref={selectedRef} onClick={() => setIsOpen(!isOpen)}>
          {selected ? renderSelected(selected) : renderSelected({ id: '', value: '' })}
        </div>
      )}

      {unmounted && (
        <div className={style.dropList} ref={listRef}>
          {options.map((option, idx) => (
            <li
              key={idx}
              className="list-none"
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
            >
              {renderOption(option)}
            </li>
          ))}
        </div>
      )}
    </div>
  );
};
