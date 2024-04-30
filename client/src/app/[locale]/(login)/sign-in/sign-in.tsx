'use client';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikValues } from 'formik';

import { Button, InputField } from '@/components';

import { initialValues, validationSchema } from './config';

const SignIn = () => {
  const login = useTranslations('auth-page.login');
  const message = useTranslations('validation');

  const onSubmit = (values: FormikValues) => {
    console.log(values);
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema({
        required: message('required'),
        matches: message('matches_english', { field: 'Password' }),
        min6: message('minPlural', { int: 6 }),
        min8: message('minPlural', { int: 8 }),
        max20: message('minPlural', { int: 20 }),
        max50: message('maxPlural', { int: 50 }),
      })}
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
