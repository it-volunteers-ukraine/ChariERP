'use server';

import { boardColumnService } from '@/lib';

export async function getBoardColumns(boardId: string, userId: string) {
  try {
    return await boardColumnService.getBoardColumns(boardId, userId);
  } catch (error) {
    return Promise.reject(error);
  }
}
