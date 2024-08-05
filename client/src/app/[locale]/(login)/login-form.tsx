'use client';

import { useTranslations } from 'next-intl';
import { Form, Formik, FormikValues } from 'formik';

import { Button, InputField } from '@/components';

import { getValidationSchema, initialValues } from './sign-in/config';

interface ILoginFormProps {
  isLoading: boolean;
  onSubmit: (values: FormikValues) => void;
}

const LoginForm = ({ onSubmit, isLoading }: ILoginFormProps) => {
  const message = useTranslations('validation');
  const login = useTranslations('auth-page.login');

  const validationSchema = getValidationSchema(message);

  return (
    <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
      {() => (
        <Form className="flex flex-col items-center pt-7 pb-2 desktop:pt-[30px] desktop:pb-[22px] gap-10 max-w-[400px] w-full">
          <InputField name="email" label="Email" required />
          <InputField required name="password" type="password" label={login('password')} />

          <Button
            type="submit"
            styleType="primary"
            className="w-[115px]"
            isLoading={isLoading}
            text={login('button')}
          />
        </Form>
      )}
    </Formik>
  );
};

export { LoginForm };
