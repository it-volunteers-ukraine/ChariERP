import { cleanSpaces, renameFile } from '@/utils';
import { OrganizationEditValues, OrganizationFormValues, OrganizationUpdateValues } from '@/types';

export const serializeOrganizationsCreate = (data: OrganizationFormValues) => {
  return {
    file: renameFile(data.certificate as File),
    data: {
      phone: data.phone,
      edrpou: data.edrpou,
      site: cleanSpaces(data.site),
      email: cleanSpaces(data.email),
      lastName: cleanSpaces(data.lastName),
      position: cleanSpaces(data.position),
      firstName: cleanSpaces(data.firstName),
      middleName: cleanSpaces(data.middleName),
      dateOfRegistration: data.dateOfRegistration,
      social: data.social.map((item) => cleanSpaces(item)),
      organizationName: cleanSpaces(data.organizationName),
    },
  };
};

export const serializeOrganizationsUpdate = (
  data: OrganizationEditValues,
): { file: File | string; data: OrganizationUpdateValues } => {
  return {
    file: data.certificate,
    data: {
      phone: data.phone,
      edrpou: data.edrpou,
      site: cleanSpaces(data.site),
      email: cleanSpaces(data.email),
      lastName: cleanSpaces(data.lastName),
      position: cleanSpaces(data.position),
      firstName: cleanSpaces(data.firstName),
      middleName: cleanSpaces(data.middleName),
      declineReason: cleanSpaces(data.declineReason || ''),
      social: data.social.map((item) => cleanSpaces(item)),
      organizationName: cleanSpaces(data.organizationName),
      dateOfRegistration: new Date(data.dateOfRegistration).toISOString(),
    },
  };
};
