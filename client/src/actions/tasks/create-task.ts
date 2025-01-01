'use server';

import { taskService } from '@/lib';
import { ICreateTaskProps } from '@/types';

export async function createTaskAction({ userId, boardId, columnId, task }: ICreateTaskProps) {
  try {
    return await taskService.createTask({ userId, boardId, columnId, task });
  } catch (error) {
    return Promise.reject(error);
  }
}
