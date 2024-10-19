'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';

import { Roles } from '@/types';
import { useWindowWidth } from '@/hooks';
import { generateColumns, reorder } from './helpers';
import { useLoaderAdminPage, useUserInfo } from '@/context';
import { BoardCard, Button, IBoardData, IColumns } from '@/components';

import { boardsMock } from './mock';

const numberOfColumns = 2;
const limitOfCard = 5;

const Dashboards = () => {
  const { role } = useUserInfo();
  const { isLaptop } = useWindowWidth();
  const { setIsLoading } = useLoaderAdminPage();

  const [columns, setColumns] = useState<IColumns>({});
  const [boards, setBoards] = useState<IBoardData[]>([]);

  const isRoleAccess = role !== Roles.USER;
  const isLimitExceeded = boards.length === limitOfCard;

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setBoards(boardsMock);
      setColumns(generateColumns(numberOfColumns, boardsMock));
      setIsLoading(false);
    }, 300);
  }, []);

  const onSubmit = (title: string, id: string) => {
    const newBoards = boards.map((board) => {
      if (board.id === id) {
        return { ...board, title };
      }

      return board;
    });

    const orderedBoards = newBoards.map((item, index) => ({ ...item, order: index + 1 }));

    try {
      setBoards(orderedBoards);
      setColumns(generateColumns(numberOfColumns, orderedBoards));
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = (id: string) => {
    const newBoards = boards.filter((board) => board.id !== id);
    const orderedBoards = newBoards.map((item, index) => ({ ...item, order: index + 1 }));

    try {
      setBoards(orderedBoards);
      setColumns(generateColumns(numberOfColumns, orderedBoards));
    } catch (error) {
      console.log(error);
    }
  };

  const addBoard = () => {
    const newBoards = [...boards, { title: '', order: boards.length + 1, id: 'new' }];

    setBoards(newBoards);
    setColumns(generateColumns(numberOfColumns, newBoards));
  };

  const onReset = (id: string) => {
    const filteredBoards = boards.filter((board) => board.id !== id);

    setBoards(filteredBoards);
    setColumns(generateColumns(numberOfColumns, filteredBoards));
  };

  const handleDragEndSmall = (result: DropResult) => {
    if (!result.destination) return;

    const newBoards = reorder(boards, result.source.index, result.destination.index);

    setBoards(newBoards);
    setColumns(generateColumns(numberOfColumns, newBoards));
  };

  const handleDragEndLarge = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceCol = source.droppableId as `column-${number}`;
    const destCol = destination.droppableId as `column-${number}`;
    const length = columns[destCol]?.length;

    if (destination.index >= length) {
      return;
    }

    const sourceBoardIndex = columns[sourceCol][source.index][sourceCol][source.index];
    const destinationBoardIndex = columns[destCol][destination.index][destCol][destination.index];

    const newBoards = reorder(boards, sourceBoardIndex, destinationBoardIndex);

    setBoards(newBoards);
    setColumns(generateColumns(numberOfColumns, newBoards));
  };

  return (
    <div className="min-h-[calc(100dvh-96px)] bg-white p-8">
      {isRoleAccess && (
        <Button onClick={addBoard} disabled={isLimitExceeded}>
          <span className="uppercase">+ Додати дошки</span>
        </Button>
      )}

      <div className="py-10">
        {!isLaptop && (
          <DragDropContext onDragEnd={handleDragEndSmall}>
            <Droppable droppableId="droppable-1" type="Boards">
              {(provided) => (
                <>
                  <div ref={provided.innerRef} {...provided.droppableProps} className="flex w-full flex-col">
                    {boards.map((board, index) => {
                      return (
                        <BoardCard
                          idx={index}
                          board={board}
                          key={board.id}
                          onReset={onReset}
                          onSubmit={onSubmit}
                          onDelete={onDelete}
                          isRoleAccess={isRoleAccess}
                        />
                      );
                    })}
                  </div>

                  <div className="hidden">{provided.placeholder}</div>
                </>
              )}
            </Droppable>
          </DragDropContext>
        )}

        {isLaptop && (
          <div className="flex w-full gap-6 desktop:max-w-[1088px]">
            <DragDropContext onDragEnd={handleDragEndLarge}>
              {columns &&
                Object.keys(columns)?.map((key) => (
                  <Droppable key={key} droppableId={key} type="Boards">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps} className="flex w-full flex-col">
                        {columns[key].map((board, index) => (
                          <BoardCard
                            idx={index}
                            board={board}
                            key={board.id}
                            onReset={onReset}
                            onSubmit={onSubmit}
                            onDelete={onDelete}
                            isRoleAccess={isRoleAccess}
                          />
                        ))}

                        <div className="hidden">{provided.placeholder}</div>
                      </div>
                    )}
                  </Droppable>
                ))}
            </DragDropContext>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboards;
