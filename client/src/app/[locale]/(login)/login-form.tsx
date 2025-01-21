'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Form, Formik, FormikValues } from 'formik';

import { sendResetEmail } from '@/actions';
import { Button, InputField, ModalEnterEmail, showMessage, SmallBtn } from '@/components';

import { getValidationSchema, initialValues } from './sign-in/config';

interface ILoginFormProps {
  isLoading: boolean;
  onSubmit: (values: FormikValues) => void;
}

const LoginForm = ({ onSubmit, isLoading }: ILoginFormProps) => {
  const btn = useTranslations('button');
  const message = useTranslations('validation');
  const login = useTranslations('auth-page.login');
  const messagePasswordReset = useTranslations('password-change');

  const validationSchema = getValidationSchema(message);

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const onSubmitEmail = async (email: string) => {
    setIsSendingEmail(true);
    try {
      if (typeof window !== 'undefined') {
        const baseUrl = window.location.origin;

        const response = await sendResetEmail(email, baseUrl);

        if (response.success) {
          showMessage.success(messagePasswordReset('successSend'));
        } else {
          if (response.time) {
            showMessage.error(messagePasswordReset(response.message, { time: response.time }));
          } else {
            showMessage.error(messagePasswordReset(response.message));
          }
        }
      }
    } catch {
      showMessage.error(messagePasswordReset('errorSend'));
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <>
      <ModalEnterEmail
        isOpen={isOpenModal}
        onClose={setIsOpenModal}
        onSubmit={onSubmitEmail}
        isLoading={isSendingEmail}
      />

      <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
        {() => (
          <Form className="flex w-full max-w-[400px] flex-col items-center gap-[42px] pb-2 pt-7 desktop:pb-[22px] desktop:pt-[30px]">
            <div className="flex w-full flex-col">
              <InputField name="email" label="Email" required wrapperClass="mb-[32px]" />

              <InputField required name="password" type="password" label={login('password')} />

              <SmallBtn
                type="changePass"
                text={btn('forgotPass')}
                className="mt-1 py-[14.5px]"
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
