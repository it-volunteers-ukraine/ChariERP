'use server';

import { organizationController } from '@/lib';

export async function updateOrganizationAction(id: string, formData: FormData) {
  try {
    return await organizationController.updateOrganization(id, formData);
  } catch (error) {
    return Promise.reject(error);
  }
}
