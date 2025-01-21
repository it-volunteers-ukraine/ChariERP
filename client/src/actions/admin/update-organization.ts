'use server';

import { organizationService } from '@/lib';
import { IUpdateOrganizationByManager } from '@/types';

export async function updateOrganizationAction({ organizationId, userId, formData }: IUpdateOrganizationByManager) {
  try {
    return await organizationService.updateAdminOrganization({ organizationId, userId, formData });
  } catch (error) {
    return Promise.reject(error);
  }
}
