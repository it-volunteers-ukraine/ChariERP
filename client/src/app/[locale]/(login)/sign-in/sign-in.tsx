'use client';
import axios, { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { FormikHelpers, FormikValues } from 'formik';

import { routes } from '@/constants';

import { LoginForm } from '../login-form';

const SignIn = () => {
  const router = useRouter();
  const onSubmit = async (values: FormikValues, handleFormik?: FormikHelpers<FormikValues>) => {
    try {
      await axios.post('/api/users', { email: values.email, password: values.password });

      router.push(routes.dashboard);
    } catch (error) {
      if (error instanceof AxiosError) {
        handleFormik?.setFieldError('email', error.response?.data.message);
      }
    }
  };

  return <LoginForm onSubmit={onSubmit} />;
};

export default SignIn;
