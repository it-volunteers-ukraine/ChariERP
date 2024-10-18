// @ts-nocheck
/* eslint-disable */
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Draggable, DraggableStateSnapshot, DraggableStyle } from '@hello-pangea/dnd';

import { Roles } from '@/types';

import { BoardInfo } from './board-info';
import { getBoardStyles } from './board-styles';
import { IBoardCardProps, IBoardData, IColumns, IIndexesForBoards } from './types';

const getStyle = (style: DraggableStyle | undefined, snapshot: DraggableStateSnapshot) => {
  if (!snapshot.isDragging) {
    return {
      ...style,
      // transform: 'none',
      opacity: 1,
    };
  }

  if (!snapshot.dropAnimation) {
    return {
      ...style,
      opacity: 0.9,
    };
  }

  const { moveTo, curve, duration } = snapshot.dropAnimation;
  const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;

  return {
    ...style,
    transform: `${translate} scale(1.05)`,
    transition: `all ${curve} ${duration}s, opacity ${curve} ${duration}s`,
  };
};

const BoardCard = ({ idx, board, boardLength, limitOfCard, role }: IBoardCardProps) => {
  // const router = useRouter();

  const [, setIsGoRoute] = useState(true);

  const isBoardData = !!board;
  const isRoleAccess = role !== Roles.USER;

  // const styles = getBoardStyles();

  return (
    <>
      {isBoardData && (
        <Draggable draggableId={board!.id} index={idx!} isDragDisabled={!isRoleAccess}>
          {(providedDrag, snapshotDrag) => (
            <>
              <div
                className="w-full"
                ref={providedDrag.innerRef}
                {...providedDrag.draggableProps}
                {...providedDrag.dragHandleProps}
                style={getStyle(providedDrag.draggableProps.style, snapshotDrag)}
              >
                <BoardInfo board={board} isRoleAccess={isRoleAccess} setIsGoRoute={setIsGoRoute} />
              </div>

              {/* {snapshotDrag.isDragging && (
                <div
                  className="phantom h-[248px] w-full rounded-lg bg-gray-300"
                  style={{
                    transform: 'scale(0.9)',
                    transition: 'transform 0.3s ease',
                    opacity: 0.5,
                  }}
                />
              )} */}

              <style jsx>{`
                @keyframes scaleUp {
                  0% {
                    transform: scale(0.5);
                  }
                  100% {
                    transform: scale(1);
                  }
                }
              `}</style>
            </>
          )}
        </Draggable>
      )}

      {/* {isLimitCard && <LimitCard limit={limitOfCard} />} */}

      {/* {isCreate && <CreateCard setIsEdit={setIsEdit} isEdit={isEdit} sumBoards={boardLength + 1} styles={styles} />} */}
    </>
  );
};

export { BoardCard, type IBoardData, type IColumns, type IIndexesForBoards };
