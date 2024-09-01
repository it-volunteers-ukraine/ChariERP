'use server';

import { organizationService } from '@/lib';

export async function updateOrganizationAction(id: string, formData: FormData) {
  try {
    return await organizationService.updateAdminOrganization(id, formData);
  } catch (error) {
    return Promise.reject(error);
  }
}
