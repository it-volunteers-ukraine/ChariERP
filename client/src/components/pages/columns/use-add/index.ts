'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showMessage } from '@/components';

import { columnApi } from '../api';

interface UseAddColumnProps {
  boardId: string;
  userId: string;
}

export const useAddColumn = ({ boardId, userId }: UseAddColumnProps) => {
  const queryClient = useQueryClient();

  const addColumnMutation = useMutation({
    mutationFn: async (title: string) => columnApi.addColumn({ title, boardId, userId }),

    onSuccess: (response) => {
      if (!response?.success && response?.message) {
        showMessage.error(response.message);

        return;
      }

      queryClient.invalidateQueries({
        queryKey: columnApi.queryKey,
      });
    },
    onError: (error) => {
      showMessage.error('Something went wrong');
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
