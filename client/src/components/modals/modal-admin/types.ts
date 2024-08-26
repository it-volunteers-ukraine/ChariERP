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
  content?: string | React.ReactNode;
}
