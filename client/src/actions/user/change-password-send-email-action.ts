'use server';

import { userService } from '@/lib';

export async function changePasswordSendEmailAction(email: string, baseUrl: string) {
  try {
    return await userService.sendResetEmail(email, baseUrl);
  } catch (error) {
    return Promise.reject(error);
  }
}
