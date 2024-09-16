'use server';

import { cookies } from 'next/headers';

import { userService } from '@/lib';

export async function getMeAction() {
  const cookieStore = cookies();
  const id = cookieStore.get('id');

  try {
    if (id?.value) {
      return await userService.getUserById(id.value);
    }

    return { success: false, message: 'User not found' };
  } catch (error) {
    return Promise.reject(error);
  }
}
