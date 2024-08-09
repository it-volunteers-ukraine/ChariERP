'use client';

import { useState } from 'react';
import Cookies from 'js-cookie';
import { AxiosError } from 'axios';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FormikHelpers, FormikValues } from 'formik';

import { login } from '@/api';
import { routes } from '@/constants';

import { LoginForm } from '../login-form';

const SignIn = () => {
  const router = useRouter();
  const errorText = useTranslations('errors.login');

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: FormikValues, handleFormik?: FormikHelpers<FormikValues>) => {
    setIsLoading(true);

    try {
      const data = await login({ email: values.email, password: values.password });

      if (data._id) {
        Cookies.set('id', data._id.toString(), { expires: 7 });
        router.push(routes.requests);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        handleFormik?.setFieldError('email', error.response?.data.message && errorText(error.response.data.message));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm onSubmit={onSubmit} isLoading={isLoading} />;
};

export default SignIn;
