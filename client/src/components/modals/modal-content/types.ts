import { FormikValues } from 'formik';

export interface IModalContent {
  name: string;
  error?: string;
  values?: FormikValues;
  organizationName: string;
  setFieldValue?: (field: string, value: string | boolean, shouldValidate?: boolean) => void;
}
