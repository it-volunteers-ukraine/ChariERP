export interface IModalAdminProps {
  title: string;
  isOpen: boolean;
  subtitle?: string;
  onClose: () => void;
  onConfirm: () => void;
  btnCancelText: string;
  btnConfirmText: string;
  content?: string | React.ReactNode;
}
