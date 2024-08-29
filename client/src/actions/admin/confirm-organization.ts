'use server';

import { organizationController } from '@/lib';

export async function confirmOrganizationAction(id: string) {
  try {
    return await organizationController.confirmOrganization(id);
  } catch (error) {
    return Promise.reject(error);
  }
}
