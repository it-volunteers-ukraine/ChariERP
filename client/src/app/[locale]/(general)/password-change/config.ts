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
      .min(8, error('minPlural', { int: 8 }))
      .max(20, error('maxPlural', { int: 20 }))
      .matches(/[a-z]/, error('mustContainLowercase'))
      .matches(/[A-Z]/, error('mustContainUppercase'))
      .matches(/[0-9]/, error('mustContainNumber'))
      .matches(/[!@#$%^&*()_+=[\]{}|;:'",.<>/?-]/, error('mustContainSymbol'))
      .matches(/^[a-zA-Z0-9!@#$%^&*()_+=[\]{}|;:'",.<>/?-]+$/, error('invalidCharacters'))
      .required(error('required')),
  });
