'use server';

import { taskService } from '@/lib';
import { IMoveTaskProps } from '@/types';

export async function moveTaskAction({
  userId,
  taskId,
  boardId,
  columnId,
  destinationIndex,
  destinationColumnId,
}: IMoveTaskProps) {
  try {
    return await taskService.moveTask({ boardId, userId, taskId, columnId, destinationIndex, destinationColumnId });
  } catch (error) {
    return Promise.reject(error);
  }
}
