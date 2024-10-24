'use server';

import { boardService } from '@/lib';

export async function editBoardAction({ text, id }: { text: string; id: string }) {
  try {
    return await boardService.editBoard(id, text);
  } catch (error) {
    return Promise.reject(error);
  }
}
