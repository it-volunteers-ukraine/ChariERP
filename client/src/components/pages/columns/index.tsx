'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';

import { cn } from '@/utils';
import { TaskCard } from '@/components';
import { useUserInfo } from '@/context';
import { columns } from '@/components/pages/columns/mock';

import { useAddColumn } from './use-add';
import { useColumns } from './use-columns';
import { ColumnTasks } from './column-tasks';
import { IDataCards } from '../../task-card/mock';

export interface IColumns {
  id: string;
  title: string;
  tasks: IDataCards[];
}

export const Columns = ({ boardId }: { boardId: string }) => {
  const { isManager, _id } = useUserInfo();
  const refInput = useRef<HTMLInputElement>(null);
  const translateBtn = useTranslations('button');

  const [value, setValue] = useState('');
  const [dataColumn, setDataColumn] = useState(columns);
  const [createColumn, setCreateColumn] = useState(false);

  const id = _id ? String(_id) : undefined;

  const { response, isLoading } = useColumns({ boardId, userId: id! });
  const { addColumn } = useAddColumn({ boardId, userId: id! });

  console.log({ response, isLoading });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onBlurChangeCreate();
    }
  };

  const handleChangeTitle = ({ columnId, title }: { columnId: string; title: string }) => {
    console.log({ columnId, title });
  };

  const handleDeleteColumn = (id: string) => {
    console.log({ deleteColumnId: id });
  };

  const handleDeleteTask = (taskIdx: number, idxColumn: number) => {
    setDataColumn((prev) => {
      const newArray = [...prev];

      newArray[idxColumn].tasks.splice(taskIdx, 1);

      return newArray;
    });
  };

  const onBlurChangeCreate = () => {
    if (value !== '') {
      setCreateColumn(true);
      addColumn(value);
      setValue('');
      refInput.current?.blur();
    }
    setCreateColumn(false);
  };

  const onClickCreateColumn = () => {
    setCreateColumn(true);
    setTimeout(() => refInput.current?.focus(), 0);
  };

  const onMoveColumnAndTasks = (result: DropResult) => {
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
      <DragDropContext onDragEnd={onMoveColumnAndTasks}>
        <Droppable droppableId="column-area" type="Columns" direction="horizontal">
          {(provided) => (
            <>
              <div ref={provided.innerRef} {...provided.droppableProps} className="flex gap-6">
                {response?.map((item, index) => (
                  <ColumnTasks
                    index={index}
                    boardId={boardId}
                    title={item.title}
                    id={item.id}
                    isManager={isManager}
                    key={item.id}
                    onChangeTitle={handleChangeTitle}
                    onDeleteColumn={handleDeleteColumn}
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
                                // {...task}
                                boardId={boardId}
                                users={task.users}
                                title={task.title}
                                isManager={isManager}
                                id={task.id}
                                key={`task_${task.id}`}
                                columnId={String(item.id)}
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
              onKeyUp={handleInputKeyUp}
              onBlur={onBlurChangeCreate}
              onChange={handleInputChange}
              placeholder={translateBtn('addColumn')}
              className={cn(
                'max-w-[222px] text-ellipsis text-nowrap break-all border-[1px] p-2 font-scada text-xl font-bold uppercase text-comet',
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
          className={cn(
            'flex h-[254px] w-[254px] flex-col items-center justify-center gap-y-3 rounded-md bg-white px-4 py-5 shadow-createColumn',
            createColumn && 'ml-6',
          )}
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
