import * as Yup from 'yup';
import { TranslationValues } from 'next-intl';

export const initialValues = {
  newPassword: '',
  passwordConfirmation: '',
};

export const getValidationSchema = (error: (key: string, params?: TranslationValues) => string) =>
  Yup.object().shape({
    newPassword: Yup.string()
      .trim()
      .required(error('required'))
      .min(8, error('minPlural', { int: 8 }))
      .max(20, error('maxPlural', { int: 20 }))
      .matches(/^[^\u0400-\u04FF]+$/, error('matches_english', { field: 'Password' })),
    passwordConfirmation: Yup.string()
      .trim()
      .required(error('required'))
      .oneOf([Yup.ref('newPassword')], error('passwordMismatch')),
  });
