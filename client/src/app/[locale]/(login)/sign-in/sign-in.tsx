'use client';

import { useState } from 'react';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FormikHelpers, FormikValues } from 'formik';
import logger from '@/utils/logger/logger';

import { loginAction } from '@/actions';
import { idUser, routes } from '@/constants';

import { LoginForm } from '../login-form';

const SignIn = () => {
  const router = useRouter();
  const errorText = useTranslations('errors.login');

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: FormikValues, handleFormik?: FormikHelpers<FormikValues>) => {
    setIsLoading(true);

    try {
      const result = await loginAction(values.email, values.password);

      if (result.success && result.user) {
        const user = JSON.parse(result.user);

        Cookies.set(idUser, user._id.toString(), { expires: 1 });
        router.push(routes.managerHome);
      }

      if (!result.success && result.message) {
        handleFormik?.setFieldError('email', ' ');
        handleFormik?.setFieldError('password', errorText(result.message));
      }
    } catch (error) {
      logger.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm onSubmit={onSubmit} isLoading={isLoading} />;
};

export default SignIn;
