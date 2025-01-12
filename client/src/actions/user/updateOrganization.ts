'use server';

import { userService } from '@/lib';
import { IUpdateOrganizationByManager } from '@/types';

export async function updateOrganizationByManagerAction({
  organizationId,
  userId,
  formData,
}: IUpdateOrganizationByManager) {
  try {
    return await userService.updateOrganizationByManager({
      organizationId,
      userId,
      formData,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}
