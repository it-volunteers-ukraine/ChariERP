'use server';

import { boardColumnService } from '@/lib';

export async function createBoardColumn(title: string, boardId: string, userId: string) {
  try {
    return await boardColumnService.createBoardColumn(title, boardId, userId);
  } catch (error) {
    return Promise.reject(error);
  }
}
