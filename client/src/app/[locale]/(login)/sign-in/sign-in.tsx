'use client';
import { FormikValues } from 'formik';

import { LoginForm } from '../login-form';

const SignIn = () => {
  const onSubmit = async (values: FormikValues) => {
    console.log(values);
  };

  return <LoginForm onSubmit={onSubmit} />;
};

export default SignIn;
