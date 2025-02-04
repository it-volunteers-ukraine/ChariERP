import * as Yup from 'yup';
import { TranslationValues } from 'next-intl';

import { regExp } from '@/constants';

export const enterEmailValidation = (error: (key: string, params?: TranslationValues) => string) =>
  Yup.object().shape({
    email: Yup.string()
      .trim()
      .min(6, error('minPlural', { int: 6 }))
      .max(50, error('maxPlural', { int: 50 }))
      .matches(regExp.email, error('notValidEmail'))
      .required(error('required')),
  });
