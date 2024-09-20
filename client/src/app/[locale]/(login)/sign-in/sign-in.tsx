'use client';

import { useState } from 'react';
import Cookies from 'js-cookie';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { FormikHelpers, FormikValues } from 'formik';

import { routes } from '@/constants';
import { loginAction } from '@/actions';

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

        Cookies.set('id', user._id.toString(), { expires: 7 });
        router.push(routes.managerHome);
      }

      if (!result.success && result.message) {
        handleFormik?.setFieldError('email', errorText(result.message));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return <LoginForm onSubmit={onSubmit} isLoading={isLoading} />;
};

export default SignIn;
