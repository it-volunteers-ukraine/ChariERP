'use server';

import { boardService } from '@/lib';

export async function createBoardAction({ text, userId }: { text: string; userId: string }) {
  try {
    return await boardService.createBoard(text, userId);
  } catch (error) {
    return Promise.reject(error);
  }
}
