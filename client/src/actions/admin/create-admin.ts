'use server';

import { userService } from '@/lib';

export async function createAdminAction(email: string, password: string) {
  try {
    return await userService.createAdmin(email, password);
  } catch (error) {
    return Promise.reject(error);
  }
}
