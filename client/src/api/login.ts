// import { IAdmin, IUsers } from '@/types';

// import { instance } from './default';

// export const login = async ({ password, email }: { password: string; email: string }) => {
//   return await instance.post<IUsers | IAdmin>('/users', { password, email }).then(({ data }) => data);
// };

// export const createOrganization = async (formData: FormData) => {
//   return await instance
//     .post('/organizations/create', formData, { headers: { 'Content-Type': 'multipart/form-data' } })
//     .then(({ data }) => data);
// };
