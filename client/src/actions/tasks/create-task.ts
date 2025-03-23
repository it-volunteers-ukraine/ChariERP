'use server';

import { taskService } from '@/lib';
import { ICreateTaskProps } from '@/types';

export async function createTaskAction({ userId, boardId, columnId }: ICreateTaskProps) {
  try {
    return await taskService.createTask({ userId, boardId, columnId });
  } catch (error) {
    return Promise.reject(error);
  }
}
