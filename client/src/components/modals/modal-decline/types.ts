export interface IModalDecline {
  isOpen: boolean;
  isLoading?: boolean;
  organizationName: string;
  onClose: (bool: boolean) => void;
  onSubmitDecline: (value: string) => Promise<void> | void;
}
