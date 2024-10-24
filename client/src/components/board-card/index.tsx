'use client';

import { Draggable } from '@hello-pangea/dnd';

import { BoardInfo } from './board-info';
import { getDraggableStyle } from './helper';
import { IBoardCardProps, IBoardData, IColumns, IIndexesForBoards } from './types';

const BoardCard = ({ idx, board, onReset, isRoleAccess, onSubmit, onDelete }: IBoardCardProps) => (
  <Draggable draggableId={board.id} index={idx!} isDragDisabled={!isRoleAccess}>
    {(provided, snapshot) => (
      <div
        className="w-full"
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getDraggableStyle(provided.draggableProps.style, snapshot)}
      >
        <BoardInfo
          board={board}
          onReset={onReset}
          onSubmit={onSubmit}
          onDelete={onDelete}
          isRoleAccess={isRoleAccess}
        />
      </div>
    )}
  </Draggable>
);

export { BoardCard, type IBoardData, type IColumns, type IIndexesForBoards };
