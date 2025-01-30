'use server';

import { resetTokenService } from '@/lib';

export async function changePasswordAction(token: string | null, newPassword: string) {
  try {
    return await resetTokenService.changePassword(token, newPassword);
  } catch (error) {
    return Promise.reject(error);
  }
}
