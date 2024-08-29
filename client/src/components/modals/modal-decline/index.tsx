'use client';

import React from 'react';
import { Formik } from 'formik';
import { useTranslations } from 'next-intl';

import { declineInitialValues, declineValidationSchema, ModalAdmin, ModalContent } from '@/components';

import { IModalDecline } from './types';

export const ModalDecline = ({ isOpen, onClose, isLoading, onSubmitDecline, organizationName }: IModalDecline) => {
  const btn = useTranslations('button');
  const modal = useTranslations('modal');
  const errorValidation = useTranslations('validation');

  return (
    <Formik
      onSubmit={onSubmitDecline}
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
            onConfirm={() => onSubmitDecline(values)}
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
