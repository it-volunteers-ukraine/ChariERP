'use server';

import { cookies } from 'next/headers';

import { taskService } from '@/lib';
import { IUpdateCommentActionProps } from '@/types';

export async function updateCommentAction({ taskId, commentId, text }: IUpdateCommentActionProps) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('id')?.value || '';

  try {
    return await taskService.updateComment({ taskId, userId, commentId, text });
  } catch (error) {
    return Promise.reject(error);
  }
}
