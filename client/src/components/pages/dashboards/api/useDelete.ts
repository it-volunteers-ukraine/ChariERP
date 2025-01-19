'use client';

import { useState } from 'react';

import { ResponseGetType } from '@/types';
import { showMessage } from '@/components';
import { deleteBoardAction } from '@/actions';

import { IUseStateBoards } from './types';

interface IDelete extends IUseStateBoards {
  id: string;
}

export const useDeleteBoard = (userId: string | undefined) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDelete = async ({ id, setBoards, boards }: IDelete) => {
    const oldBoards = [...boards];

    setIsLoading(true);

    try {
      const response = (await deleteBoardAction({ id, userId: userId! })) as ResponseGetType;

      if (response.success) {
        setBoards(boards.filter((board) => board._id !== id));

        return;
      }

      if (!response?.success && response?.message) {
        showMessage.error(response.message);
        setBoards(oldBoards);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { onDelete, isDeleting: isLoading };
};
