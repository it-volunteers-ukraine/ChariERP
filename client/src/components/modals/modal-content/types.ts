import { FormikErrors, FormikValues } from 'formik';

export interface FormValues {
  otherReason: string;
  declineReason: string;
}

export interface IModalContent {
  name: string;
  values?: FormikValues;
  organizationName: string;
  errors: FormikErrors<FormValues>;
  setFieldValue?: (field: string, value: string | boolean, shouldValidate?: boolean) => void;
}
