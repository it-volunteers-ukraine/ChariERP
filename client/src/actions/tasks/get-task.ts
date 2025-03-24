'use server';

import { cookies } from 'next/headers';

import { taskService } from '@/lib';
import { IGetTaskProps } from '@/types';

export async function getTaskAction({ boardId, columnId, taskId }: IGetTaskProps) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('id')?.value || '';

  try {
    return await taskService.getTask({ userId, boardId, columnId, taskId });
  } catch (error) {
    return Promise.reject(error);
  }
}
