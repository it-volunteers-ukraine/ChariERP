import * as Yup from 'yup';
import { TranslationValues } from 'next-intl';

import { getPasswordValidation } from '@/components';

export const initialValues = {
  newPassword: '',
  passwordConfirmation: '',
};

export const getValidationSchema = (error: (key: string, params?: TranslationValues) => string) =>
  Yup.object().shape({
    newPassword: getPasswordValidation(error),
    passwordConfirmation: Yup.string()
      .trim()
      .required(error('required'))
      .oneOf([Yup.ref('newPassword')], error('passwordsMustMatch')),
  });
