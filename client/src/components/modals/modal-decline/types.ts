import { FormikValues } from 'formik';

export interface IModalDecline {
  isOpen: boolean;
  isLoading?: boolean;
  organizationName: string;
  onClose: (bool: boolean) => void;
  onSubmitDecline: (values: FormikValues) => void;
}
