import * as Yup from 'yup';
import { TranslationValues } from 'next-intl';

export const initialValues = {
  declineReason: '',
  otherReason: '',
};

export const validationSchema = (error: (key: string, params?: TranslationValues) => string) =>
  Yup.object().shape({
    declineReason: Yup.string().required(error('required')),
    otherReason: Yup.string(),
  });
