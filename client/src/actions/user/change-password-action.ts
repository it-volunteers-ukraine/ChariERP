'use server';

import { userService } from '@/lib';

export async function changePasswordAction(token: string | null, newPassword: string) {
  try {
    return await userService.changePassword(token, newPassword);
  } catch (error) {
    return Promise.reject(error);
  }
}
