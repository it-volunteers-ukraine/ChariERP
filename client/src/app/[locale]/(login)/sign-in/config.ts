import * as Yup from 'yup';
import { TranslationValues } from 'next-intl';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const initialValues = {
  email: '',
  password: '',
};

export const getValidationSchema = (error: (key: string, params?: TranslationValues) => string) =>
  Yup.object().shape({
    email: Yup.string()
      .min(6, error('minPlural', { int: 6 }))
      .max(50, error('maxPlural', { int: 50 }))
      .required(error('required'))
      .matches(emailRegex, error('notValidEmail'))
      .test('no-leading-trailing-spaces', error('spacesNotAllowed'), (value) => {
        return value === value?.trim();
      })
      .email(error('validEmail')),
    password: Yup.string()
      .min(8, error('minPlural', { int: 8 }))
      .max(20, error('maxPlural', { int: 20 }))
      .matches(/^[^\u0400-\u04FF]+$/, error('matches_english', { field: 'Password' }))
      .required(error('required'))
      .test('no-leading-trailing-spaces', error('spacesNotAllowed'), (value) => {
        return value === value?.trim();
      }),
  });
