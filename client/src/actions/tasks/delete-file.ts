'use server';

import { cookies } from 'next/headers';

import { taskService } from '@/lib';
import { IDeleteFileActionProps } from '@/types';

export async function deleteFileAction({ taskId, id }: IDeleteFileActionProps) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('id')?.value || '';

  try {
    return await taskService.deleteFile({ taskId, userId, id });
  } catch (error) {
    return Promise.reject(error);
  }
}
