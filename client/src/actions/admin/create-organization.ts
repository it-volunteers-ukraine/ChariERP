'use server';

import { organizationController } from '@/lib';

export async function createOrganizationAction(data: FormData) {
  try {
    return await organizationController.createOrganization(data);
  } catch (error) {
    return Promise.reject(error);
  }
}
