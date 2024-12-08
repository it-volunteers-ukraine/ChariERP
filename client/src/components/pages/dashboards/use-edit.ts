import { useMutation, UseMutationResult, useQueryClient } from '@tanstack/react-query';

import { boardApi } from './api';
import { ResponseCreate, ResponseDeleteEdit } from './types';

export const useEditBoard = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  const editMutation: UseMutationResult<ResponseDeleteEdit, Error, { id: string; text: string }, unknown> = useMutation(
    {
      mutationFn: ({ id, text }: { id: string; text: string }) => {
        const abortController = new AbortController();

        return boardApi.editBoard(id, text, userId!)({ signal: abortController.signal });
      },
      onSettled: () => {
        queryClient.invalidateQueries({
          queryKey: boardApi.queryKey,
        });
      },
    },
  );

  const createMutation: UseMutationResult<ResponseCreate, Error, { text: string }, unknown> = useMutation({
    mutationFn: ({ text }: { text: string }) => {
      const abortController = new AbortController();

      return boardApi.createBoard(text, userId!)({ signal: abortController.signal });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: boardApi.queryKey,
      });
    },
  });

  const onEdit = (id: string, text: string) => {
    if (id === 'new') {
      createMutation.mutate({ text });

      return;
    }

    editMutation.mutate({ id, text });
  };

  return { onEdit, isLoadingCreate: createMutation.isPending, isLoadingEdit: editMutation.isPending };
};
