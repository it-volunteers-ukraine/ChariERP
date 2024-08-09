import { IOrganizations, IParamsPagination, PaginationResult, RequestOrganizationStatus } from '@/types';

import { instance } from './default';

const commonSort = { 'organizationData.dateOfRegistration': 1 };

const getModifiedData = (data: IOrganizations[]) => {
  return data.map((item) => ({
    id: item._id!.toString(),
    organizationName: item.organizationData.organizationName,
    EDRPOU: item.organizationData.edrpou,
    dateOfRegistration: item.organizationData.dateOfRegistration,
    email: item.contactData.email,
    certificate: item.organizationData.certificate,
  }));
};

export const getPendingOrganizations = async ({ page, limit }: IParamsPagination) => {
  const sortToString = JSON.stringify(commonSort);
  const filterToString = JSON.stringify({ request: RequestOrganizationStatus.PENDING });

  const data = await instance
    .get<
      PaginationResult<IOrganizations>
    >('/organizations', { params: { page, limit, sort: sortToString, filter: filterToString } })
    .then(({ data }) => data);

  const modifiedData = getModifiedData(data.results);

  return { organizations: modifiedData, totalPages: data.totalPages };
};

export const getDeclinedOrganizations = async ({ page, limit }: IParamsPagination) => {
  const sortToString = JSON.stringify(commonSort);
  const filterToString = JSON.stringify({ request: RequestOrganizationStatus.DECLINED });

  const data = await instance
    .get<
      PaginationResult<IOrganizations>
    >('/organizations', { params: { page, limit, sort: sortToString, filter: filterToString } })
    .then(({ data }) => data);

  const modifiedData = getModifiedData(data.results);

  return { organizations: modifiedData, totalPages: data.totalPages };
};

export const getApprovedOrganizations = async ({ page, limit }: IParamsPagination) => {
  const sortToString = JSON.stringify(commonSort);
  const filterToString = JSON.stringify({ request: RequestOrganizationStatus.APPROVED });

  const data = await instance
    .get<
      PaginationResult<IOrganizations>
    >('/organizations', { params: { page, limit, populate: 'users', sort: sortToString, filter: filterToString } })
    .then(({ data }) => data);

  const modifiedData = data.results.map((item) => ({
    id: item._id!.toString(),
    organizationName: item.organizationData.organizationName,
    EDRPOU: item.organizationData.edrpou,
    dateOfRegistration: item.organizationData.dateOfRegistration,
    email: item.contactData.email,
    users: item.users.length,
  }));

  return { organizations: modifiedData, totalPages: data.totalPages };
};

export const deleteOrganization = async (id: string) => {
  return await instance.delete(`/organizations/${id}`).then(({ data }) => data);
};

export const onRegisterOrganization = async (id: string) => {
  return await instance.get(`/organizations/${id}`).then(({ data }) => data);
};

export const onDeclineOrganization = async (id: string, reason: string) => {
  return await instance.post('/organizations/decline', { id, reason }).then(({ data }) => data);
};
