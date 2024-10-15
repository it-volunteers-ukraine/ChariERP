import { createFile } from '@/utils';
import { IOrganizations } from '@/types';

export const oneOrganizationNormalizer = (data: IOrganizations) => {
  const certificate = decodeURI(data.organizationData.certificate);

  const fileName = certificate?.split('/').pop()?.split('.');

  const file = createFile(fileName![0], fileName![1]);

  return {
    certificate: file,
    site: data.mediaData.site || '',
    email: data.contactData.email || '',
    phone: data.contactData.phone || '',
    social: data.mediaData.social || [''],
    declineReason: data.declineReason || '',
    lastName: data.contactData.lastName || '',
    position: data.contactData.position || '',
    edrpou: data.organizationData.edrpou || '',
    firstName: data.contactData.firstName || '',
    middleName: data.contactData.middleName || '',
    organizationName: data.organizationData.organizationName || '',
    dateOfRegistration: data.organizationData.dateOfRegistration || '',
  };
};

export const approveOrganizationsNormalizer = (data: IOrganizations[]) => {
  return data.map((item) => ({
    id: item._id!.toString(),
    organizationName: item.organizationData.organizationName,
    EDRPOU: item.organizationData.edrpou,
    approvalDate: item.approvalDate?.toISOString(),
    email: item.contactData.email,
    users: item.users.length,
  }));
};

export const pendingDeclineNormalizer = (data: IOrganizations[]) => {
  return data.map((item) => ({
    id: item._id!.toString(),
    organizationName: item.organizationData.organizationName,
    EDRPOU: item.organizationData.edrpou,
    requestDate: item.requestDate.toISOString(),
    email: item.contactData.email,
    certificate: item.organizationData.certificate,
  }));
};
