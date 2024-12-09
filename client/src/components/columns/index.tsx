'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

import { cn } from '@/utils';
import { TaskCard } from '@/components';
import { columns } from '@/components/columns/mock';

import { ColumnTasks } from './column-tasks';
import { IDataCards } from '../task-card/mock';

export interface IColumns {
  id: string;
  title: string;
  tasks: IDataCards[];
}

export const Columns = () => {
  const refInput = useRef<HTMLInputElement>(null);
  const translateBtn = useTranslations('button');

  const [value, setValue] = useState('');
  const [dataColumn, setDataColumn] = useState(columns);
  const [createColumn, setCreateColumn] = useState(false);

  const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleDeleteTask = (idDelete: string, idxColumn: number) => {
    setDataColumn((prev) => {
      const newColumn = { ...prev[idxColumn], tasks: prev[idxColumn].tasks.filter(({ id }) => id !== idDelete) };
      const newData = [...prev.slice(0, idxColumn), newColumn, ...prev.slice(idxColumn)];

      return newData;
    });
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

  useEffect(() => {
    if (createColumn && refInput) {
      refInput.current?.focus();
    }
  }, [createColumn, dataColumn, refInput]);

  return (
    <div className="scroll-blue scroll-column flex gap-6 overflow-y-hidden overflow-x-scroll bg-white px-5 py-5">
      {dataColumn.map((item, index) => (
        <ColumnTasks
          {...item}
          key={item.id}
          onChangeTitle={() => console.log(1)}
          onDeleteColumn={(id) => setDataColumn((prev) => prev.filter((item) => item.id !== id))}
        >
          <>
            {item.tasks.map((task, idx: number) => {
              return <TaskCard {...task} key={`task_${index}_${idx}`} onDelete={(id) => handleDeleteTask(id, index)} />;
            })}
          </>
        </ColumnTasks>
      ))}

      <div className="flex h-full gap-6 bg-white">
        {createColumn && (
          <div className="flex h-fit min-h-[254px] w-[254px] flex-col gap-y-3 rounded-md bg-whiteSecond px-4 py-5">
            <input
              type="text"
              value={value}
              ref={refInput}
              onBlur={onBlurChange}
              onChange={handlerInputChange}
              placeholder={translateBtn('addColumn')}
              className={cn(
                'max-w-[222`px] text-ellipsis text-nowrap break-all border-[1px] p-2 font-scada text-xl font-bold uppercase text-comet',
              )}
            />

            <button className="box-border flex w-full items-center justify-start gap-x-3 rounded-lg border-[1px] bg-arcticSky p-3 font-roboto text-comet hover:border-skyBlue">
              <span className="text-2xl font-bold leading-none">+</span>

              <span className="text-sm leading-5">{translateBtn('addTask')}</span>
            </button>
          </div>
        )}

        <button
          onClick={onClickCreateColumn}
          className="flex h-[254px] w-[254px] flex-col items-center justify-center gap-y-3 rounded-md bg-white px-4 py-5 shadow-createColumn"
        >
          <span className="font-scada text-5xl text-[rgba(104,122,149,0.5)]">+</span>

          <p className="w-[222px] text-nowrap text-center font-scada text-[rgba(104,122,149,0.5)]">
            {translateBtn('addColumn')}
          </p>
        </button>
      </div>
    </div>
  );
};
