// @ts-nocheck
/* eslint-disable */
'use client';

import { useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';

import { useWindowWidth } from '@/hooks';
import { generateColumns, reorder } from './helpers';
import { useLoaderAdminPage, useUserInfo } from '@/context';
import { BoardCard, IBoardData, IColumns } from '@/components';
import { LimitCard } from '@/components/board-card/limit-card';
import { CreateCard } from '@/components/board-card/create-card';

import { boardsMock } from './mock';

const numberOfColumns = 2;
const limitOfCard = 5;

const Dashboards = () => {
  const { role } = useUserInfo();
  const { isLaptop } = useWindowWidth();
  const { isLoading, setIsLoading } = useLoaderAdminPage();

  const [columns, setColumns] = useState<IColumns>({});
  const [boards, setBoards] = useState<IBoardData[]>([]);

  useEffect(() => {
    setIsLoading(true);

    setTimeout(() => {
      setBoards(boardsMock);
      setColumns(generateColumns(numberOfColumns, boardsMock));
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleDragEndSmall = (result: DropResult) => {
    if (!result.destination) return;

    const newBoards = reorder(boards, result.source.index, result.destination.index);

    setBoards(newBoards);
    const updatedColumns = generateColumns(numberOfColumns, newBoards);

    setColumns(updatedColumns);
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

    const updatedBoards = Array.from(boards);

    const newBoards = reorder(updatedBoards, sourceBoardIndex, destinationBoardIndex);

    setBoards(newBoards);
    const updatedColumns = generateColumns(numberOfColumns, newBoards);

    setColumns(updatedColumns);
  };

  const isBoardLengthZero = boards.length === 0;

  return (
    <div className="min-h-[calc(100dvh-96px)] bg-white">
      {isBoardLengthZero && (
        // @ts-ignore
        // eslint-disable-next-line
        <BoardCard
          // idx={index}
          // role={role}
          // board={board}

          limitOfCard={limitOfCard}
          boardLength={boards.length}
        />
      )}

      {boards.length < limitOfCard && !isLoading && <CreateCard boardLength={boards.length} />}

      {boards.length === limitOfCard && !isLoading && <LimitCard limit={limitOfCard} />}

      <div className="px-8 py-10">
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
                          role={role}
                          board={board}
                          key={board.id}
                          limitOfCard={limitOfCard}
                          boardLength={boards.length}
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
                !isBoardLengthZero &&
                Object.keys(columns)?.map((key) => (
                  <Droppable key={key} droppableId={key} type="Boards">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps} className="flex w-full flex-col">
                        {columns[key].map((board, index) => (
                          <BoardCard
                            idx={index}
                            role={role}
                            board={board}
                            key={board.id}
                            limitOfCard={limitOfCard}
                            boardLength={boards.length}
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
