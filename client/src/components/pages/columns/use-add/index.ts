'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showMessage } from '@/components';
import { createBoardColumn } from '@/actions';

interface UseAddColumnProps {
  boardId: string;
  userId: string;
}

export const useAddColumn = ({ boardId, userId }: UseAddColumnProps) => {
  const queryClient = useQueryClient();

  const addColumnMutation = useMutation({
    mutationFn: (title: string) => createBoardColumn({ title, boardId, userId }),
    onSuccess: () => {
      // if (!response.success && response?.message) {
      //   showMessage.error(response.message);

      //   return;
      // }

      queryClient.invalidateQueries({
        queryKey: ['columns', boardId],
      });
    },
    onError: (error) => {
      showMessage.error('Что-то пошло не так');
      console.error(error);
    },
  });

  const addColumn = (title: string) => {
    addColumnMutation.mutate(title);
  };

  return {
    addColumn,
    isLoading: addColumnMutation.isPending,
  };
};
