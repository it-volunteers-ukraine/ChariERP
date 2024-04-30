'use client';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikValues } from 'formik';

import { Button, InputField } from '@/components';

import { initialValues, validationSchema } from './config';

const SignIn = () => {
  const login = useTranslations('auth-page.login');

  const onSubmit = (values: FormikValues) => {
    console.log(values);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {() => (
        <Form className="flex flex-col items-center gap-10 max-w-[400px] w-full">
          <InputField name="email" label="Email" />
          <InputField
            name="password"
            type="password"
            label={login('password')}
          />
          <Button
            type="submit"
            styleType="primary"
            className="w-[115px]"
            text={login('button')}
          />
        </Form>
      )}
    </Formik>
  );
};

export default SignIn;
