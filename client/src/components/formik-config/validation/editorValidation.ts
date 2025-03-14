import * as Yup from 'yup';

import { regExp } from '@/constants';
import { TranslationValues } from 'next-intl';

export const imageUrlValidation = (error: (key: string, params?: TranslationValues) => string) =>
  Yup.object().shape({
    imageUrl: Yup.string()
      .trim()
      .required(error('required'))
      .min(10, error('minPlural', { int: 10 }))
      .matches(regExp.https, error('siteStart'))
      .max(2000, error('maxPlural', { int: 2000 }))
      .matches(regExp.domainUpLevel, error('domain')),
  });

export const linkValidation = (error: (key: string, params?: TranslationValues) => string) =>
  Yup.object().shape({
    url: Yup.string()
      .trim()
      .required(error('required'))
      .min(10, error('minPlural', { int: 10 }))
      .matches(regExp.https, error('siteStart'))
      .max(2000, error('maxPlural', { int: 2000 }))
      .matches(regExp.domainUpLevel, error('domain')),
    textLink: Yup.string()
      .trim()
      .required(error('required'))
      .max(400, error('maxPlural', { int: 400 })),
  });
