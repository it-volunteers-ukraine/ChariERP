import { instance } from './default';
import { oneOrganizationNormalizer } from '@/utils';

export const onUpdateOrganization = async (id: string, formData: FormData) => {
  return await instance
    .post(`/organizations/update/${id}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(({ data }) => oneOrganizationNormalizer(data));
};
