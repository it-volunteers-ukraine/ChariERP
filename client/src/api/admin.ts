import { IOrganizations, PaginationResult, RequestOrganizationStatus } from '@/types';

import { instance } from './default';

const getModifiedData = (data: IOrganizations[], status: RequestOrganizationStatus) => {
  const filteredData = data.filter((item) => item.request === status);

  return filteredData.map((item) => ({
    id: item._id!.toString(),
    organizationName: item.organizationData.organizationName,
    EDRPOU: item.organizationData.edrpou,
    dateOfRegistration: item.organizationData.dateOfRegistration,
    email: item.contactData.email,
    certificate: item.organizationData.certificate,
  }));
};

export const getPendingOrganizations = async (page: number, limit?: number) => {
  const data = await instance
    .get<PaginationResult<IOrganizations>>('/organizations', { params: { page, limit } })
    .then(({ data }) => data);

  const modifiedData = getModifiedData(data.results, RequestOrganizationStatus.PENDING);

  return { organizations: modifiedData, totalPages: data.totalPages };
};

export const getDeclinedOrganizations = async (page: number, limit?: number) => {
  const data = await instance
    .get<PaginationResult<IOrganizations>>('/organizations', { params: { page, limit } })
    .then(({ data }) => data);

  const modifiedData = getModifiedData(data.results, RequestOrganizationStatus.DECLINED);

  return { organizations: modifiedData, totalPages: data.totalPages };
};

export const getApprovedOrganizations = async (page: number, limit?: number) => {
  const data = await instance
    .get<PaginationResult<IOrganizations>>('/organizations', { params: { page, limit, populate: 'users' } })
    .then(({ data }) => data);

  const filteredData = data.results.filter((item) => item.request === RequestOrganizationStatus.APPROVED);

  const modifiedData = filteredData.map((item) => ({
    id: item._id!.toString(),
    organizationName: item.organizationData.organizationName,
    EDRPOU: item.organizationData.edrpou,
    dateOfRegistration: item.organizationData.dateOfRegistration,
    email: item.contactData.email,
    users: item.users.length,
  }));

  return { organizations: modifiedData, totalPages: data.totalPages };
};
