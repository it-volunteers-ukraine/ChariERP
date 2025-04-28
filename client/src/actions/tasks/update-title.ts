'use server';

import { cookies } from 'next/headers';

import { taskService } from '@/lib';
import { IUpdateTaskTitleActionProps } from '@/types';

export async function updateTaskTitleAction({ taskId, title }: IUpdateTaskTitleActionProps) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('id')?.value || '';

  try {
    return await taskService.updateTitle({ taskId, userId, title });
  } catch (error) {
    return Promise.reject(error);
  }
}
