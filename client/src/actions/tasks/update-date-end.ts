'use server';

import { cookies } from 'next/headers';

import { taskService } from '@/lib';
import { IUpdateDateActionProps } from '@/types';

export async function updateDateEndAction({ taskId, date }: IUpdateDateActionProps) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('id')?.value || '';

  try {
    return await taskService.updateDateEnd({ taskId, userId, date });
  } catch (error) {
    return Promise.reject(error);
  }
}
