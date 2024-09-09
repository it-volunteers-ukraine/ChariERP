'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Formik, FormikValues } from 'formik';

import { InputField, ModalAdmin, enterEmailInitialValues, enterEmailValidation } from '@/components';

import { IModalDecline } from './types';

export const ModalEnterEmail = ({ isOpen, onClose, isLoading, onSubmit }: IModalDecline) => {
  const btn = useTranslations('button');
  const modal = useTranslations('modal');
  const input = useTranslations('auth-page.login');
  const errorValidation = useTranslations('validation');

  const handleSubmit = (values: FormikValues) => {
    onSubmit(values.email);
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
            isLoading={isLoading}
            btnCancelText={btn('cancel')}
            onClose={() => onClose(false)}
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
