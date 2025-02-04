import * as Yup from 'yup';
import { TranslationValues } from 'next-intl';
import { isValidPhoneNumber } from 'libphonenumber-js';

import { regExp } from '@/constants';
import { OrganizationFormValues } from '@/types';

const maxSize = 5;

export const organizationInitialValues: OrganizationFormValues = {
  site: '',
  email: '',
  phone: '',
  edrpou: '',
  agree: false,
  social: [''],
  lastName: '',
  position: '',
  firstName: '',
  middleName: '',
  certificate: '',
  organizationName: '',
  dateOfRegistration: '',
};

export const organizationValidation = (error: (key: string, params?: TranslationValues) => string) =>
  Yup.object().shape({
    organizationName: Yup.string()
      .trim()
      .max(300, error('maxPlural', { int: 300 }))
      .required(error('required')),
    edrpou: Yup.string()
      .matches(/^\d{8}$/, error('taxNumber'))
      .required(error('required')),
    certificate: Yup.mixed<File>()
      .test('required', error('required'), (value) => {
        return value && !!value;
      })
      .test('fileSize', error('maxSizeFile', { maxSize: `${maxSize}` }), (value) => {
        return value && value.size <= 1024 * 1024 * maxSize;
      })
      .test('fileType', error('extensionsFile', { extensions: '(jpg, jpeg, png, pdf)' }), (value) => {
        return value && ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'].includes(value.type);
      }),
    dateOfRegistration: Yup.string().required(error('required')),
    position: Yup.string()
      .trim()
      .max(100, error('maxPlural', { int: 100 }))
      .required(error('required')),
    lastName: Yup.string()
      .trim()
      .max(100, error('maxPlural', { int: 100 }))
      .required(error('required')),
    firstName: Yup.string()
      .trim()
      .max(100, error('maxPlural', { int: 100 }))
      .required(error('required')),
    middleName: Yup.string()
      .trim()
      .max(100, error('maxPlural', { int: 100 })),
    phone: Yup.string()
      .test('is-valid-length', error('enter9Digits'), (value) => {
        return value ? value.replace(/\D/g, '').length >= 12 : false;
      })
      .test('is-valid-phone', error('notValidPhone'), (value) => !!isValidPhoneNumber(value as string))
      .required(error('required')),
    email: Yup.string()
      .trim()
      .min(6, error('minPlural', { int: 6 }))
      .max(50, error('maxPlural', { int: 50 }))
      .matches(regExp.email, error('notValidEmail'))
      .required(error('required')),
    site: Yup.string()
      .trim()
      .matches(regExp.https, error('siteStart'))
      .matches(regExp.domainUpLevel, error('domain'))
      .min(10, error('minPlural', { int: 10 }))
      .max(2000, error('maxPlural', { int: 2000 })),
    social: Yup.array().of(
      Yup.string()
        .trim()
        .matches(regExp.https, error('siteStart'))
        .matches(regExp.domainUpLevel, error('domain'))
        .min(10, error('minPlural', { int: 10 }))
        .max(2000, error('maxPlural', { int: 2000 }))
        .test('isRequired', error('notEmpty'), (value, context) => {
          const { parent } = context;

          if (parent && parent.length > 1) {
            return value !== undefined && value !== null && value !== '';
          }

          return true;
        }),
    ),
    agree: Yup.boolean().oneOf([true]).required(),
  });
