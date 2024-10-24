'use server';

import { boardService } from '@/lib';

export async function getBoardsAction() {
  try {
    return await boardService.getBoards();
  } catch (error) {
    return Promise.reject(error);
  }
}
