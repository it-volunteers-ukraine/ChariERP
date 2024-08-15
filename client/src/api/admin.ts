import { IOrganizations, IParamsPagination, PaginationResult, RequestOrganizationStatus } from '@/types';

import { instance } from './default';
import { approveOrganizationsNormalizer, oneOrganizationNormalizer, pendingDeclineNormalizer } from '@/utils';

const commonSort = { 'organizationData.dateOfRegistration': 1 };

export const getPendingOrganizations = async ({ page, limit }: IParamsPagination) => {
  const sortToString = JSON.stringify(commonSort);
  const filterToString = JSON.stringify({ request: RequestOrganizationStatus.PENDING });

  const data = await instance
    .get<
      PaginationResult<IOrganizations>
    >('/organizations', { params: { page, limit, sort: sortToString, filter: filterToString } })
    .then(({ data }) => data);

  return { organizations: pendingDeclineNormalizer(data.results), totalPages: data.totalPages };
};

export const getDeclinedOrganizations = async ({ page, limit }: IParamsPagination) => {
  const sortToString = JSON.stringify(commonSort);
  const filterToString = JSON.stringify({ request: RequestOrganizationStatus.DECLINED });

  const data = await instance
    .get<
      PaginationResult<IOrganizations>
    >('/organizations', { params: { page, limit, sort: sortToString, filter: filterToString } })
    .then(({ data }) => data);

  return { organizations: pendingDeclineNormalizer(data.results), totalPages: data.totalPages };
};

export const getApprovedOrganizations = async ({ page, limit }: IParamsPagination) => {
  const sortToString = JSON.stringify(commonSort);
  const filterToString = JSON.stringify({ request: RequestOrganizationStatus.APPROVED });

  const data = await instance
    .get<
      PaginationResult<IOrganizations>
    >('/organizations', { params: { page, limit, populate: 'users', sort: sortToString, filter: filterToString } })
    .then(({ data }) => data);

  return { organizations: approveOrganizationsNormalizer(data.results), totalPages: data.totalPages };
};

export const deleteOrganization = async (id: string) => {
  return await instance.delete(`/organizations/delete/${id}`).then(({ data }) => data);
};

export const onRegisterOrganization = async (id: string) => {
  return await instance.get(`/organizations/confirm/${id}`).then(({ data }) => data);
};

export const onDeclineOrganization = async (id: string, reason: string) => {
  return await instance.post('/organizations/decline', { id, reason }).then(({ data }) => data);
};

export const getOrganizationById = async (id: string) => {
  return await instance.get(`/organizations/${id}`).then(({ data }) => oneOrganizationNormalizer(data));
};
