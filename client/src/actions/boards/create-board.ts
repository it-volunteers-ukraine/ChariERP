'use server';

import { boardService } from '@/lib';

export async function createBoardAction({ text }: { text: string }) {
  try {
    return await boardService.createBoard(text);
  } catch (error) {
    return Promise.reject(error);
  }
}
