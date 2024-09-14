export interface IModalEnterEmail {
  isOpen: boolean;
  isLoading?: boolean;
  onClose: (bool: boolean) => void;
  onSubmit: (value: string) => Promise<void> | void;
}
