import { useMutation } from '@tanstack/react-query';

import { ICreateTask } from '@/types';
import { showMessage } from '@/components';

import { taskApi } from './api';

export const useAddTask = ({ userId, boardId, columnId }: { userId: string; boardId: string; columnId: string }) => {
  const addMutation = useMutation({
    mutationFn: (task: ICreateTask) => taskApi.createTask({ userId, boardId, columnId, task }),
  });

  const addTaskMutation = (task: ICreateTask) => {
    addMutation.mutate(task, {
      onSuccess: (response) => {
        if (!response.success && response.message) {
          showMessage.error(response.message);
        }
      },
    });
  };

  return { addTaskMutation, isLoading: addMutation.isPending };
};
