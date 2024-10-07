export interface IModalAdminProps {
  title: string;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  leftBtnText: string;
  rightBtnText: string;
  onConfirm: () => void;
  classNameBtn?: string;
  onNavigate: () => void;
  content?: string | React.ReactNode;
}
