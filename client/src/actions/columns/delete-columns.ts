'use server';

import { boardColumnService } from '@/lib';
import { IDeleteColumnProps } from '@/types';

export async function deleteColumn({ boardId, userId, columnId }: IDeleteColumnProps) {
  try {
    return await boardColumnService.deleteColumn({ boardId, userId, columnId });
  } catch (error) {
    return Promise.reject(error);
  }
}
