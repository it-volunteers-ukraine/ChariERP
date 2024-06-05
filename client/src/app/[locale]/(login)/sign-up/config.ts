import * as Yup from 'yup';
import { TranslationValues } from 'next-intl';

interface FormValues {
  email: string;
  organizationName: string;
  organizationTaxNumber: string;
  certificateOfRegister: string;
  dateOfRegistrOrganization: string;
  positionOrganization: string;
  lastName: string;
  name: string;
  middleName: string;
  phone: string;
  site: string;
  socialNetworks: string;
  agree: boolean;
}

export const initialValues: FormValues = {
  email: '',
  organizationName: '',
  organizationTaxNumber: '',
  certificateOfRegister: '',
  dateOfRegistrOrganization: '',
  positionOrganization: '',
  lastName: '',
  name: '',
  middleName: '',
  phone: '',
  site: '',
  socialNetworks: '',
  agree: false,
};

export const validationSchema = (
  error: (key: string, params?: TranslationValues) => string,
) =>
  Yup.object().shape({
    organizationName: Yup.string()
      .trim()
      .max(300, error('maxPlural', { int: 300 }))
      .required(error('required')),
    organizationTaxNumber: Yup.string()
      .matches(/^\d{8}$/, error('taxNumber'))
      .required(error('required')),
    dateOfRegistrOrganization: Yup.string().required(error('required')),
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
      .required('required')
      .matches(/^\+38\(\d{3}\)\d{3}-\d{2}-\d{2}$/, error('phone')),
    email: Yup.string()
      .trim()
      .min(6, error('minPlural', { int: 6 }))
      .max(50, error('maxPlural', { int: 50 }))
      .email(error('notValidEmail'))
      .required(error('required')),
    site: Yup.string()
      .trim()
      .matches(/^https:\/\/.*$/, error('siteStart'))
      .min(10, error('minPlural', { int: 10 }))
      .max(200, error('maxPlural', { int: 200 }))
      .required(error('required')),
    socialNetworks: Yup.string()
      .trim()
      .matches(/^https:\/\/.*$/, error('siteStart'))
      .min(10, error('minPlural', { int: 10 }))
      .max(200, error('maxPlural', { int: 200 }))
      .required(error('required')),
    agree: Yup.boolean().oneOf([true]).required(),
  });
