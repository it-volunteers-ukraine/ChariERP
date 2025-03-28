'use server';

import { taskService } from '@/lib';
import { IDeleteTaskProps } from '@/types';

export async function deleteTaskAction({ boardId, userId, taskId }: IDeleteTaskProps) {
  try {
    return await taskService.deleteTask({ boardId, userId, taskId });
  } catch (error) {
    return Promise.reject(error);
  }
}
