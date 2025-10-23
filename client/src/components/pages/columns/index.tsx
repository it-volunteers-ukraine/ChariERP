'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';

import { cn } from '@/utils';
import { TaskCard } from '@/components';
import { useUserInfo } from '@/context';
import { useOutsideClick } from '@/hooks';
import { IBoardTaskColumn } from '@/types';

import { ColumnTasks } from './column-tasks';
import {
  useColumns,
  useMoveTask,
  useAddColumn,
  useDeleteTask,
  useMoveColumn,
  useDeleteColumn,
  useEditTitleColumn,
} from './api';

export const Columns = ({ boardId, columns }: { boardId: string; columns: IBoardTaskColumn[] }) => {
  const { isManager, _id } = useUserInfo();
  const translateBtn = useTranslations('button');
  const scrollRef = useRef<HTMLDivElement>(null);
  const refInput = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState('');
  const [createColumn, setCreateColumn] = useState(false);

  const id = _id ? String(_id) : '';

  const { response, setColumns, isLoading } = useColumns({ boardColumns: columns, boardId, id });
  const { onAddColumn } = useAddColumn({ boardId, userId: id! });
  const { onEditTitleColumn } = useEditTitleColumn({ boardId, userId: id! });
  const { onDeleteColumn } = useDeleteColumn({ boardId, userId: id! });
  const { onMoveColumn } = useMoveColumn({ boardId, userId: id! });
  const { onMoveTask } = useMoveTask({ boardId, userId: id! });
  const { onDeleteTask } = useDeleteTask({ boardId, userId: id! });

  useOutsideClick(() => {
    refInput.current?.blur();
    setCreateColumn(false);
  }, refInput);

  const handleInputKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      refInput.current?.blur();
    }
  };

  const handleChangeTitle = async ({ columnId, title }: { columnId: string; title: string }) => {
    await onEditTitleColumn({ title, columnId, response, setColumns });
  };

  const handleDeleteColumn = async (id: string) => {
    await onDeleteColumn({ columnId: id, response, setColumns });
  };

  const handleDeleteTask = async (id: string) => {
    await onDeleteTask({
      taskId: id,
      response,
      setColumns,
    });
  };

  const onBlurChangeCreate = async () => {
    if (value !== '') {
      setCreateColumn(true);
      await onAddColumn({ title: value, response, setColumns });
      setValue('');
    }
    setCreateColumn(false);
  };

  const onClickCreateColumn = () => {
    setCreateColumn(true);
    setTimeout(() => refInput.current?.focus(), 0);
  };

  const onMoveColumnAndTasks = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const { source, destination, type } = result;

    if (type === 'Columns') {
      await onMoveColumn({ source: source.index, destination: destination.index, response, setColumns });
    }

    if (type === 'Tasks') {
      if (!response) {
        return;
      }

      const columnStartIndex = Number(source.droppableId.split('-')[0]);
      const columnFinishIndex = Number(destination.droppableId.split('-')[0]);

      await onMoveTask({
        response,
        setColumns,
        columnStartIndex,
        columnFinishIndex,
        sourceIndex: source.index,
        destinationIndex: destination.index,
      });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    const savedScroll = sessionStorage.getItem(`scroll-${boardId}`);

    if (!container) {
      return;
    }

    if (savedScroll) {
      setTimeout(() => (container.scrollLeft = parseInt(savedScroll, 10)), 0);
    }

    const saveScroll = () => sessionStorage.setItem(`scroll-${boardId}`, container.scrollLeft.toString());

    container.addEventListener('scroll', saveScroll);

    return () => container.removeEventListener('scroll', saveScroll);
  }, []);

  return (
    <div
      ref={scrollRef}
      className="scroll-blue scroll-column flex h-[calc(100%-62px)] overflow-x-auto bg-white px-4 py-5 tablet:px-8"
    >
      <DragDropContext onDragEnd={onMoveColumnAndTasks}>
        <Droppable droppableId="column-area" type="Columns" direction="horizontal">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps} className="flex">
              <div className="flex">
                {response?.map((item, index) => (
                  <ColumnTasks
                    userId={id}
                    id={item.id}
                    key={item.id}
                    index={index}
                    boardId={boardId}
                    title={item.title}
                    isManager={isManager}
                    onChangeTitle={handleChangeTitle}
                    onDeleteColumn={handleDeleteColumn}
                    hasNextColumn={index < response.length - 1}
                  >
                    <Droppable droppableId={`${index}-columns`} type="Tasks">
                      {(providedTask) => (
                        <div
                          ref={providedTask.innerRef}
                          {...providedTask.droppableProps}
                          className="relative flex flex-col"
                        >
                          {item?.tasks?.map((task, idx: number) => (
                            <TaskCard
                              idx={idx}
                              id={task.id}
                              boardId={boardId}
                              users={task.users}
                              title={task.title}
                              isManager={isManager}
                              key={`task_${task.id}`}
                              columnId={String(item.id)}
                              onDelete={handleDeleteTask}
                              hasNextTask={idx < item.tasks.length - 1}
                            />
                          ))}
                          <div className={cn('invisible', item.tasks?.length === 0 && 'h-[1px]')} aria-hidden="true" />
                          {providedTask.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </ColumnTasks>
                ))}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {!isLoading && (
        <div className="flex h-full bg-white">
          {createColumn && (
            <div className="flex h-fit min-h-[254px] w-[254px] flex-col gap-y-3 rounded-md bg-whiteSecond px-4 py-5 shadow-boardColumn">
              <input
                type="text"
                value={value}
                ref={refInput}
                onKeyUp={handleInputKeyUp}
                onBlur={onBlurChangeCreate}
                placeholder={translateBtn('addColumn')}
                onChange={(e) => setValue(e.target.value)}
                className="max-w-[222px] text-ellipsis text-nowrap break-all border-[1px] p-2 font-scada text-xl font-bold uppercase text-comet"
              />
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
      )}
    </div>
  );
};
