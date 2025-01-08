'use server';

import { boardColumnService } from '@/lib';
import { IMoveBoardColumnProps } from '@/types';

export async function moveBoardColumnAction({ boardId, userId, sourceIndex, destinationIndex }: IMoveBoardColumnProps) {
  try {
    return await boardColumnService.moveBoardColumn({ boardId, userId, sourceIndex, destinationIndex });
  } catch (error) {
    return Promise.reject(error);
  }
}
