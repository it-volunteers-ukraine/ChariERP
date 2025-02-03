'use server';

import { resetTokenService } from '@/lib';

export async function sendResetEmail(email: string, baseUrl: string) {
  try {
    return await resetTokenService.sendResetEmail(email, baseUrl);
  } catch (error) {
    return Promise.reject(error);
  }
}
