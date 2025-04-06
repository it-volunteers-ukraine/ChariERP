'use server';

import { cookies } from 'next/headers';

import { taskService } from '@/lib';
import { IAddCommentActionProps } from '@/types';

export async function addCommentAction({ taskId, text }: IAddCommentActionProps) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('id')?.value || '';

  try {
    return await taskService.addComment({ taskId, userId, text });
  } catch (error) {
    return Promise.reject(error);
  }
}
