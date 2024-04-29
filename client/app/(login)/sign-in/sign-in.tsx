'use client';
import { Form, Formik, FormikValues } from 'formik';

import { Button, InputField } from '@/components';

import { initialValues, validationSchema } from './config';

const SignIn = () => {
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
          <InputField name="email" label="Логін" />
          <InputField name="password" label="Пароль" type="password" />
          <Button
            text="УВІЙТИ"
            type="submit"
            styleType="primary"
            className="w-[115px]"
          />
        </Form>
      )}
    </Formik>
  );
};

export default SignIn;
