'use server';

import { cookies } from 'next/headers';

import { taskService } from '@/lib';
import { IAddUserTaskAction } from '@/types';

export async function addUserTaskAction({ taskId, applyUserId, boardId }: IAddUserTaskAction) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('id')?.value || '';

  try {
    return await taskService.addUser({ taskId, userId, applyUserId, boardId });
  } catch (error) {
    return Promise.reject(error);
  }
}
