'use client';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikValues } from 'formik';

import { Button, InputField } from '@/components';

import { getValidationSchema, initialValues } from './sign-in/config';

interface ILoginFormProps {
  onSubmit: (values: FormikValues) => void;
}

const LoginForm = ({ onSubmit }: ILoginFormProps) => {
  const login = useTranslations('auth-page.login');
  const message = useTranslations('validation');

  const validationSchema = getValidationSchema({
    required: message('required'),
    matches: message('matches_english', { field: 'Password' }),
    min6: message('minPlural', { int: 6 }),
    min8: message('minPlural', { int: 8 }),
    max20: message('minPlural', { int: 20 }),
    max50: message('maxPlural', { int: 50 }),
  });

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
      {() => (
        <Form className="flex flex-col items-center pt-7 pb-2 desktop:pt-[30px] desktop:pb-[22px] gap-10 max-w-[400px] w-full">
          <InputField name="email" label="Email" required />
          <InputField required name="password" type="password" label={login('password')} />

          <Button type="submit" styleType="primary" className="w-[115px]" text={login('button')} />
        </Form>
      )}
    </Formik>
  );
};

export { LoginForm };
