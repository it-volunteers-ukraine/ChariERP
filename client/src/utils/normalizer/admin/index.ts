// import { downloadFileFromBucket } from '@/services';
import { IOrganizations } from '@/types';
import { createFile } from '@/utils';

export const oneOrganizationNormalizer = async (data: IOrganizations) => {
  const certificate = data.organizationData.certificate;
  // const stream = await downloadFileFromBucket(certificate);

  const fileName = certificate.split('/').pop()?.split('.');

  const file = createFile(fileName![0], fileName![1]);

  // const downLoadFile = await getUrlWithExtension({ url: certificate, file: stream!, downloadType: DownloadType.FILE });

  return {
    site: data.mediaData.site || '',
    email: data.contactData.email || '',
    phone: data.contactData.phone || '',
    edrpou: data.organizationData.edrpou.toString() || '',
    social: data.mediaData.social || [''],
    lastName: data.contactData.lastName || '',
    position: data.contactData.position || '',
    firstName: data.contactData.firstName || '',
    middleName: data.contactData.middleName || '',
    certificate: file,
    organizationName: data.organizationData.organizationName || '',
    dateOfRegistration: data.organizationData.dateOfRegistration || '',
  };
};

export const approveOrganizationsNormalizer = (data: IOrganizations[]) => {
  return data.map((item) => ({
    id: item._id!.toString(),
    organizationName: item.organizationData.organizationName,
    EDRPOU: item.organizationData.edrpou,
    dateOfRegistration: item.organizationData.dateOfRegistration,
    email: item.contactData.email,
    users: item.users.length,
  }));
};

export const pendingDeclineNormalizer = (data: IOrganizations[]) => {
  return data.map((item) => ({
    id: item._id!.toString(),
    organizationName: item.organizationData.organizationName,
    EDRPOU: item.organizationData.edrpou,
    dateOfRegistration: item.organizationData.dateOfRegistration,
    email: item.contactData.email,
    certificate: item.organizationData.certificate,
  }));
};
