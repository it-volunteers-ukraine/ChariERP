import { useMutation } from '@tanstack/react-query';

import { ICreateTask } from '@/types';
import { showMessage } from '@/components';

import { taskApi } from './api';

export const useAddTask = ({ userId, boardId, columnId }: { userId: string; boardId: string; columnId: string }) => {
  const addMutation = useMutation({
    mutationFn: (task: ICreateTask) => {
      const abortController = new AbortController();

      return taskApi.createTask({ userId, boardId, columnId, task })({ signal: abortController.signal });
    },
  });

  const addTask = (task: ICreateTask) => {
    addMutation.mutate(task, {
      onSuccess: (response) => {
        if (!response.success && response.message) {
          showMessage.error(response.message);
        }
      },
    });
  };

  return { addTask, isLoading: addMutation.isPending };
};
