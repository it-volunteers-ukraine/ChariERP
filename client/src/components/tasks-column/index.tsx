'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { useOutsideClick } from '@/hooks';
import { Delete, DotsSettings, Edit } from '@/assets/icons';

import { showMessage } from '../toastify';
import { getStyles } from './styles';
import { TaskCard } from '../task-card';
import { mockCards } from '../task-card/mock';

export const TasksColumn = () => {
  const refInput = useRef<HTMLInputElement>(null);
  const refDropMenu = useRef<HTMLDivElement>(null);
  const translateBtn = useTranslations('button');
  const translateBoard = useTranslations('board');

  const [dataTack, setDataTack] = useState(mockCards);
  const [isDisable, setIsDisable] = useState(true);
  const [isActiveDropMenu, setIsActiveDropMenu] = useState(false);
  const [value, setValue] = useState(translateBoard('titleTask'));

  const style = getStyles(isDisable);

  const handlerEdit = () => {
    setIsActiveDropMenu(false);
    setIsDisable(false);
    refInput.current?.focus();
  };

  const handlerDelete = () => {
    setIsActiveDropMenu(false);
  };

  const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlurChange = () => {
    if (!value) {
      showMessage.error('Error');
      refInput.current?.focus();

      return;
    }
    setIsDisable(true);
  };

  useOutsideClick(refDropMenu, () => setIsActiveDropMenu(false));

  useEffect(() => {
    if (!isDisable && refInput) {
      refInput.current?.focus();
    }
  }, [isDisable]);

  return (
    <div className={style.columTask}>
      <div className={style.titleBox}>
        <input
          type="text"
          value={value}
          ref={refInput}
          disabled={isDisable}
          onBlur={onBlurChange}
          className={style.input}
          onChange={handlerInputChange}
        />

        <button className="rounded hover:bg-arcticSky" onClick={() => setIsActiveDropMenu(true)}>
          <DotsSettings className="h-6 w-6" />
        </button>

        {isActiveDropMenu ? (
          <div ref={refDropMenu} className={style.dropMenu}>
            <button onClick={handlerEdit} className={style.btnTools}>
              {translateBtn('edit')}
              <Edit className="h-6 w-6" />
            </button>

            <button onClick={handlerDelete} className={style.btnTools}>
              {translateBtn('delete')}
              <Delete className="h-6 w-6" />
            </button>
          </div>
        ) : null}
      </div>
      {dataTack.map((task, index: number) => {
        return (
          <TaskCard
            {...task}
            key={index}
            onDelete={(id) => setDataTack((prev) => prev.filter((item) => item.id !== id))}
          />
        );
      })}

      <button className={style.addTask}>
        <span className="text-2xl font-bold leading-none">+</span>
        <span className="text-sm leading-5">{translateBtn('addTask')}</span>
      </button>
    </div>
  );
};
