'use server';

import { organizationService } from '@/lib';
import { IUpdateOrganizationByManager } from '@/types';

export async function updateOrganizationByManagerAction({
  userId,
  formData,
  organizationId,
}: IUpdateOrganizationByManager) {
  try {
    return await organizationService.updateOrganizationByManager({
      userId,
      formData,
      organizationId,
    });
  } catch (error) {
    return Promise.reject(error);
  }
}
