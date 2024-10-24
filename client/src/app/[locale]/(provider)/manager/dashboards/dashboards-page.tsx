'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'use-intl';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';

import { Roles } from '@/types';
import { useWindowWidth } from '@/hooks';
import { useLoaderAdminPage, useUserInfo } from '@/context';
import { BoardCard, Button, IBoardData, IColumns } from '@/components';

import { boardsMock } from './mock';
import { getStyle } from './styles';
import { generateColumns, reorder } from './helpers';

const numberOfColumns = 2;
const limitOfCard = 5;

const DashboardsPage = () => {
  const { role } = useUserInfo();
  const { isLaptop } = useWindowWidth();
  const board = useTranslations('board');
  const { setIsLoading } = useLoaderAdminPage();

  const [columns, setColumns] = useState<IColumns>({});
  const [boards, setBoards] = useState<IBoardData[]>([]);

  const isRoleAccess = role !== Roles.USER;
  const isLimitExceeded = boards.length === limitOfCard;

  const styles = getStyle(isLimitExceeded);

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
    <div className="h-full bg-white px-4 pt-[40px] tablet:px-8 desktop:px-[64px] desktop:pt-[64px]">
      {isRoleAccess && (
        <div className="flex flex-col gap-3">
          <Button onClick={addBoard} disabled={isLimitExceeded} className="max-w-fit">
            <span className="uppercase">+ {board('newBoard')}</span>
          </Button>

          <div className="flex items-center gap-[6px]">
            <span className={styles.svg}>!</span>

            <span className={styles.text}>{board('limitExceeded', { int: limitOfCard })}</span>
          </div>

          <div className="mt-5 h-[3px] rounded-50 bg-lightBlue" />
        </div>
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

export { DashboardsPage };
