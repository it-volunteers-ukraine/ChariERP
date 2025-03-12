'use server';

import { boardService } from '@/lib';
import { IRevokeUserFromBoardProps } from '@/types';

export async function removeUserFromBoardAction({ userId, boardId, revokeUserId }: IRevokeUserFromBoardProps) {
  try {
    return await boardService.revokeUserFromBoard({
      userId,
      boardId,
      revokeUserId,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}
