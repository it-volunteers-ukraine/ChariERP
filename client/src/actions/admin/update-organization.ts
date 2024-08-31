'use server';

import { organizationController } from '@/lib';

export async function updateOrganizationAction(id: string, formData: FormData) {
  try {
    return await organizationController.updateAdminOrganization(id, formData);
  } catch (error) {
    return Promise.reject(error);
  }
}
