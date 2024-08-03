import { TranslationValues } from 'next-intl';
import * as Yup from 'yup';

export const initialValues = {
  email: '',
  password: '',
};

export const getValidationSchema = (error: (key: string, params?: TranslationValues) => string) =>
  Yup.object().shape({
    email: Yup.string()
      .trim()
      .min(6, error('minPlural', { int: 6 }))
      .max(50, error('maxPlural', { int: 50 }))
      .email()
      .required(error('required')),
    password: Yup.string()
      .trim()
      .min(8, error('minPlural', { int: 8 }))
      .max(20, error('maxPlural', { int: 20 }))
      .matches(/^[^\u0400-\u04FF]+$/, error('matches_english', { field: 'Password' }))
      .required(error('required')),
  });
