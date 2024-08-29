'use server';

import { organizationController } from '@/lib';
import { AdminOrganizationProps } from '@/types';

export async function getAdminOrganizationsAction({ page, limit, filterStatus, populate }: AdminOrganizationProps) {
  try {
    return await organizationController.getAdminOrganizations({ page, limit, filterStatus, populate });
  } catch (error) {
    return Promise.reject(error);
  }
}
