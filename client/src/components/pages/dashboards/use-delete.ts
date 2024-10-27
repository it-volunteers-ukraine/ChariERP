import { useMutation, useQueryClient } from '@tanstack/react-query';

import { boardApi } from './api';

export const useDeleteBoard = (userId: string) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      const abortController = new AbortController();

      return boardApi.deleteBoard(id, userId)({ signal: abortController.signal });
    },
  });

  const onDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: boardApi.queryKey,
        });
      },
    });
  };

  return { onDelete, isLoadingDelete: deleteMutation.isPending };
};
