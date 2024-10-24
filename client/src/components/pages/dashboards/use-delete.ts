import { useMutation, useQueryClient } from '@tanstack/react-query';

import { boardApi } from './api';

export const useDeleteBoard = () => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => {
      const abortController = new AbortController();

      return boardApi.deleteBoard(id)({ signal: abortController.signal });
    },
  });

  const onDelete = (id: string) => {
    console.log({ deleteId: id });
    deleteMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: boardApi.queryKey,
        });
      },
    });
  };

  return { onDelete };
};
