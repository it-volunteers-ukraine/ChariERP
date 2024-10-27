'use server';

import { IBoardData } from '@/components';
import { boardService } from '@/lib';

export async function moveBoardsAction({ boards, userId }: { boards: IBoardData[]; userId: string }) {
  try {
    return await boardService.moveBoards(boards, userId);
  } catch (error) {
    return Promise.reject(error);
  }
}
