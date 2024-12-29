'use server';

import { boardColumnService } from '@/lib';
import { IChangeColumnTitleProps } from '@/types';

export async function changeColumnTitle({ boardId, userId, columnId, title }: IChangeColumnTitleProps) {
  try {
    return await boardColumnService.changeColumnTitle({ boardId, userId, columnId, title });
  } catch (error) {
    return Promise.reject(error);
  }
}
