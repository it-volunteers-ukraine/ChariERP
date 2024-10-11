'use client';

import { useRef, useState } from 'react';

import { Delete, DotsSettings, Edit } from '@/assets/icons';
import { useOutsideClick } from '@/hooks';

const title = 'зробити до кінця місяця І ВІДПРАВИТИ НА ПЕРЕВІРКУ В ПОЛДАТКОВУ';
const rename = 'Перейменувати';
const deleting = 'видалити';

export const TasksColumn = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState<string>(title);
  const [isActiveMenu, setIsActiveMenu] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(true);

  const handlerClick = () => {
    setIsActiveMenu(false);
    setValue('');
    setIsActive(false);
  };

  const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  useOutsideClick(ref, () => setIsActiveMenu(false));

  return (
    <div className="max-w-[254px] rounded-md bg-whiteSecond px-4 py-5">
      <div className="relative flex items-center justify-between gap-x-1 py-2">
        <p className="line-clamp-1 break-all font-scada text-xl font-bold uppercase text-comet">{value}</p>

        <input
          type="text"
          value={value}
          onClick={() => setIsActive(false)}
          disabled={isActive}
          onChange={handlerInputChange}
        />

        <button onClick={() => setIsActiveMenu(true)}>
          <DotsSettings className="h-6 w-6" />
        </button>
        {isActiveMenu ? (
          <div
            ref={ref}
            className="absolute bottom-0 left-0 flex w-[200px] translate-y-full flex-col gap-2 rounded-md border-[1px] bg-white p-2"
          >
            <button
              onClick={handlerClick}
              className="flex justify-between rounded p-2 font-robotoCondensed text-base text-comet transition hover:bg-arcticSky"
            >
              {rename}
              <Edit className="h-6 w-6" />
            </button>

            <button
              onClick={handlerClick}
              className="flex justify-between rounded p-2 font-robotoCondensed text-base text-comet transition hover:bg-arcticSky"
            >
              {deleting}
              <Delete className="h-6 w-6" />
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
