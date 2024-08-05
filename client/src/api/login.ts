import { instance } from './default';

export const createOrganization = async (formData: FormData) => {
  return await instance
    .post('/organizations/create', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then(({ data }) => data);
};
