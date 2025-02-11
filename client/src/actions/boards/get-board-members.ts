'use server';

import { boardService } from '@/lib';
import { IGetBoardMembersProps } from '@/types';

export async function getBoardMembersAction({ userId, boardId }: IGetBoardMembersProps) {
  try {
    return await boardService.getBoardMembers({ userId, boardId });
  } catch (error) {
    return Promise.reject(error);
  }
}
