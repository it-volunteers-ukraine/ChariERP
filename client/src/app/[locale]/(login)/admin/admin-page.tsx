'use client';
import { FormikValues } from 'formik';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

import { routes } from '@/constants';

import { LoginForm } from '../login-form';

const AdminPage = () => {
  const router = useRouter();

  const onSubmit = async ({ email, password }: FormikValues) => {
    try {
      await axios.post(`/api/admin`, { email, password }).then(({ data }) => data);

      router.push(routes.dashboard);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    }
  };

  return <LoginForm onSubmit={onSubmit} />;
};

export default AdminPage;
