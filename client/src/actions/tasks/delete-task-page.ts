'use server';

import { cookies } from 'next/headers';

import { taskService } from '@/lib';
import { IDeleteTaskPageActionProps } from '@/types';

export async function deleteTaskPageAction({ taskId }: IDeleteTaskPageActionProps) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('id')?.value || '';

  try {
    return await taskService.deleteTaskPage({ taskId, userId });
  } catch (error) {
    return Promise.reject(error);
  }
}
