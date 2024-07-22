'use client';
import Cookies from 'js-cookie';
import axios, { AxiosError } from 'axios';
import { FormikHelpers, FormikValues } from 'formik';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { routes } from '@/constants';

import { LoginForm } from '../login-form';

const SignIn = () => {
  const router = useRouter();
  const onSubmit = async (values: FormikValues, handleFormik?: FormikHelpers<FormikValues>) => {
    try {
      const { data } = await axios.post('/api/users', { email: values.email, password: values.password });

      Cookies.set('id', data._id, { expires: 7 });
      router.push(routes.requests);
    } catch (error) {
      if (error instanceof AxiosError) {
        handleFormik?.setFieldError('email', error.response?.data.message);
      }
    }
  };

  return <LoginForm onSubmit={onSubmit} />;
};

export default SignIn;
