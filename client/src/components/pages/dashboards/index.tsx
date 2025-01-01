'use client';

import { useTranslations } from 'use-intl';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

import { useUserInfo } from '@/context';
import { useWindowWidth } from '@/hooks';
import { BoardCard, Button } from '@/components';

import { generateColumns } from './helpers';
import { useAddBoard, useEditBoard, useMoveBoards, useDeleteBoard, useBoards } from './api';

import { getStyle } from './styles';

const limitOfCard = 5;

const Dashboards = () => {
  const { isLaptop } = useWindowWidth();
  const board = useTranslations('board');
  const { isManager, _id } = useUserInfo();

  const id = _id ? String(_id) : undefined;

  const { response } = useBoards(id);

  const { boards, columns } = { boards: response?.data || [], columns: generateColumns(response?.data || []) };

  const { addBoard, onReset } = useAddBoard();
  const { onDelete, isLoadingDelete } = useDeleteBoard(id);
  const { onEdit, isLoadingCreate, isLoadingEdit } = useEditBoard(id);
  const { onMoveDragEndSmall, onMoveDragEndLarge, isLoadingMove } = useMoveBoards(id);

  const isRoleAccess = isManager;
  const isLimitExceeded = boards.length === limitOfCard;

  const styles = getStyle(isLimitExceeded);

  const isBtnLoading = isLoadingDelete || isLoadingCreate || isLoadingEdit || isLoadingMove;

  return (
    <div className="h-full bg-white px-4 pt-[40px] tablet:px-8 desktop:px-[64px] desktop:pt-[64px]">
      {isRoleAccess && (
        <div className="flex flex-col gap-3">
          <Button
            className="max-w-fit"
            isLoading={isBtnLoading}
            disabled={isLimitExceeded}
            onClick={() => addBoard(boards.length)}
          >
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
          <DragDropContext onDragEnd={onMoveDragEndSmall}>
            <Droppable droppableId="droppable-1" type="Boards">
              {(provided) => (
                <>
                  <div ref={provided.innerRef} {...provided.droppableProps} className="flex w-full flex-col">
                    {boards.map((board, index) => {
                      return (
                        <BoardCard
                          idx={index}
                          board={board}
                          key={board._id}
                          onEdit={onEdit}
                          onReset={onReset}
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
            <DragDropContext onDragEnd={onMoveDragEndLarge}>
              {columns &&
                Object.keys(columns).map((key) => (
                  <Droppable key={key} droppableId={key} type="Boards">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps} className="flex w-full flex-col">
                        {columns[key].map((board, index) => (
                          <BoardCard
                            idx={index}
                            board={board}
                            onEdit={onEdit}
                            key={board._id}
                            onReset={onReset}
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

export { Dashboards, useBoards };
