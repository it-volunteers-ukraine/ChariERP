'use client';
import axios, { AxiosError } from 'axios';
import { FormikHelpers, FormikValues } from 'formik';
import { useRouter } from 'next/navigation';

import { routes } from '@/constants';

import { LoginForm } from '../login-form';

const AdminPage = () => {
  const router = useRouter();

  const onSubmit = async ({ email, password }: FormikValues, handleFormik?: FormikHelpers<FormikValues>) => {
    try {
      await axios.post(`/api/admin`, { email, password }).then(({ data }) => data);

      router.push(routes.dashboard);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        handleFormik?.setFieldError('email', error.response?.data.message);
      }
    }
  };

  return <LoginForm onSubmit={onSubmit} />;
};

export default AdminPage;
