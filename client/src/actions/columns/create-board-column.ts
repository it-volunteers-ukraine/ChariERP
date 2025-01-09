'use server';

import { boardColumnService } from '@/lib';
import { ICreateColumnProps } from '@/types';

export async function createBoardColumnAction({ title, boardId, userId }: ICreateColumnProps) {
  try {
    return await boardColumnService.createBoardColumn({ title, boardId, userId });
  } catch (error) {
    return Promise.reject(error);
  }
}
