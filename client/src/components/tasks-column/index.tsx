'use client';

import { useEffect, useRef, useState } from 'react';

import { useOutsideClick } from '@/hooks';
import { Delete, DotsSettings, Edit } from '@/assets/icons';

import { showMessage } from '../toastify';
import clsx from 'clsx';

const deleting = 'видалити';
const edit = 'Перейменувати';
const title = 'зробити до кінця місяця І ВІДПРАВИТИ НА ПЕРЕВІРКУ В ПОЛДАТКОВУ';

export const TasksColumn = () => {
  const refDropMenu = useRef<HTMLDivElement>(null);
  const refInput = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState<string>(title);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const [isActiveDropMenu, setIsActiveDropMenu] = useState<boolean>(false);

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
    <div className="flex max-w-[254px] flex-col rounded-md bg-whiteSecond px-4 py-5">
      <div className="relative flex items-center justify-between">
        <input
          ref={refInput}
          type="text"
          value={value}
          disabled={isDisable}
          onChange={handlerInputChange}
          onBlur={onBlurChange}
          className={clsx(
            'max-w-[196px] text-ellipsis break-all p-2 font-scada text-xl font-bold uppercase text-comet',
            { 'rounded-lg border-[1px] border-skyBlue bg-white': !isDisable, 'bg-transparent': isDisable },
          )}
        />

        <button onClick={() => setIsActiveDropMenu(true)}>
          <DotsSettings className="h-6 w-6" />
        </button>
      </div>

      {isActiveDropMenu ? (
        <div
          ref={refDropMenu}
          className="absolute bottom-0 left-0 flex w-[200px] translate-y-full flex-col gap-2 rounded-md border-[1px] bg-white p-2"
        >
          <button
            onClick={handlerEdit}
            className="flex justify-between rounded p-2 font-robotoCondensed text-base text-comet transition hover:bg-arcticSky"
          >
            {edit}
            <Edit className="h-6 w-6" />
          </button>

          <button
            onClick={handlerDelete}
            className="flex justify-between rounded p-2 font-robotoCondensed text-base text-comet transition hover:bg-arcticSky"
          >
            {deleting}
            <Delete className="h-6 w-6" />
          </button>
        </div>
      ) : null}

      <button className="box-border flex w-full items-center justify-start gap-x-3 rounded-lg border-[1px] bg-arcticSky p-3 font-roboto text-sm text-comet hover:border-skyBlue">
        <span className="text-[20px] font-bold leading-none">+</span>
        <span className="leading-5">Додати завдання</span>
      </button>
    </div>
  );
};
