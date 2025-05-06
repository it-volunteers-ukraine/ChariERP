'use server';

import { cookies } from 'next/headers';

import { taskService } from '@/lib';
import { IUpdateTaskPriorityProps } from '@/types';

export async function updatePriorityAction({ taskId, priority }: IUpdateTaskPriorityProps) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('id')?.value || '';

  try {
    return await taskService.updatePriority({ taskId, userId, priority });
  } catch (error) {
    return Promise.reject(error);
  }
}
