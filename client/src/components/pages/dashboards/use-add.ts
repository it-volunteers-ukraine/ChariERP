import { useQueryClient } from '@tanstack/react-query';

import { IBoardData } from '@/components';

import { boardApi } from './api';

export const useAddBoard = () => {
  const queryClient = useQueryClient();

  const addBoard = (length: number) => {
    const newBoard = { title: '', order: length + 1, id: 'new' };

    queryClient.setQueryData(boardApi.queryKey, (oldData: IBoardData[] | undefined) => {
      if (!oldData) {
        return [newBoard];
      }

      return [...oldData, newBoard];
    });
  };

  const onReset = (id: string) => {
    queryClient.setQueryData(boardApi.queryKey, (oldData: IBoardData[] | undefined) => {
      if (!oldData) {
        return oldData;
      }

      const filteredBoards = oldData.filter((board) => board.id !== id);

      return filteredBoards;
    });
  };

  return { addBoard, onReset };
};
