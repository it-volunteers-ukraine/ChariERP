'use server';

import { userService } from '@/lib';

export async function loginAction(
  email: string,
  password: string,
): Promise<{ success: boolean; message?: string; userId?: string }> {
  try {
    const user = await userService.login(email, password);

    if (user._id) {
      return { success: true, userId: user._id };
    }

    return { success: false, message: user.message };
  } catch (error) {
    return Promise.reject(error);
  }
}
