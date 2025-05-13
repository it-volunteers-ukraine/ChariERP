export interface FileCardProps {
  file: File;
  disabled: boolean;
  isDeleting: boolean;
  removeFile: () => void;
  preview: string | undefined;
}
