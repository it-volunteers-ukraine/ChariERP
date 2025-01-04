'use client';

import { Draggable } from '@hello-pangea/dnd';

import { BoardInfo } from './board-info';
import { getDraggableStyle } from './helper';
import { IBoardCardProps, IBoardData, IColumns, IIndexesForBoards } from './types';

const BoardCard = ({ idx, board, onReset, isRoleAccess, onEdit, onDelete }: IBoardCardProps) => {
  const isDraggableDisabled = !isRoleAccess || board._id === 'new';

  return (
    <Draggable draggableId={board._id} index={idx!} isDragDisabled={isDraggableDisabled}>
      {(provided, snapshot) => (
        <div
          className="w-full"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getDraggableStyle(provided.draggableProps.style, snapshot)}
        >
          <BoardInfo board={board} onReset={onReset} onEdit={onEdit} onDelete={onDelete} isRoleAccess={isRoleAccess} />
        </div>
      )}
    </Draggable>
  );
};

export { BoardCard, type IBoardData, type IColumns, type IIndexesForBoards };
