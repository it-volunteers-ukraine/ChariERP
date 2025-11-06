import { cn } from '@/utils';

export const getStyles = (isChecked?: boolean, isError?: boolean) => ({
  textarea: cn(
    'p-[20px] w-full scroll-textarea h-[160px] focus:outline-hidden border rounded-md border-light-blue bg-white text-mobster italic resize-y',
    {
      'border-input-error': isError,
      'border-input-lite-gray!': !isChecked,
    },
  ),
});
