import { useMutation, useQueryClient } from '@tanstack/react-query';

import { boardApi } from './api';

export const useEditBoard = () => {
  const queryClient = useQueryClient();

  const editMutation = useMutation({
    mutationFn: ({ id, text }: { id: string; text: string }) => {
      const abortController = new AbortController();

      return boardApi.editBoard(id, text)({ signal: abortController.signal });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: boardApi.queryKey,
      });
    },
  });

  const createMutation = useMutation({
    mutationFn: ({ text }: { text: string }) => {
      const abortController = new AbortController();

      return boardApi.createBoard(text)({ signal: abortController.signal });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: boardApi.queryKey,
      });
    },
  });

  const onEdit = (id: string, text: string) => {
    console.log({ id, text });
    if (id === 'new') {
      createMutation.mutate({ text });

      return;
    }

    editMutation.mutate({ id, text });
  };

  return { onEdit };
};
