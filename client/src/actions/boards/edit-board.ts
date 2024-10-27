'use server';

import { boardService } from '@/lib';

export async function editBoardAction({ text, id, userId }: { text: string; id: string; userId: string }) {
  try {
    return await boardService.editBoard(id, text, userId);
  } catch (error) {
    return Promise.reject(error);
  }
}
