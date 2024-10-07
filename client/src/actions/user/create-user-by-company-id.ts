'use server';

import { userService } from '@/lib';

export async function createUserByCompanyIdAction(formData: FormData) {
  try {
    return await userService.createUserByCompanyId(formData);
  } catch (error) {
    return Promise.reject(error);
  }
}
