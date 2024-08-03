'use client';

import { useState } from 'react';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FormikHelpers, FormikValues } from 'formik';

import { routes } from '@/constants';

import { LoginForm } from '../../login-form';

const AdminPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ email, password }: FormikValues, handleFormik?: FormikHelpers<FormikValues>) => {
    setIsLoading(true);

    try {
      await axios.post('/api/admin', { email, password }).then(({ data }) => data);

      router.push(routes.login);
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        handleFormik?.setFieldError('email', error.response?.data.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm onSubmit={onSubmit} isLoading={isLoading} />;
};

export default AdminPage;
