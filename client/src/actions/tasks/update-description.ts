'use server';

import { cookies } from 'next/headers';

import { taskService } from '@/lib';
import { IUpdateTaskDescriptionActionProps } from '@/types';

export async function updateDescriptionAction({ taskId, description }: IUpdateTaskDescriptionActionProps) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('id')?.value || '';

  try {
    return await taskService.updateDescription({ taskId, userId, description });
  } catch (error) {
    return Promise.reject(error);
  }
}
