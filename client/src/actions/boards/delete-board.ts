'use server';

import { boardService } from '@/lib';

export async function deleteBoardAction({ id }: { id: string }) {
  try {
    return await boardService.deleteBoard(id);
  } catch (error) {
    return Promise.reject(error);
  }
}
