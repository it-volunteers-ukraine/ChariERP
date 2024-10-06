'use server';

import { userService } from '@/lib';

export async function getUserByIdAction(id: string) {
  try {
    return await userService.getUserById(id);
  } catch (error) {
    return Promise.reject(error);
  }
}
