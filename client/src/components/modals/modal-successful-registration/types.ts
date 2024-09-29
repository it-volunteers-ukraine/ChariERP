export interface IModalAdminProps {
  title: string;
  isOpen: boolean;
  isLoading?: boolean;
  onClose: () => void;
  leftBtnText: string;
  navigate: () => void;
  rightBtnText: string;
  onConfirm: () => void;
  classNameBtn?: string;
  content?: string | React.ReactNode;
}
