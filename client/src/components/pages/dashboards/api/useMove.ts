'use client';

import { useState } from 'react';
import { DropResult } from '@hello-pangea/dnd';

import { moveBoardsAction } from '@/actions';
import { IBoardData, showMessage } from '@/components';

import { IUseStateBoards } from './types';
import { generateColumns, reorder } from '../helpers';

interface IMoveBoardsProps extends IUseStateBoards {
  result: DropResult;
}

export const useMoveBoards = (id: string | undefined) => {
  const [isLoadingMove, setIsLoadingMove] = useState(false);

  const onMoveDragEndSmall = async ({ result, boards, setBoards }: IMoveBoardsProps) => {
    if (!result.destination) return;

    const oldBoards = [...boards];

    const newBoards = reorder(boards as IBoardData[], result.source.index, result.destination.index);

    setBoards(newBoards);

    setIsLoadingMove(true);

    try {
      const response = await moveBoardsAction({ boards: newBoards, userId: id! });

      if (response.success) {
        return;
      }

      if (!response?.success && response?.message) {
        showMessage.error(response.message);
        setBoards(oldBoards);
      }
    } catch (error) {
      setBoards(oldBoards);
      console.log(error);
    } finally {
      setIsLoadingMove(false);
    }
  };

  const onMoveDragEndLarge = async ({ result, boards, setBoards }: IMoveBoardsProps) => {
    const { source, destination } = result;

    if (!destination) return;

    const oldBoards = [...boards];

    const columns = generateColumns(boards as IBoardData[]);

    const sourceCol = source.droppableId as `column-${number}`;
    const destCol = destination.droppableId as `column-${number}`;
    const length = columns[destCol].length;

    if (destination.index >= length) {
      return;
    }

    const sourceBoardIndex = columns[sourceCol][source.index][sourceCol][source.index];
    const destinationBoardIndex = columns[destCol][destination.index][destCol][destination.index];

    const newBoards = reorder(boards as IBoardData[], sourceBoardIndex, destinationBoardIndex);

    setBoards(newBoards);

    setIsLoadingMove(true);

    try {
      const response = await moveBoardsAction({ boards: newBoards, userId: id! });

      if (response.success) {
        return;
      }

      if (!response?.success && response?.message) {
        showMessage.error(response.message);
        setBoards(oldBoards);
      }
    } catch (error) {
      setBoards(oldBoards);
      console.log(error);
    } finally {
      setIsLoadingMove(false);
    }
  };

  return { onMoveDragEndSmall, onMoveDragEndLarge, isLoadingMove };
};
