'use client';

import { useState } from 'react';

import { ResponseGetType } from '@/types';
import { IBoardData, showMessage } from '@/components';
import { createBoardAction, editBoardAction } from '@/actions';

import { IUseStateBoards } from './types';

interface IEditCreate extends IUseStateBoards {
  id: string;
  text: string;
}

export const useEditBoard = (userId: string | undefined) => {
  const [isLoading, setIsLoading] = useState(false);
  const onEdit = async ({ id, text, boards, setBoards }: IEditCreate) => {
    const oldBoards = [...boards];

    const boardWithOutNew = oldBoards.filter((board) => board._id !== id);

    let response;

    setIsLoading(true);

    const isEdit = id !== 'new';

    try {
      if (!isEdit && userId) {
        response = (await createBoardAction({ text, userId })) as ResponseGetType<IBoardData> | string;

        if (typeof response === 'string') {
          const filteredBoards = boards.filter((board) => board._id !== 'new');

          setBoards([...filteredBoards, JSON.parse(response).data]);

          return;
        }
      }

      if (isEdit && userId) {
        response = (await editBoardAction({ id, text, userId })) as ResponseGetType<IBoardData> | string;

        if (typeof response === 'string') {
          setBoards(boards.map((board) => (board._id === id ? { ...board, title: text } : board)));

          return;
        }
      }

      if (!response?.success && response?.message && !isEdit) {
        showMessage.error(response.message);

        setBoards(boardWithOutNew);

        return;
      }

      if (!response?.success && response?.message && isEdit) {
        showMessage.error(response.message);

        setBoards(oldBoards);

        return;
      }
    } catch (error) {
      console.log(error);

      if (isEdit) {
        setBoards(oldBoards);

        return;
      }

      setBoards(boardWithOutNew);
    } finally {
      setIsLoading(false);
    }
  };

  return { onEdit, isEditing: isLoading };
};
