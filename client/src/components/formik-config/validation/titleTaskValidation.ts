import { TranslationValues } from 'next-intl';
import * as Yup from 'yup';

export const titleTaskValidation = (error: (key: string, params?: TranslationValues) => string) =>
  Yup.object().shape({
    title: Yup.string()
      .required(error('required'))
      .max(130, error('maxPlural', { int: 130 })),
  });
