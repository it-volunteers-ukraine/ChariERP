export interface IModalDecline {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: (bool: boolean) => void;
  onSubmit: (value: string) => Promise<void> | void;
}
