// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'Home',
//   description: 'Home page',
// };

//TODO delete strings 9 - 17, 20 - 54, 57 - 97
'use client';

import { useEffect, useRef, useState } from 'react';

import { TasksColumn } from '@/components';

import { columns } from '../home/mock';
import { cn } from '@/utils';
import { useTranslations } from 'next-intl';

const Home = () => {
  const refInput = useRef<HTMLInputElement>(null);
  const translateBtn = useTranslations('button');

  const [value, setValue] = useState('');
  const [dataColumn, setDataColumn] = useState(columns);
  const [createColumn, setCreateColumn] = useState(false);

  const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onBlurChange = () => {
    if (value !== '') {
      setCreateColumn(true);
      dataColumn.push({ id: '100', title: value, tasks: [] });
      setValue('');
      refInput.current?.blur();
    }
    setCreateColumn(false);
  };

  const onClickCreateColumn = () => {
    setCreateColumn(true);
    refInput.current?.focus();
  };

  console.log(dataColumn);

  useEffect(() => {
    if (createColumn && refInput) {
      console.log(1111);

      refInput.current?.focus();
    }
  }, [createColumn, dataColumn, refInput]);

  // return <>Home</>
  return (
    <div className="scroll-textarea flex h-full gap-6 overflow-x-scroll bg-white px-10 py-5">
      {dataColumn.map((item, index) => (
        <TasksColumn
          {...item}
          key={item.id}
          idx={index}
          onDeleteColumn={(id) => setDataColumn((prev) => prev.filter((item) => item.id !== id))}
        />
      ))}

      {createColumn && (
        <div className="flex h-fit min-h-[254px] w-[254px] flex-col gap-y-3 rounded-md bg-whiteSecond px-4 py-5">
          <input
            type="text"
            value={value}
            ref={refInput}
            onBlur={onBlurChange}
            className={cn(
              'max-w-[222`px] text-ellipsis text-nowrap break-all border-[1px] p-2 font-scada text-xl font-bold uppercase text-comet',
              !createColumn && 'rounded-lg border-skyBlue bg-white',
            )}
            placeholder="додати колонку"
            onChange={handlerInputChange}
          />
          <button className="box-border flex w-full items-center justify-start gap-x-3 rounded-lg border-[1px] bg-arcticSky p-3 font-roboto text-comet hover:border-skyBlue">
            <span className="text-2xl font-bold leading-none">+</span>

            <span className="text-sm leading-5">{translateBtn('addTask')}</span>
          </button>
        </div>
      )}

      <button
        onClick={onClickCreateColumn}
        className="flex h-[254px] w-[254px] flex-col items-center justify-center gap-y-3 rounded-md bg-whiteSecond px-4 py-5"
      >
        <span className="font-scada text-5xl text-comet">+</span>
        <p className="w w-[222px] text-nowrap text-center font-scada text-comet">Нова колонка</p>
      </button>
    </div>
  );
};

export default Home;
