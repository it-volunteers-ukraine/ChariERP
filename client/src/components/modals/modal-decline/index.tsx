'use client';

import React from 'react';
import { Formik } from 'formik';
import { useTranslations } from 'next-intl';

import { declineInitialValues, declineValidationSchema, ModalAdmin, ModalContent, showMessage } from '@/components';

import { IModalDecline } from './types';

export const ModalDecline = ({ isOpen, onClose, isLoading, onSubmitDecline, organizationName }: IModalDecline) => {
  const btn = useTranslations('button');
  const modal = useTranslations('modal');
  const errors = useTranslations('errors.admin');

  const errorValidation = useTranslations('validation');

  const handleSubmit = (values: { declineReason: string; otherReason: string }) => {
    const value = modal('decline.radioBtn.other') === values.declineReason ? values.otherReason : values.declineReason;

    if (value === '') {
      showMessage.error(errors('emptyValue'));

      return;
    }

    onSubmitDecline(value);
  };

  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={declineInitialValues}
      validationSchema={declineValidationSchema(errorValidation)}
    >
      {({ values, setFieldValue }) => {
        return (
          <ModalAdmin
            isOpen={isOpen}
            isLoading={isLoading}
            classNameBtn="w-[82px]"
            btnCancelText={btn('no')}
            btnConfirmText={btn('yes')}
            title={modal('decline.title')}
            onClose={() => onClose(false)}
            onConfirm={() => handleSubmit(values)}
            content={
              <ModalContent
                values={values}
                name="declineReason"
                setFieldValue={setFieldValue}
                organizationName={organizationName}
              />
            }
          />
        );
      }}
    </Formik>
  );
};
