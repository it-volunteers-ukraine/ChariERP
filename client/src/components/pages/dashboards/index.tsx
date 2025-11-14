'use client';

import { useTranslations } from 'use-intl';
import { usePathname } from 'next/navigation';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';

import { useWindowWidth } from '@/hooks';
import { generateColumns } from './helpers';
import { BoardCard, Button } from '@/components';
import { useBoards, useUserInfo } from '@/context';

import { useAddBoard, useEditBoard, useMoveBoards, useDeleteBoard } from './api';

import { getStyle } from './styles';

const limitOfCard = 5;

const Dashboards = () => {
  const path = usePathname();
  const { isLaptop } = useWindowWidth();
  const board = useTranslations('board');
  const { isManager, _id } = useUserInfo();

  const id = _id ? String(_id) : undefined;

  const { response, setBoards, isLoading } = useBoards(id, path);

  const { boards, columns } = { boards: response, columns: generateColumns(response) };

  const { addBoard, onReset } = useAddBoard();
  const { onEdit, isEditing } = useEditBoard(id);
  const { onDelete, isDeleting } = useDeleteBoard(id);
  const { onMoveDragEndSmall, onMoveDragEndLarge, isLoadingMove } = useMoveBoards(id);

  const isRoleAccess = isManager;
  const isLimitExceeded = boards.length === limitOfCard;

  const styles = getStyle(isLimitExceeded);

  const isLoadingBtn = isLoading || isEditing || isDeleting || isLoadingMove;

  return (
    <div className="tablet:px-8 desktop:px-[64px] desktop:pt-[64px] h-full bg-white px-4 pt-[40px]">
      {isRoleAccess && (
        <div className="flex flex-col gap-3">
          <Button
            className="max-w-fit"
            isLoading={isLoadingBtn}
            disabled={isLimitExceeded}
            onClick={() => addBoard({ length: boards.length, boards, setBoards })}
          >
            <span className="uppercase">+ {board('newBoard')}</span>
          </Button>

          <div className="flex items-center gap-[6px]">
            <span className={styles.svg}>!</span>

            <span className={styles.text}>{board('limitExceeded', { int: limitOfCard })}</span>
          </div>

          <div className="rounded-50 bg-light-blue mt-5 h-[3px]" />
        </div>
      )}

      <div className="py-10">
        {!isLaptop && (
          <DragDropContext onDragEnd={(result) => onMoveDragEndSmall({ result, boards, setBoards })}>
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
                          isRoleAccess={isRoleAccess}
                          onReset={(id) => onReset({ id, boards, setBoards })}
                          onDelete={(id) => onDelete({ id, boards, setBoards })}
                          onEdit={(id, text) => onEdit({ id, text, boards, setBoards })}
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
          <div className="desktop:max-w-[1088px] flex w-full gap-6">
            <DragDropContext onDragEnd={(result) => onMoveDragEndLarge({ result, boards, setBoards })}>
              {columns &&
                Object.keys(columns).map((key) => (
                  <Droppable key={key} droppableId={key} type="Boards">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps} className="flex w-full flex-col">
                        {columns[key].map((board, index) => (
                          <BoardCard
                            idx={index}
                            board={board}
                            key={board._id}
                            isRoleAccess={isRoleAccess}
                            onReset={(id) => onReset({ id, boards, setBoards })}
                            onDelete={(id) => onDelete({ id, boards, setBoards })}
                            onEdit={(id, text) => onEdit({ id, text, boards, setBoards })}
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
