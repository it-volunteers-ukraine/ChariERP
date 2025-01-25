'use server';

import { boardService } from '@/lib';
import { IApplyUserToBoardProps } from '@/types';

export async function applyUserToBoardAction({ userId, boardId, applyUserId }: IApplyUserToBoardProps) {
  try {
    return await boardService.applyUserToBoard({
      userId,
      boardId,
      applyUserId,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}
