import { renameFile } from '@/utils';
import { OrganizationEditValues, OrganizationFormValues, OrganizationUpdateValues } from '@/types';

export const serializeOrganizationsCreate = (data: OrganizationFormValues) => {
  return {
    file: renameFile(data.certificate as File),
    data: {
      site: data.site,
      email: data.email,
      phone: data.phone,
      edrpou: data.edrpou,
      social: data.social,
      lastName: data.lastName,
      position: data.position,
      firstName: data.firstName,
      middleName: data.middleName,
      organizationName: data.organizationName,
      dateOfRegistration: data.dateOfRegistration,
    },
  };
};

export const serializeOrganizationsUpdate = (
  data: OrganizationEditValues,
): { file: File | string; data: OrganizationUpdateValues } => {
  return {
    file: data.certificate,
    data: {
      site: data.site,
      email: data.email,
      phone: data.phone,
      edrpou: data.edrpou,
      social: data.social,
      lastName: data.lastName,
      position: data.position,
      firstName: data.firstName,
      middleName: data.middleName,
      organizationName: data.organizationName,
      dateOfRegistration: new Date(data.dateOfRegistration).toISOString(),
    },
  };
};
