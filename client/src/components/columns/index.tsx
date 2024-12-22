'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';

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

export const Columns = ({ boardId }: { boardId: string }) => {
  const refInput = useRef<HTMLInputElement>(null);
  const translateBtn = useTranslations('button');

  const [value, setValue] = useState('');
  const [dataColumn, setDataColumn] = useState(columns);
  const [createColumn, setCreateColumn] = useState(false);

  const handlerInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleDeleteTask = (taskIdx: number, idxColumn: number) => {
    setDataColumn((prev) => {
      const newArray = [...prev];

      newArray[idxColumn].tasks.splice(taskIdx, 1);

      return newArray;
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

  const onMoveColumn = (result: DropResult) => {
    const { source, destination, type } = result;

    if (!destination) return;

    const newColumns = [...dataColumn];

    if (type === 'Columns') {
      const column = dataColumn[source.index];

      newColumns.splice(source.index, 1);
      newColumns.splice(destination.index, 0, column);

      setDataColumn(newColumns);
    }

    if (type === 'Tasks') {
      const columnStartIndex = parseInt(source.droppableId.split('-')[0]) as unknown as number;
      const columnFinishIndex = parseInt(destination.droppableId.split('-')[0]);

      const columnStart = dataColumn[columnStartIndex];
      const columnFinish = dataColumn[columnFinishIndex];

      const task = columnStart.tasks[source.index];

      if (columnStart.id === columnFinish.id) {
        const newTasks = Array.from(columnStart.tasks);

        newTasks.splice(source.index, 1);

        newTasks.splice(destination.index, 0, task);

        const newColumn = {
          ...columnStart,
          tasks: newTasks,
        };

        newColumns.splice(columnStartIndex, 1);
        newColumns.splice(columnFinishIndex, 0, newColumn);

        setDataColumn(newColumns);
      }

      if (columnStart.id !== columnFinish.id) {
        newColumns[columnStartIndex].tasks.splice(source.index, 1);
        newColumns[columnFinishIndex].tasks.splice(destination.index, 0, task);

        setDataColumn(newColumns);
      }
    }
  };

  return (
    <div className="scroll-blue scroll-column flex h-[calc(100%-62px)] gap-6 overflow-x-auto bg-white px-5 py-5">
      <DragDropContext onDragEnd={onMoveColumn}>
        <Droppable droppableId="column-area" type="Columns" direction="horizontal">
          {(provided) => (
            <>
              <div ref={provided.innerRef} {...provided.droppableProps} className="flex gap-6">
                {dataColumn.map((item, index) => (
                  <ColumnTasks
                    {...item}
                    key={item.id}
                    index={index}
                    boardId={boardId}
                    onChangeTitle={() => console.log(1)}
                    onDeleteColumn={(id) => setDataColumn((prev) => prev.filter((item) => item.id !== id))}
                  >
                    <Droppable droppableId={`${index}-columns`} type="Tasks">
                      {(providedTask) => (
                        <div
                          ref={providedTask.innerRef}
                          {...providedTask.droppableProps}
                          className="flex flex-col gap-3"
                        >
                          {item.tasks.map((task, idx: number) => {
                            return (
                              <TaskCard
                                idx={idx}
                                {...task}
                                boardId={boardId}
                                columnId={item.id}
                                key={`task_${index}_${idx}`}
                                onDelete={(idxTask) => handleDeleteTask(idxTask, index)}
                              />
                            );
                          })}
                          <div
                            className={cn(
                              item.tasks.length === 0 &&
                                'mr-3 min-h-[96px] rounded border-2 border-dashed border-gray-300',
                            )}
                          >
                            {providedTask.placeholder}
                          </div>
                        </div>
                      )}
                    </Droppable>
                  </ColumnTasks>
                ))}
              </div>

              <div>{provided.placeholder}</div>
            </>
          )}
        </Droppable>
      </DragDropContext>

      <div className="-ml-6 flex h-full bg-white">
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
