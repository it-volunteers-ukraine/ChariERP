'use server';

import { boardService } from '@/lib';

export async function deleteBoardAction({ id, userId }: { id: string; userId: string }) {
  try {
    return await boardService.deleteBoard(id, userId);
  } catch (error) {
    return Promise.reject(error);
  }
}
