'use client';

import { useState } from 'react';

import { ResponseGetType } from '@/modules';
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
    let response;

    setIsLoading(true);

    try {
      if (id === 'new' && userId) {
        response = (await createBoardAction({ text, userId })) as ResponseGetType<IBoardData> | string;

        if (typeof response === 'string') {
          const filteredBoards = boards.filter((board) => board._id !== 'new');

          setBoards([...filteredBoards, JSON.parse(response).data]);

          return;
        }
      }

      if (id !== 'new' && userId) {
        response = (await editBoardAction({ id, text, userId })) as ResponseGetType<IBoardData> | string;

        if (typeof response === 'string') {
          setBoards(boards.map((board) => (board._id === id ? { ...board, title: text } : board)));

          return;
        }
      }

      if (!response?.success && response?.message) {
        showMessage.error(response.message);
        setBoards(oldBoards);

        return;
      }
    } catch (error) {
      setBoards(oldBoards);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { onEdit, isEditing: isLoading };
};
