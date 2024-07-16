import * as Yup from 'yup';
import { TranslationValues } from 'next-intl';
import { isValidPhoneNumber } from 'libphonenumber-js';

const linkRegExp = /^https:\/\/.*$/;

export const organizationValidation = (error: (key: string, params?: TranslationValues) => string) =>
  Yup.object().shape({
    organizationName: Yup.string()
      .trim()
      .max(300, error('maxPlural', { int: 300 }))
      .required(error('required')),
    organizationTaxNumber: Yup.string()
      .matches(/^\d{8}$/, error('taxNumber'))
      .required(error('required')),
    certificateOfRegister: Yup.string().required(error('required')),
    dateOfRegisterOrganization: Yup.string().required(error('required')),
    positionOrganization: Yup.string()
      .trim()
      .max(100, error('maxPlural', { int: 100 }))
      .required(error('required')),
    lastName: Yup.string()
      .trim()
      .max(100, error('maxPlural', { int: 100 }))
      .required(error('required')),
    name: Yup.string()
      .trim()
      .max(100, error('maxPlural', { int: 100 }))
      .required(error('required')),
    middleName: Yup.string()
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
      .email(error('notValidEmail'))
      .required(error('required')),
    password: Yup.string()
      .trim()
      .min(8, error('minPlural', { int: 8 }))
      .max(20, error('maxPlural', { int: 20 }))
      .required(error('required')),
    site: Yup.string()
      .trim()
      .matches(linkRegExp, error('siteStart'))
      .min(10, error('minPlural', { int: 10 }))
      .max(2000, error('maxPlural', { int: 2000 })),
    socialNetworks: Yup.array().of(
      Yup.string()
        .trim()
        .matches(linkRegExp, error('siteStart'))
        .min(10, error('minPlural', { int: 10 }))
        .max(2000, error('maxPlural', { int: 2000 })),
    ),
    // agree: Yup.boolean().oneOf([true]).required(),
  });
