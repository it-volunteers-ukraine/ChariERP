'use client';

import { useTranslations } from 'next-intl';
import { Form, Formik, FormikValues } from 'formik';

import { Button, InputField, ModalEnterEmail, SmallBtn } from '@/components';

import { getValidationSchema, initialValues } from './sign-in/config';
import { useState } from 'react';

interface ILoginFormProps {
  isLoading: boolean;
  onSubmit: (values: FormikValues) => void;
}

const LoginForm = ({ onSubmit, isLoading }: ILoginFormProps) => {
  const message = useTranslations('validation');
  const btn = useTranslations('button');
  const login = useTranslations('auth-page.login');

  const validationSchema = getValidationSchema(message);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const onSubmitEmail = (email: string) => {
    alert(email);
    setIsOpenModal(false);
  };

  return (
    <>
      <ModalEnterEmail isOpen={isOpenModal} onClose={setIsOpenModal} onSubmit={onSubmitEmail} />

      <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        {() => (
          <Form className="flex flex-col items-center pt-7 pb-2 desktop:pt-[30px] desktop:pb-[22px] gap-[42px] max-w-[400px] w-full">
            <div className="flex flex-col w-full">
              <InputField name="email" label="Email" required wrapperClass="mb-[32px]" />

              <InputField required name="password" type="password" label={login('password')} />

              <SmallBtn
                type="changePass"
                text={btn('forgotPass')}
                className="py-[14.5px] mt-1"
                onClick={() => setIsOpenModal(true)}
              />
            </div>

            <Button
              type="submit"
              styleType="primary"
              isLoading={isLoading}
              text={login('button')}
              className="w-[115px] uppercase"
            />
          </Form>
        )}
      </Formik>
    </>
  );
};

export { LoginForm };
