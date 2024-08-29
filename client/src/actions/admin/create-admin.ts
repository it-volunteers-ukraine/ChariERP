'use server';

import { userController } from '@/lib';

export async function createAdminAction(email: string, password: string) {
  try {
    return await userController.createAdmin(email, password);
  } catch (error) {
    return Promise.reject(error);
  }
}
