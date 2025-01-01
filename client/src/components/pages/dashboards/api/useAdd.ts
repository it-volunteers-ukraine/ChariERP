import { useQueryClient } from '@tanstack/react-query';

import { IBoardData } from '@/components';

import { boardApi } from './api';

type ResponseGet = { success: boolean; data: IBoardData[] };

export const useAddBoard = () => {
  const queryClient = useQueryClient();

  const addBoard = (length: number) => {
    const newBoard = { title: '', order: length + 1, _id: 'new' };

    queryClient.setQueryData(boardApi.queryKey, (oldData: ResponseGet) => {
      if (!oldData.data) {
        return [newBoard];
      }

      return {
        ...oldData,
        data: [...oldData.data, newBoard],
      };
    });
  };

  const onReset = (id: string) => {
    queryClient.setQueryData(boardApi.queryKey, (oldData: ResponseGet) => {
      if (!oldData.data) {
        return oldData.data;
      }

      const filteredBoards = oldData.data.filter((board) => board._id !== id);

      return {
        ...oldData,
        data: filteredBoards,
      };
    });
  };

  return { addBoard, onReset };
};
