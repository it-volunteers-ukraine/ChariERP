'use server';

import { cookies } from 'next/headers';

import { taskService } from '@/lib';
import { IDeleteUserTaskAction } from '@/types';

export async function deleteUserTaskAction({ taskId, deleteUserId }: IDeleteUserTaskAction) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('id')?.value || '';

  try {
    return await taskService.deleteUser({ taskId, userId, deleteUserId });
  } catch (error) {
    return Promise.reject(error);
  }
}
