import { FormikErrors } from 'formik';

import { FormValues } from '../modal-content/types';

export interface IModalAdminProps {
  title: string;
  isOpen: boolean;
  subtitle?: string;
  isLoading?: boolean;
  onClose: () => void;
  onConfirm: () => void;
  classNameBtn?: string;
  btnCancelText: string;
  btnConfirmText: string;
  errors?: FormikErrors<FormValues>;
  content?: string | React.ReactNode;
}
