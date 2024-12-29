import { TranslationValues } from 'next-intl';
import { isValidPhoneNumber } from 'libphonenumber-js';

import * as Yup from 'yup';

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const ValidationSchema = (error: (key: string, params?: TranslationValues) => string) =>
  Yup.object().shape({
    email: Yup.string()
      .trim()
      .min(6, error('minPlural', { int: 6 }))
      .max(50, error('maxPlural', { int: 50 }))
      .matches(emailRegex, error('notValidEmail'))
      .required(error('required')),
    name: Yup.string()
      .trim()
      .max(300, error('maxPlural', { int: 300 }))
      .required(error('required')),
    surname: Yup.string()
      .trim()
      .max(300, error('maxPlural', { int: 300 }))
      .required(error('required')),
    message: Yup.string()
      .trim()
      .max(400, error('maxPlural', { int: 400 })),
    phone: Yup.string()
      .test('is-valid-length', error('enter9Digits'), (value) => {
        return value ? value.replace(/\D/g, '').length >= 12 : false;
      })
      .test('is-valid-phone', error('notValidPhone'), (value) => !!isValidPhoneNumber(value as string))
      .required(error('required')),
    agree: Yup.boolean().oneOf([true]).required(),
  });
