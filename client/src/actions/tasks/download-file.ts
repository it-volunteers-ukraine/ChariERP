'use server';

import { cookies } from 'next/headers';

import { taskService } from '@/lib';

export async function downloadFileAction({ taskId }: { taskId: string }) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('id')?.value || '';

  try {
    return await taskService.downloadFile({ taskId, userId });
  } catch (error) {
    return Promise.reject(error);
  }
}
