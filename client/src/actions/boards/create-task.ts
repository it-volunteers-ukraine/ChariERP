'use server';

import { taskService } from '@/lib';
import { ICreateTask } from '@/types';

export async function createTask(userId: string, boardId: string, columnId: string, task: ICreateTask) {
  try {
    return await taskService.createTask(userId, boardId, columnId, task);
  } catch (error) {
    return Promise.reject(error);
  }
}
