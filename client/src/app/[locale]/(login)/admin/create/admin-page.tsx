'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FormikHelpers, FormikValues } from 'formik';

import { routes } from '@/constants';
import { createAdminAction } from '@/actions';

import { LoginForm } from '../../login-form';

const AdminPage = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async ({ email, password }: FormikValues, handleFormik?: FormikHelpers<FormikValues>) => {
    setIsLoading(true);

    try {
      const response = await createAdminAction(email, password);

      if (!response.success && response.message) {
        return handleFormik?.setFieldError('email', response.message);
      }

      router.push(routes.login);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm onSubmit={onSubmit} isLoading={isLoading} />;
};

export default AdminPage;
