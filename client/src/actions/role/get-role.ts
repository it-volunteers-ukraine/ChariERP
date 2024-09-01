'use server';

import { cookies } from 'next/headers';

import { roleService } from '@/lib';

export async function getRoleAction() {
  const cookieStore = cookies();
  const id = cookieStore.get('id');

  try {
    if (id?.value) {
      return await roleService.getRole(id.value);
    }

    return { success: false, message: 'User not found' };
  } catch (error) {
    return Promise.reject(error);
  }
}
