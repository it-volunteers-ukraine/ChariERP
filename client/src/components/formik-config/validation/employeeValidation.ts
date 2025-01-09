import * as Yup from 'yup';
import { TranslationValues } from 'next-intl';
import { isValidPhoneNumber } from 'libphonenumber-js';

const maxSize = 5;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const employeeValidation = (error: (key: string, params?: TranslationValues) => string) =>
  Yup.object().shape({
    avatar: Yup.mixed<File>()
      .notRequired()
      .test('fileSize', error('maxSizeFile', { maxSize: `${maxSize}` }), (value) => {
        if (value) {
          return value.size <= 1024 * 1024 * maxSize;
        }

        return true;
      })
      .test('fileType', error('extensionsFile', { extensions: '(jpg, jpeg, png, pdf)' }), (value) => {
        if (value) {
          return ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].includes(value.type);
        }

        return true;
      }),
    lastName: Yup.string()
      .trim()
      .max(100, error('maxPlural', { int: 100 }))
      .required(error('required')),
    firstName: Yup.string()
      .trim()
      .max(100, error('maxPlural', { int: 100 }))
      .required(error('required')),
    phone: Yup.string()
      .test('is-valid-phone', error('notValidPhone'), (value) => !!isValidPhoneNumber(value as string))
      .required(error('required')),
    email: Yup.string()
      .trim()
      .min(6, error('minPlural', { int: 6 }))
      .max(50, error('maxPlural', { int: 50 }))
      .matches(emailRegex, error('notValidEmail'))
      .required(error('required')),
    password: Yup.string()
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
