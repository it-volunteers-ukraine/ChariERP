'use client';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikValues } from 'formik';

import { Button, InputField } from '@/components';

import { initialValues, validationSchema } from './config';

const SignUp = () => {
  const registration = useTranslations('auth-page.registration');

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
        <Form className="flex flex-col items-center gap-10 w-full">
          <InputField name="email" label="Email" required />

          <Button
            type="submit"
            styleType="primary"
            className="uppercase"
            text={registration('button')}
          />
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
