import { useMutation, useQueryClient } from '@tanstack/react-query';

import { showMessage } from '@/components';

import { boardApi } from './api';

export const useDeleteBoard = (userId: string | undefined) => {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (id: string) => boardApi.deleteBoard(id, userId!),
  });

  const onDelete = (id: string) => {
    deleteMutation.mutate(id, {
      onSuccess: (response) => {
        if (!response.success && response.message) {
          showMessage.error(response.message);
        }

        queryClient.invalidateQueries({
          queryKey: boardApi.queryKey,
        });
      },
    });
  };

  return { onDelete, isLoadingDelete: deleteMutation.isPending };
};
