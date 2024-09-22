'use server';

import { userService } from '@/lib';

export async function loginAction(
  email: string,
  password: string,
): Promise<{ success: boolean; message?: string; user?: string }> {
  try {
    return await userService.login(email, password);
  } catch (error) {
    return Promise.reject(error);
  }
}
