'use server';

import { cookies } from 'next/headers';

import { taskService } from '@/lib';
import { IDeleteCommentActionProps } from '@/types';

export async function deleteCommentAction({ taskId, commentId }: IDeleteCommentActionProps) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('id')?.value || '';

  try {
    return await taskService.deleteComment({ taskId, userId, commentId });
  } catch (error) {
    return Promise.reject(error);
  }
}
