'use server';

import { taskService } from '@/lib';

export async function downloadFileAction({ taskId }: { taskId: string }) {
  try {
    return await taskService.downloadFile({ taskId });
  } catch (error) {
    return Promise.reject(error);
  }
}
