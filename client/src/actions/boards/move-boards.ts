'use server';

import { IBoardData } from '@/components';
import { boardService } from '@/lib';

export async function moveBoardsAction(boards: IBoardData[]) {
  try {
    return await boardService.moveBoards(boards);
  } catch (error) {
    return Promise.reject(error);
  }
}
