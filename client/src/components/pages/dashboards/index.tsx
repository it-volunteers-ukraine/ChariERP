'use client';

import { useTranslations } from 'use-intl';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

import { Roles } from '@/types';
import { useUserInfo } from '@/context';
import { useWindowWidth } from '@/hooks';
import { BoardCard, Button } from '@/components';

import { getStyle } from './styles';
import { useAddBoard } from './use-add';
import { useBoards } from './use-boards';
import { useEditBoard } from './use-edit';
import { useMoveBoards } from './use-move';
import { useDeleteBoard } from './use-delete';

const limitOfCard = 5;

const Dashboards = () => {
  const { role } = useUserInfo();
  const { isLaptop } = useWindowWidth();
  const board = useTranslations('board');

  const { boards, columns } = useBoards();

  const { onEdit } = useEditBoard();
  const { onDelete } = useDeleteBoard();
  const { addBoard, onReset } = useAddBoard();
  const { onMoveDragEndSmall, onMoveDragEndLarge } = useMoveBoards();

  const isRoleAccess = role === Roles.MANAGER;
  const isLimitExceeded = boards.length === limitOfCard;

  const styles = getStyle(isLimitExceeded);

  return (
    <div className="h-full bg-white px-4 pt-[40px] tablet:px-8 desktop:px-[64px] desktop:pt-[64px]">
      {isRoleAccess && (
        <div className="flex flex-col gap-3">
          <Button onClick={() => addBoard(boards.length)} disabled={isLimitExceeded} className="max-w-fit">
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
                          key={board.id}
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
                            key={board.id}
                            onEdit={onEdit}
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

export { Dashboards };
