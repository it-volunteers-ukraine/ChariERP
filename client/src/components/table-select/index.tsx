'use client';

import { useRef, useState } from 'react';

import { ArrowUp } from '@/assets/icons';
import { useOutsideClick } from '@/hooks';

import { getStyles } from './styles';

const optionsData = ['--НЕ ВИЗНАЧЕНО--', 'Мебель', 'Будівельні матеріали', 'Канцелярія', 'Побутова хімія', 'Техніка'];

export const TableSelect = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const addValueRef = useRef<HTMLInputElement>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('--НЕ ВИЗНАЧЕНО--');
  const [addValue, setAddValue] = useState('');

  const isSelected = selected !== '--НЕ ВИЗНАЧЕНО--';
  const styles = getStyles({ isOpen, isSelected });

  useOutsideClick(() => setIsOpen(false), wrapperRef);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && addValue.trim()) {
      optionsData.push(addValue.trim());
      setAddValue('');
      addValueRef.current?.blur();
    }
  };

  return (
    <div className={styles.wrapper} ref={wrapperRef}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.btn}>
        <span className={styles.selected}>{selected}</span>

        <ArrowUp className={styles.arrow} />
      </button>

      <div className="my-3 bg-white px-1">
        <div className="scroll-column scroll-lightBlue h-full max-h-[240px] overflow-y-auto px-1">
          {optionsData.map((option) => (
            <label key={option} className={styles.option}>
              <input
                type="radio"
                name={option}
                value={option}
                className="sr-only"
                checked={selected === option}
                onChange={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
              />

              <div className="flex h-4 w-4 items-center justify-center rounded-full bg-scrollItemBg">
                <div className="flex h-3 w-3 items-center justify-center rounded-full bg-white">
                  {selected === option && <div className="h-2 w-2 rounded-full bg-scrollItemBg" />}
                </div>
              </div>

              <span className={styles.optionText}>{option}</span>
            </label>
          ))}
        </div>

        <label className={styles.option}>
          <input
            name="add"
            type="text"
            value={addValue}
            ref={addValueRef}
            placeholder="+ Додати"
            className={styles.addBtn}
            onKeyDown={handleKeyDown}
            onChange={(e) => setAddValue(e.target.value)}
          />
        </label>
      </div>
    </div>
  );
};
