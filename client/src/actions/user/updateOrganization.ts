'use server';

import { userService } from '@/lib';
import { IUpdateOrganizationByManager } from '@/types';

export async function updateOrganizationByManagerAction({
  userId,
  formData,
  organizationId,
}: IUpdateOrganizationByManager) {
  try {
    return await userService.updateOrganizationByManager({
      userId,
      formData,
      organizationId,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}
