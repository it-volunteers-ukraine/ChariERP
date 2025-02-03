'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Formik, FormikValues } from 'formik';

import { sendResetEmail } from '@/actions';
import { InputField, ModalAdmin, enterEmailInitialValues, enterEmailValidation, showMessage } from '@/components';

import { IModalEnterEmail } from './types';

export const ModalEnterEmail = ({ isOpen, onClose }: IModalEnterEmail) => {
  const btn = useTranslations('button');
  const modal = useTranslations('modal');
  const input = useTranslations('auth-page.login');
  const messagePasswordReset = useTranslations('password-change');

  const errorValidation = useTranslations('validation');

  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const handleSubmit = async (values: FormikValues) => {
    setIsSendingEmail(true);
    try {
      if (typeof window !== 'undefined') {
        const baseUrl = window.location.origin;

        const response = await sendResetEmail(values.email, baseUrl);

        if (response.success) {
          showMessage.success(messagePasswordReset('successSend'));

          return;
        }

        const errorMessage = response.time
          ? messagePasswordReset(response.message, { time: response.time })
          : messagePasswordReset(response.message);

        showMessage.error(errorMessage);
      }
    } catch (error) {
      console.log(error);

      showMessage.error(messagePasswordReset('errorSend'));
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={enterEmailInitialValues}
      validationSchema={enterEmailValidation(errorValidation)}
    >
      {({ values }) => {
        return (
          <ModalAdmin
            isOpen={isOpen}
            isLoading={isSendingEmail}
            btnCancelText={btn('cancel')}
            onClose={() => onClose}
            btnConfirmText={btn('confirm')}
            title={modal('enterPass.title')}
            classNameBtn="w-[136px] uppercase"
            subtitle={modal('enterPass.text')}
            onConfirm={() => handleSubmit(values)}
            content={<InputField required name="email" label={input('email')} />}
          />
        );
      }}
    </Formik>
  );
};
