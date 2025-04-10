import * as Yup from 'yup';
import { TranslationValues } from 'next-intl';

import { regExp } from '@/constants';

export interface IJoinFormValues {
  name: string;
  email: string;
  phone: string;
  agree: boolean;
  message: string;
  telegram: string;
}

export const joinInitialValues: IJoinFormValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
  telegram: '',
  agree: false,
};

export const joinValidation = (error: (key: string, params?: TranslationValues) => string) =>
  Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(error('required'))
      .max(300, error('maxPlural', { int: 300 })),
    phone: Yup.string().test('is-valid-length', error('enter9Digits'), (value) => {
      return value ? value.replace(/\D/g, '').length >= 12 : true;
    }),
    email: Yup.string()
      .trim()
      .required(error('required'))
      .min(6, error('minPlural', { int: 6 }))
      .max(50, error('maxPlural', { int: 50 }))
      .matches(regExp.email, error('notValidEmail')),
    telegram: Yup.string()
      .trim()
      .min(10, error('minPlural', { int: 10 }))
      .max(2000, error('maxPlural', { int: 2000 }))
      .matches(regExp.telegramLink, error('telegram')),
    message: Yup.string()
      .trim()
      .min(10, error('minPlural', { int: 10 }))
      .max(2000, error('maxPlural', { int: 2000 })),
    agree: Yup.boolean().oneOf([true]).required(),
  });
