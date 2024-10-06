'use server';

import { userService } from '@/lib';

export async function updateMemberByIdAction(formData: FormData) {
  try {
    return await userService.updateMemberById(formData);
  } catch (error) {
    return Promise.reject(error);
  }
}
