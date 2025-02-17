import * as Yup from 'yup';
import { TranslationValues } from 'next-intl';

export const getPasswordValidation = (error: (key: string, params?: TranslationValues) => string) =>
  Yup.string()
    .trim()
    .required(error('required'))
    .min(8, error('minPlural', { int: 8 }))
    .max(20, error('maxPlural', { int: 20 }))
    .matches(/[0-9]/, error('mustContainNumber'))
    .matches(/[a-z]/, error('mustContainLowercase'))
    .matches(/[A-Z]/, error('mustContainUppercase'))
    .matches(/[!@#$%^&*()_+=[\]{}|;:'",.<>/?-]/, error('mustContainSymbol'))
    .matches(/^[a-zA-Z0-9!@#$%^&*()_+=[\]{}|;:'",.<>/?-]+$/, error('invalidCharacters'));
