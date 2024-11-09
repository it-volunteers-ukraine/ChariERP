'use server';

import { boardService } from '@/lib';

export async function getBoardsAction({ id }: { id: string }) {
  try {
    return await boardService.getBoards(id);
  } catch (error) {
    return Promise.reject(error);
  }
}
