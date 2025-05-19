'use server';

import { cookies } from 'next/headers';

import { taskService } from '@/lib';
import { IUpdateStatusActionProps } from '@/types';

export async function updateStatusAction({ taskId, newColumnId }: IUpdateStatusActionProps) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('id')?.value || '';

  try {
    return await taskService.updateBoardColumnId({ taskId, userId, newColumnId });
  } catch (error) {
    return Promise.reject(error);
  }
}
