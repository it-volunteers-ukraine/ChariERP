'use server';

import { cookies } from 'next/headers';

import { roleController } from '@/lib';

export async function getRoleAction() {
  const cookieStore = cookies();
  const id = cookieStore.get('id');

  try {
    if (id?.value) {
      return await roleController.getRole(id.value);
    }

    return { success: false };
  } catch (error) {
    return Promise.reject(error);
  }
}
