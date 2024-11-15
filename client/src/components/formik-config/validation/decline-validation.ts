import * as Yup from 'yup';
import { TranslationValues } from 'next-intl';

export const declineValidationSchema = (error: (key: string, params?: TranslationValues) => string) =>
  Yup.object().shape({
    declineReason: Yup.string().required(error('required')),
    otherReason: Yup.string().max(500, error('maxPlural', { int: 500 })),
  });
