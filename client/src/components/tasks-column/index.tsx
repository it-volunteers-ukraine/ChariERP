'use client';

import { useEffect, useRef, useState } from 'react';

import { useOutsideClick } from '@/hooks';
import { Delete, DotsSettings, Edit } from '@/assets/icons';

import { showMessage } from '../toastify';

import { getStyles } from './styles';

const deleting = 'видалити';
const edit = 'Перейменувати';
const title = 'зробити до кінця місяця І ВІДПРАВИТИ НА ПЕРЕВІРКУ В ПОЛДАТКОВУ';

export const TasksColumn = () => {
  const refInput = useRef<HTMLInputElement>(null);
  const refDropMenu = useRef<HTMLDivElement>(null);

  const [value, setValue] = useState<string>(title);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [isActiveDropMenu, setIsActiveDropMenu] = useState<boolean>(false);

  const style = getStyles(isDisable);

  const handlerEdit = () => {
    setIsActiveDropMenu(false);
    setIsDisable(false);
    refInput.current?.focus();
  };

  const handlerDelete = () => {
    setIsActiveDropMenu(false);
    setIsDisable(false);
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

        <button onClick={() => setIsActiveDropMenu(true)}>
          <DotsSettings className="h-6 w-6" />
        </button>
        {isActiveDropMenu ? (
          <div ref={refDropMenu} className={style.dropMenu}>
            <button onClick={handlerEdit} className={style.btnEdit}>
              {edit}
              <Edit className="h-6 w-6" />
            </button>

            <button onClick={handlerDelete} className={style.btnDelete}>
              {deleting}
              <Delete className="h-6 w-6" />
            </button>
          </div>
        ) : null}
      </div>

      <button className={style.btnAdd}>
        <span className="text-[20px] font-bold leading-none">+</span>
        <span className="leading-5">Додати завдання</span>
      </button>
    </div>
  );
};
