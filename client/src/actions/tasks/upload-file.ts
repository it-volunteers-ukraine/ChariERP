'use server';

import { cookies } from 'next/headers';

import { taskService } from '@/lib';
import { IUploadFileActionProps } from '@/types';

export async function uploadFileAction({ taskId, formData }: IUploadFileActionProps) {
  const cookieStore = await cookies();
  const userId = cookieStore.get('id')?.value || '';

  try {
    return await taskService.uploadFile({ taskId, userId, formData });
  } catch (error) {
    return Promise.reject(error);
  }
}
