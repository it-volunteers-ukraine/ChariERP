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
      .max(300, error('maxPlural', { int: 300 }))
      .required(error('required')),
    phone: Yup.string().test('is-valid-length', error('enter9Digits'), (value) => {
      return value ? value.replace(/\D/g, '').length >= 12 : true;
    }),
    email: Yup.string()
      .trim()
      .min(6, error('minPlural', { int: 6 }))
      .max(50, error('maxPlural', { int: 50 }))
      .matches(regExp.email, error('notValidEmail'))
      .required(error('required')),
    telegram: Yup.string()
      .trim()
      .matches(regExp.https, error('siteStart'))
      .matches(regExp.domainUpLevel, error('domain'))
      .min(10, error('minPlural', { int: 10 }))
      .max(2000, error('maxPlural', { int: 2000 })),
    message: Yup.string()
      .trim()
      .min(10, error('minPlural', { int: 10 }))
      .max(2000, error('maxPlural', { int: 2000 })),
    agree: Yup.boolean().oneOf([true]).required(),
  });

export const createEmailContent = (values: IJoinFormValues) => {
  return `
    <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; padding: 20px; max-width: 600px; margin: 0 auto; border: 1px solid #ddd; border-radius: 8px;">
      <h2 style="color: #0056b3; text-align: center;">Нове запитання для приєднання</h2>
      <p><strong>Ім'я:</strong> ${values.name}</p>
      <p><strong>Електронна пошта:</strong> ${values.email}</p>
      <p><strong>Телеграм:</strong> ${values.telegram}</p>
      <p><strong>Номер телефону:</strong> ${values.phone}</p>
      <p><strong>Повідомлення:</strong></p>
      <p>${values.message}</p>
    </div>
  `;
};
