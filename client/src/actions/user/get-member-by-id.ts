'use server';

import { userService } from '@/lib';

export async function getMemberByIdAction(id: string, organizationId: string) {
  try {
    return await userService.getOrganizationMemberById(id, organizationId);
  } catch (error) {
    return Promise.reject(error);
  }
}
